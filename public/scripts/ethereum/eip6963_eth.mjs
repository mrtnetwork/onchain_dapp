import { getEIP6963Wallet } from '../utils/ws.mjs'
import * as utils from '../utils/utils.mjs';
import { ethereum } from '../constants/constants.mjs'
const network = ethereum.eip155WsTestnetNetwrk;
async function connect() {
  const provider = await getEIP6963Wallet();
  const params = [network];
  const accounts = await provider.request({ method: "eth_requestAccounts", params });
  if (accounts.length === 0) {
    throw new Error(`No approved accounts found for network "${network} (Ethereum Sepolia testnet)". Please connect an account in your wallet.`);
  }
  return { provider, accounts };
}


async function personalSign() {
  const { accounts, provider } = await connect();
  const message = prompt("Please enter a message you want to sign: ", "is a test message.");
  const params = [message || "is a test message.", accounts[0]];
  await utils.runMethod({
    method: "personal_sign",
    asyncFunc: async function name() {
      const signature = await provider.request({ method: "personal_sign", params });
      return signature;
    }
  })
}
async function ethSign() {
  const { accounts, provider } = await connect();
  const message = prompt("Please enter a message you want to sign: ", "is a test message.");
  const params = [accounts[0], message || "is a test message."];
  await utils.runMethod({
    method: "eth_sign",
    asyncFunc: async function name() {
      const signature = await provider.request({ method: "eth_sign", params });
      return signature;
    }
  })
}
async function requestAccounts() {
  const { provider } = await connect();
  await utils.runMethod({
    method: "eth_requestAccounts",
    asyncFunc: async function name() {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      return accounts;
    }
  })
}
async function signTypedDataV1() {
  const { accounts, provider } = await connect();
  const params = [JSON.stringify(ethereum.ethereumExapleTypedDataV1), accounts[0]];
  await utils.runMethod({
    method: "eth_signTypedData",
    asyncFunc: async function name() {
      const signature = await provider.request({ method: "eth_signTypedData", params });
      return signature;
    }
  })
}
async function signTypedDataV4() {
  const { accounts, provider } = await connect();
  const params = [accounts[0], ethereum.ethereumExapleTypedDataV4];
  await utils.runMethod({
    method: "eth_signTypedData_v4",
    asyncFunc: async function name() {
      const signature = await provider.request({ method: "eth_signTypedData_v4", params });
      return signature;
    }
  })
}
async function importNewEthereumChain() {
  const { provider } = await connect();
  const params = [ethereum.ethereumNewChainExapleParams];
  await utils.runMethod({
    method: "wallet_addEthereumChain",
    asyncFunc: async function name() {
      const chainId = await provider.request({ method: "wallet_addEthereumChain", params });
      return chainId;
    }
  })
}
async function sendTransaction() {
  const { accounts, provider } = await connect();
  const input = prompt("Please enter a valid destionation address: ", "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2");
  const txParams = { to: input, from: accounts[0], data: "0x", value: "0x01", type: "0x2" }
  const params = [txParams];
  await utils.runMethod({
    method: "eth_sendTransaction",
    asyncFunc: async function name() {
      const txId = await provider.request({ method: "eth_sendTransaction", params });
      return txId;
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
async function listeonOnMessage() {
  const { provider } = await connect();
  provider.on("message", function (s) {
    console.log("accounts changed: " + JSON.stringify(s));

  });
}

async function subscribe() {
  const { provider } = await connect();
  const params = ["newHeads"];
  await utils.runMethod({
    method: "eth_subscribe",
    asyncFunc: async function name() {
      const subId = await provider.request({ method: "eth_subscribe", params });
      return subId;
    }
  })
}
async function getBalance() {
  const { accounts, provider } = await connect();
  const params = [accounts[0], "latest"];
  await utils.runMethod({
    method: "eth_getBalance",
    asyncFunc: async function name() {
      const balance = await provider.request({ method: "eth_getBalance", params });
      return balance;
    }
  })
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
  ethereum: {
    connect: connect,
    personalSign: personalSign,
    ethSign: ethSign,
    signTypedDataV1: signTypedDataV1,
    signTypedDataV4: signTypedDataV4,
    importNewEthereumChain: importNewEthereumChain,
    sendTransaction: sendTransaction,
    requestAccount: requestAccounts,
    listenOnChainChanged: listenOnChainChanged,
    listenOnAccountChanged: listenOnAccountChanged,
    listeonOnMessage: listeonOnMessage,
    disconnect: disconnect,
    subscribe: subscribe,
    getBalance: getBalance
  }
};
window.onChainDapp = {
  ...(window.onChainDapp || {}),
  ...onChain
};

