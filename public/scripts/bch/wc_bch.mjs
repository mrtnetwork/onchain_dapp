import * as wc from '../utils/wc.mjs';
import { btc } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createPsbt, createTransfer } from '../bitcoin/bitcoin_utils.mjs';
const network = btc.bchCaip2Testnet
async function connect() {
    console.log("network: " + network)
    const { session, provider } = await wc.initWalletConnect(btc.bchCaip2, network);

    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
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
            const { signature } = await provider.request({ method: "signMessage", params }, network);
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
            const { txid } = await provider.request({ method: "sendTransfer", params }, network);
            return txid;
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "bitcoin_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "bitcoin_requestAccounts" }, network);
            return accounts;
        }
    })
}



const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    bch: {
        connect: connect,
        signMessage: signMessage,
        transfer: transfer,
        requestAccounts: requestAccounts
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
