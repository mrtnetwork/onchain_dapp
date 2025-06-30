import { getWallet } from '../utils/ws.mjs'
import { ton } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer } from '../ton/ton_utils.mjs';
const network = ton.tonWsTestnetNetwork;
async function connect() {
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["ton:connect"].connect(network);
    console.log("accounts " + JSON.stringify(accounts));
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Ton testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");

    const params = {
        'message': message || "is a test message.",
        'account': accounts[0].address
    };
    await utils.runMethod({
        method: "ton_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["ton:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}


async function signTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid ton destionation address: ", "Uf9yQSjbA9yVLb6sNqtkcyXrZpSxWXlN7D-dV0Rovm2q62YI");

    const params = await createTransfer(accounts[0], recipient);
    await utils.runMethod({
        method: "ton_signTransaction",
        asyncFunc: async function name() {
            const { externalMessage } = await provider.features["ton:signTransaction"].signTransaction(params);
            return externalMessage;
        }
    })
}

async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid ton destionation address: ", "Uf9yQSjbA9yVLb6sNqtkcyXrZpSxWXlN7D-dV0Rovm2q62YI");
    const params = await createTransfer(accounts[0], recipient);
    await utils.runMethod({
        method: "ton_sendTransaction",
        asyncFunc: async function name() {
            const { txId } = await provider.features["ton:signAndSendTransaction"].signAndSendTransaction(params);
            return txId;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "ton_requestAccounts",
        asyncFunc: async function name() {
            let { accounts } = await provider.features["ton:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["ton:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["ton:events"].on("change", function name({ accounts, chains }) {
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
    ton: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndSendTransaction: signAndSendTransaction,
        requestAccounts: requestAccounts,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
