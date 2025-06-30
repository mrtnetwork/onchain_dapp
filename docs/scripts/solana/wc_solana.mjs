import * as wc from '../utils/wc.mjs';
import { solana } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransferV0, createTransferLegacy } from '../solana/solana_utils.mjs';
const network = solana.solanaDevnetNetwork
async function connect() {
    const { session, provider } = await wc.initWalletConnect(solana.solanaCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Solana devnet)". Please connect an account in your wallet.`);
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
        method: "solana_signMessage",
        asyncFunc: async function name() {
            const { signature, signedMessage } = await provider.request({ method: "solana_signMessage", params }, network);
            return signature;
        }
    })
}
async function signInMessage() {
    const { accounts, provider } = await connect();
    const now = new Date();
    const exp = new Date();
    exp.setDate(exp.getDate() + 30);
    const currentDateTime = now.toISOString();
    const expirationTime = exp.toISOString();
    const params = {
        domain: "localhost:3000",
        statement: "Sign-in to connect!",
        uri: "wss://localhost:3000/",
        version: "1",
        nonce: "oBbLoEldZs123123",
        expirationTime: expirationTime,
        address: accounts[0],
        requestId: '12312312',
        notBefore: currentDateTime,
        issuedAt: currentDateTime,
        resources: []
    }
    await utils.runMethod({
        method: "solana_signIn",
        asyncFunc: async function name() {
            const { signature, signedMessage } = await provider.request({ method: "solana_signIn", params }, network);
            return signature;
        }
    })

}

async function signTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
    };
    const recipient = prompt("Please enter a valid solana destionation address: ", "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    const transaction = await createTransferV0(accounts[0], recipient)
    const params = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signTransaction",
        asyncFunc: async function name() {
            const { signature, signedTransaction } = await provider.request({ method: "solana_signTransaction", params }, network);
            return signature;
        }
    })
}

async function signAllTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
    };
    let params = [];
    for (let i = 0; i < 2; i++) {
        const recipient = prompt(`Please enter a valid solana destionation address for transaction ${i}: `, "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        const signer = accounts.length > 1 ? accounts[i] : accounts[0];
        const transaction = await createTransferV0(signer, recipient)
        const param = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: signer }
        params.push(param);
    }
    await utils.runMethod({
        method: "solana_signAllTransactions",
        asyncFunc: async function name() {
            const signatures = await provider.request({ method: "solana_signAllTransactions", params }, network);
            return JSON.stringify(signatures.map(e => e.signature));
        }
    })
}


async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
        commitment: 'processed'
    };
    const recipient = prompt("Please enter a valid solana destionation address: ", "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    const transaction = await createTransferV0(accounts[0], recipient)
    const params = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signAndSendTransaction",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "solana_signAndSendTransaction", params }, network);
            return signature;
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "solana_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "solana_requestAccounts" }, network);
            return accounts;
        }
    })
}

async function signAndSendLegacyTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
        commitment: 'processed'
    };
    const recipient = prompt("Please enter a valid solana destionation address: ", "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    const transaction = await createTransferLegacy(accounts[0], recipient)
    const params = { transaction: Buffer.from(transaction.serialize({ verifySignatures: false })).toString("base64"), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signAndSendTransaction",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "solana_signAndSendTransaction", params }, network);
            return signature;
        }
    })
}



const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    solana: {
        connect: connect,
        signMessage: signMessage,
        signInMessage: signInMessage,
        signAllTransaction: signAllTransaction,
        signAndSendTransaction: signAndSendTransaction,
        signAndSendLegacyTransaction: signAndSendLegacyTransaction,
        signTransaction: signTransaction,
        requestAccounts: requestAccounts,
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
