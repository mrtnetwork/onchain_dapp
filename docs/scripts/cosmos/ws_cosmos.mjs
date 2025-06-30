import { getWallet } from '../utils/ws.mjs'
import { cosmos } from '../constants/constants.mjs'
import { createTransaction } from '../cosmos/cosmos_utils.mjs';
import * as utils from '../utils/utils.mjs';
const network = cosmos.cosmosWsTestnetProvider;
async function connect() {
    const provider = await getWallet();
    console.log("provider");
    let { accounts } = await provider.features["cosmos:connect"].connect(network);
    accounts = accounts.filter(account => account.chains.includes(network));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Cosmos ICS Provider testnet)". Please connect an account in your wallet.`);
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
        method: "cosmos_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.features["cosmos:signMessage"].signMessage(params);
            return Buffer.from(signature).toString("base64");
        }
    })
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cosmos_requestAccounts",
        asyncFunc: async function name() {
            const { accounts } = await provider.features["cosmos:connect"].connect();
            return accounts.map(e => e.address);
        }
    })
}

async function signDirectTransaction() {
    const { provider } = await connect();
    const directSigner = {
        getAccounts: async function getAccounts() {
            const { accounts } = await provider.features["cosmos:connect"].connect();
            return accounts;
        },
        signDirect: async function signDirect(signerAddress, signDoc) {
            const params = {
                "signerAddress": signerAddress,
                "signDoc": signDoc,
                "chainId": "provider"
            };
            return await provider.features["cosmos:signTransactionDirect"].signTransactionDirect(params);
        },
        chainId: "provider"
    }
    const recipient = prompt("Please enter a valid cosmos destionation address: ", "cosmos1xqgp3dapjh98cvuwdzsc9sgxppgtsuzf2lqure");
    await utils.runMethod({
        method: "cosmos_signTransactionDirect",
        asyncFunc: async function name() {
            const { transactionHash } = await createTransaction(directSigner, recipient);
            return transactionHash;
        }
    })
}
async function signAminoTransaction() {
    const { provider } = await connect();
    const aminoSigner = {
        getAccounts: async function getAccounts() {
            const { accounts } = await provider.features["cosmos:connect"].connect();
            return accounts;
        },
        signAmino: async function signAmino(signerAddress, signDoc) {
            const params = {
                "signerAddress": signerAddress,
                "signDoc": signDoc,
                "chainId": "provider"
            };
            return await provider.features["cosmos:signTransactionAmino"].signTransactionAmino(params);
        },
        chainId: "provider"
    }
    const recipient = prompt("Please enter a valid cosmos destionation address: ", "cosmos1xqgp3dapjh98cvuwdzsc9sgxppgtsuzf2lqure");
    await utils.runMethod({
        method: "cosmos_signTransactionAmino",
        asyncFunc: async function name() {
            const { transactionHash } = await createTransaction(aminoSigner, recipient);
            return transactionHash;
        }
    })
}
async function addNewChain() {
    const { provider } = await connect();
    const params = {
        'rpc': "https://rpc.testcosmos.directory/nobletestnet",
        'chainId': "grand-1",
        "name": "name",
        "hrp": 'noble'
    };
    await utils.runMethod({
        method: "wallet_addCosmosChain",
        asyncFunc: async function name() {
            const imported = await provider.features["cosmos:addNewChain"].addNewChain(params);
            return imported;
        }
    })
}


async function disconnect() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "disconnect",
        asyncFunc: async function name() {
            const disconnect = await provider.features["cosmos:disconnect"].disconnect();
            return disconnect;
        }
    })
}

async function listenOnNetworkChanges() {
    const { provider } = await connect();
    await provider.features["cosmos:events"].on("change", function name({ accounts, chains }) {
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
    cosmos: {
        connect: connect,
        signMessage: signMessage,
        requestAccounts: requestAccounts,
        signDirectTransaction: signDirectTransaction,
        signAminoTransaction: signAminoTransaction,
        addNewChain: addNewChain,
        disconnect: disconnect,
        listenOnNetworkChanges: listenOnNetworkChanges,
        listenOnWalletChanges: listenOnWalletChanges
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
