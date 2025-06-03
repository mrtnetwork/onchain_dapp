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
        console.log("i got listener /!");
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
    let { accounts } = await wallet.features["ton:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("ton:testnet"));
    console.log("accounts: " + accounts.length)
    return { accounts, wallet };
}

async function transferTonExample() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const message = {
        "address": "Uf9yQSjbA9yVLb6sNqtkcyXrZpSxWXlN7D-dV0Rovm2q62YI",
        "amount": (0.1 * 1e9).toString(),
        "stateInit": null,
        "payload": null
    }
    const transaction = {
        "account": accounts[0],
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 60
    }
    const { boc, txId } = await await wallet.features["ton:signAndSendTransaction"].signAndSendTransaction(
        transaction
    );
    console.log(txId)

}


async function deployJettonMinter() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const message = {
        "address": "Ef941xv06jTthEkLQ1iYNdARYacFvP6KqrQYyS_DWHW-cUjV",
        "amount": '500000000',
        "stateInit": "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"
    }
    const transaction = {
        "account": accounts[0],
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const { boc, txId } = await await wallet.features["ton:signAndSendTransaction"].signAndSendTransaction(
        transaction
    );
    console.log(txId)
}

async function signTransferTonExample() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const message = {
        "address": "Uf9yQSjbA9yVLb6sNqtkcyXrZpSxWXlN7D-dV0Rovm2q62YI",
        "amount": (0.1 * 1e9).toString(),
        "stateInit": null,
        "payload": null
    }
    const transaction = {
        "account": accounts[0],
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 60
    }
    const { externalMessage } = await await wallet.features["ton:signTransaction"].signTransaction(
        transaction
    );
    console.log(externalMessage)

}

async function signMessage() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const params = {
        message: Uint8Array.from([1, 2, 3, 4]),
        account: accounts[0]
    }
    const { signature } = await await wallet.features["ton:signMessage"].signMessage(
        params
    );
    console.log("signature: " + signature)
}
async function listenOnTonEvents() {
    const wallet = await getWallet();
    console.log("got event called!");
    await wallet.features["ton:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ") + " chains: " + p.chains)
    );
}
window.connect = connect
window.transferTonExample = transferTonExample
window.deployJettonMinter = deployJettonMinter
window.signTransferTonExample = signTransferTonExample
window.signPersonalMessage = signMessage
window.listenOnTonEvents = listenOnTonEvents