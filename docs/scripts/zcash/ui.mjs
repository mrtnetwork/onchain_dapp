export function customPrompt(defaultValue, label) {
    return new Promise((resolve) => {
        // overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        // modal
        const modal = document.createElement("div");
        modal.style.background = "white";
        modal.style.padding = "20px";
        modal.style.borderRadius = "8px";
        modal.style.width = "500px";

        const label = document.createElement("div");
        label.innerText = label || "Please enter a valid Zcash destination address:";
        label.style.marginBottom = "10px";

        const input = document.createElement("input");
        input.type = "text";
        input.value = defaultValue;
        input.style.width = "100%";
        input.style.padding = "8px";

        // auto-select text
        setTimeout(() => {
            input.focus();
            input.select();
        }, 0);

        const btn = document.createElement("button");
        btn.innerText = "OK";
        btn.style.marginTop = "10px";

        btn.onclick = () => {
            resolve(input.value);
            document.body.removeChild(overlay);
        };

        modal.appendChild(label);
        modal.appendChild(input);
        modal.appendChild(btn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    });
}
export function askAddressWithProtocols(defaultValue) {
    return new Promise((resolve) => {
        // overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        // modal
        const modal = document.createElement("div");
        modal.style.background = "white";
        modal.style.padding = "20px";
        modal.style.borderRadius = "8px";
        modal.style.width = "500px";
        modal.style.fontFamily = "Arial";

        // title
        const label = document.createElement("div");
        label.innerText = "Please enter a valid Zcash destination address:";
        label.style.marginBottom = "10px";

        // address input
        const input = document.createElement("input");
        input.type = "text";
        input.value = defaultValue;
        input.style.width = "100%";
        input.style.padding = "8px";
        input.style.boxSizing = "border-box";

        setTimeout(() => {
            input.focus();
            input.select();
        }, 0);

        // radio group container
        const box = document.createElement("div");
        box.style.marginTop = "15px";
        box.style.display = "flex";
        box.style.flexDirection = "column";
        box.style.gap = "8px";

        const groupName = "zcash-protocol";

        function createRadio(value, text, checked = false) {
            const wrap = document.createElement("label");
            wrap.style.display = "flex";
            wrap.style.alignItems = "center";
            wrap.style.gap = "8px";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = groupName;
            radio.value = value;
            radio.checked = checked;

            const span = document.createElement("span");
            span.innerText = text;

            wrap.appendChild(radio);
            wrap.appendChild(span);

            return { wrap, radio };
        }

        const transparent = createRadio("transparent", "Transparent", true);
        const sapling = createRadio("sapling", "Sapling");
        const orchard = createRadio("orchard", "Orchard");

        box.appendChild(transparent.wrap);
        box.appendChild(sapling.wrap);
        box.appendChild(orchard.wrap);

        // buttons
        const buttons = document.createElement("div");
        buttons.style.marginTop = "20px";
        buttons.style.textAlign = "right";

        const ok = document.createElement("button");
        ok.innerText = "OK";
        ok.style.marginRight = "10px";

        const cancel = document.createElement("button");
        cancel.innerText = "Cancel";

        ok.onclick = () => {
            const selected = document.querySelector(
                'input[name="zcash-protocol"]:checked'
            );

            resolve({
                address: input.value,
                protocol: selected ? selected.value : null
            });

            document.body.removeChild(overlay);
        };

        cancel.onclick = () => {
            resolve(null);
            document.body.removeChild(overlay);
        };

        buttons.appendChild(ok);
        buttons.appendChild(cancel);

        // assemble
        modal.appendChild(label);
        modal.appendChild(input);
        modal.appendChild(box);
        modal.appendChild(buttons);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    });
}