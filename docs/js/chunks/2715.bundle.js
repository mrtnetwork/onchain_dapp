"use strict";(self.webpackChunkonchain_dapp_example=self.webpackChunkonchain_dapp_example||[]).push([[2715],{15509(e,t,i){i.d(t,{u:()=>d});var a=i(46036),s=i(24376),n=i(88249),o=i(75595),r=i(6056),c=i(74496),l=i(73495);class u{constructor(e){this.getNonce=e.getNonce}async createMessage(e){const t={accountAddress:e.accountAddress,chainId:e.chainId,version:"1",domain:"undefined"==typeof document?"Unknown Domain":document.location.host,uri:"undefined"==typeof document?"Unknown URI":document.location.href,resources:this.resources,nonce:await this.getNonce(e),issuedAt:this.stringifyDate(new Date),statement:void 0,expirationTime:void 0,notBefore:void 0},i={toString:()=>this.stringify(t)};return Object.assign(t,i)}stringify(e){const t=this.getNetworkName(e.chainId);return[`${e.domain} wants you to sign in with your ${t} account:`,e.accountAddress,e.statement?`\n${e.statement}\n`:"",`URI: ${e.uri}`,`Version: ${e.version}`,`Chain ID: ${e.chainId}`,`Nonce: ${e.nonce}`,e.issuedAt&&`Issued At: ${e.issuedAt}`,e.expirationTime&&`Expiration Time: ${e.expirationTime}`,e.notBefore&&`Not Before: ${e.notBefore}`,e.requestId&&`Request ID: ${e.requestId}`,e.resources?.length&&e.resources.reduce((e,t)=>`${e}\n- ${t}`,"Resources:")].filter(e=>"string"==typeof e).join("\n").trim()}getNetworkName(e){const t=r.W.getAllRequestedCaipNetworks();return l.L.getNetworkNameByCaipNetworkId(t,e)}stringifyDate(e){return e.toISOString()}}class d{constructor(e={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=e.localAuthStorageKey||a.Ws.SIWX_AUTH_TOKEN,this.localNonceStorageKey=e.localNonceStorageKey||a.Ws.SIWX_NONCE_TOKEN,this.required=e.required??!0,this.messenger=new u({getNonce:this.getNonce.bind(this)})}async createMessage(e){return this.messenger.createMessage(e)}async addSession(e){const t=await this.request({method:"POST",key:"authenticate",body:{data:e.data,message:e.message,signature:e.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:["nonce","otp"]});this.setStorageToken(t.token,this.localAuthStorageKey),this.emit("sessionChanged",e),this.setAppKitAccountUser(function(e){const t=e.split(".");if(3!==t.length)throw new Error("Invalid token");const i=t[1];if("string"!=typeof i)throw new Error("Invalid token");const a=i.replace(/-/gu,"+").replace(/_/gu,"/"),s=a.padEnd(a.length+(4-a.length%4)%4,"=");return JSON.parse(atob(s))}(t.token)),this.otpUuid=null}async getSessions(e,t){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];const i=await this.request({method:"GET",key:"me",query:{},headers:["auth"]});if(!i)return[];const a=i.address.toLowerCase()===t.toLowerCase(),s=i.caip2Network===e;if(!a||!s)return[];const n={data:{accountAddress:i.address,chainId:i.caip2Network},message:"",signature:""};return this.emit("sessionChanged",n),this.setAppKitAccountUser(i),[n]}catch{return[]}}async revokeSession(e,t){return Promise.resolve(this.clearStorageTokens())}async setSessions(e){if(0===e.length)this.clearStorageTokens();else{const t=e.find(e=>e.data.chainId===(0,c.kg)()?.caipNetworkId)||e[0];await this.addSession(t)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error("Not authenticated");return this.request({method:"GET",key:"me",body:void 0,query:{includeAppKitAccount:!0},headers:["auth"]})}async setSessionAccountMetadata(e=null){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error("Not authenticated");return this.request({method:"PUT",key:"account-metadata",body:{metadata:e},headers:["auth"]})}on(e,t){return this.listeners[e].push(t),()=>{this.listeners[e]=this.listeners[e].filter(e=>e!==t)}}removeAllListeners(){Object.keys(this.listeners).forEach(e=>{this.listeners[e]=[]})}async requestEmailOtp({email:e,account:t}){const i=await this.request({method:"POST",key:"otp",body:{email:e,account:t}});return this.otpUuid=i.uuid,this.messenger.resources=[`email:${e}`],i}confirmEmailOtp({code:e}){return this.request({method:"PUT",key:"otp",body:{code:e},headers:["otp"]})}async request({method:e,key:t,query:i,body:a,headers:n}){const{projectId:o,st:r,sv:c}=this.getSDKProperties(),l=new URL(`${s.o.W3M_API_URL}/auth/v1/${String(t)}`);l.searchParams.set("projectId",o),l.searchParams.set("st",r),l.searchParams.set("sv",c),i&&Object.entries(i).forEach(([e,t])=>l.searchParams.set(e,String(t)));const u=await fetch(l,{method:e,body:a?JSON.stringify(a):void 0,headers:Array.isArray(n)?n.reduce((e,t)=>{switch(t){case"nonce":e["x-nonce-jwt"]=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case"auth":e.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case"otp":this.otpUuid&&(e["x-otp"]=this.otpUuid)}return e},{}):void 0});if(!u.ok)throw new Error(await u.text());return u.headers.get("content-type")?.includes("application/json")?u.json():null}getStorageToken(e){return a.Ud.getItem(e)}setStorageToken(e,t){a.Ud.setItem(t,e)}clearStorageTokens(){this.otpUuid=null,a.Ud.removeItem(this.localAuthStorageKey),a.Ud.removeItem(this.localNonceStorageKey),this.emit("sessionChanged",void 0)}async getNonce(){const{nonce:e,token:t}=await this.request({method:"GET",key:"nonce"});return this.setStorageToken(t,this.localNonceStorageKey),e}getClientId(){return o.T.state.clientId}getWalletInfo(){const e=r.W.getAccountData()?.connectedWalletInfo;if(!e)return;if("social"in e&&"identifier"in e)return{type:"social",social:e.social,identifier:e.identifier};const{name:t,icon:i}=e;let a="unknown";switch(e.type){case"EXTERNAL":case"INJECTED":case"ANNOUNCED":a="extension";break;case"WALLET_CONNECT":a="walletconnect";break;default:a="unknown"}return{type:a,name:t,icon:i}}getSDKProperties(){return n.N._getSdkProperties()}emit(e,t){this.listeners[e].forEach(e=>e(t))}setAppKitAccountUser(e){const{email:t}=e;t&&Object.values(s.o.CHAIN).forEach(e=>{r.W.setAccountProp("user",{email:t},e)})}}},42715(e,t,i){i.r(t),i.d(t,{W3mDataCaptureOtpConfirmView:()=>x,W3mDataCaptureView:()=>E,W3mEmailSuffixesWidget:()=>l,W3mRecentEmailsWidget:()=>h});var a=i(12618),s=i(25707),n=i(70148);const o=a.AH`
  .email-sufixes {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-3xs);
    overflow-x: auto;
    max-width: 100%;
    margin-top: var(--wui-spacing-s);
    margin-bottom: calc(-1 * var(--wui-spacing-m));
    padding-bottom: var(--wui-spacing-m);
    margin-left: calc(-1 * var(--wui-spacing-m));
    margin-right: calc(-1 * var(--wui-spacing-m));
    padding-left: var(--wui-spacing-m);
    padding-right: var(--wui-spacing-m);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;var r=function(e,t,i,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};const c=["@gmail.com","@outlook.com","@yahoo.com","@hotmail.com","@aol.com","@icloud.com","@zoho.com"];let l=class extends a.WF{constructor(){super(...arguments),this.email=""}render(){const e=c.filter(this.filter.bind(this)).map(this.item.bind(this));return 0===e.length?null:a.qy`<div class="email-sufixes">${e}</div>`}filter(e){if(!this.email)return!1;const t=this.email.split("@");if(t.length<2)return!0;const i=t.pop();return e.includes(i)&&e!==`@${i}`}item(e){return a.qy`<wui-button variant="neutral" size="sm" @click=${()=>{const t=this.email.split("@");t.length>1&&t.pop();const i=t[0]+e;this.dispatchEvent(new CustomEvent("change",{detail:i,bubbles:!0,composed:!0}))}}
      >${e}</wui-button
    >`}};l.styles=[o],r([(0,s.MZ)()],l.prototype,"email",void 0),l=r([(0,n.EM)("w3m-email-suffixes-widget")],l);const u=a.AH`
  .recent-emails {
    display: flex;
    flex-direction: column;
    padding: var(--wui-spacing-s) 0;
    border-top: 1px solid var(--wui-color-gray-glass-005);
    border-bottom: 1px solid var(--wui-color-gray-glass-005);
  }

  .recent-emails-heading {
    margin-bottom: var(--wui-spacing-s);
  }

  .recent-emails-list-item {
    --wui-color-gray-glass-002: transparent;
  }
`;var d=function(e,t,i,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let h=class extends a.WF{constructor(){super(...arguments),this.emails=[]}render(){return 0===this.emails.length?null:a.qy`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`}item(e){return a.qy`<wui-list-item
      @click=${()=>{this.dispatchEvent(new CustomEvent("select",{detail:e,bubbles:!0,composed:!0}))}}
      ?chevron=${!0}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${e}</wui-text>
    </wui-list-item>`}};h.styles=[u],d([(0,s.MZ)()],h.prototype,"emails",void 0),h=d([(0,n.EM)("w3m-recent-emails-widget")],h);var p=i(57019),g=i(78508),m=i(6056),w=i(21871),f=i(15509),y=i(22799),v=function(e,t,i,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let x=class extends y.H{constructor(){super(...arguments),this.siwx=p.H.state.siwx,this.onOtpSubmit=async e=>{await this.siwx.confirmEmailOtp({code:e}),g.I.replace("SIWXSignMessage")},this.onOtpResend=async e=>{const t=m.W.getAccountData();if(!t?.caipAddress)throw new Error("No account data found");await this.siwx.requestEmailOtp({email:e,account:t.caipAddress})}}connectedCallback(){this.siwx&&this.siwx instanceof f.u||w.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}shouldSubmitOnOtpChange(){return this.otp.length===y.H.OTP_LENGTH}};v([(0,s.wk)()],x.prototype,"siwx",void 0),x=v([(0,n.EM)("w3m-data-capture-otp-confirm-view")],x);var b=i(46036);const k=a.AH`
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);

    transition-property: margin, height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    margin-top: -100px;

    &[data-state='loading'] {
      margin-top: 0px;
    }

    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 252px;
      width: 360px;
      background: radial-gradient(
        96.11% 53.95% at 50% 51.28%,
        transparent 0%,
        color-mix(in srgb, var(--wui-color-bg-100) 5%, transparent) 49%,
        color-mix(in srgb, var(--wui-color-bg-100) 65%, transparent) 99.43%
      );
    }
  }

  .hero-main-icon {
    width: 176px;
    transition-property: background-color;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      width: 56px;
    }
  }

  .hero-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
    flex-wrap: nowrap;
    min-width: fit-content;

    &:nth-child(1) {
      transform: translateX(-30px);
    }

    &:nth-child(2) {
      transform: translateX(30px);
    }

    &:nth-child(4) {
      transform: translateX(40px);
    }

    transition-property: height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    height: 68px;

    &[data-state='loading'] {
      height: 0px;
    }
  }

  .hero-row-icon {
    opacity: 0.1;
    transition-property: opacity;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      opacity: 0;
    }
  }
`;var S=function(e,t,i,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let E=class extends a.WF{constructor(){super(...arguments),this.email=g.I.state.data?.email??m.W.getAccountData()?.user?.email??"",this.address=m.W.getAccountData()?.address??"",this.loading=!1,this.appName=p.H.state.metadata?.name??"AppKit",this.siwx=p.H.state.siwx,this.isRequired=Array.isArray(p.H.state.remoteFeatures?.emailCapture)&&p.H.state.remoteFeatures?.emailCapture.includes("required"),this.recentEmails=this.getRecentEmails()}connectedCallback(){this.siwx&&this.siwx instanceof f.u||w.P.showError("ReownAuthentication is not initialized. Please contact support."),super.connectedCallback()}firstUpdated(){this.loading=!1,this.recentEmails=this.getRecentEmails(),this.email&&this.onSubmit()}render(){return a.qy`
      <wui-flex flexDirection="column" .padding=${["3xs","m","m","m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `}hero(){return a.qy`
      <div class="hero" data-state=${this.loading?"loading":"default"}>
        ${this.heroRow(["id","mail","wallet","x","solana","qrCode"])}
        ${this.heroRow(["mail","farcaster","wallet","discord","mobile","qrCode"])}
        <div class="hero-row">
          ${this.heroIcon("github")} ${this.heroIcon("bank")}
          <wui-icon-box
            size="xl"
            iconSize="xxl"
            iconColor=${this.loading?"fg-100":"accent-100"}
            backgroundColor=${this.loading?"fg-100":"accent-100"}
            icon=${this.loading?"id":"user"}
            isOpaque
            class="hero-main-icon"
            data-state=${this.loading?"loading":"default"}
          >
          </wui-icon-box>
          ${this.heroIcon("id")} ${this.heroIcon("card")}
        </div>
        ${this.heroRow(["google","id","github","verify","apple","mobile"])}
      </div>
    `}heroRow(e){return a.qy`
      <div class="hero-row" data-state=${this.loading?"loading":"default"}>
        ${e.map(this.heroIcon.bind(this))}
      </div>
    `}heroIcon(e){return a.qy`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${e}
        data-state=${this.loading?"loading":"default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `}paragraph(){return this.loading?a.qy`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${n.Zv.getTruncateString({string:this.address,charsEnd:4,charsStart:4,truncate:"middle"})} </wui-text
          >, please wait a moment.</wui-text
        >
      `:this.isRequired?a.qy`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `:a.qy`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `}emailInput(){if(this.loading)return null;const e=e=>{this.email=e.detail};return a.qy`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${e}
          @keydown=${e=>{"Enter"===e.key&&this.onSubmit()}}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${e}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `}recentEmailsWidget(){return 0===this.recentEmails.length||this.loading?null:a.qy`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${e=>{this.email=e.detail,this.onSubmit()}}
      ></w3m-recent-emails-widget>
    `}footerActions(){return a.qy`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired?null:a.qy`<wui-button
              size="lg"
              variant="neutral"
              fullWidth
              .disabled=${this.loading}
              @click=${this.onSkip.bind(this)}
              >Skip this step</wui-button
            >`}

        <wui-button
          size="lg"
          variant="main"
          type="submit"
          fullWidth
          .disabled=${!this.email||!this.isValidEmail(this.email)}
          .loading=${this.loading}
          @click=${this.onSubmit.bind(this)}
        >
          Continue
        </wui-button>
      </wui-flex>
    `}async onSubmit(){if(!(this.siwx instanceof f.u))return void w.P.showError("ReownAuthentication is not initialized. Please contact support.");const e=m.W.getActiveCaipAddress();if(!e)throw new Error("Account is not connected.");if(this.isValidEmail(this.email))try{this.loading=!0;const t=await this.siwx.requestEmailOtp({email:this.email,account:e});this.pushRecentEmail(this.email),null===t.uuid?g.I.replace("SIWXSignMessage"):g.I.replace("DataCaptureOtpConfirm",{email:this.email})}catch(e){w.P.showError("Failed to send email OTP"),this.loading=!1}else w.P.showError("Please provide a valid email.")}onSkip(){g.I.replace("SIWXSignMessage")}getRecentEmails(){const e=b.Ud.getItem(b.Ws.RECENT_EMAILS);return(e?e.split(","):[]).filter(this.isValidEmail.bind(this)).slice(0,3)}pushRecentEmail(e){const t=this.getRecentEmails(),i=Array.from(new Set([e,...t])).slice(0,3);b.Ud.setItem(b.Ws.RECENT_EMAILS,i.join(","))}isValidEmail(e){return/^\S+@\S+\.\S+$/u.test(e)}};E.styles=[k],S([(0,s.wk)()],E.prototype,"email",void 0),S([(0,s.wk)()],E.prototype,"address",void 0),S([(0,s.wk)()],E.prototype,"loading",void 0),S([(0,s.wk)()],E.prototype,"appName",void 0),S([(0,s.wk)()],E.prototype,"siwx",void 0),S([(0,s.wk)()],E.prototype,"isRequired",void 0),S([(0,s.wk)()],E.prototype,"recentEmails",void 0),E=S([(0,n.EM)("w3m-data-capture-view")],E)}}]);
//# sourceMappingURL=2715.bundle.js.map