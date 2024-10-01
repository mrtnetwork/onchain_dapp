function parseResult(walletResponse) {
    if (typeof walletResponse.error != "undefined") {
        console.error("id: " + walletResponse.id + " Error: " + JSON.stringify(walletResponse.error))
        throw walletResponse.error;
    }
    console.log("Id: " + walletResponse.id + " result: " + JSON.stringify(walletResponse.result));
    return walletResponse.result;
}


async function requestAccounts() {
    const result = parseResult(await ton.sendWalletRequest({ method: "ton_requestAccounts", id: "1" }));
    return result[0];
}

async function sendTransaction() {
    const account = await requestAccounts();
    console.log("account: "+account)
    const message = {
        "address": "Uf-g7zA_hWM9JDBpvDsk5DhHXPZEL7WgLHY7Pxl-ZRawt4T3",
        "amount": 0.1 * 1e9,
        "stateInit": null,
        "payload": null
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 60
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
}

async function sendTransactionWithUnknownPayload() {
    const account = await requestAccounts();
    const message = {
        "address": "Uf-g7zA_hWM9JDBpvDsk5DhHXPZEL7WgLHY7Pxl-ZRawt4T3",
        "amount": 0.1 * 1e9,
        "stateInit": null,
        "payload": "te6cckEBAgEAqgAB4Yn/wnEgwVxT1sNkvlwM3WCRlI1zFNtQRSjabKhr/X6bUqgGRkZX52B/gMH5H4y1SQXYarqoJ7QYPiAS2lhQg7ZjJXuvRpAXSOLWvz/shkwwrFxwgsG/952GdHS8LohdCTjgEU1NGLM21bPgAAAAWAAMAQBoQn/Qd5gfwrGekhg03h2SchwjrnsiF9rQFjsdn4y/MotYW6AvrwgAAAAAAAAAAAAAAAAAAI+1gcQ="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 60
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
}

async function transferJetton() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef8iIRyBQEQWmuGzULtLvjZagzj3xRspvjdo23yervm1byrH",
        "amount": 500000000,
        "stateInit": null,
        "payload": "te6cckEBAQEAWgAAsA+KfqUAAAAAAAAAAFAlQL5ACf9B3mB/CsZ6SGDTeHZJyHCOueyIX2tAWOx2fjL8yi1hbz/4TiQYK4p62GyXy4GbrBIyka5im2oIpRtNlQ1/r9NqVQcxLQDsZNYL"
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function multipleTransferJetton() {
    const account = await requestAccounts();
    const message = [
        {
            "address": "Ef8iIRyBQEQWmuGzULtLvjZagzj3xRspvjdo23yervm1byrH",
            "amount": 500000000,
            "stateInit": null,
            "payload": "te6cckEBAQEAWgAAsA+KfqUAAAAAAAAAAFAlQL5ACf9B3mB/CsZ6SGDTeHZJyHCOueyIX2tAWOx2fjL8yi1hbz/4TiQYK4p62GyXy4GbrBIyka5im2oIpRtNlQ1/r9NqVQcxLQDsZNYL"
        },
        {
            "address": "Ef8iIRyBQEQWmuGzULtLvjZagzj3xRspvjdo23yervm1byrH",
            "amount": 500000000,
            "stateInit": null,
            "payload": "te6cckEBAQEAWgAAsA+KfqUAAAAAAAAAAFAlQL5ACf9B3mB/CsZ6SGDTeHZJyHCOueyIX2tAWOx2fjL8yi1hbz/4TiQYK4p62GyXy4GbrBIyka5im2oIpRtNlQ1/r9NqVQcxLQDsZNYL"
        }, {
            "address": "Ef8iIRyBQEQWmuGzULtLvjZagzj3xRspvjdo23yervm1byrH",
            "amount": 500000000,
            "stateInit": null,
            "payload": "te6cckEBAQEAWgAAsA+KfqUAAAAAAAAAAFAlQL5ACf9B3mB/CsZ6SGDTeHZJyHCOueyIX2tAWOx2fjL8yi1hbz/4TiQYK4p62GyXy4GbrBIyka5im2oIpRtNlQ1/r9NqVQcxLQDsZNYL"
        }
    ]
    const tr = {
        "account": account,
        "messages": message,
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] });
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function deployJettonMinter() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef941xv06jTthEkLQ1iYNdARYacFvP6KqrQYyS_DWHW-cUjV",
        "amount": 500000000,
        "stateInit": "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"
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] });
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function mintJetton() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef941xv06jTthEkLQ1iYNdARYacFvP6KqrQYyS_DWHW-cUjV",
        "amount": 900000000,
        "payload": "te6cckEBAgEAeQABcwAAABUAAAAAAAAAAJ/8JxIMFcU9bDZL5cDN1gkZSNcxTbUEUo2myoa/1+m1KogvrwgA4HGv1JjQABABAHMXjUUZAAAAAAAAAABwONfqTGgAAn/wnEgwVxT1sNkvlwM3WCRlI1zFNtQRSjabKhr/X6bUqiCPDRgCz4vZBA=="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function changeJettonOwner() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef941xv06jTthEkLQ1iYNdARYacFvP6KqrQYyS_DWHW-cUjV",
        "amount": 300000000,
        "payload": "te6cckEBAQEAMAAAWwAAAAMAAAAAAAAAAJ/0HeYH8KxnpIYNN4dknIcI657Ihfa0BY7HZ+MvzKLWFvC2W9EO"
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function deployNFTContract() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef8J_4O4WJfCE-lWmFntJtoP_OCRQvw_MxMbokDN2nIgk7ru",
        "amount": 600000000,
        "stateInit": "te6cckECJwEABNcAAgE0ARQBFP8A9KQT9LzyyAsCAgFiAw0CAs0ECAPr0QY4BIrfAA6GmBgLjYSK3wfSAYAOmP6Z/2omh9IGmf6mpqGEEINJ6cqClAXUcUG6+CgOhBCFRlgFa4QAhkZYKoAueLEn0BCmW1CeWP5Z+A54tkwCB9gHAbKLnjgvlwyJLgAPGBEuABcYEZAmAB8YEvgsIH+XhAUGBwBgNQLTP1MTu/LhklMTugH6ANQwKBA0WfAGjhIBpENDyFAFzxYTyz/MzMzJ7VSSXwXiAKY1cAPUMI43gED0lm+lII4pBqQggQD6vpPywY/egQGTIaBTJbvy9AL6ANQwIlRLMPAGI7qTAqQC3gSSbCHis+YwMlBEQxPIUAXPFhPLP8zMzMntVAAoAfpAMEFEyFAFzxYTyz/MzMzJ7VQCASAJDAIBIAoLAC0AcjLP/gozxbJcCDIywET9AD0AMsAyYAAbPkAdMjLAhLKB8v/ydCAAPUWvAEfyHwBXeAGMjLBVjPFlAE+gITy2sSzMzJcfsAgCASAOEwIBIA8QAEO4tdMe1E0PpA0z/U1NQwECRfBNDUMdQw0HHIywcBzxbMyYAgEgERIAL7Xa/aiaH0gaZ/qamoYNiDoaYfph/0gGEAAttPR9qJofSBpn+pqahgKL4J4Aj+A+ALAAJbyC32omh9IGmf6mpqGC3oahgsQDU5/8JxIMFcU9bDZL5cDN1gkZSNcxTbUEUo2myoa/1+m1KoAAAAAAAAAMkBUYJgIAFhcArAFodHRwczovL2lwZnMuaW8vaXBmcy9RbVNrMXFFWU5Rek5YU2ZEN3BYUlhqZXFXTTl0RXEzdm1kQk0zZ2FrQTI3TXlOP2ZpbGVuYW1lPWlwZi5qc29uAIZodHRwczovL2lwZnMuaW8vaXBmcy9RbVNrMXFFWU5Rek5YU2ZEN3BYUlhqZXFXTTl0RXEzdm1kQk0zZ2FrQTI3TXlOART/APSkE/S88sgLGQIBYholAgLOGyICASAcIQLPDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAwc6m0APACBLOOFDBsIjRSMscF8uGVAfpA1DAQI/AD4AbTH9M/ghBfzD0UUjC64wIwNDQ1NYIQL8smohK64wJfBIQP8vCAdIAKsMhA3XjJAE1E1xwXy4ZH6QCHwAfpA0gAx+gAg10nCAPLixIIK+vCAG6EhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGUECo3W+MNApMwMjTjDVUC8AMeHwB8ghAFE42RyFAJzxZQC88WcSRJFFRGoHCAEMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsAEEcAaibwAYIQ1TJ22xA3RABtcXCAEMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsAAHJwghCLdxc1BcjL/1AEzxYQJIBAcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAAET6RDB/uvLhTYAIBICMkADs7UTQ0z/6QCDXScIAmn8B+kDUMBAkECPgMHBZbW2AAHQDyMs/WM8WAc8WzMntVIAAJoR+f4AUASwAKA+if9B3mB/CsZ6SGDTeHZJyHCOueyIX2tAWOx2fjL8yi1hbwwZ7NSg=="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function batchMintNFT() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef8J_4O4WJfCE-lWmFntJtoP_OCRQvw_MxMbokDN2nIgk7ru",
        "amount": 1500000000,
        "payload": "te6cckEBCAEAagABGQAAAAIAAAAAAAAAAMABAgPPYAIFAgEgAwMCASAEBAEJEBfXhAIGAQvSAvrwgEAGAUOf/CcSDBXFPWw2S+XAzdYJGUjXMU21BFKNpsqGv9fptSqQBwAkP2ZpbGVuYW1lPWlwZi5qc29uEV2J3w=="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function transferNFT() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef-8wfzONqLLEGk507qteB2L4qVrg2Qbrba1Uq4ML2BFE3zZ",
        "amount": 500000000,
        "payload": "te6cckEBAQEANQAAZV/MPRQAAAAAAAAAAJ/0HeYH8KxnpIYNN4dknIcI657Ihfa0BY7HZ+MvzKLWFuEBfXhAEHgMN1Q="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = parseResult(await ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

async function version5Body() {
    const account = await requestAccounts();
    const message = {
        "address": "Ef-8wfzONqLLEGk507qteB2L4qVrg2Qbrba1Uq4ML2BFE3zZ",
        "amount": 500000000,
        "payload": "te6cckEBBAEAlQABoXNpbnQAf//9Zub2RgAAACuXWCT8H/cboHOSc+JbT5bO6ETTxDggRD3YBDSTXqKG6Qz8jqxOh3hm+mOsQsEq12ax7JWJeMCXtP59zUVyB/xAYAECCg7DyG0BAgMAAABoQn/gkZZWBSlHlu8mD3ZLVECKmoYoMpkoTD08N5NpfsXHECA5zpWAAAAAAAAAAAAAAAAAAAaZ0a0="
    }
    const tr = {
        "account": account,
        "messages": [message],
        "validUntil": parseInt((Date.now() / 1e3)) + 240
    }
    const tranasction = await parseResult(ton.sendWalletRequest({ method: "ton_sendTransaction", id: "1", params: [tr] }));
    console.log(tranasction.boc)
    console.log(tranasction.tx_hash)
}

function listenOnEvents() {

    ton.on("accountsChanged", function (s) {
        console.log("Account changed in page: " + s);
        console.log("default address: " + ton.selectedAddress);
    });
    ton.on("chainChanged", function (s) {
        console.log("change changed in page: " + s.workChain);
    });
    ton.on("message", function (s) {
        console.log("message in page: " + JSON.stringify(s));
    });
    ton.on("connect", function (s) {
        console.log("connect in page " + s);
    });
}
async function signMessage() {
    const data = Uint8Array.from([1, 2, 3, 4])
    const signMessage = parseResult(await window.ton.sendWalletRequest({ method: "ton_signMessage", params: [data] }));

}
window.signMessage = signMessage
window.requestAccounts = requestAccounts
window.sendTransaction = sendTransaction
window.sendTransactionWithUnknownPayload = sendTransactionWithUnknownPayload
window.transferJetton = transferJetton
window.deployJettonMinter = deployJettonMinter
window.mintJetton = mintJetton
window.changeJettonOwner = changeJettonOwner
window.deployNFTContract = deployNFTContract
window.batchMintNFT = batchMintNFT
window.transferNFT = transferNFT
window.version5Body = version5Body
window.listenOnEvents = listenOnEvents
window.multipleTransferJetton = multipleTransferJetton