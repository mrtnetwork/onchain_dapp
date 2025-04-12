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


async function connect() {
    const wallet = await getWallet();
    let account = await wallet.features["aptos:connect"].connect();
    console.log("account: " + JSON.stringify(account.args))
    return { account: account.args, wallet };
}
/// window.aptosSDK
async function transferExample() {
    const { account, wallet } = await connect()
    const config = new window.aptosSDK.AptosConfig({ network: window.aptosSDK.Network.TESTNET });
    const aptos = new window.aptosSDK.Aptos(config);
    const alice = window.aptosSDK.Account.generate();
    const transaction = await aptos.transaction.build.simple({
        sender: window.aptosSDK.AccountAddress.fromString(account.address),
        data: {
            function: "0x1::aptos_account::transfer",
            functionArguments: [alice.accountAddress, 1000], // Transfer 1000 octas
        },
    });

    const { args } = await wallet.features["aptos:signTransaction"].signTransaction(
        transaction
    );
    console.log(args.bcsToHex())
}
async function signMessageExample() {
    const { account, wallet } = await connect()
    const message = {
        'message': 'sign test',
        'nonce': '1234567'
    }

    const { args } = await wallet.features["aptos:signMessage"].signMessage(
        message
    );
    console.log(args.bcsToHex())
}

async function getNetwork() {
    const { account, wallet } = await connect()

    const info = await wallet.features["aptos:network"].network();
    console.log(JSON.stringify(info))
}
async function changeNetwork() {
    const { account, wallet } = await connect()
    const network = {
        chainId: 1,

    }

    const info = await wallet.features["aptos:changeNetwork"].changeNetwork(network);
    console.log(JSON.stringify(info))
}
async function onAccountChange() {
    const { account, wallet } = await connect()
    await wallet.features["aptos:onAccountChange"].onAccountChange((p) => console.log("accounts change: " + JSON.stringify(p)));

}


async function onNetworkChange() {
    const { account, wallet } = await connect()
    await wallet.features["aptos:onNetworkChange"].onNetworkChange((p) => console.log("network change: " + p.name));

}

window.connect = connect
window.transferExample = transferExample
window.signMessageExample = signMessageExample
window.getNetwork = getNetwork
window.changeNetwork = changeNetwork
window.onAccountChange = onAccountChange;
window.onNetworkChange = onNetworkChange;