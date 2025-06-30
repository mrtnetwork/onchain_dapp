"use strict";
(self["webpackChunkpython_server"] = self["webpackChunkpython_server"] || []).push([[4185],{

/***/ 45839:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ NavigationUtil)
/* harmony export */ });
const NavigationUtil = {
    URLS: {
        FAQ: 'https://walletconnect.com/faq'
    }
};
//# sourceMappingURL=NavigationUtil.js.map

/***/ }),

/***/ 71801:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Up: () => (/* binding */ executeSocialLogin)
/* harmony export */ });
/* unused harmony exports connectFarcaster, connectSocial */
/* harmony import */ var _reown_appkit_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24376);
/* harmony import */ var _controllers_AccountController_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(63450);
/* harmony import */ var _controllers_ChainController_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6056);
/* harmony import */ var _controllers_ConnectorController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36010);
/* harmony import */ var _controllers_EventsController_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(90184);
/* harmony import */ var _controllers_RouterController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78508);
/* harmony import */ var _controllers_SnackController_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21871);
/* harmony import */ var _CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26742);
/* harmony import */ var _StorageUtil_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27508);









function getPopupWindow() {
    try {
        return _CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.returnOpenHref(`${_reown_appkit_common__WEBPACK_IMPORTED_MODULE_1__/* .ConstantsUtil */ .o.SECURE_SITE_SDK_ORIGIN}/loading`, 'popupWindow', 'width=600,height=800,scrollbars=yes');
    }
    catch (error) {
        throw new Error('Could not open social popup');
    }
}
async function connectFarcaster() {
    _controllers_RouterController_js__WEBPACK_IMPORTED_MODULE_2__/* .RouterController */ .I.push('ConnectingFarcaster');
    const authConnector = _controllers_ConnectorController_js__WEBPACK_IMPORTED_MODULE_3__/* .ConnectorController */ .a.getAuthConnector();
    if (authConnector) {
        if (!_controllers_AccountController_js__WEBPACK_IMPORTED_MODULE_4__/* .AccountController */ .U.state.farcasterUrl) {
            try {
                const { url } = await authConnector.provider.getFarcasterUri();
                _controllers_AccountController_js__WEBPACK_IMPORTED_MODULE_4__/* .AccountController */ .U.setFarcasterUrl(url, _controllers_ChainController_js__WEBPACK_IMPORTED_MODULE_5__/* .ChainController */ .W.state.activeChain);
            }
            catch (error) {
                _controllers_RouterController_js__WEBPACK_IMPORTED_MODULE_2__/* .RouterController */ .I.goBack();
                _controllers_SnackController_js__WEBPACK_IMPORTED_MODULE_6__/* .SnackController */ .P.showError(error);
            }
        }
    }
}
async function connectSocial(socialProvider) {
    _controllers_RouterController_js__WEBPACK_IMPORTED_MODULE_2__/* .RouterController */ .I.push('ConnectingSocial');
    const authConnector = _controllers_ConnectorController_js__WEBPACK_IMPORTED_MODULE_3__/* .ConnectorController */ .a.getAuthConnector();
    let popupWindow = null;
    try {
        const timeout = setTimeout(() => {
            throw new Error('Social login timed out. Please try again.');
        }, 45_000);
        if (authConnector && socialProvider) {
            if (!_CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.isTelegram()) {
                popupWindow = getPopupWindow();
            }
            if (popupWindow) {
                _controllers_AccountController_js__WEBPACK_IMPORTED_MODULE_4__/* .AccountController */ .U.setSocialWindow(popupWindow, _controllers_ChainController_js__WEBPACK_IMPORTED_MODULE_5__/* .ChainController */ .W.state.activeChain);
            }
            else if (!_CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.isTelegram()) {
                throw new Error('Could not create social popup');
            }
            const { uri } = await authConnector.provider.getSocialRedirectUri({
                provider: socialProvider
            });
            if (!uri) {
                popupWindow?.close();
                throw new Error('Could not fetch the social redirect uri');
            }
            if (popupWindow) {
                popupWindow.location.href = uri;
            }
            if (_CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.isTelegram()) {
                _StorageUtil_js__WEBPACK_IMPORTED_MODULE_7__/* .StorageUtil */ .i.setTelegramSocialProvider(socialProvider);
                const parsedUri = _CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.formatTelegramSocialLoginUrl(uri);
                _CoreHelperUtil_js__WEBPACK_IMPORTED_MODULE_0__/* .CoreHelperUtil */ .w.openHref(parsedUri, '_top');
            }
            clearTimeout(timeout);
        }
    }
    catch (error) {
        popupWindow?.close();
        _controllers_SnackController_js__WEBPACK_IMPORTED_MODULE_6__/* .SnackController */ .P.showError(error?.message);
    }
}
async function executeSocialLogin(socialProvider) {
    _controllers_AccountController_js__WEBPACK_IMPORTED_MODULE_4__/* .AccountController */ .U.setSocialProvider(socialProvider, _controllers_ChainController_js__WEBPACK_IMPORTED_MODULE_5__/* .ChainController */ .W.state.activeChain);
    _controllers_EventsController_js__WEBPACK_IMPORTED_MODULE_8__/* .EventsController */ .E.sendEvent({
        type: 'track',
        event: 'SOCIAL_LOGIN_STARTED',
        properties: { provider: socialProvider }
    });
    if (socialProvider === 'farcaster') {
        await connectFarcaster();
    }
    else {
        await connectSocial(socialProvider);
    }
}
//# sourceMappingURL=SocialsUtil.js.map

/***/ }),

/***/ 74185:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  AppKitAccountButton: () => (/* reexport */ AppKitAccountButton),
  AppKitButton: () => (/* reexport */ AppKitButton),
  AppKitConnectButton: () => (/* reexport */ AppKitConnectButton),
  AppKitNetworkButton: () => (/* reexport */ AppKitNetworkButton),
  W3mAccountButton: () => (/* reexport */ W3mAccountButton),
  W3mAccountSettingsView: () => (/* reexport */ W3mAccountSettingsView),
  W3mAccountView: () => (/* reexport */ W3mAccountView),
  W3mAllWalletsView: () => (/* reexport */ W3mAllWalletsView),
  W3mButton: () => (/* reexport */ W3mButton),
  W3mChooseAccountNameView: () => (/* reexport */ W3mChooseAccountNameView),
  W3mConnectButton: () => (/* reexport */ W3mConnectButton),
  W3mConnectView: () => (/* reexport */ W3mConnectView),
  W3mConnectWalletsView: () => (/* reexport */ W3mConnectWalletsView),
  W3mConnectingExternalView: () => (/* reexport */ W3mConnectingExternalView),
  W3mConnectingMultiChainView: () => (/* reexport */ W3mConnectingMultiChainView),
  W3mConnectingWcBasicView: () => (/* reexport */ W3mConnectingWcBasicView),
  W3mConnectingWcView: () => (/* reexport */ W3mConnectingWcView),
  W3mDownloadsView: () => (/* reexport */ W3mDownloadsView),
  W3mGetWalletView: () => (/* reexport */ W3mGetWalletView),
  W3mNetworkButton: () => (/* reexport */ W3mNetworkButton),
  W3mNetworkSwitchView: () => (/* reexport */ W3mNetworkSwitchView),
  W3mNetworksView: () => (/* reexport */ W3mNetworksView),
  W3mProfileView: () => (/* reexport */ W3mProfileView),
  W3mProfileWalletsView: () => (/* reexport */ W3mProfileWalletsView),
  W3mRouter: () => (/* reexport */ w3m_router/* W3mRouter */.J),
  W3mSIWXSignMessageView: () => (/* reexport */ W3mSIWXSignMessageView),
  W3mSwitchActiveChainView: () => (/* reexport */ W3mSwitchActiveChainView),
  W3mSwitchAddressView: () => (/* reexport */ W3mSwitchAddressView),
  W3mUnsupportedChainView: () => (/* reexport */ W3mUnsupportedChainView),
  W3mWalletCompatibleNetworksView: () => (/* reexport */ W3mWalletCompatibleNetworksView),
  W3mWhatIsANetworkView: () => (/* reexport */ W3mWhatIsANetworkView),
  W3mWhatIsAWalletView: () => (/* reexport */ W3mWhatIsAWalletView)
});

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js + 1 modules
var OptionsController = __webpack_require__(42733);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js
var AssetController = __webpack_require__(73337);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js
var AssetUtil = __webpack_require__(27601);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js + 1 modules
var wui_loading_spinner = __webpack_require__(20880);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = __webpack_require__(63612);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-avatar/index.js + 1 modules
var wui_avatar = __webpack_require__(76867);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js + 1 modules
var wui_icon_box = __webpack_require__(12851);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-account-button/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-account-button/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let WuiAccountButton = class WuiAccountButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.networkSrc = undefined;
        this.avatarSrc = undefined;
        this.balance = undefined;
        this.isUnsupportedChain = undefined;
        this.disabled = false;
        this.loading = false;
        this.address = '';
        this.profileName = '';
        this.charsStart = 4;
        this.charsEnd = 6;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button
        ?disabled=${this.disabled}
        class=${(0,if_defined/* ifDefined */.J)(this.balance ? undefined : 'local-no-balance')}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address
            ? UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
                string: this.profileName || this.address,
                charsStart: this.profileName ? 18 : this.charsStart,
                charsEnd: this.profileName ? 0 : this.charsEnd,
                truncate: this.profileName ? 'end' : 'middle'
            })
            : null}
          </wui-text>
        </wui-flex>
      </button>
    `;
    }
    balanceTemplate() {
        if (this.isUnsupportedChain) {
            return (0,lit/* html */.qy) ` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;
        }
        if (this.balance) {
            const networkElement = this.networkSrc
                ? (0,lit/* html */.qy) `<wui-image src=${this.networkSrc}></wui-image>`
                : (0,lit/* html */.qy) `
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `;
            const balanceTemplate = this.loading
                ? (0,lit/* html */.qy) `<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`
                : (0,lit/* html */.qy) `<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;
            return (0,lit/* html */.qy) `${networkElement} ${balanceTemplate}`;
        }
        return null;
    }
};
WuiAccountButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "networkSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "avatarSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "balance", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiAccountButton.prototype, "isUnsupportedChain", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiAccountButton.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiAccountButton.prototype, "loading", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "address", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "profileName", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "charsStart", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAccountButton.prototype, "charsEnd", void 0);
WuiAccountButton = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-account-button')
], WuiAccountButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-account-button.js

//# sourceMappingURL=wui-account-button.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-account-button/index.js
var w3m_account_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class W3mAccountButtonBase extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.disabled = false;
        this.balance = 'show';
        this.charsStart = 4;
        this.charsEnd = 6;
        this.namespace = undefined;
        this.isSupported = OptionsController/* OptionsController */.H.state.allowUnsupportedChain
            ? true
            : ChainController/* ChainController */.W.state.activeChain
                ? ChainController/* ChainController */.W.checkIfSupportedNetwork(ChainController/* ChainController */.W.state.activeChain)
                : true;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAccountData(ChainController/* ChainController */.W.getAccountData(this.namespace));
        this.setNetworkData(ChainController/* ChainController */.W.getNetworkData(this.namespace));
    }
    firstUpdated() {
        const namespace = this.namespace;
        if (namespace) {
            this.unsubscribe.push(ChainController/* ChainController */.W.subscribeChainProp('accountState', val => {
                this.setAccountData(val);
            }, namespace), ChainController/* ChainController */.W.subscribeChainProp('networkState', val => {
                this.setNetworkData(val);
                this.isSupported = ChainController/* ChainController */.W.checkIfSupportedNetwork(namespace, val?.caipNetwork);
            }, namespace));
        }
        else {
            this.unsubscribe.push(AssetController/* AssetController */.j.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
            }), ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => {
                this.caipAddress = val;
            }), AccountController/* AccountController */.U.subscribeKey('balance', val => (this.balanceVal = val)), AccountController/* AccountController */.U.subscribeKey('balanceSymbol', val => (this.balanceSymbol = val)), AccountController/* AccountController */.U.subscribeKey('profileName', val => (this.profileName = val)), AccountController/* AccountController */.U.subscribeKey('profileImage', val => (this.profileImage = val)), ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
                this.network = val;
                this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(val);
                this.isSupported = val?.chainNamespace
                    ? ChainController/* ChainController */.W.checkIfSupportedNetwork(val?.chainNamespace)
                    : true;
                this.fetchNetworkImage(val);
            }));
        }
    }
    updated() {
        this.fetchNetworkImage(this.network);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!ChainController/* ChainController */.W.state.activeChain) {
            return null;
        }
        const shouldShowBalance = this.balance === 'show';
        const shouldShowLoading = typeof this.balanceVal !== 'string';
        return (0,lit/* html */.qy) `
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        .isUnsupportedChain=${OptionsController/* OptionsController */.H.state.allowUnsupportedChain
            ? false
            : !this.isSupported}
        address=${(0,if_defined/* ifDefined */.J)(CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress))}
        profileName=${(0,if_defined/* ifDefined */.J)(this.profileName)}
        networkSrc=${(0,if_defined/* ifDefined */.J)(this.networkImage)}
        avatarSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage)}
        balance=${shouldShowBalance
            ? CoreHelperUtil/* CoreHelperUtil */.w.formatBalance(this.balanceVal, this.balanceSymbol)
            : ''}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace ? `-${this.namespace}` : ''}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${shouldShowLoading}
      >
      </wui-account-button>
    `;
    }
    onClick() {
        if (this.isSupported || OptionsController/* OptionsController */.H.state.allowUnsupportedChain) {
            ModalController/* ModalController */.W.open({ namespace: this.namespace });
        }
        else {
            ModalController/* ModalController */.W.open({ view: 'UnsupportedChain' });
        }
    }
    async fetchNetworkImage(network) {
        if (network?.assets?.imageId) {
            this.networkImage = await AssetUtil/* AssetUtil */.$.fetchNetworkImage(network?.assets?.imageId);
        }
    }
    setAccountData(accountState) {
        if (!accountState) {
            return;
        }
        this.caipAddress = accountState.caipAddress;
        this.balanceVal = accountState.balance;
        this.balanceSymbol = accountState.balanceSymbol;
        this.profileName = accountState.profileName;
        this.profileImage = accountState.profileImage;
    }
    setNetworkData(networkState) {
        if (!networkState) {
            return;
        }
        this.network = networkState.caipNetwork;
        this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(networkState.caipNetwork);
    }
}
w3m_account_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mAccountButtonBase.prototype, "disabled", void 0);
w3m_account_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mAccountButtonBase.prototype, "balance", void 0);
w3m_account_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mAccountButtonBase.prototype, "charsStart", void 0);
w3m_account_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mAccountButtonBase.prototype, "charsEnd", void 0);
w3m_account_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mAccountButtonBase.prototype, "namespace", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "caipAddress", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "balanceVal", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "balanceSymbol", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "profileName", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "profileImage", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "network", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "networkImage", void 0);
w3m_account_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountButtonBase.prototype, "isSupported", void 0);
let W3mAccountButton = class W3mAccountButton extends W3mAccountButtonBase {
};
W3mAccountButton = w3m_account_button_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-button')
], W3mAccountButton);

let AppKitAccountButton = class AppKitAccountButton extends W3mAccountButtonBase {
};
AppKitAccountButton = w3m_account_button_decorate([
    (0,esm_exports/* customElement */.EM)('appkit-account-button')
], AppKitAccountButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-button/styles.js

/* harmony default export */ const w3m_button_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: max-content;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-button/index.js
var w3m_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class W3mButtonBase extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.disabled = false;
        this.balance = undefined;
        this.size = undefined;
        this.label = undefined;
        this.loadingLabel = undefined;
        this.charsStart = 4;
        this.charsEnd = 6;
        this.namespace = undefined;
    }
    connectedCallback() {
        super.connectedCallback();
        this.caipAddress = this.namespace
            ? ChainController/* ChainController */.W.state.chains.get(this.namespace)?.accountState?.caipAddress
            : ChainController/* ChainController */.W.state.activeCaipAddress;
    }
    firstUpdated() {
        if (this.namespace) {
            this.unsubscribe.push(ChainController/* ChainController */.W.subscribeChainProp('accountState', val => {
                this.caipAddress = val?.caipAddress;
            }, this.namespace));
        }
        else {
            this.unsubscribe.push(ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => (this.caipAddress = val)));
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return this.caipAddress
            ? (0,lit/* html */.qy) `
          <appkit-account-button
            .disabled=${Boolean(this.disabled)}
            balance=${(0,if_defined/* ifDefined */.J)(this.balance)}
            .charsStart=${(0,if_defined/* ifDefined */.J)(this.charsStart)}
            .charsEnd=${(0,if_defined/* ifDefined */.J)(this.charsEnd)}
            namespace=${(0,if_defined/* ifDefined */.J)(this.namespace)}
          >
          </appkit-account-button>
        `
            : (0,lit/* html */.qy) `
          <appkit-connect-button
            size=${(0,if_defined/* ifDefined */.J)(this.size)}
            label=${(0,if_defined/* ifDefined */.J)(this.label)}
            loadingLabel=${(0,if_defined/* ifDefined */.J)(this.loadingLabel)}
            namespace=${(0,if_defined/* ifDefined */.J)(this.namespace)}
          ></appkit-connect-button>
        `;
    }
}
W3mButtonBase.styles = w3m_button_styles;
w3m_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mButtonBase.prototype, "disabled", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "balance", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "size", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "label", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "loadingLabel", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "charsStart", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "charsEnd", void 0);
w3m_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mButtonBase.prototype, "namespace", void 0);
w3m_button_decorate([
    (0,decorators/* state */.wk)()
], W3mButtonBase.prototype, "caipAddress", void 0);
let W3mButton = class W3mButton extends W3mButtonBase {
};
W3mButton = w3m_button_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-button')
], W3mButton);

let AppKitButton = class AppKitButton extends W3mButtonBase {
};
AppKitButton = w3m_button_decorate([
    (0,esm_exports/* customElement */.EM)('appkit-button')
], AppKitButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-connect-button/styles.js

/* harmony default export */ const wui_connect_button_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-connect-button/index.js
var wui_connect_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiConnectButton = class WuiConnectButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.loading = false;
    }
    render() {
        const textVariant = this.size === 'md' ? 'paragraph-600' : 'small-600';
        return (0,lit/* html */.qy) `
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${textVariant} color=${this.loading ? 'accent-100' : 'inherit'}>
          <slot></slot>
        </wui-text>
      </button>
    `;
    }
    loadingTemplate() {
        if (!this.loading) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`;
    }
};
WuiConnectButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_connect_button_styles];
wui_connect_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiConnectButton.prototype, "size", void 0);
wui_connect_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiConnectButton.prototype, "loading", void 0);
WuiConnectButton = wui_connect_button_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-connect-button')
], WuiConnectButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-connect-button.js

//# sourceMappingURL=wui-connect-button.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-connect-button/index.js
var w3m_connect_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class W3mConnectButtonBase extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.size = 'md';
        this.label = 'Connect Wallet';
        this.loadingLabel = 'Connecting...';
        this.open = ModalController/* ModalController */.W.state.open;
        this.loading = this.namespace
            ? ModalController/* ModalController */.W.state.loadingNamespaceMap.get(this.namespace)
            : ModalController/* ModalController */.W.state.loading;
        this.unsubscribe.push(ModalController/* ModalController */.W.subscribe(val => {
            this.open = val.open;
            this.loading = this.namespace ? val.loadingNamespaceMap.get(this.namespace) : val.loading;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-connect-button
        size=${(0,if_defined/* ifDefined */.J)(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace ? `-${this.namespace}` : ''}`}
      >
        ${this.loading ? this.loadingLabel : this.label}
      </wui-connect-button>
    `;
    }
    onClick() {
        if (this.open) {
            ModalController/* ModalController */.W.close();
        }
        else if (!this.loading) {
            ModalController/* ModalController */.W.open({ view: 'Connect', namespace: this.namespace });
        }
    }
}
w3m_connect_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectButtonBase.prototype, "size", void 0);
w3m_connect_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectButtonBase.prototype, "label", void 0);
w3m_connect_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectButtonBase.prototype, "loadingLabel", void 0);
w3m_connect_button_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectButtonBase.prototype, "namespace", void 0);
w3m_connect_button_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectButtonBase.prototype, "open", void 0);
w3m_connect_button_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectButtonBase.prototype, "loading", void 0);
let W3mConnectButton = class W3mConnectButton extends W3mConnectButtonBase {
};
W3mConnectButton = w3m_connect_button_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-button')
], W3mConnectButton);

let AppKitConnectButton = class AppKitConnectButton extends W3mConnectButtonBase {
};
AppKitConnectButton = w3m_connect_button_decorate([
    (0,esm_exports/* customElement */.EM)('appkit-connect-button')
], AppKitConnectButton);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-button/styles.js

/* harmony default export */ const wui_network_button_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-button/index.js
var wui_network_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiNetworkButton = class WuiNetworkButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.isUnsupportedChain = undefined;
        this.disabled = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `;
    }
    visualTemplate() {
        if (this.isUnsupportedChain) {
            return (0,lit/* html */.qy) `
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `;
        }
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        return (0,lit/* html */.qy) `
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
    }
};
WuiNetworkButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_network_button_styles];
wui_network_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiNetworkButton.prototype, "imageSrc", void 0);
wui_network_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiNetworkButton.prototype, "isUnsupportedChain", void 0);
wui_network_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiNetworkButton.prototype, "disabled", void 0);
WuiNetworkButton = wui_network_button_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-network-button')
], WuiNetworkButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-network-button.js

//# sourceMappingURL=wui-network-button.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-network-button/styles.js

/* harmony default export */ const w3m_network_button_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: max-content;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-network-button/index.js
var w3m_network_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







class W3mNetworkButtonBase extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.disabled = false;
        this.network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
        this.caipAddress = ChainController/* ChainController */.W.state.activeCaipAddress;
        this.loading = ModalController/* ModalController */.W.state.loading;
        this.isSupported = OptionsController/* OptionsController */.H.state.allowUnsupportedChain
            ? true
            : ChainController/* ChainController */.W.state.activeChain
                ? ChainController/* ChainController */.W.checkIfSupportedNetwork(ChainController/* ChainController */.W.state.activeChain)
                : true;
        this.unsubscribe.push(...[
            AssetController/* AssetController */.j.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
            }),
            ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => {
                this.caipAddress = val;
            }),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
                this.network = val;
                this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(val);
                this.isSupported = val?.chainNamespace
                    ? ChainController/* ChainController */.W.checkIfSupportedNetwork(val.chainNamespace)
                    : true;
                AssetUtil/* AssetUtil */.$.fetchNetworkImage(val?.assets?.imageId);
            }),
            ModalController/* ModalController */.W.subscribeKey('loading', val => (this.loading = val))
        ]);
    }
    firstUpdated() {
        AssetUtil/* AssetUtil */.$.fetchNetworkImage(this.network?.assets?.imageId);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const isSupported = this.network
            ? ChainController/* ChainController */.W.checkIfSupportedNetwork(this.network.chainNamespace)
            : true;
        return (0,lit/* html */.qy) `
      <wui-network-button
        .disabled=${Boolean(this.disabled || this.loading)}
        .isUnsupportedChain=${OptionsController/* OptionsController */.H.state.allowUnsupportedChain ? false : !isSupported}
        imageSrc=${(0,if_defined/* ifDefined */.J)(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `;
    }
    getLabel() {
        if (this.network) {
            if (!this.isSupported && !OptionsController/* OptionsController */.H.state.allowUnsupportedChain) {
                return 'Switch Network';
            }
            return this.network.name;
        }
        if (this.label) {
            return this.label;
        }
        if (this.caipAddress) {
            return 'Unknown Network';
        }
        return 'Select Network';
    }
    onClick() {
        if (!this.loading) {
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'CLICK_NETWORKS' });
            ModalController/* ModalController */.W.open({ view: 'Networks' });
        }
    }
}
W3mNetworkButtonBase.styles = w3m_network_button_styles;
w3m_network_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mNetworkButtonBase.prototype, "disabled", void 0);
w3m_network_button_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], W3mNetworkButtonBase.prototype, "label", void 0);
w3m_network_button_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkButtonBase.prototype, "network", void 0);
w3m_network_button_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkButtonBase.prototype, "networkImage", void 0);
w3m_network_button_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkButtonBase.prototype, "caipAddress", void 0);
w3m_network_button_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkButtonBase.prototype, "loading", void 0);
w3m_network_button_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkButtonBase.prototype, "isSupported", void 0);
let W3mNetworkButton = class W3mNetworkButton extends W3mNetworkButtonBase {
};
W3mNetworkButton = w3m_network_button_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-network-button')
], W3mNetworkButton);

let AppKitNetworkButton = class AppKitNetworkButton extends W3mNetworkButtonBase {
};
AppKitNetworkButton = w3m_network_button_decorate([
    (0,esm_exports/* customElement */.EM)('appkit-network-button')
], AppKitNetworkButton);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-router/index.js + 1 modules
var w3m_router = __webpack_require__(5105);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(24376);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js
var ConnectorController = __webpack_require__(36010);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js
var utils_ConstantsUtil = __webpack_require__(62944);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js
var ConnectionController = __webpack_require__(79177);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js
var SendController = __webpack_require__(8351);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-avatar.js

//# sourceMappingURL=wui-avatar.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var exports_wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-link.js
var wui_icon_link = __webpack_require__(64865);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-item.js + 2 modules
var wui_list_item = __webpack_require__(26509);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-button/index.js + 1 modules
var wui_button = __webpack_require__(19384);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-notice-card/styles.js

/* harmony default export */ const wui_notice_card_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-notice-card/index.js
var wui_notice_card_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiNoticeCard = class WuiNoticeCard extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.label = '';
        this.description = '';
        this.icon = 'wallet';
    }
    render() {
        return (0,lit/* html */.qy) `
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `;
    }
};
WuiNoticeCard.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_notice_card_styles];
wui_notice_card_decorate([
    (0,decorators/* property */.MZ)()
], WuiNoticeCard.prototype, "label", void 0);
wui_notice_card_decorate([
    (0,decorators/* property */.MZ)()
], WuiNoticeCard.prototype, "description", void 0);
wui_notice_card_decorate([
    (0,decorators/* property */.MZ)()
], WuiNoticeCard.prototype, "icon", void 0);
WuiNoticeCard = wui_notice_card_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-notice-card')
], WuiNoticeCard);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-notice-card.js

//# sourceMappingURL=wui-notice-card.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var exports_wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js
var StorageUtil = __webpack_require__(27508);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-auth-button/index.js
var w3m_account_auth_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mAccountAuthButton = class W3mAccountAuthButton extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.socialProvider = StorageUtil/* StorageUtil */.i.getConnectedSocialProvider();
        this.socialUsername = StorageUtil/* StorageUtil */.i.getConnectedSocialUsername();
        this.namespace = ChainController/* ChainController */.W.state.activeChain;
        this.unsubscribe.push(ChainController/* ChainController */.W.subscribeKey('activeChain', namespace => {
            this.namespace = namespace;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsub => unsub());
    }
    render() {
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(this.namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (!authConnector || connectorId !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH) {
            this.style.cssText = `display: none`;
            return null;
        }
        const email = authConnector.provider.getEmail() ?? '';
        if (!email && !this.socialUsername) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider ?? 'mail'}
        iconSize=${this.socialProvider ? 'xxl' : 'sm'}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
            this.onGoToUpdateEmail(email, this.socialProvider);
        }}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(email)}</wui-text>
      </wui-list-item>
    `;
    }
    onGoToUpdateEmail(email, socialProvider) {
        if (!socialProvider) {
            RouterController/* RouterController */.I.push('UpdateEmailWallet', { email, redirectView: 'Account' });
        }
    }
    getAuthName(email) {
        if (this.socialUsername) {
            if (this.socialProvider === 'discord' && this.socialUsername.endsWith('0')) {
                return this.socialUsername.slice(0, -1);
            }
            return this.socialUsername;
        }
        return email.length > 30 ? `${email.slice(0, -3)}...` : email;
    }
};
w3m_account_auth_button_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountAuthButton.prototype, "namespace", void 0);
W3mAccountAuthButton = w3m_account_auth_button_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-auth-button')
], W3mAccountAuthButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-account-settings-view/index.js
var w3m_account_settings_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let W3mAccountSettingsView = class W3mAccountSettingsView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.usubscribe = [];
        this.networkImages = AssetController/* AssetController */.j.state.networkImages;
        this.address = AccountController/* AccountController */.U.state.address;
        this.profileImage = AccountController/* AccountController */.U.state.profileImage;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.preferredAccountTypes = AccountController/* AccountController */.U.state.preferredAccountTypes;
        this.disconnecting = false;
        this.loading = false;
        this.switched = false;
        this.text = '';
        this.usubscribe.push(...[
            AccountController/* AccountController */.U.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.preferredAccountTypes = val.preferredAccountTypes;
                }
            }),
            AccountController/* AccountController */.U.subscribeKey('preferredAccountTypes', val => (this.preferredAccountTypes = val)),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
                if (val?.id) {
                    this.network = val;
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.usubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-settings-view: No account provided');
        }
        const networkImage = this.networkImages[this.network?.assets?.imageId ?? ''];
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${['0', 'xl', 'm', 'xl']}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${esm_exports/* UiHelperUtil */.Zv.getTruncateString({
            string: this.address,
            charsStart: 4,
            charsEnd: 6,
            truncate: 'middle'
        })}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${['0', 'l', 'm', 'l']}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${networkImage ? 'image' : 'icon'}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${(0,if_defined/* ifDefined */.J)(networkImage)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name ?? 'Unknown'}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${false}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
    }
    chooseNameButtonTemplate() {
        const namespace = this.network?.chainNamespace;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        const hasNetworkSupport = ChainController/* ChainController */.W.checkIfNamesSupported();
        if (!hasNetworkSupport ||
            !authConnector ||
            connectorId !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH ||
            this.profileName) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${true}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `;
    }
    authCardTemplate() {
        const namespace = this.network?.chainNamespace;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        const { origin } = location;
        if (!authConnector ||
            connectorId !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH ||
            origin.includes(utils_ConstantsUtil/* ConstantsUtil */.oU.SECURE_SITE)) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
    }
    isAllowedNetworkSwitch() {
        const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
        const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
        return isMultiNetwork || !isValidNetwork;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(this.address);
                SnackController/* SnackController */.P.showSuccess('Address copied');
            }
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to copy');
        }
    }
    togglePreferredAccountBtnTemplate() {
        const namespace = this.network?.chainNamespace;
        const isNetworkEnabled = ChainController/* ChainController */.W.checkIfSmartAccountEnabled();
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (!authConnector ||
            connectorId !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH ||
            !isNetworkEnabled) {
            return null;
        }
        if (!this.switched) {
            this.text =
                this.preferredAccountTypes?.[namespace] === W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
                    ? 'Switch to your EOA'
                    : 'Switch to your smart account';
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${true}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `;
    }
    onChooseName() {
        RouterController/* RouterController */.I.push('ChooseAccountName');
    }
    async changePreferredAccountType() {
        const namespace = this.network?.chainNamespace;
        const isSmartAccountEnabled = ChainController/* ChainController */.W.checkIfSmartAccountEnabled();
        const accountTypeTarget = this.preferredAccountTypes?.[namespace] ===
            W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT || !isSmartAccountEnabled
            ? W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.EOA
            : W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT;
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (!authConnector) {
            return;
        }
        this.loading = true;
        await ConnectionController/* ConnectionController */.x.setPreferredAccountType(accountTypeTarget, namespace);
        this.text =
            accountTypeTarget === W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
                ? 'Switch to your EOA'
                : 'Switch to your smart account';
        this.switched = true;
        SendController/* SendController */.R.resetSend();
        this.loading = false;
        this.requestUpdate();
    }
    onNetworks() {
        if (this.isAllowedNetworkSwitch()) {
            RouterController/* RouterController */.I.push('Networks');
        }
    }
    async onDisconnect() {
        try {
            this.disconnecting = true;
            await ConnectionController/* ConnectionController */.x.disconnect();
            ModalController/* ModalController */.W.close();
        }
        catch {
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' });
            SnackController/* SnackController */.P.showError('Failed to disconnect');
        }
        finally {
            this.disconnecting = false;
        }
    }
    onGoToUpgradeView() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_UPGRADE_FROM_MODAL' });
        RouterController/* RouterController */.I.push('UpgradeEmailWallet');
    }
};
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "address", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "profileImage", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "profileName", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "network", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "preferredAccountTypes", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "disconnecting", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "loading", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "switched", void 0);
w3m_account_settings_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountSettingsView.prototype, "text", void 0);
W3mAccountSettingsView = w3m_account_settings_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-settings-view')
], W3mAccountSettingsView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var exports_wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js
var exports_wui_icon = __webpack_require__(51636);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-profile-button-v2/styles.js

/* harmony default export */ const wui_profile_button_v2_styles = ((0,lit/* css */.AH) `
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-profile-button-v2/index.js
var wui_profile_button_v2_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let WuiProfileButtonV2 = class WuiProfileButtonV2 extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.avatarSrc = undefined;
        this.profileName = '';
        this.address = '';
        this.icon = 'mail';
    }
    render() {
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const shouldShowIcon = connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH;
        return (0,lit/* html */.qy) `<button data-testid="wui-profile-button" @click=${this.handleClick}>
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${shouldShowIcon ? this.getIconTemplate(this.icon) : ''}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
            string: this.profileName || this.address,
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name="copy" id="copy-address"></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`;
    }
    handleClick(event) {
        if (event.target instanceof HTMLElement && event.target.id === 'copy-address') {
            this.onCopyClick?.(event);
            return;
        }
        this.onProfileClick?.(event);
    }
    getIconTemplate(icon) {
        return (0,lit/* html */.qy) `
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="${icon || 'networkPlaceholder'}"
      ></wui-icon-box>
    `;
    }
};
WuiProfileButtonV2.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_profile_button_v2_styles];
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "avatarSrc", void 0);
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "profileName", void 0);
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "address", void 0);
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "icon", void 0);
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "onProfileClick", void 0);
wui_profile_button_v2_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButtonV2.prototype, "onCopyClick", void 0);
WuiProfileButtonV2 = wui_profile_button_v2_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-profile-button-v2')
], WuiProfileButtonV2);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-profile-button-v2.js

//# sourceMappingURL=wui-profile-button-v2.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tabs/styles.js

/* harmony default export */ const wui_tabs_styles = ((0,lit/* css */.AH) `
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tabs/index.js
var wui_tabs_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiTabs = class WuiTabs extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabs = [];
        this.onTabChange = () => null;
        this.buttons = [];
        this.disabled = false;
        this.localTabWidth = '100px';
        this.activeTab = 0;
        this.isDense = false;
    }
    render() {
        this.isDense = this.tabs.length > 3;
        this.style.cssText = `
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `;
        this.dataset['type'] = this.isDense ? 'flex' : 'block';
        return this.tabs.map((tab, index) => {
            const isActive = index === this.activeTab;
            return (0,lit/* html */.qy) `
        <button
          ?disabled=${this.disabled}
          @click=${() => this.onTabClick(index)}
          data-active=${isActive}
          data-testid="tab-${tab.label?.toLowerCase()}"
        >
          ${this.iconTemplate(tab)}
          <wui-text variant="small-600" color="inherit"> ${tab.label} </wui-text>
        </button>
      `;
        });
    }
    firstUpdated() {
        if (this.shadowRoot && this.isDense) {
            this.buttons = [...this.shadowRoot.querySelectorAll('button')];
            setTimeout(() => {
                this.animateTabs(0, true);
            }, 0);
        }
    }
    iconTemplate(tab) {
        if (tab.icon) {
            return (0,lit/* html */.qy) `<wui-icon size="xs" color="inherit" name=${tab.icon}></wui-icon>`;
        }
        return null;
    }
    onTabClick(index) {
        if (this.buttons) {
            this.animateTabs(index, false);
        }
        this.activeTab = index;
        this.onTabChange(index);
    }
    animateTabs(index, initialAnimation) {
        const passiveBtn = this.buttons[this.activeTab];
        const activeBtn = this.buttons[index];
        const passiveBtnText = passiveBtn?.querySelector('wui-text');
        const activeBtnText = activeBtn?.querySelector('wui-text');
        const activeBtnBounds = activeBtn?.getBoundingClientRect();
        const activeBtnTextBounds = activeBtnText?.getBoundingClientRect();
        if (passiveBtn && passiveBtnText && !initialAnimation && index !== this.activeTab) {
            passiveBtnText.animate([{ opacity: 0 }], {
                duration: 50,
                easing: 'ease',
                fill: 'forwards'
            });
            passiveBtn.animate([{ width: `34px` }], {
                duration: 500,
                easing: 'ease',
                fill: 'forwards'
            });
        }
        if (activeBtn && activeBtnBounds && activeBtnTextBounds && activeBtnText) {
            if (index !== this.activeTab || initialAnimation) {
                this.localTabWidth = `${Math.round(activeBtnBounds.width + activeBtnTextBounds.width) + 6}px`;
                activeBtn.animate([{ width: `${activeBtnBounds.width + activeBtnTextBounds.width}px` }], {
                    duration: initialAnimation ? 0 : 500,
                    fill: 'forwards',
                    easing: 'ease'
                });
                activeBtnText.animate([{ opacity: 1 }], {
                    duration: initialAnimation ? 0 : 125,
                    delay: initialAnimation ? 0 : 200,
                    fill: 'forwards',
                    easing: 'ease'
                });
            }
        }
    }
};
WuiTabs.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_tabs_styles];
wui_tabs_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTabs.prototype, "tabs", void 0);
wui_tabs_decorate([
    (0,decorators/* property */.MZ)()
], WuiTabs.prototype, "onTabChange", void 0);
wui_tabs_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTabs.prototype, "buttons", void 0);
wui_tabs_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiTabs.prototype, "disabled", void 0);
wui_tabs_decorate([
    (0,decorators/* property */.MZ)()
], WuiTabs.prototype, "localTabWidth", void 0);
wui_tabs_decorate([
    (0,decorators/* state */.wk)()
], WuiTabs.prototype, "activeTab", void 0);
wui_tabs_decorate([
    (0,decorators/* state */.wk)()
], WuiTabs.prototype, "isDense", void 0);
WuiTabs = wui_tabs_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-tabs')
], WuiTabs);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-tabs.js

//# sourceMappingURL=wui-tabs.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-tag.js
var wui_tag = __webpack_require__(38253);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-default-widget/styles.js

/* harmony default export */ const w3m_account_default_widget_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-default-widget/index.js
var w3m_account_default_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















let W3mAccountDefaultWidget = class W3mAccountDefaultWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.caipAddress = AccountController/* AccountController */.U.state.caipAddress;
        this.address = CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(AccountController/* AccountController */.U.state.caipAddress);
        this.allAccounts = AccountController/* AccountController */.U.state.allAccounts;
        this.profileImage = AccountController/* AccountController */.U.state.profileImage;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.disconnecting = false;
        this.balance = AccountController/* AccountController */.U.state.balance;
        this.balanceSymbol = AccountController/* AccountController */.U.state.balanceSymbol;
        this.features = OptionsController/* OptionsController */.H.state.features;
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.namespace = ChainController/* ChainController */.W.state.activeChain;
        this.chainId = ChainController/* ChainController */.W.state.activeCaipNetwork?.id;
        this.unsubscribe.push(...[
            AccountController/* AccountController */.U.subscribeKey('caipAddress', val => {
                this.address = CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(val);
                this.caipAddress = val;
            }),
            AccountController/* AccountController */.U.subscribeKey('balance', val => (this.balance = val)),
            AccountController/* AccountController */.U.subscribeKey('balanceSymbol', val => (this.balanceSymbol = val)),
            AccountController/* AccountController */.U.subscribeKey('profileName', val => (this.profileName = val)),
            AccountController/* AccountController */.U.subscribeKey('profileImage', val => (this.profileImage = val)),
            OptionsController/* OptionsController */.H.subscribeKey('features', val => (this.features = val)),
            OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)),
            AccountController/* AccountController */.U.subscribeKey('allAccounts', allAccounts => {
                this.allAccounts = allAccounts;
            }),
            OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)),
            ChainController/* ChainController */.W.subscribeKey('activeChain', val => (this.namespace = val)),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
                if (val) {
                    const [namespace, chainId] = val?.caipNetworkId?.split(':') || [];
                    if (namespace && chainId) {
                        this.namespace = namespace;
                        this.chainId = chainId;
                    }
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.caipAddress) {
            return null;
        }
        const shouldShowMultiAccount = ChainController/* ChainController */.W.state.activeChain !== ConstantsUtil/* ConstantsUtil */.o.CHAIN.SOLANA &&
            this.allAccounts.length > 1;
        return (0,lit/* html */.qy) `<wui-flex
        flexDirection="column"
        .padding=${['0', 'xl', 'm', 'xl']}
        alignItems="center"
        gap="l"
      >
        ${shouldShowMultiAccount ? this.multiAccountTemplate() : this.singleAccountTemplate()}
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${CoreHelperUtil/* CoreHelperUtil */.w.formatBalance(this.balance, this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${['0', 's', 's', 's']}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${false}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`;
    }
    onrampTemplate() {
        if (!this.namespace) {
            return null;
        }
        const isOnrampEnabled = this.remoteFeatures?.onramp;
        const hasNetworkSupport = utils_ConstantsUtil/* ConstantsUtil */.oU.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
        if (!isOnrampEnabled || !hasNetworkSupport) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${true}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `;
    }
    orderedFeaturesTemplate() {
        const featuresOrder = this.features?.walletFeaturesOrder || utils_ConstantsUtil/* ConstantsUtil */.oU.DEFAULT_FEATURES.walletFeaturesOrder;
        return featuresOrder.map(feature => {
            switch (feature) {
                case 'onramp':
                    return this.onrampTemplate();
                case 'swaps':
                    return this.swapsTemplate();
                case 'send':
                    return this.sendTemplate();
                default:
                    return null;
            }
        });
    }
    activityTemplate() {
        if (!this.namespace) {
            return null;
        }
        const isEnabled = this.remoteFeatures?.activity &&
            utils_ConstantsUtil/* ConstantsUtil */.oU.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace);
        return isEnabled
            ? (0,lit/* html */.qy) ` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`
            : null;
    }
    swapsTemplate() {
        const isSwapsEnabled = this.remoteFeatures?.swaps;
        const isEvm = ChainController/* ChainController */.W.state.activeChain === ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM;
        if (!isSwapsEnabled || !isEvm) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${true}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `;
    }
    sendTemplate() {
        const isSendEnabled = this.features?.send;
        const activeNamespace = ChainController/* ChainController */.W.state.activeChain;
        const isSendSupported = utils_ConstantsUtil/* ConstantsUtil */.oU.SEND_SUPPORTED_NAMESPACES.includes(activeNamespace);
        if (!isSendEnabled || !isSendSupported) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${true}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `;
    }
    authCardTemplate() {
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        const { origin } = location;
        if (!authConnector ||
            connectorId !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH ||
            origin.includes(utils_ConstantsUtil/* ConstantsUtil */.oU.SECURE_SITE)) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
    }
    handleSwitchAccountsView() {
        RouterController/* RouterController */.I.push('SwitchAddress');
    }
    handleClickPay() {
        RouterController/* RouterController */.I.push('OnRampProviders');
    }
    handleClickSwap() {
        RouterController/* RouterController */.I.push('Swap');
    }
    handleClickSend() {
        RouterController/* RouterController */.I.push('WalletSend');
    }
    explorerBtnTemplate() {
        const addressExplorerUrl = AccountController/* AccountController */.U.state.addressExplorerUrl;
        if (!addressExplorerUrl) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `;
    }
    singleAccountTemplate() {
        return (0,lit/* html */.qy) `
      <wui-avatar
        alt=${(0,if_defined/* ifDefined */.J)(this.caipAddress)}
        address=${(0,if_defined/* ifDefined */.J)(CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress))}
        imageSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage === null ? undefined : this.profileImage)}
        data-testid="single-account-avatar"
      ></wui-avatar>
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex gap="3xs" alignItems="center" justifyContent="center">
          <wui-text variant="large-600" color="fg-100">
            ${this.profileName
            ? esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.profileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.address || '',
                charsStart: 4,
                charsEnd: 4,
                truncate: 'middle'
            })}
          </wui-text>
          <wui-icon-link
            size="md"
            icon="copy"
            iconColor="fg-200"
            @click=${this.onCopyAddress}
          ></wui-icon-link> </wui-flex
      ></wui-flex>
    `;
    }
    multiAccountTemplate() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        const account = this.allAccounts.find(acc => acc.address === this.address);
        const label = AccountController/* AccountController */.U.state.addressLabels.get(this.address);
        if (this.namespace === 'bip122') {
            return this.btcAccountsTemplate();
        }
        return (0,lit/* html */.qy) `
      <wui-profile-button-v2
        .onProfileClick=${this.handleSwitchAccountsView.bind(this)}
        address=${(0,if_defined/* ifDefined */.J)(this.address)}
        icon="${account?.type === W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT &&
            ChainController/* ChainController */.W.state.activeChain === ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM
            ? 'lightbulb'
            : 'mail'}"
        avatarSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage ? this.profileImage : undefined)}
        profileName=${(0,if_defined/* ifDefined */.J)(label ? label : this.profileName)}
        .onCopyClick=${this.onCopyAddress.bind(this)}
      ></wui-profile-button-v2>
    `;
    }
    btcAccountsTemplate() {
        return (0,lit/* html */.qy) `<wui-flex gap="m" alignItems="center" flexDirection="column">
      <wui-avatar
        .imageSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage ? this.profileImage : undefined)}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>
      <wui-tabs
        .tabs=${[{ label: 'Payment' }, { label: 'Ordinals' }]}
        .onTabChange=${(index) => AccountController/* AccountController */.U.setCaipAddress(`bip122:${this.chainId}:${this.allAccounts[index]?.address || ''}`, this.namespace)}
      ></wui-tabs>
      <wui-flex gap="xs" alignItems="center" justifyContent="center">
        <wui-text variant="large-600" color="fg-100">
          ${esm_exports/* UiHelperUtil */.Zv.getTruncateString({
            string: this.profileName || this.address || '',
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
        </wui-text>
        <wui-icon-link
          size="md"
          icon="copy"
          iconColor="fg-200"
          @click=${this.onCopyAddress}
        ></wui-icon-link>
      </wui-flex>
    </wui-flex>`;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(this.address);
                SnackController/* SnackController */.P.showSuccess('Address copied');
            }
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to copy');
        }
    }
    onTransactions() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'CLICK_TRANSACTIONS',
            properties: {
                isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController/* RouterController */.I.push('Transactions');
    }
    async onDisconnect() {
        try {
            this.disconnecting = true;
            await ConnectionController/* ConnectionController */.x.disconnect();
            ModalController/* ModalController */.W.close();
        }
        catch {
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' });
            SnackController/* SnackController */.P.showError('Failed to disconnect');
        }
        finally {
            this.disconnecting = false;
        }
    }
    onExplorer() {
        const addressExplorerUrl = AccountController/* AccountController */.U.state.addressExplorerUrl;
        if (addressExplorerUrl) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(addressExplorerUrl, '_blank');
        }
    }
    onGoToUpgradeView() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_UPGRADE_FROM_MODAL' });
        RouterController/* RouterController */.I.push('UpgradeEmailWallet');
    }
};
W3mAccountDefaultWidget.styles = w3m_account_default_widget_styles;
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "caipAddress", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "address", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "allAccounts", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "profileImage", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "profileName", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "disconnecting", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "balance", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "balanceSymbol", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "features", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "remoteFeatures", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "namespace", void 0);
w3m_account_default_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountDefaultWidget.prototype, "chainId", void 0);
W3mAccountDefaultWidget = w3m_account_default_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-default-widget')
], W3mAccountDefaultWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-balance/styles.js

/* harmony default export */ const wui_balance_styles = ((0,lit/* css */.AH) `
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-balance/index.js
var wui_balance_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiBalance = class WuiBalance extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.dollars = '0';
        this.pennies = '00';
    }
    render() {
        return (0,lit/* html */.qy) `<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`;
    }
};
WuiBalance.styles = [ThemeUtil/* resetStyles */.W5, wui_balance_styles];
wui_balance_decorate([
    (0,decorators/* property */.MZ)()
], WuiBalance.prototype, "dollars", void 0);
wui_balance_decorate([
    (0,decorators/* property */.MZ)()
], WuiBalance.prototype, "pennies", void 0);
WuiBalance = wui_balance_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-balance')
], WuiBalance);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-balance.js

//# sourceMappingURL=wui-balance.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-button.js + 2 modules
var wui_icon_button = __webpack_require__(84293);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-profile-button/styles.js

/* harmony default export */ const wui_profile_button_styles = ((0,lit/* css */.AH) `
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-profile-button/index.js
var wui_profile_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let WuiProfileButton = class WuiProfileButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.networkSrc = undefined;
        this.avatarSrc = undefined;
        this.profileName = '';
        this.address = '';
        this.icon = 'chevronBottom';
    }
    render() {
        return (0,lit/* html */.qy) `<button data-testid="wui-profile-button">
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${this.networkImageTemplate()}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
            string: this.profileName || this.address,
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name=${this.icon}></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`;
    }
    networkImageTemplate() {
        if (this.networkSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.networkSrc}></wui-image>`;
        }
        return (0,lit/* html */.qy) `
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
    }
};
WuiProfileButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_profile_button_styles];
wui_profile_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButton.prototype, "networkSrc", void 0);
wui_profile_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButton.prototype, "avatarSrc", void 0);
wui_profile_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButton.prototype, "profileName", void 0);
wui_profile_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButton.prototype, "address", void 0);
wui_profile_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiProfileButton.prototype, "icon", void 0);
WuiProfileButton = wui_profile_button_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-profile-button')
], WuiProfileButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-profile-button.js

//# sourceMappingURL=wui-profile-button.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tooltip/styles.js

/* harmony default export */ const wui_tooltip_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tooltip/index.js
var wui_tooltip_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiTooltip = class WuiTooltip extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.placement = 'top';
        this.variant = 'fill';
        this.message = '';
    }
    render() {
        this.dataset['variant'] = this.variant;
        return (0,lit/* html */.qy) `<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${this.variant === 'fill' ? 'cursor' : 'cursorTransparent'}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`;
    }
};
WuiTooltip.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_tooltip_styles];
wui_tooltip_decorate([
    (0,decorators/* property */.MZ)()
], WuiTooltip.prototype, "placement", void 0);
wui_tooltip_decorate([
    (0,decorators/* property */.MZ)()
], WuiTooltip.prototype, "variant", void 0);
wui_tooltip_decorate([
    (0,decorators/* property */.MZ)()
], WuiTooltip.prototype, "message", void 0);
WuiTooltip = wui_tooltip_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-tooltip')
], WuiTooltip);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-tooltip.js

//# sourceMappingURL=wui-tooltip.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js
var src_utils_ConstantsUtil = __webpack_require__(41482);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/HelpersUtil.js



const HelpersUtil = {
    getTabsByNamespace(namespace) {
        const isEVM = Boolean(namespace) && namespace === ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM;
        if (!isEVM) {
            return [];
        }
        if (OptionsController/* OptionsController */.H.state.remoteFeatures?.activity === false) {
            return src_utils_ConstantsUtil/* ConstantsUtil */.o.ACCOUNT_TABS.filter(tab => tab.label !== 'Activity');
        }
        return src_utils_ConstantsUtil/* ConstantsUtil */.o.ACCOUNT_TABS;
    }
};
//# sourceMappingURL=HelpersUtil.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-activity-list/index.js + 7 modules
var w3m_activity_list = __webpack_require__(79874);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-activity-widget/styles.js

/* harmony default export */ const w3m_account_activity_widget_styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-activity-widget/index.js
var w3m_account_activity_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let W3mAccountActivityWidget = class W3mAccountActivityWidget extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `<w3m-activity-list page="account"></w3m-activity-list>`;
    }
};
W3mAccountActivityWidget.styles = w3m_account_activity_widget_styles;
W3mAccountActivityWidget = w3m_account_activity_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-activity-widget')
], W3mAccountActivityWidget);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var exports_wui_icon_box = __webpack_require__(77616);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-nfts-widget/styles.js

/* harmony default export */ const w3m_account_nfts_widget_styles = ((0,lit/* css */.AH) `
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-nfts-widget/index.js
var w3m_account_nfts_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mAccountNftsWidget = class W3mAccountNftsWidget extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `${this.nftTemplate()}`;
    }
    nftTemplate() {
        return (0,lit/* html */.qy) ` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`;
    }
    onReceiveClick() {
        RouterController/* RouterController */.I.push('WalletReceive');
    }
};
W3mAccountNftsWidget.styles = w3m_account_nfts_widget_styles;
W3mAccountNftsWidget = w3m_account_nfts_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-nfts-widget')
], W3mAccountNftsWidget);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/index.js + 1 modules
var composites_wui_tag = __webpack_require__(5752);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-description/styles.js

/* harmony default export */ const wui_list_description_styles = ((0,lit/* css */.AH) `
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-description/index.js
var wui_list_description_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiListDescription = class WuiListDescription extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.icon = 'card';
        this.text = '';
        this.description = '';
        this.tag = undefined;
        this.iconBackgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.disabled = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `;
    }
    titleTemplate() {
        if (this.tag) {
            return (0,lit/* html */.qy) ` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`;
        }
        return (0,lit/* html */.qy) `<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`;
    }
};
WuiListDescription.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_description_styles];
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "icon", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "text", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "description", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "tag", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "iconBackgroundColor", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)()
], WuiListDescription.prototype, "iconColor", void 0);
wui_list_description_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListDescription.prototype, "disabled", void 0);
WuiListDescription = wui_list_description_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-description')
], WuiListDescription);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-description.js

//# sourceMappingURL=wui-list-description.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-token.js + 2 modules
var wui_list_token = __webpack_require__(55710);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-tokens-widget/styles.js

/* harmony default export */ const w3m_account_tokens_widget_styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-tokens-widget/index.js
var w3m_account_tokens_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let W3mAccountTokensWidget = class W3mAccountTokensWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tokenBalance = AccountController/* AccountController */.U.state.tokenBalance;
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.unsubscribe.push(...[
            AccountController/* AccountController */.U.subscribe(val => {
                this.tokenBalance = val.tokenBalance;
            }),
            OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => {
                this.remoteFeatures = val;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `${this.tokenTemplate()}`;
    }
    tokenTemplate() {
        if (this.tokenBalance && this.tokenBalance?.length > 0) {
            return (0,lit/* html */.qy) `<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`;
        }
        return (0,lit/* html */.qy) ` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="receive-funds"
      ></wui-list-description
    ></wui-flex>`;
    }
    onRampTemplate() {
        if (this.remoteFeatures?.onramp) {
            return (0,lit/* html */.qy) `<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description>`;
        }
        return (0,lit/* html */.qy) ``;
    }
    tokenItemTemplate() {
        return this.tokenBalance?.map(token => (0,lit/* html */.qy) `<wui-list-token
          tokenName=${token.name}
          tokenImageUrl=${token.iconUrl}
          tokenAmount=${token.quantity.numeric}
          tokenValue=${token.value}
          tokenCurrency=${token.symbol}
        ></wui-list-token>`);
    }
    onReceiveClick() {
        RouterController/* RouterController */.I.push('WalletReceive');
    }
    onBuyClick() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_BUY_CRYPTO',
            properties: {
                isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController/* RouterController */.I.push('OnRampProviders');
    }
};
W3mAccountTokensWidget.styles = w3m_account_tokens_widget_styles;
w3m_account_tokens_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountTokensWidget.prototype, "tokenBalance", void 0);
w3m_account_tokens_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountTokensWidget.prototype, "remoteFeatures", void 0);
W3mAccountTokensWidget = w3m_account_tokens_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-tokens-widget')
], W3mAccountTokensWidget);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip-trigger/index.js + 1 modules
var w3m_tooltip_trigger = __webpack_require__(78509);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip/index.js + 1 modules
var w3m_tooltip = __webpack_require__(56090);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-wallet-features-widget/styles.js

/* harmony default export */ const w3m_account_wallet_features_widget_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-account-wallet-features-widget/index.js
var w3m_account_wallet_features_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















const TABS_PADDING = 48;
const MODAL_MOBILE_VIEW_PX = 430;
let W3mAccountWalletFeaturesWidget = class W3mAccountWalletFeaturesWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.address = AccountController/* AccountController */.U.state.address;
        this.profileImage = AccountController/* AccountController */.U.state.profileImage;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.currentTab = AccountController/* AccountController */.U.state.currentTab;
        this.tokenBalance = AccountController/* AccountController */.U.state.tokenBalance;
        this.features = OptionsController/* OptionsController */.H.state.features;
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
        this.unsubscribe.push(...[
            AssetController/* AssetController */.j.subscribeNetworkImages(() => {
                this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
            }),
            AccountController/* AccountController */.U.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileImage = val.profileImage;
                    this.profileName = val.profileName;
                    this.currentTab = val.currentTab;
                    this.tokenBalance = val.tokenBalance;
                }
                else {
                    ModalController/* ModalController */.W.close();
                }
            })
        ], ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
            this.network = val;
            this.networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
        }), OptionsController/* OptionsController */.H.subscribeKey('features', val => (this.features = val)), OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)));
        this.watchSwapValues();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        clearInterval(this.watchTokenBalance);
    }
    firstUpdated() {
        AccountController/* AccountController */.U.fetchTokenBalance();
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-account-view: No account provided');
        }
        return (0,lit/* html */.qy) `<wui-flex
      flexDirection="column"
      .padding=${['0', 'xl', 'm', 'xl']}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${(0,if_defined/* ifDefined */.J)(this.address)}
        networkSrc=${(0,if_defined/* ifDefined */.J)(this.networkImage)}
        icon="chevronBottom"
        avatarSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage ? this.profileImage : undefined)}
        profileName=${(0,if_defined/* ifDefined */.J)(this.profileName ?? undefined)}
        data-testid="w3m-profile-button"
      ></wui-profile-button>

      ${this.tokenBalanceTemplate()} ${this.orderedWalletFeatures()} ${this.tabsTemplate()}
      ${this.listContentTemplate()}
    </wui-flex>`;
    }
    orderedWalletFeatures() {
        const walletFeaturesOrder = this.features?.walletFeaturesOrder || utils_ConstantsUtil/* ConstantsUtil */.oU.DEFAULT_FEATURES.walletFeaturesOrder;
        const isAllDisabled = walletFeaturesOrder.every(feature => {
            if (feature === 'send' || feature === 'receive') {
                return !this.features?.[feature];
            }
            if (feature === 'swaps' || feature === 'onramp') {
                return !this.remoteFeatures?.[feature];
            }
            return true;
        });
        if (isAllDisabled) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-flex gap="s">
      ${walletFeaturesOrder.map(feature => {
            switch (feature) {
                case 'onramp':
                    return this.onrampTemplate();
                case 'swaps':
                    return this.swapsTemplate();
                case 'receive':
                    return this.receiveTemplate();
                case 'send':
                    return this.sendTemplate();
                default:
                    return null;
            }
        })}
    </wui-flex>`;
    }
    onrampTemplate() {
        const isOnrampEnabled = this.remoteFeatures?.onramp;
        if (!isOnrampEnabled) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    swapsTemplate() {
        const isSwapsEnabled = this.remoteFeatures?.swaps;
        const isEvm = ChainController/* ChainController */.W.state.activeChain === ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM;
        if (!isSwapsEnabled || !isEvm) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    receiveTemplate() {
        const isReceiveEnabled = this.features?.receive;
        if (!isReceiveEnabled) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    sendTemplate() {
        const isSendEnabled = this.features?.send;
        const activeNamespace = ChainController/* ChainController */.W.state.activeChain;
        const isSendSupported = utils_ConstantsUtil/* ConstantsUtil */.oU.SEND_SUPPORTED_NAMESPACES.includes(activeNamespace);
        if (!isSendEnabled || !isSendSupported) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `;
    }
    watchSwapValues() {
        this.watchTokenBalance = setInterval(() => AccountController/* AccountController */.U.fetchTokenBalance(error => this.onTokenBalanceError(error)), 10_000);
    }
    onTokenBalanceError(error) {
        if (error instanceof Error && error.cause instanceof Response) {
            const statusCode = error.cause.status;
            if (statusCode === ConstantsUtil/* ConstantsUtil */.o.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE) {
                clearInterval(this.watchTokenBalance);
            }
        }
    }
    listContentTemplate() {
        if (this.currentTab === 0) {
            return (0,lit/* html */.qy) `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
        }
        if (this.currentTab === 1) {
            return (0,lit/* html */.qy) `<w3m-account-nfts-widget></w3m-account-nfts-widget>`;
        }
        if (this.currentTab === 2) {
            return (0,lit/* html */.qy) `<w3m-account-activity-widget></w3m-account-activity-widget>`;
        }
        return (0,lit/* html */.qy) `<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
    }
    tokenBalanceTemplate() {
        if (this.tokenBalance && this.tokenBalance?.length >= 0) {
            const value = CoreHelperUtil/* CoreHelperUtil */.w.calculateBalance(this.tokenBalance);
            const { dollars = '0', pennies = '00' } = CoreHelperUtil/* CoreHelperUtil */.w.formatTokenBalance(value);
            return (0,lit/* html */.qy) `<wui-balance dollars=${dollars} pennies=${pennies}></wui-balance>`;
        }
        return (0,lit/* html */.qy) `<wui-balance dollars="0" pennies="00"></wui-balance>`;
    }
    tabsTemplate() {
        const tabsByNamespace = HelpersUtil.getTabsByNamespace(ChainController/* ChainController */.W.state.activeChain);
        if (tabsByNamespace.length === 0) {
            return null;
        }
        const isMobileAndSmall = CoreHelperUtil/* CoreHelperUtil */.w.isMobile() && window.innerWidth < MODAL_MOBILE_VIEW_PX;
        let localTabWidth = '104px';
        if (isMobileAndSmall) {
            localTabWidth = `${(window.innerWidth - TABS_PADDING) / tabsByNamespace.length}px`;
        }
        else if (tabsByNamespace.length === 2) {
            localTabWidth = '156px';
        }
        else {
            localTabWidth = '104px';
        }
        return (0,lit/* html */.qy) `<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${localTabWidth}
      .tabs=${tabsByNamespace}
    ></wui-tabs>`;
    }
    onTabChange(index) {
        AccountController/* AccountController */.U.setCurrentTab(index);
    }
    onProfileButtonClick() {
        const { allAccounts } = AccountController/* AccountController */.U.state;
        if (allAccounts.length > 1) {
            RouterController/* RouterController */.I.push('Profile');
        }
        else {
            RouterController/* RouterController */.I.push('AccountSettings');
        }
    }
    onBuyClick() {
        RouterController/* RouterController */.I.push('OnRampProviders');
    }
    onSwapClick() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        if (this.network?.caipNetworkId &&
            !utils_ConstantsUtil/* ConstantsUtil */.oU.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)) {
            RouterController/* RouterController */.I.push('UnsupportedChain', {
                swapUnsupportedChain: true
            });
        }
        else {
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'OPEN_SWAP',
                properties: {
                    network: this.network?.caipNetworkId || '',
                    isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            RouterController/* RouterController */.I.push('Swap');
        }
    }
    onReceiveClick() {
        RouterController/* RouterController */.I.push('WalletReceive');
    }
    onSendClick() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'OPEN_SEND',
            properties: {
                network: this.network?.caipNetworkId || '',
                isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController/* RouterController */.I.push('WalletSend');
    }
};
W3mAccountWalletFeaturesWidget.styles = w3m_account_wallet_features_widget_styles;
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "watchTokenBalance", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "address", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "profileImage", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "profileName", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "network", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "currentTab", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "tokenBalance", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "features", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "remoteFeatures", void 0);
w3m_account_wallet_features_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountWalletFeaturesWidget.prototype, "networkImage", void 0);
W3mAccountWalletFeaturesWidget = w3m_account_wallet_features_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-wallet-features-widget')
], W3mAccountWalletFeaturesWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-account-view/index.js
var w3m_account_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mAccountView = class W3mAccountView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.namespace = ChainController/* ChainController */.W.state.activeChain;
        this.unsubscribe.push(ChainController/* ChainController */.W.subscribeKey('activeChain', namespace => {
            this.namespace = namespace;
        }));
    }
    render() {
        if (!this.namespace) {
            return null;
        }
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(this.namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        return (0,lit/* html */.qy) `
      ${authConnector && connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH
            ? this.walletFeaturesTemplate()
            : this.defaultTemplate()}
    `;
    }
    walletFeaturesTemplate() {
        return (0,lit/* html */.qy) `<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`;
    }
    defaultTemplate() {
        return (0,lit/* html */.qy) `<w3m-account-default-widget></w3m-account-default-widget>`;
    }
};
w3m_account_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAccountView.prototype, "namespace", void 0);
W3mAccountView = w3m_account_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-account-view')
], W3mAccountView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js
var BlockchainApiController = __webpack_require__(75595);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-account/styles.js

/* harmony default export */ const wui_list_account_styles = ((0,lit/* css */.AH) `
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }
  .address {
    color: var(--wui-color-fg-base-100);
  }
  .address-description {
    text-transform: capitalize;
    color: var(--wui-color-fg-base-200);
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-account/index.js
var wui_list_account_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















let WuiListAccount = class WuiListAccount extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.accountAddress = '';
        this.accountType = '';
        this.labels = AccountController/* AccountController */.U.state.addressLabels;
        this.caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.socialProvider = StorageUtil/* StorageUtil */.i.getConnectedSocialProvider();
        this.balance = 0;
        this.fetchingBalance = true;
        this.shouldShowIcon = false;
        this.selected = false;
    }
    connectedCallback() {
        super.connectedCallback();
        BlockchainApiController/* BlockchainApiController */.T.getBalance(this.accountAddress, this.caipNetwork?.caipNetworkId)
            .then(response => {
            let total = this.balance;
            if (response.balances.length > 0) {
                total = response.balances.reduce((acc, balance) => acc + (balance?.value || 0), 0);
            }
            this.balance = total;
            this.fetchingBalance = false;
            this.requestUpdate();
        })
            .catch(() => {
            this.fetchingBalance = false;
            this.requestUpdate();
        });
    }
    render() {
        const label = this.getLabel();
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        this.shouldShowIcon = connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH;
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        .padding=${['0', '0', 's', '1xs']}
      >
        <wui-flex gap="md" alignItems="center">
          <wui-avatar address=${this.accountAddress}></wui-avatar>
          ${this.shouldShowIcon
            ? (0,lit/* html */.qy) `<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="fg-300"
                icon=${this.accountType === W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.EOA
                ? (this.socialProvider ?? 'mail')
                : 'lightbulb'}
                background="fg-300"
              ></wui-icon-box>`
            : (0,lit/* html */.qy) `<wui-flex .padding="${['0', '0', '0', 's']}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
            string: this.accountAddress,
            charsStart: 4,
            charsEnd: 6,
            truncate: 'middle'
        })}</wui-text
            >
            <wui-text class="address-description" variant="small-400">${label}</wui-text></wui-flex
          >
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          <slot name="action"></slot>
          ${this.fetchingBalance
            ? (0,lit/* html */.qy) `<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`
            : (0,lit/* html */.qy) ` <wui-text variant="small-400">$${this.balance.toFixed(2)}</wui-text>`}
        </wui-flex>
      </wui-flex>
    `;
    }
    getLabel() {
        let label = this.labels?.get(this.accountAddress);
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        if (!label && connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH) {
            label = `${this.accountType === 'eoa' ? (this.socialProvider ?? 'Email') : 'Smart'} Account`;
        }
        else if (!label) {
            label = 'EOA';
        }
        return label;
    }
};
WuiListAccount.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_account_styles];
wui_list_account_decorate([
    (0,decorators/* property */.MZ)()
], WuiListAccount.prototype, "accountAddress", void 0);
wui_list_account_decorate([
    (0,decorators/* property */.MZ)()
], WuiListAccount.prototype, "accountType", void 0);
wui_list_account_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListAccount.prototype, "selected", void 0);
wui_list_account_decorate([
    (0,decorators/* property */.MZ)({ type: Function })
], WuiListAccount.prototype, "onSelect", void 0);
WuiListAccount = wui_list_account_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-account')
], WuiListAccount);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-account.js

//# sourceMappingURL=wui-list-account.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-profile-view/styles.js

/* harmony default export */ const w3m_profile_view_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;

    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #47a1ff;
  }

  .account-settings-button {
    padding: calc(var(--wui-spacing-m) - 1px) var(--wui-spacing-2l);
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .account-settings-button:hover {
    background: var(--wui-color-gray-glass-005);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-profile-view/index.js
var w3m_profile_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mProfileView = class W3mProfileView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.usubscribe = [];
        this.address = AccountController/* AccountController */.U.state.address;
        this.profileImage = AccountController/* AccountController */.U.state.profileImage;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.accounts = AccountController/* AccountController */.U.state.allAccounts;
        this.loading = false;
        this.usubscribe.push(AccountController/* AccountController */.U.subscribeKey('address', address => {
            if (address) {
                this.address = address;
            }
            else {
                ModalController/* ModalController */.W.close();
            }
        }));
        this.usubscribe.push(AccountController/* AccountController */.U.subscribeKey('profileImage', profileImage => {
            this.profileImage = profileImage;
        }));
        this.usubscribe.push(AccountController/* AccountController */.U.subscribeKey('profileName', profileName => {
            this.profileName = profileName;
        }));
    }
    disconnectedCallback() {
        this.usubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-profile-view: No account provided');
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="l" .padding=${['0', 'xl', 'm', 'xl']}>
        <wui-flex flexDirection="column" alignItems="center" gap="l">
          <wui-avatar
            alt=${this.address}
            address=${this.address}
            imageSrc=${(0,if_defined/* ifDefined */.J)(this.profileImage)}
            size="2lg"
          ></wui-avatar>
          <wui-flex flexDirection="column" alignItems="center">
            <wui-flex gap="3xs" alignItems="center" justifyContent="center">
              <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
                ${this.profileName
            ? esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.profileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.address,
                charsStart: 4,
                charsEnd: 6,
                truncate: 'middle'
            })}
              </wui-text>
              <wui-icon-link
                size="md"
                icon="copy"
                iconColor="fg-200"
                @click=${this.onCopyAddress}
              ></wui-icon-link>
            </wui-flex>
          </wui-flex>
        </wui-flex>
        <wui-flex
          data-testid="account-settings-button"
          justifyContent="center"
          alignItems="center"
          class="account-settings-button"
          @click=${() => RouterController/* RouterController */.I.push('AccountSettings')}
        >
          <wui-text variant="paragraph-500" color="fg-100">Account Settings</wui-text>
        </wui-flex>
        ${this.accountsTemplate()}
      </wui-flex>
    `;
    }
    accountsTemplate() {
        return (0,lit/* html */.qy) `<wui-flex flexDirection="column">
      <wui-flex .padding=${['3xs', 'm', 's', 's']}>
        <wui-text color="fg-200" variant="paragraph-400">Your accounts</wui-text>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxs">
        ${this.accounts.map(account => this.accountTemplate(account))}
      </wui-flex>
    </wui-flex>`;
    }
    async onSwitchAccount(account) {
        const namespace = ChainController/* ChainController */.W.state.activeCaipNetwork?.chainNamespace;
        this.loading = true;
        const emailConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (emailConnector) {
            const type = account.type;
            await ConnectionController/* ConnectionController */.x.setPreferredAccountType(type, namespace);
        }
        AccountController/* AccountController */.U.setShouldUpdateToAddress(account.address, namespace);
        this.loading = false;
    }
    accountTemplate(account) {
        return (0,lit/* html */.qy) `<wui-list-account accountAddress=${account.address} accountType=${account.type}>
      ${account.address === this.address
            ? ''
            : (0,lit/* html */.qy) `<wui-button
            slot="action"
            textVariant="small-600"
            size="md"
            variant="accent"
            @click=${() => this.onSwitchAccount(account)}
            .loading=${this.loading}
            >Switch</wui-button
          >`}
    </wui-list-account>`;
    }
    onCopyAddress() {
        try {
            if (this.address) {
                CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(this.address);
                SnackController/* SnackController */.P.showSuccess('Address copied');
            }
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to copy');
        }
    }
};
W3mProfileView.styles = w3m_profile_view_styles;
w3m_profile_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileView.prototype, "address", void 0);
w3m_profile_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileView.prototype, "profileImage", void 0);
w3m_profile_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileView.prototype, "profileName", void 0);
w3m_profile_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileView.prototype, "accounts", void 0);
w3m_profile_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileView.prototype, "loading", void 0);
W3mProfileView = w3m_profile_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-profile-view')
], W3mProfileView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-banner-img/styles.js

/* harmony default export */ const wui_banner_img_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-m);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-banner-img/index.js
var wui_banner_img_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiBannerImg = class WuiBannerImg extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.imageSrc = '';
        this.text = '';
        this.size = '';
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex gap="1xs" alignItems="center">
        <wui-avatar size=${this.size} imageSrc=${this.imageSrc}></wui-avatar>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `;
    }
};
WuiBannerImg.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_banner_img_styles];
wui_banner_img_decorate([
    (0,decorators/* property */.MZ)()
], WuiBannerImg.prototype, "imageSrc", void 0);
wui_banner_img_decorate([
    (0,decorators/* property */.MZ)()
], WuiBannerImg.prototype, "text", void 0);
wui_banner_img_decorate([
    (0,decorators/* property */.MZ)()
], WuiBannerImg.prototype, "size", void 0);
WuiBannerImg = wui_banner_img_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-banner-img')
], WuiBannerImg);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-banner-img.js

//# sourceMappingURL=wui-banner-img.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-switch-address-view/styles.js

/* harmony default export */ const w3m_switch_address_view_styles = ((0,lit/* css */.AH) `
  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-switch-address-view/index.js
var w3m_switch_address_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let W3mSwitchAddressView = class W3mSwitchAddressView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.metadata = OptionsController/* OptionsController */.H.state.metadata;
        this.allAccounts = AccountController/* AccountController */.U.state.allAccounts || [];
        this.balances = {};
        this.labels = AccountController/* AccountController */.U.state.addressLabels;
        this.currentAddress = AccountController/* AccountController */.U.state.address || '';
        this.caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        AccountController/* AccountController */.U.subscribeKey('allAccounts', allAccounts => {
            this.allAccounts = allAccounts;
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this.allAccounts.forEach(account => {
            BlockchainApiController/* BlockchainApiController */.T.getBalance(account.address, this.caipNetwork?.caipNetworkId).then(response => {
                let total = this.balances[account.address] || 0;
                if (response.balances.length > 0) {
                    total = response.balances.reduce((acc, balance) => acc + (balance?.value || 0), 0);
                }
                this.balances[account.address] = total;
                this.requestUpdate();
            });
        });
    }
    getAddressIcon(type) {
        if (type === 'smartAccount') {
            return 'lightbulb';
        }
        return 'mail';
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="center" .padding=${['xl', '0', 'xl', '0']}>
        <wui-banner-img
          imageSrc=${(0,if_defined/* ifDefined */.J)(this.metadata?.icons[0])}
          text=${(0,if_defined/* ifDefined */.J)(this.metadata?.url)}
          size="sm"
        ></wui-banner-img>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxl" .padding=${['l', 'xl', 'xl', 'xl']}>
        ${this.allAccounts.map((account, index) => this.getAddressTemplate(account, index))}
      </wui-flex>
    `;
    }
    getAddressTemplate(account, index) {
        const label = this.labels?.get(account.address);
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const shouldShowIcon = connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH;
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        data-testid="switch-address-item"
      >
        <wui-flex alignItems="center">
          <wui-avatar address=${account.address}></wui-avatar>
          ${shouldShowIcon
            ? (0,lit/* html */.qy) `<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="glass-002"
                background="gray"
                icon="${this.getAddressIcon(account.type)}"
                ?border=${true}
              ></wui-icon-box>`
            : (0,lit/* html */.qy) `<wui-flex .padding="${['0', '0', '0', 's']}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${label
            ? label
            : esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: account.address,
                charsStart: 4,
                charsEnd: 6,
                truncate: 'middle'
            })}</wui-text
            >
            <wui-text class="address-description" variant="small-400">
              ${typeof this.balances[account.address] === 'number'
            ? `$${this.balances[account.address]?.toFixed(2)}`
            : (0,lit/* html */.qy) `<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          ${account.address?.toLowerCase() === this.currentAddress?.toLowerCase()
            ? ''
            : (0,lit/* html */.qy) `
                <wui-button
                  data-testid=${`w3m-switch-address-button-${index}`}
                  textVariant="small-600"
                  size="md"
                  variant="accent"
                  @click=${() => this.onSwitchAddress(account.address)}
                  >Switch to</wui-button
                >
              `}
        </wui-flex>
      </wui-flex>
    `;
    }
    onSwitchAddress(address) {
        const caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        const activeChainNamespace = caipNetwork?.chainNamespace;
        const caipAddress = `${activeChainNamespace}:${caipNetwork?.id}:${address}`;
        AccountController/* AccountController */.U.setCaipAddress(caipAddress, activeChainNamespace);
        ModalController/* ModalController */.W.close();
    }
};
W3mSwitchAddressView.styles = w3m_switch_address_view_styles;
w3m_switch_address_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSwitchAddressView.prototype, "allAccounts", void 0);
w3m_switch_address_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSwitchAddressView.prototype, "balances", void 0);
W3mSwitchAddressView = w3m_switch_address_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-switch-address-view')
], W3mSwitchAddressView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/lit/directives/class-map.js + 1 modules
var class_map = __webpack_require__(53720);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js
var ParseUtil = __webpack_require__(75910);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConnectionControllerUtil.js
var ConnectionControllerUtil = __webpack_require__(8577);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/index.js + 1 modules
var composites_wui_icon_link = __webpack_require__(7068);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/index.js + 1 modules
var wui_wallet_image = __webpack_require__(91383);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-active-profile-wallet-item/styles.js

/* harmony default export */ const wui_active_profile_wallet_item_styles = ((0,lit/* css */.AH) `
  wui-image {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-active-profile-wallet-item/index.js
var wui_active_profile_wallet_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















let WuiActiveProfileWalletItem = class WuiActiveProfileWalletItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.address = '';
        this.profileName = '';
        this.content = [];
        this.alt = '';
        this.imageSrc = '';
        this.icon = undefined;
        this.iconSize = 'md';
        this.iconBadge = undefined;
        this.iconBadgeSize = 'md';
        this.buttonVariant = 'neutral';
        this.enableMoreButton = false;
        this.charsStart = 4;
        this.charsEnd = 6;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `;
    }
    topTemplate() {
        return (0,lit/* html */.qy) `
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton
            ? (0,lit/* html */.qy) `<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
            ></wui-icon-link>`
            : null}
      </wui-flex>
    `;
    }
    bottomTemplate() {
        return (0,lit/* html */.qy) ` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `;
    }
    imageOrIconTemplate() {
        if (this.icon) {
            return (0,lit/* html */.qy) `
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge
                ? (0,lit/* html */.qy) `<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`
                : null}
          </wui-flex>
        </wui-flex>
      `;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `;
    }
    contentTemplate() {
        if (this.content.length === 0) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map(item => this.labelAndTagTemplate(item))}
      </wui-flex>
    `;
    }
    labelAndTagTemplate({ address, profileName, label, description, enableButton, tagVariant, tagLabel, alignItems = 'flex-end' }) {
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="space-between" alignItems=${alignItems} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${label ? (0,lit/* html */.qy) `<wui-text variant="micro-600" color="fg-200">${label}</wui-text>` : null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
            string: profileName || address,
            charsStart: profileName ? 16 : this.charsStart,
            charsEnd: profileName ? 0 : this.charsEnd,
            truncate: profileName ? 'end' : 'middle'
        })}
            </wui-text>

            ${tagVariant && tagLabel
            ? (0,lit/* html */.qy) `<wui-tag variant=${tagVariant} size="xs">${tagLabel}</wui-tag>`
            : null}
          </wui-flex>

          ${description
            ? (0,lit/* html */.qy) `<wui-text variant="tiny-500" color="fg-200">${description}</wui-text>`
            : null}
        </wui-flex>

        ${enableButton ? this.disconnectTemplate() : null}
      </wui-flex>
    `;
    }
    disconnectTemplate() {
        return (0,lit/* html */.qy) `
      <wui-button
        size="xs"
        variant=${this.buttonVariant}
        @click=${this.dispatchDisconnectEvent.bind(this)}
      >
        Disconnect
      </wui-button>
    `;
    }
    dispatchDisconnectEvent() {
        this.dispatchEvent(new CustomEvent('disconnect', { bubbles: true, composed: true }));
    }
    dispatchExternalLinkEvent() {
        this.dispatchEvent(new CustomEvent('externalLink', { bubbles: true, composed: true }));
    }
    dispatchMoreButtonEvent() {
        this.dispatchEvent(new CustomEvent('more', { bubbles: true, composed: true }));
    }
    dispatchCopyEvent() {
        this.dispatchEvent(new CustomEvent('copy', { bubbles: true, composed: true }));
    }
};
WuiActiveProfileWalletItem.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_active_profile_wallet_item_styles];
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "address", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "profileName", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiActiveProfileWalletItem.prototype, "content", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "alt", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "imageSrc", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "icon", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "iconSize", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "iconBadge", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiActiveProfileWalletItem.prototype, "buttonVariant", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiActiveProfileWalletItem.prototype, "enableMoreButton", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsStart", void 0);
wui_active_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiActiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiActiveProfileWalletItem = wui_active_profile_wallet_item_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-active-profile-wallet-item')
], WuiActiveProfileWalletItem);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-active-profile-wallet-item.js

//# sourceMappingURL=wui-active-profile-wallet-item.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-inactive-profile-wallet-item/styles.js

/* harmony default export */ const wui_inactive_profile_wallet_item_styles = ((0,lit/* css */.AH) `
  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-inactive-profile-wallet-item/index.js
var wui_inactive_profile_wallet_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let WuiInactiveProfileWalletItem = class WuiInactiveProfileWalletItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.address = '';
        this.profileName = '';
        this.alt = '';
        this.buttonLabel = '';
        this.buttonVariant = 'accent';
        this.imageSrc = '';
        this.icon = undefined;
        this.iconSize = 'md';
        this.iconBadgeSize = 'md';
        this.rightIcon = 'off';
        this.rightIconSize = 'md';
        this.loading = false;
        this.charsStart = 4;
        this.charsEnd = 6;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex alignItems="center" columnGap="xs">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `;
    }
    imageOrIconTemplate() {
        if (this.icon) {
            return (0,lit/* html */.qy) `
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge
                ? (0,lit/* html */.qy) `<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`
                : null}
          </wui-flex>
        </wui-flex>
      `;
        }
        return (0,lit/* html */.qy) `<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`;
    }
    labelAndDescriptionTemplate() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="small-500" color="fg-100">
          ${UiHelperUtil/* UiHelperUtil */.Z.getTruncateString({
            string: this.profileName || this.address,
            charsStart: this.profileName ? 16 : this.charsStart,
            charsEnd: this.profileName ? 0 : this.charsEnd,
            truncate: this.profileName ? 'end' : 'middle'
        })}
        </wui-text>
      </wui-flex>
    `;
    }
    buttonActionTemplate() {
        return (0,lit/* html */.qy) `
      <wui-flex columnGap="3xs" alignItems="center" justifyContent="center">
        <wui-button
          size="xs"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          iconColor="fg-200"
          size=${this.rightIconSize}
          icon=${this.rightIcon}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `;
    }
    handleButtonClick() {
        this.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true, composed: true }));
    }
    handleIconClick() {
        this.dispatchEvent(new CustomEvent('iconClick', { bubbles: true, composed: true }));
    }
};
WuiInactiveProfileWalletItem.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_inactive_profile_wallet_item_styles];
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "address", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "profileName", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "alt", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "buttonLabel", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "buttonVariant", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "imageSrc", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "icon", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "iconSize", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "iconBadge", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "iconBadgeSize", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "rightIcon", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiInactiveProfileWalletItem.prototype, "rightIconSize", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiInactiveProfileWalletItem.prototype, "loading", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsStart", void 0);
wui_inactive_profile_wallet_item_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiInactiveProfileWalletItem.prototype, "charsEnd", void 0);
WuiInactiveProfileWalletItem = wui_inactive_profile_wallet_item_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-inactive-profile-wallet-item')
], WuiInactiveProfileWalletItem);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-inactive-profile-wallet-item.js

//# sourceMappingURL=wui-inactive-profile-wallet-item.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-separator.js + 2 modules
var wui_separator = __webpack_require__(55618);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js
var src_HelpersUtil = __webpack_require__(35306);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js
var ConnectorUtil = __webpack_require__(56092);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectionUtil.js



const ConnectionUtil = {
    getAuthData(connection) {
        const isAuth = connection.connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH;
        if (!isAuth) {
            return { isAuth: false, icon: undefined, iconSize: undefined, name: undefined };
        }
        const socialProvider = (connection?.auth?.name ??
            StorageUtil/* StorageUtil */.i.getConnectedSocialProvider());
        const socialUsername = (connection?.auth?.username ??
            StorageUtil/* StorageUtil */.i.getConnectedSocialUsername());
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        const email = authConnector?.provider.getEmail() ?? '';
        return {
            isAuth: true,
            icon: socialProvider ?? 'mail',
            iconSize: socialProvider ? 'xl' : 'md',
            name: isAuth
                ? ConnectorUtil/* ConnectorUtil */.g.getAuthName({ email, socialUsername, socialProvider })
                : undefined
        };
    }
};
//# sourceMappingURL=ConnectionUtil.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-profile-wallets-view/styles.js

/* harmony default export */ const w3m_profile_wallets_view_styles = ((0,lit/* css */.AH) `
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: var(--wui-spacing-l);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-separator {
    margin: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  .active-connection {
    padding: var(--wui-spacing-xs);
  }

  .recent-connection {
    padding: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-profile-wallets-view/index.js
var w3m_profile_wallets_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















const w3m_profile_wallets_view_TABS_PADDING = 40;
const w3m_profile_wallets_view_MODAL_MOBILE_VIEW_PX = 430;
const UI_CONFIG = {
    ADDRESS_DISPLAY: { START: 4, END: 6 },
    BADGE: { SIZE: 'md', ICON: 'lightbulb' },
    SCROLL_THRESHOLD: 50,
    OPACITY_RANGE: [0, 1]
};
const NAMESPACE_ICONS = {
    eip155: 'ethereum',
    solana: 'solana',
    bip122: 'bitcoin'
};
const NAMESPACE_TABS = [
    { namespace: 'eip155', icon: NAMESPACE_ICONS.eip155, label: 'EVM' },
    { namespace: 'solana', icon: NAMESPACE_ICONS.solana, label: 'Solana' },
    { namespace: 'bip122', icon: NAMESPACE_ICONS.bip122, label: 'Bitcoin' }
];
const TAB_WIDTHS = { 1: 320, 2: 160, 3: 106 };
const CHAIN_LABELS = {
    eip155: { title: 'Add EVM Wallet', description: 'Add your first EVM wallet' },
    solana: { title: 'Add Solana Wallet', description: 'Add your first Solana wallet' },
    bip122: { title: 'Add Bitcoin Wallet', description: 'Add your first Bitcoin wallet' }
};
let W3mProfileWalletsView = class W3mProfileWalletsView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribers = [];
        this.currentTab = 0;
        this.namespace = ChainController/* ChainController */.W.state.activeChain;
        this.namespaces = Array.from(ChainController/* ChainController */.W.state.chains.keys());
        this.caipAddress = undefined;
        this.profileName = undefined;
        this.activeConnectorIds = ConnectorController/* ConnectorController */.a.state.activeConnectorIds;
        this.lastSelectedAddress = '';
        this.lastSelectedConnectorId = '';
        this.isSwitching = false;
        this.caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.currentTab = this.namespace ? this.namespaces.indexOf(this.namespace) : 0;
        this.caipAddress = ChainController/* ChainController */.W.getAccountData(this.namespace)?.caipAddress;
        this.profileName = ChainController/* ChainController */.W.getAccountData(this.namespace)?.profileName;
        this.unsubscribers.push(...[
            ConnectionController/* ConnectionController */.x.subscribeKey('connections', () => this.requestUpdate()),
            ConnectorController/* ConnectorController */.a.subscribeKey('activeConnectorIds', ids => {
                this.activeConnectorIds = ids;
            }),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => (this.caipNetwork = val))
        ]);
        this.chainListener = ChainController/* ChainController */.W.subscribeChainProp('accountState', accountState => {
            this.caipAddress = accountState?.caipAddress;
            this.profileName = accountState?.profileName;
        }, this.namespace);
    }
    disconnectedCallback() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
        this.resizeObserver?.disconnect();
        this.removeScrollListener();
        this.chainListener?.();
    }
    firstUpdated() {
        const walletListEl = this.shadowRoot?.querySelector('.wallet-list');
        if (!walletListEl) {
            return;
        }
        const handleScroll = () => this.updateScrollOpacity(walletListEl);
        requestAnimationFrame(handleScroll);
        walletListEl.addEventListener('scroll', handleScroll);
        this.resizeObserver = new ResizeObserver(handleScroll);
        this.resizeObserver.observe(walletListEl);
        handleScroll();
    }
    render() {
        const namespace = this.namespace;
        if (!namespace) {
            throw new Error('Namespace is not set');
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']} gap="l">
        ${this.renderTabs()} ${this.renderHeader(namespace)} ${this.renderConnections(namespace)}
        ${this.renderAddConnectionButton(namespace)}
      </wui-flex>
    `;
    }
    renderTabs() {
        const availableTabs = NAMESPACE_TABS.filter(tab => this.namespaces.includes(tab.namespace));
        const tabCount = availableTabs.length;
        const tabWidth = TAB_WIDTHS[tabCount] ?? TAB_WIDTHS[1];
        if (tabCount > 1) {
            return (0,lit/* html */.qy) `
        <wui-tabs
          .onTabChange=${(index) => this.handleTabChange(index)}
          .activeTab=${this.currentTab}
          localTabWidth=${CoreHelperUtil/* CoreHelperUtil */.w.isMobile() && window.innerWidth <= w3m_profile_wallets_view_MODAL_MOBILE_VIEW_PX
                ? `${(window.innerWidth - w3m_profile_wallets_view_TABS_PADDING) / tabCount}px`
                : `${tabWidth}px`}
          .tabs=${availableTabs}
        ></wui-tabs>
      `;
        }
        return null;
    }
    renderHeader(namespace) {
        const connections = this.getActiveConnections(namespace);
        const totalConnections = connections.flatMap(({ accounts }) => accounts).length + (this.caipAddress ? 1 : 0);
        return (0,lit/* html */.qy) `
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${NAMESPACE_ICONS[namespace] ??
            NAMESPACE_ICONS.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${totalConnections > 1 ? 'Wallets' : 'Wallet'}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${totalConnections}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${() => this.handleDisconnectAll(namespace)}
          ?disabled=${!this.hasAnyConnections(namespace)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `;
    }
    renderConnections(namespace) {
        const hasConnections = this.hasAnyConnections(namespace);
        const classes = {
            'wallet-list': true,
            'active-wallets-box': hasConnections,
            'empty-wallet-list-box': !hasConnections
        };
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" class=${(0,class_map/* classMap */.H)(classes)} rowGap="s">
        ${hasConnections
            ? this.renderActiveConnections(namespace)
            : this.renderEmptyState(namespace)}
      </wui-flex>
    `;
    }
    renderActiveConnections(namespace) {
        const connections = this.getActiveConnections(namespace);
        const connectorId = this.activeConnectorIds[namespace];
        const plainAddress = this.getPlainAddress();
        return (0,lit/* html */.qy) `
      ${plainAddress || connectorId || connections.length > 0
            ? (0,lit/* html */.qy) `<wui-flex
            flexDirection="column"
            .padding=${['l', '0', 'xs', '0']}
            class="active-wallets"
          >
            ${this.renderActiveProfile(namespace)} ${this.renderActiveConnectionsList(namespace)}
          </wui-flex>`
            : null}
      ${this.renderRecentConnections(namespace)}
    `;
    }
    renderActiveProfile(namespace) {
        const connectorId = this.activeConnectorIds[namespace];
        if (!connectorId) {
            return null;
        }
        const { connections } = ConnectionControllerUtil/* ConnectionControllerUtil */.b.getConnectionsData(namespace);
        const connector = ConnectorController/* ConnectorController */.a.getConnectorById(connectorId);
        const connectorImage = AssetUtil/* AssetUtil */.$.getConnectorImage(connector);
        const plainAddress = this.getPlainAddress();
        if (!plainAddress) {
            return null;
        }
        const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
        const shouldShowSeparator = this.getActiveConnections(namespace).flatMap(connection => connection.accounts).length > 0;
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 'l', '0', 'l']}>
        <wui-active-profile-wallet-item
          address=${plainAddress}
          alt=${connector?.name}
          .content=${this.getProfileContent({
            address: plainAddress,
            connections,
            connectorId,
            namespace
        })}
          .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
          .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
          .icon=${authData.icon}
          .iconSize=${authData.iconSize}
          .iconBadge=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.ICON : undefined}
          .iconBadgeSize=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.SIZE : undefined}
          imageSrc=${connectorImage}
          ?enableMoreButton=${authData.isAuth}
          @copy=${() => this.handleCopyAddress(plainAddress)}
          @disconnect=${() => this.handleDisconnect(namespace, {})}
          @externalLink=${() => this.handleExternalLink(plainAddress)}
          @more=${() => this.handleMore()}
        ></wui-active-profile-wallet-item>
        ${shouldShowSeparator ? (0,lit/* html */.qy) `<wui-separator></wui-separator>` : null}
      </wui-flex>
    `;
    }
    renderActiveConnectionsList(namespace) {
        const connections = this.getActiveConnections(namespace);
        if (connections.length === 0) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']}>
        ${this.renderConnectionList(connections, false, namespace)}
      </wui-flex>
    `;
    }
    renderRecentConnections(namespace) {
        let { recentConnections } = ConnectionControllerUtil/* ConnectionControllerUtil */.b.getConnectionsData(namespace);
        if (namespace === ConstantsUtil/* ConstantsUtil */.o.CHAIN.BITCOIN) {
            recentConnections = recentConnections.map(connection => ({
                ...connection,
                accounts: connection.accounts.filter(account => typeof account.type === 'string' ? account.type === 'payment' : true)
            }));
        }
        const allAccounts = recentConnections.flatMap(connection => connection.accounts);
        if (allAccounts.length === 0) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${['0', 'xs', '0', 'xs']}>
          ${this.renderConnectionList(recentConnections, true, namespace)}
        </wui-flex>
      </wui-flex>
    `;
    }
    renderConnectionList(connections, isRecentConnections, namespace) {
        return connections
            .filter(connection => connection.accounts.length > 0)
            .map((connection, connectionIdx) => {
            const connector = ConnectorController/* ConnectorController */.a.getConnectorById(connection.connectorId);
            const connectorImage = AssetUtil/* AssetUtil */.$.getConnectorImage(connector) ?? '';
            const authData = ConnectionUtil.getAuthData(connection);
            return connection.accounts.map((account, accountIdx) => {
                const shouldShowSeparator = connectionIdx !== 0 || accountIdx !== 0;
                const isLoading = this.isAccountLoading(connection.connectorId, account.address);
                return (0,lit/* html */.qy) `
            <wui-flex flexDirection="column">
              ${shouldShowSeparator ? (0,lit/* html */.qy) `<wui-separator></wui-separator>` : null}
              <wui-inactive-profile-wallet-item
                address=${account.address}
                alt=${connection.connectorId}
                buttonLabel=${isRecentConnections ? 'Connect' : 'Switch'}
                buttonVariant=${isRecentConnections ? 'neutral' : 'accent'}
                rightIcon=${isRecentConnections ? 'bin' : 'off'}
                rightIconSize="sm"
                class=${isRecentConnections ? 'recent-connection' : 'active-connection'}
                data-testid=${isRecentConnections ? 'recent-connection' : 'active-connection'}
                imageSrc=${connectorImage}
                .iconBadge=${this.isSmartAccount(account.address)
                    ? UI_CONFIG.BADGE.ICON
                    : undefined}
                .iconBadgeSize=${this.isSmartAccount(account.address)
                    ? UI_CONFIG.BADGE.SIZE
                    : undefined}
                .icon=${authData.icon}
                .iconSize=${authData.iconSize}
                .loading=${isLoading}
                .showBalance=${false}
                .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
                .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
                @buttonClick=${() => this.handleSwitchWallet(connection, account.address, namespace)}
                @iconClick=${() => this.handleWalletAction({
                    connection,
                    address: account.address,
                    isRecentConnection: isRecentConnections,
                    namespace
                })}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `;
            });
        });
    }
    renderAddConnectionButton(namespace) {
        if (!this.hasAnyConnections(namespace)) {
            return null;
        }
        const { title } = this.getChainLabelInfo(namespace);
        return (0,lit/* html */.qy) `
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${true}
        @click=${() => this.handleAddConnection(namespace)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${title}</wui-text>
      </wui-list-item>
    `;
    }
    renderEmptyState(namespace) {
        const { title, description } = this.getChainLabelInfo(namespace);
        return (0,lit/* html */.qy) `
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${description}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${() => this.handleAddConnection(namespace)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${title}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
    }
    handleTabChange(index) {
        const nextNamespace = this.namespaces[index];
        if (nextNamespace) {
            this.chainListener?.();
            this.currentTab = this.namespaces.indexOf(nextNamespace);
            this.namespace = nextNamespace;
            this.caipAddress = ChainController/* ChainController */.W.getAccountData(nextNamespace)?.caipAddress;
            this.profileName = ChainController/* ChainController */.W.getAccountData(nextNamespace)?.profileName;
            this.chainListener = ChainController/* ChainController */.W.subscribeChainProp('accountState', accountState => {
                this.caipAddress = accountState?.caipAddress;
            }, nextNamespace);
        }
    }
    handleDisconnectAll(namespace) {
        ConnectionController/* ConnectionController */.x.disconnect({ namespace });
    }
    async handleSwitchWallet(connection, address, namespace) {
        try {
            this.isSwitching = true;
            this.lastSelectedConnectorId = connection.connectorId;
            this.lastSelectedAddress = address;
            await ConnectionController/* ConnectionController */.x.switchConnection({
                connection,
                address,
                namespace,
                closeModalOnConnect: false,
                onChange({ hasSwitchedAccount, hasSwitchedWallet }) {
                    if (hasSwitchedWallet) {
                        SnackController/* SnackController */.P.showSuccess('Wallet switched');
                    }
                    else if (hasSwitchedAccount) {
                        SnackController/* SnackController */.P.showSuccess('Account switched');
                    }
                }
            });
        }
        catch (error) {
            SnackController/* SnackController */.P.showError('Failed to switch wallet');
        }
        finally {
            this.isSwitching = false;
        }
    }
    handleWalletAction(params) {
        const { connection, address, isRecentConnection, namespace } = params;
        if (isRecentConnection) {
            StorageUtil/* StorageUtil */.i.deleteAddressFromConnection({
                connectorId: connection.connectorId,
                address,
                namespace
            });
            SnackController/* SnackController */.P.showSuccess('Wallet deleted');
            this.requestUpdate();
        }
        else {
            this.handleDisconnect(namespace, { id: connection.connectorId });
        }
    }
    async handleDisconnect(namespace, { id }) {
        try {
            await ConnectionController/* ConnectionController */.x.disconnect({ id, namespace });
            SnackController/* SnackController */.P.showSuccess('Wallet disconnected');
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to disconnect wallet');
        }
    }
    handleCopyAddress(address) {
        CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(address);
        SnackController/* SnackController */.P.showSuccess('Address copied');
    }
    handleMore() {
        RouterController/* RouterController */.I.push('AccountSettings');
    }
    handleExternalLink(address) {
        const explorerUrl = this.caipNetwork?.blockExplorers?.default.url;
        if (explorerUrl) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(`${explorerUrl}/address/${address}`, '_blank');
        }
    }
    handleAddConnection(namespace) {
        ConnectorController/* ConnectorController */.a.setFilterByNamespace(namespace);
        RouterController/* RouterController */.I.push('Connect');
    }
    getChainLabelInfo(namespace) {
        return (CHAIN_LABELS[namespace] ?? {
            title: 'Add Wallet',
            description: 'Add your first wallet'
        });
    }
    isSmartAccount(address) {
        if (!this.namespace) {
            return false;
        }
        const { connections, recentConnections } = ConnectionControllerUtil/* ConnectionControllerUtil */.b.getConnectionsData(this.namespace);
        const smartAccountAddresses = [...connections, ...recentConnections]
            .flatMap(connection => connection.accounts)
            .filter(account => account.type === 'smart');
        return smartAccountAddresses.some(account => src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(account.address, address));
    }
    getPlainAddress() {
        return this.caipAddress ? CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress) : undefined;
    }
    getActiveConnections(namespace) {
        const connectorId = this.activeConnectorIds[namespace];
        const { connections } = ConnectionControllerUtil/* ConnectionControllerUtil */.b.getConnectionsData(namespace);
        if (!connectorId) {
            return connections;
        }
        const { address } = this.caipAddress ? ParseUtil/* ParseUtil */.C.parseCaipAddress(this.caipAddress) : {};
        const isBitcoin = namespace === ConstantsUtil/* ConstantsUtil */.o.CHAIN.BITCOIN;
        return ConnectionControllerUtil/* ConnectionControllerUtil */.b.excludeConnectorAddressFromConnections({
            connectorId,
            addresses: address ? [address] : [],
            connections: isBitcoin
                ? ConnectionControllerUtil/* ConnectionControllerUtil */.b.filterConnectionsByAccountType(connections, 'payment')
                : connections
        });
    }
    hasAnyConnections(namespace) {
        const connections = this.getActiveConnections(namespace);
        const { recentConnections } = ConnectionControllerUtil/* ConnectionControllerUtil */.b.getConnectionsData(namespace);
        return Boolean(this.caipAddress) || connections.length > 0 || recentConnections.length > 0;
    }
    isAccountLoading(connectorId, address) {
        return (src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(this.lastSelectedConnectorId, connectorId) &&
            src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(this.lastSelectedAddress, address) &&
            this.isSwitching);
    }
    getProfileContent(params) {
        const { address, connections, connectorId, namespace } = params;
        const [connectedConnection] = connections.filter(connection => src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(connection.connectorId, connectorId));
        if (namespace === ConstantsUtil/* ConstantsUtil */.o.CHAIN.BITCOIN &&
            connectedConnection?.accounts.every(account => typeof account.type === 'string')) {
            return this.getBitcoinProfileContent(connectedConnection.accounts, address);
        }
        const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
        return [
            {
                address,
                tagLabel: 'Active',
                tagVariant: 'success',
                enableButton: true,
                profileName: this.profileName,
                ...(authData.isAuth
                    ? { description: this.isSmartAccount(address) ? 'Smart Account' : 'EOA Account' }
                    : {})
            }
        ];
    }
    getBitcoinProfileContent(accounts, address) {
        const hasMultipleAccounts = accounts.length > 1;
        return accounts.map((account, idx) => ({
            address: account.address,
            tagLabel: src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(account.address, address) ? 'Active' : undefined,
            tagVariant: src_HelpersUtil/* HelpersUtil */.y.isLowerCaseMatch(account.address, address) ? 'success' : undefined,
            enableButton: idx === accounts.length - 1,
            ...(hasMultipleAccounts
                ? { label: account.type?.toUpperCase(), alignItems: 'flex-end' }
                : { alignItems: 'center' })
        }));
    }
    removeScrollListener() {
        const connectEl = this.shadowRoot?.querySelector('.wallet-list');
        if (connectEl) {
            connectEl.removeEventListener('scroll', () => this.handleConnectListScroll());
        }
    }
    handleConnectListScroll() {
        const walletListEl = this.shadowRoot?.querySelector('.wallet-list');
        if (walletListEl) {
            this.updateScrollOpacity(walletListEl);
        }
    }
    updateScrollOpacity(element) {
        element.style.setProperty('--connect-scroll--top-opacity', esm_exports/* MathUtil */.z8.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollTop).toString());
        element.style.setProperty('--connect-scroll--bottom-opacity', esm_exports/* MathUtil */.z8.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollHeight - element.scrollTop - element.offsetHeight).toString());
    }
};
W3mProfileWalletsView.styles = w3m_profile_wallets_view_styles;
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "currentTab", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "namespace", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "namespaces", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "caipAddress", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "profileName", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "activeConnectorIds", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "lastSelectedAddress", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "lastSelectedConnectorId", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "isSwitching", void 0);
w3m_profile_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mProfileWalletsView.prototype, "caipNetwork", void 0);
W3mProfileWalletsView = w3m_profile_wallets_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-profile-wallets-view')
], W3mProfileWalletsView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/lit/directives/ref.js + 1 modules
var ref = __webpack_require__(7610);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-switch/styles.js

/* harmony default export */ const wui_switch_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-switch/index.js
var wui_switch_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiSwitch = class WuiSwitch extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.inputElementRef = (0,ref/* createRef */._)();
        this.checked = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <label>
        <input
          ${(0,ref/* ref */.K)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,if_defined/* ifDefined */.J)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
    }
    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('switchChange', {
            detail: this.inputElementRef.value?.checked,
            bubbles: true,
            composed: true
        }));
    }
};
WuiSwitch.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, ThemeUtil/* colorStyles */.ck, wui_switch_styles];
wui_switch_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiSwitch.prototype, "checked", void 0);
WuiSwitch = wui_switch_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-switch')
], WuiSwitch);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-certified-switch/styles.js

/* harmony default export */ const wui_certified_switch_styles = ((0,lit/* css */.AH) `
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-certified-switch/index.js
var wui_certified_switch_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiCertifiedSwitch = class WuiCertifiedSwitch extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.checked = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,if_defined/* ifDefined */.J)(this.checked)}></wui-switch>
      </button>
    `;
    }
};
WuiCertifiedSwitch.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_certified_switch_styles];
wui_certified_switch_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiCertifiedSwitch.prototype, "checked", void 0);
WuiCertifiedSwitch = wui_certified_switch_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-certified-switch')
], WuiCertifiedSwitch);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-certified-switch.js

//# sourceMappingURL=wui-certified-switch.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-element/styles.js

/* harmony default export */ const wui_input_element_styles = ((0,lit/* css */.AH) `
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-element/index.js
var wui_input_element_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiInputElement = class WuiInputElement extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.icon = 'copy';
    }
    render() {
        return (0,lit/* html */.qy) `
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `;
    }
};
WuiInputElement.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_input_element_styles];
wui_input_element_decorate([
    (0,decorators/* property */.MZ)()
], WuiInputElement.prototype, "icon", void 0);
WuiInputElement = wui_input_element_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-input-element')
], WuiInputElement);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-text/index.js + 1 modules
var wui_input_text = __webpack_require__(98848);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-search-bar/styles.js

/* harmony default export */ const wui_search_bar_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-search-bar/index.js
var wui_search_bar_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiSearchBar = class WuiSearchBar extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.inputComponentRef = (0,ref/* createRef */._)();
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-input-text
        ${(0,ref/* ref */.K)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `;
    }
    clearValue() {
        const inputComponent = this.inputComponentRef.value;
        const inputElement = inputComponent?.inputElementRef.value;
        if (inputElement) {
            inputElement.value = '';
            inputElement.focus();
            inputElement.dispatchEvent(new Event('input'));
        }
    }
};
WuiSearchBar.styles = [ThemeUtil/* resetStyles */.W5, wui_search_bar_styles];
WuiSearchBar = wui_search_bar_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-search-bar')
], WuiSearchBar);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-search-bar.js

//# sourceMappingURL=wui-search-bar.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js
var ApiController = __webpack_require__(88249);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkMd.js
var networkMd = __webpack_require__(27512);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-shimmer/index.js + 1 modules
var wui_shimmer = __webpack_require__(41497);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-card-select-loader/styles.js

/* harmony default export */ const wui_card_select_loader_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-card-select-loader/index.js
var wui_card_select_loader_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiCardSelectLoader = class WuiCardSelectLoader extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.type = 'wallet';
    }
    render() {
        return (0,lit/* html */.qy) `
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `;
    }
    shimmerTemplate() {
        if (this.type === 'network') {
            return (0,lit/* html */.qy) ` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${networkMd/* networkSvgMd */.a}`;
        }
        return (0,lit/* html */.qy) `<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
};
WuiCardSelectLoader.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_card_select_loader_styles];
wui_card_select_loader_decorate([
    (0,decorators/* property */.MZ)()
], WuiCardSelectLoader.prototype, "type", void 0);
WuiCardSelectLoader = wui_card_select_loader_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-card-select-loader')
], WuiCardSelectLoader);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-card-select-loader.js

//# sourceMappingURL=wui-card-select-loader.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-grid/styles.js

/* harmony default export */ const wui_grid_styles = ((0,lit/* css */.AH) `
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-grid/index.js
var wui_grid_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiGrid = class WuiGrid extends lit/* LitElement */.WF {
    render() {
        this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && UiHelperUtil/* UiHelperUtil */.Z.getSpacingStyles(this.margin, 3)};
    `;
        return (0,lit/* html */.qy) `<slot></slot>`;
    }
};
WuiGrid.styles = [ThemeUtil/* resetStyles */.W5, wui_grid_styles];
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "gridTemplateRows", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "gridTemplateColumns", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "justifyItems", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "alignItems", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "justifyContent", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "alignContent", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "columnGap", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "rowGap", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "gap", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "padding", void 0);
wui_grid_decorate([
    (0,decorators/* property */.MZ)()
], WuiGrid.prototype, "margin", void 0);
WuiGrid = wui_grid_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-grid')
], WuiGrid);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-grid.js

//# sourceMappingURL=wui-grid.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js
var WalletUtil = __webpack_require__(65042);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-shimmer.js
var exports_wui_shimmer = __webpack_require__(35090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-wallet-image.js
var exports_wui_wallet_image = __webpack_require__(41684);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list-item/styles.js

/* harmony default export */ const w3m_all_wallets_list_item_styles = ((0,lit/* css */.AH) `
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list-item/index.js
var w3m_all_wallets_list_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mAllWalletsListItem = class W3mAllWalletsListItem extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.observer = new IntersectionObserver(() => undefined);
        this.visible = false;
        this.imageSrc = undefined;
        this.imageLoading = false;
        this.wallet = undefined;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.visible = true;
                    this.fetchImageSrc();
                }
                else {
                    this.visible = false;
                }
            });
        }, { threshold: 0.01 });
    }
    firstUpdated() {
        this.observer.observe(this);
    }
    disconnectedCallback() {
        this.observer.disconnect();
    }
    render() {
        const certified = this.wallet?.badge_type === 'certified';
        return (0,lit/* html */.qy) `
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,if_defined/* ifDefined */.J)(certified ? 'certified' : undefined)}
            >${this.wallet?.name}</wui-text
          >
          ${certified ? (0,lit/* html */.qy) `<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
    }
    imageTemplate() {
        if ((!this.visible && !this.imageSrc) || this.imageLoading) {
            return this.shimmerTemplate();
        }
        return (0,lit/* html */.qy) `
      <wui-wallet-image
        size="md"
        imageSrc=${(0,if_defined/* ifDefined */.J)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
    }
    shimmerTemplate() {
        return (0,lit/* html */.qy) `<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
    async fetchImageSrc() {
        if (!this.wallet) {
            return;
        }
        this.imageSrc = AssetUtil/* AssetUtil */.$.getWalletImage(this.wallet);
        if (this.imageSrc) {
            return;
        }
        this.imageLoading = true;
        this.imageSrc = await AssetUtil/* AssetUtil */.$.fetchWalletImage(this.wallet.image_id);
        this.imageLoading = false;
    }
};
W3mAllWalletsListItem.styles = w3m_all_wallets_list_item_styles;
w3m_all_wallets_list_item_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsListItem.prototype, "visible", void 0);
w3m_all_wallets_list_item_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsListItem.prototype, "imageSrc", void 0);
w3m_all_wallets_list_item_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsListItem.prototype, "imageLoading", void 0);
w3m_all_wallets_list_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mAllWalletsListItem.prototype, "wallet", void 0);
W3mAllWalletsListItem = w3m_all_wallets_list_item_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-all-wallets-list-item')
], W3mAllWalletsListItem);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list/styles.js

/* harmony default export */ const w3m_all_wallets_list_styles = ((0,lit/* css */.AH) `
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-list/index.js
var w3m_all_wallets_list_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










const PAGINATOR_ID = 'local-paginator';
let W3mAllWalletsList = class W3mAllWalletsList extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.paginationObserver = undefined;
        this.loading = !ApiController/* ApiController */.N.state.wallets.length;
        this.wallets = ApiController/* ApiController */.N.state.wallets;
        this.recommended = ApiController/* ApiController */.N.state.recommended;
        this.featured = ApiController/* ApiController */.N.state.featured;
        this.filteredWallets = ApiController/* ApiController */.N.state.filteredWallets;
        this.unsubscribe.push(...[
            ApiController/* ApiController */.N.subscribeKey('wallets', val => (this.wallets = val)),
            ApiController/* ApiController */.N.subscribeKey('recommended', val => (this.recommended = val)),
            ApiController/* ApiController */.N.subscribeKey('featured', val => (this.featured = val)),
            ApiController/* ApiController */.N.subscribeKey('filteredWallets', val => (this.filteredWallets = val))
        ]);
    }
    firstUpdated() {
        this.initialFetch();
        this.createPaginationObserver();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.paginationObserver?.disconnect();
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${['0', 's', 's', 's']}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
    }
    async initialFetch() {
        this.loading = true;
        const gridEl = this.shadowRoot?.querySelector('wui-grid');
        if (gridEl) {
            await ApiController/* ApiController */.N.fetchWalletsByPage({ page: 1 });
            await gridEl.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.loading = false;
            gridEl.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    shimmerTemplate(items, id) {
        return [...Array(items)].map(() => (0,lit/* html */.qy) `
        <wui-card-select-loader type="wallet" id=${(0,if_defined/* ifDefined */.J)(id)}></wui-card-select-loader>
      `);
    }
    walletsTemplate() {
        const wallets = this.filteredWallets?.length > 0
            ? CoreHelperUtil/* CoreHelperUtil */.w.uniqueBy([...this.featured, ...this.recommended, ...this.filteredWallets], 'id')
            : CoreHelperUtil/* CoreHelperUtil */.w.uniqueBy([...this.featured, ...this.recommended, ...this.wallets], 'id');
        const walletsWithInstalled = WalletUtil/* WalletUtil */.A.markWalletsAsInstalled(wallets);
        return walletsWithInstalled.map(wallet => (0,lit/* html */.qy) `
        <w3m-all-wallets-list-item
          @click=${() => this.onConnectWallet(wallet)}
          .wallet=${wallet}
        ></w3m-all-wallets-list-item>
      `);
    }
    paginationLoaderTemplate() {
        const { wallets, recommended, featured, count } = ApiController/* ApiController */.N.state;
        const columns = window.innerWidth < 352 ? 3 : 4;
        const currentWallets = wallets.length + recommended.length;
        const minimumRows = Math.ceil(currentWallets / columns);
        let shimmerCount = minimumRows * columns - currentWallets + columns;
        shimmerCount -= wallets.length ? featured.length % columns : 0;
        if (count === 0 && featured.length > 0) {
            return null;
        }
        if (count === 0 || [...featured, ...wallets, ...recommended].length < count) {
            return this.shimmerTemplate(shimmerCount, PAGINATOR_ID);
        }
        return null;
    }
    createPaginationObserver() {
        const loaderEl = this.shadowRoot?.querySelector(`#${PAGINATOR_ID}`);
        if (loaderEl) {
            this.paginationObserver = new IntersectionObserver(([element]) => {
                if (element?.isIntersecting && !this.loading) {
                    const { page, count, wallets } = ApiController/* ApiController */.N.state;
                    if (wallets.length < count) {
                        ApiController/* ApiController */.N.fetchWalletsByPage({ page: page + 1 });
                    }
                }
            });
            this.paginationObserver.observe(loaderEl);
        }
    }
    onConnectWallet(wallet) {
        ConnectorController/* ConnectorController */.a.selectWalletConnector(wallet);
    }
};
W3mAllWalletsList.styles = w3m_all_wallets_list_styles;
w3m_all_wallets_list_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsList.prototype, "loading", void 0);
w3m_all_wallets_list_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsList.prototype, "wallets", void 0);
w3m_all_wallets_list_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsList.prototype, "recommended", void 0);
w3m_all_wallets_list_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsList.prototype, "featured", void 0);
w3m_all_wallets_list_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsList.prototype, "filteredWallets", void 0);
W3mAllWalletsList = w3m_all_wallets_list_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-all-wallets-list')
], W3mAllWalletsList);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-spinner.js
var exports_wui_loading_spinner = __webpack_require__(93373);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-search/styles.js

/* harmony default export */ const w3m_all_wallets_search_styles = ((0,lit/* css */.AH) `
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-search/index.js
var w3m_all_wallets_search_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mAllWalletsSearch = class W3mAllWalletsSearch extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.prevQuery = '';
        this.prevBadge = undefined;
        this.loading = true;
        this.query = '';
    }
    render() {
        this.onSearch();
        return this.loading
            ? (0,lit/* html */.qy) `<wui-loading-spinner color="accent-100"></wui-loading-spinner>`
            : this.walletsTemplate();
    }
    async onSearch() {
        if (this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) {
            this.prevQuery = this.query;
            this.prevBadge = this.badge;
            this.loading = true;
            await ApiController/* ApiController */.N.searchWallet({ search: this.query, badge: this.badge });
            this.loading = false;
        }
    }
    walletsTemplate() {
        const { search } = ApiController/* ApiController */.N.state;
        const wallets = WalletUtil/* WalletUtil */.A.markWalletsAsInstalled(search);
        if (!search.length) {
            return (0,lit/* html */.qy) `
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
        }
        return (0,lit/* html */.qy) `
      <wui-grid
        data-testid="wallet-list"
        .padding=${['0', 's', 's', 's']}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${wallets.map(wallet => (0,lit/* html */.qy) `
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(wallet)}
              .wallet=${wallet}
              data-testid="wallet-search-item-${wallet.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `;
    }
    onConnectWallet(wallet) {
        ConnectorController/* ConnectorController */.a.selectWalletConnector(wallet);
    }
};
W3mAllWalletsSearch.styles = w3m_all_wallets_search_styles;
w3m_all_wallets_search_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsSearch.prototype, "loading", void 0);
w3m_all_wallets_search_decorate([
    (0,decorators/* property */.MZ)()
], W3mAllWalletsSearch.prototype, "query", void 0);
w3m_all_wallets_search_decorate([
    (0,decorators/* property */.MZ)()
], W3mAllWalletsSearch.prototype, "badge", void 0);
W3mAllWalletsSearch = w3m_all_wallets_search_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-all-wallets-search')
], W3mAllWalletsSearch);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-all-wallets-view/index.js
var w3m_all_wallets_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mAllWalletsView = class W3mAllWalletsView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.search = '';
        this.onDebouncedSearch = CoreHelperUtil/* CoreHelperUtil */.w.debounce((value) => {
            this.search = value;
        });
    }
    render() {
        const isSearch = this.search.length >= 2;
        return (0,lit/* html */.qy) `
      <wui-flex .padding=${['0', 's', 's', 's']} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${isSearch || this.badge
            ? (0,lit/* html */.qy) `<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,if_defined/* ifDefined */.J)(this.badge)}
          ></w3m-all-wallets-search>`
            : (0,lit/* html */.qy) `<w3m-all-wallets-list badge=${(0,if_defined/* ifDefined */.J)(this.badge)}></w3m-all-wallets-list>`}
    `;
    }
    onInputChange(event) {
        this.onDebouncedSearch(event.detail);
    }
    onClick() {
        if (this.badge === 'certified') {
            this.badge = undefined;
            return;
        }
        this.badge = 'certified';
        SnackController/* SnackController */.P.showSvg('Only WalletConnect certified', {
            icon: 'walletConnectBrown',
            iconColor: 'accent-100'
        });
    }
    qrButtonTemplate() {
        if (CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
            return (0,lit/* html */.qy) `
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `;
        }
        return null;
    }
    onWalletConnectQr() {
        RouterController/* RouterController */.I.push('ConnectingWalletConnect');
    }
};
w3m_all_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsView.prototype, "search", void 0);
w3m_all_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsView.prototype, "badge", void 0);
W3mAllWalletsView = w3m_all_wallets_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-all-wallets-view')
], W3mAllWalletsView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@lit/reactive-element/decorators/state.js
var state = __webpack_require__(44290);
;// CONCATENATED MODULE: ./node_modules/lit/decorators/state.js

//# sourceMappingURL=state.js.map

// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsStateController.js
var OptionsStateController = __webpack_require__(51454);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-button/styles.js

/* harmony default export */ const wui_list_button_styles = ((0,lit/* css */.AH) `
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-button/index.js
var wui_list_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiListButton = class WuiListButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.text = '';
        this.disabled = false;
        this.tabIdx = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `;
    }
};
WuiListButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_button_styles];
wui_list_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiListButton.prototype, "text", void 0);
wui_list_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListButton.prototype, "disabled", void 0);
wui_list_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiListButton.prototype, "tabIdx", void 0);
WuiListButton = wui_list_button_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-button')
], WuiListButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-button.js

//# sourceMappingURL=wui-list-button.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js
var src_ConstantsUtil = __webpack_require__(69510);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-email-input.js + 2 modules
var wui_email_input = __webpack_require__(38913);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-email-login-widget/styles.js

/* harmony default export */ const w3m_email_login_widget_styles = ((0,lit/* css */.AH) `
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-email-login-widget/index.js
var w3m_email_login_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let W3mEmailLoginWidget = class W3mEmailLoginWidget extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.formRef = (0,ref/* createRef */._)();
        this.email = '';
        this.loading = false;
        this.error = '';
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    firstUpdated() {
        this.formRef.value?.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.onSubmitEmail(event);
            }
        });
    }
    render() {
        return (0,lit/* html */.qy) `
      <form ${(0,ref/* ref */.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `;
    }
    submitButtonTemplate() {
        const showSubmit = !this.loading && this.email.length > 3;
        return showSubmit
            ? (0,lit/* html */.qy) `
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `
            : null;
    }
    loadingTemplate() {
        return this.loading
            ? (0,lit/* html */.qy) `<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
            : null;
    }
    templateError() {
        if (this.error) {
            return (0,lit/* html */.qy) `<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`;
        }
        return null;
    }
    onEmailInputChange(event) {
        this.email = event.detail.trim();
        this.error = '';
    }
    async onSubmitEmail(event) {
        const isAvailableChain = ConstantsUtil/* ConstantsUtil */.o.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(chain => chain === ChainController/* ChainController */.W.state.activeChain);
        if (!isAvailableChain) {
            const caipNetwork = ChainController/* ChainController */.W.getFirstCaipNetworkSupportsAuthConnector();
            if (caipNetwork) {
                RouterController/* RouterController */.I.push('SwitchNetwork', { network: caipNetwork });
                return;
            }
        }
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            event.preventDefault();
            const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
            if (!authConnector) {
                throw new Error('w3m-email-login-widget: Auth connector not found');
            }
            const { action } = await authConnector.provider.connectEmail({ email: this.email });
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_SUBMITTED' });
            if (action === 'VERIFY_OTP') {
                EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
                RouterController/* RouterController */.I.push('EmailVerifyOtp', { email: this.email });
            }
            else if (action === 'VERIFY_DEVICE') {
                RouterController/* RouterController */.I.push('EmailVerifyDevice', { email: this.email });
            }
            else if (action === 'CONNECT') {
                await ConnectionController/* ConnectionController */.x.connectExternal(authConnector, ChainController/* ChainController */.W.state.activeChain);
                RouterController/* RouterController */.I.replace('Account');
            }
        }
        catch (error) {
            const parsedError = CoreHelperUtil/* CoreHelperUtil */.w.parseError(error);
            if (parsedError?.includes('Invalid email')) {
                this.error = 'Invalid email. Try again.';
            }
            else {
                SnackController/* SnackController */.P.showError(error);
            }
        }
        finally {
            this.loading = false;
        }
    }
    onFocusEvent() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_LOGIN_SELECTED' });
    }
};
W3mEmailLoginWidget.styles = w3m_email_login_widget_styles;
w3m_email_login_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mEmailLoginWidget.prototype, "tabIdx", void 0);
w3m_email_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailLoginWidget.prototype, "email", void 0);
w3m_email_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailLoginWidget.prototype, "loading", void 0);
w3m_email_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailLoginWidget.prototype, "error", void 0);
W3mEmailLoginWidget = w3m_email_login_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-email-login-widget')
], W3mEmailLoginWidget);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-checkbox/index.js + 4 modules
var w3m_legal_checkbox = __webpack_require__(98585);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-footer/index.js + 1 modules
var w3m_legal_footer = __webpack_require__(46524);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AlertController.js
var AlertController = __webpack_require__(71655);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/SocialsUtil.js
var SocialsUtil = __webpack_require__(71801);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-social.js + 2 modules
var wui_list_social = __webpack_require__(77518);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo/index.js + 1 modules
var wui_logo = __webpack_require__(70717);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo-select/styles.js

/* harmony default export */ const wui_logo_select_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo-select/index.js
var wui_logo_select_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiLogoSelect = class WuiLogoSelect extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.logo = 'google';
        this.disabled = false;
        this.tabIdx = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `;
    }
};
WuiLogoSelect.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_logo_select_styles];
wui_logo_select_decorate([
    (0,decorators/* property */.MZ)()
], WuiLogoSelect.prototype, "logo", void 0);
wui_logo_select_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiLogoSelect.prototype, "disabled", void 0);
wui_logo_select_decorate([
    (0,decorators/* property */.MZ)()
], WuiLogoSelect.prototype, "tabIdx", void 0);
WuiLogoSelect = wui_logo_select_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-logo-select')
], WuiLogoSelect);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-logo-select.js

//# sourceMappingURL=wui-logo-select.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameProvider.js + 4 modules
var W3mFrameProvider = __webpack_require__(79835);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-social-login-widget/styles.js

/* harmony default export */ const w3m_social_login_widget_styles = ((0,lit/* css */.AH) `
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-social-login-widget/index.js
var w3m_social_login_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













const MAX_TOP_VIEW = 2;
const MAXIMUM_LENGTH = 6;
let W3mSocialLoginWidget = class W3mSocialLoginWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.walletGuide = 'get-started';
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        this.isPwaLoading = false;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => {
            this.connectors = val;
            this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        }), OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)));
    }
    connectedCallback() {
        super.connectedCallback();
        this.handlePwaFrameLoad();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `;
    }
    topViewTemplate() {
        const isCreateWalletPage = this.walletGuide === 'explore';
        let socials = this.remoteFeatures?.socials;
        if (!socials && isCreateWalletPage) {
            socials = utils_ConstantsUtil/* ConstantsUtil */.oU.DEFAULT_SOCIALS;
            return this.renderTopViewContent(socials);
        }
        if (!socials) {
            return null;
        }
        return this.renderTopViewContent(socials);
    }
    renderTopViewContent(socials) {
        if (socials.length === 2) {
            return (0,lit/* html */.qy) ` <wui-flex gap="xs">
        ${socials.slice(0, MAX_TOP_VIEW).map(social => (0,lit/* html */.qy) `<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
                this.onSocialClick(social);
            }}
              logo=${social}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
      </wui-flex>`;
        }
        return (0,lit/* html */.qy) ` <wui-list-social
      data-testid=${`social-selector-${socials[0]}`}
      @click=${() => {
            this.onSocialClick(socials[0]);
        }}
      logo=${(0,if_defined/* ifDefined */.J)(socials[0])}
      align="center"
      name=${`Continue with ${socials[0]}`}
      tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
      ?disabled=${this.isPwaLoading}
    ></wui-list-social>`;
    }
    bottomViewTemplate() {
        let socials = this.remoteFeatures?.socials;
        const isCreateWalletPage = this.walletGuide === 'explore';
        const isSocialDisabled = !this.authConnector || !socials || socials.length === 0;
        if (isSocialDisabled && isCreateWalletPage) {
            socials = utils_ConstantsUtil/* ConstantsUtil */.oU.DEFAULT_SOCIALS;
        }
        if (!socials) {
            return null;
        }
        if (socials.length <= MAX_TOP_VIEW) {
            return null;
        }
        if (socials && socials.length > MAXIMUM_LENGTH) {
            return (0,lit/* html */.qy) `<wui-flex gap="xs">
        ${socials.slice(1, MAXIMUM_LENGTH - 1).map(social => (0,lit/* html */.qy) `<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
                this.onSocialClick(social);
            }}
              logo=${social}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
              ?focusable=${this.tabIdx !== undefined && this.tabIdx >= 0}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`;
        }
        if (!socials) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-flex gap="xs">
      ${socials.slice(1, socials.length).map(social => (0,lit/* html */.qy) `<wui-logo-select
            data-testid=${`social-selector-${social}`}
            @click=${() => {
            this.onSocialClick(social);
        }}
            logo=${social}
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            ?focusable=${this.tabIdx !== undefined && this.tabIdx >= 0}
            ?disabled=${this.isPwaLoading}
          ></wui-logo-select>`)}
    </wui-flex>`;
    }
    onMoreSocialsClick() {
        RouterController/* RouterController */.I.push('ConnectSocials');
    }
    async onSocialClick(socialProvider) {
        const isAvailableChain = ConstantsUtil/* ConstantsUtil */.o.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(chain => chain === ChainController/* ChainController */.W.state.activeChain);
        if (!isAvailableChain) {
            const caipNetwork = ChainController/* ChainController */.W.getFirstCaipNetworkSupportsAuthConnector();
            if (caipNetwork) {
                RouterController/* RouterController */.I.push('SwitchNetwork', { network: caipNetwork });
                return;
            }
        }
        if (socialProvider) {
            await (0,SocialsUtil/* executeSocialLogin */.Up)(socialProvider);
        }
    }
    async handlePwaFrameLoad() {
        if (CoreHelperUtil/* CoreHelperUtil */.w.isPWA()) {
            this.isPwaLoading = true;
            try {
                if (this.authConnector?.provider instanceof W3mFrameProvider/* W3mFrameProvider */.Y) {
                    await this.authConnector.provider.init();
                }
            }
            catch (error) {
                AlertController/* AlertController */.h.open({
                    shortMessage: 'Error loading embedded wallet in PWA',
                    longMessage: error.message
                }, 'error');
            }
            finally {
                this.isPwaLoading = false;
            }
        }
    }
};
W3mSocialLoginWidget.styles = w3m_social_login_widget_styles;
w3m_social_login_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mSocialLoginWidget.prototype, "walletGuide", void 0);
w3m_social_login_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mSocialLoginWidget.prototype, "tabIdx", void 0);
w3m_social_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mSocialLoginWidget.prototype, "connectors", void 0);
w3m_social_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mSocialLoginWidget.prototype, "remoteFeatures", void 0);
w3m_social_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mSocialLoginWidget.prototype, "authConnector", void 0);
w3m_social_login_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mSocialLoginWidget.prototype, "isPwaLoading", void 0);
W3mSocialLoginWidget = w3m_social_login_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-social-login-widget')
], W3mSocialLoginWidget);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-chip.js + 2 modules
var wui_chip = __webpack_require__(43083);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-guide/styles.js

/* harmony default export */ const w3m_wallet_guide_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-guide/index.js
var w3m_wallet_guide_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mWalletGuide = class W3mWalletGuide extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.walletGuide = 'get-started';
    }
    render() {
        return this.walletGuide === 'explore'
            ? (0,lit/* html */.qy) `<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`
            : (0,lit/* html */.qy) `<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${['s', '0', 's', '0']}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`;
    }
    onGetStarted() {
        RouterController/* RouterController */.I.push('Create');
    }
};
W3mWalletGuide.styles = w3m_wallet_guide_styles;
w3m_wallet_guide_decorate([
    (0,decorators/* property */.MZ)()
], W3mWalletGuide.prototype, "tabIdx", void 0);
w3m_wallet_guide_decorate([
    (0,decorators/* property */.MZ)()
], W3mWalletGuide.prototype, "walletGuide", void 0);
W3mWalletGuide = w3m_wallet_guide_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-guide')
], W3mWalletGuide);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-all-wallets-image/styles.js

/* harmony default export */ const wui_all_wallets_image_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-all-wallets-image/index.js
var wui_all_wallets_image_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









const TOTAL_IMAGES = 4;
let WuiAllWalletsImage = class WuiAllWalletsImage extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.walletImages = [];
    }
    render() {
        const isPlaceholders = this.walletImages.length < TOTAL_IMAGES;
        return (0,lit/* html */.qy) `${this.walletImages
            .slice(0, TOTAL_IMAGES)
            .map(({ src, walletName }) => (0,lit/* html */.qy) `
            <wui-wallet-image
              size="inherit"
              imageSrc=${src}
              name=${(0,if_defined/* ifDefined */.J)(walletName)}
            ></wui-wallet-image>
          `)}
      ${isPlaceholders
            ? [...Array(TOTAL_IMAGES - this.walletImages.length)].map(() => (0,lit/* html */.qy) ` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`)
            : null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`;
    }
};
WuiAllWalletsImage.styles = [ThemeUtil/* resetStyles */.W5, wui_all_wallets_image_styles];
wui_all_wallets_image_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiAllWalletsImage.prototype, "walletImages", void 0);
WuiAllWalletsImage = wui_all_wallets_image_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-all-wallets-image')
], WuiAllWalletsImage);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-wallet/styles.js

/* harmony default export */ const wui_list_wallet_styles = ((0,lit/* css */.AH) `
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-wallet/index.js
var wui_list_wallet_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let WuiListWallet = class WuiListWallet extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.walletImages = [];
        this.imageSrc = '';
        this.name = '';
        this.tabIdx = undefined;
        this.installed = false;
        this.disabled = false;
        this.showAllWallets = false;
        this.loading = false;
        this.loadingSpinnerColor = 'accent-100';
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `;
    }
    templateAllWallets() {
        if (this.showAllWallets && this.imageSrc) {
            return (0,lit/* html */.qy) ` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `;
        }
        else if (this.showAllWallets && this.walletIcon) {
            return (0,lit/* html */.qy) ` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `;
        }
        return null;
    }
    templateWalletImage() {
        if (!this.showAllWallets && this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`;
        }
        else if (!this.showAllWallets && !this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
        }
        return null;
    }
    templateStatus() {
        if (this.loading) {
            return (0,lit/* html */.qy) `<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`;
        }
        else if (this.tagLabel && this.tagVariant) {
            return (0,lit/* html */.qy) `<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`;
        }
        else if (this.icon) {
            return (0,lit/* html */.qy) `<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`;
        }
        return null;
    }
};
WuiListWallet.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_wallet_styles];
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiListWallet.prototype, "walletImages", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "imageSrc", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "name", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "tagLabel", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "tagVariant", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "icon", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "walletIcon", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)()
], WuiListWallet.prototype, "tabIdx", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListWallet.prototype, "installed", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListWallet.prototype, "disabled", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListWallet.prototype, "showAllWallets", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListWallet.prototype, "loading", void 0);
wui_list_wallet_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], WuiListWallet.prototype, "loadingSpinnerColor", void 0);
WuiListWallet = wui_list_wallet_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-wallet')
], WuiListWallet);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-wallet.js

//# sourceMappingURL=wui-list-wallet.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-all-wallets-widget/index.js
var w3m_all_wallets_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mAllWalletsWidget = class W3mAllWalletsWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.count = ApiController/* ApiController */.N.state.count;
        this.filteredCount = ApiController/* ApiController */.N.state.filteredWallets.length;
        this.isFetchingRecommendedWallets = ApiController/* ApiController */.N.state.isFetchingRecommendedWallets;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)), ApiController/* ApiController */.N.subscribeKey('count', val => (this.count = val)), ApiController/* ApiController */.N.subscribeKey('filteredWallets', val => (this.filteredCount = val.length)), ApiController/* ApiController */.N.subscribeKey('isFetchingRecommendedWallets', val => (this.isFetchingRecommendedWallets = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const wcConnector = this.connectors.find(c => c.id === 'walletConnect');
        const { allWallets } = OptionsController/* OptionsController */.H.state;
        if (!wcConnector || allWallets === 'HIDE') {
            return null;
        }
        if (allWallets === 'ONLY_MOBILE' && !CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
            return null;
        }
        const featuredCount = ApiController/* ApiController */.N.state.featured.length;
        const rawCount = this.count + featuredCount;
        const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
        const count = this.filteredCount > 0 ? this.filteredCount : roundedCount;
        let tagLabel = `${count}`;
        if (this.filteredCount > 0) {
            tagLabel = `${this.filteredCount}`;
        }
        else if (count < rawCount) {
            tagLabel = `${count}+`;
        }
        return (0,lit/* html */.qy) `
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets ? 'fg-300' : 'accent-100'}
      ></wui-list-wallet>
    `;
    }
    onAllWallets() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'CLICK_ALL_WALLETS' });
        RouterController/* RouterController */.I.push('AllWallets');
    }
};
w3m_all_wallets_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mAllWalletsWidget.prototype, "tabIdx", void 0);
w3m_all_wallets_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsWidget.prototype, "connectors", void 0);
w3m_all_wallets_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsWidget.prototype, "count", void 0);
w3m_all_wallets_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsWidget.prototype, "filteredCount", void 0);
w3m_all_wallets_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mAllWalletsWidget.prototype, "isFetchingRecommendedWallets", void 0);
W3mAllWalletsWidget = w3m_all_wallets_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-all-wallets-widget')
], W3mAllWalletsWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-announced-widget/index.js
var w3m_connect_announced_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectAnnouncedWidget = class W3mConnectAnnouncedWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const announcedConnectors = this.connectors.filter(connector => connector.type === 'ANNOUNCED');
        if (!announcedConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${announcedConnectors
            .filter(ConnectorUtil/* ConnectorUtil */.g.showConnector)
            .map(connector => (0,lit/* html */.qy) `
              <wui-list-wallet
                imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getConnectorImage(connector))}
                name=${connector.name ?? 'Unknown'}
                @click=${() => this.onConnector(connector)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${connector.id}`}
                .installed=${true}
                tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        if (connector.id === 'walletConnect') {
            if (CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
                RouterController/* RouterController */.I.push('AllWallets');
            }
            else {
                RouterController/* RouterController */.I.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController/* RouterController */.I.push('ConnectingExternal', { connector });
        }
    }
};
w3m_connect_announced_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectAnnouncedWidget.prototype, "tabIdx", void 0);
w3m_connect_announced_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectAnnouncedWidget.prototype, "connectors", void 0);
W3mConnectAnnouncedWidget = w3m_connect_announced_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-announced-widget')
], W3mConnectAnnouncedWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-custom-widget/index.js
var w3m_connect_custom_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mConnectCustomWidget = class W3mConnectCustomWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.loading = false;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)));
        if (CoreHelperUtil/* CoreHelperUtil */.w.isTelegram() && CoreHelperUtil/* CoreHelperUtil */.w.isIos()) {
            this.loading = !ConnectionController/* ConnectionController */.x.state.wcUri;
            this.unsubscribe.push(ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', val => (this.loading = !val)));
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { customWallets } = OptionsController/* OptionsController */.H.state;
        if (!customWallets?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(customWallets);
        return (0,lit/* html */.qy) `<wui-flex flexDirection="column" gap="xs">
      ${wallets.map(wallet => (0,lit/* html */.qy) `
          <wui-list-wallet
            imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(wallet))}
            name=${wallet.name ?? 'Unknown'}
            @click=${() => this.onConnectWallet(wallet)}
            data-testid=${`wallet-selector-${wallet.id}`}
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`;
    }
    filterOutDuplicateWallets(wallets) {
        const recent = StorageUtil/* StorageUtil */.i.getRecentWallets();
        const connectorRDNSs = this.connectors
            .map(connector => connector.info?.rdns)
            .filter(Boolean);
        const recentRDNSs = recent.map(wallet => wallet.rdns).filter(Boolean);
        const allRDNSs = connectorRDNSs.concat(recentRDNSs);
        if (allRDNSs.includes('io.metamask.mobile') && CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
            const index = allRDNSs.indexOf('io.metamask.mobile');
            allRDNSs[index] = 'io.metamask';
        }
        const filtered = wallets.filter(wallet => !allRDNSs.includes(String(wallet?.rdns)));
        return filtered;
    }
    onConnectWallet(wallet) {
        if (this.loading) {
            return;
        }
        RouterController/* RouterController */.I.push('ConnectingWalletConnect', { wallet });
    }
};
w3m_connect_custom_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectCustomWidget.prototype, "tabIdx", void 0);
w3m_connect_custom_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectCustomWidget.prototype, "connectors", void 0);
w3m_connect_custom_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectCustomWidget.prototype, "loading", void 0);
W3mConnectCustomWidget = w3m_connect_custom_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-custom-widget')
], W3mConnectCustomWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-external-widget/index.js
var w3m_connect_external_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let W3mConnectExternalWidget = class W3mConnectExternalWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const externalConnectors = this.connectors.filter(connector => connector.type === 'EXTERNAL');
        const filteredOutExcludedConnectors = externalConnectors.filter(ConnectorUtil/* ConnectorUtil */.g.showConnector);
        const filteredOutCoinbaseConnectors = filteredOutExcludedConnectors.filter(connector => connector.id !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.COINBASE_SDK);
        if (!filteredOutCoinbaseConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${filteredOutCoinbaseConnectors.map(connector => (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              data-testid=${`wallet-selector-external-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        RouterController/* RouterController */.I.push('ConnectingExternal', { connector });
    }
};
w3m_connect_external_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectExternalWidget.prototype, "tabIdx", void 0);
w3m_connect_external_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectExternalWidget.prototype, "connectors", void 0);
W3mConnectExternalWidget = w3m_connect_external_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-external-widget')
], W3mConnectExternalWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-featured-widget/index.js
var w3m_connect_featured_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mConnectFeaturedWidget = class W3mConnectFeaturedWidget extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.wallets = [];
    }
    render() {
        if (!this.wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(wallet => (0,lit/* html */.qy) `
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${wallet.id}`}
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(wallet))}
              name=${wallet.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        ConnectorController/* ConnectorController */.a.selectWalletConnector(wallet);
    }
};
w3m_connect_featured_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectFeaturedWidget.prototype, "tabIdx", void 0);
w3m_connect_featured_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectFeaturedWidget.prototype, "wallets", void 0);
W3mConnectFeaturedWidget = w3m_connect_featured_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-featured-widget')
], W3mConnectFeaturedWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-injected-widget/index.js
var w3m_connect_injected_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectInjectedWidget = class W3mConnectInjectedWidget extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.connectors = [];
    }
    render() {
        const injectedConnectors = this.connectors.filter(ConnectorUtil/* ConnectorUtil */.g.showConnector);
        if (injectedConnectors.length === 0) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${injectedConnectors.map(connector => (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        ConnectorController/* ConnectorController */.a.setActiveConnector(connector);
        RouterController/* RouterController */.I.push('ConnectingExternal', { connector });
    }
};
w3m_connect_injected_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectInjectedWidget.prototype, "tabIdx", void 0);
w3m_connect_injected_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectInjectedWidget.prototype, "connectors", void 0);
W3mConnectInjectedWidget = w3m_connect_injected_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-injected-widget')
], W3mConnectInjectedWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-multi-chain-widget/index.js
var w3m_connect_multi_chain_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mConnectMultiChainWidget = class W3mConnectMultiChainWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const multiChainConnectors = this.connectors.filter(connector => connector.type === 'MULTI_CHAIN' && connector.name !== 'WalletConnect');
        if (!multiChainConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${multiChainConnectors.map(connector => (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        ConnectorController/* ConnectorController */.a.setActiveConnector(connector);
        RouterController/* RouterController */.I.push('ConnectingMultiChain');
    }
};
w3m_connect_multi_chain_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectMultiChainWidget.prototype, "tabIdx", void 0);
w3m_connect_multi_chain_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectMultiChainWidget.prototype, "connectors", void 0);
W3mConnectMultiChainWidget = w3m_connect_multi_chain_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-multi-chain-widget')
], W3mConnectMultiChainWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recent-widget/index.js
var w3m_connect_recent_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectRecentWidget = class W3mConnectRecentWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.loading = false;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)));
        if (CoreHelperUtil/* CoreHelperUtil */.w.isTelegram() && CoreHelperUtil/* CoreHelperUtil */.w.isIos()) {
            this.loading = !ConnectionController/* ConnectionController */.x.state.wcUri;
            this.unsubscribe.push(ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', val => (this.loading = !val)));
        }
    }
    render() {
        const recentWallets = StorageUtil/* StorageUtil */.i.getRecentWallets();
        const filteredRecentWallets = recentWallets
            .filter(wallet => !WalletUtil/* WalletUtil */.A.isExcluded(wallet))
            .filter(wallet => !this.hasWalletConnector(wallet))
            .filter(wallet => this.isWalletCompatibleWithCurrentChain(wallet));
        if (!filteredRecentWallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${filteredRecentWallets.map(wallet => (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(wallet))}
              name=${wallet.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        if (this.loading) {
            return;
        }
        ConnectorController/* ConnectorController */.a.selectWalletConnector(wallet);
    }
    hasWalletConnector(wallet) {
        return this.connectors.some(connector => connector.id === wallet.id || connector.name === wallet.name);
    }
    isWalletCompatibleWithCurrentChain(wallet) {
        const currentNamespace = ChainController/* ChainController */.W.state.activeChain;
        if (currentNamespace && wallet.chains) {
            return wallet.chains.some(c => {
                const chainNamespace = c.split(':')[0];
                return currentNamespace === chainNamespace;
            });
        }
        return true;
    }
};
w3m_connect_recent_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectRecentWidget.prototype, "tabIdx", void 0);
w3m_connect_recent_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectRecentWidget.prototype, "connectors", void 0);
w3m_connect_recent_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectRecentWidget.prototype, "loading", void 0);
W3mConnectRecentWidget = w3m_connect_recent_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-recent-widget')
], W3mConnectRecentWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-recommended-widget/index.js
var w3m_connect_recommended_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectRecommendedWidget = class W3mConnectRecommendedWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.wallets = [];
        this.loading = false;
        if (CoreHelperUtil/* CoreHelperUtil */.w.isTelegram() && CoreHelperUtil/* CoreHelperUtil */.w.isIos()) {
            this.loading = !ConnectionController/* ConnectionController */.x.state.wcUri;
            this.unsubscribe.push(ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', val => (this.loading = !val)));
        }
    }
    render() {
        const { connectors } = ConnectorController/* ConnectorController */.a.state;
        const { customWallets, featuredWalletIds } = OptionsController/* OptionsController */.H.state;
        const recentWallets = StorageUtil/* StorageUtil */.i.getRecentWallets();
        const wcConnector = connectors.find(c => c.id === 'walletConnect');
        const injectedConnectors = connectors.filter(c => c.type === 'INJECTED' || c.type === 'ANNOUNCED' || c.type === 'MULTI_CHAIN');
        const injectedWallets = injectedConnectors.filter(i => i.name !== 'Browser Wallet');
        if (!wcConnector) {
            return null;
        }
        if (featuredWalletIds || customWallets || !this.wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const overrideLength = injectedWallets.length + recentWallets.length;
        const maxRecommended = Math.max(0, 2 - overrideLength);
        const wallets = WalletUtil/* WalletUtil */.A.filterOutDuplicateWallets(this.wallets).slice(0, maxRecommended);
        if (!wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        ${wallets.map(wallet => (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(wallet))}
              name=${wallet?.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
              tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        if (this.loading) {
            return;
        }
        const connector = ConnectorController/* ConnectorController */.a.getConnector(wallet.id, wallet.rdns);
        if (connector) {
            RouterController/* RouterController */.I.push('ConnectingExternal', { connector });
        }
        else {
            RouterController/* RouterController */.I.push('ConnectingWalletConnect', { wallet });
        }
    }
};
w3m_connect_recommended_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectRecommendedWidget.prototype, "tabIdx", void 0);
w3m_connect_recommended_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectRecommendedWidget.prototype, "wallets", void 0);
w3m_connect_recommended_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectRecommendedWidget.prototype, "loading", void 0);
W3mConnectRecommendedWidget = w3m_connect_recommended_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-recommended-widget')
], W3mConnectRecommendedWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connect-walletconnect-widget/index.js
var w3m_connect_walletconnect_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mConnectWalletConnectWidget = class W3mConnectWalletConnectWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.connectorImages = AssetController/* AssetController */.j.state.connectorImages;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)), AssetController/* AssetController */.j.subscribeKey('connectorImages', val => (this.connectorImages = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
            this.style.cssText = `display: none`;
            return null;
        }
        const connector = this.connectors.find(c => c.id === 'walletConnect');
        if (!connector) {
            this.style.cssText = `display: none`;
            return null;
        }
        const connectorImage = connector.imageUrl || this.connectorImages[connector?.imageId ?? ''];
        return (0,lit/* html */.qy) `
      <wui-list-wallet
        imageSrc=${(0,if_defined/* ifDefined */.J)(connectorImage)}
        name=${connector.name ?? 'Unknown'}
        @click=${() => this.onConnector(connector)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `;
    }
    onConnector(connector) {
        ConnectorController/* ConnectorController */.a.setActiveConnector(connector);
        RouterController/* RouterController */.I.push('ConnectingWalletConnect');
    }
};
w3m_connect_walletconnect_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectWalletConnectWidget.prototype, "tabIdx", void 0);
w3m_connect_walletconnect_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectWalletConnectWidget.prototype, "connectors", void 0);
w3m_connect_walletconnect_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectWalletConnectWidget.prototype, "connectorImages", void 0);
W3mConnectWalletConnectWidget = w3m_connect_walletconnect_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-walletconnect-widget')
], W3mConnectWalletConnectWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connector-list/styles.js

/* harmony default export */ const w3m_connector_list_styles = ((0,lit/* css */.AH) `
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connector-list/index.js
var w3m_connector_list_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















let W3mConnectorList = class W3mConnectorList extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tabIdx = undefined;
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.recommended = ApiController/* ApiController */.N.state.recommended;
        this.featured = ApiController/* ApiController */.N.state.featured;
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => (this.connectors = val)), ApiController/* ApiController */.N.subscribeKey('recommended', val => (this.recommended = val)), ApiController/* ApiController */.N.subscribeKey('featured', val => (this.featured = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `;
    }
    connectorListTemplate() {
        const { custom, recent, announced, injected, multiChain, recommended, featured, external } = ConnectorUtil/* ConnectorUtil */.g.getConnectorsByType(this.connectors, this.recommended, this.featured);
        const connectorTypeOrder = ConnectorUtil/* ConnectorUtil */.g.getConnectorTypeOrder({
            custom,
            recent,
            announced,
            injected,
            multiChain,
            recommended,
            featured,
            external
        });
        return connectorTypeOrder.map(type => {
            switch (type) {
                case 'injected':
                    return (0,lit/* html */.qy) `
            ${multiChain.length
                        ? (0,lit/* html */.qy) `<w3m-connect-multi-chain-widget
                  tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`
                        : null}
            ${announced.length
                        ? (0,lit/* html */.qy) `<w3m-connect-announced-widget
                  tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
                ></w3m-connect-announced-widget>`
                        : null}
            ${injected.length
                        ? (0,lit/* html */.qy) `<w3m-connect-injected-widget
                  .connectors=${injected}
                  tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
                ></w3m-connect-injected-widget>`
                        : null}
          `;
                case 'walletConnect':
                    return (0,lit/* html */.qy) `<w3m-connect-walletconnect-widget
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;
                case 'recent':
                    return (0,lit/* html */.qy) `<w3m-connect-recent-widget
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;
                case 'featured':
                    return (0,lit/* html */.qy) `<w3m-connect-featured-widget
            .wallets=${featured}
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;
                case 'custom':
                    return (0,lit/* html */.qy) `<w3m-connect-custom-widget
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;
                case 'external':
                    return (0,lit/* html */.qy) `<w3m-connect-external-widget
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-external-widget>`;
                case 'recommended':
                    return (0,lit/* html */.qy) `<w3m-connect-recommended-widget
            .wallets=${recommended}
            tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;
                default:
                    console.warn(`Unknown connector type: ${type}`);
                    return null;
            }
        });
    }
};
W3mConnectorList.styles = w3m_connector_list_styles;
w3m_connector_list_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectorList.prototype, "tabIdx", void 0);
w3m_connector_list_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectorList.prototype, "connectors", void 0);
w3m_connector_list_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectorList.prototype, "recommended", void 0);
w3m_connector_list_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectorList.prototype, "featured", void 0);
W3mConnectorList = w3m_connector_list_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connector-list')
], W3mConnectorList);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-login-list/index.js
var w3m_wallet_login_list_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let W3mWalletLoginList = class W3mWalletLoginList extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `;
    }
};
w3m_wallet_login_list_decorate([
    (0,decorators/* property */.MZ)()
], W3mWalletLoginList.prototype, "tabIdx", void 0);
W3mWalletLoginList = w3m_wallet_login_list_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-login-list')
], W3mWalletLoginList);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-view/styles.js

/* harmony default export */ const w3m_connect_view_styles = ((0,lit/* css */.AH) `
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-view/index.js
var w3m_connect_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















const SCROLL_THRESHOLD = 470;
let W3mConnectView = class W3mConnectView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        this.authConnector = this.connectors.find(c => c.type === 'AUTH');
        this.features = OptionsController/* OptionsController */.H.state.features;
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.enableWallets = OptionsController/* OptionsController */.H.state.enableWallets;
        this.noAdapters = ChainController/* ChainController */.W.state.noAdapters;
        this.walletGuide = 'get-started';
        this.checked = OptionsStateController/* OptionsStateController */.o.state.isLegalCheckboxChecked;
        this.isEmailEnabled = this.remoteFeatures?.email && !ChainController/* ChainController */.W.state.noAdapters;
        this.isSocialEnabled = this.remoteFeatures?.socials &&
            this.remoteFeatures.socials.length > 0 &&
            !ChainController/* ChainController */.W.state.noAdapters;
        this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        this.unsubscribe.push(ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => {
            this.connectors = val;
            this.authConnector = this.connectors.find(c => c.type === 'AUTH');
            this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        }), OptionsController/* OptionsController */.H.subscribeKey('features', val => {
            this.features = val;
        }), OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => {
            this.remoteFeatures = val;
            this.setEmailAndSocialEnableCheck(this.noAdapters, this.remoteFeatures);
        }), OptionsController/* OptionsController */.H.subscribeKey('enableWallets', val => (this.enableWallets = val)), ChainController/* ChainController */.W.subscribeKey('noAdapters', val => this.setEmailAndSocialEnableCheck(val, this.remoteFeatures)), OptionsStateController/* OptionsStateController */.o.subscribeKey('isLegalCheckboxChecked', val => (this.checked = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.resizeObserver?.disconnect();
        const connectEl = this.shadowRoot?.querySelector('.connect');
        connectEl?.removeEventListener('scroll', this.handleConnectListScroll.bind(this));
    }
    firstUpdated() {
        const connectEl = this.shadowRoot?.querySelector('.connect');
        if (connectEl) {
            requestAnimationFrame(this.handleConnectListScroll.bind(this));
            connectEl?.addEventListener('scroll', this.handleConnectListScroll.bind(this));
            this.resizeObserver = new ResizeObserver(() => {
                this.handleConnectListScroll();
            });
            this.resizeObserver?.observe(connectEl);
            this.handleConnectListScroll();
        }
    }
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController/* OptionsController */.H.state;
        const isLegalCheckbox = OptionsController/* OptionsController */.H.state.features?.legalCheckbox;
        const legalUrl = termsConditionsUrl || privacyPolicyUrl;
        const isShowLegalCheckbox = Boolean(legalUrl) && Boolean(isLegalCheckbox) && this.walletGuide === 'get-started';
        const isDisabled = isShowLegalCheckbox && !this.checked;
        const classes = {
            connect: true,
            disabled: isDisabled
        };
        const isEnableWalletGuide = OptionsController/* OptionsController */.H.state.enableWalletGuide;
        const isEnableWallets = this.enableWallets;
        const socialOrEmailLoginEnabled = this.isSocialEnabled || this.authConnector;
        const tabIndex = isDisabled ? -1 : undefined;
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${(0,class_map/* classMap */.H)(classes)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${socialOrEmailLoginEnabled &&
            isEnableWallets &&
            isEnableWalletGuide &&
            this.walletGuide === 'get-started'
            ? ['3xs', 's', '0', 's']
            : ['3xs', 's', 's', 's']}
          >
            ${this.renderConnectMethod(tabIndex)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(isDisabled)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `;
    }
    setEmailAndSocialEnableCheck(noAdapters, remoteFeatures) {
        this.isEmailEnabled = remoteFeatures?.email && !noAdapters;
        this.isSocialEnabled =
            remoteFeatures?.socials && remoteFeatures.socials.length > 0 && !noAdapters;
        this.remoteFeatures = remoteFeatures;
        this.noAdapters = noAdapters;
    }
    checkIfAuthEnabled(connectors) {
        const namespacesWithAuthConnector = connectors
            .filter(c => c.type === src_ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_TYPE_AUTH)
            .map(i => i.chain);
        const authSupportedNamespaces = ConstantsUtil/* ConstantsUtil */.o.AUTH_CONNECTOR_SUPPORTED_CHAINS;
        return authSupportedNamespaces.some(ns => namespacesWithAuthConnector.includes(ns));
    }
    renderConnectMethod(tabIndex) {
        const connectMethodsOrder = WalletUtil/* WalletUtil */.A.getConnectOrderMethod(this.features, this.connectors);
        return (0,lit/* html */.qy) `${connectMethodsOrder.map((method, index) => {
            switch (method) {
                case 'email':
                    return (0,lit/* html */.qy) `${this.emailTemplate(tabIndex)} ${this.separatorTemplate(index, 'email')}`;
                case 'social':
                    return (0,lit/* html */.qy) `${this.socialListTemplate(tabIndex)}
          ${this.separatorTemplate(index, 'social')}`;
                case 'wallet':
                    return (0,lit/* html */.qy) `${this.walletListTemplate(tabIndex)}
          ${this.separatorTemplate(index, 'wallet')}`;
                default:
                    return null;
            }
        })}`;
    }
    checkMethodEnabled(name) {
        switch (name) {
            case 'wallet':
                return this.enableWallets;
            case 'social':
                return this.isSocialEnabled && this.isAuthEnabled;
            case 'email':
                return this.isEmailEnabled && this.isAuthEnabled;
            default:
                return null;
        }
    }
    checkIsThereNextMethod(currentIndex) {
        const connectMethodsOrder = WalletUtil/* WalletUtil */.A.getConnectOrderMethod(this.features, this.connectors);
        const nextMethod = connectMethodsOrder[currentIndex + 1];
        if (!nextMethod) {
            return undefined;
        }
        const isNextMethodEnabled = this.checkMethodEnabled(nextMethod);
        if (isNextMethodEnabled) {
            return nextMethod;
        }
        return this.checkIsThereNextMethod(currentIndex + 1);
    }
    separatorTemplate(index, type) {
        const nextEnabledMethod = this.checkIsThereNextMethod(index);
        const isExplore = this.walletGuide === 'explore';
        switch (type) {
            case 'wallet': {
                const isWalletEnable = this.enableWallets;
                return isWalletEnable && nextEnabledMethod && !isExplore
                    ? (0,lit/* html */.qy) `<wui-separator data-testid="wui-separator" text="or"></wui-separator>`
                    : null;
            }
            case 'email': {
                const isNextMethodSocial = nextEnabledMethod === 'social';
                return this.isAuthEnabled && this.isEmailEnabled && !isNextMethodSocial && nextEnabledMethod
                    ? (0,lit/* html */.qy) `<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`
                    : null;
            }
            case 'social': {
                const isNextMethodEmail = nextEnabledMethod === 'email';
                return this.isAuthEnabled && this.isSocialEnabled && !isNextMethodEmail && nextEnabledMethod
                    ? (0,lit/* html */.qy) `<wui-separator data-testid="wui-separator" text="or"></wui-separator>`
                    : null;
            }
            default:
                return null;
        }
    }
    emailTemplate(tabIndex) {
        if (!this.isEmailEnabled || !this.isAuthEnabled) {
            return null;
        }
        return (0,lit/* html */.qy) `<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}
    ></w3m-email-login-widget>`;
    }
    socialListTemplate(tabIndex) {
        if (!this.isSocialEnabled || !this.isAuthEnabled) {
            return null;
        }
        return (0,lit/* html */.qy) `<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}
    ></w3m-social-login-widget>`;
    }
    walletListTemplate(tabIndex) {
        const isEnableWallets = this.enableWallets;
        const isCollapseWalletsOldProp = this.features?.emailShowWallets === false;
        const isCollapseWallets = this.features?.collapseWallets;
        const shouldCollapseWallets = isCollapseWalletsOldProp || isCollapseWallets;
        if (!isEnableWallets) {
            return null;
        }
        if (CoreHelperUtil/* CoreHelperUtil */.w.isTelegram() && (CoreHelperUtil/* CoreHelperUtil */.w.isSafari() || CoreHelperUtil/* CoreHelperUtil */.w.isIos())) {
            ConnectionController/* ConnectionController */.x.connectWalletConnect().catch(_e => ({}));
        }
        if (this.walletGuide === 'explore') {
            return null;
        }
        const hasOtherMethods = this.isAuthEnabled && (this.isEmailEnabled || this.isSocialEnabled);
        if (hasOtherMethods && shouldCollapseWallets) {
            return (0,lit/* html */.qy) `<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`;
        }
        return (0,lit/* html */.qy) `<w3m-wallet-login-list tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}></w3m-wallet-login-list>`;
    }
    guideTemplate(disabled = false) {
        const isEnableWalletGuide = OptionsController/* OptionsController */.H.state.enableWalletGuide;
        if (!isEnableWalletGuide) {
            return null;
        }
        const classes = {
            guide: true,
            disabled
        };
        const tabIndex = disabled ? -1 : undefined;
        if (!this.authConnector && !this.isSocialEnabled) {
            return null;
        }
        return (0,lit/* html */.qy) `
      ${this.walletGuide === 'explore' && !ChainController/* ChainController */.W.state.noAdapters
            ? (0,lit/* html */.qy) `<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`
            : null}
      <w3m-wallet-guide
        class=${(0,class_map/* classMap */.H)(classes)}
        tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `;
    }
    legalCheckboxTemplate() {
        if (this.walletGuide === 'explore') {
            return null;
        }
        return (0,lit/* html */.qy) `<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`;
    }
    handleConnectListScroll() {
        const connectEl = this.shadowRoot?.querySelector('.connect');
        if (!connectEl) {
            return;
        }
        const shouldApplyMask = connectEl.scrollHeight > SCROLL_THRESHOLD;
        if (shouldApplyMask) {
            connectEl.style.setProperty('--connect-mask-image', `linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`);
            connectEl.style.setProperty('--connect-scroll--top-opacity', esm_exports/* MathUtil */.z8.interpolate([0, 50], [0, 1], connectEl.scrollTop).toString());
            connectEl.style.setProperty('--connect-scroll--bottom-opacity', esm_exports/* MathUtil */.z8.interpolate([0, 50], [0, 1], connectEl.scrollHeight - connectEl.scrollTop - connectEl.offsetHeight).toString());
        }
        else {
            connectEl.style.setProperty('--connect-mask-image', 'none');
            connectEl.style.setProperty('--connect-scroll--top-opacity', '0');
            connectEl.style.setProperty('--connect-scroll--bottom-opacity', '0');
        }
    }
    onContinueWalletClick() {
        RouterController/* RouterController */.I.push('ConnectWallets');
    }
};
W3mConnectView.styles = w3m_connect_view_styles;
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "connectors", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "authConnector", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "features", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "remoteFeatures", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "enableWallets", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "noAdapters", void 0);
w3m_connect_view_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectView.prototype, "walletGuide", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "checked", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "isEmailEnabled", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "isSocialEnabled", void 0);
w3m_connect_view_decorate([
    (0,state/* state */.w)()
], W3mConnectView.prototype, "isAuthEnabled", void 0);
W3mConnectView = w3m_connect_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-view')
], W3mConnectView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var ThemeController = __webpack_require__(68996);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-thumbnail.js + 2 modules
var wui_loading_thumbnail = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/index.js + 1 modules
var wui_chip_button = __webpack_require__(85999);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-cta-button/styles.js

/* harmony default export */ const wui_cta_button_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-cta-button/index.js
var wui_cta_button_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiCtaButton = class WuiCtaButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.label = '';
        this.buttonLabel = '';
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${['1xs', '2l', '1xs', '2l']}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `;
    }
};
WuiCtaButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_cta_button_styles];
wui_cta_button_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiCtaButton.prototype, "disabled", void 0);
wui_cta_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiCtaButton.prototype, "label", void 0);
wui_cta_button_decorate([
    (0,decorators/* property */.MZ)()
], WuiCtaButton.prototype, "buttonLabel", void 0);
WuiCtaButton = wui_cta_button_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-cta-button')
], WuiCtaButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-cta-button.js

//# sourceMappingURL=wui-cta-button.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-mobile-download-links/styles.js

/* harmony default export */ const w3m_mobile_download_links_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-mobile-download-links/index.js
var w3m_mobile_download_links_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mMobileDownloadLinks = class W3mMobileDownloadLinks extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.wallet = undefined;
    }
    render() {
        if (!this.wallet) {
            this.style.display = 'none';
            return null;
        }
        const { name, app_store, play_store, chrome_store, homepage } = this.wallet;
        const isMobile = CoreHelperUtil/* CoreHelperUtil */.w.isMobile();
        const isIos = CoreHelperUtil/* CoreHelperUtil */.w.isIos();
        const isAndroid = CoreHelperUtil/* CoreHelperUtil */.w.isAndroid();
        const isMultiple = [app_store, play_store, homepage, chrome_store].filter(Boolean).length > 1;
        const shortName = esm_exports/* UiHelperUtil */.Zv.getTruncateString({
            string: name,
            charsStart: 12,
            charsEnd: 0,
            truncate: 'end'
        });
        if (isMultiple && !isMobile) {
            return (0,lit/* html */.qy) `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${() => RouterController/* RouterController */.I.push('Downloads', { wallet: this.wallet })}
        ></wui-cta-button>
      `;
        }
        if (!isMultiple && homepage) {
            return (0,lit/* html */.qy) `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `;
        }
        if (app_store && isIos) {
            return (0,lit/* html */.qy) `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `;
        }
        if (play_store && isAndroid) {
            return (0,lit/* html */.qy) `
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `;
        }
        this.style.display = 'none';
        return null;
    }
    onAppStore() {
        if (this.wallet?.app_store) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.app_store, '_blank');
        }
    }
    onPlayStore() {
        if (this.wallet?.play_store) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.play_store, '_blank');
        }
    }
    onHomePage() {
        if (this.wallet?.homepage) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.homepage, '_blank');
        }
    }
};
W3mMobileDownloadLinks.styles = [w3m_mobile_download_links_styles];
w3m_mobile_download_links_decorate([
    (0,decorators/* property */.MZ)({ type: Object })
], W3mMobileDownloadLinks.prototype, "wallet", void 0);
W3mMobileDownloadLinks = w3m_mobile_download_links_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-mobile-download-links')
], W3mMobileDownloadLinks);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-connecting-widget/styles.js

/* harmony default export */ const w3m_connecting_widget_styles = ((0,lit/* css */.AH) `
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-connecting-widget/index.js
var w3m_connecting_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














class W3mConnectingWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.wallet = RouterController/* RouterController */.I.state.data?.wallet;
        this.connector = RouterController/* RouterController */.I.state.data?.connector;
        this.timeout = undefined;
        this.secondaryBtnIcon = 'refresh';
        this.onConnect = undefined;
        this.onRender = undefined;
        this.onAutoConnect = undefined;
        this.isWalletConnect = true;
        this.unsubscribe = [];
        this.imageSrc = AssetUtil/* AssetUtil */.$.getWalletImage(this.wallet) ?? AssetUtil/* AssetUtil */.$.getConnectorImage(this.connector);
        this.name = this.wallet?.name ?? this.connector?.name ?? 'Wallet';
        this.isRetrying = false;
        this.uri = ConnectionController/* ConnectionController */.x.state.wcUri;
        this.error = ConnectionController/* ConnectionController */.x.state.wcError;
        this.ready = false;
        this.showRetry = false;
        this.secondaryBtnLabel = 'Try again';
        this.secondaryLabel = 'Accept connection request in the wallet';
        this.isLoading = false;
        this.isMobile = false;
        this.onRetry = undefined;
        this.unsubscribe.push(...[
            ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', val => {
                this.uri = val;
                if (this.isRetrying && this.onRetry) {
                    this.isRetrying = false;
                    this.onConnect?.();
                }
            }),
            ConnectionController/* ConnectionController */.x.subscribeKey('wcError', val => (this.error = val))
        ]);
        if ((CoreHelperUtil/* CoreHelperUtil */.w.isTelegram() || CoreHelperUtil/* CoreHelperUtil */.w.isSafari()) &&
            CoreHelperUtil/* CoreHelperUtil */.w.isIos() &&
            ConnectionController/* ConnectionController */.x.state.wcUri) {
            this.onConnect?.();
        }
    }
    firstUpdated() {
        this.onAutoConnect?.();
        this.showRetry = !this.onAutoConnect;
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        ConnectionController/* ConnectionController */.x.setWcError(false);
        clearTimeout(this.timeout);
    }
    render() {
        this.onRender?.();
        this.onShowRetry();
        const subLabel = this.error
            ? 'Connection can be declined if a previous request is still active'
            : this.secondaryLabel;
        let label = `Continue in ${this.name}`;
        if (this.error) {
            label = 'Connection declined';
        }
        return (0,lit/* html */.qy) `
      <wui-flex
        data-error=${(0,if_defined/* ifDefined */.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,if_defined/* ifDefined */.J)(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error ? 'error-100' : 'fg-100'}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${subLabel}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel
            ? (0,lit/* html */.qy) `
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying || this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `
            : null}
      </wui-flex>

      ${this.isWalletConnect
            ? (0,lit/* html */.qy) `
            <wui-flex .padding=${['0', 'xl', 'xl', 'xl']} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `
            : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
    onShowRetry() {
        if (this.error && !this.showRetry) {
            this.showRetry = true;
            const retryButton = this.shadowRoot?.querySelector('wui-button');
            retryButton?.animate([{ opacity: 0 }, { opacity: 1 }], {
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    onTryAgain() {
        ConnectionController/* ConnectionController */.x.setWcError(false);
        if (this.onRetry) {
            this.isRetrying = true;
            this.onRetry?.();
        }
        else {
            this.onConnect?.();
        }
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController/* ThemeController */.W.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return (0,lit/* html */.qy) `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    onCopyUri() {
        try {
            if (this.uri) {
                CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(this.uri);
                SnackController/* SnackController */.P.showSuccess('Link copied');
            }
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to copy');
        }
    }
}
W3mConnectingWidget.styles = w3m_connecting_widget_styles;
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "isRetrying", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "uri", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "error", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "ready", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "showRetry", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "secondaryBtnLabel", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "secondaryLabel", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWidget.prototype, "isLoading", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mConnectingWidget.prototype, "isMobile", void 0);
w3m_connecting_widget_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectingWidget.prototype, "onRetry", void 0);
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-external-view/index.js
var w3m_connecting_external_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let W3mConnectingExternalView = class W3mConnectingExternalView extends W3mConnectingWidget {
    constructor() {
        super();
        this.externalViewUnsubscribe = [];
        if (!this.connector) {
            throw new Error('w3m-connecting-view: No connector provided');
        }
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: {
                name: this.connector.name ?? 'Unknown',
                platform: 'browser'
            }
        });
        this.onConnect = this.onConnectProxy.bind(this);
        this.onAutoConnect = this.onConnectProxy.bind(this);
        this.isWalletConnect = false;
        this.externalViewUnsubscribe.push(ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => {
            if (val) {
                ModalController/* ModalController */.W.close();
            }
        }));
    }
    disconnectedCallback() {
        this.externalViewUnsubscribe.forEach(unsubscribe => unsubscribe());
    }
    async onConnectProxy() {
        try {
            this.error = false;
            if (this.connector) {
                if (this.connector.id !== ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.COINBASE_SDK || !this.error) {
                    await ConnectionController/* ConnectionController */.x.connectExternal(this.connector, this.connector.chain);
                    EventsController/* EventsController */.E.sendEvent({
                        type: 'track',
                        event: 'CONNECT_SUCCESS',
                        properties: { method: 'browser', name: this.connector.name || 'Unknown' }
                    });
                }
            }
        }
        catch (error) {
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'CONNECT_ERROR',
                properties: { message: error?.message ?? 'Unknown' }
            });
            this.error = true;
        }
    }
};
W3mConnectingExternalView = w3m_connecting_external_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-external-view')
], W3mConnectingExternalView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-multi-chain-view/styles.js

/* harmony default export */ const w3m_connecting_multi_chain_view_styles = ((0,lit/* css */.AH) `
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-multi-chain-view/index.js
var w3m_connecting_multi_chain_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mConnectingMultiChainView = class W3mConnectingMultiChainView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.activeConnector = ConnectorController/* ConnectorController */.a.state.activeConnector;
        this.unsubscribe.push(...[ConnectorController/* ConnectorController */.a.subscribeKey('activeConnector', val => (this.activeConnector = val))]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['m', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['0', 's', '0', 's']}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['xs', '0', 'xs', '0']}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `;
    }
    networksTemplate() {
        return this.activeConnector?.connectors?.map(connector => connector.name
            ? (0,lit/* html */.qy) `
            <wui-list-wallet
              imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getChainImage(connector.chain))}
              name=${ConstantsUtil/* ConstantsUtil */.o.CHAIN_NAME_MAP[connector.chain]}
              @click=${() => this.onConnector(connector)}
              data-testid="wui-list-chain-${connector.chain}"
            ></wui-list-wallet>
          `
            : null);
    }
    onConnector(provider) {
        const connector = this.activeConnector?.connectors?.find(p => p.chain === provider.chain);
        if (!connector) {
            SnackController/* SnackController */.P.showError('Failed to find connector');
            return;
        }
        if (connector.id === 'walletConnect') {
            if (CoreHelperUtil/* CoreHelperUtil */.w.isMobile()) {
                RouterController/* RouterController */.I.push('AllWallets');
            }
            else {
                RouterController/* RouterController */.I.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController/* RouterController */.I.push('ConnectingExternal', {
                connector
            });
        }
    }
};
W3mConnectingMultiChainView.styles = w3m_connecting_multi_chain_view_styles;
w3m_connecting_multi_chain_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingMultiChainView.prototype, "activeConnector", void 0);
W3mConnectingMultiChainView = w3m_connecting_multi_chain_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-multi-chain-view')
], W3mConnectingMultiChainView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-header/index.js
var w3m_connecting_header_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let W3mConnectingHeader = class W3mConnectingHeader extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.platformTabs = [];
        this.unsubscribe = [];
        this.platforms = [];
        this.onSelectPlatfrom = undefined;
    }
    disconnectCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const tabs = this.generateTabs();
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="center" .padding=${['0', '0', 'l', '0']}>
        <wui-tabs .tabs=${tabs} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `;
    }
    generateTabs() {
        const tabs = this.platforms.map(platform => {
            if (platform === 'browser') {
                return { label: 'Browser', icon: 'extension', platform: 'browser' };
            }
            else if (platform === 'mobile') {
                return { label: 'Mobile', icon: 'mobile', platform: 'mobile' };
            }
            else if (platform === 'qrcode') {
                return { label: 'Mobile', icon: 'mobile', platform: 'qrcode' };
            }
            else if (platform === 'web') {
                return { label: 'Webapp', icon: 'browser', platform: 'web' };
            }
            else if (platform === 'desktop') {
                return { label: 'Desktop', icon: 'desktop', platform: 'desktop' };
            }
            return { label: 'Browser', icon: 'extension', platform: 'unsupported' };
        });
        this.platformTabs = tabs.map(({ platform }) => platform);
        return tabs;
    }
    onTabChange(index) {
        const tab = this.platformTabs[index];
        if (tab) {
            this.onSelectPlatfrom?.(tab);
        }
    }
};
w3m_connecting_header_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], W3mConnectingHeader.prototype, "platforms", void 0);
w3m_connecting_header_decorate([
    (0,decorators/* property */.MZ)()
], W3mConnectingHeader.prototype, "onSelectPlatfrom", void 0);
W3mConnectingHeader = w3m_connecting_header_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-header')
], W3mConnectingHeader);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-browser/index.js
var w3m_connecting_wc_browser_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let W3mConnectingWcBrowser = class W3mConnectingWcBrowser extends W3mConnectingWidget {
    constructor() {
        super();
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-browser: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.onAutoConnect = this.onConnectProxy.bind(this);
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'browser' }
        });
    }
    async onConnectProxy() {
        try {
            this.error = false;
            const { connectors } = ConnectorController/* ConnectorController */.a.state;
            const connector = connectors.find(c => (c.type === 'ANNOUNCED' && c.info?.rdns === this.wallet?.rdns) ||
                c.type === 'INJECTED' ||
                c.name === this.wallet?.name);
            if (connector) {
                await ConnectionController/* ConnectionController */.x.connectExternal(connector, connector.chain);
            }
            else {
                throw new Error('w3m-connecting-wc-browser: No connector found');
            }
            ModalController/* ModalController */.W.close();
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'CONNECT_SUCCESS',
                properties: { method: 'browser', name: this.wallet?.name || 'Unknown' }
            });
        }
        catch (error) {
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'CONNECT_ERROR',
                properties: { message: error?.message ?? 'Unknown' }
            });
            this.error = true;
        }
    }
};
W3mConnectingWcBrowser = w3m_connecting_wc_browser_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-browser')
], W3mConnectingWcBrowser);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-desktop/index.js
var w3m_connecting_wc_desktop_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let W3mConnectingWcDesktop = class W3mConnectingWcDesktop extends W3mConnectingWidget {
    constructor() {
        super();
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-desktop: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.onRender = this.onRenderProxy.bind(this);
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'desktop' }
        });
    }
    onRenderProxy() {
        if (!this.ready && this.uri) {
            this.ready = true;
            this.onConnect?.();
        }
    }
    onConnectProxy() {
        if (this.wallet?.desktop_link && this.uri) {
            try {
                this.error = false;
                const { desktop_link, name } = this.wallet;
                const { redirect, href } = CoreHelperUtil/* CoreHelperUtil */.w.formatNativeUrl(desktop_link, this.uri);
                ConnectionController/* ConnectionController */.x.setWcLinking({ name, href });
                ConnectionController/* ConnectionController */.x.setRecentWallet(this.wallet);
                CoreHelperUtil/* CoreHelperUtil */.w.openHref(redirect, '_blank');
            }
            catch {
                this.error = true;
            }
        }
    }
};
W3mConnectingWcDesktop = w3m_connecting_wc_desktop_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-desktop')
], W3mConnectingWcDesktop);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-mobile/index.js
var w3m_connecting_wc_mobile_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let W3mConnectingWcMobile = class W3mConnectingWcMobile extends W3mConnectingWidget {
    constructor() {
        super();
        this.btnLabelTimeout = undefined;
        this.redirectDeeplink = undefined;
        this.redirectUniversalLink = undefined;
        this.target = undefined;
        this.preferUniversalLinks = OptionsController/* OptionsController */.H.state.experimental_preferUniversalLinks;
        this.isLoading = true;
        this.onConnect = () => {
            if (this.wallet?.mobile_link && this.uri) {
                try {
                    this.error = false;
                    const { mobile_link, link_mode, name } = this.wallet;
                    const { redirect, redirectUniversalLink, href } = CoreHelperUtil/* CoreHelperUtil */.w.formatNativeUrl(mobile_link, this.uri, link_mode);
                    this.redirectDeeplink = redirect;
                    this.redirectUniversalLink = redirectUniversalLink;
                    this.target = CoreHelperUtil/* CoreHelperUtil */.w.isIframe() ? '_top' : '_self';
                    ConnectionController/* ConnectionController */.x.setWcLinking({ name, href });
                    ConnectionController/* ConnectionController */.x.setRecentWallet(this.wallet);
                    if (this.preferUniversalLinks && this.redirectUniversalLink) {
                        CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.redirectUniversalLink, this.target);
                    }
                    else {
                        CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.redirectDeeplink, this.target);
                    }
                }
                catch (e) {
                    EventsController/* EventsController */.E.sendEvent({
                        type: 'track',
                        event: 'CONNECT_PROXY_ERROR',
                        properties: {
                            message: e instanceof Error ? e.message : 'Error parsing the deeplink',
                            uri: this.uri,
                            mobile_link: this.wallet.mobile_link,
                            name: this.wallet.name
                        }
                    });
                    this.error = true;
                }
            }
        };
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-mobile: No wallet provided');
        }
        this.secondaryBtnLabel = 'Open';
        this.secondaryLabel = utils_ConstantsUtil/* ConstantsUtil */.oU.CONNECT_LABELS.MOBILE;
        this.secondaryBtnIcon = 'externalLink';
        this.onHandleURI();
        this.unsubscribe.push(ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', () => {
            this.onHandleURI();
        }));
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'mobile' }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this.btnLabelTimeout);
    }
    onHandleURI() {
        this.isLoading = !this.uri;
        if (!this.ready && this.uri) {
            this.ready = true;
            this.onConnect?.();
        }
    }
    onTryAgain() {
        ConnectionController/* ConnectionController */.x.setWcError(false);
        this.onConnect?.();
    }
};
w3m_connecting_wc_mobile_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcMobile.prototype, "redirectDeeplink", void 0);
w3m_connecting_wc_mobile_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcMobile.prototype, "redirectUniversalLink", void 0);
w3m_connecting_wc_mobile_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcMobile.prototype, "target", void 0);
w3m_connecting_wc_mobile_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcMobile.prototype, "preferUniversalLinks", void 0);
w3m_connecting_wc_mobile_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcMobile.prototype, "isLoading", void 0);
W3mConnectingWcMobile = w3m_connecting_wc_mobile_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-mobile')
], W3mConnectingWcMobile);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-qr-code.js + 3 modules
var wui_qr_code = __webpack_require__(66283);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-ux-by-reown.js + 2 modules
var wui_ux_by_reown = __webpack_require__(17909);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-qrcode/styles.js

/* harmony default export */ const w3m_connecting_wc_qrcode_styles = ((0,lit/* css */.AH) `
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-qrcode/index.js
var w3m_connecting_wc_qrcode_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let W3mConnectingWcQrcode = class W3mConnectingWcQrcode extends W3mConnectingWidget {
    constructor() {
        super();
        this.forceUpdate = () => {
            this.requestUpdate();
        };
        window.addEventListener('resize', this.forceUpdate);
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet?.name ?? 'WalletConnect', platform: 'qrcode' }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unsubscribe?.forEach(unsub => unsub());
        window.removeEventListener('resize', this.forceUpdate);
    }
    render() {
        this.onRenderProxy();
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['0', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
    onRenderProxy() {
        if (!this.ready && this.uri) {
            this.timeout = setTimeout(() => {
                this.ready = true;
            }, 200);
        }
    }
    qrCodeTemplate() {
        if (!this.uri || !this.ready) {
            return null;
        }
        const size = this.getBoundingClientRect().width - 40;
        const alt = this.wallet ? this.wallet.name : undefined;
        ConnectionController/* ConnectionController */.x.setWcLinking(undefined);
        ConnectionController/* ConnectionController */.x.setRecentWallet(this.wallet);
        return (0,lit/* html */.qy) ` <wui-qr-code
      size=${size}
      theme=${ThemeController/* ThemeController */.W.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(this.wallet))}
      color=${(0,if_defined/* ifDefined */.J)(ThemeController/* ThemeController */.W.state.themeVariables['--w3m-qr-color'])}
      alt=${(0,if_defined/* ifDefined */.J)(alt)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
    }
    copyTemplate() {
        const inactive = !this.uri || !this.ready;
        return (0,lit/* html */.qy) `<wui-link
      .disabled=${inactive}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
    }
};
W3mConnectingWcQrcode.styles = w3m_connecting_wc_qrcode_styles;
W3mConnectingWcQrcode = w3m_connecting_wc_qrcode_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-qrcode')
], W3mConnectingWcQrcode);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-unsupported/index.js
var w3m_connecting_wc_unsupported_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectingWcUnsupported = class W3mConnectingWcUnsupported extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.wallet = RouterController/* RouterController */.I.state.data?.wallet;
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-unsupported: No wallet provided');
        }
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'browser' }
        });
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
};
W3mConnectingWcUnsupported = w3m_connecting_wc_unsupported_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-unsupported')
], W3mConnectingWcUnsupported);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-connecting-wc-web/index.js
var w3m_connecting_wc_web_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let W3mConnectingWcWeb = class W3mConnectingWcWeb extends W3mConnectingWidget {
    constructor() {
        super();
        this.isLoading = true;
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-web: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.secondaryBtnLabel = 'Open';
        this.secondaryLabel = utils_ConstantsUtil/* ConstantsUtil */.oU.CONNECT_LABELS.MOBILE;
        this.secondaryBtnIcon = 'externalLink';
        this.updateLoadingState();
        this.unsubscribe.push(ConnectionController/* ConnectionController */.x.subscribeKey('wcUri', () => {
            this.updateLoadingState();
        }));
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'web' }
        });
    }
    updateLoadingState() {
        this.isLoading = !this.uri;
    }
    onConnectProxy() {
        if (this.wallet?.webapp_link && this.uri) {
            try {
                this.error = false;
                const { webapp_link, name } = this.wallet;
                const { redirect, href } = CoreHelperUtil/* CoreHelperUtil */.w.formatUniversalUrl(webapp_link, this.uri);
                ConnectionController/* ConnectionController */.x.setWcLinking({ name, href });
                ConnectionController/* ConnectionController */.x.setRecentWallet(this.wallet);
                CoreHelperUtil/* CoreHelperUtil */.w.openHref(redirect, '_blank');
            }
            catch {
                this.error = true;
            }
        }
    }
};
w3m_connecting_wc_web_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcWeb.prototype, "isLoading", void 0);
W3mConnectingWcWeb = w3m_connecting_wc_web_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-web')
], W3mConnectingWcWeb);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-view/index.js
var w3m_connecting_wc_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mConnectingWcView = class W3mConnectingWcView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.wallet = RouterController/* RouterController */.I.state.data?.wallet;
        this.unsubscribe = [];
        this.platform = undefined;
        this.platforms = [];
        this.isSiwxEnabled = Boolean(OptionsController/* OptionsController */.H.state.siwx);
        this.remoteFeatures = OptionsController/* OptionsController */.H.state.remoteFeatures;
        this.determinePlatforms();
        this.initializeConnection();
        this.unsubscribe.push(OptionsController/* OptionsController */.H.subscribeKey('remoteFeatures', val => (this.remoteFeatures = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `;
    }
    reownBrandingTemplate() {
        if (!this.remoteFeatures?.reownBranding) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-ux-by-reown></wui-ux-by-reown>`;
    }
    async initializeConnection(retry = false) {
        if (this.platform === 'browser' || (OptionsController/* OptionsController */.H.state.manualWCControl && !retry)) {
            return;
        }
        try {
            const { wcPairingExpiry, status } = ConnectionController/* ConnectionController */.x.state;
            if (retry ||
                OptionsController/* OptionsController */.H.state.enableEmbedded ||
                CoreHelperUtil/* CoreHelperUtil */.w.isPairingExpired(wcPairingExpiry) ||
                status === 'connecting') {
                await ConnectionController/* ConnectionController */.x.connectWalletConnect();
                if (!this.isSiwxEnabled) {
                    ModalController/* ModalController */.W.close();
                }
            }
        }
        catch (error) {
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'CONNECT_ERROR',
                properties: { message: error?.message ?? 'Unknown' }
            });
            ConnectionController/* ConnectionController */.x.setWcError(true);
            SnackController/* SnackController */.P.showError(error.message ?? 'Connection error');
            ConnectionController/* ConnectionController */.x.resetWcConnection();
            RouterController/* RouterController */.I.goBack();
        }
    }
    determinePlatforms() {
        if (!this.wallet) {
            this.platforms.push('qrcode');
            this.platform = 'qrcode';
            return;
        }
        if (this.platform) {
            return;
        }
        const { mobile_link, desktop_link, webapp_link, injected, rdns } = this.wallet;
        const injectedIds = injected?.map(({ injected_id }) => injected_id).filter(Boolean);
        const browserIds = [...(rdns ? [rdns] : (injectedIds ?? []))];
        const isBrowser = OptionsController/* OptionsController */.H.state.isUniversalProvider ? false : browserIds.length;
        const hasMobileWCLink = mobile_link;
        const isWebWc = webapp_link;
        const isBrowserInstalled = ConnectionController/* ConnectionController */.x.checkInstalled(browserIds);
        const isBrowserWc = isBrowser && isBrowserInstalled;
        const isDesktopWc = desktop_link && !CoreHelperUtil/* CoreHelperUtil */.w.isMobile();
        if (isBrowserWc && !ChainController/* ChainController */.W.state.noAdapters) {
            this.platforms.push('browser');
        }
        if (hasMobileWCLink) {
            this.platforms.push(CoreHelperUtil/* CoreHelperUtil */.w.isMobile() ? 'mobile' : 'qrcode');
        }
        if (isWebWc) {
            this.platforms.push('web');
        }
        if (isDesktopWc) {
            this.platforms.push('desktop');
        }
        if (!isBrowserWc && isBrowser && !ChainController/* ChainController */.W.state.noAdapters) {
            this.platforms.push('unsupported');
        }
        this.platform = this.platforms[0];
    }
    platformTemplate() {
        switch (this.platform) {
            case 'browser':
                return (0,lit/* html */.qy) `<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
            case 'web':
                return (0,lit/* html */.qy) `<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
            case 'desktop':
                return (0,lit/* html */.qy) `
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-desktop>
        `;
            case 'mobile':
                return (0,lit/* html */.qy) `
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-mobile>
        `;
            case 'qrcode':
                return (0,lit/* html */.qy) `<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;
            default:
                return (0,lit/* html */.qy) `<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
        }
    }
    headerTemplate() {
        const multiPlatform = this.platforms.length > 1;
        if (!multiPlatform) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `;
    }
    async onSelectPlatform(platform) {
        const container = this.shadowRoot?.querySelector('div');
        if (container) {
            await container.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            }).finished;
            this.platform = platform;
            container.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
};
w3m_connecting_wc_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcView.prototype, "platform", void 0);
w3m_connecting_wc_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcView.prototype, "platforms", void 0);
w3m_connecting_wc_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcView.prototype, "isSiwxEnabled", void 0);
w3m_connecting_wc_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcView.prototype, "remoteFeatures", void 0);
W3mConnectingWcView = w3m_connecting_wc_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-view')
], W3mConnectingWcView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connecting-wc-basic-view/index.js
var w3m_connecting_wc_basic_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mConnectingWcBasicView = class W3mConnectingWcBasicView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.isMobile = CoreHelperUtil/* CoreHelperUtil */.w.isMobile();
    }
    render() {
        if (this.isMobile) {
            const { featured, recommended } = ApiController/* ApiController */.N.state;
            const { customWallets } = OptionsController/* OptionsController */.H.state;
            const recent = StorageUtil/* StorageUtil */.i.getRecentWallets();
            const showConnectors = featured.length || recommended.length || customWallets?.length || recent.length;
            return (0,lit/* html */.qy) `<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${['3xs', 's', 's', 's']}
      >
        ${showConnectors ? (0,lit/* html */.qy) `<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
        }
        return (0,lit/* html */.qy) `<wui-flex flexDirection="column" .padding=${['0', '0', 'l', '0']}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${['0', 'm', '0', 'm']}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`;
    }
};
w3m_connecting_wc_basic_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectingWcBasicView.prototype, "isMobile", void 0);
W3mConnectingWcBasicView = w3m_connecting_wc_basic_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connecting-wc-basic-view')
], W3mConnectingWcBasicView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/NavigationUtil.js
var NavigationUtil = __webpack_require__(45839);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-choose-account-name-view/styles.js

/* harmony default export */ const w3m_choose_account_name_view_styles = ((0,lit/* css */.AH) `
  .continue-button-container {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-choose-account-name-view/index.js
var w3m_choose_account_name_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let W3mChooseAccountNameView = class W3mChooseAccountNameView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.loading = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${['0', '0', 'l', '0']}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(NavigationUtil/* NavigationUtil */.T.URLS.FAQ, '_blank');
        }}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
    }
    onboardingTemplate() {
        return (0,lit/* html */.qy) ` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${['0', 'xxl', '0', 'xxl']}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`;
    }
    buttonsTemplate() {
        return (0,lit/* html */.qy) `<wui-flex
      .padding=${['0', '2l', '0', '2l']}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`;
    }
    handleContinue() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        RouterController/* RouterController */.I.push('RegisterAccountName');
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'OPEN_ENS_FLOW',
            properties: {
                isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
    }
};
W3mChooseAccountNameView.styles = w3m_choose_account_name_view_styles;
w3m_choose_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mChooseAccountNameView.prototype, "loading", void 0);
W3mChooseAccountNameView = w3m_choose_account_name_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-choose-account-name-view')
], W3mChooseAccountNameView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-downloads-view/index.js
var w3m_downloads_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mDownloadsView = class W3mDownloadsView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.wallet = RouterController/* RouterController */.I.state.data?.wallet;
    }
    render() {
        if (!this.wallet) {
            throw new Error('w3m-downloads-view');
        }
        return (0,lit/* html */.qy) `
      <wui-flex gap="xs" flexDirection="column" .padding=${['s', 's', 'l', 's']}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
    }
    chromeTemplate() {
        if (!this.wallet?.chrome_store) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`;
    }
    iosTemplate() {
        if (!this.wallet?.app_store) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`;
    }
    androidTemplate() {
        if (!this.wallet?.play_store) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`;
    }
    homepageTemplate() {
        if (!this.wallet?.homepage) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `;
    }
    onChromeStore() {
        if (this.wallet?.chrome_store) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.chrome_store, '_blank');
        }
    }
    onAppStore() {
        if (this.wallet?.app_store) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.app_store, '_blank');
        }
    }
    onPlayStore() {
        if (this.wallet?.play_store) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.play_store, '_blank');
        }
    }
    onHomePage() {
        if (this.wallet?.homepage) {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.wallet.homepage, '_blank');
        }
    }
};
W3mDownloadsView = w3m_downloads_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-downloads-view')
], W3mDownloadsView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-get-wallet-view/index.js
var w3m_get_wallet_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






const EXPLORER = 'https://walletconnect.com/explorer';
let W3mGetWalletView = class W3mGetWalletView extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${() => {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref('https://walletconnect.com/explorer?type=wallet', '_blank');
        }}
        ></wui-list-wallet>
      </wui-flex>
    `;
    }
    recommendedWalletsTemplate() {
        const { recommended, featured } = ApiController/* ApiController */.N.state;
        const { customWallets } = OptionsController/* OptionsController */.H.state;
        const wallets = [...featured, ...(customWallets ?? []), ...recommended].slice(0, 4);
        return wallets.map(wallet => (0,lit/* html */.qy) `
        <wui-list-wallet
          name=${wallet.name ?? 'Unknown'}
          tagVariant="main"
          imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getWalletImage(wallet))}
          @click=${() => {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(wallet.homepage ?? EXPLORER, '_blank');
        }}
        ></wui-list-wallet>
      `);
    }
};
W3mGetWalletView = w3m_get_wallet_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-get-wallet-view')
], W3mGetWalletView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-visual.js + 26 modules
var wui_visual = __webpack_require__(72952);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-help-widget/index.js
var w3m_help_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mHelpWidget = class W3mHelpWidget extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.data = [];
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(item => (0,lit/* html */.qy) `
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${item.images.map(image => (0,lit/* html */.qy) `<wui-visual name=${image}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${item.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${item.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `;
    }
};
w3m_help_widget_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], W3mHelpWidget.prototype, "data", void 0);
W3mHelpWidget = w3m_help_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-help-widget')
], W3mHelpWidget);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-wallet-view/index.js
var w3m_what_is_a_wallet_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







const data = [
    {
        images: ['login', 'profile', 'lock'],
        title: 'One login for all of web3',
        text: 'Log in to any app by connecting your wallet. Say goodbye to countless passwords!'
    },
    {
        images: ['defi', 'nft', 'eth'],
        title: 'A home for your digital assets',
        text: 'A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs.'
    },
    {
        images: ['browser', 'noun', 'dao'],
        title: 'Your gateway to a new web',
        text: 'With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more.'
    }
];
let W3mWhatIsAWalletView = class W3mWhatIsAWalletView extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        .padding=${['xxl', 'xl', 'xl', 'xl']}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${data}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `;
    }
    onGetWallet() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'CLICK_GET_WALLET' });
        RouterController/* RouterController */.I.push('GetWallet');
    }
};
W3mWhatIsAWalletView = w3m_what_is_a_wallet_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-what-is-a-wallet-view')
], W3mWhatIsAWalletView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-wallets-view/styles.js

/* harmony default export */ const w3m_connect_wallets_view_styles = ((0,lit/* css */.AH) `
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-connect-wallets-view/index.js
var w3m_connect_wallets_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mConnectWalletsView = class W3mConnectWalletsView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.checked = OptionsStateController/* OptionsStateController */.o.state.isLegalCheckboxChecked;
        this.unsubscribe.push(OptionsStateController/* OptionsStateController */.o.subscribeKey('isLegalCheckboxChecked', val => {
            this.checked = val;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController/* OptionsController */.H.state;
        const legalCheckbox = OptionsController/* OptionsController */.H.state.features?.legalCheckbox;
        const legalUrl = termsConditionsUrl || privacyPolicyUrl;
        const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
        const disabled = showLegalCheckbox && !this.checked;
        const tabIndex = disabled ? -1 : undefined;
        return (0,lit/* html */.qy) `
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${showLegalCheckbox ? ['0', 's', 's', 's'] : 's'}
        gap="xs"
        class=${(0,if_defined/* ifDefined */.J)(disabled ? 'disabled' : undefined)}
      >
        <w3m-wallet-login-list tabIdx=${(0,if_defined/* ifDefined */.J)(tabIndex)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
};
W3mConnectWalletsView.styles = w3m_connect_wallets_view_styles;
w3m_connect_wallets_view_decorate([
    (0,decorators/* state */.wk)()
], W3mConnectWalletsView.prototype, "checked", void 0);
W3mConnectWalletsView = w3m_connect_wallets_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-connect-wallets-view')
], W3mConnectWalletsView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-hexagon/styles.js

/* harmony default export */ const wui_loading_hexagon_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-hexagon/index.js
var wui_loading_hexagon_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let WuiLoadingHexagon = class WuiLoadingHexagon extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `;
    }
};
WuiLoadingHexagon.styles = [ThemeUtil/* resetStyles */.W5, wui_loading_hexagon_styles];
WuiLoadingHexagon = wui_loading_hexagon_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-loading-hexagon')
], WuiLoadingHexagon);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-hexagon.js

//# sourceMappingURL=wui-loading-hexagon.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-network-image.js
var wui_network_image = __webpack_require__(52619);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-network-switch-view/styles.js

/* harmony default export */ const w3m_network_switch_view_styles = ((0,lit/* css */.AH) `
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-network-switch-view/index.js
var w3m_network_switch_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let W3mNetworkSwitchView = class W3mNetworkSwitchView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.network = RouterController/* RouterController */.I.state.data?.network;
        this.unsubscribe = [];
        this.showRetry = false;
        this.error = false;
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    firstUpdated() {
        this.onSwitchNetwork();
    }
    render() {
        if (!this.network) {
            throw new Error('w3m-network-switch-view: No network provided');
        }
        this.onShowRetry();
        const label = this.getLabel();
        const subLabel = this.getSubLabel();
        return (0,lit/* html */.qy) `
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', '3xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error ? null : (0,lit/* html */.qy) `<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${true}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${label}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${subLabel}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `;
    }
    getSubLabel() {
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (authConnector && connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH) {
            return '';
        }
        return this.error
            ? 'Switch can be declined if chain is not supported by a wallet or previous request is still active'
            : 'Accept connection request in your wallet';
    }
    getLabel() {
        const namespace = ChainController/* ChainController */.W.state.activeChain;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(namespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (authConnector && connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH) {
            return `Switching to ${this.network?.name ?? 'Unknown'} network...`;
        }
        return this.error ? 'Switch declined' : 'Approve in wallet';
    }
    onShowRetry() {
        if (this.error && !this.showRetry) {
            this.showRetry = true;
            const retryButton = this.shadowRoot?.querySelector('wui-button');
            retryButton?.animate([{ opacity: 0 }, { opacity: 1 }], {
                fill: 'forwards',
                easing: 'ease'
            });
        }
    }
    onSwitchNetwork() {
        try {
            this.error = false;
            if (ChainController/* ChainController */.W.state.activeChain !== this.network?.chainNamespace) {
                ChainController/* ChainController */.W.setIsSwitchingNamespace(true);
            }
            if (this.network) {
                ChainController/* ChainController */.W.switchActiveNetwork(this.network);
            }
        }
        catch (error) {
            this.error = true;
        }
    }
};
W3mNetworkSwitchView.styles = w3m_network_switch_view_styles;
w3m_network_switch_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkSwitchView.prototype, "showRetry", void 0);
w3m_network_switch_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworkSwitchView.prototype, "error", void 0);
W3mNetworkSwitchView = w3m_network_switch_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-network-switch-view')
], W3mNetworkSwitchView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/NetworkUtil.js
var NetworkUtil = __webpack_require__(58751);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-input-text.js
var exports_wui_input_text = __webpack_require__(12965);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-image/index.js + 3 modules
var composites_wui_network_image = __webpack_require__(25981);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-network/styles.js

/* harmony default export */ const wui_list_network_styles = ((0,lit/* css */.AH) `
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-network/index.js
var wui_list_network_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiListNetwork = class WuiListNetwork extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.imageSrc = '';
        this.name = '';
        this.disabled = false;
        this.selected = false;
        this.transparent = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `;
    }
    checkmarkTemplate() {
        if (this.selected) {
            return (0,lit/* html */.qy) `<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`;
        }
        return null;
    }
    templateNetworkImage() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`;
        }
        if (!this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-network-image
        ?round=${true}
        size="md"
        name=${this.name}
      ></wui-network-image>`;
        }
        return null;
    }
};
WuiListNetwork.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_network_styles];
wui_list_network_decorate([
    (0,decorators/* property */.MZ)()
], WuiListNetwork.prototype, "imageSrc", void 0);
wui_list_network_decorate([
    (0,decorators/* property */.MZ)()
], WuiListNetwork.prototype, "name", void 0);
wui_list_network_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListNetwork.prototype, "disabled", void 0);
wui_list_network_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListNetwork.prototype, "selected", void 0);
wui_list_network_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListNetwork.prototype, "transparent", void 0);
WuiListNetwork = wui_list_network_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-network')
], WuiListNetwork);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-network.js

//# sourceMappingURL=wui-list-network.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-networks-view/styles.js

/* harmony default export */ const w3m_networks_view_styles = ((0,lit/* css */.AH) `
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-networks-view/index.js
var w3m_networks_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let W3mNetworksView = class W3mNetworksView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.requestedCaipNetworks = ChainController/* ChainController */.W.getCaipNetworks();
        this.search = '';
        this.onDebouncedSearch = CoreHelperUtil/* CoreHelperUtil */.w.debounce((value) => {
            this.search = value;
        }, 100);
        this.unsubscribe.push(AssetController/* AssetController */.j.subscribeNetworkImages(() => this.requestUpdate()), ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => (this.network = val)), ChainController/* ChainController */.W.subscribe(() => {
            this.requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${['0', 's', 's', 's']}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `;
    }
    templateSearchInput() {
        return (0,lit/* html */.qy) `
      <wui-flex gap="xs" .padding=${['0', 's', 's', 's']}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
    }
    onInputChange(event) {
        this.onDebouncedSearch(event.detail);
    }
    onNetworkHelp() {
        EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'CLICK_NETWORK_HELP' });
        RouterController/* RouterController */.I.push('WhatIsANetwork');
    }
    networksTemplate() {
        const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
        const sortedNetworks = CoreHelperUtil/* CoreHelperUtil */.w.sortRequestedNetworks(approvedCaipNetworkIds, this.requestedCaipNetworks);
        if (this.search) {
            this.filteredNetworks = sortedNetworks?.filter(network => network?.name?.toLowerCase().includes(this.search.toLowerCase()));
        }
        else {
            this.filteredNetworks = sortedNetworks;
        }
        return this.filteredNetworks?.map(network => (0,lit/* html */.qy) `
        <wui-list-network
          .selected=${this.network?.id === network.id}
          imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(network))}
          type="network"
          name=${network.name ?? network.id}
          @click=${() => this.onSwitchNetwork(network)}
          .disabled=${this.getNetworkDisabled(network)}
          data-testid=${`w3m-network-switch-${network.name ?? network.id}`}
        ></wui-list-network>
      `);
    }
    getNetworkDisabled(network) {
        const networkNamespace = network.chainNamespace;
        const isNextNamespaceConnected = AccountController/* AccountController */.U.getCaipAddress(networkNamespace);
        const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
        const supportsAllNetworks = ChainController/* ChainController */.W.getNetworkProp('supportsAllNetworks', networkNamespace) !== false;
        const connectorId = ConnectorController/* ConnectorController */.a.getConnectorId(networkNamespace);
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        const isConnectedWithAuth = connectorId === ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_ID.AUTH && authConnector;
        if (!isNextNamespaceConnected || supportsAllNetworks || isConnectedWithAuth) {
            return false;
        }
        return !approvedCaipNetworkIds?.includes(network.caipNetworkId);
    }
    onSwitchNetwork(network) {
        NetworkUtil/* NetworkUtil */.L.onSwitchNetwork({ network });
    }
};
W3mNetworksView.styles = w3m_networks_view_styles;
w3m_networks_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworksView.prototype, "network", void 0);
w3m_networks_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworksView.prototype, "requestedCaipNetworks", void 0);
w3m_networks_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworksView.prototype, "filteredNetworks", void 0);
w3m_networks_view_decorate([
    (0,decorators/* state */.wk)()
], W3mNetworksView.prototype, "search", void 0);
W3mNetworksView = w3m_networks_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-networks-view')
], W3mNetworksView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-switch-active-chain-view/styles.js

/* harmony default export */ const w3m_switch_active_chain_view_styles = ((0,lit/* css */.AH) `
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }

  .capitalize {
    text-transform: capitalize;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-switch-active-chain-view/index.js
var w3m_switch_active_chain_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







const chainIconNameMap = {
    eip155: 'eth',
    solana: 'solana',
    bip122: 'bitcoin',
    polkadot: undefined
};
let W3mSwitchActiveChainView = class W3mSwitchActiveChainView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
        this.switchToChain = RouterController/* RouterController */.I.state.data?.switchToChain;
        this.caipNetwork = RouterController/* RouterController */.I.state.data?.network;
        this.activeChain = ChainController/* ChainController */.W.state.activeChain;
    }
    firstUpdated() {
        this.unsubscribe.push(ChainController/* ChainController */.W.subscribeKey('activeChain', val => (this.activeChain = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const switchedChainNameString = this.switchToChain
            ? ConstantsUtil/* ConstantsUtil */.o.CHAIN_NAME_MAP[this.switchToChain]
            : 'supported';
        if (!this.switchToChain) {
            return null;
        }
        const nextChainName = ConstantsUtil/* ConstantsUtil */.o.CHAIN_NAME_MAP[this.switchToChain];
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${(0,if_defined/* ifDefined */.J)(chainIconNameMap[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${nextChainName}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${nextChainName}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${switchedChainNameString} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `;
    }
    async switchActiveChain() {
        if (!this.switchToChain) {
            return;
        }
        ChainController/* ChainController */.W.setIsSwitchingNamespace(true);
        ConnectorController/* ConnectorController */.a.setFilterByNamespace(this.switchToChain);
        if (this.caipNetwork) {
            await ChainController/* ChainController */.W.switchActiveNetwork(this.caipNetwork);
        }
        else {
            ChainController/* ChainController */.W.setActiveNamespace(this.switchToChain);
        }
        RouterController/* RouterController */.I.reset('Connect');
    }
};
W3mSwitchActiveChainView.styles = w3m_switch_active_chain_view_styles;
w3m_switch_active_chain_view_decorate([
    (0,decorators/* property */.MZ)()
], W3mSwitchActiveChainView.prototype, "activeChain", void 0);
W3mSwitchActiveChainView = w3m_switch_active_chain_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-switch-active-chain-view')
], W3mSwitchActiveChainView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-network-view/index.js
var w3m_what_is_a_network_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







const w3m_what_is_a_network_view_data = [
    {
        images: ['network', 'layers', 'system'],
        title: 'The system’s nuts and bolts',
        text: 'A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services.'
    },
    {
        images: ['noun', 'defiAlt', 'dao'],
        title: 'Designed for different uses',
        text: 'Each network is designed differently, and may therefore suit certain apps and experiences.'
    }
];
let W3mWhatIsANetworkView = class W3mWhatIsANetworkView extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        .padding=${['xxl', 'xl', 'xl', 'xl']}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${w3m_what_is_a_network_view_data}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${() => {
            CoreHelperUtil/* CoreHelperUtil */.w.openHref('https://ethereum.org/en/developers/docs/networks/', '_blank');
        }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
    }
};
W3mWhatIsANetworkView = w3m_what_is_a_network_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-what-is-a-network-view')
], W3mWhatIsANetworkView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-unsupported-chain-view/styles.js

/* harmony default export */ const w3m_unsupported_chain_view_styles = ((0,lit/* css */.AH) `
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-unsupported-chain-view/index.js
var w3m_unsupported_chain_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mUnsupportedChainView = class W3mUnsupportedChainView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.swapUnsupportedChain = RouterController/* RouterController */.I.state.data?.swapUnsupportedChain;
        this.unsubscribe = [];
        this.disconecting = false;
        this.unsubscribe.push(AssetController/* AssetController */.j.subscribeNetworkImages(() => this.requestUpdate()));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${['m', 'xl', 'xs', 'xl']}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${false}
            .loading=${this.disconecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
    }
    descriptionTemplate() {
        if (this.swapUnsupportedChain) {
            return (0,lit/* html */.qy) `
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `;
        }
        return (0,lit/* html */.qy) `
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `;
    }
    networksTemplate() {
        const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
        const sortedNetworks = CoreHelperUtil/* CoreHelperUtil */.w.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        const filteredNetworks = this.swapUnsupportedChain
            ? sortedNetworks.filter(network => utils_ConstantsUtil/* ConstantsUtil */.oU.SWAP_SUPPORTED_NETWORKS.includes(network.caipNetworkId))
            : sortedNetworks;
        return filteredNetworks.map(network => (0,lit/* html */.qy) `
        <wui-list-network
          imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(network))}
          name=${network.name ?? 'Unknown'}
          @click=${() => this.onSwitchNetwork(network)}
        >
        </wui-list-network>
      `);
    }
    async onDisconnect() {
        try {
            this.disconecting = true;
            await ConnectionController/* ConnectionController */.x.disconnect();
            ModalController/* ModalController */.W.close();
        }
        catch {
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'DISCONNECT_ERROR' });
            SnackController/* SnackController */.P.showError('Failed to disconnect');
        }
        finally {
            this.disconecting = false;
        }
    }
    async onSwitchNetwork(network) {
        const caipAddress = AccountController/* AccountController */.U.state.caipAddress;
        const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
        const supportsAllNetworks = ChainController/* ChainController */.W.getNetworkProp('supportsAllNetworks', network.chainNamespace);
        const routerData = RouterController/* RouterController */.I.state.data;
        if (caipAddress) {
            if (approvedCaipNetworkIds?.includes(network.caipNetworkId)) {
                await ChainController/* ChainController */.W.switchActiveNetwork(network);
            }
            else if (supportsAllNetworks) {
                RouterController/* RouterController */.I.push('SwitchNetwork', { ...routerData, network });
            }
            else {
                RouterController/* RouterController */.I.push('SwitchNetwork', { ...routerData, network });
            }
        }
        else if (!caipAddress) {
            ChainController/* ChainController */.W.setActiveCaipNetwork(network);
            RouterController/* RouterController */.I.push('Connect');
        }
    }
};
W3mUnsupportedChainView.styles = w3m_unsupported_chain_view_styles;
w3m_unsupported_chain_view_decorate([
    (0,decorators/* state */.wk)()
], W3mUnsupportedChainView.prototype, "disconecting", void 0);
W3mUnsupportedChainView = w3m_unsupported_chain_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-unsupported-chain-view')
], W3mUnsupportedChainView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-banner/styles.js

/* harmony default export */ const wui_banner_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-banner/index.js
var wui_banner_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiBanner = class WuiBanner extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.icon = 'externalLink';
        this.text = '';
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `;
    }
};
WuiBanner.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_banner_styles];
wui_banner_decorate([
    (0,decorators/* property */.MZ)()
], WuiBanner.prototype, "icon", void 0);
wui_banner_decorate([
    (0,decorators/* property */.MZ)()
], WuiBanner.prototype, "text", void 0);
WuiBanner = wui_banner_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-banner')
], WuiBanner);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-banner.js

//# sourceMappingURL=wui-banner.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-compatible-networks-view/styles.js

/* harmony default export */ const w3m_wallet_compatible_networks_view_styles = ((0,lit/* css */.AH) `
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-compatible-networks-view/index.js
var w3m_wallet_compatible_networks_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mWalletCompatibleNetworksView = class W3mWalletCompatibleNetworksView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.preferredAccountTypes = AccountController/* AccountController */.U.state.preferredAccountTypes;
        this.unsubscribe.push(AccountController/* AccountController */.U.subscribeKey('preferredAccountTypes', val => {
            this.preferredAccountTypes = val;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) ` <wui-flex
      flexDirection="column"
      .padding=${['xs', 's', 'm', 's']}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`;
    }
    networkTemplate() {
        const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
        const caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        const isNetworkEnabledForSmartAccounts = ChainController/* ChainController */.W.checkIfSmartAccountEnabled();
        let sortedNetworks = CoreHelperUtil/* CoreHelperUtil */.w.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        if (isNetworkEnabledForSmartAccounts &&
            this.preferredAccountTypes?.[caipNetwork?.chainNamespace] ===
                W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT) {
            if (!caipNetwork) {
                return null;
            }
            sortedNetworks = [caipNetwork];
        }
        const namespaceNetworks = sortedNetworks.filter(network => network.chainNamespace === caipNetwork?.chainNamespace);
        return namespaceNetworks.map(network => (0,lit/* html */.qy) `
        <wui-list-network
          imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(network))}
          name=${network.name ?? 'Unknown'}
          ?transparent=${true}
        >
        </wui-list-network>
      `);
    }
};
W3mWalletCompatibleNetworksView.styles = w3m_wallet_compatible_networks_view_styles;
w3m_wallet_compatible_networks_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletCompatibleNetworksView.prototype, "preferredAccountTypes", void 0);
W3mWalletCompatibleNetworksView = w3m_wallet_compatible_networks_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-compatible-networks-view')
], W3mWalletCompatibleNetworksView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/SIWXUtil.js
var SIWXUtil = __webpack_require__(1122);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-visual-thumbnail/styles.js

/* harmony default export */ const wui_visual_thumbnail_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-visual-thumbnail/index.js
var wui_visual_thumbnail_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiVisualThumbnail = class WuiVisualThumbnail extends lit/* LitElement */.WF {
    render() {
        this.style.cssText = `--local-border-radius: ${this.borderRadiusFull ? '1000px' : '20px'}; background-color: var(--wui-color-modal-bg);`;
        return (0,lit/* html */.qy) `${this.templateVisual()}`;
    }
    templateVisual() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.alt ?? ''}></wui-image>`;
        }
        return (0,lit/* html */.qy) `<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
    }
};
WuiVisualThumbnail.styles = [ThemeUtil/* resetStyles */.W5, wui_visual_thumbnail_styles];
wui_visual_thumbnail_decorate([
    (0,decorators/* property */.MZ)()
], WuiVisualThumbnail.prototype, "imageSrc", void 0);
wui_visual_thumbnail_decorate([
    (0,decorators/* property */.MZ)()
], WuiVisualThumbnail.prototype, "alt", void 0);
wui_visual_thumbnail_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiVisualThumbnail.prototype, "borderRadiusFull", void 0);
WuiVisualThumbnail = wui_visual_thumbnail_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-visual-thumbnail')
], WuiVisualThumbnail);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-visual-thumbnail.js

//# sourceMappingURL=wui-visual-thumbnail.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-siwx-sign-message-thumbnails/styles.js

/* harmony default export */ const w3m_siwx_sign_message_thumbnails_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-siwx-sign-message-thumbnails/index.js
var w3m_siwx_sign_message_thumbnails_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let W3mSIWXSignMessageThumbnails = class W3mSIWXSignMessageThumbnails extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.dappImageUrl = OptionsController/* OptionsController */.H.state.metadata?.icons;
        this.walletImageUrl = AccountController/* AccountController */.U.state.connectedWalletInfo?.icon;
    }
    firstUpdated() {
        const visuals = this.shadowRoot?.querySelectorAll('wui-visual-thumbnail');
        if (visuals?.[0]) {
            this.createAnimation(visuals[0], 'translate(18px)');
        }
        if (visuals?.[1]) {
            this.createAnimation(visuals[1], 'translate(-18px)');
        }
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
    }
    createAnimation(element, translation) {
        element.animate([{ transform: 'translateX(0px)' }, { transform: translation }], {
            duration: 1600,
            easing: 'cubic-bezier(0.56, 0, 0.48, 1)',
            direction: 'alternate',
            iterations: Infinity
        });
    }
};
W3mSIWXSignMessageThumbnails.styles = w3m_siwx_sign_message_thumbnails_styles;
W3mSIWXSignMessageThumbnails = w3m_siwx_sign_message_thumbnails_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-siwx-sign-message-thumbnails')
], W3mSIWXSignMessageThumbnails);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-siwx-sign-message-view/index.js
var w3m_siwx_sign_message_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mSIWXSignMessageView = class W3mSIWXSignMessageView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.dappName = OptionsController/* OptionsController */.H.state.metadata?.name;
        this.isCancelling = false;
        this.isSigning = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="center" .padding=${['2xl', '0', 'xxl', '0']}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${['0', '4xl', 'l', '4xl']}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName ?? 'Dapp'} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${['0', '3xl', 'l', '3xl']}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${['l', 'xl', 'xl', 'xl']} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling ? 'Cancelling...' : 'Cancel'}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? 'Signing...' : 'Sign'}
        </wui-button>
      </wui-flex>
    `;
    }
    async onSign() {
        this.isSigning = true;
        await SIWXUtil/* SIWXUtil */.U.requestSignMessage().finally(() => (this.isSigning = false));
    }
    async onCancel() {
        this.isCancelling = true;
        await SIWXUtil/* SIWXUtil */.U.cancelSignMessage().finally(() => (this.isCancelling = false));
    }
};
w3m_siwx_sign_message_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSIWXSignMessageView.prototype, "isCancelling", void 0);
w3m_siwx_sign_message_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSIWXSignMessageView.prototype, "isSigning", void 0);
W3mSIWXSignMessageView = w3m_siwx_sign_message_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-siwx-sign-message-view')
], W3mSIWXSignMessageView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/index.js




























//# sourceMappingURL=index.js.map

/***/ }),

/***/ 78509:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiTooltipTrigger

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TooltipController.js
var TooltipController = __webpack_require__(99598);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip-trigger/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
    display: block;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-tooltip-trigger/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiTooltipTrigger = class WuiTooltipTrigger extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.text = '';
        this.open = TooltipController/* TooltipController */.I.state.open;
        this.unsubscribe.push(RouterController/* RouterController */.I.subscribeKey('view', () => {
            TooltipController/* TooltipController */.I.hide();
        }), ModalController/* ModalController */.W.subscribeKey('open', modalOpen => {
            if (!modalOpen) {
                TooltipController/* TooltipController */.I.hide();
            }
        }), TooltipController/* TooltipController */.I.subscribeKey('open', tooltipOpen => {
            this.open = tooltipOpen;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        TooltipController/* TooltipController */.I.hide();
    }
    render() {
        return (0,lit/* html */.qy) `
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `;
    }
    renderChildren() {
        return (0,lit/* html */.qy) `<slot></slot> `;
    }
    onMouseEnter() {
        const rect = this.getBoundingClientRect();
        if (!this.open) {
            TooltipController/* TooltipController */.I.showTooltip({
                message: this.text,
                triggerRect: {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top
                },
                variant: 'shade'
            });
        }
    }
    onMouseLeave(event) {
        if (!this.contains(event.relatedTarget)) {
            TooltipController/* TooltipController */.I.hide();
        }
    }
};
WuiTooltipTrigger.styles = [styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTooltipTrigger.prototype, "text", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], WuiTooltipTrigger.prototype, "open", void 0);
WuiTooltipTrigger = __decorate([
    (0,esm_exports/* customElement */.EM)('w3m-tooltip-trigger')
], WuiTooltipTrigger);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 43083:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiChip

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = __webpack_require__(63612);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  a {
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  a.disabled > wui-icon:not(.image-icon),
  a.disabled > wui-image {
    filter: grayscale(1);
  }

  a[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  a[data-variant='shade'],
  a[data-variant='shadeSmall'] {
    background-color: transparent;
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  a[data-variant='success'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-success-glass-010);
    background-color: var(--wui-color-success-glass-010);
    color: var(--wui-color-success-100);
  }

  a[data-variant='error'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-error-glass-010);
    background-color: var(--wui-color-error-glass-010);
    color: var(--wui-color-error-100);
  }

  a[data-variant='transparent'] {
    column-gap: var(--wui-spacing-xxs);
    background-color: transparent;
    color: var(--wui-color-fg-150);
  }

  a[data-variant='transparent'],
  a[data-variant='success'],
  a[data-variant='shadeSmall'],
  a[data-variant='error'] {
    padding: 7px var(--wui-spacing-s) 7px 10px;
  }

  a[data-variant='transparent']:has(wui-text:first-child),
  a[data-variant='success']:has(wui-text:first-child),
  a[data-variant='shadeSmall']:has(wui-text:first-child),
  a[data-variant='error']:has(wui-text:first-child) {
    padding: 7px var(--wui-spacing-s);
  }

  a[data-variant='fill'],
  a[data-variant='shade'] {
    column-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  a[data-variant='fill']:has(wui-text:first-child),
  a[data-variant='shade']:has(wui-text:first-child) {
    padding: 9px var(--wui-spacing-m) 9px var(--wui-spacing-m);
  }

  a[data-variant='fill'] > wui-image,
  a[data-variant='shade'] > wui-image {
    width: 24px;
    height: 24px;
  }

  a[data-variant='fill'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  a[data-variant='shade'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  a[data-variant='fill'] > wui-icon:not(.image-icon),
  a[data-variant='shade'] > wui-icon:not(.image-icon) {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-image,
  a[data-variant='success'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image,
  a[data-variant='error'] > wui-image {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-icon:not(.image-icon),
  a[data-variant='success'] > wui-icon:not(.image-icon),
  a[data-variant='shadeSmall'] > wui-icon:not(.image-icon),
  a[data-variant='error'] > wui-icon:not(.image-icon) {
    width: 12px;
    height: 12px;
  }

  a[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  a[data-variant='shade']:focus-visible,
  a[data-variant='shadeSmall']:focus-visible {
    background-color: var(--wui-color-gray-glass-015);
  }

  a[data-variant='transparent']:focus-visible {
    background-color: var(--wui-color-gray-glass-005);
  }

  a[data-variant='success']:focus-visible {
    background-color: var(--wui-color-success-glass-015);
  }

  a[data-variant='error']:focus-visible {
    background-color: var(--wui-color-error-glass-015);
  }

  a.disabled {
    color: var(--wui-color-gray-glass-015);
    background-color: var(--wui-color-gray-glass-015);
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a[data-variant='fill']:hover {
      background-color: var(--wui-color-accent-090);
    }

    a[data-variant='shade']:hover,
    a[data-variant='shadeSmall']:hover {
      background-color: var(--wui-color-gray-glass-015);
    }

    a[data-variant='transparent']:hover {
      background-color: var(--wui-color-gray-glass-005);
    }

    a[data-variant='success']:hover {
      background-color: var(--wui-color-success-glass-015);
    }

    a[data-variant='error']:hover {
      background-color: var(--wui-color-error-glass-015);
    }
  }

  a[data-variant='fill']:active {
    background-color: var(--wui-color-accent-080);
  }

  a[data-variant='shade']:active,
  a[data-variant='shadeSmall']:active {
    background-color: var(--wui-color-gray-glass-020);
  }

  a[data-variant='transparent']:active {
    background-color: var(--wui-color-gray-glass-010);
  }

  a[data-variant='success']:active {
    background-color: var(--wui-color-success-glass-020);
  }

  a[data-variant='error']:active {
    background-color: var(--wui-color-error-glass-020);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiChip = class WuiChip extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.variant = 'fill';
        this.imageSrc = undefined;
        this.imageIcon = undefined;
        this.imageIconSize = 'md';
        this.disabled = false;
        this.icon = 'externalLink';
        this.href = '';
        this.text = undefined;
    }
    render() {
        const isSmall = this.variant === 'success' || this.variant === 'transparent' || this.variant === 'shadeSmall';
        const textVariant = isSmall ? 'small-600' : 'paragraph-600';
        return (0,lit/* html */.qy) `
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled ? 'disabled' : ''}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${textVariant} color="inherit">
          ${this.title ? this.title : UiHelperUtil/* UiHelperUtil */.Z.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `;
    }
    imageTemplate() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        if (this.imageIcon) {
            return (0,lit/* html */.qy) `<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`;
        }
        return null;
    }
};
WuiChip.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "variant", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "imageIcon", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "imageIconSize", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiChip.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "icon", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "href", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChip.prototype, "text", void 0);
WuiChip = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-chip')
], WuiChip);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-chip.js

//# sourceMappingURL=wui-chip.js.map

/***/ }),

/***/ 38913:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiEmailInput

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-text/index.js + 1 modules
var wui_input_text = __webpack_require__(98848);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-email-input/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-email-input/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiEmailInput = class WuiEmailInput extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `;
    }
    templateError() {
        if (this.errorMessage) {
            return (0,lit/* html */.qy) `<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`;
        }
        return null;
    }
};
WuiEmailInput.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiEmailInput.prototype, "errorMessage", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiEmailInput.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiEmailInput.prototype, "value", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiEmailInput.prototype, "tabIdx", void 0);
WuiEmailInput = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-email-input')
], WuiEmailInput);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-email-input.js

//# sourceMappingURL=wui-email-input.js.map

/***/ }),

/***/ 84293:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiIconButton

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-button/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-button/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiIconButton = class WuiIconButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.text = '';
        this.icon = 'card';
    }
    render() {
        return (0,lit/* html */.qy) `<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`;
    }
};
WuiIconButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconButton.prototype, "text", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconButton.prototype, "icon", void 0);
WuiIconButton = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-icon-button')
], WuiIconButton);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-button.js

//# sourceMappingURL=wui-icon-button.js.map

/***/ }),

/***/ 77518:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiListSocial

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo/index.js + 1 modules
var wui_logo = __webpack_require__(70717);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-social/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-social/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiListSocial = class WuiListSocial extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.logo = 'google';
        this.name = 'Continue with google';
        this.align = 'left';
        this.disabled = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `;
    }
    templatePlacement() {
        if (this.align === 'center') {
            return (0,lit/* html */.qy) ` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`;
        }
        return null;
    }
};
WuiListSocial.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListSocial.prototype, "logo", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListSocial.prototype, "name", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListSocial.prototype, "align", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListSocial.prototype, "tabIdx", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListSocial.prototype, "disabled", void 0);
WuiListSocial = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-social')
], WuiListSocial);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-social.js

//# sourceMappingURL=wui-list-social.js.map

/***/ }),

/***/ 55710:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiListToken

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = __webpack_require__(63612);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-token/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-token/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiListToken = class WuiListToken extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tokenName = '';
        this.tokenImageUrl = '';
        this.tokenValue = 0.0;
        this.tokenAmount = '0.0';
        this.tokenCurrency = '';
        this.clickable = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${UiHelperUtil/* UiHelperUtil */.Z.formatNumberToLocalString(this.tokenAmount, 4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `;
    }
    visualTemplate() {
        if (this.tokenName && this.tokenImageUrl) {
            return (0,lit/* html */.qy) `<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`;
        }
        return (0,lit/* html */.qy) `<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`;
    }
};
WuiListToken.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListToken.prototype, "tokenName", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListToken.prototype, "tokenImageUrl", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiListToken.prototype, "tokenValue", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListToken.prototype, "tokenAmount", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListToken.prototype, "tokenCurrency", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListToken.prototype, "clickable", void 0);
WuiListToken = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-token')
], WuiListToken);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-token.js

//# sourceMappingURL=wui-list-token.js.map

/***/ }),

/***/ 52619:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_network_image_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25981);

//# sourceMappingURL=wui-network-image.js.map

/***/ }),

/***/ 55618:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiSeparator

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-separator/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-color-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
    transition: background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-separator/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiSeparator = class WuiSeparator extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.text = '';
    }
    render() {
        return (0,lit/* html */.qy) `${this.template()}`;
    }
    template() {
        if (this.text) {
            return (0,lit/* html */.qy) `<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`;
        }
        return null;
    }
};
WuiSeparator.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiSeparator.prototype, "text", void 0);
WuiSeparator = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-separator')
], WuiSeparator);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-separator.js

//# sourceMappingURL=wui-separator.js.map

/***/ }),

/***/ 35090:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_shimmer_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41497);

//# sourceMappingURL=wui-shimmer.js.map

/***/ }),

/***/ 41684:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_wallet_image_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91383);

//# sourceMappingURL=wui-wallet-image.js.map

/***/ }),

/***/ 27512:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ networkSvgMd)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12618);

const networkSvgMd = (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .svg */ .JW) `<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;
//# sourceMappingURL=networkMd.js.map

/***/ }),

/***/ 76867:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiAvatar

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = __webpack_require__(63612);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-avatar/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-avatar/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiAvatar = class WuiAvatar extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.alt = undefined;
        this.address = undefined;
        this.size = 'xl';
    }
    render() {
        this.style.cssText = `
    --local-width: var(--wui-icon-box-size-${this.size});
    --local-height: var(--wui-icon-box-size-${this.size});
    `;
        return (0,lit/* html */.qy) `${this.visualTemplate()}`;
    }
    visualTemplate() {
        if (this.imageSrc) {
            this.dataset['variant'] = 'image';
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.alt ?? 'avatar'}></wui-image>`;
        }
        else if (this.address) {
            this.dataset['variant'] = 'generated';
            const cssColors = UiHelperUtil/* UiHelperUtil */.Z.generateAvatarColors(this.address);
            this.style.cssText += `\n ${cssColors}`;
            return null;
        }
        this.dataset['variant'] = 'default';
        return null;
    }
};
WuiAvatar.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAvatar.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAvatar.prototype, "alt", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAvatar.prototype, "address", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiAvatar.prototype, "size", void 0);
WuiAvatar = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-avatar')
], WuiAvatar);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 85999:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiChipButton

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let WuiChipButton = class WuiChipButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.variant = 'accent';
        this.imageSrc = '';
        this.disabled = false;
        this.icon = 'externalLink';
        this.size = 'md';
        this.text = '';
    }
    render() {
        const textVariant = this.size === 'sm' ? 'small-600' : 'paragraph-600';
        return (0,lit/* html */.qy) `
      <button
        class=${this.disabled ? 'disabled' : ''}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc ? (0,lit/* html */.qy) `<wui-image src=${this.imageSrc}></wui-image>` : null}
        <wui-text variant=${textVariant} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `;
    }
};
WuiChipButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChipButton.prototype, "variant", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChipButton.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiChipButton.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChipButton.prototype, "icon", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChipButton.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiChipButton.prototype, "text", void 0);
WuiChipButton = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-chip-button')
], WuiChipButton);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 70717:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiLogo

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-logo/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiLogo = class WuiLogo extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.logo = 'google';
    }
    render() {
        return (0,lit/* html */.qy) `<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `;
    }
};
WuiLogo.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiLogo.prototype, "logo", void 0);
WuiLogo = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-logo')
], WuiLogo);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 25981:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiNetworkImage

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkLg.js

const networkSvgLg = (0,lit/* svg */.JW) `<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;
//# sourceMappingURL=networkLg.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkMd.js
var networkMd = __webpack_require__(27512);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkSm.js

const networkSvgSm = (0,lit/* svg */.JW) `
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;
//# sourceMappingURL=networkSm.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-image/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: var(--wui-color-gray-glass-002);
    border-radius: 100%;
    outline: 1px solid var(--wui-color-gray-glass-005);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-image/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiNetworkImage = class WuiNetworkImage extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.name = 'uknown';
        this.networkImagesBySize = {
            sm: networkSvgSm,
            md: networkMd/* networkSvgMd */.a,
            lg: networkSvgLg
        };
        this.selected = false;
        this.round = false;
    }
    render() {
        if (this.round) {
            this.dataset['round'] = 'true';
            this.style.cssText = `
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `;
        }
        else {
            this.style.cssText = `

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `;
        }
        return (0,lit/* html */.qy) `${this.templateVisual()} ${this.svgTemplate()} `;
    }
    svgTemplate() {
        if (this.round) {
            return null;
        }
        return this.networkImagesBySize[this.size];
    }
    templateVisual() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
        }
        return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiNetworkImage.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiNetworkImage.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiNetworkImage.prototype, "name", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Object })
], WuiNetworkImage.prototype, "networkImagesBySize", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiNetworkImage.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiNetworkImage.prototype, "selected", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiNetworkImage.prototype, "round", void 0);
WuiNetworkImage = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-network-image')
], WuiNetworkImage);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 91383:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiWalletImage

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js + 1 modules
var wui_icon_box = __webpack_require__(12851);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiWalletImage = class WuiWalletImage extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.name = '';
        this.installed = false;
        this.badgeSize = 'xs';
    }
    render() {
        let borderRadius = 'xxs';
        if (this.size === 'lg') {
            borderRadius = 'm';
        }
        else if (this.size === 'md') {
            borderRadius = 'xs';
        }
        else {
            borderRadius = 'xxs';
        }
        this.style.cssText = `
       --local-border-radius: var(--wui-border-radius-${borderRadius});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `;
        if (this.walletIcon) {
            this.dataset['walletIcon'] = this.walletIcon;
        }
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `;
    }
    templateVisual() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`;
        }
        else if (this.walletIcon) {
            return (0,lit/* html */.qy) `<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`;
        }
        return (0,lit/* html */.qy) `<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
    }
};
WuiWalletImage.styles = [ThemeUtil/* elementStyles */.fD, ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiWalletImage.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiWalletImage.prototype, "name", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiWalletImage.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiWalletImage.prototype, "walletIcon", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiWalletImage.prototype, "installed", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiWalletImage.prototype, "badgeSize", void 0);
WuiWalletImage = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-wallet-image')
], WuiWalletImage);

//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=4185.bundle.js.map