

let _client = null;


async function createTransfer(address, recipient) {

    const client = await getClient();
    console.log("client ready.");
    const tx = {
        TransactionType: "Payment",
        Account: address,
        Amount: "100000",
        Destination: recipient,
    };
    const prepared = await client.autofill(tx);
    console.log("autofill complete.");
    return prepared
}
async function createMintNFT(address) {
    const client = await getClient();
    const tx = {
        Account: address,
        TransactionType: "NFTokenMint",
        NFTokenTaxon: 0,
        URI: Buffer.from("https://github.com/mrtnetwork", 'utf-8').toString("hex").toUpperCase()
    };
    const prepared = await client.autofill(tx);
    return prepared
}
async function getClient() {
    const {
        Client,
        decode
    } = XRPL;
    if (_client == null) {
        _client = new Client("wss://s.altnet.rippletest.net:51233", { connectionTimeout: 20000 });
    }
    if (!_client.connection.isConnected()) {
        await _client.connect();
    }

    return _client;
}

async function submitTx(response) {
    const {
        decode
    } = XRPL;
    const signed = decode(response.tx_blob)
    const client = await getClient();
    const result = await client.submit(signed);
    return result
}

export {
    createTransfer,
    submitTx,
    createMintNFT
}