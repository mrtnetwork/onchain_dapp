
function buildTxConfig() {
    const linearFee = CardanoWasm.LinearFee.new(
        CardanoWasm.BigNum.from_str("44"), // fee per byte
        CardanoWasm.BigNum.from_str("155381") // constant fee
    )
    let builder = CardanoWasm.TransactionBuilderConfigBuilder.new();
    builder = builder.fee_algo(linearFee).pool_deposit(CardanoWasm.BigNum.from_str("3000000")).key_deposit(CardanoWasm.BigNum.from_str("3000000")).max_value_size(100000000).max_tx_size(16000).coins_per_utxo_byte(CardanoWasm.BigNum.from_str("4310"));
    return builder.build()
}
async function buildTxWs(utxos, recipient, onGetNativeScript) {
    const transactionUnspentOutput = utxos.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e));
    const recipientAddress = CardanoWasm.Address.from_bech32(recipient || "addr_test1qr0f6lze25yqyeet699xte0gm93r5kkwu0pslhmhn06ufq0z7809cpqgr2cnuy4wwjljkn62jne26mqkacdplt3049yszqj5ky");

    const amount = CardanoWasm.Value.new(CardanoWasm.BigNum.from_str("2000000")); // 2 ADA
    const output = CardanoWasm.TransactionOutput.new(recipientAddress, amount);
    const txBuilder = CardanoWasm.TransactionBuilder.new(
        buildTxConfig()
    );
    for (let i = 0; i < transactionUnspentOutput.length; i++) {
        const input = transactionUnspentOutput[i].input();
        const output = transactionUnspentOutput[i].output();
        const addr = output.address()
        const kind = addr.kind();
        if (kind != CardanoWasm.AddressKind.Byron) {
            const cred = addr.payment_cred();
            const kind = cred.kind();
            const isScript = kind == CardanoWasm.CredKind.Script;
            if (isScript) {
                const scriptCbor = await onGetNativeScript(addr.to_bech32());
                const nativeScript = CardanoWasm.NativeScript.from_hex(scriptCbor);
                const hash = nativeScript.hash();
                const generateCredential = CardanoWasm.Credential.from_scripthash(hash)
                const equal = generateCredential.to_hex() === cred.to_hex();
                if (!equal) throw Error("mitmatch between output address script and wallet native script");
                txBuilder.add_native_script_input(
                    nativeScript,
                    input,
                    output.amount()
                )
                continue;
            }

        }
        txBuilder.add_regular_input(
            output.address(),
            input,
            output.amount()
        )
    }
    txBuilder.add_output(output);
    txBuilder.add_change_if_needed(transactionUnspentOutput[0].output().address());
    const txBody = txBuilder.build();
    const tx = CardanoWasm.Transaction.new(
        txBody,
        CardanoWasm.TransactionWitnessSet.new()
    );
    // const txHex = tx.to_hex();
    return tx
}

async function buildBatchTx(utxos, recipient, onGetNativeScript, recipient2) {
    const transactionUnspentOutput = utxos.map(e => CardanoWasm.TransactionUnspentOutput.from_hex(e));
    const addresses = transactionUnspentOutput.map(e => e.output().address());
    const tx = await buildTxWs(utxos, recipient, onGetNativeScript);
    const body = tx.body();
    const fixed = CardanoWasm.FixedTransaction.new_from_body_bytes(body.to_bytes())
    const hash = fixed.transaction_hash();
    const outputs = body.outputs();
    let newUnspents = [];
    for (let i = 0; i < outputs.len(); i++) {
        const output = outputs.get(i);
        const isChangeAddress = addresses.find(e => e.to_bech32() == output.address().to_bech32()) ?? null;
        if (isChangeAddress == null) continue;
        const input = CardanoWasm.TransactionInput.new(hash, i);
        const unspent = CardanoWasm.TransactionUnspentOutput.new(input, output);
        newUnspents.push(unspent);

    }
    const newTransactionUnspentOutputs = newUnspents.map(e => e.to_hex())
    const tx2 = await buildTxWs(newTransactionUnspentOutputs, recipient2, onGetNativeScript)
    return [tx, tx2]
}
export { buildTxWs, buildBatchTx }
