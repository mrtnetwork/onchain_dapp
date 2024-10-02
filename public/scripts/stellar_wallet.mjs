function parseResult(walletResponse) {
    if (typeof walletResponse.error != "undefined") {
        // window.document.getElementById("request_error").innerText = " Error: " + JSON.stringify(walletResponse.error);

        console.error("id: " + walletResponse.id + " Error: " + JSON.stringify(walletResponse.error))
        throw walletResponse.error;
    }
    console.log("Id: " + walletResponse.id + " result: " + JSON.stringify(walletResponse.result));
    return walletResponse.result;
}


async function stellarRequestAccount() {
    // return "GB726ND2YG4TR772WY4767M56RNSN3PHP4MV2ITQVCDM2LSMMVT7CD6O"
    let accounts = await window.stellar.sendWalletRequest({ method: "stellar_requestAccounts" });
    return parseResult(accounts)[0];
}
function createServer() {
    return new StellarSdk.SorobanRpc.Server(
        "https://soroban-testnet.stellar.org:443"
    );
}
async function _createChangeTrustTransaction() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    console.log(account)
    const asset2 = new StellarSdk.StellarBase.Asset("MRT", "GB726ND2YG4TR772WY4767M56RNSN3PHP4MV2ITQVCDM2LSMMVT7CD6O")
    const operation = StellarSdk.StellarBase.Operation.changeTrust({
        asset: asset2,
        limit: "2200000"
    });
    let transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(operation)
        .setTimeout(30)
        .build();
    return transaction.toXDR();
}
async function sendChangeTrust() {
    const xdr = await _createChangeTrustTransaction();
    console.log("xdr: " + xdr)
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [xdr] });
    parseResult(sendTransaction)
}
async function signChangeTrust() {
    const xdr = await _createChangeTrustTransaction();
    console.log("xdr: " + xdr)
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_signTransaction", params: [xdr] });
    parseResult(sendTransaction)
}
async function signMessage() {
    const data = Uint8Array.from([1, 2, 3, 4])
    const signMessage = parseResult(await window.stellar.sendWalletRequest({ method: "stellar_signMessage", params: [data] }));
}

async function uploadWasmContractBytes() {
    const response = await fetch('/resource/soroban_token_contract.wasm');
    const bytecode = await response.arrayBuffer();
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.uploadContractWasm({
            wasm: bytecode
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
    parseResult(sendTransaction)
}

async function deployContract() {
    const response = await fetch('/resource/soroban_token_contract.wasm');
    const bytecode = await response.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytecode);
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.createCustomContract({
            wasmHash: new Uint8Array(hashBuffer),
            address: new StellarSdk.StellarBase.Address(source),
            salt: Buffer.from("59cb3b431f6e61e0745fc4300055f17f53eed4a64f9923fc5a3ac6154b591144", "hex")
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
    parseResult(sendTransaction)
}

// async function initializeSorobanTokenContract() {
//     const server = createServer();
//     const source = await stellarRequestAccount();
//     const account = await server.getAccount(source);
//     const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
//         .addOperation(StellarSdk.StellarBase.Operation.invokeContractFunction({
//             contract: "CCUSYHUXMJUWWUAVPQKDI4IWYE6TGZLQHX4YUYAPXESYWKIIFJ3YXVVR",
//             function: "initialize",
//             args: [
//                 new StellarSdk.StellarBase.xdr.ScVal.scvAddress(new StellarSdk.StellarBase.Address(source).toScAddress()),
//                 new StellarSdk.StellarBase.xdr.ScVal.scvU32(18),
//                 new StellarSdk.StellarBase.xdr.ScVal.scvString("MRTNETWORK"),
//                 new StellarSdk.StellarBase.xdr.ScVal.scvString("MRT")
//             ],
//         }))
//         .setTimeout(200)
//         .build();
//     const tx = await server.prepareTransaction(transaction);
//     const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
//     parseResult(sendTransaction)
// }
async function initializeSorobanTokenContract() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.invokeContractFunction({
            contract: "CCUSYHUXMJUWWUAVPQKDI4IWYE6TGZLQHX4YUYAPXESYWKIIFJ3YXVVR",
            function: "initialize",
            args: [
                new StellarSdk.StellarBase.xdr.ScVal.scvAddress(new StellarSdk.StellarBase.Address(source).toScAddress()),
                new StellarSdk.StellarBase.xdr.ScVal.scvU32(18),
                new StellarSdk.StellarBase.xdr.ScVal.scvString("MRTNETWORK"),
                new StellarSdk.StellarBase.xdr.ScVal.scvString("MRT")
            ],
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
    parseResult(sendTransaction)
}
async function mintSorobanTokenContract() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.invokeContractFunction({
            contract: "CCUSYHUXMJUWWUAVPQKDI4IWYE6TGZLQHX4YUYAPXESYWKIIFJ3YXVVR",
            function: "mint",
            args: [
                new StellarSdk.StellarBase.xdr.ScVal.scvAddress(new StellarSdk.StellarBase.Address(source).toScAddress()),
                // new StellarSdk.StellarBase.xdr.ScVal.scvU32(18),
                new StellarSdk.StellarBase.ScInt(BigInt("1000000000000000000000000000")).toI128()
            ],
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
    parseResult(sendTransaction)
}
async function transferSorobanTokenContract() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.invokeContractFunction({
            contract: "CCUSYHUXMJUWWUAVPQKDI4IWYE6TGZLQHX4YUYAPXESYWKIIFJ3YXVVR",
            function: "transfer",
            args: [
                new StellarSdk.StellarBase.xdr.ScVal.scvAddress(new StellarSdk.StellarBase.Address(source).toScAddress()),
                new StellarSdk.StellarBase.xdr.ScVal.scvAddress(new StellarSdk.StellarBase.Address("GAVE53TPBZ3BJQWC2J7IGWHCEY47E7723LC5TYDW3SIW76ZYNEV3LPVT").toScAddress()),
                new StellarSdk.StellarBase.ScInt(BigInt("1000000000000000000000")).toI128()
            ],
        }))
        .setTimeout(200)
        .build();
    const tx = await server.prepareTransaction(transaction);
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [tx.toXDR()] });
    parseResult(sendTransaction)
}
async function simplePayment() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.payment({
            asset: new StellarSdk.StellarBase.Asset("XLM"),
            destination: "MD35VPYBDPDRVBEIUV36AZCN5G3KMX3WWVURAIXWIKZWH5QD54HXQAAAAAAAAAAHX6RTC",
            amount: "12"
        }))
        .setTimeout(200)
        .build();
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [transaction.toXDR()] });
    parseResult(sendTransaction)
}
async function simpleAssetPayment() {
    const server = createServer();
    const source = await stellarRequestAccount();
    const account = await server.getAccount(source);
    const transaction = new StellarSdk.StellarBase.TransactionBuilder(account, { fee: StellarSdk.StellarBase.BASE_FEE, networkPassphrase: StellarSdk.StellarBase.Networks.TESTNET })
        .addOperation(StellarSdk.StellarBase.Operation.payment({
            asset: new StellarSdk.StellarBase.Asset("MRT", "GB726ND2YG4TR772WY4767M56RNSN3PHP4MV2ITQVCDM2LSMMVT7CD6O"),
            destination: "MD35VPYBDPDRVBEIUV36AZCN5G3KMX3WWVURAIXWIKZWH5QD54HXQAAAAAAAAAAHX6RTC",
            amount: "12"
        }))
        .setTimeout(200)
        .build();
    const sendTransaction = await window.stellar.sendWalletRequest({ method: "stellar_sendTransaction", params: [transaction.toXDR()] });
    parseResult(sendTransaction)
}
function listenOnEvents() {

    ton.on("accountsChanged", function (s) {
        console.log("Account changed in page: " + JSON.stringify(s));
        console.log("default address: " + stellar.selectedAddress);
    });
    ton.on("chainChanged", function (s) {
        console.log("change changed in page: " + s.passphrase);
    });
    ton.on("message", function (s) {
        console.log("message in page: " + JSON.stringify(s));
    });
    ton.on("connect", function (s) {
        console.log("connect in page " + s);
    });
}

window.requestAccounts = stellarRequestAccount
window.sendChangeTrust = sendChangeTrust
window.signChangeTrust = signChangeTrust
window.signMessage = signMessage
window.uploadWasmContractBytes = uploadWasmContractBytes
window.deployContract = deployContract
window.initializeSorobanTokenContract = initializeSorobanTokenContract
window.initializeSorobanTokenContract = mintSorobanTokenContract
window.transferSorobanTokenContract = transferSorobanTokenContract
window.simplePayment = simplePayment
window.simplePayment = simpleAssetPayment
window.listenOnEvents = listenOnEvents