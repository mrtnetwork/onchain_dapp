import { getWallet } from '../utils/ws.mjs'
import { zcash } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { customPrompt, askAddressWithProtocols } from './ui.mjs'
const network = zcash.zcashWsRegtestNetwork;
async function connect() {
    const provider = await getWallet();
    let { accounts } = await provider.features["zcash:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Ripple testnet)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "zcash_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["zcash:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const message = prompt("Please enter a message you want to sign: ", "is a test message.");
    const params = {
        'message': message || 'is a test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "zcash_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["zcash:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("hex").toUpperCase();
        }
    })
}


async function signAndSendTransaction() {
    const { accounts, provider } = await connect();
    const recipientWithProtocol = await askAddressWithProtocols(defaultAddr
    );
    const protocol = recipientWithProtocol?.protocol;
    let shieldMemo = null
    let isShield = protocol === "orchard" || protocol === "sapling";
    if (isShield) {
        shieldMemo = await customPrompt("Shield MEMO :-)", "Please enter memo: ");
        if (shieldMemo != null) {
            shieldMemo = Buffer.from(shieldMemo, 'utf-8').toString('hex')
        }
    }

    const params = {
        account: accounts,
        privacy: "shielded_only",
        recipients: [{
            address: recipientWithProtocol?.address || defaultAddr,
            amount: "10000000",
            protocol: recipientWithProtocol?.protocol || "orchard",
            memo: shieldMemo
        }]
    };
    await utils.runMethod({
        method: "zcash_payment",
        asyncFunc: async function name() {
            const response = await provider.features["zcash:payment"].payment(params);
            return response;
        }
    })
}
// async function signAndSendTransaction() {
//     const { accounts, provider } = await connect();
//     const recipient = prompt("Please enter a valid Monero destionation address: ", "5At99HgbLsS5BDQemqiYQ8TZDVRNmocrqfsNYZDiYdd58AQ35d7yF7NVfPGeeu89VHV2MtfUz1qbB9EGKkQTiXq9VEqTVYU");
//     const params = {
//         account: accounts[0],
//         recipients: [{
//             address: recipient || "5At99HgbLsS5BDQemqiYQ8TZDVRNmocrqfsNYZDiYdd58AQ35d7yF7NVfPGeeu89VHV2MtfUz1qbB9EGKkQTiXq9VEqTVYU",
//             amount: "10000000"
//         }]
//     };
//     await utils.runMethod({
//         method: "zcash_signAndSendTransaction",
//         asyncFunc: async function name() {
//             const response = await provider.features["zcash:signAndSendTransaction"].signAndSendTransaction(params);
//             return response;
//         }
//     })
// }
async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["zcash:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["zcash:events"].on("change", function name({ accounts, chains }) {
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
    zcash: {
        connect: connect,
        signMessage: signMessage,
        signAndSendTransaction: signAndSendTransaction,
        requestAccounts: requestAccounts,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
