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
    console.log("wallet init: " + JSON.stringify(_wallet.features))
    return _wallet;

}


async function connect() {
    const wallet = await getWallet();
    let { accounts } = await wallet.features["tron:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("tron:2494104990"));
    console.log(accounts.length)

    return { accounts, wallet };
}
async function getTronWeb() {
    if (window.tron!==undefined && window.tron && window.tron.tronWeb) {
        return window.tron.tronWeb
    }
    return new TronWeb({
        fullHost: 'https://api.shasta.trongrid.io/'
    });
}
async function signMessage() {
    const { wallet, accounts } = await connect();
    const params = {
        message: Uint8Array.from([1, 2, 3, 4]),
        account: accounts[0]
    }
    const { signature } = await await wallet.features["tron:signMessage"].signMessage(
        params
    );
    console.log("signaturre: " + signature)
}
async function transferTrx() {
    const { wallet, accounts } = await connect();
    const tronweb = await getTronWeb();
    const transaction = await tronweb.transactionBuilder.sendTrx("TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL", 1, accounts[0].address);
    const poroto = tronweb.utils.transaction.txJsonToPb(transaction);
    const params = {
        transaction: poroto.serializeBinary(),
        account: accounts[0]
    }
    const { signedTransaction } = await await wallet.features["tron:signTransaction"].signTransaction(
        params
    );
    let result = await tronweb.trx.sendHexTransaction(Buffer.from(signedTransaction).toString('hex'));
    console.log("tx: " + JSON.stringify(result));
}
async function listenOnEvents() {
    const wallet = await getWallet();
    await wallet.features["tron:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ,") + " chains: " + p.chains)
    );
}
window.listenOnEvents = listenOnEvents
window.connect = connect
window.signMessage = signMessage
window.transferTrx = transferTrx