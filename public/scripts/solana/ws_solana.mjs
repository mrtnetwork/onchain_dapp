import { getWallet } from '../utils/ws.mjs'
import { solana } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransferV0, createTransferLegacy } from '../solana/solana_utils.mjs';
const network = solana.solanaWsDevnetNetwork;
async function connect() {
    const provider = await getWallet();
    let { accounts } = await provider.features["solana:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Solana devnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = {
        'message': Buffer.from(message || "is a test message.", "utf-8").toString("hex"),
        'account': accounts[0].address
    };
    await utils.runMethod({
        method: "solana_signMessage",
        asyncFunc: async function name() {
            const [{ signature }] = await provider.features["solana:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex");
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
            const [{ signature }] = await provider.features["solana:signIn"].signIn(params);
            return Buffer.from(signature).toString("hex");
        }
    })

}


async function signTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
    };
    const recipient = prompt("Please enter a valid solana destionation address: ", "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
    const transaction = await createTransferV0(accounts[0].address, recipient)
    const params = { transaction:Buffer.from(transaction.serialize()), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signTransaction",
        asyncFunc: async function name() {
            const [{ signedTransaction }] = await provider.features["solana:signTransaction"].signTransaction(params);
            return Buffer.from(signedTransaction).toString("hex");
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
        const transaction = await createTransferV0(signer.address, recipient)
        const param = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: signer }
        params.push(param);
    }
    await utils.runMethod({
        method: "solana_signAllTransactions",
        asyncFunc: async function name() {
            const signedTransactions = await provider.features["solana:signAllTransactions"].signAllTransactions(params);
            return JSON.stringify(signedTransactions.map(e => Buffer.from(e.signedTransaction).toString("base64")));
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
    const transaction = await createTransferV0(accounts[0].address, recipient)
    const params = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signAndSendTransaction",
        asyncFunc: async function name() {
            const [{ signature }] = await provider.features["solana:signAndSendTransaction"].signAndSendTransaction(params);
            return Buffer.from(signature).toString("base64");
        }
    })
}


async function signAndSendAllTransaction() {
    const { accounts, provider } = await connect();
    const options = {
        preflightCommitment: 'processed',
    };
    let params = [];
    for (let i = 0; i < 2; i++) {
        const recipient = prompt(`Please enter a valid solana destionation address for transaction ${i}: `, "GVes3m3fpzePkj6i3wweTJQveBgJbkcJVE1JixjinCEb");
        const signer = accounts.length > 1 ? accounts[i] : accounts[0];
        const transaction = await createTransferV0(signer.address, recipient)
        const param = { transaction: Buffer.from(transaction.serialize()).toString("base64"), options, account: signer }
        params.push(param);
    }
    const mode = { mode: "parallel" }
    params = [...params, mode]
    await utils.runMethod({
        method: "solana_signAndSendAllTransactions",
        asyncFunc: async function name() {
            const signatures = await provider.features["solana:signAndSendAllTransactions"].signAndSendAllTransactions(params);
            return JSON.stringify(signatures.map(e => Buffer.from(e.signature).toString("base64")));
        }
    })
}

async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "solana_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["solana:connect"].connect();
            return accounts.map(e => e.address);
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
    const transaction = await createTransferLegacy(accounts[0].address, recipient)
    const params = { transaction: Buffer.from(transaction.serialize({ verifySignatures: false })).toString("base64"), options, account: accounts[0] }
    await utils.runMethod({
        method: "solana_signAndSendTransaction",
        asyncFunc: async function name() {
            const [{ signature }] = await provider.features["solana:signAndSendTransaction"].signAndSendTransaction(params);
            return Buffer.from(signature).toString("base64");
        }
    })
}

async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["solana:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["solana:events"].on("change", function name({ accounts, chains }) {
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
    solana: {
        connect: connect,
        signMessage: signMessage,
        signInMessage: signInMessage,
        signAllTransaction: signAllTransaction,
        signAndSendTransaction: signAndSendTransaction,
        signAndSendLegacyTransaction: signAndSendLegacyTransaction,
        signTransaction: signTransaction,
        requestAccounts: requestAccounts,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges,
        signAndSendAllTransaction: signAndSendAllTransaction
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
