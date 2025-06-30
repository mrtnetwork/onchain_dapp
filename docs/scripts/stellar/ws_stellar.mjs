import { getWallet } from '../utils/ws.mjs'
import { stellar } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer } from '../stellar/stellar_utils.mjs';
const network = stellar.stellarWsTestnetNetwork;
async function connect() {
    console.log("connect called!");
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["stellar:connect"].connect(network);
    console.log("accounts " + accounts);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Bitcoin testnet4)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "stellar_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["stellar:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = {
        'message': message || 'is a test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "stellar_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["stellar:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
        }
    })
}
async function signTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid stellar destionation address: ", "GC6PAZDKUW4LTAIDFNARUMXW5GQPZLKSHXXZV2KW4MWACCJX5VKC6QAY");
    const transaction = await createTransfer(accounts[0].address, recipient);
    const params = { transaction, account: accounts[0] };
    console.log("transaction created ?: ");
    await utils.runMethod({
        method: "stellar_signTransaction",
        asyncFunc: async function name() {
            const { envlope } = await provider.features["stellar:signTransaction"].signTransaction(params);
            return envlope;
        }
    })
}
async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid stellar destionation address: ", "MBNCH45OPXCOMZQSFG4M7WPOBG3DJAGKZH7AAICGSZTNDCO5XRVKAAAAAAAAOVVVWP3BM");
    const transaction = await createTransfer(accounts[0].address, recipient);
    const params = { transaction, account: accounts[0] };
    await utils.runMethod({
        method: "stellar_sendTransaction",
        asyncFunc: async function name() {
            const { txId } = await provider.features["stellar:signAndSendTransaction"].signAndSendTransaction(params);
            return txId;
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["stellar:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["stellar:events"].on("change", function name({ accounts, chains }) {
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
    stellar: {
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
