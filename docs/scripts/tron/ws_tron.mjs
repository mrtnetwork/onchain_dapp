import { getWallet } from '../utils/ws.mjs'
import { tron } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { broadcastTx, buildTransfer } from "./tron_utils.mjs"
const network = tron.tronWsShastaNetwork;
async function connect() {
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["tron:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Tron shasta testnet)". Please connect an account in your wallet.`);
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
        method: "tron_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["tron:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}


async function transfer() {
    const { accounts, provider } = await connect();
    const input = prompt("Please enter a valid destionation address: ", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
    const transaction = await buildTransfer({ account: accounts[0], input })
    const params = {
        transaction: transaction,
        account: accounts[0]
    }
    await utils.runMethod({
        method: "tron_signTransaction",
        asyncFunc: async function name() {
            const transaction = await provider.features["tron:signTransaction"].signTransaction(params);
            return transaction.signature;
        }
    })
}

async function signAndSendTransfer() {
    const { accounts, provider } = await connect();
    const input = prompt("Please enter a valid destionation address: ", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
    const transaction = await buildTransfer({ account: accounts[0], input })
    const params = {
        transaction: transaction,
        account: accounts[0]
    }
    const signature = await utils.runMethod({
        method: "tron_signTransaction",
        asyncFunc: async function name() {
            const transaction = await provider.features["tron:signTransaction"].signTransaction(params);
            return transaction.signature;
        }, showAlert: false
    });
    transaction.signature = signature
    const { txid } = await broadcastTx(transaction);
    console.log(txid);
    alert(`TxID: ${txid}`);
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "tron_requestAccounts",
        asyncFunc: async function name() {
            let { accounts } = await provider.features["tron:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["tron:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["tron:events"].on("change", function name({ accounts, chains }) {
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
    tron: {
        connect: connect,
        signMessage: signMessage,
        transfer: transfer,
        signAndSendTransfer: signAndSendTransfer,
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
