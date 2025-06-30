import { getWallet } from '../utils/ws.mjs'
import { sui } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer } from '../sui/sui_utils.mjs';
const network = sui.suiWsTestnetNetwork;
async function connect() {
    const provider = await getWallet();
    let { accounts } = await provider.features["sui:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Sui testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}


async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = {
        'message': message || 'is a test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "sui_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["sui:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}

async function signTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid sui destionation address: ", "0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a");
    const transaction = await createTransfer(accounts[0].address, recipient);
    const params = { transaction, account: accounts[0], chain: network };
    await utils.runMethod({
        method: "sui_signTransaction",
        asyncFunc: async function name() {
            const { signature } = await provider.features["sui:signTransaction"].signTransaction(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}
async function signAndExcuteTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid sui destionation address: ", "0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a");
    const transaction = await createTransfer(accounts[0].address, recipient);
    console.log("tx created?!");
    const params = { transaction, account: accounts[0], chain: network };
    await utils.runMethod({
        method: "sui_signAndExecuteTransaction",
        asyncFunc: async function name() {
            const { digest } = await provider.features["sui:signAndExecuteTransaction"].signAndExecuteTransaction(params);
            return digest;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "sui_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["sui:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["sui:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["sui:events"].on("change", function name({ accounts, chains }) {
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
    sui: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndExcuteTransaction: signAndExcuteTransaction,
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
