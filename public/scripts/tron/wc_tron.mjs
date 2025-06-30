import * as wc from '../utils/wc.mjs';
import { tron } from '../constants/constants.mjs'
import { broadcastTx, buildTransfer } from "./tron_utils.mjs"
import * as utils from '../utils/utils.mjs';
const network = tron.tronShastaNetwork
async function connect() {
    const { session, provider } = await wc.initWalletConnect(tron.tronCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Tron Shasta testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
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
            const { transaction, result } = await provider.request({ method: "tron_signTransaction", params }, network);
            return result.signature;
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
            const { transaction } = await provider.request({ method: "tron_signTransaction", params }, network);
            return transaction.signature;
        }, showAlert: false
    });
    transaction.signature = signature
    const { txid } = await broadcastTx(transaction);
    alert(`TxID: ${txid}`);
}
async function signMessage() {
    const { accounts, provider } = await connect();
    const params = { address: accounts[0], message: Buffer.from("this is a test.", "utf8").toString("hex") };
    await utils.runMethod({
        method: "tron_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "tron_signMessage", params }, network);
            return signature;
        }
    })
}

const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    tron: {
        connect: connect,
        signMessage: signMessage,
        transfer: transfer,
        signAndSendTransfer: signAndSendTransfer
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
