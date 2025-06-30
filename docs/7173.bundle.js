"use strict";
(self["webpackChunkpython_server"] = self["webpackChunkpython_server"] || []).push([[7173],{

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

/***/ 57173:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mBuyInProgressView: () => (/* reexport */ W3mBuyInProgressView),
  W3mOnRampActivityView: () => (/* reexport */ W3mOnRampActivityView),
  W3mOnRampProvidersView: () => (/* reexport */ W3mOnRampProvidersView),
  W3mOnrampFiatSelectView: () => (/* reexport */ W3mOnrampFiatSelectView),
  W3mOnrampTokensView: () => (/* reexport */ W3mOnrampTokensView),
  W3mOnrampWidget: () => (/* reexport */ W3mOnrampWidget),
  W3mWhatIsABuyView: () => (/* reexport */ W3mWhatIsABuyView)
});

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/DateUtil.js
var DateUtil = __webpack_require__(48169);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OnRampController.js
var OnRampController = __webpack_require__(95884);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TransactionsController.js
var TransactionsController = __webpack_require__(86360);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AssetController.js
var AssetController = __webpack_require__(73337);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js + 1 modules
var OptionsController = __webpack_require__(42733);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-transaction-list-item-loader.js + 2 modules
var wui_transaction_list_item_loader = __webpack_require__(96409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js
var ApiController = __webpack_require__(88249);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var wui_icon_box = __webpack_require__(77616);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-image.js
var wui_image = __webpack_require__(93516);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-spinner.js
var wui_loading_spinner = __webpack_require__(93373);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-activity-item/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
  }

  :host > wui-flex:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .purchase-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: var(--wui-icon-box-size-lg);
    height: var(--wui-icon-box-size-lg);
  }

  .purchase-image-container wui-image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
  }

  .purchase-image-container wui-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .purchase-image-container wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-activity-item/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mOnRampActivityItem = class W3mOnRampActivityItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.color = 'inherit';
        this.label = 'Bought';
        this.purchaseValue = '';
        this.purchaseCurrency = '';
        this.date = '';
        this.completed = false;
        this.inProgress = false;
        this.failed = false;
        this.onClick = null;
        this.symbol = '';
    }
    firstUpdated() {
        if (!this.icon) {
            this.fetchTokenImage();
        }
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex>
        ${this.imageTemplate()}
        <wui-flex flexDirection="column" gap="4xs" flexGrow="1">
          <wui-flex gap="xxs" alignItems="center" justifyContent="flex-start">
            ${this.statusIconTemplate()}
            <wui-text variant="paragraph-500" color="fg-100"> ${this.label}</wui-text>
          </wui-flex>
          <wui-text variant="small-400" color="fg-200">
            + ${this.purchaseValue} ${this.purchaseCurrency}
          </wui-text>
        </wui-flex>
        ${this.inProgress
            ? (0,lit/* html */.qy) `<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`
            : (0,lit/* html */.qy) `<wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>`}
      </wui-flex>
    `;
    }
    async fetchTokenImage() {
        await ApiController/* ApiController */.N._fetchTokenImage(this.purchaseCurrency);
    }
    statusIconTemplate() {
        if (this.inProgress) {
            return null;
        }
        return this.completed ? this.boughtIconTemplate() : this.errorIconTemplate();
    }
    errorIconTemplate() {
        return (0,lit/* html */.qy) `<wui-icon-box
      size="xxs"
      iconColor="error-100"
      backgroundColor="error-100"
      background="opaque"
      icon="close"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
    }
    imageTemplate() {
        const icon = this.icon || `https://avatar.vercel.sh/andrew.svg?size=50&text=${this.symbol}`;
        return (0,lit/* html */.qy) `<wui-flex class="purchase-image-container">
      <wui-image src=${icon}></wui-image>
    </wui-flex>`;
    }
    boughtIconTemplate() {
        return (0,lit/* html */.qy) `<wui-icon-box
      size="xxs"
      iconColor="success-100"
      backgroundColor="success-100"
      background="opaque"
      icon="arrowBottom"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`;
    }
};
W3mOnRampActivityItem.styles = [styles];
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampActivityItem.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "color", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "label", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "purchaseValue", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "purchaseCurrency", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "date", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampActivityItem.prototype, "completed", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampActivityItem.prototype, "inProgress", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampActivityItem.prototype, "failed", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "onClick", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "symbol", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampActivityItem.prototype, "icon", void 0);
W3mOnRampActivityItem = __decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-activity-item')
], W3mOnRampActivityItem);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-activity-view/styles.js

/* harmony default export */ const w3m_onramp_activity_view_styles = ((0,lit/* css */.AH) `
  :host > wui-flex {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: var(--wui-spacing-m);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }

  :host > wui-flex > wui-flex {
    width: 100%;
  }

  wui-transaction-list-item-loader {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-activity-view/index.js
var w3m_onramp_activity_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











const LOADING_ITEM_COUNT = 7;
let W3mOnRampActivityView = class W3mOnRampActivityView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedOnRampProvider = OnRampController/* OnRampController */.aG.state.selectedProvider;
        this.loading = false;
        this.coinbaseTransactions = TransactionsController/* TransactionsController */.W.state.coinbaseTransactions;
        this.tokenImages = AssetController/* AssetController */.j.state.tokenImages;
        this.unsubscribe.push(...[
            OnRampController/* OnRampController */.aG.subscribeKey('selectedProvider', val => {
                this.selectedOnRampProvider = val;
            }),
            AssetController/* AssetController */.j.subscribeKey('tokenImages', val => (this.tokenImages = val)),
            () => {
                clearTimeout(this.refetchTimeout);
            },
            TransactionsController/* TransactionsController */.W.subscribe(val => {
                this.coinbaseTransactions = { ...val.coinbaseTransactions };
            })
        ]);
        TransactionsController/* TransactionsController */.W.clearCursor();
        this.fetchTransactions();
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.loading ? this.templateLoading() : this.templateTransactionsByYear()}
      </wui-flex>
    `;
    }
    templateTransactions(transactions) {
        return transactions?.map(transaction => {
            const date = DateUtil/* DateUtil */.r.formatDate(transaction?.metadata?.minedAt);
            const transfer = transaction.transfers[0];
            const fungibleInfo = transfer?.fungible_info;
            if (!fungibleInfo) {
                return null;
            }
            const icon = fungibleInfo?.icon?.url || this.tokenImages?.[fungibleInfo.symbol || ''];
            return (0,lit/* html */.qy) `
        <w3m-onramp-activity-item
          label="Bought"
          .completed=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_SUCCESS'}
          .inProgress=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS'}
          .failed=${transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_FAILED'}
          purchaseCurrency=${(0,if_defined/* ifDefined */.J)(fungibleInfo.symbol)}
          purchaseValue=${transfer.quantity.numeric}
          date=${date}
          icon=${(0,if_defined/* ifDefined */.J)(icon)}
          symbol=${(0,if_defined/* ifDefined */.J)(fungibleInfo.symbol)}
        ></w3m-onramp-activity-item>
      `;
        });
    }
    templateTransactionsByYear() {
        const sortedYearKeys = Object.keys(this.coinbaseTransactions).sort().reverse();
        return sortedYearKeys.map(year => {
            const yearInt = parseInt(year, 10);
            const sortedMonthIndexes = new Array(12)
                .fill(null)
                .map((_, idx) => idx)
                .reverse();
            return sortedMonthIndexes.map(month => {
                const groupTitle = esm_exports/* TransactionUtil */.tt.getTransactionGroupTitle(yearInt, month);
                const transactions = this.coinbaseTransactions[yearInt]?.[month];
                if (!transactions) {
                    return null;
                }
                return (0,lit/* html */.qy) `
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${['xs', 's', 's', 's']}
            >
              <wui-text variant="paragraph-500" color="fg-200">${groupTitle}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(transactions)}
            </wui-flex>
          </wui-flex>
        `;
            });
        });
    }
    async fetchTransactions() {
        const provider = 'coinbase';
        if (provider === 'coinbase') {
            await this.fetchCoinbaseTransactions();
        }
    }
    async fetchCoinbaseTransactions() {
        const address = AccountController/* AccountController */.U.state.address;
        const projectId = OptionsController/* OptionsController */.H.state.projectId;
        if (!address) {
            throw new Error('No address found');
        }
        if (!projectId) {
            throw new Error('No projectId found');
        }
        this.loading = true;
        await TransactionsController/* TransactionsController */.W.fetchTransactions(address, 'coinbase');
        this.loading = false;
        this.refetchLoadingTransactions();
    }
    refetchLoadingTransactions() {
        const today = new Date();
        const currentMonthTxs = this.coinbaseTransactions[today.getFullYear()]?.[today.getMonth()] || [];
        const loadingTransactions = currentMonthTxs.filter(transaction => transaction.metadata.status === 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS');
        if (loadingTransactions.length === 0) {
            clearTimeout(this.refetchTimeout);
            return;
        }
        this.refetchTimeout = setTimeout(async () => {
            const address = AccountController/* AccountController */.U.state.address;
            await TransactionsController/* TransactionsController */.W.fetchTransactions(address, 'coinbase');
            this.refetchLoadingTransactions();
        }, 3000);
    }
    templateLoading() {
        return Array(LOADING_ITEM_COUNT)
            .fill((0,lit/* html */.qy) ` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `)
            .map(item => item);
    }
};
W3mOnRampActivityView.styles = w3m_onramp_activity_view_styles;
w3m_onramp_activity_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnRampActivityView.prototype, "selectedOnRampProvider", void 0);
w3m_onramp_activity_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnRampActivityView.prototype, "loading", void 0);
w3m_onramp_activity_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnRampActivityView.prototype, "coinbaseTransactions", void 0);
w3m_onramp_activity_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnRampActivityView.prototype, "tokenImages", void 0);
W3mOnRampActivityView = w3m_onramp_activity_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-activity-view')
], W3mOnRampActivityView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsStateController.js
var OptionsStateController = __webpack_require__(51454);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-item.js + 2 modules
var wui_list_item = __webpack_require__(26509);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-checkbox/index.js + 4 modules
var w3m_legal_checkbox = __webpack_require__(98585);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-legal-footer/index.js + 1 modules
var w3m_legal_footer = __webpack_require__(46524);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-fiat-select-view/styles.js

/* harmony default export */ const w3m_onramp_fiat_select_view_styles = ((0,lit/* css */.AH) `
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-fiat-select-view/index.js
var w3m_onramp_fiat_select_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mOnrampFiatSelectView = class W3mOnrampFiatSelectView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedCurrency = OnRampController/* OnRampController */.aG.state.paymentCurrency;
        this.currencies = OnRampController/* OnRampController */.aG.state.paymentCurrencies;
        this.currencyImages = AssetController/* AssetController */.j.state.currencyImages;
        this.checked = OptionsStateController/* OptionsStateController */.o.state.isLegalCheckboxChecked;
        this.unsubscribe.push(...[
            OnRampController/* OnRampController */.aG.subscribe(val => {
                this.selectedCurrency = val.paymentCurrency;
                this.currencies = val.paymentCurrencies;
            }),
            AssetController/* AssetController */.j.subscribeKey('currencyImages', val => (this.currencyImages = val)),
            OptionsStateController/* OptionsStateController */.o.subscribeKey('isLegalCheckboxChecked', val => {
                this.checked = val;
            })
        ]);
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
        return (0,lit/* html */.qy) `
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${['0', 's', 's', 's']}
        gap="xs"
        class=${(0,if_defined/* ifDefined */.J)(disabled ? 'disabled' : undefined)}
      >
        ${this.currenciesTemplate(disabled)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
    currenciesTemplate(disabled = false) {
        return this.currencies.map(currency => (0,lit/* html */.qy) `
        <wui-list-item
          imageSrc=${(0,if_defined/* ifDefined */.J)(this.currencyImages?.[currency.id])}
          @click=${() => this.selectCurrency(currency)}
          variant="image"
          tabIdx=${(0,if_defined/* ifDefined */.J)(disabled ? -1 : undefined)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${currency.id}</wui-text>
        </wui-list-item>
      `);
    }
    selectCurrency(currency) {
        if (!currency) {
            return;
        }
        OnRampController/* OnRampController */.aG.setPaymentCurrency(currency);
        ModalController/* ModalController */.W.close();
    }
};
W3mOnrampFiatSelectView.styles = w3m_onramp_fiat_select_view_styles;
w3m_onramp_fiat_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampFiatSelectView.prototype, "selectedCurrency", void 0);
w3m_onramp_fiat_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampFiatSelectView.prototype, "currencies", void 0);
w3m_onramp_fiat_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampFiatSelectView.prototype, "currencyImages", void 0);
w3m_onramp_fiat_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampFiatSelectView.prototype, "checked", void 0);
W3mOnrampFiatSelectView = w3m_onramp_fiat_select_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-fiat-select-view')
], W3mOnrampFiatSelectView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ChainControllerUtil.js
var ChainControllerUtil = __webpack_require__(74496);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(62944);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/BlockchainApiController.js
var BlockchainApiController = __webpack_require__(75595);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js
var AssetUtil = __webpack_require__(27601);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js
var wui_icon = __webpack_require__(51636);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-visual.js + 26 modules
var wui_visual = __webpack_require__(72952);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-provider-item/styles.js

/* harmony default export */ const w3m_onramp_provider_item_styles = ((0,lit/* css */.AH) `
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    border: none;
    outline: none;
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-provider-item/index.js
var w3m_onramp_provider_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mOnRampProviderItem = class W3mOnRampProviderItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.color = 'inherit';
        this.label = '';
        this.feeRange = '';
        this.loading = false;
        this.onClick = null;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,if_defined/* ifDefined */.J)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading
            ? (0,lit/* html */.qy) `<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`
            : (0,lit/* html */.qy) `<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `;
    }
    networksTemplate() {
        const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
        const slicedNetworks = requestedCaipNetworks
            ?.filter(network => network?.assets?.imageId)
            ?.slice(0, 5);
        return (0,lit/* html */.qy) `
      <wui-flex class="networks">
        ${slicedNetworks?.map(network => (0,lit/* html */.qy) `
            <wui-flex class="network-icon">
              <wui-image src=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(network))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `;
    }
};
W3mOnRampProviderItem.styles = [w3m_onramp_provider_item_styles];
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampProviderItem.prototype, "disabled", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampProviderItem.prototype, "color", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampProviderItem.prototype, "name", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampProviderItem.prototype, "label", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampProviderItem.prototype, "feeRange", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnRampProviderItem.prototype, "loading", void 0);
w3m_onramp_provider_item_decorate([
    (0,decorators/* property */.MZ)()
], W3mOnRampProviderItem.prototype, "onClick", void 0);
W3mOnRampProviderItem = w3m_onramp_provider_item_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-provider-item')
], W3mOnRampProviderItem);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-providers-footer/styles.js

/* harmony default export */ const w3m_onramp_providers_footer_styles = ((0,lit/* css */.AH) `
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-providers-footer/index.js
var w3m_onramp_providers_footer_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let W3mOnRampProvidersFooter = class W3mOnRampProvidersFooter extends lit/* LitElement */.WF {
    render() {
        const { termsConditionsUrl, privacyPolicyUrl } = OptionsController/* OptionsController */.H.state;
        if (!termsConditionsUrl && !privacyPolicyUrl) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-flex
        .padding=${['m', 's', 's', 's']}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `;
    }
    howDoesItWorkTemplate() {
        return (0,lit/* html */.qy) ` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`;
    }
    onWhatIsBuy() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_WHAT_IS_A_BUY',
            properties: {
                isSmartAccount: (0,ChainControllerUtil/* getPreferredAccountType */.lj)(activeChainNamespace) ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
        RouterController/* RouterController */.I.push('WhatIsABuy');
    }
};
W3mOnRampProvidersFooter.styles = [w3m_onramp_providers_footer_styles];
W3mOnRampProvidersFooter = w3m_onramp_providers_footer_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-providers-footer')
], W3mOnRampProvidersFooter);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-providers-view/index.js
var w3m_onramp_providers_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mOnRampProvidersView = class W3mOnRampProvidersView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.providers = OnRampController/* OnRampController */.aG.state.providers;
        this.unsubscribe.push(...[
            OnRampController/* OnRampController */.aG.subscribeKey('providers', val => {
                this.providers = val;
            })
        ]);
    }
    firstUpdated() {
        const urlPromises = this.providers.map(async (provider) => {
            if (provider.name === 'coinbase') {
                return await this.getCoinbaseOnRampURL();
            }
            return Promise.resolve(provider?.url);
        });
        Promise.all(urlPromises).then(urls => {
            this.providers = this.providers.map((provider, index) => ({
                ...provider,
                url: urls[index] || ''
            }));
        });
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" .padding=${['0', 's', 's', 's']} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `;
    }
    onRampProvidersTemplate() {
        return this.providers
            .filter(provider => provider.supportedChains.includes(ChainController/* ChainController */.W.state.activeChain ?? 'eip155'))
            .map(provider => (0,lit/* html */.qy) `
          <w3m-onramp-provider-item
            label=${provider.label}
            name=${provider.name}
            feeRange=${provider.feeRange}
            @click=${() => {
            this.onClickProvider(provider);
        }}
            ?disabled=${!provider.url}
            data-testid=${`onramp-provider-${provider.name}`}
          ></w3m-onramp-provider-item>
        `);
    }
    onClickProvider(provider) {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        OnRampController/* OnRampController */.aG.setSelectedProvider(provider);
        RouterController/* RouterController */.I.push('BuyInProgress');
        CoreHelperUtil/* CoreHelperUtil */.w.openHref(provider.url, 'popupWindow', 'width=600,height=800,scrollbars=yes');
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'SELECT_BUY_PROVIDER',
            properties: {
                provider: provider.name,
                isSmartAccount: (0,ChainControllerUtil/* getPreferredAccountType */.lj)(activeChainNamespace) ===
                    W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
            }
        });
    }
    async getCoinbaseOnRampURL() {
        const address = AccountController/* AccountController */.U.state.address;
        const network = ChainController/* ChainController */.W.state.activeCaipNetwork;
        if (!address) {
            throw new Error('No address found');
        }
        if (!network?.name) {
            throw new Error('No network found');
        }
        const defaultNetwork = ConstantsUtil/* ConstantsUtil */.oU.WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP[network.name] ?? ConstantsUtil/* ConstantsUtil */.oU.WC_COINBASE_PAY_SDK_FALLBACK_CHAIN;
        const purchaseCurrency = OnRampController/* OnRampController */.aG.state.purchaseCurrency;
        const assets = purchaseCurrency
            ? [purchaseCurrency.symbol]
            : OnRampController/* OnRampController */.aG.state.purchaseCurrencies.map(currency => currency.symbol);
        return await BlockchainApiController/* BlockchainApiController */.T.generateOnRampURL({
            defaultNetwork,
            destinationWallets: [
                { address, blockchains: ConstantsUtil/* ConstantsUtil */.oU.WC_COINBASE_PAY_SDK_CHAINS, assets }
            ],
            partnerUserId: address,
            purchaseAmount: OnRampController/* OnRampController */.aG.state.purchaseAmount
        });
    }
};
w3m_onramp_providers_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnRampProvidersView.prototype, "providers", void 0);
W3mOnRampProvidersView = w3m_onramp_providers_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-providers-view')
], W3mOnRampProvidersView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-tokens-select-view/styles.js

/* harmony default export */ const w3m_onramp_tokens_select_view_styles = ((0,lit/* css */.AH) `
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-onramp-tokens-select-view/index.js
var w3m_onramp_tokens_select_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mOnrampTokensView = class W3mOnrampTokensView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedCurrency = OnRampController/* OnRampController */.aG.state.purchaseCurrencies;
        this.tokens = OnRampController/* OnRampController */.aG.state.purchaseCurrencies;
        this.tokenImages = AssetController/* AssetController */.j.state.tokenImages;
        this.checked = OptionsStateController/* OptionsStateController */.o.state.isLegalCheckboxChecked;
        this.unsubscribe.push(...[
            OnRampController/* OnRampController */.aG.subscribe(val => {
                this.selectedCurrency = val.purchaseCurrencies;
                this.tokens = val.purchaseCurrencies;
            }),
            AssetController/* AssetController */.j.subscribeKey('tokenImages', val => (this.tokenImages = val)),
            OptionsStateController/* OptionsStateController */.o.subscribeKey('isLegalCheckboxChecked', val => {
                this.checked = val;
            })
        ]);
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
        return (0,lit/* html */.qy) `
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${['0', 's', 's', 's']}
        gap="xs"
        class=${(0,if_defined/* ifDefined */.J)(disabled ? 'disabled' : undefined)}
      >
        ${this.currenciesTemplate(disabled)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
    currenciesTemplate(disabled = false) {
        return this.tokens.map(token => (0,lit/* html */.qy) `
        <wui-list-item
          imageSrc=${(0,if_defined/* ifDefined */.J)(this.tokenImages?.[token.symbol])}
          @click=${() => this.selectToken(token)}
          variant="image"
          tabIdx=${(0,if_defined/* ifDefined */.J)(disabled ? -1 : undefined)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${token.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${token.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `);
    }
    selectToken(currency) {
        if (!currency) {
            return;
        }
        OnRampController/* OnRampController */.aG.setPurchaseCurrency(currency);
        ModalController/* ModalController */.W.close();
    }
};
W3mOnrampTokensView.styles = w3m_onramp_tokens_select_view_styles;
w3m_onramp_tokens_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampTokensView.prototype, "selectedCurrency", void 0);
w3m_onramp_tokens_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampTokensView.prototype, "tokens", void 0);
w3m_onramp_tokens_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampTokensView.prototype, "tokenImages", void 0);
w3m_onramp_tokens_select_view_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampTokensView.prototype, "checked", void 0);
W3mOnrampTokensView = w3m_onramp_tokens_select_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-token-select-view')
], W3mOnrampTokensView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js + 1 modules
var ConnectionController = __webpack_require__(31211);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var ThemeController = __webpack_require__(68996);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-thumbnail.js + 2 modules
var wui_loading_thumbnail = __webpack_require__(92983);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-buy-in-progress-view/styles.js

/* harmony default export */ const w3m_buy_in_progress_view_styles = ((0,lit/* css */.AH) `
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
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-buy-in-progress-view/index.js
var w3m_buy_in_progress_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let W3mBuyInProgressView = class W3mBuyInProgressView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.selectedOnRampProvider = OnRampController/* OnRampController */.aG.state.selectedProvider;
        this.uri = ConnectionController/* ConnectionController */.x.state.wcUri;
        this.ready = false;
        this.showRetry = false;
        this.buffering = false;
        this.error = false;
        this.startTime = null;
        this.isMobile = false;
        this.onRetry = undefined;
        this.unsubscribe.push(...[
            OnRampController/* OnRampController */.aG.subscribeKey('selectedProvider', val => {
                this.selectedOnRampProvider = val;
            })
        ]);
        this.watchTransactions();
    }
    disconnectedCallback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    render() {
        let label = 'Continue in external window';
        if (this.error) {
            label = 'Buy failed';
        }
        else if (this.selectedOnRampProvider) {
            label = `Buy in ${this.selectedOnRampProvider?.label}`;
        }
        const subLabel = this.error
            ? 'Buy can be declined from your side or due to and error on the provider app'
            : `We’ll notify you once your Buy is processed`;
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
          <wui-visual
            name=${(0,if_defined/* ifDefined */.J)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

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

        ${this.error ? this.tryAgainTemplate() : null}
      </wui-flex>

      <wui-flex .padding=${['0', 'xl', 'xl', 'xl']} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `;
    }
    watchTransactions() {
        if (!this.selectedOnRampProvider) {
            return;
        }
        switch (this.selectedOnRampProvider.name) {
            case 'coinbase':
                this.startTime = Date.now();
                this.initializeCoinbaseTransactions();
                break;
            default:
                break;
        }
    }
    async initializeCoinbaseTransactions() {
        await this.watchCoinbaseTransactions();
        this.intervalId = setInterval(() => this.watchCoinbaseTransactions(), 4000);
    }
    async watchCoinbaseTransactions() {
        try {
            const address = AccountController/* AccountController */.U.state.address;
            if (!address) {
                throw new Error('No address found');
            }
            const coinbaseResponse = await BlockchainApiController/* BlockchainApiController */.T.fetchTransactions({
                account: address,
                onramp: 'coinbase'
            });
            const newTransactions = coinbaseResponse.data.filter(tx => new Date(tx.metadata.minedAt) > new Date(this.startTime) ||
                tx.metadata.status === 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS');
            if (newTransactions.length) {
                clearInterval(this.intervalId);
                RouterController/* RouterController */.I.replace('OnRampActivity');
            }
            else if (this.startTime && Date.now() - this.startTime >= 180_000) {
                clearInterval(this.intervalId);
                this.error = true;
            }
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(error);
        }
    }
    onTryAgain() {
        if (!this.selectedOnRampProvider) {
            return;
        }
        this.error = false;
        CoreHelperUtil/* CoreHelperUtil */.w.openHref(this.selectedOnRampProvider.url, 'popupWindow', 'width=600,height=800,scrollbars=yes');
    }
    tryAgainTemplate() {
        if (!this.selectedOnRampProvider?.url) {
            return null;
        }
        return (0,lit/* html */.qy) `<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`;
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController/* ThemeController */.W.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return (0,lit/* html */.qy) `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    onCopyUri() {
        if (!this.selectedOnRampProvider?.url) {
            SnackController/* SnackController */.P.showError('No link found');
            RouterController/* RouterController */.I.goBack();
            return;
        }
        try {
            CoreHelperUtil/* CoreHelperUtil */.w.copyToClopboard(this.selectedOnRampProvider.url);
            SnackController/* SnackController */.P.showSuccess('Link copied');
        }
        catch {
            SnackController/* SnackController */.P.showError('Failed to copy');
        }
    }
};
W3mBuyInProgressView.styles = w3m_buy_in_progress_view_styles;
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "intervalId", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "selectedOnRampProvider", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "uri", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "ready", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "showRetry", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "buffering", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "error", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* state */.wk)()
], W3mBuyInProgressView.prototype, "startTime", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mBuyInProgressView.prototype, "isMobile", void 0);
w3m_buy_in_progress_view_decorate([
    (0,decorators/* property */.MZ)()
], W3mBuyInProgressView.prototype, "onRetry", void 0);
W3mBuyInProgressView = w3m_buy_in_progress_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-buy-in-progress-view')
], W3mBuyInProgressView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-what-is-a-buy-view/index.js
var w3m_what_is_a_buy_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let W3mWhatIsABuyView = class W3mWhatIsABuyView extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        .padding=${['xxl', '3xl', 'xl', '3xl']}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${RouterController/* RouterController */.I.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `;
    }
};
W3mWhatIsABuyView = w3m_what_is_a_buy_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-what-is-a-buy-view')
], W3mWhatIsABuyView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-input-text.js
var wui_input_text = __webpack_require__(12965);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-input/styles.js

/* harmony default export */ const w3m_onramp_input_styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-onramp-input/index.js
var w3m_onramp_input_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let W3mInputCurrency = class W3mInputCurrency extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.type = 'Token';
        this.value = 0;
        this.currencies = [];
        this.selectedCurrency = this.currencies?.[0];
        this.currencyImages = AssetController/* AssetController */.j.state.currencyImages;
        this.tokenImages = AssetController/* AssetController */.j.state.tokenImages;
        this.unsubscribe.push(OnRampController/* OnRampController */.aG.subscribeKey('purchaseCurrency', val => {
            if (!val || this.type === 'Fiat') {
                return;
            }
            this.selectedCurrency = this.formatPurchaseCurrency(val);
        }), OnRampController/* OnRampController */.aG.subscribeKey('paymentCurrency', val => {
            if (!val || this.type === 'Token') {
                return;
            }
            this.selectedCurrency = this.formatPaymentCurrency(val);
        }), OnRampController/* OnRampController */.aG.subscribe(val => {
            if (this.type === 'Fiat') {
                this.currencies = val.purchaseCurrencies.map(this.formatPurchaseCurrency);
            }
            else {
                this.currencies = val.paymentCurrencies.map(this.formatPaymentCurrency);
            }
        }), AssetController/* AssetController */.j.subscribe(val => {
            this.currencyImages = { ...val.currencyImages };
            this.tokenImages = { ...val.tokenImages };
        }));
    }
    firstUpdated() {
        OnRampController/* OnRampController */.aG.getAvailableCurrencies();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const symbol = this.selectedCurrency?.symbol || '';
        const image = this.currencyImages[symbol] || this.tokenImages[symbol];
        return (0,lit/* html */.qy) `<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency
            ? (0,lit/* html */.qy) ` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${() => ModalController/* ModalController */.W.open({ view: `OnRamp${this.type}Select` })}
          >
            <wui-image src=${(0,if_defined/* ifDefined */.J)(image)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`
            : (0,lit/* html */.qy) `<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`;
    }
    formatPaymentCurrency(currency) {
        return {
            name: currency.id,
            symbol: currency.id
        };
    }
    formatPurchaseCurrency(currency) {
        return {
            name: currency.name,
            symbol: currency.symbol
        };
    }
};
W3mInputCurrency.styles = w3m_onramp_input_styles;
w3m_onramp_input_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], W3mInputCurrency.prototype, "type", void 0);
w3m_onramp_input_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], W3mInputCurrency.prototype, "value", void 0);
w3m_onramp_input_decorate([
    (0,decorators/* state */.wk)()
], W3mInputCurrency.prototype, "currencies", void 0);
w3m_onramp_input_decorate([
    (0,decorators/* state */.wk)()
], W3mInputCurrency.prototype, "selectedCurrency", void 0);
w3m_onramp_input_decorate([
    (0,decorators/* state */.wk)()
], W3mInputCurrency.prototype, "currencyImages", void 0);
w3m_onramp_input_decorate([
    (0,decorators/* state */.wk)()
], W3mInputCurrency.prototype, "tokenImages", void 0);
W3mInputCurrency = w3m_onramp_input_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-input')
], W3mInputCurrency);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-onramp-widget/styles.js

/* harmony default export */ const w3m_onramp_widget_styles = ((0,lit/* css */.AH) `
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-onramp-widget/index.js
var w3m_onramp_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








const PAYMENT_CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    GBP: '£'
};
const BUY_PRESET_AMOUNTS = [100, 250, 500, 1000];
let W3mOnrampWidget = class W3mOnrampWidget extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.disabled = false;
        this.caipAddress = ChainController/* ChainController */.W.state.activeCaipAddress;
        this.loading = ModalController/* ModalController */.W.state.loading;
        this.paymentCurrency = OnRampController/* OnRampController */.aG.state.paymentCurrency;
        this.paymentAmount = OnRampController/* OnRampController */.aG.state.paymentAmount;
        this.purchaseAmount = OnRampController/* OnRampController */.aG.state.purchaseAmount;
        this.quoteLoading = OnRampController/* OnRampController */.aG.state.quotesLoading;
        this.unsubscribe.push(...[
            ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => (this.caipAddress = val)),
            ModalController/* ModalController */.W.subscribeKey('loading', val => {
                this.loading = val;
            }),
            OnRampController/* OnRampController */.aG.subscribe(val => {
                this.paymentCurrency = val.paymentCurrency;
                this.paymentAmount = val.paymentAmount;
                this.purchaseAmount = val.purchaseAmount;
                this.quoteLoading = val.quotesLoading;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount || 0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount || 0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${BUY_PRESET_AMOUNTS.map(amount => (0,lit/* html */.qy) `<wui-button
                  variant=${this.paymentAmount === amount ? 'accent' : 'neutral'}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${() => this.selectPresetAmount(amount)}
                  >${`${PAYMENT_CURRENCY_SYMBOLS[this.paymentCurrency?.id || 'USD']} ${amount}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `;
    }
    templateButton() {
        return this.caipAddress
            ? (0,lit/* html */.qy) `<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`
            : (0,lit/* html */.qy) `<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`;
    }
    getQuotes() {
        if (!this.loading) {
            ModalController/* ModalController */.W.open({ view: 'OnRampProviders' });
        }
    }
    openModal() {
        ModalController/* ModalController */.W.open({ view: 'Connect' });
    }
    async onPaymentAmountChange(event) {
        OnRampController/* OnRampController */.aG.setPaymentAmount(Number(event.detail));
        await OnRampController/* OnRampController */.aG.getQuote();
    }
    async selectPresetAmount(amount) {
        OnRampController/* OnRampController */.aG.setPaymentAmount(amount);
        await OnRampController/* OnRampController */.aG.getQuote();
    }
};
W3mOnrampWidget.styles = w3m_onramp_widget_styles;
w3m_onramp_widget_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], W3mOnrampWidget.prototype, "disabled", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "caipAddress", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "loading", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "paymentCurrency", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "paymentAmount", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "purchaseAmount", void 0);
w3m_onramp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mOnrampWidget.prototype, "quoteLoading", void 0);
W3mOnrampWidget = w3m_onramp_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-onramp-widget')
], W3mOnrampWidget);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/onramp.js







//# sourceMappingURL=onramp.js.map

/***/ }),

/***/ 93516:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_image_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36887);

//# sourceMappingURL=wui-image.js.map

/***/ })

}]);
//# sourceMappingURL=7173.bundle.js.map