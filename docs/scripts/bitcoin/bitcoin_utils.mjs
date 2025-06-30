async function _getTx(txId, network) {
    const url = "https://mempool.space/testnet4/api/tx/" + txId + "/hex";
    console.log("url: " + url);
    let tx = await fetch(url);
    if (tx.ok) {
        let txHex = await tx.text();
        return Buffer.from(txHex, "hex");
    }
    throw Error("Unable to retrive tx: " + txId)

}

function _isP2tr(type) {
    return type == "P2TR"
}

function _isP2sh(type) {
    return type.includes("P2SH")
}
function _isMultisig(type) {
    return type.includes("P2SH") || type.includes("P2WSH")
}
function _isWitness(type) {
    switch (type) {
        case "P2WPKH":
        case "P2WSH":
        case "P2TR":
        case "P2SH/P2WSH":
        case "P2SH/P2WPKH":
            return true
        default:
            return false;
    }
}


async function _buildInputs(info) {
    const address = info.address
    const witnessScript = address.witnessScript
    const redeemScript = address.redeemScript;
    const type = address.type;
    const publicKey = address.publicKey;
    const value = info.value;

    let nonWitnessUtxo = null
    const isWitness = _isWitness(type)
    const isP2tr = _isP2tr(type);
    console.log("is come ?!");
    console.log("hash: " + info.hash);
    if (!isWitness) {
        nonWitnessUtxo = await _getTx(info.hash)
    }
    console.log("is witness: " + isWitness)
    const input = {
        hash: info.hash,
        index: info.index,
        porCommitment: "please sign this psbt."

    };
    if (isWitness) {
        input["witnessUtxo"] = {
            script: Buffer.from(address.script, 'hex'),
            value: value
        }
    }
    if (redeemScript !== undefined && redeemScript != null) {
        input["redeemScript"] = Buffer.from(redeemScript, "hex")
    }
    if (witnessScript !== undefined && witnessScript != null) {
        input["witnessScript"] = Buffer.from(witnessScript, "hex")
    }
    if (isP2tr) {
        input["tapInternalKey"] = Buffer.from(publicKey, 'hex').subarray(1)
    }
    if (nonWitnessUtxo != null) {
        input["nonWitnessUtxo"] = nonWitnessUtxo
    }
    return input;
}
function _varIntSize(n) {
    if (n < 0xfd) return 1;
    if (n <= 0xffff) return 3;
    return 5;
}

function _estimateInputSize(inputs, outputs) {
    const signatureSize = 73;
    const schnorSigSize = 65;
    const isSegwit = inputs.some(e => e.isWitness);
    const version = 4;
    const locktime = 4;
    const markerAndFlag = isSegwit ? 2 : 0;

    const inputsLen = _varIntSize(inputs.length);
    const outputsLen = _varIntSize(outputs.length);

    // Calculate total size of inputs (scriptSig etc)
    let totalInputSize = 0;
    for (const input of inputs) {
        totalInputSize += 36; // outpoint

        if (input.isWitness) {
            let scriptSigLength = 0;
            if (input.isP2sh && input.redeemScript) {
                scriptSigLength = input.redeemScript.byteLength;
            }
            totalInputSize += _varIntSize(scriptSigLength) + scriptSigLength;
            continue;
        }

        if (input.isMultisig) {
            const scriptSigLength = signatureSize * 3 + input.redeemScript.byteLength + 1;
            totalInputSize += _varIntSize(scriptSigLength) + scriptSigLength;
            continue;
        }

        if (input.publicKey) {
            const scriptSigLength = signatureSize + input.publicKey.byteLength;
            totalInputSize += _varIntSize(scriptSigLength) + scriptSigLength;
        } else {
            totalInputSize += 1; // empty scriptSig length
        }
    }

    // Calculate total size of outputs
    let totalOutputSize = 0;
    for (const output of outputs) {
        totalOutputSize += 8; // amount
        totalOutputSize += _varIntSize(output.script.byteLength) + output.script.byteLength;
    }

    // Calculate witness size
    let witnessSize = 0;
    if (isSegwit) {
        for (const input of inputs) {
            if (!input.isWitness) continue;

            let witnessStackCount = 0;
            let witnessStackSize = 0;

            if (input.isMultisig) {
                witnessStackCount = 5; // OP_0 + 3 sigs + witnessScript
                witnessStackSize += 1; // OP_0 empty push

                for (let i = 0; i < 3; i++) {
                    witnessStackSize += _varIntSize(signatureSize) + signatureSize;
                }

                witnessStackSize += _varIntSize(input.witnessScript.byteLength) + input.witnessScript.byteLength;
            } else if (input.isP2tr) {
                witnessStackCount = 1;
                witnessStackSize += _varIntSize(schnorSigSize) + schnorSigSize;
            } else {
                witnessStackCount = 2; // sig + pubkey
                witnessStackSize += _varIntSize(signatureSize) + signatureSize;
                witnessStackSize += _varIntSize(input.publicKey.byteLength) + input.publicKey.byteLength;
            }

            witnessSize += _varIntSize(witnessStackCount) + witnessStackSize;
        }
    }
    // Base size excludes witness and marker/flag
    const baseSize =
        version +
        inputsLen +
        totalInputSize +
        outputsLen +
        totalOutputSize +
        locktime;
    // Total size includes marker/flag and witness
    const totalSize = baseSize + markerAndFlag + witnessSize;

    // Virtual size = (3 * base_size + total_size) / 4 rounded up
    const vsize = Math.ceil((3 * baseSize + totalSize) / 4);

    return { totalSize, baseSize, witnessSize, vsize };
}



async function createPsbt({ addresses, recipient, satPerByte = 2 }) {
    let addressesUtxos = [];
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        let url = "https://mempool.space/testnet4/api/address/" + address.address + "/utxo"
        let response = await fetch(url);
        console.log("isok: " + response.ok)
        if (!response.ok) throw Error("Unable to retrive address utxos.")
        if (response.ok) {
            const utxos = await response.json();
            for (let j = 0; j < utxos.length; j++) {
                const utxo = {
                    address: address,
                    hash: utxos[j].txid,
                    index: utxos[j].vout,
                    value: utxos[j].value,
                    isWitness: _isWitness(address.type),
                    isP2tr: _isP2tr(address.type),
                    isMultisig: _isMultisig(address.type),
                    isP2sh: _isP2sh(address.type),
                    type: address.type,
                    script: Buffer.from(address.script, "hex"),
                    publicKey: Buffer.from(address.publicKey, 'hex'),
                    ...(_isMultisig(address.type) ? {} : { publicKey: Buffer.from(address.publicKey, 'hex') }),
                    ...(address.redeemScript ? { redeemScript: Buffer.from(address.redeemScript, "hex") } : {}),
                    ...(address.witnessScript ? { witnessScript: Buffer.from(address.witnessScript, "hex") } : {}),
                    ...(_isP2tr(address.type) ? { tapInternalKey: Buffer.from(address.publicKey, 'hex').subarray(1) } : {})
                };
                addressesUtxos.push(utxo);

            }
        }
    }
    console.log("utxos done ?!" + addressesUtxos.length);
    if (addressesUtxos.length == 0) {
        console.log("no utxos");
        return;
    }
    // console.log(JSON.stringify(addressesUtxos));
    let psbtInputs = [];
    for (let i = 0; i < addressesUtxos.length; i++) {
        let utxo = addressesUtxos[i];
        const input = await _buildInputs(utxo);
        psbtInputs.push(input);

    }
    const totalInputValue = addressesUtxos.reduce((sum, input) => {
        return sum + (input.value || 0)
    }, 0)
    console.log("here ?!");
    const n = bitcoin.networks.testnet
    console.log("here ?!2 " + JSON.stringify(psbtInputs));
    const psbt = new bitcoin.Psbt({ network: n });
    psbt.addInputs(psbtInputs);
    console.log("here ?!2");
    const value = 100000;
    const destionation = recipient || "mju61fosB2S8zYbxAuoMeufjVMnhZ2NvFv";
    const payment = bitcoin.address.toOutputScript(destionation, n);
    const out = {
        value: value,
        address: destionation,
        script: payment
    }
    console.log("here ?3!");
    const changeAddress = addressesUtxos[0].address.address;
    console.log("here ?!4");
    const change = {
        value: 1,
        address: changeAddress,
        script: bitcoin.address.toOutputScript(changeAddress, n)
    }
    psbt.addOutput(out);
    const vsize = _estimateInputSize(addressesUtxos, [out, change]).vsize;
    const fee = vsize * satPerByte;
    const changeAmount = totalInputValue - value - fee;
    if (change < 0) throw Error("Not enough fund.");
    change.value = changeAmount
    psbt.addOutput(change);
    const signers = addresses.map(e => e.address)
    console.log("signers: " + JSON.stringify(signers));
    return { accounts: signers, psbt: psbt.toBase64() }
}


async function createTransfer(addresses, recipient) {
    const outputs = [
        { recipientAddress: recipient || "mju61fosB2S8zYbxAuoMeufjVMnhZ2NvFv", amount: "1000", account: addresses }
    ]
    return outputs;
}

export { createPsbt, createTransfer }