import * as wc from '../utils/wc.mjs';
import { cosmos } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { createTransaction } from '../cosmos/cosmos_utils.mjs';

const network = cosmos.cosmosTestnetProvider
async function connect() {
    const { session, provider } = await wc.initWalletConnect(cosmos.cosmosCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    console.log("accounts: " + JSON.stringify(accounts));
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (Cosmos ics provider testnet)". Please connect an account in your wallet.`);
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
            const { signature } = await provider.request({ method: "cosmos_signMessage", params }, network);
            return signature;
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
            const imported = await provider.request({ method: "wallet_addCosmosChain", params }, network);
            return imported;
        }
    })
}




async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "cosmos_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "cosmos_requestAccounts" }, network);
            return accounts;
        }
    })
}



async function signDirectTransaction() {
    const { accounts, provider } = await connect();
    const directSigner = {
        getAccounts: async function getAccounts() {
            const accounts = await provider.request({ method: "cosmos_requestAccounts" }, network);
            return accounts.map(function r(e) {
                let r = { ...e }
                r["pubkey"] = Buffer.from(e["pubkey"].substring(2), "hex")
                return r
            });
        },
        signDirect: async function signDirect(signerAddress, signDoc) {
            const params = {
                signerAddress: signerAddress,
                signDoc: {
                    bodyBytes: Buffer.from(signDoc.bodyBytes).toString("base64"),
                    authInfoBytes: Buffer.from(signDoc.authInfoBytes).toString("base64"),
                    accountNumber: `0x${signDoc.accountNumber.toString(16)}`
                },
                chainId: "provider"
            };
            const { signed, signature } = await provider.request({ method: "cosmos_signTransactionDirect", params }, network);
            return {
                signed: {
                    bodyBytes: Buffer.from(signed.bodyBytes, "base64"),
                    authInfoBytes: Buffer.from(signed.authInfoBytes, "base64"),
                    chainId: signed.chainId,
                    accountNumber: signed.accountNumber
                },
                signature
            };
        },
        chainId: "provider"
    }
    const recipient = prompt("Please enter a valid cosmos destionation address: ", "cosmos1xqgp3dapjh98cvuwdzsc9sgxppgtsuzf2lqure");
    await utils.runMethod({
        method: "cosmos_signTransactionDirect",
        asyncFunc: async function name() {
            const tx = await createTransaction(directSigner, recipient);
            console.log("sig: " + JSON.stringify(tx, (_, v) => typeof v === 'bigint' ? v.toString() : v))
            return tx.transactionHash;
        }
    })


}

async function signAminoTransaction() {
    const { provider } = await connect();
    const aminoSigner = {
        getAccounts: async function getAccounts() {
            const accounts = await provider.request({ method: "cosmos_requestAccounts" }, network);
            return accounts.map(function r(e) {
                let r = { ...e }
                r["pubkey"] = Buffer.from(e["pubkey"].substring(2), "hex")
                return r
            });
        },
        signAmino: async function signAmino(signerAddress, signDoc) {
            const params = {
                "signerAddress": signerAddress,
                "signDoc": signDoc,
                "chainId": "provider"
            };
            return await provider.request({ method: "cosmos_signTransactionAmino", params }, network);
        },
        chainId: "provider"
    }
    const recipient = prompt("Please enter a valid cosmos destionation address: ", "cosmos1xqgp3dapjh98cvuwdzsc9sgxppgtsuzf2lqure");
    await utils.runMethod({
        method: "cosmos_signTransactionAmino",
        asyncFunc: async function name() {
            const tx = await createTransaction(aminoSigner, recipient);
            return tx.transactionHash;
        }
    })


}
const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    cosmos: {
        connect: connect,
        signMessage: signMessage,
        requestAccounts: requestAccounts,
        signDirectTransaction: signDirectTransaction,
        signAminoTransaction: signAminoTransaction,
        addNewChain: addNewChain
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
