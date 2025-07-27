/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e()}(this,(function(){"use strict";const t=new Map,e={set(e,i,n){t.has(e)||t.set(e,new Map);const s=t.get(e);s.has(i)||0===s.size?s.set(i,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)},get:(e,i)=>t.has(e)&&t.get(e).get(i)||null,remove(e,i){if(!t.has(e))return;const n=t.get(e);n.delete(i),0===n.size&&t.delete(e)}},i="transitionend",n=t=>(t&&window.CSS&&window.CSS.escape&&(t=t.replace(/#([^\s"#']+)/g,((t,e)=>`#${CSS.escape(e)}`))),t),s=t=>{t.dispatchEvent(new Event(i))},o=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(n(t)):null,a=t=>{if(!o(t)||0===t.getClientRects().length)return!1;const e="visible"===getComputedStyle(t).getPropertyValue("visibility"),i=t.closest("details:not([open])");if(!i)return e;if(i!==t){const e=t.closest("summary");if(e&&e.parentNode!==i)return!1;if(null===e)return!1}return e},l=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),c=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?c(t.parentNode):null},h=()=>{},d=t=>{t.offsetHeight},u=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,f=[],p=()=>"rtl"===document.documentElement.dir,m=t=>{var e;e=()=>{const e=u();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface)}},"loading"===document.readyState?(f.length||document.addEventListener("DOMContentLoaded",(()=>{for(const t of f)t()})),f.push(e)):e()},g=(t,e=[],i=t)=>"function"==typeof t?t(...e):i,_=(t,e,n=!0)=>{if(!n)return void g(t);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(e)+5;let r=!1;const a=({target:n})=>{n===e&&(r=!0,e.removeEventListener(i,a),g(t))};e.addEventListener(i,a),setTimeout((()=>{r||s(e)}),o)},b=(t,e,i,n)=>{const s=t.length;let o=t.indexOf(e);return-1===o?!i&&n?t[s-1]:t[0]:(o+=i?1:-1,n&&(o=(o+s)%s),t[Math.max(0,Math.min(o,s-1))])},v=/[^.]*(?=\..*)\.|.*/,y=/\..*/,w=/::\d+$/,A={};let E=1;const T={mouseenter:"mouseover",mouseleave:"mouseout"},C=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function O(t,e){return e&&`${e}::${E++}`||t.uidEvent||E++}function x(t){const e=O(t);return t.uidEvent=e,A[e]=A[e]||{},A[e]}function k(t,e,i=null){return Object.values(t).find((t=>t.callable===e&&t.delegationSelector===i))}function L(t,e,i){const n="string"==typeof e,s=n?i:e||i;let o=I(t);return C.has(o)||(o=t),[n,s,o]}function S(t,e,i,n,s){if("string"!=typeof e||!t)return;let[o,r,a]=L(e,i,n);if(e in T){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};r=t(r)}const l=x(t),c=l[a]||(l[a]={}),h=k(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=O(r,e.replace(v,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(const a of o)if(a===r)return P(s,{delegateTarget:r}),n.oneOff&&N.off(t,s.type,e,i),i.apply(r,[s])}}(t,i,r):function(t,e){return function i(n){return P(n,{delegateTarget:t}),i.oneOff&&N.off(t,n.type,e),e.apply(t,[n])}}(t,r);u.delegationSelector=o?i:null,u.callable=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function D(t,e,i,n,s){const o=k(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent])}function $(t,e,i,n){const s=e[i]||{};for(const[o,r]of Object.entries(s))o.includes(n)&&D(t,e,i,r.callable,r.delegationSelector)}function I(t){return t=t.replace(y,""),T[t]||t}const N={on(t,e,i,n){S(t,e,i,n,!1)},one(t,e,i,n){S(t,e,i,n,!0)},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=L(e,i,n),a=r!==e,l=x(t),c=l[r]||{},h=e.startsWith(".");if(void 0===o){if(h)for(const i of Object.keys(l))$(t,l,i,e.slice(1));for(const[i,n]of Object.entries(c)){const s=i.replace(w,"");a&&!e.includes(s)||D(t,l,r,n.callable,n.delegationSelector)}}else{if(!Object.keys(c).length)return;D(t,l,r,o,s?i:null)}},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=u();let s=null,o=!0,r=!0,a=!1;e!==I(e)&&n&&(s=n.Event(e,i),n(t).trigger(s),o=!s.isPropagationStopped(),r=!s.isImmediatePropagationStopped(),a=s.isDefaultPrevented());const l=P(new Event(e,{bubbles:o,cancelable:!0}),i);return a&&l.preventDefault(),r&&t.dispatchEvent(l),l.defaultPrevented&&s&&s.preventDefault(),l}};function P(t,e={}){for(const[i,n]of Object.entries(e))try{t[i]=n}catch(e){Object.defineProperty(t,i,{configurable:!0,get:()=>n})}return t}function j(t){if("true"===t)return!0;if("false"===t)return!1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch(e){return t}}function M(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}const F={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${M(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${M(e)}`)},getDataAttributes(t){if(!t)return{};const e={},i=Object.keys(t.dataset).filter((t=>t.startsWith("bs")&&!t.startsWith("bsConfig")));for(const n of i){let i=n.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1,i.length),e[i]=j(t.dataset[n])}return e},getDataAttribute:(t,e)=>j(t.getAttribute(`data-bs-${M(e)}`))};class H{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(t){return t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t}_mergeConfigObj(t,e){const i=o(e)?F.getDataAttribute(e,"config"):{};return{...this.constructor.Default,..."object"==typeof i?i:{},...o(e)?F.getDataAttributes(e):{},..."object"==typeof t?t:{}}}_typeCheckConfig(t,e=this.constructor.DefaultType){for(const[n,s]of Object.entries(e)){const e=t[n],r=o(e)?"element":null==(i=e)?`${i}`:Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(s).test(r))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${r}" but expected type "${s}".`)}var i}}class W extends H{constructor(t,i){super(),(t=r(t))&&(this._element=t,this._config=this._getConfig(i),e.set(this._element,this.constructor.DATA_KEY,this))}dispose(){e.remove(this._element,this.constructor.DATA_KEY),N.off(this._element,this.constructor.EVENT_KEY);for(const t of Object.getOwnPropertyNames(this))this[t]=null}_queueCallback(t,e,i=!0){_(t,e,i)}_getConfig(t){return t=this._mergeConfigObj(t,this._element),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}static getInstance(t){return e.get(r(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.3.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(t){return`${t}${this.EVENT_KEY}`}}const B=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e?e.split(",").map((t=>n(t))).join(","):null},z={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let n=t.parentNode.closest(e);for(;n;)i.push(n),n=n.parentNode.closest(e);return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(",");return this.find(e,t).filter((t=>!l(t)&&a(t)))},getSelectorFromElement(t){const e=B(t);return e&&z.findOne(e)?e:null},getElementFromSelector(t){const e=B(t);return e?z.findOne(e):null},getMultipleElementsFromSelector(t){const e=B(t);return e?z.find(e):[]}},R=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,n=t.NAME;N.on(document,i,`[data-bs-dismiss="${n}"]`,(function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),l(this))return;const s=z.getElementFromSelector(this)||this.closest(`.${n}`);t.getOrCreateInstance(s)[e]()}))},q=".bs.alert",V=`close${q}`,K=`closed${q}`;class Q extends W{static get NAME(){return"alert"}close(){if(N.trigger(this._element,V).defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,t)}_destroyElement(){this._element.remove(),N.trigger(this._element,K),this.dispose()}static jQueryInterface(t){return this.each((function(){const e=Q.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}R(Q,"close"),m(Q);const X='[data-bs-toggle="button"]';class Y extends W{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){const e=Y.getOrCreateInstance(this);"toggle"===t&&e[t]()}))}}N.on(document,"click.bs.button.data-api",X,(t=>{t.preventDefault();const e=t.target.closest(X);Y.getOrCreateInstance(e).toggle()})),m(Y);const U=".bs.swipe",G=`touchstart${U}`,J=`touchmove${U}`,Z=`touchend${U}`,tt=`pointerdown${U}`,et=`pointerup${U}`,it={endCallback:null,leftCallback:null,rightCallback:null},nt={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class st extends H{constructor(t,e){super(),this._element=t,t&&st.isSupported()&&(this._config=this._getConfig(e),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents())}static get Default(){return it}static get DefaultType(){return nt}static get NAME(){return"swipe"}dispose(){N.off(this._element,U)}_start(t){this._supportPointerEvents?this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX):this._deltaX=t.touches[0].clientX}_end(t){this._eventIsPointerPenTouch(t)&&(this._deltaX=t.clientX-this._deltaX),this._handleSwipe(),g(this._config.endCallback)}_move(t){this._deltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this._deltaX}_handleSwipe(){const t=Math.abs(this._deltaX);if(t<=40)return;const e=t/this._deltaX;this._deltaX=0,e&&g(e>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(N.on(this._element,tt,(t=>this._start(t))),N.on(this._element,et,(t=>this._end(t))),this._element.classList.add("pointer-event")):(N.on(this._element,G,(t=>this._start(t))),N.on(this._element,J,(t=>this._move(t))),N.on(this._element,Z,(t=>this._end(t))))}_eventIsPointerPenTouch(t){return this._supportPointerEvents&&("pen"===t.pointerType||"touch"===t.pointerType)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const ot=".bs.carousel",rt=".data-api",at="next",lt="prev",ct="left",ht="right",dt=`slide${ot}`,ut=`slid${ot}`,ft=`keydown${ot}`,pt=`mouseenter${ot}`,mt=`mouseleave${ot}`,gt=`dragstart${ot}`,_t=`load${ot}${rt}`,bt=`click${ot}${rt}`,vt="carousel",yt="active",wt=".active",At=".carousel-item",Et=wt+At,Tt={ArrowLeft:ht,ArrowRight:ct},Ct={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Ot={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class xt extends W{constructor(t,e){super(t,e),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=z.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===vt&&this.cycle()}static get Default(){return Ct}static get DefaultType(){return Ot}static get NAME(){return"carousel"}next(){this._slide(at)}nextWhenVisible(){!document.hidden&&a(this._element)&&this.next()}prev(){this._slide(lt)}pause(){this._isSliding&&s(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?N.one(this._element,ut,(()=>this.cycle())):this.cycle())}to(t){const e=this._getItems();if(t>e.length-1||t<0)return;if(this._isSliding)return void N.one(this._element,ut,(()=>this.to(t)));const i=this._getItemIndex(this._getActive());if(i===t)return;const n=t>i?at:lt;this._slide(n,e[t])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(t){return t.defaultInterval=t.interval,t}_addEventListeners(){this._config.keyboard&&N.on(this._element,ft,(t=>this._keydown(t))),"hover"===this._config.pause&&(N.on(this._element,pt,(()=>this.pause())),N.on(this._element,mt,(()=>this._maybeEnableCycle()))),this._config.touch&&st.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const t of z.find(".carousel-item img",this._element))N.on(t,gt,(t=>t.preventDefault()));const t={leftCallback:()=>this._slide(this._directionToOrder(ct)),rightCallback:()=>this._slide(this._directionToOrder(ht)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval))}};this._swipeHelper=new st(this._element,t)}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=Tt[t.key];e&&(t.preventDefault(),this._slide(this._directionToOrder(e)))}_getItemIndex(t){return this._getItems().indexOf(t)}_setActiveIndicatorElement(t){if(!this._indicatorsElement)return;const e=z.findOne(wt,this._indicatorsElement);e.classList.remove(yt),e.removeAttribute("aria-current");const i=z.findOne(`[data-bs-slide-to="${t}"]`,this._indicatorsElement);i&&(i.classList.add(yt),i.setAttribute("aria-current","true"))}_updateInterval(){const t=this._activeElement||this._getActive();if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);this._config.interval=e||this._config.defaultInterval}_slide(t,e=null){if(this._isSliding)return;const i=this._getActive(),n=t===at,s=e||b(this._getItems(),i,n,this._config.wrap);if(s===i)return;const o=this._getItemIndex(s),r=e=>N.trigger(this._element,e,{relatedTarget:s,direction:this._orderToDirection(t),from:this._getItemIndex(i),to:o});if(r(dt).defaultPrevented)return;if(!i||!s)return;const a=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const l=n?"carousel-item-start":"carousel-item-end",c=n?"carousel-item-next":"carousel-item-prev";s.classList.add(c),d(s),i.classList.add(l),s.classList.add(l),this._queueCallback((()=>{s.classList.remove(l,c),s.classList.add(yt),i.classList.remove(yt,c,l),this._isSliding=!1,r(ut)}),i,this._isAnimated()),a&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return z.findOne(Et,this._element)}_getItems(){return z.find(At,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return p()?t===ct?lt:at:t===ct?at:lt}_orderToDirection(t){return p()?t===lt?ct:ht:t===lt?ht:ct}static jQueryInterface(t){return this.each((function(){const e=xt.getOrCreateInstance(this,t);if("number"!=typeof t){if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}else e.to(t)}))}}N.on(document,bt,"[data-bs-slide], [data-bs-slide-to]",(function(t){const e=z.getElementFromSelector(this);if(!e||!e.classList.contains(vt))return;t.preventDefault();const i=xt.getOrCreateInstance(e),n=this.getAttribute("data-bs-slide-to");return n?(i.to(n),void i._maybeEnableCycle()):"next"===F.getDataAttribute(this,"slide")?(i.next(),void i._maybeEnableCycle()):(i.prev(),void i._maybeEnableCycle())})),N.on(window,_t,(()=>{const t=z.find('[data-bs-ride="carousel"]');for(const e of t)xt.getOrCreateInstance(e)})),m(xt);const kt=".bs.collapse",Lt=`show${kt}`,St=`shown${kt}`,Dt=`hide${kt}`,$t=`hidden${kt}`,It=`click${kt}.data-api`,Nt="show",Pt="collapse",jt="collapsing",Mt=`:scope .${Pt} .${Pt}`,Ft='[data-bs-toggle="collapse"]',Ht={parent:null,toggle:!0},Wt={parent:"(null|element)",toggle:"boolean"};class Bt extends W{constructor(t,e){super(t,e),this._isTransitioning=!1,this._triggerArray=[];const i=z.find(Ft);for(const t of i){const e=z.getSelectorFromElement(t),i=z.find(e).filter((t=>t===this._element));null!==e&&i.length&&this._triggerArray.push(t)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Ht}static get DefaultType(){return Wt}static get NAME(){return"collapse"}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t=[];if(this._config.parent&&(t=this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t=>t!==this._element)).map((t=>Bt.getOrCreateInstance(t,{toggle:!1})))),t.length&&t[0]._isTransitioning)return;if(N.trigger(this._element,Lt).defaultPrevented)return;for(const e of t)e.hide();const e=this._getDimension();this._element.classList.remove(Pt),this._element.classList.add(jt),this._element.style[e]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=`scroll${e[0].toUpperCase()+e.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(jt),this._element.classList.add(Pt,Nt),this._element.style[e]="",N.trigger(this._element,St)}),this._element,!0),this._element.style[e]=`${this._element[i]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(N.trigger(this._element,Dt).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,d(this._element),this._element.classList.add(jt),this._element.classList.remove(Pt,Nt);for(const t of this._triggerArray){const e=z.getElementFromSelector(t);e&&!this._isShown(e)&&this._addAriaAndCollapsedClass([t],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(jt),this._element.classList.add(Pt),N.trigger(this._element,$t)}),this._element,!0)}_isShown(t=this._element){return t.classList.contains(Nt)}_configAfterMerge(t){return t.toggle=Boolean(t.toggle),t.parent=r(t.parent),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=this._getFirstLevelChildren(Ft);for(const e of t){const t=z.getElementFromSelector(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t))}}_getFirstLevelChildren(t){const e=z.find(Mt,this._config.parent);return z.find(t,this._config.parent).filter((t=>!e.includes(t)))}_addAriaAndCollapsedClass(t,e){if(t.length)for(const i of t)i.classList.toggle("collapsed",!e),i.setAttribute("aria-expanded",e)}static jQueryInterface(t){const e={};return"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1),this.each((function(){const i=Bt.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}}))}}N.on(document,It,Ft,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();for(const t of z.getMultipleElementsFromSelector(this))Bt.getOrCreateInstance(t,{toggle:!1}).toggle()})),m(Bt);var zt="top",Rt="bottom",qt="right",Vt="left",Kt="auto",Qt=[zt,Rt,qt,Vt],Xt="start",Yt="end",Ut="clippingParents",Gt="viewport",Jt="popper",Zt="reference",te=Qt.reduce((function(t,e){return t.concat([e+"-"+Xt,e+"-"+Yt])}),[]),ee=[].concat(Qt,[Kt]).reduce((function(t,e){return t.concat([e,e+"-"+Xt,e+"-"+Yt])}),[]),ie="beforeRead",ne="read",se="afterRead",oe="beforeMain",re="main",ae="afterMain",le="beforeWrite",ce="write",he="afterWrite",de=[ie,ne,se,oe,re,ae,le,ce,he];function ue(t){return t?(t.nodeName||"").toLowerCase():null}function fe(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function pe(t){return t instanceof fe(t).Element||t instanceof Element}function me(t){return t instanceof fe(t).HTMLElement||t instanceof HTMLElement}function ge(t){return"undefined"!=typeof ShadowRoot&&(t instanceof fe(t).ShadowRoot||t instanceof ShadowRoot)}const _e={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];me(s)&&ue(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});me(n)&&ue(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]};function be(t){return t.split("-")[0]}var ve=Math.max,ye=Math.min,we=Math.round;function Ae(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function Ee(){return!/^((?!chrome|android).)*safari/i.test(Ae())}function Te(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=!1);var n=t.getBoundingClientRect(),s=1,o=1;e&&me(t)&&(s=t.offsetWidth>0&&we(n.width)/t.offsetWidth||1,o=t.offsetHeight>0&&we(n.height)/t.offsetHeight||1);var r=(pe(t)?fe(t):window).visualViewport,a=!Ee()&&i,l=(n.left+(a&&r?r.offsetLeft:0))/s,c=(n.top+(a&&r?r.offsetTop:0))/o,h=n.width/s,d=n.height/o;return{width:h,height:d,top:c,right:l+h,bottom:c+d,left:l,x:l,y:c}}function Ce(t){var e=Te(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function Oe(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&ge(i)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function xe(t){return fe(t).getComputedStyle(t)}function ke(t){return["table","td","th"].indexOf(ue(t))>=0}function Le(t){return((pe(t)?t.ownerDocument:t.document)||window.document).documentElement}function Se(t){return"html"===ue(t)?t:t.assignedSlot||t.parentNode||(ge(t)?t.host:null)||Le(t)}function De(t){return me(t)&&"fixed"!==xe(t).position?t.offsetParent:null}function $e(t){for(var e=fe(t),i=De(t);i&&ke(i)&&"static"===xe(i).position;)i=De(i);return i&&("html"===ue(i)||"body"===ue(i)&&"static"===xe(i).position)?e:i||function(t){var e=/firefox/i.test(Ae());if(/Trident/i.test(Ae())&&me(t)&&"fixed"===xe(t).position)return null;var i=Se(t);for(ge(i)&&(i=i.host);me(i)&&["html","body"].indexOf(ue(i))<0;){var n=xe(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode}return null}(t)||e}function Ie(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function Ne(t,e,i){return ve(t,ye(e,i))}function Pe(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function je(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}const Me={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=be(i.placement),l=Ie(a),c=[Vt,qt].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return Pe("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:je(t,Qt))}(s.padding,i),d=Ce(o),u="y"===l?zt:Vt,f="y"===l?Rt:qt,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],m=r[l]-i.rects.reference[l],g=$e(o),_=g?"y"===l?g.clientHeight||0:g.clientWidth||0:0,b=p/2-m/2,v=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+b,A=Ne(v,w,y),E=l;i.modifiersData[n]=((e={})[E]=A,e.centerOffset=A-w,e)}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&Oe(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Fe(t){return t.split("-")[1]}var He={top:"auto",right:"auto",bottom:"auto",left:"auto"};function We(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.variation,r=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,h=t.roundOffsets,d=t.isFixed,u=r.x,f=void 0===u?0:u,p=r.y,m=void 0===p?0:p,g="function"==typeof h?h({x:f,y:m}):{x:f,y:m};f=g.x,m=g.y;var _=r.hasOwnProperty("x"),b=r.hasOwnProperty("y"),v=Vt,y=zt,w=window;if(c){var A=$e(i),E="clientHeight",T="clientWidth";A===fe(i)&&"static"!==xe(A=Le(i)).position&&"absolute"===a&&(E="scrollHeight",T="scrollWidth"),(s===zt||(s===Vt||s===qt)&&o===Yt)&&(y=Rt,m-=(d&&A===w&&w.visualViewport?w.visualViewport.height:A[E])-n.height,m*=l?1:-1),s!==Vt&&(s!==zt&&s!==Rt||o!==Yt)||(v=qt,f-=(d&&A===w&&w.visualViewport?w.visualViewport.width:A[T])-n.width,f*=l?1:-1)}var C,O=Object.assign({position:a},c&&He),x=!0===h?function(t,e){var i=t.x,n=t.y,s=e.devicePixelRatio||1;return{x:we(i*s)/s||0,y:we(n*s)/s||0}}({x:f,y:m},fe(i)):{x:f,y:m};return f=x.x,m=x.y,l?Object.assign({},O,((C={})[y]=b?"0":"",C[v]=_?"0":"",C.transform=(w.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",C)):Object.assign({},O,((e={})[y]=b?m+"px":"",e[v]=_?f+"px":"",e.transform="",e))}const Be={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:be(e.placement),variation:Fe(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,We(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,We(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var ze={passive:!0};const Re={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=fe(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,ze)})),a&&l.addEventListener("resize",i.update,ze),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,ze)})),a&&l.removeEventListener("resize",i.update,ze)}},data:{}};var qe={left:"right",right:"left",bottom:"top",top:"bottom"};function Ve(t){return t.replace(/left|right|bottom|top/g,(function(t){return qe[t]}))}var Ke={start:"end",end:"start"};function Qe(t){return t.replace(/start|end/g,(function(t){return Ke[t]}))}function Xe(t){var e=fe(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Ye(t){return Te(Le(t)).left+Xe(t).scrollLeft}function Ue(t){var e=xe(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(i+s+n)}function Ge(t){return["html","body","#document"].indexOf(ue(t))>=0?t.ownerDocument.body:me(t)&&Ue(t)?t:Ge(Se(t))}function Je(t,e){var i;void 0===e&&(e=[]);var n=Ge(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=fe(n),r=s?[o].concat(o.visualViewport||[],Ue(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Je(Se(r)))}function Ze(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function ti(t,e,i){return e===Gt?Ze(function(t,e){var i=fe(t),n=Le(t),s=i.visualViewport,o=n.clientWidth,r=n.clientHeight,a=0,l=0;if(s){o=s.width,r=s.height;var c=Ee();(c||!c&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}return{width:o,height:r,x:a+Ye(t),y:l}}(t,i)):pe(e)?function(t,e){var i=Te(t,!1,"fixed"===e);return i.top=i.top+t.clientTop,i.left=i.left+t.clientLeft,i.bottom=i.top+t.clientHeight,i.right=i.left+t.clientWidth,i.width=t.clientWidth,i.height=t.clientHeight,i.x=i.left,i.y=i.top,i}(e,i):Ze(function(t){var e,i=Le(t),n=Xe(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=ve(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=ve(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+Ye(t),l=-n.scrollTop;return"rtl"===xe(s||i).direction&&(a+=ve(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(Le(t)))}function ei(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?be(s):null,r=s?Fe(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case zt:e={x:a,y:i.y-n.height};break;case Rt:e={x:a,y:i.y+i.height};break;case qt:e={x:i.x+i.width,y:l};break;case Vt:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y}}var c=o?Ie(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case Xt:e[c]=e[c]-(i[h]/2-n[h]/2);break;case Yt:e[c]=e[c]+(i[h]/2-n[h]/2)}}return e}function ii(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.strategy,r=void 0===o?t.strategy:o,a=i.boundary,l=void 0===a?Ut:a,c=i.rootBoundary,h=void 0===c?Gt:c,d=i.elementContext,u=void 0===d?Jt:d,f=i.altBoundary,p=void 0!==f&&f,m=i.padding,g=void 0===m?0:m,_=Pe("number"!=typeof g?g:je(g,Qt)),b=u===Jt?Zt:Jt,v=t.rects.popper,y=t.elements[p?b:u],w=function(t,e,i,n){var s="clippingParents"===e?function(t){var e=Je(Se(t)),i=["absolute","fixed"].indexOf(xe(t).position)>=0&&me(t)?$e(t):t;return pe(i)?e.filter((function(t){return pe(t)&&Oe(t,i)&&"body"!==ue(t)})):[]}(t):[].concat(e),o=[].concat(s,[i]),r=o[0],a=o.reduce((function(e,i){var s=ti(t,i,n);return e.top=ve(s.top,e.top),e.right=ye(s.right,e.right),e.bottom=ye(s.bottom,e.bottom),e.left=ve(s.left,e.left),e}),ti(t,r,n));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(pe(y)?y:y.contextElement||Le(t.elements.popper),l,h,r),A=Te(t.elements.reference),E=ei({reference:A,element:v,strategy:"absolute",placement:s}),T=Ze(Object.assign({},v,E)),C=u===Jt?T:A,O={top:w.top-C.top+_.top,bottom:C.bottom-w.bottom+_.bottom,left:w.left-C.left+_.left,right:C.right-w.right+_.right},x=t.modifiersData.offset;if(u===Jt&&x){var k=x[s];Object.keys(O).forEach((function(t){var e=[qt,Rt].indexOf(t)>=0?1:-1,i=[zt,Rt].indexOf(t)>=0?"y":"x";O[t]+=k[i]*e}))}return O}function ni(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?ee:l,h=Fe(n),d=h?a?te:te.filter((function(t){return Fe(t)===h})):Qt,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=ii(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[be(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}const si={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,m=i.allowedAutoPlacements,g=e.options.placement,_=be(g),b=l||(_!==g&&p?function(t){if(be(t)===Kt)return[];var e=Ve(t);return[Qe(t),e,Qe(e)]}(g):[Ve(g)]),v=[g].concat(b).reduce((function(t,i){return t.concat(be(i)===Kt?ni(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:m}):i)}),[]),y=e.rects.reference,w=e.rects.popper,A=new Map,E=!0,T=v[0],C=0;C<v.length;C++){var O=v[C],x=be(O),k=Fe(O)===Xt,L=[zt,Rt].indexOf(x)>=0,S=L?"width":"height",D=ii(e,{placement:O,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),$=L?k?qt:Vt:k?Rt:zt;y[S]>w[S]&&($=Ve($));var I=Ve($),N=[];if(o&&N.push(D[x]<=0),a&&N.push(D[$]<=0,D[I]<=0),N.every((function(t){return t}))){T=O,E=!1;break}A.set(O,N)}if(E)for(var P=function(t){var e=v.find((function(e){var i=A.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},j=p?3:1;j>0&&"break"!==P(j);j--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function oi(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function ri(t){return[zt,qt,Rt,Vt].some((function(e){return t[e]>=0}))}const ai={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=ii(e,{elementContext:"reference"}),a=ii(e,{altBoundary:!0}),l=oi(r,n),c=oi(a,s,o),h=ri(l),d=ri(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d})}},li={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=ee.reduce((function(t,i){return t[i]=function(t,e,i){var n=be(t),s=[Vt,zt].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[Vt,qt].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r}},ci={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=ei({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},hi={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,m=void 0===p?0:p,g=ii(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=be(e.placement),b=Fe(e.placement),v=!b,y=Ie(_),w="x"===y?"y":"x",A=e.modifiersData.popperOffsets,E=e.rects.reference,T=e.rects.popper,C="function"==typeof m?m(Object.assign({},e.rects,{placement:e.placement})):m,O="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),x=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,k={x:0,y:0};if(A){if(o){var L,S="y"===y?zt:Vt,D="y"===y?Rt:qt,$="y"===y?"height":"width",I=A[y],N=I+g[S],P=I-g[D],j=f?-T[$]/2:0,M=b===Xt?E[$]:T[$],F=b===Xt?-T[$]:-E[$],H=e.elements.arrow,W=f&&H?Ce(H):{width:0,height:0},B=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},z=B[S],R=B[D],q=Ne(0,E[$],W[$]),V=v?E[$]/2-j-q-z-O.mainAxis:M-q-z-O.mainAxis,K=v?-E[$]/2+j+q+R+O.mainAxis:F+q+R+O.mainAxis,Q=e.elements.arrow&&$e(e.elements.arrow),X=Q?"y"===y?Q.clientTop||0:Q.clientLeft||0:0,Y=null!=(L=null==x?void 0:x[y])?L:0,U=I+K-Y,G=Ne(f?ye(N,I+V-Y-X):N,I,f?ve(P,U):P);A[y]=G,k[y]=G-I}if(a){var J,Z="x"===y?zt:Vt,tt="x"===y?Rt:qt,et=A[w],it="y"===w?"height":"width",nt=et+g[Z],st=et-g[tt],ot=-1!==[zt,Vt].indexOf(_),rt=null!=(J=null==x?void 0:x[w])?J:0,at=ot?nt:et-E[it]-T[it]-rt+O.altAxis,lt=ot?et+E[it]+T[it]-rt-O.altAxis:st,ct=f&&ot?function(t,e,i){var n=Ne(t,e,i);return n>i?i:n}(at,et,lt):Ne(f?at:nt,et,f?lt:st);A[w]=ct,k[w]=ct-et}e.modifiersData[n]=k}},requiresIfExists:["offset"]};function di(t,e,i){void 0===i&&(i=!1);var n,s,o=me(e),r=me(e)&&function(t){var e=t.getBoundingClientRect(),i=we(e.width)/t.offsetWidth||1,n=we(e.height)/t.offsetHeight||1;return 1!==i||1!==n}(e),a=Le(e),l=Te(t,r,i),c={scrollLeft:0,scrollTop:0},h={x:0,y:0};return(o||!o&&!i)&&(("body"!==ue(e)||Ue(a))&&(c=(n=e)!==fe(n)&&me(n)?{scrollLeft:(s=n).scrollLeft,scrollTop:s.scrollTop}:Xe(n)),me(e)?((h=Te(e,!0)).x+=e.clientLeft,h.y+=e.clientTop):a&&(h.x=Ye(a))),{x:l.left+c.scrollLeft-h.x,y:l.top+c.scrollTop-h.y,width:l.width,height:l.height}}function ui(t){var e=new Map,i=new Set,n=[];function s(t){i.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!i.has(t)){var n=e.get(t);n&&s(n)}})),n.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){i.has(t.name)||s(t)})),n}var fi={placement:"bottom",modifiers:[],strategy:"absolute"};function pi(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function mi(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?fi:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},fi,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){var s="function"==typeof i?i(a.options):i;d(),a.options=Object.assign({},o,a.options,s),a.scrollParents={reference:pe(t)?Je(t):t.contextElement?Je(t.contextElement):[],popper:Je(e)};var r,c,u=function(t){var e=ui(t);return de.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((r=[].concat(n,a.options.modifiers),c=r.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){})}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(pi(e,i)){a.rects={reference:di(e,$e(i),"fixed"===a.options.strategy),popper:Ce(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a)}else a.reset=!1,n=-1}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a)}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s())}))}))),r}),destroy:function(){d(),c=!0}};if(!pi(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t)})),h}}var gi=mi(),_i=mi({defaultModifiers:[Re,ci,Be,_e]}),bi=mi({defaultModifiers:[Re,ci,Be,_e,li,si,hi,Me,ai]});const vi=Object.freeze(Object.defineProperty({__proto__:null,afterMain:ae,afterRead:se,afterWrite:he,applyStyles:_e,arrow:Me,auto:Kt,basePlacements:Qt,beforeMain:oe,beforeRead:ie,beforeWrite:le,bottom:Rt,clippingParents:Ut,computeStyles:Be,createPopper:bi,createPopperBase:gi,createPopperLite:_i,detectOverflow:ii,end:Yt,eventListeners:Re,flip:si,hide:ai,left:Vt,main:re,modifierPhases:de,offset:li,placements:ee,popper:Jt,popperGenerator:mi,popperOffsets:ci,preventOverflow:hi,read:ne,reference:Zt,right:qt,start:Xt,top:zt,variationPlacements:te,viewport:Gt,write:ce},Symbol.toStringTag,{value:"Module"})),yi="dropdown",wi=".bs.dropdown",Ai=".data-api",Ei="ArrowUp",Ti="ArrowDown",Ci=`hide${wi}`,Oi=`hidden${wi}`,xi=`show${wi}`,ki=`shown${wi}`,Li=`click${wi}${Ai}`,Si=`keydown${wi}${Ai}`,Di=`keyup${wi}${Ai}`,$i="show",Ii='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',Ni=`${Ii}.${$i}`,Pi=".dropdown-menu",ji=p()?"top-end":"top-start",Mi=p()?"top-start":"top-end",Fi=p()?"bottom-end":"bottom-start",Hi=p()?"bottom-start":"bottom-end",Wi=p()?"left-start":"right-start",Bi=p()?"right-start":"left-start",zi={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Ri={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class qi extends W{constructor(t,e){super(t,e),this._popper=null,this._parent=this._element.parentNode,this._menu=z.next(this._element,Pi)[0]||z.prev(this._element,Pi)[0]||z.findOne(Pi,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return zi}static get DefaultType(){return Ri}static get NAME(){return yi}toggle(){return this._isShown()?this.hide():this.show()}show(){if(l(this._element)||this._isShown())return;const t={relatedTarget:this._element};if(!N.trigger(this._element,xi,t).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const t of[].concat(...document.body.children))N.on(t,"mouseover",h);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add($i),this._element.classList.add($i),N.trigger(this._element,ki,t)}}hide(){if(l(this._element)||!this._isShown())return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){if(!N.trigger(this._element,Ci,t).defaultPrevented){if("ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.off(t,"mouseover",h);this._popper&&this._popper.destroy(),this._menu.classList.remove($i),this._element.classList.remove($i),this._element.setAttribute("aria-expanded","false"),F.removeDataAttribute(this._menu,"popper"),N.trigger(this._element,Oi,t)}}_getConfig(t){if("object"==typeof(t=super._getConfig(t)).reference&&!o(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${yi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(){if(void 0===vi)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let t=this._element;"parent"===this._config.reference?t=this._parent:o(this._config.reference)?t=r(this._config.reference):"object"==typeof this._config.reference&&(t=this._config.reference);const e=this._getPopperConfig();this._popper=bi(t,this._menu,e)}_isShown(){return this._menu.classList.contains($i)}_getPlacement(){const t=this._parent;if(t.classList.contains("dropend"))return Wi;if(t.classList.contains("dropstart"))return Bi;if(t.classList.contains("dropup-center"))return"top";if(t.classList.contains("dropdown-center"))return"bottom";const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?Mi:ji:e?Hi:Fi}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||"static"===this._config.display)&&(F.setDataAttribute(this._menu,"popper","static"),t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,...g(this._config.popperConfig,[t])}}_selectMenuItem({key:t,target:e}){const i=z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter((t=>a(t)));i.length&&b(i,e,t===Ti,!i.includes(e)).focus()}static jQueryInterface(t){return this.each((function(){const e=qi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}static clearMenus(t){if(2===t.button||"keyup"===t.type&&"Tab"!==t.key)return;const e=z.find(Ni);for(const i of e){const e=qi.getInstance(i);if(!e||!1===e._config.autoClose)continue;const n=t.composedPath(),s=n.includes(e._menu);if(n.includes(e._element)||"inside"===e._config.autoClose&&!s||"outside"===e._config.autoClose&&s)continue;if(e._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;const o={relatedTarget:e._element};"click"===t.type&&(o.clickEvent=t),e._completeHide(o)}}static dataApiKeydownHandler(t){const e=/input|textarea/i.test(t.target.tagName),i="Escape"===t.key,n=[Ei,Ti].includes(t.key);if(!n&&!i)return;if(e&&!i)return;t.preventDefault();const s=this.matches(Ii)?this:z.prev(this,Ii)[0]||z.next(this,Ii)[0]||z.findOne(Ii,t.delegateTarget.parentNode),o=qi.getOrCreateInstance(s);if(n)return t.stopPropagation(),o.show(),void o._selectMenuItem(t);o._isShown()&&(t.stopPropagation(),o.hide(),s.focus())}}N.on(document,Si,Ii,qi.dataApiKeydownHandler),N.on(document,Si,Pi,qi.dataApiKeydownHandler),N.on(document,Li,qi.clearMenus),N.on(document,Di,qi.clearMenus),N.on(document,Li,Ii,(function(t){t.preventDefault(),qi.getOrCreateInstance(this).toggle()})),m(qi);const Vi="backdrop",Ki="show",Qi=`mousedown.bs.${Vi}`,Xi={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},Yi={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Ui extends H{constructor(t){super(),this._config=this._getConfig(t),this._isAppended=!1,this._element=null}static get Default(){return Xi}static get DefaultType(){return Yi}static get NAME(){return Vi}show(t){if(!this._config.isVisible)return void g(t);this._append();const e=this._getElement();this._config.isAnimated&&d(e),e.classList.add(Ki),this._emulateAnimation((()=>{g(t)}))}hide(t){this._config.isVisible?(this._getElement().classList.remove(Ki),this._emulateAnimation((()=>{this.dispose(),g(t)}))):g(t)}dispose(){this._isAppended&&(N.off(this._element,Qi),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_configAfterMerge(t){return t.rootElement=r(t.rootElement),t}_append(){if(this._isAppended)return;const t=this._getElement();this._config.rootElement.append(t),N.on(t,Qi,(()=>{g(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(t){_(t,this._getElement(),this._config.isAnimated)}}const Gi=".bs.focustrap",Ji=`focusin${Gi}`,Zi=`keydown.tab${Gi}`,tn="backward",en={autofocus:!0,trapElement:null},nn={autofocus:"boolean",trapElement:"element"};class sn extends H{constructor(t){super(),this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return en}static get DefaultType(){return nn}static get NAME(){return"focustrap"}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),N.off(document,Gi),N.on(document,Ji,(t=>this._handleFocusin(t))),N.on(document,Zi,(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,N.off(document,Gi))}_handleFocusin(t){const{trapElement:e}=this._config;if(t.target===document||t.target===e||e.contains(t.target))return;const i=z.focusableChildren(e);0===i.length?e.focus():this._lastTabNavDirection===tn?i[i.length-1].focus():i[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?tn:"forward")}}const on=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",rn=".sticky-top",an="padding-right",ln="margin-right";class cn{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,an,(e=>e+t)),this._setElementAttributes(on,an,(e=>e+t)),this._setElementAttributes(rn,ln,(e=>e-t))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,an),this._resetElementAttributes(on,an),this._resetElementAttributes(rn,ln)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e,`${i(Number.parseFloat(s))}px`)}))}_saveInitialAttribute(t,e){const i=t.style.getPropertyValue(e);i&&F.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=F.getDataAttribute(t,e);null!==i?(F.removeDataAttribute(t,e),t.style.setProperty(e,i)):t.style.removeProperty(e)}))}_applyManipulationCallback(t,e){if(o(t))e(t);else for(const i of z.find(t,this._element))e(i)}}const hn=".bs.modal",dn=`hide${hn}`,un=`hidePrevented${hn}`,fn=`hidden${hn}`,pn=`show${hn}`,mn=`shown${hn}`,gn=`resize${hn}`,_n=`click.dismiss${hn}`,bn=`mousedown.dismiss${hn}`,vn=`keydown.dismiss${hn}`,yn=`click${hn}.data-api`,wn="modal-open",An="show",En="modal-static",Tn={backdrop:!0,focus:!0,keyboard:!0},Cn={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class On extends W{constructor(t,e){super(t,e),this._dialog=z.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new cn,this._addEventListeners()}static get Default(){return Tn}static get DefaultType(){return Cn}static get NAME(){return"modal"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||N.trigger(this._element,pn,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(wn),this._adjustDialog(),this._backdrop.show((()=>this._showElement(t))))}hide(){this._isShown&&!this._isTransitioning&&(N.trigger(this._element,dn).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(An),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())))}dispose(){N.off(window,hn),N.off(this._dialog,hn),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Ui({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new sn({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const e=z.findOne(".modal-body",this._dialog);e&&(e.scrollTop=0),d(this._element),this._element.classList.add(An),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,N.trigger(this._element,mn,{relatedTarget:t})}),this._dialog,this._isAnimated())}_addEventListeners(){N.on(this._element,vn,(t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():this._triggerBackdropTransition())})),N.on(window,gn,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),N.on(this._element,bn,(t=>{N.one(this._element,_n,(e=>{this._element===t.target&&this._element===e.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(wn),this._resetAdjustments(),this._scrollBar.reset(),N.trigger(this._element,fn)}))}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(N.trigger(this._element,un).defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._element.style.overflowY;"hidden"===e||this._element.classList.contains(En)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(En),this._queueCallback((()=>{this._element.classList.remove(En),this._queueCallback((()=>{this._element.style.overflowY=e}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;if(i&&!t){const t=p()?"paddingLeft":"paddingRight";this._element.style[t]=`${e}px`}if(!i&&t){const t=p()?"paddingRight":"paddingLeft";this._element.style[t]=`${e}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=On.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}N.on(document,yn,'[data-bs-toggle="modal"]',(function(t){const e=z.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),N.one(e,pn,(t=>{t.defaultPrevented||N.one(e,fn,(()=>{a(this)&&this.focus()}))}));const i=z.findOne(".modal.show");i&&On.getInstance(i).hide(),On.getOrCreateInstance(e).toggle(this)})),R(On),m(On);const xn=".bs.offcanvas",kn=".data-api",Ln=`load${xn}${kn}`,Sn="show",Dn="showing",$n="hiding",In=".offcanvas.show",Nn=`show${xn}`,Pn=`shown${xn}`,jn=`hide${xn}`,Mn=`hidePrevented${xn}`,Fn=`hidden${xn}`,Hn=`resize${xn}`,Wn=`click${xn}${kn}`,Bn=`keydown.dismiss${xn}`,zn={backdrop:!0,keyboard:!0,scroll:!1},Rn={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class qn extends W{constructor(t,e){super(t,e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return zn}static get DefaultType(){return Rn}static get NAME(){return"offcanvas"}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||N.trigger(this._element,Nn,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||(new cn).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(Dn),this._queueCallback((()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add(Sn),this._element.classList.remove(Dn),N.trigger(this._element,Pn,{relatedTarget:t})}),this._element,!0))}hide(){this._isShown&&(N.trigger(this._element,jn).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add($n),this._backdrop.hide(),this._queueCallback((()=>{this._element.classList.remove(Sn,$n),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new cn).reset(),N.trigger(this._element,Fn)}),this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const t=Boolean(this._config.backdrop);return new Ui({className:"offcanvas-backdrop",isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?()=>{"static"!==this._config.backdrop?this.hide():N.trigger(this._element,Mn)}:null})}_initializeFocusTrap(){return new sn({trapElement:this._element})}_addEventListeners(){N.on(this._element,Bn,(t=>{"Escape"===t.key&&(this._config.keyboard?this.hide():N.trigger(this._element,Mn))}))}static jQueryInterface(t){return this.each((function(){const e=qn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}N.on(document,Wn,'[data-bs-toggle="offcanvas"]',(function(t){const e=z.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this))return;N.one(e,Fn,(()=>{a(this)&&this.focus()}));const i=z.findOne(In);i&&i!==e&&qn.getInstance(i).hide(),qn.getOrCreateInstance(e).toggle(this)})),N.on(window,Ln,(()=>{for(const t of z.find(In))qn.getOrCreateInstance(t).show()})),N.on(window,Hn,(()=>{for(const t of z.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(t).position&&qn.getOrCreateInstance(t).hide()})),R(qn),m(qn);const Vn={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Kn=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Qn=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,Xn=(t,e)=>{const i=t.nodeName.toLowerCase();return e.includes(i)?!Kn.has(i)||Boolean(Qn.test(t.nodeValue)):e.filter((t=>t instanceof RegExp)).some((t=>t.test(i)))},Yn={allowList:Vn,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Un={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},Gn={entry:"(string|element|function|null)",selector:"(string|element)"};class Jn extends H{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return Yn}static get DefaultType(){return Un}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,i]of Object.entries(this._config.content))this._setContent(t,i,e);const e=t.children[0],i=this._resolvePossibleFunction(this._config.extraClass);return i&&e.classList.add(...i.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,i]of Object.entries(t))super._typeCheckConfig({selector:e,entry:i},Gn)}_setContent(t,e,i){const n=z.findOne(i,t);n&&((e=this._resolvePossibleFunction(e))?o(e)?this._putElementInTemplate(r(e),n):this._config.html?n.innerHTML=this._maybeSanitize(e):n.textContent=e:n.remove())}_maybeSanitize(t){return this._config.sanitize?function(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=[].concat(...n.body.querySelectorAll("*"));for(const t of s){const i=t.nodeName.toLowerCase();if(!Object.keys(e).includes(i)){t.remove();continue}const n=[].concat(...t.attributes),s=[].concat(e["*"]||[],e[i]||[]);for(const e of n)Xn(e,s)||t.removeAttribute(e.nodeName)}return n.body.innerHTML}(t,this._config.allowList,this._config.sanitizeFn):t}_resolvePossibleFunction(t){return g(t,[this])}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent}}const Zn=new Set(["sanitize","allowList","sanitizeFn"]),ts="fade",es="show",is=".modal",ns="hide.bs.modal",ss="hover",os="focus",rs={AUTO:"auto",TOP:"top",RIGHT:p()?"left":"right",BOTTOM:"bottom",LEFT:p()?"right":"left"},as={allowList:Vn,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},ls={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class cs extends W{constructor(t,e){if(void 0===vi)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t,e),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return as}static get DefaultType(){return ls}static get NAME(){return"tooltip"}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter())}dispose(){clearTimeout(this._timeout),N.off(this._element.closest(is),ns,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const t=N.trigger(this._element,this.constructor.eventName("show")),e=(c(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(t.defaultPrevented||!e)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:n}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(n.append(i),N.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(i),i.classList.add(es),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.on(t,"mouseover",h);this._queueCallback((()=>{N.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1}),this.tip,this._isAnimated())}hide(){if(this._isShown()&&!N.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove(es),"ontouchstart"in document.documentElement)for(const t of[].concat(...document.body.children))N.off(t,"mouseover",h);this._activeTrigger.click=!1,this._activeTrigger[os]=!1,this._activeTrigger[ss]=!1,this._isHovered=null,this._queueCallback((()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),N.trigger(this._element,this.constructor.eventName("hidden")))}),this.tip,this._isAnimated())}}update(){this._popper&&this._popper.update()}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(t){const e=this._getTemplateFactory(t).toHtml();if(!e)return null;e.classList.remove(ts,es),e.classList.add(`bs-${this.constructor.NAME}-auto`);const i=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME).toString();return e.setAttribute("id",i),this._isAnimated()&&e.classList.add(ts),e}setContent(t){this._newContent=t,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(t){return this._templateFactory?this._templateFactory.changeContent(t):this._templateFactory=new Jn({...this._config,content:t,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(t){return this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(ts)}_isShown(){return this.tip&&this.tip.classList.contains(es)}_createPopper(t){const e=g(this._config.placement,[this,t,this._element]),i=rs[e.toUpperCase()];return bi(this._element,t,this._getPopperConfig(i))}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return g(t,[this._element])}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:t=>{this._getTipElement().setAttribute("data-popper-placement",t.state.placement)}}]};return{...e,...g(this._config.popperConfig,[e])}}_setListeners(){const t=this._config.trigger.split(" ");for(const e of t)if("click"===e)N.on(this._element,this.constructor.eventName("click"),this._config.selector,(t=>{this._initializeOnDelegatedTarget(t).toggle()}));else if("manual"!==e){const t=e===ss?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),i=e===ss?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");N.on(this._element,t,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusin"===t.type?os:ss]=!0,e._enter()})),N.on(this._element,i,this._config.selector,(t=>{const e=this._initializeOnDelegatedTarget(t);e._activeTrigger["focusout"===t.type?os:ss]=e._element.contains(t.relatedTarget),e._leave()}))}this._hideModalHandler=()=>{this._element&&this.hide()},N.on(this._element.closest(is),ns,this._hideModalHandler)}_fixTitle(){const t=this._element.getAttribute("title");t&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",t),this._element.setAttribute("data-bs-original-title",t),this._element.removeAttribute("title"))}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout((()=>{this._isHovered&&this.show()}),this._config.delay.show))}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout((()=>{this._isHovered||this.hide()}),this._config.delay.hide))}_setTimeout(t,e){clearTimeout(this._timeout),this._timeout=setTimeout(t,e)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(t){const e=F.getDataAttributes(this._element);for(const t of Object.keys(e))Zn.has(t)&&delete e[t];return t={...e,..."object"==typeof t&&t?t:{}},t=this._mergeConfigObj(t),t=this._configAfterMerge(t),this._typeCheckConfig(t),t}_configAfterMerge(t){return t.container=!1===t.container?document.body:r(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),t}_getDelegateConfig(){const t={};for(const[e,i]of Object.entries(this._config))this.constructor.Default[e]!==i&&(t[e]=i);return t.selector=!1,t.trigger="manual",t}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(t){return this.each((function(){const e=cs.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(cs);const hs={...cs.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},ds={...cs.DefaultType,content:"(null|string|element|function)"};class us extends cs{static get Default(){return hs}static get DefaultType(){return ds}static get NAME(){return"popover"}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{".popover-header":this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each((function(){const e=us.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(us);const fs=".bs.scrollspy",ps=`activate${fs}`,ms=`click${fs}`,gs=`load${fs}.data-api`,_s="active",bs="[href]",vs=".nav-link",ys=`${vs}, .nav-item > ${vs}, .list-group-item`,ws={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},As={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Es extends W{constructor(t,e){super(t,e),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return ws}static get DefaultType(){return As}static get NAME(){return"scrollspy"}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const t of this._observableSections.values())this._observer.observe(t)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(t){return t.target=r(t.target)||document.body,t.rootMargin=t.offset?`${t.offset}px 0px -30%`:t.rootMargin,"string"==typeof t.threshold&&(t.threshold=t.threshold.split(",").map((t=>Number.parseFloat(t)))),t}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(N.off(this._config.target,ms),N.on(this._config.target,ms,bs,(t=>{const e=this._observableSections.get(t.target.hash);if(e){t.preventDefault();const i=this._rootElement||window,n=e.offsetTop-this._element.offsetTop;if(i.scrollTo)return void i.scrollTo({top:n,behavior:"smooth"});i.scrollTop=n}})))}_getNewObserver(){const t={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver((t=>this._observerCallback(t)),t)}_observerCallback(t){const e=t=>this._targetLinks.get(`#${t.target.id}`),i=t=>{this._previousScrollData.visibleEntryTop=t.target.offsetTop,this._process(e(t))},n=(this._rootElement||document.documentElement).scrollTop,s=n>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=n;for(const o of t){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(e(o));continue}const t=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&t){if(i(o),!n)return}else s||t||i(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const t=z.find(bs,this._config.target);for(const e of t){if(!e.hash||l(e))continue;const t=z.findOne(decodeURI(e.hash),this._element);a(t)&&(this._targetLinks.set(decodeURI(e.hash),e),this._observableSections.set(e.hash,t))}}_process(t){this._activeTarget!==t&&(this._clearActiveClass(this._config.target),this._activeTarget=t,t.classList.add(_s),this._activateParents(t),N.trigger(this._element,ps,{relatedTarget:t}))}_activateParents(t){if(t.classList.contains("dropdown-item"))z.findOne(".dropdown-toggle",t.closest(".dropdown")).classList.add(_s);else for(const e of z.parents(t,".nav, .list-group"))for(const t of z.prev(e,ys))t.classList.add(_s)}_clearActiveClass(t){t.classList.remove(_s);const e=z.find(`${bs}.${_s}`,t);for(const t of e)t.classList.remove(_s)}static jQueryInterface(t){return this.each((function(){const e=Es.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}))}}N.on(window,gs,(()=>{for(const t of z.find('[data-bs-spy="scroll"]'))Es.getOrCreateInstance(t)})),m(Es);const Ts=".bs.tab",Cs=`hide${Ts}`,Os=`hidden${Ts}`,xs=`show${Ts}`,ks=`shown${Ts}`,Ls=`click${Ts}`,Ss=`keydown${Ts}`,Ds=`load${Ts}`,$s="ArrowLeft",Is="ArrowRight",Ns="ArrowUp",Ps="ArrowDown",js="Home",Ms="End",Fs="active",Hs="fade",Ws="show",Bs=".dropdown-toggle",zs=`:not(${Bs})`,Rs='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',qs=`.nav-link${zs}, .list-group-item${zs}, [role="tab"]${zs}, ${Rs}`,Vs=`.${Fs}[data-bs-toggle="tab"], .${Fs}[data-bs-toggle="pill"], .${Fs}[data-bs-toggle="list"]`;class Ks extends W{constructor(t){super(t),this._parent=this._element.closest('.list-group, .nav, [role="tablist"]'),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),N.on(this._element,Ss,(t=>this._keydown(t))))}static get NAME(){return"tab"}show(){const t=this._element;if(this._elemIsActive(t))return;const e=this._getActiveElem(),i=e?N.trigger(e,Cs,{relatedTarget:t}):null;N.trigger(t,xs,{relatedTarget:e}).defaultPrevented||i&&i.defaultPrevented||(this._deactivate(e,t),this._activate(t,e))}_activate(t,e){t&&(t.classList.add(Fs),this._activate(z.getElementFromSelector(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.removeAttribute("tabindex"),t.setAttribute("aria-selected",!0),this._toggleDropDown(t,!0),N.trigger(t,ks,{relatedTarget:e})):t.classList.add(Ws)}),t,t.classList.contains(Hs)))}_deactivate(t,e){t&&(t.classList.remove(Fs),t.blur(),this._deactivate(z.getElementFromSelector(t)),this._queueCallback((()=>{"tab"===t.getAttribute("role")?(t.setAttribute("aria-selected",!1),t.setAttribute("tabindex","-1"),this._toggleDropDown(t,!1),N.trigger(t,Os,{relatedTarget:e})):t.classList.remove(Ws)}),t,t.classList.contains(Hs)))}_keydown(t){if(![$s,Is,Ns,Ps,js,Ms].includes(t.key))return;t.stopPropagation(),t.preventDefault();const e=this._getChildren().filter((t=>!l(t)));let i;if([js,Ms].includes(t.key))i=e[t.key===js?0:e.length-1];else{const n=[Is,Ps].includes(t.key);i=b(e,t.target,n,!0)}i&&(i.focus({preventScroll:!0}),Ks.getOrCreateInstance(i).show())}_getChildren(){return z.find(qs,this._parent)}_getActiveElem(){return this._getChildren().find((t=>this._elemIsActive(t)))||null}_setInitialAttributes(t,e){this._setAttributeIfNotExists(t,"role","tablist");for(const t of e)this._setInitialAttributesOnChild(t)}_setInitialAttributesOnChild(t){t=this._getInnerElement(t);const e=this._elemIsActive(t),i=this._getOuterElement(t);t.setAttribute("aria-selected",e),i!==t&&this._setAttributeIfNotExists(i,"role","presentation"),e||t.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(t,"role","tab"),this._setInitialAttributesOnTargetPanel(t)}_setInitialAttributesOnTargetPanel(t){const e=z.getElementFromSelector(t);e&&(this._setAttributeIfNotExists(e,"role","tabpanel"),t.id&&this._setAttributeIfNotExists(e,"aria-labelledby",`${t.id}`))}_toggleDropDown(t,e){const i=this._getOuterElement(t);if(!i.classList.contains("dropdown"))return;const n=(t,n)=>{const s=z.findOne(t,i);s&&s.classList.toggle(n,e)};n(Bs,Fs),n(".dropdown-menu",Ws),i.setAttribute("aria-expanded",e)}_setAttributeIfNotExists(t,e,i){t.hasAttribute(e)||t.setAttribute(e,i)}_elemIsActive(t){return t.classList.contains(Fs)}_getInnerElement(t){return t.matches(qs)?t:z.findOne(qs,t)}_getOuterElement(t){return t.closest(".nav-item, .list-group-item")||t}static jQueryInterface(t){return this.each((function(){const e=Ks.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t]()}}))}}N.on(document,Ls,Rs,(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),l(this)||Ks.getOrCreateInstance(this).show()})),N.on(window,Ds,(()=>{for(const t of z.find(Vs))Ks.getOrCreateInstance(t)})),m(Ks);const Qs=".bs.toast",Xs=`mouseover${Qs}`,Ys=`mouseout${Qs}`,Us=`focusin${Qs}`,Gs=`focusout${Qs}`,Js=`hide${Qs}`,Zs=`hidden${Qs}`,to=`show${Qs}`,eo=`shown${Qs}`,io="hide",no="show",so="showing",oo={animation:"boolean",autohide:"boolean",delay:"number"},ro={animation:!0,autohide:!0,delay:5e3};class ao extends W{constructor(t,e){super(t,e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return ro}static get DefaultType(){return oo}static get NAME(){return"toast"}show(){N.trigger(this._element,to).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(io),d(this._element),this._element.classList.add(no,so),this._queueCallback((()=>{this._element.classList.remove(so),N.trigger(this._element,eo),this._maybeScheduleHide()}),this._element,this._config.animation))}hide(){this.isShown()&&(N.trigger(this._element,Js).defaultPrevented||(this._element.classList.add(so),this._queueCallback((()=>{this._element.classList.add(io),this._element.classList.remove(so,no),N.trigger(this._element,Zs)}),this._element,this._config.animation)))}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(no),super.dispose()}isShown(){return this._element.classList.contains(no)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){N.on(this._element,Xs,(t=>this._onInteraction(t,!0))),N.on(this._element,Ys,(t=>this._onInteraction(t,!1))),N.on(this._element,Us,(t=>this._onInteraction(t,!0))),N.on(this._element,Gs,(t=>this._onInteraction(t,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){const e=ao.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return R(ao),m(ao),{Alert:Q,Button:Y,Carousel:xt,Collapse:Bt,Dropdown:qi,Modal:On,Offcanvas:qn,Popover:us,ScrollSpy:Es,Tab:Ks,Toast:ao,Tooltip:cs}}));
//# sourceMappingURL=bootstrap.bundle.min.js.map
/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(ie,e){"use strict";var oe=[],r=Object.getPrototypeOf,ae=oe.slice,g=oe.flat?function(e){return oe.flat.call(e)}:function(e){return oe.concat.apply([],e)},s=oe.push,se=oe.indexOf,n={},i=n.toString,ue=n.hasOwnProperty,o=ue.toString,a=o.call(Object),le={},v=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},y=function(e){return null!=e&&e===e.window},C=ie.document,u={type:!0,src:!0,nonce:!0,noModule:!0};function m(e,t,n){var r,i,o=(n=n||C).createElement("script");if(o.text=e,t)for(r in u)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e}var t="3.7.1",l=/HTML$/i,ce=function(e,t){return new ce.fn.init(e,t)};function c(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!v(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}function fe(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}ce.fn=ce.prototype={jquery:t,constructor:ce,length:0,toArray:function(){return ae.call(this)},get:function(e){return null==e?ae.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=ce.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return ce.each(this,e)},map:function(n){return this.pushStack(ce.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(ae.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(ce.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(ce.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:oe.sort,splice:oe.splice},ce.extend=ce.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||v(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(ce.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||ce.isPlainObject(n)?n:{},i=!1,a[t]=ce.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},ce.extend({expando:"jQuery"+(t+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==i.call(e))&&(!(t=r(e))||"function"==typeof(n=ue.call(t,"constructor")&&t.constructor)&&o.call(n)===a)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){m(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(c(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},text:function(e){var t,n="",r=0,i=e.nodeType;if(!i)while(t=e[r++])n+=ce.text(t);return 1===i||11===i?e.textContent:9===i?e.documentElement.textContent:3===i||4===i?e.nodeValue:n},makeArray:function(e,t){var n=t||[];return null!=e&&(c(Object(e))?ce.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:se.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!l.test(t||n&&n.nodeName||"HTML")},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(c(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:le}),"function"==typeof Symbol&&(ce.fn[Symbol.iterator]=oe[Symbol.iterator]),ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var pe=oe.pop,de=oe.sort,he=oe.splice,ge="[\\x20\\t\\r\\n\\f]",ve=new RegExp("^"+ge+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ge+"+$","g");ce.contains=function(e,t){var n=t&&t.parentNode;return e===n||!(!n||1!==n.nodeType||!(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))};var f=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function p(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}ce.escapeSelector=function(e){return(e+"").replace(f,p)};var ye=C,me=s;!function(){var e,b,w,o,a,T,r,C,d,i,k=me,S=ce.expando,E=0,n=0,s=W(),c=W(),u=W(),h=W(),l=function(e,t){return e===t&&(a=!0),0},f="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",t="(?:\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",p="\\["+ge+"*("+t+")(?:"+ge+"*([*^$|!~]?=)"+ge+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+t+"))|)"+ge+"*\\]",g=":("+t+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+p+")*)|.*)\\)|)",v=new RegExp(ge+"+","g"),y=new RegExp("^"+ge+"*,"+ge+"*"),m=new RegExp("^"+ge+"*([>+~]|"+ge+")"+ge+"*"),x=new RegExp(ge+"|>"),j=new RegExp(g),A=new RegExp("^"+t+"$"),D={ID:new RegExp("^#("+t+")"),CLASS:new RegExp("^\\.("+t+")"),TAG:new RegExp("^("+t+"|[*])"),ATTR:new RegExp("^"+p),PSEUDO:new RegExp("^"+g),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ge+"*(even|odd|(([+-]|)(\\d*)n|)"+ge+"*(?:([+-]|)"+ge+"*(\\d+)|))"+ge+"*\\)|)","i"),bool:new RegExp("^(?:"+f+")$","i"),needsContext:new RegExp("^"+ge+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ge+"*((?:-\\d)?\\d*)"+ge+"*\\)|)(?=[^-]|$)","i")},N=/^(?:input|select|textarea|button)$/i,q=/^h\d$/i,L=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,H=/[+~]/,O=new RegExp("\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\([^\\r\\n\\f])","g"),P=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},M=function(){V()},R=J(function(e){return!0===e.disabled&&fe(e,"fieldset")},{dir:"parentNode",next:"legend"});try{k.apply(oe=ae.call(ye.childNodes),ye.childNodes),oe[ye.childNodes.length].nodeType}catch(e){k={apply:function(e,t){me.apply(e,ae.call(t))},call:function(e){me.apply(e,ae.call(arguments,1))}}}function I(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(V(e),e=e||T,C)){if(11!==p&&(u=L.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return k.call(n,a),n}else if(f&&(a=f.getElementById(i))&&I.contains(e,a)&&a.id===i)return k.call(n,a),n}else{if(u[2])return k.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&e.getElementsByClassName)return k.apply(n,e.getElementsByClassName(i)),n}if(!(h[t+" "]||d&&d.test(t))){if(c=t,f=e,1===p&&(x.test(t)||m.test(t))){(f=H.test(t)&&U(e.parentNode)||e)==e&&le.scope||((s=e.getAttribute("id"))?s=ce.escapeSelector(s):e.setAttribute("id",s=S)),o=(l=Y(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+Q(l[o]);c=l.join(",")}try{return k.apply(n,f.querySelectorAll(c)),n}catch(e){h(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return re(t.replace(ve,"$1"),e,n,r)}function W(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function F(e){return e[S]=!0,e}function $(e){var t=T.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function B(t){return function(e){return fe(e,"input")&&e.type===t}}function _(t){return function(e){return(fe(e,"input")||fe(e,"button"))&&e.type===t}}function z(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&R(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function X(a){return F(function(o){return o=+o,F(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function U(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function V(e){var t,n=e?e.ownerDocument||e:ye;return n!=T&&9===n.nodeType&&n.documentElement&&(r=(T=n).documentElement,C=!ce.isXMLDoc(T),i=r.matches||r.webkitMatchesSelector||r.msMatchesSelector,r.msMatchesSelector&&ye!=T&&(t=T.defaultView)&&t.top!==t&&t.addEventListener("unload",M),le.getById=$(function(e){return r.appendChild(e).id=ce.expando,!T.getElementsByName||!T.getElementsByName(ce.expando).length}),le.disconnectedMatch=$(function(e){return i.call(e,"*")}),le.scope=$(function(){return T.querySelectorAll(":scope")}),le.cssHas=$(function(){try{return T.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}}),le.getById?(b.filter.ID=function(e){var t=e.replace(O,P);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(O,P);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},b.find.CLASS=function(e,t){if("undefined"!=typeof t.getElementsByClassName&&C)return t.getElementsByClassName(e)},d=[],$(function(e){var t;r.appendChild(e).innerHTML="<a id='"+S+"' href='' disabled='disabled'></a><select id='"+S+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+ge+"*(?:value|"+f+")"),e.querySelectorAll("[id~="+S+"-]").length||d.push("~="),e.querySelectorAll("a#"+S+"+*").length||d.push(".#.+[+~]"),e.querySelectorAll(":checked").length||d.push(":checked"),(t=T.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),r.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&d.push(":enabled",":disabled"),(t=T.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||d.push("\\["+ge+"*name"+ge+"*="+ge+"*(?:''|\"\")")}),le.cssHas||d.push(":has"),d=d.length&&new RegExp(d.join("|")),l=function(e,t){if(e===t)return a=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!le.sortDetached&&t.compareDocumentPosition(e)===n?e===T||e.ownerDocument==ye&&I.contains(ye,e)?-1:t===T||t.ownerDocument==ye&&I.contains(ye,t)?1:o?se.call(o,e)-se.call(o,t):0:4&n?-1:1)}),T}for(e in I.matches=function(e,t){return I(e,null,null,t)},I.matchesSelector=function(e,t){if(V(e),C&&!h[t+" "]&&(!d||!d.test(t)))try{var n=i.call(e,t);if(n||le.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){h(t,!0)}return 0<I(t,T,null,[e]).length},I.contains=function(e,t){return(e.ownerDocument||e)!=T&&V(e),ce.contains(e,t)},I.attr=function(e,t){(e.ownerDocument||e)!=T&&V(e);var n=b.attrHandle[t.toLowerCase()],r=n&&ue.call(b.attrHandle,t.toLowerCase())?n(e,t,!C):void 0;return void 0!==r?r:e.getAttribute(t)},I.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ce.uniqueSort=function(e){var t,n=[],r=0,i=0;if(a=!le.sortStable,o=!le.sortStable&&ae.call(e,0),de.call(e,l),a){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)he.call(e,n[r],1)}return o=null,e},ce.fn.uniqueSort=function(){return this.pushStack(ce.uniqueSort(ae.apply(this)))},(b=ce.expr={cacheLength:50,createPseudo:F,match:D,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(O,P),e[3]=(e[3]||e[4]||e[5]||"").replace(O,P),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||I.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&I.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return D.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&j.test(n)&&(t=Y(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(O,P).toLowerCase();return"*"===e?function(){return!0}:function(e){return fe(e,t)}},CLASS:function(e){var t=s[e+" "];return t||(t=new RegExp("(^|"+ge+")"+e+"("+ge+"|$)"))&&s(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=I.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(v," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(d,e,t,h,g){var v="nth"!==d.slice(0,3),y="last"!==d.slice(-4),m="of-type"===e;return 1===h&&0===g?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u=v!==y?"nextSibling":"previousSibling",l=e.parentNode,c=m&&e.nodeName.toLowerCase(),f=!n&&!m,p=!1;if(l){if(v){while(u){o=e;while(o=o[u])if(m?fe(o,c):1===o.nodeType)return!1;s=u="only"===d&&!s&&"nextSibling"}return!0}if(s=[y?l.firstChild:l.lastChild],y&&f){p=(a=(r=(i=l[S]||(l[S]={}))[d]||[])[0]===E&&r[1])&&r[2],o=a&&l.childNodes[a];while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if(1===o.nodeType&&++p&&o===e){i[d]=[E,a,p];break}}else if(f&&(p=a=(r=(i=e[S]||(e[S]={}))[d]||[])[0]===E&&r[1]),!1===p)while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if((m?fe(o,c):1===o.nodeType)&&++p&&(f&&((i=o[S]||(o[S]={}))[d]=[E,p]),o===e))break;return(p-=g)===h||p%h==0&&0<=p/h}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||I.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?F(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=se.call(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:F(function(e){var r=[],i=[],s=ne(e.replace(ve,"$1"));return s[S]?F(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:F(function(t){return function(e){return 0<I(t,e).length}}),contains:F(function(t){return t=t.replace(O,P),function(e){return-1<(e.textContent||ce.text(e)).indexOf(t)}}),lang:F(function(n){return A.test(n||"")||I.error("unsupported lang: "+n),n=n.replace(O,P).toLowerCase(),function(e){var t;do{if(t=C?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=ie.location&&ie.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===r},focus:function(e){return e===function(){try{return T.activeElement}catch(e){}}()&&T.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},enabled:z(!1),disabled:z(!0),checked:function(e){return fe(e,"input")&&!!e.checked||fe(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return q.test(e.nodeName)},input:function(e){return N.test(e.nodeName)},button:function(e){return fe(e,"input")&&"button"===e.type||fe(e,"button")},text:function(e){var t;return fe(e,"input")&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:X(function(){return[0]}),last:X(function(e,t){return[t-1]}),eq:X(function(e,t,n){return[n<0?n+t:n]}),even:X(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:X(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:X(function(e,t,n){var r;for(r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:X(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=B(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=_(e);function G(){}function Y(e,t){var n,r,i,o,a,s,u,l=c[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=y.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=m.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(ve," ")}),a=a.slice(n.length)),b.filter)!(r=D[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?I.error(e):c(e,s).slice(0)}function Q(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function J(a,e,t){var s=e.dir,u=e.next,l=u||s,c=t&&"parentNode"===l,f=n++;return e.first?function(e,t,n){while(e=e[s])if(1===e.nodeType||c)return a(e,t,n);return!1}:function(e,t,n){var r,i,o=[E,f];if(n){while(e=e[s])if((1===e.nodeType||c)&&a(e,t,n))return!0}else while(e=e[s])if(1===e.nodeType||c)if(i=e[S]||(e[S]={}),u&&fe(e,u))e=e[s]||e;else{if((r=i[l])&&r[0]===E&&r[1]===f)return o[2]=r[2];if((i[l]=o)[2]=a(e,t,n))return!0}return!1}}function K(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Z(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function ee(d,h,g,v,y,e){return v&&!v[S]&&(v=ee(v)),y&&!y[S]&&(y=ee(y,e)),F(function(e,t,n,r){var i,o,a,s,u=[],l=[],c=t.length,f=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)I(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),p=!d||!e&&h?f:Z(f,u,d,n,r);if(g?g(p,s=y||(e?d:c||v)?[]:t,n,r):s=p,v){i=Z(s,l),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(s[l[o]]=!(p[l[o]]=a))}if(e){if(y||d){if(y){i=[],o=s.length;while(o--)(a=s[o])&&i.push(p[o]=a);y(null,s=[],i,r)}o=s.length;while(o--)(a=s[o])&&-1<(i=y?se.call(e,a):u[o])&&(e[i]=!(t[i]=a))}}else s=Z(s===t?s.splice(c,s.length):s),y?y(null,t,s,r):k.apply(t,s)})}function te(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=J(function(e){return e===i},a,!0),l=J(function(e){return-1<se.call(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!=w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[J(K(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return ee(1<s&&K(c),1<s&&Q(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(ve,"$1"),t,s<n&&te(e.slice(s,n)),n<r&&te(e=e.slice(n)),n<r&&Q(e))}c.push(t)}return K(c)}function ne(e,t){var n,v,y,m,x,r,i=[],o=[],a=u[e+" "];if(!a){t||(t=Y(e)),n=t.length;while(n--)(a=te(t[n]))[S]?i.push(a):o.push(a);(a=u(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=E+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==T||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==T||(V(o),n=!C);while(s=v[a++])if(s(o,t||T,n)){k.call(r,o);break}i&&(E=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=pe.call(r));f=Z(f)}k.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&ce.uniqueSort(r)}return i&&(E=h,w=p),c},m?F(r):r))).selector=e}return a}function re(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&Y(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&C&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(O,P),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=D.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(O,P),H.test(o[0].type)&&U(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&Q(o)))return k.apply(n,r),n;break}}}return(l||ne(e,c))(r,t,!C,n,!t||H.test(e)&&U(t.parentNode)||t),n}G.prototype=b.filters=b.pseudos,b.setFilters=new G,le.sortStable=S.split("").sort(l).join("")===S,V(),le.sortDetached=$(function(e){return 1&e.compareDocumentPosition(T.createElement("fieldset"))}),ce.find=I,ce.expr[":"]=ce.expr.pseudos,ce.unique=ce.uniqueSort,I.compile=ne,I.select=re,I.setDocument=V,I.tokenize=Y,I.escape=ce.escapeSelector,I.getText=ce.text,I.isXML=ce.isXMLDoc,I.selectors=ce.expr,I.support=ce.support,I.uniqueSort=ce.uniqueSort}();var d=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&ce(e).is(n))break;r.push(e)}return r},h=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},b=ce.expr.match.needsContext,w=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function T(e,n,r){return v(n)?ce.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?ce.grep(e,function(e){return e===n!==r}):"string"!=typeof n?ce.grep(e,function(e){return-1<se.call(n,e)!==r}):ce.filter(n,e,r)}ce.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ce.find.matchesSelector(r,e)?[r]:[]:ce.find.matches(e,ce.grep(t,function(e){return 1===e.nodeType}))},ce.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ce(e).filter(function(){for(t=0;t<r;t++)if(ce.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ce.find(e,i[t],n);return 1<r?ce.uniqueSort(n):n},filter:function(e){return this.pushStack(T(this,e||[],!1))},not:function(e){return this.pushStack(T(this,e||[],!0))},is:function(e){return!!T(this,"string"==typeof e&&b.test(e)?ce(e):e||[],!1).length}});var k,S=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(ce.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||k,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:S.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof ce?t[0]:t,ce.merge(this,ce.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:C,!0)),w.test(r[1])&&ce.isPlainObject(t))for(r in t)v(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=C.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(ce):ce.makeArray(e,this)}).prototype=ce.fn,k=ce(C);var E=/^(?:parents|prev(?:Until|All))/,j={children:!0,contents:!0,next:!0,prev:!0};function A(e,t){while((e=e[t])&&1!==e.nodeType);return e}ce.fn.extend({has:function(e){var t=ce(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ce.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ce(e);if(!b.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&ce.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?ce.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?se.call(ce(e),this[0]):se.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ce.uniqueSort(ce.merge(this.get(),ce(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ce.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return d(e,"parentNode")},parentsUntil:function(e,t,n){return d(e,"parentNode",n)},next:function(e){return A(e,"nextSibling")},prev:function(e){return A(e,"previousSibling")},nextAll:function(e){return d(e,"nextSibling")},prevAll:function(e){return d(e,"previousSibling")},nextUntil:function(e,t,n){return d(e,"nextSibling",n)},prevUntil:function(e,t,n){return d(e,"previousSibling",n)},siblings:function(e){return h((e.parentNode||{}).firstChild,e)},children:function(e){return h(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(fe(e,"template")&&(e=e.content||e),ce.merge([],e.childNodes))}},function(r,i){ce.fn[r]=function(e,t){var n=ce.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=ce.filter(t,n)),1<this.length&&(j[r]||ce.uniqueSort(n),E.test(r)&&n.reverse()),this.pushStack(n)}});var D=/[^\x20\t\r\n\f]+/g;function N(e){return e}function q(e){throw e}function L(e,t,n,r){var i;try{e&&v(i=e.promise)?i.call(e).done(t).fail(n):e&&v(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}ce.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},ce.each(e.match(D)||[],function(e,t){n[t]=!0}),n):ce.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){ce.each(e,function(e,t){v(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==x(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return ce.each(arguments,function(e,t){var n;while(-1<(n=ce.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<ce.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},ce.extend({Deferred:function(e){var o=[["notify","progress",ce.Callbacks("memory"),ce.Callbacks("memory"),2],["resolve","done",ce.Callbacks("once memory"),ce.Callbacks("once memory"),0,"resolved"],["reject","fail",ce.Callbacks("once memory"),ce.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return ce.Deferred(function(r){ce.each(o,function(e,t){var n=v(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&v(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,v(t)?s?t.call(e,l(u,o,N,s),l(u,o,q,s)):(u++,t.call(e,l(u,o,N,s),l(u,o,q,s),l(u,o,N,o.notifyWith))):(a!==N&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){ce.Deferred.exceptionHook&&ce.Deferred.exceptionHook(e,t.error),u<=i+1&&(a!==q&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(ce.Deferred.getErrorHook?t.error=ce.Deferred.getErrorHook():ce.Deferred.getStackHook&&(t.error=ce.Deferred.getStackHook()),ie.setTimeout(t))}}return ce.Deferred(function(e){o[0][3].add(l(0,e,v(r)?r:N,e.notifyWith)),o[1][3].add(l(0,e,v(t)?t:N)),o[2][3].add(l(0,e,v(n)?n:q))}).promise()},promise:function(e){return null!=e?ce.extend(e,a):a}},s={};return ce.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=ae.call(arguments),o=ce.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?ae.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(L(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||v(i[t]&&i[t].then)))return o.then();while(t--)L(i[t],a(t),o.reject);return o.promise()}});var H=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ce.Deferred.exceptionHook=function(e,t){ie.console&&ie.console.warn&&e&&H.test(e.name)&&ie.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},ce.readyException=function(e){ie.setTimeout(function(){throw e})};var O=ce.Deferred();function P(){C.removeEventListener("DOMContentLoaded",P),ie.removeEventListener("load",P),ce.ready()}ce.fn.ready=function(e){return O.then(e)["catch"](function(e){ce.readyException(e)}),this},ce.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--ce.readyWait:ce.isReady)||(ce.isReady=!0)!==e&&0<--ce.readyWait||O.resolveWith(C,[ce])}}),ce.ready.then=O.then,"complete"===C.readyState||"loading"!==C.readyState&&!C.documentElement.doScroll?ie.setTimeout(ce.ready):(C.addEventListener("DOMContentLoaded",P),ie.addEventListener("load",P));var M=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n))for(s in i=!0,n)M(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,v(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(ce(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},R=/^-ms-/,I=/-([a-z])/g;function W(e,t){return t.toUpperCase()}function F(e){return e.replace(R,"ms-").replace(I,W)}var $=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function B(){this.expando=ce.expando+B.uid++}B.uid=1,B.prototype={cache:function(e){var t=e[this.expando];return t||(t={},$(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[F(t)]=n;else for(r in t)i[F(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][F(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(F):(t=F(t))in r?[t]:t.match(D)||[]).length;while(n--)delete r[t[n]]}(void 0===t||ce.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ce.isEmptyObject(t)}};var _=new B,z=new B,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,U=/[A-Z]/g;function V(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(U,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:X.test(i)?JSON.parse(i):i)}catch(e){}z.set(e,t,n)}else n=void 0;return n}ce.extend({hasData:function(e){return z.hasData(e)||_.hasData(e)},data:function(e,t,n){return z.access(e,t,n)},removeData:function(e,t){z.remove(e,t)},_data:function(e,t,n){return _.access(e,t,n)},_removeData:function(e,t){_.remove(e,t)}}),ce.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=z.get(o),1===o.nodeType&&!_.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=F(r.slice(5)),V(o,r,i[r]));_.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){z.set(this,n)}):M(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=z.get(o,n))?t:void 0!==(t=V(o,n))?t:void 0;this.each(function(){z.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){z.remove(this,e)})}}),ce.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=_.get(e,t),n&&(!r||Array.isArray(n)?r=_.access(e,t,ce.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ce.queue(e,t),r=n.length,i=n.shift(),o=ce._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){ce.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return _.get(e,n)||_.access(e,n,{empty:ce.Callbacks("once memory").add(function(){_.remove(e,[t+"queue",n])})})}}),ce.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?ce.queue(this[0],t):void 0===n?this:this.each(function(){var e=ce.queue(this,t,n);ce._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&ce.dequeue(this,t)})},dequeue:function(e){return this.each(function(){ce.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=ce.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=_.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var G=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Y=new RegExp("^(?:([+-])=|)("+G+")([a-z%]*)$","i"),Q=["Top","Right","Bottom","Left"],J=C.documentElement,K=function(e){return ce.contains(e.ownerDocument,e)},Z={composed:!0};J.getRootNode&&(K=function(e){return ce.contains(e.ownerDocument,e)||e.getRootNode(Z)===e.ownerDocument});var ee=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&K(e)&&"none"===ce.css(e,"display")};function te(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return ce.css(e,t,"")},u=s(),l=n&&n[3]||(ce.cssNumber[t]?"":"px"),c=e.nodeType&&(ce.cssNumber[t]||"px"!==l&&+u)&&Y.exec(ce.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)ce.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,ce.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ne={};function re(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=_.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ee(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ne[s])||(o=a.body.appendChild(a.createElement(s)),u=ce.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ne[s]=u)))):"none"!==n&&(l[c]="none",_.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}ce.fn.extend({show:function(){return re(this,!0)},hide:function(){return re(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ee(this)?ce(this).show():ce(this).hide()})}});var xe,be,we=/^(?:checkbox|radio)$/i,Te=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,Ce=/^$|^module$|\/(?:java|ecma)script/i;xe=C.createDocumentFragment().appendChild(C.createElement("div")),(be=C.createElement("input")).setAttribute("type","radio"),be.setAttribute("checked","checked"),be.setAttribute("name","t"),xe.appendChild(be),le.checkClone=xe.cloneNode(!0).cloneNode(!0).lastChild.checked,xe.innerHTML="<textarea>x</textarea>",le.noCloneChecked=!!xe.cloneNode(!0).lastChild.defaultValue,xe.innerHTML="<option></option>",le.option=!!xe.lastChild;var ke={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function Se(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&fe(e,t)?ce.merge([e],n):n}function Ee(e,t){for(var n=0,r=e.length;n<r;n++)_.set(e[n],"globalEval",!t||_.get(t[n],"globalEval"))}ke.tbody=ke.tfoot=ke.colgroup=ke.caption=ke.thead,ke.th=ke.td,le.option||(ke.optgroup=ke.option=[1,"<select multiple='multiple'>","</select>"]);var je=/<|&#?\w+;/;function Ae(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))ce.merge(p,o.nodeType?[o]:o);else if(je.test(o)){a=a||f.appendChild(t.createElement("div")),s=(Te.exec(o)||["",""])[1].toLowerCase(),u=ke[s]||ke._default,a.innerHTML=u[1]+ce.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;ce.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<ce.inArray(o,r))i&&i.push(o);else if(l=K(o),a=Se(f.appendChild(o),"script"),l&&Ee(a),n){c=0;while(o=a[c++])Ce.test(o.type||"")&&n.push(o)}return f}var De=/^([^.]*)(?:\.(.+)|)/;function Ne(){return!0}function qe(){return!1}function Le(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Le(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=qe;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return ce().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=ce.guid++)),e.each(function(){ce.event.add(this,t,i,r,n)})}function He(e,r,t){t?(_.set(e,r,!1),ce.event.add(e,r,{namespace:!1,handler:function(e){var t,n=_.get(this,r);if(1&e.isTrigger&&this[r]){if(n)(ce.event.special[r]||{}).delegateType&&e.stopPropagation();else if(n=ae.call(arguments),_.set(this,r,n),this[r](),t=_.get(this,r),_.set(this,r,!1),n!==t)return e.stopImmediatePropagation(),e.preventDefault(),t}else n&&(_.set(this,r,ce.event.trigger(n[0],n.slice(1),this)),e.stopPropagation(),e.isImmediatePropagationStopped=Ne)}})):void 0===_.get(e,r)&&ce.event.add(e,r,Ne)}ce.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.get(t);if($(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&ce.find.matchesSelector(J,i),n.guid||(n.guid=ce.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof ce&&ce.event.triggered!==e.type?ce.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(D)||[""]).length;while(l--)d=g=(s=De.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=ce.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=ce.event.special[d]||{},c=ce.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ce.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),ce.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.hasData(e)&&_.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(D)||[""]).length;while(l--)if(d=g=(s=De.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=ce.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||ce.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)ce.event.remove(e,d+t[l],n,r,!0);ce.isEmptyObject(u)&&_.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=ce.event.fix(e),l=(_.get(this,"events")||Object.create(null))[u.type]||[],c=ce.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=ce.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((ce.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<ce(i,this).index(l):ce.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(ce.Event.prototype,t,{enumerable:!0,configurable:!0,get:v(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[ce.expando]?e:new ce.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click",!0),!1},trigger:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click"),!0},_default:function(e){var t=e.target;return we.test(t.type)&&t.click&&fe(t,"input")&&_.get(t,"click")||fe(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ce.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},ce.Event=function(e,t){if(!(this instanceof ce.Event))return new ce.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ne:qe,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ce.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[ce.expando]=!0},ce.Event.prototype={constructor:ce.Event,isDefaultPrevented:qe,isPropagationStopped:qe,isImmediatePropagationStopped:qe,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ne,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ne,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ne,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},ce.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},ce.event.addProp),ce.each({focus:"focusin",blur:"focusout"},function(r,i){function o(e){if(C.documentMode){var t=_.get(this,"handle"),n=ce.event.fix(e);n.type="focusin"===e.type?"focus":"blur",n.isSimulated=!0,t(e),n.target===n.currentTarget&&t(n)}else ce.event.simulate(i,e.target,ce.event.fix(e))}ce.event.special[r]={setup:function(){var e;if(He(this,r,!0),!C.documentMode)return!1;(e=_.get(this,i))||this.addEventListener(i,o),_.set(this,i,(e||0)+1)},trigger:function(){return He(this,r),!0},teardown:function(){var e;if(!C.documentMode)return!1;(e=_.get(this,i)-1)?_.set(this,i,e):(this.removeEventListener(i,o),_.remove(this,i))},_default:function(e){return _.get(e.target,r)},delegateType:i},ce.event.special[i]={setup:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i);n||(C.documentMode?this.addEventListener(i,o):e.addEventListener(r,o,!0)),_.set(t,i,(n||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i)-1;n?_.set(t,i,n):(C.documentMode?this.removeEventListener(i,o):e.removeEventListener(r,o,!0),_.remove(t,i))}}}),ce.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){ce.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||ce.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),ce.fn.extend({on:function(e,t,n,r){return Le(this,e,t,n,r)},one:function(e,t,n,r){return Le(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,ce(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=qe),this.each(function(){ce.event.remove(this,e,n,t)})}});var Oe=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,Me=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function Re(e,t){return fe(e,"table")&&fe(11!==t.nodeType?t:t.firstChild,"tr")&&ce(e).children("tbody")[0]||e}function Ie(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function We(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Fe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(_.hasData(e)&&(s=_.get(e).events))for(i in _.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)ce.event.add(t,i,s[i][n]);z.hasData(e)&&(o=z.access(e),a=ce.extend({},o),z.set(t,a))}}function $e(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=v(d);if(h||1<f&&"string"==typeof d&&!le.checkClone&&Pe.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),$e(t,r,i,o)});if(f&&(t=(e=Ae(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=ce.map(Se(e,"script"),Ie)).length;c<f;c++)u=e,c!==p&&(u=ce.clone(u,!0,!0),s&&ce.merge(a,Se(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,ce.map(a,We),c=0;c<s;c++)u=a[c],Ce.test(u.type||"")&&!_.access(u,"globalEval")&&ce.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?ce._evalUrl&&!u.noModule&&ce._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):m(u.textContent.replace(Me,""),u,l))}return n}function Be(e,t,n){for(var r,i=t?ce.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ce.cleanData(Se(r)),r.parentNode&&(n&&K(r)&&Ee(Se(r,"script")),r.parentNode.removeChild(r));return e}ce.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=K(e);if(!(le.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ce.isXMLDoc(e)))for(a=Se(c),r=0,i=(o=Se(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&we.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||Se(e),a=a||Se(c),r=0,i=o.length;r<i;r++)Fe(o[r],a[r]);else Fe(e,c);return 0<(a=Se(c,"script")).length&&Ee(a,!f&&Se(e,"script")),c},cleanData:function(e){for(var t,n,r,i=ce.event.special,o=0;void 0!==(n=e[o]);o++)if($(n)){if(t=n[_.expando]){if(t.events)for(r in t.events)i[r]?ce.event.remove(n,r):ce.removeEvent(n,r,t.handle);n[_.expando]=void 0}n[z.expando]&&(n[z.expando]=void 0)}}}),ce.fn.extend({detach:function(e){return Be(this,e,!0)},remove:function(e){return Be(this,e)},text:function(e){return M(this,function(e){return void 0===e?ce.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return $e(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Re(this,e).appendChild(e)})},prepend:function(){return $e(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Re(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(ce.cleanData(Se(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ce.clone(this,e,t)})},html:function(e){return M(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Oe.test(e)&&!ke[(Te.exec(e)||["",""])[1].toLowerCase()]){e=ce.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(ce.cleanData(Se(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return $e(this,arguments,function(e){var t=this.parentNode;ce.inArray(this,n)<0&&(ce.cleanData(Se(this)),t&&t.replaceChild(e,this))},n)}}),ce.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){ce.fn[e]=function(e){for(var t,n=[],r=ce(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),ce(r[o])[a](t),s.apply(n,t.get());return this.pushStack(n)}});var _e=new RegExp("^("+G+")(?!px)[a-z%]+$","i"),ze=/^--/,Xe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=ie),t.getComputedStyle(e)},Ue=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ve=new RegExp(Q.join("|"),"i");function Ge(e,t,n){var r,i,o,a,s=ze.test(t),u=e.style;return(n=n||Xe(e))&&(a=n.getPropertyValue(t)||n[t],s&&a&&(a=a.replace(ve,"$1")||void 0),""!==a||K(e)||(a=ce.style(e,t)),!le.pixelBoxStyles()&&_e.test(a)&&Ve.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==a?a+"":a}function Ye(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",J.appendChild(u).appendChild(l);var e=ie.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),J.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=C.createElement("div"),l=C.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",le.clearCloneStyle="content-box"===l.style.backgroundClip,ce.extend(le,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=C.createElement("table"),t=C.createElement("tr"),n=C.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="box-sizing:content-box;border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",J.appendChild(e).appendChild(t).appendChild(n),r=ie.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,J.removeChild(e)),a}}))}();var Qe=["Webkit","Moz","ms"],Je=C.createElement("div").style,Ke={};function Ze(e){var t=ce.cssProps[e]||Ke[e];return t||(e in Je?e:Ke[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Qe.length;while(n--)if((e=Qe[n]+t)in Je)return e}(e)||e)}var et=/^(none|table(?!-c[ea]).+)/,tt={position:"absolute",visibility:"hidden",display:"block"},nt={letterSpacing:"0",fontWeight:"400"};function rt(e,t,n){var r=Y.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function it(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0,l=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(l+=ce.css(e,n+Q[a],!0,i)),r?("content"===n&&(u-=ce.css(e,"padding"+Q[a],!0,i)),"margin"!==n&&(u-=ce.css(e,"border"+Q[a]+"Width",!0,i))):(u+=ce.css(e,"padding"+Q[a],!0,i),"padding"!==n?u+=ce.css(e,"border"+Q[a]+"Width",!0,i):s+=ce.css(e,"border"+Q[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u+l}function ot(e,t,n){var r=Xe(e),i=(!le.boxSizingReliable()||n)&&"border-box"===ce.css(e,"boxSizing",!1,r),o=i,a=Ge(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(_e.test(a)){if(!n)return a;a="auto"}return(!le.boxSizingReliable()&&i||!le.reliableTrDimensions()&&fe(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===ce.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===ce.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+it(e,t,n||(i?"border":"content"),o,r,a)+"px"}function at(e,t,n,r,i){return new at.prototype.init(e,t,n,r,i)}ce.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ge(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=F(t),u=ze.test(t),l=e.style;if(u||(t=Ze(s)),a=ce.cssHooks[t]||ce.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=Y.exec(n))&&i[1]&&(n=te(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(ce.cssNumber[s]?"":"px")),le.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=F(t);return ze.test(t)||(t=Ze(s)),(a=ce.cssHooks[t]||ce.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Ge(e,t,r)),"normal"===i&&t in nt&&(i=nt[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),ce.each(["height","width"],function(e,u){ce.cssHooks[u]={get:function(e,t,n){if(t)return!et.test(ce.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ot(e,u,n):Ue(e,tt,function(){return ot(e,u,n)})},set:function(e,t,n){var r,i=Xe(e),o=!le.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===ce.css(e,"boxSizing",!1,i),s=n?it(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-it(e,u,"border",!1,i)-.5)),s&&(r=Y.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=ce.css(e,u)),rt(0,t,s)}}}),ce.cssHooks.marginLeft=Ye(le.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Ge(e,"marginLeft"))||e.getBoundingClientRect().left-Ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),ce.each({margin:"",padding:"",border:"Width"},function(i,o){ce.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+Q[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(ce.cssHooks[i+o].set=rt)}),ce.fn.extend({css:function(e,t){return M(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Xe(e),i=t.length;a<i;a++)o[t[a]]=ce.css(e,t[a],!1,r);return o}return void 0!==n?ce.style(e,t,n):ce.css(e,t)},e,t,1<arguments.length)}}),((ce.Tween=at).prototype={constructor:at,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ce.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ce.cssNumber[n]?"":"px")},cur:function(){var e=at.propHooks[this.prop];return e&&e.get?e.get(this):at.propHooks._default.get(this)},run:function(e){var t,n=at.propHooks[this.prop];return this.options.duration?this.pos=t=ce.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):at.propHooks._default.set(this),this}}).init.prototype=at.prototype,(at.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ce.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){ce.fx.step[e.prop]?ce.fx.step[e.prop](e):1!==e.elem.nodeType||!ce.cssHooks[e.prop]&&null==e.elem.style[Ze(e.prop)]?e.elem[e.prop]=e.now:ce.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=at.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ce.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ce.fx=at.prototype.init,ce.fx.step={};var st,ut,lt,ct,ft=/^(?:toggle|show|hide)$/,pt=/queueHooks$/;function dt(){ut&&(!1===C.hidden&&ie.requestAnimationFrame?ie.requestAnimationFrame(dt):ie.setTimeout(dt,ce.fx.interval),ce.fx.tick())}function ht(){return ie.setTimeout(function(){st=void 0}),st=Date.now()}function gt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=Q[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function vt(e,t,n){for(var r,i=(yt.tweeners[t]||[]).concat(yt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function yt(o,e,t){var n,a,r=0,i=yt.prefilters.length,s=ce.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=st||ht(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:ce.extend({},e),opts:ce.extend(!0,{specialEasing:{},easing:ce.easing._default},t),originalProperties:e,originalOptions:t,startTime:st||ht(),duration:t.duration,tweens:[],createTween:function(e,t){var n=ce.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=F(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=ce.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=yt.prefilters[r].call(l,o,c,l.opts))return v(n.stop)&&(ce._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return ce.map(c,vt,l),v(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),ce.fx.timer(ce.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}ce.Animation=ce.extend(yt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return te(n.elem,e,Y.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(D);for(var n,r=0,i=e.length;r<i;r++)n=e[r],yt.tweeners[n]=yt.tweeners[n]||[],yt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ee(e),v=_.get(e,"fxshow");for(r in n.queue||(null==(a=ce._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,ce.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ft.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||ce.style(e,r)}if((u=!ce.isEmptyObject(t))||!ce.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=_.get(e,"display")),"none"===(c=ce.css(e,"display"))&&(l?c=l:(re([e],!0),l=e.style.display||l,c=ce.css(e,"display"),re([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===ce.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=_.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&re([e],!0),p.done(function(){for(r in g||re([e]),_.remove(e,"fxshow"),d)ce.style(e,r,d[r])})),u=vt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?yt.prefilters.unshift(e):yt.prefilters.push(e)}}),ce.speed=function(e,t,n){var r=e&&"object"==typeof e?ce.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return ce.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ce.fx.speeds?r.duration=ce.fx.speeds[r.duration]:r.duration=ce.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){v(r.old)&&r.old.call(this),r.queue&&ce.dequeue(this,r.queue)},r},ce.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ee).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=ce.isEmptyObject(t),o=ce.speed(e,n,r),a=function(){var e=yt(this,ce.extend({},t),o);(i||_.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=ce.timers,r=_.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&pt.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||ce.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=_.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=ce.timers,o=n?n.length:0;for(t.finish=!0,ce.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),ce.each(["toggle","show","hide"],function(e,r){var i=ce.fn[r];ce.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(gt(r,!0),e,t,n)}}),ce.each({slideDown:gt("show"),slideUp:gt("hide"),slideToggle:gt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){ce.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),ce.timers=[],ce.fx.tick=function(){var e,t=0,n=ce.timers;for(st=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||ce.fx.stop(),st=void 0},ce.fx.timer=function(e){ce.timers.push(e),ce.fx.start()},ce.fx.interval=13,ce.fx.start=function(){ut||(ut=!0,dt())},ce.fx.stop=function(){ut=null},ce.fx.speeds={slow:600,fast:200,_default:400},ce.fn.delay=function(r,e){return r=ce.fx&&ce.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=ie.setTimeout(e,r);t.stop=function(){ie.clearTimeout(n)}})},lt=C.createElement("input"),ct=C.createElement("select").appendChild(C.createElement("option")),lt.type="checkbox",le.checkOn=""!==lt.value,le.optSelected=ct.selected,(lt=C.createElement("input")).value="t",lt.type="radio",le.radioValue="t"===lt.value;var mt,xt=ce.expr.attrHandle;ce.fn.extend({attr:function(e,t){return M(this,ce.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){ce.removeAttr(this,e)})}}),ce.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?ce.prop(e,t,n):(1===o&&ce.isXMLDoc(e)||(i=ce.attrHooks[t.toLowerCase()]||(ce.expr.match.bool.test(t)?mt:void 0)),void 0!==n?null===n?void ce.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=ce.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!le.radioValue&&"radio"===t&&fe(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(D);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),mt={set:function(e,t,n){return!1===t?ce.removeAttr(e,n):e.setAttribute(n,n),n}},ce.each(ce.expr.match.bool.source.match(/\w+/g),function(e,t){var a=xt[t]||ce.find.attr;xt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=xt[o],xt[o]=r,r=null!=a(e,t,n)?o:null,xt[o]=i),r}});var bt=/^(?:input|select|textarea|button)$/i,wt=/^(?:a|area)$/i;function Tt(e){return(e.match(D)||[]).join(" ")}function Ct(e){return e.getAttribute&&e.getAttribute("class")||""}function kt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(D)||[]}ce.fn.extend({prop:function(e,t){return M(this,ce.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[ce.propFix[e]||e]})}}),ce.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&ce.isXMLDoc(e)||(t=ce.propFix[t]||t,i=ce.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=ce.find.attr(e,"tabindex");return t?parseInt(t,10):bt.test(e.nodeName)||wt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),le.optSelected||(ce.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ce.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ce.propFix[this.toLowerCase()]=this}),ce.fn.extend({addClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).addClass(t.call(this,e,Ct(this)))}):(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++)i=e[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ");a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this},removeClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).removeClass(t.call(this,e,Ct(this)))}):arguments.length?(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++){i=e[o];while(-1<n.indexOf(" "+i+" "))n=n.replace(" "+i+" "," ")}a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this:this.attr("class","")},toggleClass:function(t,n){var e,r,i,o,a=typeof t,s="string"===a||Array.isArray(t);return v(t)?this.each(function(e){ce(this).toggleClass(t.call(this,e,Ct(this),n),n)}):"boolean"==typeof n&&s?n?this.addClass(t):this.removeClass(t):(e=kt(t),this.each(function(){if(s)for(o=ce(this),i=0;i<e.length;i++)r=e[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else void 0!==t&&"boolean"!==a||((r=Ct(this))&&_.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===t?"":_.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+Tt(Ct(n))+" ").indexOf(t))return!0;return!1}});var St=/\r/g;ce.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=v(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,ce(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=ce.map(t,function(e){return null==e?"":e+""})),(r=ce.valHooks[this.type]||ce.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=ce.valHooks[t.type]||ce.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(St,""):null==e?"":e:void 0}}),ce.extend({valHooks:{option:{get:function(e){var t=ce.find.attr(e,"value");return null!=t?t:Tt(ce.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!fe(n.parentNode,"optgroup"))){if(t=ce(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=ce.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<ce.inArray(ce.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),ce.each(["radio","checkbox"],function(){ce.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<ce.inArray(ce(e).val(),t)}},le.checkOn||(ce.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Et=ie.location,jt={guid:Date.now()},At=/\?/;ce.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new ie.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||ce.error("Invalid XML: "+(n?ce.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Dt=/^(?:focusinfocus|focusoutblur)$/,Nt=function(e){e.stopPropagation()};ce.extend(ce.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||C],d=ue.call(e,"type")?e.type:e,h=ue.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||C,3!==n.nodeType&&8!==n.nodeType&&!Dt.test(d+ce.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[ce.expando]?e:new ce.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:ce.makeArray(t,[e]),c=ce.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!y(n)){for(s=c.delegateType||d,Dt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||C)&&p.push(a.defaultView||a.parentWindow||ie)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(_.get(o,"events")||Object.create(null))[e.type]&&_.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&$(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!$(n)||u&&v(n[d])&&!y(n)&&((a=n[u])&&(n[u]=null),ce.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Nt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Nt),ce.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=ce.extend(new ce.Event,n,{type:e,isSimulated:!0});ce.event.trigger(r,null,t)}}),ce.fn.extend({trigger:function(e,t){return this.each(function(){ce.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ce.event.trigger(e,t,n,!0)}});var qt=/\[\]$/,Lt=/\r?\n/g,Ht=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;function Pt(n,e,r,i){var t;if(Array.isArray(e))ce.each(e,function(e,t){r||qt.test(n)?i(n,t):Pt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==x(e))i(n,e);else for(t in e)Pt(n+"["+t+"]",e[t],r,i)}ce.param=function(e,t){var n,r=[],i=function(e,t){var n=v(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!ce.isPlainObject(e))ce.each(e,function(){i(this.name,this.value)});else for(n in e)Pt(n,e[n],t,i);return r.join("&")},ce.fn.extend({serialize:function(){return ce.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ce.prop(this,"elements");return e?ce.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ce(this).is(":disabled")&&Ot.test(this.nodeName)&&!Ht.test(e)&&(this.checked||!we.test(e))}).map(function(e,t){var n=ce(this).val();return null==n?null:Array.isArray(n)?ce.map(n,function(e){return{name:t.name,value:e.replace(Lt,"\r\n")}}):{name:t.name,value:n.replace(Lt,"\r\n")}}).get()}});var Mt=/%20/g,Rt=/#.*$/,It=/([?&])_=[^&]*/,Wt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ft=/^(?:GET|HEAD)$/,$t=/^\/\//,Bt={},_t={},zt="*/".concat("*"),Xt=C.createElement("a");function Ut(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(D)||[];if(v(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Vt(t,i,o,a){var s={},u=t===_t;function l(e){var r;return s[e]=!0,ce.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Gt(e,t){var n,r,i=ce.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ce.extend(!0,e,r),e}Xt.href=Et.href,ce.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":zt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":ce.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Gt(Gt(e,ce.ajaxSettings),t):Gt(ce.ajaxSettings,e)},ajaxPrefilter:Ut(Bt),ajaxTransport:Ut(_t),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=ce.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?ce(y):ce.event,x=ce.Deferred(),b=ce.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Wt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace($t,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(D)||[""],null==v.crossDomain){r=C.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Xt.protocol+"//"+Xt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=ce.param(v.data,v.traditional)),Vt(Bt,v,t,T),h)return T;for(i in(g=ce.event&&v.global)&&0==ce.active++&&ce.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ft.test(v.type),f=v.url.replace(Rt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Mt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(At.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(It,"$1"),o=(At.test(f)?"&":"?")+"_="+jt.guid+++o),v.url=f+o),v.ifModified&&(ce.lastModified[f]&&T.setRequestHeader("If-Modified-Since",ce.lastModified[f]),ce.etag[f]&&T.setRequestHeader("If-None-Match",ce.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+zt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Vt(_t,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=ie.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&ie.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<ce.inArray("script",v.dataTypes)&&ce.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(ce.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(ce.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--ce.active||ce.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return ce.get(e,t,n,"json")},getScript:function(e,t){return ce.get(e,void 0,t,"script")}}),ce.each(["get","post"],function(e,i){ce[i]=function(e,t,n,r){return v(t)&&(r=r||n,n=t,t=void 0),ce.ajax(ce.extend({url:e,type:i,dataType:r,data:t,success:n},ce.isPlainObject(e)&&e))}}),ce.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),ce._evalUrl=function(e,t,n){return ce.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){ce.globalEval(e,t,n)}})},ce.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),t=ce(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return v(n)?this.each(function(e){ce(this).wrapInner(n.call(this,e))}):this.each(function(){var e=ce(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=v(t);return this.each(function(e){ce(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ce(this).replaceWith(this.childNodes)}),this}}),ce.expr.pseudos.hidden=function(e){return!ce.expr.pseudos.visible(e)},ce.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ce.ajaxSettings.xhr=function(){try{return new ie.XMLHttpRequest}catch(e){}};var Yt={0:200,1223:204},Qt=ce.ajaxSettings.xhr();le.cors=!!Qt&&"withCredentials"in Qt,le.ajax=Qt=!!Qt,ce.ajaxTransport(function(i){var o,a;if(le.cors||Qt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Yt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&ie.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),ce.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),ce.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ce.globalEval(e),e}}}),ce.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),ce.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=ce("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),C.head.appendChild(r[0])},abort:function(){i&&i()}}});var Jt,Kt=[],Zt=/(=)\?(?=&|$)|\?\?/;ce.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Kt.pop()||ce.expando+"_"+jt.guid++;return this[e]=!0,e}}),ce.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Zt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Zt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Zt,"$1"+r):!1!==e.jsonp&&(e.url+=(At.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||ce.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=ie[r],ie[r]=function(){o=arguments},n.always(function(){void 0===i?ce(ie).removeProp(r):ie[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Kt.push(r)),o&&v(i)&&i(o[0]),o=i=void 0}),"script"}),le.createHTMLDocument=((Jt=C.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Jt.childNodes.length),ce.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(le.createHTMLDocument?((r=(t=C.implementation.createHTMLDocument("")).createElement("base")).href=C.location.href,t.head.appendChild(r)):t=C),o=!n&&[],(i=w.exec(e))?[t.createElement(i[1])]:(i=Ae([e],t,o),o&&o.length&&ce(o).remove(),ce.merge([],i.childNodes)));var r,i,o},ce.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=Tt(e.slice(s)),e=e.slice(0,s)),v(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&ce.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?ce("<div>").append(ce.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},ce.expr.pseudos.animated=function(t){return ce.grep(ce.timers,function(e){return t===e.elem}).length},ce.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=ce.css(e,"position"),c=ce(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=ce.css(e,"top"),u=ce.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),v(t)&&(t=t.call(e,n,ce.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},ce.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){ce.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===ce.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===ce.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=ce(e).offset()).top+=ce.css(e,"borderTopWidth",!0),i.left+=ce.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-ce.css(r,"marginTop",!0),left:t.left-i.left-ce.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===ce.css(e,"position"))e=e.offsetParent;return e||J})}}),ce.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;ce.fn[t]=function(e){return M(this,function(e,t,n){var r;if(y(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),ce.each(["top","left"],function(e,n){ce.cssHooks[n]=Ye(le.pixelPosition,function(e,t){if(t)return t=Ge(e,n),_e.test(t)?ce(e).position()[n]+"px":t})}),ce.each({Height:"height",Width:"width"},function(a,s){ce.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){ce.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return M(this,function(e,t,n){var r;return y(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?ce.css(e,t,i):ce.style(e,t,n,i)},s,n?e:void 0,n)}})}),ce.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ce.fn[t]=function(e){return this.on(t,e)}}),ce.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){ce.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var en=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;ce.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return r=ae.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(ae.call(arguments)))}).guid=e.guid=e.guid||ce.guid++,i},ce.holdReady=function(e){e?ce.readyWait++:ce.ready(!0)},ce.isArray=Array.isArray,ce.parseJSON=JSON.parse,ce.nodeName=fe,ce.isFunction=v,ce.isWindow=y,ce.camelCase=F,ce.type=x,ce.now=Date.now,ce.isNumeric=function(e){var t=ce.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},ce.trim=function(e){return null==e?"":(e+"").replace(en,"$1")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return ce});var tn=ie.jQuery,nn=ie.$;return ce.noConflict=function(e){return ie.$===ce&&(ie.$=nn),e&&ie.jQuery===ce&&(ie.jQuery=tn),ce},"undefined"==typeof e&&(ie.jQuery=ie.$=ce),ce});

var luxon=function(e){"use strict";function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,function(e){e=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"==typeof e?e:String(e)}(r.key),r)}}function i(e,t,n){t&&L(e.prototype,t),n&&L(e,n),Object.defineProperty(e,"prototype",{writable:!1})}function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function o(e,t){e.prototype=Object.create(t.prototype),z(e.prototype.constructor=e,t)}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e,t){return(z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function A(e,t,n){return(A=function(){if("undefined"!=typeof Reflect&&Reflect.construct&&!Reflect.construct.sham){if("function"==typeof Proxy)return 1;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),1}catch(e){}}}()?Reflect.construct.bind():function(e,t,n){var r=[null];r.push.apply(r,t);t=new(Function.bind.apply(e,r));return n&&z(t,n.prototype),t}).apply(null,arguments)}function q(e){var n="function"==typeof Map?new Map:void 0;return function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,t)}function t(){return A(e,arguments,j(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),z(t,e)}(e)}function _(e,t){if(null==e)return{};for(var n,r={},i=Object.keys(e),o=0;o<i.length;o++)n=i[o],0<=t.indexOf(n)||(r[n]=e[n]);return r}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function R(e,t){var n,r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){var n;if(e)return"string"==typeof e?U(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(e,t):void 0}(e))||t&&e&&"number"==typeof e.length)return r&&(e=r),n=0,function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var t=function(e){function t(){return e.apply(this,arguments)||this}return o(t,e),t}(q(Error)),Y=function(t){function e(e){return t.call(this,"Invalid DateTime: "+e.toMessage())||this}return o(e,t),e}(t),P=function(t){function e(e){return t.call(this,"Invalid Interval: "+e.toMessage())||this}return o(e,t),e}(t),H=function(t){function e(e){return t.call(this,"Invalid Duration: "+e.toMessage())||this}return o(e,t),e}(t),w=function(e){function t(){return e.apply(this,arguments)||this}return o(t,e),t}(t),J=function(t){function e(e){return t.call(this,"Invalid unit "+e)||this}return o(e,t),e}(t),u=function(e){function t(){return e.apply(this,arguments)||this}return o(t,e),t}(t),n=function(e){function t(){return e.call(this,"Zone is an abstract class")||this}return o(t,e),t}(t),t="numeric",r="short",a="long",G={year:t,month:t,day:t},$={year:t,month:r,day:t},B={year:t,month:r,day:t,weekday:r},Q={year:t,month:a,day:t},K={year:t,month:a,day:t,weekday:a},X={hour:t,minute:t},ee={hour:t,minute:t,second:t},te={hour:t,minute:t,second:t,timeZoneName:r},ne={hour:t,minute:t,second:t,timeZoneName:a},re={hour:t,minute:t,hourCycle:"h23"},ie={hour:t,minute:t,second:t,hourCycle:"h23"},oe={hour:t,minute:t,second:t,hourCycle:"h23",timeZoneName:r},ae={hour:t,minute:t,second:t,hourCycle:"h23",timeZoneName:a},ue={year:t,month:t,day:t,hour:t,minute:t},se={year:t,month:t,day:t,hour:t,minute:t,second:t},le={year:t,month:r,day:t,hour:t,minute:t},ce={year:t,month:r,day:t,hour:t,minute:t,second:t},fe={year:t,month:r,day:t,weekday:r,hour:t,minute:t},de={year:t,month:a,day:t,hour:t,minute:t,timeZoneName:r},he={year:t,month:a,day:t,hour:t,minute:t,second:t,timeZoneName:r},me={year:t,month:a,day:t,weekday:a,hour:t,minute:t,timeZoneName:a},ye={year:t,month:a,day:t,weekday:a,hour:t,minute:t,second:t,timeZoneName:a},s=function(){function e(){}var t=e.prototype;return t.offsetName=function(e,t){throw new n},t.formatOffset=function(e,t){throw new n},t.offset=function(e){throw new n},t.equals=function(e){throw new n},i(e,[{key:"type",get:function(){throw new n}},{key:"name",get:function(){throw new n}},{key:"ianaName",get:function(){return this.name}},{key:"isUniversal",get:function(){throw new n}},{key:"isValid",get:function(){throw new n}}]),e}(),ve=null,ge=function(e){function t(){return e.apply(this,arguments)||this}o(t,e);var n=t.prototype;return n.offsetName=function(e,t){return gt(e,t.format,t.locale)},n.formatOffset=function(e,t){return bt(this.offset(e),t)},n.offset=function(e){return-new Date(e).getTimezoneOffset()},n.equals=function(e){return"system"===e.type},i(t,[{key:"type",get:function(){return"system"}},{key:"name",get:function(){return(new Intl.DateTimeFormat).resolvedOptions().timeZone}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return!0}}],[{key:"instance",get:function(){return ve=null===ve?new t:ve}}]),t}(s),pe={};var ke={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};var we={},f=function(n){function r(e){var t=n.call(this)||this;return t.zoneName=e,t.valid=r.isValidZone(e),t}o(r,n),r.create=function(e){return we[e]||(we[e]=new r(e)),we[e]},r.resetCache=function(){we={},pe={}},r.isValidSpecifier=function(e){return this.isValidZone(e)},r.isValidZone=function(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}};var e=r.prototype;return e.offsetName=function(e,t){return gt(e,t.format,t.locale,this.name)},e.formatOffset=function(e,t){return bt(this.offset(e),t)},e.offset=function(e){var t,n,r,i,o,a,u,s,e=new Date(e);return isNaN(e)?NaN:(i=this.name,pe[i]||(pe[i]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:i,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),a=(i=(i=pe[i]).formatToParts?function(e,t){for(var n=e.formatToParts(t),r=[],i=0;i<n.length;i++){var o=n[i],a=o.type,o=o.value,u=ke[a];"era"===a?r[u]=o:N(u)||(r[u]=parseInt(o,10))}return r}(i,e):(o=e,i=(i=i).format(o).replace(/\u200E/g,""),i=(o=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i))[1],a=o[2],[o[3],i,a,o[4],o[5],o[6],o[7]]))[0],o=i[1],t=i[2],n=i[3],u=i[4],r=i[5],i=i[6],u=24===u?0:u,s=(e=+e)%1e3,(ht({year:a="BC"===n?1-Math.abs(a):a,month:o,day:t,hour:u,minute:r,second:i,millisecond:0})-(e-=0<=s?s:1e3+s))/6e4)},e.equals=function(e){return"iana"===e.type&&e.name===this.name},i(r,[{key:"type",get:function(){return"iana"}},{key:"name",get:function(){return this.zoneName}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return this.valid}}]),r}(s),be=["base"],Se=["padTo","floor"],Oe={};var Te={};function Ne(e,t){void 0===t&&(t={});var n=JSON.stringify([e,t]),r=Te[n];return r||(r=new Intl.DateTimeFormat(e,t),Te[n]=r),r}var De={};var Me={};var Ie=null;var Ve={};function Ee(e,t,n,r){e=e.listingMode();return"error"===e?null:("en"===e?n:r)(t)}var xe=function(){function e(e,t,n){this.padTo=n.padTo||0,this.floor=n.floor||!1,n.padTo,n.floor;var r=_(n,Se);(!t||0<Object.keys(r).length)&&(t=l({useGrouping:!1},n),0<n.padTo&&(t.minimumIntegerDigits=n.padTo),this.inf=(r=e,void 0===(n=t)&&(n={}),e=JSON.stringify([r,n]),(t=De[e])||(t=new Intl.NumberFormat(r,n),De[e]=t),t))}return e.prototype.format=function(e){var t;return this.inf?(t=this.floor?Math.floor(e):e,this.inf.format(t)):m(this.floor?Math.floor(e):ct(e,3),this.padTo)},e}(),Ce=function(){function e(e,t,n){this.opts=n;var n=this.originalZone=void 0,r=(this.opts.timeZone?this.dt=e:"fixed"===e.zone.type?(r=0<=(r=e.offset/60*-1)?"Etc/GMT+"+r:"Etc/GMT"+r,0!==e.offset&&f.create(r).valid?(n=r,this.dt=e):(n="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)):"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?n=(this.dt=e).zone.name:(this.dt=e.setZone(n="UTC").plus({minutes:e.offset}),this.originalZone=e.zone),l({},this.opts));r.timeZone=r.timeZone||n,this.dtf=Ne(t,r)}var t=e.prototype;return t.format=function(){return this.originalZone?this.formatToParts().map(function(e){return e.value}).join(""):this.dtf.format(this.dt.toJSDate())},t.formatToParts=function(){var t=this,e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(function(e){return"timeZoneName"===e.type?l({},e,{value:t.originalZone.offsetName(t.dt.ts,{locale:t.dt.locale,format:t.opts.timeZoneName})}):e}):e},t.resolvedOptions=function(){return this.dtf.resolvedOptions()},e}(),Fe=function(){function e(e,t,n){var r;this.opts=l({style:"long"},n),!t&&ot()&&(this.rtf=(t=e,(n=e=void 0===(e=n)?{}:e).base,n=_(n=e,be),n=JSON.stringify([t,n]),(r=Me[n])||(r=new Intl.RelativeTimeFormat(t,e),Me[n]=r),r))}var t=e.prototype;return t.format=function(e,t){if(this.rtf)return this.rtf.format(e,t);var n=t,t=e,e=this.opts.numeric,r="long"!==this.opts.style,i=(void 0===e&&(e="always"),void 0===r&&(r=!1),{years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]}),o=-1===["hours","minutes","seconds"].indexOf(n);if("auto"===e&&o){var a="days"===n;switch(t){case 1:return a?"tomorrow":"next "+i[n][0];case-1:return a?"yesterday":"last "+i[n][0];case 0:return a?"today":"this "+i[n][0]}}var e=Object.is(t,-0)||t<0,t=1===(o=Math.abs(t)),u=i[n],r=r?!t&&u[2]||u[1]:t?i[n][0]:n;return e?o+" "+r+" ago":"in "+o+" "+r},t.formatToParts=function(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]},e}(),Ze={firstDay:1,minimalDays:4,weekend:[6,7]},b=function(){function o(e,t,n,r,i){var e=function(t){var n=t.indexOf("-x-");if(-1===(n=(t=-1!==n?t.substring(0,n):t).indexOf("-u-")))return[t];try{r=Ne(t).resolvedOptions(),i=t}catch(e){var t=t.substring(0,n),r=Ne(t).resolvedOptions(),i=t}return[i,(n=r).numberingSystem,n.calendar]}(e),o=e[0],a=e[1],e=e[2];this.locale=o,this.numberingSystem=t||a||null,this.outputCalendar=n||e||null,this.weekSettings=r,this.intl=(o=this.locale,t=this.numberingSystem,((a=this.outputCalendar)||t)&&(o.includes("-u-")||(o+="-u"),a&&(o+="-ca-"+a),t)&&(o+="-nu-"+t),o),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=i,this.fastNumbersCached=null}o.fromOpts=function(e){return o.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)},o.create=function(e,t,n,r,i){void 0===i&&(i=!1);e=e||O.defaultLocale;return new o(e||(i?"en-US":Ie=Ie||(new Intl.DateTimeFormat).resolvedOptions().locale),t||O.defaultNumberingSystem,n||O.defaultOutputCalendar,st(r)||O.defaultWeekSettings,e)},o.resetCache=function(){Ie=null,Te={},De={},Me={}},o.fromObject=function(e){var e=void 0===e?{}:e,t=e.locale,n=e.numberingSystem,r=e.outputCalendar,e=e.weekSettings;return o.create(t,n,r,e)};var e=o.prototype;return e.listingMode=function(){var e=this.isEnglish(),t=!(null!==this.numberingSystem&&"latn"!==this.numberingSystem||null!==this.outputCalendar&&"gregory"!==this.outputCalendar);return e&&t?"en":"intl"},e.clone=function(e){return e&&0!==Object.getOwnPropertyNames(e).length?o.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,st(e.weekSettings)||this.weekSettings,e.defaultToEN||!1):this},e.redefaultToEN=function(e){return this.clone(l({},e=void 0===e?{}:e,{defaultToEN:!0}))},e.redefaultToSystem=function(e){return this.clone(l({},e=void 0===e?{}:e,{defaultToEN:!1}))},e.months=function(n,r){var i=this;return void 0===r&&(r=!1),Ee(this,n,Dt,function(){var t=r?{month:n,day:"numeric"}:{month:n},e=r?"format":"standalone";return i.monthsCache[e][n]||(i.monthsCache[e][n]=function(e){for(var t=[],n=1;n<=12;n++){var r=W.utc(2009,n,1);t.push(e(r))}return t}(function(e){return i.extract(e,t,"month")})),i.monthsCache[e][n]})},e.weekdays=function(n,r){var i=this;return void 0===r&&(r=!1),Ee(this,n,Et,function(){var t=r?{weekday:n,year:"numeric",month:"long",day:"numeric"}:{weekday:n},e=r?"format":"standalone";return i.weekdaysCache[e][n]||(i.weekdaysCache[e][n]=function(e){for(var t=[],n=1;n<=7;n++){var r=W.utc(2016,11,13+n);t.push(e(r))}return t}(function(e){return i.extract(e,t,"weekday")})),i.weekdaysCache[e][n]})},e.meridiems=function(){var n=this;return Ee(this,void 0,function(){return xt},function(){var t;return n.meridiemCache||(t={hour:"numeric",hourCycle:"h12"},n.meridiemCache=[W.utc(2016,11,13,9),W.utc(2016,11,13,19)].map(function(e){return n.extract(e,t,"dayperiod")})),n.meridiemCache})},e.eras=function(e){var n=this;return Ee(this,e,Wt,function(){var t={era:e};return n.eraCache[e]||(n.eraCache[e]=[W.utc(-40,1,1),W.utc(2017,1,1)].map(function(e){return n.extract(e,t,"era")})),n.eraCache[e]})},e.extract=function(e,t,n){e=this.dtFormatter(e,t).formatToParts().find(function(e){return e.type.toLowerCase()===n});return e?e.value:null},e.numberFormatter=function(e){return new xe(this.intl,(e=void 0===e?{}:e).forceSimple||this.fastNumbers,e)},e.dtFormatter=function(e,t){return new Ce(e,this.intl,t=void 0===t?{}:t)},e.relFormatter=function(e){return void 0===e&&(e={}),new Fe(this.intl,this.isEnglish(),e)},e.listFormatter=function(e){return void 0===e&&(e={}),t=this.intl,void 0===(e=e)&&(e={}),n=JSON.stringify([t,e]),(r=Oe[n])||(r=new Intl.ListFormat(t,e),Oe[n]=r),r;var t,n,r},e.isEnglish=function(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")},e.getWeekSettings=function(){return this.weekSettings||(at()?(e=this.locale,(n=Ve[e])||(n="getWeekInfo"in(t=new Intl.Locale(e))?t.getWeekInfo():t.weekInfo,Ve[e]=n),n):Ze);var e,t,n},e.getStartOfWeek=function(){return this.getWeekSettings().firstDay},e.getMinDaysInFirstWeek=function(){return this.getWeekSettings().minimalDays},e.getWeekendDays=function(){return this.getWeekSettings().weekend},e.equals=function(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar},i(o,[{key:"fastNumbers",get:function(){var e;return null==this.fastNumbersCached&&(this.fastNumbersCached=(!(e=this).numberingSystem||"latn"===e.numberingSystem)&&("latn"===e.numberingSystem||!e.locale||e.locale.startsWith("en")||"latn"===new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem)),this.fastNumbersCached}}]),o}(),We=null,d=function(n){function t(e){var t=n.call(this)||this;return t.fixed=e,t}o(t,n),t.instance=function(e){return 0===e?t.utcInstance:new t(e)},t.parseSpecifier=function(e){if(e){e=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(e)return new t(pt(e[1],e[2]))}return null};var e=t.prototype;return e.offsetName=function(){return this.name},e.formatOffset=function(e,t){return bt(this.fixed,t)},e.offset=function(){return this.fixed},e.equals=function(e){return"fixed"===e.type&&e.fixed===this.fixed},i(t,[{key:"type",get:function(){return"fixed"}},{key:"name",get:function(){return 0===this.fixed?"UTC":"UTC"+bt(this.fixed,"narrow")}},{key:"ianaName",get:function(){return 0===this.fixed?"Etc/UTC":"Etc/GMT"+bt(-this.fixed,"narrow")}},{key:"isUniversal",get:function(){return!0}},{key:"isValid",get:function(){return!0}}],[{key:"utcInstance",get:function(){return We=null===We?new t(0):We}}]),t}(s),Le=function(n){function e(e){var t=n.call(this)||this;return t.zoneName=e,t}o(e,n);var t=e.prototype;return t.offsetName=function(){return null},t.formatOffset=function(){return""},t.offset=function(){return NaN},t.equals=function(){return!1},i(e,[{key:"type",get:function(){return"invalid"}},{key:"name",get:function(){return this.zoneName}},{key:"isUniversal",get:function(){return!1}},{key:"isValid",get:function(){return!1}}]),e}(s);function S(e,t){var n;return N(e)||null===e?t:e instanceof s?e:"string"==typeof e?"default"===(n=e.toLowerCase())?t:"local"===n||"system"===n?ge.instance:"utc"===n||"gmt"===n?d.utcInstance:d.parseSpecifier(n)||f.create(e):y(e)?d.instance(e):"object"==typeof e&&"offset"in e&&"function"==typeof e.offset?e:new Le(e)}var je,ze=function(){return Date.now()},Ae="system",qe=null,_e=null,Ue=null,Re=60,Ye=null,O=function(){function e(){}return e.resetCaches=function(){b.resetCache(),f.resetCache()},i(e,null,[{key:"now",get:function(){return ze},set:function(e){ze=e}},{key:"defaultZone",get:function(){return S(Ae,ge.instance)},set:function(e){Ae=e}},{key:"defaultLocale",get:function(){return qe},set:function(e){qe=e}},{key:"defaultNumberingSystem",get:function(){return _e},set:function(e){_e=e}},{key:"defaultOutputCalendar",get:function(){return Ue},set:function(e){Ue=e}},{key:"defaultWeekSettings",get:function(){return Ye},set:function(e){Ye=st(e)}},{key:"twoDigitCutoffYear",get:function(){return Re},set:function(e){Re=e%100}},{key:"throwOnInvalid",get:function(){return je},set:function(e){je=e}}]),e}(),c=function(){function e(e,t){this.reason=e,this.explanation=t}return e.prototype.toMessage=function(){return this.explanation?this.reason+": "+this.explanation:this.reason},e}(),Pe=[0,31,59,90,120,151,181,212,243,273,304,334],He=[0,31,60,91,121,152,182,213,244,274,305,335];function T(e,t){return new c("unit out of range","you specified "+t+" (of type "+typeof t+") as a "+e+", which is invalid")}function Je(e,t,n){t=new Date(Date.UTC(e,t-1,n)),e<100&&0<=e&&t.setUTCFullYear(t.getUTCFullYear()-1900),n=t.getUTCDay();return 0===n?7:n}function Ge(e,t,n){return n+(ft(e)?He:Pe)[t-1]}function $e(e,t){var e=ft(e)?He:Pe,n=e.findIndex(function(e){return e<t});return{month:n+1,day:t-e[n]}}function Be(e,t){return(e-t+7)%7+1}function Qe(e,t,n){void 0===t&&(t=4),void 0===n&&(n=1);var r,i=e.year,o=e.month,a=e.day,u=Ge(i,o,a),o=Be(Je(i,o,a),n),a=Math.floor((u-o+14-t)/7);return a<1?a=yt(r=i-1,t,n):a>yt(i,t,n)?(r=i+1,a=1):r=i,l({weekYear:r,weekNumber:a,weekday:o},St(e))}function Ke(e,t,n){void 0===n&&(n=1);var r,i=e.weekYear,o=e.weekNumber,a=e.weekday,n=Be(Je(i,1,t=void 0===t?4:t),n),u=M(i),o=7*o+a-n-7+t,a=(o<1?o+=M(r=i-1):u<o?(r=i+1,o-=M(i)):r=i,$e(r,o));return l({year:r,month:a.month,day:a.day},St(e))}function Xe(e){var t=e.year;return l({year:t,ordinal:Ge(t,e.month,e.day)},St(e))}function et(e){var t=e.year,n=$e(t,e.ordinal);return l({year:t,month:n.month,day:n.day},St(e))}function tt(e,t){if(N(e.localWeekday)&&N(e.localWeekNumber)&&N(e.localWeekYear))return{minDaysInFirstWeek:4,startOfWeek:1};if(N(e.weekday)&&N(e.weekNumber)&&N(e.weekYear))return N(e.localWeekday)||(e.weekday=e.localWeekday),N(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),N(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()};throw new w("Cannot mix locale-based week fields with ISO-based week fields")}function nt(e){var t=it(e.year),n=D(e.month,1,12),r=D(e.day,1,dt(e.year,e.month));return t?n?!r&&T("day",e.day):T("month",e.month):T("year",e.year)}function rt(e){var t=e.hour,n=e.minute,r=e.second,e=e.millisecond,i=D(t,0,23)||24===t&&0===n&&0===r&&0===e,o=D(n,0,59),a=D(r,0,59),u=D(e,0,999);return i?o?a?!u&&T("millisecond",e):T("second",r):T("minute",n):T("hour",t)}function N(e){return void 0===e}function y(e){return"number"==typeof e}function it(e){return"number"==typeof e&&e%1==0}function ot(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function at(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function ut(e,n,r){if(0!==e.length)return e.reduce(function(e,t){t=[n(t),t];return e&&r(e[0],t[0])===e[0]?e:t},null)[1]}function h(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function st(e){if(null==e)return null;if("object"!=typeof e)throw new u("Week settings must be an object");if(D(e.firstDay,1,7)&&D(e.minimalDays,1,7)&&Array.isArray(e.weekend)&&!e.weekend.some(function(e){return!D(e,1,7)}))return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)};throw new u("Invalid week settings")}function D(e,t,n){return it(e)&&t<=e&&e<=n}function m(e,t){void 0===t&&(t=2);e=e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0");return e}function v(e){if(!N(e)&&null!==e&&""!==e)return parseInt(e,10)}function g(e){if(!N(e)&&null!==e&&""!==e)return parseFloat(e)}function lt(e){if(!N(e)&&null!==e&&""!==e)return e=1e3*parseFloat("0."+e),Math.floor(e)}function ct(e,t,n){void 0===n&&(n=!1);t=Math.pow(10,t);return(n?Math.trunc:Math.round)(e*t)/t}function ft(e){return e%4==0&&(e%100!=0||e%400==0)}function M(e){return ft(e)?366:365}function dt(e,t){var n,r=(r=t-1)-(n=12)*Math.floor(r/n)+1;return 2==r?ft(e+(t-r)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][r-1]}function ht(e){var t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&0<=e.year&&(t=new Date(t)).setUTCFullYear(e.year,e.month-1,e.day),+t}function mt(e,t,n){return-Be(Je(e,1,t),n)+t-1}function yt(e,t,n){var r=mt(e,t=void 0===t?4:t,n=void 0===n?1:n),t=mt(e+1,t,n);return(M(e)-r+t)/7}function vt(e){return 99<e?e:e>O.twoDigitCutoffYear?1900+e:2e3+e}function gt(e,t,n,r){void 0===r&&(r=null);var e=new Date(e),i={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"},r=(r&&(i.timeZone=r),l({timeZoneName:t},i)),t=new Intl.DateTimeFormat(n,r).formatToParts(e).find(function(e){return"timezonename"===e.type.toLowerCase()});return t?t.value:null}function pt(e,t){e=parseInt(e,10),Number.isNaN(e)&&(e=0),t=parseInt(t,10)||0;return 60*e+(e<0||Object.is(e,-0)?-t:t)}function kt(e){var t=Number(e);if("boolean"==typeof e||""===e||Number.isNaN(t))throw new u("Invalid unit value "+e);return t}function wt(e,t){var n,r,i={};for(n in e)h(e,n)&&null!=(r=e[n])&&(i[t(n)]=kt(r));return i}function bt(e,t){var n=Math.trunc(Math.abs(e/60)),r=Math.trunc(Math.abs(e%60)),i=0<=e?"+":"-";switch(t){case"short":return i+m(n,2)+":"+m(r,2);case"narrow":return i+n+(0<r?":"+r:"");case"techie":return i+m(n,2)+m(r,2);default:throw new RangeError("Value format "+t+" is out of range for property format")}}function St(e){return n=e,["hour","minute","second","millisecond"].reduce(function(e,t){return e[t]=n[t],e},{});var n}var Ot=["January","February","March","April","May","June","July","August","September","October","November","December"],Tt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Nt=["J","F","M","A","M","J","J","A","S","O","N","D"];function Dt(e){switch(e){case"narrow":return[].concat(Nt);case"short":return[].concat(Tt);case"long":return[].concat(Ot);case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}var Mt=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],It=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],Vt=["M","T","W","T","F","S","S"];function Et(e){switch(e){case"narrow":return[].concat(Vt);case"short":return[].concat(It);case"long":return[].concat(Mt);case"numeric":return["1","2","3","4","5","6","7"];default:return null}}var xt=["AM","PM"],Ct=["Before Christ","Anno Domini"],Ft=["BC","AD"],Zt=["B","A"];function Wt(e){switch(e){case"narrow":return[].concat(Zt);case"short":return[].concat(Ft);case"long":return[].concat(Ct);default:return null}}function Lt(e,t){for(var n="",r=R(e);!(i=r()).done;){var i=i.value;i.literal?n+=i.val:n+=t(i.val)}return n}var jt={D:G,DD:$,DDD:Q,DDDD:K,t:X,tt:ee,ttt:te,tttt:ne,T:re,TT:ie,TTT:oe,TTTT:ae,f:ue,ff:le,fff:de,ffff:me,F:se,FF:ce,FFF:he,FFFF:ye},p=function(){function d(e,t){this.opts=t,this.loc=e,this.systemLoc=null}d.create=function(e,t){return new d(e,t=void 0===t?{}:t)},d.parseFormat=function(e){for(var t=null,n="",r=!1,i=[],o=0;o<e.length;o++){var a=e.charAt(o);"'"===a?(0<n.length&&i.push({literal:r||/^\s+$/.test(n),val:n}),t=null,n="",r=!r):r||a===t?n+=a:(0<n.length&&i.push({literal:/^\s+$/.test(n),val:n}),t=n=a)}return 0<n.length&&i.push({literal:r||/^\s+$/.test(n),val:n}),i},d.macroTokenToFormatOpts=function(e){return jt[e]};var e=d.prototype;return e.formatWithSystemDefault=function(e,t){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,l({},this.opts,t)).format()},e.dtFormatter=function(e,t){return this.loc.dtFormatter(e,l({},this.opts,t=void 0===t?{}:t))},e.formatDateTime=function(e,t){return this.dtFormatter(e,t).format()},e.formatDateTimeParts=function(e,t){return this.dtFormatter(e,t).formatToParts()},e.formatInterval=function(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())},e.resolvedOptions=function(e,t){return this.dtFormatter(e,t).resolvedOptions()},e.num=function(e,t){var n;return void 0===t&&(t=0),this.opts.forceSimple?m(e,t):(n=l({},this.opts),0<t&&(n.padTo=t),this.loc.numberFormatter(n).format(e))},e.formatDateTimeFromString=function(r,e){var n=this,i="en"===this.loc.listingMode(),t=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,o=function(e,t){return n.loc.extract(r,e,t)},a=function(e){return r.isOffsetFixed&&0===r.offset&&e.allowZ?"Z":r.isValid?r.zone.formatOffset(r.ts,e.format):""},u=function(){return i?xt[r.hour<12?0:1]:o({hour:"numeric",hourCycle:"h12"},"dayperiod")},s=function(e,t){return i?(n=r,Dt(e)[n.month-1]):o(t?{month:e}:{month:e,day:"numeric"},"month");var n},l=function(e,t){return i?(n=r,Et(e)[n.weekday-1]):o(t?{weekday:e}:{weekday:e,month:"long",day:"numeric"},"weekday");var n},c=function(e){var t=d.macroTokenToFormatOpts(e);return t?n.formatWithSystemDefault(r,t):e},f=function(e){return i?(t=r,Wt(e)[t.year<0?0:1]):o({era:e},"era");var t};return Lt(d.parseFormat(e),function(e){switch(e){case"S":return n.num(r.millisecond);case"u":case"SSS":return n.num(r.millisecond,3);case"s":return n.num(r.second);case"ss":return n.num(r.second,2);case"uu":return n.num(Math.floor(r.millisecond/10),2);case"uuu":return n.num(Math.floor(r.millisecond/100));case"m":return n.num(r.minute);case"mm":return n.num(r.minute,2);case"h":return n.num(r.hour%12==0?12:r.hour%12);case"hh":return n.num(r.hour%12==0?12:r.hour%12,2);case"H":return n.num(r.hour);case"HH":return n.num(r.hour,2);case"Z":return a({format:"narrow",allowZ:n.opts.allowZ});case"ZZ":return a({format:"short",allowZ:n.opts.allowZ});case"ZZZ":return a({format:"techie",allowZ:n.opts.allowZ});case"ZZZZ":return r.zone.offsetName(r.ts,{format:"short",locale:n.loc.locale});case"ZZZZZ":return r.zone.offsetName(r.ts,{format:"long",locale:n.loc.locale});case"z":return r.zoneName;case"a":return u();case"d":return t?o({day:"numeric"},"day"):n.num(r.day);case"dd":return t?o({day:"2-digit"},"day"):n.num(r.day,2);case"c":return n.num(r.weekday);case"ccc":return l("short",!0);case"cccc":return l("long",!0);case"ccccc":return l("narrow",!0);case"E":return n.num(r.weekday);case"EEE":return l("short",!1);case"EEEE":return l("long",!1);case"EEEEE":return l("narrow",!1);case"L":return t?o({month:"numeric",day:"numeric"},"month"):n.num(r.month);case"LL":return t?o({month:"2-digit",day:"numeric"},"month"):n.num(r.month,2);case"LLL":return s("short",!0);case"LLLL":return s("long",!0);case"LLLLL":return s("narrow",!0);case"M":return t?o({month:"numeric"},"month"):n.num(r.month);case"MM":return t?o({month:"2-digit"},"month"):n.num(r.month,2);case"MMM":return s("short",!1);case"MMMM":return s("long",!1);case"MMMMM":return s("narrow",!1);case"y":return t?o({year:"numeric"},"year"):n.num(r.year);case"yy":return t?o({year:"2-digit"},"year"):n.num(r.year.toString().slice(-2),2);case"yyyy":return t?o({year:"numeric"},"year"):n.num(r.year,4);case"yyyyyy":return t?o({year:"numeric"},"year"):n.num(r.year,6);case"G":return f("short");case"GG":return f("long");case"GGGGG":return f("narrow");case"kk":return n.num(r.weekYear.toString().slice(-2),2);case"kkkk":return n.num(r.weekYear,4);case"W":return n.num(r.weekNumber);case"WW":return n.num(r.weekNumber,2);case"n":return n.num(r.localWeekNumber);case"nn":return n.num(r.localWeekNumber,2);case"ii":return n.num(r.localWeekYear.toString().slice(-2),2);case"iiii":return n.num(r.localWeekYear,4);case"o":return n.num(r.ordinal);case"ooo":return n.num(r.ordinal,3);case"q":return n.num(r.quarter);case"qq":return n.num(r.quarter,2);case"X":return n.num(Math.floor(r.ts/1e3));case"x":return n.num(r.ts);default:return c(e)}})},e.formatDurationFromString=function(e,t){var n,r=this,i=function(e){switch(e[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},t=d.parseFormat(t),o=t.reduce(function(e,t){var n=t.literal,t=t.val;return n?e:e.concat(t)},[]),e=e.shiftTo.apply(e,o.map(i).filter(function(e){return e}));return Lt(t,(n=e,function(e){var t=i(e);return t?r.num(n.get(t),e.length):e}))},d}(),r=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function zt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.reduce(function(e,t){return e+t.source},"");return RegExp("^"+r+"$")}function At(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(o){return t.reduce(function(e,t){var n=e[0],r=e[1],e=e[2],t=t(o,e),e=t[0],i=t[1],t=t[2];return[l({},n,e),i||r,t]},[{},null,1]).slice(0,2)}}function qt(e){if(null!=e){for(var t=arguments.length,n=new Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var i=0,o=n;i<o.length;i++){var a=o[i],u=a[0],a=a[1],u=u.exec(e);if(u)return a(u)}}return[null,null]}function _t(){for(var e=arguments.length,i=new Array(e),t=0;t<e;t++)i[t]=arguments[t];return function(e,t){for(var n={},r=0;r<i.length;r++)n[i[r]]=v(e[t+r]);return[n,null,t+r]}}var t=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,a=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,Ut=RegExp(a.source+("(?:"+t.source+"?(?:\\[("+r.source+")\\])?)?")),k=RegExp("(?:T"+Ut.source+")?"),Rt=_t("weekYear","weekNumber","weekDay"),Yt=_t("year","ordinal"),t=RegExp(a.source+" ?(?:"+t.source+"|("+r.source+"))?"),r=RegExp("(?: "+t.source+")?");function Pt(e,t,n){e=e[t];return N(e)?n:v(e)}function Ht(e,t){return[{hours:Pt(e,t,0),minutes:Pt(e,t+1,0),seconds:Pt(e,t+2,0),milliseconds:lt(e[t+3])},null,t+4]}function Jt(e,t){var n=!e[t]&&!e[t+1],e=pt(e[t+1],e[t+2]);return[{},n?null:d.instance(e),t+3]}function Gt(e,t){return[{},e[t]?f.create(e[t]):null,t+1]}var $t=RegExp("^T?"+a.source+"$"),Bt=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function Qt(e){function t(e,t){return void 0===t&&(t=!1),void 0!==e&&(t||e&&c)?-e:e}var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],u=e[5],s=e[6],l=e[7],e=e[8],c="-"===n[0],n=l&&"-"===l[0];return[{years:t(g(r)),months:t(g(i)),weeks:t(g(o)),days:t(g(a)),hours:t(g(u)),minutes:t(g(s)),seconds:t(g(l),"-0"===l),milliseconds:t(lt(e),n)}]}var Kt={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Xt(e,t,n,r,i,o,a){t={year:2===t.length?vt(v(t)):v(t),month:Tt.indexOf(n)+1,day:v(r),hour:v(i),minute:v(o)};return a&&(t.second=v(a)),e&&(t.weekday=3<e.length?Mt.indexOf(e)+1:It.indexOf(e)+1),t}var en=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function tn(e){var t=e[1],n=e[2],r=e[3],i=e[4],o=e[5],a=e[6],u=e[7],s=e[8],l=e[9],c=e[10],e=e[11],t=Xt(t,i,r,n,o,a,u),i=s?Kt[s]:l?0:pt(c,e);return[t,new d(i)]}var nn=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,rn=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,on=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function an(e){var t=e[1],n=e[2],r=e[3];return[Xt(t,e[4],r,n,e[5],e[6],e[7]),d.utcInstance]}function un(e){var t=e[1],n=e[2],r=e[3],i=e[4],o=e[5],a=e[6];return[Xt(t,e[7],n,r,i,o,a),d.utcInstance]}var sn=zt(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,k),ln=zt(/(\d{4})-?W(\d\d)(?:-?(\d))?/,k),cn=zt(/(\d{4})-?(\d{3})/,k),fn=zt(Ut),dn=At(function(e,t){return[{year:Pt(e,t),month:Pt(e,t+1,1),day:Pt(e,t+2,1)},null,t+3]},Ht,Jt,Gt),hn=At(Rt,Ht,Jt,Gt),mn=At(Yt,Ht,Jt,Gt),yn=At(Ht,Jt,Gt);var vn=At(Ht);var gn=zt(/(\d{4})-(\d\d)-(\d\d)/,r),pn=zt(t),kn=At(Ht,Jt,Gt);var wn="Invalid Duration",a={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},bn=l({years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6}},a),k=365.2425,Ut=30.436875,Sn=l({years:{quarters:4,months:12,weeks:k/7,days:k,hours:24*k,minutes:525949.2,seconds:525949.2*60,milliseconds:525949.2*60*1e3},quarters:{months:3,weeks:k/28,days:k/4,hours:24*k/4,minutes:131487.3,seconds:525949.2*60/4,milliseconds:7889237999.999999},months:{weeks:Ut/7,days:Ut,hours:24*Ut,minutes:43829.1,seconds:2629746,milliseconds:2629746e3}},a),I=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],On=I.slice(0).reverse();function V(e,t,n){n={values:(n=void 0===n?!1:n)?t.values:l({},e.values,t.values||{}),loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix};return new E(n)}function Tn(e,t){for(var n,r=null!=(n=t.milliseconds)?n:0,i=R(On.slice(1));!(o=i()).done;){var o=o.value;t[o]&&(r+=t[o]*e[o].milliseconds)}return r}function Nn(i,o){var a=Tn(i,o)<0?-1:1;I.reduceRight(function(e,t){var n,r;return N(o[t])?e:(e&&(r=o[e]*a,n=i[t][e],r=Math.floor(r/n),o[t]+=r*a,o[e]-=r*n*a),t)},null),I.reduce(function(e,t){var n;return N(o[t])?e:(e&&(n=o[e]%1,o[e]-=n,o[t]+=n*i[e][t]),t)},null)}var E=function(e){function m(e){var t="longterm"===e.conversionAccuracy||!1,n=t?Sn:bn;e.matrix&&(n=e.matrix),this.values=e.values,this.loc=e.loc||b.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=n,this.isLuxonDuration=!0}m.fromMillis=function(e,t){return m.fromObject({milliseconds:e},t)},m.fromObject=function(e,t){if(void 0===t&&(t={}),null==e||"object"!=typeof e)throw new u("Duration.fromObject: argument expected to be an object, got "+(null===e?"null":typeof e));return new m({values:wt(e,m.normalizeUnit),loc:b.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})},m.fromDurationLike=function(e){if(y(e))return m.fromMillis(e);if(m.isDuration(e))return e;if("object"==typeof e)return m.fromObject(e);throw new u("Unknown duration argument "+e+" of type "+typeof e)},m.fromISO=function(e,t){var n=qt(e,[Bt,Qt])[0];return n?m.fromObject(n,t):m.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},m.fromISOTime=function(e,t){var n=qt(e,[$t,vn])[0];return n?m.fromObject(n,t):m.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},m.invalid=function(e,t){if(void 0===t&&(t=null),!e)throw new u("need to specify a reason the Duration is invalid");e=e instanceof c?e:new c(e,t);if(O.throwOnInvalid)throw new H(e);return new m({invalid:e})},m.normalizeUnit=function(e){var t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e&&e.toLowerCase()];if(t)return t;throw new J(e)},m.isDuration=function(e){return e&&e.isLuxonDuration||!1};var t=m.prototype;return t.toFormat=function(e,t){t=l({},t=void 0===t?{}:t,{floor:!1!==t.round&&!1!==t.floor});return this.isValid?p.create(this.loc,t).formatDurationFromString(this,e):wn},t.toHuman=function(n){var e,r=this;return void 0===n&&(n={}),this.isValid?(e=I.map(function(e){var t=r.values[e];return N(t)?null:r.loc.numberFormatter(l({style:"unit",unitDisplay:"long"},n,{unit:e.slice(0,-1)})).format(t)}).filter(function(e){return e}),this.loc.listFormatter(l({type:"conjunction",style:n.listStyle||"narrow"},n)).format(e)):wn},t.toObject=function(){return this.isValid?l({},this.values):{}},t.toISO=function(){var e;return this.isValid?(e="P",0!==this.years&&(e+=this.years+"Y"),0===this.months&&0===this.quarters||(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),0===this.hours&&0===this.minutes&&0===this.seconds&&0===this.milliseconds||(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),0===this.seconds&&0===this.milliseconds||(e+=ct(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e):null},t.toISOTime=function(e){var t;return void 0===e&&(e={}),!this.isValid||(t=this.toMillis())<0||864e5<=t?null:(e=l({suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended"},e,{includeOffset:!1}),W.fromMillis(t,{zone:"UTC"}).toISOTime(e))},t.toJSON=function(){return this.toISO()},t.toString=function(){return this.toISO()},t[e]=function(){return this.isValid?"Duration { values: "+JSON.stringify(this.values)+" }":"Duration { Invalid, reason: "+this.invalidReason+" }"},t.toMillis=function(){return this.isValid?Tn(this.matrix,this.values):NaN},t.valueOf=function(){return this.toMillis()},t.plus=function(e){if(!this.isValid)return this;for(var t=m.fromDurationLike(e),n={},r=0,i=I;r<i.length;r++){var o=i[r];(h(t.values,o)||h(this.values,o))&&(n[o]=t.get(o)+this.get(o))}return V(this,{values:n},!0)},t.minus=function(e){return this.isValid?(e=m.fromDurationLike(e),this.plus(e.negate())):this},t.mapUnits=function(e){if(!this.isValid)return this;for(var t={},n=0,r=Object.keys(this.values);n<r.length;n++){var i=r[n];t[i]=kt(e(this.values[i],i))}return V(this,{values:t},!0)},t.get=function(e){return this[m.normalizeUnit(e)]},t.set=function(e){return this.isValid?V(this,{values:l({},this.values,wt(e,m.normalizeUnit))}):this},t.reconfigure=function(e){var e=void 0===e?{}:e,t=e.locale,n=e.numberingSystem,r=e.conversionAccuracy,e=e.matrix,t=this.loc.clone({locale:t,numberingSystem:n});return V(this,{loc:t,matrix:e,conversionAccuracy:r})},t.as=function(e){return this.isValid?this.shiftTo(e).get(e):NaN},t.normalize=function(){var e;return this.isValid?(e=this.toObject(),Nn(this.matrix,e),V(this,{values:e},!0)):this},t.rescale=function(){var e;return this.isValid?(e=function(e){for(var t={},n=0,r=Object.entries(e);n<r.length;n++){var i=r[n],o=i[0],i=i[1];0!==i&&(t[o]=i)}return t}(this.normalize().shiftToAll().toObject()),V(this,{values:e},!0)):this},t.shiftTo=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(!this.isValid)return this;if(0===t.length)return this;for(var r,t=t.map(function(e){return m.normalizeUnit(e)}),i={},o={},a=this.toObject(),u=0,s=I;u<s.length;u++){var l=s[u];if(0<=t.indexOf(l)){var c,f=l,d=0;for(c in o)d+=this.matrix[c][l]*o[c],o[c]=0;y(a[l])&&(d+=a[l]);var h=Math.trunc(d);o[l]=(1e3*d-1e3*(i[l]=h))/1e3}else y(a[l])&&(o[l]=a[l])}for(r in o)0!==o[r]&&(i[f]+=r===f?o[r]:o[r]/this.matrix[f][r]);return Nn(this.matrix,i),V(this,{values:i},!0)},t.shiftToAll=function(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this},t.negate=function(){if(!this.isValid)return this;for(var e={},t=0,n=Object.keys(this.values);t<n.length;t++){var r=n[t];e[r]=0===this.values[r]?0:-this.values[r]}return V(this,{values:e},!0)},t.equals=function(e){if(!this.isValid||!e.isValid)return!1;if(!this.loc.equals(e.loc))return!1;for(var t,n=0,r=I;n<r.length;n++){var i=r[n];if(t=this.values[i],i=e.values[i],!(void 0===t||0===t?void 0===i||0===i:t===i))return!1}return!0},i(m,[{key:"locale",get:function(){return this.isValid?this.loc.locale:null}},{key:"numberingSystem",get:function(){return this.isValid?this.loc.numberingSystem:null}},{key:"years",get:function(){return this.isValid?this.values.years||0:NaN}},{key:"quarters",get:function(){return this.isValid?this.values.quarters||0:NaN}},{key:"months",get:function(){return this.isValid?this.values.months||0:NaN}},{key:"weeks",get:function(){return this.isValid?this.values.weeks||0:NaN}},{key:"days",get:function(){return this.isValid?this.values.days||0:NaN}},{key:"hours",get:function(){return this.isValid?this.values.hours||0:NaN}},{key:"minutes",get:function(){return this.isValid?this.values.minutes||0:NaN}},{key:"seconds",get:function(){return this.isValid?this.values.seconds||0:NaN}},{key:"milliseconds",get:function(){return this.isValid?this.values.milliseconds||0:NaN}},{key:"isValid",get:function(){return null===this.invalid}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}}]),m}(Symbol.for("nodejs.util.inspect.custom")),Dn="Invalid Interval";var Mn=function(e){function l(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}l.invalid=function(e,t){if(void 0===t&&(t=null),!e)throw new u("need to specify a reason the Interval is invalid");e=e instanceof c?e:new c(e,t);if(O.throwOnInvalid)throw new P(e);return new l({invalid:e})},l.fromDateTimes=function(e,t){var n,e=yr(e),t=yr(t),r=(n=t,(r=e)&&r.isValid?n&&n.isValid?n<r?Mn.invalid("end before start","The end of an interval must be after its start, but you had start="+r.toISO()+" and end="+n.toISO()):null:Mn.invalid("missing or invalid end"):Mn.invalid("missing or invalid start"));return null==r?new l({start:e,end:t}):r},l.after=function(e,t){t=E.fromDurationLike(t),e=yr(e);return l.fromDateTimes(e,e.plus(t))},l.before=function(e,t){t=E.fromDurationLike(t),e=yr(e);return l.fromDateTimes(e.minus(t),e)},l.fromISO=function(e,t){var n,r,i,o=(e||"").split("/",2),a=o[0],u=o[1];if(a&&u){try{s=(n=W.fromISO(a,t)).isValid}catch(u){s=!1}try{i=(r=W.fromISO(u,t)).isValid}catch(u){i=!1}if(s&&i)return l.fromDateTimes(n,r);if(s){o=E.fromISO(u,t);if(o.isValid)return l.after(n,o)}else if(i){var s=E.fromISO(a,t);if(s.isValid)return l.before(r,s)}}return l.invalid("unparsable",'the input "'+e+"\" can't be parsed as ISO 8601")},l.isInterval=function(e){return e&&e.isLuxonInterval||!1};var t=l.prototype;return t.length=function(e){return void 0===e&&(e="milliseconds"),this.isValid?this.toDuration.apply(this,[e]).get(e):NaN},t.count=function(e,t){var n,r;return this.isValid?(n=this.start.startOf(e=void 0===e?"milliseconds":e,t),r=(r=null!=t&&t.useLocaleWeeks?this.end.reconfigure({locale:n.locale}):this.end).startOf(e,t),Math.floor(r.diff(n,e).get(e))+(r.valueOf()!==this.end.valueOf())):NaN},t.hasSame=function(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))},t.isEmpty=function(){return this.s.valueOf()===this.e.valueOf()},t.isAfter=function(e){return!!this.isValid&&this.s>e},t.isBefore=function(e){return!!this.isValid&&this.e<=e},t.contains=function(e){return!!this.isValid&&this.s<=e&&this.e>e},t.set=function(e){var e=void 0===e?{}:e,t=e.start,e=e.end;return this.isValid?l.fromDateTimes(t||this.s,e||this.e):this},t.splitAt=function(){var t=this;if(!this.isValid)return[];for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];for(var i=n.map(yr).filter(function(e){return t.contains(e)}).sort(function(e,t){return e.toMillis()-t.toMillis()}),o=[],a=this.s,u=0;a<this.e;){var s=i[u]||this.e,s=+s>+this.e?this.e:s;o.push(l.fromDateTimes(a,s)),a=s,u+=1}return o},t.splitBy=function(e){var t=E.fromDurationLike(e);if(!this.isValid||!t.isValid||0===t.as("milliseconds"))return[];for(var n=this.s,r=1,i=[];n<this.e;){var o=this.start.plus(t.mapUnits(function(e){return e*r})),o=+o>+this.e?this.e:o;i.push(l.fromDateTimes(n,o)),n=o,r+=1}return i},t.divideEqually=function(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]},t.overlaps=function(e){return this.e>e.s&&this.s<e.e},t.abutsStart=function(e){return!!this.isValid&&+this.e==+e.s},t.abutsEnd=function(e){return!!this.isValid&&+e.e==+this.s},t.engulfs=function(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e},t.equals=function(e){return!(!this.isValid||!e.isValid)&&this.s.equals(e.s)&&this.e.equals(e.e)},t.intersection=function(e){var t;return this.isValid?(t=(this.s>e.s?this:e).s,(e=(this.e<e.e?this:e).e)<=t?null:l.fromDateTimes(t,e)):this},t.union=function(e){var t;return this.isValid?(t=(this.s<e.s?this:e).s,e=(this.e>e.e?this:e).e,l.fromDateTimes(t,e)):this},l.merge=function(e){var e=e.sort(function(e,t){return e.s-t.s}).reduce(function(e,t){var n=e[0],e=e[1];return e?e.overlaps(t)||e.abutsStart(t)?[n,e.union(t)]:[n.concat([e]),t]:[n,t]},[[],null]),t=e[0],e=e[1];return e&&t.push(e),t},l.xor=function(e){for(var t,n=null,r=0,i=[],e=e.map(function(e){return[{time:e.s,type:"s"},{time:e.e,type:"e"}]}),o=R((t=Array.prototype).concat.apply(t,e).sort(function(e,t){return e.time-t.time}));!(a=o()).done;)var a=a.value,n=1===(r+="s"===a.type?1:-1)?a.time:(n&&+n!=+a.time&&i.push(l.fromDateTimes(n,a.time)),null);return l.merge(i)},t.difference=function(){for(var t=this,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return l.xor([this].concat(n)).map(function(e){return t.intersection(e)}).filter(function(e){return e&&!e.isEmpty()})},t.toString=function(){return this.isValid?"["+this.s.toISO()+" – "+this.e.toISO()+")":Dn},t[e]=function(){return this.isValid?"Interval { start: "+this.s.toISO()+", end: "+this.e.toISO()+" }":"Interval { Invalid, reason: "+this.invalidReason+" }"},t.toLocaleString=function(e,t){return void 0===e&&(e=G),void 0===t&&(t={}),this.isValid?p.create(this.s.loc.clone(t),e).formatInterval(this):Dn},t.toISO=function(e){return this.isValid?this.s.toISO(e)+"/"+this.e.toISO(e):Dn},t.toISODate=function(){return this.isValid?this.s.toISODate()+"/"+this.e.toISODate():Dn},t.toISOTime=function(e){return this.isValid?this.s.toISOTime(e)+"/"+this.e.toISOTime(e):Dn},t.toFormat=function(e,t){t=(void 0===t?{}:t).separator,t=void 0===t?" – ":t;return this.isValid?""+this.s.toFormat(e)+t+this.e.toFormat(e):Dn},t.toDuration=function(e,t){return this.isValid?this.e.diff(this.s,e,t):E.invalid(this.invalidReason)},t.mapEndpoints=function(e){return l.fromDateTimes(e(this.s),e(this.e))},i(l,[{key:"start",get:function(){return this.isValid?this.s:null}},{key:"end",get:function(){return this.isValid?this.e:null}},{key:"isValid",get:function(){return null===this.invalidReason}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}}]),l}(Symbol.for("nodejs.util.inspect.custom")),In=function(){function e(){}return e.hasDST=function(e){void 0===e&&(e=O.defaultZone);var t=W.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset},e.isValidIANAZone=function(e){return f.isValidZone(e)},e.normalizeZone=function(e){return S(e,O.defaultZone)},e.getStartOfWeek=function(e){var e=void 0===e?{}:e,t=e.locale,e=e.locObj;return((void 0===e?null:e)||b.create(void 0===t?null:t)).getStartOfWeek()},e.getMinimumDaysInFirstWeek=function(e){var e=void 0===e?{}:e,t=e.locale,e=e.locObj;return((void 0===e?null:e)||b.create(void 0===t?null:t)).getMinDaysInFirstWeek()},e.getWeekendWeekdays=function(e){var e=void 0===e?{}:e,t=e.locale,e=e.locObj;return((void 0===e?null:e)||b.create(void 0===t?null:t)).getWeekendDays().slice()},e.months=function(e,t){void 0===e&&(e="long");var t=void 0===t?{}:t,n=t.locale,r=t.numberingSystem,i=t.locObj,i=void 0===i?null:i,t=t.outputCalendar;return(i||b.create(void 0===n?null:n,void 0===r?null:r,void 0===t?"gregory":t)).months(e)},e.monthsFormat=function(e,t){void 0===e&&(e="long");var t=void 0===t?{}:t,n=t.locale,r=t.numberingSystem,i=t.locObj,i=void 0===i?null:i,t=t.outputCalendar;return(i||b.create(void 0===n?null:n,void 0===r?null:r,void 0===t?"gregory":t)).months(e,!0)},e.weekdays=function(e,t){void 0===e&&(e="long");var t=void 0===t?{}:t,n=t.locale,r=t.numberingSystem,t=t.locObj;return((void 0===t?null:t)||b.create(void 0===n?null:n,void 0===r?null:r,null)).weekdays(e)},e.weekdaysFormat=function(e,t){void 0===e&&(e="long");var t=void 0===t?{}:t,n=t.locale,r=t.numberingSystem,t=t.locObj;return((void 0===t?null:t)||b.create(void 0===n?null:n,void 0===r?null:r,null)).weekdays(e,!0)},e.meridiems=function(e){e=(void 0===e?{}:e).locale;return b.create(void 0===e?null:e).meridiems()},e.eras=function(e,t){void 0===e&&(e="short");t=(void 0===t?{}:t).locale;return b.create(void 0===t?null:t,null,"gregory").eras(e)},e.features=function(){return{relative:ot(),localeWeek:at()}},e}();function Vn(e,t){function n(e){return e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf()}t=n(t)-n(e);return Math.floor(E.fromMillis(t).as("days"))}function En(e,t,n,r){var e=function(e,t,n){for(var r,i,o={},a=e,u=0,s=[["years",function(e,t){return t.year-e.year}],["quarters",function(e,t){return t.quarter-e.quarter+4*(t.year-e.year)}],["months",function(e,t){return t.month-e.month+12*(t.year-e.year)}],["weeks",function(e,t){e=Vn(e,t);return(e-e%7)/7}],["days",Vn]];u<s.length;u++){var l=s[u],c=l[0],l=l[1];0<=n.indexOf(c)&&(o[r=c]=l(e,t),t<(i=a.plus(o))?(o[c]--,t<(e=a.plus(o))&&(i=e,o[c]--,e=a.plus(o))):e=i)}return[e,o,i,r]}(e,t,n),i=e[0],o=e[1],a=e[2],e=e[3],u=t-i,n=n.filter(function(e){return 0<=["hours","minutes","seconds","milliseconds"].indexOf(e)}),t=(0===n.length&&(a=a<t?i.plus(((t={})[e]=1,t)):a)!==i&&(o[e]=(o[e]||0)+u/(a-i)),E.fromObject(o,r));return 0<n.length?(e=E.fromMillis(u,r)).shiftTo.apply(e,n).plus(t):t}var xn={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Cn={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Fn=xn.hanidec.replace(/[\[|\]]/g,"").split("");function x(e,t){e=e.numberingSystem;return void 0===t&&(t=""),new RegExp(""+xn[e||"latn"]+t)}var Zn="missing Intl.DateTimeFormat.formatToParts support";function C(e,t){return void 0===t&&(t=function(e){return e}),{regex:e,deser:function(e){e=e[0];return t(function(e){var t=parseInt(e,10);if(isNaN(t)){for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n);if(-1!==e[n].search(xn.hanidec))t+=Fn.indexOf(e[n]);else for(var i in Cn){var i=Cn[i],o=i[0],i=i[1];o<=r&&r<=i&&(t+=r-o)}}return parseInt(t,10)}return t}(e))}}}var Wn="[ "+String.fromCharCode(160)+"]",Ln=new RegExp(Wn,"g");function jn(e){return e.replace(/\./g,"\\.?").replace(Ln,Wn)}function zn(e){return e.replace(/\./g,"").replace(Ln," ").toLowerCase()}function F(n,r){return null===n?null:{regex:RegExp(n.map(jn).join("|")),deser:function(e){var t=e[0];return n.findIndex(function(e){return zn(t)===zn(e)})+r}}}function An(e,t){return{regex:e,deser:function(e){return pt(e[1],e[2])},groups:t}}function qn(e){return{regex:e,deser:function(e){return e[0]}}}function _n(t,n){function r(e){return{regex:RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:function(e){return e[0]},literal:!0}}var i=x(n),o=x(n,"{2}"),a=x(n,"{3}"),u=x(n,"{4}"),s=x(n,"{6}"),l=x(n,"{1,2}"),c=x(n,"{1,3}"),f=x(n,"{1,6}"),d=x(n,"{1,9}"),h=x(n,"{2,4}"),m=x(n,"{4,6}"),e=function(e){if(t.literal)return r(e);switch(e.val){case"G":return F(n.eras("short"),0);case"GG":return F(n.eras("long"),0);case"y":return C(f);case"yy":return C(h,vt);case"yyyy":return C(u);case"yyyyy":return C(m);case"yyyyyy":return C(s);case"M":return C(l);case"MM":return C(o);case"MMM":return F(n.months("short",!0),1);case"MMMM":return F(n.months("long",!0),1);case"L":return C(l);case"LL":return C(o);case"LLL":return F(n.months("short",!1),1);case"LLLL":return F(n.months("long",!1),1);case"d":return C(l);case"dd":return C(o);case"o":return C(c);case"ooo":return C(a);case"HH":return C(o);case"H":return C(l);case"hh":return C(o);case"h":return C(l);case"mm":return C(o);case"m":case"q":return C(l);case"qq":return C(o);case"s":return C(l);case"ss":return C(o);case"S":return C(c);case"SSS":return C(a);case"u":return qn(d);case"uu":return qn(l);case"uuu":return C(i);case"a":return F(n.meridiems(),0);case"kkkk":return C(u);case"kk":return C(h,vt);case"W":return C(l);case"WW":return C(o);case"E":case"c":return C(i);case"EEE":return F(n.weekdays("short",!1),1);case"EEEE":return F(n.weekdays("long",!1),1);case"ccc":return F(n.weekdays("short",!0),1);case"cccc":return F(n.weekdays("long",!0),1);case"Z":case"ZZ":return An(new RegExp("([+-]"+l.source+")(?::("+o.source+"))?"),2);case"ZZZ":return An(new RegExp("([+-]"+l.source+")("+o.source+")?"),2);case"z":return qn(/[a-z_+-/]{1,256}?/i);case" ":return qn(/[^\S\n\r]/);default:return r(e)}}(t)||{invalidReason:Zn};return e.token=t,e}var Un={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};var Rn=null;function Yn(e,n){var t;return(t=Array.prototype).concat.apply(t,e.map(function(e){return t=n,(e=e).literal||null==(t=Hn(p.macroTokenToFormatOpts(e.val),t))||t.includes(void 0)?e:t;var t}))}function Pn(t,e,n){var n=Yn(p.parseFormat(n),t),r=n.map(function(e){return _n(e,t)}),i=r.find(function(e){return e.invalidReason});if(i)return{input:e,tokens:n,invalidReason:i.invalidReason};var o,r=["^"+(i=r).map(function(e){return e.regex}).reduce(function(e,t){return e+"("+t.source+")"},"")+"$",i],i=r[1],r=RegExp(r[0],"i"),i=function(e,t,n){var r=e.match(t);if(r){var i,o,a,u={},s=1;for(i in n)h(n,i)&&(a=(o=n[i]).groups?o.groups+1:1,!o.literal&&o.token&&(u[o.token.val[0]]=o.deser(r.slice(s,s+a))),s+=a);return[r,u]}return[r,{}]}(e,r,i),a=i[0],i=i[1],u=i?(u=null,N((o=i).z)||(u=f.create(o.z)),N(o.Z)||(u=u||new d(o.Z),s=o.Z),N(o.q)||(o.M=3*(o.q-1)+1),N(o.h)||(o.h<12&&1===o.a?o.h+=12:12===o.h&&0===o.a&&(o.h=0)),0===o.G&&o.y&&(o.y=-o.y),N(o.u)||(o.S=lt(o.u)),[Object.keys(o).reduce(function(e,t){var n=function(e){switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}}(t);return n&&(e[n]=o[t]),e},{}),u,s]):[null,null,void 0],s=u[0],l=u[1],c=u[2];if(h(i,"a")&&h(i,"H"))throw new w("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:n,regex:r,rawMatches:a,matches:i,result:s,zone:l,specificOffset:c}}function Hn(o,e){var t,a;return o?(t=(e=p.create(e,o).dtFormatter(Rn=Rn||W.fromMillis(1555555555555))).formatToParts(),a=e.resolvedOptions(),t.map(function(e){return t=o,n=a,i=(e=e).type,e=e.value,"literal"===i?{literal:!(r=/^\s+$/.test(e)),val:r?" ":e}:(r=t[i],"hour"===(e=i)&&(e=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":n.hour12?"hour12":"hour24"),(i="object"==typeof(i=Un[e])?i[r]:i)?{literal:!1,val:i}:void 0);var t,n,r,i})):null}var Jn="Invalid DateTime";function Gn(e){return new c("unsupported zone",'the zone "'+e.name+'" is not supported')}function $n(e){return null===e.weekData&&(e.weekData=Qe(e.c)),e.weekData}function Bn(e){return null===e.localWeekData&&(e.localWeekData=Qe(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function Z(e,t){e={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new W(l({},e,t,{old:e}))}function Qn(e,t,n){var r=e-60*t*1e3,i=n.offset(r);return t===i?[r,t]:i===(n=n.offset(r-=60*(i-t)*1e3))?[r,i]:[e-60*Math.min(i,n)*1e3,Math.max(i,n)]}function Kn(e,t){e+=60*t*1e3;t=new Date(e);return{year:t.getUTCFullYear(),month:t.getUTCMonth()+1,day:t.getUTCDate(),hour:t.getUTCHours(),minute:t.getUTCMinutes(),second:t.getUTCSeconds(),millisecond:t.getUTCMilliseconds()}}function Xn(e,t,n){return Qn(ht(e),t,n)}function er(e,t){var n=e.o,r=e.c.year+Math.trunc(t.years),i=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),r=l({},e.c,{year:r,month:i,day:Math.min(e.c.day,dt(r,i))+Math.trunc(t.days)+7*Math.trunc(t.weeks)}),i=E.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),t=Qn(ht(r),n,e.zone),r=t[0],n=t[1];return 0!==i&&(n=e.zone.offset(r+=i)),{ts:r,o:n}}function tr(e,t,n,r,i,o){var a=n.setZone,u=n.zone;return e&&0!==Object.keys(e).length||t?(e=W.fromObject(e,l({},n,{zone:t||u,specificOffset:o})),a?e:e.setZone(u)):W.invalid(new c("unparsable",'the input "'+i+"\" can't be parsed as "+r))}function nr(e,t,n){return void 0===n&&(n=!0),e.isValid?p.create(b.create("en-US"),{allowZ:n,forceSimple:!0}).formatDateTimeFromString(e,t):null}function rr(e,t){var n=9999<e.c.year||e.c.year<0,r="";return n&&0<=e.c.year&&(r+="+"),r+=m(e.c.year,n?6:4),r=t?(r=(r+="-")+m(e.c.month)+"-")+m(e.c.day):(r+=m(e.c.month))+m(e.c.day)}function ir(e,t,n,r,i,o){var a=m(e.c.hour);return t?(a=(a+=":")+m(e.c.minute),0===e.c.millisecond&&0===e.c.second&&n||(a+=":")):a+=m(e.c.minute),0===e.c.millisecond&&0===e.c.second&&n||(a+=m(e.c.second),0===e.c.millisecond&&r)||(a=(a+=".")+m(e.c.millisecond,3)),i&&(e.isOffsetFixed&&0===e.offset&&!o?a+="Z":a=e.o<0?(a=(a+="-")+m(Math.trunc(-e.o/60))+":")+m(Math.trunc(-e.o%60)):(a=(a+="+")+m(Math.trunc(e.o/60))+":")+m(Math.trunc(e.o%60))),o&&(a+="["+e.zone.ianaName+"]"),a}var or={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},ar={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},ur={ordinal:1,hour:0,minute:0,second:0,millisecond:0},sr=["year","month","day","hour","minute","second","millisecond"],lr=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],cr=["year","ordinal","hour","minute","second","millisecond"];function fr(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:var t=e,n={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[t.toLowerCase()];if(n)return n;throw new J(t)}}function dr(e,t){var n=S(t.zone,O.defaultZone),t=b.fromObject(t),r=O.now();if(N(e.year))s=r;else{for(var i=0,o=sr;i<o.length;i++){var a=o[i];N(e[a])&&(e[a]=or[a])}var u=nt(e)||rt(e);if(u)return W.invalid(u);var u=Xn(e,n.offset(r),n),s=u[0],u=u[1]}return new W({ts:s,zone:n,loc:t,o:u})}function hr(t,n,r){function e(e,t){return e=ct(e,o||r.calendary?0:2,!0),n.loc.clone(r).relFormatter(r).format(e,t)}function i(e){return r.calendary?n.hasSame(t,e)?0:n.startOf(e).diff(t.startOf(e),e).get(e):n.diff(t,e).get(e)}var o=!!N(r.round)||r.round;if(r.unit)return e(i(r.unit),r.unit);for(var a=R(r.units);!(u=a()).done;){var u=u.value,s=i(u);if(1<=Math.abs(s))return e(s,u)}return e(n<t?-0:0,r.units[r.units.length-1])}function mr(e){var t={},e=0<e.length&&"object"==typeof e[e.length-1]?(t=e[e.length-1],Array.from(e).slice(0,e.length-1)):Array.from(e);return[t,e]}var W=function(e){function k(e){var t,n=e.zone||O.defaultZone,r=e.invalid||(Number.isNaN(e.ts)?new c("invalid input"):null)||(n.isValid?null:Gn(n)),i=(this.ts=N(e.ts)?O.now():e.ts,null),o=null;r||(o=e.old&&e.old.ts===this.ts&&e.old.zone.equals(n)?(i=(t=[e.old.c,e.old.o])[0],t[1]):(t=n.offset(this.ts),i=Kn(this.ts,t),i=(r=Number.isNaN(i.year)?new c("invalid input"):null)?null:i,r?null:t)),this._zone=n,this.loc=e.loc||b.create(),this.invalid=r,this.weekData=null,this.localWeekData=null,this.c=i,this.o=o,this.isLuxonDateTime=!0}k.now=function(){return new k({})},k.local=function(){var e=mr(arguments),t=e[0],e=e[1];return dr({year:e[0],month:e[1],day:e[2],hour:e[3],minute:e[4],second:e[5],millisecond:e[6]},t)},k.utc=function(){var e=mr(arguments),t=e[0],e=e[1],n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],u=e[5],e=e[6];return t.zone=d.utcInstance,dr({year:n,month:r,day:i,hour:o,minute:a,second:u,millisecond:e},t)},k.fromJSDate=function(e,t){void 0===t&&(t={});var n,e="[object Date]"===Object.prototype.toString.call(e)?e.valueOf():NaN;return Number.isNaN(e)?k.invalid("invalid input"):(n=S(t.zone,O.defaultZone)).isValid?new k({ts:e,zone:n,loc:b.fromObject(t)}):k.invalid(Gn(n))},k.fromMillis=function(e,t){if(void 0===t&&(t={}),y(e))return e<-864e13||864e13<e?k.invalid("Timestamp out of range"):new k({ts:e,zone:S(t.zone,O.defaultZone),loc:b.fromObject(t)});throw new u("fromMillis requires a numerical input, but received a "+typeof e+" with value "+e)},k.fromSeconds=function(e,t){if(void 0===t&&(t={}),y(e))return new k({ts:1e3*e,zone:S(t.zone,O.defaultZone),loc:b.fromObject(t)});throw new u("fromSeconds requires a numerical input")},k.fromObject=function(e,t){e=e||{};var n=S((t=void 0===t?{}:t).zone,O.defaultZone);if(!n.isValid)return k.invalid(Gn(n));var r=b.fromObject(t),i=wt(e,fr),o=tt(i,r),a=o.minDaysInFirstWeek,o=o.startOfWeek,u=O.now(),t=N(t.specificOffset)?n.offset(u):t.specificOffset,s=!N(i.ordinal),l=!N(i.year),c=!N(i.month)||!N(i.day),l=l||c,f=i.weekYear||i.weekNumber;if((l||s)&&f)throw new w("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(c&&s)throw new w("Can't mix ordinal dates with month/day");for(var d,c=f||i.weekday&&!l,h=Kn(u,t),m=(c?(p=lr,d=ar,h=Qe(h,a,o)):s?(p=cr,d=ur,h=Xe(h)):(p=sr,d=or),!1),y=R(p);!(v=y()).done;){var v=v.value;N(i[v])?i[v]=(m?d:h)[v]:m=!0}var g,p=(c?(f=a,u=o,g=it((p=i).weekYear),f=D(p.weekNumber,1,yt(p.weekYear,f=void 0===f?4:f,u=void 0===u?1:u)),u=D(p.weekday,1,7),g?f?!u&&T("weekday",p.weekday):T("week",p.weekNumber):T("weekYear",p.weekYear)):s?(f=it((g=i).year),u=D(g.ordinal,1,M(g.year)),f?!u&&T("ordinal",g.ordinal):T("year",g.year)):nt(i))||rt(i);return p?k.invalid(p):(u=new k({ts:(f=Xn(c?Ke(i,a,o):s?et(i):i,t,n))[0],zone:n,o:f[1],loc:r}),i.weekday&&l&&e.weekday!==u.weekday?k.invalid("mismatched weekday","you can't specify both a weekday of "+i.weekday+" and a date of "+u.toISO()):u)},k.fromISO=function(e,t){void 0===t&&(t={});var n=qt(e,[sn,dn],[ln,hn],[cn,mn],[fn,yn]);return tr(n[0],n[1],t,"ISO 8601",e)},k.fromRFC2822=function(e,t){void 0===t&&(t={});var n=qt(e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[en,tn]);return tr(n[0],n[1],t,"RFC 2822",e)},k.fromHTTP=function(e,t){void 0===t&&(t={});e=qt(e,[nn,an],[rn,an],[on,un]);return tr(e[0],e[1],t,"HTTP",t)},k.fromFormat=function(e,t,n){if(void 0===n&&(n={}),N(e)||N(t))throw new u("fromFormat requires an input string and a format");var r=n,i=r.locale,r=r.numberingSystem,i=b.fromOpts({locale:void 0===i?null:i,numberingSystem:void 0===r?null:r,defaultToEN:!0}),i=[(r=Pn(r=i,e,t)).result,r.zone,r.specificOffset,r.invalidReason],r=i[0],o=i[1],a=i[2],i=i[3];return i?k.invalid(i):tr(r,o,n,"format "+t,e,a)},k.fromString=function(e,t,n){return k.fromFormat(e,t,n=void 0===n?{}:n)},k.fromSQL=function(e,t){void 0===t&&(t={});var n=qt(e,[gn,dn],[pn,kn]);return tr(n[0],n[1],t,"SQL",e)},k.invalid=function(e,t){if(void 0===t&&(t=null),!e)throw new u("need to specify a reason the DateTime is invalid");e=e instanceof c?e:new c(e,t);if(O.throwOnInvalid)throw new Y(e);return new k({invalid:e})},k.isDateTime=function(e){return e&&e.isLuxonDateTime||!1},k.parseFormatForOpts=function(e,t){e=Hn(e,b.fromObject(t=void 0===t?{}:t));return e?e.map(function(e){return e?e.val:null}).join(""):null},k.expandFormat=function(e,t){return void 0===t&&(t={}),Yn(p.parseFormat(e),b.fromObject(t)).map(function(e){return e.val}).join("")};var t=k.prototype;return t.get=function(e){return this[e]},t.getPossibleOffsets=function(){var e,t,n,r;return this.isValid&&!this.isOffsetFixed&&(e=ht(this.c),n=this.zone.offset(e-864e5),r=this.zone.offset(e+864e5),(n=this.zone.offset(e-6e4*n))!==(r=this.zone.offset(e-6e4*r)))&&(t=e-6e4*r,n=Kn(e=e-6e4*n,n),r=Kn(t,r),n.hour===r.hour)&&n.minute===r.minute&&n.second===r.second&&n.millisecond===r.millisecond?[Z(this,{ts:e}),Z(this,{ts:t})]:[this]},t.resolvedLocaleOptions=function(e){e=p.create(this.loc.clone(e=void 0===e?{}:e),e).resolvedOptions(this);return{locale:e.locale,numberingSystem:e.numberingSystem,outputCalendar:e.calendar}},t.toUTC=function(e,t){return void 0===t&&(t={}),this.setZone(d.instance(e=void 0===e?0:e),t)},t.toLocal=function(){return this.setZone(O.defaultZone)},t.setZone=function(e,t){var n,t=void 0===t?{}:t,r=t.keepLocalTime,r=void 0!==r&&r,t=t.keepCalendarTime,t=void 0!==t&&t;return(e=S(e,O.defaultZone)).equals(this.zone)?this:e.isValid?(n=this.ts,(r||t)&&(r=e.offset(this.ts),n=Xn(this.toObject(),r,e)[0]),Z(this,{ts:n,zone:e})):k.invalid(Gn(e))},t.reconfigure=function(e){var e=void 0===e?{}:e,t=e.locale,n=e.numberingSystem,e=e.outputCalendar,t=this.loc.clone({locale:t,numberingSystem:n,outputCalendar:e});return Z(this,{loc:t})},t.setLocale=function(e){return this.reconfigure({locale:e})},t.set=function(e){if(!this.isValid)return this;var t,e=wt(e,fr),n=tt(e,this.loc),r=n.minDaysInFirstWeek,n=n.startOfWeek,i=!N(e.weekYear)||!N(e.weekNumber)||!N(e.weekday),o=!N(e.ordinal),a=!N(e.year),u=!N(e.month)||!N(e.day),s=e.weekYear||e.weekNumber;if((a||u||o)&&s)throw new w("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(u&&o)throw new w("Can't mix ordinal dates with month/day");i?t=Ke(l({},Qe(this.c,r,n),e),r,n):N(e.ordinal)?(t=l({},this.toObject(),e),N(e.day)&&(t.day=Math.min(dt(t.year,t.month),t.day))):t=et(l({},Xe(this.c),e));a=Xn(t,this.o,this.zone);return Z(this,{ts:a[0],o:a[1]})},t.plus=function(e){return this.isValid?Z(this,er(this,E.fromDurationLike(e))):this},t.minus=function(e){return this.isValid?Z(this,er(this,E.fromDurationLike(e).negate())):this},t.startOf=function(e,t){t=(void 0===t?{}:t).useLocaleWeeks,t=void 0!==t&&t;if(!this.isValid)return this;var n={},e=E.normalizeUnit(e);switch(e){case"years":n.month=1;case"quarters":case"months":n.day=1;case"weeks":case"days":n.hour=0;case"hours":n.minute=0;case"minutes":n.second=0;case"seconds":n.millisecond=0}return"weeks"===e&&(t?(t=this.loc.getStartOfWeek(),this.weekday<t&&(n.weekNumber=this.weekNumber-1),n.weekday=t):n.weekday=1),"quarters"===e&&(t=Math.ceil(this.month/3),n.month=3*(t-1)+1),this.set(n)},t.endOf=function(e,t){var n;return this.isValid?this.plus(((n={})[e]=1,n)).startOf(e,t).minus(1):this},t.toFormat=function(e,t){return void 0===t&&(t={}),this.isValid?p.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):Jn},t.toLocaleString=function(e,t){return void 0===e&&(e=G),void 0===t&&(t={}),this.isValid?p.create(this.loc.clone(t),e).formatDateTime(this):Jn},t.toLocaleParts=function(e){return void 0===e&&(e={}),this.isValid?p.create(this.loc.clone(e),e).formatDateTimeParts(this):[]},t.toISO=function(e){var t,e=void 0===e?{}:e,n=e.format,r=e.suppressSeconds,r=void 0!==r&&r,i=e.suppressMilliseconds,i=void 0!==i&&i,o=e.includeOffset,o=void 0===o||o,e=e.extendedZone,e=void 0!==e&&e;return this.isValid?(t=rr(this,n="extended"===(void 0===n?"extended":n)),(t+="T")+ir(this,n,r,i,o,e)):null},t.toISODate=function(e){e=(void 0===e?{}:e).format;return this.isValid?rr(this,"extended"===(void 0===e?"extended":e)):null},t.toISOWeekDate=function(){return nr(this,"kkkk-'W'WW-c")},t.toISOTime=function(e){var e=void 0===e?{}:e,t=e.suppressMilliseconds,n=e.suppressSeconds,r=e.includeOffset,i=e.includePrefix,o=e.extendedZone,e=e.format;return this.isValid?(void 0!==i&&i?"T":"")+ir(this,"extended"===(void 0===e?"extended":e),void 0!==n&&n,void 0!==t&&t,void 0===r||r,void 0!==o&&o):null},t.toRFC2822=function(){return nr(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)},t.toHTTP=function(){return nr(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")},t.toSQLDate=function(){return this.isValid?rr(this,!0):null},t.toSQLTime=function(e){var e=void 0===e?{}:e,t=e.includeOffset,t=void 0===t||t,n=e.includeZone,n=void 0!==n&&n,e=e.includeOffsetSpace,r="HH:mm:ss.SSS";return(n||t)&&((void 0===e||e)&&(r+=" "),n?r+="z":t&&(r+="ZZ")),nr(this,r,!0)},t.toSQL=function(e){return void 0===e&&(e={}),this.isValid?this.toSQLDate()+" "+this.toSQLTime(e):null},t.toString=function(){return this.isValid?this.toISO():Jn},t[e]=function(){return this.isValid?"DateTime { ts: "+this.toISO()+", zone: "+this.zone.name+", locale: "+this.locale+" }":"DateTime { Invalid, reason: "+this.invalidReason+" }"},t.valueOf=function(){return this.toMillis()},t.toMillis=function(){return this.isValid?this.ts:NaN},t.toSeconds=function(){return this.isValid?this.ts/1e3:NaN},t.toUnixInteger=function(){return this.isValid?Math.floor(this.ts/1e3):NaN},t.toJSON=function(){return this.toISO()},t.toBSON=function(){return this.toJSDate()},t.toObject=function(e){var t;return void 0===e&&(e={}),this.isValid?(t=l({},this.c),e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t):{}},t.toJSDate=function(){return new Date(this.isValid?this.ts:NaN)},t.diff=function(e,t,n){var r;return void 0===t&&(t="milliseconds"),void 0===n&&(n={}),this.isValid&&e.isValid?(n=l({locale:this.locale,numberingSystem:this.numberingSystem},n),t=t,t=(Array.isArray(t)?t:[t]).map(E.normalizeUnit),e=En((r=e.valueOf()>this.valueOf())?this:e,r?e:this,t,n),r?e.negate():e):E.invalid("created by diffing an invalid DateTime")},t.diffNow=function(e,t){return void 0===e&&(e="milliseconds"),void 0===t&&(t={}),this.diff(k.now(),e,t)},t.until=function(e){return this.isValid?Mn.fromDateTimes(this,e):this},t.hasSame=function(e,t,n){var r;return!!this.isValid&&(r=e.valueOf(),(e=this.setZone(e.zone,{keepLocalTime:!0})).startOf(t,n)<=r)&&r<=e.endOf(t,n)},t.equals=function(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)},t.toRelative=function(e){var t,n,r,i;return this.isValid?(t=(e=void 0===e?{}:e).base||k.fromObject({},{zone:this.zone}),n=e.padding?this<t?-e.padding:e.padding:0,r=["years","months","days","hours","minutes","seconds"],i=e.unit,Array.isArray(e.unit)&&(r=e.unit,i=void 0),hr(t,this.plus(n),l({},e,{numeric:"always",units:r,unit:i}))):null},t.toRelativeCalendar=function(e){return void 0===e&&(e={}),this.isValid?hr(e.base||k.fromObject({},{zone:this.zone}),this,l({},e,{numeric:"auto",units:["years","months","days"],calendary:!0})):null},k.min=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(t.every(k.isDateTime))return ut(t,function(e){return e.valueOf()},Math.min);throw new u("min requires all arguments be DateTimes")},k.max=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if(t.every(k.isDateTime))return ut(t,function(e){return e.valueOf()},Math.max);throw new u("max requires all arguments be DateTimes")},k.fromFormatExplain=function(e,t,n){var n=n=void 0===n?{}:n,r=n.locale,n=n.numberingSystem;return Pn(b.fromOpts({locale:void 0===r?null:r,numberingSystem:void 0===n?null:n,defaultToEN:!0}),e,t)},k.fromStringExplain=function(e,t,n){return k.fromFormatExplain(e,t,n=void 0===n?{}:n)},i(k,[{key:"isValid",get:function(){return null===this.invalid}},{key:"invalidReason",get:function(){return this.invalid?this.invalid.reason:null}},{key:"invalidExplanation",get:function(){return this.invalid?this.invalid.explanation:null}},{key:"locale",get:function(){return this.isValid?this.loc.locale:null}},{key:"numberingSystem",get:function(){return this.isValid?this.loc.numberingSystem:null}},{key:"outputCalendar",get:function(){return this.isValid?this.loc.outputCalendar:null}},{key:"zone",get:function(){return this._zone}},{key:"zoneName",get:function(){return this.isValid?this.zone.name:null}},{key:"year",get:function(){return this.isValid?this.c.year:NaN}},{key:"quarter",get:function(){return this.isValid?Math.ceil(this.c.month/3):NaN}},{key:"month",get:function(){return this.isValid?this.c.month:NaN}},{key:"day",get:function(){return this.isValid?this.c.day:NaN}},{key:"hour",get:function(){return this.isValid?this.c.hour:NaN}},{key:"minute",get:function(){return this.isValid?this.c.minute:NaN}},{key:"second",get:function(){return this.isValid?this.c.second:NaN}},{key:"millisecond",get:function(){return this.isValid?this.c.millisecond:NaN}},{key:"weekYear",get:function(){return this.isValid?$n(this).weekYear:NaN}},{key:"weekNumber",get:function(){return this.isValid?$n(this).weekNumber:NaN}},{key:"weekday",get:function(){return this.isValid?$n(this).weekday:NaN}},{key:"isWeekend",get:function(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}},{key:"localWeekday",get:function(){return this.isValid?Bn(this).weekday:NaN}},{key:"localWeekNumber",get:function(){return this.isValid?Bn(this).weekNumber:NaN}},{key:"localWeekYear",get:function(){return this.isValid?Bn(this).weekYear:NaN}},{key:"ordinal",get:function(){return this.isValid?Xe(this.c).ordinal:NaN}},{key:"monthShort",get:function(){return this.isValid?In.months("short",{locObj:this.loc})[this.month-1]:null}},{key:"monthLong",get:function(){return this.isValid?In.months("long",{locObj:this.loc})[this.month-1]:null}},{key:"weekdayShort",get:function(){return this.isValid?In.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}},{key:"weekdayLong",get:function(){return this.isValid?In.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}},{key:"offset",get:function(){return this.isValid?+this.o:NaN}},{key:"offsetNameShort",get:function(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}},{key:"offsetNameLong",get:function(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}},{key:"isOffsetFixed",get:function(){return this.isValid?this.zone.isUniversal:null}},{key:"isInDST",get:function(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}},{key:"isInLeapYear",get:function(){return ft(this.year)}},{key:"daysInMonth",get:function(){return dt(this.year,this.month)}},{key:"daysInYear",get:function(){return this.isValid?M(this.year):NaN}},{key:"weeksInWeekYear",get:function(){return this.isValid?yt(this.weekYear):NaN}},{key:"weeksInLocalWeekYear",get:function(){return this.isValid?yt(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}}],[{key:"DATE_SHORT",get:function(){return G}},{key:"DATE_MED",get:function(){return $}},{key:"DATE_MED_WITH_WEEKDAY",get:function(){return B}},{key:"DATE_FULL",get:function(){return Q}},{key:"DATE_HUGE",get:function(){return K}},{key:"TIME_SIMPLE",get:function(){return X}},{key:"TIME_WITH_SECONDS",get:function(){return ee}},{key:"TIME_WITH_SHORT_OFFSET",get:function(){return te}},{key:"TIME_WITH_LONG_OFFSET",get:function(){return ne}},{key:"TIME_24_SIMPLE",get:function(){return re}},{key:"TIME_24_WITH_SECONDS",get:function(){return ie}},{key:"TIME_24_WITH_SHORT_OFFSET",get:function(){return oe}},{key:"TIME_24_WITH_LONG_OFFSET",get:function(){return ae}},{key:"DATETIME_SHORT",get:function(){return ue}},{key:"DATETIME_SHORT_WITH_SECONDS",get:function(){return se}},{key:"DATETIME_MED",get:function(){return le}},{key:"DATETIME_MED_WITH_SECONDS",get:function(){return ce}},{key:"DATETIME_MED_WITH_WEEKDAY",get:function(){return fe}},{key:"DATETIME_FULL",get:function(){return de}},{key:"DATETIME_FULL_WITH_SECONDS",get:function(){return he}},{key:"DATETIME_HUGE",get:function(){return me}},{key:"DATETIME_HUGE_WITH_SECONDS",get:function(){return ye}}]),k}(Symbol.for("nodejs.util.inspect.custom"));function yr(e){if(W.isDateTime(e))return e;if(e&&e.valueOf&&y(e.valueOf()))return W.fromJSDate(e);if(e&&"object"==typeof e)return W.fromObject(e);throw new u("Unknown datetime argument: "+e+", of type "+typeof e)}return e.DateTime=W,e.Duration=E,e.FixedOffsetZone=d,e.IANAZone=f,e.Info=In,e.Interval=Mn,e.InvalidZone=Le,e.Settings=O,e.SystemZone=ge,e.VERSION="3.4.4",e.Zone=s,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
/*! DataTables 2.1.2
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n){"use strict";var a;"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e,window,document)}):"object"==typeof exports?(a=require("jquery"),"undefined"==typeof window?module.exports=function(e,t){return e=e||window,t=t||a(e),n(t,e,e.document)}:module.exports=n(a,window,window.document)):window.DataTable=n(jQuery,window,document)}(function(H,W,_){"use strict";function f(e){var t=parseInt(e,10);return!isNaN(t)&&isFinite(e)?t:null}function s(e,t,n,a){var r=typeof e,o="string"==r;return"number"==r||"bigint"==r||!(!a||!T(e))||(t&&o&&(e=E(e,t)),n&&o&&(e=e.replace(P,"")),!isNaN(parseFloat(e))&&isFinite(e))}function c(e,t,n,a){var r;return!(!a||!T(e))||("string"!=typeof e||!e.match(/<(input|select)/i))&&(T(r=e)||"string"==typeof r)&&!!s(L(e),t,n,a)||null}function b(e,t,n,a){var r=[],o=0,i=t.length;if(void 0!==a)for(;o<i;o++)e[t[o]][n]&&r.push(e[t[o]][n][a]);else for(;o<i;o++)e[t[o]]&&r.push(e[t[o]][n]);return r}function h(e,t){var n,a=[];void 0===t?(t=0,n=e):(n=t,t=e);for(var r=t;r<n;r++)a.push(r);return a}function A(e){for(var t=[],n=0,a=e.length;n<a;n++)e[n]&&t.push(e[n]);return t}var C,X,t,e,V=function(e,P){var E,k,M;return V.factory(e,P)?V:this instanceof V?H(e).DataTable(P):(k=void 0===(P=e),M=(E=this).length,k&&(P={}),this.api=function(){return new X(this)},this.each(function(){var e=1<M?et({},P,!0):P,t=0,n=this.getAttribute("id"),a=V.defaults,r=H(this);if("table"!=this.nodeName.toLowerCase())$(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{H(this).trigger("options.dt",e),Q(a),K(a.column),q(a,a,!0),q(a.column,a.column,!0),q(a,H.extend(e,r.data()),!0);var o=V.settings;for(t=0,R=o.length;t<R;t++){var i=o[t];if(i.nTable==this||i.nTHead&&i.nTHead.parentNode==this||i.nTFoot&&i.nTFoot.parentNode==this){var l=(void 0!==e.bRetrieve?e:a).bRetrieve,s=(void 0!==e.bDestroy?e:a).bDestroy;if(k||l)return i.oInstance;if(s){new V.Api(i).destroy();break}return void $(i,0,"Cannot reinitialise DataTable",3)}if(i.sTableId==this.id){o.splice(t,1);break}}null!==n&&""!==n||(n="DataTables_Table_"+V.ext._unique++,this.id=n);var u,c=H.extend(!0,{},V.models.oSettings,{sDestroyWidth:r[0].style.width,sInstance:n,sTableId:n,colgroup:H("<colgroup>").prependTo(this),fastData:function(e,t,n){return B(c,e,t,n)}}),n=(c.nTable=this,c.oInit=e,o.push(c),c.api=new X(c),c.oInstance=1===E.length?E:r.dataTable(),Q(e),e.aLengthMenu&&!e.iDisplayLength&&(e.iDisplayLength=Array.isArray(e.aLengthMenu[0])?e.aLengthMenu[0][0]:H.isPlainObject(e.aLengthMenu[0])?e.aLengthMenu[0].value:e.aLengthMenu[0]),e=et(H.extend(!0,{},a),e),z(c.oFeatures,e,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]),z(c,e,["ajax","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","iStateDuration","bSortCellsTop","iTabIndex","sDom","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId","caption","layout","orderDescReverse",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]),z(c.oScroll,e,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]),z(c.oLanguage,e,"fnInfoCallback"),Y(c,"aoDrawCallback",e.fnDrawCallback),Y(c,"aoStateSaveParams",e.fnStateSaveParams),Y(c,"aoStateLoadParams",e.fnStateLoadParams),Y(c,"aoStateLoaded",e.fnStateLoaded),Y(c,"aoRowCallback",e.fnRowCallback),Y(c,"aoRowCreatedCallback",e.fnCreatedRow),Y(c,"aoHeaderCallback",e.fnHeaderCallback),Y(c,"aoFooterCallback",e.fnFooterCallback),Y(c,"aoInitComplete",e.fnInitComplete),Y(c,"aoPreDrawCallback",e.fnPreDrawCallback),c.rowIdFn=U(e.rowId),c),d=(V.__browser||(f={},V.__browser=f,p=H("<div/>").css({position:"fixed",top:0,left:-1*W.pageXOffset,height:1,width:1,overflow:"hidden"}).append(H("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(H("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=p.children(),u=d.children(),f.barWidth=d[0].offsetWidth-d[0].clientWidth,f.bScrollbarLeft=1!==Math.round(u.offset().left),p.remove()),H.extend(n.oBrowser,V.__browser),n.oScroll.iBarWidth=V.__browser.barWidth,c.oClasses),f=(H.extend(d,V.ext.classes,e.oClasses),r.addClass(d.table),c.oFeatures.bPaginate||(e.iDisplayStart=0),void 0===c.iInitDisplayStart&&(c.iInitDisplayStart=e.iDisplayStart,c._iDisplayStart=e.iDisplayStart),e.iDeferLoading),h=(null!==f&&(c.deferLoading=!0,u=Array.isArray(f),c._iRecordsDisplay=u?f[0]:f,c._iRecordsTotal=u?f[1]:f),[]),p=this.getElementsByTagName("thead"),n=Ae(c,p[0]);if(e.aoColumns)h=e.aoColumns;else if(n.length)for(R=n[t=0].length;t<R;t++)h.push(null);for(t=0,R=h.length;t<R;t++)ee(c);var g,v,m,b,y,D,x,S=c,w=e.aoColumnDefs,T=h,_=n,C=function(e,t){te(c,e,t)},L=S.aoColumns;if(T)for(g=0,v=T.length;g<v;g++)T[g]&&T[g].name&&(L[g].sName=T[g].name);if(w)for(g=w.length-1;0<=g;g--){var I=void 0!==(x=w[g]).target?x.target:void 0!==x.targets?x.targets:x.aTargets;for(Array.isArray(I)||(I=[I]),m=0,b=I.length;m<b;m++){var A=I[m];if("number"==typeof A&&0<=A){for(;L.length<=A;)ee(S);C(A,x)}else if("number"==typeof A&&A<0)C(L.length+A,x);else if("string"==typeof A)for(y=0,D=L.length;y<D;y++)"_all"===A?C(y,x):-1!==A.indexOf(":name")?L[y].sName===A.replace(":name","")&&C(y,x):_.forEach(function(e){e[y]&&(e=H(e[y].cell),A.match(/^[a-z][\w-]*$/i)&&(A="."+A),e.is(A))&&C(y,x)})}}if(T)for(g=0,v=T.length;g<v;g++)C(g,T[g]);var F,n=r.children("tbody").find("tr").eq(0),N=(n.length&&(F=function(e,t){return null!==e.getAttribute("data-"+t)?t:null},H(n[0]).children("th, td").each(function(e,t){var n,a=c.aoColumns[e];a||$(c,0,"Incorrect column count",18),a.mData===e&&(n=F(t,"sort")||F(t,"order"),t=F(t,"filter")||F(t,"search"),null===n&&null===t||(a.mData={_:e+".display",sort:null!==n?e+".@data-"+n:void 0,type:null!==n?e+".@data-"+n:void 0,filter:null!==t?e+".@data-"+t:void 0},a._isArrayHost=!0,te(c,e)))})),Y(c,"aoDrawCallback",Qe),c.oFeatures);if(e.bStateSave&&(N.bStateSave=!0),void 0===e.aaSorting)for(var j=c.aaSorting,t=0,R=j.length;t<R;t++)j[t][1]=c.aoColumns[t].asSorting[0];Ze(c),Y(c,"aoDrawCallback",function(){(c.bSorted||"ssp"===J(c)||N.bDeferRender)&&Ze(c)});var n=r.children("caption"),n=(c.caption&&(n=0===n.length?H("<caption/>").appendTo(r):n).html(c.caption),n.length&&(n[0]._captionSide=n.css("caption-side"),c.captionNode=n[0]),0===p.length&&(p=H("<thead/>").appendTo(r)),c.nTHead=p[0],H("tr",p).addClass(d.thead.row),r.children("tbody")),n=(0===n.length&&(n=H("<tbody/>").insertAfter(p)),c.nTBody=n[0],r.children("tfoot")),O=(0===n.length&&(n=H("<tfoot/>").appendTo(r)),c.nTFoot=n[0],H("tr",n).addClass(d.tfoot.row),c.aiDisplay=c.aiDisplayMaster.slice(),c.bInitialised=!0,c.oLanguage);H.extend(!0,O,e.oLanguage),O.sUrl?H.ajax({dataType:"json",url:O.sUrl,success:function(e){q(a.oLanguage,e),H.extend(!0,O,e,c.oInit.oLanguage),G(c,null,"i18n",[c],!0),Me(c)},error:function(){$(c,0,"i18n file loading error",21),Me(c)}}):(G(c,null,"i18n",[c]),Me(c))}}),E=null,this)},g=(V.ext=C={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],features:{},search:[],selector:{cell:[],column:[],row:[]},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{className:{},detect:[],render:{},search:{},order:{}},_unique:0,fnVersionCheck:V.fnVersionCheck,iApiIndex:0,sVersion:V.version},H.extend(C,{afnFiltering:C.search,aTypes:C.type.detect,ofnSearch:C.type.search,oSort:C.type.order,afnSortData:C.order,aoFeatures:C.feature,oStdClasses:C.classes,oPagination:C.pager}),H.extend(V.ext.classes,{container:"dt-container",empty:{row:"dt-empty"},info:{container:"dt-info"},layout:{row:"dt-layout-row",cell:"dt-layout-cell",tableRow:"dt-layout-table",tableCell:"",start:"dt-layout-start",end:"dt-layout-end",full:"dt-layout-full"},length:{container:"dt-length",select:"dt-input"},order:{canAsc:"dt-orderable-asc",canDesc:"dt-orderable-desc",isAsc:"dt-ordering-asc",isDesc:"dt-ordering-desc",none:"dt-orderable-none",position:"sorting_"},processing:{container:"dt-processing"},scrolling:{body:"dt-scroll-body",container:"dt-scroll",footer:{self:"dt-scroll-foot",inner:"dt-scroll-footInner"},header:{self:"dt-scroll-head",inner:"dt-scroll-headInner"}},search:{container:"dt-search",input:"dt-input"},table:"dataTable",tbody:{cell:"",row:""},thead:{cell:"",row:""},tfoot:{cell:"",row:""},paging:{active:"current",button:"dt-paging-button",container:"dt-paging",disabled:"disabled"}}),{}),F=/[\r\n\u2028]/g,N=/<([^>]*>)/g,j=Math.pow(2,28),R=/^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/,O=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^","-"].join("|\\")+")","g"),P=/['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,T=function(e){return!e||!0===e||"-"===e},E=function(e,t){return g[t]||(g[t]=new RegExp(Pe(t),"g")),"string"==typeof e&&"."!==t?e.replace(/\./g,"").replace(g[t],"."):e},m=function(e,t,n){var a=[],r=0,o=e.length;if(void 0!==n)for(;r<o;r++)e[r]&&e[r][t]&&a.push(e[r][t][n]);else for(;r<o;r++)e[r]&&a.push(e[r][t]);return a},L=function(e){if(!e)return e;if(e.length>j)throw new Error("Exceeded max str len");var t;for(e=e.replace(N,"");(e=(t=e).replace(/<script/i,""))!==t;);return t},u=function(e){return"string"==typeof(e=Array.isArray(e)?e.join(","):e)?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):e},k=function(e,t){var n;return"string"!=typeof e?e:(n=e.normalize("NFD")).length!==e.length?(!0===t?e+" ":"")+n.replace(/[\u0300-\u036f]/g,""):n},x=function(e){if(Array.from&&Set)return Array.from(new Set(e));if(function(e){if(!(e.length<2))for(var t=e.slice().sort(),n=t[0],a=1,r=t.length;a<r;a++){if(t[a]===n)return!1;n=t[a]}return!0}(e))return e.slice();var t,n,a,r=[],o=e.length,i=0;e:for(n=0;n<o;n++){for(t=e[n],a=0;a<i;a++)if(r[a]===t)continue e;r.push(t),i++}return r},M=function(e,t){if(Array.isArray(t))for(var n=0;n<t.length;n++)M(e,t[n]);else e.push(t);return e};function y(t,e){e&&e.split(" ").forEach(function(e){e&&t.classList.add(e)})}function Z(t){var n,a,r={};H.each(t,function(e){(n=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(n[1]+" ")&&(a=e.replace(n[0],n[2].toLowerCase()),r[a]=e,"o"===n[1])&&Z(t[e])}),t._hungarianMap=r}function q(t,n,a){var r;t._hungarianMap||Z(t),H.each(n,function(e){void 0===(r=t._hungarianMap[e])||!a&&void 0!==n[r]||("o"===r.charAt(0)?(n[r]||(n[r]={}),H.extend(!0,n[r],n[e]),q(t[r],n[r],a)):n[r]=n[e])})}V.util={diacritics:function(e,t){if("function"!=typeof e)return k(e,t);k=e},debounce:function(n,a){var r;return function(){var e=this,t=arguments;clearTimeout(r),r=setTimeout(function(){n.apply(e,t)},a||250)}},throttle:function(a,e){var r,o,i=void 0!==e?e:200;return function(){var e=this,t=+new Date,n=arguments;r&&t<r+i?(clearTimeout(o),o=setTimeout(function(){r=void 0,a.apply(e,n)},i)):(r=t,a.apply(e,n))}},escapeRegex:function(e){return e.replace(O,"\\$1")},set:function(a){var f;return H.isPlainObject(a)?V.util.set(a._):null===a?function(){}:"function"==typeof a?function(e,t,n){a(e,"set",t,n)}:"string"!=typeof a||-1===a.indexOf(".")&&-1===a.indexOf("[")&&-1===a.indexOf("(")?function(e,t){e[a]=t}:(f=function(e,t,n){for(var a,r,o,i,l=ge(n),n=l[l.length-1],s=0,u=l.length-1;s<u;s++){if("__proto__"===l[s]||"constructor"===l[s])throw new Error("Cannot set prototype values");if(a=l[s].match(pe),r=l[s].match(p),a){if(l[s]=l[s].replace(pe,""),e[l[s]]=[],(a=l.slice()).splice(0,s+1),i=a.join("."),Array.isArray(t))for(var c=0,d=t.length;c<d;c++)f(o={},t[c],i),e[l[s]].push(o);else e[l[s]]=t;return}r&&(l[s]=l[s].replace(p,""),e=e[l[s]](t)),null!==e[l[s]]&&void 0!==e[l[s]]||(e[l[s]]={}),e=e[l[s]]}n.match(p)?e[n.replace(p,"")](t):e[n.replace(pe,"")]=t},function(e,t){return f(e,t,a)})},get:function(r){var o,f;return H.isPlainObject(r)?(o={},H.each(r,function(e,t){t&&(o[e]=V.util.get(t))}),function(e,t,n,a){var r=o[t]||o._;return void 0!==r?r(e,t,n,a):e}):null===r?function(e){return e}:"function"==typeof r?function(e,t,n,a){return r(e,t,n,a)}:"string"!=typeof r||-1===r.indexOf(".")&&-1===r.indexOf("[")&&-1===r.indexOf("(")?function(e){return e[r]}:(f=function(e,t,n){var a,r,o;if(""!==n)for(var i=ge(n),l=0,s=i.length;l<s;l++){if(d=i[l].match(pe),a=i[l].match(p),d){if(i[l]=i[l].replace(pe,""),""!==i[l]&&(e=e[i[l]]),r=[],i.splice(0,l+1),o=i.join("."),Array.isArray(e))for(var u=0,c=e.length;u<c;u++)r.push(f(e[u],t,o));var d=d[0].substring(1,d[0].length-1);e=""===d?r:r.join(d);break}if(a)i[l]=i[l].replace(p,""),e=e[i[l]]();else{if(null===e||null===e[i[l]])return null;if(void 0===e||void 0===e[i[l]])return;e=e[i[l]]}}return e},function(e,t){return f(e,t,r)})},stripHtml:function(e){var t=typeof e;if("function"!=t)return"string"==t?L(e):e;L=e},escapeHtml:function(e){var t=typeof e;if("function"!=t)return"string"==t||Array.isArray(e)?u(e):e;u=e},unique:x};var r=function(e,t,n){void 0!==e[t]&&(e[n]=e[t])};function Q(e){r(e,"ordering","bSort"),r(e,"orderMulti","bSortMulti"),r(e,"orderClasses","bSortClasses"),r(e,"orderCellsTop","bSortCellsTop"),r(e,"order","aaSorting"),r(e,"orderFixed","aaSortingFixed"),r(e,"paging","bPaginate"),r(e,"pagingType","sPaginationType"),r(e,"pageLength","iDisplayLength"),r(e,"searching","bFilter"),"boolean"==typeof e.sScrollX&&(e.sScrollX=e.sScrollX?"100%":""),"boolean"==typeof e.scrollX&&(e.scrollX=e.scrollX?"100%":"");var t=e.aoSearchCols;if(t)for(var n=0,a=t.length;n<a;n++)t[n]&&q(V.models.oSearch,t[n]);e.serverSide&&!e.searchDelay&&(e.searchDelay=400)}function K(e){r(e,"orderable","bSortable"),r(e,"orderData","aDataSort"),r(e,"orderSequence","asSorting"),r(e,"orderDataType","sortDataType");var t=e.aDataSort;"number"!=typeof t||Array.isArray(t)||(e.aDataSort=[t])}function ee(e){var t=V.defaults.column,n=e.aoColumns.length,t=H.extend({},V.models.oColumn,t,{aDataSort:t.aDataSort||[n],mData:t.mData||n,idx:n,searchFixed:{},colEl:H("<col>").attr("data-dt-column",n)}),t=(e.aoColumns.push(t),e.aoPreSearchCols);t[n]=H.extend({},V.models.oSearch,t[n])}function te(e,t,n){function a(e){return"string"==typeof e&&-1!==e.indexOf("@")}var r=e.aoColumns[t],o=(null!=n&&(K(n),q(V.defaults.column,n,!0),void 0===n.mDataProp||n.mData||(n.mData=n.mDataProp),n.sType&&(r._sManualType=n.sType),n.className&&!n.sClass&&(n.sClass=n.className),t=r.sClass,H.extend(r,n),z(r,n,"sWidth","sWidthOrig"),t!==r.sClass&&(r.sClass=t+" "+r.sClass),void 0!==n.iDataSort&&(r.aDataSort=[n.iDataSort]),z(r,n,"aDataSort")),r.mData),i=U(o);r.mRender&&Array.isArray(r.mRender)&&(n=(t=r.mRender.slice()).shift(),r.mRender=V.render[n].apply(W,t)),r._render=r.mRender?U(r.mRender):null;r._bAttrSrc=H.isPlainObject(o)&&(a(o.sort)||a(o.type)||a(o.filter)),r._setter=null,r.fnGetData=function(e,t,n){var a=i(e,t,void 0,n);return r._render&&t?r._render(a,t,e,n):a},r.fnSetData=function(e,t,n){return v(o)(e,t,n)},"number"==typeof o||r._isArrayHost||(e._rowReadObject=!0),e.oFeatures.bSort||(r.bSortable=!1)}function ne(e){var t=e;if(t.oFeatures.bAutoWidth){var n,a,r=t.nTable,o=t.aoColumns,i=t.oScroll,l=i.sY,s=i.sX,i=i.sXInner,u=ie(t,"bVisible"),c=r.getAttribute("width"),d=r.parentNode,f=r.style.width,f=(f||c||(r.style.width="100%",f="100%"),f&&-1!==f.indexOf("%")&&(c=f),G(t,null,"column-calc",{visible:u},!1),H(r.cloneNode()).css("visibility","hidden").removeAttr("id")),h=(f.append("<tbody>"),H("<tr/>").appendTo(f.find("tbody")));for(f.append(H(t.nTHead).clone()).append(H(t.nTFoot).clone()),f.find("tfoot th, tfoot td").css("width",""),f.find("thead th, thead td").each(function(){var e=ce(t,this,!0,!1);e?(this.style.width=e,s&&H(this).append(H("<div/>").css({width:e,margin:0,padding:0,border:0,height:1}))):this.style.width=""}),n=0;n<u.length;n++){p=u[n],a=o[p];var p=function(e,t){var n=e.aoColumns[t];if(!n.maxLenString){for(var a,r="",o=-1,i=0,l=e.aiDisplayMaster.length;i<l;i++){var s=e.aiDisplayMaster[i],s=De(e,s)[t],s=s&&"object"==typeof s&&s.nodeType?s.innerHTML:s+"";s=s.replace(/id=".*?"/g,"").replace(/name=".*?"/g,""),(a=L(s).replace(/&nbsp;/g," ")).length>o&&(r=s,o=a.length)}n.maxLenString=r}return n.maxLenString}(t,p),g=C.type.className[a.sType],v=p+a.sContentPadding,p=-1===p.indexOf("<")?_.createTextNode(v):v;H("<td/>").addClass(g).addClass(a.sClass).append(p).appendTo(h)}H("[name]",f).removeAttr("name");var m=H("<div/>").css(s||l?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(f).appendTo(d),b=(s&&i?f.width(i):s?(f.css("width","auto"),f.removeAttr("width"),f.width()<d.clientWidth&&c&&f.width(d.clientWidth)):l?f.width(d.clientWidth):c&&f.width(c),0),y=f.find("tbody tr").eq(0).children();for(n=0;n<u.length;n++){var D=y[n].getBoundingClientRect().width;b+=D,o[u[n]].sWidth=I(D)}r.style.width=I(b),m.remove(),c&&(r.style.width=I(c)),!c&&!s||t._reszEvt||(H(W).on("resize.DT-"+t.sInstance,V.util.throttle(function(){t.bDestroying||ne(t)})),t._reszEvt=!0)}for(var x=e,S=x.aoColumns,w=0;w<S.length;w++){var T=ce(x,[w],!1,!1);S[w].colEl.css("width",T)}i=e.oScroll;""===i.sY&&""===i.sX||Be(e),G(e,null,"column-sizing",[e])}function ae(e,t){e=ie(e,"bVisible");return"number"==typeof e[t]?e[t]:null}function re(e,t){e=ie(e,"bVisible").indexOf(t);return-1!==e?e:null}function oe(e){var t=e.aoHeader,n=e.aoColumns,a=0;if(t.length)for(var r=0,o=t[0].length;r<o;r++)n[r].bVisible&&"none"!==H(t[0][r].cell).css("display")&&a++;return a}function ie(e,n){var a=[];return e.aoColumns.map(function(e,t){e[n]&&a.push(t)}),a}function le(e,t){return!0===t?e.name:t}function se(e){var t,n,a,r,o,i,l,s,u=e.aoColumns,c=e.aoData,d=V.ext.type.detect;if("ssp"!==J(e))for(t=0,n=u.length;t<n;t++){if(s=[],!(l=u[t]).sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){for(a=0,r=d.length;a<r;a++){var f=d[a],h=f.oneOf,p=f.allOf||f,g=f.init,v=!1,m=null;if(g&&(m=le(f,g(e,l,t)))){l.sType=m;break}for(o=0,i=c.length;o<i;o++)if(c[o]){if(void 0===s[o]&&(s[o]=B(e,o,t,"type")),h&&!v&&(v=le(f,h(s[o],e))),!(m=le(f,p(s[o],e)))&&a!==d.length-3)break;if("html"===m&&!T(s[o]))break}if(h&&v&&m||!h&&m){l.sType=m;break}}l.sType||(l.sType="string")}var b=C.type.className[l.sType],b=(b&&(ue(e.aoHeader,t,b),ue(e.aoFooter,t,b)),C.type.render[l.sType]);if(b&&!l._render){l._render=V.util.get(b),y=w=S=x=D=void 0;for(var y,D=e,x=t,S=D.aoData,w=0;w<S.length;w++)S[w].nTr&&(y=B(D,w,x,"display"),S[w].displayData[x]=y,he(S[w].anCells[x],y))}}}function ue(e,t,n){e.forEach(function(e){e[t]&&e[t].unique&&y(e[t].cell,n)})}function ce(e,t,n,a){Array.isArray(t)||(t=de(t));for(var r,o=0,i=e.aoColumns,l=0,s=t.length;l<s;l++){var u=i[t[l]],c=n?u.sWidthOrig:u.sWidth;if(a||!1!==u.bVisible){if(null==c)return null;"number"==typeof c?(r="px",o+=c):(u=c.match(/([\d\.]+)([^\d]*)/))&&(o+=+u[1],r=3===u.length?u[2]:"px")}}return o+r}function de(e){e=H(e).closest("[data-dt-column]").attr("data-dt-column");return e?e.split(",").map(function(e){return+e}):[]}function D(e,t,n,a){for(var r=e.aoData.length,o=H.extend(!0,{},V.models.oRow,{src:n?"dom":"data",idx:r}),i=(o._aData=t,e.aoData.push(o),e.aoColumns),l=0,s=i.length;l<s;l++)i[l].sType=null;e.aiDisplayMaster.push(r);t=e.rowIdFn(t);return void 0!==t&&(e.aIds[t]=o),!n&&e.oFeatures.bDeferRender||xe(e,r,n,a),r}function fe(n,e){var a;return(e=e instanceof H?e:H(e)).map(function(e,t){return a=ye(n,t),D(n,a.data,t,a.cells)})}function B(e,t,n,a){"search"===a?a="filter":"order"===a&&(a="sort");var r=e.aoData[t];if(r){var o=e.iDraw,i=e.aoColumns[n],r=r._aData,l=i.sDefaultContent,s=i.fnGetData(r,a,{settings:e,row:t,col:n});if(void 0===(s="display"!==a&&s&&"object"==typeof s&&s.nodeName?s.innerHTML:s))return e.iDrawError!=o&&null===l&&($(e,0,"Requested unknown parameter "+("function"==typeof i.mData?"{function}":"'"+i.mData+"'")+" for row "+t+", column "+n,4),e.iDrawError=o),l;if(s!==r&&null!==s||null===l||void 0===a){if("function"==typeof s)return s.call(r)}else s=l;return null===s&&"display"===a?"":s="filter"===a&&(t=V.ext.type.search)[i.sType]?t[i.sType](s):s}}function he(e,t){t&&"object"==typeof t&&t.nodeName?H(e).empty().append(t):e.innerHTML=t}var pe=/\[.*?\]$/,p=/\(\)$/;function ge(e){return(e.match(/(\\.|[^.])+/g)||[""]).map(function(e){return e.replace(/\\\./g,".")})}var U=V.util.get,v=V.util.set;function ve(e){return m(e.aoData,"_aData")}function me(e){e.aoData.length=0,e.aiDisplayMaster.length=0,e.aiDisplay.length=0,e.aIds={}}function be(e,t,n,a){var r,o,i=e.aoData[t];if(i._aSortData=null,i._aFilterData=null,i.displayData=null,"dom"!==n&&(n&&"auto"!==n||"dom"!==i.src)){var l=i.anCells,s=De(e,t);if(l)if(void 0!==a)he(l[a],s[a]);else for(r=0,o=l.length;r<o;r++)he(l[r],s[r])}else i._aData=ye(e,i,a,void 0===a?void 0:i._aData).data;var u=e.aoColumns;if(void 0!==a)u[a].sType=null,u[a].maxLenString=null;else{for(r=0,o=u.length;r<o;r++)u[r].sType=null,u[r].maxLenString=null;Se(e,i)}}function ye(e,t,n,a){function r(e,t){var n;"string"==typeof e&&-1!==(n=e.indexOf("@"))&&(n=e.substring(n+1),v(e)(a,t.getAttribute(n)))}function o(e){void 0!==n&&n!==d||(l=f[d],s=e.innerHTML.trim(),l&&l._bAttrSrc?(v(l.mData._)(a,s),r(l.mData.sort,e),r(l.mData.type,e),r(l.mData.filter,e)):h?(l._setter||(l._setter=v(l.mData)),l._setter(a,s)):a[d]=s),d++}var i,l,s,u=[],c=t.firstChild,d=0,f=e.aoColumns,h=e._rowReadObject;a=void 0!==a?a:h?{}:[];if(c)for(;c;)"TD"!=(i=c.nodeName.toUpperCase())&&"TH"!=i||(o(c),u.push(c)),c=c.nextSibling;else for(var p=0,g=(u=t.anCells).length;p<g;p++)o(u[p]);var t=t.firstChild?t:t.nTr;return t&&(t=t.getAttribute("id"))&&v(e.rowId)(a,t),{data:a,cells:u}}function De(e,t){var n=e.aoData[t],a=e.aoColumns;if(!n.displayData){n.displayData=[];for(var r=0,o=a.length;r<o;r++)n.displayData.push(B(e,t,r,"display"))}return n.displayData}function xe(e,t,n,a){var r,o,i,l,s,u,c=e.aoData[t],d=c._aData,f=[],h=e.oClasses.tbody.row;if(null===c.nTr){for(r=n||_.createElement("tr"),c.nTr=r,c.anCells=f,y(r,h),r._DT_RowIndex=t,Se(e,c),l=0,s=e.aoColumns.length;l<s;l++){i=e.aoColumns[l],(o=(u=!n||!a[l])?_.createElement(i.sCellType):a[l])||$(e,0,"Incorrect column count",18),o._DT_CellIndex={row:t,column:l},f.push(o);var p=De(e,t);!u&&(!i.mRender&&i.mData===l||H.isPlainObject(i.mData)&&i.mData._===l+".display")||he(o,p[l]),i.bVisible&&u?r.appendChild(o):i.bVisible||u||o.parentNode.removeChild(o),i.fnCreatedCell&&i.fnCreatedCell.call(e.oInstance,o,B(e,t,l),d,t,l)}G(e,"aoRowCreatedCallback","row-created",[r,d,t,f])}else y(c.nTr,h)}function Se(e,t){var n=t.nTr,a=t._aData;n&&((e=e.rowIdFn(a))&&(n.id=e),a.DT_RowClass&&(e=a.DT_RowClass.split(" "),t.__rowc=t.__rowc?x(t.__rowc.concat(e)):e,H(n).removeClass(t.__rowc.join(" ")).addClass(a.DT_RowClass)),a.DT_RowAttr&&H(n).attr(a.DT_RowAttr),a.DT_RowData)&&H(n).data(a.DT_RowData)}function we(e,t){var n,a=e.oClasses,r=e.aoColumns,o="header"===t?e.nTHead:e.nTFoot,i="header"===t?"sTitle":t;if(o){if(("header"===t||m(e.aoColumns,i).join(""))&&1===(n=(n=H("tr",o)).length?n:H("<tr/>").appendTo(o)).length)for(var l=H("td, th",n).length,s=r.length;l<s;l++)H("<th/>").html(r[l][i]||"").appendTo(n);var u=Ae(e,o,!0);"header"===t?e.aoHeader=u:e.aoFooter=u,H(o).children("tr").attr("role","row"),H(o).children("tr").children("th, td").each(function(){at(e,t)(e,H(this),a)})}}function Te(e,t,n){var a,r,o,i,l,s=[],u=[],c=e.aoColumns,e=c.length;if(t){for(n=n||h(e).filter(function(e){return c[e].bVisible}),a=0;a<t.length;a++)s[a]=t[a].slice().filter(function(e,t){return n.includes(t)}),u.push([]);for(a=0;a<s.length;a++)for(r=0;r<s[a].length;r++)if(l=i=1,void 0===u[a][r]){for(o=s[a][r].cell;void 0!==s[a+i]&&s[a][r].cell==s[a+i][r].cell;)u[a+i][r]=null,i++;for(;void 0!==s[a][r+l]&&s[a][r].cell==s[a][r+l].cell;){for(var d=0;d<i;d++)u[a+d][r+l]=null;l++}var f=H("span.dt-column-title",o);u[a][r]={cell:o,colspan:l,rowspan:i,title:(f.length?f:H(o)).html()}}return u}}function _e(e,t){for(var n,a,r=Te(e,t),o=0;o<t.length;o++){if(n=t[o].row)for(;a=n.firstChild;)n.removeChild(a);for(var i=0;i<r[o].length;i++){var l=r[o][i];l&&H(l.cell).appendTo(n).attr("rowspan",l.rowspan).attr("colspan",l.colspan)}}}function S(e,t){if(r="ssp"==J(s=e),void 0!==(i=s.iInitDisplayStart)&&-1!==i&&(s._iDisplayStart=!r&&i>=s.fnRecordsDisplay()?0:i,s.iInitDisplayStart=-1),-1!==G(e,"aoPreDrawCallback","preDraw",[e]).indexOf(!1))w(e,!1);else{var l,n=[],a=0,r="ssp"==J(e),o=e.aiDisplay,i=e._iDisplayStart,s=e.fnDisplayEnd(),u=e.aoColumns,c=H(e.nTBody);if(e.bDrawing=!0,e.deferLoading)e.deferLoading=!1,e.iDraw++,w(e,!1);else if(r){if(!e.bDestroying&&!t)return 0===e.iDraw&&c.empty().append(Ce(e)),(l=e).iDraw++,w(l,!0),void Fe(l,function(t){function n(e,t){return"function"==typeof a[e][t]?"function":a[e][t]}var a=t.aoColumns,e=t.oFeatures,r=t.oPreviousSearch,o=t.aoPreSearchCols;return{draw:t.iDraw,columns:a.map(function(t,e){return{data:n(e,"mData"),name:t.sName,searchable:t.bSearchable,orderable:t.bSortable,search:{value:o[e].search,regex:o[e].regex,fixed:Object.keys(t.searchFixed).map(function(e){return{name:e,term:t.searchFixed[e].toString()}})}}}),order:Ge(t).map(function(e){return{column:e.col,dir:e.dir,name:n(e.col,"sName")}}),start:t._iDisplayStart,length:e.bPaginate?t._iDisplayLength:-1,search:{value:r.search,regex:r.regex,fixed:Object.keys(t.searchFixed).map(function(e){return{name:e,term:t.searchFixed[e].toString()}})}}}(l),function(e){var t=l,n=Ne(t,e=e),a=je(t,"draw",e),r=je(t,"recordsTotal",e),e=je(t,"recordsFiltered",e);if(void 0!==a){if(+a<t.iDraw)return;t.iDraw=+a}n=n||[],me(t),t._iRecordsTotal=parseInt(r,10),t._iRecordsDisplay=parseInt(e,10);for(var o=0,i=n.length;o<i;o++)D(t,n[o]);t.aiDisplay=t.aiDisplayMaster.slice(),S(t,!0),He(t),w(t,!1)})}else e.iDraw++;if(0!==o.length)for(var d=r?e.aoData.length:s,f=r?0:i;f<d;f++){for(var h=o[f],p=e.aoData[h],g=(null===p.nTr&&xe(e,h),p.nTr),v=0;v<u.length;v++){var m=u[v],b=p.anCells[v];y(b,C.type.className[m.sType]),y(b,m.sClass),y(b,e.oClasses.tbody.cell)}G(e,"aoRowCallback",null,[g,p._aData,a,f,h]),n.push(g),a++}else n[0]=Ce(e);G(e,"aoHeaderCallback","header",[H(e.nTHead).children("tr")[0],ve(e),i,s,o]),G(e,"aoFooterCallback","footer",[H(e.nTFoot).children("tr")[0],ve(e),i,s,o]),c[0].replaceChildren?c[0].replaceChildren.apply(c[0],n):(c.children().detach(),c.append(H(n))),H(e.nTableWrapper).toggleClass("dt-empty-footer",0===H("tr",e.nTFoot).length),G(e,"aoDrawCallback","draw",[e],!0),e.bSorted=!1,e.bFiltered=!1,e.bDrawing=!1}}function d(e,t,n){var a=e.oFeatures,r=a.bSort,a=a.bFilter;void 0!==n&&!0!==n||(se(e),r&&Je(e),a?Re(e,e.oPreviousSearch):e.aiDisplay=e.aiDisplayMaster.slice()),!0!==t&&(e._iDisplayStart=0),e._drawHold=t,S(e),e._drawHold=!1}function Ce(e){var t=e.oLanguage,n=t.sZeroRecords,a=J(e);return e.iDraw<1&&"ssp"===a||e.iDraw<=1&&"ajax"===a?n=t.sLoadingRecords:t.sEmptyTable&&0===e.fnRecordsTotal()&&(n=t.sEmptyTable),H("<tr/>").append(H("<td />",{colSpan:oe(e),class:e.oClasses.empty.row}).html(n))[0]}function Le(e,t,r){var o=[];H.each(t,function(e,t){var n,a;null!==t&&(n=(e=e.match(/^([a-z]+)([0-9]*)([A-Za-z]*)$/))[2]?+e[2]:0,a=e[3]?e[3].toLowerCase():"full",e[1]===r)&&function e(t,n,a){if(Array.isArray(a))for(var r=0;r<a.length;r++)e(t,n,a[r]);else{var o=t[n];H.isPlainObject(a)?a.features?(a.rowId&&(t.id=a.rowId),a.rowClass&&(t.className=a.rowClass),o.id=a.id,o.className=a.className,e(t,n,a.features)):Object.keys(a).map(function(e){o.contents.push({feature:e,opts:a[e]})}):o.contents.push(a)}}(function(e,t,n){for(var a,r=0;r<e.length;r++)if((a=e[r]).rowNum===t&&("full"===n&&a.full||("start"===n||"end"===n)&&(a.start||a.end)))return a[n]||(a[n]={contents:[]}),a;return(a={rowNum:t})[n]={contents:[]},e.push(a),a}(o,n,a),a,t)}),o.sort(function(e,t){var n=e.rowNum,a=t.rowNum;return n===a?(e=e.full&&!t.full?-1:1,"bottom"===r?-1*e:e):a-n}),"bottom"===r&&o.reverse();for(var n=0;n<o.length;n++)delete o[n].rowNum,!function(o,i){function l(e,t){return C.features[e]||$(o,0,"Unknown feature: "+e),C.features[e].apply(this,[o,t])}function e(e){if(i[e])for(var t,n=i[e].contents,a=0,r=n.length;a<r;a++)n[a]&&("string"==typeof n[a]?n[a]=l(n[a],null):H.isPlainObject(n[a])?n[a]=l(n[a].feature,n[a].opts):"function"==typeof n[a].node?n[a]=n[a].node(o):"function"==typeof n[a]&&(t=n[a](o),n[a]="function"==typeof t.node?t.node():t))}e("start"),e("end"),e("full")}(e,o[n]);return o}function Ie(t){var a,e=t.oClasses,n=H(t.nTable),r=H("<div/>").attr({id:t.sTableId+"_wrapper",class:e.container}).insertBefore(n);if(t.nTableWrapper=r[0],t.sDom)for(var o,i,l,s,u,c,d=t,e=t.sDom,f=r,h=e.match(/(".*?")|('.*?')|./g),p=0;p<h.length;p++)o=null,"<"==(i=h[p])?(l=H("<div/>"),"'"!=(s=h[p+1])[0]&&'"'!=s[0]||(s=s.replace(/['"]/g,""),u="",-1!=s.indexOf(".")?(c=s.split("."),u=c[0],c=c[1]):"#"==s[0]?u=s:c=s,l.attr("id",u.substring(1)).addClass(c),p++),f.append(l),f=l):">"==i?f=f.parent():"t"==i?o=qe(d):V.ext.feature.forEach(function(e){i==e.cFeature&&(o=e.fnInit(d))}),o&&f.append(o);else{var n=Le(t,t.layout,"top"),e=Le(t,t.layout,"bottom"),g=at(t,"layout");n.forEach(function(e){g(t,r,e)}),g(t,r,{full:{table:!0,contents:[qe(t)]}}),e.forEach(function(e){g(t,r,e)})}var n=t,e=n.nTable,v=""!==n.oScroll.sX||""!==n.oScroll.sY;n.oFeatures.bProcessing&&(a=H("<div/>",{id:n.sTableId+"_processing",class:n.oClasses.processing.container,role:"status"}).html(n.oLanguage.sProcessing).append("<div><div></div><div></div><div></div><div></div></div>"),v?a.prependTo(H("div.dt-scroll",n.nTableWrapper)):a.insertBefore(e),H(e).on("processing.dt.DT",function(e,t,n){a.css("display",n?"block":"none")}))}function Ae(e,t,n){for(var a,r,o,i,l,s,u=e.aoColumns,c=H(t).children("tr"),d=t&&"thead"===t.nodeName.toLowerCase(),f=[],h=0,p=c.length;h<p;h++)f.push([]);for(h=0,p=c.length;h<p;h++)for(r=(a=c[h]).firstChild;r;){if("TD"==r.nodeName.toUpperCase()||"TH"==r.nodeName.toUpperCase()){var g,v,m,b,y,D=[];for(b=(b=+r.getAttribute("colspan"))&&0!=b&&1!=b?b:1,y=(y=+r.getAttribute("rowspan"))&&0!=y&&1!=y?y:1,l=function(e,t,n){for(var a=e[t];a[n];)n++;return n}(f,h,0),s=1==b,n&&(s&&(te(e,l,H(r).data()),g=u[l],v=r.getAttribute("width")||null,(m=r.style.width.match(/width:\s*(\d+[pxem%]+)/))&&(v=m[1]),g.sWidthOrig=g.sWidth||v,d?(null===g.sTitle||g.autoTitle||(r.innerHTML=g.sTitle),!g.sTitle&&s&&(g.sTitle=L(r.innerHTML),g.autoTitle=!0)):g.footer&&(r.innerHTML=g.footer),g.ariaTitle||(g.ariaTitle=H(r).attr("aria-label")||g.sTitle),g.className)&&H(r).addClass(g.className),0===H("span.dt-column-title",r).length&&H("<span>").addClass("dt-column-title").append(r.childNodes).appendTo(r),d)&&0===H("span.dt-column-order",r).length&&H("<span>").addClass("dt-column-order").appendTo(r),i=0;i<b;i++){for(o=0;o<y;o++)f[h+o][l+i]={cell:r,unique:s},f[h+o].row=a;D.push(l+i)}r.setAttribute("data-dt-column",x(D).join(","))}r=r.nextSibling}return f}function Fe(n,e,a){function t(e){var t=n.jqXHR?n.jqXHR.status:null;if((null===e||"number"==typeof t&&204==t)&&Ne(n,e={},[]),(t=e.error||e.sError)&&$(n,0,t),e.d&&"string"==typeof e.d)try{e=JSON.parse(e.d)}catch(e){}n.json=e,G(n,null,"xhr",[n,e,n.jqXHR],!0),a(e)}var r,o=n.ajax,i=n.oInstance,l=(H.isPlainObject(o)&&o.data&&(l="function"==typeof(r=o.data)?r(e,n):r,e="function"==typeof r&&l?l:H.extend(!0,e,l),delete o.data),{url:"string"==typeof o?o:"",data:e,success:t,dataType:"json",cache:!1,type:n.sServerMethod,error:function(e,t){-1===G(n,null,"xhr",[n,null,n.jqXHR],!0).indexOf(!0)&&("parsererror"==t?$(n,0,"Invalid JSON response",1):4===e.readyState&&$(n,0,"Ajax error",7)),w(n,!1)}});H.isPlainObject(o)&&H.extend(l,o),n.oAjaxData=e,G(n,null,"preXhr",[n,e,l],!0),"function"==typeof o?n.jqXHR=o.call(i,e,t,n):""===o.url?(i={},V.util.set(o.dataSrc)(i,[]),t(i)):n.jqXHR=H.ajax(l),r&&(o.data=r)}function Ne(e,t,n){var a="data";if(H.isPlainObject(e.ajax)&&void 0!==e.ajax.dataSrc&&("string"==typeof(e=e.ajax.dataSrc)||"function"==typeof e?a=e:void 0!==e.data&&(a=e.data)),!n)return"data"===a?t.aaData||t[a]:""!==a?U(a)(t):t;v(a)(t,n)}function je(e,t,n){var e=H.isPlainObject(e.ajax)?e.ajax.dataSrc:null;return e&&e[t]?U(e[t])(n):(e="","draw"===t?e="sEcho":"recordsTotal"===t?e="iTotalRecords":"recordsFiltered"===t&&(e="iTotalDisplayRecords"),void 0!==n[e]?n[e]:n[t])}function Re(n,e){var t=n.aoPreSearchCols;if("ssp"!=J(n)){for(var a,r,o,i,l,s=n,u=s.aoColumns,c=s.aoData,d=0;d<c.length;d++)if(c[d]&&!(l=c[d])._aFilterData){for(o=[],a=0,r=u.length;a<r;a++)u[a].bSearchable?"string"!=typeof(i=null===(i=B(s,d,a,"filter"))?"":i)&&i.toString&&(i=i.toString()):i="",i.indexOf&&-1!==i.indexOf("&")&&(Ee.innerHTML=i,i=ke?Ee.textContent:Ee.innerText),i.replace&&(i=i.replace(/[\r\n\u2028]/g,"")),o.push(i);l._aFilterData=o,l._sFilterRow=o.join("  "),0}n.aiDisplay=n.aiDisplayMaster.slice(),Oe(n.aiDisplay,n,e.search,e),H.each(n.searchFixed,function(e,t){Oe(n.aiDisplay,n,t,{})});for(var f=0;f<t.length;f++){var h=t[f];Oe(n.aiDisplay,n,h.search,h,f),H.each(n.aoColumns[f].searchFixed,function(e,t){Oe(n.aiDisplay,n,t,{},f)})}for(var p,g,v=n,m=V.ext.search,b=v.aiDisplay,y=0,D=m.length;y<D;y++){for(var x=[],S=0,w=b.length;S<w;S++)g=b[S],p=v.aoData[g],m[y](v,p._aFilterData,g,p._aData,S)&&x.push(g);b.length=0,b.push.apply(b,x)}}n.bFiltered=!0,G(n,null,"search",[n])}function Oe(e,t,n,a,r){if(""!==n){for(var o=0,i=[],l="function"==typeof n?n:null,s=n instanceof RegExp?n:l?null:function(e,t){var a=[],t=H.extend({},{boundary:!1,caseInsensitive:!0,exact:!1,regex:!1,smart:!0},t);"string"!=typeof e&&(e=e.toString());if(e=k(e),t.exact)return new RegExp("^"+Pe(e)+"$",t.caseInsensitive?"i":"");{var n,r,o;e=t.regex?e:Pe(e),t.smart&&(n=(e.match(/!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g)||[""]).map(function(e){var t,n=!1;return"!"===e.charAt(0)&&(n=!0,e=e.substring(1)),'"'===e.charAt(0)?e=(t=e.match(/^"(.*)"$/))?t[1]:e:"“"===e.charAt(0)&&(e=(t=e.match(/^\u201C(.*)\u201D$/))?t[1]:e),n&&(1<e.length&&a.push("(?!"+e+")"),e=""),e.replace(/"/g,"")}),r=a.length?a.join(""):"",o=t.boundary?"\\b":"",e="^(?=.*?"+o+n.join(")(?=.*?"+o)+")("+r+".)*$")}return new RegExp(e,t.caseInsensitive?"i":"")}(n,a),o=0;o<e.length;o++){var u=t.aoData[e[o]],c=void 0===r?u._sFilterRow:u._aFilterData[r];(l&&l(c,u._aData,e[o],r)||s&&s.test(c))&&i.push(e[o])}for(e.length=i.length,o=0;o<i.length;o++)e[o]=i[o]}}var Pe=V.util.escapeRegex,Ee=H("<div>")[0],ke=void 0!==Ee.textContent;function Me(o){var i,t,n,e,l=o.iInitDisplayStart,s=o.oInit,u=o.deferLoading,c=J(o);o.bInitialised?(we(o,"header"),we(o,"footer"),n=function(){if(_e(o,o.aoHeader),_e(o,o.aoFooter),s.aaData)for(i=0;i<s.aaData.length;i++)D(o,s.aaData[i]);else!u&&"dom"!=c||fe(o,H(o.nTBody).children("tr"));o.aiDisplay=o.aiDisplayMaster.slice(),Ie(o);var e=o,t=e.nTHead,n=t.querySelectorAll("tr"),a=e.bSortCellsTop,r=':not([data-dt-order="disable"]):not([data-dt-order="icon-only"])';!0===a?t=n[0]:!1===a&&(t=n[n.length-1]),$e(e,t,t===e.nTHead?"tr"+r+" th"+r+", tr"+r+" td"+r:"th"+r+", td"+r),Ye(e,a=[],e.aaSorting),e.aaSorting=a,Ue(o),w(o,!0),G(o,null,"preInit",[o],!0),d(o),"ssp"==c&&!u||("ajax"==c?Fe(o,{},function(e){var t=Ne(o,e);for(i=0;i<t.length;i++)D(o,t[i]);o.iInitDisplayStart=l,d(o),w(o,!1),He(o)}):(He(o),w(o,!1)))},(t=o).oFeatures.bStateSave?void 0!==(e=t.fnStateLoadCallback.call(t.oInstance,t,function(e){Ke(t,e,n)}))&&Ke(t,e,n):n()):setTimeout(function(){Me(o)},200)}function He(e){var t;e._bInitComplete||(t=[e,e.json],e._bInitComplete=!0,ne(e),G(e,null,"plugin-init",t,!0),G(e,"aoInitComplete","init",t,!0))}function We(e,t){t=parseInt(t,10);e._iDisplayLength=t,nt(e),G(e,null,"length",[e,t])}function Xe(e,t,n){var a=e._iDisplayStart,r=e._iDisplayLength,o=e.fnRecordsDisplay();if(0===o||-1===r)a=0;else if("number"==typeof t)o<(a=t*r)&&(a=0);else if("first"==t)a=0;else if("previous"==t)(a=0<=r?a-r:0)<0&&(a=0);else if("next"==t)a+r<o&&(a+=r);else if("last"==t)a=Math.floor((o-1)/r)*r;else{if("ellipsis"===t)return;$(e,0,"Unknown paging action: "+t,5)}o=e._iDisplayStart!==a;e._iDisplayStart=a,G(e,null,o?"page":"page-nc",[e]),o&&n&&S(e)}function w(e,t){G(e,null,"processing",[e,t])}function Ve(e,t,n){t?(w(e,!0),setTimeout(function(){n(),w(e,!1)},0)):n()}function qe(e){var t,n,a,r,o,i,l,s,u,c,d,f,h,p=H(e.nTable),g=e.oScroll;return""===g.sX&&""===g.sY?e.nTable:(t=g.sX,n=g.sY,a=e.oClasses.scrolling,o=(r=e.captionNode)?r._captionSide:null,u=H(p[0].cloneNode(!1)),i=H(p[0].cloneNode(!1)),c=function(e){return e?I(e):null},(l=p.children("tfoot")).length||(l=null),u=H(s="<div/>",{class:a.container}).append(H(s,{class:a.header.self}).css({overflow:"hidden",position:"relative",border:0,width:t?c(t):"100%"}).append(H(s,{class:a.header.inner}).css({"box-sizing":"content-box",width:g.sXInner||"100%"}).append(u.removeAttr("id").css("margin-left",0).append("top"===o?r:null).append(p.children("thead"))))).append(H(s,{class:a.body}).css({position:"relative",overflow:"auto",width:c(t)}).append(p)),l&&u.append(H(s,{class:a.footer.self}).css({overflow:"hidden",border:0,width:t?c(t):"100%"}).append(H(s,{class:a.footer.inner}).append(i.removeAttr("id").css("margin-left",0).append("bottom"===o?r:null).append(p.children("tfoot"))))),c=u.children(),d=c[0],f=c[1],h=l?c[2]:null,H(f).on("scroll.DT",function(){var e=this.scrollLeft;d.scrollLeft=e,l&&(h.scrollLeft=e)}),H("th, td",d).on("focus",function(){var e=d.scrollLeft;f.scrollLeft=e,l&&(f.scrollLeft=e)}),H(f).css("max-height",n),g.bCollapse||H(f).css("height",n),e.nScrollHead=d,e.nScrollBody=f,e.nScrollFoot=h,e.aoDrawCallback.push(Be),u[0])}function Be(t){var e=t.oScroll.iBarWidth,n=H(t.nScrollHead).children("div"),a=n.children("table"),r=t.nScrollBody,o=H(r),i=H(t.nScrollFoot).children("div"),l=i.children("table"),s=H(t.nTHead),u=H(t.nTable),c=t.nTFoot&&H("th, td",t.nTFoot).length?H(t.nTFoot):null,d=t.oBrowser,f=r.scrollHeight>r.clientHeight;if(t.scrollBarVis!==f&&void 0!==t.scrollBarVis)t.scrollBarVis=f,ne(t);else{if(t.scrollBarVis=f,u.children("thead, tfoot").remove(),(f=s.clone().prependTo(u)).find("th, td").removeAttr("tabindex"),f.find("[id]").removeAttr("id"),c&&(v=c.clone().prependTo(u)).find("[id]").removeAttr("id"),t.aiDisplay.length)for(var h=u.children("tbody").eq(0).children("tr").eq(0).children("th, td").map(function(e){return{idx:ae(t,e),width:H(this).outerWidth()}}),p=0;p<h.length;p++){var g=t.aoColumns[h[p].idx].colEl[0];g.style.width.replace("px","")!==h[p].width&&(g.style.width=h[p].width+"px")}a.find("colgroup").remove(),a.append(t.colgroup.clone()),c&&(l.find("colgroup").remove(),l.append(t.colgroup.clone())),H("th, td",f).each(function(){H(this.childNodes).wrapAll('<div class="dt-scroll-sizing">')}),c&&H("th, td",v).each(function(){H(this.childNodes).wrapAll('<div class="dt-scroll-sizing">')});var s=Math.floor(u.height())>r.clientHeight||"scroll"==o.css("overflow-y"),f="padding"+(d.bScrollbarLeft?"Left":"Right"),v=u.outerWidth();a.css("width",I(v)),n.css("width",I(v)).css(f,s?e+"px":"0px"),c&&(l.css("width",I(v)),i.css("width",I(v)).css(f,s?e+"px":"0px")),u.children("colgroup").prependTo(u),o.trigger("scroll"),!t.bSorted&&!t.bFiltered||t._drawHold||(r.scrollTop=0)}}function I(e){return null===e?"0px":"number"==typeof e?e<0?"0px":e+"px":e.match(/\d$/)?e+"px":e}function Ue(e){var t=e.aoColumns;for(e.colgroup.empty(),a=0;a<t.length;a++)t[a].bVisible&&e.colgroup.append(t[a].colEl)}function $e(o,e,t,i,l){tt(e,t,function(e){var t=!1,n=void 0===i?de(e.target):[i];if(n.length){for(var a=0,r=n.length;a<r;a++)if(!1!==function(e,t,n,a){function r(e,t){var n=e._idx;return(n=void 0===n?s.indexOf(e[1]):n)+1<s.length?n+1:t?null:0}var o,i=e.aoColumns[t],l=e.aaSorting,s=i.asSorting;if(!i.bSortable)return!1;"number"==typeof l[0]&&(l=e.aaSorting=[l]);(a||n)&&e.oFeatures.bSortMulti?-1!==(i=m(l,"0").indexOf(t))?null===(o=null===(o=r(l[i],!0))&&1===l.length?0:o)?l.splice(i,1):(l[i][1]=s[o],l[i]._idx=o):(a?l.push([t,s[0],0]):l.push([t,l[0][1],0]),l[l.length-1]._idx=0):l.length&&l[0][0]==t?(o=r(l[0]),l.length=1,l[0][1]=s[o],l[0]._idx=o):(l.length=0,l.push([t,s[0]]),l[0]._idx=0)}(o,n[a],a,e.shiftKey)&&(t=!0),1===o.aaSorting.length&&""===o.aaSorting[0][1])break;t&&Ve(o,!0,function(){Je(o),ze(o,o.aiDisplay),d(o,!1,!1),l&&l()})}})}function ze(e,t){if(!(t.length<2)){for(var n=e.aiDisplayMaster,a={},r={},o=0;o<n.length;o++)a[n[o]]=o;for(o=0;o<t.length;o++)r[t[o]]=a[t[o]];t.sort(function(e,t){return r[e]-r[t]})}}function Ye(n,a,e){function t(e){var t;H.isPlainObject(e)?void 0!==e.idx?a.push([e.idx,e.dir]):e.name&&-1!==(t=m(n.aoColumns,"sName").indexOf(e.name))&&a.push([t,e.dir]):a.push(e)}if(H.isPlainObject(e))t(e);else if(e.length&&"number"==typeof e[0])t(e);else if(e.length)for(var r=0;r<e.length;r++)t(e[r])}function Ge(e){var t,n,a,r,o,i,l,s=[],u=V.ext.type.order,c=e.aoColumns,d=e.aaSortingFixed,f=H.isPlainObject(d),h=[];if(e.oFeatures.bSort)for(Array.isArray(d)&&Ye(e,h,d),f&&d.pre&&Ye(e,h,d.pre),Ye(e,h,e.aaSorting),f&&d.post&&Ye(e,h,d.post),t=0;t<h.length;t++)if(c[l=h[t][0]])for(n=0,a=(r=c[l].aDataSort).length;n<a;n++)i=c[o=r[n]].sType||"string",void 0===h[t]._idx&&(h[t]._idx=c[o].asSorting.indexOf(h[t][1])),h[t][1]&&s.push({src:l,col:o,dir:h[t][1],index:h[t]._idx,type:i,formatter:u[i+"-pre"],sorter:u[i+"-"+h[t][1]]});return s}function Je(e,t,n){var a,r,o,i,l,c,d=[],s=V.ext.type.order,f=e.aoData,u=e.aiDisplayMaster;for(void 0!==t?(l=e.aoColumns[t],c=[{src:t,col:t,dir:n,index:0,type:l.sType,formatter:s[l.sType+"-pre"],sorter:s[l.sType+"-"+n]}],u=u.slice()):c=Ge(e),a=0,r=c.length;a<r;a++){i=c[a],S=x=D=g=p=h=y=b=m=v=void 0;var h,p,g,v=e,m=i.col,b=v.aoColumns[m],y=V.ext.order[b.sSortDataType];y&&(h=y.call(v.oInstance,v,m,re(v,m)));for(var D=V.ext.type.order[b.sType+"-pre"],x=v.aoData,S=0;S<x.length;S++)x[S]&&((p=x[S])._aSortData||(p._aSortData=[]),p._aSortData[m]&&!y||(g=y?h[S]:B(v,S,m,"sort"),p._aSortData[m]=D?D(g,v):g))}if("ssp"!=J(e)&&0!==c.length){for(a=0,o=u.length;a<o;a++)d[a]=a;c.length&&"desc"===c[0].dir&&e.orderDescReverse&&d.reverse(),u.sort(function(e,t){for(var n,a,r,o,i=c.length,l=f[e]._aSortData,s=f[t]._aSortData,u=0;u<i;u++)if(n=l[(o=c[u]).col],a=s[o.col],o.sorter){if(0!==(r=o.sorter(n,a)))return r}else if(0!==(r=n<a?-1:a<n?1:0))return"asc"===o.dir?r:-r;return(n=d[e])<(a=d[t])?-1:a<n?1:0})}else 0===c.length&&u.sort(function(e,t){return e<t?-1:t<e?1:0});return void 0===t&&(e.bSorted=!0,e.sortDetails=c,G(e,null,"order",[e,c])),u}function Ze(e){var t,n,a,r=e.aLastSort,o=e.oClasses.order.position,i=Ge(e),l=e.oFeatures;if(l.bSort&&l.bSortClasses){for(t=0,n=r.length;t<n;t++)a=r[t].src,H(m(e.aoData,"anCells",a)).removeClass(o+(t<2?t+1:3));for(t=0,n=i.length;t<n;t++)a=i[t].src,H(m(e.aoData,"anCells",a)).addClass(o+(t<2?t+1:3))}e.aLastSort=i}function Qe(n){var e;n._bLoadingState||(e={time:+new Date,start:n._iDisplayStart,length:n._iDisplayLength,order:H.extend(!0,[],n.aaSorting),search:H.extend({},n.oPreviousSearch),columns:n.aoColumns.map(function(e,t){return{visible:e.bVisible,search:H.extend({},n.aoPreSearchCols[t])}})},n.oSavedState=e,G(n,"aoStateSaveParams","stateSaveParams",[n,e]),n.oFeatures.bStateSave&&!n.bDestroying&&n.fnStateSaveCallback.call(n.oInstance,n,e))}function Ke(n,e,t){var a,r,o=n.aoColumns,i=(n._bLoadingState=!0,n._bInitComplete?new V.Api(n):null);if(e&&e.time){var l=n.iStateDuration;if(0<l&&e.time<+new Date-1e3*l)n._bLoadingState=!1;else if(-1!==G(n,"aoStateLoadParams","stateLoadParams",[n,e]).indexOf(!1))n._bLoadingState=!1;else if(e.columns&&o.length!==e.columns.length)n._bLoadingState=!1;else{if(n.oLoadedState=H.extend(!0,{},e),G(n,null,"stateLoadInit",[n,e],!0),void 0!==e.length&&(i?i.page.len(e.length):n._iDisplayLength=e.length),void 0!==e.start&&(null===i?(n._iDisplayStart=e.start,n.iInitDisplayStart=e.start):Xe(n,e.start/n._iDisplayLength)),void 0!==e.order&&(n.aaSorting=[],H.each(e.order,function(e,t){n.aaSorting.push(t[0]>=o.length?[0,t[1]]:t)})),void 0!==e.search&&H.extend(n.oPreviousSearch,e.search),e.columns){for(a=0,r=e.columns.length;a<r;a++){var s=e.columns[a];void 0!==s.visible&&(i?i.column(a).visible(s.visible,!1):o[a].bVisible=s.visible),void 0!==s.search&&H.extend(n.aoPreSearchCols[a],s.search)}i&&i.columns.adjust()}n._bLoadingState=!1,G(n,"aoStateLoaded","stateLoaded",[n,e])}}else n._bLoadingState=!1;t()}function $(e,t,n,a){if(n="DataTables warning: "+(e?"table id="+e.sTableId+" - ":"")+n,a&&(n+=". For more information about this error, please see https://datatables.net/tn/"+a),t)W.console&&console.log&&console.log(n);else{t=V.ext,t=t.sErrMode||t.errMode;if(e&&G(e,null,"dt-error",[e,a,n],!0),"alert"==t)alert(n);else{if("throw"==t)throw new Error(n);"function"==typeof t&&t(e,a,n)}}}function z(n,a,e,t){Array.isArray(e)?H.each(e,function(e,t){Array.isArray(t)?z(n,a,t[0],t[1]):z(n,a,t)}):(void 0===t&&(t=e),void 0!==a[e]&&(n[t]=a[e]))}function et(e,t,n){var a,r;for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&(a=t[r],H.isPlainObject(a)?(H.isPlainObject(e[r])||(e[r]={}),H.extend(!0,e[r],a)):n&&"data"!==r&&"aaData"!==r&&Array.isArray(a)?e[r]=a.slice():e[r]=a);return e}function tt(e,t,n){H(e).on("click.DT",t,function(e){n(e)}).on("keypress.DT",t,function(e){13===e.which&&(e.preventDefault(),n(e))}).on("selectstart.DT",t,function(){return!1})}function Y(e,t,n){n&&e[t].push(n)}function G(t,e,n,a,r){var o=[];return e&&(o=t[e].slice().reverse().map(function(e){return e.apply(t.oInstance,a)})),null!==n&&(e=H.Event(n+".dt"),n=H(t.nTable),e.dt=t.api,n[r?"trigger":"triggerHandler"](e,a),r&&0===n.parents("body").length&&H("body").trigger(e,a),o.push(e.result)),o}function nt(e){var t=e._iDisplayStart,n=e.fnDisplayEnd(),a=e._iDisplayLength;n<=t&&(t=n-a),t-=t%a,e._iDisplayStart=t=-1===a||t<0?0:t}function at(e,t){var e=e.renderer,n=V.ext.renderer[t];return H.isPlainObject(e)&&e[t]?n[e[t]]||n._:"string"==typeof e&&n[e]||n._}function J(e){return e.oFeatures.bServerSide?"ssp":e.ajax?"ajax":"dom"}function rt(e,t,n){var a=e.fnFormatNumber,r=e._iDisplayStart+1,o=e._iDisplayLength,i=e.fnRecordsDisplay(),l=e.fnRecordsTotal(),s=-1===o;return t.replace(/_START_/g,a.call(e,r)).replace(/_END_/g,a.call(e,e.fnDisplayEnd())).replace(/_MAX_/g,a.call(e,l)).replace(/_TOTAL_/g,a.call(e,i)).replace(/_PAGE_/g,a.call(e,s?1:Math.ceil(r/o))).replace(/_PAGES_/g,a.call(e,s?1:Math.ceil(i/o))).replace(/_ENTRIES_/g,e.api.i18n("entries","",n)).replace(/_ENTRIES-MAX_/g,e.api.i18n("entries","",l)).replace(/_ENTRIES-TOTAL_/g,e.api.i18n("entries","",i))}var ot=[],n=Array.prototype;X=function(e,t){if(!(this instanceof X))return new X(e,t);function n(e){e=e,t=V.settings,a=m(t,"nTable");var n,t,a,r=e?e.nTable&&e.oFeatures?[e]:e.nodeName&&"table"===e.nodeName.toLowerCase()?-1!==(r=a.indexOf(e))?[t[r]]:null:e&&"function"==typeof e.settings?e.settings().toArray():("string"==typeof e?n=H(e).get():e instanceof H&&(n=e.get()),n?t.filter(function(e,t){return n.includes(a[t])}):void 0):[];r&&o.push.apply(o,r)}var o=[];if(Array.isArray(e))for(var a=0,r=e.length;a<r;a++)n(e[a]);else n(e);this.context=1<o.length?x(o):o,t&&this.push.apply(this,t),this.selector={rows:null,cols:null,opts:null},X.extend(this,this,ot)},V.Api=X,H.extend(X.prototype,{any:function(){return 0!==this.count()},context:[],count:function(){return this.flatten().length},each:function(e){for(var t=0,n=this.length;t<n;t++)e.call(this,this[t],t,this);return this},eq:function(e){var t=this.context;return t.length>e?new X(t[e],this[e]):null},filter:function(e){e=n.filter.call(this,e,this);return new X(this.context,e)},flatten:function(){var e=[];return new X(this.context,e.concat.apply(e,this.toArray()))},get:function(e){return this[e]},join:n.join,includes:function(e){return-1!==this.indexOf(e)},indexOf:n.indexOf,iterator:function(e,t,n,a){var r,o,i,l,s,u,c,d,f=[],h=this.context,p=this.selector;for("string"==typeof e&&(a=n,n=t,t=e,e=!1),o=0,i=h.length;o<i;o++){var g=new X(h[o]);if("table"===t)void 0!==(r=n.call(g,h[o],o))&&f.push(r);else if("columns"===t||"rows"===t)void 0!==(r=n.call(g,h[o],this[o],o))&&f.push(r);else if("every"===t||"column"===t||"column-rows"===t||"row"===t||"cell"===t)for(c=this[o],"column-rows"===t&&(u=vt(h[o],p.opts)),l=0,s=c.length;l<s;l++)d=c[l],void 0!==(r="cell"===t?n.call(g,h[o],d.row,d.column,o,l):n.call(g,h[o],d,o,l,u))&&f.push(r)}return f.length||a?((e=(a=new X(h,e?f.concat.apply([],f):f)).selector).rows=p.rows,e.cols=p.cols,e.opts=p.opts,a):this},lastIndexOf:n.lastIndexOf,length:0,map:function(e){e=n.map.call(this,e,this);return new X(this.context,e)},pluck:function(e){var t=V.util.get(e);return this.map(function(e){return t(e)})},pop:n.pop,push:n.push,reduce:n.reduce,reduceRight:n.reduceRight,reverse:n.reverse,selector:null,shift:n.shift,slice:function(){return new X(this.context,this)},sort:n.sort,splice:n.splice,toArray:function(){return n.slice.call(this)},to$:function(){return H(this)},toJQuery:function(){return H(this)},unique:function(){return new X(this.context,x(this.toArray()))},unshift:n.unshift}),W.__apiStruct=ot,X.extend=function(e,t,n){if(n.length&&t&&(t instanceof X||t.__dt_wrapper))for(var a,r=0,o=n.length;r<o;r++)"__proto__"!==(a=n[r]).name&&(t[a.name]="function"===a.type?function(t,n,a){return function(){var e=n.apply(t||this,arguments);return X.extend(e,e,a.methodExt),e}}(e,a.val,a):"object"===a.type?{}:a.val,t[a.name].__dt_wrapper=!0,X.extend(e,t[a.name],a.propExt))},X.register=t=function(e,t){if(Array.isArray(e))for(var n=0,a=e.length;n<a;n++)X.register(e[n],t);else for(var r=e.split("."),o=ot,i=0,l=r.length;i<l;i++){var s,u,c=function(e,t){for(var n=0,a=e.length;n<a;n++)if(e[n].name===t)return e[n];return null}(o,u=(s=-1!==r[i].indexOf("()"))?r[i].replace("()",""):r[i]);c||o.push(c={name:u,val:{},methodExt:[],propExt:[],type:"object"}),i===l-1?(c.val=t,c.type="function"==typeof t?"function":H.isPlainObject(t)?"object":"other"):o=s?c.methodExt:c.propExt}},X.registerPlural=e=function(e,t,n){X.register(e,n),X.register(t,function(){var e=n.apply(this,arguments);return e===this?this:e instanceof X?e.length?Array.isArray(e[0])?new X(e.context,e[0]):e[0]:void 0:e})};function it(e,t){var n,a;return Array.isArray(e)?(n=[],e.forEach(function(e){e=it(e,t);n.push.apply(n,e)}),n.filter(function(e){return e})):"number"==typeof e?[t[e]]:(a=t.map(function(e){return e.nTable}),H(a).filter(e).map(function(){var e=a.indexOf(this);return t[e]}).toArray())}function lt(r,o,e){var t,n;e&&(t=new X(r)).one("draw",function(){e(t.ajax.json())}),"ssp"==J(r)?d(r,o):(w(r,!0),(n=r.jqXHR)&&4!==n.readyState&&n.abort(),Fe(r,{},function(e){me(r);for(var t=Ne(r,e),n=0,a=t.length;n<a;n++)D(r,t[n]);d(r,o),He(r),w(r,!1)}))}function st(e,t,n,a,r){for(var o,i,l,s,u=[],c=typeof t,d=0,f=(t=t&&"string"!=c&&"function"!=c&&void 0!==t.length?t:[t]).length;d<f;d++)for(l=0,s=(i=t[d]&&t[d].split&&!t[d].match(/[[(:]/)?t[d].split(","):[t[d]]).length;l<s;l++)(o=(o=n("string"==typeof i[l]?i[l].trim():i[l])).filter(function(e){return null!=e}))&&o.length&&(u=u.concat(o));var h=C.selector[e];if(h.length)for(d=0,f=h.length;d<f;d++)u=h[d](a,r,u);return x(u)}function ut(e){return(e=e||{}).filter&&void 0===e.search&&(e.search=e.filter),H.extend({search:"none",order:"current",page:"all"},e)}function ct(e){var t=new X(e.context[0]);return e.length&&t.push(e[0]),t.selector=e.selector,t.length&&1<t[0].length&&t[0].splice(1),t}t("tables()",function(e){return null!=e?new X(it(e,this.context)):this}),t("table()",function(e){var e=this.tables(e),t=e.context;return t.length?new X(t[0]):e}),[["nodes","node","nTable"],["body","body","nTBody"],["header","header","nTHead"],["footer","footer","nTFoot"]].forEach(function(t){e("tables()."+t[0]+"()","table()."+t[1]+"()",function(){return this.iterator("table",function(e){return e[t[2]]},1)})}),[["header","aoHeader"],["footer","aoFooter"]].forEach(function(n){t("table()."+n[0]+".structure()",function(e){var e=this.columns(e).indexes().flatten(),t=this.context[0];return Te(t,t[n[1]],e)})}),e("tables().containers()","table().container()",function(){return this.iterator("table",function(e){return e.nTableWrapper},1)}),t("tables().every()",function(n){var a=this;return this.iterator("table",function(e,t){n.call(a.table(t),t)})}),t("caption()",function(r,o){var e,t=this.context;return void 0===r?(e=t[0].captionNode)&&t.length?e.innerHTML:null:this.iterator("table",function(e){var t=H(e.nTable),n=H(e.captionNode),a=H(e.nTableWrapper);n.length||(n=H("<caption/>").html(r),e.captionNode=n[0],o)||(t.prepend(n),o=n.css("caption-side")),n.html(r),o&&(n.css("caption-side",o),n[0]._captionSide=o),(a.find("div.dataTables_scroll").length?(e="top"===o?"Head":"Foot",a.find("div.dataTables_scroll"+e+" table")):t).prepend(n)},1)}),t("caption.node()",function(){var e=this.context;return e.length?e[0].captionNode:null}),t("draw()",function(t){return this.iterator("table",function(e){"page"===t?S(e):d(e,!1===(t="string"==typeof t?"full-hold"!==t:t))})}),t("page()",function(t){return void 0===t?this.page.info().page:this.iterator("table",function(e){Xe(e,t)})}),t("page.info()",function(){var e,t,n,a,r;if(0!==this.context.length)return t=(e=this.context[0])._iDisplayStart,n=e.oFeatures.bPaginate?e._iDisplayLength:-1,a=e.fnRecordsDisplay(),{page:(r=-1===n)?0:Math.floor(t/n),pages:r?1:Math.ceil(a/n),start:t,end:e.fnDisplayEnd(),length:n,recordsTotal:e.fnRecordsTotal(),recordsDisplay:a,serverSide:"ssp"===J(e)}}),t("page.len()",function(t){return void 0===t?0!==this.context.length?this.context[0]._iDisplayLength:void 0:this.iterator("table",function(e){We(e,t)})}),t("ajax.json()",function(){var e=this.context;if(0<e.length)return e[0].json}),t("ajax.params()",function(){var e=this.context;if(0<e.length)return e[0].oAjaxData}),t("ajax.reload()",function(t,n){return this.iterator("table",function(e){lt(e,!1===n,t)})}),t("ajax.url()",function(t){var e=this.context;return void 0===t?0===e.length?void 0:(e=e[0],H.isPlainObject(e.ajax)?e.ajax.url:e.ajax):this.iterator("table",function(e){H.isPlainObject(e.ajax)?e.ajax.url=t:e.ajax=t})}),t("ajax.url().load()",function(t,n){return this.iterator("table",function(e){lt(e,!1===n,t)})});function dt(o,i,e,t){function l(e,t){var n;if(Array.isArray(e)||e instanceof H)for(var a=0,r=e.length;a<r;a++)l(e[a],t);else e.nodeName&&"tr"===e.nodeName.toLowerCase()?(e.setAttribute("data-dt-row",i.idx),s.push(e)):(n=H("<tr><td></td></tr>").attr("data-dt-row",i.idx).addClass(t),H("td",n).addClass(t).html(e)[0].colSpan=oe(o),s.push(n[0]))}var s=[];l(e,t),i._details&&i._details.detach(),i._details=H(s),i._detailsShow&&i._details.insertAfter(i.nTr)}function ft(e,t){var n=e.context;if(n.length&&e.length){var a=n[0].aoData[e[0]];if(a._details){(a._detailsShow=t)?(a._details.insertAfter(a.nTr),H(a.nTr).addClass("dt-hasChild")):(a._details.detach(),H(a.nTr).removeClass("dt-hasChild")),G(n[0],null,"childRow",[t,e.row(e[0])]);var i=n[0],r=new X(i),a=".dt.DT_details",t="draw"+a,e="column-sizing"+a,a="destroy"+a,l=i.aoData;if(r.off(t+" "+e+" "+a),m(l,"_details").length>0){r.on(t,function(e,t){if(i!==t)return;r.rows({page:"current"}).eq(0).each(function(e){var t=l[e];if(t._detailsShow)t._details.insertAfter(t.nTr)})});r.on(e,function(e,t){if(i!==t)return;var n,a=oe(t);for(var r=0,o=l.length;r<o;r++){n=l[r];if(n&&n._details)n._details.each(function(){var e=H(this).children("td");if(e.length==1)e.attr("colspan",a)})}});r.on(a,function(e,t){if(i!==t)return;for(var n=0,a=l.length;n<a;n++)if(l[n]&&l[n]._details)yt(r,n)})}bt(n)}}}function ht(e,t,n,a,r,o){for(var i=[],l=0,s=r.length;l<s;l++)i.push(B(e,r[l],t,o));return i}function pt(e,t,n){var a=e.aoHeader;return a[void 0!==n?n:e.bSortCellsTop?0:a.length-1][t].cell}function gt(t,n){return function(e){return T(e)||"string"!=typeof e||(e=e.replace(F," "),t&&(e=L(e)),n&&(e=k(e,!1))),e}}var vt=function(e,t){var n,a=[],r=e.aiDisplay,o=e.aiDisplayMaster,i=t.search,l=t.order,t=t.page;if("ssp"==J(e))return"removed"===i?[]:h(0,o.length);if("current"==t)for(u=e._iDisplayStart,c=e.fnDisplayEnd();u<c;u++)a.push(r[u]);else if("current"==l||"applied"==l){if("none"==i)a=o.slice();else if("applied"==i)a=r.slice();else if("removed"==i){for(var s={},u=0,c=r.length;u<c;u++)s[r[u]]=null;o.forEach(function(e){Object.prototype.hasOwnProperty.call(s,e)||a.push(e)})}}else if("index"==l||"original"==l)for(u=0,c=e.aoData.length;u<c;u++)e.aoData[u]&&("none"==i||-1===(n=r.indexOf(u))&&"removed"==i||0<=n&&"applied"==i)&&a.push(u);else if("number"==typeof l){var d=Je(e,l,"asc");if("none"===i)a=d;else for(u=0;u<d.length;u++)(-1===(n=r.indexOf(d[u]))&&"removed"==i||0<=n&&"applied"==i)&&a.push(d[u])}return a},mt=(t("rows()",function(n,a){void 0===n?n="":H.isPlainObject(n)&&(a=n,n=""),a=ut(a);var e=this.iterator("table",function(e){return t=st("row",t=n,function(n){var e=f(n),a=r.aoData;if(null!==e&&!o)return[e];if(i=i||vt(r,o),null!==e&&-1!==i.indexOf(e))return[e];if(null==n||""===n)return i;if("function"==typeof n)return i.map(function(e){var t=a[e];return n(e,t._aData,t.nTr)?e:null});if(n.nodeName)return e=n._DT_RowIndex,t=n._DT_CellIndex,void 0!==e?a[e]&&a[e].nTr===n?[e]:[]:t?a[t.row]&&a[t.row].nTr===n.parentNode?[t.row]:[]:(e=H(n).closest("*[data-dt-row]")).length?[e.data("dt-row")]:[];if("string"==typeof n&&"#"===n.charAt(0)){var t=r.aIds[n.replace(/^#/,"")];if(void 0!==t)return[t.idx]}e=A(b(r.aoData,i,"nTr"));return H(e).filter(n).map(function(){return this._DT_RowIndex}).toArray()},r=e,o=a),"current"!==o.order&&"applied"!==o.order||ze(r,t),t;var r,t,o,i},1);return e.selector.rows=n,e.selector.opts=a,e}),t("rows().nodes()",function(){return this.iterator("row",function(e,t){return e.aoData[t].nTr||void 0},1)}),t("rows().data()",function(){return this.iterator(!0,"rows",function(e,t){return b(e.aoData,t,"_aData")},1)}),e("rows().cache()","row().cache()",function(n){return this.iterator("row",function(e,t){e=e.aoData[t];return"search"===n?e._aFilterData:e._aSortData},1)}),e("rows().invalidate()","row().invalidate()",function(n){return this.iterator("row",function(e,t){be(e,t,n)})}),e("rows().indexes()","row().index()",function(){return this.iterator("row",function(e,t){return t},1)}),e("rows().ids()","row().id()",function(e){for(var t=[],n=this.context,a=0,r=n.length;a<r;a++)for(var o=0,i=this[a].length;o<i;o++){var l=n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);t.push((!0===e?"#":"")+l)}return new X(n,t)}),e("rows().remove()","row().remove()",function(){return this.iterator("row",function(e,t){var n=e.aoData,a=n[t],r=e.aiDisplayMaster.indexOf(t),r=(-1!==r&&e.aiDisplayMaster.splice(r,1),0<e._iRecordsDisplay&&e._iRecordsDisplay--,nt(e),e.rowIdFn(a._aData));void 0!==r&&delete e.aIds[r],n[t]=null}),this}),t("rows.add()",function(o){var e=this.iterator("table",function(e){for(var t,n=[],a=0,r=o.length;a<r;a++)(t=o[a]).nodeName&&"TR"===t.nodeName.toUpperCase()?n.push(fe(e,t)[0]):n.push(D(e,t));return n},1),t=this.rows(-1);return t.pop(),t.push.apply(t,e),t}),t("row()",function(e,t){return ct(this.rows(e,t))}),t("row().data()",function(e){var t,n=this.context;return void 0===e?n.length&&this.length&&this[0].length?n[0].aoData[this[0]]._aData:void 0:((t=n[0].aoData[this[0]])._aData=e,Array.isArray(e)&&t.nTr&&t.nTr.id&&v(n[0].rowId)(e,t.nTr.id),be(n[0],this[0],"data"),this)}),t("row().node()",function(){var e=this.context;if(e.length&&this.length&&this[0].length){e=e[0].aoData[this[0]];if(e&&e.nTr)return e.nTr}return null}),t("row.add()",function(t){t instanceof H&&t.length&&(t=t[0]);var e=this.iterator("table",function(e){return t.nodeName&&"TR"===t.nodeName.toUpperCase()?fe(e,t)[0]:D(e,t)});return this.row(e[0])}),H(_).on("plugin-init.dt",function(e,t){var a=new X(t);a.on("stateSaveParams.DT",function(e,t,n){for(var a=t.rowIdFn,r=t.aiDisplayMaster,o=[],i=0;i<r.length;i++){var l=r[i],l=t.aoData[l];l._detailsShow&&o.push("#"+a(l._aData))}n.childRows=o}),a.on("stateLoaded.DT",function(e,t,n){mt(a,n)}),mt(a,a.state.loaded())}),function(e,t){t&&t.childRows&&e.rows(t.childRows.map(function(e){return e.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g,"$1\\:")})).every(function(){G(e.settings()[0],null,"requestChild",[this])})}),bt=V.util.throttle(function(e){Qe(e[0])},500),yt=function(e,t){var n=e.context;n.length&&(t=n[0].aoData[void 0!==t?t:e[0]])&&t._details&&(t._details.remove(),t._detailsShow=void 0,t._details=void 0,H(t.nTr).removeClass("dt-hasChild"),bt(n))},Dt="row().child",xt=Dt+"()",St=(t(xt,function(e,t){var n=this.context;return void 0===e?n.length&&this.length&&n[0].aoData[this[0]]?n[0].aoData[this[0]]._details:void 0:(!0===e?this.child.show():!1===e?yt(this):n.length&&this.length&&dt(n[0],n[0].aoData[this[0]],e,t),this)}),t([Dt+".show()",xt+".show()"],function(){return ft(this,!0),this}),t([Dt+".hide()",xt+".hide()"],function(){return ft(this,!1),this}),t([Dt+".remove()",xt+".remove()"],function(){return yt(this),this}),t(Dt+".isShown()",function(){var e=this.context;return e.length&&this.length&&e[0].aoData[this[0]]&&e[0].aoData[this[0]]._detailsShow||!1}),/^([^:]+)?:(name|title|visIdx|visible)$/),xt=(t("columns()",function(n,a){void 0===n?n="":H.isPlainObject(n)&&(a=n,n=""),a=ut(a);var e=this.iterator("table",function(e){return t=n,l=a,s=(i=e).aoColumns,u=m(s,"sName"),c=m(s,"sTitle"),e=V.util.get("[].[].cell")(i.aoHeader),d=x(M([],e)),st("column",t,function(n){var a,e=f(n);if(""===n)return h(s.length);if(null!==e)return[0<=e?e:s.length+e];if("function"==typeof n)return a=vt(i,l),s.map(function(e,t){return n(t,ht(i,t,0,0,a),pt(i,t))?t:null});var t,r,o="string"==typeof n?n.match(St):"";if(o)switch(o[2]){case"visIdx":case"visible":return o[1]?(t=parseInt(o[1],10))<0?[(r=s.map(function(e,t){return e.bVisible?t:null}))[r.length+t]]:[ae(i,t)]:s.map(function(e,t){return e.bVisible?t:null});case"name":return u.map(function(e,t){return e===o[1]?t:null});case"title":return c.map(function(e,t){return e===o[1]?t:null});default:return[]}return n.nodeName&&n._DT_CellIndex?[n._DT_CellIndex.column]:(e=H(d).filter(n).map(function(){return de(this)}).toArray()).length||!n.nodeName?e:(e=H(n).closest("*[data-dt-column]")).length?[e.data("dt-column")]:[]},i,l);var i,t,l,s,u,c,d},1);return e.selector.cols=n,e.selector.opts=a,e}),e("columns().header()","column().header()",function(n){return this.iterator("column",function(e,t){return pt(e,t,n)},1)}),e("columns().footer()","column().footer()",function(n){return this.iterator("column",function(e,t){return e.aoFooter.length?e.aoFooter[void 0!==n?n:0][t].cell:null},1)}),e("columns().data()","column().data()",function(){return this.iterator("column-rows",ht,1)}),e("columns().render()","column().render()",function(o){return this.iterator("column-rows",function(e,t,n,a,r){return ht(e,t,0,0,r,o)},1)}),e("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(e,t){return e.aoColumns[t].mData},1)}),e("columns().cache()","column().cache()",function(o){return this.iterator("column-rows",function(e,t,n,a,r){return b(e.aoData,r,"search"===o?"_aFilterData":"_aSortData",t)},1)}),e("columns().init()","column().init()",function(){return this.iterator("column",function(e,t){return e.aoColumns[t]},1)}),e("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(e,t,n,a,r){return b(e.aoData,r,"anCells",t)},1)}),e("columns().titles()","column().title()",function(n,a){return this.iterator("column",function(e,t){"number"==typeof n&&(a=n,n=void 0);t=H("span.dt-column-title",this.column(t).header(a));return void 0!==n?(t.html(n),this):t.html()},1)}),e("columns().types()","column().type()",function(){return this.iterator("column",function(e,t){t=e.aoColumns[t].sType;return t||se(e),t},1)}),e("columns().visible()","column().visible()",function(n,a){var t=this,r=[],e=this.iterator("column",function(e,t){if(void 0===n)return e.aoColumns[t].bVisible;!function(e,t,n){var a,r,o=e.aoColumns,i=o[t],l=e.aoData;if(void 0===n)return i.bVisible;if(i.bVisible===n)return!1;if(n)for(var s=m(o,"bVisible").indexOf(!0,t+1),u=0,c=l.length;u<c;u++)l[u]&&(r=l[u].nTr,a=l[u].anCells,r)&&r.insertBefore(a[t],a[s]||null);else H(m(e.aoData,"anCells",t)).detach();return i.bVisible=n,Ue(e),!0}(e,t,n)||r.push(t)});return void 0!==n&&this.iterator("table",function(e){_e(e,e.aoHeader),_e(e,e.aoFooter),e.aiDisplay.length||H(e.nTBody).find("td[colspan]").attr("colspan",oe(e)),Qe(e),t.iterator("column",function(e,t){r.includes(t)&&G(e,null,"column-visibility",[e,t,n,a])}),r.length&&(void 0===a||a)&&t.columns.adjust()}),e}),e("columns().widths()","column().width()",function(){var e=this.columns(":visible").count(),e=H("<tr>").html("<td>"+Array(e).join("</td><td>")+"</td>"),n=(H(this.table().body()).append(e),e.children().map(function(){return H(this).outerWidth()}));return e.remove(),this.iterator("column",function(e,t){e=re(e,t);return null!==e?n[e]:0},1)}),e("columns().indexes()","column().index()",function(n){return this.iterator("column",function(e,t){return"visible"===n?re(e,t):t},1)}),t("columns.adjust()",function(){return this.iterator("table",function(e){ne(e)},1)}),t("column.index()",function(e,t){var n;if(0!==this.context.length)return n=this.context[0],"fromVisible"===e||"toData"===e?ae(n,t):"fromData"===e||"toVisible"===e?re(n,t):void 0}),t("column()",function(e,t){return ct(this.columns(e,t))}),t("cells()",function(g,e,v){var a,r,o,i,l,s,t;return H.isPlainObject(g)&&(void 0===g.row?(v=g,g=null):(v=e,e=null)),H.isPlainObject(e)&&(v=e,e=null),null==e?this.iterator("table",function(e){return a=e,e=g,t=ut(v),d=a.aoData,f=vt(a,t),n=A(b(d,f,"anCells")),h=H(M([],n)),p=a.aoColumns.length,st("cell",e,function(e){var t,n="function"==typeof e;if(null==e||n){for(o=[],i=0,l=f.length;i<l;i++)for(r=f[i],s=0;s<p;s++)u={row:r,column:s},(!n||(c=d[r],e(u,B(a,r,s),c.anCells?c.anCells[s]:null)))&&o.push(u);return o}return H.isPlainObject(e)?void 0!==e.column&&void 0!==e.row&&-1!==f.indexOf(e.row)?[e]:[]:(t=h.filter(e).map(function(e,t){return{row:t._DT_CellIndex.row,column:t._DT_CellIndex.column}}).toArray()).length||!e.nodeName?t:(c=H(e).closest("*[data-dt-row]")).length?[{row:c.data("dt-row"),column:c.data("dt-column")}]:[]},a,t);var a,t,r,o,i,l,s,u,c,d,f,n,h,p}):(t=v?{page:v.page,order:v.order,search:v.search}:{},a=this.columns(e,t),r=this.rows(g,t),t=this.iterator("table",function(e,t){var n=[];for(o=0,i=r[t].length;o<i;o++)for(l=0,s=a[t].length;l<s;l++)n.push({row:r[t][o],column:a[t][l]});return n},1),t=v&&v.selected?this.cells(t,v):t,H.extend(t.selector,{cols:e,rows:g,opts:v}),t)}),e("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(e,t,n){e=e.aoData[t];return e&&e.anCells?e.anCells[n]:void 0},1)}),t("cells().data()",function(){return this.iterator("cell",function(e,t,n){return B(e,t,n)},1)}),e("cells().cache()","cell().cache()",function(a){return a="search"===a?"_aFilterData":"_aSortData",this.iterator("cell",function(e,t,n){return e.aoData[t][a][n]},1)}),e("cells().render()","cell().render()",function(a){return this.iterator("cell",function(e,t,n){return B(e,t,n,a)},1)}),e("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(e,t,n){return{row:t,column:n,columnVisible:re(e,n)}},1)}),e("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(e,t,n){be(e,t,a,n)})}),t("cell()",function(e,t,n){return ct(this.cells(e,t,n))}),t("cell().data()",function(e){var t,n,a,r,o,i=this.context,l=this[0];return void 0===e?i.length&&l.length?B(i[0],l[0].row,l[0].column):void 0:(t=i[0],n=l[0].row,a=l[0].column,r=t.aoColumns[a],o=t.aoData[n]._aData,r.fnSetData(o,e,{settings:t,row:n,col:a}),be(i[0],l[0].row,"data",l[0].column),this)}),t("order()",function(t,e){var n=this.context,a=Array.prototype.slice.call(arguments);return void 0===t?0!==n.length?n[0].aaSorting:void 0:("number"==typeof t?t=[[t,e]]:1<a.length&&(t=a),this.iterator("table",function(e){e.aaSorting=Array.isArray(t)?t.slice():t}))}),t("order.listener()",function(t,n,a){return this.iterator("table",function(e){$e(e,t,{},n,a)})}),t("order.fixed()",function(t){var e;return t?this.iterator("table",function(e){e.aaSortingFixed=H.extend(!0,{},t)}):(e=(e=this.context).length?e[0].aaSortingFixed:void 0,Array.isArray(e)?{pre:e}:e)}),t(["columns().order()","column().order()"],function(n){var a=this;return n?this.iterator("table",function(e,t){e.aaSorting=a[t].map(function(e){return[e,n]})}):this.iterator("column",function(e,t){for(var n=Ge(e),a=0,r=n.length;a<r;a++)if(n[a].col===t)return n[a].dir;return null},1)}),e("columns().orderable()","column().orderable()",function(n){return this.iterator("column",function(e,t){e=e.aoColumns[t];return n?e.asSorting:e.bSortable},1)}),t("processing()",function(t){return this.iterator("table",function(e){w(e,t)})}),t("search()",function(t,n,a,r){var e=this.context;return void 0===t?0!==e.length?e[0].oPreviousSearch.search:void 0:this.iterator("table",function(e){e.oFeatures.bFilter&&Re(e,"object"==typeof n?H.extend(e.oPreviousSearch,n,{search:t}):H.extend(e.oPreviousSearch,{search:t,regex:null!==n&&n,smart:null===a||a,caseInsensitive:null===r||r}))})}),t("search.fixed()",function(t,n){var e=this.iterator(!0,"table",function(e){e=e.searchFixed;return t?void 0===n?e[t]:(null===n?delete e[t]:e[t]=n,this):Object.keys(e)});return void 0!==t&&void 0===n?e[0]:e}),e("columns().search()","column().search()",function(a,r,o,i){return this.iterator("column",function(e,t){var n=e.aoPreSearchCols;if(void 0===a)return n[t].search;e.oFeatures.bFilter&&("object"==typeof r?H.extend(n[t],r,{search:a}):H.extend(n[t],{search:a,regex:null!==r&&r,smart:null===o||o,caseInsensitive:null===i||i}),Re(e,e.oPreviousSearch))})}),t(["columns().search.fixed()","column().search.fixed()"],function(n,a){var e=this.iterator(!0,"column",function(e,t){e=e.aoColumns[t].searchFixed;return n?void 0===a?e[n]:(null===a?delete e[n]:e[n]=a,this):Object.keys(e)});return void 0!==n&&void 0===a?e[0]:e}),t("state()",function(e,t){var n;return e?(n=H.extend(!0,{},e),this.iterator("table",function(e){!1!==t&&(n.time=+new Date+100),Ke(e,n,function(){})})):this.context.length?this.context[0].oSavedState:null}),t("state.clear()",function(){return this.iterator("table",function(e){e.fnStateSaveCallback.call(e.oInstance,e,{})})}),t("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null}),t("state.save()",function(){return this.iterator("table",function(e){Qe(e)})}),V.use=function(e,t){var n="string"==typeof e?t:e,t="string"==typeof t?t:e;if(void 0===n&&"string"==typeof t)switch(t){case"lib":case"jq":return H;case"win":return W;case"datetime":return V.DateTime;case"luxon":return o;case"moment":return i;default:return null}"lib"===t||"jq"===t||n&&n.fn&&n.fn.jquery?H=n:"win"==t||n&&n.document?_=(W=n).document:"datetime"===t||n&&"DateTime"===n.type?V.DateTime=n:"luxon"===t||n&&n.FixedOffsetZone?o=n:("moment"===t||n&&n.isMoment)&&(i=n)},V.factory=function(e,t){var n=!1;return e&&e.document&&(_=(W=e).document),t&&t.fn&&t.fn.jquery&&(H=t,n=!0),n},V.versionCheck=function(e,t){for(var n,a,r=(t||V.version).split("."),o=e.split("."),i=0,l=o.length;i<l;i++)if((n=parseInt(r[i],10)||0)!==(a=parseInt(o[i],10)||0))return a<n;return!0},V.isDataTable=function(e){var r=H(e).get(0),o=!1;return e instanceof V.Api||(H.each(V.settings,function(e,t){var n=t.nScrollHead?H("table",t.nScrollHead)[0]:null,a=t.nScrollFoot?H("table",t.nScrollFoot)[0]:null;t.nTable!==r&&n!==r&&a!==r||(o=!0)}),o)},V.tables=function(t){var e=!1,n=(H.isPlainObject(t)&&(e=t.api,t=t.visible),V.settings.filter(function(e){return!(t&&!H(e.nTable).is(":visible"))}).map(function(e){return e.nTable}));return e?new X(n):n},V.camelToHungarian=q,t("$()",function(e,t){t=this.rows(t).nodes(),t=H(t);return H([].concat(t.filter(e).toArray(),t.find(e).toArray()))}),H.each(["on","one","off"],function(e,n){t(n+"()",function(){var e=Array.prototype.slice.call(arguments),t=(e[0]=e[0].split(/\s/).map(function(e){return e.match(/\.dt\b/)?e:e+".dt"}).join(" "),H(this.tables().nodes()));return t[n].apply(t,e),this})}),t("clear()",function(){return this.iterator("table",function(e){me(e)})}),t("error()",function(t){return this.iterator("table",function(e){$(e,0,t)})}),t("settings()",function(){return new X(this.context,this.context)}),t("init()",function(){var e=this.context;return e.length?e[0].oInit:null}),t("data()",function(){return this.iterator("table",function(e){return m(e.aoData,"_aData")}).flatten()}),t("trigger()",function(t,n,a){return this.iterator("table",function(e){return G(e,null,t,n,a)}).flatten()}),t("ready()",function(e){var t=this.context;return e?this.tables().every(function(){this.context[0]._bInitComplete?e.call(this):this.on("init",function(){e.call(this)})}):t.length?t[0]._bInitComplete||!1:null}),t("destroy()",function(c){return c=c||!1,this.iterator("table",function(e){var t=e.oClasses,n=e.nTable,a=e.nTBody,r=e.nTHead,o=e.nTFoot,i=H(n),a=H(a),l=H(e.nTableWrapper),s=e.aoData.map(function(e){return e?e.nTr:null}),u=t.order,o=(e.bDestroying=!0,G(e,"aoDestroyCallback","destroy",[e],!0),c||new X(e).columns().visible(!0),l.off(".DT").find(":not(tbody *)").off(".DT"),H(W).off(".DT-"+e.sInstance),n!=r.parentNode&&(i.children("thead").detach(),i.append(r)),o&&n!=o.parentNode&&(i.children("tfoot").detach(),i.append(o)),e.colgroup.remove(),e.aaSorting=[],e.aaSortingFixed=[],Ze(e),H("th, td",r).removeClass(u.canAsc+" "+u.canDesc+" "+u.isAsc+" "+u.isDesc).css("width",""),a.children().detach(),a.append(s),e.nTableWrapper.parentNode),r=e.nTableWrapper.nextSibling,u=c?"remove":"detach",a=(i[u](),l[u](),!c&&o&&(o.insertBefore(n,r),i.css("width",e.sDestroyWidth).removeClass(t.table)),V.settings.indexOf(e));-1!==a&&V.settings.splice(a,1)})}),H.each(["column","row","cell"],function(e,s){t(s+"s().every()",function(a){var r,o=this.selector.opts,i=this,l=0;return this.iterator("every",function(e,t,n){r=i[s](t,o),"cell"===s?a.call(r,r[0][0].row,r[0][0].column,n,l):a.call(r,t,n,l),l++})})}),t("i18n()",function(e,t,n){var a=this.context[0],e=U(e)(a.oLanguage);return"string"==typeof(e=H.isPlainObject(e=void 0===e?t:e)?void 0!==n&&void 0!==e[n]?e[n]:e._:e)?e.replace("%d",n):e}),V.version="2.1.2",V.settings=[],V.models={},V.models.oSearch={caseInsensitive:!0,search:"",regex:!1,smart:!0,return:!1},V.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,src:null,idx:-1,displayData:null},V.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null,maxLenString:null,searchFixed:null},V.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],bAutoWidth:!0,bDeferRender:!0,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:null,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnStateLoadCallback:function(e){try{return JSON.parse((-1===e.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+e.sInstance+"_"+location.pathname))}catch(e){return{}}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(e,t){try{(-1===e.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+e.sInstance+"_"+location.pathname,JSON.stringify(t))}catch(e){}},fnStateSaveParams:null,iStateDuration:7200,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{orderable:": Activate to sort",orderableReverse:": Activate to invert sorting",orderableRemove:": Activate to remove sorting",paginate:{first:"First",last:"Last",next:"Next",previous:"Previous",number:""}},oPaginate:{sFirst:"«",sLast:"»",sNext:"›",sPrevious:"‹"},entries:{_:"entries",1:"entry"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_",sInfoEmpty:"Showing 0 to 0 of 0 _ENTRIES-TOTAL_",sInfoFiltered:"(filtered from _MAX_ total _ENTRIES-MAX_)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"_MENU_ _ENTRIES_ per page",sLoadingRecords:"Loading...",sProcessing:"",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},orderDescReverse:!0,oSearch:H.extend({},V.models.oSearch),layout:{topStart:"pageLength",topEnd:"search",bottomStart:"info",bottomEnd:"paging"},sDom:null,searchDelay:null,sPaginationType:"",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId",caption:null,iDeferLoading:null},Z(V.defaults),V.defaults.column={aDataSort:null,iDataSort:-1,ariaTitle:"",asSorting:["asc","desc",""],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null},Z(V.defaults.column),V.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:!0,bLengthChange:!0,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollbarLeft:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},searchFixed:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",pagingControls:0,iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,bAjaxDataGet:!0,jqXHR:null,json:void 0,oAjaxData:void 0,sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==J(this)?+this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==J(this)?+this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var e=this._iDisplayLength,t=this._iDisplayStart,n=t+e,a=this.aiDisplay.length,r=this.oFeatures,o=r.bPaginate;return r.bServerSide?!1===o||-1===e?t+a:Math.min(t+e,this._iRecordsDisplay):!o||a<n||-1===e?a:n},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null,caption:"",captionNode:null,colgroup:null,deferLoading:null},V.ext.pager);H.extend(xt,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(){return["numbers"]},simple_numbers:function(){return["previous","numbers","next"]},full_numbers:function(){return["first","previous","numbers","next","last"]},first_last:function(){return["first","last"]},first_last_numbers:function(){return["first","numbers","last"]},_numbers:Et,numbers_length:7}),H.extend(!0,V.ext.renderer,{pagingButton:{_:function(e,t,n,a,r){var e=e.oClasses.paging,o=[e.button];return a&&o.push(e.active),r&&o.push(e.disabled),{display:a="ellipsis"===t?H('<span class="ellipsis"></span>').html(n)[0]:H("<button>",{class:o.join(" "),role:"link",type:"button"}).html(n),clicker:a}}},pagingContainer:{_:function(e,t){return t}}});function wt(e,t,n,a,r){return i?e[t](r):o?e[n](r):a?e[a](r):e}var o,i,Tt=!1;function _t(e,t,n){var a;if(W.luxon&&!o&&(o=W.luxon),i=W.moment&&!i?W.moment:i){if(!(a=i.utc(e,t,n,!0)).isValid())return null}else if(o){if(!(a=t&&"string"==typeof e?o.DateTime.fromFormat(e,t):o.DateTime.fromISO(e)).isValid)return null;a.setLocale(n)}else t?(Tt||alert("DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"),Tt=!0):a=new Date(e);return a}function Ct(s){return function(a,r,o,i){0===arguments.length?(o="en",a=r=null):1===arguments.length?(o="en",r=a,a=null):2===arguments.length&&(o=r,r=a,a=null);var l="datetime"+(r?"-"+r:"");return V.ext.type.order[l]||V.type(l,{detect:function(e){return e===l&&l},order:{pre:function(e){return e.valueOf()}},className:"dt-right"}),function(e,t){var n;return null==e&&(e="--now"===i?(n=new Date,new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds()))):""),"type"===t?l:""===e?"sort"!==t?"":_t("0000-01-01 00:00:00",null,o):!(null===r||a!==r||"sort"===t||"type"===t||e instanceof Date)||null===(n=_t(e,a,o))?e:"sort"===t?n:(e=null===r?wt(n,"toDate","toJSDate","")[s]():wt(n,"format","toFormat","toISOString",r),"display"===t?u(e):e)}}}var Lt=",",It=".";if(void 0!==W.Intl)try{for(var At=(new Intl.NumberFormat).formatToParts(100000.1),a=0;a<At.length;a++)"group"===At[a].type?Lt=At[a].value:"decimal"===At[a].type&&(It=At[a].value)}catch(e){}V.datetime=function(n,a){var r="datetime-"+n;a=a||"en",V.ext.type.order[r]||V.type(r,{detect:function(e){var t=_t(e,n,a);return!(""!==e&&!t)&&r},order:{pre:function(e){return _t(e,n,a)||0}},className:"dt-right"})},V.render={date:Ct("toLocaleDateString"),datetime:Ct("toLocaleString"),time:Ct("toLocaleTimeString"),number:function(r,o,i,l,s){return null==r&&(r=Lt),null==o&&(o=It),{display:function(e){if("number"!=typeof e&&"string"!=typeof e)return e;if(""===e||null===e)return e;var t=e<0?"-":"",n=parseFloat(e),a=Math.abs(n);if(1e11<=a||a<1e-4&&0!==a)return(a=n.toExponential(i).split(/e\+?/))[0]+" x 10<sup>"+a[1]+"</sup>";if(isNaN(n))return u(e);n=n.toFixed(i),e=Math.abs(n);a=parseInt(e,10),n=i?o+(e-a).toFixed(i).substring(2):"";return(t=0===a&&0===parseFloat(n)?"":t)+(l||"")+a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,r)+n+(s||"")}}},text:function(){return{display:u,filter:u}}};function Ft(e,t){return e=e.toString().toLowerCase(),t=t.toString().toLowerCase(),e.localeCompare(t,navigator.languages[0]||navigator.language,{numeric:!0,ignorePunctuation:!0})}var l=V.ext.type,Nt=(V.type=function(n,e,t){if(!e)return{className:l.className[n],detect:l.detect.find(function(e){return e.name===n}),order:{pre:l.order[n+"-pre"],asc:l.order[n+"-asc"],desc:l.order[n+"-desc"]},render:l.render[n],search:l.search[n]};function a(e,t){l[e][n]=t}function r(e){Object.defineProperty(e,"name",{value:n});var t=l.detect.findIndex(function(e){return e.name===n});-1===t?l.detect.unshift(e):l.detect.splice(t,1,e)}function o(e){l.order[n+"-pre"]=e.pre,l.order[n+"-asc"]=e.asc,l.order[n+"-desc"]=e.desc}void 0===t&&(t=e,e=null),"className"===e?a("className",t):"detect"===e?r(t):"order"===e?o(t):"render"===e?a("render",t):"search"===e?a("search",t):e||(t.className&&a("className",t.className),void 0!==t.detect&&r(t.detect),t.order&&o(t.order),void 0!==t.render&&a("render",t.render),void 0!==t.search&&a("search",t.search))},V.types=function(){return l.detect.map(function(e){return e.name})},V.type("string",{detect:function(){return"string"},order:{pre:function(e){return T(e)?"":"string"==typeof e?e.toLowerCase():e.toString?e.toString():""}},search:gt(!1,!0)}),V.type("string-utf8",{detect:{allOf:function(e){return!0},oneOf:function(e){return!T(e)&&navigator.languages&&"string"==typeof e&&e.match(/[^\x00-\x7F]/)}},order:{asc:Ft,desc:function(e,t){return-1*Ft(e,t)}},search:gt(!1,!0)}),V.type("html",{detect:{allOf:function(e){return T(e)||"string"==typeof e&&-1!==e.indexOf("<")},oneOf:function(e){return!T(e)&&"string"==typeof e&&-1!==e.indexOf("<")}},order:{pre:function(e){return T(e)?"":e.replace?L(e).trim().toLowerCase():e+""}},search:gt(!0,!0)}),V.type("date",{className:"dt-type-date",detect:{allOf:function(e){var t;return!e||e instanceof Date||R.test(e)?null!==(t=Date.parse(e))&&!isNaN(t)||T(e):null},oneOf:function(e){return e instanceof Date||"string"==typeof e&&R.test(e)}},order:{pre:function(e){e=Date.parse(e);return isNaN(e)?-1/0:e}}}),V.type("html-num-fmt",{className:"dt-type-numeric",detect:{allOf:function(e,t){t=t.oLanguage.sDecimal;return c(e,t,!0,!1)},oneOf:function(e,t){t=t.oLanguage.sDecimal;return c(e,t,!0,!1)}},order:{pre:function(e,t){t=t.oLanguage.sDecimal;return Nt(e,t,N,P)}},search:gt(!0,!0)}),V.type("html-num",{className:"dt-type-numeric",detect:{allOf:function(e,t){t=t.oLanguage.sDecimal;return c(e,t,!1,!0)},oneOf:function(e,t){t=t.oLanguage.sDecimal;return c(e,t,!1,!1)}},order:{pre:function(e,t){t=t.oLanguage.sDecimal;return Nt(e,t,N)}},search:gt(!0,!0)}),V.type("num-fmt",{className:"dt-type-numeric",detect:{allOf:function(e,t){t=t.oLanguage.sDecimal;return s(e,t,!0,!0)},oneOf:function(e,t){t=t.oLanguage.sDecimal;return s(e,t,!0,!1)}},order:{pre:function(e,t){t=t.oLanguage.sDecimal;return Nt(e,t,P)}}}),V.type("num",{className:"dt-type-numeric",detect:{allOf:function(e,t){t=t.oLanguage.sDecimal;return s(e,t,!1,!0)},oneOf:function(e,t){t=t.oLanguage.sDecimal;return s(e,t,!1,!1)}},order:{pre:function(e,t){t=t.oLanguage.sDecimal;return Nt(e,t)}}}),function(e,t,n,a){var r;return 0===e||e&&"-"!==e?"number"==(r=typeof e)||"bigint"==r?e:+(e=(e=t?E(e,t):e).replace&&(n&&(e=e.replace(n,"")),a)?e.replace(a,""):e):-1/0});function jt(e,t,n){n&&(e[t]=n)}H.extend(!0,V.ext.renderer,{footer:{_:function(e,t,n){t.addClass(n.tfoot.cell)}},header:{_:function(p,g,v){g.addClass(v.thead.cell),p.oFeatures.bSort||g.addClass(v.order.none);var e=p.bSortCellsTop,t=g.closest("thead").find("tr"),n=g.parent().index();"disable"===g.attr("data-dt-order")||"disable"===g.parent().attr("data-dt-order")||!0===e&&0!==n||!1===e&&n!==t.length-1||H(p.nTable).on("order.dt.DT column-visibility.dt.DT",function(e,t){if(p===t){for(var n=v.order,a=t.api.columns(g),r=p.aoColumns[a.flatten()[0]],o=a.orderable().includes(!0),i="",l=a.indexes(),s=a.orderable(!0).flatten(),u=t.sortDetails,c=m(u,"col"),d=(g.removeClass(n.isAsc+" "+n.isDesc).toggleClass(n.none,!o).toggleClass(n.canAsc,o&&s.includes("asc")).toggleClass(n.canDesc,o&&s.includes("desc")),!0),f=0;f<l.length;f++)c.includes(l[f])||(d=!1);d&&(s=a.order(),g.addClass(s.includes("asc")?n.isAsc:""+s.includes("desc")?n.isDesc:""));var h=-1;for(f=0;f<c.length;f++)if(p.aoColumns[c[f]].bVisible){h=c[f];break}l[0]==h?(a=u[0],s=r.asSorting,g.attr("aria-sort","asc"===a.dir?"ascending":"descending"),i=s[a.index+1]?"Reverse":"Remove"):g.removeAttr("aria-sort"),g.attr("aria-label",o?r.ariaTitle+t.api.i18n("oAria.orderable"+i):r.ariaTitle),o&&(g.find(".dt-column-title").attr("role","button"),g.attr("tabindex",0))}})}},layout:{_:function(e,t,n){var a=e.oClasses.layout,r=H("<div/>").attr("id",n.id||null).addClass(n.className||a.row).appendTo(t);H.each(n,function(e,t){var n;"id"!==e&&"className"!==e&&(n="",t.table&&(r.addClass(a.tableRow),n+=a.tableCell+" "),n+="start"===e?a.start:"end"===e?a.end:a.full,H("<div/>").attr({id:t.id||null,class:t.className||a.cell+" "+n}).append(t.contents).appendTo(r))})}}}),V.feature={},V.feature.register=function(e,t,n){V.ext.features[e]=t,n&&C.feature.push({cFeature:n,fnInit:t})},V.feature.register("div",function(e,t){var n=H("<div>")[0];return t&&(jt(n,"className",t.className),jt(n,"id",t.id),jt(n,"innerHTML",t.html),jt(n,"textContent",t.text)),n}),V.feature.register("info",function(e,s){var t,n,u;return e.oFeatures.bInfo?(t=e.oLanguage,n=e.sTableId,u=H("<div/>",{class:e.oClasses.info.container}),s=H.extend({callback:t.fnInfoCallback,empty:t.sInfoEmpty,postfix:t.sInfoPostFix,search:t.sInfoFiltered,text:t.sInfo},s),e.aoDrawCallback.push(function(e){var t=s,n=u,a=e._iDisplayStart+1,r=e.fnDisplayEnd(),o=e.fnRecordsTotal(),i=e.fnRecordsDisplay(),l=i?t.text:t.empty;i!==o&&(l+=" "+t.search),l+=t.postfix,l=rt(e,l),t.callback&&(l=t.callback.call(e.oInstance,e,a,r,o,i,l)),n.html(l),G(e,null,"info",[e,n[0],l])}),e._infoEl||(u.attr({"aria-live":"polite",id:n+"_info",role:"status"}),H(e.nTable).attr("aria-describedby",n+"_info"),e._infoEl=u),u):null},"i");var Rt=0;function Ot(e){var t=[];return e.numbers&&t.push("numbers"),e.previousNext&&(t.unshift("previous"),t.push("next")),e.firstLast&&(t.unshift("first"),t.push("last")),t}function Pt(e,t,n,a){var r=e.oLanguage.oPaginate,o={display:"",active:!1,disabled:!1};switch(t){case"ellipsis":o.display="&#x2026;",o.disabled=!0;break;case"first":o.display=r.sFirst,0===n&&(o.disabled=!0);break;case"previous":o.display=r.sPrevious,0===n&&(o.disabled=!0);break;case"next":o.display=r.sNext,0!==a&&n!==a-1||(o.disabled=!0);break;case"last":o.display=r.sLast,0!==a&&n!==a-1||(o.disabled=!0);break;default:"number"==typeof t&&(o.display=e.fnFormatNumber(t+1),n===t)&&(o.active=!0)}return o}function Et(e,t,n,a){var r=[],o=Math.floor(n/2),i=a?2:1,l=a?1:0;return t<=n?r=h(0,t):1===n?r=[e]:3===n?e<=1?r=[0,1,"ellipsis"]:t-2<=e?(r=h(t-2,t)).unshift("ellipsis"):r=["ellipsis",e,"ellipsis"]:e<=o?((r=h(0,n-i)).push("ellipsis"),a&&r.push(t-1)):t-1-o<=e?((r=h(t-(n-i),t)).unshift("ellipsis"),a&&r.unshift(0)):((r=h(e-o+i,e+o-l)).push("ellipsis"),r.unshift("ellipsis"),a&&(r.push(t-1),r.unshift(0))),r}V.feature.register("search",function(n,a){var e,t,r,o,i,l,s,u,c,d;return n.oFeatures.bFilter?(e=n.oClasses.search,t=n.sTableId,c=n.oLanguage,r=n.oPreviousSearch,o='<input type="search" class="'+e.input+'"/>',-1===(a=H.extend({placeholder:c.sSearchPlaceholder,processing:!1,text:c.sSearch},a)).text.indexOf("_INPUT_")&&(a.text+="_INPUT_"),a.text=rt(n,a.text),c=a.text.match(/_INPUT_$/),s=a.text.match(/^_INPUT_/),i=a.text.replace(/_INPUT_/,""),l="<label>"+a.text+"</label>",s?l="_INPUT_<label>"+i+"</label>":c&&(l="<label>"+i+"</label>_INPUT_"),(s=H("<div>").addClass(e.container).append(l.replace(/_INPUT_/,o))).find("label").attr("for","dt-search-"+Rt),s.find("input").attr("id","dt-search-"+Rt),Rt++,u=function(e){var t=this.value;r.return&&"Enter"!==e.key||t!=r.search&&Ve(n,a.processing,function(){r.search=t,Re(n,r),n._iDisplayStart=0,S(n)})},c=null!==n.searchDelay?n.searchDelay:0,d=H("input",s).val(r.search).attr("placeholder",a.placeholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",c?V.util.debounce(u,c):u).on("mouseup.DT",function(e){setTimeout(function(){u.call(d[0],e)},10)}).on("keypress.DT",function(e){if(13==e.keyCode)return!1}).attr("aria-controls",t),H(n.nTable).on("search.dt.DT",function(e,t){n===t&&d[0]!==_.activeElement&&d.val("function"!=typeof r.search?r.search:"")}),s):null},"f"),V.feature.register("paging",function(e,t){if(!e.oFeatures.bPaginate)return null;t=H.extend({buttons:V.ext.pager.numbers_length,type:e.sPaginationType,boundaryNumbers:!0,firstLast:!0,previousNext:!0,numbers:!0},t);function n(){!function e(t,n,a){if(!t._bInitComplete)return;var r=a.type?V.ext.pager[a.type]:Ot,o=t.oLanguage.oAria.paginate||{},i=t._iDisplayStart,l=t._iDisplayLength,s=t.fnRecordsDisplay(),u=-1===l,c=u?0:Math.ceil(i/l),d=u?1:Math.ceil(s/l),f=r(a).map(function(e){return"numbers"===e?Et(c,d,a.buttons,a.boundaryNumbers):e}).flat();var h=[];for(var p=0;p<f.length;p++){var g=f[p],v=Pt(t,g,c,d),m=at(t,"pagingButton")(t,g,v.display,v.active,v.disabled),b="string"==typeof g?o[g]:o.number?o.number+(g+1):null;H(m.clicker).attr({"aria-controls":t.sTableId,"aria-disabled":v.disabled?"true":null,"aria-current":v.active?"page":null,"aria-label":b,"data-dt-idx":g,tabIndex:v.disabled?-1:t.iTabIndex||null}),"number"!=typeof g&&H(m.clicker).addClass(g),tt(m.clicker,{action:g},function(e){e.preventDefault(),Xe(t,e.data.action,!0)}),h.push(m.display)}i=at(t,"pagingContainer")(t,h);u=n.find(_.activeElement).data("dt-idx");n.empty().append(i);void 0!==u&&n.find("[data-dt-idx="+u+"]").trigger("focus");h.length&&1<a.buttons&&H(n).height()>=2*H(h[0]).outerHeight()-10&&e(t,n,H.extend({},a,{buttons:a.buttons-2}))}(e,a.children(),t)}var a=H("<div/>").addClass(e.oClasses.paging.container+(t.type?" paging_"+t.type:"")).append("<nav>");return e.aoDrawCallback.push(n),H(e.nTable).on("column-sizing.dt.DT",n),a},"p");var kt=0;return V.feature.register("pageLength",function(a,e){var t=a.oFeatures;if(!t.bPaginate||!t.bLengthChange)return null;e=H.extend({menu:a.aLengthMenu,text:a.oLanguage.sLengthMenu},e);var t=a.oClasses.length,n=a.sTableId,r=e.menu,o=[],i=[];if(Array.isArray(r[0]))o=r[0],i=r[1];else for(p=0;p<r.length;p++)H.isPlainObject(r[p])?(o.push(r[p].value),i.push(r[p].label)):(o.push(r[p]),i.push(r[p]));for(var l=e.text.match(/_MENU_$/),s=e.text.match(/^_MENU_/),u=e.text.replace(/_MENU_/,""),e="<label>"+e.text+"</label>",s=(s?e="_MENU_<label>"+u+"</label>":l&&(e="<label>"+u+"</label>_MENU_"),"tmp-"+ +new Date),c=H("<div/>").addClass(t.container).append(e.replace("_MENU_",'<span id="'+s+'"></span>')),d=[],f=(c.find("label")[0].childNodes.forEach(function(e){e.nodeType===Node.TEXT_NODE&&d.push({el:e,text:e.textContent})}),function(t){d.forEach(function(e){e.el.textContent=rt(a,e.text,t)})}),h=H("<select/>",{name:n+"_length","aria-controls":n,class:t.select}),p=0;p<o.length;p++)h[0][p]=new Option("number"==typeof i[p]?a.fnFormatNumber(i[p]):i[p],o[p]);return c.find("label").attr("for","dt-length-"+kt),h.attr("id","dt-length-"+kt),kt++,c.find("#"+s).replaceWith(h),H("select",c).val(a._iDisplayLength).on("change.DT",function(){We(a,H(this).val()),S(a)}),H(a.nTable).on("length.dt.DT",function(e,t,n){a===t&&(H("select",c).val(n),f(n))}),f(a._iDisplayLength),c},"l"),((H.fn.dataTable=V).$=H).fn.dataTableSettings=V.settings,H.fn.dataTableExt=V.ext,H.fn.DataTable=function(e){return H(this).dataTable(e).api()},H.each(V,function(e,t){H.fn.DataTable[e]=t}),V});
/*! DataTables Bootstrap 5 integration
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n){var o,r;"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return n(t,window,document)}):"object"==typeof exports?(o=require("jquery"),r=function(t,e){e.fn.dataTable||require("datatables.net")(t,e)},"undefined"==typeof window?module.exports=function(t,e){return t=t||window,e=e||o(t),r(t,e),n(e,0,t.document)}:(r(window,o),module.exports=n(o,window,window.document))):n(jQuery,window,document)}(function(d,t,e){"use strict";var n=d.fn.dataTable;return d.extend(!0,n.defaults,{renderer:"bootstrap"}),d.extend(!0,n.ext.classes,{container:"dt-container dt-bootstrap5",search:{input:"form-control form-control-sm"},length:{select:"form-select form-select-sm"},processing:{container:"dt-processing card"},layout:{row:"row mt-2 justify-content-between",cell:"d-md-flex justify-content-between align-items-center",tableCell:"col-12",start:"dt-layout-start col-md-auto me-auto",end:"dt-layout-end col-md-auto ms-auto",full:"dt-layout-full col-md"}}),n.ext.renderer.pagingButton.bootstrap=function(t,e,n,o,r){var a=["dt-paging-button","page-item"],o=(o&&a.push("active"),r&&a.push("disabled"),d("<li>").addClass(a.join(" ")));return{display:o,clicker:d("<button>",{class:"page-link",role:"link",type:"button"}).html(n).appendTo(o)}},n.ext.renderer.pagingContainer.bootstrap=function(t,e){return d("<ul/>").addClass("pagination").append(e)},n});
/*! RowGroup 1.5.1
 * © SpryMedia Ltd - datatables.net/license
 */
!function(e){var n,o;"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?(n=require("jquery"),o=function(t,r){r.fn.dataTable||require("datatables.net")(t,r)},"undefined"==typeof window?module.exports=function(t,r){return t=t||window,r=r||n(t),o(t,r),e(r,0,t.document)}:(o(window,n),module.exports=e(n,window,window.document))):e(jQuery,window,document)}(function(i,t,r){"use strict";function a(t,r){if(!l.versionCheck||!l.versionCheck("1.11"))throw"RowGroup requires DataTables 1.11 or newer";if(this.c=i.extend(!0,{},l.defaults.rowGroup,a.defaults,r),this.s={dt:new l.Api(t)},this.dom={},r=this.s.dt.settings()[0],t=r.rowGroup)return t;(r.rowGroup=this)._constructor()}var l=i.fn.dataTable;return i.extend(a.prototype,{dataSrc:function(t){var r;return void 0===t?this.c.dataSrc:(r=this.s.dt,this.c.dataSrc=t,i(r.table().node()).triggerHandler("rowgroup-datasrc.dt",[r,t]),this)},disable:function(){return this.c.enable=!1,this},enable:function(t){return!1===t?this.disable():(this.c.enable=!0,this)},enabled:function(){return this.c.enable},_constructor:function(){var e=this,t=this.s.dt,n=t.settings()[0];t.on("draw.dtrg",function(t,r){e.c.enable&&n===r&&e._draw()}),t.on("column-visibility.dt.dtrg responsive-resize.dt.dtrg",function(){e._adjustColspan()}),t.on("destroy",function(){t.off(".dtrg")})},_adjustColspan:function(){i("tr."+this.c.className,this.s.dt.table().body()).find("th:visible, td:visible").attr("colspan",this._colspan())},_colspan:function(){return this.s.dt.columns().visible().reduce(function(t,r){return t+r},0)},_draw:function(){var t=this.s.dt,t=this._group(0,t.rows({page:"current"}).indexes());this._groupDisplay(0,t)},_group:function(t,r){for(var e,n=Array.isArray(this.c.dataSrc)?this.c.dataSrc:[this.c.dataSrc],o=l.util.get(n[t]),i=this.s.dt,a=[],s=0,d=r.length;s<d;s++){var u,c=r[s];null==(u=o(i.row(c).data(),t))&&(u=this.c.emptyDataGroup),void 0!==e&&u===e||(a.push({dataPoint:u,rows:[]}),e=u),a[a.length-1].rows.push(c)}if(void 0!==n[t+1])for(s=0,d=a.length;s<d;s++)a[s].children=this._group(t+1,a[s].rows);return a},_groupDisplay:function(t,r){for(var e,n=this.s.dt,o=0,i=r.length;o<i;o++){var a,s=r[o],d=s.dataPoint,u=s.rows;this.c.startRender&&(e=this.c.startRender.call(this,n.rows(u),d,t),a=this._rowWrap(e,this.c.startClassName,t))&&a.insertBefore(n.row(u[0]).node()),this.c.endRender&&(e=this.c.endRender.call(this,n.rows(u),d,t),a=this._rowWrap(e,this.c.endClassName,t))&&a.insertAfter(n.row(u[u.length-1]).node()),s.children&&this._groupDisplay(t+1,s.children)}},_rowWrap:function(t,r,e){return null==(t=null!==t&&""!==t?t:this.c.emptyDataGroup)?null:("object"==typeof t&&t.nodeName&&"tr"===t.nodeName.toLowerCase()?i(t):t instanceof i&&t.length&&"tr"===t[0].nodeName.toLowerCase()?t:i("<tr/>").append(i("<th/>").attr("colspan",this._colspan()).attr("scope","row").append(t))).addClass(this.c.className).addClass(r).addClass("dtrg-level-"+e)}}),a.defaults={className:"dtrg-group",dataSrc:0,emptyDataGroup:"No group",enable:!0,endClassName:"dtrg-end",endRender:null,startClassName:"dtrg-start",startRender:function(t,r){return r}},a.version="1.5.1",i.fn.dataTable.RowGroup=a,i.fn.DataTable.RowGroup=a,l.Api.register("rowGroup()",function(){return this}),l.Api.register("rowGroup().disable()",function(){return this.iterator("table",function(t){t.rowGroup&&t.rowGroup.enable(!1)})}),l.Api.register("rowGroup().enable()",function(r){return this.iterator("table",function(t){t.rowGroup&&t.rowGroup.enable(void 0===r||r)})}),l.Api.register("rowGroup().enabled()",function(){var t=this.context;return!(!t.length||!t[0].rowGroup)&&t[0].rowGroup.enabled()}),l.Api.register("rowGroup().dataSrc()",function(r){return void 0===r?this.context[0].rowGroup.dataSrc():this.iterator("table",function(t){t.rowGroup&&t.rowGroup.dataSrc(r)})}),i(r).on("preInit.dt.dtrg",function(t,r,e){var n,o;"dt"===t.namespace&&(t=r.oInit.rowGroup,n=l.defaults.rowGroup,t||n)&&(o=i.extend({},n,t),!1!==t)&&new a(r,o)}),l});
/*! Bootstrap 5 styling wrapper for RowGroup
 * © SpryMedia Ltd - datatables.net/license
 */
!function(t){var o,d;"function"==typeof define&&define.amd?define(["jquery","datatables.net-bs5","datatables.net-rowgroup"],function(e){return t(e,window,document)}):"object"==typeof exports?(o=require("jquery"),d=function(e,n){n.fn.dataTable||require("datatables.net-bs5")(e,n),n.fn.dataTable.RowGroup||require("datatables.net-rowgroup")(e,n)},"undefined"==typeof window?module.exports=function(e,n){return e=e||window,n=n||o(e),d(e,n),t(n,0,e.document)}:(d(window,o),module.exports=t(o,window,window.document))):t(jQuery,window,document)}(function(e,n,t){"use strict";return e.fn.dataTable});
/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),n(t),t}:n(jQuery)}(function(t){var e,n,s,p,r,o,h,f,g,m,y,v,i,a,_,s=((u=t&&t.fn&&t.fn.select2&&t.fn.select2.amd?t.fn.select2.amd:u)&&u.requirejs||(u?n=u:u={},g={},m={},y={},v={},i=Object.prototype.hasOwnProperty,a=[].slice,_=/\.js$/,h=function(e,t){var n,s,i=c(e),r=i[0],t=t[1];return e=i[1],r&&(n=x(r=l(r,t))),r?e=n&&n.normalize?n.normalize(e,(s=t,function(e){return l(e,s)})):l(e,t):(r=(i=c(e=l(e,t)))[0],e=i[1],r&&(n=x(r))),{f:r?r+"!"+e:e,n:e,pr:r,p:n}},f={require:function(e){return w(e)},exports:function(e){var t=g[e];return void 0!==t?t:g[e]={}},module:function(e){return{id:e,uri:"",exports:g[e],config:(t=e,function(){return y&&y.config&&y.config[t]||{}})};var t}},r=function(e,t,n,s){var i,r,o,a,l,c=[],u=typeof n,d=A(s=s||e);if("undefined"==u||"function"==u){for(t=!t.length&&n.length?["require","exports","module"]:t,a=0;a<t.length;a+=1)if("require"===(r=(o=h(t[a],d)).f))c[a]=f.require(e);else if("exports"===r)c[a]=f.exports(e),l=!0;else if("module"===r)i=c[a]=f.module(e);else if(b(g,r)||b(m,r)||b(v,r))c[a]=x(r);else{if(!o.p)throw new Error(e+" missing "+r);o.p.load(o.n,w(s,!0),function(t){return function(e){g[t]=e}}(r),{}),c[a]=g[r]}u=n?n.apply(g[e],c):void 0,e&&(i&&i.exports!==p&&i.exports!==g[e]?g[e]=i.exports:u===p&&l||(g[e]=u))}else e&&(g[e]=n)},e=n=o=function(e,t,n,s,i){if("string"==typeof e)return f[e]?f[e](t):x(h(e,A(t)).f);if(!e.splice){if((y=e).deps&&o(y.deps,y.callback),!t)return;t.splice?(e=t,t=n,n=null):e=p}return t=t||function(){},"function"==typeof n&&(n=s,s=i),s?r(p,e,t,n):setTimeout(function(){r(p,e,t,n)},4),o},o.config=function(e){return o(e)},e._defined=g,(s=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),b(g,e)||b(m,e)||(m[e]=[e,t,n])}).amd={jQuery:!0},u.requirejs=e,u.require=n,u.define=s),u.define("almond",function(){}),u.define("jquery",[],function(){var e=t||$;return null==e&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),e}),u.define("select2/utils",["jquery"],function(r){var s={};function c(e){var t,n=e.prototype,s=[];for(t in n)"function"==typeof n[t]&&"constructor"!==t&&s.push(t);return s}s.Extend=function(e,t){var n,s={}.hasOwnProperty;function i(){this.constructor=e}for(n in t)s.call(t,n)&&(e[n]=t[n]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e},s.Decorate=function(s,i){var e=c(i),t=c(s);function r(){var e=Array.prototype.unshift,t=i.prototype.constructor.length,n=s.prototype.constructor;0<t&&(e.call(arguments,s.prototype.constructor),n=i.prototype.constructor),n.apply(this,arguments)}i.displayName=s.displayName,r.prototype=new function(){this.constructor=r};for(var n=0;n<t.length;n++){var o=t[n];r.prototype[o]=s.prototype[o]}for(var a=0;a<e.length;a++){var l=e[a];r.prototype[l]=function(e){var t=function(){};e in r.prototype&&(t=r.prototype[e]);var n=i.prototype[e];return function(){return Array.prototype.unshift.call(arguments,t),n.apply(this,arguments)}}(l)}return r};function e(){this.listeners={}}e.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},e.prototype.trigger=function(e){var t=Array.prototype.slice,n=t.call(arguments,1);this.listeners=this.listeners||{},0===(n=null==n?[]:n).length&&n.push({}),(n[0]._type=e)in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},e.prototype.invoke=function(e,t){for(var n=0,s=e.length;n<s;n++)e[n].apply(this,t)},s.Observable=e,s.generateChars=function(e){for(var t="",n=0;n<e;n++)t+=Math.floor(36*Math.random()).toString(36);return t},s.bind=function(e,t){return function(){e.apply(t,arguments)}},s._convertData=function(e){for(var t in e){var n=t.split("-"),s=e;if(1!==n.length){for(var i=0;i<n.length;i++){var r=n[i];(r=r.substring(0,1).toLowerCase()+r.substring(1))in s||(s[r]={}),i==n.length-1&&(s[r]=e[t]),s=s[r]}delete e[t]}}return e},s.hasScroll=function(e,t){var n=r(t),s=t.style.overflowX,i=t.style.overflowY;return(s!==i||"hidden"!==i&&"visible"!==i)&&("scroll"===s||"scroll"===i||(n.innerHeight()<t.scrollHeight||n.innerWidth()<t.scrollWidth))},s.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},s.__cache={};var n=0;return s.GetUniqueElementId=function(e){var t=e.getAttribute("data-select2-id");return null!=t||(t=e.id?"select2-data-"+e.id:"select2-data-"+(++n).toString()+"-"+s.generateChars(4),e.setAttribute("data-select2-id",t)),t},s.StoreData=function(e,t,n){e=s.GetUniqueElementId(e);s.__cache[e]||(s.__cache[e]={}),s.__cache[e][t]=n},s.GetData=function(e,t){var n=s.GetUniqueElementId(e);return t?s.__cache[n]&&null!=s.__cache[n][t]?s.__cache[n][t]:r(e).data(t):s.__cache[n]},s.RemoveData=function(e){var t=s.GetUniqueElementId(e);null!=s.__cache[t]&&delete s.__cache[t],e.removeAttribute("data-select2-id")},s.copyNonInternalCssClasses=function(e,t){var n=(n=e.getAttribute("class").trim().split(/\s+/)).filter(function(e){return 0===e.indexOf("select2-")}),t=(t=t.getAttribute("class").trim().split(/\s+/)).filter(function(e){return 0!==e.indexOf("select2-")}),t=n.concat(t);e.setAttribute("class",t.join(" "))},s}),u.define("select2/results",["jquery","./utils"],function(d,p){function s(e,t,n){this.$element=e,this.data=n,this.options=t,s.__super__.constructor.call(this)}return p.Extend(s,p.Observable),s.prototype.render=function(){var e=d('<ul class="select2-results__options" role="listbox"></ul>');return this.options.get("multiple")&&e.attr("aria-multiselectable","true"),this.$results=e},s.prototype.clear=function(){this.$results.empty()},s.prototype.displayMessage=function(e){var t=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var n=d('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),s=this.options.get("translations").get(e.message);n.append(t(s(e.args))),n[0].className+=" select2-results__message",this.$results.append(n)},s.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},s.prototype.append=function(e){this.hideLoading();var t=[];if(null!=e.results&&0!==e.results.length){e.results=this.sort(e.results);for(var n=0;n<e.results.length;n++){var s=e.results[n],s=this.option(s);t.push(s)}this.$results.append(t)}else 0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"})},s.prototype.position=function(e,t){t.find(".select2-results").append(e)},s.prototype.sort=function(e){return this.options.get("sorter")(e)},s.prototype.highlightFirstItem=function(){var e=this.$results.find(".select2-results__option--selectable"),t=e.filter(".select2-results__option--selected");(0<t.length?t:e).first().trigger("mouseenter"),this.ensureHighlightVisible()},s.prototype.setClasses=function(){var t=this;this.data.current(function(e){var s=e.map(function(e){return e.id.toString()});t.$results.find(".select2-results__option--selectable").each(function(){var e=d(this),t=p.GetData(this,"data"),n=""+t.id;null!=t.element&&t.element.selected||null==t.element&&-1<s.indexOf(n)?(this.classList.add("select2-results__option--selected"),e.attr("aria-selected","true")):(this.classList.remove("select2-results__option--selected"),e.attr("aria-selected","false"))})})},s.prototype.showLoading=function(e){this.hideLoading();e={disabled:!0,loading:!0,text:this.options.get("translations").get("searching")(e)},e=this.option(e);e.className+=" loading-results",this.$results.prepend(e)},s.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},s.prototype.option=function(e){var t=document.createElement("li");t.classList.add("select2-results__option"),t.classList.add("select2-results__option--selectable");var n,s={role:"option"},i=window.Element.prototype.matches||window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector;for(n in(null!=e.element&&i.call(e.element,":disabled")||null==e.element&&e.disabled)&&(s["aria-disabled"]="true",t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--disabled")),null==e.id&&t.classList.remove("select2-results__option--selectable"),null!=e._resultId&&(t.id=e._resultId),e.title&&(t.title=e.title),e.children&&(s.role="group",s["aria-label"]=e.text,t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--group")),s){var r=s[n];t.setAttribute(n,r)}if(e.children){var o=d(t),a=document.createElement("strong");a.className="select2-results__group",this.template(e,a);for(var l=[],c=0;c<e.children.length;c++){var u=e.children[c],u=this.option(u);l.push(u)}i=d("<ul></ul>",{class:"select2-results__options select2-results__options--nested",role:"none"});i.append(l),o.append(a),o.append(i)}else this.template(e,t);return p.StoreData(t,"data",e),t},s.prototype.bind=function(t,e){var i=this,n=t.id+"-results";this.$results.attr("id",n),t.on("results:all",function(e){i.clear(),i.append(e.data),t.isOpen()&&(i.setClasses(),i.highlightFirstItem())}),t.on("results:append",function(e){i.append(e.data),t.isOpen()&&i.setClasses()}),t.on("query",function(e){i.hideMessages(),i.showLoading(e)}),t.on("select",function(){t.isOpen()&&(i.setClasses(),i.options.get("scrollAfterSelect")&&i.highlightFirstItem())}),t.on("unselect",function(){t.isOpen()&&(i.setClasses(),i.options.get("scrollAfterSelect")&&i.highlightFirstItem())}),t.on("open",function(){i.$results.attr("aria-expanded","true"),i.$results.attr("aria-hidden","false"),i.setClasses(),i.ensureHighlightVisible()}),t.on("close",function(){i.$results.attr("aria-expanded","false"),i.$results.attr("aria-hidden","true"),i.$results.removeAttr("aria-activedescendant")}),t.on("results:toggle",function(){var e=i.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),t.on("results:select",function(){var e,t=i.getHighlightedResults();0!==t.length&&(e=p.GetData(t[0],"data"),t.hasClass("select2-results__option--selected")?i.trigger("close",{}):i.trigger("select",{data:e}))}),t.on("results:previous",function(){var e,t=i.getHighlightedResults(),n=i.$results.find(".select2-results__option--selectable"),s=n.index(t);s<=0||(e=s-1,0===t.length&&(e=0),(s=n.eq(e)).trigger("mouseenter"),t=i.$results.offset().top,n=s.offset().top,s=i.$results.scrollTop()+(n-t),0===e?i.$results.scrollTop(0):n-t<0&&i.$results.scrollTop(s))}),t.on("results:next",function(){var e,t=i.getHighlightedResults(),n=i.$results.find(".select2-results__option--selectable"),s=n.index(t)+1;s>=n.length||((e=n.eq(s)).trigger("mouseenter"),t=i.$results.offset().top+i.$results.outerHeight(!1),n=e.offset().top+e.outerHeight(!1),e=i.$results.scrollTop()+n-t,0===s?i.$results.scrollTop(0):t<n&&i.$results.scrollTop(e))}),t.on("results:focus",function(e){e.element[0].classList.add("select2-results__option--highlighted"),e.element[0].setAttribute("aria-selected","true")}),t.on("results:message",function(e){i.displayMessage(e)}),d.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=i.$results.scrollTop(),n=i.$results.get(0).scrollHeight-t+e.deltaY,t=0<e.deltaY&&t-e.deltaY<=0,n=e.deltaY<0&&n<=i.$results.height();t?(i.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):n&&(i.$results.scrollTop(i.$results.get(0).scrollHeight-i.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".select2-results__option--selectable",function(e){var t=d(this),n=p.GetData(this,"data");t.hasClass("select2-results__option--selected")?i.options.get("multiple")?i.trigger("unselect",{originalEvent:e,data:n}):i.trigger("close",{}):i.trigger("select",{originalEvent:e,data:n})}),this.$results.on("mouseenter",".select2-results__option--selectable",function(e){var t=p.GetData(this,"data");i.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected","false"),i.trigger("results:focus",{data:t,element:d(this)})})},s.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},s.prototype.destroy=function(){this.$results.remove()},s.prototype.ensureHighlightVisible=function(){var e,t,n,s,i=this.getHighlightedResults();0!==i.length&&(e=this.$results.find(".select2-results__option--selectable").index(i),s=this.$results.offset().top,t=i.offset().top,n=this.$results.scrollTop()+(t-s),s=t-s,n-=2*i.outerHeight(!1),e<=2?this.$results.scrollTop(0):(s>this.$results.outerHeight()||s<0)&&this.$results.scrollTop(n))},s.prototype.template=function(e,t){var n=this.options.get("templateResult"),s=this.options.get("escapeMarkup"),e=n(e,t);null==e?t.style.display="none":"string"==typeof e?t.innerHTML=s(e):d(t).append(e)},s}),u.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),u.define("select2/selection/base",["jquery","../utils","../keys"],function(n,s,i){function r(e,t){this.$element=e,this.options=t,r.__super__.constructor.call(this)}return s.Extend(r,s.Observable),r.prototype.render=function(){var e=n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=s.GetData(this.$element[0],"old-tabindex")?this._tabindex=s.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),e.attr("title",this.$element.attr("title")),e.attr("tabindex",this._tabindex),e.attr("aria-disabled","false"),this.$selection=e},r.prototype.bind=function(e,t){var n=this,s=e.id+"-results";this.container=e,this.$selection.on("focus",function(e){n.trigger("focus",e)}),this.$selection.on("blur",function(e){n._handleBlur(e)}),this.$selection.on("keydown",function(e){n.trigger("keypress",e),e.which===i.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){n.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){n.update(e.data)}),e.on("open",function(){n.$selection.attr("aria-expanded","true"),n.$selection.attr("aria-owns",s),n._attachCloseHandler(e)}),e.on("close",function(){n.$selection.attr("aria-expanded","false"),n.$selection.removeAttr("aria-activedescendant"),n.$selection.removeAttr("aria-owns"),n.$selection.trigger("focus"),n._detachCloseHandler(e)}),e.on("enable",function(){n.$selection.attr("tabindex",n._tabindex),n.$selection.attr("aria-disabled","false")}),e.on("disable",function(){n.$selection.attr("tabindex","-1"),n.$selection.attr("aria-disabled","true")})},r.prototype._handleBlur=function(e){var t=this;window.setTimeout(function(){document.activeElement==t.$selection[0]||n.contains(t.$selection[0],document.activeElement)||t.trigger("blur",e)},1)},r.prototype._attachCloseHandler=function(e){n(document.body).on("mousedown.select2."+e.id,function(e){var t=n(e.target).closest(".select2");n(".select2.select2-container--open").each(function(){this!=t[0]&&s.GetData(this,"element").select2("close")})})},r.prototype._detachCloseHandler=function(e){n(document.body).off("mousedown.select2."+e.id)},r.prototype.position=function(e,t){t.find(".selection").append(e)},r.prototype.destroy=function(){this._detachCloseHandler(this.container)},r.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},r.prototype.isEnabled=function(){return!this.isDisabled()},r.prototype.isDisabled=function(){return this.options.get("disabled")},r}),u.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,n,s){function i(){i.__super__.constructor.apply(this,arguments)}return n.Extend(i,t),i.prototype.render=function(){var e=i.__super__.render.call(this);return e[0].classList.add("select2-selection--single"),e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},i.prototype.bind=function(t,e){var n=this;i.__super__.bind.apply(this,arguments);var s=t.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",s).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",s),this.$selection.attr("aria-controls",s),this.$selection.on("mousedown",function(e){1===e.which&&n.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),t.on("focus",function(e){t.isOpen()||n.$selection.trigger("focus")})},i.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},i.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},i.prototype.selectionContainer=function(){return e("<span></span>")},i.prototype.update=function(e){var t,n;0!==e.length?(n=e[0],t=this.$selection.find(".select2-selection__rendered"),e=this.display(n,t),t.empty().append(e),(n=n.title||n.text)?t.attr("title",n):t.removeAttr("title")):this.clear()},i}),u.define("select2/selection/multiple",["jquery","./base","../utils"],function(i,e,c){function r(e,t){r.__super__.constructor.apply(this,arguments)}return c.Extend(r,e),r.prototype.render=function(){var e=r.__super__.render.call(this);return e[0].classList.add("select2-selection--multiple"),e.html('<ul class="select2-selection__rendered"></ul>'),e},r.prototype.bind=function(e,t){var n=this;r.__super__.bind.apply(this,arguments);var s=e.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",s),this.$selection.on("click",function(e){n.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".select2-selection__choice__remove",function(e){var t;n.isDisabled()||(t=i(this).parent(),t=c.GetData(t[0],"data"),n.trigger("unselect",{originalEvent:e,data:t}))}),this.$selection.on("keydown",".select2-selection__choice__remove",function(e){n.isDisabled()||e.stopPropagation()})},r.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},r.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},r.prototype.selectionContainer=function(){return i('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>')},r.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],n=this.$selection.find(".select2-selection__rendered").attr("id")+"-choice-",s=0;s<e.length;s++){var i=e[s],r=this.selectionContainer(),o=this.display(i,r),a=n+c.generateChars(4)+"-";i.id?a+=i.id:a+=c.generateChars(4),r.find(".select2-selection__choice__display").append(o).attr("id",a);var l=i.title||i.text;l&&r.attr("title",l);o=this.options.get("translations").get("removeItem"),l=r.find(".select2-selection__choice__remove");l.attr("title",o()),l.attr("aria-label",o()),l.attr("aria-describedby",a),c.StoreData(r[0],"data",i),t.push(r)}this.$selection.find(".select2-selection__rendered").append(t)}},r}),u.define("select2/selection/placeholder",[],function(){function e(e,t,n){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n)}return e.prototype.normalizePlaceholder=function(e,t){return t="string"==typeof t?{id:"",text:t}:t},e.prototype.createPlaceholder=function(e,t){var n=this.selectionContainer();n.html(this.display(t)),n[0].classList.add("select2-selection__placeholder"),n[0].classList.remove("select2-selection__choice");t=t.title||t.text||n.text();return this.$selection.find(".select2-selection__rendered").attr("title",t),n},e.prototype.update=function(e,t){var n=1==t.length&&t[0].id!=this.placeholder.id;if(1<t.length||n)return e.call(this,t);this.clear();t=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(t)},e}),u.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(i,s,a){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(e){s._handleClear(e)}),t.on("keypress",function(e){s._handleKeyboardClear(e,t)})},e.prototype._handleClear=function(e,t){if(!this.isDisabled()){var n=this.$selection.find(".select2-selection__clear");if(0!==n.length){t.stopPropagation();var s=a.GetData(n[0],"data"),i=this.$element.val();this.$element.val(this.placeholder.id);var r={data:s};if(this.trigger("clear",r),r.prevented)this.$element.val(i);else{for(var o=0;o<s.length;o++)if(r={data:s[o]},this.trigger("unselect",r),r.prevented)return void this.$element.val(i);this.$element.trigger("input").trigger("change"),this.trigger("toggle",{})}}}},e.prototype._handleKeyboardClear=function(e,t,n){n.isOpen()||t.which!=s.DELETE&&t.which!=s.BACKSPACE||this._handleClear(t)},e.prototype.update=function(e,t){var n,s;e.call(this,t),this.$selection.find(".select2-selection__clear").remove(),this.$selection[0].classList.remove("select2-selection--clearable"),0<this.$selection.find(".select2-selection__placeholder").length||0===t.length||(n=this.$selection.find(".select2-selection__rendered").attr("id"),s=this.options.get("translations").get("removeAllItems"),(e=i('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>')).attr("title",s()),e.attr("aria-label",s()),e.attr("aria-describedby",n),a.StoreData(e[0],"data",t),this.$selection.prepend(e),this.$selection[0].classList.add("select2-selection--clearable"))},e}),u.define("select2/selection/search",["jquery","../utils","../keys"],function(s,a,l){function e(e,t,n){e.call(this,t,n)}return e.prototype.render=function(e){var t=this.options.get("translations").get("search"),n=s('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');this.$searchContainer=n,this.$search=n.find("textarea"),this.$search.prop("autocomplete",this.options.get("autocomplete")),this.$search.attr("aria-label",t());e=e.call(this);return this._transferTabIndex(),e.append(this.$searchContainer),e},e.prototype.bind=function(e,t,n){var s=this,i=t.id+"-results",r=t.id+"-container";e.call(this,t,n),s.$search.attr("aria-describedby",r),t.on("open",function(){s.$search.attr("aria-controls",i),s.$search.trigger("focus")}),t.on("close",function(){s.$search.val(""),s.resizeSearch(),s.$search.removeAttr("aria-controls"),s.$search.removeAttr("aria-activedescendant"),s.$search.trigger("focus")}),t.on("enable",function(){s.$search.prop("disabled",!1),s._transferTabIndex()}),t.on("disable",function(){s.$search.prop("disabled",!0)}),t.on("focus",function(e){s.$search.trigger("focus")}),t.on("results:focus",function(e){e.data._resultId?s.$search.attr("aria-activedescendant",e.data._resultId):s.$search.removeAttr("aria-activedescendant")}),this.$selection.on("focusin",".select2-search--inline",function(e){s.trigger("focus",e)}),this.$selection.on("focusout",".select2-search--inline",function(e){s._handleBlur(e)}),this.$selection.on("keydown",".select2-search--inline",function(e){var t;e.stopPropagation(),s.trigger("keypress",e),s._keyUpPrevented=e.isDefaultPrevented(),e.which!==l.BACKSPACE||""!==s.$search.val()||0<(t=s.$selection.find(".select2-selection__choice").last()).length&&(t=a.GetData(t[0],"data"),s.searchRemoveChoice(t),e.preventDefault())}),this.$selection.on("click",".select2-search--inline",function(e){s.$search.val()&&e.stopPropagation()});var t=document.documentMode,o=t&&t<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(e){o?s.$selection.off("input.search input.searchcheck"):s.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(e){var t;o&&"input"===e.type?s.$selection.off("input.search input.searchcheck"):(t=e.which)!=l.SHIFT&&t!=l.CTRL&&t!=l.ALT&&t!=l.TAB&&s.handleSearch(e)})},e.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},e.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},e.prototype.update=function(e,t){var n=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.resizeSearch(),n&&this.$search.trigger("focus")},e.prototype.handleSearch=function(){var e;this.resizeSearch(),this._keyUpPrevented||(e=this.$search.val(),this.trigger("query",{term:e})),this._keyUpPrevented=!1},e.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},e.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="100%";""===this.$search.attr("placeholder")&&(e=.75*(this.$search.val().length+1)+"em"),this.$search.css("width",e)},e}),u.define("select2/selection/selectionCss",["../utils"],function(n){function e(){}return e.prototype.render=function(e){var t=e.call(this),e=this.options.get("selectionCssClass")||"";return-1!==e.indexOf(":all:")&&(e=e.replace(":all:",""),n.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(e),t},e}),u.define("select2/selection/eventRelay",["jquery"],function(o){function e(){}return e.prototype.bind=function(e,t,n){var s=this,i=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],r=["opening","closing","selecting","unselecting","clearing"];e.call(this,t,n),t.on("*",function(e,t){var n;-1!==i.indexOf(e)&&(t=t||{},n=o.Event("select2:"+e,{params:t}),s.$element.trigger(n),-1!==r.indexOf(e)&&(t.prevented=n.isDefaultPrevented()))})},e}),u.define("select2/translation",["jquery","require"],function(t,n){function s(e){this.dict=e||{}}return s.prototype.all=function(){return this.dict},s.prototype.get=function(e){return this.dict[e]},s.prototype.extend=function(e){this.dict=t.extend({},e.all(),this.dict)},s._cache={},s.loadPath=function(e){var t;return e in s._cache||(t=n(e),s._cache[e]=t),new s(s._cache[e])},s}),u.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Œ":"OE","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","œ":"oe","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ώ":"ω","ς":"σ","’":"'"}}),u.define("select2/data/base",["../utils"],function(n){function s(e,t){s.__super__.constructor.call(this)}return n.Extend(s,n.Observable),s.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},s.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},s.prototype.bind=function(e,t){},s.prototype.destroy=function(){},s.prototype.generateResultId=function(e,t){e=e.id+"-result-";return e+=n.generateChars(4),null!=t.id?e+="-"+t.id.toString():e+="-"+n.generateChars(4),e},s}),u.define("select2/data/select",["./base","../utils","jquery"],function(e,a,l){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return a.Extend(n,e),n.prototype.current=function(e){var t=this;e(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"),function(e){return t.item(l(e))}))},n.prototype.select=function(i){var e,r=this;if(i.selected=!0,null!=i.element&&"option"===i.element.tagName.toLowerCase())return i.element.selected=!0,void this.$element.trigger("input").trigger("change");this.$element.prop("multiple")?this.current(function(e){var t=[];(i=[i]).push.apply(i,e);for(var n=0;n<i.length;n++){var s=i[n].id;-1===t.indexOf(s)&&t.push(s)}r.$element.val(t),r.$element.trigger("input").trigger("change")}):(e=i.id,this.$element.val(e),this.$element.trigger("input").trigger("change"))},n.prototype.unselect=function(i){var r=this;if(this.$element.prop("multiple")){if(i.selected=!1,null!=i.element&&"option"===i.element.tagName.toLowerCase())return i.element.selected=!1,void this.$element.trigger("input").trigger("change");this.current(function(e){for(var t=[],n=0;n<e.length;n++){var s=e[n].id;s!==i.id&&-1===t.indexOf(s)&&t.push(s)}r.$element.val(t),r.$element.trigger("input").trigger("change")})}},n.prototype.bind=function(e,t){var n=this;(this.container=e).on("select",function(e){n.select(e.data)}),e.on("unselect",function(e){n.unselect(e.data)})},n.prototype.destroy=function(){this.$element.find("*").each(function(){a.RemoveData(this)})},n.prototype.query=function(t,e){var n=[],s=this;this.$element.children().each(function(){var e;"option"!==this.tagName.toLowerCase()&&"optgroup"!==this.tagName.toLowerCase()||(e=l(this),e=s.item(e),null!==(e=s.matches(t,e))&&n.push(e))}),e({results:n})},n.prototype.addOptions=function(e){this.$element.append(e)},n.prototype.option=function(e){var t;e.children?(t=document.createElement("optgroup")).label=e.text:void 0!==(t=document.createElement("option")).textContent?t.textContent=e.text:t.innerText=e.text,void 0!==e.id&&(t.value=e.id),e.disabled&&(t.disabled=!0),e.selected&&(t.selected=!0),e.title&&(t.title=e.title);e=this._normalizeItem(e);return e.element=t,a.StoreData(t,"data",e),l(t)},n.prototype.item=function(e){var t={};if(null!=(t=a.GetData(e[0],"data")))return t;var n=e[0];if("option"===n.tagName.toLowerCase())t={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if("optgroup"===n.tagName.toLowerCase()){t={text:e.prop("label"),children:[],title:e.prop("title")};for(var s=e.children("option"),i=[],r=0;r<s.length;r++){var o=l(s[r]),o=this.item(o);i.push(o)}t.children=i}return(t=this._normalizeItem(t)).element=e[0],a.StoreData(e[0],"data",t),t},n.prototype._normalizeItem=function(e){e!==Object(e)&&(e={id:e,text:e});return null!=(e=l.extend({},{text:""},e)).id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),l.extend({},{selected:!1,disabled:!1},e)},n.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},n}),u.define("select2/data/array",["./select","../utils","jquery"],function(e,t,c){function s(e,t){this._dataToConvert=t.get("data")||[],s.__super__.constructor.call(this,e,t)}return t.Extend(s,e),s.prototype.bind=function(e,t){s.__super__.bind.call(this,e,t),this.addOptions(this.convertToOptions(this._dataToConvert))},s.prototype.select=function(n){var e=this.$element.find("option").filter(function(e,t){return t.value==n.id.toString()});0===e.length&&(e=this.option(n),this.addOptions(e)),s.__super__.select.call(this,n)},s.prototype.convertToOptions=function(e){var t=this,n=this.$element.find("option"),s=n.map(function(){return t.item(c(this)).id}).get(),i=[];for(var r=0;r<e.length;r++){var o,a,l=this._normalizeItem(e[r]);0<=s.indexOf(l.id)?(o=n.filter(function(e){return function(){return c(this).val()==e.id}}(l)),a=this.item(o),a=c.extend(!0,{},l,a),a=this.option(a),o.replaceWith(a)):(a=this.option(l),l.children&&(l=this.convertToOptions(l.children),a.append(l)),i.push(a))}return i},s}),u.define("select2/data/ajax",["./array","../utils","jquery"],function(e,t,r){function n(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),n.__super__.constructor.call(this,e,t)}return t.Extend(n,e),n.prototype._applyDefaults=function(e){var t={data:function(e){return r.extend({},e,{q:e.term})},transport:function(e,t,n){e=r.ajax(e);return e.then(t),e.fail(n),e}};return r.extend({},t,e,!0)},n.prototype.processResults=function(e){return e},n.prototype.query=function(t,n){var s=this;null!=this._request&&("function"==typeof this._request.abort&&this._request.abort(),this._request=null);var i=r.extend({type:"GET"},this.ajaxOptions);function e(){var e=i.transport(i,function(e){e=s.processResults(e,t);s.options.get("debug")&&window.console&&console.error&&(e&&e.results&&Array.isArray(e.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),n(e)},function(){"status"in e&&(0===e.status||"0"===e.status)||s.trigger("results:message",{message:"errorLoading"})});s._request=e}"function"==typeof i.url&&(i.url=i.url.call(this.$element,t)),"function"==typeof i.data&&(i.data=i.data.call(this.$element,t)),this.ajaxOptions.delay&&null!=t.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(e,this.ajaxOptions.delay)):e()},n}),u.define("select2/data/tags",["jquery"],function(t){function e(e,t,n){var s=n.get("tags"),i=n.get("createTag");void 0!==i&&(this.createTag=i);i=n.get("insertTag");if(void 0!==i&&(this.insertTag=i),e.call(this,t,n),Array.isArray(s))for(var r=0;r<s.length;r++){var o=s[r],o=this._normalizeItem(o),o=this.option(o);this.$element.append(o)}}return e.prototype.query=function(e,c,u){var d=this;this._removeOldTags(),null!=c.term&&null==c.page?e.call(this,c,function e(t,n){for(var s=t.results,i=0;i<s.length;i++){var r=s[i],o=null!=r.children&&!e({results:r.children},!0);if((r.text||"").toUpperCase()===(c.term||"").toUpperCase()||o)return!n&&(t.data=s,void u(t))}if(n)return!0;var a,l=d.createTag(c);null!=l&&((a=d.option(l)).attr("data-select2-tag","true"),d.addOptions([a]),d.insertTag(s,l)),t.results=s,u(t)}):e.call(this,c,u)},e.prototype.createTag=function(e,t){if(null==t.term)return null;t=t.term.trim();return""===t?null:{id:t,text:t}},e.prototype.insertTag=function(e,t,n){t.unshift(n)},e.prototype._removeOldTags=function(e){this.$element.find("option[data-select2-tag]").each(function(){this.selected||t(this).remove()})},e}),u.define("select2/data/tokenizer",["jquery"],function(c){function e(e,t,n){var s=n.get("tokenizer");void 0!==s&&(this.tokenizer=s),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){e.call(this,t,n),this.$search=t.dropdown.$search||t.selection.$search||n.find(".select2-search__field")},e.prototype.query=function(e,t,n){var s=this;t.term=t.term||"";var i=this.tokenizer(t,this.options,function(e){var t,n=s._normalizeItem(e);s.$element.find("option").filter(function(){return c(this).val()===n.id}).length||((t=s.option(n)).attr("data-select2-tag",!0),s._removeOldTags(),s.addOptions([t])),t=n,s.trigger("select",{data:t})});i.term!==t.term&&(this.$search.length&&(this.$search.val(i.term),this.$search.trigger("focus")),t.term=i.term),e.call(this,t,n)},e.prototype.tokenizer=function(e,t,n,s){for(var i=n.get("tokenSeparators")||[],r=t.term,o=0,a=this.createTag||function(e){return{id:e.term,text:e.term}};o<r.length;){var l=r[o];-1!==i.indexOf(l)?(l=r.substr(0,o),null!=(l=a(c.extend({},t,{term:l})))?(s(l),r=r.substr(o+1)||"",o=0):o++):o++}return{term:r}},e}),u.define("select2/data/minimumInputLength",[],function(){function e(e,t,n){this.minimumInputLength=n.get("minimumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",t.term.length<this.minimumInputLength?this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),u.define("select2/data/maximumInputLength",[],function(){function e(e,t,n){this.maximumInputLength=n.get("maximumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",0<this.maximumInputLength&&t.term.length>this.maximumInputLength?this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),u.define("select2/data/maximumSelectionLength",[],function(){function e(e,t,n){this.maximumSelectionLength=n.get("maximumSelectionLength"),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("select",function(){s._checkIfMaximumSelected()})},e.prototype.query=function(e,t,n){var s=this;this._checkIfMaximumSelected(function(){e.call(s,t,n)})},e.prototype._checkIfMaximumSelected=function(e,t){var n=this;this.current(function(e){e=null!=e?e.length:0;0<n.maximumSelectionLength&&e>=n.maximumSelectionLength?n.trigger("results:message",{message:"maximumSelected",args:{maximum:n.maximumSelectionLength}}):t&&t()})},e}),u.define("select2/dropdown",["jquery","./utils"],function(t,e){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return e.Extend(n,e.Observable),n.prototype.render=function(){var e=t('<span class="select2-dropdown"><span class="select2-results"></span></span>');return e.attr("dir",this.options.get("dir")),this.$dropdown=e},n.prototype.bind=function(){},n.prototype.position=function(e,t){},n.prototype.destroy=function(){this.$dropdown.remove()},n}),u.define("select2/dropdown/search",["jquery"],function(r){function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("translations").get("search"),e=r('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');return this.$searchContainer=e,this.$search=e.find("input"),this.$search.prop("autocomplete",this.options.get("autocomplete")),this.$search.attr("aria-label",n()),t.prepend(e),t},e.prototype.bind=function(e,t,n){var s=this,i=t.id+"-results";e.call(this,t,n),this.$search.on("keydown",function(e){s.trigger("keypress",e),s._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(e){r(this).off("keyup")}),this.$search.on("keyup input",function(e){s.handleSearch(e)}),t.on("open",function(){s.$search.attr("tabindex",0),s.$search.attr("aria-controls",i),s.$search.trigger("focus"),window.setTimeout(function(){s.$search.trigger("focus")},0)}),t.on("close",function(){s.$search.attr("tabindex",-1),s.$search.removeAttr("aria-controls"),s.$search.removeAttr("aria-activedescendant"),s.$search.val(""),s.$search.trigger("blur")}),t.on("focus",function(){t.isOpen()||s.$search.trigger("focus")}),t.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(s.showSearch(e)?s.$searchContainer[0].classList.remove("select2-search--hide"):s.$searchContainer[0].classList.add("select2-search--hide"))}),t.on("results:focus",function(e){e.data._resultId?s.$search.attr("aria-activedescendant",e.data._resultId):s.$search.removeAttr("aria-activedescendant")})},e.prototype.handleSearch=function(e){var t;this._keyUpPrevented||(t=this.$search.val(),this.trigger("query",{term:t})),this._keyUpPrevented=!1},e.prototype.showSearch=function(e,t){return!0},e}),u.define("select2/dropdown/hidePlaceholder",[],function(){function e(e,t,n,s){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n,s)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return t="string"==typeof t?{id:"",text:t}:t},e.prototype.removePlaceholder=function(e,t){for(var n=t.slice(0),s=t.length-1;0<=s;s--){var i=t[s];this.placeholder.id===i.id&&n.splice(s,1)}return n},e}),u.define("select2/dropdown/infiniteScroll",["jquery"],function(n){function e(e,t,n,s){this.lastParams={},e.call(this,t,n,s),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return e.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&(this.$results.append(this.$loadingMore),this.loadMoreIfNeeded())},e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("query",function(e){s.lastParams=e,s.loading=!0}),t.on("query:append",function(e){s.lastParams=e,s.loading=!0}),this.$results.on("scroll",this.loadMoreIfNeeded.bind(this))},e.prototype.loadMoreIfNeeded=function(){var e=n.contains(document.documentElement,this.$loadingMore[0]);!this.loading&&e&&(e=this.$results.offset().top+this.$results.outerHeight(!1),this.$loadingMore.offset().top+this.$loadingMore.outerHeight(!1)<=e+50&&this.loadMore())},e.prototype.loadMore=function(){this.loading=!0;var e=n.extend({},{page:1},this.lastParams);e.page++,this.trigger("query:append",e)},e.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},e.prototype.createLoadingMore=function(){var e=n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),t=this.options.get("translations").get("loadingMore");return e.html(t(this.lastParams)),e},e}),u.define("select2/dropdown/attachBody",["jquery","../utils"],function(u,o){function e(e,t,n){this.$dropdownParent=u(n.get("dropdownParent")||document.body),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("open",function(){s._showDropdown(),s._attachPositioningHandler(t),s._bindContainerResultHandlers(t)}),t.on("close",function(){s._hideDropdown(),s._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},e.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},e.prototype.position=function(e,t,n){t.attr("class",n.attr("class")),t[0].classList.remove("select2"),t[0].classList.add("select2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=n},e.prototype.render=function(e){var t=u("<span></span>"),e=e.call(this);return t.append(e),this.$dropdownContainer=t},e.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},e.prototype._bindContainerResultHandlers=function(e,t){var n;this._containerResultsHandlersBound||(n=this,t.on("results:all",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:append",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:message",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("select",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("unselect",function(){n._positionDropdown(),n._resizeDropdown()}),this._containerResultsHandlersBound=!0)},e.prototype._attachPositioningHandler=function(e,t){var n=this,s="scroll.select2."+t.id,i="resize.select2."+t.id,r="orientationchange.select2."+t.id,t=this.$container.parents().filter(o.hasScroll);t.each(function(){o.StoreData(this,"select2-scroll-position",{x:u(this).scrollLeft(),y:u(this).scrollTop()})}),t.on(s,function(e){var t=o.GetData(this,"select2-scroll-position");u(this).scrollTop(t.y)}),u(window).on(s+" "+i+" "+r,function(e){n._positionDropdown(),n._resizeDropdown()})},e.prototype._detachPositioningHandler=function(e,t){var n="scroll.select2."+t.id,s="resize.select2."+t.id,t="orientationchange.select2."+t.id;this.$container.parents().filter(o.hasScroll).off(n),u(window).off(n+" "+s+" "+t)},e.prototype._positionDropdown=function(){var e=u(window),t=this.$dropdown[0].classList.contains("select2-dropdown--above"),n=this.$dropdown[0].classList.contains("select2-dropdown--below"),s=null,i=this.$container.offset();i.bottom=i.top+this.$container.outerHeight(!1);var r={height:this.$container.outerHeight(!1)};r.top=i.top,r.bottom=i.top+r.height;var o=this.$dropdown.outerHeight(!1),a=e.scrollTop(),l=e.scrollTop()+e.height(),c=a<i.top-o,e=l>i.bottom+o,a={left:i.left,top:r.bottom},l=this.$dropdownParent;"static"===l.css("position")&&(l=l.offsetParent());i={top:0,left:0};(u.contains(document.body,l[0])||l[0].isConnected)&&(i=l.offset()),a.top-=i.top,a.left-=i.left,t||n||(s="below"),e||!c||t?!c&&e&&t&&(s="below"):s="above",("above"==s||t&&"below"!==s)&&(a.top=r.top-i.top-o),null!=s&&(this.$dropdown[0].classList.remove("select2-dropdown--below"),this.$dropdown[0].classList.remove("select2-dropdown--above"),this.$dropdown[0].classList.add("select2-dropdown--"+s),this.$container[0].classList.remove("select2-container--below"),this.$container[0].classList.remove("select2-container--above"),this.$container[0].classList.add("select2-container--"+s)),this.$dropdownContainer.css(a)},e.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},e.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},e}),u.define("select2/dropdown/minimumResultsForSearch",[],function(){function e(e,t,n,s){this.minimumResultsForSearch=n.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,n,s)}return e.prototype.showSearch=function(e,t){return!(function e(t){for(var n=0,s=0;s<t.length;s++){var i=t[s];i.children?n+=e(i.children):n++}return n}(t.data.results)<this.minimumResultsForSearch)&&e.call(this,t)},e}),u.define("select2/dropdown/selectOnClose",["../utils"],function(s){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("close",function(e){s._handleSelectOnClose(e)})},e.prototype._handleSelectOnClose=function(e,t){if(t&&null!=t.originalSelect2Event){var n=t.originalSelect2Event;if("select"===n._type||"unselect"===n._type)return}n=this.getHighlightedResults();n.length<1||(null!=(n=s.GetData(n[0],"data")).element&&n.element.selected||null==n.element&&n.selected||this.trigger("select",{data:n}))},e}),u.define("select2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("select",function(e){s._selectTriggered(e)}),t.on("unselect",function(e){s._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var n=t.originalEvent;n&&(n.ctrlKey||n.metaKey)||this.trigger("close",{originalEvent:n,originalSelect2Event:t})},e}),u.define("select2/dropdown/dropdownCss",["../utils"],function(n){function e(){}return e.prototype.render=function(e){var t=e.call(this),e=this.options.get("dropdownCssClass")||"";return-1!==e.indexOf(":all:")&&(e=e.replace(":all:",""),n.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(e),t},e}),u.define("select2/dropdown/tagsSearchHighlight",["../utils"],function(s){function e(){}return e.prototype.highlightFirstItem=function(e){var t=this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)");if(0<t.length){var n=t.first(),t=s.GetData(n[0],"data").element;if(t&&t.getAttribute&&"true"===t.getAttribute("data-select2-tag"))return void n.trigger("mouseenter")}e.call(this)},e}),u.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,e="Please delete "+t+" character";return 1!=t&&(e+="s"),e},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"},removeAllItems:function(){return"Remove all items"},removeItem:function(){return"Remove item"},search:function(){return"Search"}}}),u.define("select2/defaults",["jquery","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/selectionCss","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./dropdown/dropdownCss","./dropdown/tagsSearchHighlight","./i18n/en"],function(l,r,o,a,c,u,d,p,h,f,g,t,m,y,v,_,b,$,w,x,A,D,S,E,O,C,L,T,q,I,e){function n(){this.reset()}return n.prototype.apply=function(e){var t;null==(e=l.extend(!0,{},this.defaults,e)).dataAdapter&&(null!=e.ajax?e.dataAdapter=v:null!=e.data?e.dataAdapter=y:e.dataAdapter=m,0<e.minimumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,$)),0<e.maximumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,w)),0<e.maximumSelectionLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,x)),e.tags&&(e.dataAdapter=f.Decorate(e.dataAdapter,_)),null==e.tokenSeparators&&null==e.tokenizer||(e.dataAdapter=f.Decorate(e.dataAdapter,b))),null==e.resultsAdapter&&(e.resultsAdapter=r,null!=e.ajax&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,E)),null!=e.placeholder&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,S)),e.selectOnClose&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,L)),e.tags&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,I))),null==e.dropdownAdapter&&(e.multiple?e.dropdownAdapter=A:(t=f.Decorate(A,D),e.dropdownAdapter=t),0!==e.minimumResultsForSearch&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,C)),e.closeOnSelect&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,T)),null!=e.dropdownCssClass&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,q)),e.dropdownAdapter=f.Decorate(e.dropdownAdapter,O)),null==e.selectionAdapter&&(e.multiple?e.selectionAdapter=a:e.selectionAdapter=o,null!=e.placeholder&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,c)),e.allowClear&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,u)),e.multiple&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,d)),null!=e.selectionCssClass&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,p)),e.selectionAdapter=f.Decorate(e.selectionAdapter,h)),e.language=this._resolveLanguage(e.language),e.language.push("en");for(var n=[],s=0;s<e.language.length;s++){var i=e.language[s];-1===n.indexOf(i)&&n.push(i)}return e.language=n,e.translations=this._processTranslations(e.language,e.debug),e},n.prototype.reset=function(){function a(e){return e.replace(/[^\u0000-\u007E]/g,function(e){return t[e]||e})}this.defaults={amdLanguageBase:"./i18n/",autocomplete:"off",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:f.escapeMarkup,language:{},matcher:function e(t,n){if(null==t.term||""===t.term.trim())return n;if(n.children&&0<n.children.length){for(var s=l.extend(!0,{},n),i=n.children.length-1;0<=i;i--)null==e(t,n.children[i])&&s.children.splice(i,1);return 0<s.children.length?s:e(t,s)}var r=a(n.text).toUpperCase(),o=a(t.term).toUpperCase();return-1<r.indexOf(o)?n:null},minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,scrollAfterSelect:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},n.prototype.applyFromElement=function(e,t){var n=e.language,s=this.defaults.language,i=t.prop("lang"),t=t.closest("[lang]").prop("lang"),t=Array.prototype.concat.call(this._resolveLanguage(i),this._resolveLanguage(n),this._resolveLanguage(s),this._resolveLanguage(t));return e.language=t,e},n.prototype._resolveLanguage=function(e){if(!e)return[];if(l.isEmptyObject(e))return[];if(l.isPlainObject(e))return[e];for(var t,n=Array.isArray(e)?e:[e],s=[],i=0;i<n.length;i++)s.push(n[i]),"string"==typeof n[i]&&0<n[i].indexOf("-")&&(t=n[i].split("-")[0],s.push(t));return s},n.prototype._processTranslations=function(e,t){for(var n=new g,s=0;s<e.length;s++){var i=new g,r=e[s];if("string"==typeof r)try{i=g.loadPath(r)}catch(e){try{r=this.defaults.amdLanguageBase+r,i=g.loadPath(r)}catch(e){t&&window.console&&console.warn&&console.warn('Select2: The language file for "'+r+'" could not be automatically loaded. A fallback will be used instead.')}}else i=l.isPlainObject(r)?new g(r):r;n.extend(i)}return n},n.prototype.set=function(e,t){var n={};n[l.camelCase(e)]=t;n=f._convertData(n);l.extend(!0,this.defaults,n)},new n}),u.define("select2/options",["jquery","./defaults","./utils"],function(c,n,u){function e(e,t){this.options=e,null!=t&&this.fromElement(t),null!=t&&(this.options=n.applyFromElement(this.options,t)),this.options=n.apply(this.options)}return e.prototype.fromElement=function(e){var t=["select2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.autocomplete&&e.prop("autocomplete")&&(this.options.autocomplete=e.prop("autocomplete")),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),u.GetData(e[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),u.StoreData(e[0],"data",u.GetData(e[0],"select2Tags")),u.StoreData(e[0],"tags",!0)),u.GetData(e[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),e.attr("ajax--url",u.GetData(e[0],"ajaxUrl")),u.StoreData(e[0],"ajax-Url",u.GetData(e[0],"ajaxUrl")));var n={};function s(e,t){return t.toUpperCase()}for(var i=0;i<e[0].attributes.length;i++){var r=e[0].attributes[i].name,o="data-";r.substr(0,o.length)==o&&(r=r.substring(o.length),o=u.GetData(e[0],r),n[r.replace(/-([a-z])/g,s)]=o)}c.fn.jquery&&"1."==c.fn.jquery.substr(0,2)&&e[0].dataset&&(n=c.extend(!0,{},e[0].dataset,n));var a,l=c.extend(!0,{},u.GetData(e[0]),n);for(a in l=u._convertData(l))-1<t.indexOf(a)||(c.isPlainObject(this.options[a])?c.extend(this.options[a],l[a]):this.options[a]=l[a]);return this},e.prototype.get=function(e){return this.options[e]},e.prototype.set=function(e,t){this.options[e]=t},e}),u.define("select2/core",["jquery","./options","./utils","./keys"],function(t,i,r,s){var o=function(e,t){null!=r.GetData(e[0],"select2")&&r.GetData(e[0],"select2").destroy(),this.$element=e,this.id=this._generateId(e),t=t||{},this.options=new i(t,e),o.__super__.constructor.call(this);var n=e.attr("tabindex")||0;r.StoreData(e[0],"old-tabindex",n),e.attr("tabindex","-1");t=this.options.get("dataAdapter");this.dataAdapter=new t(e,this.options);n=this.render();this._placeContainer(n);t=this.options.get("selectionAdapter");this.selection=new t(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,n);t=this.options.get("dropdownAdapter");this.dropdown=new t(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,n);n=this.options.get("resultsAdapter");this.results=new n(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var s=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){s.trigger("selection:update",{data:e})}),e[0].classList.add("select2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),r.StoreData(e[0],"select2",this),e.data("select2",this)};return r.Extend(o,r.Observable),o.prototype._generateId=function(e){return"select2-"+(null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+r.generateChars(2):r.generateChars(4)).replace(/(:|\.|\[|\]|,)/g,"")},o.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},o.prototype._resolveWidth=function(e,t){var n=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var s=this._resolveWidth(e,"style");return null!=s?s:this._resolveWidth(e,"element")}if("element"==t){s=e.outerWidth(!1);return s<=0?"auto":s+"px"}if("style"!=t)return"computedstyle"!=t?t:window.getComputedStyle(e[0]).width;e=e.attr("style");if("string"!=typeof e)return null;for(var i=e.split(";"),r=0,o=i.length;r<o;r+=1){var a=i[r].replace(/\s/g,"").match(n);if(null!==a&&1<=a.length)return a[1]}return null},o.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},o.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.select2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.select2",function(e){t.trigger("focus",e)}),this._syncA=r.bind(this._syncAttributes,this),this._syncS=r.bind(this._syncSubtree,this),this._observer=new window.MutationObserver(function(e){t._syncA(),t._syncS(e)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})},o.prototype._registerDataEvents=function(){var n=this;this.dataAdapter.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerSelectionEvents=function(){var n=this,s=["toggle","focus"];this.selection.on("toggle",function(){n.toggleDropdown()}),this.selection.on("focus",function(e){n.focus(e)}),this.selection.on("*",function(e,t){-1===s.indexOf(e)&&n.trigger(e,t)})},o.prototype._registerDropdownEvents=function(){var n=this;this.dropdown.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerResultsEvents=function(){var n=this;this.results.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerEvents=function(){var n=this;this.on("open",function(){n.$container[0].classList.add("select2-container--open")}),this.on("close",function(){n.$container[0].classList.remove("select2-container--open")}),this.on("enable",function(){n.$container[0].classList.remove("select2-container--disabled")}),this.on("disable",function(){n.$container[0].classList.add("select2-container--disabled")}),this.on("blur",function(){n.$container[0].classList.remove("select2-container--focus")}),this.on("query",function(t){n.isOpen()||n.trigger("open",{}),this.dataAdapter.query(t,function(e){n.trigger("results:all",{data:e,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(e){n.trigger("results:append",{data:e,query:t})})}),this.on("keypress",function(e){var t=e.which;n.isOpen()?t===s.ESC||t===s.UP&&e.altKey?(n.close(e),e.preventDefault()):t===s.ENTER||t===s.TAB?(n.trigger("results:select",{}),e.preventDefault()):t===s.SPACE&&e.ctrlKey?(n.trigger("results:toggle",{}),e.preventDefault()):t===s.UP?(n.trigger("results:previous",{}),e.preventDefault()):t===s.DOWN&&(n.trigger("results:next",{}),e.preventDefault()):(t===s.ENTER||t===s.SPACE||t===s.DOWN&&e.altKey)&&(n.open(),e.preventDefault())})},o.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.isDisabled()?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},o.prototype._isChangeMutation=function(e){var t=this;if(e.addedNodes&&0<e.addedNodes.length){for(var n=0;n<e.addedNodes.length;n++)if(e.addedNodes[n].selected)return!0}else{if(e.removedNodes&&0<e.removedNodes.length)return!0;if(Array.isArray(e))return e.some(function(e){return t._isChangeMutation(e)})}return!1},o.prototype._syncSubtree=function(e){var e=this._isChangeMutation(e),t=this;e&&this.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})},o.prototype.trigger=function(e,t){var n=o.__super__.trigger,s={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===t&&(t={}),e in s){var i=s[e],s={prevented:!1,name:e,args:t};if(n.call(this,i,s),s.prevented)return void(t.prevented=!0)}n.call(this,e,t)},o.prototype.toggleDropdown=function(){this.isDisabled()||(this.isOpen()?this.close():this.open())},o.prototype.open=function(){this.isOpen()||this.isDisabled()||this.trigger("query",{})},o.prototype.close=function(e){this.isOpen()&&this.trigger("close",{originalEvent:e})},o.prototype.isEnabled=function(){return!this.isDisabled()},o.prototype.isDisabled=function(){return this.options.get("disabled")},o.prototype.isOpen=function(){return this.$container[0].classList.contains("select2-container--open")},o.prototype.hasFocus=function(){return this.$container[0].classList.contains("select2-container--focus")},o.prototype.focus=function(e){this.hasFocus()||(this.$container[0].classList.add("select2-container--focus"),this.trigger("focus",{}))},o.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.');e=!(e=null==e||0===e.length?[!0]:e)[0];this.$element.prop("disabled",e)},o.prototype.data=function(){this.options.get("debug")&&0<arguments.length&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var t=[];return this.dataAdapter.current(function(e){t=e}),t},o.prototype.val=function(e){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==e||0===e.length)return this.$element.val();e=e[0];Array.isArray(e)&&(e=e.map(function(e){return e.toString()})),this.$element.val(e).trigger("input").trigger("change")},o.prototype.destroy=function(){r.RemoveData(this.$container[0]),this.$container.remove(),this._observer.disconnect(),this._observer=null,this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",r.GetData(this.$element[0],"old-tabindex")),this.$element[0].classList.remove("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),r.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},o.prototype.render=function(){var e=t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return e.attr("dir",this.options.get("dir")),this.$container=e,this.$container[0].classList.add("select2-container--"+this.options.get("theme")),r.StoreData(e[0],"element",this.$element),e},o}),u.define("jquery-mousewheel",["jquery"],function(e){return e}),u.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(i,e,r,t,o){var a;return null==i.fn.select2&&(a=["open","close","destroy"],i.fn.select2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var e=i.extend(!0,{},t);new r(i(this),e)}),this;if("string"!=typeof t)throw new Error("Invalid arguments for Select2: "+t);var n,s=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=o.GetData(this,"select2");null==e&&window.console&&console.error&&console.error("The select2('"+t+"') method was called on an element that is not using Select2."),n=e[t].apply(e,s)}),-1<a.indexOf(t)?this:n}),null==i.fn.select2.defaults&&(i.fn.select2.defaults=t),r}),{define:u.define,require:u.require});function b(e,t){return i.call(e,t)}function l(e,t){var n,s,i,r,o,a,l,c,u,d,p=t&&t.split("/"),h=y.map,f=h&&h["*"]||{};if(e){for(t=(e=e.split("/")).length-1,y.nodeIdCompat&&_.test(e[t])&&(e[t]=e[t].replace(_,"")),"."===e[0].charAt(0)&&p&&(e=p.slice(0,p.length-1).concat(e)),c=0;c<e.length;c++)"."===(d=e[c])?(e.splice(c,1),--c):".."===d&&(0===c||1===c&&".."===e[2]||".."===e[c-1]||0<c&&(e.splice(c-1,2),c-=2));e=e.join("/")}if((p||f)&&h){for(c=(n=e.split("/")).length;0<c;--c){if(s=n.slice(0,c).join("/"),p)for(u=p.length;0<u;--u)if(i=h[p.slice(0,u).join("/")],i=i&&i[s]){r=i,o=c;break}if(r)break;!a&&f&&f[s]&&(a=f[s],l=c)}!r&&a&&(r=a,o=l),r&&(n.splice(0,o,r),e=n.join("/"))}return e}function w(t,n){return function(){var e=a.call(arguments,0);return"string"!=typeof e[0]&&1===e.length&&e.push(null),o.apply(p,e.concat([t,n]))}}function x(e){var t;if(b(m,e)&&(t=m[e],delete m[e],v[e]=!0,r.apply(p,t)),!b(g,e)&&!b(v,e))throw new Error("No "+e);return g[e]}function c(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function A(e){return e?c(e):[]}var u=s.require("jquery.select2");return t.fn.select2.amd=s,u});
(() => {
  // packages/alpinejs/src/scheduler.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  var lastFlushedIndex = -1;
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1 && index > lastFlushedIndex)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
      lastFlushedIndex = i;
    }
    queue.length = 0;
    lastFlushedIndex = -1;
    flushing = false;
  }

  // packages/alpinejs/src/reactivity.js
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  function watch(getter, callback) {
    let firstTime = true;
    let oldValue;
    let effectReference = effect(() => {
      let value = getter();
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    });
    return () => release(effectReference);
  }

  // packages/alpinejs/src/mutation.js
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  function cleanupElement(el) {
    if (el._x_cleanups) {
      while (el._x_cleanups.length)
        el._x_cleanups.pop()();
    }
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var queuedMutations = [];
  function flushObserver() {
    let records = observer.takeRecords();
    queuedMutations.push(() => records.length > 0 && onMutate(records));
    let queueLengthWhenTriggered = queuedMutations.length;
    queueMicrotask(() => {
      if (queuedMutations.length === queueLengthWhenTriggered) {
        while (queuedMutations.length > 0)
          queuedMutations.shift()();
      }
    });
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = /* @__PURE__ */ new Set();
    let removedNodes = /* @__PURE__ */ new Set();
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
        mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.has(node))
        continue;
      onElRemoveds.forEach((i) => i(node));
    }
    addedNodes.forEach((node) => {
      node._x_ignoreSelf = true;
      node._x_ignore = true;
    });
    for (let node of addedNodes) {
      if (removedNodes.has(node))
        continue;
      if (!node.isConnected)
        continue;
      delete node._x_ignoreSelf;
      delete node._x_ignore;
      onElAddeds.forEach((i) => i(node));
      node._x_ignore = true;
      node._x_ignoreSelf = true;
    }
    addedNodes.forEach((node) => {
      delete node._x_ignoreSelf;
      delete node._x_ignore;
    });
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }

  // packages/alpinejs/src/scope.js
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    return new Proxy({ objects }, mergeProxyTrap);
  }
  var mergeProxyTrap = {
    ownKeys({ objects }) {
      return Array.from(
        new Set(objects.flatMap((i) => Object.keys(i)))
      );
    },
    has({ objects }, name) {
      if (name == Symbol.unscopables)
        return false;
      return objects.some(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
      );
    },
    get({ objects }, name, thisProxy) {
      if (name == "toJSON")
        return collapseProxies;
      return Reflect.get(
        objects.find(
          (obj) => Reflect.has(obj, name)
        ) || {},
        name,
        thisProxy
      );
    },
    set({ objects }, name, value, thisProxy) {
      const target = objects.find(
        (obj) => Object.prototype.hasOwnProperty.call(obj, name)
      ) || objects[objects.length - 1];
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.set && descriptor?.get)
        return descriptor.set.call(thisProxy, value) || true;
      return Reflect.set(target, name, value);
    }
  };
  function collapseProxies() {
    let keys = Reflect.ownKeys(this);
    return keys.reduce((acc, key) => {
      acc[key] = Reflect.get(this, key);
      return acc;
    }, {});
  }

  // packages/alpinejs/src/interceptor.js
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        if (typeof value === "object" && value !== null && value.__v_skip)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }

  // packages/alpinejs/src/magics.js
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback]) => {
      let memoizedUtilities = null;
      function getUtilities() {
        if (memoizedUtilities) {
          return memoizedUtilities;
        } else {
          let [utilities, cleanup2] = getElementBoundUtilities(el);
          memoizedUtilities = { interceptor, ...utilities };
          onElRemoved(el, cleanup2);
          return memoizedUtilities;
        }
      }
      Object.defineProperty(obj, `$${name}`, {
        get() {
          return callback(el, getUtilities());
        },
        enumerable: false
      });
    });
    return obj;
  }

  // packages/alpinejs/src/utils/error.js
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    error2 = Object.assign(
      error2 ?? { message: "No error message given." },
      { el, expression }
    );
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }

  // packages/alpinejs/src/evaluator.js
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    let result = callback();
    shouldAutoEvaluateFunctions = cache;
    return result;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        let func2 = new AsyncFunction(
          ["__self", "scope"],
          `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
        );
        Object.defineProperty(func2, "name", {
          value: `[Alpine] ${expression}`
        });
        return func2;
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else if (typeof value === "object" && value instanceof Promise) {
      value.then((i) => receiver(i));
    } else {
      receiver(value);
    }
  }

  // packages/alpinejs/src/directives.js
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
    return {
      before(directive2) {
        if (!directiveHandlers[directive2]) {
          console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
          return;
        }
        const pos = directiveOrder.indexOf(directive2);
        directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
      }
    };
  }
  function directiveExists(name) {
    return Object.keys(directiveHandlers).includes(name);
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler4 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler4.inline && handler4.inline(el, directive2, utilities);
      handler4 = handler4.bind(handler4, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "anchor",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }

  // packages/alpinejs/src/utils/dispatch.js
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        // Allows events to pass the shadow DOM barrier.
        composed: true,
        cancelable: true
      })
    );
  }

  // packages/alpinejs/src/utils/walk.js
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }

  // packages/alpinejs/src/utils/warn.js
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }

  // packages/alpinejs/src/lifecycle.js
  var started = false;
  function start() {
    if (started)
      warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
    started = true;
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
    setTimeout(() => {
      warnAboutMissingPlugins();
    });
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  var initInterceptors2 = [];
  function interceptInit(callback) {
    initInterceptors2.push(callback);
  }
  function initTree(el, walker = walk, intercept = () => {
  }) {
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        intercept(el2, skip);
        initInterceptors2.forEach((i) => i(el2, skip));
        directives(el2, el2.attributes).forEach((handle) => handle());
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root, walker = walk) {
    walker(root, (el) => {
      cleanupAttributes(el);
      cleanupElement(el);
    });
  }
  function warnAboutMissingPlugins() {
    let pluginDirectives = [
      ["ui", "dialog", ["[x-dialog], [x-popover]"]],
      ["anchor", "anchor", ["[x-anchor]"]],
      ["sort", "sort", ["[x-sort]"]]
    ];
    pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
      if (directiveExists(directive2))
        return;
      selectors.some((selector) => {
        if (document.querySelector(selector)) {
          warn(`found "${selector}", but missing ${plugin2} plugin`);
          return true;
        }
      });
    });
  }

  // packages/alpinejs/src/nextTick.js
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }

  // packages/alpinejs/src/utils/classes.js
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }

  // packages/alpinejs/src/utils/styles.js
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

  // packages/alpinejs/src/utils/once.js
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }

  // packages/alpinejs/src/directives/x-transition.js
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (expression === false)
      return;
    if (!expression || typeof expression === "boolean") {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      "enter": (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      "leave": (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0) / 1e3;
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: `${delay}s`,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide));
      el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i?.());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration" || key === "delay") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }

  // packages/alpinejs/src/clone.js
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function onlyDuringClone(callback) {
    return (...args) => isCloning && callback(...args);
  }
  var interceptors = [];
  function interceptClone(callback) {
    interceptors.push(callback);
  }
  function cloneNode(from, to) {
    interceptors.forEach((i) => i(from, to));
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      initTree(to, (el, callback) => {
        callback(el, () => {
        });
      });
    });
    isCloning = false;
  }
  var isCloningLegacy = false;
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    isCloningLegacy = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
    isCloningLegacy = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }

  // packages/alpinejs/src/utils/bind.js
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      case "selected":
      case "checked":
        bindAttributeAndProperty(el, name, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value === void 0 ? "" : value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttributeAndProperty(el, name, value) {
    bindAttribute(el, name, value);
    setPropertyIfChanged(el, name, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function setPropertyIfChanged(el, propName, value) {
    if (el[propName] !== value) {
      el[propName] = value;
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function safeParseBoolean(rawValue) {
    if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
      return true;
    }
    if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
      return false;
    }
    return rawValue ? Boolean(rawValue) : null;
  }
  function isBooleanAttr(attrName) {
    const booleanAttributes = [
      "disabled",
      "checked",
      "required",
      "readonly",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule"
    ];
    return booleanAttributes.includes(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    return getAttributeBinding(el, name, fallback);
  }
  function extractProp(el, name, fallback, extract = true) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
      let binding = el._x_inlineBindings[name];
      binding.extract = extract;
      return dontAutoEvaluateFunctions(() => {
        return evaluate(el, binding.expression);
      });
    }
    return getAttributeBinding(el, name, fallback);
  }
  function getAttributeBinding(el, name, fallback) {
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (attr === "")
      return true;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    return attr;
  }

  // packages/alpinejs/src/utils/debounce.js
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // packages/alpinejs/src/utils/throttle.js
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // packages/alpinejs/src/entangle.js
  function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
    let firstRun = true;
    let outerHash;
    let innerHash;
    let reference = effect(() => {
      let outer = outerGet();
      let inner = innerGet();
      if (firstRun) {
        innerSet(cloneIfObject(outer));
        firstRun = false;
      } else {
        let outerHashLatest = JSON.stringify(outer);
        let innerHashLatest = JSON.stringify(inner);
        if (outerHashLatest !== outerHash) {
          innerSet(cloneIfObject(outer));
        } else if (outerHashLatest !== innerHashLatest) {
          outerSet(cloneIfObject(inner));
        } else {
        }
      }
      outerHash = JSON.stringify(outerGet());
      innerHash = JSON.stringify(innerGet());
    });
    return () => {
      release(reference);
    };
  }
  function cloneIfObject(value) {
    return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
  }

  // packages/alpinejs/src/plugin.js
  function plugin(callback) {
    let callbacks = Array.isArray(callback) ? callback : [callback];
    callbacks.forEach((i) => i(alpine_default));
  }

  // packages/alpinejs/src/store.js
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
    initInterceptors(stores[name]);
  }
  function getStores() {
    return stores;
  }

  // packages/alpinejs/src/binds.js
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      return applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
    return () => {
    };
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
    return () => {
      while (cleanupRunners.length)
        cleanupRunners.pop()();
    };
  }

  // packages/alpinejs/src/datas.js
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }

  // packages/alpinejs/src/alpine.js
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.14.1",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    startObservingMutations,
    stopObservingMutations,
    setReactivityEngine,
    onAttributeRemoved,
    onAttributesAdded,
    closestDataStack,
    skipDuringClone,
    onlyDuringClone,
    addRootSelector,
    addInitSelector,
    interceptClone,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    interceptInit,
    setEvaluator,
    mergeProxies,
    extractProp,
    findClosest,
    onElRemoved,
    closestRoot,
    destroyTree,
    interceptor,
    // INTERNAL: not public API and is subject to change without major release.
    transition,
    // INTERNAL
    setStyles,
    // INTERNAL
    mutateDom,
    directive,
    entangle,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    // INTERNAL
    cloneNode,
    // INTERNAL
    bound: getBinding,
    $data: scope,
    watch,
    walk,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;

  // node_modules/@vue/shared/dist/shared.esm-bundler.js
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

  // node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target[
      "__v_raw"
      /* RAW */
    ];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get$1(this, key);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get$1(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: has$1,
      add,
      set: set$1,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get$1(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has$1.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target[
      "__v_isReadonly"
      /* IS_READONLY */
    ]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* RAW */
    ] && !(isReadonly && target[
      "__v_isReactive"
      /* IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed[
      "__v_raw"
      /* RAW */
    ]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }

  // packages/alpinejs/src/magics/$nextTick.js
  magic("nextTick", () => nextTick);

  // packages/alpinejs/src/magics/$dispatch.js
  magic("dispatch", (el) => dispatch.bind(dispatch, el));

  // packages/alpinejs/src/magics/$watch.js
  magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let getter = () => {
      let value;
      evaluate2((i) => value = i);
      return value;
    };
    let unwatch = watch(getter, callback);
    cleanup2(unwatch);
  });

  // packages/alpinejs/src/magics/$store.js
  magic("store", getStores);

  // packages/alpinejs/src/magics/$data.js
  magic("data", (el) => scope(el));

  // packages/alpinejs/src/magics/$root.js
  magic("root", (el) => closestRoot(el));

  // packages/alpinejs/src/magics/$refs.js
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    findClosest(el, (i) => {
      if (i._x_refs)
        refObjects.push(i._x_refs);
    });
    return refObjects;
  }

  // packages/alpinejs/src/ids.js
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }

  // packages/alpinejs/src/magics/$id.js
  magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
    let cacheKey = `${name}${key ? `-${key}` : ""}`;
    return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
      let root = closestIdRoot(el, name);
      let id = root ? root._x_ids[name] : findAndIncrementId(name);
      return key ? `${name}-${id}-${key}` : `${name}-${id}`;
    });
  });
  interceptClone((from, to) => {
    if (from._x_id) {
      to._x_id = from._x_id;
    }
  });
  function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
    if (!el._x_id)
      el._x_id = {};
    if (el._x_id[cacheKey])
      return el._x_id[cacheKey];
    let output = callback();
    el._x_id[cacheKey] = output;
    cleanup2(() => {
      delete el._x_id[cacheKey];
    });
    return output;
  }

  // packages/alpinejs/src/magics/$el.js
  magic("el", (el) => el);

  // packages/alpinejs/src/magics/index.js
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }

  // packages/alpinejs/src/directives/x-modelable.js
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { "__placeholder": val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      let releaseEntanglement = entangle(
        {
          get() {
            return outerGet();
          },
          set(value) {
            outerSet(value);
          }
        },
        {
          get() {
            return innerGet();
          },
          set(value) {
            innerSet(value);
          }
        }
      );
      cleanup2(releaseEntanglement);
    });
  });

  // packages/alpinejs/src/directives/x-teleport.js
  directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = getTarget(expression);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    el.setAttribute("data-teleport-template", true);
    clone2.setAttribute("data-teleport-target", true);
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    let placeInDom = (clone3, target2, modifiers2) => {
      if (modifiers2.includes("prepend")) {
        target2.parentNode.insertBefore(clone3, target2);
      } else if (modifiers2.includes("append")) {
        target2.parentNode.insertBefore(clone3, target2.nextSibling);
      } else {
        target2.appendChild(clone3);
      }
    };
    mutateDom(() => {
      placeInDom(clone2, target, modifiers);
      skipDuringClone(() => {
        initTree(clone2);
        clone2._x_ignore = true;
      })();
    });
    el._x_teleportPutBack = () => {
      let target2 = getTarget(expression);
      mutateDom(() => {
        placeInDom(el._x_teleport, target2, modifiers);
      });
    };
    cleanup2(() => clone2.remove());
  });
  var teleportContainerDuringClone = document.createElement("div");
  function getTarget(expression) {
    let target = skipDuringClone(() => {
      return document.querySelector(expression);
    }, () => {
      return teleportContainerDuringClone;
    })();
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    return target;
  }

  // packages/alpinejs/src/directives/x-ignore.js
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);

  // packages/alpinejs/src/directives/x-effect.js
  directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
    effect3(evaluateLater(el, expression));
  }));

  // packages/alpinejs/src/utils/on.js
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler4 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = debounce(handler4, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler4 = throttle(handler4, wait);
    }
    if (modifiers.includes("prevent"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("once")) {
      handler4 = wrapHandler(handler4, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler4, options);
      });
    }
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler4 = wrapHandler(handler4, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("self"))
      handler4 = wrapHandler(handler4, (next, e) => {
        e.target === el && next(e);
      });
    if (isKeyEvent(event) || isClickEvent(event)) {
      handler4 = wrapHandler(handler4, (next, e) => {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
        next(e);
      });
    }
    listenerTarget.addEventListener(event, handler4, options);
    return () => {
      listenerTarget.removeEventListener(event, handler4, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    if ([" ", "_"].includes(
      subject
    ))
      return subject;
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isClickEvent(event) {
    return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.includes("throttle")) {
      let debounceIndex = keyModifiers.indexOf("throttle");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (isClickEvent(e.type))
          return false;
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      "ctrl": "control",
      "slash": "/",
      "space": " ",
      "spacebar": " ",
      "cmd": "meta",
      "esc": "escape",
      "up": "arrow-up",
      "down": "arrow-down",
      "left": "arrow-left",
      "right": "arrow-right",
      "period": ".",
      "comma": ",",
      "equal": "=",
      "minus": "-",
      "underscore": "_"
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }

  // packages/alpinejs/src/directives/x-model.js
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let scopeTarget = el;
    if (modifiers.includes("parent")) {
      scopeTarget = el.parentNode;
    }
    let evaluateGet = evaluateLater(scopeTarget, expression);
    let evaluateSet;
    if (typeof expression === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
    } else if (typeof expression === "function" && typeof expression() === "string") {
      evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
    } else {
      evaluateSet = () => {
      };
    }
    let getValue = () => {
      let result;
      evaluateGet((value) => result = value);
      return isGetterSetter(result) ? result.get() : result;
    };
    let setValue = (value) => {
      let result;
      evaluateGet((value2) => result = value2);
      if (isGetterSetter(result)) {
        result.set(value);
      } else {
        evaluateSet(() => {
        }, {
          scope: { "__placeholder": value }
        });
      }
    };
    if (typeof expression === "string" && el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let removeListener = isCloning ? () => {
    } : on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
    if (modifiers.includes("fill")) {
      if ([void 0, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
        setValue(
          getInputValue(el, modifiers, { target: el }, getValue())
        );
      }
    }
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    if (el.form) {
      let removeResetListener = on(el.form, "reset", [], (e) => {
        nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
      });
      cleanup2(() => removeResetListener());
    }
    el._x_model = {
      get() {
        return getValue();
      },
      set(value) {
        setValue(value);
      }
    };
    el._x_forceModelUpdate = (value) => {
      if (value === void 0 && typeof expression === "string" && expression.match(/\./))
        value = "";
      window.fromModel = true;
      mutateDom(() => bind(el, "value", value));
      delete window.fromModel;
    };
    effect3(() => {
      let value = getValue();
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate(value);
    });
  });
  function getInputValue(el, modifiers, event, currentValue) {
    return mutateDom(() => {
      if (event instanceof CustomEvent && event.detail !== void 0)
        return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
      else if (el.type === "checkbox") {
        if (Array.isArray(currentValue)) {
          let newValue = null;
          if (modifiers.includes("number")) {
            newValue = safeParseNumber(event.target.value);
          } else if (modifiers.includes("boolean")) {
            newValue = safeParseBoolean(event.target.value);
          } else {
            newValue = event.target.value;
          }
          return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
        if (modifiers.includes("number")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          });
        } else if (modifiers.includes("boolean")) {
          return Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseBoolean(rawValue);
          });
        }
        return Array.from(event.target.selectedOptions).map((option) => {
          return option.value || option.text;
        });
      } else {
        let newValue;
        if (el.type === "radio") {
          if (event.target.checked) {
            newValue = event.target.value;
          } else {
            newValue = currentValue;
          }
        } else {
          newValue = event.target.value;
        }
        if (modifiers.includes("number")) {
          return safeParseNumber(newValue);
        } else if (modifiers.includes("boolean")) {
          return safeParseBoolean(newValue);
        } else if (modifiers.includes("trim")) {
          return newValue.trim();
        } else {
          return newValue;
        }
      }
    });
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function isGetterSetter(value) {
    return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
  }

  // packages/alpinejs/src/directives/x-cloak.js
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));

  // packages/alpinejs/src/directives/x-init.js
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));

  // packages/alpinejs/src/directives/x-text.js
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });

  // packages/alpinejs/src/directives/x-html.js
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });

  // packages/alpinejs/src/directives/x-bind.js
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
      return;
    }
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
        result = "";
      }
      mutateDom(() => bind(el, value, result, modifiers));
    }));
    cleanup2(() => {
      el._x_undoAddedClasses && el._x_undoAddedClasses();
      el._x_undoAddedStyles && el._x_undoAddedStyles();
    });
  };
  handler2.inline = (el, { value, modifiers, expression }) => {
    if (!value)
      return;
    if (!el._x_inlineBindings)
      el._x_inlineBindings = {};
    el._x_inlineBindings[value] = { expression, extract: false };
  };
  directive("bind", handler2);
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }

  // packages/alpinejs/src/directives/x-data.js
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
    if (shouldSkipRegisteringDataDuringClone(el))
      return;
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    injectMagics(magicContext, el);
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === void 0 || data2 === true)
      data2 = {};
    injectMagics(data2, el);
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  });
  interceptClone((from, to) => {
    if (from._x_dataStack) {
      to._x_dataStack = from._x_dataStack;
      to.setAttribute("data-has-alpine-state", true);
    }
  });
  function shouldSkipRegisteringDataDuringClone(el) {
    if (!isCloning)
      return false;
    if (isCloningLegacy)
      return true;
    return el.hasAttribute("data-has-alpine-state");
  }

  // packages/alpinejs/src/directives/x-show.js
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once(
      (value) => value ? show() : hide(),
      (value) => {
        if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
          el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
        } else {
          value ? clickAwayCompatibleShow() : hide();
        }
      }
    );
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });

  // packages/alpinejs/src/directives/x-for.js
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(
      el,
      // the x-bind:key expression is stored for our use instead of evaluated.
      el._x_keyExpression || "index"
    );
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => el2.remove());
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => {
            if (keys.includes(value2))
              warn("Duplicate key on x-for", el);
            keys.push(value2);
          }, { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => {
            if (keys.includes(value))
              warn("Duplicate key on x-for", el);
            keys.push(value);
          }, { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!!lookup[key]._x_effects) {
          lookup[key]._x_effects.forEach(dequeueJob);
        }
        lookup[key].remove();
        lookup[key] = null;
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          if (!elForSpot)
            warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = (newScope) => {
          Object.entries(newScope).forEach(([key2, value]) => {
            reactiveScope[key2] = value;
          });
        };
        mutateDom(() => {
          lastEl.after(clone2);
          skipDuringClone(() => initTree(clone2))();
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }

  // packages/alpinejs/src/directives/x-ref.js
  function handler3() {
  }
  handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler3);

  // packages/alpinejs/src/directives/x-if.js
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-if can only be used on a <template> tag", el);
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        walk(clone2, (node) => {
          if (!!node._x_effects) {
            node._x_effects.forEach(dequeueJob);
          }
        });
        clone2.remove();
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });

  // packages/alpinejs/src/directives/x-id.js
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  interceptClone((from, to) => {
    if (from._x_ids) {
      to._x_ids = from._x_ids;
    }
  });

  // packages/alpinejs/src/directives/x-on.js
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { "$event": e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));

  // packages/alpinejs/src/directives/index.js
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName, slug) {
    directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }

  // packages/alpinejs/src/index.js
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;

  // packages/alpinejs/builds/cdn.js
  window.Alpine = src_default;
  queueMicrotask(() => {
    src_default.start();
  });
})();

(() => {
  // packages/persist/src/index.js
  function src_default(Alpine) {
    let persist = () => {
      let alias;
      let storage;
      try {
        storage = localStorage;
      } catch (e) {
        console.error(e);
        console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");
        let dummy = /* @__PURE__ */ new Map();
        storage = {
          getItem: dummy.get.bind(dummy),
          setItem: dummy.set.bind(dummy)
        };
      }
      return Alpine.interceptor((initialValue, getter, setter, path, key) => {
        let lookup = alias || `_x_${path}`;
        let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
        setter(initial);
        Alpine.effect(() => {
          let value = getter();
          storageSet(lookup, value, storage);
          setter(value);
        });
        return initial;
      }, (func) => {
        func.as = (key) => {
          alias = key;
          return func;
        }, func.using = (target) => {
          storage = target;
          return func;
        };
      });
    };
    Object.defineProperty(Alpine, "$persist", { get: () => persist() });
    Alpine.magic("persist", persist);
    Alpine.persist = (key, { get, set }, storage = localStorage) => {
      let initial = storageHas(key, storage) ? storageGet(key, storage) : get();
      set(initial);
      Alpine.effect(() => {
        let value = get();
        storageSet(key, value, storage);
        set(value);
      });
    };
  }
  function storageHas(key, storage) {
    return storage.getItem(key) !== null;
  }
  function storageGet(key, storage) {
    let value = storage.getItem(key, storage);
    if (value === void 0)
      return;
    return JSON.parse(value);
  }
  function storageSet(key, value, storage) {
    storage.setItem(key, JSON.stringify(value));
  }

  // packages/persist/builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();

var htmx=function(){"use strict";const Q={onLoad:null,process:null,on:null,off:null,trigger:null,ajax:null,find:null,findAll:null,closest:null,values:function(e,t){const n=cn(e,t||"post");return n.values},remove:null,addClass:null,removeClass:null,toggleClass:null,takeClass:null,swap:null,defineExtension:null,removeExtension:null,logAll:null,logNone:null,logger:null,config:{historyEnabled:true,historyCacheSize:10,refreshOnHistoryMiss:false,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:true,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:true,allowScriptTags:true,inlineScriptNonce:"",inlineStyleNonce:"",attributesToSettle:["class","style","width","height"],withCredentials:false,timeout:0,wsReconnectDelay:"full-jitter",wsBinaryType:"blob",disableSelector:"[hx-disable], [data-hx-disable]",scrollBehavior:"instant",defaultFocusScroll:false,getCacheBusterParam:false,globalViewTransitions:false,methodsThatUseUrlParams:["get","delete"],selfRequestsOnly:true,ignoreTitle:false,scrollIntoViewOnBoost:true,triggerSpecsCache:null,disableInheritance:false,responseHandling:[{code:"204",swap:false},{code:"[23]..",swap:true},{code:"[45]..",swap:false,error:true}],allowNestedOobSwaps:true},parseInterval:null,_:null,version:"2.0.1"};Q.onLoad=$;Q.process=kt;Q.on=be;Q.off=we;Q.trigger=he;Q.ajax=Hn;Q.find=r;Q.findAll=p;Q.closest=g;Q.remove=K;Q.addClass=Y;Q.removeClass=o;Q.toggleClass=W;Q.takeClass=ge;Q.swap=ze;Q.defineExtension=Un;Q.removeExtension=Bn;Q.logAll=z;Q.logNone=J;Q.parseInterval=d;Q._=_;const n={addTriggerHandler:Et,bodyContains:le,canAccessLocalStorage:j,findThisElement:Ee,filterValues:dn,swap:ze,hasAttribute:s,getAttributeValue:te,getClosestAttributeValue:re,getClosestMatch:T,getExpressionVars:Cn,getHeaders:hn,getInputValues:cn,getInternalData:ie,getSwapSpecification:pn,getTriggerSpecs:lt,getTarget:Ce,makeFragment:k,mergeObjects:ue,makeSettleInfo:xn,oobSwap:Te,querySelectorExt:fe,settleImmediately:Gt,shouldCancel:dt,triggerEvent:he,triggerErrorEvent:ae,withExtensions:Ut};const v=["get","post","put","delete","patch"];const R=v.map(function(e){return"[hx-"+e+"], [data-hx-"+e+"]"}).join(", ");const O=e("head");function e(e,t=false){return new RegExp(`<${e}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${e}>`,t?"gim":"im")}function d(e){if(e==undefined){return undefined}let t=NaN;if(e.slice(-2)=="ms"){t=parseFloat(e.slice(0,-2))}else if(e.slice(-1)=="s"){t=parseFloat(e.slice(0,-1))*1e3}else if(e.slice(-1)=="m"){t=parseFloat(e.slice(0,-1))*1e3*60}else{t=parseFloat(e)}return isNaN(t)?undefined:t}function ee(e,t){return e instanceof Element&&e.getAttribute(t)}function s(e,t){return!!e.hasAttribute&&(e.hasAttribute(t)||e.hasAttribute("data-"+t))}function te(e,t){return ee(e,t)||ee(e,"data-"+t)}function u(e){const t=e.parentElement;if(!t&&e.parentNode instanceof ShadowRoot)return e.parentNode;return t}function ne(){return document}function H(e,t){return e.getRootNode?e.getRootNode({composed:t}):ne()}function T(e,t){while(e&&!t(e)){e=u(e)}return e||null}function q(e,t,n){const r=te(t,n);const o=te(t,"hx-disinherit");var i=te(t,"hx-inherit");if(e!==t){if(Q.config.disableInheritance){if(i&&(i==="*"||i.split(" ").indexOf(n)>=0)){return r}else{return null}}if(o&&(o==="*"||o.split(" ").indexOf(n)>=0)){return"unset"}}return r}function re(t,n){let r=null;T(t,function(e){return!!(r=q(t,ce(e),n))});if(r!=="unset"){return r}}function a(e,t){const n=e instanceof Element&&(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector);return!!n&&n.call(e,t)}function L(e){const t=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;const n=t.exec(e);if(n){return n[1].toLowerCase()}else{return""}}function N(e){const t=new DOMParser;return t.parseFromString(e,"text/html")}function A(e,t){while(t.childNodes.length>0){e.append(t.childNodes[0])}}function I(e){const t=ne().createElement("script");se(e.attributes,function(e){t.setAttribute(e.name,e.value)});t.textContent=e.textContent;t.async=false;if(Q.config.inlineScriptNonce){t.nonce=Q.config.inlineScriptNonce}return t}function P(e){return e.matches("script")&&(e.type==="text/javascript"||e.type==="module"||e.type==="")}function D(e){Array.from(e.querySelectorAll("script")).forEach(e=>{if(P(e)){const t=I(e);const n=e.parentNode;try{n.insertBefore(t,e)}catch(e){w(e)}finally{e.remove()}}})}function k(e){const t=e.replace(O,"");const n=L(t);let r;if(n==="html"){r=new DocumentFragment;const i=N(e);A(r,i.body);r.title=i.title}else if(n==="body"){r=new DocumentFragment;const i=N(t);A(r,i.body);r.title=i.title}else{const i=N('<body><template class="internal-htmx-wrapper">'+t+"</template></body>");r=i.querySelector("template").content;r.title=i.title;var o=r.querySelector("title");if(o&&o.parentNode===r){o.remove();r.title=o.innerText}}if(r){if(Q.config.allowScriptTags){D(r)}else{r.querySelectorAll("script").forEach(e=>e.remove())}}return r}function oe(e){if(e){e()}}function t(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function M(e){return typeof e==="function"}function X(e){return t(e,"Object")}function ie(e){const t="htmx-internal-data";let n=e[t];if(!n){n=e[t]={}}return n}function F(t){const n=[];if(t){for(let e=0;e<t.length;e++){n.push(t[e])}}return n}function se(t,n){if(t){for(let e=0;e<t.length;e++){n(t[e])}}}function U(e){const t=e.getBoundingClientRect();const n=t.top;const r=t.bottom;return n<window.innerHeight&&r>=0}function le(e){const t=e.getRootNode&&e.getRootNode();if(t&&t instanceof window.ShadowRoot){return ne().body.contains(t.host)}else{return ne().body.contains(e)}}function B(e){return e.trim().split(/\s+/)}function ue(e,t){for(const n in t){if(t.hasOwnProperty(n)){e[n]=t[n]}}return e}function S(e){try{return JSON.parse(e)}catch(e){w(e);return null}}function j(){const e="htmx:localStorageTest";try{localStorage.setItem(e,e);localStorage.removeItem(e);return true}catch(e){return false}}function V(t){try{const e=new URL(t);if(e){t=e.pathname+e.search}if(!/^\/$/.test(t)){t=t.replace(/\/+$/,"")}return t}catch(e){return t}}function _(e){return vn(ne().body,function(){return eval(e)})}function $(t){const e=Q.on("htmx:load",function(e){t(e.detail.elt)});return e}function z(){Q.logger=function(e,t,n){if(console){console.log(t,e,n)}}}function J(){Q.logger=null}function r(e,t){if(typeof e!=="string"){return e.querySelector(t)}else{return r(ne(),e)}}function p(e,t){if(typeof e!=="string"){return e.querySelectorAll(t)}else{return p(ne(),e)}}function E(){return window}function K(e,t){e=y(e);if(t){E().setTimeout(function(){K(e);e=null},t)}else{u(e).removeChild(e)}}function ce(e){return e instanceof Element?e:null}function G(e){return e instanceof HTMLElement?e:null}function Z(e){return typeof e==="string"?e:null}function h(e){return e instanceof Element||e instanceof Document||e instanceof DocumentFragment?e:null}function Y(e,t,n){e=ce(y(e));if(!e){return}if(n){E().setTimeout(function(){Y(e,t);e=null},n)}else{e.classList&&e.classList.add(t)}}function o(e,t,n){let r=ce(y(e));if(!r){return}if(n){E().setTimeout(function(){o(r,t);r=null},n)}else{if(r.classList){r.classList.remove(t);if(r.classList.length===0){r.removeAttribute("class")}}}}function W(e,t){e=y(e);e.classList.toggle(t)}function ge(e,t){e=y(e);se(e.parentElement.children,function(e){o(e,t)});Y(ce(e),t)}function g(e,t){e=ce(y(e));if(e&&e.closest){return e.closest(t)}else{do{if(e==null||a(e,t)){return e}}while(e=e&&ce(u(e)));return null}}function l(e,t){return e.substring(0,t.length)===t}function pe(e,t){return e.substring(e.length-t.length)===t}function i(e){const t=e.trim();if(l(t,"<")&&pe(t,"/>")){return t.substring(1,t.length-2)}else{return t}}function m(e,t,n){e=y(e);if(t.indexOf("closest ")===0){return[g(ce(e),i(t.substr(8)))]}else if(t.indexOf("find ")===0){return[r(h(e),i(t.substr(5)))]}else if(t==="next"){return[ce(e).nextElementSibling]}else if(t.indexOf("next ")===0){return[me(e,i(t.substr(5)),!!n)]}else if(t==="previous"){return[ce(e).previousElementSibling]}else if(t.indexOf("previous ")===0){return[ye(e,i(t.substr(9)),!!n)]}else if(t==="document"){return[document]}else if(t==="window"){return[window]}else if(t==="body"){return[document.body]}else if(t==="root"){return[H(e,!!n)]}else if(t.indexOf("global ")===0){return m(e,t.slice(7),true)}else{return F(h(H(e,!!n)).querySelectorAll(i(t)))}}var me=function(t,e,n){const r=h(H(t,n)).querySelectorAll(e);for(let e=0;e<r.length;e++){const o=r[e];if(o.compareDocumentPosition(t)===Node.DOCUMENT_POSITION_PRECEDING){return o}}};var ye=function(t,e,n){const r=h(H(t,n)).querySelectorAll(e);for(let e=r.length-1;e>=0;e--){const o=r[e];if(o.compareDocumentPosition(t)===Node.DOCUMENT_POSITION_FOLLOWING){return o}}};function fe(e,t){if(typeof e!=="string"){return m(e,t)[0]}else{return m(ne().body,e)[0]}}function y(e,t){if(typeof e==="string"){return r(h(t)||document,e)}else{return e}}function xe(e,t,n){if(M(t)){return{target:ne().body,event:Z(e),listener:t}}else{return{target:y(e),event:Z(t),listener:n}}}function be(t,n,r){_n(function(){const e=xe(t,n,r);e.target.addEventListener(e.event,e.listener)});const e=M(n);return e?n:r}function we(t,n,r){_n(function(){const e=xe(t,n,r);e.target.removeEventListener(e.event,e.listener)});return M(n)?n:r}const ve=ne().createElement("output");function Se(e,t){const n=re(e,t);if(n){if(n==="this"){return[Ee(e,t)]}else{const r=m(e,n);if(r.length===0){w('The selector "'+n+'" on '+t+" returned no matches!");return[ve]}else{return r}}}}function Ee(e,t){return ce(T(e,function(e){return te(ce(e),t)!=null}))}function Ce(e){const t=re(e,"hx-target");if(t){if(t==="this"){return Ee(e,"hx-target")}else{return fe(e,t)}}else{const n=ie(e);if(n.boosted){return ne().body}else{return e}}}function Re(t){const n=Q.config.attributesToSettle;for(let e=0;e<n.length;e++){if(t===n[e]){return true}}return false}function Oe(t,n){se(t.attributes,function(e){if(!n.hasAttribute(e.name)&&Re(e.name)){t.removeAttribute(e.name)}});se(n.attributes,function(e){if(Re(e.name)){t.setAttribute(e.name,e.value)}})}function He(t,e){const n=jn(e);for(let e=0;e<n.length;e++){const r=n[e];try{if(r.isInlineSwap(t)){return true}}catch(e){w(e)}}return t==="outerHTML"}function Te(e,o,i){let t="#"+ee(o,"id");let s="outerHTML";if(e==="true"){}else if(e.indexOf(":")>0){s=e.substr(0,e.indexOf(":"));t=e.substr(e.indexOf(":")+1,e.length)}else{s=e}const n=ne().querySelectorAll(t);if(n){se(n,function(e){let t;const n=o.cloneNode(true);t=ne().createDocumentFragment();t.appendChild(n);if(!He(s,e)){t=h(n)}const r={shouldSwap:true,target:e,fragment:t};if(!he(e,"htmx:oobBeforeSwap",r))return;e=r.target;if(r.shouldSwap){_e(s,e,e,t,i)}se(i.elts,function(e){he(e,"htmx:oobAfterSwap",r)})});o.parentNode.removeChild(o)}else{o.parentNode.removeChild(o);ae(ne().body,"htmx:oobErrorNoTarget",{content:o})}return e}function qe(e){se(p(e,"[hx-preserve], [data-hx-preserve]"),function(e){const t=te(e,"id");const n=ne().getElementById(t);if(n!=null){e.parentNode.replaceChild(n,e)}})}function Le(l,e,u){se(e.querySelectorAll("[id]"),function(t){const n=ee(t,"id");if(n&&n.length>0){const r=n.replace("'","\\'");const o=t.tagName.replace(":","\\:");const e=h(l);const i=e&&e.querySelector(o+"[id='"+r+"']");if(i&&i!==e){const s=t.cloneNode();Oe(t,i);u.tasks.push(function(){Oe(t,s)})}}})}function Ne(e){return function(){o(e,Q.config.addedClass);kt(ce(e));Ae(h(e));he(e,"htmx:load")}}function Ae(e){const t="[autofocus]";const n=G(a(e,t)?e:e.querySelector(t));if(n!=null){n.focus()}}function c(e,t,n,r){Le(e,n,r);while(n.childNodes.length>0){const o=n.firstChild;Y(ce(o),Q.config.addedClass);e.insertBefore(o,t);if(o.nodeType!==Node.TEXT_NODE&&o.nodeType!==Node.COMMENT_NODE){r.tasks.push(Ne(o))}}}function Ie(e,t){let n=0;while(n<e.length){t=(t<<5)-t+e.charCodeAt(n++)|0}return t}function Pe(t){let n=0;if(t.attributes){for(let e=0;e<t.attributes.length;e++){const r=t.attributes[e];if(r.value){n=Ie(r.name,n);n=Ie(r.value,n)}}}return n}function De(t){const n=ie(t);if(n.onHandlers){for(let e=0;e<n.onHandlers.length;e++){const r=n.onHandlers[e];we(t,r.event,r.listener)}delete n.onHandlers}}function ke(e){const t=ie(e);if(t.timeout){clearTimeout(t.timeout)}if(t.listenerInfos){se(t.listenerInfos,function(e){if(e.on){we(e.on,e.trigger,e.listener)}})}De(e);se(Object.keys(t),function(e){delete t[e]})}function f(e){he(e,"htmx:beforeCleanupElement");ke(e);if(e.children){se(e.children,function(e){f(e)})}}function Me(t,e,n){if(t instanceof Element&&t.tagName==="BODY"){return Ve(t,e,n)}let r;const o=t.previousSibling;c(u(t),t,e,n);if(o==null){r=u(t).firstChild}else{r=o.nextSibling}n.elts=n.elts.filter(function(e){return e!==t});while(r&&r!==t){if(r instanceof Element){n.elts.push(r);r=r.nextElementSibling}else{r=null}}f(t);if(t instanceof Element){t.remove()}else{t.parentNode.removeChild(t)}}function Xe(e,t,n){return c(e,e.firstChild,t,n)}function Fe(e,t,n){return c(u(e),e,t,n)}function Ue(e,t,n){return c(e,null,t,n)}function Be(e,t,n){return c(u(e),e.nextSibling,t,n)}function je(e){f(e);return u(e).removeChild(e)}function Ve(e,t,n){const r=e.firstChild;c(e,r,t,n);if(r){while(r.nextSibling){f(r.nextSibling);e.removeChild(r.nextSibling)}f(r);e.removeChild(r)}}function _e(t,e,n,r,o){switch(t){case"none":return;case"outerHTML":Me(n,r,o);return;case"afterbegin":Xe(n,r,o);return;case"beforebegin":Fe(n,r,o);return;case"beforeend":Ue(n,r,o);return;case"afterend":Be(n,r,o);return;case"delete":je(n);return;default:var i=jn(e);for(let e=0;e<i.length;e++){const s=i[e];try{const l=s.handleSwap(t,n,r,o);if(l){if(typeof l.length!=="undefined"){for(let e=0;e<l.length;e++){const u=l[e];if(u.nodeType!==Node.TEXT_NODE&&u.nodeType!==Node.COMMENT_NODE){o.tasks.push(Ne(u))}}}return}}catch(e){w(e)}}if(t==="innerHTML"){Ve(n,r,o)}else{_e(Q.config.defaultSwapStyle,e,n,r,o)}}}function $e(e,n){se(p(e,"[hx-swap-oob], [data-hx-swap-oob]"),function(e){if(Q.config.allowNestedOobSwaps||e.parentElement===null){const t=te(e,"hx-swap-oob");if(t!=null){Te(t,e,n)}}else{e.removeAttribute("hx-swap-oob");e.removeAttribute("data-hx-swap-oob")}})}function ze(e,t,r,o){if(!o){o={}}e=y(e);const n=document.activeElement;let i={};try{i={elt:n,start:n?n.selectionStart:null,end:n?n.selectionEnd:null}}catch(e){}const s=xn(e);if(r.swapStyle==="textContent"){e.textContent=t}else{let n=k(t);s.title=n.title;if(o.selectOOB){const u=o.selectOOB.split(",");for(let t=0;t<u.length;t++){const c=u[t].split(":",2);let e=c[0].trim();if(e.indexOf("#")===0){e=e.substring(1)}const f=c[1]||"true";const a=n.querySelector("#"+e);if(a){Te(f,a,s)}}}$e(n,s);se(p(n,"template"),function(e){$e(e.content,s);if(e.content.childElementCount===0&&e.content.textContent.trim()===""){e.remove()}});if(o.select){const h=ne().createDocumentFragment();se(n.querySelectorAll(o.select),function(e){h.appendChild(e)});n=h}qe(n);_e(r.swapStyle,o.contextElement,e,n,s)}if(i.elt&&!le(i.elt)&&ee(i.elt,"id")){const d=document.getElementById(ee(i.elt,"id"));const g={preventScroll:r.focusScroll!==undefined?!r.focusScroll:!Q.config.defaultFocusScroll};if(d){if(i.start&&d.setSelectionRange){try{d.setSelectionRange(i.start,i.end)}catch(e){}}d.focus(g)}}e.classList.remove(Q.config.swappingClass);se(s.elts,function(e){if(e.classList){e.classList.add(Q.config.settlingClass)}he(e,"htmx:afterSwap",o.eventInfo)});if(o.afterSwapCallback){o.afterSwapCallback()}if(!r.ignoreTitle){kn(s.title)}const l=function(){se(s.tasks,function(e){e.call()});se(s.elts,function(e){if(e.classList){e.classList.remove(Q.config.settlingClass)}he(e,"htmx:afterSettle",o.eventInfo)});if(o.anchor){const e=ce(y("#"+o.anchor));if(e){e.scrollIntoView({block:"start",behavior:"auto"})}}bn(s.elts,r);if(o.afterSettleCallback){o.afterSettleCallback()}};if(r.settleDelay>0){E().setTimeout(l,r.settleDelay)}else{l()}}function Je(e,t,n){const r=e.getResponseHeader(t);if(r.indexOf("{")===0){const o=S(r);for(const i in o){if(o.hasOwnProperty(i)){let e=o[i];if(!X(e)){e={value:e}}he(n,i,e)}}}else{const s=r.split(",");for(let e=0;e<s.length;e++){he(n,s[e].trim(),[])}}}const Ke=/\s/;const x=/[\s,]/;const Ge=/[_$a-zA-Z]/;const Ze=/[_$a-zA-Z0-9]/;const Ye=['"',"'","/"];const We=/[^\s]/;const Qe=/[{(]/;const et=/[})]/;function tt(e){const t=[];let n=0;while(n<e.length){if(Ge.exec(e.charAt(n))){var r=n;while(Ze.exec(e.charAt(n+1))){n++}t.push(e.substr(r,n-r+1))}else if(Ye.indexOf(e.charAt(n))!==-1){const o=e.charAt(n);var r=n;n++;while(n<e.length&&e.charAt(n)!==o){if(e.charAt(n)==="\\"){n++}n++}t.push(e.substr(r,n-r+1))}else{const i=e.charAt(n);t.push(i)}n++}return t}function nt(e,t,n){return Ge.exec(e.charAt(0))&&e!=="true"&&e!=="false"&&e!=="this"&&e!==n&&t!=="."}function rt(r,o,i){if(o[0]==="["){o.shift();let e=1;let t=" return (function("+i+"){ return (";let n=null;while(o.length>0){const s=o[0];if(s==="]"){e--;if(e===0){if(n===null){t=t+"true"}o.shift();t+=")})";try{const l=vn(r,function(){return Function(t)()},function(){return true});l.source=t;return l}catch(e){ae(ne().body,"htmx:syntax:error",{error:e,source:t});return null}}}else if(s==="["){e++}if(nt(s,n,i)){t+="(("+i+"."+s+") ? ("+i+"."+s+") : (window."+s+"))"}else{t=t+s}n=o.shift()}}}function b(e,t){let n="";while(e.length>0&&!t.test(e[0])){n+=e.shift()}return n}function ot(e){let t;if(e.length>0&&Qe.test(e[0])){e.shift();t=b(e,et).trim();e.shift()}else{t=b(e,x)}return t}const it="input, textarea, select";function st(e,t,n){const r=[];const o=tt(t);do{b(o,We);const l=o.length;const u=b(o,/[,\[\s]/);if(u!==""){if(u==="every"){const c={trigger:"every"};b(o,We);c.pollInterval=d(b(o,/[,\[\s]/));b(o,We);var i=rt(e,o,"event");if(i){c.eventFilter=i}r.push(c)}else{const f={trigger:u};var i=rt(e,o,"event");if(i){f.eventFilter=i}while(o.length>0&&o[0]!==","){b(o,We);const a=o.shift();if(a==="changed"){f.changed=true}else if(a==="once"){f.once=true}else if(a==="consume"){f.consume=true}else if(a==="delay"&&o[0]===":"){o.shift();f.delay=d(b(o,x))}else if(a==="from"&&o[0]===":"){o.shift();if(Qe.test(o[0])){var s=ot(o)}else{var s=b(o,x);if(s==="closest"||s==="find"||s==="next"||s==="previous"){o.shift();const h=ot(o);if(h.length>0){s+=" "+h}}}f.from=s}else if(a==="target"&&o[0]===":"){o.shift();f.target=ot(o)}else if(a==="throttle"&&o[0]===":"){o.shift();f.throttle=d(b(o,x))}else if(a==="queue"&&o[0]===":"){o.shift();f.queue=b(o,x)}else if(a==="root"&&o[0]===":"){o.shift();f[a]=ot(o)}else if(a==="threshold"&&o[0]===":"){o.shift();f[a]=b(o,x)}else{ae(e,"htmx:syntax:error",{token:o.shift()})}}r.push(f)}}if(o.length===l){ae(e,"htmx:syntax:error",{token:o.shift()})}b(o,We)}while(o[0]===","&&o.shift());if(n){n[t]=r}return r}function lt(e){const t=te(e,"hx-trigger");let n=[];if(t){const r=Q.config.triggerSpecsCache;n=r&&r[t]||st(e,t,r)}if(n.length>0){return n}else if(a(e,"form")){return[{trigger:"submit"}]}else if(a(e,'input[type="button"], input[type="submit"]')){return[{trigger:"click"}]}else if(a(e,it)){return[{trigger:"change"}]}else{return[{trigger:"click"}]}}function ut(e){ie(e).cancelled=true}function ct(e,t,n){const r=ie(e);r.timeout=E().setTimeout(function(){if(le(e)&&r.cancelled!==true){if(!pt(n,e,Xt("hx:poll:trigger",{triggerSpec:n,target:e}))){t(e)}ct(e,t,n)}},n.pollInterval)}function ft(e){return location.hostname===e.hostname&&ee(e,"href")&&ee(e,"href").indexOf("#")!==0}function at(e){return g(e,Q.config.disableSelector)}function ht(t,n,e){if(t instanceof HTMLAnchorElement&&ft(t)&&(t.target===""||t.target==="_self")||t.tagName==="FORM"){n.boosted=true;let r,o;if(t.tagName==="A"){r="get";o=ee(t,"href")}else{const i=ee(t,"method");r=i?i.toLowerCase():"get";if(r==="get"){}o=ee(t,"action")}e.forEach(function(e){mt(t,function(e,t){const n=ce(e);if(at(n)){f(n);return}de(r,o,n,t)},n,e,true)})}}function dt(e,t){const n=ce(t);if(!n){return false}if(e.type==="submit"||e.type==="click"){if(n.tagName==="FORM"){return true}if(a(n,'input[type="submit"], button')&&g(n,"form")!==null){return true}if(n instanceof HTMLAnchorElement&&n.href&&(n.getAttribute("href")==="#"||n.getAttribute("href").indexOf("#")!==0)){return true}}return false}function gt(e,t){return ie(e).boosted&&e instanceof HTMLAnchorElement&&t.type==="click"&&(t.ctrlKey||t.metaKey)}function pt(e,t,n){const r=e.eventFilter;if(r){try{return r.call(t,n)!==true}catch(e){const o=r.source;ae(ne().body,"htmx:eventFilter:error",{error:e,source:o});return true}}return false}function mt(s,l,e,u,c){const f=ie(s);let t;if(u.from){t=m(s,u.from)}else{t=[s]}if(u.changed){t.forEach(function(e){const t=ie(e);t.lastValue=e.value})}se(t,function(o){const i=function(e){if(!le(s)){o.removeEventListener(u.trigger,i);return}if(gt(s,e)){return}if(c||dt(e,s)){e.preventDefault()}if(pt(u,s,e)){return}const t=ie(e);t.triggerSpec=u;if(t.handledFor==null){t.handledFor=[]}if(t.handledFor.indexOf(s)<0){t.handledFor.push(s);if(u.consume){e.stopPropagation()}if(u.target&&e.target){if(!a(ce(e.target),u.target)){return}}if(u.once){if(f.triggeredOnce){return}else{f.triggeredOnce=true}}if(u.changed){const n=ie(o);const r=o.value;if(n.lastValue===r){return}n.lastValue=r}if(f.delayed){clearTimeout(f.delayed)}if(f.throttle){return}if(u.throttle>0){if(!f.throttle){l(s,e);f.throttle=E().setTimeout(function(){f.throttle=null},u.throttle)}}else if(u.delay>0){f.delayed=E().setTimeout(function(){l(s,e)},u.delay)}else{he(s,"htmx:trigger");l(s,e)}}};if(e.listenerInfos==null){e.listenerInfos=[]}e.listenerInfos.push({trigger:u.trigger,listener:i,on:o});o.addEventListener(u.trigger,i)})}let yt=false;let xt=null;function bt(){if(!xt){xt=function(){yt=true};window.addEventListener("scroll",xt);setInterval(function(){if(yt){yt=false;se(ne().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"),function(e){wt(e)})}},200)}}function wt(e){if(!s(e,"data-hx-revealed")&&U(e)){e.setAttribute("data-hx-revealed","true");const t=ie(e);if(t.initHash){he(e,"revealed")}else{e.addEventListener("htmx:afterProcessNode",function(){he(e,"revealed")},{once:true})}}}function vt(e,t,n,r){const o=function(){if(!n.loaded){n.loaded=true;t(e)}};if(r>0){E().setTimeout(o,r)}else{o()}}function St(t,n,e){let i=false;se(v,function(r){if(s(t,"hx-"+r)){const o=te(t,"hx-"+r);i=true;n.path=o;n.verb=r;e.forEach(function(e){Et(t,e,n,function(e,t){const n=ce(e);if(g(n,Q.config.disableSelector)){f(n);return}de(r,o,n,t)})})}});return i}function Et(r,e,t,n){if(e.trigger==="revealed"){bt();mt(r,n,t,e);wt(ce(r))}else if(e.trigger==="intersect"){const o={};if(e.root){o.root=fe(r,e.root)}if(e.threshold){o.threshold=parseFloat(e.threshold)}const i=new IntersectionObserver(function(t){for(let e=0;e<t.length;e++){const n=t[e];if(n.isIntersecting){he(r,"intersect");break}}},o);i.observe(ce(r));mt(ce(r),n,t,e)}else if(e.trigger==="load"){if(!pt(e,r,Xt("load",{elt:r}))){vt(ce(r),n,t,e.delay)}}else if(e.pollInterval>0){t.polling=true;ct(ce(r),n,e)}else{mt(r,n,t,e)}}function Ct(e){const t=ce(e);if(!t){return false}const n=t.attributes;for(let e=0;e<n.length;e++){const r=n[e].name;if(l(r,"hx-on:")||l(r,"data-hx-on:")||l(r,"hx-on-")||l(r,"data-hx-on-")){return true}}return false}const Rt=(new XPathEvaluator).createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or'+' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');function Ot(e,t){if(Ct(e)){t.push(ce(e))}const n=Rt.evaluate(e);let r=null;while(r=n.iterateNext())t.push(ce(r))}function Ht(e){const t=[];if(e instanceof DocumentFragment){for(const n of e.childNodes){Ot(n,t)}}else{Ot(e,t)}return t}function Tt(e){if(e.querySelectorAll){const n=", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";const r=[];for(const i in Xn){const s=Xn[i];if(s.getSelectors){var t=s.getSelectors();if(t){r.push(t)}}}const o=e.querySelectorAll(R+n+", form, [type='submit'],"+" [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]"+r.flat().map(e=>", "+e).join(""));return o}else{return[]}}function qt(e){const t=g(ce(e.target),"button, input[type='submit']");const n=Nt(e);if(n){n.lastButtonClicked=t}}function Lt(e){const t=Nt(e);if(t){t.lastButtonClicked=null}}function Nt(e){const t=g(ce(e.target),"button, input[type='submit']");if(!t){return}const n=y("#"+ee(t,"form"),t.getRootNode())||g(t,"form");if(!n){return}return ie(n)}function At(e){e.addEventListener("click",qt);e.addEventListener("focusin",qt);e.addEventListener("focusout",Lt)}function It(t,e,n){const r=ie(t);if(!Array.isArray(r.onHandlers)){r.onHandlers=[]}let o;const i=function(e){vn(t,function(){if(at(t)){return}if(!o){o=new Function("event",n)}o.call(t,e)})};t.addEventListener(e,i);r.onHandlers.push({event:e,listener:i})}function Pt(t){De(t);for(let e=0;e<t.attributes.length;e++){const n=t.attributes[e].name;const r=t.attributes[e].value;if(l(n,"hx-on")||l(n,"data-hx-on")){const o=n.indexOf("-on")+3;const i=n.slice(o,o+1);if(i==="-"||i===":"){let e=n.slice(o+1);if(l(e,":")){e="htmx"+e}else if(l(e,"-")){e="htmx:"+e.slice(1)}else if(l(e,"htmx-")){e="htmx:"+e.slice(5)}It(t,e,r)}}}}function Dt(t){if(g(t,Q.config.disableSelector)){f(t);return}const n=ie(t);if(n.initHash!==Pe(t)){ke(t);n.initHash=Pe(t);he(t,"htmx:beforeProcessNode");if(t.value){n.lastValue=t.value}const e=lt(t);const r=St(t,n,e);if(!r){if(re(t,"hx-boost")==="true"){ht(t,n,e)}else if(s(t,"hx-trigger")){e.forEach(function(e){Et(t,e,n,function(){})})}}if(t.tagName==="FORM"||ee(t,"type")==="submit"&&s(t,"form")){At(t)}he(t,"htmx:afterProcessNode")}}function kt(e){e=y(e);if(g(e,Q.config.disableSelector)){f(e);return}Dt(e);se(Tt(e),function(e){Dt(e)});se(Ht(e),Pt)}function Mt(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function Xt(e,t){let n;if(window.CustomEvent&&typeof window.CustomEvent==="function"){n=new CustomEvent(e,{bubbles:true,cancelable:true,composed:true,detail:t})}else{n=ne().createEvent("CustomEvent");n.initCustomEvent(e,true,true,t)}return n}function ae(e,t,n){he(e,t,ue({error:t},n))}function Ft(e){return e==="htmx:afterProcessNode"}function Ut(e,t){se(jn(e),function(e){try{t(e)}catch(e){w(e)}})}function w(e){if(console.error){console.error(e)}else if(console.log){console.log("ERROR: ",e)}}function he(e,t,n){e=y(e);if(n==null){n={}}n.elt=e;const r=Xt(t,n);if(Q.logger&&!Ft(t)){Q.logger(e,t,n)}if(n.error){w(n.error);he(e,"htmx:error",{errorInfo:n})}let o=e.dispatchEvent(r);const i=Mt(t);if(o&&i!==t){const s=Xt(i,r.detail);o=o&&e.dispatchEvent(s)}Ut(ce(e),function(e){o=o&&(e.onEvent(t,r)!==false&&!r.defaultPrevented)});return o}let Bt=location.pathname+location.search;function jt(){const e=ne().querySelector("[hx-history-elt],[data-hx-history-elt]");return e||ne().body}function Vt(t,e){if(!j()){return}const n=$t(e);const r=ne().title;const o=window.scrollY;if(Q.config.historyCacheSize<=0){localStorage.removeItem("htmx-history-cache");return}t=V(t);const i=S(localStorage.getItem("htmx-history-cache"))||[];for(let e=0;e<i.length;e++){if(i[e].url===t){i.splice(e,1);break}}const s={url:t,content:n,title:r,scroll:o};he(ne().body,"htmx:historyItemCreated",{item:s,cache:i});i.push(s);while(i.length>Q.config.historyCacheSize){i.shift()}while(i.length>0){try{localStorage.setItem("htmx-history-cache",JSON.stringify(i));break}catch(e){ae(ne().body,"htmx:historyCacheError",{cause:e,cache:i});i.shift()}}}function _t(t){if(!j()){return null}t=V(t);const n=S(localStorage.getItem("htmx-history-cache"))||[];for(let e=0;e<n.length;e++){if(n[e].url===t){return n[e]}}return null}function $t(e){const t=Q.config.requestClass;const n=e.cloneNode(true);se(p(n,"."+t),function(e){o(e,t)});return n.innerHTML}function zt(){const e=jt();const t=Bt||location.pathname+location.search;let n;try{n=ne().querySelector('[hx-history="false" i],[data-hx-history="false" i]')}catch(e){n=ne().querySelector('[hx-history="false"],[data-hx-history="false"]')}if(!n){he(ne().body,"htmx:beforeHistorySave",{path:t,historyElt:e});Vt(t,e)}if(Q.config.historyEnabled)history.replaceState({htmx:true},ne().title,window.location.href)}function Jt(e){if(Q.config.getCacheBusterParam){e=e.replace(/org\.htmx\.cache-buster=[^&]*&?/,"");if(pe(e,"&")||pe(e,"?")){e=e.slice(0,-1)}}if(Q.config.historyEnabled){history.pushState({htmx:true},"",e)}Bt=e}function Kt(e){if(Q.config.historyEnabled)history.replaceState({htmx:true},"",e);Bt=e}function Gt(e){se(e,function(e){e.call(undefined)})}function Zt(o){const e=new XMLHttpRequest;const i={path:o,xhr:e};he(ne().body,"htmx:historyCacheMiss",i);e.open("GET",o,true);e.setRequestHeader("HX-Request","true");e.setRequestHeader("HX-History-Restore-Request","true");e.setRequestHeader("HX-Current-URL",ne().location.href);e.onload=function(){if(this.status>=200&&this.status<400){he(ne().body,"htmx:historyCacheMissLoad",i);const e=k(this.response);const t=e.querySelector("[hx-history-elt],[data-hx-history-elt]")||e;const n=jt();const r=xn(n);kn(e.title);Ve(n,t,r);Gt(r.tasks);Bt=o;he(ne().body,"htmx:historyRestore",{path:o,cacheMiss:true,serverResponse:this.response})}else{ae(ne().body,"htmx:historyCacheMissLoadError",i)}};e.send()}function Yt(e){zt();e=e||location.pathname+location.search;const t=_t(e);if(t){const n=k(t.content);const r=jt();const o=xn(r);kn(n.title);Ve(r,n,o);Gt(o.tasks);E().setTimeout(function(){window.scrollTo(0,t.scroll)},0);Bt=e;he(ne().body,"htmx:historyRestore",{path:e,item:t})}else{if(Q.config.refreshOnHistoryMiss){window.location.reload(true)}else{Zt(e)}}}function Wt(e){let t=Se(e,"hx-indicator");if(t==null){t=[e]}se(t,function(e){const t=ie(e);t.requestCount=(t.requestCount||0)+1;e.classList.add.call(e.classList,Q.config.requestClass)});return t}function Qt(e){let t=Se(e,"hx-disabled-elt");if(t==null){t=[]}se(t,function(e){const t=ie(e);t.requestCount=(t.requestCount||0)+1;e.setAttribute("disabled","")});return t}function en(e,t){se(e,function(e){const t=ie(e);t.requestCount=(t.requestCount||0)-1;if(t.requestCount===0){e.classList.remove.call(e.classList,Q.config.requestClass)}});se(t,function(e){const t=ie(e);t.requestCount=(t.requestCount||0)-1;if(t.requestCount===0){e.removeAttribute("disabled")}})}function tn(t,n){for(let e=0;e<t.length;e++){const r=t[e];if(r.isSameNode(n)){return true}}return false}function nn(e){const t=e;if(t.name===""||t.name==null||t.disabled||g(t,"fieldset[disabled]")){return false}if(t.type==="button"||t.type==="submit"||t.tagName==="image"||t.tagName==="reset"||t.tagName==="file"){return false}if(t.type==="checkbox"||t.type==="radio"){return t.checked}return true}function rn(t,e,n){if(t!=null&&e!=null){if(Array.isArray(e)){e.forEach(function(e){n.append(t,e)})}else{n.append(t,e)}}}function on(t,n,r){if(t!=null&&n!=null){let e=r.getAll(t);if(Array.isArray(n)){e=e.filter(e=>n.indexOf(e)<0)}else{e=e.filter(e=>e!==n)}r.delete(t);se(e,e=>r.append(t,e))}}function sn(t,n,r,o,i){if(o==null||tn(t,o)){return}else{t.push(o)}if(nn(o)){const s=ee(o,"name");let e=o.value;if(o instanceof HTMLSelectElement&&o.multiple){e=F(o.querySelectorAll("option:checked")).map(function(e){return e.value})}if(o instanceof HTMLInputElement&&o.files){e=F(o.files)}rn(s,e,n);if(i){ln(o,r)}}if(o instanceof HTMLFormElement){se(o.elements,function(e){if(t.indexOf(e)>=0){on(e.name,e.value,n)}else{t.push(e)}if(i){ln(e,r)}});new FormData(o).forEach(function(e,t){if(e instanceof File&&e.name===""){return}rn(t,e,n)})}}function ln(e,t){const n=e;if(n.willValidate){he(n,"htmx:validation:validate");if(!n.checkValidity()){t.push({elt:n,message:n.validationMessage,validity:n.validity});he(n,"htmx:validation:failed",{message:n.validationMessage,validity:n.validity})}}}function un(t,e){for(const n of e.keys()){t.delete(n);e.getAll(n).forEach(function(e){t.append(n,e)})}return t}function cn(e,t){const n=[];const r=new FormData;const o=new FormData;const i=[];const s=ie(e);if(s.lastButtonClicked&&!le(s.lastButtonClicked)){s.lastButtonClicked=null}let l=e instanceof HTMLFormElement&&e.noValidate!==true||te(e,"hx-validate")==="true";if(s.lastButtonClicked){l=l&&s.lastButtonClicked.formNoValidate!==true}if(t!=="get"){sn(n,o,i,g(e,"form"),l)}sn(n,r,i,e,l);if(s.lastButtonClicked||e.tagName==="BUTTON"||e.tagName==="INPUT"&&ee(e,"type")==="submit"){const c=s.lastButtonClicked||e;const f=ee(c,"name");rn(f,c.value,o)}const u=Se(e,"hx-include");se(u,function(e){sn(n,r,i,ce(e),l);if(!a(e,"form")){se(h(e).querySelectorAll(it),function(e){sn(n,r,i,e,l)})}});un(r,o);return{errors:i,formData:r,values:An(r)}}function fn(e,t,n){if(e!==""){e+="&"}if(String(n)==="[object Object]"){n=JSON.stringify(n)}const r=encodeURIComponent(n);e+=encodeURIComponent(t)+"="+r;return e}function an(e){e=Ln(e);let n="";e.forEach(function(e,t){n=fn(n,t,e)});return n}function hn(e,t,n){const r={"HX-Request":"true","HX-Trigger":ee(e,"id"),"HX-Trigger-Name":ee(e,"name"),"HX-Target":te(t,"id"),"HX-Current-URL":ne().location.href};wn(e,"hx-headers",false,r);if(n!==undefined){r["HX-Prompt"]=n}if(ie(e).boosted){r["HX-Boosted"]="true"}return r}function dn(n,e){const t=re(e,"hx-params");if(t){if(t==="none"){return new FormData}else if(t==="*"){return n}else if(t.indexOf("not ")===0){se(t.substr(4).split(","),function(e){e=e.trim();n.delete(e)});return n}else{const r=new FormData;se(t.split(","),function(t){t=t.trim();if(n.has(t)){n.getAll(t).forEach(function(e){r.append(t,e)})}});return r}}else{return n}}function gn(e){return!!ee(e,"href")&&ee(e,"href").indexOf("#")>=0}function pn(e,t){const n=t||re(e,"hx-swap");const r={swapStyle:ie(e).boosted?"innerHTML":Q.config.defaultSwapStyle,swapDelay:Q.config.defaultSwapDelay,settleDelay:Q.config.defaultSettleDelay};if(Q.config.scrollIntoViewOnBoost&&ie(e).boosted&&!gn(e)){r.show="top"}if(n){const s=B(n);if(s.length>0){for(let e=0;e<s.length;e++){const l=s[e];if(l.indexOf("swap:")===0){r.swapDelay=d(l.substr(5))}else if(l.indexOf("settle:")===0){r.settleDelay=d(l.substr(7))}else if(l.indexOf("transition:")===0){r.transition=l.substr(11)==="true"}else if(l.indexOf("ignoreTitle:")===0){r.ignoreTitle=l.substr(12)==="true"}else if(l.indexOf("scroll:")===0){const u=l.substr(7);var o=u.split(":");const c=o.pop();var i=o.length>0?o.join(":"):null;r.scroll=c;r.scrollTarget=i}else if(l.indexOf("show:")===0){const f=l.substr(5);var o=f.split(":");const a=o.pop();var i=o.length>0?o.join(":"):null;r.show=a;r.showTarget=i}else if(l.indexOf("focus-scroll:")===0){const h=l.substr("focus-scroll:".length);r.focusScroll=h=="true"}else if(e==0){r.swapStyle=l}else{w("Unknown modifier in hx-swap: "+l)}}}}return r}function mn(e){return re(e,"hx-encoding")==="multipart/form-data"||a(e,"form")&&ee(e,"enctype")==="multipart/form-data"}function yn(t,n,r){let o=null;Ut(n,function(e){if(o==null){o=e.encodeParameters(t,r,n)}});if(o!=null){return o}else{if(mn(n)){return un(new FormData,Ln(r))}else{return an(r)}}}function xn(e){return{tasks:[],elts:[e]}}function bn(e,t){const n=e[0];const r=e[e.length-1];if(t.scroll){var o=null;if(t.scrollTarget){o=ce(fe(n,t.scrollTarget))}if(t.scroll==="top"&&(n||o)){o=o||n;o.scrollTop=0}if(t.scroll==="bottom"&&(r||o)){o=o||r;o.scrollTop=o.scrollHeight}}if(t.show){var o=null;if(t.showTarget){let e=t.showTarget;if(t.showTarget==="window"){e="body"}o=ce(fe(n,e))}if(t.show==="top"&&(n||o)){o=o||n;o.scrollIntoView({block:"start",behavior:Q.config.scrollBehavior})}if(t.show==="bottom"&&(r||o)){o=o||r;o.scrollIntoView({block:"end",behavior:Q.config.scrollBehavior})}}}function wn(r,e,o,i){if(i==null){i={}}if(r==null){return i}const s=te(r,e);if(s){let e=s.trim();let t=o;if(e==="unset"){return null}if(e.indexOf("javascript:")===0){e=e.substr(11);t=true}else if(e.indexOf("js:")===0){e=e.substr(3);t=true}if(e.indexOf("{")!==0){e="{"+e+"}"}let n;if(t){n=vn(r,function(){return Function("return ("+e+")")()},{})}else{n=S(e)}for(const l in n){if(n.hasOwnProperty(l)){if(i[l]==null){i[l]=n[l]}}}}return wn(ce(u(r)),e,o,i)}function vn(e,t,n){if(Q.config.allowEval){return t()}else{ae(e,"htmx:evalDisallowedError");return n}}function Sn(e,t){return wn(e,"hx-vars",true,t)}function En(e,t){return wn(e,"hx-vals",false,t)}function Cn(e){return ue(Sn(e),En(e))}function Rn(t,n,r){if(r!==null){try{t.setRequestHeader(n,r)}catch(e){t.setRequestHeader(n,encodeURIComponent(r));t.setRequestHeader(n+"-URI-AutoEncoded","true")}}}function On(t){if(t.responseURL&&typeof URL!=="undefined"){try{const e=new URL(t.responseURL);return e.pathname+e.search}catch(e){ae(ne().body,"htmx:badResponseUrl",{url:t.responseURL})}}}function C(e,t){return t.test(e.getAllResponseHeaders())}function Hn(e,t,n){e=e.toLowerCase();if(n){if(n instanceof Element||typeof n==="string"){return de(e,t,null,null,{targetOverride:y(n),returnPromise:true})}else{return de(e,t,y(n.source),n.event,{handler:n.handler,headers:n.headers,values:n.values,targetOverride:y(n.target),swapOverride:n.swap,select:n.select,returnPromise:true})}}else{return de(e,t,null,null,{returnPromise:true})}}function Tn(e){const t=[];while(e){t.push(e);e=e.parentElement}return t}function qn(e,t,n){let r;let o;if(typeof URL==="function"){o=new URL(t,document.location.href);const i=document.location.origin;r=i===o.origin}else{o=t;r=l(t,document.location.origin)}if(Q.config.selfRequestsOnly){if(!r){return false}}return he(e,"htmx:validateUrl",ue({url:o,sameHost:r},n))}function Ln(e){if(e instanceof FormData)return e;const t=new FormData;for(const n in e){if(e.hasOwnProperty(n)){if(typeof e[n].forEach==="function"){e[n].forEach(function(e){t.append(n,e)})}else if(typeof e[n]==="object"){t.append(n,JSON.stringify(e[n]))}else{t.append(n,e[n])}}}return t}function Nn(r,o,e){return new Proxy(e,{get:function(t,e){if(typeof e==="number")return t[e];if(e==="length")return t.length;if(e==="push"){return function(e){t.push(e);r.append(o,e)}}if(typeof t[e]==="function"){return function(){t[e].apply(t,arguments);r.delete(o);t.forEach(function(e){r.append(o,e)})}}if(t[e]&&t[e].length===1){return t[e][0]}else{return t[e]}},set:function(e,t,n){e[t]=n;r.delete(o);e.forEach(function(e){r.append(o,e)});return true}})}function An(r){return new Proxy(r,{get:function(e,t){if(typeof t==="symbol"){return Reflect.get(e,t)}if(t==="toJSON"){return()=>Object.fromEntries(r)}if(t in e){if(typeof e[t]==="function"){return function(){return r[t].apply(r,arguments)}}else{return e[t]}}const n=r.getAll(t);if(n.length===0){return undefined}else if(n.length===1){return n[0]}else{return Nn(e,t,n)}},set:function(t,n,e){if(typeof n!=="string"){return false}t.delete(n);if(typeof e.forEach==="function"){e.forEach(function(e){t.append(n,e)})}else{t.append(n,e)}return true},deleteProperty:function(e,t){if(typeof t==="string"){e.delete(t)}return true},ownKeys:function(e){return Reflect.ownKeys(Object.fromEntries(e))},getOwnPropertyDescriptor:function(e,t){return Reflect.getOwnPropertyDescriptor(Object.fromEntries(e),t)}})}function de(t,n,r,o,i,k){let s=null;let l=null;i=i!=null?i:{};if(i.returnPromise&&typeof Promise!=="undefined"){var e=new Promise(function(e,t){s=e;l=t})}if(r==null){r=ne().body}const M=i.handler||Mn;const X=i.select||null;if(!le(r)){oe(s);return e}const u=i.targetOverride||ce(Ce(r));if(u==null||u==ve){ae(r,"htmx:targetError",{target:te(r,"hx-target")});oe(l);return e}let c=ie(r);const f=c.lastButtonClicked;if(f){const L=ee(f,"formaction");if(L!=null){n=L}const N=ee(f,"formmethod");if(N!=null){if(N.toLowerCase()!=="dialog"){t=N}}}const a=re(r,"hx-confirm");if(k===undefined){const K=function(e){return de(t,n,r,o,i,!!e)};const G={target:u,elt:r,path:n,verb:t,triggeringEvent:o,etc:i,issueRequest:K,question:a};if(he(r,"htmx:confirm",G)===false){oe(s);return e}}let h=r;let d=re(r,"hx-sync");let g=null;let F=false;if(d){const A=d.split(":");const I=A[0].trim();if(I==="this"){h=Ee(r,"hx-sync")}else{h=ce(fe(r,I))}d=(A[1]||"drop").trim();c=ie(h);if(d==="drop"&&c.xhr&&c.abortable!==true){oe(s);return e}else if(d==="abort"){if(c.xhr){oe(s);return e}else{F=true}}else if(d==="replace"){he(h,"htmx:abort")}else if(d.indexOf("queue")===0){const Z=d.split(" ");g=(Z[1]||"last").trim()}}if(c.xhr){if(c.abortable){he(h,"htmx:abort")}else{if(g==null){if(o){const P=ie(o);if(P&&P.triggerSpec&&P.triggerSpec.queue){g=P.triggerSpec.queue}}if(g==null){g="last"}}if(c.queuedRequests==null){c.queuedRequests=[]}if(g==="first"&&c.queuedRequests.length===0){c.queuedRequests.push(function(){de(t,n,r,o,i)})}else if(g==="all"){c.queuedRequests.push(function(){de(t,n,r,o,i)})}else if(g==="last"){c.queuedRequests=[];c.queuedRequests.push(function(){de(t,n,r,o,i)})}oe(s);return e}}const p=new XMLHttpRequest;c.xhr=p;c.abortable=F;const m=function(){c.xhr=null;c.abortable=false;if(c.queuedRequests!=null&&c.queuedRequests.length>0){const e=c.queuedRequests.shift();e()}};const U=re(r,"hx-prompt");if(U){var y=prompt(U);if(y===null||!he(r,"htmx:prompt",{prompt:y,target:u})){oe(s);m();return e}}if(a&&!k){if(!confirm(a)){oe(s);m();return e}}let x=hn(r,u,y);if(t!=="get"&&!mn(r)){x["Content-Type"]="application/x-www-form-urlencoded"}if(i.headers){x=ue(x,i.headers)}const B=cn(r,t);let b=B.errors;const j=B.formData;if(i.values){un(j,Ln(i.values))}const V=Ln(Cn(r));const w=un(j,V);let v=dn(w,r);if(Q.config.getCacheBusterParam&&t==="get"){v.set("org.htmx.cache-buster",ee(u,"id")||"true")}if(n==null||n===""){n=ne().location.href}const S=wn(r,"hx-request");const _=ie(r).boosted;let E=Q.config.methodsThatUseUrlParams.indexOf(t)>=0;const C={boosted:_,useUrlParams:E,formData:v,parameters:An(v),unfilteredFormData:w,unfilteredParameters:An(w),headers:x,target:u,verb:t,errors:b,withCredentials:i.credentials||S.credentials||Q.config.withCredentials,timeout:i.timeout||S.timeout||Q.config.timeout,path:n,triggeringEvent:o};if(!he(r,"htmx:configRequest",C)){oe(s);m();return e}n=C.path;t=C.verb;x=C.headers;v=Ln(C.parameters);b=C.errors;E=C.useUrlParams;if(b&&b.length>0){he(r,"htmx:validation:halted",C);oe(s);m();return e}const $=n.split("#");const z=$[0];const R=$[1];let O=n;if(E){O=z;const Y=!v.keys().next().done;if(Y){if(O.indexOf("?")<0){O+="?"}else{O+="&"}O+=an(v);if(R){O+="#"+R}}}if(!qn(r,O,C)){ae(r,"htmx:invalidPath",C);oe(l);return e}p.open(t.toUpperCase(),O,true);p.overrideMimeType("text/html");p.withCredentials=C.withCredentials;p.timeout=C.timeout;if(S.noHeaders){}else{for(const D in x){if(x.hasOwnProperty(D)){const W=x[D];Rn(p,D,W)}}}const H={xhr:p,target:u,requestConfig:C,etc:i,boosted:_,select:X,pathInfo:{requestPath:n,finalRequestPath:O,responsePath:null,anchor:R}};p.onload=function(){try{const t=Tn(r);H.pathInfo.responsePath=On(p);M(r,H);en(T,q);he(r,"htmx:afterRequest",H);he(r,"htmx:afterOnLoad",H);if(!le(r)){let e=null;while(t.length>0&&e==null){const n=t.shift();if(le(n)){e=n}}if(e){he(e,"htmx:afterRequest",H);he(e,"htmx:afterOnLoad",H)}}oe(s);m()}catch(e){ae(r,"htmx:onLoadError",ue({error:e},H));throw e}};p.onerror=function(){en(T,q);ae(r,"htmx:afterRequest",H);ae(r,"htmx:sendError",H);oe(l);m()};p.onabort=function(){en(T,q);ae(r,"htmx:afterRequest",H);ae(r,"htmx:sendAbort",H);oe(l);m()};p.ontimeout=function(){en(T,q);ae(r,"htmx:afterRequest",H);ae(r,"htmx:timeout",H);oe(l);m()};if(!he(r,"htmx:beforeRequest",H)){oe(s);m();return e}var T=Wt(r);var q=Qt(r);se(["loadstart","loadend","progress","abort"],function(t){se([p,p.upload],function(e){e.addEventListener(t,function(e){he(r,"htmx:xhr:"+t,{lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total})})})});he(r,"htmx:beforeSend",H);const J=E?null:yn(p,r,v);p.send(J);return e}function In(e,t){const n=t.xhr;let r=null;let o=null;if(C(n,/HX-Push:/i)){r=n.getResponseHeader("HX-Push");o="push"}else if(C(n,/HX-Push-Url:/i)){r=n.getResponseHeader("HX-Push-Url");o="push"}else if(C(n,/HX-Replace-Url:/i)){r=n.getResponseHeader("HX-Replace-Url");o="replace"}if(r){if(r==="false"){return{}}else{return{type:o,path:r}}}const i=t.pathInfo.finalRequestPath;const s=t.pathInfo.responsePath;const l=re(e,"hx-push-url");const u=re(e,"hx-replace-url");const c=ie(e).boosted;let f=null;let a=null;if(l){f="push";a=l}else if(u){f="replace";a=u}else if(c){f="push";a=s||i}if(a){if(a==="false"){return{}}if(a==="true"){a=s||i}if(t.pathInfo.anchor&&a.indexOf("#")===-1){a=a+"#"+t.pathInfo.anchor}return{type:f,path:a}}else{return{}}}function Pn(e,t){var n=new RegExp(e.code);return n.test(t.toString(10))}function Dn(e){for(var t=0;t<Q.config.responseHandling.length;t++){var n=Q.config.responseHandling[t];if(Pn(n,e.status)){return n}}return{swap:false}}function kn(e){if(e){const t=r("title");if(t){t.innerHTML=e}else{window.document.title=e}}}function Mn(o,i){const s=i.xhr;let l=i.target;const e=i.etc;const u=i.select;if(!he(o,"htmx:beforeOnLoad",i))return;if(C(s,/HX-Trigger:/i)){Je(s,"HX-Trigger",o)}if(C(s,/HX-Location:/i)){zt();let e=s.getResponseHeader("HX-Location");var t;if(e.indexOf("{")===0){t=S(e);e=t.path;delete t.path}Hn("get",e,t).then(function(){Jt(e)});return}const n=C(s,/HX-Refresh:/i)&&s.getResponseHeader("HX-Refresh")==="true";if(C(s,/HX-Redirect:/i)){location.href=s.getResponseHeader("HX-Redirect");n&&location.reload();return}if(n){location.reload();return}if(C(s,/HX-Retarget:/i)){if(s.getResponseHeader("HX-Retarget")==="this"){i.target=o}else{i.target=ce(fe(o,s.getResponseHeader("HX-Retarget")))}}const c=In(o,i);const r=Dn(s);const f=r.swap;let a=!!r.error;let h=Q.config.ignoreTitle||r.ignoreTitle;let d=r.select;if(r.target){i.target=ce(fe(o,r.target))}var g=e.swapOverride;if(g==null&&r.swapOverride){g=r.swapOverride}if(C(s,/HX-Retarget:/i)){if(s.getResponseHeader("HX-Retarget")==="this"){i.target=o}else{i.target=ce(fe(o,s.getResponseHeader("HX-Retarget")))}}if(C(s,/HX-Reswap:/i)){g=s.getResponseHeader("HX-Reswap")}var p=s.response;var m=ue({shouldSwap:f,serverResponse:p,isError:a,ignoreTitle:h,selectOverride:d},i);if(r.event&&!he(l,r.event,m))return;if(!he(l,"htmx:beforeSwap",m))return;l=m.target;p=m.serverResponse;a=m.isError;h=m.ignoreTitle;d=m.selectOverride;i.target=l;i.failed=a;i.successful=!a;if(m.shouldSwap){if(s.status===286){ut(o)}Ut(o,function(e){p=e.transformResponse(p,s,o)});if(c.type){zt()}if(C(s,/HX-Reswap:/i)){g=s.getResponseHeader("HX-Reswap")}var y=pn(o,g);if(!y.hasOwnProperty("ignoreTitle")){y.ignoreTitle=h}l.classList.add(Q.config.swappingClass);let n=null;let r=null;if(u){d=u}if(C(s,/HX-Reselect:/i)){d=s.getResponseHeader("HX-Reselect")}const x=re(o,"hx-select-oob");const b=re(o,"hx-select");let e=function(){try{if(c.type){he(ne().body,"htmx:beforeHistoryUpdate",ue({history:c},i));if(c.type==="push"){Jt(c.path);he(ne().body,"htmx:pushedIntoHistory",{path:c.path})}else{Kt(c.path);he(ne().body,"htmx:replacedInHistory",{path:c.path})}}ze(l,p,y,{select:d||b,selectOOB:x,eventInfo:i,anchor:i.pathInfo.anchor,contextElement:o,afterSwapCallback:function(){if(C(s,/HX-Trigger-After-Swap:/i)){let e=o;if(!le(o)){e=ne().body}Je(s,"HX-Trigger-After-Swap",e)}},afterSettleCallback:function(){if(C(s,/HX-Trigger-After-Settle:/i)){let e=o;if(!le(o)){e=ne().body}Je(s,"HX-Trigger-After-Settle",e)}oe(n)}})}catch(e){ae(o,"htmx:swapError",i);oe(r);throw e}};let t=Q.config.globalViewTransitions;if(y.hasOwnProperty("transition")){t=y.transition}if(t&&he(o,"htmx:beforeTransition",i)&&typeof Promise!=="undefined"&&document.startViewTransition){const w=new Promise(function(e,t){n=e;r=t});const v=e;e=function(){document.startViewTransition(function(){v();return w})}}if(y.swapDelay>0){E().setTimeout(e,y.swapDelay)}else{e()}}if(a){ae(o,"htmx:responseError",ue({error:"Response Status Error Code "+s.status+" from "+i.pathInfo.requestPath},i))}}const Xn={};function Fn(){return{init:function(e){return null},getSelectors:function(){return null},onEvent:function(e,t){return true},transformResponse:function(e,t,n){return e},isInlineSwap:function(e){return false},handleSwap:function(e,t,n,r){return false},encodeParameters:function(e,t,n){return null}}}function Un(e,t){if(t.init){t.init(n)}Xn[e]=ue(Fn(),t)}function Bn(e){delete Xn[e]}function jn(e,n,r){if(n==undefined){n=[]}if(e==undefined){return n}if(r==undefined){r=[]}const t=te(e,"hx-ext");if(t){se(t.split(","),function(e){e=e.replace(/ /g,"");if(e.slice(0,7)=="ignore:"){r.push(e.slice(7));return}if(r.indexOf(e)<0){const t=Xn[e];if(t&&n.indexOf(t)<0){n.push(t)}}})}return jn(ce(u(e)),n,r)}var Vn=false;ne().addEventListener("DOMContentLoaded",function(){Vn=true});function _n(e){if(Vn||ne().readyState==="complete"){e()}else{ne().addEventListener("DOMContentLoaded",e)}}function $n(){if(Q.config.includeIndicatorStyles!==false){const e=Q.config.inlineStyleNonce?` nonce="${Q.config.inlineStyleNonce}"`:"";ne().head.insertAdjacentHTML("beforeend","<style"+e+">      ."+Q.config.indicatorClass+"{opacity:0}      ."+Q.config.requestClass+" ."+Q.config.indicatorClass+"{opacity:1; transition: opacity 200ms ease-in;}      ."+Q.config.requestClass+"."+Q.config.indicatorClass+"{opacity:1; transition: opacity 200ms ease-in;}      </style>")}}function zn(){const e=ne().querySelector('meta[name="htmx-config"]');if(e){return S(e.content)}else{return null}}function Jn(){const e=zn();if(e){Q.config=ue(Q.config,e)}}_n(function(){Jn();$n();let e=ne().body;kt(e);const t=ne().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");e.addEventListener("htmx:abort",function(e){const t=e.target;const n=ie(t);if(n&&n.xhr){n.xhr.abort()}});const n=window.onpopstate?window.onpopstate.bind(window):null;window.onpopstate=function(e){if(e.state&&e.state.htmx){Yt();se(t,function(e){he(e,"htmx:restored",{document:ne(),triggerEvent:he})})}else{if(n){n(e)}}};E().setTimeout(function(){he(e,"htmx:load",{});e=null},0)});return Q}();
Alpine.magic("formatISODate", () => (value, format) => {
  return value ? luxon.DateTime.fromISO(value).toFormat(format) : "";
});

jQuery(() => {
  jQuery(".select2").select2();
});

function search() {
  return {
    init: function () {
      Alpine.bind(document.body, {
        "x-on:keydown.prevent.ctrl.k": this.focus.bind(this),
        "x-on:keydown.prevent.cmd.k": this.focus.bind(this),
      });
    },
    focus: function () {
      this.$refs.q.focus();
    },
  };
}

function theme() {
  var systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  var systemTheme = systemIsDark ? "dark" : "light";
  var theme = Alpine.$persist(systemTheme).as("theme");
  return {
    theme: theme,
    toggleTheme: function () {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
  };
}
