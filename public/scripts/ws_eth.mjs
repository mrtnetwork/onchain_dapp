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
    let { accounts } = await wallet.features["ethereum:connect"].connect();
    accounts = accounts.filter(account => account.chains.includes("ethereum:11155111"));
    console.log("speolia: " + accounts.length)
    return { accounts, wallet };
}
async function addNewChain() {
    const wallet = await getWallet();
    const params = { chainId: '0x138de', chainName: 'Berachain', nativeCurrency: { name: 'BERA Token', symbol: 'BERA', decimals: 18 }, rpcUrls: ['https://rpc.berachain.com', 'https://berachain.blockpi.network/v1/rpc/public', 'https://berachain-rpc.publicnode.com', 'https://berachain.drpc.org', 'wss://berachain.drpc.org', 'https://rpc.berachain-apis.com', 'wss://rpc.berachain-apis.com', 'wss://berachain-rpc.publicnode.com'], blockExplorerUrls: ['https://berascan.com'] };
    let chainId = await wallet.features["ethereum:addNewChain"].addNewChain(params);
    console.log("chainid: " + chainId)

}

async function signTypedData() {
    const typedDataV1 = [
        {
            type: 'string',
            name: 'Message',
            value: 'Hi, Alice!'
        },
        {
            type: 'uint32',
            name: 'A number',
            value: '1337'
        }
    ];

    const { accounts, wallet } = await connect();
    const params = {
        account: accounts[0],
        typedData: typedDataV1
    };
    let { signature } = await wallet.features["ethereum:signTypedData"].signTypedData(params);
    console.log("signature: " + Buffer.from(signature).toString('hex'))

}
async function signTypedDataV3() {
    const typedData = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Person: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
            ],
            Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person' },
                { name: 'contents', type: 'string' },
            ],
        },
        primaryType: 'Mail',
        domain: {
            name: 'Ether Mail',
            version: '1',
            chainId: 97,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
            from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            },
            to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            },
            contents: 'Hello, Bob!',
        },
    };

    const { accounts, wallet } = await connect();
    const params = {
        account: accounts[0],
        typedData: typedData
    };
    let { signature } = await wallet.features["ethereum:signTypedDataV3"].signTypedDataV3(params);
    console.log("signature: " + Buffer.from(signature).toString('hex'))

}
async function signTypedDataV4() {
    const typedData = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Person: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
            ],
            Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person' },
                { name: 'contents', type: 'string' },
            ],
        },
        primaryType: 'Mail',
        domain: {
            name: 'Ether Mail',
            version: '1',
            chainId: 97,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
            from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            },
            to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            },
            contents: 'Hello, Bob!',
        },
    };

    const { accounts, wallet } = await connect();
    const params = {
        account: accounts[0],
        typedData: typedData
    };
    let { signature } = await wallet.features["ethereum:signTypedDataV4"].signTypedDataV4(params);
    console.log("signature: " + Buffer.from(signature).toString('hex'))

}
async function personalSign() {

    const { accounts, wallet } = await connect();
    const params = {
        account: accounts[0],
        message: Buffer.from('this is test', "utf-8")
    };
    let { signature } = await wallet.features["ethereum:personalSign"].personalSign(params);
    console.log("signature: " + Buffer.from(signature).toString('hex'))

}
async function sendTransaction() {



    const { accounts, wallet } = await connect();
    const transaction = { from: accounts[0].address, to: "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2", data: "0x", value: "0x01", type: "0x2" }
    const params = {
        account: accounts[0],
        transaction
    };
    let { txId } = await wallet.features["ethereum:sendTransaction"].sendTransaction(params);
    console.log("txId: " + txId)

}
async function sendTransactionUsingRequest() {



    const { accounts, wallet } = await connect();
    const transaction = { from: accounts[0].address, to: "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2", data: "0x", value: "0x01", type: "0x2" }
    const params = {
        method: "eth_sendTransaction", params: [
            transaction
        ]
    };
    let txId = await wallet.features["ethereum:request"].request(params);
    console.log("txId: " + txId)

}
async function listenOnEvents() {
    const wallet = await getWallet();
    await wallet.features["ethereum:events"].on('change',
        (p) => console.log("account changed: " + JSON.stringify(p.accounts) + " chains: " + p.chains)
    );
}
window.sendTransactionUsingRequest = sendTransactionUsingRequest
window.sendTransaction = sendTransaction
window.connect = connect
window.addNewChain = addNewChain
window.signTypedData = signTypedData
window.signTypedDataV3 = signTypedDataV3
window.signTypedDataV4 = signTypedDataV4
window.personalSign = personalSign
window.listenOnEvents = listenOnEvents