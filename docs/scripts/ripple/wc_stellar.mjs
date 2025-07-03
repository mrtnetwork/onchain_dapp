import * as wc from '../utils/wc.mjs';
import { stellar } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
const network = stellar.stellarTestnetNetwork;


async function connect() {
    const { session, provider } = await wc.initWalletConnect(stellar.stellarCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Stellar testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "stellar_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "stellar_requestAccounts" }, network);
            return accounts;
        }
    })
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign in test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "stellar_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "stellar_signMessage", params }, network);
            return signature;
        }
    })
}

async function signTransaction() {
    // const { accounts, provider } = await connect();
    // const recipient = prompt("Please enter a valid stellar destionation address: ", "MBNCH45OPXCOMZQSFG4M7WPOBG3DJAGKZH7AAICGSZTNDCO5XRVKAAAAAAAAOVVVWP3BM");
    // const transaction = await createTransfer(accounts[0], recipient);
    // const params = { transaction, account: accounts[0] };
    // await utils.runMethod({
    //     method: "stellar_signTransaction",
    //     asyncFunc: async function name() {
    //         const { envlope } = await provider.request({ method: "stellar_signTransaction", params }, network);
    //         return envlope;
    //     }
    // })
}
async function signAndSendTransaction() {
    // const { accounts, provider } = await connect();
    // const recipient = prompt("Please enter a valid stellar destionation address: ", "MBNCH45OPXCOMZQSFG4M7WPOBG3DJAGKZH7AAICGSZTNDCO5XRVKAAAAAAAAOVVVWP3BM");
    // const transaction = await createTransfer(accounts[0], recipient);
    // const params = { transaction, account: accounts[0] };
    // await utils.runMethod({
    //     method: "stellar_sendTransaction",
    //     asyncFunc: async function name() {
    //         const { txId } = await provider.request({ method: "stellar_sendTransaction", params }, network);
    //         return txId;
    //     }
    // })
}


const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    stellar: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndSendTransaction: signAndSendTransaction,
        requestAccounts: requestAccounts
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
