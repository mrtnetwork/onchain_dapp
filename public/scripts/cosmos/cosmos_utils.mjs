const { SigningStargateClient } = Cosmos;


async function createTransaction(signer, recipient) {
    const rpcUrl = "https://rpc.provider-sentry-02.ics-testnet.polypore.xyz"
    const signingClient = await SigningStargateClient.connectWithSigner(
        rpcUrl,
        signer
    );
    const accounts = await signer.getAccounts();
    console.log("accountsdd: " + JSON.stringify(accounts[0]))
    return await signingClient.sendTokens(
        accounts[0].address,
        recipient || "cosmos1xqgp3dapjh98cvuwdzsc9sgxppgtsuzf2lqure",
        [
            {
                denom: "uatom",
                amount: "100000",
            },
        ],
        {
            amount: [{ denom: "uatom", amount: "1000" }],
            gas: "200000",
        },
    )


}
export { createTransaction }