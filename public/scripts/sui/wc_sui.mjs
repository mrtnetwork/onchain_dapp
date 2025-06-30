import * as wc from '../utils/wc.mjs';
import { sui } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer } from '../sui/sui_utils.mjs';
const network = sui.suiTestnetNetwork;
async function connect() {
    const { session, provider } = await wc.initWalletConnect(sui.suiCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Sui testnet)". Please connect an account in your wallet.`);
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
        method: "sui_signMessage",
        asyncFunc: async function name() {
            const { messageBytes, signature } = await provider.request({ method: "sui_signMessage", params }, network);
            return signature;
        }
    })
}

async function signTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid sui destionation address: ", "0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a");
    const transaction = await createTransfer(accounts[0], recipient);
    const params = { transaction, account: accounts[0], chain: network };
    await utils.runMethod({
        method: "sui_signTransaction",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "sui_signTransaction", params }, network);
            return signature;
        }
    })
}
async function signAndExcuteTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid sui destionation address: ", "0x4637f89fdf75bf020b2f00a5dedeb6a405728c6062d44ed9c816f5683dd0f72a");
    const transaction = await createTransfer(accounts[0], recipient);
    const params = { transaction, account: accounts[0], chain: network };
    await utils.runMethod({
        method: "sui_signAndExecuteTransaction",
        asyncFunc: async function name() {
            const { digest } = await provider.request({ method: "sui_signAndExecuteTransaction", params }, network);
            return digest;
        }
    })
}


const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    sui: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndExcuteTransaction: signAndExcuteTransaction
    }
};
window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
