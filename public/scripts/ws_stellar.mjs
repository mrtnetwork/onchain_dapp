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
    let { accounts } = await wallet.features["stellar:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("stellar:testnet"));
    console.log("testnets: " + accounts.length)
    return { accounts, wallet };
}


async function listenOnStellarEvents() {
    const wallet = await getWallet();
    await wallet.features["stellar:events"].on('change',
        (p) => console.log("account changed: " + p.accounts.map((e) => e.address + " ") + " chains: " + p.chains)
    );
}

function createServer() {
    return new StellarSdk.SorobanRpc.Server(
        "https://soroban-testnet.stellar.org:443"
    );
}

async function transferExample() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const server = createServer();
    const account = await server.getAccount(accounts[0].address);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.payment({
            asset: new StellarSdk.StellarBase.Asset("XLM"),
            destination: "GC6PAZDKUW4LTAIDFNARUMXW5GQPZLKSHXXZV2KW4MWACCJX5VKC6QAY",
            amount: "25"
        }))
        .setTimeout(200)
        .build();
    // const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [transaction.toXDR()] });
    const { envlope, txId } = await await wallet.features["stellar:signAndSendTransaction"].signAndSendTransaction(
        {
            transaction: transaction.toXDR(),
            account: accounts[0]
        }
    );
    console.log("txId: " + txId)

}
async function signExample() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const server = createServer();
    const account = await server.getAccount(accounts[0].address);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.payment({
            asset: new StellarSdk.StellarBase.Asset("XLM"),
            destination: "GC6PAZDKUW4LTAIDFNARUMXW5GQPZLKSHXXZV2KW4MWACCJX5VKC6QAY",
            amount: "25"
        }))
        .setTimeout(200)
        .build();
    // const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [transaction.toXDR()] });
    const { envlope } = await await wallet.features["stellar:signTransaction"].signTransaction(
        {
            transaction: transaction.toXDR(),
            account: accounts[0]
        }
    );
    console.log("envlope: " + envlope)

}
async function uploadWasmContractBytes() {
    const response = await fetch('/resource/soroban_token_contract.wasm');
    const bytecode = await response.arrayBuffer();
    const server = createServer();
    const { accounts, wallet } = await connect();
    const account = await server.getAccount(accounts[0].address);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.uploadContractWasm({
            wasm: bytecode
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const { envlope, txId } = await wallet.features["stellar:signAndSendTransaction"].signAndSendTransaction(
        {
            transaction: tx.toXDR(),
            account: accounts[0]
        }
    );
    console.log("txId: " + txId)
}


async function signMessage() {
    const { accounts, wallet } = await connect();
    if (!accounts) return;
    const params = {
        message: Uint8Array.from([1, 2, 3, 4]),
        account: accounts[0]
    }
    const { signature } = await await wallet.features["stellar:signMessage"].signMessage(
        params
    );
}
window.connect = connect
window.transferExample = transferExample
window.listenOnStellarEvents = listenOnStellarEvents
window.signExample = signExample
window.signMessage = signMessage
window.uploadWasmContractBytes = uploadWasmContractBytes