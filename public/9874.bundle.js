"use strict";
(self["webpackChunkpython_server"] = self["webpackChunkpython_server"] || []).push([[9874],{

/***/ 79874:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: W3mActivityList

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/DateUtil.js
var DateUtil = __webpack_require__(48169);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/TransactionsController.js
var TransactionsController = __webpack_require__(86360);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js + 1 modules
var OptionsController = __webpack_require__(42733);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var wui_icon_box = __webpack_require__(77616);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var components_wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var layout_wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/TypeUtil.js
var TransactionTypePastTense;
(function (TransactionTypePastTense) {
    TransactionTypePastTense["approve"] = "approved";
    TransactionTypePastTense["bought"] = "bought";
    TransactionTypePastTense["borrow"] = "borrowed";
    TransactionTypePastTense["burn"] = "burnt";
    TransactionTypePastTense["cancel"] = "canceled";
    TransactionTypePastTense["claim"] = "claimed";
    TransactionTypePastTense["deploy"] = "deployed";
    TransactionTypePastTense["deposit"] = "deposited";
    TransactionTypePastTense["execute"] = "executed";
    TransactionTypePastTense["mint"] = "minted";
    TransactionTypePastTense["receive"] = "received";
    TransactionTypePastTense["repay"] = "repaid";
    TransactionTypePastTense["send"] = "sent";
    TransactionTypePastTense["sell"] = "sold";
    TransactionTypePastTense["stake"] = "staked";
    TransactionTypePastTense["trade"] = "swapped";
    TransactionTypePastTense["unstake"] = "unstaked";
    TransactionTypePastTense["withdraw"] = "withdrawn";
})(TransactionTypePastTense || (TransactionTypePastTense = {}));
//# sourceMappingURL=TypeUtil.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js + 1 modules
var composites_wui_icon_box = __webpack_require__(12851);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-visual/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-visual/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiTransactionVisual = class WuiTransactionVisual extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.images = [];
        this.secondImage = {
            type: undefined,
            url: ''
        };
    }
    render() {
        const [firstImage, secondImage] = this.images;
        const isLeftNFT = firstImage?.type === 'NFT';
        const isRightNFT = secondImage?.url ? secondImage.type === 'NFT' : isLeftNFT;
        const leftRadius = isLeftNFT ? 'var(--wui-border-radius-xxs)' : 'var(--wui-border-radius-s)';
        const rightRadius = isRightNFT ? 'var(--wui-border-radius-xxs)' : 'var(--wui-border-radius-s)';
        this.style.cssText = `
    --local-left-border-radius: ${leftRadius};
    --local-right-border-radius: ${rightRadius};
    `;
        return (0,lit/* html */.qy) `<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`;
    }
    templateVisual() {
        const [firstImage, secondImage] = this.images;
        const firstImageType = firstImage?.type;
        const haveTwoImages = this.images.length === 2;
        if (haveTwoImages && (firstImage?.url || secondImage?.url)) {
            return (0,lit/* html */.qy) `<div class="swap-images-container">
        ${firstImage?.url
                ? (0,lit/* html */.qy) `<wui-image src=${firstImage.url} alt="Transaction image"></wui-image>`
                : null}
        ${secondImage?.url
                ? (0,lit/* html */.qy) `<wui-image src=${secondImage.url} alt="Transaction image"></wui-image>`
                : null}
      </div>`;
        }
        else if (firstImage?.url) {
            return (0,lit/* html */.qy) `<wui-image src=${firstImage.url} alt="Transaction image"></wui-image>`;
        }
        else if (firstImageType === 'NFT') {
            return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`;
        }
        return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`;
    }
    templateIcon() {
        let color = 'accent-100';
        let icon = undefined;
        icon = this.getIcon();
        if (this.status) {
            color = this.getStatusColor();
        }
        if (!icon) {
            return null;
        }
        return (0,lit/* html */.qy) `
      <wui-icon-box
        size="xxs"
        iconColor=${color}
        backgroundColor=${color}
        background="opaque"
        icon=${icon}
        ?border=${true}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `;
    }
    getDirectionIcon() {
        switch (this.direction) {
            case 'in':
                return 'arrowBottom';
            case 'out':
                return 'arrowTop';
            default:
                return undefined;
        }
    }
    getIcon() {
        if (this.onlyDirectionIcon) {
            return this.getDirectionIcon();
        }
        if (this.type === 'trade') {
            return 'swapHorizontalBold';
        }
        else if (this.type === 'approve') {
            return 'checkmark';
        }
        else if (this.type === 'cancel') {
            return 'close';
        }
        return this.getDirectionIcon();
    }
    getStatusColor() {
        switch (this.status) {
            case 'confirmed':
                return 'success-100';
            case 'failed':
                return 'error-100';
            case 'pending':
                return 'inverse-100';
            default:
                return 'accent-100';
        }
    }
};
WuiTransactionVisual.styles = [styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionVisual.prototype, "type", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionVisual.prototype, "status", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionVisual.prototype, "direction", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiTransactionVisual.prototype, "onlyDirectionIcon", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionVisual.prototype, "images", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Object })
], WuiTransactionVisual.prototype, "secondImage", void 0);
WuiTransactionVisual = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-transaction-visual')
], WuiTransactionVisual);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-list-item/styles.js

/* harmony default export */ const wui_transaction_list_item_styles = ((0,lit/* css */.AH) `
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-xs) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-transaction-list-item/index.js
var wui_transaction_list_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let WuiTransactionListItem = class WuiTransactionListItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.type = 'approve';
        this.onlyDirectionIcon = false;
        this.images = [];
        this.price = [];
        this.amount = [];
        this.symbol = [];
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${(0,if_defined/* ifDefined */.J)(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${(0,if_defined/* ifDefined */.J)(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${TransactionTypePastTense[this.type] || this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `;
    }
    templateDescription() {
        const description = this.descriptions?.[0];
        return description
            ? (0,lit/* html */.qy) `
          <wui-text variant="small-500" color="fg-200">
            <span>${description}</span>
          </wui-text>
        `
            : null;
    }
    templateSecondDescription() {
        const description = this.descriptions?.[1];
        return description
            ? (0,lit/* html */.qy) `
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${description}</span>
          </wui-text>
        `
            : null;
    }
};
WuiTransactionListItem.styles = [ThemeUtil/* resetStyles */.W5, wui_transaction_list_item_styles];
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionListItem.prototype, "type", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionListItem.prototype, "descriptions", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionListItem.prototype, "date", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiTransactionListItem.prototype, "onlyDirectionIcon", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionListItem.prototype, "status", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiTransactionListItem.prototype, "direction", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionListItem.prototype, "images", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionListItem.prototype, "price", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionListItem.prototype, "amount", void 0);
wui_transaction_list_item_decorate([
    (0,decorators/* property */.MZ)({ type: Array })
], WuiTransactionListItem.prototype, "symbol", void 0);
WuiTransactionListItem = wui_transaction_list_item_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-transaction-list-item')
], WuiTransactionListItem);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-transaction-list-item.js

//# sourceMappingURL=wui-transaction-list-item.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-transaction-list-item-loader.js + 2 modules
var wui_transaction_list_item_loader = __webpack_require__(96409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-activity-list/styles.js

/* harmony default export */ const w3m_activity_list_styles = ((0,lit/* css */.AH) `
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: var(--wui-spacing-m);
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

  .emptyContainer {
    height: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-activity-list/index.js
var w3m_activity_list_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













const PAGINATOR_ID = 'last-transaction';
const LOADING_ITEM_COUNT = 7;
let W3mActivityList = class W3mActivityList extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.paginationObserver = undefined;
        this.page = 'activity';
        this.caipAddress = ChainController/* ChainController */.W.state.activeCaipAddress;
        this.transactionsByYear = TransactionsController/* TransactionsController */.W.state.transactionsByYear;
        this.loading = TransactionsController/* TransactionsController */.W.state.loading;
        this.empty = TransactionsController/* TransactionsController */.W.state.empty;
        this.next = TransactionsController/* TransactionsController */.W.state.next;
        TransactionsController/* TransactionsController */.W.clearCursor();
        this.unsubscribe.push(...[
            ChainController/* ChainController */.W.subscribeKey('activeCaipAddress', val => {
                if (val) {
                    if (this.caipAddress !== val) {
                        TransactionsController/* TransactionsController */.W.resetTransactions();
                        TransactionsController/* TransactionsController */.W.fetchTransactions(val);
                    }
                }
                this.caipAddress = val;
            }),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', () => {
                this.updateTransactionView();
            }),
            TransactionsController/* TransactionsController */.W.subscribe(val => {
                this.transactionsByYear = val.transactionsByYear;
                this.loading = val.loading;
                this.empty = val.empty;
                this.next = val.next;
            })
        ]);
    }
    firstUpdated() {
        this.updateTransactionView();
        this.createPaginationObserver();
    }
    updated() {
        this.setPaginationObserver();
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) ` ${this.empty ? null : this.templateTransactionsByYear()}
    ${this.loading ? this.templateLoading() : null}
    ${!this.loading && this.empty ? this.templateEmpty() : null}`;
    }
    updateTransactionView() {
        const currentNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork?.caipNetworkId;
        const lastNetworkInView = TransactionsController/* TransactionsController */.W.state.lastNetworkInView;
        if (lastNetworkInView !== currentNetwork) {
            TransactionsController/* TransactionsController */.W.resetTransactions();
            if (this.caipAddress) {
                TransactionsController/* TransactionsController */.W.fetchTransactions(CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress));
            }
        }
        TransactionsController/* TransactionsController */.W.setLastNetworkInView(currentNetwork);
    }
    templateTransactionsByYear() {
        const sortedYearKeys = Object.keys(this.transactionsByYear).sort().reverse();
        return sortedYearKeys.map(year => {
            const yearInt = parseInt(year, 10);
            const sortedMonthIndexes = new Array(12)
                .fill(null)
                .map((_, idx) => {
                const groupTitle = esm_exports/* TransactionUtil */.tt.getTransactionGroupTitle(yearInt, idx);
                const transactions = this.transactionsByYear[yearInt]?.[idx];
                return {
                    groupTitle,
                    transactions
                };
            })
                .filter(({ transactions }) => transactions)
                .reverse();
            return sortedMonthIndexes.map(({ groupTitle, transactions }, index) => {
                const isLastGroup = index === sortedMonthIndexes.length - 1;
                if (!transactions) {
                    return null;
                }
                return (0,lit/* html */.qy) `
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${isLastGroup ? 'true' : 'false'}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${['xs', 's', 's', 's']}
            >
              <wui-text variant="paragraph-500" color="fg-200" data-testid="group-title"
                >${groupTitle}</wui-text
              >
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(transactions, isLastGroup)}
            </wui-flex>
          </wui-flex>
        `;
            });
        });
    }
    templateRenderTransaction(transaction, isLastTransaction) {
        const { date, descriptions, direction, isAllNFT, images, status, transfers, type } = this.getTransactionListItemProps(transaction);
        const haveMultipleTransfers = transfers?.length > 1;
        const haveTwoTransfers = transfers?.length === 2;
        if (haveTwoTransfers && !isAllNFT) {
            return (0,lit/* html */.qy) `
        <wui-transaction-list-item
          date=${date}
          .direction=${direction}
          id=${isLastTransaction && this.next ? PAGINATOR_ID : ''}
          status=${status}
          type=${type}
          .images=${images}
          .descriptions=${descriptions}
        ></wui-transaction-list-item>
      `;
        }
        if (haveMultipleTransfers) {
            return transfers.map((transfer, index) => {
                const description = esm_exports/* TransactionUtil */.tt.getTransferDescription(transfer);
                const isLastTransfer = isLastTransaction && index === transfers.length - 1;
                return (0,lit/* html */.qy) ` <wui-transaction-list-item
          date=${date}
          direction=${transfer.direction}
          id=${isLastTransfer && this.next ? PAGINATOR_ID : ''}
          status=${status}
          type=${type}
          .onlyDirectionIcon=${true}
          .images=${[images[index]]}
          .descriptions=${[description]}
        ></wui-transaction-list-item>`;
            });
        }
        return (0,lit/* html */.qy) `
      <wui-transaction-list-item
        date=${date}
        .direction=${direction}
        id=${isLastTransaction && this.next ? PAGINATOR_ID : ''}
        status=${status}
        type=${type}
        .images=${images}
        .descriptions=${descriptions}
      ></wui-transaction-list-item>
    `;
    }
    templateTransactions(transactions, isLastGroup) {
        return transactions.map((transaction, index) => {
            const isLastTransaction = isLastGroup && index === transactions.length - 1;
            return (0,lit/* html */.qy) `${this.templateRenderTransaction(transaction, isLastTransaction)}`;
        });
    }
    emptyStateActivity() {
        return (0,lit/* html */.qy) `<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${['3xl', 'xl', '3xl', 'xl']}
      gap="xl"
      data-testid="empty-activity-state"
    >
      <wui-icon-box
        backgroundColor="gray-glass-005"
        background="gray"
        iconColor="fg-200"
        icon="wallet"
        size="lg"
        ?border=${true}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >No Transactions yet</wui-text
        >
        <wui-text align="center" variant="small-500" color="fg-200"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`;
    }
    emptyStateAccount() {
        return (0,lit/* html */.qy) `<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
      data-testid="empty-account-state"
    >
      <wui-icon-box
        icon="swapHorizontal"
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
        <wui-text variant="paragraph-500" align="center" color="fg-100">No activity yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`;
    }
    templateEmpty() {
        if (this.page === 'account') {
            return (0,lit/* html */.qy) `${this.emptyStateAccount()}`;
        }
        return (0,lit/* html */.qy) `${this.emptyStateActivity()}`;
    }
    templateLoading() {
        if (this.page === 'activity') {
            return Array(LOADING_ITEM_COUNT)
                .fill((0,lit/* html */.qy) ` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `)
                .map(item => item);
        }
        return null;
    }
    onReceiveClick() {
        RouterController/* RouterController */.I.push('WalletReceive');
    }
    createPaginationObserver() {
        const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
        const { projectId } = OptionsController/* OptionsController */.H.state;
        this.paginationObserver = new IntersectionObserver(([element]) => {
            if (element?.isIntersecting && !this.loading) {
                TransactionsController/* TransactionsController */.W.fetchTransactions(CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress));
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: 'LOAD_MORE_TRANSACTIONS',
                    properties: {
                        address: CoreHelperUtil/* CoreHelperUtil */.w.getPlainAddress(this.caipAddress),
                        projectId,
                        cursor: this.next,
                        isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                            W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT
                    }
                });
            }
        }, {});
        this.setPaginationObserver();
    }
    setPaginationObserver() {
        this.paginationObserver?.disconnect();
        const lastItem = this.shadowRoot?.querySelector(`#${PAGINATOR_ID}`);
        if (lastItem) {
            this.paginationObserver?.observe(lastItem);
        }
    }
    getTransactionListItemProps(transaction) {
        const date = DateUtil/* DateUtil */.r.formatDate(transaction?.metadata?.minedAt);
        const descriptions = esm_exports/* TransactionUtil */.tt.getTransactionDescriptions(transaction);
        const transfers = transaction?.transfers;
        const transfer = transaction?.transfers?.[0];
        const isAllNFT = Boolean(transfer) && transaction?.transfers?.every(item => Boolean(item.nft_info));
        const images = esm_exports/* TransactionUtil */.tt.getTransactionImages(transfers);
        return {
            date,
            direction: transfer?.direction,
            descriptions,
            isAllNFT,
            images,
            status: transaction.metadata?.status,
            transfers,
            type: transaction.metadata?.operationType
        };
    }
};
W3mActivityList.styles = w3m_activity_list_styles;
w3m_activity_list_decorate([
    (0,decorators/* property */.MZ)()
], W3mActivityList.prototype, "page", void 0);
w3m_activity_list_decorate([
    (0,decorators/* state */.wk)()
], W3mActivityList.prototype, "caipAddress", void 0);
w3m_activity_list_decorate([
    (0,decorators/* state */.wk)()
], W3mActivityList.prototype, "transactionsByYear", void 0);
w3m_activity_list_decorate([
    (0,decorators/* state */.wk)()
], W3mActivityList.prototype, "loading", void 0);
w3m_activity_list_decorate([
    (0,decorators/* state */.wk)()
], W3mActivityList.prototype, "empty", void 0);
w3m_activity_list_decorate([
    (0,decorators/* state */.wk)()
], W3mActivityList.prototype, "next", void 0);
W3mActivityList = w3m_activity_list_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-activity-list')
], W3mActivityList);

//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=9874.bundle.js.map