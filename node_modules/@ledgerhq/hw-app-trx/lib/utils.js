"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexBuffer = exports.padHexString = exports.decodeVarint = exports.asyncWhile = exports.doIf = exports.foreach = exports.eachSeries = exports.splitPath = exports.defer = void 0;
function defer() {
    let resolve, reject;
    const promise = new Promise(function (success, failure) {
        resolve = success;
        reject = failure;
    });
    if (!resolve || !reject)
        throw "defer() error"; // this never happens and is just to make flow happy
    return {
        promise,
        resolve,
        reject,
    };
}
exports.defer = defer;
// TODO use bip32-path library
function splitPath(path) {
    const result = [];
    const components = path.split("/");
    components.forEach(element => {
        let number = parseInt(element, 10);
        if (isNaN(number)) {
            return; // FIXME shouldn't it throws instead?
        }
        if (element.length > 1 && element[element.length - 1] === "'") {
            number += 0x80000000;
        }
        result.push(number);
    });
    return result;
}
exports.splitPath = splitPath;
// TODO use async await
function eachSeries(arr, fun) {
    return arr.reduce((p, e) => p.then(() => fun(e)), Promise.resolve());
}
exports.eachSeries = eachSeries;
function foreach(arr, callback) {
    function iterate(index, array, result) {
        if (index >= array.length) {
            return result;
        }
        else
            return callback(array[index], index).then(function (res) {
                result.push(res);
                return iterate(index + 1, array, result);
            });
    }
    return Promise.resolve().then(() => iterate(0, arr, []));
}
exports.foreach = foreach;
function doIf(condition, callback) {
    return Promise.resolve().then(() => {
        if (condition) {
            return callback();
        }
    });
}
exports.doIf = doIf;
function asyncWhile(predicate, callback) {
    function iterate(result) {
        if (!predicate()) {
            return result;
        }
        else {
            return callback().then(res => {
                result.push(res);
                return iterate(result);
            });
        }
    }
    return Promise.resolve([]).then(iterate);
}
exports.asyncWhile = asyncWhile;
function decodeVarint(stream, index) {
    let result = 0;
    let shift = 0;
    let pos = index;
    // eslint-disable-next-line no-constant-condition
    while (shift < 64) {
        const b = stream[pos];
        result |= (b & 0x7f) << shift;
        pos += 1;
        if (!(b & 0x80)) {
            result &= 0xffffffff;
            return {
                value: result,
                pos,
            };
        }
        shift += 7;
    }
    throw new Error("Too many bytes when decoding varint.");
}
exports.decodeVarint = decodeVarint;
const padHexString = (str) => {
    return str.length % 2 ? "0" + str : str;
};
exports.padHexString = padHexString;
function hexBuffer(str) {
    const strWithoutPrefix = str.startsWith("0x") ? str.slice(2) : str;
    return Buffer.from((0, exports.padHexString)(strWithoutPrefix), "hex");
}
exports.hexBuffer = hexBuffer;
//# sourceMappingURL=utils.js.map