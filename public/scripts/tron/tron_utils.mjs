
function getTronWeb() {
    if (window.tron !== undefined && window.tron && window.tron?.tronWeb !== undefined && window.tron?.tronWeb) {
        return window.tron.tronWeb
    }
    return new TronWeb({
        fullHost: 'https://api.shasta.trongrid.io/'
    });
}

async function buildTransfer({ account, destination }) {
    const tronweb = await getTronWeb();
 
    const transaction = await tronweb.transactionBuilder.sendTrx(destination || "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL", 1, account);
    return transaction;
}
async function broadcastTx(signedTransaction) {
    const tronweb = await getTronWeb();
    let transaction = await tronweb.trx.sendRawTransaction(signedTransaction);
    console.log("txs: " + JSON.stringify(transaction))
    return transaction;
}

export { buildTransfer, broadcastTx }