"use strict";
(self["webpackChunkpython_server"] = self["webpackChunkpython_server"] || []).push([[6323],{

/***/ 36323:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mSendSelectTokenView: () => (/* reexport */ W3mSendSelectTokenView),
  W3mWalletSendPreviewView: () => (/* reexport */ W3mWalletSendPreviewView),
  W3mWalletSendView: () => (/* reexport */ W3mWalletSendView)
});

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SendController.js
var SendController = __webpack_require__(8351);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SwapController.js + 1 modules
var SwapController = __webpack_require__(80171);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var wui_icon_box = __webpack_require__(77616);
// EXTERNAL MODULE: ./node_modules/lit/directives/ref.js + 1 modules
var ref = __webpack_require__(7610);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js
var ConnectionController = __webpack_require__(79177);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js
var wui_icon = __webpack_require__(51636);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-address/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-address/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mInputAddress = class W3mInputAddress extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.inputElementRef = (0,ref/* createRef */._)();
        this.instructionElementRef = (0,ref/* createRef */._)();
        this.instructionHidden = Boolean(this.value);
        this.pasting = false;
        this.onDebouncedSearch = CoreHelperUtil/* CoreHelperUtil */.w.debounce(async (value) => {
            if (!value.length) {
                this.setReceiverAddress('');
                return;
            }
            const activeChain = ChainController/* ChainController */.W.state.activeChain;
            const isValidAddress = CoreHelperUtil/* CoreHelperUtil */.w.isAddress(value, activeChain);
            if (isValidAddress) {
                this.setReceiverAddress(value);
                return;
            }
            try {
                const resolvedAddress = await ConnectionController/* ConnectionController */.x.getEnsAddress(value);
                if (resolvedAddress) {
                    SendController/* SendController */.R.setReceiverProfileName(value);
                    SendController/* SendController */.R.setReceiverAddress(resolvedAddress);
                    const avatar = await ConnectionController/* ConnectionController */.x.getEnsAvatar(value);
                    SendController/* SendController */.R.setReceiverProfileImageUrl(avatar || undefined);
                }
            }
            catch (error) {
                this.setReceiverAddress(value);
            }
            finally {
                SendController/* SendController */.R.setLoading(false);
            }
        });
    }
    firstUpdated() {
        if (this.value) {
            this.instructionHidden = true;
        }
        this.checkHidden();
    }
    render() {
        return (0,lit/* html */.qy) ` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${['2xl', 'l', 'xl', 'l']}
    >
      <wui-text
        ${(0,ref/* ref */.K)(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${(0,ref/* ref */.K)(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value ?? ''}
        autocomplete="off"
      >
${this.value ?? ''}</textarea
      >
    </wui-flex>`;
    }
    async focusInput() {
        if (this.instructionElementRef.value) {
            this.instructionHidden = true;
            await this.toggleInstructionFocus(false);
            this.instructionElementRef.value.style.pointerEvents = 'none';
            this.inputElementRef.value?.focus();
            if (this.inputElementRef.value) {
                this.inputElementRef.value.selectionStart = this.inputElementRef.value.selectionEnd =
                    this.inputElementRef.value.value.length;
            }
        }
    }
    async focusInstruction() {
        if (this.instructionElementRef.value) {
            this.instructionHidden = false;
            await this.toggleInstructionFocus(true);
            this.instructionElementRef.value.style.pointerEvents = 'auto';
            this.inputElementRef.value?.blur();
        }
    }
    async toggleInstructionFocus(focus) {
        if (this.instructionElementRef.value) {
            await this.instructionElementRef.value.animate([{ opacity: focus ? 0 : 1 }, { opacity: focus ? 1 : 0 }], {
                duration: 100,
                easing: 'ease',
                fill: 'forwards'
            }).finished;
        }
    }
    onBoxClick() {
        if (!this.value && !this.instructionHidden) {
            this.focusInput();
        }
    }
    onBlur() {
        if (!this.value && this.instructionHidden && !this.pasting) {
            this.focusInstruction();
        }
    }
    checkHidden() {
        if (this.instructionHidden) {
            this.focusInput();
        }
    }
    async onPasteClick() {
        this.pasting = true;
        const text = await navigator.clipboard.readText();
        SendController/* SendController */.R.setReceiverAddress(text);
        this.focusInput();
    }
    onInputChange(e) {
        const element = e.target;
        this.pasting = false;
        this.value = e.target?.value;
        if (element.value && !this.instructionHidden) {
            this.focusInput();
        }
        SendController/* SendController */.R.setLoading(true);
        this.onDebouncedSearch(element.value);
    }
    setReceiverAddress(address) {
        SendController/* SendController */.R.setReceiverAddress(address);
        SendController/* SendController */.R.setReceiverProfileName(undefined);
        SendController/* SendController */.R.setReceiverProfileImageUrl(undefined);
        SendController/* SendController */.R.setLoading(false);
    }
};
W3mInputAddress.styles = styles;
__decorate([
    (0,decorators/* property */.MZ)()
], W3mInputAddress.prototype, "value", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mInputAddress.prototype, "instructionHidden", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mInputAddress.prototype, "pasting", void 0);
W3mInputAddress = __decorate([
    (0,esm_exports/* customElement */.EM)('w3m-input-address')
], W3mInputAddress);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js + 1 modules
var NumberUtil = __webpack_require__(23768);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(7565);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-amount/styles.js

/* harmony default export */ const wui_input_amount_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-amount/index.js
var wui_input_amount_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let WuiInputAmount = class WuiInputAmount extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.inputElementRef = (0,ref/* createRef */._)();
        this.disabled = false;
        this.value = '';
        this.placeholder = '0';
    }
    render() {
        if (this.inputElementRef?.value && this.value) {
            this.inputElementRef.value.value = this.value;
        }
        return (0,lit/* html */.qy) `<input
      ${(0,ref/* ref */.K)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value ?? ''}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `;
    }
    dispatchInputChangeEvent(e) {
        const inputChar = e.data;
        if (inputChar && this.inputElementRef?.value) {
            if (inputChar === ',') {
                const inputValue = this.inputElementRef.value.value.replace(',', '.');
                this.inputElementRef.value.value = inputValue;
                this.value = `${this.value}${inputValue}`;
            }
            else if (!ConstantsUtil/* numbersRegex */.Ky.test(inputChar)) {
                this.inputElementRef.value.value = this.value.replace(new RegExp(inputChar.replace(ConstantsUtil/* specialCharactersRegex */.PG, '\\$&'), 'gu'), '');
            }
        }
        this.dispatchEvent(new CustomEvent('inputChange', {
            detail: this.inputElementRef.value?.value,
            bubbles: true,
            composed: true
        }));
    }
};
WuiInputAmount.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_input_amount_styles];
wui_input_amount_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiInputAmount.prototype, "disabled", void 0);
wui_input_amount_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], WuiInputAmount.prototype, "value", void 0);
wui_input_amount_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], WuiInputAmount.prototype, "placeholder", void 0);
WuiInputAmount = wui_input_amount_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-input-amount')
], WuiInputAmount);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-input-amount.js

//# sourceMappingURL=wui-input-amount.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-token-button.js + 2 modules
var wui_token_button = __webpack_require__(72510);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-token/styles.js

/* harmony default export */ const w3m_input_token_styles = ((0,lit/* css */.AH) `
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-input-token/index.js
var w3m_input_token_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mInputToken = class W3mInputToken extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) ` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${['xl', 's', 'l', 'l']}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token && true}
          .value=${this.sendTokenAmount ? String(this.sendTokenAmount) : ''}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`;
    }
    buttonTemplate() {
        if (this.token) {
            return (0,lit/* html */.qy) `<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`;
        }
        return (0,lit/* html */.qy) `<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`;
    }
    handleSelectButtonClick() {
        RouterController/* RouterController */.I.push('WalletSendSelectToken');
    }
    sendValueTemplate() {
        if (this.token && this.sendTokenAmount) {
            const price = this.token.price;
            const totalValue = price * this.sendTokenAmount;
            return (0,lit/* html */.qy) `<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${totalValue
                ? `$${esm_exports/* UiHelperUtil */.Zv.formatNumberToLocalString(totalValue, 2)}`
                : 'Incorrect value'}</wui-text
      >`;
        }
        return null;
    }
    maxAmountTemplate() {
        if (this.token) {
            if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
                return (0,lit/* html */.qy) ` <wui-text variant="small-400" color="error-100">
          ${esm_exports/* UiHelperUtil */.Zv.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
        </wui-text>`;
            }
            return (0,lit/* html */.qy) ` <wui-text variant="small-400" color="fg-200">
        ${esm_exports/* UiHelperUtil */.Zv.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>`;
        }
        return null;
    }
    actionTemplate() {
        if (this.token) {
            if (this.sendTokenAmount && this.sendTokenAmount > Number(this.token.quantity.numeric)) {
                return (0,lit/* html */.qy) `<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`;
            }
            return (0,lit/* html */.qy) `<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`;
        }
        return null;
    }
    onInputChange(event) {
        SendController/* SendController */.R.setTokenAmount(event.detail);
    }
    onMaxClick() {
        if (this.token) {
            const maxValue = NumberUtil/* NumberUtil */.S.bigNumber(this.token.quantity.numeric);
            SendController/* SendController */.R.setTokenAmount(Number(maxValue.toFixed(20)));
        }
    }
    onBuyClick() {
        RouterController/* RouterController */.I.push('OnRampProviders');
    }
};
W3mInputToken.styles = w3m_input_token_styles;
w3m_input_token_decorate([
    (0,decorators/* property */.MZ)({ type: Object })
], W3mInputToken.prototype, "token", void 0);
w3m_input_token_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], W3mInputToken.prototype, "sendTokenAmount", void 0);
W3mInputToken = w3m_input_token_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-input-token')
], W3mInputToken);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-view/styles.js

/* harmony default export */ const w3m_wallet_send_view_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-view/index.js
var w3m_wallet_send_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mWalletSendView = class W3mWalletSendView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.token = SendController/* SendController */.R.state.token;
        this.sendTokenAmount = SendController/* SendController */.R.state.sendTokenAmount;
        this.receiverAddress = SendController/* SendController */.R.state.receiverAddress;
        this.receiverProfileName = SendController/* SendController */.R.state.receiverProfileName;
        this.loading = SendController/* SendController */.R.state.loading;
        this.message = 'Preview Send';
        this.fetchNetworkPrice();
        this.fetchBalances();
        this.unsubscribe.push(...[
            SendController/* SendController */.R.subscribe(val => {
                this.token = val.token;
                this.sendTokenAmount = val.sendTokenAmount;
                this.receiverAddress = val.receiverAddress;
                this.receiverProfileName = val.receiverProfileName;
                this.loading = val.loading;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        this.getMessage();
        return (0,lit/* html */.qy) ` <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName ? this.receiverProfileName : this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${['l', '0', '0', '0']}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith('Preview Send')}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`;
    }
    async fetchBalances() {
        await SendController/* SendController */.R.fetchTokenBalance();
        SendController/* SendController */.R.fetchNetworkBalance();
    }
    async fetchNetworkPrice() {
        await SwapController/* SwapController */.GN.getNetworkTokenPrice();
    }
    onButtonClick() {
        RouterController/* RouterController */.I.push('WalletSendPreview');
    }
    getMessage() {
        this.message = 'Preview Send';
        if (this.receiverAddress &&
            !CoreHelperUtil/* CoreHelperUtil */.w.isAddress(this.receiverAddress, ChainController/* ChainController */.W.state.activeChain)) {
            this.message = 'Invalid Address';
        }
        if (!this.receiverAddress) {
            this.message = 'Add Address';
        }
        if (this.sendTokenAmount &&
            this.token &&
            this.sendTokenAmount > Number(this.token.quantity.numeric)) {
            this.message = 'Insufficient Funds';
        }
        if (!this.sendTokenAmount) {
            this.message = 'Add Amount';
        }
        if (this.sendTokenAmount && this.token?.price) {
            const value = this.sendTokenAmount * this.token.price;
            if (!value) {
                this.message = 'Incorrect Value';
            }
        }
        if (!this.token) {
            this.message = 'Select Token';
        }
    }
};
W3mWalletSendView.styles = w3m_wallet_send_view_styles;
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "token", void 0);
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "sendTokenAmount", void 0);
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "receiverAddress", void 0);
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "receiverProfileName", void 0);
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "loading", void 0);
w3m_wallet_send_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendView.prototype, "message", void 0);
W3mWalletSendView = w3m_wallet_send_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-send-view')
], W3mWalletSendView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-input-text.js
var wui_input_text = __webpack_require__(12965);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-token.js + 2 modules
var wui_list_token = __webpack_require__(55710);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-separator.js + 2 modules
var wui_separator = __webpack_require__(55618);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-select-token-view/styles.js

/* harmony default export */ const w3m_wallet_send_select_token_view_styles = ((0,lit/* css */.AH) `
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-select-token-view/index.js
var w3m_wallet_send_select_token_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let W3mSendSelectTokenView = class W3mSendSelectTokenView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.tokenBalances = SendController/* SendController */.R.state.tokenBalances;
        this.search = '';
        this.onDebouncedSearch = CoreHelperUtil/* CoreHelperUtil */.w.debounce((value) => {
            this.search = value;
        });
        this.unsubscribe.push(...[
            SendController/* SendController */.R.subscribe(val => {
                this.tokenBalances = val.tokenBalances;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
    }
    templateSearchInput() {
        return (0,lit/* html */.qy) `
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
    }
    templateTokens() {
        this.tokens = this.tokenBalances?.filter(token => token.chainId === ChainController/* ChainController */.W.state.activeCaipNetwork?.caipNetworkId);
        if (this.search) {
            this.filteredTokens = this.tokenBalances?.filter(token => token.name.toLowerCase().includes(this.search.toLowerCase()));
        }
        else {
            this.filteredTokens = this.tokens;
        }
        return (0,lit/* html */.qy) `
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${['0', 's', '0', 's']}
      >
        <wui-flex justifyContent="flex-start" .padding=${['m', 's', 's', 's']}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens && this.filteredTokens.length > 0
            ? this.filteredTokens.map(token => (0,lit/* html */.qy) `<wui-list-token
                    @click=${this.handleTokenClick.bind(this, token)}
                    ?clickable=${true}
                    tokenName=${token.name}
                    tokenImageUrl=${token.iconUrl}
                    tokenAmount=${token.quantity.numeric}
                    tokenValue=${token.value}
                    tokenCurrency=${token.symbol}
                  ></wui-list-token>`)
            : (0,lit/* html */.qy) `<wui-flex
                .padding=${['4xl', '0', '0', '0']}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
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
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
    }
    onBuyClick() {
        RouterController/* RouterController */.I.push('OnRampProviders');
    }
    onInputChange(event) {
        this.onDebouncedSearch(event.detail);
    }
    handleTokenClick(token) {
        SendController/* SendController */.R.setToken(token);
        SendController/* SendController */.R.setTokenAmount(undefined);
        RouterController/* RouterController */.I.goBack();
    }
};
W3mSendSelectTokenView.styles = w3m_wallet_send_select_token_view_styles;
w3m_wallet_send_select_token_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSendSelectTokenView.prototype, "tokenBalances", void 0);
w3m_wallet_send_select_token_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSendSelectTokenView.prototype, "tokens", void 0);
w3m_wallet_send_select_token_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSendSelectTokenView.prototype, "filteredTokens", void 0);
w3m_wallet_send_select_token_view_decorate([
    (0,decorators/* state */.wk)()
], W3mSendSelectTokenView.prototype, "search", void 0);
W3mSendSelectTokenView = w3m_wallet_send_select_token_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-send-select-token-view')
], W3mSendSelectTokenView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/AccountController.js
var AccountController = __webpack_require__(63450);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var components_wui_icon = __webpack_require__(2132);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-image/index.js + 1 modules
var wui_image = __webpack_require__(36887);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var components_wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var layout_wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-avatar/index.js + 1 modules
var wui_avatar = __webpack_require__(76867);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-preview-item/styles.js

/* harmony default export */ const wui_preview_item_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-preview-item/index.js
var wui_preview_item_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let WuiPreviewItem = class WuiPreviewItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.text = '';
        this.address = '';
        this.isAddress = false;
    }
    render() {
        return (0,lit/* html */.qy) `<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`;
    }
    imageTemplate() {
        if (this.isAddress) {
            return (0,lit/* html */.qy) `<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`;
        }
        else if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc}></wui-image>`;
        }
        return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiPreviewItem.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_preview_item_styles];
wui_preview_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiPreviewItem.prototype, "text", void 0);
wui_preview_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiPreviewItem.prototype, "address", void 0);
wui_preview_item_decorate([
    (0,decorators/* property */.MZ)()
], WuiPreviewItem.prototype, "imageSrc", void 0);
wui_preview_item_decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiPreviewItem.prototype, "isAddress", void 0);
WuiPreviewItem = wui_preview_item_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-preview-item')
], WuiPreviewItem);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-preview-item.js

//# sourceMappingURL=wui-preview-item.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js
var W3mFrameConstants = __webpack_require__(10152);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/AssetUtil.js
var AssetUtil = __webpack_require__(27601);
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-content/styles.js

/* harmony default export */ const wui_list_content_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-content/index.js
var wui_list_content_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiListContent = class WuiListContent extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.imageSrc = undefined;
        this.textTitle = '';
        this.textValue = undefined;
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue ? 'fg-200' : 'fg-100'}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `;
    }
    templateContent() {
        if (this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`;
        }
        else if (this.textValue) {
            return (0,lit/* html */.qy) ` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`;
        }
        return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`;
    }
};
WuiListContent.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, wui_list_content_styles];
wui_list_content_decorate([
    (0,decorators/* property */.MZ)()
], WuiListContent.prototype, "imageSrc", void 0);
wui_list_content_decorate([
    (0,decorators/* property */.MZ)()
], WuiListContent.prototype, "textTitle", void 0);
wui_list_content_decorate([
    (0,decorators/* property */.MZ)()
], WuiListContent.prototype, "textValue", void 0);
WuiListContent = wui_list_content_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-content')
], WuiListContent);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-content.js

//# sourceMappingURL=wui-list-content.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-send-details/styles.js

/* harmony default export */ const w3m_wallet_send_details_styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/partials/w3m-wallet-send-details/index.js
var w3m_wallet_send_details_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mWalletSendDetails = class W3mWalletSendDetails extends lit/* LitElement */.WF {
    render() {
        return (0,lit/* html */.qy) ` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${esm_exports/* UiHelperUtil */.Zv.getTruncateString({
            string: this.receiverAddress ?? '',
            charsStart: 4,
            charsEnd: 4,
            truncate: 'middle'
        })}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`;
    }
    networkTemplate() {
        if (this.caipNetwork?.name) {
            return (0,lit/* html */.qy) ` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${(0,if_defined/* ifDefined */.J)(AssetUtil/* AssetUtil */.$.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`;
        }
        return null;
    }
    onNetworkClick(network) {
        if (network) {
            RouterController/* RouterController */.I.push('Networks', { network });
        }
    }
};
W3mWalletSendDetails.styles = w3m_wallet_send_details_styles;
w3m_wallet_send_details_decorate([
    (0,decorators/* property */.MZ)()
], W3mWalletSendDetails.prototype, "receiverAddress", void 0);
w3m_wallet_send_details_decorate([
    (0,decorators/* property */.MZ)({ type: Object })
], W3mWalletSendDetails.prototype, "caipNetwork", void 0);
W3mWalletSendDetails = w3m_wallet_send_details_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-send-details')
], W3mWalletSendDetails);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-preview-view/styles.js

/* harmony default export */ const w3m_wallet_send_preview_view_styles = ((0,lit/* css */.AH) `
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`);
//# sourceMappingURL=styles.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-wallet-send-preview-view/index.js
var w3m_wallet_send_preview_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let W3mWalletSendPreviewView = class W3mWalletSendPreviewView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.token = SendController/* SendController */.R.state.token;
        this.sendTokenAmount = SendController/* SendController */.R.state.sendTokenAmount;
        this.receiverAddress = SendController/* SendController */.R.state.receiverAddress;
        this.receiverProfileName = SendController/* SendController */.R.state.receiverProfileName;
        this.receiverProfileImageUrl = SendController/* SendController */.R.state.receiverProfileImageUrl;
        this.caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        this.loading = SendController/* SendController */.R.state.loading;
        this.unsubscribe.push(...[
            SendController/* SendController */.R.subscribe(val => {
                this.token = val.token;
                this.sendTokenAmount = val.sendTokenAmount;
                this.receiverAddress = val.receiverAddress;
                this.receiverProfileName = val.receiverProfileName;
                this.receiverProfileImageUrl = val.receiverProfileImageUrl;
                this.loading = val.loading;
            }),
            ChainController/* ChainController */.W.subscribeKey('activeCaipNetwork', val => (this.caipNetwork = val))
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return (0,lit/* html */.qy) ` <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']}>
      <wui-flex gap="xs" flexDirection="column" .padding=${['0', 'xs', '0', 'xs']}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount
            ? esm_exports/* UiHelperUtil */.Zv.roundNumber(this.sendTokenAmount, 6, 5)
            : 'unknown'} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName
            ? esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.receiverProfileName,
                charsStart: 20,
                charsEnd: 0,
                truncate: 'end'
            })
            : esm_exports/* UiHelperUtil */.Zv.getTruncateString({
                string: this.receiverAddress ? this.receiverAddress : '',
                charsStart: 4,
                charsEnd: 4,
                truncate: 'middle'
            })}"
            address=${this.receiverAddress ?? ''}
            .imageSrc=${this.receiverProfileImageUrl ?? undefined}
            .isAddress=${true}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${['xxl', '0', '0', '0']}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${['s', '0', '0', '0']}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${['l', '0', '0', '0']}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`;
    }
    sendValueTemplate() {
        if (this.token && this.sendTokenAmount) {
            const price = this.token.price;
            const totalValue = price * this.sendTokenAmount;
            return (0,lit/* html */.qy) `<wui-text variant="paragraph-400" color="fg-100"
        >$${totalValue.toFixed(2)}</wui-text
      >`;
        }
        return null;
    }
    async onSendClick() {
        if (!this.sendTokenAmount || !this.receiverAddress) {
            SnackController/* SnackController */.P.showError('Please enter a valid amount and receiver address');
            return;
        }
        try {
            await SendController/* SendController */.R.sendToken();
            SnackController/* SnackController */.P.showSuccess('Transaction started');
            RouterController/* RouterController */.I.replace('Account');
        }
        catch (error) {
            SnackController/* SnackController */.P.showError('Failed to send transaction. Please try again.');
            console.error('SendController:sendToken - failed to send transaction', error);
            const activeChainNamespace = ChainController/* ChainController */.W.state.activeChain;
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'SEND_ERROR',
                properties: {
                    message: errorMessage,
                    isSmartAccount: AccountController/* AccountController */.U.state.preferredAccountTypes?.[activeChainNamespace] ===
                        W3mFrameConstants/* W3mFrameRpcConstants */.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: this.token?.symbol || '',
                    amount: this.sendTokenAmount,
                    network: ChainController/* ChainController */.W.state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
        }
    }
    onCancelClick() {
        RouterController/* RouterController */.I.goBack();
    }
};
W3mWalletSendPreviewView.styles = w3m_wallet_send_preview_view_styles;
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "token", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "sendTokenAmount", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "receiverAddress", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "receiverProfileName", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "receiverProfileImageUrl", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "caipNetwork", void 0);
w3m_wallet_send_preview_view_decorate([
    (0,decorators/* state */.wk)()
], W3mWalletSendPreviewView.prototype, "loading", void 0);
W3mWalletSendPreviewView = w3m_wallet_send_preview_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-wallet-send-preview-view')
], W3mWalletSendPreviewView);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/send.js



//# sourceMappingURL=send.js.map

/***/ }),

/***/ 77616:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_icon_box_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12851);

//# sourceMappingURL=wui-icon-box.js.map

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
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/styles.js

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
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-link/index.js
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
;// CONCATENATED MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js

//# sourceMappingURL=wui-link.js.map

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

/***/ 7565:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C5: () => (/* binding */ REOWN_URL),
/* harmony export */   Ky: () => (/* binding */ numbersRegex),
/* harmony export */   PG: () => (/* binding */ specialCharactersRegex)
/* harmony export */ });
const specialCharactersRegex = /[.*+?^${}()|[\]\\]/gu;
const numbersRegex = /[0-9,.]/u;
const REOWN_URL = 'https://reown.com';
//# sourceMappingURL=ConstantsUtil.js.map

/***/ })

}]);
//# sourceMappingURL=6323.bundle.js.map