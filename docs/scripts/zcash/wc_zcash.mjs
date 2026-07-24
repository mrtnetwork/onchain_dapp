import * as wc from '../utils/wc.mjs';
import { zcash } from '../constants/constants.mjs'
import * as utils from '../utils/utils.mjs';
import { customPrompt, askAddressWithProtocols } from './ui.mjs'
const network = zcash.zcashWsRegtestNetwork;
const defaultAddr = "uregtest12usyh7m058exh0fgccug5paqzesye4jzv2mtlux3l8wlfud83y7hkk5ssr62n0ggy35pfay7xsg7l3f045eqhndj05ea0ynt52fj7dtpr32a5ne33pg9pvfx4l0njf7wjqwkrsc7jmhafg54pg7zhvef5jlhwwvm2kqf4ku9ae8mdetwe6rrvk8j4p3kxwflwqq2w640hfux5902uly";
async function connect() {
    const { session, provider } = await wc.initWalletConnect(zcash.zcashCaip2, network);
    const accounts = wc.getApprovedAccounts({ session, caip10: network });
    if (accounts.length === 0) {
        throw new Error(`No approved accounts found for network "${network} (zcash regtest)". Please connect an account in your wallet.`);
    }
    return { provider, accounts };
}
async function requestAccounts() {
    const { provider } = await connect();
    await utils.runMethod({
        method: "zcash_requestAccounts",
        asyncFunc: async function name() {
            const accounts = await provider.request({ method: "zcash_requestAccounts" }, network);
            return accounts;
        }
    })
}

async function signMessage() {
    const { accounts, provider } = await connect();
    const params = {
        'message': 'Sign in test message.',
        'address': accounts[0]
    };
    await utils.runMethod({
        method: "zcash_signMessage",
        asyncFunc: async function name() {
            const { signature } = await provider.request({ method: "zcash_signMessage", params }, network);
            return signature;
        }
    })
}

// function customPrompt(defaultValue, label) {
//     return new Promise((resolve) => {
//         // overlay
//         const overlay = document.createElement("div");
//         overlay.style.position = "fixed";
//         overlay.style.top = "0";
//         overlay.style.left = "0";
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.background = "rgba(0,0,0,0.5)";
//         overlay.style.display = "flex";
//         overlay.style.alignItems = "center";
//         overlay.style.justifyContent = "center";
//         overlay.style.zIndex = "9999";

//         // modal
//         const modal = document.createElement("div");
//         modal.style.background = "white";
//         modal.style.padding = "20px";
//         modal.style.borderRadius = "8px";
//         modal.style.width = "500px";

//         const label = document.createElement("div");
//         label.innerText = label || "Please enter a valid Zcash destination address:";
//         label.style.marginBottom = "10px";

//         const input = document.createElement("input");
//         input.type = "text";
//         input.value = defaultValue;
//         input.style.width = "100%";
//         input.style.padding = "8px";

//         // auto-select text
//         setTimeout(() => {
//             input.focus();
//             input.select();
//         }, 0);

//         const btn = document.createElement("button");
//         btn.innerText = "OK";
//         btn.style.marginTop = "10px";

//         btn.onclick = () => {
//             resolve(input.value);
//             document.body.removeChild(overlay);
//         };

//         modal.appendChild(label);
//         modal.appendChild(input);
//         modal.appendChild(btn);
//         overlay.appendChild(modal);
//         document.body.appendChild(overlay);
//     });
// }
// function askAddressWithProtocols(defaultValue) {
//     return new Promise((resolve) => {
//         // overlay
//         const overlay = document.createElement("div");
//         overlay.style.position = "fixed";
//         overlay.style.top = "0";
//         overlay.style.left = "0";
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.background = "rgba(0,0,0,0.5)";
//         overlay.style.display = "flex";
//         overlay.style.alignItems = "center";
//         overlay.style.justifyContent = "center";
//         overlay.style.zIndex = "9999";

//         // modal
//         const modal = document.createElement("div");
//         modal.style.background = "white";
//         modal.style.padding = "20px";
//         modal.style.borderRadius = "8px";
//         modal.style.width = "500px";
//         modal.style.fontFamily = "Arial";

//         // title
//         const label = document.createElement("div");
//         label.innerText = "Please enter a valid Zcash destination address:";
//         label.style.marginBottom = "10px";

//         // address input
//         const input = document.createElement("input");
//         input.type = "text";
//         input.value = defaultValue;
//         input.style.width = "100%";
//         input.style.padding = "8px";
//         input.style.boxSizing = "border-box";

//         setTimeout(() => {
//             input.focus();
//             input.select();
//         }, 0);

//         // radio group container
//         const box = document.createElement("div");
//         box.style.marginTop = "15px";
//         box.style.display = "flex";
//         box.style.flexDirection = "column";
//         box.style.gap = "8px";

//         const groupName = "zcash-protocol";

//         function createRadio(value, text, checked = false) {
//             const wrap = document.createElement("label");
//             wrap.style.display = "flex";
//             wrap.style.alignItems = "center";
//             wrap.style.gap = "8px";

//             const radio = document.createElement("input");
//             radio.type = "radio";
//             radio.name = groupName;
//             radio.value = value;
//             radio.checked = checked;

//             const span = document.createElement("span");
//             span.innerText = text;

//             wrap.appendChild(radio);
//             wrap.appendChild(span);

//             return { wrap, radio };
//         }

//         const transparent = createRadio("transparent", "Transparent", true);
//         const sapling = createRadio("sapling", "Sapling");
//         const orchard = createRadio("orchard", "Orchard");

//         box.appendChild(transparent.wrap);
//         box.appendChild(sapling.wrap);
//         box.appendChild(orchard.wrap);

//         // buttons
//         const buttons = document.createElement("div");
//         buttons.style.marginTop = "20px";
//         buttons.style.textAlign = "right";

//         const ok = document.createElement("button");
//         ok.innerText = "OK";
//         ok.style.marginRight = "10px";

//         const cancel = document.createElement("button");
//         cancel.innerText = "Cancel";

//         ok.onclick = () => {
//             const selected = document.querySelector(
//                 'input[name="zcash-protocol"]:checked'
//             );

//             resolve({
//                 address: input.value,
//                 protocol: selected ? selected.value : null
//             });

//             document.body.removeChild(overlay);
//         };

//         cancel.onclick = () => {
//             resolve(null);
//             document.body.removeChild(overlay);
//         };

//         buttons.appendChild(ok);
//         buttons.appendChild(cancel);

//         // assemble
//         modal.appendChild(label);
//         modal.appendChild(input);
//         modal.appendChild(box);
//         modal.appendChild(buttons);

//         overlay.appendChild(modal);
//         document.body.appendChild(overlay);
//     });
// }
// function askAddressWithProtocols(defaultValue) {
//     return new Promise((resolve) => {
//         // overlay
//         const overlay = document.createElement("div");
//         overlay.style.position = "fixed";
//         overlay.style.top = "0";
//         overlay.style.left = "0";
//         overlay.style.width = "100%";
//         overlay.style.height = "100%";
//         overlay.style.background = "rgba(0,0,0,0.5)";
//         overlay.style.display = "flex";
//         overlay.style.alignItems = "center";
//         overlay.style.justifyContent = "center";
//         overlay.style.zIndex = "9999";

//         // modal
//         const modal = document.createElement("div");
//         modal.style.background = "white";
//         modal.style.padding = "20px";
//         modal.style.borderRadius = "8px";
//         modal.style.width = "500px";
//         modal.style.fontFamily = "Arial";

//         // label
//         const label = document.createElement("div");
//         label.innerText = "Please enter a valid Zcash destination address:";
//         label.style.marginBottom = "10px";

//         // input
//         const input = document.createElement("input");
//         input.type = "text";
//         input.value = defaultValue;
//         input.style.width = "100%";
//         input.style.padding = "8px";
//         input.style.boxSizing = "border-box";

//         setTimeout(() => {
//             input.focus();
//             input.select();
//         }, 0);

//         // checkbox section
//         const box = document.createElement("div");
//         box.style.marginTop = "15px";
//         box.style.display = "flex";
//         box.style.flexDirection = "column";
//         box.style.gap = "8px";

//         function createCheckbox(id, text) {
//             const wrap = document.createElement("label");
//             wrap.style.display = "flex";
//             wrap.style.alignItems = "center";
//             wrap.style.gap = "8px";

//             const cb = document.createElement("input");
//             cb.type = "checkbox";
//             cb.id = id;

//             const span = document.createElement("span");
//             span.innerText = text;

//             wrap.appendChild(cb);
//             wrap.appendChild(span);

//             return { wrap, cb };
//         }

//         const transparent = createCheckbox("transparent", "Transparent");
//         const orchard = createCheckbox("orchard", "Orchard");
//         const sapling = createCheckbox("sapling", "Sapling");

//         box.appendChild(transparent.wrap);
//         box.appendChild(orchard.wrap);
//         box.appendChild(sapling.wrap);

//         // buttons
//         const buttons = document.createElement("div");
//         buttons.style.marginTop = "20px";
//         buttons.style.textAlign = "right";

//         const ok = document.createElement("button");
//         ok.innerText = "OK";
//         ok.style.marginRight = "10px";

//         const cancel = document.createElement("button");
//         cancel.innerText = "Cancel";

//         ok.onclick = () => {
//             resolve({
//                 address: input.value,
//                 protocols: {
//                     transparent: transparent.cb.checked,
//                     orchard: orchard.cb.checked,
//                     sapling: sapling.cb.checked
//                 }
//             });
//             document.body.removeChild(overlay);
//         };

//         cancel.onclick = () => {
//             resolve(null);
//             document.body.removeChild(overlay);
//         };

//         buttons.appendChild(ok);
//         buttons.appendChild(cancel);

//         // assemble
//         modal.appendChild(label);
//         modal.appendChild(input);
//         modal.appendChild(box);
//         modal.appendChild(buttons);

//         overlay.appendChild(modal);
//         document.body.appendChild(overlay);
//     });
// }

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
        recipients: [{
            address: recipientWithProtocol?.address || defaultAddr,
            amount: "10000000",
            protocol: recipientWithProtocol?.protocol || "orchard",
            memo: shieldMemo
        }, {
            address: recipientWithProtocol?.address || defaultAddr,
            amount: "10000000",
            protocol: recipientWithProtocol?.protocol || "orchard",
            memo: shieldMemo
        }]
    };
    await utils.runMethod({
        method: "zcash_payment",
        asyncFunc: async function name() {
            const response = await provider.request({ method: "zcash_payment", params }, network);
            return response;
        }
    })
}

const onChain = {
    ping: wc.ping,
    disconnect: wc.disconnect,
    zcash: {
        connect: connect,
        signMessage: signMessage,
        signAndSendTransaction: signAndSendTransaction,
        requestAccounts: requestAccounts
    }
};

window.onChainDapp = {
    ...(window.onChainDapp || {}),
    ...onChain
};
