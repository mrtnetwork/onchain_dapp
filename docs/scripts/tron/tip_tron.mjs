import { getTipWallet } from '../utils/ws.mjs'
import { tron } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { broadcastTx, buildTransfer } from "./tron_utils.mjs"
const network = tron.tronWsShastaNetwork;
async function connect() {
  const provider = getTipWallet();
  const params = [network];
  const accounts = await provider.request({ method: "tron_requestAccounts", params });
  console.log("accounts: " + JSON.stringify(accounts));
  if (accounts.length === 0) {
    throw new Error(`No approved accounts found for network "${network} (Tron shasta testnet)". Please connect an account in your wallet.`);
  }
  return { provider, accounts };
}


async function signMessage() {
  const { accounts, provider } = await connect();
  const message = prompt("Please enter a message you want to sign: ", "is a test message.");

  const params = {
    'message': message || "is a test message.",
    'account': accounts[0]
  };
  await utils.runMethod({
    method: "tron_signMessage",
    asyncFunc: async function name() {
      const signature = await provider.request({ method: "tron_signMessage", params });
      return signature;
    }
  })
}


async function transfer() {
  const { accounts, provider } = await connect();
  const input = prompt("Please enter a valid destionation address: ", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  const transaction = await buildTransfer({ account: accounts[0], input });
  console.log("tx: " + JSON.stringify(transaction))
  const params = [transaction]
  await utils.runMethod({
    method: "tron_signTransaction",
    asyncFunc: async function name() {
      const transaction = await provider.request({ method: "tron_signTransaction", params });
      return transaction.signature;
    }
  })
}
async function signAndSendTransfer() {
  const { accounts, provider } = await connect();
  const input = prompt("Please enter a valid destionation address: ", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  const transaction = await buildTransfer({ account: accounts[0], input })
  const params = [transaction]
  const signatures = await utils.runMethod({
    method: "tron_signTransaction",
    asyncFunc: async function name() {
      const transaction = await provider.request({ method: "tron_signTransaction", params });
      return transaction.signature;
    }, showAlert: false
  });
  transaction.signature = signatures;
  const { txid } = await broadcastTx(transaction);
  console.log(txid);
  alert(`TxID: ${txid}`);
}


async function transferUsingTronWeb() {
  const { accounts, provider } = await connect();
  const input = prompt("Please enter a valid destionation address: ", "TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL");
  const transaction = await buildTransfer({ account: accounts[0], input })
  const signedTransaction = await utils.runMethod({
    method: "tron_signTransaction",
    showAlert: false,
    asyncFunc: async function name() {
      const signedTransaction = await provider.tronWeb.trx.sign(transaction);
      return signedTransaction;
    }
  })
  const { txid } = await broadcastTx(signedTransaction);
  console.log(txid);
  alert(`TxID: ${txid}`);
}

async function signMessageUsingTronWeb() {
  const { provider } = await connect();
  const message = prompt("Please enter a message you want to sign: ", "is a test message.");

  await utils.runMethod({
    method: "tron_signMessage",
    asyncFunc: async function name() {
      const signature = await provider.tronWeb.trx.signMessageV2(message);
      return signature;
    }
  })
}

async function switchNetwork() {
  const { provider } = await connect();
  const params = { chainId: 728126428 }
  await utils.runMethod({
    method: "wallet_switchTronChain",
    asyncFunc: async function name() {
      const chainId = await provider.request({ method: "wallet_switchTronChain", params: [params] });
      return chainId;
    }
  })
}
async function listenOnChainChanged() {
  const { provider } = await connect();
  provider.on("chainChanged", function (s) {
    console.log("chain changed: " + JSON.stringify(s));

  });
}

async function listenOnAccountChanged() {
  const { provider } = await connect();
  provider.on("accountsChanged", function (s) {
    console.log("accounts changed: " + JSON.stringify(s));

  });
}
async function disconnect() {
  const { provider } = await connect();
  await utils.runMethod({
    method: "disconnect",
    asyncFunc: async function name() {
      const disconnect = await provider.disconnect();
      return disconnect;
    }
  })
}



const onChain = {
  tron: {
    connect: connect,
    signMessage: signMessage,
    transfer: transfer,
    signAndSendTransfer: signAndSendTransfer,
    transferUsingTronWeb: transferUsingTronWeb,
    signMessageUsingTronWeb: signMessageUsingTronWeb,
    switchNetwork: switchNetwork,
    listenOnChainChanged: listenOnChainChanged,
    listenOnAccountChanged: listenOnAccountChanged,
    disconnect: disconnect
  }
};

window.onChainDapp = {
  ...(window.onChainDapp || {}),
  ...onChain
};
