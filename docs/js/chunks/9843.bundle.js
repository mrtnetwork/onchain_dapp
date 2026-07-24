"use strict";(self.webpackChunkonchain_dapp_example=self.webpackChunkonchain_dapp_example||[]).push([[1497,9843],{37740(t,e,o){o.d(e,{g:()=>w});var i=o(68126),n=o(4707),a=o(23768),r=o(74496),s=o(17187),c=o(26742),u=o(1440),d=o(75595),l=o(6056),p=o(90184),h=o(57019),m=o(21871);const g={paymentAsset:null,amount:null,tokenAmount:0,priceLoading:!1,error:null,exchanges:[],isLoading:!1,currentPayment:void 0,isPaymentInProgress:!1,paymentId:"",assets:[]},y=(0,i.BX)(g),w={state:y,subscribe:t=>(0,i.B1)(y,()=>t(y)),subscribeKey:(t,e)=>(0,n.u$)(y,t,e),resetState(){Object.assign(y,{...g})},async getAssetsForNetwork(t){const e=(0,u.nj)(t),o=await w.getAssetsImageAndPrice(e),i=e.map(t=>{const e="native"===t.asset?(0,r.K1)():`${t.network}:${t.asset}`,i=o.find(t=>t.fungibles?.[0]?.address?.toLowerCase()===e.toLowerCase());return{...t,price:i?.fungibles?.[0]?.price||1,metadata:{...t.metadata,iconUrl:i?.fungibles?.[0]?.iconUrl}}});return y.assets=i,i},async getAssetsImageAndPrice(t){const e=t.map(t=>"native"===t.asset?(0,r.K1)():`${t.network}:${t.asset}`);return await Promise.all(e.map(t=>d.T.fetchTokenPrice({addresses:[t]})))},getTokenAmount(){if(!y?.paymentAsset?.price)throw new Error("Cannot get token price");const t=a.S.bigNumber(y.amount??0).round(8),e=a.S.bigNumber(y.paymentAsset.price).round(8);return t.div(e).round(8).toNumber()},setAmount(t){y.amount=t,y.paymentAsset?.price&&(y.tokenAmount=w.getTokenAmount())},setPaymentAsset(t){y.paymentAsset=t},isPayWithExchangeEnabled:()=>h.H.state.remoteFeatures?.payWithExchange,isPayWithExchangeSupported:()=>w.isPayWithExchangeEnabled()&&l.W.state.activeCaipNetwork&&s.oU.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(l.W.state.activeCaipNetwork.chainNamespace),async fetchExchanges(){try{const t=w.isPayWithExchangeSupported();if(!y.paymentAsset||!t)return y.exchanges=[],void(y.isLoading=!1);y.isLoading=!0;const e=await(0,u.ro)({page:0,asset:(0,u.lZ)(y.paymentAsset.network,y.paymentAsset.asset),amount:y.amount?.toString()??"0"});y.exchanges=e.exchanges.slice(0,2)}catch(t){throw m.P.showError("Unable to get exchanges"),new Error("Unable to get exchanges")}finally{y.isLoading=!1}},async getPayUrl(t,e){try{const o=Number(e.amount),i=await(0,u.cz)({exchangeId:t,asset:(0,u.lZ)(e.network,e.asset),amount:o.toString(),recipient:`${e.network}:${e.recipient}`});return p.E.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:t},configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:o},currentPayment:{type:"exchange",exchangeId:t},source:"fund-from-exchange",headless:!1}}),i}catch(t){if(t instanceof Error&&t.message.includes("is not supported"))throw new Error("Asset not supported");throw new Error(t.message)}},async handlePayWithExchange(t){try{const e=l.W.getAccountData()?.address;if(!e)throw new Error("No account connected");if(!y.paymentAsset)throw new Error("No payment asset selected");const o=c.w.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!o)throw new Error("Could not create popup window");y.isPaymentInProgress=!0,y.paymentId=crypto.randomUUID(),y.currentPayment={type:"exchange",exchangeId:t};const{network:i,asset:n}=y.paymentAsset,a={network:i,asset:n,amount:y.tokenAmount,recipient:e},r=await w.getPayUrl(t,a);if(!r){try{o.close()}catch(t){console.error("Unable to close popup window",t)}throw new Error("Unable to initiate payment")}y.currentPayment.sessionId=r.sessionId,y.currentPayment.status="IN_PROGRESS",y.currentPayment.exchangeId=t,o.location.href=r.url}catch(t){y.error="Unable to initiate payment",m.P.showError(y.error)}},async waitUntilComplete({exchangeId:t,sessionId:e,paymentId:o,retries:i=20}){const n=await w.getBuyStatus(t,e,o);if("SUCCESS"===n.status||"FAILED"===n.status)return n;if(0===i)throw new Error("Unable to get deposit status");return await new Promise(t=>{setTimeout(t,5e3)}),w.waitUntilComplete({exchangeId:t,sessionId:e,paymentId:o,retries:i-1})},async getBuyStatus(t,e,o){try{if(!y.currentPayment)throw new Error("No current payment");const i=await(0,u.V1)({sessionId:e,exchangeId:t});if(y.currentPayment.status=i.status,"SUCCESS"===i.status||"FAILED"===i.status){const t=l.W.getAccountData()?.address;y.currentPayment.result=i.txHash,y.isPaymentInProgress=!1,p.E.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?c.w.parseError(y.error):void 0,source:"fund-from-exchange",paymentId:o,configuration:{network:y.paymentAsset?.network||"",asset:y.paymentAsset?.asset||"",recipient:t||"",amount:y.amount??0},currentPayment:{type:"exchange",exchangeId:y.currentPayment?.exchangeId,sessionId:y.currentPayment?.sessionId,result:i.txHash}}})}return i}catch(t){return{status:"UNKNOWN",txHash:""}}},reset(){y.currentPayment=void 0,y.isPaymentInProgress=!1,y.paymentId="",y.paymentAsset=null,y.amount=0,y.tokenAmount=0,y.priceLoading=!1,y.error=null,y.exchanges=[],y.isLoading=!1}}},99843(t,e,o){o.r(e),o.d(e,{W3mDepositFromExchangeSelectAssetView:()=>S,W3mDepositFromExchangeView:()=>P});var i=o(12618),n=o(25707),a=o(60031),r=o(6056),s=o(37740),c=o(78508),u=o(27601),d=o(21871),l=o(31211),p=o(70148),h=(o(10052),o(36887),o(18409),o(26109)),m=o(43494);const g=o(67569).AH`
  button {
    border: none;
    border-radius: ${({borderRadius:t})=>t[20]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({spacing:t})=>t[1]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, box-shadow;
  }

  /* -- Variants --------------------------------------------------------------- */
  button[data-type='accent'] {
    background-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  button[data-type='neutral'] {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  /* -- Sizes --------------------------------------------------------------- */
  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='sm'] > wui-image,
  button[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image,
  button[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-image,
  button[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({spacing:t})=>t[1]};
    padding-right: ${({spacing:t})=>t[1]};
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-type='accent']:not(:disabled):hover {
      background-color: ${({tokens:t})=>t.core.foregroundAccent060};
    }

    button[data-type='neutral']:not(:disabled):hover {
      background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
    }
  }

  button[data-type='accent']:not(:disabled):focus-visible,
  button[data-type='accent']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button[data-type='neutral']:not(:disabled):focus-visible,
  button[data-type='neutral']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button:disabled {
    opacity: 0.5;
  }
`;var y=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};const w={sm:"sm-regular",md:"md-regular",lg:"lg-regular"};let b=class extends i.WF{constructor(){super(...arguments),this.type="accent",this.size="md",this.imageSrc="",this.disabled=!1,this.leftIcon=void 0,this.rightIcon=void 0,this.text=""}render(){return i.qy`
      <button ?disabled=${this.disabled} data-type=${this.type} data-size=${this.size}>
        ${this.imageSrc?i.qy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        ${this.leftIcon?i.qy`<wui-icon name=${this.leftIcon} color="inherit" size="inherit"></wui-icon>`:null}
        <wui-text variant=${w[this.size]} color="inherit">${this.text}</wui-text>
        ${this.rightIcon?i.qy`<wui-icon name=${this.rightIcon} color="inherit" size="inherit"></wui-icon>`:null}
      </button>
    `}};b.styles=[h.W5,h.fD,g],y([(0,n.MZ)()],b.prototype,"type",void 0),y([(0,n.MZ)()],b.prototype,"size",void 0),y([(0,n.MZ)()],b.prototype,"imageSrc",void 0),y([(0,n.MZ)({type:Boolean})],b.prototype,"disabled",void 0),y([(0,n.MZ)()],b.prototype,"leftIcon",void 0),y([(0,n.MZ)()],b.prototype,"rightIcon",void 0),y([(0,n.MZ)()],b.prototype,"text",void 0),b=y([(0,m.E)("wui-chip-button")],b),o(60310),o(64865),o(93516),o(26509),o(35090),o(45090),o(58461),o(81874),o(45101);var f=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let x=class extends i.WF{constructor(){super(...arguments),this.maxDecimals=void 0,this.maxIntegers=void 0}render(){return i.qy`
      <wui-flex alignItems="center" gap="1">
        <wui-input-amount
          widthVariant="fit"
          fontSize="h2"
          .maxDecimals=${(0,a.J)(this.maxDecimals)}
          .maxIntegers=${(0,a.J)(this.maxIntegers)}
          .value=${this.amount?String(this.amount):""}
        ></wui-input-amount>
        <wui-text variant="md-regular" color="secondary">USD</wui-text>
      </wui-flex>
    `}};f([(0,n.MZ)({type:Number})],x.prototype,"amount",void 0),f([(0,n.MZ)({type:Number})],x.prototype,"maxDecimals",void 0),f([(0,n.MZ)({type:Number})],x.prototype,"maxIntegers",void 0),x=f([(0,p.EM)("w3m-fund-input")],x);const v=p.AH`
  .amount-input-container {
    border-radius: ${({borderRadius:t})=>t[6]};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    padding: ${({spacing:t})=>t[1]};
  }

  .container {
    border-radius: 30px;
  }
`;var k=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};const $=[10,50,100];let P=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.network=r.W.state.activeCaipNetwork,this.exchanges=s.g.state.exchanges,this.isLoading=s.g.state.isLoading,this.amount=s.g.state.amount,this.tokenAmount=s.g.state.tokenAmount,this.priceLoading=s.g.state.priceLoading,this.isPaymentInProgress=s.g.state.isPaymentInProgress,this.currentPayment=s.g.state.currentPayment,this.paymentId=s.g.state.paymentId,this.paymentAsset=s.g.state.paymentAsset,this.unsubscribe.push(r.W.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.setDefaultPaymentAsset()}),s.g.subscribe(t=>{this.exchanges=t.exchanges,this.isLoading=t.isLoading,this.amount=t.amount,this.tokenAmount=t.tokenAmount,this.priceLoading=t.priceLoading,this.paymentId=t.paymentId,this.isPaymentInProgress=t.isPaymentInProgress,this.currentPayment=t.currentPayment,this.paymentAsset=t.paymentAsset,t.isPaymentInProgress&&t.currentPayment?.exchangeId&&t.currentPayment?.sessionId&&t.paymentId&&this.handlePaymentInProgress()}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),s.g.state.isPaymentInProgress||s.g.reset()}async firstUpdated(){await this.getPaymentAssets(),this.paymentAsset||await this.setDefaultPaymentAsset(),s.g.setAmount($[0]),await s.g.fetchExchanges()}render(){return i.qy`
      <wui-flex flexDirection="column" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `}exchangesLoadingTemplate(){return Array.from({length:2}).map(()=>i.qy`<wui-shimmer width="100%" height="65px" borderRadius="xxs"></wui-shimmer>`)}_exchangesTemplate(){return this.exchanges.length>0?this.exchanges.map(t=>i.qy`<wui-list-item
              @click=${()=>this.onExchangeClick(t)}
              chevron
              variant="image"
              imageSrc=${t.imageUrl}
              ?loading=${this.isLoading}
            >
              <wui-text variant="md-regular" color="primary">
                Deposit from ${t.name}
              </wui-text>
            </wui-list-item>`):i.qy`<wui-flex flexDirection="column" alignItems="center" gap="4" padding="4">
          <wui-text variant="lg-medium" align="center" color="primary">
            No exchanges support this asset on this network
          </wui-text>
        </wui-flex>`}exchangesTemplate(){return i.qy`<wui-flex
      flexDirection="column"
      gap="2"
      .padding=${["3","3","3","3"]}
      class="exchanges-container"
    >
      ${this.isLoading?this.exchangesLoadingTemplate():this._exchangesTemplate()}
    </wui-flex>`}amountInputTemplate(){return i.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        class="amount-input-container"
      >
        <wui-flex
          justifyContent="space-between"
          alignItems="center"
          .margin=${["0","0","6","0"]}
        >
          <wui-text variant="md-medium" color="secondary">Asset</wui-text>
          <wui-token-button
            data-testid="deposit-from-exchange-asset-button"
            flexDirection="row-reverse"
            text=${this.paymentAsset?.metadata.symbol||""}
            imageSrc=${this.paymentAsset?.metadata.iconUrl||""}
            @click=${()=>c.I.push("PayWithExchangeSelectAsset")}
            size="lg"
            .chainImageSrc=${(0,a.J)(u.$.getNetworkImage(this.network))}
          >
          </wui-token-button>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          .margin=${["0","0","4","0"]}
        >
          <w3m-fund-input
            @inputChange=${this.onAmountChange.bind(this)}
            .amount=${this.amount}
            .maxDecimals=${6}
            .maxIntegers=${10}
          >
          </w3m-fund-input>
          ${this.tokenAmountTemplate()}
        </wui-flex>
        <wui-flex justifyContent="center" gap="2">
          ${$.map(t=>i.qy`<wui-chip-button
                @click=${()=>s.g.setAmount(t)}
                type="neutral"
                size="lg"
                text=${`$${t}`}
              ></wui-chip-button>`)}
        </wui-flex>
      </wui-flex>
    `}tokenAmountTemplate(){return this.priceLoading?i.qy`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>`:i.qy`
      <wui-text variant="md-regular" color="secondary">
        ${this.tokenAmount.toFixed(4)} ${this.paymentAsset?.metadata.symbol}
      </wui-text>
    `}async onExchangeClick(t){this.amount?await s.g.handlePayWithExchange(t.id):d.P.showError("Please enter an amount")}handlePaymentInProgress(){const t=r.W.state.activeChain,{redirectView:e="Account"}=c.I.state.data??{};this.isPaymentInProgress&&this.currentPayment?.exchangeId&&this.currentPayment?.sessionId&&this.paymentId&&(s.g.waitUntilComplete({exchangeId:this.currentPayment.exchangeId,sessionId:this.currentPayment.sessionId,paymentId:this.paymentId}).then(e=>{"SUCCESS"===e.status?(d.P.showSuccess("Deposit completed"),s.g.reset(),t&&(r.W.fetchTokenBalance(),l.x.updateBalance(t)),c.I.replace("Transactions")):"FAILED"===e.status&&d.P.showError("Deposit failed")}),d.P.showLoading("Deposit in progress..."),c.I.replace(e))}onAmountChange({detail:t}){s.g.setAmount(t?Number(t):null)}async getPaymentAssets(){this.network&&await s.g.getAssetsForNetwork(this.network.caipNetworkId)}async setDefaultPaymentAsset(){if(this.network){const t=await s.g.getAssetsForNetwork(this.network.caipNetworkId);t[0]&&s.g.setPaymentAsset(t[0])}}};P.styles=v,k([(0,n.wk)()],P.prototype,"network",void 0),k([(0,n.wk)()],P.prototype,"exchanges",void 0),k([(0,n.wk)()],P.prototype,"isLoading",void 0),k([(0,n.wk)()],P.prototype,"amount",void 0),k([(0,n.wk)()],P.prototype,"tokenAmount",void 0),k([(0,n.wk)()],P.prototype,"priceLoading",void 0),k([(0,n.wk)()],P.prototype,"isPaymentInProgress",void 0),k([(0,n.wk)()],P.prototype,"currentPayment",void 0),k([(0,n.wk)()],P.prototype,"paymentId",void 0),k([(0,n.wk)()],P.prototype,"paymentAsset",void 0),P=k([(0,p.EM)("w3m-deposit-from-exchange-view")],P);var I=o(26742);o(51636),o(77616),o(12965),o(55710),o(55618);const A=p.AH`
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
    border-radius: ${({borderRadius:t})=>t[3]};
  }
`;var E=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let S=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.assets=s.g.state.assets,this.search="",this.onDebouncedSearch=I.w.debounce(t=>{this.search=t}),this.unsubscribe.push(s.g.subscribe(t=>{this.assets=t.assets}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return i.qy`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}templateSearchInput(){return i.qy`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){const t=this.assets.filter(t=>t.metadata.name.toLowerCase().includes(this.search.toLowerCase())),e=t.length>0;return i.qy`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","3","0","3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4","3","3","3"]}>
          <wui-text variant="md-medium" color="secondary">Available tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${e?t.map(t=>i.qy`<wui-list-item
                    .imageSrc=${t.metadata.iconUrl}
                    ?clickable=${!0}
                    @click=${this.handleTokenClick.bind(this,t)}
                  >
                    <wui-text variant="md-medium" color="primary">${t.metadata.name}</wui-text>
                    <wui-text variant="md-regular" color="secondary"
                      >${t.metadata.symbol}</wui-text
                    >
                  </wui-list-item>`):i.qy`<wui-flex
                .padding=${["20","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="4"
              >
                <wui-icon-box icon="coinPlaceholder" color="default" size="lg"></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="2"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){c.I.push("OnRampProviders")}onInputChange(t){this.onDebouncedSearch(t.detail)}handleTokenClick(t){s.g.setPaymentAsset(t),c.I.goBack()}};S.styles=A,E([(0,n.wk)()],S.prototype,"assets",void 0),E([(0,n.wk)()],S.prototype,"search",void 0),S=E([(0,p.EM)("w3m-deposit-from-exchange-select-asset-view")],S)},64865(t,e,o){o(7068)},93516(t,e,o){o(36887)},81874(t,e,o){var i=o(12618),n=o(25707),a=o(68342),r=o(67569),s=o(26109),c=o(63612),u=o(43494);const d=r.AH`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({tokens:t})=>t.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({tokens:t})=>t.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({textSize:t})=>t.h4};
    caret-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    line-height: ${({typography:t})=>t["h4-regular-mono"].lineHeight};
    letter-spacing: ${({typography:t})=>t["h4-regular-mono"].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  :host([data-width-variant='auto']) input {
    width: 100%;
  }

  :host([data-width-variant='fit']) input {
    width: 1ch;
  }

  .wui-input-amount-fit-mirror {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: var(--local-font-size);
    line-height: 130%;
    letter-spacing: -1.28px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-input-amount-fit-width {
    display: inline-block;
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }
`;var l=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let p=class extends i.WF{constructor(){super(...arguments),this.inputElementRef=(0,a._)(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",r.f.textSize[this.fontSize]),this.resizeInput()}render(){return this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),"auto"===this.widthVariant?this.inputTemplate():i.qy`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return i.qy`<input
      ${(0,a.K)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=c.Z.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if("fit"===this.widthVariant){const t=this.inputElementRef.value;if(t){const e=t.previousElementSibling;e&&(e.textContent=t.value||"0",t.style.width=`${e.offsetWidth}px`)}}}};p.styles=[s.W5,s.fD,d],l([(0,n.MZ)({type:Boolean})],p.prototype,"disabled",void 0),l([(0,n.MZ)({type:String})],p.prototype,"value",void 0),l([(0,n.MZ)({type:String})],p.prototype,"placeholder",void 0),l([(0,n.MZ)({type:String})],p.prototype,"widthVariant",void 0),l([(0,n.MZ)({type:Number})],p.prototype,"maxDecimals",void 0),l([(0,n.MZ)({type:Number})],p.prototype,"maxIntegers",void 0),l([(0,n.MZ)({type:String})],p.prototype,"fontSize",void 0),l([(0,n.MZ)({type:Boolean})],p.prototype,"error",void 0),p=l([(0,u.E)("wui-input-amount")],p)},26509(t,e,o){var i=o(12618),n=o(25707),a=o(60031),r=(o(20880),o(18409),o(26109)),s=o(43494);const c=o(67569).AH`
  :host {
    width: 100%;
  }

  :host([data-type='primary']) > button {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  :host([data-type='secondary']) > button {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:t})=>t[3]};
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  @media (hover: hover) {
    :host([data-type='primary']) > button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }

    :host([data-type='secondary']) > button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var u=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let d=class extends i.WF{constructor(){super(...arguments),this.type="primary",this.imageSrc="google",this.imageSize=void 0,this.loading=!1,this.boxColor="foregroundPrimary",this.disabled=!1,this.rightIcon=!0,this.boxed=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",this.dataset.type=this.type,i.qy`
      <button
        ?disabled=${!!this.loading||Boolean(this.disabled)}
        data-loading=${this.loading}
        tabindex=${(0,a.J)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?i.qy`<wui-image
        icon=${this.icon}
        iconColor=${(0,a.J)(this.iconColor)}
        ?boxed=${this.boxed}
        ?rounded=${this.rounded}
        boxColor=${this.boxColor}
      ></wui-image>`:i.qy`<wui-image
      ?boxed=${this.boxed}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      size=${(0,a.J)(this.imageSize)}
      src=${this.imageSrc}
      boxColor=${this.boxColor}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?i.qy`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:i.qy`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};d.styles=[r.W5,r.fD,c],u([(0,n.MZ)()],d.prototype,"type",void 0),u([(0,n.MZ)()],d.prototype,"imageSrc",void 0),u([(0,n.MZ)()],d.prototype,"imageSize",void 0),u([(0,n.MZ)()],d.prototype,"icon",void 0),u([(0,n.MZ)()],d.prototype,"iconColor",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"loading",void 0),u([(0,n.MZ)()],d.prototype,"tabIdx",void 0),u([(0,n.MZ)()],d.prototype,"boxColor",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"disabled",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"rightIcon",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"boxed",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"rounded",void 0),u([(0,n.MZ)({type:Boolean})],d.prototype,"fullSize",void 0),d=u([(0,s.E)("wui-list-item")],d)},55618(t,e,o){var i=o(12618),n=o(25707),a=(o(18409),o(26109)),r=o(43494);const s=o(67569).AH`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:t})=>t.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var c=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let u=class extends i.WF{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,i.qy`${this.template()}`}template(){return this.text?i.qy`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};u.styles=[a.W5,s],c([(0,n.MZ)()],u.prototype,"text",void 0),c([(0,n.MZ)()],u.prototype,"bgColor",void 0),u=c([(0,r.E)("wui-separator")],u)},35090(t,e,o){o(41497)},41497(t,e,o){var i=o(12618),n=o(25707),a=o(43494);const r=o(67569).AH`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:t})=>t.theme.foregroundPrimary} 0%,
      ${({tokens:t})=>t.theme.foregroundSecondary} 50%,
      ${({tokens:t})=>t.theme.foregroundPrimary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;var s=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let c=class extends i.WF{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n    `,this.dataset.rounded=this.rounded?"true":"false",i.qy`<slot></slot>`}};c.styles=[r],s([(0,n.MZ)()],c.prototype,"width",void 0),s([(0,n.MZ)()],c.prototype,"height",void 0),s([(0,n.MZ)()],c.prototype,"variant",void 0),s([(0,n.MZ)({type:Boolean})],c.prototype,"rounded",void 0),c=s([(0,a.E)("wui-shimmer")],c)},7068(t,e,o){var i=o(12618),n=o(25707),a=(o(10052),o(26109)),r=o(43494);const s=o(67569).AH`
  button {
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;var c=function(t,e,o,i){var n,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(a<3?n(r):a>3?n(e,o,r):n(e,o))||r);return a>3&&r&&Object.defineProperty(e,o,r),r};let u=class extends i.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return i.qy`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${{accent:"accent-primary",primary:"inverse",secondary:"default"}[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};u.styles=[a.W5,a.fD,s],c([(0,n.MZ)()],u.prototype,"size",void 0),c([(0,n.MZ)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,n.MZ)()],u.prototype,"icon",void 0),c([(0,n.MZ)()],u.prototype,"iconColor",void 0),c([(0,n.MZ)()],u.prototype,"variant",void 0),u=c([(0,r.E)("wui-icon-link")],u)}}]);
//# sourceMappingURL=9843.bundle.js.map