(self.webpackChunkimageannotator=self.webpackChunkimageannotator||[]).push([[943],{95318:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.default=e.exports,e.exports.__esModule=!0},20862:(e,t,r)=>{var o=r(50008).default;function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}e.exports=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==o(e)&&"function"!=typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var s=u?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=e[a]}return r.default=e,t&&t.set(e,r),r},e.exports.default=e.exports,e.exports.__esModule=!0},50008:e=>{function t(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=t=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),t(r)}e.exports=t,e.exports.default=e.exports,e.exports.__esModule=!0},89875:(e,t,r)=>{"use strict";var o=r(95318),n=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=n(r(77865)),a=(0,o(r(2108)).default)(u.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"ChevronLeft");t.default=a},64566:(e,t,r)=>{"use strict";var o=r(95318),n=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=n(r(77865)),a=(0,o(r(2108)).default)(u.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");t.default=a},2108:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o.createSvgIcon}});var o=r(28546)},55877:(e,t,r)=>{var o=r(23570),n=r(71171),u=n;u.v1=o,u.v4=n,e.exports=u},45327:e=>{for(var t=[],r=0;r<256;++r)t[r]=(r+256).toString(16).substr(1);e.exports=function(e,r){var o=r||0,n=t;return[n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]]].join("")}},85217:e=>{var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var r=new Uint8Array(16);e.exports=function(){return t(r),r}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},23570:(e,t,r)=>{var o,n,u=r(85217),a=r(45327),s=0,l=0;e.exports=function(e,t,r){var f=t&&r||0,p=t||[],i=(e=e||{}).node||o,c=void 0!==e.clockseq?e.clockseq:n;if(null==i||null==c){var d=u();null==i&&(i=o=[1|d[0],d[1],d[2],d[3],d[4],d[5]]),null==c&&(c=n=16383&(d[6]<<8|d[7]))}var v=void 0!==e.msecs?e.msecs:(new Date).getTime(),y=void 0!==e.nsecs?e.nsecs:l+1,x=v-s+(y-l)/1e4;if(x<0&&void 0===e.clockseq&&(c=c+1&16383),(x<0||v>s)&&void 0===e.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=v,l=y,n=c;var m=(1e4*(268435455&(v+=122192928e5))+y)%4294967296;p[f++]=m>>>24&255,p[f++]=m>>>16&255,p[f++]=m>>>8&255,p[f++]=255&m;var b=v/4294967296*1e4&268435455;p[f++]=b>>>8&255,p[f++]=255&b,p[f++]=b>>>24&15|16,p[f++]=b>>>16&255,p[f++]=c>>>8|128,p[f++]=255&c;for(var _=0;_<6;++_)p[f+_]=i[_];return t||a(p)}},71171:(e,t,r)=>{var o=r(85217),n=r(45327);e.exports=function(e,t,r){var u=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||o)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[u+s]=a[s];return t||n(a)}}}]);