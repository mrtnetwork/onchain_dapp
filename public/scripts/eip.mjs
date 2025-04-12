let _wallet;
function createCompleter() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
function appIsReady(params) {
  const event = new CustomEvent('eip6963:requestProvider', {
    detail: {
    }
  });
  window.dispatchEvent(event);

}

async function getEIP6963Wallet() {
  if (_wallet) return _wallet;
  const completer = createCompleter();
  window.addEventListener("eip6963:announceProvider", function s(e) {
    if (e.detail !== undefined && e.detail.provider !== undefined && e.detail.provider) {
      completer.resolve(e.detail.provider)
    }
  });
  appIsReady();
  _wallet = await completer.promise;
  return _wallet;

}

async function connect() {
  const wallet = await getEIP6963Wallet()
  const accounts = await wallet.request({ method: "eth_requestAccounts" });
  console.log("accounts: " + accounts[0])
  return { wallet, accounts }

}

const typedDataV1 = [
  {
    type: 'string',
    name: 'Message',
    value: 'Hi, Alice!'
  },
  {
    type: 'uint32',
    name: 'A number',
    value: '1337'
  }
];

const typedDataV4 = {
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 97,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
};

async function requestTypedDataV1Object() {
  const { wallet, accounts } = await connect();
  const data = {
    method: "eth_signTypedData",
    params: [typedDataV1, accounts[0]],
  };
  const signature = await wallet.request(data);
  console.log("signature: " + signature)
}

async function requestTypedDataV1String() {
  const { wallet, accounts } = await connect();
  const data = {
    method: "eth_signTypedData",
    params: [JSON.stringify(typedDataV1), accounts[0]],
  };
  const signature = await wallet.request(data);
  console.log("signature: " + signature)
}




async function requestTypedDataV4Object() {
  const { wallet, accounts } = await connect();
  const data = {
    method: "eth_signTypedData_v4",
    params: [accounts[0], typedDataV4],
  };
  const signature = await wallet.request(data);
  console.log("signature: " + signature)
}

async function requestTypedDataV4String() {
  const { wallet, accounts } = await connect();
  const data = {
    method: "eth_signTypedData_v4",
    params: [accounts[0], JSON.stringify(typedDataV4)],
  };
  const signature = await wallet.request(data);
  console.log("signature: " + signature)
}


async function requestPersonalSign() {
  const { wallet, accounts } = await connect();
  const data = {
    method: "personal_sign",
    params: ["0x0c0c0c", accounts[0]]
  };
  const signature = await wallet.request(data);
  console.log("signature: " + signature)
}

async function disconnect() {
  const { wallet } = await connect();
  await wallet.disconnect();
}


const tr2 = { to: "0x372cC9e4Fa8E834237e106235e26A2fb7E9082D2", data: "0x", value: "0x01", type: "0x2" }


async function sendTransactions() {
  const { wallet, accounts } = await connect();
  let transaction = tr2;
  transaction.from = accounts[0]
  const txId = await wallet.request({
    method: "eth_sendTransaction", params: [
      transaction
    ]
  });
  console.log("txId: " + txId)

}

async function switchChain() {
  const { wallet, _ } = await connect();
  const chainId = await wallet.request({
    method: "wallet_switchEthereumChain", params: [
      { chainId: "0x1" }
    ]
  });
  console.log("chainId: " + chainId)


}
async function addNewChain() {
  const { wallet, _ } = await connect();
  const params = { chainId: '0x138de', chainName: 'Berachain', nativeCurrency: { name: 'BERA Token', symbol: 'BERA', decimals: 18 }, rpcUrls: ['https://rpc.berachain.com', 'https://berachain.blockpi.network/v1/rpc/public', 'https://berachain-rpc.publicnode.com', 'https://berachain.drpc.org', 'wss://berachain.drpc.org', 'https://rpc.berachain-apis.com', 'wss://rpc.berachain-apis.com', 'wss://berachain-rpc.publicnode.com'], blockExplorerUrls: ['https://berascan.com'] };

  const chainId = await wallet.request({
    method: "wallet_addEthereumChain", params: [
      params
    ]
  });
  console.log("chainId: " + chainId)

}


async function subscribe() {
  const { wallet } = await connect();
  let result = await wallet.request({ method: "eth_subscribe", params: ["newHeads"] });
  console.log("subscribe: " + JSON.stringify(result));
}
async function listenOnEvents() {
  const { wallet } = await connect();
  wallet.on("accountsChanged", function (s) {
    console.log("Account changed in page: " + JSON.stringify(s));
    console.log("selected address: " + wallet.selectedAddress);
  });
  wallet.on("chainChanged", function (s) {
    console.log("chain changed in page: " + JSON.stringify(s));
  });
  wallet.on("message", function (s) {
    console.log("message in page: " + JSON.stringify(s));
  });
  wallet.on("connect", function (s) {
    console.log("connect in page: " + s.chainId);
  });
  wallet.on("disconnect", function (s) {
    console.log("disconnect in page: " + s);
  });
}
window.connect = connect
window.addNewChain = addNewChain
window.listenOnEvents = listenOnEvents
window.subscribe = subscribe
window.sendTransactions = sendTransactions
window.switchChain = switchChain
window.requestTypedDataV1Object = requestTypedDataV1Object
window.requestTypedDataV1String = requestTypedDataV1String
window.requestTypedDataV4Object = requestTypedDataV4Object
window.requestTypedDataV4String = requestTypedDataV4String
window.requestPersonalSign = requestPersonalSign
window.disconnect = disconnect