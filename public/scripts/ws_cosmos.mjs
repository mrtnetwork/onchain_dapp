const { SigningStargateClient, Registry,
    encodePubkey,
    makeAuthInfoBytes,
    makeSignDoc,
    makeSignBytes,
    coins,
    TxBody, AuthInfo, Any,
    TxRaw,
    encodeSecp256k1Pubkey } = Cosmos;

let _wallet;
function createCompleter() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}
function appIsReady(params) {
    const event = new CustomEvent('wallet-standard:app-ready', {
        detail: {
        }
    });
    window.dispatchEvent(event);

}

async function getWallet() {
    if (_wallet) return _wallet;
    const completer = createCompleter();
    window.addEventListener("wallet-standard:register-wallet", function s(e) {
        e.detail({
            register: function _(params) {
                if (params !== undefined && params.name != undefined && params.name == 'MRT') {
                    completer.resolve(params)
                }
            }
        })
    });
    appIsReady();
    _wallet = await completer.promise;
    return _wallet;

}
async function listenOnEvents() {
    const wallet = await getWallet();
    await wallet.features["cosmos:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ") + " chains: " + p.chains)
    );
}

async function connect() {
    const wallet = await getWallet();
    let { accounts } = await wallet.features["cosmos:connect"].connect();
    return { accounts, wallet };
}

async function signAndSendAminoTransaction() {
    const { accounts, wallet } = await connect();
    let { amino, direct } = await wallet.features["cosmos:signer"].signer("provider");
    const rpcUrl = "https://rpc.provider-sentry-02.ics-testnet.polypore.xyz"
    const signingClient = await SigningStargateClient.connectWithSigner(
        rpcUrl,
        amino
    );
    const providerAccounts = await amino.getAccounts()
    const r = await signingClient.sendTokens(
        providerAccounts[0].address,
        "cosmos1etkgdknzysw5v89hjqm3ply5m0r4zdpwnjszr2",
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

async function signAndSendDirectTransaction() {
    const { accounts, wallet } = await connect();
    let { amino, direct } = await wallet.features["cosmos:signer"].signer("provider");
    const rpcUrl = "https://rpc.provider-sentry-02.ics-testnet.polypore.xyz"
    const signingClient = await SigningStargateClient.connectWithSigner(
        rpcUrl,
        direct
    );
    const providerAccounts = await direct.getAccounts()
    console.log("provider accounts: " + providerAccounts)
    const r = await signingClient.sendTokens(
        providerAccounts[0].address,
        "cosmos1etkgdknzysw5v89hjqm3ply5m0r4zdpwnjszr2",
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
async function signTransaction() {
    const { accounts, wallet } = await connect();
    // let { amino, direct } = await wallet.features["cosmos:signer"].signer("provider");
    const rpcUrl = "https://rpc.provider-sentry-02.ics-testnet.polypore.xyz"
    const signingClient = await SigningStargateClient.connectWithSigner(
        rpcUrl,
        null
    );
    const owner = accounts[0];
    console.log("called?!" + owner.address);
    // const providerAccounts = await direct.getAccounts();
    const sendMsg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
            fromAddress: owner.address,
            toAddress: "cosmos1etkgdknzysw5v89hjqm3ply5m0r4zdpwnjszr2",
            amount: [{
                denom: "uatom",
                amount: "100000",
            },],
        },
    };
    const { accountNumber, sequence } = await signingClient.getSequence(owner.address);
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(owner.pubkey))
    const txBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: [sendMsg],
            memo: "optional memo",
            timeoutHeight: null,
        },
    };
    const bodyBytes = signingClient.registry.encode(txBodyEncodeObject);
    console.log("encoded: " + bodyBytes)

    const authInfoBytes = makeAuthInfoBytes(
        [{ pubkey, sequence: sequence }],
        coins(2000, "uatom"),
        200000,
    );
    const signDoc = makeSignDoc(
        bodyBytes,
        authInfoBytes,
        "provider", // chainId
        accountNumber
    );

    const signDocBytes = makeSignBytes(signDoc)
    console.log("signDoc: " + signDocBytes)
    const { signature, signed } = await wallet.features["cosmos:signTransaction"].signTransaction({
        transaction: signDocBytes,
        account: owner
    });
    console.log("signature: " + signature.signature)
    const sig = Buffer.from(signature.signature,'base64');
    console.log("signature: " +sig)

    const tx = TxRaw.fromPartial({
        bodyBytes: signed.bodyBytes,
        authInfoBytes: signed.authInfoBytes,
        signatures: [sig],
    });
    const txBytes = TxRaw.encode(tx).finish();
    const br = await signingClient.broadcastTx(txBytes, signingClient.broadcastTimeoutMs, signingClient.broadcastPollIntervalMs);

}
async function addNewChain() {
    const { accounts, wallet } = await connect();
    const params = {
        chainId: 'babajaga-1',
        rpc: 'https://rpc-testnet.c4e.io/',
        hrp: 'c4e'

    };
    const r = await wallet.features["cosmos:addNewChain"].addNewChain(params);

}
async function signMessage() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const params = {
        message: Uint8Array.from([1, 2, 3, 4]),
        account: accounts[0]
    }
    const { signature } = await await wallet.features["cosmos:signMessage"].signMessage(
        params
    );
    console.log("signature: " + signature)
}
window.listenOnEvents = listenOnEvents
window.connect = connect
window.signAndSendAminoTransaction = signAndSendAminoTransaction
window.signAndSendDirectTransaction = signAndSendDirectTransaction
window.addNewChain = addNewChain
window.signMessage = signMessage
window.signTransaction = signTransaction