/*! For license information please see 6311.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkonchain_dapp_example=self.webpackChunkonchain_dapp_example||[]).push([[6311],{99598(t,e,i){i.d(e,{I:()=>l});var o=i(68126),n=i(4707),r=i(35940);const s=(0,o.BX)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),a={state:s,subscribe:t=>(0,o.B1)(s,()=>t(s)),subscribeKey:(t,e)=>(0,n.u$)(s,t,e),showTooltip({message:t,triggerRect:e,variant:i}){s.open=!0,s.message=t,s.triggerRect=e,s.variant=i},hide(){s.open=!1,s.message="",s.triggerRect={width:0,height:0,top:0,left:0}}},l=(0,r.X)(a)},36311(t,e,i){i.r(e),i.d(e,{W3mSwapPreviewView:()=>D,W3mSwapSelectTokenView:()=>B,W3mSwapView:()=>N});var o=i(12618),n=i(25707),r=i(23768),s=i(6056),a=i(78508),l=i(80171),c=i(26742),u=i(96396),p=i(90184),d=i(74496),h=i(70148),g=(i(58461),i(60310),i(51636),i(77616),i(45090),i(10152)),w=i(17187);i(78509),i(56090);const m=h.AH`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:t})=>t[3]};
    border-radius: ${({borderRadius:t})=>t[3]};
    cursor: pointer;
  }

  .details-content-container {
    padding: ${({spacing:t})=>t[2]};
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:t})=>t[3]};
    padding-left: ${({spacing:t})=>t[3]};
    padding-right: ${({spacing:t})=>t[2]};
    border-radius: calc(
      ${({borderRadius:t})=>t[1]} + ${({borderRadius:t})=>t[1]}
    );
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: ${({spacing:t})=>t[2]};
  }
`;var k=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};const b=w.oU.CONVERT_SLIPPAGE_TOLERANCE;let f=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.networkName=s.W.state.activeCaipNetwork?.name,this.detailsOpen=!1,this.sourceToken=l.GN.state.sourceToken,this.toToken=l.GN.state.toToken,this.toTokenAmount=l.GN.state.toTokenAmount,this.sourceTokenPriceInUSD=l.GN.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=l.GN.state.toTokenPriceInUSD,this.priceImpact=l.GN.state.priceImpact,this.maxSlippage=l.GN.state.maxSlippage,this.networkTokenSymbol=l.GN.state.networkTokenSymbol,this.inputError=l.GN.state.inputError,this.unsubscribe.push(l.GN.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.priceImpact=t.priceImpact,this.maxSlippage=t.maxSlippage,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError}))}render(){const t=this.toTokenAmount&&this.maxSlippage?r.S.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;const e=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return o.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="01" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","2","0","2"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="2">
                <wui-text variant="sm-regular" color="primary">
                  1 ${this.sourceToken.symbol} =
                  ${r.S.formatNumberToLocalString(e,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="sm-regular" color="secondary">
                  $${r.S.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?o.qy`
                <wui-flex flexDirection="column" gap="2" class="details-content-container">
                  ${this.priceImpact?o.qy` <wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${r.S.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?o.qy`<wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${"Max slippage sets the minimum amount you must receive for the transaction to proceed. "+(t?`Transaction will be reversed if you receive less than ${r.S.formatNumberToLocalString(t,6)} ${this.toToken.symbol} due to price changes.`:"")}
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${r.S.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${b}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="2">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="2">
                        <wui-text class="details-row-title" variant="sm-regular" color="secondary">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="sm-regular" color="secondary">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};f.styles=[m],k([(0,n.wk)()],f.prototype,"networkName",void 0),k([(0,n.MZ)()],f.prototype,"detailsOpen",void 0),k([(0,n.wk)()],f.prototype,"sourceToken",void 0),k([(0,n.wk)()],f.prototype,"toToken",void 0),k([(0,n.wk)()],f.prototype,"toTokenAmount",void 0),k([(0,n.wk)()],f.prototype,"sourceTokenPriceInUSD",void 0),k([(0,n.wk)()],f.prototype,"toTokenPriceInUSD",void 0),k([(0,n.wk)()],f.prototype,"priceImpact",void 0),k([(0,n.wk)()],f.prototype,"maxSlippage",void 0),k([(0,n.wk)()],f.prototype,"networkTokenSymbol",void 0),k([(0,n.wk)()],f.prototype,"inputError",void 0),f=k([(0,h.EM)("w3m-swap-details")],f),i(35090);const x=h.AH`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({borderRadius:t})=>t[5]};
    padding: ${({spacing:t})=>t[5]};
    padding-right: ${({spacing:t})=>t[3]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    box-shadow: inset 0px 0px 0px 1px ${({tokens:t})=>t.theme.foregroundPrimary};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill ${({durations:t})=>t.md}
      ${({easings:t})=>t["ease-out-power-1"]};
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: ${({tokens:t})=>t.core.glass010};
  }

  :host wui-flex .input_mask__background {
    fill: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var y=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let v=class extends o.WF{constructor(){super(...arguments),this.target="sourceToken"}render(){return o.qy`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="1"
        >
          <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return o.qy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
      </wui-flex>
    `}};v.styles=[x],y([(0,n.MZ)()],v.prototype,"target",void 0),v=y([(0,h.EM)("w3m-swap-input-skeleton")],v);const T={numericInputKeyDown(t,e,i){const o=t.metaKey||t.ctrlKey,n=t.key,r=n.toLocaleLowerCase(),s=","===n,a="."===n,l=n>="0"&&n<="9";!o&&("a"===r||"c"===r||"v"===r||"x"===r)&&t.preventDefault(),"0"!==e||s||a||"0"!==n||t.preventDefault(),"0"===e&&l&&(i(n),t.preventDefault()),(s||a)&&(e||(i("0."),t.preventDefault()),(e?.includes(".")||e?.includes(","))&&t.preventDefault()),l||["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"].includes(n)||a||s||t.preventDefault()}};i(72510);const $=h.AH`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({borderRadius:t})=>t[5]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    padding: ${({spacing:t})=>t[5]};
    padding-right: ${({spacing:t})=>t[3]};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px ${({tokens:t})=>t.theme.foregroundPrimary};
    position: relative;
    transition: box-shadow ${({easings:t})=>t["ease-out-power-1"]}
      ${({durations:t})=>t.lg};
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:t})=>t.core.glass010};
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
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

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    color: ${({tokens:t})=>t.theme.textPrimary};
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${({tokens:t})=>t.core.glass010};
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var S=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let A=class extends o.WF{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null,this.autoFocus=!1}firstUpdated(){this.autoFocus&&requestAnimationFrame(()=>{const t=this.shadowRoot?.querySelector("input");t?.focus()})}render(){const t=this.marketValue||"0",e=r.S.bigNumber(t).gt("0");return o.qy`
      <wui-flex
        class="${this.focused?"focus":""}"
        justifyContent="space-between"
        alignItems="center"
      >
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            value=${this.value||""}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
            pattern="[0-9,.]*"
          />
          <wui-text class="market-value" variant="sm-regular" color="secondary">
            ${e?`$${r.S.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(t){return T.numericInputKeyDown(t,this.value,t=>this.onSetAmount?.(this.target,t))}dispatchInputChangeEvent(t){if(!this.onSetAmount)return;const e=t.target.value.replace(/[^0-9.]/gu,"");","===e||"."===e?this.onSetAmount(this.target,"0."):e.endsWith(",")?this.onSetAmount(this.target,e.replace(",",".")):this.onSetAmount(this.target,e)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?o.qy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="1"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:o.qy` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="neutral-secondary"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){const t=r.S.multiply(this.balance,this.price),e=!!t&&t?.gt(5e-5);return o.qy`
      ${e?o.qy`<wui-text variant="sm-regular" color="secondary">
            ${r.S.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${"sourceToken"===this.target?this.tokenActionButtonTemplate(e):null}
    `}tokenActionButtonTemplate(t){return t?o.qy` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-primary" variant="sm-medium">Max</wui-text>
      </button>`:o.qy` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-primary" variant="sm-medium">Buy</wui-text>
    </button>`}onFocusChange(t){this.focused=t}onSelectToken(){p.E.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),a.I.push("SwapSelectToken",{target:this.target})}onBuyToken(){a.I.push("OnRampProviders")}};A.styles=[$],S([(0,n.MZ)()],A.prototype,"focused",void 0),S([(0,n.MZ)()],A.prototype,"balance",void 0),S([(0,n.MZ)()],A.prototype,"value",void 0),S([(0,n.MZ)()],A.prototype,"price",void 0),S([(0,n.MZ)()],A.prototype,"marketValue",void 0),S([(0,n.MZ)()],A.prototype,"disabled",void 0),S([(0,n.MZ)()],A.prototype,"target",void 0),S([(0,n.MZ)()],A.prototype,"token",void 0),S([(0,n.MZ)()],A.prototype,"onSetAmount",void 0),S([(0,n.MZ)()],A.prototype,"onSetMaxValue",void 0),S([(0,n.MZ)({type:Boolean})],A.prototype,"autoFocus",void 0),A=S([(0,h.EM)("w3m-swap-input")],A);const I=h.AH`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  .action-button:disabled {
    border-color: 1px solid ${({tokens:t})=>t.core.glass010};
  }

  .swap-inputs-container {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:t})=>t[10]} !important;
    border: 4px solid ${({tokens:t})=>t.theme.backgroundPrimary};
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: ${({spacing:t})=>t[2]};
    border-radius: ${({borderRadius:t})=>t[4]};
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    padding: ${({spacing:t})=>t[2]};
  }

  .details-container > wui-flex {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:t})=>t[3]};
    border-radius: ${({borderRadius:t})=>t[3]};
    transition: background ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({spacing:t})=>t[2]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[5]};
    border-radius: ${({borderRadius:t})=>t[3]};
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var P=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let N=class extends o.WF{subscribe({resetSwapState:t,initializeSwapState:e}){return()=>{s.W.subscribeKey("activeCaipNetwork",i=>this.onCaipNetworkChange({newCaipNetwork:i,resetSwapState:t,initializeSwapState:e})),s.W.subscribeChainProp("accountState",i=>{this.onCaipAddressChange({newCaipAddress:i?.caipAddress,resetSwapState:t,initializeSwapState:e})})}}constructor(){super(),this.unsubscribe=[],this.initialParams=a.I.state.data?.swap,this.detailsOpen=!1,this.caipAddress=s.W.getAccountData()?.caipAddress,this.caipNetworkId=s.W.state.activeCaipNetwork?.caipNetworkId,this.initialized=l.GN.state.initialized,this.loadingQuote=l.GN.state.loadingQuote,this.loadingPrices=l.GN.state.loadingPrices,this.loadingTransaction=l.GN.state.loadingTransaction,this.sourceToken=l.GN.state.sourceToken,this.sourceTokenAmount=l.GN.state.sourceTokenAmount,this.sourceTokenPriceInUSD=l.GN.state.sourceTokenPriceInUSD,this.toToken=l.GN.state.toToken,this.toTokenAmount=l.GN.state.toTokenAmount,this.toTokenPriceInUSD=l.GN.state.toTokenPriceInUSD,this.inputError=l.GN.state.inputError,this.fetchError=l.GN.state.fetchError,this.lastTokenPriceUpdate=0,this.minTokenPriceUpdateInterval=1e4,this.visibilityChangeHandler=()=>{document?.hidden?(clearInterval(this.interval),this.interval=void 0):this.startTokenPriceInterval()},this.startTokenPriceInterval=()=>{this.interval&&Date.now()-this.lastTokenPriceUpdate<this.minTokenPriceUpdateInterval||(this.lastTokenPriceUpdate&&Date.now()-this.lastTokenPriceUpdate>this.minTokenPriceUpdateInterval&&this.fetchTokensAndValues(),clearInterval(this.interval),this.interval=setInterval(()=>{this.fetchTokensAndValues()},this.minTokenPriceUpdateInterval))},this.watchTokensAndValues=()=>{this.sourceToken&&this.toToken&&(this.subscribeToVisibilityChange(),this.startTokenPriceInterval())},this.onDebouncedGetSwapCalldata=c.w.debounce(async()=>{await l.GN.swapTokens()},200),this.subscribe({resetSwapState:!0,initializeSwapState:!1})(),this.unsubscribe.push(this.subscribe({resetSwapState:!1,initializeSwapState:!0}),u.W.subscribeKey("open",t=>{t||l.GN.resetState()}),a.I.subscribeKey("view",t=>{t.includes("Swap")||l.GN.resetValues()}),l.GN.subscribe(t=>{this.initialized=t.initialized,this.loadingQuote=t.loadingQuote,this.loadingPrices=t.loadingPrices,this.loadingTransaction=t.loadingTransaction,this.sourceToken=t.sourceToken,this.sourceTokenAmount=t.sourceTokenAmount,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError,this.fetchError=t.fetchError,t.sourceToken&&t.toToken&&this.watchTokensAndValues()}))}async firstUpdated(){l.GN.initializeState(),this.watchTokensAndValues(),await this.handleSwapParameters()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval),document?.removeEventListener("visibilitychange",this.visibilityChangeHandler)}render(){return o.qy`
      <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="3">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}subscribeToVisibilityChange(){document?.removeEventListener("visibilitychange",this.visibilityChangeHandler),document?.addEventListener("visibilitychange",this.visibilityChangeHandler)}fetchTokensAndValues(){l.GN.getNetworkTokenPrice(),l.GN.getMyTokensWithBalance(),l.GN.swapTokens(),this.lastTokenPriceUpdate=Date.now()}templateSwap(){return o.qy`
      <wui-flex flexDirection="column" gap="3">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){const t=!this.sourceTokenAmount||"0"===this.sourceTokenAmount;return this.fetchError?"Swap":this.sourceToken&&this.toToken?t?"Enter amount":this.inputError?this.inputError:"Review swap":"Select token"}templateReplaceTokensButton(){return o.qy`
      <wui-flex class="replace-tokens-button-container">
        <wui-icon-box
          @click=${this.onSwitchTokens.bind(this)}
          icon="recycleHorizontal"
          size="md"
          variant="default"
        ></wui-icon-box>
      </wui-flex>
    `}templateLoading(){return o.qy`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(t,e){const i=l.GN.state.myTokensWithBalance?.find(t=>t?.address===e?.address),n="toToken"===t?this.toTokenAmount:this.sourceTokenAmount,s="toToken"===t?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,a=r.S.parseLocalStringToNumber(n)*s;return o.qy`<w3m-swap-input
      .value=${"toToken"===t?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${"toToken"===t}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${t}
      .token=${e}
      .balance=${i?.quantity?.numeric}
      .price=${i?.price}
      .marketValue=${a}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
      ?autoFocus=${"sourceToken"===t}
    ></w3m-swap-input>`}onSetMaxValue(t,e){const i=r.S.bigNumber(e||"0");if(!i.gt(0))return void this.handleChangeAmount(t,"0");const o="sourceToken"===t?this.sourceToken:this.toToken,n=o?.decimals??18,{networkAddress:s}=l.GN.getParams(),a=l.GN.state.gasFee;if("sourceToken"===t&&o?.address===s&&a&&"0"!==a){const e=150000n*BigInt(a),o=r.S.bigNumber(e.toString()).div(r.S.bigNumber(10).pow(n)),s=i.minus(o);this.handleChangeAmount(t,s.gt(0)?s.toFixed(n,0):"0")}else this.handleChangeAmount(t,i.toFixed(n,0))}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?o.qy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}handleChangeAmount(t,e){l.GN.clearError(),"sourceToken"===t?l.GN.setSourceTokenAmount(e):l.GN.setToTokenAmount(e),this.onDebouncedGetSwapCalldata()}templateActionButton(){const t=!this.toToken||!this.sourceToken,e=!this.sourceTokenAmount||"0"===this.sourceTokenAmount,i=this.loadingQuote||this.loadingPrices||this.loadingTransaction,n=i||t||e||this.inputError;return o.qy` <wui-flex gap="2">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant="accent-primary"
        ?loading=${Boolean(i)}
        ?disabled=${Boolean(n)}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}async onSwitchTokens(){await l.GN.switchTokens()}async onSwapPreview(){this.fetchError&&await l.GN.swapTokens(),p.E.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:this.caipNetworkId||"",swapFromToken:this.sourceToken?.symbol||"",swapToToken:this.toToken?.symbol||"",swapFromAmount:this.sourceTokenAmount||"",swapToAmount:this.toTokenAmount||"",isSmartAccount:(0,d.lj)(s.W.state.activeChain)===g.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),a.I.push("SwapPreview")}async handleSwapParameters(){if(this.initialParams){if(!l.GN.state.initialized){const t=new Promise(t=>{const e=l.GN.subscribeKey("initialized",i=>{i&&(e?.(),t())})});await t}await this.setSwapParameters(this.initialParams)}}async setSwapParameters({amount:t,fromToken:e,toToken:i}){if(!l.GN.state.tokens||!l.GN.state.myTokensWithBalance){const t=new Promise(t=>{const e=l.GN.subscribeKey("myTokensWithBalance",i=>{i&&i.length>0&&(e?.(),t())});setTimeout(()=>{e?.(),t()},5e3)});await t}const o=[...l.GN.state.tokens||[],...l.GN.state.myTokensWithBalance||[]];if(e){const t=o.find(t=>t.symbol.toLowerCase()===e.toLowerCase());t&&l.GN.setSourceToken(t)}if(i){const t=o.find(t=>t.symbol.toLowerCase()===i.toLowerCase());t&&l.GN.setToToken(t)}t&&!isNaN(Number(t))&&l.GN.setSourceTokenAmount(t)}onCaipAddressChange({newCaipAddress:t,resetSwapState:e,initializeSwapState:i}){this.caipAddress!==t&&(this.caipAddress=t,e&&l.GN.resetState(),i&&l.GN.initializeState())}onCaipNetworkChange({newCaipNetwork:t,resetSwapState:e,initializeSwapState:i}){this.caipNetworkId!==t?.caipNetworkId&&(this.caipNetworkId=t?.caipNetworkId,e&&l.GN.resetState(),i&&l.GN.initializeState())}};N.styles=I,P([(0,n.MZ)({type:Object})],N.prototype,"initialParams",void 0),P([(0,n.wk)()],N.prototype,"interval",void 0),P([(0,n.wk)()],N.prototype,"detailsOpen",void 0),P([(0,n.wk)()],N.prototype,"caipAddress",void 0),P([(0,n.wk)()],N.prototype,"caipNetworkId",void 0),P([(0,n.wk)()],N.prototype,"initialized",void 0),P([(0,n.wk)()],N.prototype,"loadingQuote",void 0),P([(0,n.wk)()],N.prototype,"loadingPrices",void 0),P([(0,n.wk)()],N.prototype,"loadingTransaction",void 0),P([(0,n.wk)()],N.prototype,"sourceToken",void 0),P([(0,n.wk)()],N.prototype,"sourceTokenAmount",void 0),P([(0,n.wk)()],N.prototype,"sourceTokenPriceInUSD",void 0),P([(0,n.wk)()],N.prototype,"toToken",void 0),P([(0,n.wk)()],N.prototype,"toTokenAmount",void 0),P([(0,n.wk)()],N.prototype,"toTokenPriceInUSD",void 0),P([(0,n.wk)()],N.prototype,"inputError",void 0),P([(0,n.wk)()],N.prototype,"fetchError",void 0),P([(0,n.wk)()],N.prototype,"lastTokenPriceUpdate",void 0),N=P([(0,h.EM)("w3m-swap-view")],N);const C=h.AH`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px ${({tokens:t})=>t.core.glass010};
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:t})=>t[2]};
    padding: ${({spacing:t})=>t[2]};
    height: 40px;
    border: none;
    border-radius: 80px;
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.theme.foregroundPrimary};
    cursor: pointer;
    transition: background ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background;
  }

  .token-item:hover {
    background: ${({tokens:t})=>t.core.glass010};
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[5]};
    border-radius: ${({borderRadius:t})=>t[3]};
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .action-buttons-container {
    width: 100%;
    gap: ${({spacing:t})=>t[2]};
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: ${({borderRadius:t})=>t[4]};
    border: none;
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.core.glass010};
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[3]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({spacing:t})=>t[3]};
    border-radius: ${({borderRadius:t})=>t[3]};
    transition: background ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({spacing:t})=>t[2]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[5]};
    border-radius: ${({borderRadius:t})=>t[3]};
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var R=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let D=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=l.GN.state.approvalTransaction,this.swapTransaction=l.GN.state.swapTransaction,this.sourceToken=l.GN.state.sourceToken,this.sourceTokenAmount=l.GN.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=l.GN.state.sourceTokenPriceInUSD,this.balanceSymbol=s.W.getAccountData()?.balanceSymbol,this.toToken=l.GN.state.toToken,this.toTokenAmount=l.GN.state.toTokenAmount??"",this.toTokenPriceInUSD=l.GN.state.toTokenPriceInUSD,this.caipNetwork=s.W.state.activeCaipNetwork,this.inputError=l.GN.state.inputError,this.loadingQuote=l.GN.state.loadingQuote,this.loadingApprovalTransaction=l.GN.state.loadingApprovalTransaction,this.loadingBuildTransaction=l.GN.state.loadingBuildTransaction,this.loadingTransaction=l.GN.state.loadingTransaction,this.unsubscribe.push(s.W.subscribeChainProp("accountState",t=>{t?.balanceSymbol!==this.balanceSymbol&&a.I.goBack()}),s.W.subscribeKey("activeCaipNetwork",t=>{this.caipNetwork!==t&&(this.caipNetwork=t)}),l.GN.subscribe(t=>{this.approvalTransaction=t.approvalTransaction,this.swapTransaction=t.swapTransaction,this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.sourceTokenAmount=t.sourceTokenAmount??"",this.toTokenAmount=t.toTokenAmount??"",this.inputError=t.inputError,t.inputError&&a.I.goBack(),this.loadingQuote=t.loadingQuote,this.loadingApprovalTransaction=t.loadingApprovalTransaction,this.loadingBuildTransaction=t.loadingBuildTransaction,this.loadingTransaction=t.loadingTransaction}))}firstUpdated(){l.GN.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval)}render(){return o.qy`
      <wui-flex flexDirection="column" .padding=${["0","4","4","4"]} gap="3">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{l.GN.getApprovalLoadingState()||l.GN.getTransaction()},1e4)}templateSwap(){const t=`${r.S.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,e=`${r.S.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,i=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,n=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,s=r.S.formatNumberToLocalString(i),a=r.S.formatNumberToLocalString(n),l=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return o.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="4">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Send</wui-text>
              <wui-text variant="md-regular" color="primary">$${s}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="default" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Receive</wui-text>
              <wui-text variant="md-regular" color="primary">$${a}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="2">
          <wui-icon size="sm" color="default" name="info"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral-secondary"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="secondary">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="accent-primary"
            ?loading=${l}
            ?disabled=${l}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="invert"> ${this.actionButtonLabel()} </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?o.qy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){a.I.goBack()}onSendTransaction(){this.approvalTransaction?l.GN.sendTransactionForApproval(this.approvalTransaction):l.GN.sendTransactionForSwap(this.swapTransaction)}};D.styles=C,R([(0,n.wk)()],D.prototype,"interval",void 0),R([(0,n.wk)()],D.prototype,"detailsOpen",void 0),R([(0,n.wk)()],D.prototype,"approvalTransaction",void 0),R([(0,n.wk)()],D.prototype,"swapTransaction",void 0),R([(0,n.wk)()],D.prototype,"sourceToken",void 0),R([(0,n.wk)()],D.prototype,"sourceTokenAmount",void 0),R([(0,n.wk)()],D.prototype,"sourceTokenPriceInUSD",void 0),R([(0,n.wk)()],D.prototype,"balanceSymbol",void 0),R([(0,n.wk)()],D.prototype,"toToken",void 0),R([(0,n.wk)()],D.prototype,"toTokenAmount",void 0),R([(0,n.wk)()],D.prototype,"toTokenPriceInUSD",void 0),R([(0,n.wk)()],D.prototype,"caipNetwork",void 0),R([(0,n.wk)()],D.prototype,"inputError",void 0),R([(0,n.wk)()],D.prototype,"loadingQuote",void 0),R([(0,n.wk)()],D.prototype,"loadingApprovalTransaction",void 0),R([(0,n.wk)()],D.prototype,"loadingBuildTransaction",void 0),R([(0,n.wk)()],D.prototype,"loadingTransaction",void 0),D=R([(0,h.EM)("w3m-swap-preview-view")],D),i(12965),i(36887),i(18409),i(69807);var G=i(26109),E=i(43494),z=i(67569);const M=z.AH`
  :host {
    width: 100%;
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: ${({spacing:t})=>t[3]};
    padding: ${({spacing:t})=>t[2]};
    padding-right: ${({spacing:t})=>t[4]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.foregroundSecondary};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }

    :host > wui-flex:active {
      background-color: ${({tokens:t})=>t.core.glass010};
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:t})=>t[20]};
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.core.glass010};
    border-radius: ${({borderRadius:t})=>t[8]};
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: ${({borderRadius:t})=>t[2]};
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var j=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let q=class extends o.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){if(!this.visible)return null;const t=this.amount&&this.price?r.S.multiply(this.price,this.amount)?.toFixed(3):null;return o.qy`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="1">
          <wui-flex justifyContent="space-between">
            <wui-text variant="md-medium" color="primary" lineClamp="1">${this.name}</wui-text>
            ${t?o.qy`
                  <wui-text variant="md-medium" color="primary">
                    $${r.S.formatNumberToLocalString(t,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="sm-regular" color="secondary" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?o.qy`<wui-text variant="sm-regular" color="secondary">
                  ${r.S.formatNumberToLocalString(this.amount,5)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?o.qy`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?o.qy`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};q.styles=[G.W5,G.fD,M],j([(0,n.MZ)()],q.prototype,"imageSrc",void 0),j([(0,n.MZ)()],q.prototype,"name",void 0),j([(0,n.MZ)()],q.prototype,"symbol",void 0),j([(0,n.MZ)()],q.prototype,"price",void 0),j([(0,n.MZ)()],q.prototype,"amount",void 0),j([(0,n.wk)()],q.prototype,"visible",void 0),j([(0,n.wk)()],q.prototype,"imageError",void 0),q=j([(0,E.E)("wui-token-list-item")],q),i(41497);const L=z.AH`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    column-gap: ${({spacing:t})=>t[3]};
    padding: ${({spacing:t})=>t[2]};
    padding-right: ${({spacing:t})=>t[4]};
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;let O=class extends o.WF{render(){return o.qy`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="1">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="1" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};O.styles=[G.W5,L],O=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s}([(0,E.E)("wui-token-list-item-loader")],O);const U=h.AH`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid ${({tokens:t})=>t.core.glass010};
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:t})=>t[2]};
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.core.glass010};
    background-color: transparent;
    border-radius: ${({borderRadius:t})=>t[3]};
    padding: ${({spacing:t})=>t[2]};
    align-items: center;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  .select-network-button:hover {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: ${({borderRadius:t})=>t[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.core.glass010};
  }
`;var W=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let B=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.targetToken=a.I.state.data?.target,this.sourceToken=l.GN.state.sourceToken,this.sourceTokenAmount=l.GN.state.sourceTokenAmount,this.toToken=l.GN.state.toToken,this.myTokensWithBalance=l.GN.state.myTokensWithBalance,this.popularTokens=l.GN.state.popularTokens,this.suggestedTokens=l.GN.state.suggestedTokens,this.tokensLoading=l.GN.state.tokensLoading,this.searchValue="",this.unsubscribe.push(l.GN.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.myTokensWithBalance=t.myTokensWithBalance,this.popularTokens=t.popularTokens,this.suggestedTokens=t.suggestedTokens,this.tokensLoading=t.tokensLoading}))}async firstUpdated(){await l.GN.getTokenList()}updated(){const t=this.renderRoot?.querySelector(".suggested-tokens-container");t?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this));const e=this.renderRoot?.querySelector(".tokens");e?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();const t=this.renderRoot?.querySelector(".suggested-tokens-container"),e=this.renderRoot?.querySelector(".tokens");t?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),e?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return o.qy`
      <wui-flex flexDirection="column" gap="3">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(t){"sourceToken"===this.targetToken?l.GN.setSourceToken(t):(l.GN.setToToken(t),this.sourceToken&&this.sourceTokenAmount&&l.GN.swapTokens()),a.I.goBack()}templateSearchInput(){return o.qy`
      <wui-flex .padding=${["1","3","0","3"]} gap="2">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateMyTokens(){const t=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],e=this.filterTokensWithText(t,this.searchValue);return e?.length>0?o.qy`<wui-flex justifyContent="flex-start" padding="2">
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        ${e.map(t=>{const e=t.symbol===this.sourceToken?.symbol||t.symbol===this.toToken?.symbol;return o.qy`
            <wui-token-list-item
              data-testid="swap-select-token-item-${t.symbol}"
              name=${t.name}
              ?disabled=${e}
              symbol=${t.symbol}
              price=${t?.price}
              amount=${t?.quantity?.numeric}
              imageSrc=${t.logoUri}
              @click=${()=>{e||this.onSelectToken(t)}}
            >
            </wui-token-list-item>
          `})}`:null}templateAllTokens(){const t=this.popularTokens?this.popularTokens:[],e=this.filterTokensWithText(t,this.searchValue);return this.tokensLoading?o.qy`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      `:e?.length>0?o.qy`
        ${e.map(t=>o.qy`
            <wui-token-list-item
              data-testid="swap-select-token-item-${t.symbol}"
              name=${t.name}
              symbol=${t.symbol}
              imageSrc=${t.logoUri}
              @click=${()=>this.onSelectToken(t)}
            >
            </wui-token-list-item>
          `)}
      `:null}templateTokens(){return o.qy`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","2","2","2"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="3">
            <wui-text variant="md-medium" color="secondary">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){const t=this.suggestedTokens?this.suggestedTokens.slice(0,8):null;return this.tokensLoading?o.qy`
        <wui-flex
          class="suggested-tokens-container"
          .padding=${["0","3","0","3"]}
          gap="2"
        >
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      `:t?o.qy`
      <wui-flex
        class="suggested-tokens-container"
        .padding=${["0","3","0","3"]}
        gap="2"
      >
        ${t.map(t=>o.qy`
            <wui-token-button
              text=${t.symbol}
              imageSrc=${t.logoUri}
              @click=${()=>this.onSelectToken(t)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(t){this.searchValue=t.detail}handleSuggestedTokensScroll(){const t=this.renderRoot?.querySelector(".suggested-tokens-container");t&&(t.style.setProperty("--suggested-tokens-scroll--left-opacity",h.z8.interpolate([0,100],[0,1],t.scrollLeft).toString()),t.style.setProperty("--suggested-tokens-scroll--right-opacity",h.z8.interpolate([0,100],[0,1],t.scrollWidth-t.scrollLeft-t.offsetWidth).toString()))}handleTokenListScroll(){const t=this.renderRoot?.querySelector(".tokens");t&&(t.style.setProperty("--tokens-scroll--top-opacity",h.z8.interpolate([0,100],[0,1],t.scrollTop).toString()),t.style.setProperty("--tokens-scroll--bottom-opacity",h.z8.interpolate([0,100],[0,1],t.scrollHeight-t.scrollTop-t.offsetHeight).toString()))}filterTokensWithText(t,e){return t.filter(t=>`${t.symbol} ${t.name} ${t.address}`.toLowerCase().includes(e.toLowerCase())).sort((t,i)=>{const o=`${t.symbol} ${t.name} ${t.address}`.toLowerCase(),n=`${i.symbol} ${i.name} ${i.address}`.toLowerCase();return o.indexOf(e.toLowerCase())-n.indexOf(e.toLowerCase())})}};B.styles=U,W([(0,n.wk)()],B.prototype,"interval",void 0),W([(0,n.wk)()],B.prototype,"targetToken",void 0),W([(0,n.wk)()],B.prototype,"sourceToken",void 0),W([(0,n.wk)()],B.prototype,"sourceTokenAmount",void 0),W([(0,n.wk)()],B.prototype,"toToken",void 0),W([(0,n.wk)()],B.prototype,"myTokensWithBalance",void 0),W([(0,n.wk)()],B.prototype,"popularTokens",void 0),W([(0,n.wk)()],B.prototype,"suggestedTokens",void 0),W([(0,n.wk)()],B.prototype,"tokensLoading",void 0),W([(0,n.wk)()],B.prototype,"searchValue",void 0),B=W([(0,h.EM)("w3m-swap-select-token-view")],B)},78509(t,e,i){var o=i(12618),n=i(25707),r=i(99598),s=i(78508),a=i(96396),l=i(70148);const c=o.AH`
  :host {
    width: 100%;
    display: block;
  }
`;var u=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let p=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.text="",this.open=r.I.state.open,this.unsubscribe.push(s.I.subscribeKey("view",()=>{r.I.hide()}),a.W.subscribeKey("open",t=>{t||r.I.hide()}),r.I.subscribeKey("open",t=>{this.open=t}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),r.I.hide()}render(){return o.qy`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return o.qy`<slot></slot> `}onMouseEnter(){const t=this.getBoundingClientRect();if(!this.open){const e=document.querySelector("w3m-modal"),i={width:t.width,height:t.height,left:t.left,top:t.top};if(e){const o=e.getBoundingClientRect();i.left=t.left-(window.innerWidth-o.width)/2,i.top=t.top-(window.innerHeight-o.height)/2}r.I.showTooltip({message:this.text,triggerRect:i,variant:"shade"})}}onMouseLeave(t){this.contains(t.relatedTarget)||r.I.hide()}};p.styles=[c],u([(0,n.MZ)()],p.prototype,"text",void 0),u([(0,n.wk)()],p.prototype,"open",void 0),p=u([(0,l.EM)("w3m-tooltip-trigger")],p)},56090(t,e,i){var o=i(12618),n=i(25707),r=i(99598),s=i(70148);i(60310),i(51636),i(45090);const a=s.AH`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:t})=>t[3]} 10px ${({spacing:t})=>t[3]};
    border-radius: ${({borderRadius:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:t})=>t[5]});
    transition: opacity ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:t})=>t.theme.foregroundPrimary};
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

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var l=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let c=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=r.I.state.open,this.message=r.I.state.message,this.triggerRect=r.I.state.triggerRect,this.variant=r.I.state.variant,this.unsubscribe.push(r.I.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;const t=this.triggerRect.top,e=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${t}px;\n    --w3m-tooltip-left: ${e}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,o.qy`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};c.styles=[a],l([(0,n.wk)()],c.prototype,"open",void 0),l([(0,n.wk)()],c.prototype,"message",void 0),l([(0,n.wk)()],c.prototype,"triggerRect",void 0),l([(0,n.wk)()],c.prototype,"variant",void 0),c=l([(0,s.EM)("w3m-tooltip")],c)},77616(t,e,i){i(12851)},12965(t,e,i){i(98848)},35090(t,e,i){i(41497)},72510(t,e,i){var o=i(12618),n=i(25707),r=(i(10052),i(36887),i(41497),i(18409),i(69807),i(26109)),s=i(43494);const a=i(67569).AH`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:t})=>t[1]};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[32]};
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t[32]};
  }

  wui-text {
    padding-left: ${({spacing:t})=>t[1]};
    padding-right: ${({spacing:t})=>t[1]};
  }

  .left-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    border: 1px solid ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] .token-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .token-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .token-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .chain-image {
    width: 12px;
    height: 12px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='md'] .chain-image {
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='sm'] .chain-image {
    width: 8px;
    height: 8px;
    bottom: 2px;
    right: -3px;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var l=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};const c={lg:"lg-regular",md:"lg-regular",sm:"md-regular"},u={lg:"lg",md:"md",sm:"sm"};let p=class extends o.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.text="",this.loading=!1}render(){return this.loading?o.qy` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:o.qy`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return o.qy`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return o.qy`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;const t=u[this.size];return o.qy`<wui-flex class="left-icon-container">
      <wui-icon size=${t} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){const t=c[this.size];return o.qy`<wui-text color="primary" variant=${t}
      >${this.text}</wui-text
    >`}};p.styles=[r.W5,r.fD,a],l([(0,n.MZ)()],p.prototype,"size",void 0),l([(0,n.MZ)()],p.prototype,"imageSrc",void 0),l([(0,n.MZ)()],p.prototype,"chainImageSrc",void 0),l([(0,n.MZ)({type:Boolean})],p.prototype,"disabled",void 0),l([(0,n.MZ)()],p.prototype,"text",void 0),l([(0,n.MZ)({type:Boolean})],p.prototype,"loading",void 0),p=l([(0,s.E)("wui-token-button")],p)},98848(t,e,i){var o=i(12618),n=i(25707),r=i(60031),s=i(68342),a=(i(10052),i(18409),i(26109)),l=i(43494);const c=i(67569).AH`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[3]} ${({spacing:t})=>t[10]};
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t["lg-regular"].lineHeight};
    letter-spacing: ${({typography:t})=>t["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:t})=>t[4]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[4]} ${({spacing:t})=>t[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:t})=>t[2]};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:t})=>t[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var u=function(t,e,i,o){var n,r=arguments.length,s=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,i,s):n(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s};let p=class extends o.WF{constructor(){super(...arguments),this.inputElementRef=(0,s._)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return o.qy` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${(0,s.K)(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,r.J)(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?o.qy`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?o.qy`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?o.qy`<wui-icon name="spinner" size="md"></wui-icon>`:o.qy`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?o.qy`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?o.qy`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};p.styles=[a.W5,a.fD,c],u([(0,n.MZ)()],p.prototype,"icon",void 0),u([(0,n.MZ)({type:Boolean})],p.prototype,"disabled",void 0),u([(0,n.MZ)({type:Boolean})],p.prototype,"loading",void 0),u([(0,n.MZ)()],p.prototype,"placeholder",void 0),u([(0,n.MZ)()],p.prototype,"type",void 0),u([(0,n.MZ)()],p.prototype,"value",void 0),u([(0,n.MZ)()],p.prototype,"errorText",void 0),u([(0,n.MZ)()],p.prototype,"warningText",void 0),u([(0,n.MZ)()],p.prototype,"onSubmit",void 0),u([(0,n.MZ)()],p.prototype,"size",void 0),u([(0,n.MZ)({attribute:!1})],p.prototype,"onKeyDown",void 0),p=u([(0,l.E)("wui-input-text")],p)},68342(t,e,i){i.d(e,{_:()=>h,K:()=>m});var o=i(36752);const{I:n}=o.ge;var r=i(7804);const s=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),s(t,e);return!0},a=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},l=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),p(e)}};function c(t){void 0!==this._$AN?(a(this),this._$AM=t,l(this)):this._$AM=t}function u(t,e=!1,i=0){const o=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(o))for(let t=i;t<o.length;t++)s(o[t],!1),a(o[t]);else null!=o&&(s(o,!1),a(o));else s(this,t)}const p=t=>{t.type==r.OA.CHILD&&(t._$AP??=u,t._$AQ??=c)};class d extends r.WL{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),l(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(s(this,t),a(this))}setValue(t){if((()=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}const h=()=>new g;class g{}const w=new WeakMap,m=(0,r.u$)(class extends d{render(t){return o.s6}update(t,[e]){const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),o.s6}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let i=w.get(e);void 0===i&&(i=new WeakMap,w.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?w.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);
//# sourceMappingURL=6311.bundle.js.map