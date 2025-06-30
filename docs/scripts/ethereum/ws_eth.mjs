import { getWallet } from '../utils/ws.mjs'
import { ethereum } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
const network = ethereum.eip155WsTestnetNetwrk;
async function connect() {
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["ethereum:connect"].connect(network);
    // console.log("accounts " + JSON.stringify(accounts));
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Ethereum Sepolia testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function personalSign() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = [message || "is a test message.", accounts[0]];
    await utils.runMethod({
        method: "personal_sign",
        asyncFunc: async function name() {
            const signature = await provider.features["ethereum:personalSign"].personalSign(params);
            return signature;
        }
    })
}
async function ethSign() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = [accounts[0], message || "is a test message."];
    await utils.runMethod({
        method: "eth_sign",
        asyncFunc: async function name() {
            const signature = await provider.features["ethereum:ethSign"].ethSign(params);
            return signature;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "eth_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["ethereum:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}
async function signTypedDataV1() {
    const { accounts, provider } = await connect();
    const params = [JSON.stringify(ethereum.ethereumExapleTypedDataV1), accounts[0]];
    await utils.runMethod({
        method: "eth_signTypedData",
        asyncFunc: async function name() {
            const signature = await provider.features["ethereum:signTypedData"].signTypedData(params);
            return signature;
        }
    })
}
async function signTypedDataV4() {
    const { accounts, provider } = await connect();
    const params = [JSON.stringify(ethereum.ethereumExapleTypedDataV4), accounts[0]];
    await utils.runMethod({
        method: "eth_signTypedData",
        asyncFunc: async function name() {
            const signature = await provider.features["ethereum:signTypedData"].signTypedData(params);
            return signature;
        }
    })
}

async function importNewEthereumChain() {
    const { provider } = await connect();
    const params = [ethereum.ethereumNewChainExapleParams];
    await utils.runMethod({
        method: "addNewChain",
        asyncFunc: async function name() {
            const signature = await provider.features["ethereum:addNewChain"].addNewChain(params);
            return signature;
        }
    })
}

async function sendTransaction() {
    const { accounts, provider } = await connect();
    const input = prompt("Please enter a valid destionation address: ", "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2");
    const txParams = { to: input, from: accounts[0], data: "0x", value: "0x01", type: "0x2" }
    const params = [txParams];
    await utils.runMethod({
        method: "eth_sendTransaction",
        asyncFunc: async function name() {
            const txId = await provider.features["ethereum:sendTransaction"].sendTransaction(params);
            return txId;
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["ethereum:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["ethereum:events"].on("change", function name({ accounts, chains }) {
        if (accounts) {
            console.log("wallet accounts changed: " + JSON.stringify(accounts.map(e => e.address)))
        }
        if (chains) {
            console.log("wallet chains changed: " + JSON.stringify(chains))
        }

    });
}
async function listenOnWalletChanges() {
    const { provider } = await connect();
    await provider.features["standard:events"].on("change", function name({ change }) {
        if (change.accounts) {
            console.log("wallet accounts changed: " + JSON.stringify(change.accounts.map(e => e.address)))
        }
        if (change.chains) {
            console.log("wallet chains changed: " + JSON.stringify(change.chains))
        }

    });
}


const onChain = {
    ethereum: {
        connect: connect,
        personalSign: personalSign,
        ethSign: ethSign,
        signTypedDataV1: signTypedDataV1,
        signTypedDataV4: signTypedDataV4,
        importNewEthereumChain: importNewEthereumChain,
        sendTransaction: sendTransaction,
        requestAccount: requestAccounts,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
