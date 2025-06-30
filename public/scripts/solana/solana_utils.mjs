const {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    Keypair,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction,
    TransactionInstruction, TransactionMessage, VersionedTransaction
} = solanaWeb3;
async function createTransferV0(address, recipient) {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    let block = await connection.getLatestBlockhash();
    let destionation = new PublicKey(recipient || "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    return createV0Transaction(address, destionation, block.blockhash)
}
async function createTransferLegacy(address, recipient) {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    let block = await connection.getLatestBlockhash();
    let destionation = new PublicKey(recipient || "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    return createLegacyTransaction(address, destionation, block.blockhash)
}

function createV0Transaction(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: recipient,
        lamports: 0.001 * LAMPORTS_PER_SOL
    });

    // Create a message for the transaction
    const messageV0 = new TransactionMessage({
        payerKey: new PublicKey(address),
        recentBlockhash: blockhash,
        instructions: [transferInstruction],
    }).compileToV0Message();
    return new VersionedTransaction(messageV0);
}
function createLegacyTransaction(address, recipient, blockhash) {
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: recipient,
        lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction({
        feePayer: new PublicKey(address),
        recentBlockhash: blockhash,
    });

    transaction.add(transferInstruction);

    return transaction;
}

export { createTransferV0, createTransferLegacy }