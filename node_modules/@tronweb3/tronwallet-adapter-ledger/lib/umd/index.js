(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@tronweb3/tronwallet-adapter-ledger"] = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var cjs$1 = {};

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer$1.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	var _kMaxLength = kMaxLength();

	function kMaxLength () {
	  return Buffer$1.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer$1(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer$1 (arg, encodingOrOffset, length) {
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
	    return new Buffer$1(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer$1.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer$1._augment = function (arr) {
	  arr.__proto__ = Buffer$1.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer$1.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	  Buffer$1.prototype.__proto__ = Uint8Array.prototype;
	  Buffer$1.__proto__ = Uint8Array;
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer$1[Symbol.species] === Buffer$1) ;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer$1.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer$1.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer$1.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer$1.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer$1.alloc(+length)
	}
	Buffer$1.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer$1.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer$1.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer$1.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer$1.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer$1.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer$1.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer$1.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer$1.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer$1.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer$1.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer$1.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer$1.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer$1.compare(this, b) === 0
	};

	Buffer$1.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer$1.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer$1.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer$1.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer$1.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer$1.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer$1.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer$1(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer$1(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	var _polyfillNode_buffer = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Buffer: Buffer$1,
		INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
		SlowBuffer: SlowBuffer,
		isBuffer: isBuffer,
		kMaxLength: _kMaxLength
	});

	var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_buffer);

	const buffer_1 = require$$0$2;
	if (typeof window !== 'undefined' && window.Buffer === undefined) {
	    window.Buffer = buffer_1.Buffer;
	}

	var adapter$1 = {};

	var cjs = {};

	var adapter = {};

	var eventemitter3 = {exports: {}};

	(function (module) {

		var has = Object.prototype.hasOwnProperty
		  , prefix = '~';

		/**
		 * Constructor to create a storage for our `EE` objects.
		 * An `Events` instance is a plain object whose properties are event names.
		 *
		 * @constructor
		 * @private
		 */
		function Events() {}

		//
		// We try to not inherit from `Object.prototype`. In some engines creating an
		// instance in this way is faster than calling `Object.create(null)` directly.
		// If `Object.create(null)` is not supported we prefix the event names with a
		// character to make sure that the built-in object properties are not
		// overridden or used as an attack vector.
		//
		if (Object.create) {
		  Events.prototype = Object.create(null);

		  //
		  // This hack is needed because the `__proto__` property is still inherited in
		  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
		  //
		  if (!new Events().__proto__) prefix = false;
		}

		/**
		 * Representation of a single event listener.
		 *
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
		 * @constructor
		 * @private
		 */
		function EE(fn, context, once) {
		  this.fn = fn;
		  this.context = context;
		  this.once = once || false;
		}

		/**
		 * Add a listener for a given event.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} once Specify if the listener is a one-time listener.
		 * @returns {EventEmitter}
		 * @private
		 */
		function addListener(emitter, event, fn, context, once) {
		  if (typeof fn !== 'function') {
		    throw new TypeError('The listener must be a function');
		  }

		  var listener = new EE(fn, context || emitter, once)
		    , evt = prefix ? prefix + event : event;

		  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		  else emitter._events[evt] = [emitter._events[evt], listener];

		  return emitter;
		}

		/**
		 * Clear event by name.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} evt The Event name.
		 * @private
		 */
		function clearEvent(emitter, evt) {
		  if (--emitter._eventsCount === 0) emitter._events = new Events();
		  else delete emitter._events[evt];
		}

		/**
		 * Minimal `EventEmitter` interface that is molded against the Node.js
		 * `EventEmitter` interface.
		 *
		 * @constructor
		 * @public
		 */
		function EventEmitter() {
		  this._events = new Events();
		  this._eventsCount = 0;
		}

		/**
		 * Return an array listing the events for which the emitter has registered
		 * listeners.
		 *
		 * @returns {Array}
		 * @public
		 */
		EventEmitter.prototype.eventNames = function eventNames() {
		  var names = []
		    , events
		    , name;

		  if (this._eventsCount === 0) return names;

		  for (name in (events = this._events)) {
		    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		  }

		  if (Object.getOwnPropertySymbols) {
		    return names.concat(Object.getOwnPropertySymbols(events));
		  }

		  return names;
		};

		/**
		 * Return the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Array} The registered listeners.
		 * @public
		 */
		EventEmitter.prototype.listeners = function listeners(event) {
		  var evt = prefix ? prefix + event : event
		    , handlers = this._events[evt];

		  if (!handlers) return [];
		  if (handlers.fn) return [handlers.fn];

		  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
		    ee[i] = handlers[i].fn;
		  }

		  return ee;
		};

		/**
		 * Return the number of listeners listening to a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Number} The number of listeners.
		 * @public
		 */
		EventEmitter.prototype.listenerCount = function listenerCount(event) {
		  var evt = prefix ? prefix + event : event
		    , listeners = this._events[evt];

		  if (!listeners) return 0;
		  if (listeners.fn) return 1;
		  return listeners.length;
		};

		/**
		 * Calls each of the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Boolean} `true` if the event had listeners, else `false`.
		 * @public
		 */
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return false;

		  var listeners = this._events[evt]
		    , len = arguments.length
		    , args
		    , i;

		  if (listeners.fn) {
		    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

		    switch (len) {
		      case 1: return listeners.fn.call(listeners.context), true;
		      case 2: return listeners.fn.call(listeners.context, a1), true;
		      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
		      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
		      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
		      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
		    }

		    for (i = 1, args = new Array(len -1); i < len; i++) {
		      args[i - 1] = arguments[i];
		    }

		    listeners.fn.apply(listeners.context, args);
		  } else {
		    var length = listeners.length
		      , j;

		    for (i = 0; i < length; i++) {
		      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

		      switch (len) {
		        case 1: listeners[i].fn.call(listeners[i].context); break;
		        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
		        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
		        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
		        default:
		          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
		            args[j - 1] = arguments[j];
		          }

		          listeners[i].fn.apply(listeners[i].context, args);
		      }
		    }
		  }

		  return true;
		};

		/**
		 * Add a listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.on = function on(event, fn, context) {
		  return addListener(this, event, fn, context, false);
		};

		/**
		 * Add a one-time listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.once = function once(event, fn, context) {
		  return addListener(this, event, fn, context, true);
		};

		/**
		 * Remove the listeners of a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn Only remove the listeners that match this function.
		 * @param {*} context Only remove the listeners that have this context.
		 * @param {Boolean} once Only remove one-time listeners.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return this;
		  if (!fn) {
		    clearEvent(this, evt);
		    return this;
		  }

		  var listeners = this._events[evt];

		  if (listeners.fn) {
		    if (
		      listeners.fn === fn &&
		      (!once || listeners.once) &&
		      (!context || listeners.context === context)
		    ) {
		      clearEvent(this, evt);
		    }
		  } else {
		    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
		      if (
		        listeners[i].fn !== fn ||
		        (once && !listeners[i].once) ||
		        (context && listeners[i].context !== context)
		      ) {
		        events.push(listeners[i]);
		      }
		    }

		    //
		    // Reset the array, or remove it completely if we have no more listeners.
		    //
		    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
		    else clearEvent(this, evt);
		  }

		  return this;
		};

		/**
		 * Remove all listeners, or those of the specified event.
		 *
		 * @param {(String|Symbol)} [event] The event name.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		  var evt;

		  if (event) {
		    evt = prefix ? prefix + event : event;
		    if (this._events[evt]) clearEvent(this, evt);
		  } else {
		    this._events = new Events();
		    this._eventsCount = 0;
		  }

		  return this;
		};

		//
		// Alias methods names because people roll like that.
		//
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;

		//
		// Expose the prefix.
		//
		EventEmitter.prefixed = prefix;

		//
		// Allow `EventEmitter` to be imported as module namespace.
		//
		EventEmitter.EventEmitter = EventEmitter;

		//
		// Expose the module.
		//
		{
		  module.exports = EventEmitter;
		} 
	} (eventemitter3));

	var eventemitter3Exports = eventemitter3.exports;

	(function (exports) {
		var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Adapter = exports.AdapterState = exports.WalletReadyState = exports.EventEmitter = void 0;
		const eventemitter3_1 = __importDefault(eventemitter3Exports);
		exports.EventEmitter = eventemitter3_1.default;
		(function (WalletReadyState) {
		    /**
		     * Adapter will start to check if wallet exists after adapter instance is created.
		     */
		    WalletReadyState["Loading"] = "Loading";
		    /**
		     * When checking ends and wallet is not found, readyState will be NotFound.
		     */
		    WalletReadyState["NotFound"] = "NotFound";
		    /**
		     * When checking ends and wallet is found, readyState will be Found.
		     */
		    WalletReadyState["Found"] = "Found";
		})(exports.WalletReadyState || (exports.WalletReadyState = {}));
		/**
		 * Adapter state
		 */
		var AdapterState;
		(function (AdapterState) {
		    /**
		     * If adapter is checking the wallet, the state is Loading.
		     */
		    AdapterState["Loading"] = "Loading";
		    /**
		     * If wallet is not installed, the state is NotFound.
		     */
		    AdapterState["NotFound"] = "NotFound";
		    /**
		     * If wallet is installed but is not connected to current Dapp, the state is Disconnected.
		     */
		    AdapterState["Disconnect"] = "Disconnected";
		    /**
		     * Wallet is connected to current Dapp.
		     */
		    AdapterState["Connected"] = "Connected";
		})(AdapterState = exports.AdapterState || (exports.AdapterState = {}));
		class Adapter extends eventemitter3_1.default {
		    get connected() {
		        return this.state === AdapterState.Connected;
		    }
		    /**
		     * Some wallets such as TronLink don't support disconnect() method.
		     */
		    disconnect() {
		        console.info("The current adapter doesn't support disconnect by DApp.");
		        return Promise.resolve();
		    }
		    // eslint-disable-next-line @typescript-eslint/no-unused-vars
		    multiSign(...args) {
		        return Promise.reject("The current wallet doesn't support multiSign.");
		    }
		    // eslint-disable-next-line @typescript-eslint/no-unused-vars
		    switchChain(_chainId) {
		        return Promise.reject("The current wallet doesn't support switch chain.");
		    }
		}
		exports.Adapter = Adapter;
		
	} (adapter));

	var errors = {};

	Object.defineProperty(errors, "__esModule", { value: true });
	errors.WalletGetNetworkError = errors.WalletSwitchChainError = errors.WalletWindowClosedError = errors.WalletWalletLoadError = errors.WalletSignTransactionError = errors.WalletSignMessageError = errors.WalletDisconnectionError = errors.WalletConnectionError = errors.WalletDisconnectedError = errors.WalletNotSelectedError = errors.WalletNotFoundError = errors.WalletError = void 0;
	class WalletError extends Error {
	    constructor(message, error) {
	        super(message);
	        this.error = error;
	    }
	}
	errors.WalletError = WalletError;
	/**
	 * Occurs when wallet is not installed.
	 */
	class WalletNotFoundError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletNotFoundError';
	        this.message = 'The wallet is not found.';
	    }
	}
	errors.WalletNotFoundError = WalletNotFoundError;
	/**
	 * Occurs when connect to a wallet but there is no wallet selected.
	 */
	class WalletNotSelectedError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletNotSelectedError';
	        this.message = 'No wallet is selected. Please select a wallet.';
	    }
	}
	errors.WalletNotSelectedError = WalletNotSelectedError;
	/**
	 * Occurs when wallet is disconnected.
	 * Used by some wallets which won't connect automatically when call `signMessage()` or `signTransaction()`.
	 */
	class WalletDisconnectedError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletDisconnectedError';
	        this.message = 'The wallet is disconnected. Please connect first.';
	    }
	}
	errors.WalletDisconnectedError = WalletDisconnectedError;
	/**
	 * Occurs when try to connect a wallet.
	 */
	class WalletConnectionError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletConnectionError';
	    }
	}
	errors.WalletConnectionError = WalletConnectionError;
	/**
	 * Occurs when try to disconnect a wallet.
	 */
	class WalletDisconnectionError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletDisconnectionError';
	    }
	}
	errors.WalletDisconnectionError = WalletDisconnectionError;
	/**
	 * Occurs when call `signMessage()`.
	 */
	class WalletSignMessageError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletSignMessageError';
	    }
	}
	errors.WalletSignMessageError = WalletSignMessageError;
	/**
	 * Occurs when call `signTransaction()`.
	 */
	class WalletSignTransactionError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletSignTransactionError';
	    }
	}
	errors.WalletSignTransactionError = WalletSignTransactionError;
	/**
	 * Occurs when load wallet
	 */
	class WalletWalletLoadError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletWalletLoadError';
	    }
	}
	errors.WalletWalletLoadError = WalletWalletLoadError;
	/**
	 * Occurs when walletconnect QR window is closed.
	 */
	class WalletWindowClosedError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletWindowClosedError';
	        this.message = 'The QR window is closed.';
	    }
	}
	errors.WalletWindowClosedError = WalletWindowClosedError;
	/**
	 * Occurs when request wallet to switch chain.
	 */
	class WalletSwitchChainError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletSwitchChainError';
	    }
	}
	errors.WalletSwitchChainError = WalletSwitchChainError;
	/**
	 * Occurs when get network infomation.
	 */
	class WalletGetNetworkError extends WalletError {
	    constructor() {
	        super(...arguments);
	        this.name = 'WalletGetNetworkError';
	    }
	}
	errors.WalletGetNetworkError = WalletGetNetworkError;

	var types = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ChainNetwork = exports.NetworkType = void 0;
		(function (NetworkType) {
		    NetworkType["Mainnet"] = "Mainnet";
		    NetworkType["Shasta"] = "Shasta";
		    NetworkType["Nile"] = "Nile";
		    /**
		     * When use custom node
		     */
		    NetworkType["Unknown"] = "Unknown";
		})(exports.NetworkType || (exports.NetworkType = {}));
		(function (ChainNetwork) {
		    ChainNetwork["Mainnet"] = "Mainnet";
		    ChainNetwork["Shasta"] = "Shasta";
		    ChainNetwork["Nile"] = "Nile";
		})(exports.ChainNetwork || (exports.ChainNetwork = {}));
		
	} (types));

	var utils = {};

	Object.defineProperty(utils, "__esModule", { value: true });
	utils.isInMobileBrowser = utils.checkAdapterState = utils.isInBrowser = void 0;
	/**
	 * check simply if current environment is browser or not
	 * @returns boolean
	 */
	function isInBrowser() {
	    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
	}
	utils.isInBrowser = isInBrowser;
	/**
	 *
	 * @param {Function} check funcion to check if wallet is installed. return true if wallet is detected.
	 * @returns
	 */
	function checkAdapterState(check) {
	    if (!isInBrowser())
	        return;
	    const disposers = [];
	    function dispose() {
	        for (const dispose of disposers) {
	            dispose();
	        }
	    }
	    function checkAndDispose() {
	        if (check()) {
	            dispose();
	        }
	    }
	    const interval = setInterval(checkAndDispose, 500);
	    disposers.push(() => clearInterval(interval));
	    if (document.readyState === 'loading') {
	        document.addEventListener('DOMContentLoaded', checkAndDispose, { once: true });
	        disposers.push(() => document.removeEventListener('DOMContentLoaded', checkAndDispose));
	    }
	    if (document.readyState !== 'complete') {
	        window.addEventListener('load', checkAndDispose, { once: true });
	        disposers.push(() => window.removeEventListener('load', checkAndDispose));
	    }
	    checkAndDispose();
	    // stop all task after 1min
	    setTimeout(dispose, 60 * 1000);
	}
	utils.checkAdapterState = checkAdapterState;
	/**
	 * Simplily detect mobile device
	 */
	function isInMobileBrowser() {
	    return (typeof navigator !== 'undefined' &&
	        navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i));
	}
	utils.isInMobileBrowser = isInMobileBrowser;

	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(adapter, exports);
		__exportStar(errors, exports);
		__exportStar(types, exports);
		__exportStar(utils, exports);
		
	} (cjs));

	var LedgerWallet$1 = {};

	// TODO use bip32-path library
	function splitPath(path) {
	    var result = [];
	    var components = path.split("/");
	    components.forEach(function (element) {
	        var number = parseInt(element, 10);
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
	    return Promise.resolve().then(function () { return iterate(0, arr, []); });
	}
	function decodeVarint(stream, index) {
	    var result = 0;
	    var shift = 0;
	    var pos = index;
	    // eslint-disable-next-line no-constant-condition
	    while (shift < 64) {
	        var b = stream[pos];
	        result |= (b & 0x7f) << shift;
	        pos += 1;
	        if (!(b & 0x80)) {
	            result &= 0xffffffff;
	            return {
	                value: result,
	                pos: pos
	            };
	        }
	        shift += 7;
	    }
	    throw new Error("Too many bytes when decoding varint.");
	}

	/********************************************************************************
	 *   Ledger Node JS API
	 *   (c) 2016-2017 Ledger
	 *
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 ********************************************************************************/
	// FIXME drop:
	var remapTransactionRelatedErrors = function (e) {
	    if (e && e.statusCode === 0x6a80) ;
	    return e;
	};
	var PATH_SIZE = 4;
	var PATHS_LENGTH_SIZE = 1;
	var CLA = 0xe0;
	var ADDRESS = 0x02;
	var SIGN = 0x04;
	var SIGN_HASH = 0x05;
	var SIGN_MESSAGE = 0x08;
	var ECDH_SECRET = 0x0a;
	var VERSION = 0x06;
	var CHUNK_SIZE = 250;
	/**
	 * Tron API
	 *
	 * @example
	 * import Trx from "@ledgerhq/hw-app-trx";
	 * const trx = new Trx(transport)
	 */
	var Trx = /** @class */ (function () {
	    function Trx(transport, scrambleKey) {
	        if (scrambleKey === void 0) { scrambleKey = "TRX"; }
	        this.transport = transport;
	        transport.decorateAppAPIMethods(this, [
	            "getAddress",
	            "getECDHPairKey",
	            "signTransaction",
	            "signTransactionHash",
	            "signPersonalMessage",
	            "getAppConfiguration",
	        ], scrambleKey);
	    }
	    /**
	     * get Tron address for a given BIP 32 path.
	     * @param path a path in BIP 32 format
	     * @option boolDisplay optionally enable or not the display
	     * @return an object with a publicKey and address
	     * @example
	     * const address = await tron.getAddress("44'/195'/0'/0/0").then(o => o.address)
	     */
	    Trx.prototype.getAddress = function (path, boolDisplay) {
	        var paths = splitPath(path);
	        var buffer = Buffer.alloc(PATHS_LENGTH_SIZE + paths.length * PATH_SIZE);
	        buffer[0] = paths.length;
	        paths.forEach(function (element, index) {
	            buffer.writeUInt32BE(element, 1 + 4 * index);
	        });
	        return this.transport
	            .send(CLA, ADDRESS, boolDisplay ? 0x01 : 0x00, 0x00, buffer)
	            .then(function (response) {
	            var publicKeyLength = response[0];
	            var addressLength = response[1 + publicKeyLength];
	            return {
	                publicKey: response.slice(1, 1 + publicKeyLength).toString("hex"),
	                address: response
	                    .slice(1 + publicKeyLength + 1, 1 + publicKeyLength + 1 + addressLength)
	                    .toString("ascii")
	            };
	        });
	    };
	    Trx.prototype.getNextLength = function (tx) {
	        var field = decodeVarint(tx, 0);
	        var data = decodeVarint(tx, field.pos);
	        if ((field.value & 0x07) === 0)
	            return data.pos;
	        return data.value + data.pos;
	    };
	    /**
	     * sign a Tron transaction with a given BIP 32 path and Token Names
	     *
	     * @param path a path in BIP 32 format
	     * @param rawTxHex a raw transaction hex string
	     * @param tokenSignatures Tokens Signatures array
	     * @option version pack message based on ledger firmware version
	     * @option smartContract boolean hack to set limit buffer on ledger device
	     * @return a signature as hex string
	     * @example
	     * const signature = await tron.signTransaction("44'/195'/0'/0/0", "0a02f5942208704dda506d59dceb40f0f4978f802e5a69080112650a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412340a1541978dbd103cfe59c35e753d09dd44ae1ae64621c7121541e2ae49db6a70b9b4757d2137a43b69b24a445780188ef8b5ba0470cbb5948f802e", [], 105);
	     */
	    Trx.prototype.signTransaction = function (path, rawTxHex, tokenSignatures) {
	        var _this = this;
	        var paths = splitPath(path);
	        var rawTx = Buffer.from(rawTxHex, "hex");
	        var toSend = [];
	        var data = Buffer.alloc(PATHS_LENGTH_SIZE + paths.length * PATH_SIZE);
	        // write path for first chuck only
	        data[0] = paths.length;
	        paths.forEach(function (element, index) {
	            data.writeUInt32BE(element, 1 + 4 * index);
	        });
	        while (rawTx.length > 0) {
	            // get next message field
	            var newpos = this.getNextLength(rawTx);
	            if (newpos > CHUNK_SIZE)
	                throw new Error("Too many bytes to encode.");
	            if (data.length + newpos > CHUNK_SIZE) {
	                toSend.push(data);
	                data = Buffer.alloc(0);
	                continue;
	            }
	            // append data
	            data = Buffer.concat([data, rawTx.slice(0, newpos)]);
	            rawTx = rawTx.slice(newpos, rawTx.length);
	        }
	        toSend.push(data);
	        var startBytes = [];
	        var response;
	        var tokenPos = toSend.length;
	        if (tokenSignatures !== undefined) {
	            for (var i = 0; i < tokenSignatures.length; i += 1) {
	                var buffer = Buffer.from(tokenSignatures[i], "hex");
	                toSend.push(buffer);
	            }
	        }
	        // get startBytes
	        if (toSend.length === 1) {
	            startBytes.push(0x10);
	        }
	        else {
	            startBytes.push(0x00);
	            for (var i = 1; i < toSend.length - 1; i += 1) {
	                if (i >= tokenPos) {
	                    startBytes.push(0xa0 | 0x00 | (i - tokenPos)); // eslint-disable-line no-bitwise
	                }
	                else {
	                    startBytes.push(0x80);
	                }
	            }
	            if (tokenSignatures !== undefined && tokenSignatures.length) {
	                startBytes.push(0xa0 | 0x08 | (tokenSignatures.length - 1)); // eslint-disable-line no-bitwise
	            }
	            else {
	                startBytes.push(0x90);
	            }
	        }
	        return foreach(toSend, function (data, i) {
	            return _this.transport
	                .send(CLA, SIGN, startBytes[i], 0x00, data)
	                .then(function (apduResponse) {
	                response = apduResponse;
	            });
	        }).then(function () {
	            return response.slice(0, 65).toString("hex");
	        }, function (e) {
	            throw remapTransactionRelatedErrors(e);
	        });
	    };
	    /**
	     * sign a Tron transaction hash with a given BIP 32 path
	     *
	     * @param path a path in BIP 32 format
	     * @param rawTxHex a raw transaction hex string
	     * @return a signature as hex string
	     * @example
	     * const signature = await tron.signTransactionHash("44'/195'/0'/0/0", "25b18a55f86afb10e7aca38d0073d04c80397c6636069193953fdefaea0b8369");
	     */
	    Trx.prototype.signTransactionHash = function (path, rawTxHashHex) {
	        var paths = splitPath(path);
	        var data = Buffer.alloc(PATHS_LENGTH_SIZE + paths.length * PATH_SIZE);
	        data[0] = paths.length;
	        paths.forEach(function (element, index) {
	            data.writeUInt32BE(element, 1 + 4 * index);
	        });
	        data = Buffer.concat([data, Buffer.from(rawTxHashHex, "hex")]);
	        return this.transport
	            .send(CLA, SIGN_HASH, 0x00, 0x00, data)
	            .then(function (response) {
	            return response.slice(0, 65).toString("hex");
	        });
	    };
	    /**
	     * get the version of the Tron app installed on the hardware device
	     *
	     * @return an object with a version
	     * @example
	     * const result = await tron.getAppConfiguration();
	     * {
	     *   "version": "0.1.5",
	     *   "versionN": "105".
	     *   "allowData": false,
	     *   "allowContract": false,
	     *   "truncateAddress": false,
	     *   "signByHash": false
	     * }
	     */
	    Trx.prototype.getAppConfiguration = function () {
	        return this.transport.send(CLA, VERSION, 0x00, 0x00).then(function (response) {
	            // eslint-disable-next-line no-bitwise
	            var signByHash = (response[0] & (1 << 3)) > 0;
	            // eslint-disable-next-line no-bitwise
	            var truncateAddress = (response[0] & (1 << 2)) > 0;
	            // eslint-disable-next-line no-bitwise
	            var allowContract = (response[0] & (1 << 1)) > 0;
	            // eslint-disable-next-line no-bitwise
	            var allowData = (response[0] & (1 << 0)) > 0;
	            if (response[1] === 0 && response[2] === 1 && response[3] < 2) {
	                allowData = true;
	                allowContract = false;
	            }
	            if (response[1] === 0 && response[2] === 1 && response[3] < 5) {
	                truncateAddress = false;
	            }
	            var result = {
	                version: "".concat(response[1], ".").concat(response[2], ".").concat(response[3]),
	                versionN: response[1] * 10000 + response[2] * 100 + response[3],
	                allowData: allowData,
	                allowContract: allowContract,
	                truncateAddress: truncateAddress,
	                signByHash: signByHash
	            };
	            return result;
	        });
	    };
	    /**
	     * sign a Tron Message with a given BIP 32 path
	     *
	     * @param path a path in BIP 32 format
	     * @param message hex string to sign
	     * @return a signature as hex string
	     * @example
	     * const signature = await tron.signPersonalMessage("44'/195'/0'/0/0", "43727970746f436861696e2d54726f6e5352204c6564676572205472616e73616374696f6e73205465737473");
	     */
	    Trx.prototype.signPersonalMessage = function (path, messageHex) {
	        var _this = this;
	        var paths = splitPath(path);
	        var message = Buffer.from(messageHex, "hex");
	        var offset = 0;
	        var toSend = [];
	        var size = message.length.toString(16);
	        var sizePack = "00000000".substr(size.length) + size;
	        var packed = Buffer.concat([Buffer.from(sizePack, "hex"), message]);
	        var _loop_1 = function () {
	            // Use small buffer to be compatible with old and new protocol
	            var maxChunkSize = offset === 0 ? CHUNK_SIZE - 1 - paths.length * 4 : CHUNK_SIZE;
	            var chunkSize = offset + maxChunkSize > packed.length
	                ? packed.length - offset
	                : maxChunkSize;
	            var buffer = Buffer.alloc(offset === 0 ? 1 + paths.length * 4 + chunkSize : chunkSize);
	            if (offset === 0) {
	                buffer[0] = paths.length;
	                paths.forEach(function (element, index) {
	                    buffer.writeUInt32BE(element, 1 + 4 * index);
	                });
	                packed.copy(buffer, 1 + 4 * paths.length, offset, offset + chunkSize);
	            }
	            else {
	                packed.copy(buffer, 0, offset, offset + chunkSize);
	            }
	            toSend.push(buffer);
	            offset += chunkSize;
	        };
	        while (offset < packed.length) {
	            _loop_1();
	        }
	        var response;
	        return foreach(toSend, function (data, i) {
	            return _this.transport
	                .send(CLA, SIGN_MESSAGE, i === 0 ? 0x00 : 0x80, 0x00, data)
	                .then(function (apduResponse) {
	                response = apduResponse;
	            });
	        }).then(function () {
	            return response.slice(0, 65).toString("hex");
	        });
	    };
	    /**
	     * get Tron address for a given BIP 32 path.
	     * @param path a path in BIP 32 format
	     * @param publicKey address public key to generate pair key
	     * @return shared key hex string,
	     * @example
	     * const signature = await tron.getECDHPairKey("44'/195'/0'/0/0", "04ff21f8e64d3a3c0198edfbb7afdc79be959432e92e2f8a1984bb436a414b8edcec0345aad0c1bf7da04fd036dd7f9f617e30669224283d950fab9dd84831dc83");
	     */
	    Trx.prototype.getECDHPairKey = function (path, publicKey) {
	        var paths = splitPath(path);
	        var data = Buffer.from(publicKey, "hex");
	        var buffer = Buffer.alloc(1 + paths.length * 4 + data.length);
	        buffer[0] = paths.length;
	        paths.forEach(function (element, index) {
	            buffer.writeUInt32BE(element, 1 + 4 * index);
	        });
	        data.copy(buffer, 1 + 4 * paths.length, 0, data.length);
	        return this.transport
	            .send(CLA, ECDH_SECRET, 0x00, 0x01, buffer)
	            .then(function (response) { return response.slice(0, 65).toString("hex"); });
	    };
	    return Trx;
	}());

	var Trx$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: Trx
	});

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(Trx$1);

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;

	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function() {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active ) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }

	  handler = events[type];

	  if (!handler)
	    return false;

	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (list.length === 1) {
	          list[0] = undefined;
	          if (--this._eventsCount === 0) {
	            this._events = new EventHandlers();
	            return this;
	          } else {
	            delete events[type];
	          }
	        } else {
	          spliceOne(list, position);
	        }

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };
	    
	// Alias for removeListener added in NodeJS 10.0
	// https://nodejs.org/api/events.html#events_emitter_off_eventname_listener
	EventEmitter.prototype.off = function(type, listener){
	    return this.removeListener(type, listener);
	};

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        for (var i = 0, key; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = new EventHandlers();
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners) {
	        // LIFO order
	        do {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        } while (listeners[0]);
	      }

	      return this;
	    };

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	/* eslint-disable no-continue */
	/* eslint-disable no-unused-vars */
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-prototype-builtins */
	var __extends$2 = (undefined && undefined.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values$1 = (undefined && undefined.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	var errorClasses = {};
	var deserializers = {};
	var addCustomErrorDeserializer = function (name, deserializer) {
	    deserializers[name] = deserializer;
	};
	var createCustomErrorClass = function (name) {
	    var CustomErrorClass = /** @class */ (function (_super) {
	        __extends$2(CustomErrorClass, _super);
	        function CustomErrorClass(message, fields, options) {
	            var _this = 
	            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	            // @ts-ignore
	            _super.call(this, message || name, options) || this;
	            // Set the prototype explicitly. See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
	            Object.setPrototypeOf(_this, CustomErrorClass.prototype);
	            _this.name = name;
	            if (fields) {
	                for (var k in fields) {
	                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	                    // @ts-ignore
	                    _this[k] = fields[k];
	                }
	            }
	            if (options &&
	                isObject(options) &&
	                "cause" in options &&
	                !("cause" in _this)) {
	                // .cause was specified but the superconstructor
	                // did not create an instance property.
	                var cause = options.cause;
	                _this.cause = cause;
	                if ("stack" in cause) {
	                    _this.stack = _this.stack + "\nCAUSE: " + cause.stack;
	                }
	            }
	            return _this;
	        }
	        return CustomErrorClass;
	    }(Error));
	    errorClasses[name] = CustomErrorClass;
	    return CustomErrorClass;
	};
	function isObject(value) {
	    return typeof value === "object";
	}
	// inspired from https://github.com/programble/errio/blob/master/index.js
	var deserializeError = function (object) {
	    if (object && typeof object === "object") {
	        try {
	            if (typeof object.message === "string") {
	                var msg = JSON.parse(object.message);
	                if (msg.message && msg.name) {
	                    object = msg;
	                }
	            }
	        }
	        catch (e) {
	            // nothing
	        }
	        var error = void 0;
	        if (typeof object.name === "string") {
	            var name_1 = object.name;
	            var des = deserializers[name_1];
	            if (des) {
	                error = des(object);
	            }
	            else {
	                var constructor = name_1 === "Error" ? Error : errorClasses[name_1];
	                if (!constructor) {
	                    console.warn("deserializing an unknown class '" + name_1 + "'");
	                    constructor = createCustomErrorClass(name_1);
	                }
	                error = Object.create(constructor.prototype);
	                try {
	                    for (var prop in object) {
	                        if (object.hasOwnProperty(prop)) {
	                            error[prop] = object[prop];
	                        }
	                    }
	                }
	                catch (e) {
	                    // sometimes setting a property can fail (e.g. .name)
	                }
	            }
	        }
	        else {
	            if (typeof object.message === "string") {
	                error = new Error(object.message);
	            }
	        }
	        if (error && !error.stack && Error.captureStackTrace) {
	            Error.captureStackTrace(error, deserializeError);
	        }
	        return error;
	    }
	    return new Error(String(object));
	};
	// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
	var serializeError = function (value) {
	    if (!value)
	        return value;
	    if (typeof value === "object") {
	        return destroyCircular(value, []);
	    }
	    if (typeof value === "function") {
	        return "[Function: ".concat(value.name || "anonymous", "]");
	    }
	    return value;
	};
	// https://www.npmjs.com/package/destroy-circular
	function destroyCircular(from, seen) {
	    var e_1, _a;
	    var to = {};
	    seen.push(from);
	    try {
	        for (var _b = __values$1(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var key = _c.value;
	            var value = from[key];
	            if (typeof value === "function") {
	                continue;
	            }
	            if (!value || typeof value !== "object") {
	                to[key] = value;
	                continue;
	            }
	            if (seen.indexOf(from[key]) === -1) {
	                to[key] = destroyCircular(from[key], seen.slice(0));
	                continue;
	            }
	            to[key] = "[Circular]";
	        }
	    }
	    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	    finally {
	        try {
	            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
	        }
	        finally { if (e_1) throw e_1.error; }
	    }
	    if (typeof from.name === "string") {
	        to.name = from.name;
	    }
	    if (typeof from.message === "string") {
	        to.message = from.message;
	    }
	    if (typeof from.stack === "string") {
	        to.stack = from.stack;
	    }
	    return to;
	}

	var __extends$1 = (undefined && undefined.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
	var AccountNotSupported = createCustomErrorClass("AccountNotSupported");
	var AmountRequired = createCustomErrorClass("AmountRequired");
	var BluetoothRequired = createCustomErrorClass("BluetoothRequired");
	var BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
	var CantOpenDevice = createCustomErrorClass("CantOpenDevice");
	var CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
	var CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
	var DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
	var DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
	var DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
	var DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
	var DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
	var DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
	var DeviceHalted = createCustomErrorClass("DeviceHalted");
	var DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
	var DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
	var DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
	var LockedDeviceError = createCustomErrorClass("LockedDeviceError");
	var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
	var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
	var DeviceExtractOnboardingStateError = createCustomErrorClass("DeviceExtractOnboardingStateError");
	var DeviceOnboardingStatePollingError = createCustomErrorClass("DeviceOnboardingStatePollingError");
	var EnpointConfigError = createCustomErrorClass("EnpointConfig");
	var EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
	var FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
	var FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
	var HardResetFail = createCustomErrorClass("HardResetFail");
	var InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
	var InvalidAddress = createCustomErrorClass("InvalidAddress");
	var InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
	var LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
	var UnknownMCU = createCustomErrorClass("UnknownMCU");
	var LedgerAPIError = createCustomErrorClass("LedgerAPIError");
	var LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
	var LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
	var ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
	var ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
	var ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
	var ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
	var ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
	var ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
	var ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
	var ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
	var NetworkDown = createCustomErrorClass("NetworkDown");
	var NoAddressesFound = createCustomErrorClass("NoAddressesFound");
	var NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
	var NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
	var NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
	var NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
	var NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
	var NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
	var NotEnoughGas = createCustomErrorClass("NotEnoughGas");
	var NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
	var GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
	var PriorityFeeTooLow = createCustomErrorClass("PriorityFeeTooLow");
	var PriorityFeeTooHigh = createCustomErrorClass("PriorityFeeTooHigh");
	var PriorityFeeHigherThanMaxFee = createCustomErrorClass("PriorityFeeHigherThanMaxFee");
	var MaxFeeTooLow = createCustomErrorClass("MaxFeeTooLow");
	var PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
	var PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
	var RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
	var RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
	var TimeoutTagged = createCustomErrorClass("TimeoutTagged");
	var UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
	var MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
	var RecipientRequired = createCustomErrorClass("RecipientRequired");
	var UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
	var UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
	var UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
	var UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
	var UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
	var UpdateYourApp = createCustomErrorClass("UpdateYourApp");
	var UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
	var UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
	var UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
	var UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
	var UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
	var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
	var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
	var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
	var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
	var DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
	var WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
	var WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
	var WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
	var WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
	var ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
	var CantScanQRCode = createCustomErrorClass("CantScanQRCode");
	var FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
	var FeeRequired = createCustomErrorClass("FeeRequired");
	var FeeTooHigh = createCustomErrorClass("FeeTooHigh");
	var DustLimit = createCustomErrorClass("DustLimit");
	var PendingOperation = createCustomErrorClass("PendingOperation");
	var SyncError = createCustomErrorClass("SyncError");
	var PairingFailed = createCustomErrorClass("PairingFailed");
	var GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
	var LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
	var LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
	var FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired");
	var LanguageNotFound = createCustomErrorClass("LanguageNotFound");
	// db stuff, no need to translate
	var NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
	var DBWrongPassword = createCustomErrorClass("DBWrongPassword");
	var DBNotReset = createCustomErrorClass("DBNotReset");
	/**
	 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
	 */
	var HwTransportErrorType;
	(function (HwTransportErrorType) {
	    HwTransportErrorType[HwTransportErrorType["Unknown"] = 0] = "Unknown";
	    HwTransportErrorType[HwTransportErrorType["BleLocationServicesDisabled"] = 1] = "BleLocationServicesDisabled";
	    HwTransportErrorType[HwTransportErrorType["BleBluetoothUnauthorized"] = 2] = "BleBluetoothUnauthorized";
	    HwTransportErrorType[HwTransportErrorType["BleScanStartFailed"] = 3] = "BleScanStartFailed";
	})(HwTransportErrorType || (HwTransportErrorType = {}));
	/**
	 * Represents an error coming from any Transport implementation.
	 *
	 * Needed to map a specific implementation error into an error that
	 * can be managed by any code unaware of the specific Transport implementation
	 * that was used.
	 */
	var HwTransportError = /** @class */ (function (_super) {
	    __extends$1(HwTransportError, _super);
	    function HwTransportError(type, message) {
	        var _this = _super.call(this, message) || this;
	        _this.name = "HwTransportError";
	        _this.type = type;
	        // Needed as long as we target < ES6
	        Object.setPrototypeOf(_this, HwTransportError.prototype);
	        return _this;
	    }
	    return HwTransportError;
	}(Error));
	/**
	 * TransportError is used for any generic transport errors.
	 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
	 */
	var TransportError = /** @class */ (function (_super) {
	    __extends$1(TransportError, _super);
	    function TransportError(message, id) {
	        var _this = this;
	        var name = "TransportError";
	        _this = _super.call(this, message || name) || this;
	        _this.name = name;
	        _this.message = message;
	        _this.stack = new Error().stack;
	        _this.id = id;
	        return _this;
	    }
	    return TransportError;
	}(Error));
	addCustomErrorDeserializer("TransportError", function (e) { return new TransportError(e.message, e.id); });
	var StatusCodes = {
	    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
	    ALGORITHM_NOT_SUPPORTED: 0x9484,
	    CLA_NOT_SUPPORTED: 0x6e00,
	    CODE_BLOCKED: 0x9840,
	    CODE_NOT_INITIALIZED: 0x9802,
	    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
	    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
	    CONTRADICTION_INVALIDATION: 0x9810,
	    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
	    CUSTOM_IMAGE_BOOTLOADER: 0x662f,
	    CUSTOM_IMAGE_EMPTY: 0x662e,
	    FILE_ALREADY_EXISTS: 0x6a89,
	    FILE_NOT_FOUND: 0x9404,
	    GP_AUTH_FAILED: 0x6300,
	    HALTED: 0x6faa,
	    INCONSISTENT_FILE: 0x9408,
	    INCORRECT_DATA: 0x6a80,
	    INCORRECT_LENGTH: 0x6700,
	    INCORRECT_P1_P2: 0x6b00,
	    INS_NOT_SUPPORTED: 0x6d00,
	    INVALID_KCV: 0x9485,
	    INVALID_OFFSET: 0x9402,
	    LICENSING: 0x6f42,
	    LOCKED_DEVICE: 0x5515,
	    MAX_VALUE_REACHED: 0x9850,
	    MEMORY_PROBLEM: 0x9240,
	    MISSING_CRITICAL_PARAMETER: 0x6800,
	    NO_EF_SELECTED: 0x9400,
	    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
	    OK: 0x9000,
	    PIN_REMAINING_ATTEMPTS: 0x63c0,
	    REFERENCED_DATA_NOT_FOUND: 0x6a88,
	    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
	    TECHNICAL_PROBLEM: 0x6f00,
	    UNKNOWN_APDU: 0x6d02,
	    USER_REFUSED_ON_DEVICE: 0x5501
	};
	function getAltStatusMessage(code) {
	    switch (code) {
	        // improve text of most common errors
	        case 0x6700:
	            return "Incorrect length";
	        case 0x6800:
	            return "Missing critical parameter";
	        case 0x6982:
	            return "Security not satisfied (dongle locked or have invalid access rights)";
	        case 0x6985:
	            return "Condition of use not satisfied (denied by the user?)";
	        case 0x6a80:
	            return "Invalid data received";
	        case 0x6b00:
	            return "Invalid parameter received";
	        case 0x5515:
	            return "Locked device";
	    }
	    if (0x6f00 <= code && code <= 0x6fff) {
	        return "Internal error, please report";
	    }
	}
	/**
	 * Error thrown when a device returned a non success status.
	 * the error.statusCode is one of the `StatusCodes` exported by this library.
	 */
	function TransportStatusError(statusCode) {
	    var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
	        "UNKNOWN_ERROR";
	    var smsg = getAltStatusMessage(statusCode) || statusText;
	    var statusCodeStr = statusCode.toString(16);
	    var message = "Ledger device: ".concat(smsg, " (0x").concat(statusCodeStr, ")");
	    // Maps to a LockedDeviceError
	    if (statusCode === StatusCodes.LOCKED_DEVICE) {
	        throw new LockedDeviceError(message);
	    }
	    this.name = "TransportStatusError";
	    this.message = message;
	    this.stack = new Error().stack;
	    this.statusCode = statusCode;
	    this.statusText = statusText;
	}
	TransportStatusError.prototype = new Error();
	addCustomErrorDeserializer("TransportStatusError", function (e) { return new TransportStatusError(e.statusCode); });

	var libEs = /*#__PURE__*/Object.freeze({
		__proto__: null,
		AccountNameRequiredError: AccountNameRequiredError,
		AccountNotSupported: AccountNotSupported,
		AmountRequired: AmountRequired,
		BluetoothRequired: BluetoothRequired,
		BtcUnmatchedApp: BtcUnmatchedApp,
		CantOpenDevice: CantOpenDevice,
		CantScanQRCode: CantScanQRCode,
		CashAddrNotSupported: CashAddrNotSupported,
		CurrencyNotSupported: CurrencyNotSupported,
		DBNotReset: DBNotReset,
		DBWrongPassword: DBWrongPassword,
		DeviceAppVerifyNotSupported: DeviceAppVerifyNotSupported,
		DeviceExtractOnboardingStateError: DeviceExtractOnboardingStateError,
		DeviceGenuineSocketEarlyClose: DeviceGenuineSocketEarlyClose,
		DeviceHalted: DeviceHalted,
		DeviceInOSUExpected: DeviceInOSUExpected,
		DeviceNameInvalid: DeviceNameInvalid,
		DeviceNotGenuineError: DeviceNotGenuineError,
		DeviceOnDashboardExpected: DeviceOnDashboardExpected,
		DeviceOnDashboardUnexpected: DeviceOnDashboardUnexpected,
		DeviceOnboardingStatePollingError: DeviceOnboardingStatePollingError,
		DeviceShouldStayInApp: DeviceShouldStayInApp,
		DeviceSocketFail: DeviceSocketFail,
		DeviceSocketNoBulkStatus: DeviceSocketNoBulkStatus,
		DisconnectedDevice: DisconnectedDevice,
		DisconnectedDeviceDuringOperation: DisconnectedDeviceDuringOperation,
		DustLimit: DustLimit,
		ETHAddressNonEIP: ETHAddressNonEIP,
		EnpointConfigError: EnpointConfigError,
		EthAppPleaseEnableContractData: EthAppPleaseEnableContractData,
		FeeEstimationFailed: FeeEstimationFailed,
		FeeNotLoaded: FeeNotLoaded,
		FeeRequired: FeeRequired,
		FeeTooHigh: FeeTooHigh,
		FirmwareNotRecognized: FirmwareNotRecognized,
		FirmwareOrAppUpdateRequired: FirmwareOrAppUpdateRequired,
		GasLessThanEstimate: GasLessThanEstimate,
		GenuineCheckFailed: GenuineCheckFailed,
		HardResetFail: HardResetFail,
		HwTransportError: HwTransportError,
		get HwTransportErrorType () { return HwTransportErrorType; },
		InvalidAddress: InvalidAddress,
		InvalidAddressBecauseDestinationIsAlsoSource: InvalidAddressBecauseDestinationIsAlsoSource,
		InvalidXRPTag: InvalidXRPTag,
		LanguageNotFound: LanguageNotFound,
		LatestMCUInstalledError: LatestMCUInstalledError,
		LedgerAPI4xx: LedgerAPI4xx,
		LedgerAPI5xx: LedgerAPI5xx,
		LedgerAPIError: LedgerAPIError,
		LedgerAPIErrorWithMessage: LedgerAPIErrorWithMessage,
		LedgerAPINotAvailable: LedgerAPINotAvailable,
		LockedDeviceError: LockedDeviceError,
		MCUNotGenuineToDashboard: MCUNotGenuineToDashboard,
		ManagerAppAlreadyInstalledError: ManagerAppAlreadyInstalledError,
		ManagerAppDepInstallRequired: ManagerAppDepInstallRequired,
		ManagerAppDepUninstallRequired: ManagerAppDepUninstallRequired,
		ManagerAppRelyOnBTCError: ManagerAppRelyOnBTCError,
		ManagerDeviceLockedError: ManagerDeviceLockedError,
		ManagerFirmwareNotEnoughSpaceError: ManagerFirmwareNotEnoughSpaceError,
		ManagerNotEnoughSpaceError: ManagerNotEnoughSpaceError,
		ManagerUninstallBTCDep: ManagerUninstallBTCDep,
		MaxFeeTooLow: MaxFeeTooLow,
		NetworkDown: NetworkDown,
		NoAccessToCamera: NoAccessToCamera,
		NoAddressesFound: NoAddressesFound,
		NoDBPathGiven: NoDBPathGiven,
		NotEnoughBalance: NotEnoughBalance,
		NotEnoughBalanceBecauseDestinationNotCreated: NotEnoughBalanceBecauseDestinationNotCreated,
		NotEnoughBalanceInParentAccount: NotEnoughBalanceInParentAccount,
		NotEnoughBalanceToDelegate: NotEnoughBalanceToDelegate,
		NotEnoughGas: NotEnoughGas,
		NotEnoughSpendableBalance: NotEnoughSpendableBalance,
		NotSupportedLegacyAddress: NotSupportedLegacyAddress,
		PairingFailed: PairingFailed,
		PasswordIncorrectError: PasswordIncorrectError,
		PasswordsDontMatchError: PasswordsDontMatchError,
		PendingOperation: PendingOperation,
		PriorityFeeHigherThanMaxFee: PriorityFeeHigherThanMaxFee,
		PriorityFeeTooHigh: PriorityFeeTooHigh,
		PriorityFeeTooLow: PriorityFeeTooLow,
		RecipientRequired: RecipientRequired,
		RecommendSubAccountsToEmpty: RecommendSubAccountsToEmpty,
		RecommendUndelegation: RecommendUndelegation,
		StatusCodes: StatusCodes,
		SyncError: SyncError,
		TimeoutTagged: TimeoutTagged,
		TransportError: TransportError,
		TransportInterfaceNotAvailable: TransportInterfaceNotAvailable,
		TransportOpenUserCancelled: TransportOpenUserCancelled,
		TransportRaceCondition: TransportRaceCondition,
		TransportStatusError: TransportStatusError,
		TransportWebUSBGestureRequired: TransportWebUSBGestureRequired,
		UnavailableTezosOriginatedAccountReceive: UnavailableTezosOriginatedAccountReceive,
		UnavailableTezosOriginatedAccountSend: UnavailableTezosOriginatedAccountSend,
		UnexpectedBootloader: UnexpectedBootloader,
		UnknownMCU: UnknownMCU,
		UpdateFetchFileFail: UpdateFetchFileFail,
		UpdateIncorrectHash: UpdateIncorrectHash,
		UpdateIncorrectSig: UpdateIncorrectSig,
		UpdateYourApp: UpdateYourApp,
		UserRefusedAddress: UserRefusedAddress,
		UserRefusedAllowManager: UserRefusedAllowManager,
		UserRefusedDeviceNameChange: UserRefusedDeviceNameChange,
		UserRefusedFirmwareUpdate: UserRefusedFirmwareUpdate,
		UserRefusedOnDevice: UserRefusedOnDevice,
		WebsocketConnectionError: WebsocketConnectionError,
		WebsocketConnectionFailed: WebsocketConnectionFailed,
		WrongAppForCurrency: WrongAppForCurrency,
		WrongDeviceForAccount: WrongDeviceForAccount,
		addCustomErrorDeserializer: addCustomErrorDeserializer,
		createCustomErrorClass: createCustomErrorClass,
		deserializeError: deserializeError,
		getAltStatusMessage: getAltStatusMessage,
		serializeError: serializeError
	});

	var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __read$1 = (undefined && undefined.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	var __values = (undefined && undefined.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	/**
	 * Transport defines the generic interface to share between node/u2f impl
	 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
	 * it can be for instance an ID, an file path, a URL,...
	 */
	var Transport = /** @class */ (function () {
	    function Transport() {
	        var _this = this;
	        this.exchangeTimeout = 30000;
	        this.unresponsiveTimeout = 15000;
	        this.deviceModel = null;
	        this._events = new EventEmitter();
	        /**
	         * wrapper on top of exchange to simplify work of the implementation.
	         * @param cla
	         * @param ins
	         * @param p1
	         * @param p2
	         * @param data
	         * @param statusList is a list of accepted status code (shorts). [0x9000] by default
	         * @return a Promise of response buffer
	         */
	        this.send = function (cla, ins, p1, p2, data, statusList) {
	            if (data === void 0) { data = Buffer.alloc(0); }
	            if (statusList === void 0) { statusList = [StatusCodes.OK]; }
	            return __awaiter$3(_this, void 0, void 0, function () {
	                var response, sw;
	                return __generator$1(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            if (data.length >= 256) {
	                                throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
	                            }
	                            return [4 /*yield*/, this.exchange(Buffer.concat([
	                                    Buffer.from([cla, ins, p1, p2]),
	                                    Buffer.from([data.length]),
	                                    data,
	                                ]))];
	                        case 1:
	                            response = _a.sent();
	                            sw = response.readUInt16BE(response.length - 2);
	                            if (!statusList.some(function (s) { return s === sw; })) {
	                                throw new TransportStatusError(sw);
	                            }
	                            return [2 /*return*/, response];
	                    }
	                });
	            });
	        };
	        this.exchangeAtomicImpl = function (f) { return __awaiter$3(_this, void 0, void 0, function () {
	            var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
	            var _this = this;
	            return __generator$1(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (this.exchangeBusyPromise) {
	                            throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
	                        }
	                        busyPromise = new Promise(function (r) {
	                            resolveBusy = r;
	                        });
	                        this.exchangeBusyPromise = busyPromise;
	                        unresponsiveReached = false;
	                        timeout = setTimeout(function () {
	                            unresponsiveReached = true;
	                            _this.emit("unresponsive");
	                        }, this.unresponsiveTimeout);
	                        _a.label = 1;
	                    case 1:
	                        _a.trys.push([1, , 3, 4]);
	                        return [4 /*yield*/, f()];
	                    case 2:
	                        res = _a.sent();
	                        if (unresponsiveReached) {
	                            this.emit("responsive");
	                        }
	                        return [2 /*return*/, res];
	                    case 3:
	                        clearTimeout(timeout);
	                        if (resolveBusy)
	                            resolveBusy();
	                        this.exchangeBusyPromise = null;
	                        return [7 /*endfinally*/];
	                    case 4: return [2 /*return*/];
	                }
	            });
	        }); };
	        this._appAPIlock = null;
	    }
	    /**
	     * low level api to communicate with the device
	     * This method is for implementations to implement but should not be directly called.
	     * Instead, the recommanded way is to use send() method
	     * @param apdu the data to send
	     * @return a Promise of response data
	     */
	    Transport.prototype.exchange = function (_apdu) {
	        throw new Error("exchange not implemented");
	    };
	    /**
	     * set the "scramble key" for the next exchanges with the device.
	     * Each App can have a different scramble key and they internally will set it at instanciation.
	     * @param key the scramble key
	     */
	    Transport.prototype.setScrambleKey = function (_key) { };
	    /**
	     * close the exchange with the device.
	     * @return a Promise that ends when the transport is closed.
	     */
	    Transport.prototype.close = function () {
	        return Promise.resolve();
	    };
	    /**
	     * Listen to an event on an instance of transport.
	     * Transport implementation can have specific events. Here is the common events:
	     * * `"disconnect"` : triggered if Transport is disconnected
	     */
	    Transport.prototype.on = function (eventName, cb) {
	        this._events.on(eventName, cb);
	    };
	    /**
	     * Stop listening to an event on an instance of transport.
	     */
	    Transport.prototype.off = function (eventName, cb) {
	        this._events.removeListener(eventName, cb);
	    };
	    Transport.prototype.emit = function (event) {
	        var _a;
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        (_a = this._events).emit.apply(_a, __spreadArray([event], __read$1(args), false));
	    };
	    /**
	     * Enable or not logs of the binary exchange
	     */
	    Transport.prototype.setDebugMode = function () {
	        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
	    };
	    /**
	     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
	     */
	    Transport.prototype.setExchangeTimeout = function (exchangeTimeout) {
	        this.exchangeTimeout = exchangeTimeout;
	    };
	    /**
	     * Define the delay before emitting "unresponsive" on an exchange that does not respond
	     */
	    Transport.prototype.setExchangeUnresponsiveTimeout = function (unresponsiveTimeout) {
	        this.unresponsiveTimeout = unresponsiveTimeout;
	    };
	    /**
	     * create() allows to open the first descriptor available or
	     * throw if there is none or if timeout is reached.
	     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
	     * @example
	    TransportFoo.create().then(transport => ...)
	     */
	    Transport.create = function (openTimeout, listenTimeout) {
	        var _this = this;
	        if (openTimeout === void 0) { openTimeout = 3000; }
	        return new Promise(function (resolve, reject) {
	            var found = false;
	            var sub = _this.listen({
	                next: function (e) {
	                    found = true;
	                    if (sub)
	                        sub.unsubscribe();
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    _this.open(e.descriptor, openTimeout).then(resolve, reject);
	                },
	                error: function (e) {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    reject(e);
	                },
	                complete: function () {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    if (!found) {
	                        reject(new TransportError(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
	                    }
	                }
	            });
	            var listenTimeoutId = listenTimeout
	                ? setTimeout(function () {
	                    sub.unsubscribe();
	                    reject(new TransportError(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
	                }, listenTimeout)
	                : null;
	        });
	    };
	    Transport.prototype.decorateAppAPIMethods = function (self, methods, scrambleKey) {
	        var e_1, _a;
	        try {
	            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
	                var methodName = methods_1_1.value;
	                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	    };
	    Transport.prototype.decorateAppAPIMethod = function (methodName, f, ctx, scrambleKey) {
	        var _this = this;
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return __awaiter$3(_this, void 0, void 0, function () {
	                var _appAPIlock;
	                return __generator$1(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            _appAPIlock = this._appAPIlock;
	                            if (_appAPIlock) {
	                                return [2 /*return*/, Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))];
	                            }
	                            _a.label = 1;
	                        case 1:
	                            _a.trys.push([1, , 3, 4]);
	                            this._appAPIlock = methodName;
	                            this.setScrambleKey(scrambleKey);
	                            return [4 /*yield*/, f.apply(ctx, args)];
	                        case 2: return [2 /*return*/, _a.sent()];
	                        case 3:
	                            this._appAPIlock = null;
	                            return [7 /*endfinally*/];
	                        case 4: return [2 /*return*/];
	                    }
	                });
	            });
	        };
	    };
	    Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
	    Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
	    return Transport;
	}());

	var hidFraming$1 = {};

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(libEs);

	(function (exports) {
		exports.__esModule = true;
		var errors_1 = require$$0;
		var Tag = 0x05;
		function asUInt16BE(value) {
		    var b = Buffer.alloc(2);
		    b.writeUInt16BE(value, 0);
		    return b;
		}
		var initialAcc = {
		    data: Buffer.alloc(0),
		    dataLength: 0,
		    sequence: 0
		};
		/**
		 *
		 */
		var createHIDframing = function (channel, packetSize) {
		    return {
		        makeBlocks: function (apdu) {
		            var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
		            var blockSize = packetSize - 5;
		            var nbBlocks = Math.ceil(data.length / blockSize);
		            data = Buffer.concat([
		                data,
		                Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
		            ]);
		            var blocks = [];
		            for (var i = 0; i < nbBlocks; i++) {
		                var head = Buffer.alloc(5);
		                head.writeUInt16BE(channel, 0);
		                head.writeUInt8(Tag, 2);
		                head.writeUInt16BE(i, 3);
		                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
		                blocks.push(Buffer.concat([head, chunk]));
		            }
		            return blocks;
		        },
		        reduceResponse: function (acc, chunk) {
		            var _a = acc || initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
		            if (chunk.readUInt16BE(0) !== channel) {
		                throw new errors_1.TransportError("Invalid channel", "InvalidChannel");
		            }
		            if (chunk.readUInt8(2) !== Tag) {
		                throw new errors_1.TransportError("Invalid tag", "InvalidTag");
		            }
		            if (chunk.readUInt16BE(3) !== sequence) {
		                throw new errors_1.TransportError("Invalid sequence", "InvalidSequence");
		            }
		            if (!acc) {
		                dataLength = chunk.readUInt16BE(5);
		            }
		            sequence++;
		            var chunkData = chunk.slice(acc ? 5 : 7);
		            data = Buffer.concat([data, chunkData]);
		            if (data.length > dataLength) {
		                data = data.slice(0, dataLength);
		            }
		            return {
		                data: data,
		                dataLength: dataLength,
		                sequence: sequence
		            };
		        },
		        getReducedResult: function (acc) {
		            if (acc && acc.dataLength === acc.data.length) {
		                return acc.data;
		            }
		        }
		    };
		};
		exports["default"] = createHIDframing;
		
	} (hidFraming$1));

	var hidFraming = /*@__PURE__*/getDefaultExportFromCjs(hidFraming$1);

	var re$3 = {exports: {}};

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	const SEMVER_SPEC_VERSION = '2.0.0';

	const MAX_LENGTH$2 = 256;
	const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
	/* istanbul ignore next */ 9007199254740991;

	// Max safe segment length for coercion.
	const MAX_SAFE_COMPONENT_LENGTH = 16;

	var constants$1 = {
	  SEMVER_SPEC_VERSION,
	  MAX_LENGTH: MAX_LENGTH$2,
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
	  MAX_SAFE_COMPONENT_LENGTH,
	};

	const debug$1 = (
	  typeof process === 'object' &&
	  process.env &&
	  process.env.NODE_DEBUG &&
	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
	) ? (...args) => console.error('SEMVER', ...args)
	  : () => {};

	var debug_1 = debug$1;

	(function (module, exports) {
		const { MAX_SAFE_COMPONENT_LENGTH } = constants$1;
		const debug = debug_1;
		exports = module.exports = {};

		// The actual regexps go on exports.re
		const re = exports.re = [];
		const src = exports.src = [];
		const t = exports.t = {};
		let R = 0;

		const createToken = (name, value, isGlobal) => {
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		};

		// The following Regular Expressions can be used for tokenizing,
		// validating, and parsing SemVer version strings.

		// ## Numeric Identifier
		// A single `0`, or a non-zero digit followed by zero or more digits.

		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

		// ## Non-numeric Identifier
		// Zero or more digits, followed by a letter or hyphen, and then zero or
		// more letters, digits, or hyphens.

		createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

		// ## Main Version
		// Three dot-separated numeric identifiers.

		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})`);

		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version Identifier
		// A numeric identifier, or a non-numeric identifier.

		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
	}|${src[t.NONNUMERICIDENTIFIER]})`);

		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
	}|${src[t.NONNUMERICIDENTIFIER]})`);

		// ## Pre-release Version
		// Hyphen, followed by one or more dot-separated pre-release version
		// identifiers.

		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
	}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
	}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

		// ## Build Metadata Identifier
		// Any combination of digits, letters, or hyphens.

		createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

		// ## Build Metadata
		// Plus sign, followed by one or more period-separated build metadata
		// identifiers.

		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
	}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

		// ## Full Version String
		// A main version, followed optionally by a pre-release version and
		// build metadata.

		// Note that the only major, minor, patch, and pre-release sections of
		// the version string are capturing groups.  The build metadata is not a
		// capturing group, because it should not ever be used in version
		// comparison.

		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
	}${src[t.PRERELEASE]}?${
	  src[t.BUILD]}?`);

		createToken('FULL', `^${src[t.FULLPLAIN]}$`);

		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
		// common in the npm registry.
		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
	}${src[t.PRERELEASELOOSE]}?${
	  src[t.BUILD]}?`);

		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

		createToken('GTLT', '((?:<|>)?=?)');

		// Something like "2.*" or "1.2.x".
		// Note that "x.x" is a valid xRange identifer, meaning "any version"
		// Only the first item is strictly required.
		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:${src[t.PRERELEASE]})?${
	                     src[t.BUILD]}?` +
		                   `)?)?`);

		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:${src[t.PRERELEASELOOSE]})?${
	                          src[t.BUILD]}?` +
		                        `)?)?`);

		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

		// Coercion.
		// Extract anything that could conceivably be a part of a valid semver
		createToken('COERCE', `${'(^|[^\\d])' +
	              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:$|[^\\d])`);
		createToken('COERCERTL', src[t.COERCE], true);

		// Tilde ranges.
		// Meaning is "reasonably at or greater than"
		createToken('LONETILDE', '(?:~>?)');

		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports.tildeTrimReplace = '$1~';

		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

		// Caret ranges.
		// Meaning is "at least and backwards compatible with"
		createToken('LONECARET', '(?:\\^)');

		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports.caretTrimReplace = '$1^';

		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

		// A simple gt/lt/eq thing, or just "" to indicate "any version"
		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

		// An expression to strip any whitespace between the gtlt and the thing
		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
	}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports.comparatorTrimReplace = '$1$2$3';

		// Something like `1.2.3 - 1.2.4`
		// Note that these all use the loose form, because they'll be
		// checked against either the strict or loose comparator form
		// later.
		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
		                   `\\s+-\\s+` +
		                   `(${src[t.XRANGEPLAIN]})` +
		                   `\\s*$`);

		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s+-\\s+` +
		                        `(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s*$`);

		// Star ranges basically just allow anything at all.
		createToken('STAR', '(<|>)?=?\\s*\\*');
		// >=0.0.0 is like a star
		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$'); 
	} (re$3, re$3.exports));

	var reExports = re$3.exports;

	// parse out just the options we care about so we always get a consistent
	// obj with keys in a consistent order.
	const opts = ['includePrerelease', 'loose', 'rtl'];
	const parseOptions$2 = options =>
	  !options ? {}
	  : typeof options !== 'object' ? { loose: true }
	  : opts.filter(k => options[k]).reduce((o, k) => {
	    o[k] = true;
	    return o
	  }, {});
	var parseOptions_1 = parseOptions$2;

	const numeric = /^[0-9]+$/;
	const compareIdentifiers$1 = (a, b) => {
	  const anum = numeric.test(a);
	  const bnum = numeric.test(b);

	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }

	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	};

	const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

	var identifiers$1 = {
	  compareIdentifiers: compareIdentifiers$1,
	  rcompareIdentifiers,
	};

	const debug = debug_1;
	const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants$1;
	const { re: re$2, t: t$4 } = reExports;

	const parseOptions$1 = parseOptions_1;
	const { compareIdentifiers } = identifiers$1;
	let SemVer$d = class SemVer {
	  constructor (version, options) {
	    options = parseOptions$1(options);

	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose &&
	          version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }

	    if (version.length > MAX_LENGTH$1) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH$1} characters`
	      )
	    }

	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    // this isn't actually relevant for versions, but keep it so that we
	    // don't run into trouble passing this.options around.
	    this.includePrerelease = !!options.includePrerelease;

	    const m = version.trim().match(options.loose ? re$2[t$4.LOOSE] : re$2[t$4.FULL]);

	    if (!m) {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }

	    this.raw = version;

	    // these are actually numbers
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];

	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version')
	    }

	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version')
	    }

	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version')
	    }

	    // numberify any prerelease numeric ids
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map((id) => {
	        if (/^[0-9]+$/.test(id)) {
	          const num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num
	          }
	        }
	        return id
	      });
	    }

	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }

	  format () {
	    this.version = `${this.major}.${this.minor}.${this.patch}`;
	    if (this.prerelease.length) {
	      this.version += `-${this.prerelease.join('.')}`;
	    }
	    return this.version
	  }

	  toString () {
	    return this.version
	  }

	  compare (other) {
	    debug('SemVer.compare', this.version, this.options, other);
	    if (!(other instanceof SemVer)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer(other, this.options);
	    }

	    if (other.version === this.version) {
	      return 0
	    }

	    return this.compareMain(other) || this.comparePre(other)
	  }

	  compareMain (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    return (
	      compareIdentifiers(this.major, other.major) ||
	      compareIdentifiers(this.minor, other.minor) ||
	      compareIdentifiers(this.patch, other.patch)
	    )
	  }

	  comparePre (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    // NOT having a prerelease is > having one
	    if (this.prerelease.length && !other.prerelease.length) {
	      return -1
	    } else if (!this.prerelease.length && other.prerelease.length) {
	      return 1
	    } else if (!this.prerelease.length && !other.prerelease.length) {
	      return 0
	    }

	    let i = 0;
	    do {
	      const a = this.prerelease[i];
	      const b = other.prerelease[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  compareBuild (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    let i = 0;
	    do {
	      const a = this.build[i];
	      const b = other.build[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  // preminor will bump the version up to the next minor release, and immediately
	  // down to pre-release. premajor and prepatch work the same way.
	  inc (release, identifier) {
	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier);
	        break
	      case 'prepatch':
	        // If this is already a prerelease, it will bump to the next version
	        // drop any prereleases that might already exist, since they are not
	        // relevant at this point.
	        this.prerelease.length = 0;
	        this.inc('patch', identifier);
	        this.inc('pre', identifier);
	        break
	      // If the input is a non-prerelease version, this acts the same as
	      // prepatch.
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier);
	        }
	        this.inc('pre', identifier);
	        break

	      case 'major':
	        // If this is a pre-major version, bump up to the same major version.
	        // Otherwise increment major.
	        // 1.0.0-5 bumps to 1.0.0
	        // 1.1.0 bumps to 2.0.0
	        if (
	          this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0
	        ) {
	          this.major++;
	        }
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'minor':
	        // If this is a pre-minor version, bump up to the same minor version.
	        // Otherwise increment minor.
	        // 1.2.0-5 bumps to 1.2.0
	        // 1.2.1 bumps to 1.3.0
	        if (this.patch !== 0 || this.prerelease.length === 0) {
	          this.minor++;
	        }
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'patch':
	        // If this is not a pre-release version, it will increment the patch.
	        // If it is a pre-release it will bump up to the same patch version.
	        // 1.2.0-5 patches to 1.2.0
	        // 1.2.0 patches to 1.2.1
	        if (this.prerelease.length === 0) {
	          this.patch++;
	        }
	        this.prerelease = [];
	        break
	      // This probably shouldn't be used publicly.
	      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
	      case 'pre':
	        if (this.prerelease.length === 0) {
	          this.prerelease = [0];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            // didn't increment anything
	            this.prerelease.push(0);
	          }
	        }
	        if (identifier) {
	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = [identifier, 0];
	            }
	          } else {
	            this.prerelease = [identifier, 0];
	          }
	        }
	        break

	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.format();
	    this.raw = this.version;
	    return this
	  }
	};

	var semver$2 = SemVer$d;

	const { MAX_LENGTH } = constants$1;
	const { re: re$1, t: t$3 } = reExports;
	const SemVer$c = semver$2;

	const parseOptions = parseOptions_1;
	const parse$6 = (version, options) => {
	  options = parseOptions(options);

	  if (version instanceof SemVer$c) {
	    return version
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  if (version.length > MAX_LENGTH) {
	    return null
	  }

	  const r = options.loose ? re$1[t$3.LOOSE] : re$1[t$3.FULL];
	  if (!r.test(version)) {
	    return null
	  }

	  try {
	    return new SemVer$c(version, options)
	  } catch (er) {
	    return null
	  }
	};

	var parse_1 = parse$6;

	const parse$5 = parse_1;
	const valid$2 = (version, options) => {
	  const v = parse$5(version, options);
	  return v ? v.version : null
	};
	var valid_1 = valid$2;

	const parse$4 = parse_1;
	const clean$1 = (version, options) => {
	  const s = parse$4(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	var clean_1 = clean$1;

	const SemVer$b = semver$2;

	const inc$1 = (version, release, options, identifier) => {
	  if (typeof (options) === 'string') {
	    identifier = options;
	    options = undefined;
	  }

	  try {
	    return new SemVer$b(
	      version instanceof SemVer$b ? version.version : version,
	      options
	    ).inc(release, identifier).version
	  } catch (er) {
	    return null
	  }
	};
	var inc_1 = inc$1;

	const SemVer$a = semver$2;
	const compare$b = (a, b, loose) =>
	  new SemVer$a(a, loose).compare(new SemVer$a(b, loose));

	var compare_1 = compare$b;

	const compare$a = compare_1;
	const eq$3 = (a, b, loose) => compare$a(a, b, loose) === 0;
	var eq_1 = eq$3;

	const parse$3 = parse_1;
	const eq$2 = eq_1;

	const diff$1 = (version1, version2) => {
	  if (eq$2(version1, version2)) {
	    return null
	  } else {
	    const v1 = parse$3(version1);
	    const v2 = parse$3(version2);
	    const hasPre = v1.prerelease.length || v2.prerelease.length;
	    const prefix = hasPre ? 'pre' : '';
	    const defaultResult = hasPre ? 'prerelease' : '';
	    for (const key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return prefix + key
	        }
	      }
	    }
	    return defaultResult // may be undefined
	  }
	};
	var diff_1 = diff$1;

	const SemVer$9 = semver$2;
	const major$1 = (a, loose) => new SemVer$9(a, loose).major;
	var major_1 = major$1;

	const SemVer$8 = semver$2;
	const minor$1 = (a, loose) => new SemVer$8(a, loose).minor;
	var minor_1 = minor$1;

	const SemVer$7 = semver$2;
	const patch$1 = (a, loose) => new SemVer$7(a, loose).patch;
	var patch_1 = patch$1;

	const parse$2 = parse_1;
	const prerelease$1 = (version, options) => {
	  const parsed = parse$2(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	var prerelease_1 = prerelease$1;

	const compare$9 = compare_1;
	const rcompare$1 = (a, b, loose) => compare$9(b, a, loose);
	var rcompare_1 = rcompare$1;

	const compare$8 = compare_1;
	const compareLoose$1 = (a, b) => compare$8(a, b, true);
	var compareLoose_1 = compareLoose$1;

	const SemVer$6 = semver$2;
	const compareBuild$3 = (a, b, loose) => {
	  const versionA = new SemVer$6(a, loose);
	  const versionB = new SemVer$6(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	var compareBuild_1 = compareBuild$3;

	const compareBuild$2 = compareBuild_1;
	const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$2(a, b, loose));
	var sort_1 = sort$1;

	const compareBuild$1 = compareBuild_1;
	const rsort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(b, a, loose));
	var rsort_1 = rsort$1;

	const compare$7 = compare_1;
	const gt$4 = (a, b, loose) => compare$7(a, b, loose) > 0;
	var gt_1 = gt$4;

	const compare$6 = compare_1;
	const lt$3 = (a, b, loose) => compare$6(a, b, loose) < 0;
	var lt_1 = lt$3;

	const compare$5 = compare_1;
	const neq$2 = (a, b, loose) => compare$5(a, b, loose) !== 0;
	var neq_1 = neq$2;

	const compare$4 = compare_1;
	const gte$3 = (a, b, loose) => compare$4(a, b, loose) >= 0;
	var gte_1 = gte$3;

	const compare$3 = compare_1;
	const lte$3 = (a, b, loose) => compare$3(a, b, loose) <= 0;
	var lte_1 = lte$3;

	const eq$1 = eq_1;
	const neq$1 = neq_1;
	const gt$3 = gt_1;
	const gte$2 = gte_1;
	const lt$2 = lt_1;
	const lte$2 = lte_1;

	const cmp$1 = (a, op, b, loose) => {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a === b

	    case '!==':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a !== b

	    case '':
	    case '=':
	    case '==':
	      return eq$1(a, b, loose)

	    case '!=':
	      return neq$1(a, b, loose)

	    case '>':
	      return gt$3(a, b, loose)

	    case '>=':
	      return gte$2(a, b, loose)

	    case '<':
	      return lt$2(a, b, loose)

	    case '<=':
	      return lte$2(a, b, loose)

	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	var cmp_1 = cmp$1;

	const SemVer$5 = semver$2;
	const parse$1 = parse_1;
	const { re, t: t$2 } = reExports;

	const coerce$1 = (version, options) => {
	  if (version instanceof SemVer$5) {
	    return version
	  }

	  if (typeof version === 'number') {
	    version = String(version);
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  options = options || {};

	  let match = null;
	  if (!options.rtl) {
	    match = version.match(re[t$2.COERCE]);
	  } else {
	    // Find the right-most coercible string that does not share
	    // a terminus with a more left-ward coercible string.
	    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
	    //
	    // Walk through the string checking with a /g regexp
	    // Manually set the index so as to pick up overlapping matches.
	    // Stop when we get a match that ends at the string end, since no
	    // coercible string can be more right-ward without the same terminus.
	    let next;
	    while ((next = re[t$2.COERCERTL].exec(version)) &&
	        (!match || match.index + match[0].length !== version.length)
	    ) {
	      if (!match ||
	            next.index + next[0].length !== match.index + match[0].length) {
	        match = next;
	      }
	      re[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
	    }
	    // leave it in a clean state
	    re[t$2.COERCERTL].lastIndex = -1;
	  }

	  if (match === null) {
	    return null
	  }

	  return parse$1(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
	};
	var coerce_1 = coerce$1;

	var iterator;
	var hasRequiredIterator;

	function requireIterator () {
		if (hasRequiredIterator) return iterator;
		hasRequiredIterator = 1;
		iterator = function (Yallist) {
		  Yallist.prototype[Symbol.iterator] = function* () {
		    for (let walker = this.head; walker; walker = walker.next) {
		      yield walker.value;
		    }
		  };
		};
		return iterator;
	}

	var yallist;
	var hasRequiredYallist;

	function requireYallist () {
		if (hasRequiredYallist) return yallist;
		hasRequiredYallist = 1;
		yallist = Yallist;

		Yallist.Node = Node;
		Yallist.create = Yallist;

		function Yallist (list) {
		  var self = this;
		  if (!(self instanceof Yallist)) {
		    self = new Yallist();
		  }

		  self.tail = null;
		  self.head = null;
		  self.length = 0;

		  if (list && typeof list.forEach === 'function') {
		    list.forEach(function (item) {
		      self.push(item);
		    });
		  } else if (arguments.length > 0) {
		    for (var i = 0, l = arguments.length; i < l; i++) {
		      self.push(arguments[i]);
		    }
		  }

		  return self
		}

		Yallist.prototype.removeNode = function (node) {
		  if (node.list !== this) {
		    throw new Error('removing node which does not belong to this list')
		  }

		  var next = node.next;
		  var prev = node.prev;

		  if (next) {
		    next.prev = prev;
		  }

		  if (prev) {
		    prev.next = next;
		  }

		  if (node === this.head) {
		    this.head = next;
		  }
		  if (node === this.tail) {
		    this.tail = prev;
		  }

		  node.list.length--;
		  node.next = null;
		  node.prev = null;
		  node.list = null;

		  return next
		};

		Yallist.prototype.unshiftNode = function (node) {
		  if (node === this.head) {
		    return
		  }

		  if (node.list) {
		    node.list.removeNode(node);
		  }

		  var head = this.head;
		  node.list = this;
		  node.next = head;
		  if (head) {
		    head.prev = node;
		  }

		  this.head = node;
		  if (!this.tail) {
		    this.tail = node;
		  }
		  this.length++;
		};

		Yallist.prototype.pushNode = function (node) {
		  if (node === this.tail) {
		    return
		  }

		  if (node.list) {
		    node.list.removeNode(node);
		  }

		  var tail = this.tail;
		  node.list = this;
		  node.prev = tail;
		  if (tail) {
		    tail.next = node;
		  }

		  this.tail = node;
		  if (!this.head) {
		    this.head = node;
		  }
		  this.length++;
		};

		Yallist.prototype.push = function () {
		  for (var i = 0, l = arguments.length; i < l; i++) {
		    push(this, arguments[i]);
		  }
		  return this.length
		};

		Yallist.prototype.unshift = function () {
		  for (var i = 0, l = arguments.length; i < l; i++) {
		    unshift(this, arguments[i]);
		  }
		  return this.length
		};

		Yallist.prototype.pop = function () {
		  if (!this.tail) {
		    return undefined
		  }

		  var res = this.tail.value;
		  this.tail = this.tail.prev;
		  if (this.tail) {
		    this.tail.next = null;
		  } else {
		    this.head = null;
		  }
		  this.length--;
		  return res
		};

		Yallist.prototype.shift = function () {
		  if (!this.head) {
		    return undefined
		  }

		  var res = this.head.value;
		  this.head = this.head.next;
		  if (this.head) {
		    this.head.prev = null;
		  } else {
		    this.tail = null;
		  }
		  this.length--;
		  return res
		};

		Yallist.prototype.forEach = function (fn, thisp) {
		  thisp = thisp || this;
		  for (var walker = this.head, i = 0; walker !== null; i++) {
		    fn.call(thisp, walker.value, i, this);
		    walker = walker.next;
		  }
		};

		Yallist.prototype.forEachReverse = function (fn, thisp) {
		  thisp = thisp || this;
		  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
		    fn.call(thisp, walker.value, i, this);
		    walker = walker.prev;
		  }
		};

		Yallist.prototype.get = function (n) {
		  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
		    // abort out of the list early if we hit a cycle
		    walker = walker.next;
		  }
		  if (i === n && walker !== null) {
		    return walker.value
		  }
		};

		Yallist.prototype.getReverse = function (n) {
		  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
		    // abort out of the list early if we hit a cycle
		    walker = walker.prev;
		  }
		  if (i === n && walker !== null) {
		    return walker.value
		  }
		};

		Yallist.prototype.map = function (fn, thisp) {
		  thisp = thisp || this;
		  var res = new Yallist();
		  for (var walker = this.head; walker !== null;) {
		    res.push(fn.call(thisp, walker.value, this));
		    walker = walker.next;
		  }
		  return res
		};

		Yallist.prototype.mapReverse = function (fn, thisp) {
		  thisp = thisp || this;
		  var res = new Yallist();
		  for (var walker = this.tail; walker !== null;) {
		    res.push(fn.call(thisp, walker.value, this));
		    walker = walker.prev;
		  }
		  return res
		};

		Yallist.prototype.reduce = function (fn, initial) {
		  var acc;
		  var walker = this.head;
		  if (arguments.length > 1) {
		    acc = initial;
		  } else if (this.head) {
		    walker = this.head.next;
		    acc = this.head.value;
		  } else {
		    throw new TypeError('Reduce of empty list with no initial value')
		  }

		  for (var i = 0; walker !== null; i++) {
		    acc = fn(acc, walker.value, i);
		    walker = walker.next;
		  }

		  return acc
		};

		Yallist.prototype.reduceReverse = function (fn, initial) {
		  var acc;
		  var walker = this.tail;
		  if (arguments.length > 1) {
		    acc = initial;
		  } else if (this.tail) {
		    walker = this.tail.prev;
		    acc = this.tail.value;
		  } else {
		    throw new TypeError('Reduce of empty list with no initial value')
		  }

		  for (var i = this.length - 1; walker !== null; i--) {
		    acc = fn(acc, walker.value, i);
		    walker = walker.prev;
		  }

		  return acc
		};

		Yallist.prototype.toArray = function () {
		  var arr = new Array(this.length);
		  for (var i = 0, walker = this.head; walker !== null; i++) {
		    arr[i] = walker.value;
		    walker = walker.next;
		  }
		  return arr
		};

		Yallist.prototype.toArrayReverse = function () {
		  var arr = new Array(this.length);
		  for (var i = 0, walker = this.tail; walker !== null; i++) {
		    arr[i] = walker.value;
		    walker = walker.prev;
		  }
		  return arr
		};

		Yallist.prototype.slice = function (from, to) {
		  to = to || this.length;
		  if (to < 0) {
		    to += this.length;
		  }
		  from = from || 0;
		  if (from < 0) {
		    from += this.length;
		  }
		  var ret = new Yallist();
		  if (to < from || to < 0) {
		    return ret
		  }
		  if (from < 0) {
		    from = 0;
		  }
		  if (to > this.length) {
		    to = this.length;
		  }
		  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
		    walker = walker.next;
		  }
		  for (; walker !== null && i < to; i++, walker = walker.next) {
		    ret.push(walker.value);
		  }
		  return ret
		};

		Yallist.prototype.sliceReverse = function (from, to) {
		  to = to || this.length;
		  if (to < 0) {
		    to += this.length;
		  }
		  from = from || 0;
		  if (from < 0) {
		    from += this.length;
		  }
		  var ret = new Yallist();
		  if (to < from || to < 0) {
		    return ret
		  }
		  if (from < 0) {
		    from = 0;
		  }
		  if (to > this.length) {
		    to = this.length;
		  }
		  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
		    walker = walker.prev;
		  }
		  for (; walker !== null && i > from; i--, walker = walker.prev) {
		    ret.push(walker.value);
		  }
		  return ret
		};

		Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
		  if (start > this.length) {
		    start = this.length - 1;
		  }
		  if (start < 0) {
		    start = this.length + start;
		  }

		  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
		    walker = walker.next;
		  }

		  var ret = [];
		  for (var i = 0; walker && i < deleteCount; i++) {
		    ret.push(walker.value);
		    walker = this.removeNode(walker);
		  }
		  if (walker === null) {
		    walker = this.tail;
		  }

		  if (walker !== this.head && walker !== this.tail) {
		    walker = walker.prev;
		  }

		  for (var i = 0; i < nodes.length; i++) {
		    walker = insert(this, walker, nodes[i]);
		  }
		  return ret;
		};

		Yallist.prototype.reverse = function () {
		  var head = this.head;
		  var tail = this.tail;
		  for (var walker = head; walker !== null; walker = walker.prev) {
		    var p = walker.prev;
		    walker.prev = walker.next;
		    walker.next = p;
		  }
		  this.head = tail;
		  this.tail = head;
		  return this
		};

		function insert (self, node, value) {
		  var inserted = node === self.head ?
		    new Node(value, null, node, self) :
		    new Node(value, node, node.next, self);

		  if (inserted.next === null) {
		    self.tail = inserted;
		  }
		  if (inserted.prev === null) {
		    self.head = inserted;
		  }

		  self.length++;

		  return inserted
		}

		function push (self, item) {
		  self.tail = new Node(item, self.tail, null, self);
		  if (!self.head) {
		    self.head = self.tail;
		  }
		  self.length++;
		}

		function unshift (self, item) {
		  self.head = new Node(item, null, self.head, self);
		  if (!self.tail) {
		    self.tail = self.head;
		  }
		  self.length++;
		}

		function Node (value, prev, next, list) {
		  if (!(this instanceof Node)) {
		    return new Node(value, prev, next, list)
		  }

		  this.list = list;
		  this.value = value;

		  if (prev) {
		    prev.next = this;
		    this.prev = prev;
		  } else {
		    this.prev = null;
		  }

		  if (next) {
		    next.prev = this;
		    this.next = next;
		  } else {
		    this.next = null;
		  }
		}

		try {
		  // add if support for Symbol.iterator is present
		  requireIterator()(Yallist);
		} catch (er) {}
		return yallist;
	}

	var lruCache;
	var hasRequiredLruCache;

	function requireLruCache () {
		if (hasRequiredLruCache) return lruCache;
		hasRequiredLruCache = 1;

		// A linked list to keep track of recently-used-ness
		const Yallist = requireYallist();

		const MAX = Symbol('max');
		const LENGTH = Symbol('length');
		const LENGTH_CALCULATOR = Symbol('lengthCalculator');
		const ALLOW_STALE = Symbol('allowStale');
		const MAX_AGE = Symbol('maxAge');
		const DISPOSE = Symbol('dispose');
		const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
		const LRU_LIST = Symbol('lruList');
		const CACHE = Symbol('cache');
		const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

		const naiveLength = () => 1;

		// lruList is a yallist where the head is the youngest
		// item, and the tail is the oldest.  the list contains the Hit
		// objects as the entries.
		// Each Hit object has a reference to its Yallist.Node.  This
		// never changes.
		//
		// cache is a Map (or PseudoMap) that matches the keys to
		// the Yallist.Node object.
		class LRUCache {
		  constructor (options) {
		    if (typeof options === 'number')
		      options = { max: options };

		    if (!options)
		      options = {};

		    if (options.max && (typeof options.max !== 'number' || options.max < 0))
		      throw new TypeError('max must be a non-negative number')
		    // Kind of weird to have a default max of Infinity, but oh well.
		    this[MAX] = options.max || Infinity;

		    const lc = options.length || naiveLength;
		    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
		    this[ALLOW_STALE] = options.stale || false;
		    if (options.maxAge && typeof options.maxAge !== 'number')
		      throw new TypeError('maxAge must be a number')
		    this[MAX_AGE] = options.maxAge || 0;
		    this[DISPOSE] = options.dispose;
		    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
		    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
		    this.reset();
		  }

		  // resize the cache when the max changes.
		  set max (mL) {
		    if (typeof mL !== 'number' || mL < 0)
		      throw new TypeError('max must be a non-negative number')

		    this[MAX] = mL || Infinity;
		    trim(this);
		  }
		  get max () {
		    return this[MAX]
		  }

		  set allowStale (allowStale) {
		    this[ALLOW_STALE] = !!allowStale;
		  }
		  get allowStale () {
		    return this[ALLOW_STALE]
		  }

		  set maxAge (mA) {
		    if (typeof mA !== 'number')
		      throw new TypeError('maxAge must be a non-negative number')

		    this[MAX_AGE] = mA;
		    trim(this);
		  }
		  get maxAge () {
		    return this[MAX_AGE]
		  }

		  // resize the cache when the lengthCalculator changes.
		  set lengthCalculator (lC) {
		    if (typeof lC !== 'function')
		      lC = naiveLength;

		    if (lC !== this[LENGTH_CALCULATOR]) {
		      this[LENGTH_CALCULATOR] = lC;
		      this[LENGTH] = 0;
		      this[LRU_LIST].forEach(hit => {
		        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
		        this[LENGTH] += hit.length;
		      });
		    }
		    trim(this);
		  }
		  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

		  get length () { return this[LENGTH] }
		  get itemCount () { return this[LRU_LIST].length }

		  rforEach (fn, thisp) {
		    thisp = thisp || this;
		    for (let walker = this[LRU_LIST].tail; walker !== null;) {
		      const prev = walker.prev;
		      forEachStep(this, fn, walker, thisp);
		      walker = prev;
		    }
		  }

		  forEach (fn, thisp) {
		    thisp = thisp || this;
		    for (let walker = this[LRU_LIST].head; walker !== null;) {
		      const next = walker.next;
		      forEachStep(this, fn, walker, thisp);
		      walker = next;
		    }
		  }

		  keys () {
		    return this[LRU_LIST].toArray().map(k => k.key)
		  }

		  values () {
		    return this[LRU_LIST].toArray().map(k => k.value)
		  }

		  reset () {
		    if (this[DISPOSE] &&
		        this[LRU_LIST] &&
		        this[LRU_LIST].length) {
		      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
		    }

		    this[CACHE] = new Map(); // hash of items by key
		    this[LRU_LIST] = new Yallist(); // list of items in order of use recency
		    this[LENGTH] = 0; // length of items in the list
		  }

		  dump () {
		    return this[LRU_LIST].map(hit =>
		      isStale(this, hit) ? false : {
		        k: hit.key,
		        v: hit.value,
		        e: hit.now + (hit.maxAge || 0)
		      }).toArray().filter(h => h)
		  }

		  dumpLru () {
		    return this[LRU_LIST]
		  }

		  set (key, value, maxAge) {
		    maxAge = maxAge || this[MAX_AGE];

		    if (maxAge && typeof maxAge !== 'number')
		      throw new TypeError('maxAge must be a number')

		    const now = maxAge ? Date.now() : 0;
		    const len = this[LENGTH_CALCULATOR](value, key);

		    if (this[CACHE].has(key)) {
		      if (len > this[MAX]) {
		        del(this, this[CACHE].get(key));
		        return false
		      }

		      const node = this[CACHE].get(key);
		      const item = node.value;

		      // dispose of the old one before overwriting
		      // split out into 2 ifs for better coverage tracking
		      if (this[DISPOSE]) {
		        if (!this[NO_DISPOSE_ON_SET])
		          this[DISPOSE](key, item.value);
		      }

		      item.now = now;
		      item.maxAge = maxAge;
		      item.value = value;
		      this[LENGTH] += len - item.length;
		      item.length = len;
		      this.get(key);
		      trim(this);
		      return true
		    }

		    const hit = new Entry(key, value, len, now, maxAge);

		    // oversized objects fall out of cache automatically.
		    if (hit.length > this[MAX]) {
		      if (this[DISPOSE])
		        this[DISPOSE](key, value);

		      return false
		    }

		    this[LENGTH] += hit.length;
		    this[LRU_LIST].unshift(hit);
		    this[CACHE].set(key, this[LRU_LIST].head);
		    trim(this);
		    return true
		  }

		  has (key) {
		    if (!this[CACHE].has(key)) return false
		    const hit = this[CACHE].get(key).value;
		    return !isStale(this, hit)
		  }

		  get (key) {
		    return get(this, key, true)
		  }

		  peek (key) {
		    return get(this, key, false)
		  }

		  pop () {
		    const node = this[LRU_LIST].tail;
		    if (!node)
		      return null

		    del(this, node);
		    return node.value
		  }

		  del (key) {
		    del(this, this[CACHE].get(key));
		  }

		  load (arr) {
		    // reset the cache
		    this.reset();

		    const now = Date.now();
		    // A previous serialized cache has the most recent items first
		    for (let l = arr.length - 1; l >= 0; l--) {
		      const hit = arr[l];
		      const expiresAt = hit.e || 0;
		      if (expiresAt === 0)
		        // the item was created without expiration in a non aged cache
		        this.set(hit.k, hit.v);
		      else {
		        const maxAge = expiresAt - now;
		        // dont add already expired items
		        if (maxAge > 0) {
		          this.set(hit.k, hit.v, maxAge);
		        }
		      }
		    }
		  }

		  prune () {
		    this[CACHE].forEach((value, key) => get(this, key, false));
		  }
		}

		const get = (self, key, doUse) => {
		  const node = self[CACHE].get(key);
		  if (node) {
		    const hit = node.value;
		    if (isStale(self, hit)) {
		      del(self, node);
		      if (!self[ALLOW_STALE])
		        return undefined
		    } else {
		      if (doUse) {
		        if (self[UPDATE_AGE_ON_GET])
		          node.value.now = Date.now();
		        self[LRU_LIST].unshiftNode(node);
		      }
		    }
		    return hit.value
		  }
		};

		const isStale = (self, hit) => {
		  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
		    return false

		  const diff = Date.now() - hit.now;
		  return hit.maxAge ? diff > hit.maxAge
		    : self[MAX_AGE] && (diff > self[MAX_AGE])
		};

		const trim = self => {
		  if (self[LENGTH] > self[MAX]) {
		    for (let walker = self[LRU_LIST].tail;
		      self[LENGTH] > self[MAX] && walker !== null;) {
		      // We know that we're about to delete this one, and also
		      // what the next least recently used key will be, so just
		      // go ahead and set it now.
		      const prev = walker.prev;
		      del(self, walker);
		      walker = prev;
		    }
		  }
		};

		const del = (self, node) => {
		  if (node) {
		    const hit = node.value;
		    if (self[DISPOSE])
		      self[DISPOSE](hit.key, hit.value);

		    self[LENGTH] -= hit.length;
		    self[CACHE].delete(hit.key);
		    self[LRU_LIST].removeNode(node);
		  }
		};

		class Entry {
		  constructor (key, value, length, now, maxAge) {
		    this.key = key;
		    this.value = value;
		    this.length = length;
		    this.now = now;
		    this.maxAge = maxAge || 0;
		  }
		}

		const forEachStep = (self, fn, node, thisp) => {
		  let hit = node.value;
		  if (isStale(self, hit)) {
		    del(self, node);
		    if (!self[ALLOW_STALE])
		      hit = undefined;
		  }
		  if (hit)
		    fn.call(thisp, hit.value, hit.key, self);
		};

		lruCache = LRUCache;
		return lruCache;
	}

	var range;
	var hasRequiredRange;

	function requireRange () {
		if (hasRequiredRange) return range;
		hasRequiredRange = 1;
		// hoisted class for cyclic dependency
		class Range {
		  constructor (range, options) {
		    options = parseOptions(options);

		    if (range instanceof Range) {
		      if (
		        range.loose === !!options.loose &&
		        range.includePrerelease === !!options.includePrerelease
		      ) {
		        return range
		      } else {
		        return new Range(range.raw, options)
		      }
		    }

		    if (range instanceof Comparator) {
		      // just put it in the set and return
		      this.raw = range.value;
		      this.set = [[range]];
		      this.format();
		      return this
		    }

		    this.options = options;
		    this.loose = !!options.loose;
		    this.includePrerelease = !!options.includePrerelease;

		    // First, split based on boolean or ||
		    this.raw = range;
		    this.set = range
		      .split('||')
		      // map the range to a 2d array of comparators
		      .map(r => this.parseRange(r.trim()))
		      // throw out any comparator lists that are empty
		      // this generally means that it was not a valid range, which is allowed
		      // in loose mode, but will still throw if the WHOLE range is invalid.
		      .filter(c => c.length);

		    if (!this.set.length) {
		      throw new TypeError(`Invalid SemVer Range: ${range}`)
		    }

		    // if we have any that are not the null set, throw out null sets.
		    if (this.set.length > 1) {
		      // keep the first one, in case they're all null sets
		      const first = this.set[0];
		      this.set = this.set.filter(c => !isNullSet(c[0]));
		      if (this.set.length === 0) {
		        this.set = [first];
		      } else if (this.set.length > 1) {
		        // if we have any that are *, then the range is just *
		        for (const c of this.set) {
		          if (c.length === 1 && isAny(c[0])) {
		            this.set = [c];
		            break
		          }
		        }
		      }
		    }

		    this.format();
		  }

		  format () {
		    this.range = this.set
		      .map((comps) => {
		        return comps.join(' ').trim()
		      })
		      .join('||')
		      .trim();
		    return this.range
		  }

		  toString () {
		    return this.range
		  }

		  parseRange (range) {
		    range = range.trim();

		    // memoize range parsing for performance.
		    // this is a very hot path, and fully deterministic.
		    const memoOpts = Object.keys(this.options).join(',');
		    const memoKey = `parseRange:${memoOpts}:${range}`;
		    const cached = cache.get(memoKey);
		    if (cached) {
		      return cached
		    }

		    const loose = this.options.loose;
		    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
		    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
		    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
		    debug('hyphen replace', range);
		    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
		    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
		    debug('comparator trim', range);

		    // `~ 1.2.3` => `~1.2.3`
		    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);

		    // `^ 1.2.3` => `^1.2.3`
		    range = range.replace(re[t.CARETTRIM], caretTrimReplace);

		    // normalize spaces
		    range = range.split(/\s+/).join(' ');

		    // At this point, the range is completely trimmed and
		    // ready to be split into comparators.

		    let rangeList = range
		      .split(' ')
		      .map(comp => parseComparator(comp, this.options))
		      .join(' ')
		      .split(/\s+/)
		      // >=0.0.0 is equivalent to *
		      .map(comp => replaceGTE0(comp, this.options));

		    if (loose) {
		      // in loose mode, throw out any that are not valid comparators
		      rangeList = rangeList.filter(comp => {
		        debug('loose invalid filter', comp, this.options);
		        return !!comp.match(re[t.COMPARATORLOOSE])
		      });
		    }
		    debug('range list', rangeList);

		    // if any comparators are the null set, then replace with JUST null set
		    // if more than one comparator, remove any * comparators
		    // also, don't include the same comparator more than once
		    const rangeMap = new Map();
		    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
		    for (const comp of comparators) {
		      if (isNullSet(comp)) {
		        return [comp]
		      }
		      rangeMap.set(comp.value, comp);
		    }
		    if (rangeMap.size > 1 && rangeMap.has('')) {
		      rangeMap.delete('');
		    }

		    const result = [...rangeMap.values()];
		    cache.set(memoKey, result);
		    return result
		  }

		  intersects (range, options) {
		    if (!(range instanceof Range)) {
		      throw new TypeError('a Range is required')
		    }

		    return this.set.some((thisComparators) => {
		      return (
		        isSatisfiable(thisComparators, options) &&
		        range.set.some((rangeComparators) => {
		          return (
		            isSatisfiable(rangeComparators, options) &&
		            thisComparators.every((thisComparator) => {
		              return rangeComparators.every((rangeComparator) => {
		                return thisComparator.intersects(rangeComparator, options)
		              })
		            })
		          )
		        })
		      )
		    })
		  }

		  // if ANY of the sets match ALL of its comparators, then pass
		  test (version) {
		    if (!version) {
		      return false
		    }

		    if (typeof version === 'string') {
		      try {
		        version = new SemVer(version, this.options);
		      } catch (er) {
		        return false
		      }
		    }

		    for (let i = 0; i < this.set.length; i++) {
		      if (testSet(this.set[i], version, this.options)) {
		        return true
		      }
		    }
		    return false
		  }
		}
		range = Range;

		const LRU = requireLruCache();
		const cache = new LRU({ max: 1000 });

		const parseOptions = parseOptions_1;
		const Comparator = requireComparator();
		const debug = debug_1;
		const SemVer = semver$2;
		const {
		  re,
		  t,
		  comparatorTrimReplace,
		  tildeTrimReplace,
		  caretTrimReplace,
		} = reExports;

		const isNullSet = c => c.value === '<0.0.0-0';
		const isAny = c => c.value === '';

		// take a set of comparators and determine whether there
		// exists a version which can satisfy it
		const isSatisfiable = (comparators, options) => {
		  let result = true;
		  const remainingComparators = comparators.slice();
		  let testComparator = remainingComparators.pop();

		  while (result && remainingComparators.length) {
		    result = remainingComparators.every((otherComparator) => {
		      return testComparator.intersects(otherComparator, options)
		    });

		    testComparator = remainingComparators.pop();
		  }

		  return result
		};

		// comprised of xranges, tildes, stars, and gtlt's at this point.
		// already replaced the hyphen ranges
		// turn into a set of JUST comparators.
		const parseComparator = (comp, options) => {
		  debug('comp', comp, options);
		  comp = replaceCarets(comp, options);
		  debug('caret', comp);
		  comp = replaceTildes(comp, options);
		  debug('tildes', comp);
		  comp = replaceXRanges(comp, options);
		  debug('xrange', comp);
		  comp = replaceStars(comp, options);
		  debug('stars', comp);
		  return comp
		};

		const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

		// ~, ~> --> * (any, kinda silly)
		// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
		// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
		// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
		// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
		// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
		// ~0.0.1 --> >=0.0.1 <0.1.0-0
		const replaceTildes = (comp, options) =>
		  comp.trim().split(/\s+/).map((c) => {
		    return replaceTilde(c, options)
		  }).join(' ');

		const replaceTilde = (comp, options) => {
		  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
		  return comp.replace(r, (_, M, m, p, pr) => {
		    debug('tilde', comp, _, M, m, p, pr);
		    let ret;

		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
		    } else if (isX(p)) {
		      // ~1.2 == >=1.2.0 <1.3.0-0
		      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
		    } else if (pr) {
		      debug('replaceTilde pr', pr);
		      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
		    } else {
		      // ~1.2.3 == >=1.2.3 <1.3.0-0
		      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
		    }

		    debug('tilde return', ret);
		    return ret
		  })
		};

		// ^ --> * (any, kinda silly)
		// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
		// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
		// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
		// ^1.2.3 --> >=1.2.3 <2.0.0-0
		// ^1.2.0 --> >=1.2.0 <2.0.0-0
		// ^0.0.1 --> >=0.0.1 <0.0.2-0
		// ^0.1.0 --> >=0.1.0 <0.2.0-0
		const replaceCarets = (comp, options) =>
		  comp.trim().split(/\s+/).map((c) => {
		    return replaceCaret(c, options)
		  }).join(' ');

		const replaceCaret = (comp, options) => {
		  debug('caret', comp, options);
		  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
		  const z = options.includePrerelease ? '-0' : '';
		  return comp.replace(r, (_, M, m, p, pr) => {
		    debug('caret', comp, _, M, m, p, pr);
		    let ret;

		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
		    } else if (isX(p)) {
		      if (M === '0') {
		        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
		      } else {
		        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
		      }
		    } else if (pr) {
		      debug('replaceCaret pr', pr);
		      if (M === '0') {
		        if (m === '0') {
		          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
		        } else {
		          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
		        }
		      } else {
		        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
		      }
		    } else {
		      debug('no pr');
		      if (M === '0') {
		        if (m === '0') {
		          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
		        } else {
		          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
		        }
		      } else {
		        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
		      }
		    }

		    debug('caret return', ret);
		    return ret
		  })
		};

		const replaceXRanges = (comp, options) => {
		  debug('replaceXRanges', comp, options);
		  return comp.split(/\s+/).map((c) => {
		    return replaceXRange(c, options)
		  }).join(' ')
		};

		const replaceXRange = (comp, options) => {
		  comp = comp.trim();
		  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
		  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
		    debug('xRange', comp, ret, gtlt, M, m, p, pr);
		    const xM = isX(M);
		    const xm = xM || isX(m);
		    const xp = xm || isX(p);
		    const anyX = xp;

		    if (gtlt === '=' && anyX) {
		      gtlt = '';
		    }

		    // if we're including prereleases in the match, then we need
		    // to fix this to -0, the lowest possible prerelease value
		    pr = options.includePrerelease ? '-0' : '';

		    if (xM) {
		      if (gtlt === '>' || gtlt === '<') {
		        // nothing is allowed
		        ret = '<0.0.0-0';
		      } else {
		        // nothing is forbidden
		        ret = '*';
		      }
		    } else if (gtlt && anyX) {
		      // we know patch is an x, because we have any x at all.
		      // replace X with 0
		      if (xm) {
		        m = 0;
		      }
		      p = 0;

		      if (gtlt === '>') {
		        // >1 => >=2.0.0
		        // >1.2 => >=1.3.0
		        gtlt = '>=';
		        if (xm) {
		          M = +M + 1;
		          m = 0;
		          p = 0;
		        } else {
		          m = +m + 1;
		          p = 0;
		        }
		      } else if (gtlt === '<=') {
		        // <=0.7.x is actually <0.8.0, since any 0.7.x should
		        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
		        gtlt = '<';
		        if (xm) {
		          M = +M + 1;
		        } else {
		          m = +m + 1;
		        }
		      }

		      if (gtlt === '<') {
		        pr = '-0';
		      }

		      ret = `${gtlt + M}.${m}.${p}${pr}`;
		    } else if (xm) {
		      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
		    } else if (xp) {
		      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
		    }

		    debug('xRange return', ret);

		    return ret
		  })
		};

		// Because * is AND-ed with everything else in the comparator,
		// and '' means "any version", just remove the *s entirely.
		const replaceStars = (comp, options) => {
		  debug('replaceStars', comp, options);
		  // Looseness is ignored here.  star is always as loose as it gets!
		  return comp.trim().replace(re[t.STAR], '')
		};

		const replaceGTE0 = (comp, options) => {
		  debug('replaceGTE0', comp, options);
		  return comp.trim()
		    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
		};

		// This function is passed to string.replace(re[t.HYPHENRANGE])
		// M, m, patch, prerelease, build
		// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
		// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
		// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
		const hyphenReplace = incPr => ($0,
		  from, fM, fm, fp, fpr, fb,
		  to, tM, tm, tp, tpr, tb) => {
		  if (isX(fM)) {
		    from = '';
		  } else if (isX(fm)) {
		    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
		  } else if (isX(fp)) {
		    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
		  } else if (fpr) {
		    from = `>=${from}`;
		  } else {
		    from = `>=${from}${incPr ? '-0' : ''}`;
		  }

		  if (isX(tM)) {
		    to = '';
		  } else if (isX(tm)) {
		    to = `<${+tM + 1}.0.0-0`;
		  } else if (isX(tp)) {
		    to = `<${tM}.${+tm + 1}.0-0`;
		  } else if (tpr) {
		    to = `<=${tM}.${tm}.${tp}-${tpr}`;
		  } else if (incPr) {
		    to = `<${tM}.${tm}.${+tp + 1}-0`;
		  } else {
		    to = `<=${to}`;
		  }

		  return (`${from} ${to}`).trim()
		};

		const testSet = (set, version, options) => {
		  for (let i = 0; i < set.length; i++) {
		    if (!set[i].test(version)) {
		      return false
		    }
		  }

		  if (version.prerelease.length && !options.includePrerelease) {
		    // Find the set of versions that are allowed to have prereleases
		    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
		    // That should allow `1.2.3-pr.2` to pass.
		    // However, `1.2.4-alpha.notready` should NOT be allowed,
		    // even though it's within the range set by the comparators.
		    for (let i = 0; i < set.length; i++) {
		      debug(set[i].semver);
		      if (set[i].semver === Comparator.ANY) {
		        continue
		      }

		      if (set[i].semver.prerelease.length > 0) {
		        const allowed = set[i].semver;
		        if (allowed.major === version.major &&
		            allowed.minor === version.minor &&
		            allowed.patch === version.patch) {
		          return true
		        }
		      }
		    }

		    // Version has a -pre, but it's not one of the ones we like.
		    return false
		  }

		  return true
		};
		return range;
	}

	var comparator;
	var hasRequiredComparator;

	function requireComparator () {
		if (hasRequiredComparator) return comparator;
		hasRequiredComparator = 1;
		const ANY = Symbol('SemVer ANY');
		// hoisted class for cyclic dependency
		class Comparator {
		  static get ANY () {
		    return ANY
		  }

		  constructor (comp, options) {
		    options = parseOptions(options);

		    if (comp instanceof Comparator) {
		      if (comp.loose === !!options.loose) {
		        return comp
		      } else {
		        comp = comp.value;
		      }
		    }

		    debug('comparator', comp, options);
		    this.options = options;
		    this.loose = !!options.loose;
		    this.parse(comp);

		    if (this.semver === ANY) {
		      this.value = '';
		    } else {
		      this.value = this.operator + this.semver.version;
		    }

		    debug('comp', this);
		  }

		  parse (comp) {
		    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
		    const m = comp.match(r);

		    if (!m) {
		      throw new TypeError(`Invalid comparator: ${comp}`)
		    }

		    this.operator = m[1] !== undefined ? m[1] : '';
		    if (this.operator === '=') {
		      this.operator = '';
		    }

		    // if it literally is just '>' or '' then allow anything.
		    if (!m[2]) {
		      this.semver = ANY;
		    } else {
		      this.semver = new SemVer(m[2], this.options.loose);
		    }
		  }

		  toString () {
		    return this.value
		  }

		  test (version) {
		    debug('Comparator.test', version, this.options.loose);

		    if (this.semver === ANY || version === ANY) {
		      return true
		    }

		    if (typeof version === 'string') {
		      try {
		        version = new SemVer(version, this.options);
		      } catch (er) {
		        return false
		      }
		    }

		    return cmp(version, this.operator, this.semver, this.options)
		  }

		  intersects (comp, options) {
		    if (!(comp instanceof Comparator)) {
		      throw new TypeError('a Comparator is required')
		    }

		    if (!options || typeof options !== 'object') {
		      options = {
		        loose: !!options,
		        includePrerelease: false,
		      };
		    }

		    if (this.operator === '') {
		      if (this.value === '') {
		        return true
		      }
		      return new Range(comp.value, options).test(this.value)
		    } else if (comp.operator === '') {
		      if (comp.value === '') {
		        return true
		      }
		      return new Range(this.value, options).test(comp.semver)
		    }

		    const sameDirectionIncreasing =
		      (this.operator === '>=' || this.operator === '>') &&
		      (comp.operator === '>=' || comp.operator === '>');
		    const sameDirectionDecreasing =
		      (this.operator === '<=' || this.operator === '<') &&
		      (comp.operator === '<=' || comp.operator === '<');
		    const sameSemVer = this.semver.version === comp.semver.version;
		    const differentDirectionsInclusive =
		      (this.operator === '>=' || this.operator === '<=') &&
		      (comp.operator === '>=' || comp.operator === '<=');
		    const oppositeDirectionsLessThan =
		      cmp(this.semver, '<', comp.semver, options) &&
		      (this.operator === '>=' || this.operator === '>') &&
		        (comp.operator === '<=' || comp.operator === '<');
		    const oppositeDirectionsGreaterThan =
		      cmp(this.semver, '>', comp.semver, options) &&
		      (this.operator === '<=' || this.operator === '<') &&
		        (comp.operator === '>=' || comp.operator === '>');

		    return (
		      sameDirectionIncreasing ||
		      sameDirectionDecreasing ||
		      (sameSemVer && differentDirectionsInclusive) ||
		      oppositeDirectionsLessThan ||
		      oppositeDirectionsGreaterThan
		    )
		  }
		}

		comparator = Comparator;

		const parseOptions = parseOptions_1;
		const { re, t } = reExports;
		const cmp = cmp_1;
		const debug = debug_1;
		const SemVer = semver$2;
		const Range = requireRange();
		return comparator;
	}

	const Range$9 = requireRange();
	const satisfies$4 = (version, range, options) => {
	  try {
	    range = new Range$9(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	var satisfies_1 = satisfies$4;

	const Range$8 = requireRange();

	// Mostly just for testing and legacy API reasons
	const toComparators$1 = (range, options) =>
	  new Range$8(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

	var toComparators_1 = toComparators$1;

	const SemVer$4 = semver$2;
	const Range$7 = requireRange();

	const maxSatisfying$1 = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$7(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer$4(max, options);
	      }
	    }
	  });
	  return max
	};
	var maxSatisfying_1 = maxSatisfying$1;

	const SemVer$3 = semver$2;
	const Range$6 = requireRange();
	const minSatisfying$1 = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$6(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer$3(min, options);
	      }
	    }
	  });
	  return min
	};
	var minSatisfying_1 = minSatisfying$1;

	const SemVer$2 = semver$2;
	const Range$5 = requireRange();
	const gt$2 = gt_1;

	const minVersion$1 = (range, loose) => {
	  range = new Range$5(range, loose);

	  let minver = new SemVer$2('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer$2('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let setMin = null;
	    comparators.forEach((comparator) => {
	      // Clone to avoid manipulating the comparator's semver object.
	      const compver = new SemVer$2(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!setMin || gt$2(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt$2(minver, setMin))) {
	      minver = setMin;
	    }
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	};
	var minVersion_1 = minVersion$1;

	const Range$4 = requireRange();
	const validRange$1 = (range, options) => {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range$4(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	var valid$1 = validRange$1;

	const SemVer$1 = semver$2;
	const Comparator$2 = requireComparator();
	const { ANY: ANY$1 } = Comparator$2;
	const Range$3 = requireRange();
	const satisfies$3 = satisfies_1;
	const gt$1 = gt_1;
	const lt$1 = lt_1;
	const lte$1 = lte_1;
	const gte$1 = gte_1;

	const outside$3 = (version, range, hilo, options) => {
	  version = new SemVer$1(version, options);
	  range = new Range$3(range, options);

	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt$1;
	      ltefn = lte$1;
	      ltfn = lt$1;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt$1;
	      ltefn = gte$1;
	      ltfn = gt$1;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisfies the range it is not outside
	  if (satisfies$3(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let high = null;
	    let low = null;

	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY$1) {
	        comparator = new Comparator$2('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};

	var outside_1 = outside$3;

	// Determine if version is greater than all the versions possible in the range.
	const outside$2 = outside_1;
	const gtr$1 = (version, range, options) => outside$2(version, range, '>', options);
	var gtr_1 = gtr$1;

	const outside$1 = outside_1;
	// Determine if version is less than all the versions possible in the range
	const ltr$1 = (version, range, options) => outside$1(version, range, '<', options);
	var ltr_1 = ltr$1;

	const Range$2 = requireRange();
	const intersects$1 = (r1, r2, options) => {
	  r1 = new Range$2(r1, options);
	  r2 = new Range$2(r2, options);
	  return r1.intersects(r2)
	};
	var intersects_1 = intersects$1;

	// given a set of versions and a range, create a "simplified" range
	// that includes the same versions that the original range does
	// If the original range is shorter than the simplified one, return that.
	const satisfies$2 = satisfies_1;
	const compare$2 = compare_1;
	var simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare$2(a, b, options));
	  for (const version of v) {
	    const included = satisfies$2(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }

	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};

	const Range$1 = requireRange();
	const Comparator$1 = requireComparator();
	const { ANY } = Comparator$1;
	const satisfies$1 = satisfies_1;
	const compare$1 = compare_1;

	// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
	// - Every simple range `r1, r2, ...` is a null set, OR
	// - Every simple range `r1, r2, ...` which is not a null set is a subset of
	//   some `R1, R2, ...`
	//
	// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
	// - If c is only the ANY comparator
	//   - If C is only the ANY comparator, return true
	//   - Else if in prerelease mode, return false
	//   - else replace c with `[>=0.0.0]`
	// - If C is only the ANY comparator
	//   - if in prerelease mode, return true
	//   - else replace C with `[>=0.0.0]`
	// - Let EQ be the set of = comparators in c
	// - If EQ is more than one, return true (null set)
	// - Let GT be the highest > or >= comparator in c
	// - Let LT be the lowest < or <= comparator in c
	// - If GT and LT, and GT.semver > LT.semver, return true (null set)
	// - If any C is a = range, and GT or LT are set, return false
	// - If EQ
	//   - If GT, and EQ does not satisfy GT, return true (null set)
	//   - If LT, and EQ does not satisfy LT, return true (null set)
	//   - If EQ satisfies every C, return true
	//   - Else return false
	// - If GT
	//   - If GT.semver is lower than any > or >= comp in C, return false
	//   - If GT is >=, and GT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the GT.semver tuple, return false
	// - If LT
	//   - If LT.semver is greater than any < or <= comp in C, return false
	//   - If LT is <=, and LT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the LT.semver tuple, return false
	// - Else return true

	const subset$1 = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }

	  sub = new Range$1(sub, options);
	  dom = new Range$1(dom, options);
	  let sawNonNull = false;

	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    // the null set is a subset of everything, but null simple ranges in
	    // a complex range should be ignored.  so if we saw a non-null range,
	    // then we know this isn't a subset, but if EVERY simple range was null,
	    // then it is a subset.
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};

	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }

	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = [new Comparator$1('>=0.0.0-0')];
	    } else {
	      sub = [new Comparator$1('>=0.0.0')];
	    }
	  }

	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = [new Comparator$1('>=0.0.0')];
	    }
	  }

	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }

	  if (eqSet.size > 1) {
	    return null
	  }

	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare$1(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }

	  // will iterate one or zero times
	  for (const eq of eqSet) {
	    if (gt && !satisfies$1(eq, String(gt), options)) {
	      return null
	    }

	    if (lt && !satisfies$1(eq, String(lt), options)) {
	      return null
	    }

	    for (const c of dom) {
	      if (!satisfies$1(eq, String(c), options)) {
	        return false
	      }
	    }

	    return true
	  }

	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  // if the subset has a prerelease, we need a comparator in the superset
	  // with the same tuple and a prerelease, or it's not a subset
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  // exception: <1.2.3-0 is the same as <1.2.3
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }

	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !satisfies$1(gt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !satisfies$1(lt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }

	  // if there was a < or >, and nothing in the dom, then must be false
	  // UNLESS it was limited by another range in the other direction.
	  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }

	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }

	  // we needed a prerelease range in a specific tuple, but didn't get one
	  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
	  // because it includes prereleases in the 1.2.3 tuple
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }

	  return true
	};

	// >=1.2.3 is lower than >1.2.3
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare$1(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};

	// <=1.2.3 is higher than <1.2.3
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare$1(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};

	var subset_1 = subset$1;

	// just pre-load all the stuff that index.js lazily exports
	const internalRe = reExports;
	const constants = constants$1;
	const SemVer = semver$2;
	const identifiers = identifiers$1;
	const parse = parse_1;
	const valid = valid_1;
	const clean = clean_1;
	const inc = inc_1;
	const diff = diff_1;
	const major = major_1;
	const minor = minor_1;
	const patch = patch_1;
	const prerelease = prerelease_1;
	const compare = compare_1;
	const rcompare = rcompare_1;
	const compareLoose = compareLoose_1;
	const compareBuild = compareBuild_1;
	const sort = sort_1;
	const rsort = rsort_1;
	const gt = gt_1;
	const lt = lt_1;
	const eq = eq_1;
	const neq = neq_1;
	const gte = gte_1;
	const lte = lte_1;
	const cmp = cmp_1;
	const coerce = coerce_1;
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = satisfies_1;
	const toComparators = toComparators_1;
	const maxSatisfying = maxSatisfying_1;
	const minSatisfying = minSatisfying_1;
	const minVersion = minVersion_1;
	const validRange = valid$1;
	const outside = outside_1;
	const gtr = gtr_1;
	const ltr = ltr_1;
	const intersects = intersects_1;
	const simplifyRange = simplify;
	const subset = subset_1;
	var semver = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};

	var semver$1 = /*@__PURE__*/getDefaultExportFromCjs(semver);

	var __assign = (undefined && undefined.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var _a;
	var DeviceModelId;
	(function (DeviceModelId) {
	    DeviceModelId["blue"] = "blue";
	    DeviceModelId["nanoS"] = "nanoS";
	    DeviceModelId["nanoSP"] = "nanoSP";
	    DeviceModelId["nanoX"] = "nanoX";
	    DeviceModelId["nanoFTS"] = "nanoFTS";
	})(DeviceModelId || (DeviceModelId = {}));
	var devices = (_a = {},
	    _a[DeviceModelId.blue] = {
	        id: DeviceModelId.blue,
	        productName: "Ledger Blue",
	        productIdMM: 0x00,
	        legacyUsbProductId: 0x0000,
	        usbOnly: true,
	        memorySize: 480 * 1024,
	        masks: [0x31000000, 0x31010000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; }
	    },
	    _a[DeviceModelId.nanoS] = {
	        id: DeviceModelId.nanoS,
	        productName: "Ledger Nano S",
	        productIdMM: 0x10,
	        legacyUsbProductId: 0x0001,
	        usbOnly: true,
	        memorySize: 320 * 1024,
	        masks: [0x31100000],
	        getBlockSize: function (firmwareVersion) {
	            var _a;
	            return semver$1.lt((_a = semver$1.coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0")
	                ? 4 * 1024
	                : 2 * 1024;
	        }
	    },
	    _a[DeviceModelId.nanoSP] = {
	        id: DeviceModelId.nanoSP,
	        productName: "Ledger Nano S Plus",
	        productIdMM: 0x50,
	        legacyUsbProductId: 0x0005,
	        usbOnly: true,
	        memorySize: 1536 * 1024,
	        masks: [0x33100000],
	        getBlockSize: function (_firmwareVersion) { return 32; }
	    },
	    _a[DeviceModelId.nanoX] = {
	        id: DeviceModelId.nanoX,
	        productName: "Ledger Nano X",
	        productIdMM: 0x40,
	        legacyUsbProductId: 0x0004,
	        usbOnly: false,
	        memorySize: 2 * 1024 * 1024,
	        masks: [0x33000000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572"
	            },
	        ]
	    },
	    _a[DeviceModelId.nanoFTS] = {
	        id: DeviceModelId.nanoFTS,
	        productName: "Ledger Nano FTS",
	        productIdMM: 0x60,
	        legacyUsbProductId: 0x0006,
	        usbOnly: false,
	        memorySize: 2 * 1024 * 1024,
	        masks: [0x33200000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572"
	            },
	        ]
	    },
	    _a);
	({
	    Blue: DeviceModelId.blue,
	    "Nano S": DeviceModelId.nanoS,
	    "Nano S Plus": DeviceModelId.nanoSP,
	    "Nano X": DeviceModelId.nanoX,
	    "Nano FTS": DeviceModelId.nanoFTS
	});
	var devicesList = Object.values(devices);
	/**
	 *
	 */
	var ledgerUSBVendorId = 0x2c97;
	/**
	 *
	 */
	var identifyUSBProductId = function (usbProductId) {
	    var legacy = devicesList.find(function (d) { return d.legacyUsbProductId === usbProductId; });
	    if (legacy)
	        return legacy;
	    var mm = usbProductId >> 8;
	    var deviceModel = devicesList.find(function (d) { return d.productIdMM === mm; });
	    return deviceModel;
	};
	var bluetoothServices = [];
	var serviceUuidToInfos = {};
	for (var id$1 in devices) {
	    var deviceModel = devices[id$1];
	    var bluetoothSpec = deviceModel.bluetoothSpec;
	    if (bluetoothSpec) {
	        for (var i$2 = 0; i$2 < bluetoothSpec.length; i$2++) {
	            var spec = bluetoothSpec[i$2];
	            bluetoothServices.push(spec.serviceUuid);
	            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = __assign({ deviceModel: deviceModel }, spec);
	        }
	    }
	}

	var id = 0;
	var subscribers = [];
	/**
	 * log something
	 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
	 * @param message a clear message of the log associated to the type
	 */
	var log = function (type, message, data) {
	    var obj = {
	        type: type,
	        id: String(++id),
	        date: new Date()
	    };
	    if (message)
	        obj.message = message;
	    if (data)
	        obj.data = data;
	    dispatch(obj);
	};
	/**
	 * listen to logs.
	 * @param cb that is called for each future log() with the Log object
	 * @return a function that can be called to unsubscribe the listener
	 */
	var listen = function (cb) {
	    subscribers.push(cb);
	    return function () {
	        var i = subscribers.indexOf(cb);
	        if (i !== -1) {
	            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
	            subscribers[i] = subscribers[subscribers.length - 1];
	            subscribers.pop();
	        }
	    };
	};
	function dispatch(log) {
	    for (var i = 0; i < subscribers.length; i++) {
	        try {
	            subscribers[i](log);
	        }
	        catch (e) {
	            console.error(e);
	        }
	    }
	}
	if (typeof window !== "undefined") {
	    window.__ledgerLogsListen = listen;
	}

	var __extends = (undefined && undefined.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __read = (undefined && undefined.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var ledgerDevices = [
	    {
	        vendorId: ledgerUSBVendorId
	    },
	];
	var isSupported = function () {
	    return Promise.resolve(!!(window.navigator && window.navigator.hid));
	};
	var getHID = function () {
	    // $FlowFixMe
	    var hid = navigator.hid;
	    if (!hid)
	        throw new TransportError("navigator.hid is not supported", "HIDNotSupported");
	    return hid;
	};
	function requestLedgerDevices() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var device;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getHID().requestDevice({
	                        filters: ledgerDevices
	                    })];
	                case 1:
	                    device = _a.sent();
	                    if (Array.isArray(device))
	                        return [2 /*return*/, device];
	                    return [2 /*return*/, [device]];
	            }
	        });
	    });
	}
	function getLedgerDevices() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var devices;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getHID().getDevices()];
	                case 1:
	                    devices = _a.sent();
	                    return [2 /*return*/, devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
	            }
	        });
	    });
	}
	function getFirstLedgerDevice() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var existingDevices, devices;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 /*yield*/, getLedgerDevices()];
	                case 1:
	                    existingDevices = _a.sent();
	                    if (existingDevices.length > 0)
	                        return [2 /*return*/, existingDevices[0]];
	                    return [4 /*yield*/, requestLedgerDevices()];
	                case 2:
	                    devices = _a.sent();
	                    return [2 /*return*/, devices[0]];
	            }
	        });
	    });
	}
	/**
	 * WebHID Transport implementation
	 * @example
	 * import TransportWebHID from "@ledgerhq/hw-transport-webhid";
	 * ...
	 * TransportWebHID.create().then(transport => ...)
	 */
	var TransportWebHID = /** @class */ (function (_super) {
	    __extends(TransportWebHID, _super);
	    function TransportWebHID(device) {
	        var _this = _super.call(this) || this;
	        _this.channel = Math.floor(Math.random() * 0xffff);
	        _this.packetSize = 64;
	        _this.inputs = [];
	        _this.read = function () {
	            if (_this.inputs.length) {
	                return Promise.resolve(_this.inputs.shift());
	            }
	            return new Promise(function (success) {
	                _this.inputCallback = success;
	            });
	        };
	        _this.onInputReport = function (e) {
	            var buffer = Buffer.from(e.data.buffer);
	            if (_this.inputCallback) {
	                _this.inputCallback(buffer);
	                _this.inputCallback = null;
	            }
	            else {
	                _this.inputs.push(buffer);
	            }
	        };
	        _this._disconnectEmitted = false;
	        _this._emitDisconnect = function (e) {
	            if (_this._disconnectEmitted)
	                return;
	            _this._disconnectEmitted = true;
	            _this.emit("disconnect", e);
	        };
	        /**
	         * Exchange with the device using APDU protocol.
	         * @param apdu
	         * @returns a promise of apdu response
	         */
	        _this.exchange = function (apdu) { return __awaiter$2(_this, void 0, void 0, function () {
	            var b;
	            var _this = this;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.exchangeAtomicImpl(function () { return __awaiter$2(_this, void 0, void 0, function () {
	                            var _a, channel, packetSize, framing, blocks, i, result, acc, buffer;
	                            return __generator(this, function (_b) {
	                                switch (_b.label) {
	                                    case 0:
	                                        _a = this, channel = _a.channel, packetSize = _a.packetSize;
	                                        log("apdu", "=> " + apdu.toString("hex"));
	                                        framing = hidFraming(channel, packetSize);
	                                        blocks = framing.makeBlocks(apdu);
	                                        i = 0;
	                                        _b.label = 1;
	                                    case 1:
	                                        if (!(i < blocks.length)) return [3 /*break*/, 4];
	                                        return [4 /*yield*/, this.device.sendReport(0, blocks[i])];
	                                    case 2:
	                                        _b.sent();
	                                        _b.label = 3;
	                                    case 3:
	                                        i++;
	                                        return [3 /*break*/, 1];
	                                    case 4:
	                                        if (!!(result = framing.getReducedResult(acc))) return [3 /*break*/, 6];
	                                        return [4 /*yield*/, this.read()];
	                                    case 5:
	                                        buffer = _b.sent();
	                                        acc = framing.reduceResponse(acc, buffer);
	                                        return [3 /*break*/, 4];
	                                    case 6:
	                                        log("apdu", "<= " + result.toString("hex"));
	                                        return [2 /*return*/, result];
	                                }
	                            });
	                        }); })["catch"](function (e) {
	                            if (e && e.message && e.message.includes("write")) {
	                                _this._emitDisconnect(e);
	                                throw new DisconnectedDeviceDuringOperation(e.message);
	                            }
	                            throw e;
	                        })];
	                    case 1:
	                        b = _a.sent();
	                        return [2 /*return*/, b];
	                }
	            });
	        }); };
	        _this.device = device;
	        _this.deviceModel =
	            typeof device.productId === "number"
	                ? identifyUSBProductId(device.productId)
	                : undefined;
	        device.addEventListener("inputreport", _this.onInputReport);
	        return _this;
	    }
	    /**
	     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
	     */
	    TransportWebHID.request = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var _a, device;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0: return [4 /*yield*/, requestLedgerDevices()];
	                    case 1:
	                        _a = __read.apply(void 0, [_b.sent(), 1]), device = _a[0];
	                        return [2 /*return*/, TransportWebHID.open(device)];
	                }
	            });
	        });
	    };
	    /**
	     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
	     */
	    TransportWebHID.openConnected = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var devices;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, getLedgerDevices()];
	                    case 1:
	                        devices = _a.sent();
	                        if (devices.length === 0)
	                            return [2 /*return*/, null];
	                        return [2 /*return*/, TransportWebHID.open(devices[0])];
	                }
	            });
	        });
	    };
	    /**
	     * Create a Ledger transport with a HIDDevice
	     */
	    TransportWebHID.open = function (device) {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var transport, onDisconnect;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, device.open()];
	                    case 1:
	                        _a.sent();
	                        transport = new TransportWebHID(device);
	                        onDisconnect = function (e) {
	                            if (device === e.device) {
	                                getHID().removeEventListener("disconnect", onDisconnect);
	                                transport._emitDisconnect(new DisconnectedDevice());
	                            }
	                        };
	                        getHID().addEventListener("disconnect", onDisconnect);
	                        return [2 /*return*/, transport];
	                }
	            });
	        });
	    };
	    /**
	     * Release the transport device
	     */
	    TransportWebHID.prototype.close = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, this.exchangeBusyPromise];
	                    case 1:
	                        _a.sent();
	                        this.device.removeEventListener("inputreport", this.onInputReport);
	                        return [4 /*yield*/, this.device.close()];
	                    case 2:
	                        _a.sent();
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    TransportWebHID.prototype.setScrambleKey = function () { };
	    /**
	     * Check if WebUSB transport is supported.
	     */
	    TransportWebHID.isSupported = isSupported;
	    /**
	     * List the WebUSB devices that was previously authorized by the user.
	     */
	    TransportWebHID.list = getLedgerDevices;
	    /**
	     * Actively listen to WebUSB devices and emit ONE device
	     * that was either accepted before, if not it will trigger the native permission UI.
	     *
	     * Important: it must be called in the context of a UI click!
	     */
	    TransportWebHID.listen = function (observer) {
	        var unsubscribed = false;
	        getFirstLedgerDevice().then(function (device) {
	            if (!device) {
	                observer.error(new TransportOpenUserCancelled("Access denied to use Ledger device"));
	            }
	            else if (!unsubscribed) {
	                var deviceModel = typeof device.productId === "number"
	                    ? identifyUSBProductId(device.productId)
	                    : undefined;
	                observer.next({
	                    type: "add",
	                    descriptor: device,
	                    deviceModel: deviceModel
	                });
	                observer.complete();
	            }
	        }, function (error) {
	            observer.error(new TransportOpenUserCancelled(error.message));
	        });
	        function unsubscribe() {
	            unsubscribed = true;
	        }
	        return {
	            unsubscribe: unsubscribe
	        };
	    };
	    return TransportWebHID;
	}(Transport));

	var TransportWebHID$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: TransportWebHID
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(TransportWebHID$1);

	var openModal = {};

	var jsxRuntime = {};

	var preact = {};

	var n$1,l$1,u$1,t$1,i$1,r$1,o$1,f$1,e$1,c$1={},s$1=[],a$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function h$1(n,l){for(var u in l)n[u]=l[u];return n}function p$1(n){var l=n.parentNode;l&&l.removeChild(n);}function v$1(l,u,t){var i,r,o,f={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:f[o]=u[o];if(arguments.length>2&&(f.children=arguments.length>3?n$1.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps)void 0===f[o]&&(f[o]=l.defaultProps[o]);return y$1(l,f,i,r,null)}function y$1(n,t,i,r,o){var f={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++u$1:o};return null==o&&null!=l$1.vnode&&l$1.vnode(f),f}function d$1(n){return n.children}function _$1(n,l,u,t,i){var r;for(r in u)"children"===r||"key"===r||r in l||x$1(n,r,null,u[r],t);for(r in l)i&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||x$1(n,r,l[r],u[r],t);}function k(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a$1.test(l)?u:u+"px";}function x$1(n,l,u,t,i){var r;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||k(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||k(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])r=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t||n.addEventListener(l,r?g:b,r):n.removeEventListener(l,r?g:b,r);else if("dangerouslySetInnerHTML"!==l){if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&-1==l.indexOf("-")?n.removeAttribute(l):n.setAttribute(l,u));}}function b(n){i$1=!0;try{return this.l[n.type+!1](l$1.event?l$1.event(n):n)}finally{i$1=!1;}}function g(n){i$1=!0;try{return this.l[n.type+!0](l$1.event?l$1.event(n):n)}finally{i$1=!1;}}function m$1(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l)return n.__?w(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?w(n):null}function A$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return A$1(n)}}function P$1(n){i$1?setTimeout(n):f$1(n);}function C(n){(!n.__d&&(n.__d=!0)&&r$1.push(n)&&!T$1.__r++||o$1!==l$1.debounceRendering)&&((o$1=l$1.debounceRendering)||P$1)(T$1);}function T$1(){var n,l,u,t,i,o,f,e;for(r$1.sort(function(n,l){return n.__v.__b-l.__v.__b});n=r$1.shift();)n.__d&&(l=r$1.length,t=void 0,i=void 0,f=(o=(u=n).__v).__e,(e=u.__P)&&(t=[],(i=h$1({},o)).__v=o.__v+1,z(e,o,i,u.__n,void 0!==e.ownerSVGElement,null!=o.__h?[f]:null,t,null==f?w(o):f,o.__h),L(t,o),o.__e!=f&&A$1(o)),r$1.length>l&&r$1.sort(function(n,l){return n.__v.__b-l.__v.__b}));T$1.__r=0;}function $(n,l,u,t,i,r,o,f,e,a){var h,p,v,_,k,x,b,g=t&&t.__k||s$1,m=g.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(_=u.__k[h]=null==(_=l[h])||"boolean"==typeof _?null:"string"==typeof _||"number"==typeof _||"bigint"==typeof _?y$1(null,_,null,null,_):Array.isArray(_)?y$1(d$1,{children:_},null,null,null):_.__b>0?y$1(_.type,_.props,_.key,_.ref?_.ref:null,_.__v):_)){if(_.__=u,_.__b=u.__b+1,null===(v=g[h])||v&&_.key==v.key&&_.type===v.type)g[h]=void 0;else for(p=0;p<m;p++){if((v=g[p])&&_.key==v.key&&_.type===v.type){g[p]=void 0;break}v=null;}z(n,_,v=v||c$1,i,r,o,f,e,a),k=_.__e,(p=_.ref)&&v.ref!=p&&(b||(b=[]),v.ref&&b.push(v.ref,null,_),b.push(p,_.__c||k,_)),null!=k?(null==x&&(x=k),"function"==typeof _.type&&_.__k===v.__k?_.__d=e=H(_,e,n):e=I(n,_,v,g,k,e),"function"==typeof u.type&&(u.__d=e)):e&&v.__e==e&&e.parentNode!=n&&(e=w(v));}for(u.__e=x,h=m;h--;)null!=g[h]&&("function"==typeof u.type&&null!=g[h].__e&&g[h].__e==u.__d&&(u.__d=j(t).nextSibling),O(g[h],g[h]));if(b)for(h=0;h<b.length;h++)N(b[h],b[++h],b[++h]);}function H(n,l,u){for(var t,i=n.__k,r=0;i&&r<i.length;r++)(t=i[r])&&(t.__=n,l="function"==typeof t.type?H(t,l,u):I(u,t,t,i,t.__e,l));return l}function I(n,l,u,t,i,r){var o,f,e;if(void 0!==l.__d)o=l.__d,l.__d=void 0;else if(null==u||i!=r||null==i.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(i),o=null;else {for(f=r,e=0;(f=f.nextSibling)&&e<t.length;e+=1)if(f==i)break n;n.insertBefore(i,r),o=r;}return void 0!==o?o:i.nextSibling}function j(n){var l,u,t;if(null==n.type||"string"==typeof n.type)return n.__e;if(n.__k)for(l=n.__k.length-1;l>=0;l--)if((u=n.__k[l])&&(t=j(u)))return t;return null}function z(n,u,t,i,r,o,f,e,c){var s,a,p,v,y,_,k,x,b,g,w,A,P,C,T,H=u.type;if(void 0!==u.constructor)return null;null!=t.__h&&(c=t.__h,e=u.__e=t.__e,u.__h=null,o=[e]),(s=l$1.__b)&&s(u);try{n:if("function"==typeof H){if(x=u.props,b=(s=H.contextType)&&i[s.__c],g=s?b?b.props.value:s.__:i,t.__c?k=(a=u.__c=t.__c).__=a.__E:("prototype"in H&&H.prototype.render?u.__c=a=new H(x,g):(u.__c=a=new m$1(x,g),a.constructor=H,a.render=S),b&&b.sub(a),a.props=x,a.state||(a.state={}),a.context=g,a.__n=i,p=a.__d=!0,a.__h=[],a._sb=[]),null==a.__s&&(a.__s=a.state),null!=H.getDerivedStateFromProps&&(a.__s==a.state&&(a.__s=h$1({},a.__s)),h$1(a.__s,H.getDerivedStateFromProps(x,a.__s))),v=a.props,y=a.state,a.__v=u,p)null==H.getDerivedStateFromProps&&null!=a.componentWillMount&&a.componentWillMount(),null!=a.componentDidMount&&a.__h.push(a.componentDidMount);else {if(null==H.getDerivedStateFromProps&&x!==v&&null!=a.componentWillReceiveProps&&a.componentWillReceiveProps(x,g),!a.__e&&null!=a.shouldComponentUpdate&&!1===a.shouldComponentUpdate(x,a.__s,g)||u.__v===t.__v){for(u.__v!==t.__v&&(a.props=x,a.state=a.__s,a.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),w=0;w<a._sb.length;w++)a.__h.push(a._sb[w]);a._sb=[],a.__h.length&&f.push(a);break n}null!=a.componentWillUpdate&&a.componentWillUpdate(x,a.__s,g),null!=a.componentDidUpdate&&a.__h.push(function(){a.componentDidUpdate(v,y,_);});}if(a.context=g,a.props=x,a.__P=n,A=l$1.__r,P=0,"prototype"in H&&H.prototype.render){for(a.state=a.__s,a.__d=!1,A&&A(u),s=a.render(a.props,a.state,a.context),C=0;C<a._sb.length;C++)a.__h.push(a._sb[C]);a._sb=[];}else do{a.__d=!1,A&&A(u),s=a.render(a.props,a.state,a.context),a.state=a.__s;}while(a.__d&&++P<25);a.state=a.__s,null!=a.getChildContext&&(i=h$1(h$1({},i),a.getChildContext())),p||null==a.getSnapshotBeforeUpdate||(_=a.getSnapshotBeforeUpdate(v,y)),T=null!=s&&s.type===d$1&&null==s.key?s.props.children:s,$(n,Array.isArray(T)?T:[T],u,t,i,r,o,f,e,c),a.base=u.__e,u.__h=null,a.__h.length&&f.push(a),k&&(a.__E=a.__=null),a.__e=!1;}else null==o&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=M(t.__e,u,t,i,r,o,f,c);(s=l$1.diffed)&&s(u);}catch(n){u.__v=null,(c||null!=o)&&(u.__e=e,u.__h=!!c,o[o.indexOf(e)]=null),l$1.__e(n,u,t);}}function L(n,u){l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function M(l,u,t,i,r,o,f,e){var s,a,h,v=t.props,y=u.props,d=u.type,k=0;if("svg"===d&&(r=!0),null!=o)for(;k<o.length;k++)if((s=o[k])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,o[k]=null;break}if(null==l){if(null===d)return document.createTextNode(y);l=r?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,y.is&&y),o=null,e=!1;}if(null===d)v===y||e&&l.data===y||(l.data=y);else {if(o=o&&n$1.call(l.childNodes),a=(v=t.props||c$1).dangerouslySetInnerHTML,h=y.dangerouslySetInnerHTML,!e){if(null!=o)for(v={},k=0;k<l.attributes.length;k++)v[l.attributes[k].name]=l.attributes[k].value;(h||a)&&(h&&(a&&h.__html==a.__html||h.__html===l.innerHTML)||(l.innerHTML=h&&h.__html||""));}if(_$1(l,y,v,r,e),h)u.__k=[];else if(k=u.props.children,$(l,Array.isArray(k)?k:[k],u,t,i,r&&"foreignObject"!==d,o,f,o?o[0]:t.__k&&w(t,0),e),null!=o)for(k=o.length;k--;)null!=o[k]&&p$1(o[k]);e||("value"in y&&void 0!==(k=y.value)&&(k!==l.value||"progress"===d&&!k||"option"===d&&k!==v.value)&&x$1(l,"value",k,v.value,!1),"checked"in y&&void 0!==(k=y.checked)&&k!==l.checked&&x$1(l,"checked",k,v.checked,!1));}return l}function N(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$1.__e(n,t);}}function O(n,u,t){var i,r;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||N(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null,n.__c=void 0;}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&O(i[r],u,t||"function"!=typeof n.type);t||null==n.__e||p$1(n.__e),n.__=n.__e=n.__d=void 0;}function S(n,l,u){return this.constructor(n,u)}function q$1(u,t,i){var r,o,f;l$1.__&&l$1.__(u,t),o=(r="function"==typeof i)?null:i&&i.__k||t.__k,f=[],z(t,u=(!r&&i||t).__k=v$1(d$1,null,[u]),o||c$1,c$1,void 0!==t.ownerSVGElement,!r&&i?[i]:o?null:t.firstChild?n$1.call(t.childNodes):null,f,!r&&i?i:o?o.__e:t.firstChild,r),L(f,u);}n$1=s$1.slice,l$1={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,t$1=function(n){return null!=n&&void 0===n.constructor},i$1=!1,m$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=h$1({},this.state),"function"==typeof n&&(n=n(h$1({},u),this.props)),n&&h$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),C(this));},m$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),C(this));},m$1.prototype.render=d$1,r$1=[],f$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,T$1.__r=0,e$1=0,preact.Component=m$1,preact.Fragment=d$1,preact.cloneElement=function(l,u,t){var i,r,o,f=h$1({},l.props);for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:f[o]=u[o];return arguments.length>2&&(f.children=arguments.length>3?n$1.call(arguments,2):t),y$1(l.type,f,i||l.key,r||l.ref,null)},preact.createContext=function(n,l){var u={__c:l="__cC"+e$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,t;return this.getChildContext||(u=[],(t={})[l]=this,this.getChildContext=function(){return t},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(function(n){n.__e=!0,C(n);});},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u},preact.createElement=v$1,preact.createRef=function(){return {current:null}},preact.h=v$1,preact.hydrate=function n(l,u){q$1(l,u,n);},preact.isValidElement=t$1,preact.options=l$1,preact.render=q$1,preact.toChildArray=function n(l,u){return u=u||[],null==l||"boolean"==typeof l||(Array.isArray(l)?l.some(function(l){n(l,u);}):u.push(l)),u};

	(function (exports) {
		var r=preact,e=0;function _(_,n,o,t,u,l){var f,i,c={};for(i in n)"ref"==i?f=n[i]:c[i]=n[i];var p={type:_,props:c,key:o,ref:f,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--e,__source:u,__self:l};if("function"==typeof _&&(f=_.defaultProps))for(i in f)void 0===c[i]&&(c[i]=f[i]);return r.options.vnode&&r.options.vnode(p),p}Object.defineProperty(exports,"Fragment",{enumerable:!0,get:function(){return r.Fragment}}),exports.jsx=_,exports.jsxDEV=_,exports.jsxs=_;
		
	} (jsxRuntime));

	var compat = {};

	var hooks = {};

	var n,t,r,u,o=preact,i=0,f=[],c=[],e=o.options.__b,a=o.options.__r,v=o.options.diffed,l=o.options.__c,s=o.options.unmount;function p(n,r){o.options.__h&&o.options.__h(t,n,i||r),i=0;var u=t.__H||(t.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({__V:c}),u.__[n]}function x(n){return i=1,m(P,n)}function m(r,u,o){var i=p(n++,2);if(i.t=r,!i.__c&&(i.__=[o?o(u):P(void 0,u),function(n){var t=i.__N?i.__N[0]:i.__[0],r=i.t(t,n);t!==r&&(i.__N=[r,i.__[1]],i.__c.setState({}));}],i.__c=t,!t.u)){t.u=!0;var f=t.shouldComponentUpdate;t.shouldComponentUpdate=function(n,t,r){if(!i.__c.__H)return !0;var u=i.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return !n.__N}))return !f||f.call(this,n,t,r);var o=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(o=!0);}}),!(!o&&i.__c.props===n)&&(!f||f.call(this,n,t,r))};}return i.__N||i.__}function d(r,u){var i=p(n++,4);!o.options.__s&&T(i.__H,u)&&(i.__=r,i.o=u,t.__h.push(i));}function y(t,r){var u=p(n++,7);return T(u.__H,r)?(u.__V=t(),u.o=r,u.__h=t,u.__V):u.__}function h(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(A),n.__H.__h.forEach(F),n.__H.__h=[];}catch(t){n.__H.__h=[],o.options.__e(t,n.__v);}}o.options.__b=function(n){t=null,e&&e(n);},o.options.__r=function(u){a&&a(u),n=0;var o=(t=u.__c).__H;o&&(r===t?(o.__h=[],t.__h=[],o.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.o=void 0;})):(o.__h.forEach(A),o.__h.forEach(F),o.__h=[])),r=t;},o.options.diffed=function(n){v&&v(n);var i=n.__c;i&&i.__H&&(i.__H.__h.length&&(1!==f.push(i)&&u===o.options.requestAnimationFrame||((u=o.options.requestAnimationFrame)||q)(h)),i.__H.__.forEach(function(n){n.o&&(n.__H=n.o),n.__V!==c&&(n.__=n.__V),n.o=void 0,n.__V=c;})),r=t=null;},o.options.__c=function(n,t){t.some(function(n){try{n.__h.forEach(A),n.__h=n.__h.filter(function(n){return !n.__||F(n)});}catch(r){t.some(function(n){n.__h&&(n.__h=[]);}),t=[],o.options.__e(r,n.__v);}}),l&&l(n,t);},o.options.unmount=function(n){s&&s(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{A(n);}catch(n){t=n;}}),r.__H=void 0,t&&o.options.__e(t,r.__v));};var _="function"==typeof requestAnimationFrame;function q(n){var t,r=function(){clearTimeout(u),_&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);_&&(t=requestAnimationFrame(r));}function A(n){var r=t,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),t=r;}function F(n){var r=t;n.__c=n.__(),t=r;}function T(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function P(n,t){return "function"==typeof t?t(n):t}hooks.useCallback=function(n,t){return i=8,y(function(){return n},t)},hooks.useContext=function(r){var u=t.context[r.__c],o=p(n++,9);return o.c=r,u?(null==o.__&&(o.__=!0,u.sub(t)),u.props.value):r.__},hooks.useDebugValue=function(n,t){o.options.useDebugValue&&o.options.useDebugValue(t?t(n):n);},hooks.useEffect=function(r,u){var i=p(n++,3);!o.options.__s&&T(i.__H,u)&&(i.__=r,i.o=u,t.__H.__h.push(i));},hooks.useErrorBoundary=function(r){var u=p(n++,10),o=x();return u.__=r,t.componentDidCatch||(t.componentDidCatch=function(n,t){u.__&&u.__(n,t),o[1](n);}),[o[0],function(){o[1](void 0);}]},hooks.useId=function(){var r=p(n++,11);if(!r.__){for(var u=t.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var o=u.__m||(u.__m=[0,0]);r.__="P"+o[0]+"-"+o[1]++;}return r.__},hooks.useImperativeHandle=function(n,t,r){i=6,d(function(){return "function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==r?r:r.concat(n));},hooks.useLayoutEffect=d,hooks.useMemo=y,hooks.useReducer=m,hooks.useRef=function(n){return i=5,y(function(){return {current:n}},[])},hooks.useState=x;

	(function (exports) {
		var n=preact,t=hooks;function e(n,t){for(var e in t)n[e]=t[e];return n}function r(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function u(n,t){return n===t&&(0!==n||1/n==1/t)||n!=n&&t!=t}function o(n){this.props=n;}function i(t,e){function u(n){var t=this.props.ref,u=t==n.ref;return !u&&t&&(t.call?t(null):t.current=null),e?!e(this.props,n)||!u:r(this.props,n)}function o(e){return this.shouldComponentUpdate=u,n.createElement(t,e)}return o.displayName="Memo("+(t.displayName||t.name)+")",o.prototype.isReactComponent=!0,o.__f=!0,o}(o.prototype=new n.Component).isPureReactComponent=!0,o.prototype.shouldComponentUpdate=function(n,t){return r(this.props,n)||r(this.state,t)};var c=n.options.__b;n.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),c&&c(n);};var l="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function f(n){function t(t){var r=e({},t);return delete r.ref,n(r,t.ref||null)}return t.$$typeof=l,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var a=function(t,e){return null==t?null:n.toChildArray(n.toChildArray(t).map(e))},s={map:a,forEach:a,count:function(t){return t?n.toChildArray(t).length:0},only:function(t){var e=n.toChildArray(t);if(1!==e.length)throw "Children.only";return e[0]},toArray:n.toChildArray},p=n.options.__e;n.options.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);p(n,t,e,r);};var h=n.options.unmount;function v(n,t,r){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),null!=(n=e({},n)).__c&&(n.__c.__P===r&&(n.__c.__P=t),n.__c=null),n.__k=n.__k&&n.__k.map(function(n){return v(n,t,r)})),n}function d(n,t,e){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(function(n){return d(n,t,e)}),n.__c&&n.__c.__P===t&&(n.__e&&e.insertBefore(n.__e,n.__d),n.__c.__e=!0,n.__c.__P=e)),n}function m(){this.__u=0,this.t=null,this.__b=null;}function x(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function b(t){var e,r,u;function o(o){if(e||(e=t()).then(function(n){r=n.default||n;},function(n){u=n;}),u)throw u;if(!r)throw e;return n.createElement(r,o)}return o.displayName="Lazy",o.__f=!0,o}function _(){this.u=null,this.o=null;}n.options.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),h&&h(n);},(m.prototype=new n.Component).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=x(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(c):c());};e.__R=i;var c=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=d(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate();}},l=!0===t.__h;r.__u++||l||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i);},m.prototype.componentWillUnmount=function(){this.t=[];},m.prototype.render=function(t,e){if(this.__b){if(this.__v.__k){var r=document.createElement("div"),u=this.__v.__k[0].__c;this.__v.__k[0]=v(this.__b,r,u.__O=u.__P);}this.__b=null;}var o=e.__a&&n.createElement(n.Fragment,null,t.fallback);return o&&(o.__h=null),[n.createElement(n.Fragment,null,e.__a?null:t.children),o]};var y=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function g(n){return this.getChildContext=function(){return n.context},n.children}function S(t){var e=this,r=t.i;e.componentWillUnmount=function(){n.render(null,e.l),e.l=null,e.i=null;},e.i&&e.i!==r&&e.componentWillUnmount(),t.__v?(e.l||(e.i=r,e.l={nodeType:1,parentNode:r,childNodes:[],appendChild:function(n){this.childNodes.push(n),e.i.appendChild(n);},insertBefore:function(n,t){this.childNodes.push(n),e.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),e.i.removeChild(n);}}),n.render(n.createElement(g,{context:e.context},t.__v),e.l)):e.l&&e.componentWillUnmount();}function C(t,e){var r=n.createElement(S,{__v:t,i:e});return r.containerInfo=e,r}(_.prototype=new n.Component).__a=function(n){var t=this,e=x(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),y(t,n,r)):u();};e?e(o):o();}},_.prototype.render=function(t){this.u=null,this.o=new Map;var e=n.toChildArray(t.children);t.revealOrder&&"b"===t.revealOrder[0]&&e.reverse();for(var r=e.length;r--;)this.o.set(e[r],this.u=[1,0,this.u]);return t.children},_.prototype.componentDidUpdate=_.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){y(n,e,t);});};var E="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,O=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,w="undefined"!=typeof document,R=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function j(t,e,r){return null==e.__k&&(e.textContent=""),n.render(t,e),"function"==typeof r&&r(),t?t.__c:null}function N(t,e,r){return n.hydrate(t,e),"function"==typeof r&&r(),t?t.__c:null}n.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(t){Object.defineProperty(n.Component.prototype,t,{configurable:!0,get:function(){return this["UNSAFE_"+t]},set:function(n){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:n});}});});var k=n.options.event;function A(){}function T(){return this.cancelBubble}function I(){return this.defaultPrevented}n.options.event=function(n){return k&&(n=k(n)),n.persist=A,n.isPropagationStopped=T,n.isDefaultPrevented=I,n.nativeEvent=n};var L,U={configurable:!0,get:function(){return this.class}},D=n.options.vnode;n.options.vnode=function(t){var e=t.type,r=t.props,u=r;if("string"==typeof e){var o=-1===e.indexOf("-");for(var i in u={},r){var c=r[i];w&&"children"===i&&"noscript"===e||"value"===i&&"defaultValue"in r&&null==c||("defaultValue"===i&&"value"in r&&null==r.value?i="value":"download"===i&&!0===c?c="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+e)&&!R(r.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():o&&O.test(i)?i=i.replace(/[A-Z0-9]/g,"-$&").toLowerCase():null===c&&(c=void 0),/^oninput$/i.test(i)&&(i=i.toLowerCase(),u[i]&&(i="oninputCapture")),u[i]=c);}"select"==e&&u.multiple&&Array.isArray(u.value)&&(u.value=n.toChildArray(r.children).forEach(function(n){n.props.selected=-1!=u.value.indexOf(n.props.value);})),"select"==e&&null!=u.defaultValue&&(u.value=n.toChildArray(r.children).forEach(function(n){n.props.selected=u.multiple?-1!=u.defaultValue.indexOf(n.props.value):u.defaultValue==n.props.value;})),t.props=u,r.class!=r.className&&(U.enumerable="className"in r,null!=r.className&&(u.class=r.className),Object.defineProperty(u,"className",U));}t.$$typeof=E,D&&D(t);};var F=n.options.__r;n.options.__r=function(n){F&&F(n),L=n.__c;};var M={ReactCurrentDispatcher:{current:{readContext:function(n){return L.__n[n.__c].props.value}}}};function V(t){return n.createElement.bind(null,t)}function W(n){return !!n&&n.$$typeof===E}function P(t){return W(t)?n.cloneElement.apply(null,arguments):t}function $(t){return !!t.__k&&(n.render(null,t),!0)}function z(n){return n&&(n.base||1===n.nodeType&&n)||null}var B=function(n,t){return n(t)},q=function(n,t){return n(t)},H=n.Fragment;function Z(n){n();}function Y(n){return n}function G(){return [!1,Z]}var J=t.useLayoutEffect;function K(n,e){var r=e(),o=t.useState({p:{__:r,h:e}}),i=o[0].p,c=o[1];return t.useLayoutEffect(function(){i.__=r,i.h=e,u(i.__,e())||c({p:i});},[n,r,e]),t.useEffect(function(){return u(i.__,i.h())||c({p:i}),n(function(){u(i.__,i.h())||c({p:i});})},[n]),r}var Q={useState:t.useState,useId:t.useId,useReducer:t.useReducer,useEffect:t.useEffect,useLayoutEffect:t.useLayoutEffect,useInsertionEffect:J,useTransition:G,useDeferredValue:Y,useSyncExternalStore:K,startTransition:Z,useRef:t.useRef,useImperativeHandle:t.useImperativeHandle,useMemo:t.useMemo,useCallback:t.useCallback,useContext:t.useContext,useDebugValue:t.useDebugValue,version:"17.0.2",Children:s,render:j,hydrate:N,unmountComponentAtNode:$,createPortal:C,createElement:n.createElement,createContext:n.createContext,createFactory:V,cloneElement:P,createRef:n.createRef,Fragment:n.Fragment,isValidElement:W,findDOMNode:z,Component:n.Component,PureComponent:o,memo:i,forwardRef:f,flushSync:q,unstable_batchedUpdates:B,StrictMode:H,Suspense:m,SuspenseList:_,lazy:b,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:M};Object.defineProperty(exports,"Component",{enumerable:!0,get:function(){return n.Component}}),Object.defineProperty(exports,"Fragment",{enumerable:!0,get:function(){return n.Fragment}}),Object.defineProperty(exports,"createContext",{enumerable:!0,get:function(){return n.createContext}}),Object.defineProperty(exports,"createElement",{enumerable:!0,get:function(){return n.createElement}}),Object.defineProperty(exports,"createRef",{enumerable:!0,get:function(){return n.createRef}}),exports.Children=s,exports.PureComponent=o,exports.StrictMode=H,exports.Suspense=m,exports.SuspenseList=_,exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M,exports.cloneElement=P,exports.createFactory=V,exports.createPortal=C,exports.default=Q,exports.findDOMNode=z,exports.flushSync=q,exports.forwardRef=f,exports.hydrate=N,exports.isValidElement=W,exports.lazy=b,exports.memo=i,exports.render=j,exports.startTransition=Z,exports.unmountComponentAtNode=$,exports.unstable_batchedUpdates=B,exports.useDeferredValue=Y,exports.useInsertionEffect=J,exports.useSyncExternalStore=K,exports.useTransition=G,exports.version="17.0.2",Object.keys(t).forEach(function(n){"default"===n||exports.hasOwnProperty(n)||Object.defineProperty(exports,n,{enumerable:!0,get:function(){return t[n]}});});
		
	} (compat));

	var ConfirmContent$1 = {};

	var lang = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getLangText = exports.Lang = void 0;
		exports.Lang = {
		    en: {
		        loadingTitle: 'Log in with Ledger',
		        loadingTip0: 'Please connect to your Ledger device and open “Tron” App.',
		        loadingTip4: 'Preparing your Ledger device...',
		        checkTitle: 'Please check if the address below is the same one shown on your Ledger device',
		        checkTip0: 'If it is: press “Approve” button to confirm the address',
		        checkTip1: "If it isn't: select “Reject” on your Ledger device and refresh this page",
		        confirmTip: 'Please confirm on your Ledger',
		        selectTitle: 'Select account',
		        selectTip: 'Please select an account to use',
		        cancel: 'Cancel',
		        confirm: 'Confirm',
		        address: 'Address',
		        balance: 'Available Balance',
		        loadMore: 'Load More',
		    },
		    'zh-CN': {
		        loadingTitle: 'Ledger 登录',
		        loadingTip0: '请连接 Ledger 设备，并在设备上进入 “TRON” 应用',
		        loadingTip4: 'Ledger 设备准备中......',
		        checkTitle: '请确认以下地址与 Ledger 设备显示地址一致',
		        checkTip0: '如果一致：请按设备上的 Approve 按钮进行确认',
		        checkTip1: '如果不一致：请在 Ledger 设备中选择 Reject 按钮并刷新本页面',
		        confirmTip: '请在 Ledger 上确认',
		        selectTitle: '选择账户',
		        selectTip: '请选择要使用的钱包账户',
		        cancel: '取消',
		        confirm: '确认',
		        address: '地址',
		        balance: '可用余额',
		        loadMore: '加载更多账户',
		    },
		    'zh-TC': {
		        loadingTitle: 'Ledger 登錄',
		        loadingTip0: '請連接 Ledger 設備，並在設備上進入 “TRON” 應用',
		        loadingTip4: 'Ledger 設備準備中......',
		        checkTitle: '請確認以下地址與 Ledger 設備顯示地址一致',
		        checkTip0: '如果一致：請按設備上的 Approve 按鈕進行確認',
		        checkTip1: '如果不一致：請在 Ledger 設備中選擇 Reject 按鈕並刷新本頁面',
		        confirmTip: '請在 Ledger 上確認',
		        selectTitle: '選擇賬戶',
		        selectTip: '請選擇要使用的錢包賬戶',
		        cancel: '取消',
		        confirm: '確認',
		        address: '地址',
		        balance: '可用餘額',
		        loadMore: '加載更多賬戶',
		    },
		};
		function getLangText() {
		    const searchParams = new URLSearchParams(globalThis.location.search);
		    const searchParamsLang = searchParams.get('lang');
		    const storageSettingLang = globalThis.localStorage.getItem('lang');
		    const appLang = (searchParamsLang || storageSettingLang || '').toLowerCase();
		    const browserSettingLang = (globalThis.navigator.language || '').toLowerCase();
		    let browserLang;
		    if (['zh-tw', 'zh-hk', 'zh-tc'].includes(browserSettingLang)) {
		        browserLang = exports.Lang['zh-TC'];
		    }
		    else if (['zh', 'zh-cn'].includes(browserSettingLang)) {
		        browserLang = exports.Lang['zh-CN'];
		    }
		    else if (browserSettingLang.includes('en')) {
		        browserLang = exports.Lang['en'];
		    }
		    let lang = browserLang;
		    if (appLang) {
		        if (['zh-tw', 'zh-hk', 'zh-tc'].includes(appLang)) {
		            lang = exports.Lang['zh-TC'];
		        }
		        else if (['zh', 'zh-cn'].includes(appLang)) {
		            lang = exports.Lang['zh-CN'];
		        }
		        else if (appLang.includes('en')) {
		            lang = exports.Lang.en;
		        }
		    }
		    return lang || exports.Lang.en;
		}
		exports.getLangText = getLangText;
		
	} (lang));

	var LedgerIcon$1 = {};

	Object.defineProperty(LedgerIcon$1, "__esModule", { value: true });
	LedgerIcon$1.LedgerIcon = void 0;
	const jsx_runtime_1$6 = jsxRuntime;
	function LedgerIcon() {
	    return ((0, jsx_runtime_1$6.jsx)("div", { children: (0, jsx_runtime_1$6.jsx)("img", { style: {
	                width: '5vw',
	                marginBottom: '1vw',
	            }, src: "data:image/png;base64,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", alt: "logo" }) }));
	}
	LedgerIcon$1.LedgerIcon = LedgerIcon;

	var LoadingIcon$1 = {};

	Object.defineProperty(LoadingIcon$1, "__esModule", { value: true });
	LoadingIcon$1.LoadingIcon = void 0;
	const jsx_runtime_1$5 = jsxRuntime;
	function LoadingIcon() {
	    return ((0, jsx_runtime_1$5.jsx)("div", Object.assign({ className: "ledger-ant-spin ledger-ant-spin-lg ledger-ant-spin-spinning spin" }, { children: (0, jsx_runtime_1$5.jsxs)("span", Object.assign({ className: "ledger-ant-spin-dot" }, { children: [(0, jsx_runtime_1$5.jsx)("i", { className: "ledger-ant-spin-dot-item" }), (0, jsx_runtime_1$5.jsx)("i", { className: "ledger-ant-spin-dot-item" }), (0, jsx_runtime_1$5.jsx)("i", { className: "ledger-ant-spin-dot-item" }), (0, jsx_runtime_1$5.jsx)("i", { className: "ledger-ant-spin-dot-item" })] })) })));
	}
	LoadingIcon$1.LoadingIcon = LoadingIcon;

	Object.defineProperty(ConfirmContent$1, "__esModule", { value: true });
	ConfirmContent$1.ConfirmContent = void 0;
	const jsx_runtime_1$4 = jsxRuntime;
	const compat_1$2 = compat;
	const lang_js_1$3 = lang;
	const LedgerIcon_js_1$1 = LedgerIcon$1;
	const LoadingIcon_js_1$1 = LoadingIcon$1;
	function ConfirmContent(props) {
	    const langText = (0, compat_1$2.useMemo)(() => (0, lang_js_1$3.getLangText)(), []);
	    return ((0, jsx_runtime_1$4.jsxs)("div", Object.assign({ style: { textAlign: 'center' }, "data-testid": "confirm-content" }, { children: [(0, jsx_runtime_1$4.jsx)(LedgerIcon_js_1$1.LedgerIcon, {}), (0, jsx_runtime_1$4.jsxs)("div", Object.assign({ className: "ledger-connecting-pop" }, { children: [(0, jsx_runtime_1$4.jsxs)("ul", Object.assign({ className: "ledger-connecting-pop-content" }, { children: [(0, jsx_runtime_1$4.jsx)("li", Object.assign({ className: "title", style: { wordBreak: 'break-word' } }, { children: langText.checkTitle })), (0, jsx_runtime_1$4.jsx)("li", { children: (0, jsx_runtime_1$4.jsx)("strong", Object.assign({ style: { color: '#B0170D', textAlign: 'left', fontWeight: '600' }, "data-testid": "confirm-content-address" }, { children: props.address })) }), (0, jsx_runtime_1$4.jsx)("li", { children: langText.checkTip0 }), (0, jsx_runtime_1$4.jsx)("li", { children: langText.checkTip1 })] })), (0, jsx_runtime_1$4.jsxs)("div", Object.assign({ className: "mt-4" }, { children: [(0, jsx_runtime_1$4.jsx)(LoadingIcon_js_1$1.LoadingIcon, {}), (0, jsx_runtime_1$4.jsx)("div", { children: (0, jsx_runtime_1$4.jsx)("div", Object.assign({ className: "text-muted" }, { children: (0, jsx_runtime_1$4.jsx)("span", { children: langText.confirmTip }) })) })] }))] }))] })));
	}
	ConfirmContent$1.ConfirmContent = ConfirmContent;

	var ConnectingContent$1 = {};

	Object.defineProperty(ConnectingContent$1, "__esModule", { value: true });
	ConnectingContent$1.ConnectingContent = void 0;
	const jsx_runtime_1$3 = jsxRuntime;
	const compat_1$1 = compat;
	const lang_js_1$2 = lang;
	const LedgerIcon_js_1 = LedgerIcon$1;
	const LoadingIcon_js_1 = LoadingIcon$1;
	function ConnectingContent() {
	    const langText = (0, compat_1$1.useMemo)(() => (0, lang_js_1$2.getLangText)(), []);
	    return ((0, jsx_runtime_1$3.jsxs)("div", Object.assign({ style: { textAlign: 'center' }, "data-testid": "connecting-content" }, { children: [(0, jsx_runtime_1$3.jsx)(LedgerIcon_js_1.LedgerIcon, {}), (0, jsx_runtime_1$3.jsxs)("div", Object.assign({ className: "ledger-connecting-pop" }, { children: [(0, jsx_runtime_1$3.jsx)("ul", Object.assign({ className: "ledger-connecting-pop-content" }, { children: (0, jsx_runtime_1$3.jsx)("li", Object.assign({ className: "title" }, { children: langText.loadingTip0 })) })), (0, jsx_runtime_1$3.jsxs)("div", Object.assign({ className: "mt-4" }, { children: [(0, jsx_runtime_1$3.jsx)(LoadingIcon_js_1.LoadingIcon, {}), (0, jsx_runtime_1$3.jsx)("div", { children: (0, jsx_runtime_1$3.jsx)("div", Object.assign({ className: "text-muted" }, { children: (0, jsx_runtime_1$3.jsx)("span", { children: langText.loadingTip4 }) })) })] }))] }))] })));
	}
	ConnectingContent$1.ConnectingContent = ConnectingContent;

	var Modal$1 = {};

	Object.defineProperty(Modal$1, "__esModule", { value: true });
	Modal$1.Modal = void 0;
	const jsx_runtime_1$2 = jsxRuntime;
	function Modal(props) {
	    return ((0, jsx_runtime_1$2.jsxs)("div", Object.assign({ className: "ledger-modal-root" }, { children: [(0, jsx_runtime_1$2.jsx)("div", { className: "ledger-modal-mask" }), (0, jsx_runtime_1$2.jsx)("div", Object.assign({ className: "ledger-modal-wrap" }, { children: (0, jsx_runtime_1$2.jsx)("div", Object.assign({ className: "ledger-modal", style: { width: props.width || '550px' } }, { children: (0, jsx_runtime_1$2.jsxs)("div", Object.assign({ className: "ledger-modal-content" }, { children: [(0, jsx_runtime_1$2.jsx)("button", Object.assign({ onClick: props.onClose, type: "button", "aria-label": "Close", className: "ledger-modal-close" }, { children: (0, jsx_runtime_1$2.jsx)("span", Object.assign({ className: "ledger-modal-close-x" }, { children: (0, jsx_runtime_1$2.jsx)("i", Object.assign({ "aria-label": "icon: close", className: "icon icon-close ledger-modal-close-icon" }, { children: (0, jsx_runtime_1$2.jsx)("svg", Object.assign({ viewBox: "64 64 896 896", focusable: "false", className: "", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" }, { children: (0, jsx_runtime_1$2.jsx)("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }) })) })) })) })), (0, jsx_runtime_1$2.jsx)("div", Object.assign({ className: "ledger-modal-header" }, { children: (0, jsx_runtime_1$2.jsx)("div", Object.assign({ className: "ledger-modal-title" }, { children: props.title })) })), (0, jsx_runtime_1$2.jsx)("div", Object.assign({ className: "ledger-modal-body" }, { children: props.children }))] })) })) }))] })));
	}
	Modal$1.Modal = Modal;

	var SelectAccount$1 = {};

	var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(SelectAccount$1, "__esModule", { value: true });
	SelectAccount$1.SelectAccount = void 0;
	const jsx_runtime_1$1 = jsxRuntime;
	const hooks_1 = hooks;
	const hooks_2 = hooks;
	const hooks_3 = hooks;
	const hooks_4 = hooks;
	const hooks_5 = hooks;
	const lang_js_1$1 = lang;
	function SelectAccount(props) {
	    const [index, setIndex] = (0, hooks_5.useState)(0);
	    const [accounts, setAccounts] = (0, hooks_5.useState)([]);
	    const [loading, setLoading] = (0, hooks_5.useState)(false);
	    const loadBtnRef = (0, hooks_3.useRef)(null);
	    const langText = (0, hooks_2.useMemo)(() => (0, lang_js_1$1.getLangText)(), []);
	    (0, hooks_4.useEffect)(() => {
	        setAccounts([...props.accounts]);
	    }, [props.accounts]);
	    (0, hooks_4.useEffect)(() => {
	        setIndex(props.selectedIndex);
	    }, [props.selectedIndex]);
	    function onInput(e) {
	        setIndex(+e.target.value);
	    }
	    function onConfirm() {
	        const selected = accounts.find((item) => item.index === index);
	        props.onConfirm(selected || (accounts === null || accounts === void 0 ? void 0 : accounts[0]));
	    }
	    function onCancel() {
	        props.onCancel();
	    }
	    function onLoadMore() {
	        return __awaiter$1(this, void 0, void 0, function* () {
	            setLoading(true);
	            const last = accounts[accounts.length - 1] || { index: -1 };
	            const from = last.index + 1;
	            const to = last.index + 6;
	            try {
	                const result = yield props.getAccounts(from, to);
	                setAccounts((accounts) => [...accounts, ...result]);
	            }
	            finally {
	                setLoading(false);
	            }
	        });
	    }
	    (0, hooks_1.useLayoutEffect)(() => {
	        var _a, _b;
	        (_b = (_a = loadBtnRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(_a);
	    }, [accounts]);
	    return ((0, jsx_runtime_1$1.jsxs)("div", Object.assign({ style: { paddingLeft: 40 }, className: "ledger-select", "data-testid": "select-account-content" }, { children: [(0, jsx_runtime_1$1.jsx)("span", Object.assign({ className: "title" }, { children: langText.selectTip })), (0, jsx_runtime_1$1.jsxs)("div", Object.assign({ className: "ledger-select-list-wrap" }, { children: [(0, jsx_runtime_1$1.jsx)("ul", Object.assign({ className: "ledger-select-list", "data-testid": "select-account-list" }, { children: accounts.map((account, idx) => {
	                            return ((0, jsx_runtime_1$1.jsx)("li", Object.assign({ className: "ledger-select-item" }, { children: (0, jsx_runtime_1$1.jsxs)("label", Object.assign({ htmlFor: `ledger-select-radio${idx}` }, { children: [(0, jsx_runtime_1$1.jsx)("input", { className: account.index === index ? 'checked' : '', id: `ledger-select-radio${idx}`, type: "radio", name: "selectedAddress", value: account.index, checked: account.index === index, onInput: onInput }), (0, jsx_runtime_1$1.jsx)("span", { children: account.address })] })) }), idx));
	                        }) })), (0, jsx_runtime_1$1.jsx)("div", Object.assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1$1.jsxs)("button", Object.assign({ "data-testid": "btn-load-more", ref: loadBtnRef, style: { marginTop: 10 }, disabled: loading, className: "ledger-select-button", onClick: onLoadMore }, { children: [(0, jsx_runtime_1$1.jsx)("span", Object.assign({ style: { marginRight: loading ? 10 : 0 } }, { children: langText.loadMore })), loading ? (
	                                /* prettier-ignore */
	                                (0, jsx_runtime_1$1.jsx)("svg", Object.assign({ width: "18", height: "18", viewBox: "0 0 38 38", xmlns: "http://www.w3.org/2000/svg", stroke: "#fff" }, { children: (0, jsx_runtime_1$1.jsx)("g", Object.assign({ fill: "none", fillRule: "evenodd" }, { children: (0, jsx_runtime_1$1.jsxs)("g", Object.assign({ transform: "translate(1 1)", strokeWidth: "2" }, { children: [(0, jsx_runtime_1$1.jsx)("circle", { strokeOpacity: ".5", cx: "18", cy: "18", r: "18" }), (0, jsx_runtime_1$1.jsx)("path", Object.assign({ d: "M36 18c0-9.94-8.06-18-18-18" }, { children: (0, jsx_runtime_1$1.jsx)("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" }) }))] })) })) }))) : null] })) }))] })), (0, jsx_runtime_1$1.jsxs)("footer", Object.assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: [(0, jsx_runtime_1$1.jsx)("button", Object.assign({ "data-testid": "btn-cancel", style: { marginRight: 10 }, className: "ledger-select-button default-button", onClick: onCancel }, { children: langText.cancel })), (0, jsx_runtime_1$1.jsx)("button", Object.assign({ "data-testid": "btn-confirm", disabled: loading, className: "ledger-select-button", onClick: onConfirm }, { children: langText.confirm }))] }))] })));
	}
	SelectAccount$1.SelectAccount = SelectAccount;

	var style = {};

	Object.defineProperty(style, "__esModule", { value: true });
	style.modalStyleSheetContent = void 0;
	style.modalStyleSheetContent = `
.ledger-modal-mask, .ledger-modal-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    font-family: 'PingFangSC-Regular', 'Arial', sans-serif, 'Droid Sans', 'Helvetica Neue';
}
.ledger-modal-mask {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
}
.ledger-modal-wrap {
    overflow: auto;
    outline: 0;
}
.ledger-modal {
  position: relative;
  margin: 0 auto;
  padding-bottom: 24px;
  line-height: 1.5;
  top: 50px;
  width: 600px;
  color: rgba(0, 0, 0, 0.65);
}
.ledger-modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  pointer-events: auto;
}
.ledger-modal-close {
  -webkit-appearance: button;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
}
.ledger-modal-close:focus,.ledger-modal-close:active,.ledger-modal-close:hover {
  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
  border: none;
  outline: none;
}
.ledger-modal-close-x {
  display: block;
  width: 56px;
  height: 56px;
  font-size: 16px;
  font-style: normal;
  line-height: 56px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
}
.ledger-modal-close-x .icon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.ledger-modal-header {
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
}
.ledger-select .title, .ledger-modal-title {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  word-wrap: break-word;
}
.ledger-modal-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  max-height: 650px;
  overflow-y: auto;
}


// connecting content
.ledger-connecting-pop ul {
  margin: 0;
}
.ledger-connecting-pop-content {
  padding-left: 8%;
}
.ledger-connecting-pop-content li, .ledger-select li {
  display: flex;
  margin: 10px 0 10px 0;
  line-height: 25px;
  word-break: break-all;
  text-align: left;
}
.ledger-connecting-pop-content .title {
  margin-bottom: 20px;
  font-weight: bold;
}
.ledger-ant-spin {
  box-sizing: border-box;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  color: #B0170D;
  vertical-align: middle;
  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  position: static;
  opacity: 1;
  margin: 2vw 0;
  text-align: center;
  display: block;
}
.ledger-ant-spin-dot {
  position: relative;
  display: inline-block;
  font-size: 20px;
  width: 1em;
  height: 1em;
  transform: rotate(45deg);
  animation: antRotate 1.2s infinite linear;
  font-size: 32px;
}

.ledger-ant-spin-dot-item {
  position: absolute;
  display: block;
  width: 9px;
  height: 9px;
  background-color: #B0170D;
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: antSpinMove 1s infinite linear alternate;
}
.ledger-ant-spin-dot-item:nth-child(1) {
  top: 0;
  left: 0;
}
.ledger-ant-spin-dot-item:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}
.ledger-ant-spin-dot-item:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}
.ledger-ant-spin-dot-item:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}
.ledger-ant-spin-lg .ledger-ant-spin-dot i {
  width: 14px;
  height: 14px;
}
@keyframes antRotate {
  100% {
    transform: rotate(405deg)
  }
}
@keyframes antSpinMove {
  100% {
    opacity: 1;
  }
}

.ledger-select {
  text-align: left;
}
.ledger-select .title {
  display: block;
  margin-bottom: 10px;
}
.ledger-select-list-wrap {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  margin: 0 0 20px 0;
}
.ledger-select-list {
  margin-top: 0;
  padding: 0;
}
.ledger-select-item {
  font-size: 14px;
  color: #2f2f2f;
  line-height: 25px;
  margin-top: 0;
}
.ledger-select-item:hover {
  color: #6f6f6f;
}
.ledger-select-item label {
  cursor: pointer;
  width: 100%;
  display: flex;
}
.ledger-select-item input {
  width: 15px;
  height: 25px;
  margin: 0 10px 0 0;
}
.ledger-select-button {
  display: inline-flex;
  color: #fff;
  cursor: pointer;
  height: 36px;
  background-color: #c23631;
  border: none;
  border-radius: 4px;
  align-items: center;
  padding: 0 18px;
  font-family: DM Sans, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.ledger-select-button[disabled] {
  cursor: not-allowed;
}
.ledger-select-button.default-button {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #dcdfe6;
}
.ledger-select-button:focus {
  outline: none;
}
.ledger-select-button:focus-visible {
  outline: 2px solid white;
}
.ledger-select-button:hover {
  opacity: 0.7;
}
`;

	Object.defineProperty(openModal, "__esModule", { value: true });
	openModal.openSelectAccountModal = openModal.openVerifyAddressModal = openModal.openConnectingModal = void 0;
	const jsx_runtime_1 = jsxRuntime;
	const compat_1 = compat;
	const ConfirmContent_js_1 = ConfirmContent$1;
	const ConnectingContent_js_1 = ConnectingContent$1;
	const lang_js_1 = lang;
	const Modal_js_1 = Modal$1;
	const SelectAccount_js_1 = SelectAccount$1;
	const style_js_1 = style;
	function prepareDomNode() {
	    const div = document.createElement('div');
	    const style = document.createElement('style');
	    style.innerHTML = style_js_1.modalStyleSheetContent;
	    document.body.append(style);
	    document.body.append(div);
	    function onClose() {
	        div.remove();
	        style.remove();
	    }
	    return {
	        onClose,
	        div,
	    };
	}
	function openConnectingModal() {
	    const { onClose, div } = prepareDomNode();
	    const langText = (0, lang_js_1.getLangText)();
	    (0, compat_1.render)((0, jsx_runtime_1.jsx)(Modal_js_1.Modal, Object.assign({ title: langText.loadingTitle, onClose: onClose }, { children: (0, jsx_runtime_1.jsx)(ConnectingContent_js_1.ConnectingContent, {}) })), div);
	    return onClose;
	}
	openModal.openConnectingModal = openConnectingModal;
	function openVerifyAddressModal(address) {
	    const { onClose, div } = prepareDomNode();
	    const langText = (0, lang_js_1.getLangText)();
	    (0, compat_1.render)((0, jsx_runtime_1.jsx)(Modal_js_1.Modal, Object.assign({ width: 550, title: langText.loadingTitle, onClose: onClose }, { children: (0, jsx_runtime_1.jsx)(ConfirmContent_js_1.ConfirmContent, { address: address }) })), div);
	    return onClose;
	}
	openModal.openVerifyAddressModal = openVerifyAddressModal;
	function openSelectAccountModal(options) {
	    const { onClose, div } = prepareDomNode();
	    const langText = (0, lang_js_1.getLangText)();
	    return new Promise((resolve, reject) => {
	        function onConfirm(account) {
	            resolve(account);
	            onClose();
	        }
	        function onCancel() {
	            reject(new Error('Operation is canceled.'));
	            onClose();
	        }
	        (0, compat_1.render)((0, jsx_runtime_1.jsx)(Modal_js_1.Modal, Object.assign({ title: langText.loadingTitle, onClose: onCancel }, { children: (0, jsx_runtime_1.jsx)(SelectAccount_js_1.SelectAccount, { accounts: options.accounts, selectedIndex: options.selectedIndex || 0, onConfirm: onConfirm, onCancel: onCancel, getAccounts: options.getAccounts }) })), div);
	    });
	}
	openModal.openSelectAccountModal = openSelectAccountModal;

	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(LedgerWallet$1, "__esModule", { value: true });
	LedgerWallet$1.LedgerWallet = void 0;
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	const hw_app_trx_1 = __importDefault(require$$0$1);
	const hw_transport_webhid_1 = __importDefault(require$$1);
	const openModal_js_1 = openModal;
	function wait(timeout) {
	    return __awaiter(this, void 0, void 0, function* () {
	        return new Promise((resolve) => {
	            setTimeout(resolve, timeout);
	        });
	    });
	}
	function isFunction(fn) {
	    return typeof fn === 'function';
	}
	const defaultSelectAccount = function ({ accounts, ledgerUtils }) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const account = yield (0, openModal_js_1.openSelectAccountModal)({
	            accounts,
	            getAccounts: ledgerUtils.getAccounts,
	        });
	        const closeConfirm = (0, openModal_js_1.openVerifyAddressModal)(account.address);
	        try {
	            yield ledgerUtils.getAddress(account.index, true);
	        }
	        finally {
	            closeConfirm === null || closeConfirm === void 0 ? void 0 : closeConfirm();
	        }
	        return account;
	    });
	};
	class LedgerWallet {
	    constructor(config = {}) {
	        this.app = null;
	        this.transport = null;
	        this.fetchState = 'Initial';
	        this.selectedIndex = 0;
	        this._address = '';
	        this.getAccounts = (from, to) => __awaiter(this, void 0, void 0, function* () {
	            if (from < 0) {
	                throw new Error('getAccount parameter error: from cannot be smaller than 0.');
	            }
	            if (from >= to) {
	                throw new Error('getAccount parameter error: from cannot be bigger than to.');
	            }
	            if (this.fetchState === 'Fetching') {
	                yield wait(500);
	                return this.getAccounts(from, to);
	            }
	            this.fetchState = 'Fetching';
	            // ledger can not get address concurrently.
	            yield this.makeApp();
	            try {
	                const obj = {};
	                for (let i = from; i < to; i++) {
	                    const account = yield this.getAccount(i);
	                    obj[account.index] = account;
	                }
	                Object.keys(obj).forEach((key) => {
	                    this.accounts[+key] = obj[key];
	                });
	                return this.accounts.slice(from, to);
	            }
	            finally {
	                this.fetchState = 'Initial';
	                yield this.cleanUp();
	            }
	        });
	        this.getAddress = (index, display = false) => __awaiter(this, void 0, void 0, function* () {
	            try {
	                const path = this.getPathForIndex(index);
	                yield this.makeApp();
	                return yield this.app.getAddress(path, display);
	            }
	            finally {
	                yield this.cleanUp();
	            }
	        });
	        this.accounts = [];
	        const { accountNumber = 1 } = config;
	        ['beforeConnect', 'selectAccount', 'getDerivationPath'].forEach((func) => {
	            if (config[func] && !isFunction(config[func])) {
	                throw new Error(`[Ledger]: ${func} must be a function!`);
	            }
	        });
	        if (accountNumber && !Number.isInteger(+accountNumber)) {
	            throw new Error('[Ledger]: accountNumber must be an integer!');
	        }
	        this.config = Object.assign(Object.assign({}, config), { accountNumber });
	    }
	    get address() {
	        return this._address;
	    }
	    connect(options) {
	        return __awaiter(this, void 0, void 0, function* () {
	            if ((options === null || options === void 0 ? void 0 : options.account) && typeof options.account === 'object') {
	                const account = options.account;
	                this.selectedIndex = +account.index;
	                this._address = account.address;
	                if (account.index === undefined || account.address === undefined) {
	                    console.warn('[LedgerWallet] account parameter passed to connect() should have valid index and address property');
	                }
	                return;
	            }
	            const ledgerUtils = {
	                getAccounts: this.getAccounts,
	                getAddress: this.getAddress,
	            };
	            this.accounts = [];
	            this._address = '';
	            this.selectedIndex = 0;
	            const { accountNumber = 1, beforeConnect, selectAccount = defaultSelectAccount } = this.config;
	            let closeConnectingModal = null;
	            try {
	                if (beforeConnect) {
	                    yield beforeConnect();
	                }
	                else {
	                    closeConnectingModal = (0, openModal_js_1.openConnectingModal)();
	                }
	                yield this.makeApp();
	                const firstAccount = yield this.getAccount(0);
	                this.accounts[0] = firstAccount;
	                yield this.cleanUp();
	                if (accountNumber > 1) {
	                    yield this.getAccounts(1, accountNumber);
	                }
	                closeConnectingModal === null || closeConnectingModal === void 0 ? void 0 : closeConnectingModal();
	                const accounts = this.accounts.slice(0, accountNumber);
	                const selectedAccount = yield selectAccount({
	                    accounts,
	                    ledgerUtils,
	                });
	                this.selectedIndex = selectedAccount.index;
	                this._address = selectedAccount.address;
	            }
	            finally {
	                yield this.cleanUp();
	            }
	        });
	    }
	    disconnect() {
	        this.selectedIndex = 0;
	        this._address = '';
	    }
	    signPersonalMessage(message) {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield this.waitForIdle();
	            try {
	                const index = this.selectedIndex;
	                yield this.makeApp();
	                const path = this.getPathForIndex(index);
	                const hex = Buffer.from(message).toString('hex');
	                const res = yield this.app.signPersonalMessage(path, hex);
	                return res;
	            }
	            finally {
	                yield this.cleanUp();
	            }
	        });
	    }
	    signTransaction(transaction) {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield this.waitForIdle();
	            try {
	                const index = this.selectedIndex;
	                const path = this.getPathForIndex(index);
	                yield this.makeApp();
	                let signedResponse;
	                try {
	                    signedResponse = yield this.app.signTransaction(path, transaction.raw_data_hex, []);
	                }
	                catch (e) {
	                    if (/Too many bytes to encode/.test(e.message)) {
	                        signedResponse = yield this.app.signTransactionHash(path, transaction.txID);
	                    }
	                    else {
	                        throw e;
	                    }
	                }
	                if (Array.isArray(transaction.signature)) {
	                    if (!transaction.signature.includes(signedResponse))
	                        transaction.signature.push(signedResponse);
	                }
	                else {
	                    transaction.signature = [signedResponse];
	                }
	                return transaction;
	            }
	            finally {
	                yield this.cleanUp();
	            }
	        });
	    }
	    getAccount(index) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const path = this.getPathForIndex(index);
	            const { address } = yield this.app.getAddress(path);
	            return {
	                path,
	                address,
	                index,
	            };
	        });
	    }
	    waitForIdle() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.fetchState === 'Fetching') {
	                yield wait(300);
	                yield this.waitForIdle();
	            }
	        });
	    }
	    getPathForIndex(index) {
	        return this.config.getDerivationPath ? this.config.getDerivationPath(index) : `44'/195'/${index}'/0/0`;
	    }
	    makeApp() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.transport && this.app) {
	                return;
	            }
	            this.transport = yield hw_transport_webhid_1.default.create();
	            this.app = new hw_app_trx_1.default(this.transport);
	        });
	    }
	    cleanUp() {
	        var _a;
	        return __awaiter(this, void 0, void 0, function* () {
	            this.app = null;
	            yield ((_a = this.transport) === null || _a === void 0 ? void 0 : _a.close());
	            this.transport = null;
	        });
	    }
	}
	LedgerWallet$1.LedgerWallet = LedgerWallet;

	(function (exports) {
		var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.LedgerAdapter = exports.LedgerAdapterName = void 0;
		const tronwallet_abstract_adapter_1 = cjs;
		const LedgerWallet_js_1 = LedgerWallet$1;
		const isSupportedLedger = () => !!(globalThis.navigator && globalThis.navigator.hid);
		exports.LedgerAdapterName = 'Ledger';
		class LedgerAdapter extends tronwallet_abstract_adapter_1.Adapter {
		    constructor(config = {}) {
		        super();
		        this.name = exports.LedgerAdapterName;
		        this.url = 'https://www.ledger.com/';
		        this.icon = 'data:image/png;base64,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';
		        this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.Loading;
		        this._state = tronwallet_abstract_adapter_1.AdapterState.NotFound;
		        this._connecting = false;
		        this._address = null;
		        this.config = config;
		        this._wallet = new LedgerWallet_js_1.LedgerWallet(config);
		        if (isSupportedLedger()) {
		            this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.Found;
		            this._state = tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		        }
		        else {
		            this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.NotFound;
		        }
		    }
		    get address() {
		        return this._address;
		    }
		    get state() {
		        return this._state;
		    }
		    get connecting() {
		        return this._connecting;
		    }
		    get readyState() {
		        return this._readyState;
		    }
		    get ledgerUtils() {
		        return {
		            getAccounts: this._wallet.getAccounts,
		            getAddress: this._wallet.getAddress,
		        };
		    }
		    connect(options) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                if (this.connected || this.connecting)
		                    return;
		                if (this.state === tronwallet_abstract_adapter_1.AdapterState.NotFound) {
		                    if (this.config.openUrlWhenWalletNotFound !== false && (0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		                        window.open(this.url, '_blank');
		                    }
		                    throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		                }
		                this._connecting = true;
		                try {
		                    yield this._wallet.connect(options);
		                }
		                catch (e) {
		                    // @todo: confirm to hidden ledger error message
		                    // if (e.message?.includes('Incorrect length (0x6700)')) {
		                    //     // This error code usually means that users don't have the right application opened on device
		                    //     // see here  https://www.reddit.com/r/ledgerwallet/comments/mxcxo3/can_someone_help_with_the_problem_ledger_device/
		                    //     throw new WalletConnectionError('Please prepare your ledger and enter Tron app.');
		                    // }
		                    throw new tronwallet_abstract_adapter_1.WalletConnectionError(`${e.message}.`);
		                }
		                this._address = this._wallet.address;
		                this._state = tronwallet_abstract_adapter_1.AdapterState.Connected;
		                this.emit('connect', this.address || '');
		                this.emit('stateChanged', this._state);
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		            finally {
		                this._connecting = false;
		            }
		        });
		    }
		    disconnect() {
		        return __awaiter(this, void 0, void 0, function* () {
		            if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected) {
		                return;
		            }
		            try {
		                this._wallet.disconnect();
		                this._state = tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		                this._address = null;
		                this.emit('disconnect');
		                this.emit('stateChanged', this._state);
		            }
		            catch (e) {
		                this.emit('error', e);
		                throw new tronwallet_abstract_adapter_1.WalletDisconnectionError(e.message);
		            }
		        });
		    }
		    signTransaction(transaction) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected) {
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                }
		                try {
		                    const signedTransaction = yield this._wallet.signTransaction(transaction);
		                    return signedTransaction;
		                }
		                catch (e) {
		                    throw new tronwallet_abstract_adapter_1.WalletSignTransactionError(e.message);
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		    signMessage(message) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected) {
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                }
		                try {
		                    const signedResponse = yield this._wallet.signPersonalMessage(message);
		                    return signedResponse;
		                }
		                catch (error) {
		                    throw new tronwallet_abstract_adapter_1.WalletSignMessageError(error === null || error === void 0 ? void 0 : error.message, error);
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		}
		exports.LedgerAdapter = LedgerAdapter;
		
	} (adapter$1));

	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });

		__exportStar(adapter$1, exports);
		__exportStar(openModal, exports);
		
	} (cjs$1));

	var index = /*@__PURE__*/getDefaultExportFromCjs(cjs$1);

	return index;

}));
