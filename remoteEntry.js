var imageannotator;(()=>{"use strict";var e,t,r,n,o,i,a,s,f,u,l,c,d,h,p,v,m,b,y,g,w={17187:e=>{var t,r="object"==typeof Reflect?Reflect:null,n=r&&"function"==typeof r.apply?r.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};t=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(r,n){function o(r){e.removeListener(t,i),n(r)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",o),r([].slice.call(arguments))}v(e,t,i,{once:!0}),"error"!==t&&function(e,t,r){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,o)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var a=10;function s(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function f(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function u(e,t,r,n){var o,i,a,u;if(s(r),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),i=e._events),a=i[t]),void 0===a)a=i[t]=r,++e._eventsCount;else if("function"==typeof a?a=i[t]=n?[r,a]:[a,r]:n?a.unshift(r):a.push(r),(o=f(e))>0&&a.length>o&&!a.warned){a.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=a.length,u=l,console&&console.warn&&console.warn(u)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function c(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},o=l.bind(n);return o.listener=r,n.wrapFn=o,o}function d(e,t,r){var n=e._events;if(void 0===n)return[];var o=n[t];return void 0===o?[]:"function"==typeof o?r?[o.listener||o]:[o]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(o):p(o,o.length)}function h(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function p(e,t){for(var r=new Array(t),n=0;n<t;++n)r[n]=e[n];return r}function v(e,t,r,n){if("function"==typeof e.on)n.once?e.once(t,r):e.on(t,r);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(i){n.once&&e.removeEventListener(t,o),r(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return f(this)},i.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var o="error"===e,i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var s=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw s.context=a,s}var f=i[e];if(void 0===f)return!1;if("function"==typeof f)n(f,this,t);else{var u=f.length,l=p(f,u);for(r=0;r<u;++r)n(l[r],this,t)}return!0},i.prototype.addListener=function(e,t){return u(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return u(this,e,t,!0)},i.prototype.once=function(e,t){return s(t),this.on(e,c(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return s(t),this.prependListener(e,c(this,e,t)),this},i.prototype.removeListener=function(e,t){var r,n,o,i,a;if(s(t),void 0===(n=this._events))return this;if(void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(o=-1,i=r.length-1;i>=0;i--)if(r[i]===t||r[i].listener===t){a=r[i].listener,o=i;break}if(o<0)return this;0===o?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,o),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,a||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var o,i=Object.keys(r);for(n=0;n<i.length;++n)"removeListener"!==(o=i[n])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},i.prototype.listeners=function(e){return d(this,e,!0)},i.prototype.rawListeners=function(e){return d(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):h.call(e,t)},i.prototype.listenerCount=h,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},52731:(e,t,r)=>{var n={"./index":()=>Promise.all([r.e(657),r.e(675),r.e(757),r.e(546),r.e(627),r.e(19),r.e(865),r.e(704),r.e(874),r.e(52),r.e(92),r.e(86),r.e(966)]).then((()=>()=>r(98458)))},o=(e,t)=>(r.R=t,t=r.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),r.R=void 0,t),i=(e,t)=>{if(r.S){var n=r.S.default,o="default";if(n&&n!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return r.S[o]=e,r.I(o,t)}};r.d(t,{get:()=>o,init:()=>i})}},L={};function P(e){var t=L[e];if(void 0!==t)return t.exports;var r=L[e]={id:e,loaded:!1,exports:{}};return w[e].call(r.exports,r,r.exports,P),r.loaded=!0,r.exports}P.m=w,P.c=L,P.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return P.d(t,{a:t}),t},P.d=(e,t)=>{for(var r in t)P.o(t,r)&&!P.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},P.f={},P.e=e=>Promise.all(Object.keys(P.f).reduce(((t,r)=>(P.f[r](e,t),t)),[])),P.u=e=>e+"."+{19:"b79c79a1712f7443319c",38:"49ba7cc6fededeb98a6f",52:"a4113a89f40419e43183",59:"942c87c4a97543793b0a",86:"517d986d732551187ec3",92:"1aa791f83deb9278f51d",151:"71127c07eb2f3d00d1bc",181:"38e76ebc5758dc10d64f",206:"75b1a2956c0b99e7374e",270:"9be004814b6b9cf5c0d8",294:"e84c48e58ba9b452cf0c",305:"4713dcb95417f8dfd0d7",338:"20b8a5cc419b5a806166",356:"fa7d7b7d00e5e6998f5a",367:"46a811d66249553aed4f",371:"0ff9b0e5c65c9e7a1bae",381:"c3ba352c4da3b0545f4c",412:"778f549d4a0b86bb4f65",434:"22f22170ae59c0c61391",443:"996b6ebfde0f64dd6f9c",487:"4ddd1d7fdd07a9679c98",520:"3ce2cb05fe149c8b5c3d",539:"41ddd3370557c801083e",546:"27df77d53b22296e65a3",627:"c34ab293a79b9f4797b5",657:"22372619b3e7e3811ed4",675:"eac0e4c6755340858a27",676:"0c021e3056a75ad12903",704:"f9fae99ad0b8dbe7b208",757:"730ca1c313e506cb723c",764:"57f6cab8f0e33dbd6566",766:"49e289d0e3291d88dcce",767:"ed171692b1d4e2fdb53d",804:"6095150b3ce59988de67",865:"e641e8b31a437c8ef6c6",874:"f713da533d4cd060f005",918:"98407f2f2620018aefae",935:"13e132c31bc137ece6b5",938:"6d90619c73bfa774091b",943:"46aa83855752d688eb06",962:"9c8e25c2897584cb2ebd",966:"327e8f80eefc27886413",989:"d1697efeeba765cc2d35"}[e]+".js",P.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),P.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="imageannotator:",P.l=(r,n,o,i)=>{if(e[r])e[r].push(n);else{var a,s;if(void 0!==o)for(var f=document.getElementsByTagName("script"),u=0;u<f.length;u++){var l=f[u];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+o){a=l;break}}a||(s=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,P.nc&&a.setAttribute("nonce",P.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[n];var c=(t,n)=>{a.onerror=a.onload=null,clearTimeout(d);var o=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(n))),t)return t(n)},d=setTimeout(c.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=c.bind(null,a.onerror),a.onload=c.bind(null,a.onload),s&&document.head.appendChild(a)}},P.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},P.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{P.S={};var e={},t={};P.I=(r,n)=>{n||(n=[]);var o=t[r];if(o||(o=t[r]={}),!(n.indexOf(o)>=0)){if(n.push(o),e[r])return e[r];P.o(P.S,r)||(P.S[r]={});var i=P.S[r],a="imageannotator",s=(e,t,r,n)=>{var o=i[e]=i[e]||{},s=o[t];(!s||!s.loaded&&(!n!=!s.eager?n:a>s.from))&&(o[t]={get:r,from:a,eager:!!n})},f=[];switch(r){case"default":s("@comunica/actor-init-sparql","1.22.0",(()=>Promise.all([P.e(657),P.e(151),P.e(874),P.e(52),P.e(443),P.e(270)]).then((()=>()=>P(36875))))),s("@inrupt/solid-client-authn-browser","1.11.2",(()=>Promise.all([P.e(305),P.e(874)]).then((()=>()=>P(94305))))),s("@material-ui/core","4.11.4",(()=>Promise.all([P.e(675),P.e(757),P.e(546),P.e(627),P.e(367),P.e(865),P.e(704)]).then((()=>()=>P(81367))))),s("@material-ui/core","4.12.3",(()=>Promise.all([P.e(675),P.e(757),P.e(938),P.e(989),P.e(865),P.e(704)]).then((()=>()=>P(31989))))),s("buffer","6.0.3",(()=>P.e(764).then((()=>()=>P(48764))))),s("consolid-react-ui","0.0.12",(()=>Promise.all([P.e(675),P.e(546),P.e(938),P.e(371),P.e(865),P.e(704),P.e(918),P.e(86),P.e(943)]).then((()=>()=>P(36371))))),s("consolid","1.0.7",(()=>Promise.all([P.e(657),P.e(874),P.e(52),P.e(92),P.e(38)]).then((()=>()=>P(1487))))),s("events","3.3.0",(()=>()=>P(17187)),1),s("path","0.12.7",(()=>Promise.all([P.e(962),P.e(520)]).then((()=>()=>P(62520))))),s("react-dom","17.0.2",(()=>Promise.all([P.e(935),P.e(865)]).then((()=>()=>P(73935))))),s("react-query","3.24.4",(()=>Promise.all([P.e(767),P.e(865),P.e(704),P.e(206)]).then((()=>()=>P(88767))))),s("react-router-dom","5.3.0",(()=>Promise.all([P.e(412),P.e(865),P.e(356)]).then((()=>()=>P(79412))))),s("react","17.0.2",(()=>P.e(294).then((()=>()=>P(67294))))),s("recoil","0.4.1",(()=>Promise.all([P.e(804),P.e(865),P.e(704)]).then((()=>()=>P(2804))))),s("styled-components","5.3.1",(()=>Promise.all([P.e(434),P.e(865),P.e(381)]).then((()=>()=>P(33434))))),s("util","0.10.4",(()=>P.e(59).then((()=>()=>P(18059))))),s("util","0.12.4",(()=>Promise.all([P.e(539),P.e(181)]).then((()=>()=>P(89539)))))}return e[r]=f.length?Promise.all(f).then((()=>e[r]=1)):1}}})(),(()=>{var e;P.g.importScripts&&(e=P.g.location+"");var t=P.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),P.p=e})(),r=e=>{var t=e=>e.split(".").map((e=>+e==e?+e:e)),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=r[1]?t(r[1]):[];return r[2]&&(n.length++,n.push.apply(n,t(r[2]))),r[3]&&(n.push([]),n.push.apply(n,t(r[3]))),n},n=(e,t)=>{e=r(e),t=r(t);for(var n=0;;){if(n>=e.length)return n<t.length&&"u"!=(typeof t[n])[0];var o=e[n],i=(typeof o)[0];if(n>=t.length)return"u"==i;var a=t[n],s=(typeof a)[0];if(i!=s)return"o"==i&&"n"==s||"s"==s||"u"==i;if("o"!=i&&"u"!=i&&o!=a)return o<a;n++}},o=e=>{var t=e[0],r="";if(1===e.length)return"*";if(t+.5){r+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var n=1,i=1;i<e.length;i++)n--,r+="u"==(typeof(s=e[i]))[0]?"-":(n>0?".":"")+(n=2,s);return r}var a=[];for(i=1;i<e.length;i++){var s=e[i];a.push(0===s?"not("+f()+")":1===s?"("+f()+" || "+f()+")":2===s?a.pop()+" "+a.pop():o(s))}return f();function f(){return a.pop().replace(/^\((.+)\)$/,"$1")}},i=(e,t)=>{if(0 in e){t=r(t);var n=e[0],o=n<0;o&&(n=-n-1);for(var a=0,s=1,f=!0;;s++,a++){var u,l,c=s<e.length?(typeof e[s])[0]:"";if(a>=t.length||"o"==(l=(typeof(u=t[a]))[0]))return!f||("u"==c?s>n&&!o:""==c!=o);if("u"==l){if(!f||"u"!=c)return!1}else if(f)if(c==l)if(s<=n){if(u!=e[s])return!1}else{if(o?u>e[s]:u<e[s])return!1;u!=e[s]&&(f=!1)}else if("s"!=c&&"n"!=c){if(o||s<=n)return!1;f=!1,s--}else{if(s<=n||l<c!=o)return!1;f=!1}else"s"!=c&&"n"!=c&&(f=!1,s--)}}var d=[],h=d.pop.bind(d);for(a=1;a<e.length;a++){var p=e[a];d.push(1==p?h()|h():2==p?h()&h():p?i(p,t):!h())}return!!h()},a=(e,t)=>{var r=P.S[e];if(!r||!P.o(r,t))throw new Error("Shared module "+t+" doesn't exist in shared scope "+e);return r},s=(e,t)=>{var r=e[t];return Object.keys(r).reduce(((e,t)=>!e||!r[e].loaded&&n(e,t)?t:e),0)},f=(e,t,r)=>"Unsatisfied version "+t+" of shared singleton module "+e+" (required "+o(r)+")",u=(e,t,r,n)=>{var o=s(e,r);return i(n,o)||"undefined"!=typeof console&&console.warn&&console.warn(f(r,o,n)),d(e[r][o])},l=(e,t,r)=>{var o=e[t];return(t=Object.keys(o).reduce(((e,t)=>!i(r,t)||e&&!n(e,t)?e:t),0))&&o[t]},c=(e,t,r,n)=>{var i=e[r];return"No satisfying version ("+o(n)+") of shared module "+r+" found in shared scope "+t+".\nAvailable versions: "+Object.keys(i).map((e=>e+" from "+i[e].from)).join(", ")},d=e=>(e.loaded=1,e.get()),p=(h=e=>function(t,r,n,o){var i=P.I(t);return i&&i.then?i.then(e.bind(e,t,P.S[t],r,n,o)):e(t,P.S[t],r,n,o)})(((e,t,r,n)=>(a(e,r),((e,t,r,n)=>{var o=l(e,r,n);if(o)return d(o);throw new Error(c(e,t,r,n))})(t,e,r,n)))),v=h(((e,t,r,n,o)=>t&&P.o(t,r)?u(t,0,r,n):o())),m=h(((e,t,r,n,o)=>{var i=t&&P.o(t,r)&&l(t,r,n);return i?d(i):o()})),b={},y={86874:()=>m("default","events",[1,3,3,0],(()=>()=>P(17187))),46935:()=>p("default","util",[2,0,12,4]),66042:()=>m("default","buffer",[1,6,0,3],(()=>P.e(764).then((()=>()=>P(48764))))),44482:()=>p("default","path",[2,0,12,7]),48600:()=>m("default","util",[2,0,12,4],(()=>P.e(539).then((()=>()=>P(89539))))),77865:()=>v("default","react",[1,17,0,1],(()=>P.e(294).then((()=>()=>P(67294))))),21704:()=>v("default","react-dom",[1,17,0,1],(()=>P.e(935).then((()=>()=>P(73935))))),64018:()=>m("default","react-router-dom",[1,5,2,0],(()=>P.e(412).then((()=>()=>P(79412))))),81929:()=>v("default","@material-ui/core",[1,4,11,0],(()=>Promise.all([P.e(757),P.e(989)]).then((()=>()=>P(31989))))),23198:()=>m("default","consolid",[1,1,0,7],(()=>Promise.all([P.e(657),P.e(874),P.e(52),P.e(92),P.e(487)]).then((()=>()=>P(1487))))),75073:()=>m("default","@inrupt/solid-client-authn-browser",[1,1,11,2],(()=>Promise.all([P.e(305),P.e(874)]).then((()=>()=>P(94305))))),81092:()=>m("default","@comunica/actor-init-sparql",[1,1,22,0],(()=>Promise.all([P.e(151),P.e(443),P.e(766)]).then((()=>()=>P(36875))))),15962:()=>m("default","util",[2,0,12,4],(()=>P.e(338).then((()=>()=>P(18059))))),2576:()=>m("default","consolid-react-ui",[4,0,0,12],(()=>Promise.all([P.e(938),P.e(371),P.e(918)]).then((()=>()=>P(36371))))),23664:()=>m("default","styled-components",[1,5,3,1],(()=>P.e(434).then((()=>()=>P(33434))))),24853:()=>m("default","recoil",[2,0,4,1],(()=>P.e(804).then((()=>()=>P(2804))))),60698:()=>m("default","react-query",[1,3,24,4],(()=>P.e(767).then((()=>()=>P(88767))))),80527:()=>m("default","path",[2,0,12,7],(()=>Promise.all([P.e(962),P.e(676)]).then((()=>()=>P(62520))))),96533:()=>v("default","@material-ui/core",[1,4,11,0],(()=>P.e(367).then((()=>()=>P(81367)))))},g={52:[46935,66042],86:[23198,75073],92:[81092],443:[44482,48600],704:[21704],865:[77865],874:[86874],918:[64018,81929],962:[15962],966:[2576,23664,24853,60698,80527,96533]},P.f.consumes=(e,t)=>{P.o(g,e)&&g[e].forEach((e=>{if(P.o(b,e))return t.push(b[e]);var r=t=>{b[e]=0,P.m[e]=r=>{delete P.c[e],r.exports=t()}},n=t=>{delete b[e],P.m[e]=r=>{throw delete P.c[e],t}};try{var o=y[e]();o.then?t.push(b[e]=o.then(r).catch(n)):r(o)}catch(e){n(e)}}))},(()=>{var e={841:0};P.f.j=(t,r)=>{var n=P.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else if(/^(8(6|65|74)|9(18|2|62)|443|52|704)$/.test(t))e[t]=0;else{var o=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=o);var i=P.p+P.u(t),a=new Error;P.l(i,(r=>{if(P.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,n[1](a)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,o,[i,a,s]=r,f=0;for(n in a)P.o(a,n)&&(P.m[n]=a[n]);for(s&&s(P),t&&t(r);f<i.length;f++)o=i[f],P.o(e,o)&&e[o]&&e[o][0](),e[i[f]]=0},r=self.webpackChunkimageannotator=self.webpackChunkimageannotator||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var _=P(P.s=52731);imageannotator=_})();