import { getWallet } from '../utils/ws.mjs'
import { btc } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createPsbt, createTransfer } from '../bitcoin/bitcoin_utils.mjs';
const network = btc.bchTestnet;
async function connect() {
    console.log("networj: " + network)
    const provider = await getWallet();
    let { accounts } = await provider.features["bitcoin:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (BitcoinCash chipnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign in test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["bitcoin:signPersonalMessage"].signPersonalMessage(params);
            return signature;
        }
    })
}


async function transfer() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid bitcoin destionation address: ", "bchtest:qqcpqx9h5x2u5lpn3e52rqkpqcy9pwrsfy6lgv9mg5");
    const params = await createTransfer(accounts, recipient);

    await utils.runMethod({
        method: "sendTransfer",
        asyncFunc: async function name() {
            const { txid } = await provider.features["bitcoin:sendTransaction"].sendTransaction(params);
            return txid;
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "bitcoin_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["bitcoin:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["bitcoin:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["bitcoin:events"].on("change", function name({ accounts, chains }) {
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
    bch: {
        connect: connect,
        signMessage: signMessage,
        transfer: transfer,
        requestAccounts: requestAccounts,
        listenOnWalletChanges: listenOnWalletChanges,
        listenOnNetworkChanges: listenOnNetworkChanges,
        disconnect: disconnect
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
