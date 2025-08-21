import * as wc from '../utils/wc.mjs';
import { xrp } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransfer, submitTx, createMintNFT } from '../ripple/ripple_utils.mjs'
const network = xrp.xrpWsTestnetNetwork;
async function connect() {
    const { session, provider } = await wc.initWalletConnect(xrp.xrpCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (XRP testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "xrpl_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "xrpl_requestAccounts" }, network);
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
        method: "xrpl_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "xrpl_signMessage", params }, network);
            return signature;
        }
    })
}
async function signTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid XRP destionation address: ", "rp1HToegsb2QMBDkhpz6rdfaArfKCj7PK8");
    let transaction = await createTransfer(accounts[0], recipient);
    const params = { transaction, account: accounts[0] };
    await utils.runMethod({
        method: "xrpl_signTransaction",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "xrpl_signTransaction", params }, network);
            const tx = await submitTx(result);
            if (tx.result.engine_result !== "tesSUCCESS") {
                throw Error(tx.result.engine_result)
            }
            return tx.result.tx_json.hash;
        }
    })

}
async function signMintNftTransaction() {
    const { accounts, provider } = await connect();
    let transaction = await createMintNFT(accounts[0]);
    transaction.Fee = 0
    const params = { transaction, account: accounts[0] };
    await utils.runMethod({
        method: "xrpl_signTransaction",
        asyncFunc: async function name() {
            const result = await provider.request({ method: "xrpl_signTransaction", params }, network);
            const tx = await submitTx(result);
            if (tx.result.engine_result !== "tesSUCCESS") {
                throw Error(tx.result.engine_result)
            }
            return tx.result.tx_json.hash;
        }
    })

}
async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipient = prompt("Please enter a valid XRP destionation address: ", "rp1HToegsb2QMBDkhpz6rdfaArfKCj7PK8");
    let transaction = await createTransfer(accounts[0], recipient || "rp1HToegsb2QMBDkhpz6rdfaArfKCj7PK8");
    const params = { transaction, account: accounts[0] };
    await utils.runMethod({
        method: "xrpl_signAndSendTransaction",
        asyncFunc: async function name() {
            const { txId } = await provider.request({ method: "xrpl_signAndSendTransaction", params }, network);
            return txId;
        }
    })
}


const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    xrpl: {
        connect: connect,
        signMessage: signMessage,
        signTransaction: signTransaction,
        signAndSendTransaction: signAndSendTransaction,
        signMintNftTransaction: signMintNftTransaction,
        requestAccounts: requestAccounts,
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
