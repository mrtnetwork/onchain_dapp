"use strict";
(self["webpackChunkOnChain_DAPP_Examples"] = self["webpackChunkOnChain_DAPP_Examples"] || []).push([[9567],{

/***/ 29567:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mWalletReceiveView: () => (/* reexport */ W3mWalletReceiveView)
});

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js
var AssetUtil = __webpack_require__(27601);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var ThemeController = __webpack_require__(68996);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js
var ChainControllerUtil = __webpack_require__(74496);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/index.js + 1 modules
var wui_chip_button = __webpack_require__(85999);
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-chip-button.js

//# sourceMappingURL=wui-chip-button.js.map
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
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-compatible-network/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-compatible-network/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiCompatibleNetwork = class WuiCompatibleNetwork extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.networkImages = [''];
        this.text = '';
    }
    render() {
        return (0,lit/* html */.qy) `
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `;
    }
    networksTemplate() {
        const slicedNetworks = this.networkImages.slice(0, 5);
        return (0,lit/* html */.qy) ` <wui-flex class="networks">
      ${slicedNetworks?.map(network => (0,lit/* html */.qy) ` <wui-flex class="network-icon"> <wui-image src=${network}></wui-image> </wui-flex>`)}
    </wui-flex>`;
    }
};
WuiCompatibleNetwork.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiCompatibleNetwork.prototype, "networkImages", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiCompatibleNetwork.prototype, "text", void 0);
WuiCompatibleNetwork = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-compatible-network')
], WuiCompatibleNetwork);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-compatible-network.js

//# sourceMappingURL=wui-compatible-network.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var exports_wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-qr-code.js + 3 modules
var wui_qr_code = __webpack_require__(66283);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var exports_wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-receive-view/styles.js

/* harmony default export */ const w3m_wallet_receive_view_styles = ((0,lit/* css */.AH) `
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-receive-view/index.js
var w3m_wallet_receive_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mWalletReceiveView = class W3mWalletReceiveView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.address = AccountController/* AccountController */.U.state.address;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.unsubscribe.push(...[
            AccountController/* AccountController */.U.subscribe(val => {
                if (val.address) {
                    this.address = val.address;
                    this.profileName = val.profileName;
                }
                else {
                    SnackController/* SnackController */.P.showError('Account not found');
                }
            })
        ], ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => {
            if (val?.id) {
                this.network = val;
            }
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        if (!this.address) {
            throw new Error('w3m-wallet-receive-view: No account provided');
        }
        const networkImage = AssetUtil/* AssetUtil */.$.getNetworkImage(this.network);
        return (0,lit/* html */.qy) ` <wui-flex
      flexDirection="column"
      .padding=${['0', 'l', 'l', 'l']}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${esm_exports/* UiHelperUtil */.Zv.getTruncateString({
            string: this.profileName || this.address || '',
            charsStart: this.profileName ? 18 : 4,
            charsEnd: this.profileName ? 0 : 4,
            truncate: this.profileName ? 'end' : 'middle'
        })}
        icon="copy"
        size="sm"
        imageSrc=${networkImage ? networkImage : ''}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${['l', '0', '0', '0']}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${ThemeController/* ThemeController */.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${true}
          color=${(0,if_defined/* ifDefined */.J)(ThemeController/* ThemeController */.W.state.themeVariables['--w3m-qr-color'])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`;
    }
    networkTemplate() {
        const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        const isNetworkEnabledForSmartAccounts = ChainController/* ChainController */.W.checkIfSmartAccountEnabled();
        const caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        const namespaceNetworks = requestedCaipNetworks.filter(network => network?.chainNamespace === caipNetwork?.chainNamespace);
        if ((0,ChainControllerUtil/* getPreferredAccountType */.lj)(caipNetwork?.chainNamespace) ===
            W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT &&
            isNetworkEnabledForSmartAccounts) {
            if (!caipNetwork) {
                return null;
            }
            return (0,lit/* html */.qy) `<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[AssetUtil/* AssetUtil */.$.getNetworkImage(caipNetwork) ?? '']}
      ></wui-compatible-network>`;
        }
        const slicedNetworks = namespaceNetworks
            ?.filter(network => network?.assets?.imageId)
            ?.slice(0, 5);
        const imagesArray = slicedNetworks.map(AssetUtil/* AssetUtil */.$.getNetworkImage).filter(Boolean);
        return (0,lit/* html */.qy) `<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${imagesArray}
    ></wui-compatible-network>`;
    }
    onReceiveClick() {
        RouterController/* RouterController */.I.push('WalletCompatibleNetworks');
    }
    onCopyClick() {
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
W3mWalletReceiveView.styles = w3m_wallet_receive_view_styles;
w3m_wallet_receive_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletReceiveView.prototype, "address", void 0);
w3m_wallet_receive_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletReceiveView.prototype, "profileName", void 0);
w3m_wallet_receive_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletReceiveView.prototype, "network", void 0);
W3mWalletReceiveView = w3m_wallet_receive_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-receive-view')
], W3mWalletReceiveView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/receive.js

//# sourceMappingURL=receive.js.map

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip-button/index.js
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

/***/ })

}]);
//# sourceMappingURL=9567.bundle.js.map