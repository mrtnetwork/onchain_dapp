import * as wc from '../utils/wc.mjs';
import { monero } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
const network = monero.moneroWsTestnetNetwork;

async function connect() {
    const { session, provider } = await wc.initWalletConnect(monero.moneroCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Monero stagenet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "monero_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "monero_requestAccounts" }, network);
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
        method: "monero_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "monero_signMessage", params }, network);
            return signature;
        }
    })
}


async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid Monero destionation address: ", "5At99HgbLsS5BDQemqiYQ8TZDVRNmocrqfsNYZDiYdd58AQ35d7yF7NVfPGeeu89VHV2MtfUz1qbB9EGKkQTiXq9VEqTVYU");
    const params = {
        account: accounts[0],
        recipients: [{
            address: recipient || "5At99HgbLsS5BDQemqiYQ8TZDVRNmocrqfsNYZDiYdd58AQ35d7yF7NVfPGeeu89VHV2MtfUz1qbB9EGKkQTiXq9VEqTVYU",
            amount: "10000000"
        }]
    };
    await utils.runMethod({
        method: "monero_signAndSendTransaction",
        asyncFunc: async function name() {
            const response = await provider.request({ method: "monero_signAndSendTransaction", params }, network);
            return response;
        }
    })
}

const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    monero: {
        connect: connect,
        signMessage: signMessage,
        signAndSendTransaction: signAndSendTransaction,
        requestAccounts: requestAccounts
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
