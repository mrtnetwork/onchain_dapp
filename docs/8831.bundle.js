"use strict";
(self["webpackChunkpython_server"] = self["webpackChunkpython_server"] || []).push([[8831],{

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-email-input/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-email-input/index.js
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
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-email-input.js

//# sourceMappingURL=wui-email-input.js.map

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

/***/ 77616:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_icon_box_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12851);

//# sourceMappingURL=wui-icon-box.js.map

/***/ }),

/***/ 88831:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mEmailLoginView: () => (/* reexport */ W3mEmailLoginView),
  W3mEmailVerifyDeviceView: () => (/* reexport */ W3mEmailVerifyDeviceView),
  W3mEmailVerifyOtpView: () => (/* reexport */ W3mEmailVerifyOtpView),
  W3mUpdateEmailPrimaryOtpView: () => (/* reexport */ W3mUpdateEmailPrimaryOtpView),
  W3mUpdateEmailSecondaryOtpView: () => (/* reexport */ W3mUpdateEmailSecondaryOtpView),
  W3mUpdateEmailWalletView: () => (/* reexport */ W3mUpdateEmailWalletView)
});

// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js + 1 modules
var ConnectionController = __webpack_require__(31211);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js
var ChainController = __webpack_require__(6056);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js + 1 modules
var OptionsController = __webpack_require__(42733);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js
var ConnectorController = __webpack_require__(36010);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-link.js + 2 modules
var wui_link = __webpack_require__(45101);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-spinner.js
var wui_loading_spinner = __webpack_require__(93373);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-flex/index.js + 1 modules
var layout_wui_flex = __webpack_require__(69807);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js
var UiHelperUtil = __webpack_require__(63612);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-numeric/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
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

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-input-numeric/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiInputNumeric = class WuiInputNumeric extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.value = '';
    }
    render() {
        return (0,lit/* html */.qy) `<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `;
    }
};
WuiInputNumeric.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiInputNumeric.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: String })
], WuiInputNumeric.prototype, "value", void 0);
WuiInputNumeric = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-input-numeric')
], WuiInputNumeric);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-otp/styles.js

/* harmony default export */ const wui_otp_styles = ((0,lit/* css */.AH) `
  :host {
    position: relative;
    display: block;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-otp/index.js
var wui_otp_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let WuiOtp = class WuiOtp extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.length = 6;
        this.otp = '';
        this.values = Array.from({ length: this.length }).map(() => '');
        this.numerics = [];
        this.shouldInputBeEnabled = (index) => {
            const previousInputs = this.values.slice(0, index);
            return previousInputs.every(input => input !== '');
        };
        this.handleKeyDown = (e, index) => {
            const inputElement = e.target;
            const input = this.getInputElement(inputElement);
            const keyArr = ['ArrowLeft', 'ArrowRight', 'Shift', 'Delete'];
            if (!input) {
                return;
            }
            if (keyArr.includes(e.key)) {
                e.preventDefault();
            }
            const currentCaretPos = input.selectionStart;
            switch (e.key) {
                case 'ArrowLeft':
                    if (currentCaretPos) {
                        input.setSelectionRange(currentCaretPos + 1, currentCaretPos + 1);
                    }
                    this.focusInputField('prev', index);
                    break;
                case 'ArrowRight':
                    this.focusInputField('next', index);
                    break;
                case 'Shift':
                    this.focusInputField('next', index);
                    break;
                case 'Delete':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        this.updateInput(input, index, '');
                    }
                    break;
                case 'Backspace':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        this.updateInput(input, index, '');
                    }
                    break;
                default:
            }
        };
        this.focusInputField = (dir, index) => {
            if (dir === 'next') {
                const nextIndex = index + 1;
                if (!this.shouldInputBeEnabled(nextIndex)) {
                    return;
                }
                const numeric = this.numerics[nextIndex < this.length ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.disabled = false;
                    input.focus();
                }
            }
            if (dir === 'prev') {
                const nextIndex = index - 1;
                const numeric = this.numerics[nextIndex > -1 ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.focus();
                }
            }
        };
    }
    firstUpdated() {
        if (this.otp) {
            this.values = this.otp.split('');
        }
        const numericElements = this.shadowRoot?.querySelectorAll('wui-input-numeric');
        if (numericElements) {
            this.numerics = Array.from(numericElements);
        }
        this.numerics[0]?.focus();
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({ length: this.length }).map((_, index) => (0,lit/* html */.qy) `
            <wui-input-numeric
              @input=${(e) => this.handleInput(e, index)}
              @click=${(e) => this.selectInput(e)}
              @keydown=${(e) => this.handleKeyDown(e, index)}
              .disabled=${!this.shouldInputBeEnabled(index)}
              .value=${this.values[index] || ''}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
    }
    updateInput(element, index, value) {
        const numeric = this.numerics[index];
        const input = element || (numeric ? this.getInputElement(numeric) : undefined);
        if (input) {
            input.value = value;
            this.values = this.values.map((val, i) => (i === index ? value : val));
        }
    }
    selectInput(e) {
        const targetElement = e.target;
        if (targetElement) {
            const inputElement = this.getInputElement(targetElement);
            inputElement?.select();
        }
    }
    handleInput(e, index) {
        const inputElement = e.target;
        const input = this.getInputElement(inputElement);
        if (input) {
            const inputValue = input.value;
            if (e.inputType === 'insertFromPaste') {
                this.handlePaste(input, inputValue, index);
            }
            else {
                const isValid = UiHelperUtil/* UiHelperUtil */.Z.isNumber(inputValue);
                if (isValid && e.data) {
                    this.updateInput(input, index, e.data);
                    this.focusInputField('next', index);
                }
                else {
                    this.updateInput(input, index, '');
                }
            }
        }
        this.dispatchInputChangeEvent();
    }
    handlePaste(input, inputValue, index) {
        const value = inputValue[0];
        const isValid = value && UiHelperUtil/* UiHelperUtil */.Z.isNumber(value);
        if (isValid) {
            this.updateInput(input, index, value);
            const inputString = inputValue.substring(1);
            if (index + 1 < this.length && inputString.length) {
                const nextNumeric = this.numerics[index + 1];
                const nextInput = nextNumeric ? this.getInputElement(nextNumeric) : undefined;
                if (nextInput) {
                    this.handlePaste(nextInput, inputString, index + 1);
                }
            }
            else {
                this.focusInputField('next', index);
            }
        }
        else {
            this.updateInput(input, index, '');
        }
    }
    getInputElement(el) {
        if (el.shadowRoot?.querySelector('input')) {
            return el.shadowRoot.querySelector('input');
        }
        return null;
    }
    dispatchInputChangeEvent() {
        const value = this.values.join('');
        this.dispatchEvent(new CustomEvent('inputChange', {
            detail: value,
            bubbles: true,
            composed: true
        }));
    }
};
WuiOtp.styles = [ThemeUtil/* resetStyles */.W5, wui_otp_styles];
wui_otp_decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiOtp.prototype, "length", void 0);
wui_otp_decorate([
    (0,decorators/* property */.MZ)({ type: String })
], WuiOtp.prototype, "otp", void 0);
wui_otp_decorate([
    (0,decorators/* state */.wk)()
], WuiOtp.prototype, "values", void 0);
WuiOtp = wui_otp_decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-otp')
], WuiOtp);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-otp.js

//# sourceMappingURL=wui-otp.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js + 1 modules
var W3mFrameHelpers = __webpack_require__(66409);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-email-otp-widget/styles.js

/* harmony default export */ const w3m_email_otp_widget_styles = ((0,lit/* css */.AH) `
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/w3m-email-otp-widget/index.js
var w3m_email_otp_widget_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











const OTP_LENGTH = 6;
let W3mEmailOtpWidget = class W3mEmailOtpWidget extends lit/* LitElement */.WF {
    firstUpdated() {
        this.startOTPTimeout();
    }
    disconnectedCallback() {
        clearTimeout(this.OTPTimeout);
    }
    constructor() {
        super();
        this.loading = false;
        this.timeoutTimeLeft = W3mFrameHelpers/* W3mFrameHelpers */.Q.getTimeToNextEmailLogin();
        this.error = '';
        this.otp = '';
        this.email = RouterController/* RouterController */.I.state.data?.email;
        this.authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
    }
    render() {
        if (!this.email) {
            throw new Error('w3m-email-otp-widget: No email provided');
        }
        const isResendDisabled = Boolean(this.timeoutTimeLeft);
        const footerLabels = this.getFooterLabels(isResendDisabled);
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['l', '0', 'l', '0']}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${['0', 'xl', '0', 'xl']}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading
            ? (0,lit/* html */.qy) `<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`
            : (0,lit/* html */.qy) ` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error
                ? (0,lit/* html */.qy) `
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `
                : null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${footerLabels.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${isResendDisabled}>
            ${footerLabels.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
    }
    startOTPTimeout() {
        this.timeoutTimeLeft = W3mFrameHelpers/* W3mFrameHelpers */.Q.getTimeToNextEmailLogin();
        this.OTPTimeout = setInterval(() => {
            if (this.timeoutTimeLeft > 0) {
                this.timeoutTimeLeft = W3mFrameHelpers/* W3mFrameHelpers */.Q.getTimeToNextEmailLogin();
            }
            else {
                clearInterval(this.OTPTimeout);
            }
        }, 1000);
    }
    async onOtpInputChange(event) {
        try {
            if (!this.loading) {
                this.otp = event.detail;
                if (this.authConnector && this.otp.length === OTP_LENGTH) {
                    this.loading = true;
                    await this.onOtpSubmit?.(this.otp);
                }
            }
        }
        catch (error) {
            this.error = CoreHelperUtil/* CoreHelperUtil */.w.parseError(error);
            this.loading = false;
        }
    }
    async onResendCode() {
        try {
            if (this.onOtpResend) {
                if (!this.loading && !this.timeoutTimeLeft) {
                    this.error = '';
                    this.otp = '';
                    const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
                    if (!authConnector || !this.email) {
                        throw new Error('w3m-email-otp-widget: Unable to resend email');
                    }
                    this.loading = true;
                    await this.onOtpResend(this.email);
                    this.startOTPTimeout();
                    SnackController/* SnackController */.P.showSuccess('Code email resent');
                }
            }
            else if (this.onStartOver) {
                this.onStartOver();
            }
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(error);
        }
        finally {
            this.loading = false;
        }
    }
    getFooterLabels(isResendDisabled) {
        if (this.onStartOver) {
            return {
                title: 'Something wrong?',
                action: `Try again ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : ''}`
            };
        }
        return {
            title: `Didn't receive it?`,
            action: `Resend ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : 'Code'}`
        };
    }
};
W3mEmailOtpWidget.styles = w3m_email_otp_widget_styles;
w3m_email_otp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailOtpWidget.prototype, "loading", void 0);
w3m_email_otp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailOtpWidget.prototype, "timeoutTimeLeft", void 0);
w3m_email_otp_widget_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailOtpWidget.prototype, "error", void 0);
W3mEmailOtpWidget = w3m_email_otp_widget_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-email-otp-widget')
], W3mEmailOtpWidget);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-verify-otp-view/index.js
var w3m_email_verify_otp_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let W3mEmailVerifyOtpView = class W3mEmailVerifyOtpView extends W3mEmailOtpWidget {
    constructor() {
        super(...arguments);
        this.onOtpSubmit = async (otp) => {
            try {
                if (this.authConnector) {
                    await this.authConnector.provider.connectOtp({ otp });
                    EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' });
                    const connectionsByNamespace = ConnectionController/* ConnectionController */.x.getConnections(ChainController/* ChainController */.W.state.activeChain);
                    const hasConnections = connectionsByNamespace.length > 0;
                    if (ChainController/* ChainController */.W.state.activeChain) {
                        await ConnectionController/* ConnectionController */.x.connectExternal(this.authConnector, ChainController/* ChainController */.W.state.activeChain);
                    }
                    else {
                        throw new Error('Active chain is not set on ChainControll');
                    }
                    EventsController/* EventsController */.E.sendEvent({
                        type: 'track',
                        event: 'CONNECT_SUCCESS',
                        properties: { method: 'email', name: this.authConnector.name || 'Unknown' }
                    });
                    const isMultiWalletEnabled = OptionsController/* OptionsController */.H.state.remoteFeatures?.multiWallet;
                    if (!OptionsController/* OptionsController */.H.state.siwx) {
                        if (hasConnections && isMultiWalletEnabled) {
                            RouterController/* RouterController */.I.replace('ProfileWallets');
                            SnackController/* SnackController */.P.showSuccess('New Wallet Added');
                        }
                        else {
                            ModalController/* ModalController */.W.close();
                        }
                    }
                }
            }
            catch (error) {
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: 'EMAIL_VERIFICATION_CODE_FAIL',
                    properties: { message: CoreHelperUtil/* CoreHelperUtil */.w.parseError(error) }
                });
                throw error;
            }
        };
        this.onOtpResend = async (email) => {
            if (this.authConnector) {
                await this.authConnector.provider.connectEmail({ email });
                EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
            }
        };
    }
};
W3mEmailVerifyOtpView = w3m_email_verify_otp_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-email-verify-otp-view')
], W3mEmailVerifyOtpView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-box.js
var wui_icon_box = __webpack_require__(77616);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-verify-device-view/styles.js

/* harmony default export */ const w3m_email_verify_device_view_styles = ((0,lit/* css */.AH) `
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-verify-device-view/index.js
var w3m_email_verify_device_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let W3mEmailVerifyDeviceView = class W3mEmailVerifyDeviceView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.email = RouterController/* RouterController */.I.state.data?.email;
        this.authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        this.loading = false;
        this.listenForDeviceApproval();
    }
    render() {
        if (!this.email) {
            throw new Error('w3m-email-verify-device-view: No email provided');
        }
        if (!this.authConnector) {
            throw new Error('w3m-email-verify-device-view: No auth connector provided');
        }
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['xxl', 's', 'xxl', 's']}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
    }
    async listenForDeviceApproval() {
        if (this.authConnector) {
            try {
                await this.authConnector.provider.connectDevice();
                EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'DEVICE_REGISTERED_FOR_EMAIL' });
                EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
                RouterController/* RouterController */.I.replace('EmailVerifyOtp', { email: this.email });
            }
            catch (error) {
                RouterController/* RouterController */.I.goBack();
            }
        }
    }
    async onResendCode() {
        try {
            if (!this.loading) {
                if (!this.authConnector || !this.email) {
                    throw new Error('w3m-email-login-widget: Unable to resend email');
                }
                this.loading = true;
                await this.authConnector.provider.connectEmail({ email: this.email });
                this.listenForDeviceApproval();
                SnackController/* SnackController */.P.showSuccess('Code email resent');
            }
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(error);
        }
        finally {
            this.loading = false;
        }
    }
};
W3mEmailVerifyDeviceView.styles = w3m_email_verify_device_view_styles;
w3m_email_verify_device_view_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailVerifyDeviceView.prototype, "loading", void 0);
W3mEmailVerifyDeviceView = w3m_email_verify_device_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-email-verify-device-view')
], W3mEmailVerifyDeviceView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/lit/directives/ref.js + 1 modules
var ref = __webpack_require__(7610);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-email-input.js + 2 modules
var wui_email_input = __webpack_require__(38913);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-wallet-view/styles.js

/* harmony default export */ const w3m_update_email_wallet_view_styles = ((0,lit/* css */.AH) `
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-wallet-view/index.js
var w3m_update_email_wallet_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










let W3mUpdateEmailWalletView = class W3mUpdateEmailWalletView extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.formRef = (0,ref/* createRef */._)();
        this.initialEmail = RouterController/* RouterController */.I.state.data?.email ?? '';
        this.redirectView = RouterController/* RouterController */.I.state.data?.redirectView;
        this.email = '';
        this.loading = false;
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
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,ref/* ref */.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `;
    }
    onEmailInputChange(event) {
        this.email = event.detail;
    }
    async onSubmitEmail(event) {
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            event.preventDefault();
            const authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
            if (!authConnector) {
                throw new Error('w3m-update-email-wallet: Auth connector not found');
            }
            const response = await authConnector.provider.updateEmail({ email: this.email });
            EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_EDIT' });
            if (response.action === 'VERIFY_SECONDARY_OTP') {
                RouterController/* RouterController */.I.push('UpdateEmailSecondaryOtp', {
                    email: this.initialEmail,
                    newEmail: this.email,
                    redirectView: this.redirectView
                });
            }
            else {
                RouterController/* RouterController */.I.push('UpdateEmailPrimaryOtp', {
                    email: this.initialEmail,
                    newEmail: this.email,
                    redirectView: this.redirectView
                });
            }
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(error);
            this.loading = false;
        }
    }
    buttonsTemplate() {
        const showSubmit = !this.loading && this.email.length > 3 && this.email !== this.initialEmail;
        if (!this.redirectView) {
            return (0,lit/* html */.qy) `
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `;
        }
        return (0,lit/* html */.qy) `
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${RouterController/* RouterController */.I.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `;
    }
};
W3mUpdateEmailWalletView.styles = w3m_update_email_wallet_view_styles;
w3m_update_email_wallet_view_decorate([
    (0,decorators/* state */.wk)()
], W3mUpdateEmailWalletView.prototype, "email", void 0);
w3m_update_email_wallet_view_decorate([
    (0,decorators/* state */.wk)()
], W3mUpdateEmailWalletView.prototype, "loading", void 0);
W3mUpdateEmailWalletView = w3m_update_email_wallet_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-update-email-wallet-view')
], W3mUpdateEmailWalletView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-primary-otp-view/index.js
var w3m_update_email_primary_otp_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let W3mUpdateEmailPrimaryOtpView = class W3mUpdateEmailPrimaryOtpView extends W3mEmailOtpWidget {
    constructor() {
        super();
        this.email = RouterController/* RouterController */.I.state.data?.email;
        this.onOtpSubmit = async (otp) => {
            try {
                if (this.authConnector) {
                    await this.authConnector.provider.updateEmailPrimaryOtp({ otp });
                    EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' });
                    RouterController/* RouterController */.I.replace('UpdateEmailSecondaryOtp', RouterController/* RouterController */.I.state.data);
                }
            }
            catch (error) {
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: 'EMAIL_VERIFICATION_CODE_FAIL',
                    properties: { message: CoreHelperUtil/* CoreHelperUtil */.w.parseError(error) }
                });
                throw error;
            }
        };
        this.onStartOver = () => {
            RouterController/* RouterController */.I.replace('UpdateEmailWallet', RouterController/* RouterController */.I.state.data);
        };
    }
};
W3mUpdateEmailPrimaryOtpView = w3m_update_email_primary_otp_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-update-email-primary-otp-view')
], W3mUpdateEmailPrimaryOtpView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-update-email-secondary-otp-view/index.js
var w3m_update_email_secondary_otp_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let W3mUpdateEmailSecondaryOtpView = class W3mUpdateEmailSecondaryOtpView extends W3mEmailOtpWidget {
    constructor() {
        super();
        this.email = RouterController/* RouterController */.I.state.data?.newEmail;
        this.redirectView = RouterController/* RouterController */.I.state.data?.redirectView;
        this.onOtpSubmit = async (otp) => {
            try {
                if (this.authConnector) {
                    await this.authConnector.provider.updateEmailSecondaryOtp({ otp });
                    EventsController/* EventsController */.E.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' });
                    if (this.redirectView) {
                        RouterController/* RouterController */.I.reset(this.redirectView);
                    }
                }
            }
            catch (error) {
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: 'EMAIL_VERIFICATION_CODE_FAIL',
                    properties: { message: CoreHelperUtil/* CoreHelperUtil */.w.parseError(error) }
                });
                throw error;
            }
        };
        this.onStartOver = () => {
            RouterController/* RouterController */.I.replace('UpdateEmailWallet', RouterController/* RouterController */.I.state.data);
        };
    }
};
W3mUpdateEmailSecondaryOtpView = w3m_update_email_secondary_otp_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-update-email-secondary-otp-view')
], W3mUpdateEmailSecondaryOtpView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(24376);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js
var src_ConstantsUtil = __webpack_require__(69510);
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/src/views/w3m-email-login-view/index.js
var w3m_email_login_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let W3mEmailLoginView = class W3mEmailLoginView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.authConnector = ConnectorController/* ConnectorController */.a.getAuthConnector();
        this.isEmailEnabled = OptionsController/* OptionsController */.H.state.remoteFeatures?.email;
        this.isAuthEnabled = this.checkIfAuthEnabled(ConnectorController/* ConnectorController */.a.state.connectors);
        this.connectors = ConnectorController/* ConnectorController */.a.state.connectors;
        ConnectorController/* ConnectorController */.a.subscribeKey('connectors', val => {
            this.connectors = val;
            this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
        });
    }
    render() {
        if (!this.isEmailEnabled) {
            throw new Error('w3m-email-login-view: Email is not enabled');
        }
        if (!this.isAuthEnabled) {
            throw new Error('w3m-email-login-view: No auth connector provided');
        }
        return (0,lit/* html */.qy) `<wui-flex
      flexDirection="column"
      .padding=${['3xs', 'm', 'm', 'm']}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `;
    }
    checkIfAuthEnabled(connectors) {
        const namespacesWithAuthConnector = connectors
            .filter(c => c.type === src_ConstantsUtil/* ConstantsUtil */.o.CONNECTOR_TYPE_AUTH)
            .map(i => i.chain);
        const authSupportedNamespaces = ConstantsUtil/* ConstantsUtil */.o.AUTH_CONNECTOR_SUPPORTED_CHAINS;
        return authSupportedNamespaces.some(ns => namespacesWithAuthConnector.includes(ns));
    }
};
w3m_email_login_view_decorate([
    (0,decorators/* state */.wk)()
], W3mEmailLoginView.prototype, "connectors", void 0);
W3mEmailLoginView = w3m_email_login_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-email-login-view')
], W3mEmailLoginView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/email.js






//# sourceMappingURL=email.js.map

/***/ }),

/***/ 93373:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_loading_spinner_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20880);

//# sourceMappingURL=wui-loading-spinner.js.map

/***/ })

}]);
//# sourceMappingURL=8831.bundle.js.map