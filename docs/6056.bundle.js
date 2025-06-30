"use strict";
(self["webpackChunkOnChain_DAPP_Examples"] = self["webpackChunkOnChain_DAPP_Examples"] || []).push([[6056],{

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

/***/ 12851:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiIconBox

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






let WuiIconBox = class WuiIconBox extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.backgroundColor = 'accent-100';
        this.iconColor = 'accent-100';
        this.background = 'transparent';
        this.border = false;
        this.borderColor = 'wui-color-bg-125';
        this.icon = 'copy';
    }
    render() {
        const iconSize = this.iconSize || this.size;
        const isLg = this.size === 'lg';
        const isXl = this.size === 'xl';
        const bgMix = isLg ? '12%' : '16%';
        const borderRadius = isLg ? 'xxs' : isXl ? 's' : '3xl';
        const isGray = this.background === 'gray';
        const isOpaque = this.background === 'opaque';
        const isColorChange = (this.backgroundColor === 'accent-100' && isOpaque) ||
            (this.backgroundColor === 'success-100' && isOpaque) ||
            (this.backgroundColor === 'error-100' && isOpaque) ||
            (this.backgroundColor === 'inverse-100' && isOpaque);
        let bgValueVariable = `var(--wui-color-${this.backgroundColor})`;
        if (isColorChange) {
            bgValueVariable = `var(--wui-icon-box-bg-${this.backgroundColor})`;
        }
        else if (isGray) {
            bgValueVariable = `var(--wui-color-gray-${this.backgroundColor})`;
        }
        this.style.cssText = `
       --local-bg-value: ${bgValueVariable};
       --local-bg-mix: ${isColorChange || isGray ? `100%` : bgMix};
       --local-border-radius: var(--wui-border-radius-${borderRadius});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor === 'wui-color-bg-125' ? `2px` : `1px`} solid ${this.border ? `var(--${this.borderColor})` : `transparent`}
   `;
        return (0,lit/* html */.qy) ` <wui-icon color=${this.iconColor} size=${iconSize} name=${this.icon}></wui-icon> `;
    }
};
WuiIconBox.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "backgroundColor", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "iconColor", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "iconSize", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "background", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiIconBox.prototype, "border", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "borderColor", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiIconBox.prototype, "icon", void 0);
WuiIconBox = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-icon-box')
], WuiIconBox);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 19384:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiButton

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js + 1 modules
var wui_loading_spinner = __webpack_require__(20880);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-text/index.js + 1 modules
var wui_text = __webpack_require__(18409);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-button/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
    height: 24px;
  }

  button[data-size='xs'][data-icon-left='true'][data-icon-right='false'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
  }

  button[data-size='xs'][data-icon-right='true'][data-icon-left='false'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
  }

  button[data-size='sm'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
    height: 32px;
  }

  button[data-size='sm'][data-icon-left='true'][data-icon-right='false'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
  }

  button[data-size='sm'][data-icon-right='true'][data-icon-left='false'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
  }

  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
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

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-button/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







const SPINNER_COLOR_BY_VARIANT = {
    main: 'inverse-100',
    inverse: 'inverse-000',
    accent: 'accent-100',
    'accent-error': 'error-100',
    'accent-success': 'success-100',
    neutral: 'fg-100',
    disabled: 'gray-glass-020'
};
const TEXT_VARIANT_BY_SIZE = {
    lg: 'paragraph-600',
    md: 'small-600',
    sm: 'small-600',
    xs: 'tiny-600'
};
const SPINNER_SIZE_BY_SIZE = {
    lg: 'md',
    md: 'md',
    sm: 'sm',
    xs: 'sm'
};
let WuiButton = class WuiButton extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.size = 'lg';
        this.disabled = false;
        this.fullWidth = false;
        this.loading = false;
        this.variant = 'main';
        this.hasIconLeft = false;
        this.hasIconRight = false;
        this.borderRadius = 'm';
    }
    render() {
        this.style.cssText = `
    --local-width: ${this.fullWidth ? '100%' : 'auto'};
    --local-opacity-100: ${this.loading ? 0 : 1};
    --local-opacity-000: ${this.loading ? 1 : 0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;
        const textVariant = this.textVariant ?? TEXT_VARIANT_BY_SIZE[this.size];
        return (0,lit/* html */.qy) `
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${() => this.handleSlotLeftChange()}></slot>
        <wui-text variant=${textVariant} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${() => this.handleSlotRightChange()}></slot>
      </button>
    `;
    }
    handleSlotLeftChange() {
        this.hasIconLeft = true;
    }
    handleSlotRightChange() {
        this.hasIconRight = true;
    }
    loadingTemplate() {
        if (this.loading) {
            const size = SPINNER_SIZE_BY_SIZE[this.size];
            const color = this.disabled
                ? SPINNER_COLOR_BY_VARIANT['disabled']
                : SPINNER_COLOR_BY_VARIANT[this.variant];
            return (0,lit/* html */.qy) `<wui-loading-spinner color=${color} size=${size}></wui-loading-spinner>`;
        }
        return (0,lit/* html */.qy) ``;
    }
};
WuiButton.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiButton.prototype, "size", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiButton.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiButton.prototype, "fullWidth", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiButton.prototype, "loading", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiButton.prototype, "variant", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiButton.prototype, "hasIconLeft", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiButton.prototype, "hasIconRight", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiButton.prototype, "borderRadius", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiButton.prototype, "textVariant", void 0);
WuiButton = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-button')
], WuiButton);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 20880:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiLoadingSpinner

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-spinner/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiLoadingSpinner = class WuiLoadingSpinner extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.color = 'accent-100';
        this.size = 'lg';
    }
    render() {
        this.style.cssText = `--local-color: ${this.color === 'inherit' ? 'inherit' : `var(--wui-color-${this.color})`}`;
        this.dataset['size'] = this.size;
        return (0,lit/* html */.qy) `<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`;
    }
};
WuiLoadingSpinner.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiLoadingSpinner.prototype, "color", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiLoadingSpinner.prototype, "size", void 0);
WuiLoadingSpinner = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-loading-spinner')
], WuiLoadingSpinner);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 25981:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiNetworkImage

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkLg.js

const networkSvgLg = (0,lit/* svg */.JW) `<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;
//# sourceMappingURL=networkLg.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkMd.js
var networkMd = __webpack_require__(27512);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/assets/svg/networkSm.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-image/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-network-image/index.js
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

/***/ 26509:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiListItem

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/lit/directives/if-defined.js + 1 modules
var if_defined = __webpack_require__(60031);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-icon/index.js + 5 modules
var wui_icon = __webpack_require__(2132);
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
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-box/index.js + 1 modules
var wui_icon_box = __webpack_require__(12851);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-item/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-list-item/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let WuiListItem = class WuiListItem extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
        this.variant = 'icon';
        this.disabled = false;
        this.imageSrc = undefined;
        this.alt = undefined;
        this.chevron = false;
        this.loading = false;
    }
    render() {
        return (0,lit/* html */.qy) `
      <button
        ?disabled=${this.loading ? true : Boolean(this.disabled)}
        data-loading=${this.loading}
        data-iconvariant=${(0,if_defined/* ifDefined */.J)(this.iconVariant)}
        tabindex=${(0,if_defined/* ifDefined */.J)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
    }
    visualTemplate() {
        if (this.variant === 'image' && this.imageSrc) {
            return (0,lit/* html */.qy) `<wui-image src=${this.imageSrc} alt=${this.alt ?? 'list item'}></wui-image>`;
        }
        if (this.iconVariant === 'square' && this.icon && this.variant === 'icon') {
            return (0,lit/* html */.qy) `<wui-icon name=${this.icon}></wui-icon>`;
        }
        if (this.variant === 'icon' && this.icon && this.iconVariant) {
            const color = ['blue', 'square-blue'].includes(this.iconVariant) ? 'accent-100' : 'fg-200';
            const size = this.iconVariant === 'square-blue' ? 'mdl' : 'md';
            const iconSize = this.iconSize ? this.iconSize : size;
            return (0,lit/* html */.qy) `
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${iconSize}
          background="transparent"
          iconColor=${color}
          backgroundColor=${color}
          size=${size}
        ></wui-icon-box>
      `;
        }
        return null;
    }
    loadingTemplate() {
        if (this.loading) {
            return (0,lit/* html */.qy) `<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`;
        }
        return (0,lit/* html */.qy) ``;
    }
    chevronTemplate() {
        if (this.chevron) {
            return (0,lit/* html */.qy) `<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`;
        }
        return null;
    }
};
WuiListItem.styles = [ThemeUtil/* resetStyles */.W5, ThemeUtil/* elementStyles */.fD, styles];
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "icon", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "iconSize", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "tabIdx", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "variant", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "iconVariant", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListItem.prototype, "disabled", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "imageSrc", void 0);
__decorate([
    (0,decorators/* property */.MZ)()
], WuiListItem.prototype, "alt", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListItem.prototype, "chevron", void 0);
__decorate([
    (0,decorators/* property */.MZ)({ type: Boolean })
], WuiListItem.prototype, "loading", void 0);
WuiListItem = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-list-item')
], WuiListItem);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-item.js

//# sourceMappingURL=wui-list-item.js.map

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

/***/ 41684:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_wallet_image_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91383);

//# sourceMappingURL=wui-wallet-image.js.map

/***/ }),

/***/ 51636:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_icon_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2132);

//# sourceMappingURL=wui-icon.js.map

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-separator/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/layout/wui-separator/index.js
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
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-separator.js

//# sourceMappingURL=wui-separator.js.map

/***/ }),

/***/ 58461:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_button_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19384);

//# sourceMappingURL=wui-button.js.map

/***/ }),

/***/ 64865:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_composites_wui_icon_link_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7068);

//# sourceMappingURL=wui-icon-link.js.map

/***/ }),

/***/ 83675:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W3mPayLoadingView: () => (/* reexport */ W3mPayLoadingView),
  W3mPayView: () => (/* reexport */ W3mPayView),
  baseETH: () => (/* reexport */ baseETH),
  baseSepoliaETH: () => (/* reexport */ baseSepoliaETH),
  baseUSDC: () => (/* reexport */ baseUSDC),
  getExchanges: () => (/* reexport */ client_getExchanges),
  getIsPaymentInProgress: () => (/* reexport */ getIsPaymentInProgress),
  getPayError: () => (/* reexport */ getPayError),
  getPayResult: () => (/* reexport */ getPayResult),
  openPay: () => (/* reexport */ openPay)
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
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ModalController.js
var ModalController = __webpack_require__(96396);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js
var CoreHelperUtil = __webpack_require__(26742);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/SnackController.js
var SnackController = __webpack_require__(21871);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js + 1 modules
var ConnectionController = __webpack_require__(31211);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/index.js + 2 modules
var esm_exports = __webpack_require__(70148);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-button.js
var wui_button = __webpack_require__(58461);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-flex.js
var wui_flex = __webpack_require__(60310);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon.js
var wui_icon = __webpack_require__(51636);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-button.js + 2 modules
var wui_icon_button = __webpack_require__(84293);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-link.js
var wui_icon_link = __webpack_require__(64865);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-image.js
var wui_image = __webpack_require__(93516);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-list-item.js + 2 modules
var wui_list_item = __webpack_require__(26509);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-spinner.js
var wui_loading_spinner = __webpack_require__(93373);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-network-image.js
var wui_network_image = __webpack_require__(52619);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-separator.js + 2 modules
var wui_separator = __webpack_require__(55618);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-text.js
var wui_text = __webpack_require__(45090);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-wallet-image.js
var wui_wallet_image = __webpack_require__(41684);
// EXTERNAL MODULE: ./node_modules/valtio/esm/vanilla.mjs + 1 modules
var vanilla = __webpack_require__(29073);
// EXTERNAL MODULE: ./node_modules/valtio/esm/vanilla/utils.mjs
var utils = __webpack_require__(4707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js
var ParseUtil = __webpack_require__(75910);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js
var ConstantsUtil = __webpack_require__(24376);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/EventsController.js
var EventsController = __webpack_require__(90184);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/RouterController.js
var RouterController = __webpack_require__(78508);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-utils/dist/esm/src/ProviderUtil.js
var ProviderUtil = __webpack_require__(68990);
;// ./node_modules/@reown/appkit-pay/dist/esm/src/types/errors.js
const AppKitPayErrorCodes = {
    INVALID_PAYMENT_CONFIG: 'INVALID_PAYMENT_CONFIG',
    INVALID_RECIPIENT: 'INVALID_RECIPIENT',
    INVALID_ASSET: 'INVALID_ASSET',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    UNABLE_TO_INITIATE_PAYMENT: 'UNABLE_TO_INITIATE_PAYMENT',
    INVALID_CHAIN_NAMESPACE: 'INVALID_CHAIN_NAMESPACE',
    GENERIC_PAYMENT_ERROR: 'GENERIC_PAYMENT_ERROR',
    UNABLE_TO_GET_EXCHANGES: 'UNABLE_TO_GET_EXCHANGES',
    ASSET_NOT_SUPPORTED: 'ASSET_NOT_SUPPORTED',
    UNABLE_TO_GET_PAY_URL: 'UNABLE_TO_GET_PAY_URL',
    UNABLE_TO_GET_BUY_STATUS: 'UNABLE_TO_GET_BUY_STATUS'
};
const AppKitPayErrorMessages = {
    [AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG]: 'Invalid payment configuration',
    [AppKitPayErrorCodes.INVALID_RECIPIENT]: 'Invalid recipient address',
    [AppKitPayErrorCodes.INVALID_ASSET]: 'Invalid asset specified',
    [AppKitPayErrorCodes.INVALID_AMOUNT]: 'Invalid payment amount',
    [AppKitPayErrorCodes.UNKNOWN_ERROR]: 'Unknown payment error occurred',
    [AppKitPayErrorCodes.UNABLE_TO_INITIATE_PAYMENT]: 'Unable to initiate payment',
    [AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE]: 'Invalid chain namespace',
    [AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR]: 'Unable to process payment',
    [AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES]: 'Unable to get exchanges',
    [AppKitPayErrorCodes.ASSET_NOT_SUPPORTED]: 'Asset not supported by the selected exchange',
    [AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL]: 'Unable to get payment URL',
    [AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS]: 'Unable to get buy status'
};
class AppKitPayError extends Error {
    get message() {
        return AppKitPayErrorMessages[this.code];
    }
    constructor(code, details) {
        super(AppKitPayErrorMessages[code]);
        this.name = 'AppKitPayError';
        this.code = code;
        this.details = details;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppKitPayError);
        }
    }
}
function createAppKitPayError(code, details) {
    const errorCode = code || AppKitPayErrorCodes.UNKNOWN_ERROR;
    return new AppKitPayError(errorCode, details);
}
//# sourceMappingURL=errors.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js + 1 modules
var OptionsController = __webpack_require__(42733);
;// ./node_modules/@reown/appkit-pay/dist/esm/src/utils/ConstantsUtil.js
const API_URL = 'https://rpc.walletconnect.org/v1/json-rpc';
//# sourceMappingURL=ConstantsUtil.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/utils/ApiUtil.js


class JsonRpcError extends Error {
}
function getApiUrl() {
    const projectId = OptionsController/* OptionsController */.H.getSnapshot().projectId;
    return `${API_URL}?projectId=${projectId}`;
}
async function sendRequest(method, params) {
    const url = getApiUrl();
    const requestBody = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params
    };
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    if (json.error) {
        throw new JsonRpcError(json.error.message);
    }
    return json;
}
async function getExchanges(params) {
    const response = await sendRequest('reown_getExchanges', params);
    return response.result;
}
async function getPayUrl(params) {
    const response = await sendRequest('reown_getExchangePayUrl', params);
    return response.result;
}
async function getBuyStatus(params) {
    const response = await sendRequest('reown_getExchangeBuyStatus', params);
    return response.result;
}
//# sourceMappingURL=ApiUtil.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/utils/AssetUtil.js

const SUPPORT_PAY_WITH_WALLET_CHAIN_NAMESPACES = ['eip155'];
const CHAIN_ASSET_INFO_MAP = {
    eip155: {
        native: { assetNamespace: 'slip44', assetReference: '60' },
        defaultTokenNamespace: 'erc20'
    },
    solana: {
        native: { assetNamespace: 'slip44', assetReference: '501' },
        defaultTokenNamespace: 'token'
    }
};
function formatCaip19Asset(caipNetworkId, asset) {
    const { chainNamespace, chainId } = ParseUtil/* ParseUtil */.C.parseCaipNetworkId(caipNetworkId);
    const chainInfo = CHAIN_ASSET_INFO_MAP[chainNamespace];
    if (!chainInfo) {
        throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${chainNamespace}`);
    }
    let assetNamespace = chainInfo.native.assetNamespace;
    let assetReference = chainInfo.native.assetReference;
    if (asset !== 'native') {
        assetNamespace = chainInfo.defaultTokenNamespace;
        assetReference = asset;
    }
    const networkPart = `${chainNamespace}:${chainId}`;
    return `${networkPart}/${assetNamespace}:${assetReference}`;
}
function isPayWithWalletSupported(networkId) {
    const { chainNamespace } = ParseUtil/* ParseUtil */.C.parseCaipNetworkId(networkId);
    return SUPPORT_PAY_WITH_WALLET_CHAIN_NAMESPACES.includes(chainNamespace);
}
//# sourceMappingURL=AssetUtil.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js + 3 modules
var ContractUtil = __webpack_require__(36210);
;// ./node_modules/@reown/appkit-pay/dist/esm/src/utils/PaymentUtil.js




async function ensureCorrectNetwork(options) {
    const { paymentAssetNetwork, activeCaipNetwork, approvedCaipNetworkIds, requestedCaipNetworks } = options;
    const sortedNetworks = CoreHelperUtil/* CoreHelperUtil */.w.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    const assetCaipNetwork = sortedNetworks.find(network => network.caipNetworkId === paymentAssetNetwork);
    if (!assetCaipNetwork) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    if (assetCaipNetwork.caipNetworkId === activeCaipNetwork.caipNetworkId) {
        return;
    }
    const isSupportingAllNetworks = ChainController/* ChainController */.W.getNetworkProp('supportsAllNetworks', assetCaipNetwork.chainNamespace);
    const isSwitchAllowed = approvedCaipNetworkIds?.includes(assetCaipNetwork.caipNetworkId) || isSupportingAllNetworks;
    if (!isSwitchAllowed) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    try {
        await ChainController/* ChainController */.W.switchActiveNetwork(assetCaipNetwork);
    }
    catch (error) {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR, error);
    }
}
async function processEvmNativePayment(paymentAsset, chainNamespace, params) {
    if (chainNamespace !== ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE);
    }
    if (!params.fromAddress) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG, 'fromAddress is required for native EVM payments.');
    }
    const amountValue = typeof params.amount === 'string' ? parseFloat(params.amount) : params.amount;
    if (isNaN(amountValue)) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    const decimals = paymentAsset.metadata?.decimals ?? 18;
    const amountBigInt = ConnectionController/* ConnectionController */.x.parseUnits(amountValue.toString(), decimals);
    if (typeof amountBigInt !== 'bigint') {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);
    }
    const txResponse = await ConnectionController/* ConnectionController */.x.sendTransaction({
        chainNamespace,
        to: params.recipient,
        address: params.fromAddress,
        value: amountBigInt,
        data: '0x'
    });
    return txResponse ?? undefined;
}
async function processEvmErc20Payment(paymentAsset, params) {
    if (!params.fromAddress) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG, 'fromAddress is required for ERC20 EVM payments.');
    }
    const tokenAddress = paymentAsset.asset;
    const recipientAddress = params.recipient;
    const decimals = Number(paymentAsset.metadata.decimals);
    const amountBigInt = ConnectionController/* ConnectionController */.x.parseUnits(params.amount.toString(), decimals);
    if (amountBigInt === undefined) {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);
    }
    const txResponse = await ConnectionController/* ConnectionController */.x.writeContract({
        fromAddress: params.fromAddress,
        tokenAddress,
        args: [recipientAddress, amountBigInt],
        method: 'transfer',
        abi: ContractUtil/* ContractUtil */.v.getERC20Abi(tokenAddress),
        chainNamespace: ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM
    });
    return txResponse ?? undefined;
}
//# sourceMappingURL=PaymentUtil.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/controllers/PayController.js










const DEFAULT_PAGE = 0;
const DEFAULT_PAYMENT_ID = 'unknown';
const state = (0,vanilla/* proxy */.BX)({
    paymentAsset: {
        network: 'eip155:1',
        asset: '0x0',
        metadata: {
            name: '0x0',
            symbol: '0x0',
            decimals: 0
        }
    },
    recipient: '0x0',
    amount: 0,
    isConfigured: false,
    error: null,
    isPaymentInProgress: false,
    exchanges: [],
    isLoading: false,
    openInNewTab: true,
    redirectUrl: undefined,
    payWithExchange: undefined,
    currentPayment: undefined,
    analyticsSet: false,
    paymentId: undefined
});
const PayController_PayController = {
    state,
    subscribe(callback) {
        return (0,vanilla/* subscribe */.B1)(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return (0,utils/* subscribeKey */.u$)(state, key, callback);
    },
    async handleOpenPay(options) {
        this.resetState();
        this.setPaymentConfig(options);
        this.subscribeEvents();
        this.initializeAnalytics();
        state.isConfigured = true;
        EventsController/* EventsController */.E.sendEvent({
            type: 'track',
            event: 'PAY_MODAL_OPEN',
            properties: {
                exchanges: state.exchanges,
                configuration: {
                    network: state.paymentAsset.network,
                    asset: state.paymentAsset.asset,
                    recipient: state.recipient,
                    amount: state.amount
                }
            }
        });
        await ModalController/* ModalController */.W.open({
            view: 'Pay'
        });
    },
    resetState() {
        state.paymentAsset = {
            network: 'eip155:1',
            asset: '0x0',
            metadata: { name: '0x0', symbol: '0x0', decimals: 0 }
        };
        state.recipient = '0x0';
        state.amount = 0;
        state.isConfigured = false;
        state.error = null;
        state.isPaymentInProgress = false;
        state.isLoading = false;
        state.currentPayment = undefined;
    },
    setPaymentConfig(config) {
        if (!config.paymentAsset) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
        }
        try {
            state.paymentAsset = config.paymentAsset;
            state.recipient = config.recipient;
            state.amount = config.amount;
            state.openInNewTab = config.openInNewTab ?? true;
            state.redirectUrl = config.redirectUrl;
            state.payWithExchange = config.payWithExchange;
            state.error = null;
        }
        catch (error) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG, error.message);
        }
    },
    getPaymentAsset() {
        return state.paymentAsset;
    },
    getExchanges() {
        return state.exchanges;
    },
    async fetchExchanges() {
        try {
            state.isLoading = true;
            const response = await getExchanges({
                page: DEFAULT_PAGE,
                asset: formatCaip19Asset(state.paymentAsset.network, state.paymentAsset.asset),
                amount: state.amount.toString()
            });
            state.exchanges = response.exchanges.slice(0, 2);
        }
        catch (error) {
            SnackController/* SnackController */.P.showError(AppKitPayErrorMessages.UNABLE_TO_GET_EXCHANGES);
            throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES);
        }
        finally {
            state.isLoading = false;
        }
    },
    async getAvailableExchanges(params) {
        try {
            const asset = params?.asset && params?.network
                ? formatCaip19Asset(params.network, params.asset)
                : undefined;
            const response = await getExchanges({
                page: params?.page ?? DEFAULT_PAGE,
                asset,
                amount: params?.amount?.toString()
            });
            return response;
        }
        catch (error) {
            throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_EXCHANGES);
        }
    },
    async getPayUrl(exchangeId, params, headless = false) {
        try {
            const numericAmount = Number(params.amount);
            const response = await getPayUrl({
                exchangeId,
                asset: formatCaip19Asset(params.network, params.asset),
                amount: numericAmount.toString(),
                recipient: `${params.network}:${params.recipient}`
            });
            EventsController/* EventsController */.E.sendEvent({
                type: 'track',
                event: 'PAY_EXCHANGE_SELECTED',
                properties: {
                    exchange: {
                        id: exchangeId
                    },
                    configuration: {
                        network: params.network,
                        asset: params.asset,
                        recipient: params.recipient,
                        amount: numericAmount
                    },
                    currentPayment: {
                        type: 'exchange',
                        exchangeId
                    },
                    headless
                }
            });
            if (headless) {
                this.initiatePayment();
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: 'PAY_INITIATED',
                    properties: {
                        paymentId: state.paymentId || DEFAULT_PAYMENT_ID,
                        configuration: {
                            network: params.network,
                            asset: params.asset,
                            recipient: params.recipient,
                            amount: numericAmount
                        },
                        currentPayment: {
                            type: 'exchange',
                            exchangeId
                        }
                    }
                });
            }
            return response;
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('is not supported')) {
                throw new AppKitPayError(AppKitPayErrorCodes.ASSET_NOT_SUPPORTED);
            }
            throw new Error(error.message);
        }
    },
    async openPayUrl(openParams, params, headless = false) {
        try {
            const payUrl = await this.getPayUrl(openParams.exchangeId, params, headless);
            if (!payUrl) {
                throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL);
            }
            const shouldOpenInNewTab = openParams.openInNewTab ?? true;
            const target = shouldOpenInNewTab ? '_blank' : '_self';
            CoreHelperUtil/* CoreHelperUtil */.w.openHref(payUrl.url, target);
            return payUrl;
        }
        catch (error) {
            if (error instanceof AppKitPayError) {
                state.error = error.message;
            }
            else {
                state.error = AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR;
            }
            throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_PAY_URL);
        }
    },
    subscribeEvents() {
        if (state.isConfigured) {
            return;
        }
        ProviderUtil/* ProviderUtil */.A.subscribeProviders(async (_) => {
            const chainNamespace = ChainController/* ChainController */.W.state.activeChain;
            const provider = ProviderUtil/* ProviderUtil */.A.getProvider(chainNamespace);
            if (!provider) {
                return;
            }
            await this.handlePayment();
        });
        AccountController/* AccountController */.U.subscribeKey('caipAddress', async (caipAddress) => {
            if (!caipAddress) {
                return;
            }
            await this.handlePayment();
        });
    },
    async handlePayment() {
        state.currentPayment = {
            type: 'wallet',
            status: 'IN_PROGRESS'
        };
        const caipAddress = AccountController/* AccountController */.U.state.caipAddress;
        if (!caipAddress) {
            return;
        }
        const { chainId, address } = ParseUtil/* ParseUtil */.C.parseCaipAddress(caipAddress);
        const chainNamespace = ChainController/* ChainController */.W.state.activeChain;
        if (!address || !chainId || !chainNamespace) {
            return;
        }
        const provider = ProviderUtil/* ProviderUtil */.A.getProvider(chainNamespace);
        if (!provider) {
            return;
        }
        const caipNetwork = ChainController/* ChainController */.W.state.activeCaipNetwork;
        if (!caipNetwork) {
            return;
        }
        if (state.isPaymentInProgress) {
            return;
        }
        try {
            this.initiatePayment();
            const requestedCaipNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
            const approvedCaipNetworkIds = ChainController/* ChainController */.W.getAllApprovedCaipNetworkIds();
            await ensureCorrectNetwork({
                paymentAssetNetwork: state.paymentAsset.network,
                activeCaipNetwork: caipNetwork,
                approvedCaipNetworkIds,
                requestedCaipNetworks
            });
            await ModalController/* ModalController */.W.open({
                view: 'PayLoading'
            });
            switch (chainNamespace) {
                case ConstantsUtil/* ConstantsUtil */.o.CHAIN.EVM:
                    if (state.paymentAsset.asset === 'native') {
                        state.currentPayment.result = await processEvmNativePayment(state.paymentAsset, chainNamespace, {
                            recipient: state.recipient,
                            amount: state.amount,
                            fromAddress: address
                        });
                    }
                    if (state.paymentAsset.asset.startsWith('0x')) {
                        state.currentPayment.result = await processEvmErc20Payment(state.paymentAsset, {
                            recipient: state.recipient,
                            amount: state.amount,
                            fromAddress: address
                        });
                    }
                    state.currentPayment.status = 'SUCCESS';
                    break;
                default:
                    throw new AppKitPayError(AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE);
            }
        }
        catch (error) {
            if (error instanceof AppKitPayError) {
                state.error = error.message;
            }
            else {
                state.error = AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR;
            }
            state.currentPayment.status = 'FAILED';
            SnackController/* SnackController */.P.showError(state.error);
        }
        finally {
            state.isPaymentInProgress = false;
        }
    },
    getExchangeById(exchangeId) {
        return state.exchanges.find(exchange => exchange.id === exchangeId);
    },
    validatePayConfig(config) {
        const { paymentAsset, recipient, amount } = config;
        if (!paymentAsset) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
        }
        if (!recipient) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_RECIPIENT);
        }
        if (!paymentAsset.asset) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_ASSET);
        }
        if (amount === undefined || amount === null || amount <= 0) {
            throw new AppKitPayError(AppKitPayErrorCodes.INVALID_AMOUNT);
        }
    },
    handlePayWithWallet() {
        const caipAddress = AccountController/* AccountController */.U.state.caipAddress;
        if (!caipAddress) {
            RouterController/* RouterController */.I.push('Connect');
            return;
        }
        const { chainId, address } = ParseUtil/* ParseUtil */.C.parseCaipAddress(caipAddress);
        const chainNamespace = ChainController/* ChainController */.W.state.activeChain;
        if (!address || !chainId || !chainNamespace) {
            RouterController/* RouterController */.I.push('Connect');
            return;
        }
        this.handlePayment();
    },
    async handlePayWithExchange(exchangeId) {
        try {
            state.currentPayment = {
                type: 'exchange',
                exchangeId
            };
            const { network, asset } = state.paymentAsset;
            const payUrlParams = {
                network,
                asset,
                amount: state.amount,
                recipient: state.recipient
            };
            const payUrl = await this.getPayUrl(exchangeId, payUrlParams);
            if (!payUrl) {
                throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_INITIATE_PAYMENT);
            }
            state.currentPayment.sessionId = payUrl.sessionId;
            state.currentPayment.status = 'IN_PROGRESS';
            state.currentPayment.exchangeId = exchangeId;
            this.initiatePayment();
            return {
                url: payUrl.url,
                openInNewTab: state.openInNewTab
            };
        }
        catch (error) {
            if (error instanceof AppKitPayError) {
                state.error = error.message;
            }
            else {
                state.error = AppKitPayErrorMessages.GENERIC_PAYMENT_ERROR;
            }
            state.isPaymentInProgress = false;
            SnackController/* SnackController */.P.showError(state.error);
            return null;
        }
    },
    async getBuyStatus(exchangeId, sessionId) {
        try {
            const status = await getBuyStatus({ sessionId, exchangeId });
            if (status.status === 'SUCCESS' || status.status === 'FAILED') {
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: status.status === 'SUCCESS' ? 'PAY_SUCCESS' : 'PAY_ERROR',
                    properties: {
                        paymentId: state.paymentId || DEFAULT_PAYMENT_ID,
                        configuration: {
                            network: state.paymentAsset.network,
                            asset: state.paymentAsset.asset,
                            recipient: state.recipient,
                            amount: state.amount
                        },
                        currentPayment: {
                            type: 'exchange',
                            exchangeId: state.currentPayment?.exchangeId,
                            sessionId: state.currentPayment?.sessionId,
                            result: status.txHash
                        }
                    }
                });
            }
            return status;
        }
        catch (error) {
            throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS);
        }
    },
    async updateBuyStatus(exchangeId, sessionId) {
        try {
            const status = await this.getBuyStatus(exchangeId, sessionId);
            if (state.currentPayment) {
                state.currentPayment.status = status.status;
                state.currentPayment.result = status.txHash;
            }
            if (status.status === 'SUCCESS' || status.status === 'FAILED') {
                state.isPaymentInProgress = false;
            }
        }
        catch (error) {
            throw new AppKitPayError(AppKitPayErrorCodes.UNABLE_TO_GET_BUY_STATUS);
        }
    },
    initiatePayment() {
        state.isPaymentInProgress = true;
        state.paymentId = crypto.randomUUID();
    },
    initializeAnalytics() {
        if (state.analyticsSet) {
            return;
        }
        state.analyticsSet = true;
        this.subscribeKey('isPaymentInProgress', _ => {
            if (state.currentPayment?.status && state.currentPayment.status !== 'UNKNOWN') {
                const eventType = {
                    IN_PROGRESS: 'PAY_INITIATED',
                    SUCCESS: 'PAY_SUCCESS',
                    FAILED: 'PAY_ERROR'
                }[state.currentPayment.status];
                EventsController/* EventsController */.E.sendEvent({
                    type: 'track',
                    event: eventType,
                    properties: {
                        paymentId: state.paymentId || DEFAULT_PAYMENT_ID,
                        configuration: {
                            network: state.paymentAsset.network,
                            asset: state.paymentAsset.asset,
                            recipient: state.recipient,
                            amount: state.amount
                        },
                        currentPayment: {
                            type: state.currentPayment.type,
                            exchangeId: state.currentPayment.exchangeId,
                            sessionId: state.currentPayment.sessionId,
                            result: state.currentPayment.result
                        }
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=PayController.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/ui/w3m-pay-view/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/ui/w3m-pay-view/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















let W3mPayView = class W3mPayView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.unsubscribe = [];
        this.amount = '';
        this.tokenSymbol = '';
        this.networkName = '';
        this.exchanges = PayController_PayController.state.exchanges;
        this.isLoading = PayController_PayController.state.isLoading;
        this.loadingExchangeId = null;
        this.connectedWalletInfo = AccountController/* AccountController */.U.state.connectedWalletInfo;
        this.initializePaymentDetails();
        this.unsubscribe.push(PayController_PayController.subscribeKey('exchanges', val => (this.exchanges = val)));
        this.unsubscribe.push(PayController_PayController.subscribeKey('isLoading', val => (this.isLoading = val)));
        this.unsubscribe.push(AccountController/* AccountController */.U.subscribe(newState => (this.connectedWalletInfo = newState.connectedWalletInfo)));
        PayController_PayController.fetchExchanges();
    }
    get isWalletConnected() {
        return AccountController/* AccountController */.U.state.status === 'connected';
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${['0', 'l', 'l', 'l']} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            ${this.renderPayWithWallet()} ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
    }
    initializePaymentDetails() {
        const paymentAsset = PayController_PayController.getPaymentAsset();
        this.networkName = paymentAsset.network;
        this.tokenSymbol = paymentAsset.metadata.symbol;
        this.amount = PayController_PayController.state.amount.toString();
    }
    renderPayWithWallet() {
        if (!isPayWithWalletSupported(this.networkName)) {
            return (0,lit/* html */.qy) ``;
        }
        return (0,lit/* html */.qy) `<wui-flex flexDirection="column" gap="s">
        ${this.isWalletConnected ? this.renderConnectedView() : this.renderDisconnectedView()}
      </wui-flex>
      <wui-separator text="or"></wui-separator>`;
    }
    renderPaymentHeader() {
        let displayNetworkName = this.networkName;
        if (this.networkName) {
            const allNetworks = ChainController/* ChainController */.W.getAllRequestedCaipNetworks();
            const targetNetwork = allNetworks.find(net => net.caipNetworkId === this.networkName);
            if (targetNetwork) {
                displayNetworkName = targetNetwork.name;
            }
        }
        return (0,lit/* html */.qy) `
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount || '0.0000'}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol || 'Unknown Asset'}
            </wui-text>
            ${displayNetworkName
            ? (0,lit/* html */.qy) `
                  <wui-text variant="small-500" color="fg-200"> on ${displayNetworkName} </wui-text>
                `
            : ''}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
    }
    renderConnectedView() {
        const walletName = this.connectedWalletInfo?.name || 'connected wallet';
        return (0,lit/* html */.qy) `
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${true}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${(0,if_defined/* ifDefined */.J)(this.connectedWalletInfo?.icon)}
            name=${(0,if_defined/* ifDefined */.J)(this.connectedWalletInfo?.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${walletName}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${false}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `;
    }
    renderDisconnectedView() {
        return (0,lit/* html */.qy) `<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${true}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`;
    }
    renderExchangeOptions() {
        if (this.isLoading) {
            return (0,lit/* html */.qy) `<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>`;
        }
        if (this.exchanges.length === 0) {
            return (0,lit/* html */.qy) `<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>`;
        }
        return this.exchanges.map(exchange => (0,lit/* html */.qy) `
        <wui-list-item
          @click=${() => this.onExchangePayment(exchange.id)}
          data-testid="exchange-option-${exchange.id}"
          ?chevron=${true}
          ?disabled=${this.loadingExchangeId !== null}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId === exchange.id
            ? (0,lit/* html */.qy) `<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>`
            : (0,lit/* html */.qy) `<wui-wallet-image
                  size="sm"
                  imageSrc=${(0,if_defined/* ifDefined */.J)(exchange.imageUrl)}
                  name=${exchange.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${exchange.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `);
    }
    onWalletPayment() {
        PayController_PayController.handlePayWithWallet();
    }
    async onExchangePayment(exchangeId) {
        try {
            this.loadingExchangeId = exchangeId;
            const result = await PayController_PayController.handlePayWithExchange(exchangeId);
            if (result) {
                await ModalController/* ModalController */.W.open({
                    view: 'PayLoading'
                });
                CoreHelperUtil/* CoreHelperUtil */.w.openHref(result.url, result.openInNewTab ? '_blank' : '_self');
            }
        }
        catch (error) {
            console.error('Failed to pay with exchange', error);
            SnackController/* SnackController */.P.showError('Failed to pay with exchange');
        }
        finally {
            this.loadingExchangeId = null;
        }
    }
    async onDisconnect(e) {
        e.stopPropagation();
        try {
            await ConnectionController/* ConnectionController */.x.disconnect();
            ModalController/* ModalController */.W.close();
        }
        catch {
            console.error('Failed to disconnect');
            SnackController/* SnackController */.P.showError('Failed to disconnect');
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
};
W3mPayView.styles = styles;
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "amount", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "tokenSymbol", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "networkName", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "exchanges", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "isLoading", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "loadingExchangeId", void 0);
__decorate([
    (0,decorators/* state */.wk)()
], W3mPayView.prototype, "connectedWalletInfo", void 0);
W3mPayView = __decorate([
    (0,esm_exports/* customElement */.EM)('w3m-pay-view')
], W3mPayView);

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ThemeController.js
var ThemeController = __webpack_require__(68996);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-thumbnail.js + 2 modules
var wui_loading_thumbnail = __webpack_require__(92983);
;// ./node_modules/@reown/appkit-pay/dist/esm/src/ui/w3m-pay-loading-view/styles.js

/* harmony default export */ const w3m_pay_loading_view_styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/ui/w3m-pay-loading-view/index.js
var w3m_pay_loading_view_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










const EXCHANGE_STATUS_CHECK_INTERVAL = 4000;
let W3mPayLoadingView = class W3mPayLoadingView extends lit/* LitElement */.WF {
    constructor() {
        super();
        this.loadingMessage = '';
        this.subMessage = '';
        this.paymentState = 'in-progress';
        this.paymentState = PayController_PayController.state.isPaymentInProgress ? 'in-progress' : 'completed';
        this.updateMessages();
        this.setupSubscription();
        this.setupExchangeSubscription();
    }
    disconnectedCallback() {
        clearInterval(this.exchangeSubscription);
    }
    render() {
        return (0,lit/* html */.qy) `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
    }
    updateMessages() {
        switch (this.paymentState) {
            case 'completed':
                this.loadingMessage = 'Payment completed';
                this.subMessage = 'Your transaction has been successfully processed';
                break;
            case 'error':
                this.loadingMessage = 'Payment failed';
                this.subMessage = 'There was an error processing your transaction';
                break;
            case 'in-progress':
            default:
                if (PayController_PayController.state.currentPayment?.type === 'exchange') {
                    this.loadingMessage = 'Payment initiated';
                    this.subMessage = `Please complete the payment on the exchange`;
                }
                else {
                    this.loadingMessage = 'Awaiting payment confirmation';
                    this.subMessage = 'Please confirm the payment transaction in your wallet';
                }
                break;
        }
    }
    getStateIcon() {
        switch (this.paymentState) {
            case 'completed':
                return this.successTemplate();
            case 'error':
                return this.errorTemplate();
            case 'in-progress':
            default:
                return this.loaderTemplate();
        }
    }
    setupExchangeSubscription() {
        if (PayController_PayController.state.currentPayment?.type !== 'exchange') {
            return;
        }
        this.exchangeSubscription = setInterval(async () => {
            const exchangeId = PayController_PayController.state.currentPayment?.exchangeId;
            const sessionId = PayController_PayController.state.currentPayment?.sessionId;
            if (exchangeId && sessionId) {
                await PayController_PayController.updateBuyStatus(exchangeId, sessionId);
                if (PayController_PayController.state.currentPayment?.status === 'SUCCESS') {
                    clearInterval(this.exchangeSubscription);
                }
            }
        }, EXCHANGE_STATUS_CHECK_INTERVAL);
    }
    setupSubscription() {
        PayController_PayController.subscribeKey('isPaymentInProgress', (inProgress) => {
            if (!inProgress && this.paymentState === 'in-progress') {
                if (PayController_PayController.state.error || !PayController_PayController.state.currentPayment?.result) {
                    this.paymentState = 'error';
                }
                else {
                    this.paymentState = 'completed';
                }
                this.updateMessages();
                setTimeout(() => {
                    if (ConnectionController/* ConnectionController */.x.state.status === 'disconnected') {
                        return;
                    }
                    ModalController/* ModalController */.W.close();
                }, 3000);
            }
        });
        PayController_PayController.subscribeKey('error', (error) => {
            if (error && this.paymentState === 'in-progress') {
                this.paymentState = 'error';
                this.updateMessages();
            }
        });
    }
    loaderTemplate() {
        const borderRadiusMaster = ThemeController/* ThemeController */.W.state.themeVariables['--w3m-border-radius-master'];
        const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace('px', ''), 10) : 4;
        return (0,lit/* html */.qy) `<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
    }
    successTemplate() {
        return (0,lit/* html */.qy) `<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`;
    }
    errorTemplate() {
        return (0,lit/* html */.qy) `<wui-icon size="xl" color="error-100" name="close"></wui-icon>`;
    }
};
W3mPayLoadingView.styles = w3m_pay_loading_view_styles;
w3m_pay_loading_view_decorate([
    (0,decorators/* state */.wk)()
], W3mPayLoadingView.prototype, "loadingMessage", void 0);
w3m_pay_loading_view_decorate([
    (0,decorators/* state */.wk)()
], W3mPayLoadingView.prototype, "subMessage", void 0);
w3m_pay_loading_view_decorate([
    (0,decorators/* state */.wk)()
], W3mPayLoadingView.prototype, "paymentState", void 0);
W3mPayLoadingView = w3m_pay_loading_view_decorate([
    (0,esm_exports/* customElement */.EM)('w3m-pay-loading-view')
], W3mPayLoadingView);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/client.js

async function openPay(options) {
    return PayController_PayController.handleOpenPay(options);
}
function getAvailableExchanges(params) {
    return PayController.getAvailableExchanges(params);
}
function client_getPayUrl(exchangeId, params) {
    return PayController.getPayUrl(exchangeId, params, true);
}
function openPayUrl(exchangeId, params, openInNewTab) {
    return PayController.openPayUrl({ exchangeId, openInNewTab }, params, true);
}
function client_getExchanges() {
    return PayController_PayController.getExchanges();
}
function getPayResult() {
    return PayController_PayController.state.currentPayment?.result;
}
function getPayError() {
    return PayController_PayController.state.error;
}
function getIsPaymentInProgress() {
    return PayController_PayController.state.isPaymentInProgress;
}
function subscribeStateKey(key, callback) {
    return PayController.subscribeKey(key, callback);
}
//# sourceMappingURL=client.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/src/types/assets.js
const baseETH = {
    network: 'eip155:8453',
    asset: 'native',
    metadata: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }
};
const baseUSDC = {
    network: 'eip155:8453',
    asset: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
const baseSepoliaETH = {
    network: 'eip155:84532',
    asset: 'native',
    metadata: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }
};
//# sourceMappingURL=assets.js.map
;// ./node_modules/@reown/appkit-pay/dist/esm/exports/index.js




//# sourceMappingURL=index.js.map

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-button/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-icon-button/index.js
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
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-icon-button.js

//# sourceMappingURL=wui-icon-button.js.map

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/styles.js

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
;// ./node_modules/@reown/appkit-ui/dist/esm/src/composites/wui-wallet-image/index.js
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

/***/ }),

/***/ 92983:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: WuiLoadingThumbnail

// EXTERNAL MODULE: ./node_modules/lit/index.js + 1 modules
var lit = __webpack_require__(12618);
// EXTERNAL MODULE: ./node_modules/lit/decorators.js
var decorators = __webpack_require__(25707);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js
var ThemeUtil = __webpack_require__(26109);
// EXTERNAL MODULE: ./node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js
var WebComponentsUtil = __webpack_require__(43494);
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-thumbnail/styles.js

/* harmony default export */ const styles = ((0,lit/* css */.AH) `
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`);
//# sourceMappingURL=styles.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/src/components/wui-loading-thumbnail/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let WuiLoadingThumbnail = class WuiLoadingThumbnail extends lit/* LitElement */.WF {
    constructor() {
        super(...arguments);
        this.radius = 36;
    }
    render() {
        return this.svgLoaderTemplate();
    }
    svgLoaderTemplate() {
        const radius = this.radius > 50 ? 50 : this.radius;
        const standardValue = 36;
        const radiusFactor = standardValue - radius;
        const dashArrayStart = 116 + radiusFactor;
        const dashArrayEnd = 245 + radiusFactor;
        const dashOffset = 360 + radiusFactor * 1.75;
        return (0,lit/* html */.qy) `
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${radius}
          stroke-dasharray="${dashArrayStart} ${dashArrayEnd}"
          stroke-dashoffset=${dashOffset}
        />
      </svg>
    `;
    }
};
WuiLoadingThumbnail.styles = [ThemeUtil/* resetStyles */.W5, styles];
__decorate([
    (0,decorators/* property */.MZ)({ type: Number })
], WuiLoadingThumbnail.prototype, "radius", void 0);
WuiLoadingThumbnail = __decorate([
    (0,WebComponentsUtil/* customElement */.E)('wui-loading-thumbnail')
], WuiLoadingThumbnail);

//# sourceMappingURL=index.js.map
;// ./node_modules/@reown/appkit-ui/dist/esm/exports/wui-loading-thumbnail.js

//# sourceMappingURL=wui-loading-thumbnail.js.map

/***/ }),

/***/ 93373:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_loading_spinner_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20880);

//# sourceMappingURL=wui-loading-spinner.js.map

/***/ }),

/***/ 93516:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _src_components_wui_image_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36887);

//# sourceMappingURL=wui-image.js.map

/***/ })

}]);
//# sourceMappingURL=6056.bundle.js.map