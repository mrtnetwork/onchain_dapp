"use strict";(self.webpackChunkonchain_dapp_example=self.webpackChunkonchain_dapp_example||[]).push([[2676],{64951(o,e,t){t.r(e),t.d(e,{W3mTransactionsView:()=>a});var r=t(12618),n=t(70148);t(60310),t(95049);const i=r.AH`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let a=class extends r.WF{render(){return r.qy`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="3">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};a.styles=i,a=function(o,e,t,r){var n,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,t,r);else for(var s=o.length-1;s>=0;s--)(n=o[s])&&(a=(i<3?n(a):i>3?n(e,t,a):n(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a}([(0,n.EM)("w3m-transactions-view")],a)},77616(o,e,t){t(12851)},45101(o,e,t){var r=t(12618),n=t(25707),i=(t(10052),t(18409),t(26109)),a=t(43494);const s=t(67569).AH`
  button {
    border: none;
    background: transparent;
    height: 20px;
    padding: ${({spacing:o})=>o[2]};
    column-gap: ${({spacing:o})=>o[1]};
    border-radius: ${({borderRadius:o})=>o[1]};
    padding: 0 ${({spacing:o})=>o[1]};
    border-radius: ${({spacing:o})=>o[1]};
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent'] {
    color: ${({tokens:o})=>o.core.textAccentPrimary};
  }

  button[data-variant='secondary'] {
    color: ${({tokens:o})=>o.theme.textSecondary};
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[data-variant='accent']:focus-visible:enabled {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='accent']:hover:enabled {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:hover:enabled {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var c=function(o,e,t,r){var n,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,t,r);else for(var s=o.length-1;s>=0;s--)(n=o[s])&&(a=(i<3?n(a):i>3?n(e,t,a):n(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a};const d={sm:"sm-medium",md:"md-medium"},l={accent:"accent-primary",secondary:"secondary"};let u=class extends r.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return r.qy`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${l[this.variant]}
          variant=${d[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `}iconTemplate(){return this.icon?r.qy`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[i.W5,i.fD,s],c([(0,n.MZ)()],u.prototype,"size",void 0),c([(0,n.MZ)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,n.MZ)()],u.prototype,"variant",void 0),c([(0,n.MZ)()],u.prototype,"icon",void 0),u=c([(0,a.E)("wui-link")],u)},36887(o,e,t){var r=t(12618),n=t(25707),i=t(60031),a=t(26109),s=t(43494);const c=t(67569).AH`
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
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
    border-radius: ${({borderRadius:o})=>o[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:o})=>o[16]};
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
    background-color: ${({tokens:o})=>o.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:o})=>o[16]};
  }
`;var d=function(o,e,t,r){var n,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,t,r);else for(var s=o.length-1;s>=0;s--)(n=o[s])&&(a=(i<3?n(a):i>3?n(e,t,a):n(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a};let l=class extends r.WF{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.boxed=!1,this.rounded=!1,this.fullSize=!1}render(){const o={inherit:"inherit",xxs:"2",xs:"3",sm:"4",md:"4",mdl:"5",lg:"5",xl:"6",xxl:"7","3xl":"8","4xl":"9","5xl":"10"};return this.style.cssText=`\n      --local-width: ${this.size?`var(--apkt-spacing-${o[this.size]});`:"100%"};\n      --local-height: ${this.size?`var(--apkt-spacing-${o[this.size]});`:"100%"};\n      `,this.dataset.boxed=this.boxed?"true":"false",this.dataset.rounded=this.rounded?"true":"false",this.dataset.full=this.fullSize?"true":"false",this.dataset.icon=this.iconColor||"inherit",this.icon?r.qy`<wui-icon
        color=${this.iconColor||"inherit"}
        name=${this.icon}
        size="lg"
      ></wui-icon> `:this.logo?r.qy`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `:r.qy`<img src=${(0,i.J)(this.src)} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[a.W5,c],d([(0,n.MZ)()],l.prototype,"src",void 0),d([(0,n.MZ)()],l.prototype,"logo",void 0),d([(0,n.MZ)()],l.prototype,"icon",void 0),d([(0,n.MZ)()],l.prototype,"iconColor",void 0),d([(0,n.MZ)()],l.prototype,"alt",void 0),d([(0,n.MZ)()],l.prototype,"size",void 0),d([(0,n.MZ)({type:Boolean})],l.prototype,"boxed",void 0),d([(0,n.MZ)({type:Boolean})],l.prototype,"rounded",void 0),d([(0,n.MZ)({type:Boolean})],l.prototype,"fullSize",void 0),l=d([(0,s.E)("wui-image")],l)},12851(o,e,t){var r=t(12618),n=t(25707),i=t(60031),a=(t(10052),t(26109)),s=t(43494);const c=t(67569).AH`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({borderRadius:o})=>o[2]};
    padding: ${({spacing:o})=>o[1]} !important;
    background-color: ${({tokens:o})=>o.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({spacing:o})=>o[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({borderRadius:o})=>o[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({tokens:o})=>o.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({tokens:o})=>o.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({tokens:o})=>o.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({tokens:o})=>o.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({tokens:o})=>o.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({tokens:o})=>o.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({tokens:o})=>o.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({tokens:o})=>o.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({tokens:o})=>o.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({tokens:o})=>o.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({tokens:o})=>o.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({tokens:o})=>o.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`;var d=function(o,e,t,r){var n,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(o,e,t,r);else for(var s=o.length-1;s>=0;s--)(n=o[s])&&(a=(i<3?n(a):i>3?n(e,t,a):n(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a};let l=class extends r.WF{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,r.qy`
      <wui-icon size=${(0,i.J)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};l.styles=[a.W5,a.fD,c],d([(0,n.MZ)()],l.prototype,"icon",void 0),d([(0,n.MZ)()],l.prototype,"size",void 0),d([(0,n.MZ)()],l.prototype,"padding",void 0),d([(0,n.MZ)()],l.prototype,"color",void 0),l=d([(0,s.E)("wui-icon-box")],l)}}]);
//# sourceMappingURL=2676.bundle.js.map