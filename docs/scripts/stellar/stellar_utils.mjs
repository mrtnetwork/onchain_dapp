function createServer() {
    return new StellarSdk.SorobanRpc.Server(
        "https://soroban-testnet.stellar.org:443"
    );
}
async function createTransfer(address, recipient) {
    const server = createServer();
    const account = await server.getAccount(address);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.payment({
            asset: new StellarSdk.StellarBase.Asset("XLM"),
            destination: recipient || "MBNCH45OPXCOMZQSFG4M7WPOBG3DJAGKZH7AAICGSZTNDCO5XRVKAAAAAAAAOVVVWP3BM",
            amount: "25"
        }))
        .setTimeout(200)
        .build();
    return transaction.toXDR();

}
export { createTransfer }