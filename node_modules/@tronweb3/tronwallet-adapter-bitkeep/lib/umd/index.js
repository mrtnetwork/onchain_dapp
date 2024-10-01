(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@tronweb3/tronwallet-adapter-bitkeep"] = factory());
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

	var cjs$2 = {};

	var adapter$2 = {};

	var cjs$1 = {};

	var adapter$1 = {};

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
		
	} (adapter$1));

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

	var utils$2 = {};

	Object.defineProperty(utils$2, "__esModule", { value: true });
	utils$2.isInMobileBrowser = utils$2.checkAdapterState = utils$2.isInBrowser = void 0;
	/**
	 * check simply if current environment is browser or not
	 * @returns boolean
	 */
	function isInBrowser() {
	    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';
	}
	utils$2.isInBrowser = isInBrowser;
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
	utils$2.checkAdapterState = checkAdapterState;
	/**
	 * Simplily detect mobile device
	 */
	function isInMobileBrowser() {
	    return (typeof navigator !== 'undefined' &&
	        navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i));
	}
	utils$2.isInMobileBrowser = isInMobileBrowser;

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
		__exportStar(errors, exports);
		__exportStar(types$1, exports);
		__exportStar(utils$2, exports);
		
	} (cjs$1));

	var cjs = {};

	var adapter = {};

	var utils$1 = {};

	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(utils$1, "__esModule", { value: true });
	utils$1.waitTronwebReady = utils$1.openTronLink = utils$1.isInTronLinkApp = utils$1.supportTronLink = utils$1.supportTron = void 0;
	const tronwallet_abstract_adapter_1$1 = cjs$1;
	function supportTron() {
	    return !!(window.tron && window.tron.isTronLink);
	}
	utils$1.supportTron = supportTron;
	function supportTronLink() {
	    return !!(supportTron() || window.tronLink || window.tronWeb);
	}
	utils$1.supportTronLink = supportTronLink;
	/**
	 * Detect if in TronLinkApp
	 * Tron DApp running in the DApp Explorer injects iTron objects automatically to offer customized App service.
	 * See [here](https://docs.tronlink.org/tronlink-app/dapp-support/dapp-explorer)
	 */
	function isInTronLinkApp() {
	    return (0, tronwallet_abstract_adapter_1$1.isInBrowser)() && typeof window.iTron !== 'undefined';
	}
	utils$1.isInTronLinkApp = isInTronLinkApp;
	function openTronLink({ dappIcon, dappName } = { dappIcon: '', dappName: '' }) {
	    if (!supportTronLink() && (0, tronwallet_abstract_adapter_1$1.isInMobileBrowser)() && !isInTronLinkApp()) {
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
	utils$1.openTronLink = openTronLink;
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
	utils$1.waitTronwebReady = waitTronwebReady;

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
		const tronwallet_abstract_adapter_1 = cjs$1;
		const utils_js_1 = utils$1;
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
		
	} (adapter));

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
		__exportStar(adapter, exports);
		__exportStar(types, exports);
		__exportStar(utils$1, exports);
		
	} (cjs));

	var ee=Object.create;var L=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ie=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var ne=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),le=(e,t)=>{for(var r in t)L(e,r,{get:t[r],enumerable:!0});},se=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of re(t))!oe.call(e,n)&&n!==r&&L(e,n,{get:()=>t[n],enumerable:!(i=te(t,n))||i.enumerable});return e};var ae=(e,t,r)=>(r=e!=null?ee(ie(e)):{},se(t||!e||!e.__esModule?L(r,"default",{value:e,enumerable:!0}):r,e));var Q=ne((st,z)=>{var we=Object.prototype.hasOwnProperty,c="~";function v(){}Object.create&&(v.prototype=Object.create(null),new v().__proto__||(c=!1));function be(e,t,r){this.fn=e,this.context=t,this.once=r||!1;}function U(e,t,r,i,n){if(typeof r!="function")throw new TypeError("The listener must be a function");var a=new be(r,i||e,n),l=c?c+t:t;return e._events[l]?e._events[l].fn?e._events[l]=[e._events[l],a]:e._events[l].push(a):(e._events[l]=a,e._eventsCount++),e}function A(e,t){--e._eventsCount===0?e._events=new v:delete e._events[t];}function d(){this._events=new v,this._eventsCount=0;}d.prototype.eventNames=function(){var t=[],r,i;if(this._eventsCount===0)return t;for(i in r=this._events)we.call(r,i)&&t.push(c?i.slice(1):i);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(r)):t};d.prototype.listeners=function(t){var r=c?c+t:t,i=this._events[r];if(!i)return [];if(i.fn)return [i.fn];for(var n=0,a=i.length,l=new Array(a);n<a;n++)l[n]=i[n].fn;return l};d.prototype.listenerCount=function(t){var r=c?c+t:t,i=this._events[r];return i?i.fn?1:i.length:0};d.prototype.emit=function(t,r,i,n,a,l){var p=c?c+t:t;if(!this._events[p])return !1;var o=this._events[p],f=arguments.length,y,s;if(o.fn){switch(o.once&&this.removeListener(t,o.fn,void 0,!0),f){case 1:return o.fn.call(o.context),!0;case 2:return o.fn.call(o.context,r),!0;case 3:return o.fn.call(o.context,r,i),!0;case 4:return o.fn.call(o.context,r,i,n),!0;case 5:return o.fn.call(o.context,r,i,n,a),!0;case 6:return o.fn.call(o.context,r,i,n,a,l),!0}for(s=1,y=new Array(f-1);s<f;s++)y[s-1]=arguments[s];o.fn.apply(o.context,y);}else {var $=o.length,w;for(s=0;s<$;s++)switch(o[s].once&&this.removeListener(t,o[s].fn,void 0,!0),f){case 1:o[s].fn.call(o[s].context);break;case 2:o[s].fn.call(o[s].context,r);break;case 3:o[s].fn.call(o[s].context,r,i);break;case 4:o[s].fn.call(o[s].context,r,i,n);break;default:if(!y)for(w=1,y=new Array(f-1);w<f;w++)y[w-1]=arguments[w];o[s].fn.apply(o[s].context,y);}}return !0};d.prototype.on=function(t,r,i){return U(this,t,r,i,!1)};d.prototype.once=function(t,r,i){return U(this,t,r,i,!0)};d.prototype.removeListener=function(t,r,i,n){var a=c?c+t:t;if(!this._events[a])return this;if(!r)return A(this,a),this;var l=this._events[a];if(l.fn)l.fn===r&&(!n||l.once)&&(!i||l.context===i)&&A(this,a);else {for(var p=0,o=[],f=l.length;p<f;p++)(l[p].fn!==r||n&&!l[p].once||i&&l[p].context!==i)&&o.push(l[p]);o.length?this._events[a]=o.length===1?o[0]:o:A(this,a);}return this};d.prototype.removeAllListeners=function(t){var r;return t?(r=c?c+t:t,this._events[r]&&A(this,r)):(this._events=new v,this._eventsCount=0),this};d.prototype.off=d.prototype.removeListener;d.prototype.addListener=d.prototype.on;d.prefixed=c;d.EventEmitter=d;typeof z!="undefined"&&(z.exports=d);});var E={};le(E,{InitProviderEventNames:()=>R,SupportProviderFlag:()=>x,currentProvider:()=>ye,detectBitkeepProvider:()=>Ie,findFlagAdapter:()=>he,getWaleltProvider:()=>h,getWalletProvierInitEventsName:()=>X,isApp:()=>j,isBGMoblie:()=>F,isDocumentComplete:()=>B,isMobile:()=>N,isPC:()=>xe});var b='Please Install <a href="https://web3.bitget.com/wallet-download">Bitget Wallet</a> to use this wallet',G=[{code:4004,standard:"",message:b},{code:4001,standard:"EIP-1193",message:"User rejected the request."},{code:4100,standard:"EIP-1193",message:"The requested account and/or method has not been authorized by the user."},{code:4200,standard:"EIP-1193",message:"The requested method is not supported by this Ethereum provider."},{code:4900,standard:"EIP-1193",message:"The provider is disconnected from all chains."},{code:4901,standard:"EIP-1193",message:"The provider is disconnected from the specified chain."},{code:-32700,standard:"JSON RPC 2.0",message:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."},{code:-32600,standard:"JSON RPC 2.0",message:"The JSON sent is not a valid Request object."},{code:-32602,standard:"JSON RPC 2.0",message:"Invalid method parameter(s)."},{code:-32603,standard:"JSON RPC 2.0",message:"Internal JSON-RPC error."},{code:-32e3,standard:"EIP-1474",message:"Invalid input."},{code:-32001,standard:"EIP-1474",message:"Resource not found."},{code:-32002,standard:"EIP-1474",message:"Resource unavailable."},{code:-32003,standard:"EIP-1474",message:"Transaction rejected."},{code:-32004,standard:"EIP-1474",message:"Method not supported."},{code:-32005,standard:"EIP-1474",message:"Request limit exceeded."}],De=e=>{var t;try{return (t=G.filter(i=>i.code==e)[0])==null?void 0:t.message}catch{return b}},Ae=e=>{try{return G.filter(r=>r.code==e)[0]}catch{return G.filter(i=>i.code==4004)[0]}};var M="0.0.8";var C="data:image/png;base64,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";var S="data:image/png;base64,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";var W=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2035_1077)">
<rect width="28" height="28" fill="#54FFF5"/>
<g filter="url(#filter0_f_2035_1077)">
<path d="M1.4745 21.7215C-3.20763 34.8943 21.838 31.1738 34.9461 27.667C48.3618 23.2148 39.0892 3.58946 29.4673 3.15512C19.8454 2.72078 30.6603 12.2298 22.487 14.9457C14.3138 17.6617 7.32718 5.2554 1.4745 21.7215Z" fill="white"/>
</g>
<g filter="url(#filter1_f_2035_1077)">
<path d="M9.35304 -5.01224C6.89695 -11.7228 -1.85032 -2.62489 -5.91695 2.76289C-9.79601 8.62359 0.329333 13.6881 4.3009 10.9412C8.27247 8.19428 0.850517 7.65982 3.21262 4.08788C5.57471 0.515936 12.4231 3.37596 9.35304 -5.01224Z" fill="#00FFF0" fill-opacity="0.67"/>
</g>
<g filter="url(#filter2_f_2035_1077)">
<path d="M10.5526 24.6538C7.20255 13.3816 -7.22752 19.3178 -14.0238 23.6949C-20.5612 28.8777 -5.03885 43.7862 1.4081 43.0236C7.85506 42.2609 -3.76361 35.7709 0.217505 32.6105C4.19862 29.4501 14.7402 38.7441 10.5526 24.6538Z" fill="#9D81FF"/>
</g>
<g filter="url(#filter3_f_2035_1077)">
<path d="M30.8569 -11.7432C23.6302 -20.3486 13.285 -13.2326 9.0158 -8.59889C5.28001 -3.35325 24.5301 6.25816 29.8727 4.611C35.2153 2.96383 22.5873 -0.444505 24.8607 -3.64236C27.1341 -6.84022 39.8904 -0.986489 30.8569 -11.7432Z" fill="#4D94FF"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.1926 16.7164H14.9487L9.53847 11.2712L15.0183 5.826L16.5107 4.375H11.574L5.28676 10.6944C4.96947 11.0129 4.9711 11.5283 5.29001 11.8452L10.1926 16.7164ZM13.0517 11.284H13.0151L13.0513 11.2836L13.0517 11.284ZM13.0517 11.284L18.4616 16.7288L12.9818 22.174L11.4893 23.625H16.426L22.7133 17.306C23.0305 16.9875 23.0289 16.4721 22.71 16.1552L17.8074 11.284H13.0517Z" fill="black"/>
</g>
<defs>
<filter id="filter0_f_2035_1077" x="-9.87006" y="-7.62861" width="62.2955" height="49.3764" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5.38462" result="effect1_foregroundBlur_2035_1077"/>
</filter>
<filter id="filter1_f_2035_1077" x="-17.5556" y="-18.1559" width="38.4557" height="40.6342" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5.38462" result="effect1_foregroundBlur_2035_1077"/>
</filter>
<filter id="filter2_f_2035_1077" x="-26.3676" y="7.39678" width="48.6556" height="46.4252" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5.38462" result="effect1_foregroundBlur_2035_1077"/>
</filter>
<filter id="filter3_f_2035_1077" x="-2.2309" y="-26.5524" width="47.0521" height="42.1205" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5.38462" result="effect1_foregroundBlur_2035_1077"/>
</filter>
<clipPath id="clip0_2035_1077">
<rect width="28" height="28" fill="white"/>
</clipPath>
</defs>
</svg>
`;var O=`<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2035_1106)">
<rect width="256" height="256" fill="#54FFF5"/>
<g filter="url(#filter0_f_2035_1106)">
<path d="M13.4806 198.605C-29.3276 319.043 199.661 285.027 319.507 252.964C442.165 212.259 357.386 32.8269 269.415 28.8558C181.443 24.8847 280.322 111.824 205.595 136.656C130.868 161.487 66.9907 48.0583 13.4806 198.605Z" fill="white"/>
</g>
<g filter="url(#filter1_f_2035_1106)">
<path d="M85.5118 -45.8225C63.0562 -107.176 -16.9189 -23.9953 -54.0995 25.2643C-89.5652 78.8479 3.00937 125.152 39.3208 100.037C75.6323 74.9227 7.77448 70.0363 29.3708 37.3785C50.9671 4.72076 113.581 30.8695 85.5118 -45.8225Z" fill="#00FFF0" fill-opacity="0.67"/>
</g>
<g filter="url(#filter2_f_2035_1106)">
<path d="M96.4796 225.424C65.8502 122.363 -66.0818 176.637 -128.219 216.657C-187.99 264.042 -46.0711 400.348 12.8725 393.376C71.8161 386.403 -34.4118 327.065 1.98702 298.17C38.3858 269.276 134.766 354.249 96.4796 225.424Z" fill="#9D81FF"/>
</g>
<g filter="url(#filter3_f_2035_1106)">
<path d="M282.12 -107.353C216.047 -186.031 121.463 -120.97 82.4296 -78.6047C48.2739 -30.6446 224.275 57.2312 273.121 42.1714C321.968 27.1115 206.512 -4.05038 227.297 -33.2879C248.082 -62.5255 364.712 -9.00566 282.12 -107.353Z" fill="#4D94FF"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M93.189 152.836H136.674L87.2086 103.051L137.31 53.2663L150.955 40H105.819L48.3359 97.7773C45.4349 100.689 45.4498 105.402 48.3656 108.299L93.189 152.836ZM119.33 103.168H118.995L119.326 103.164L119.33 103.168ZM119.33 103.168L168.791 152.949L118.69 202.734L105.045 216H150.18L207.664 158.226C210.565 155.314 210.55 150.602 207.634 147.705L162.811 103.168H119.33Z" fill="black"/>
</g>
<defs>
<filter id="filter0_f_2035_1106" x="-90.2411" y="-69.7369" width="569.558" height="451.431" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="49.2308" result="effect1_foregroundBlur_2035_1106"/>
</filter>
<filter id="filter1_f_2035_1106" x="-160.511" y="-165.987" width="351.596" height="371.507" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="49.2308" result="effect1_foregroundBlur_2035_1106"/>
</filter>
<filter id="filter2_f_2035_1106" x="-241.078" y="67.642" width="444.851" height="424.452" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="49.2308" result="effect1_foregroundBlur_2035_1106"/>
</filter>
<filter id="filter3_f_2035_1106" x="-20.3968" y="-242.758" width="430.191" height="385.105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="49.2308" result="effect1_foregroundBlur_2035_1106"/>
</filter>
<clipPath id="clip0_2035_1106">
<rect width="256" height="256" fill="white"/>
</clipPath>
</defs>
</svg>
`;var D=(e="square")=>"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' fill='none'%3e%3cg clip-path='url(%23a)'%3e%3crect width='256' height='256' fill='%2354FFF5' rx='20'/%3e%3cg filter='url(%23b)'%3e%3cpath fill='white' d='M13.48 198.605c-42.807 120.438 186.182 86.422 306.027 54.359 122.658-40.705 37.879-220.137-50.092-224.108-87.972-3.971 10.907 82.968-63.82 107.8-74.727 24.831-138.604-88.598-192.114 61.949Z'/%3e%3c/g%3e%3cg filter='url(%23c)'%3e%3cpath fill='%2300FFF0' fill-opacity='.67' d='M85.512-45.822C63.056-107.177-16.918-23.995-54.1 25.264c-35.465 53.584 57.11 99.888 93.42 74.773 36.312-25.114-31.546-30-9.95-62.659 21.597-32.657 84.211-6.509 56.142-83.2Z'/%3e%3c/g%3e%3cg filter='url(%23d)'%3e%3cpath fill='%239D81FF' d='M96.48 225.424c-30.63-103.061-162.562-48.787-224.699-8.767-59.771 47.385 82.148 183.691 141.092 176.719 58.943-6.973-47.285-66.311-10.886-95.206 36.399-28.894 132.779 56.079 94.493-72.746Z'/%3e%3c/g%3e%3cg filter='url(%23e)'%3e%3cpath fill='%234D94FF' d='M282.12-107.353c-66.073-78.678-160.657-13.617-199.69 28.748C48.274-30.645 224.275 57.231 273.12 42.171c48.847-15.06-66.609-46.221-45.824-75.459 20.785-29.238 137.415 24.282 54.823-74.065Z'/%3e%3c/g%3e%3cpath fill='black' fill-rule='evenodd' d='M93.19 152.836h43.484l-49.465-49.785 50.101-49.785L150.955 40h-45.136L48.336 97.777a7.435 7.435 0 0 0 .03 10.522l44.823 44.537Zm26.14-49.668h-.335l.331-.004.004.004Zm0 0 49.461 49.781-50.101 49.785L105.045 216h45.136l57.483-57.774a7.434 7.434 0 0 0-.03-10.521l-44.823-44.537H119.33Z' clip-rule='evenodd'/%3e%3c/g%3e%3cdefs%3e%3cfilter id='b' width='569.558' height='451.431' x='-90.241' y='-69.737' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeGaussianBlur result='effect1_foregroundBlur_1899_48' stdDeviation='49.231'/%3e%3c/filter%3e%3cfilter id='c' width='351.596' height='371.507' x='-160.511' y='-165.987' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeGaussianBlur result='effect1_foregroundBlur_1899_48' stdDeviation='49.231'/%3e%3c/filter%3e%3cfilter id='d' width='444.851' height='424.452' x='-241.077' y='67.642' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeGaussianBlur result='effect1_foregroundBlur_1899_48' stdDeviation='49.231'/%3e%3c/filter%3e%3cfilter id='e' width='430.191' height='385.105' x='-20.397' y='-242.758' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3e%3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e%3cfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e%3cfeGaussianBlur result='effect1_foregroundBlur_1899_48' stdDeviation='49.231'/%3e%3c/filter%3e%3cclipPath id='a'%3e%3crect width='256' height='256' fill='white' rx='20'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",V="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8yMDM1XzExMDYpIj4KPHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiM1NEZGRjUiLz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZl8yMDM1XzExMDYpIj4KPHBhdGggZD0iTTEzLjQ4MDYgMTk4LjYwNUMtMjkuMzI3NiAzMTkuMDQzIDE5OS42NjEgMjg1LjAyNyAzMTkuNTA3IDI1Mi45NjRDNDQyLjE2NSAyMTIuMjU5IDM1Ny4zODYgMzIuODI2OSAyNjkuNDE1IDI4Ljg1NThDMTgxLjQ0MyAyNC44ODQ3IDI4MC4zMjIgMTExLjgyNCAyMDUuNTk1IDEzNi42NTZDMTMwLjg2OCAxNjEuNDg3IDY2Ljk5MDcgNDguMDU4MyAxMy40ODA2IDE5OC42MDVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2ZfMjAzNV8xMTA2KSI+CjxwYXRoIGQ9Ik04NS41MTE4IC00NS44MjI1QzYzLjA1NjIgLTEwNy4xNzYgLTE2LjkxODkgLTIzLjk5NTMgLTU0LjA5OTUgMjUuMjY0M0MtODkuNTY1MiA3OC44NDc5IDMuMDA5MzcgMTI1LjE1MiAzOS4zMjA4IDEwMC4wMzdDNzUuNjMyMyA3NC45MjI3IDcuNzc0NDggNzAuMDM2MyAyOS4zNzA4IDM3LjM3ODVDNTAuOTY3MSA0LjcyMDc2IDExMy41ODEgMzAuODY5NSA4NS41MTE4IC00NS44MjI1WiIgZmlsbD0iIzAwRkZGMCIgZmlsbC1vcGFjaXR5PSIwLjY3Ii8+CjwvZz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjJfZl8yMDM1XzExMDYpIj4KPHBhdGggZD0iTTk2LjQ3OTYgMjI1LjQyNEM2NS44NTAyIDEyMi4zNjMgLTY2LjA4MTggMTc2LjYzNyAtMTI4LjIxOSAyMTYuNjU3Qy0xODcuOTkgMjY0LjA0MiAtNDYuMDcxMSA0MDAuMzQ4IDEyLjg3MjUgMzkzLjM3NkM3MS44MTYxIDM4Ni40MDMgLTM0LjQxMTggMzI3LjA2NSAxLjk4NzAyIDI5OC4xN0MzOC4zODU4IDI2OS4yNzYgMTM0Ljc2NiAzNTQuMjQ5IDk2LjQ3OTYgMjI1LjQyNFoiIGZpbGw9IiM5RDgxRkYiLz4KPC9nPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyM19mXzIwMzVfMTEwNikiPgo8cGF0aCBkPSJNMjgyLjEyIC0xMDcuMzUzQzIxNi4wNDcgLTE4Ni4wMzEgMTIxLjQ2MyAtMTIwLjk3IDgyLjQyOTYgLTc4LjYwNDdDNDguMjczOSAtMzAuNjQ0NiAyMjQuMjc1IDU3LjIzMTIgMjczLjEyMSA0Mi4xNzE0QzMyMS45NjggMjcuMTExNSAyMDYuNTEyIC00LjA1MDM4IDIyNy4yOTcgLTMzLjI4NzlDMjQ4LjA4MiAtNjIuNTI1NSAzNjQuNzEyIC05LjAwNTY2IDI4Mi4xMiAtMTA3LjM1M1oiIGZpbGw9IiM0RDk0RkYiLz4KPC9nPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTkzLjE4OSAxNTIuODM2SDEzNi42NzRMODcuMjA4NiAxMDMuMDUxTDEzNy4zMSA1My4yNjYzTDE1MC45NTUgNDBIMTA1LjgxOUw0OC4zMzU5IDk3Ljc3NzNDNDUuNDM0OSAxMDAuNjg5IDQ1LjQ0OTggMTA1LjQwMiA0OC4zNjU2IDEwOC4yOTlMOTMuMTg5IDE1Mi44MzZaTTExOS4zMyAxMDMuMTY4SDExOC45OTVMMTE5LjMyNiAxMDMuMTY0TDExOS4zMyAxMDMuMTY4Wk0xMTkuMzMgMTAzLjE2OEwxNjguNzkxIDE1Mi45NDlMMTE4LjY5IDIwMi43MzRMMTA1LjA0NSAyMTZIMTUwLjE4TDIwNy42NjQgMTU4LjIyNkMyMTAuNTY1IDE1NS4zMTQgMjEwLjU1IDE1MC42MDIgMjA3LjYzNCAxNDcuNzA1TDE2Mi44MTEgMTAzLjE2OEgxMTkuMzNaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2ZfMjAzNV8xMTA2IiB4PSItOTAuMjQxMSIgeT0iLTY5LjczNjkiIHdpZHRoPSI1NjkuNTU4IiBoZWlnaHQ9IjQ1MS40MzEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNDkuMjMwOCIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzIwMzVfMTEwNiIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9mXzIwMzVfMTEwNiIgeD0iLTE2MC41MTEiIHk9Ii0xNjUuOTg3IiB3aWR0aD0iMzUxLjU5NiIgaGVpZ2h0PSIzNzEuNTA3IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQ5LjIzMDgiIHJlc3VsdD0iZWZmZWN0MV9mb3JlZ3JvdW5kQmx1cl8yMDM1XzExMDYiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjJfZl8yMDM1XzExMDYiIHg9Ii0yNDEuMDc4IiB5PSI2Ny42NDIiIHdpZHRoPSI0NDQuODUxIiBoZWlnaHQ9IjQyNC40NTIiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNDkuMjMwOCIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzIwMzVfMTEwNiIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyM19mXzIwMzVfMTEwNiIgeD0iLTIwLjM5NjgiIHk9Ii0yNDIuNzU4IiB3aWR0aD0iNDMwLjE5MSIgaGVpZ2h0PSIzODUuMTA1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQ5LjIzMDgiIHJlc3VsdD0iZWZmZWN0MV9mb3JlZ3JvdW5kQmx1cl8yMDM1XzExMDYiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMjAzNV8xMTA2Ij4KPHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";var g=e=>{let t=e?u(e):"en";return {website:`https://web3.bitget.com/${t}/wallet-download`,android:`https://web3.bitget.com/${t}/wallet-download?type=0`,ios:"https://apps.apple.com/app/bitkeep/id1395301115",chrome:`https://web3.bitget.com/${t}/wallet-download?type=2`,googlePlay:"https://play.google.com/store/apps/details?id=com.bitkeep.wallet",appleStore:"https://apps.apple.com/app/bitkeep/id1395301115",testflight:"https://testflight.apple.com/join/gMNlVK4J",browserExtension:{chrome:"https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",edge:"https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak"}}},fe=e=>`https://web3.bitget.com/${(e?u(e):"en").substr(0,2)}/academy`,me=e=>`https://web3.bitget.com/${(e?u(e):"en").substr(0,2)}/blog`,m={id:"bitgetWallet",version:M,name:"Bitget Wallet",homepage:"https://web3.bitget.com",shortName:"Bitget Wallet",description:"Your Web3 Crypto Wallet for effortless trading. One of the top non-custodial multi-chain crypto wallet, integrates Wallet, Swap, NFT Market, DApp and Discover in a single location, allowing users to enter the era of Web 3.0 with ease.",tags:["wallet","Defi","NFT","digital_id","infrastructure"],downloadLinks:g(),socialMedia:{website:g().website,github:"https://github.com/bitkeepwallet",twitter:"https://twitter.com/BitgetWallet",twitters:{EN:"https://twitter.com/BitgetWallet",CN:"https://twitter.com/BitgetWalletCN",Daily:"https://twitter.com/BGWalletDaily"},medium:"https://bitgetwalletblog.medium.com/",discord:"https://discord.gg/qjH6YGDYgh",telegram:"https://t.me/Bitget_Wallet",telegrams:{EN:"https://t.me/Bitget_Wallet",CN:"https://t.me/Bitget_Wallet_CN"},facebook:"https://www.facebook.com/BitgetWallet",instagram:"https://instagram.com/bitgetwallet_global",youTube:"https://www.youtube.com/@BitgetWallet",linkedIn:"https://www.linkedin.com/company/bitgetwallet/"},logolist:{base64:V,png:{28:C,256:S},svg:{28:W,256:O}},academy:fe(),blog:me(),deepLinks:{scheme:"bitkeep://",universallink:"https://bkapp.vip"}},Y={version:M,name:"@bitget-wallet/web3-sdk",language:["en","zh-CN","zh-TW","tr","vi","id"],description:""},Ce=()=>M,Se=()=>Y.description||"",u=e=>Y.language.includes(e)?e:"en",J=()=>m.deepLinks,H=e=>{let t=e?u(e):"en";return g(t).website},We=e=>{let t=e?u(e):"en";return g(t).android},Oe=e=>{let t=e?u(e):"en";return g(t).ios},Ve=e=>{let t=e?u(e):"en";return g(t).googlePlay},Ye=e=>{let t=e?u(e):"en";return g(t).chrome},Je=e=>{let t=e?u(e):"en";return g(t).appleStore},He=e=>{let t=e?u(e):"en";return g(t).browserExtension},Re=e=>{let t=e?u(e):"en";return g(t).browserExtension.chrome},Xe=e=>{let t=e?u(e):"en";return g(t).browserExtension.edge},Ue=()=>(window==null?void 0:window.ethereum)&&(window==null?void 0:window.isBitKeep)&&(window==null?void 0:window.bitkeep);var x=(i=>(i.EVM="eip1193",i.TRON="tronLink",i.SOLANA="solana",i))(x||{}),R={eip1193:"ethereum#initialized",tronLink:"tronLink#initialized",solana:""},X=e=>R[e],h=e=>{var r,i;let t=null;switch(e){case"eip1193":t=(r=window==null?void 0:window.bitkeep)==null?void 0:r.ethereum;break;case"tronLink":t=window!=null&&window.bitkeep?{tronLink:window==null?void 0:window.bitkeep.tronLink,tronWeb:window==null?void 0:window.bitkeep.tronWeb}:null;break;case"solana":t=(i=window==null?void 0:window.bitkeep)==null?void 0:i.solana;break;}return t},he=(e,t)=>{let r=t.find(i=>i.providerFlag==e);if(!r)throw "no wallet flag detected!!";return r},ye=()=>{var t;let e=H();try{if(window!=null&&window.bitkeep)return (t=window==null?void 0:window.bitkeep)==null?void 0:t.ethereum;throw window.open(e,"_blank"),new Error(b)}catch{throw window.open(e,"_blank"),new Error(b)}};function Ie({timeout:e=1e3,flag:t="eip1193"}={}){a();let r=F(),i=!1,n=X(t);return new Promise(async l=>{window.bitkeep?p():(await B(),window.bitkeep&&p(),n&&r&&window.addEventListener(n,p.bind(null,{type:"event",eventName:n}),{once:!0}),setTimeout(()=>{p();},e));function p(o){if(i)return;n&&r&&window.removeEventListener(n,p),i=!0;let{bitkeep:f}=window;if(f){let y=t?h(t):f;l(y);}else l(null);}});function a(){if(typeof e!="number")throw new Error("@@bitget-wallet/web3-sdk/detect-provider: Expected option 'timeout' to be a number.")}}function N(){var e;return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)}function j(){var e;return /BitKeep/i.test((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)}function xe(){return !j()&&!N()}function F(){return j()&&N()}var B=function(){let e=!1;return new Promise(t=>{if(document.readyState==="complete"){if(e)return;e=!0,t(!0);}else window.onload=function(){e||(e=!0,t(!0));};})};var K=ae(Q(),1);var q=K.default;var _=class{constructor({debug:t=!1,preferredOpenLink:r,useDeeplink:i=!1}){this.debug=!1;this.useDeeplink=!1;this.debug=t,this.useDeeplink=i,this.preferredOpenLink=r;}getLogo(t="square"){return D(t)}getWalletInfo(){return {logo:this.getLogo(),...m}}getDownloadLinks(){return m.downloadLinks}getDeepLinks(){return m.deepLinks}};var I=class extends q{constructor(r={providerFlag:"eip1193",isBitkeep:!0,debug:!1}){super();this.id=m.id;this.name=m.name;this.version=m.version;this.providerFlag=r.providerFlag,this.isBitkeep=r.isBitkeep,this.platformManager=new _({});}getProvider(){return h(this.providerFlag)}async getBKWalletInfo(){var r,i;return window!=null&&window.selectedAccount?{id:(r=window==null?void 0:window.selectedAccount)==null?void 0:r.id,name:(i=window==null?void 0:window.selectedAccount)==null?void 0:i.name}:null}getDeepLinks(){return J()}getLogo(r="square"){return D(r)}getLogos(){return m.logolist}getWalletInfo(){return m}getDownloadLinks(){return g()}};var k=class extends I{constructor(t={isBitkeep:!0,debug:!1}){super({providerFlag:"eip1193",isBitkeep:t.isBitkeep,debug:t.debug});}getProvider(){return h(this.providerFlag)}};var ve=k;var P=class extends I{constructor(t={isBitkeep:!0}){super({providerFlag:"tronLink",isBitkeep:t.isBitkeep,debug:t.debug});}getProvider(){return h(this.providerFlag)}};var Z=class extends I{constructor(t={isBitkeep:!0,debug:!1}){super({providerFlag:"solana",isBitkeep:t.isBitkeep,debug:t.debug});}getProvider(){return h(this.providerFlag)}};var Vt=E;

	var index_es = /*#__PURE__*/Object.freeze({
		__proto__: null,
		EIP1193Adapter: k,
		InitProviderEventNames: R,
		LegacyEip1193Adapter: ve,
		SDKInfo: Y,
		SolanaAdapter: Z,
		SupportProviderFlag: x,
		TronLinkAdapter: P,
		WalletInfo: m,
		currentProvider: ye,
		default: Vt,
		detectBitkeepProvider: Ie,
		errorCode: G,
		errorCodeMessage: De,
		errorCodeobject: Ae,
		findFlagAdapter: he,
		getAcademy: fe,
		getAndroidDownload: We,
		getAppStoreDownload: Je,
		getBlog: me,
		getBrowserExtension: He,
		getChromeDownload: Ye,
		getChromeExtension: Re,
		getDeepLinks: J,
		getDownload: H,
		getDownloadLinks: g,
		getEdgeExtension: Xe,
		getGooglePlayDownload: Ve,
		getIosDownload: Oe,
		getIsInstall: Ue,
		getSDKDescription: Se,
		getSDKVersion: Ce,
		getWaleltProvider: h,
		getWalletProvierInitEventsName: X,
		installWalletMessage: b
	});

	var require$$2 = /*@__PURE__*/getAugmentedNamespace(index_es);

	var utils = {};

	Object.defineProperty(utils, "__esModule", { value: true });
	utils.openBitgetWallet = utils.supportBitgetWallet = void 0;
	const tronwallet_abstract_adapter_1 = cjs$1;
	function supportBitgetWallet() {
	    return !!window.tronLink && window.isBitKeep;
	}
	utils.supportBitgetWallet = supportBitgetWallet;
	function openBitgetWallet() {
	    if ((0, tronwallet_abstract_adapter_1.isInMobileBrowser)() && !supportBitgetWallet()) {
	        const { origin, pathname, search, hash } = window.location;
	        const url = origin + pathname + search + hash;
	        location.href = `https://bkcode.vip?action=dapp&url=${encodeURIComponent(url)}`;
	        return true;
	    }
	    return false;
	}
	utils.openBitgetWallet = openBitgetWallet;

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
		exports.BitKeepAdapter = exports.BitgetWalletAdapterName = void 0;
		const tronwallet_abstract_adapter_1 = cjs$1;
		const tronwallet_adapter_tronlink_1 = cjs;
		const web3_sdk_1 = require$$2;
		const utils_js_1 = utils;
		exports.BitgetWalletAdapterName = web3_sdk_1.WalletInfo === null || web3_sdk_1.WalletInfo === void 0 ? void 0 : web3_sdk_1.WalletInfo.name;
		class BitKeepAdapter extends tronwallet_abstract_adapter_1.Adapter {
		    constructor(config = {}) {
		        var _a;
		        super();
		        this.name = exports.BitgetWalletAdapterName;
		        this.url = web3_sdk_1.WalletInfo === null || web3_sdk_1.WalletInfo === void 0 ? void 0 : web3_sdk_1.WalletInfo.homepage;
		        this.icon = (_a = web3_sdk_1.WalletInfo === null || web3_sdk_1.WalletInfo === void 0 ? void 0 : web3_sdk_1.WalletInfo.logolist) === null || _a === void 0 ? void 0 : _a.base64;
		        this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.Loading;
		        this._state = tronwallet_abstract_adapter_1.AdapterState.Loading;
		        this.checkReadyInterval = null;
		        this._checkPromise = null;
		        this._updateWallet = () => __awaiter(this, void 0, void 0, function* () {
		            var _b, _c;
		            let state = this.state;
		            let address = this.address;
		            if ((0, utils_js_1.supportBitgetWallet)()) {
		                const adapter = new web3_sdk_1.TronLinkAdapter();
		                this._wallet =
		                    (yield (adapter === null || adapter === void 0 ? void 0 : adapter.getProvider().tronLink)) ||
		                        ((_b = window.bitkeep) === null || _b === void 0 ? void 0 : _b.tronLink);
		                address = ((_c = this._wallet.tronWeb.defaultAddress) === null || _c === void 0 ? void 0 : _c.base58) || null;
		                state = this._wallet.ready ? tronwallet_abstract_adapter_1.AdapterState.Connected : tronwallet_abstract_adapter_1.AdapterState.Disconnect;
		                if (!this._wallet.ready) {
		                    this.checkForWalletReady();
		                }
		            }
		            else {
		                this._wallet = null;
		                address = null;
		                state = tronwallet_abstract_adapter_1.AdapterState.NotFound;
		            }
		            this.setAddress(address);
		            this.setState(state);
		        });
		        const { checkTimeout = 2 * 1000, openUrlWhenWalletNotFound = true, openAppWithDeeplink = true } = config;
		        if (typeof checkTimeout !== 'number') {
		            throw new Error('[BitKeepAdapter] config.checkTimeout should be a number');
		        }
		        this.config = {
		            checkTimeout,
		            openUrlWhenWalletNotFound,
		            openAppWithDeeplink,
		        };
		        this._connecting = false;
		        this._wallet = null;
		        this._address = null;
		        if (!(0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		            this._readyState = tronwallet_abstract_adapter_1.WalletReadyState.NotFound;
		            this.setState(tronwallet_abstract_adapter_1.AdapterState.NotFound);
		            return;
		        }
		        if ((0, utils_js_1.supportBitgetWallet)()) {
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
		     * Get network information.
		     * @returns {Network} Current network information.
		     */
		    network() {
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                yield this._checkWallet();
		                if (this.state !== tronwallet_abstract_adapter_1.AdapterState.Connected)
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                const wallet = this._wallet;
		                if (!wallet || !wallet.tronWeb)
		                    throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		                try {
		                    return yield (0, tronwallet_adapter_tronlink_1.getNetworkInfoByTronWeb)(wallet.tronWeb);
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
		        var _a, _b, _c, _d;
		        return __awaiter(this, void 0, void 0, function* () {
		            try {
		                this.checkIfOpenApp();
		                if (this.connected || this.connecting)
		                    return;
		                yield this._checkWallet();
		                if (this.readyState === tronwallet_abstract_adapter_1.WalletReadyState.NotFound) {
		                    if (this.config.openUrlWhenWalletNotFound !== false && (0, tronwallet_abstract_adapter_1.isInBrowser)()) {
		                        window.open(this.url, '_blank');
		                    }
		                    throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		                }
		                const wallet = this._wallet;
		                if (!(0, tronwallet_abstract_adapter_1.isInMobileBrowser)()) {
		                    if (!wallet)
		                        return;
		                    this._connecting = true;
		                    try {
		                        yield wallet.request({ method: 'tron_requestAccounts' });
		                    }
		                    catch (e) {
		                        throw new tronwallet_abstract_adapter_1.WalletConnectionError(e.message);
		                    }
		                }
		                const address = ((_a = wallet.tronWeb.defaultAddress) === null || _a === void 0 ? void 0 : _a.base58) || ((_d = (_c = (_b = window.bitkeep) === null || _b === void 0 ? void 0 : _b.tronWeb) === null || _c === void 0 ? void 0 : _c.defaultAddress) === null || _d === void 0 ? void 0 : _d.base58) || '';
		                this.setAddress(address);
		                this.setState(tronwallet_abstract_adapter_1.AdapterState.Connected);
		                this.emit('connect', this.address || '');
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
		    checkAndGetWallet() {
		        return __awaiter(this, void 0, void 0, function* () {
		            this.checkIfOpenApp();
		            yield this._checkWallet();
		            if (!this.connected)
		                throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		            const wallet = this._wallet;
		            if (!wallet || !wallet.tronWeb)
		                throw new tronwallet_abstract_adapter_1.WalletDisconnectedError();
		            return wallet;
		        });
		    }
		    checkForWalletReady() {
		        if (this.checkReadyInterval) {
		            return;
		        }
		        let times = 0;
		        const maxTimes = Math.floor(this.config.checkTimeout / 200);
		        const check = () => __awaiter(this, void 0, void 0, function* () {
		            if (this._wallet && this._wallet.ready) {
		                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
		                this.checkReadyInterval = null;
		                yield this._updateWallet();
		                this.emit('connect', this.address || '');
		            }
		            else if (times > maxTimes) {
		                this.checkReadyInterval && clearInterval(this.checkReadyInterval);
		                this.checkReadyInterval = null;
		            }
		            else {
		                times++;
		            }
		        });
		        this.checkReadyInterval = setInterval(check, 200);
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
		        const maxTimes = Math.floor(this.config.checkTimeout / interval);
		        let times = 0, timer;
		        this._checkPromise = new Promise((resolve) => {
		            const check = () => {
		                times++;
		                const isSupport = (0, utils_js_1.supportBitgetWallet)();
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
		    checkIfOpenApp() {
		        if (this.config.openAppWithDeeplink === false) {
		            return;
		        }
		        if ((0, utils_js_1.openBitgetWallet)()) {
		            throw new tronwallet_abstract_adapter_1.WalletNotFoundError();
		        }
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
		exports.BitKeepAdapter = BitKeepAdapter;
		
	} (adapter$2));

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
		__exportStar(adapter$2, exports);
		__exportStar(utils, exports);
		
	} (cjs$2));

	var index = /*@__PURE__*/getDefaultExportFromCjs(cjs$2);

	return index;

}));
