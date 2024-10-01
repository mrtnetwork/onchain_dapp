(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@tronweb3/tronwallet-adapter-tronlink"] = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var cjs$1 = {};

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

	var types$1 = {};

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
		
	} (types$1));

	var utils$1 = {};

	Object.defineProperty(utils$1, "__esModule", { value: true });
	utils$1.isInMobileBrowser = utils$1.checkAdapterState = utils$1.isInBrowser = void 0;
	/**
	 * check simply if current environment is browser or not
	 * @returns boolean
	 */
	function isInBrowser() {
	    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
	}
	utils$1.isInBrowser = isInBrowser;
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
	utils$1.checkAdapterState = checkAdapterState;
	/**
	 * Simplily detect mobile device
	 */
	function isInMobileBrowser() {
	    return (typeof navigator !== 'undefined' &&
	        navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i));
	}
	utils$1.isInMobileBrowser = isInMobileBrowser;

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
		__exportStar(types$1, exports);
		__exportStar(utils$1, exports);
		
	} (cjs));

	var utils = {};

	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.waitTronwebReady = utils.openTronLink = utils.isInTronLinkApp = utils.supportTronLink = utils.supportTron = void 0;
	const tronwallet_abstract_adapter_1 = cjs;
	function supportTron() {
	    return !!(window.tron && window.tron.isTronLink);
	}
	utils.supportTron = supportTron;
	function supportTronLink() {
	    return !!(supportTron() || window.tronLink || window.tronWeb);
	}
	utils.supportTronLink = supportTronLink;
	/**
	 * Detect if in TronLinkApp
	 * Tron DApp running in the DApp Explorer injects iTron objects automatically to offer customized App service.
	 * See [here](https://docs.tronlink.org/tronlink-app/dapp-support/dapp-explorer)
	 */
	function isInTronLinkApp() {
	    return (0, tronwallet_abstract_adapter_1.isInBrowser)() && typeof window.iTron !== 'undefined';
	}
	utils.isInTronLinkApp = isInTronLinkApp;
	function openTronLink({ dappIcon, dappName } = { dappIcon: '', dappName: '' }) {
	    if (!supportTronLink() && (0, tronwallet_abstract_adapter_1.isInMobileBrowser)() && !isInTronLinkApp()) {
	        let defaultDappName = '', defaultDappIcon = '';
	        try {
	            defaultDappName = document.title;
	            const link = document.querySelector('link[rel*="icon"]');
	            if (link) {
	                defaultDappIcon = new URL(link.getAttribute('href') || '', location.href).toString();
	            }
	        }
	        catch (e) {
	            // console.error(e);
	        }
	        const { origin, pathname, search, hash } = window.location;
	        const url = origin + pathname + search + (hash.includes('?') ? hash : `${hash}?_=1`);
	        const params = {
	            action: 'open',
	            actionId: Date.now() + '',
	            callbackUrl: 'http://someurl.com',
	            dappIcon: dappIcon || defaultDappIcon,
	            dappName: dappName || defaultDappName,
	            url,
	            protocol: 'TronLink',
	            version: '1.0',
	            chainId: '0x2b6653dc',
	        };
	        window.location.href = `tronlinkoutside://pull.activity?param=${encodeURIComponent(JSON.stringify(params))}`;
	        return true;
	    }
	    return false;
	}
	utils.openTronLink = openTronLink;
	function waitTronwebReady(tronObj) {
	    return __awaiter(this, void 0, void 0, function* () {
	        return new Promise((resolve, reject) => {
	            const interval = setInterval(() => {
	                if (tronObj.tronWeb) {
	                    clearInterval(interval);
	                    clearTimeout(timeout);
	                    resolve();
	                }
	            }, 50);
	            const timeout = setTimeout(() => {
	                clearInterval(interval);
	                reject('`window.tron.tronweb` is not ready.');
	            }, 2000);
	        });
	    });
	}
	utils.waitTronwebReady = waitTronwebReady;

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
		exports.TronLinkAdapter = exports.TronLinkAdapterName = exports.getNetworkInfoByTronWeb = exports.chainIdNetworkMap = void 0;
		const tronwallet_abstract_adapter_1 = cjs;
		const utils_js_1 = utils;
		exports.chainIdNetworkMap = {
		    '0x2b6653dc': tronwallet_abstract_adapter_1.NetworkType.Mainnet,
		    '0x94a9059e': tronwallet_abstract_adapter_1.NetworkType.Shasta,
		    '0xcd8690dc': tronwallet_abstract_adapter_1.NetworkType.Nile,
		};
		function getNetworkInfoByTronWeb(tronWeb) {
		    var _a, _b, _c;
		    return __awaiter(this, void 0, void 0, function* () {
		        const { blockID = '' } = yield tronWeb.trx.getBlockByNumber(0);
		        const chainId = `0x${blockID.slice(-8)}`;
		        return {
		            networkType: exports.chainIdNetworkMap[chainId] || tronwallet_abstract_adapter_1.NetworkType.Unknown,
		            chainId,
		            fullNode: ((_a = tronWeb.fullNode) === null || _a === void 0 ? void 0 : _a.host) || '',
		            solidityNode: ((_b = tronWeb.solidityNode) === null || _b === void 0 ? void 0 : _b.host) || '',
		            eventServer: ((_c = tronWeb.eventServer) === null || _c === void 0 ? void 0 : _c.host) || '',
		        };
		    });
		}
		exports.getNetworkInfoByTronWeb = getNetworkInfoByTronWeb;
		exports.TronLinkAdapterName = 'TronLink';
		class TronLinkAdapter extends tronwallet_abstract_adapter_1.Adapter {
		    // record if first connect event has emitted or not
		    constructor(config = {}) {
		        super();
		        this.name = exports.TronLinkAdapterName;
		        this.url = 'https://www.tronlink.org/';
		        this.icon = 'data:image/png;base64,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';
		        this._readyState = (0, tronwallet_abstract_adapter_1.isInBrowser)() ? tronwallet_abstract_adapter_1.WalletReadyState.Loading : tronwallet_abstract_adapter_1.WalletReadyState.NotFound;
		        this._state = tronwallet_abstract_adapter_1.AdapterState.Loading;
		        // https://github.com/tronprotocol/tips/blob/master/tip-1193.md
		        this._supportNewTronProtocol = false;
		        this._tronLinkMessageHandler = (e) => {
		            var _a, _b, _c, _d, _e;
		            const message = (_a = e.data) === null || _a === void 0 ? void 0 : _a.message;
		            if (!message) {
		                return;
		            }
		            if (message.action === 'accountsChanged') {
		                setTimeout(() => {
		                    var _a;
		                    const preAddr = this.address || '';
		                    if ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.ready) {
		                        const address = message.data.address;
		                        this.setAddress(address);
		                        this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                    }
		                    else {
		                        this.setAddress(null);
		                        this.setState(tronwallet_abstract_adapter_1.AdapterState.Disconnect);
		                    }
		                    this.emit('accountsChanged', this.address || '', preAddr);
		                    if (!preAddr && this.address) {
		                        this.emit('connect', this.address);
		                    }
		                    else if (preAddr && !this.address) {
		                        this.emit('disconnect');
		                    }
		                }, 200);
		            }
		            else if (message.action === 'setNode') {
		                this.emit('chainChanged', { chainId: ((_c = (_b = message.data) === null || _b === void 0 ? void 0 : _b.node) === null || _c === void 0 ? void 0 : _c.chainId) || '' });
		            }
		            else if (message.action === 'connect') {
		                const address = ((_e = (_d = this._wallet.tronWeb) === null || _d === void 0 ? void 0 : _d.defaultAddress) === null || _e === void 0 ? void 0 : _e.base58) || '';
		                this.setAddress(address);
		                this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                this.emit('connect', address);
		            }
		            else if (message.action === 'disconnect') {
		                this.setAddress(null);
		                this.setState(tronwallet_abstract_adapter_1.AdapterState.Disconnect);
		                this.emit('disconnect');
		            }
		        };
		        this._onChainChanged = (data) => {
		            this.emit('chainChanged', data);
		        };
		        this._onAccountsChanged = () => {
		            var _a, _b, _c;
		            const preAddr = this.address || '';
		            const curAddr = (((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.tronWeb) && ((_c = (_b = this._wallet) === null || _b === void 0 ? void 0 : _b.tronWeb.defaultAddress) === null || _c === void 0 ? void 0 : _c.base58)) || '';
		            if (!curAddr) {
		                // change to a new address and if it's disconnected, data will be empty
		                // tronlink will emit accountsChanged many times, only process when connected
		                this.setAddress(null);
		                this.setState(tronwallet_abstract_adapter_1.AdapterState.Disconnect);
		            }
		            else {
		                const address = curAddr;
		                this.setAddress(address);
		                this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		            }
		            this.emit('accountsChanged', this.address || '', preAddr);
		            if (!preAddr && this.address) {
		                this.emit('connect', this.address);
		            }
		            else if (preAddr && !this.address) {
		                this.emit('disconnect');
		            }
		        };
		        this._checkPromise = null;
		        this._updateWallet = () => {
		            var _a, _b, _c, _d, _e, _f, _g, _h;
		            let state = this.state;
		            let address = this.address;
		            if ((0, tronwallet_abstract_adapter_1.isInMobileBrowser)()) {
		                if (window.tronLink) {
		                    this._wallet = window.tronLink;
		                }
		                else {
		                    this._wallet = {
		                        ready: !!((_a = window.tronWeb) === null || _a === void 0 ? void 0 : _a.defaultAddress),
		                        tronWeb: window.tronWeb,
		                        request: () => Promise.resolve(true),
		                    };
		                }
		                address = ((_c = (_b = this._wallet.tronWeb) === null || _b === void 0 ? void 0 : _b.defaultAddress) === null || _c === void 0 ? void 0 : _c.base58) || null;
		                state = address ? tronwallet_abstract_adapter_1.AdapterState.Connected : tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		            }
		            else if (window.tron && window.tron.isTronLink) {
		                this._supportNewTronProtocol = true;
		                this._wallet = window.tron;
		                this._listenTronEvent();
		                address = (this._wallet.tronWeb && ((_e = (_d = this._wallet.tronWeb) === null || _d === void 0 ? void 0 : _d.defaultAddress) === null || _e === void 0 ? void 0 : _e.base58)) || null;
		                state = address ? tronwallet_abstract_adapter_1.AdapterState.Connected : tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		            }
		            else if (window.tronLink) {
		                this._wallet = window.tronLink;
		                this._listenTronLinkEvent();
		                address = ((_g = (_f = this._wallet.tronWeb) === null || _f === void 0 ? void 0 : _f.defaultAddress) === null || _g === void 0 ? void 0 : _g.base58) || null;
		                state = this._wallet.ready ? tronwallet_abstract_adapter_1.AdapterState.Connected : tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		            }
		            else if (window.tronWeb) {
		                // fake tronLink
		                this._wallet = {
		                    ready: window.tronWeb.ready,
		                    tronWeb: window.tronWeb,
		                    request: () => Promise.resolve(true),
		                };
		                address = ((_h = this._wallet.tronWeb.defaultAddress) === null || _h === void 0 ? void 0 : _h.base58) || null;
		                state = this._wallet.ready ? tronwallet_abstract_adapter_1.AdapterState.Connected : tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		            }
		            else {
		                // no tronlink support
		                this._wallet = null;
		                address = null;
		                state = tronwallet_abstract_adapter_1.AdapterState.NotFound;
		            }
		            // In TronLink App, account should be connected
		            if ((0, tronwallet_abstract_adapter_1.isInMobileBrowser)() && state === tronwallet_abstract_adapter_1.AdapterState.Disconnect) {
		                this.checkForWalletReadyForApp();
		            }
		            this.setAddress(address);
		            this.setState(state);
		        };
		        this.checkReadyInterval = null;
		        const { checkTimeout = 30 * 1000, dappIcon = '', dappName = '', openUrlWhenWalletNotFound = true, openTronLinkAppOnMobile = true, } = config;
		        if (typeof checkTimeout !== 'number') {
		            throw new Error('[TronLinkAdapter] config.checkTimeout should be a number');
		        }
		        this.config = {
		            checkTimeout,
		            openTronLinkAppOnMobile,
		            openUrlWhenWalletNotFound,
		            dappIcon,
		            dappName,
		        };
		        this._connecting = false;
		        this._wallet = null;
		        this._address = null;
		        if (!(0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		            this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.NotFound;
		            this.setState(tronwallet_abstract_adapter_1.AdapterState.NotFound);
		            return;
		        }
		        if ((0, utils_js_1.supportTron)() || ((0, tronwallet_abstract_adapter_1.isInMobileBrowser)() && (window.tronLink || window.tronWeb))) {
		            this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.Found;
		            this._updateWallet();
		        }
		        else {
		            this._checkWallet().then(() => {
		                if (this.connected) {
		                    this.emit('connect', this.address || '');
		                }
		            });
		        }
		    }
		    get address() {
		        return this._address;
		    }
		    get state() {
		        return this._state;
		    }
		    get readyState() {
		        return this._readyState;
		    }
		    get connecting() {
		        return this._connecting;
		    }
		    /**
		     * Get network information used by TronLink.
		     * @returns {Network} Current network information.
		     */
		    network() {
		        var _a;
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                yield this._checkWallet();
		                if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected)
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                const tronWeb = ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.tronWeb) || window.tronWeb;
		                if (!tronWeb)
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                try {
		                    return yield getNetworkInfoByTronWeb(tronWeb);
		                }
		                catch (e) {
		                    throw new tronwallet_abstract_adapter_1.WalletGetNetworkError(e === null || e === void 0 ? void 0 : e.message, e);
		                }
		            }
		            catch (e) {
		                this.emit('error', e);
		                throw e;
		            }
		        });
		    }
		    connect() {
		        var _a, _b;
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                this.checkIfOpenTronLink();
		                if (this.connected || this.connecting)
		                    return;
		                yield this._checkWallet();
		                if (this.state === tronwallet_abstract_adapter_1.AdapterState.NotFound) {
		                    if (this.config.openUrlWhenWalletNotFound !== false && (0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		                        window.open(this.url, '_blank');
		                    }
		                    throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		                }
		                // lower version only support window.tronWeb, no window.tronLink
		                if (!this._wallet)
		                    return;
		                this._connecting = true;
		                if (this._supportNewTronProtocol) {
		                    const wallet = this._wallet;
		                    try {
		                        const res = yield wallet.request({ method: 'eth_requestAccounts' });
		                        const address = res[0];
		                        this.setAddress(address);
		                        this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                        this._listenTronEvent();
		                        if (!this._wallet.tronWeb) {
		                            yield (0, utils_js_1.waitTronwebReady)(this._wallet);
		                        }
		                    }
		                    catch (error) {
		                        let message = (error === null || error === void 0 ? void 0 : error.message) || error || 'Connect TronLink wallet failed.';
		                        if (error.code === -32002) {
		                            message =
		                                'The same DApp has already initiated a request to connect to TronLink wallet, and the pop-up window has not been closed.';
		                        }
		                        if (error.code === 4001) {
		                            message = 'The user rejected connection.';
		                        }
		                        throw new tronwallet_abstract_adapter_1.WalletConnectionError(message, error);
		                    }
		                }
		                else if (window.tronLink) {
		                    const wallet = this._wallet;
		                    try {
		                        const res = yield wallet.request({ method: 'tron_requestAccounts' });
		                        if (!res) {
		                            // 1. wallet is locked
		                            // 2. tronlink is first installed and there is no wallet account
		                            throw new tronwallet_abstract_adapter_1.WalletConnectionError('TronLink wallet is locked or no wallet account is avaliable.');
		                        }
		                        if (res.code === 4000) {
		                            throw new tronwallet_abstract_adapter_1.WalletConnectionError('The same DApp has already initiated a request to connect to TronLink wallet, and the pop-up window has not been closed.');
		                        }
		                        if (res.code === 4001) {
		                            throw new tronwallet_abstract_adapter_1.WalletConnectionError('The user rejected connection.');
		                        }
		                    }
		                    catch (error) {
		                        throw new tronwallet_abstract_adapter_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
		                    }
		                    const address = ((_a = wallet.tronWeb.defaultAddress) === null || _a === void 0 ? void 0 : _a.base58) || '';
		                    this.setAddress(address);
		                    this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                    this._listenTronLinkEvent();
		                }
		                else if (window.tronWeb) {
		                    const wallet = this._wallet;
		                    const address = ((_b = wallet.tronWeb.defaultAddress) === null || _b === void 0 ? void 0 : _b.base58) || '';
		                    this.setAddress(address);
		                    this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                }
		                else {
		                    throw new tronwallet_abstract_adapter_1.WalletConnectionError('Cannot connect wallet.');
		                }
		                this.connected && this.emit('connect', this.address || '');
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
		            if (this._supportNewTronProtocol) {
		                this._stopListenTronEvent();
		            }
		            else {
		                this._stopListenTronLinkEvent();
		            }
		            if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected) {
		                return;
		            }
		            this.setAddress(null);
		            this.setState(tronwallet_abstract_adapter_1.AdapterState.Disconnect);
		            this.emit('disconnect');
		        });
		    }
		    signTransaction(transaction, privateKey) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                const wallet = yield this.checkAndGetWallet();
		                try {
		                    return yield wallet.tronWeb.trx.sign(transaction, privateKey);
		                }
		                catch (error) {
		                    if (error instanceof Error) {
		                        throw new tronwallet_abstract_adapter_1.WalletSignTransactionError(error.message, error);
		                    }
		                    else {
		                        throw new tronwallet_abstract_adapter_1.WalletSignTransactionError(error, new Error(error));
		                    }
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		    multiSign(...args) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                const wallet = yield this.checkAndGetWallet();
		                try {
		                    return yield wallet.tronWeb.trx.multiSign(...args);
		                }
		                catch (error) {
		                    if (error instanceof Error) {
		                        throw new tronwallet_abstract_adapter_1.WalletSignTransactionError(error.message, error);
		                    }
		                    else {
		                        throw new tronwallet_abstract_adapter_1.WalletSignTransactionError(error, new Error(error));
		                    }
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		    signMessage(message, privateKey) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                const wallet = yield this.checkAndGetWallet();
		                try {
		                    return yield wallet.tronWeb.trx.signMessageV2(message, privateKey);
		                }
		                catch (error) {
		                    if (error instanceof Error) {
		                        throw new tronwallet_abstract_adapter_1.WalletSignMessageError(error.message, error);
		                    }
		                    else {
		                        throw new tronwallet_abstract_adapter_1.WalletSignMessageError(error, new Error(error));
		                    }
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		    /**
		     * Switch to target chain. If current chain is the same as target chain, the call will success immediately.
		     * Available chainIds:
		     * - Mainnet: 0x2b6653dc
		     * - Shasta: 0x94a9059e
		     * - Nile: 0xcd8690dc
		     * @param chainId chainId
		     */
		    switchChain(chainId) {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                yield this._checkWallet();
		                if (this.state === tronwallet_abstract_adapter_1.AdapterState.NotFound) {
		                    if (this.config.openUrlWhenWalletNotFound !== false && (0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		                        window.open(this.url, '_blank');
		                    }
		                    throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		                }
		                if (!this._supportNewTronProtocol) {
		                    throw new tronwallet_abstract_adapter_1.WalletSwitchChainError("Current version of TronLink doesn't support switch chain operation.");
		                }
		                const wallet = this._wallet;
		                try {
		                    yield wallet.request({
		                        method: 'wallet_switchEthereumChain',
		                        params: [{ chainId }],
		                    });
		                }
		                catch (e) {
		                    throw new tronwallet_abstract_adapter_1.WalletSwitchChainError((e === null || e === void 0 ? void 0 : e.message) || e, e instanceof Error ? e : new Error(e));
		                }
		            }
		            catch (error) {
		                this.emit('error', error);
		                throw error;
		            }
		        });
		    }
		    checkAndGetWallet() {
		        return __awaiter(this, void 0, void 0, function* () {
		            this.checkIfOpenTronLink();
		            yield this._checkWallet();
		            if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected)
		                throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		            const wallet = this._wallet;
		            if (!wallet || !wallet.tronWeb)
		                throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		            return wallet;
		        });
		    }
		    _listenTronLinkEvent() {
		        this._stopListenTronLinkEvent();
		        window.addEventListener('message', this._tronLinkMessageHandler);
		    }
		    _stopListenTronLinkEvent() {
		        window.removeEventListener('message', this._tronLinkMessageHandler);
		    }
		    checkIfOpenTronLink() {
		        const { dappName = '', dappIcon = '' } = this.config;
		        if (this.config.openTronLinkAppOnMobile === false) {
		            return;
		        }
		        if ((0, utils_js_1.openTronLink)({ dappIcon, dappName })) {
		            throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		        }
		    }
		    // following code is for TIP-1193
		    _listenTronEvent() {
		        this._stopListenTronEvent();
		        this._stopListenTronLinkEvent();
		        const wallet = this._wallet;
		        wallet.on('chainChanged', this._onChainChanged);
		        wallet.on('accountsChanged', this._onAccountsChanged);
		    }
		    _stopListenTronEvent() {
		        const wallet = this._wallet;
		        wallet.removeListener('chainChanged', this._onChainChanged);
		        wallet.removeListener('accountsChanged', this._onAccountsChanged);
		    }
		    /**
		     * check if wallet exists by interval, the promise only resolve when wallet detected or timeout
		     * @returns if wallet exists
		     */
		    _checkWallet() {
		        if (this.readyState === tronwallet_abstract_adapter_1.WalletReadyState.Found) {
		            return Promise.resolve(true);
		        }
		        if (this._checkPromise) {
		            return this._checkPromise;
		        }
		        const interval = 100;
		        const checkTronTimes = Math.floor(2000 / interval);
		        const maxTimes = Math.floor(this.config.checkTimeout / interval);
		        let times = 0, timer;
		        this._checkPromise = new Promise((resolve) => {
		            const check = () => {
		                times++;
		                const isSupport = times < checkTronTimes && !(0, tronwallet_abstract_adapter_1.isInMobileBrowser)() ? (0, utils_js_1.supportTron)() : (0, utils_js_1.supportTronLink)();
		                if (isSupport || times > maxTimes) {
		                    timer && clearInterval(timer);
		                    this._readyState = isSupport ? tronwallet_abstract_adapter_1.WalletReadyState.Found : tronwallet_abstract_adapter_1.WalletReadyState.NotFound;
		                    this._updateWallet();
		                    this.emit('readyStateChanged', this.readyState);
		                    resolve(isSupport);
		                }
		            };
		            timer = setInterval(check, interval);
		            check();
		        });
		        return this._checkPromise;
		    }
		    checkForWalletReadyForApp() {
		        if (this.checkReadyInterval) {
		            return;
		        }
		        let times = 0;
		        const maxTimes = Math.floor(this.config.checkTimeout / 200);
		        const check = () => {
		            var _a, _b;
		            if (window.tronLink ? (_a = window.tronLink.tronWeb) === null || _a === void 0 ? void 0 : _a.defaultAddress : (_b = window.tronWeb) === null || _b === void 0 ? void 0 : _b.defaultAddress) {
		                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
		                this.checkReadyInterval = null;
		                this._updateWallet();
		                this.emit('connect', this.address || '');
		            }
		            else if (times > maxTimes) {
		                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
		                this.checkReadyInterval = null;
		            }
		            else {
		                times++;
		            }
		        };
		        this.checkReadyInterval = setInterval(check, 200);
		    }
		    setAddress(address) {
		        this._address = address;
		    }
		    setState(state) {
		        const preState = this.state;
		        if (state !== preState) {
		            this._state = state;
		            this.emit('stateChanged', state);
		        }
		    }
		}
		exports.TronLinkAdapter = TronLinkAdapter;
		
	} (adapter$1));

	var types = {};

	Object.defineProperty(types, "__esModule", { value: true });

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
		__exportStar(types, exports);
		__exportStar(utils, exports);
		
	} (cjs$1));

	var index = /*@__PURE__*/getDefaultExportFromCjs(cjs$1);

	return index;

}));
