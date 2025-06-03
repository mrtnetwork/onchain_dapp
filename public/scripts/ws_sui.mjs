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
                if (params !== undefined && params.name != undefined && params.name == 'OnChain') {
                    completer.resolve(params)
                }
            }
        })
    });
    appIsReady();
    _wallet = await completer.promise;
    return _wallet;

}


async function connect() {
    const wallet = await getWallet();
    let { accounts } = await wallet.features["sui:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("sui:testnet"));
    console.log("testnets: " + accounts.length)
    return { accounts, wallet };
}

/// window.suiSDK
async function transferExample() {
    const { accounts, wallet } = await connect()
    const client = new window.SuiClient.SuiClient({
        url: window.SuiClient.getFullnodeUrl('testnet')
    });
    const transaction = new window.Sui.Transaction();
    const [coin] = transaction.splitCoins(transaction.gas, [1000]);
    transaction.transferObjects([coin], '0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a');
    transaction.setSender(accounts[0].address)
    await transaction.build({ client: client })
    const { digest, effects } = await wallet.features["sui:signAndExecuteTransaction"].signAndExecuteTransaction(
        { transaction, account: accounts[0], chain: 'sui:testnet' }
    );
}
async function signExample() {
    const { accounts, wallet } = await connect()
    const client = new window.SuiClient.SuiClient({
        url: window.SuiClient.getFullnodeUrl('testnet')
    });
    const transaction = new window.Sui.Transaction();
    const [coin] = transaction.splitCoins(transaction.gas, [1000]);
    transaction.transferObjects([coin], '0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a');
    transaction.setSender(accounts[0].address)
    await transaction.build({ client: client })
    const { bytes, signature } = await wallet.features["sui:signTransaction"].signTransaction(
        { transaction, account: accounts[0], chain: 'sui:testnet' }
    );
    console.log("signature:  " + signature)
}
async function signMessageExample() {
    const { account, wallet } = await connect()
    const message = {
        'message': 'sign test',
        'nonce': '1234567'
    }

    const { args } = await wallet.features["sui:signMessage"].signMessage(
        message
    );
    console.log(args.bcsToHex())
}

async function signMessage() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const params = {
        message: Uint8Array.from([1, 2, 3, 4]),
        account: accounts[0]
    }
    const { signature } = await await wallet.features["sui:signMessage"].signMessage(
        params
    );
    console.log("signature: " + signature)
}
async function listenOnSuiEvents() {
    const wallet = await getWallet();
    await wallet.features["sui:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ") + " chains: " + p.chains)
    );
}
window.connect = connect
window.transferExample = transferExample
window.signMessageExample = signMessageExample
window.signExample = signExample
window.signMessage = signMessage
window.listenOnSuiEvents = listenOnSuiEvents