async function runMethod(method, asyncFunc) {
  try {
    const data = await asyncFunc();
    console.log('Response: ' + method + " " + data);
    return data;
  } catch (error) {
    console.error('Error occurred: ' + method + " " + JSON.stringify(error));
    throw error;
  }
}


async function _requestAccounts() {
  let accounts = await tron.request({ method: "tron_requestAccounts" });
  return accounts[0];
}

async function tronRequestAccount() {
  return await runMethod("tron_requestAccounts", _requestAccounts);
}

async function getTronWeb() {
  if (window.tron && window.tron.tronWeb) {
    console.log("Tronweb exists.")
    let res = await tronRequestAccount();
    return window.tron.tronWeb
  }
  console.log("TronWeb created.")
  return new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/'
  });
}

async function transferTrx() {
  return runMethod("transaction: ", async function () {
    let tronweb = await getTronWeb();
    const account = tronweb.defaultAddress?.base58;
    const transaction = await tronweb.transactionBuilder.sendTrx("TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL", 1, account);
    return await tronweb.trx.sign(transaction)
  })
}
async function createIssue() {
  return runMethod("transaction: ", async function () {
    try {
      let tronweb = await getTronWeb();
      const account = tronweb.defaultAddress?.base58;
      const now = Date.now() + 1 * 60 * 60 * 1000; // Current time in milliseconds
      const tomorrow = now + 24 * 60 * 60 * 1000;
      const trc_options = {
        name: "MRTNETWORK",
        abbreviation: "MRT",
        description: "MRT TEST TOKEN",
        url: "https://github.com/mrtnetwork",
        totalSupply: 10002220000,
        trxRatio: 1,
        tokenRatio: 1,
        saleStart: now,
        saleEnd: tomorrow,
        freeBandwidth: 0,
        freeBandwidthLimit: 0,
        frozenAmount: 0,
        frozenDuration: 0,
        precision: 6
      }
      const transaction = await tronweb.transactionBuilder.createAsset(
        trc_options,
        account
      )
      return await tronweb.trx.sign(transaction)
    } catch (e) {
      console.log(e);
    }

  })
}
async function sendTrc10() {
  return runMethod("TRC10: ", async function () {
    let tronweb = await getTronWeb();
    const to = "THEYs5NZFgi3ZQC7BQhk7mt4DjTVWGzzdJ";
    const account = tronweb.defaultAddress?.base58;
    const transaction = await tronweb.transactionBuilder.sendToken(to, 100, "1001470", account);
    return await tronweb.trx.sign(transaction)
  })
}
async function freezeBalanceV2() {
  return runMethod("freezeBalanceV2: ", async function () {
    let tronweb = await getTronWeb();
    const account = tronweb.defaultAddress?.base58;
    const transaction = await tronweb.transactionBuilder.freezeBalanceV2(100000000, undefined, account);
    return await tronweb.trx.sign(transaction)
  })
}
async function delegateResource() {
  return runMethod("delegateResource: ", async function () {
    let tronweb = await getTronWeb();
    const account = tronweb.defaultAddress?.base58;
    console.log(account)
    const transaction = await tronweb.transactionBuilder.delegateResource(10000000, "THEYs5NZFgi3ZQC7BQhk7mt4DjTVWGzzdJ", "BANDWIDTH", account, true, 86400);
    console.log(JSON.stringify(transaction))
    return await tronweb.trx.sign(transaction)
  })
}
async function accountPermission() {
  return runMethod("freezeBalanceV2: ", async function () {
    let tronweb = await getTronWeb();
    const ownerAddress = tronweb.defaultAddress?.base58;
    let ownerPermission = { type: 0, permission_name: 'owner' };
    ownerPermission.threshold = 2;
    ownerPermission.keys = [];

    let activePermission = { type: 2, permission_name: 'active0' };
    activePermission.threshold = 2;
    activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
    activePermission.keys = [];

    ownerPermission.keys.push({ address: 'TAj27qjHcEQ6VakRXgZ2k5NEqygobQYTAT', weight: 1 });
    ownerPermission.keys.push({ address: 'THEYs5NZFgi3ZQC7BQhk7mt4DjTVWGzzdJ', weight: 1 });
    activePermission.keys.push({ address: 'TAj27qjHcEQ6VakRXgZ2k5NEqygobQYTAT', weight: 1 });
    activePermission.keys.push({ address: 'THEYs5NZFgi3ZQC7BQhk7mt4DjTVWGzzdJ', weight: 1 });
    const transaction = await tronweb.transactionBuilder.updateAccountPermissions(ownerAddress, ownerPermission, null, [activePermission]);

    console.log(transaction)
    return await tronweb.trx.sign(transaction)
  })
}
async function createContract() {
  try {
    let tronweb = await getTronWeb();
    const contract = {
      "visible": false,
      "txID": "781d6d691a688299a083892dca9e75cd9b805a7efc5a451cad75cfd7e1785183",
      "raw_data_hex": "0a022a2322085666e6f903d22ce440f8abc1d698325ae827081e12e3270a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e437265617465536d617274436f6e747261637412ae270a1541084937b3f86ea7bbca86f2809809a65ed8a7ada91294270a1541084937b3f86ea7bbca86f2809809a65ed8a7ada91aae080a04300140030a481a08417070726f76616c2212080112056f776e65721a07616464726573732214080112077370656e6465721a07616464726573732210120576616c75651a0775696e7432353630030a4b1a144f776e6572736869705472616e73666572726564221a0801120d70726576696f75734f776e65721a07616464726573732215080112086e65774f776e65721a076164647265737330030a421a085472616e7366657222110801120466726f6d1a0761646472657373220f08011202746f1a07616464726573732210120576616c75651a0775696e7432353630030a401a09616c6c6f77616e6365221012056f776e65721a0761646472657373221212077370656e6465721a07616464726573732a091a0775696e74323536300240020a3c1a07617070726f7665221212077370656e6465721a076164647265737322111206616d6f756e741a0775696e743235362a061a04626f6f6c300240030a2e1a0962616c616e63654f66221212076163636f756e741a07616464726573732a091a0775696e74323536300240020a1d1a046275726e22111206616d6f756e741a0775696e74323536300240030a351a086275726e46726f6d221212076163636f756e741a076164647265737322111206616d6f756e741a0775696e74323536300240030a171a08646563696d616c732a071a0575696e7438300240020a4f1a116465637265617365416c6c6f77616e6365221212077370656e6465721a0761646472657373221a120f7375627472616374656456616c75651a0775696e743235362a061a04626f6f6c300240030a151a04667265652a091a0775696e74323536300240020a161a10667265654d696e7454686f7573616e64300240030a4a1a11696e637265617365416c6c6f77616e6365221212077370656e6465721a07616464726573732215120a616464656456616c75651a0775696e743235362a061a04626f6f6c300240030a2c1a046d696e74220d1202746f1a076164647265737322111206616d6f756e741a0775696e74323536300240030a141a046e616d652a081a06737472696e67300240020a161a056f776e65722a091a0761646472657373300240020a171a1172656e6f756e63654f776e657273686970300240030a161a0673796d626f6c2a081a06737472696e67300240020a1c1a0b746f74616c537570706c792a091a0775696e74323536300240020a381a087472616e73666572220d1202746f1a076164647265737322111206616d6f756e741a0775696e743235362a061a04626f6f6c300240030a4d1a0c7472616e7366657246726f6d220f120466726f6d1a0761646472657373220d1202746f1a076164647265737322111206616d6f756e741a0775696e743235362a061a04626f6f6c300240030a2c1a117472616e736665724f776e657273686970221312086e65774f776e65721a07616464726573733002400322be1e608060405234801562000010575f80fd5b50d380156200001d575f80fd5b50d280156200002a575f80fd5b506040805180820182526004808252631554d11560e21b60208084018290528451808601909552918452908301529060036200006783826200018e565b5060046200007682826200018e565b505050620000936200008d6200009960201b60201c565b6200009d565b62000256565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b634e487b7160e01b5f52604160045260245ffd5b600181811c908216806200011757607f821691505b6020821081036200013657634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111562000189575f81815260208120601f850160051c81016020861015620001645750805b601f850160051c820191505b81811015620001855782815560010162000170565b5050505b505050565b81516001600160401b03811115620001aa57620001aa620000ee565b620001c281620001bb845462000102565b846200013c565b602080601f831160018114620001f8575f8415620001e05750858301515b5f19600386901b1c1916600185901b17855562000185565b5f85815260208120601f198616915b82811015620002285788860151825594840194600190910190840162000207565b50858210156200024657878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b610cda80620002645f395ff3fe608060405234801561000f575f80fd5b50d3801561001b575f80fd5b50d28015610027575f80fd5b5060043610610134575f3560e01c806370a08231116100c1578063a457c2d711610086578063a457c2d714610262578063a9059cbb14610275578063dd62ed3e14610288578063f2fde38b1461029b578063f8fbdae1146102ae575f80fd5b806370a08231146101fc578063715018a61461022457806379cc67901461022c5780638da5cb5b1461023f57806395d89b411461025a575f80fd5b806323b872dd1161010757806323b872dd1461019f578063313ce567146101b257806339509351146101c157806340c10f19146101d457806342966c68146101e9575f80fd5b806306fdde0314610138578063095ea7b3146101565780631370128e1461017957806318160ddd14610197575b5f80fd5b6101406102b6565b60405161014d9190610b13565b60405180910390f35b610169610164366004610b84565b610346565b604051901515815260200161014d565b610189683635c9adc5dea0000081565b60405190815260200161014d565b600254610189565b6101696101ad366004610bac565b61035f565b6040516012815260200161014d565b6101696101cf366004610b84565b610382565b6101e76101e2366004610b84565b6103a3565b005b6101e76101f7366004610be5565b6103b9565b61018961020a366004610bfc565b6001600160a01b03165f9081526020819052604090205490565b6101e76103c6565b6101e761023a366004610b84565b6103d9565b6005546040516001600160a01b03909116815260200161014d565b6101406103ee565b610169610270366004610b84565b6103fd565b610169610283366004610b84565b61047c565b610189610296366004610c1c565b610489565b6101e76102a9366004610bfc565b6104b3565b6101e7610529565b6060600380546102c590610c4d565b80601f01602080910402602001604051908101604052809291908181526020018280546102f190610c4d565b801561033c5780601f106103135761010080835404028352916020019161033c565b820191905f5260205f20905b81548152906001019060200180831161031f57829003601f168201915b5050505050905090565b5f33610353818585610545565b60019150505b92915050565b5f3361036c858285610669565b6103778585856106e1565b506001949350505050565b5f336103538185856103948383610489565b61039e9190610c85565b610545565b6103ab610883565b6103b582826108dd565b5050565b6103c3338261099a565b50565b6103ce610883565b6103d75f610ac2565b565b6103e4823383610669565b6103b5828261099a565b6060600480546102c590610c4d565b5f338161040a8286610489565b90508381101561046f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103778286868403610545565b5f336103538185856106e1565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6104bb610883565b6001600160a01b0381166105205760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610466565b6103c381610ac2565b33610532575f80fd5b6103d733683635c9adc5dea000006108dd565b6001600160a01b0383166105a75760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610466565b6001600160a01b0382166106085760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610466565b6001600160a01b038381165f8181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b5f6106748484610489565b90505f1981146106db57818110156106ce5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610466565b6106db8484848403610545565b50505050565b6001600160a01b0383166107455760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610466565b6001600160a01b0382166107a75760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610466565b6001600160a01b0383165f908152602081905260409020548181101561081e5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610466565b6001600160a01b038481165f81815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36106db565b6005546001600160a01b031633146103d75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b6001600160a01b0382166109335760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610466565b8060025f8282546109449190610c85565b90915550506001600160a01b0382165f81815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6001600160a01b0382166109fa5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610466565b6001600160a01b0382165f9081526020819052604090205481811015610a6d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610466565b6001600160a01b0383165f818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910161065c565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f6020808352835180828501525f5b81811015610b3e57858101830151858201604001528201610b22565b505f604082860101526040601f19601f8301168501019250505092915050565b5f81356001600160a81b0381168114610b75575f80fd5b6001600160a01b031692915050565b5f8060408385031215610b95575f80fd5b610b9e83610b5e565b946020939093013593505050565b5f805f60608486031215610bbe575f80fd5b610bc784610b5e565b9250610bd560208501610b5e565b9150604084013590509250925092565b5f60208284031215610bf5575f80fd5b5035919050565b5f60208284031215610c0c575f80fd5b610c1582610b5e565b9392505050565b5f8060408385031215610c2d575f80fd5b610c3683610b5e565b9150610c4460208401610b5e565b90509250929050565b600181811c90821680610c6157607f821691505b602082108103610c7f57634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561035957634e487b7160e01b5f52601160045260245ffdfea26474726f6e58221220c69dcc55750134a7cd9ef3ff96be9baa5425fd6c339ad401a6045984b1cad62464736f6c634300081400333a04555344544080ade2047098d7bdd69832900180a8d6b907",
      "raw_data": {
        "contract": [
          {
            "parameter": {
              "value": {
                "owner_address": "41084937b3f86ea7bbca86f2809809a65ed8a7ada9",
                "new_contract": {
                  "abi": {
                    "entrys": [
                      {
                        "inputs": [],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                          }
                        ],
                        "name": "Approval",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "previousOwner",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                          }
                        ],
                        "name": "OwnershipTransferred",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                          }
                        ],
                        "name": "Transfer",
                        "type": "event"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                          },
                          {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                          }
                        ],
                        "name": "allowance",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "approve",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                          }
                        ],
                        "name": "balanceOf",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "burn",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "burnFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "decimals",
                        "outputs": [
                          {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                          }
                        ],
                        "name": "decreaseAllowance",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "free",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "freeMintThousand",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                          }
                        ],
                        "name": "increaseAllowance",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "mint",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "name",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "owner",
                        "outputs": [
                          {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "renounceOwnership",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "symbol",
                        "outputs": [
                          {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [
                          {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                          }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "transfer",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                          },
                          {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                          },
                          {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                          }
                        ],
                        "name": "transferFrom",
                        "outputs": [
                          {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                          }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "inputs": [
                          {
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                          }
                        ],
                        "name": "transferOwnership",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                      }
                    ]
                  },
                  "consume_user_resource_percent": 0,
                  "origin_energy_limit": 10000000,
                  "origin_address": "41084937b3f86ea7bbca86f2809809a65ed8a7ada9",
                  "bytecode": "608060405234801562000010575f80fd5b50d380156200001d575f80fd5b50d280156200002a575f80fd5b506040805180820182526004808252631554d11560e21b60208084018290528451808601909552918452908301529060036200006783826200018e565b5060046200007682826200018e565b505050620000936200008d6200009960201b60201c565b6200009d565b62000256565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b634e487b7160e01b5f52604160045260245ffd5b600181811c908216806200011757607f821691505b6020821081036200013657634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111562000189575f81815260208120601f850160051c81016020861015620001645750805b601f850160051c820191505b81811015620001855782815560010162000170565b5050505b505050565b81516001600160401b03811115620001aa57620001aa620000ee565b620001c281620001bb845462000102565b846200013c565b602080601f831160018114620001f8575f8415620001e05750858301515b5f19600386901b1c1916600185901b17855562000185565b5f85815260208120601f198616915b82811015620002285788860151825594840194600190910190840162000207565b50858210156200024657878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b610cda80620002645f395ff3fe608060405234801561000f575f80fd5b50d3801561001b575f80fd5b50d28015610027575f80fd5b5060043610610134575f3560e01c806370a08231116100c1578063a457c2d711610086578063a457c2d714610262578063a9059cbb14610275578063dd62ed3e14610288578063f2fde38b1461029b578063f8fbdae1146102ae575f80fd5b806370a08231146101fc578063715018a61461022457806379cc67901461022c5780638da5cb5b1461023f57806395d89b411461025a575f80fd5b806323b872dd1161010757806323b872dd1461019f578063313ce567146101b257806339509351146101c157806340c10f19146101d457806342966c68146101e9575f80fd5b806306fdde0314610138578063095ea7b3146101565780631370128e1461017957806318160ddd14610197575b5f80fd5b6101406102b6565b60405161014d9190610b13565b60405180910390f35b610169610164366004610b84565b610346565b604051901515815260200161014d565b610189683635c9adc5dea0000081565b60405190815260200161014d565b600254610189565b6101696101ad366004610bac565b61035f565b6040516012815260200161014d565b6101696101cf366004610b84565b610382565b6101e76101e2366004610b84565b6103a3565b005b6101e76101f7366004610be5565b6103b9565b61018961020a366004610bfc565b6001600160a01b03165f9081526020819052604090205490565b6101e76103c6565b6101e761023a366004610b84565b6103d9565b6005546040516001600160a01b03909116815260200161014d565b6101406103ee565b610169610270366004610b84565b6103fd565b610169610283366004610b84565b61047c565b610189610296366004610c1c565b610489565b6101e76102a9366004610bfc565b6104b3565b6101e7610529565b6060600380546102c590610c4d565b80601f01602080910402602001604051908101604052809291908181526020018280546102f190610c4d565b801561033c5780601f106103135761010080835404028352916020019161033c565b820191905f5260205f20905b81548152906001019060200180831161031f57829003601f168201915b5050505050905090565b5f33610353818585610545565b60019150505b92915050565b5f3361036c858285610669565b6103778585856106e1565b506001949350505050565b5f336103538185856103948383610489565b61039e9190610c85565b610545565b6103ab610883565b6103b582826108dd565b5050565b6103c3338261099a565b50565b6103ce610883565b6103d75f610ac2565b565b6103e4823383610669565b6103b5828261099a565b6060600480546102c590610c4d565b5f338161040a8286610489565b90508381101561046f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103778286868403610545565b5f336103538185856106e1565b6001600160a01b039182165f90815260016020908152604080832093909416825291909152205490565b6104bb610883565b6001600160a01b0381166105205760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610466565b6103c381610ac2565b33610532575f80fd5b6103d733683635c9adc5dea000006108dd565b6001600160a01b0383166105a75760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610466565b6001600160a01b0382166106085760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610466565b6001600160a01b038381165f8181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b5f6106748484610489565b90505f1981146106db57818110156106ce5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610466565b6106db8484848403610545565b50505050565b6001600160a01b0383166107455760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610466565b6001600160a01b0382166107a75760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610466565b6001600160a01b0383165f908152602081905260409020548181101561081e5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610466565b6001600160a01b038481165f81815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36106db565b6005546001600160a01b031633146103d75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610466565b6001600160a01b0382166109335760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610466565b8060025f8282546109449190610c85565b90915550506001600160a01b0382165f81815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6001600160a01b0382166109fa5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610466565b6001600160a01b0382165f9081526020819052604090205481811015610a6d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610466565b6001600160a01b0383165f818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910161065c565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f6020808352835180828501525f5b81811015610b3e57858101830151858201604001528201610b22565b505f604082860101526040601f19601f8301168501019250505092915050565b5f81356001600160a81b0381168114610b75575f80fd5b6001600160a01b031692915050565b5f8060408385031215610b95575f80fd5b610b9e83610b5e565b946020939093013593505050565b5f805f60608486031215610bbe575f80fd5b610bc784610b5e565b9250610bd560208501610b5e565b9150604084013590509250925092565b5f60208284031215610bf5575f80fd5b5035919050565b5f60208284031215610c0c575f80fd5b610c1582610b5e565b9392505050565b5f8060408385031215610c2d575f80fd5b610c3683610b5e565b9150610c4460208401610b5e565b90509250929050565b600181811c90821680610c6157607f821691505b602082108103610c7f57634e487b7160e01b5f52602260045260245ffd5b50919050565b8082018082111561035957634e487b7160e01b5f52601160045260245ffdfea26474726f6e58221220c69dcc55750134a7cd9ef3ff96be9baa5425fd6c339ad401a6045984b1cad62464736f6c63430008140033",
                  "name": "USDT"
                }
              },
              "type_url": "type.googleapis.com/protocol.CreateSmartContract"
            },
            "type": "CreateSmartContract"
          }
        ],
        "ref_block_bytes": "2a23",
        "ref_block_hash": "5666e6f903d22ce4",
        "expiration": 1724610795000,
        "timestamp": 1724610735000,
        "fee_limit": 2000000000
      },
      "contract_address": "41a5bc85e1220d48a885b1565db2c68d007632acce"
    }

    return await tronweb.trx.sign(contract);
  } catch (e) {
    console.log(e);
  }
}
async function triggerContract() {
  let tronweb = await getTronWeb();
  const transaction = { "visible": true, "txID": "1e909c66894965e187d9f0b84983abed2a47e39c03fe24d21ede4dc5da932c2e", "raw_data": { "contract": [{ "parameter": { "value": { "data": "a9059cbb0000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be400", "owner_address": "TAj27qjHcEQ6VakRXgZ2k5NEqygobQYTAT", "contract_address": "TR5YLWuKTThNWdCiGtKzV1Rz1oSH3pFjbX" }, "type_url": "type.googleapis.com/protocol.TriggerSmartContract" }, "type": "TriggerSmartContract" }], "ref_block_bytes": "59fb", "ref_block_hash": "51898b07af8e3521", "expiration": 1724647965000, "timestamp": 1724647906531 }, "raw_data_hex": "0a0259fb220851898b07af8e352140c8829ee898325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541084937b3f86ea7bbca86f2809809a65ed8a7ada9121541a5bc85e1220d48a885b1565db2c68d007632acce2244a9059cbb0000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be40070e3b99ae89832" };
  return await tronweb.trx.sign(transaction);
}
async function failedTriggerContract() {
  let tronweb = await getTronWeb();
  const transaction =
    { "visible": true, "txID": "a44cf50e3d468c38c17655c1e99110c9def6be394d81f310fef1fd1de257ca12", "raw_data": { "contract": [{ "parameter": { "value": { "data": "a9059cbb0000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be400", "token_id": 1001470, "owner_address": "TAj27qjHcEQ6VakRXgZ2k5NEqygobQYTAT", "call_token_value": 100000000, "contract_address": "TR5YLWuKTThNWdCiGtKzV1Rz1oSH3pFjbX", "call_value": 1000000 }, "type_url": "type.googleapis.com/protocol.TriggerSmartContract" }, "type": "TriggerSmartContract" }], "ref_block_bytes": "5ba8", "ref_block_hash": "23d90166ca5f06c1", "expiration": 1724649264000, "timestamp": 1724649206323 }, "raw_data_hex": "0a025ba8220823d90166ca5f06c14080a7ede898325abc01081f12b7010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e74726163741281010a1541084937b3f86ea7bbca86f2809809a65ed8a7ada9121541a5bc85e1220d48a885b1565db2c68d007632acce18c0843d2244a9059cbb0000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be4002880c2d72f30fe8f3d70b3e4e9e89832" };
  return await tronweb.trx.sign(transaction);
}
async function mint() {
  let tronweb = await getTronWeb();
  const transaction =
    { "ret": [{}], "visible": true, "txID": "092bc309d12df92a95b78c3c2fab16a2613b0f6ec160f1b9225b4075e8cb20a1", "raw_data": { "contract": [{ "parameter": { "value": { "data": "40c10f190000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be400", "owner_address": "TAj27qjHcEQ6VakRXgZ2k5NEqygobQYTAT", "contract_address": "TR5YLWuKTThNWdCiGtKzV1Rz1oSH3pFjbX" }, "type_url": "type.googleapis.com/protocol.TriggerSmartContract" }, "type": "TriggerSmartContract" }], "ref_block_bytes": "5ce6", "ref_block_hash": "2193fed5d0be4224", "expiration": 1724650230000, "timestamp": 1724650170500 }, "raw_data_hex": "0a025ce622082193fed5d0be422440f0a1a8e998325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541084937b3f86ea7bbca86f2809809a65ed8a7ada9121541a5bc85e1220d48a885b1565db2c68d007632acce224440c10f190000000000000000000000004fafb33f0e492fd10e91b55ed88872104ffd94ee00000000000000000000000000000000000000000000000000000002540be4007084d1a4e99832" };
  return await tronweb.trx.sign(transaction);
}
function listenOnEvent() {
  tron.on("accountsChanged", function (s) {
      console.log("accountsChange in page: " + s);
      console.log("default address: " + tron.tronWeb.defaultAddress?.base58)

  });
  tron.on("chainChanged", function (s) {
      console.log("chain changed in page: " + s);
  });


  tron.on("connect", function (s) {
      console.log("connect in page: " + s);
  });

  tron.on("disconnect", function (s) {
      console.log("disconnect in page: " + s);
  });
}
window.transferTrx = transferTrx
window.createIssue = createIssue
window.sendTrc10 = sendTrc10
window.createContract = createContract
window.triggerContract = triggerContract
window.failedTriggerContract = failedTriggerContract
window.mint = mint
window.freezeBalanceV2 = freezeBalanceV2
window.accountPermission = accountPermission
window.delegateResource = delegateResource
window.tronRequestAccount = tronRequestAccount
window.listenOnEvent = listenOnEvent