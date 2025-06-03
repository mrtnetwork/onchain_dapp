const { ApiPromise, WsProvider } = Polkadot;

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
    let { accounts } = await wallet.features["substrate:connect"].connect();
    return { accounts, wallet };
}

async function sendTransaction(params) {
    let { accounts, wallet } = await connect()
    console.log(accounts.map((e) => e.chains));
    // 0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3
    // return;
    const provider = new WsProvider('wss://rpc.polkadot.io'); // Or any Substrate node
    const api = await ApiPromise.create({ provider });
    const genesisHash = api.genesisHash.toHex();
    console.log('Genesis hash:' + genesisHash);
    accounts = accounts.filter(account => account.chains.includes("substrate:" + genesisHash));
    console.log("accounts: " + accounts)
    if (!accounts) return;
    const transfer = api.tx.balances.transferAllowDeath(
        '5GZw9eAKnqecu6Jk51jyRx2SccJTSxvRW22wjg7k1P9mY3mC',
        1000000000000
    );
    const hash = await transfer.signAndSend(accounts[0].address, {
        signer: {
            signPayload: async (payload) => {
                const signature = await wallet.features["substrate:signTransaction"].signTransaction(payload)
                return signature;
            },
        }
    });
}

async function listenOnSuiEvents() {
    const wallet = await getWallet();
    await wallet.features["substrate:events"].on('change',
        (p) => console.log("account changed: " + p.accounts + " chains: " + p.chains)
    );
}

async function signMessage() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const params = {
        data: Buffer.from([1, 2, 3, 4]).toString('hex'),
        address: accounts[0].address,
        type: 'bytes'
    }
    const { signature } = await await wallet.features["substrate:signMessage"].signMessage(
        params
    );
    console.log("signature: " + signature)
}
window.connect = connect
window.sendTransaction = sendTransaction
window.listenOnSuiEvents = listenOnSuiEvents
window.signMessage = signMessage


