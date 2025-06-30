import * as wc from '../utils/wc.mjs';
import { ton } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer } from '../ton/ton_utils.mjs';
const network = ton.tonTestnetNetwork;
async function connect() {
    const { session, provider } = await wc.initWalletConnect(ton.tonCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Ton testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "ton_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "ton_signMessage", params }, network);
            return signature;
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
            const { externalMessage } = await provider.request({ method: "ton_signTransaction", params }, network);
            return externalMessage;
        }
    })
}
async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid ton destionation address: ", "Uf-BQxz-Z5Lqfr02hNbTHw45ZJaM_pKf0R_OsTF_H9mEvHZk");
    const params = await createTransfer(accounts[0], recipient);
    await utils.runMethod({
        method: "ton_sendTransaction",
        asyncFunc: async function name() {
            const { txId } = await provider.request({ method: "ton_sendTransaction", params }, network);
            return txId;
        }
    })
}


const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    ton: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndSendTransaction: signAndSendTransaction
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
