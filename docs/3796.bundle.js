"use strict";
(self["webpackChunkOnChain_DAPP_Examples"] = self["webpackChunkOnChain_DAPP_Examples"] || []).push([[3796],{

/***/ 5752:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiTag

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }

  :host([data-size='xs']) {
    height: var(--wui-spacing-2l);
    padding: 0 var(--wui-spacing-3xs) !important;
  }

  :host([data-size='xs']) > wui-text {
    transform: translateY(2%);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-tag/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiTag = class WuiTag extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.variant = 'main';
        this.size = 'lg';
    }
    render() {
        this.dataset['variant'] = this.variant;
        this.dataset['size'] = this.size;
        const textVariant = this.size === 'md' || this.size === 'xs' ? 'mini-700' : 'micro-700';
        return (0,lit/* html */.qy) `
      <wui-text data-variant=${this.variant} variant=${textVariant} color="inherit">
        <slot></slot>
      </wui-text>
    `;
    }
};
WuiTag.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTag.prototype, "variant", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTag.prototype, "size", void 0);
WuiTag = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-tag')
], WuiTag);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7068:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiIconLink

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    :host(:not([size='sm'])) button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-link/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiIconLink = class WuiIconLink extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.disabled = false;
        this.icon = 'copy';
        this.iconColor = 'inherit';
    }
    render() {
        this.dataset['size'] = this.size;
        let borderRadius = '';
        let padding = '';
        switch (this.size) {
            case 'lg':
                borderRadius = '--wui-border-radius-xs';
                padding = '--wui-spacing-1xs';
                break;
            case 'sm':
                borderRadius = '--wui-border-radius-3xs';
                padding = '--wui-spacing-xxs';
                break;
            default:
                borderRadius = '--wui-border-radius-xxs';
                padding = '--wui-spacing-2xs';
                break;
        }
        this.style.cssText = `
    --local-border-radius: var(${borderRadius});
    --local-padding: var(${padding});
    `;
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `;
    }
};
WuiIconLink.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, ThemeUtil/* colorStyles */.ck, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconLink.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiIconLink.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconLink.prototype, "icon", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconLink.prototype, "iconColor", void 0);
WuiIconLink = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-icon-link')
], WuiIconLink);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 23796:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mApproveTransactionView: () => (/* reexport */ W3mApproveTransactionView),
  W3mRegisterAccountNameSuccess: () => (/* reexport */ W3mRegisterAccountNameSuccess),
  W3mRegisterAccountNameView: () => (/* reexport */ W3mRegisterAccountNameView),
  W3mUpgradeWalletView: () => (/* reexport */ W3mUpgradeWalletView)
});

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(23096);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js
var ConnectorController = __webpack_require__(36010);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var ThemeController = __webpack_require__(68996);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-approve-transaction-view/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-approve-transaction-view/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






const PAGE_HEIGHT = 600;
const PAGE_WIDTH = 360;
const HEADER_HEIGHT = 64;
let W3mApproveTransactionView = class W3mApproveTransactionView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.bodyObserver = undefined;
        this.unsubscribe = [];
        this.iframe = document.getElementById('w3m-iframe');
        this.ready = false;
        this.unsubscribe.push(...[
            ModalController/* ModalController */.W.subscribeKey('open', isOpen => {
                if (!isOpen) {
                    this.onHideIframe();
                }
            }),
            ModalController/* ModalController */.W.subscribeKey('shake', val => {
                if (val) {
                    this.iframe.style.animation = `w3m-shake 500ms var(--wui-ease-out-power-2)`;
                }
                else {
                    this.iframe.style.animation = 'none';
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.onHideIframe();
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.bodyObserver?.unobserve(window.document.body);
    }
    async firstUpdated() {
        await this.syncTheme();
        this.iframe.style.display = 'block';
        const container = this?.renderRoot?.querySelector('div');
        this.bodyObserver = new ResizeObserver(entries => {
            const contentBoxSize = entries?.[0]?.contentBoxSize;
            const width = contentBoxSize?.[0]?.inlineSize;
            this.iframe.style.height = `${PAGE_HEIGHT}px`;
            container.style.height = `${PAGE_HEIGHT}px`;
            if (width && width <= 430) {
                this.iframe.style.width = '100%';
                this.iframe.style.left = '0px';
                this.iframe.style.bottom = '0px';
                this.iframe.style.top = 'unset';
            }
            else {
                this.iframe.style.width = `${PAGE_WIDTH}px`;
                this.iframe.style.left = `calc(50% - ${PAGE_WIDTH / 2}px)`;
                this.iframe.style.top = `calc(50% - ${PAGE_HEIGHT / 2}px + ${HEADER_HEIGHT / 2}px)`;
                this.iframe.style.bottom = 'unset';
            }
            this.ready = true;
            this.onShowIframe();
        });
        this.bodyObserver.observe(window.document.body);
    }
    render() {
        return (0,lit/* html */.qy) `<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
    }
    onShowIframe() {
        const isMobile = window.innerWidth <= 430;
        this.iframe.style.animation = isMobile
            ? 'w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)'
            : 'w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)';
    }
    onHideIframe() {
        this.iframe.style.display = 'none';
        this.iframe.style.animation = 'w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)';
    }
    async syncTheme() {
        const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        if (authConnector) {
            const themeMode = ThemeController/* ThemeController */.W.getSnapshot().themeMode;
            const themeVariables = ThemeController/* ThemeController */.W.getSnapshot().themeVariables;
            await authConnector.provider.syncTheme({
                themeVariables,
                w3mThemeVariables: (0,ThemeUtil/* getW3mThemeVariables */.o)(themeVariables, themeMode)
            });
        }
    }
};
W3mApproveTransactionView.styles = styles;
__decorate([
    (0,decorators/* state */.wk)()
], W3mApproveTransactionView.prototype, "ready", void 0);
W3mApproveTransactionView = __decorate([
    (0,esm_exports/* customElement */.EM)('w3m-approve-transaction-view')
], W3mApproveTransactionView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(62944);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-chip.js + 2 modules
var wui_chip = __webpack_require__(43083);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-upgrade-wallet-view/index.js
var w3m_upgrade_wallet_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mUpgradeWalletView = class W3mUpgradeWalletView extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${ConstantsUtil/* ConstantsUtil */.oU.SECURE_SITE_DASHBOARD}
          imageSrc=${ConstantsUtil/* ConstantsUtil */.oU.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `;
    }
};
W3mUpgradeWalletView = w3m_upgrade_wallet_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-upgrade-wallet-view')
], W3mUpgradeWalletView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/lit/directives/ref.js + 1 modules
var ref = __webpack_require__(7610);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js
var utils_ConstantsUtil = __webpack_require__(24376);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EnsController.js + 1 modules
var EnsController = __webpack_require__(24549);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js
var ChainControllerUtil = __webpack_require__(74496);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js + 1 modules
var wui_loading_spinner = __webpack_require__(20880);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var components_wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var utils_ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-text/index.js + 1 modules
var wui_input_text = __webpack_require__(98848);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ens-input/styles.js

/* harmony default export */ const wui_ens_input_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-ens-input/index.js
var wui_ens_input_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiEnsInput = class WuiEnsInput extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.loading = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-input-text
        value=${(0,if_defined/* ifDefined */.J)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value || ''}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `;
    }
    baseNameTemplate() {
        return (0,lit/* html */.qy) `<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${utils_ConstantsUtil/* ConstantsUtil */.o.WC_NAME_SUFFIX}
    </wui-text>`;
    }
    loadingTemplate() {
        return this.loading
            ? (0,lit/* html */.qy) `<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
            : null;
    }
    errorTemplate() {
        if (this.errorMessage) {
            return (0,lit/* html */.qy) `<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`;
        }
        return null;
    }
};
WuiEnsInput.styles = [utils_ThemeUtil/* resetStyles */.W5, wui_ens_input_styles];
wui_ens_input_decorate([
    (0,decorators/* property */.MZ)()
], WuiEnsInput.prototype, "errorMessage", void 0);
wui_ens_input_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiEnsInput.prototype, "disabled", void 0);
wui_ens_input_decorate([
    (0,decorators/* property */.MZ)()
], WuiEnsInput.prototype, "value", void 0);
wui_ens_input_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiEnsInput.prototype, "loading", void 0);
WuiEnsInput = wui_ens_input_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-ens-input')
], WuiEnsInput);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-ens-input.js

//# sourceMappingURL=wui-ens-input.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js
var wui_icon = __webpack_require__(51636);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-link.js
var wui_icon_link = __webpack_require__(64865);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-spinner.js
var exports_wui_loading_spinner = __webpack_require__(93373);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-tag.js
var wui_tag = __webpack_require__(38253);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-view/styles.js

/* harmony default export */ const w3m_register_account_name_view_styles = ((0,lit/* css */.AH) `
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .suggestion:hover {
    background-color: var(--wui-color-gray-glass-005);
    cursor: pointer;
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
  }

  wui-icon-link {
    position: absolute;
    right: 20px;
    transform: translateY(11px);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-view/index.js
var w3m_register_account_name_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















let W3mRegisterAccountNameView = class W3mRegisterAccountNameView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.formRef = (0,ref/* createRef */._)();
        this.usubscribe = [];
        this.name = '';
        this.error = '';
        this.loading = EnsController/* EnsController */.f.state.loading;
        this.suggestions = EnsController/* EnsController */.f.state.suggestions;
        this.registered = false;
        this.profileName = AccountController/* AccountController */.U.state.profileName;
        this.onDebouncedNameInputChange = CoreHelperUtil/* CoreHelperUtil */.w.debounce((value) => {
            if (EnsController/* EnsController */.f.validateName(value)) {
                this.error = '';
                this.name = value;
                EnsController/* EnsController */.f.getSuggestions(value);
                EnsController/* EnsController */.f.isNameRegistered(value).then(registered => {
                    this.registered = registered;
                });
            }
            else if (value.length < 4) {
                this.error = 'Name must be at least 4 characters long';
            }
            else {
                this.error = 'Can only contain letters, numbers and - characters';
            }
        });
        this.usubscribe.push(...[
            EnsController/* EnsController */.f.subscribe(val => {
                this.suggestions = val.suggestions;
                this.loading = val.loading;
            }),
            AccountController/* AccountController */.U.subscribeKey('profileName', val => {
                this.profileName = val;
                if (val) {
                    this.error = 'You already own a name';
                }
            })
        ]);
    }
    firstUpdated() {
        this.formRef.value?.addEventListener('keydown', this.onEnterKey.bind(this));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.usubscribe.forEach(unsub => unsub());
        this.formRef.value?.removeEventListener('keydown', this.onEnterKey.bind(this));
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${['0', 's', 'm', 's']}
      >
        <form ${(0,ref/* ref */.K)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
    }
    submitButtonTemplate() {
        const showSubmit = this.isAllowedToSubmit();
        return showSubmit
            ? (0,lit/* html */.qy) `
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        `
            : null;
    }
    onSelectSuggestion(name) {
        return () => {
            this.name = name;
            this.registered = false;
            this.requestUpdate();
        };
    }
    onNameInputChange(event) {
        this.onDebouncedNameInputChange(event.detail);
    }
    nameSuggestionTagTemplate() {
        if (this.loading) {
            return (0,lit/* html */.qy) `<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>`;
        }
        return this.registered
            ? (0,lit/* html */.qy) `<wui-tag variant="shade" size="lg">Registered</wui-tag>`
            : (0,lit/* html */.qy) `<wui-tag variant="success" size="lg">Available</wui-tag>`;
    }
    templateSuggestions() {
        if (!this.name || this.name.length < 4 || this.error) {
            return null;
        }
        const suggestions = this.registered ? this.suggestions.filter(s => s.name !== this.name) : [];
        return (0,lit/* html */.qy) `<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        data-testid="account-name-suggestion"
        .padding=${['m', 'm', 'm', 'm']}
        justifyContent="space-between"
        class="suggestion"
        @click=${this.onSubmitName.bind(this)}
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${suggestions.map(suggestion => this.availableNameTemplate(suggestion.name))}
    </wui-flex>`;
    }
    availableNameTemplate(suggestion) {
        return (0,lit/* html */.qy) ` <wui-flex
      data-testid="account-name-suggestion"
      .padding=${['m', 'm', 'm', 'm']}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(suggestion)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${suggestion}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`;
    }
    isAllowedToSubmit() {
        return (!this.loading &&
            !this.registered &&
            !this.error &&
            !this.profileName &&
            EnsController/* EnsController */.f.validateName(this.name));
    }
    async onSubmitName() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        try {
            if (!this.isAllowedToSubmit()) {
                return;
            }
            const ensName = `${this.name}${utils_ConstantsUtil/* ConstantsUtil */.o.WC_NAME_SUFFIX}`;
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_INITIATED',
                properties: {
                    isSmartAccount: (0,ChainControllerUtil/* getPreferredAccountType */.lj)(activeChainNamespace) ===
                        W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName
                }
            });
            await EnsController/* EnsController */.f.registerName(ensName);
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_SUCCESS',
                properties: {
                    isSmartAccount: (0,ChainControllerUtil/* getPreferredAccountType */.lj)(activeChainNamespace) ===
                        W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName
                }
            });
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(error.message);
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'REGISTER_NAME_ERROR',
                properties: {
                    isSmartAccount: (0,ChainControllerUtil/* getPreferredAccountType */.lj)(activeChainNamespace) ===
                        W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,
                    ensName: `${this.name}${utils_ConstantsUtil/* ConstantsUtil */.o.WC_NAME_SUFFIX}`,
                    error: error?.message || 'Unknown error'
                }
            });
        }
    }
    onEnterKey(event) {
        if (event.key === 'Enter' && this.isAllowedToSubmit()) {
            this.onSubmitName();
        }
    }
};
W3mRegisterAccountNameView.styles = w3m_register_account_name_view_styles;
w3m_register_account_name_view_decorate([
    (0,decorators/* property */.MZ)()
], W3mRegisterAccountNameView.prototype, "errorMessage", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "name", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "error", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "loading", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "suggestions", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "registered", void 0);
w3m_register_account_name_view_decorate([
    (0,decorators/* state */.wk)()
], W3mRegisterAccountNameView.prototype, "profileName", void 0);
W3mRegisterAccountNameView = w3m_register_account_name_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-register-account-name-view')
], W3mRegisterAccountNameView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/NavigationUtil.js
var NavigationUtil = __webpack_require__(45839);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var wui_icon_box = __webpack_require__(77616);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-success-view/styles.js

/* harmony default export */ const w3m_register_account_name_success_view_styles = ((0,lit/* css */.AH) `
  .continue-button-container {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-register-account-name-success-view/index.js
var w3m_register_account_name_success_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mRegisterAccountNameSuccess = class W3mRegisterAccountNameSuccess extends lit/* LitElement */.WF {
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
          Learn more
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
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
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
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`;
    }
    redirectToAccount() {
        RouterController/* RouterController */.I.replace('Account');
    }
};
W3mRegisterAccountNameSuccess.styles = w3m_register_account_name_success_view_styles;
W3mRegisterAccountNameSuccess = w3m_register_account_name_success_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-register-account-name-success-view')
], W3mRegisterAccountNameSuccess);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/embedded-wallet.js




//# sourceMappingURL=embedded-wallet.js.map

/***/ }),

/***/ 36887:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiImage

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiImage = class WuiImage extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.src = './path/to/image.jpg';
        this.alt = 'Image';
        this.size = undefined;
        this.objectFit = 'cover';
    }
    render() {
        if (this.objectFit) {
            this.dataset['objectFit'] = this.objectFit;
        }
        this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : '100%'};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : '100%'};
      `;
        return (0,lit/* html */.qy) `<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
    }
    handleImageError() {
        this.dispatchEvent(new CustomEvent('onLoadError', { bubbles: true, composed: true }));
    }
};
WuiImage.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* colorStyles */.ck, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiImage.prototype, "src", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiImage.prototype, "alt", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiImage.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiImage.prototype, "objectFit", void 0);
WuiImage = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-image')
], WuiImage);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 38253:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_tag_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5752);

//# sourceMappingURL=wui-tag.js.map

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-chip/index.js
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
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-chip.js

//# sourceMappingURL=wui-chip.js.map

/***/ }),

/***/ 45101:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiLink

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiLink = class WuiLink extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.disabled = false;
        this.color = 'inherit';
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
    }
};
WuiLink.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiLink.prototype, "tabIdx", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiLink.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiLink.prototype, "color", void 0);
WuiLink = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-link')
], WuiLink);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js

//# sourceMappingURL=wui-link.js.map

/***/ }),

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

/***/ 51636:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_icon_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2132);

//# sourceMappingURL=wui-icon.js.map

/***/ }),

/***/ 64865:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_icon_link_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7068);

//# sourceMappingURL=wui-icon-link.js.map

/***/ }),

/***/ 77616:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_icon_box_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12851);

//# sourceMappingURL=wui-icon-box.js.map

/***/ }),

/***/ 93373:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_loading_spinner_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20880);

//# sourceMappingURL=wui-loading-spinner.js.map

/***/ })

}]);
//# sourceMappingURL=3796.bundle.js.map