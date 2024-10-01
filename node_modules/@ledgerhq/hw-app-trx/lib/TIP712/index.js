"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTIP712HashedMessage = void 0;
const utils_1 = require("../utils");
const CLA = 0xe0;
const signTIP712HashedMessage = (transport, path, domainSeparatorHex, hashStructMessageHex) => {
    const domainSeparator = (0, utils_1.hexBuffer)(domainSeparatorHex);
    const hashStruct = (0, utils_1.hexBuffer)(hashStructMessageHex);
    const paths = (0, utils_1.splitPath)(path);
    const buffer = Buffer.alloc(1 + paths.length * 4 + 32 + 32, 0);
    let offset = 0;
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
        buffer.writeUint32BE(element, 1 + 4 * index);
    });
    offset = 1 + 4 * paths.length;
    domainSeparator.copy(buffer, offset);
    offset += 32;
    hashStruct.copy(buffer, offset);
    return transport.send(CLA, 0x0c, 0x00, 0x00, buffer).then(response => {
        return response.slice(0, 65).toString("hex");
    });
};
exports.signTIP712HashedMessage = signTIP712HashedMessage;
//# sourceMappingURL=index.js.map