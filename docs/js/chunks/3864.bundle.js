"use strict";(self.webpackChunkonchain_dapp_example=self.webpackChunkonchain_dapp_example||[]).push([[3864],{73864(e,t,o){o.r(t),o.d(t,{W3mWalletReceiveView:()=>v});var i=o(12618),r=o(25707),s=o(60031),n=o(6056),a=o(21871),c=o(27601),l=o(68996),d=o(74496),u=o(78508),h=o(26742),p=o(70148),w=(o(10052),o(36887),o(18409),o(69807),o(26109)),g=o(43494);const m=o(67569).AH`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    border: none;
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-text {
    flex: 1;
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e["01"]};
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[4]};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }
`;var b=function(e,t,o,i){var r,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,o,n):r(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let f=class extends i.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return i.qy`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return i.qy` <wui-flex class="networks">
      ${e?.map(e=>i.qy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};f.styles=[w.W5,w.fD,m],b([(0,r.MZ)({type:Array})],f.prototype,"networkImages",void 0),b([(0,r.MZ)()],f.prototype,"text",void 0),f=b([(0,g.E)("wui-compatible-network")],f),o(60310),o(66283),o(45090);var k=o(10152);const y=p.AH`
  wui-compatible-network {
    margin-top: ${({spacing:e})=>e[4]};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;var x=function(e,t,o,i){var r,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,o,n):r(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let v=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.address=n.W.getAccountData()?.address,this.profileName=n.W.getAccountData()?.profileName,this.network=n.W.state.activeCaipNetwork,this.unsubscribe.push(n.W.subscribeChainProp("accountState",e=>{e?(this.address=e.address,this.profileName=e.profileName):a.P.showError("Account not found")}),n.W.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=c.$.getNetworkImage(this.network);return i.qy` <wui-flex
      flexDirection="column"
      .padding=${["0","4","4","4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${p.Zv.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4","0","0","0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${l.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,s.J)(l.W.state.themeVariables["--apkt-qr-color"]??l.W.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=n.W.getAllRequestedCaipNetworks(),t=n.W.checkIfSmartAccountEnabled(),o=n.W.state.activeCaipNetwork,r=e.filter(e=>e?.chainNamespace===o?.chainNamespace);if((0,d.lj)(o?.chainNamespace)===k.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return o?i.qy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[c.$.getNetworkImage(o)??""]}
      ></wui-compatible-network>`:null;const s=r?.filter(e=>e?.assets?.imageId)?.slice(0,5),a=s.map(c.$.getNetworkImage).filter(Boolean);return i.qy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${a}
    ></wui-compatible-network>`}onReceiveClick(){u.I.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(h.w.copyToClopboard(this.address),a.P.showSuccess("Address copied"))}catch{a.P.showError("Failed to copy")}}};v.styles=y,x([(0,r.wk)()],v.prototype,"address",void 0),x([(0,r.wk)()],v.prototype,"profileName",void 0),x([(0,r.wk)()],v.prototype,"network",void 0),v=x([(0,p.EM)("w3m-wallet-receive-view")],v)},36887(e,t,o){var i=o(12618),r=o(25707),s=o(60031),n=o(26109),a=o(43494);const c=o(67569).AH`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  :host([data-boxed='true']) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  :host([data-full='true']) img {
    width: 100%;
    height: 100%;
  }

  :host([data-boxed='true']) wui-icon {
    width: 20px;
    height: 20px;
  }

  :host([data-icon='error']) {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var l=function(e,t,o,i){var r,s=arguments.length,n=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,o,n):r(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};let d=class extends i.WF{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.boxed=!1,this.rounded=!1,this.fullSize=!1}render(){const e={inherit:"inherit",xxs:"2",xs:"3",sm:"4",md:"4",mdl:"5",lg:"5",xl:"6",xxl:"7","3xl":"8","4xl":"9","5xl":"10"};return this.style.cssText=`\n      --local-width: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};\n      --local-height: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};\n      `,this.dataset.boxed=this.boxed?"true":"false",this.dataset.rounded=this.rounded?"true":"false",this.dataset.full=this.fullSize?"true":"false",this.dataset.icon=this.iconColor||"inherit",this.icon?i.qy`<wui-icon
        color=${this.iconColor||"inherit"}
        name=${this.icon}
        size="lg"
      ></wui-icon> `:this.logo?i.qy`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `:i.qy`<img src=${(0,s.J)(this.src)} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};d.styles=[n.W5,c],l([(0,r.MZ)()],d.prototype,"src",void 0),l([(0,r.MZ)()],d.prototype,"logo",void 0),l([(0,r.MZ)()],d.prototype,"icon",void 0),l([(0,r.MZ)()],d.prototype,"iconColor",void 0),l([(0,r.MZ)()],d.prototype,"alt",void 0),l([(0,r.MZ)()],d.prototype,"size",void 0),l([(0,r.MZ)({type:Boolean})],d.prototype,"boxed",void 0),l([(0,r.MZ)({type:Boolean})],d.prototype,"rounded",void 0),l([(0,r.MZ)({type:Boolean})],d.prototype,"fullSize",void 0),d=l([(0,a.E)("wui-image")],d)}}]);
//# sourceMappingURL=3864.bundle.js.map