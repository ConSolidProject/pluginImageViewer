(self.webpackChunkimageannotator=self.webpackChunkimageannotator||[]).push([[338],{81725:e=>{"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},2974:e=>{e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},18059:(e,t,n)=>{var r=n(34155),o=/%[sdj%]/g;t.format=function(e){if(!h(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(c(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,i=r.length,u=String(e).replace(o,(function(e){if("%%"===e)return"%";if(n>=i)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}})),s=r[n];n<i;s=r[++n])d(s)||!j(s)?u+=" "+s:u+=" "+c(s);return u},t.deprecate=function(e,o){if(m(n.g.process))return function(){return t.deprecate(e,o).apply(this,arguments)};if(!0===r.noDeprecation)return e;var i=!1;return function(){if(!i){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),i=!0}return e.apply(this,arguments)}};var i,u={};function c(e,n){var r={seen:[],stylize:l};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(n)?r.showHidden=n:n&&t._extend(r,n),m(r.showHidden)&&(r.showHidden=!1),m(r.depth)&&(r.depth=2),m(r.colors)&&(r.colors=!1),m(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=s),a(r,e,r.depth)}function s(e,t){var n=c.styles[t];return n?"["+c.colors[n][0]+"m"+e+"["+c.colors[n][1]+"m":e}function l(e,t){return e}function a(e,n,r){if(e.customInspect&&n&&w(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,e);return h(o)||(o=a(e,o,r)),o}var i=function(e,t){if(m(t))return e.stylize("undefined","undefined");if(h(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return b(t)?e.stylize(""+t,"number"):g(t)?e.stylize(""+t,"boolean"):d(t)?e.stylize("null","null"):void 0}(e,n);if(i)return i;var u=Object.keys(n),c=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(u);if(e.showHidden&&(u=Object.getOwnPropertyNames(n)),S(n)&&(u.indexOf("message")>=0||u.indexOf("description")>=0))return p(n);if(0===u.length){if(w(n)){var s=n.name?": "+n.name:"";return e.stylize("[Function"+s+"]","special")}if(v(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(O(n))return e.stylize(Date.prototype.toString.call(n),"date");if(S(n))return p(n)}var l,j="",z=!1,x=["{","}"];return y(n)&&(z=!0,x=["[","]"]),w(n)&&(j=" [Function"+(n.name?": "+n.name:"")+"]"),v(n)&&(j=" "+RegExp.prototype.toString.call(n)),O(n)&&(j=" "+Date.prototype.toUTCString.call(n)),S(n)&&(j=" "+p(n)),0!==u.length||z&&0!=n.length?r<0?v(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),l=z?function(e,t,n,r,o){for(var i=[],u=0,c=t.length;u<c;++u)N(t,String(u))?i.push(f(e,t,n,r,String(u),!0)):i.push("");return o.forEach((function(o){o.match(/^\d+$/)||i.push(f(e,t,n,r,o,!0))})),i}(e,n,r,c,u):u.map((function(t){return f(e,n,r,c,t,z)})),e.seen.pop(),function(e,t,n){return e.reduce((function(e,t){return t.indexOf("\n"),e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}(l,j,x)):x[0]+j+x[1]}function p(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,n,r,o,i){var u,c,s;if((s=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?c=s.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):s.set&&(c=e.stylize("[Setter]","special")),N(r,o)||(u="["+o+"]"),c||(e.seen.indexOf(s.value)<0?(c=d(n)?a(e,s.value,null):a(e,s.value,n-1)).indexOf("\n")>-1&&(c=i?c.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+c.split("\n").map((function(e){return"   "+e})).join("\n")):c=e.stylize("[Circular]","special")),m(u)){if(i&&o.match(/^\d+$/))return c;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=e.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=e.stylize(u,"string"))}return u+": "+c}function y(e){return Array.isArray(e)}function g(e){return"boolean"==typeof e}function d(e){return null===e}function b(e){return"number"==typeof e}function h(e){return"string"==typeof e}function m(e){return void 0===e}function v(e){return j(e)&&"[object RegExp]"===z(e)}function j(e){return"object"==typeof e&&null!==e}function O(e){return j(e)&&"[object Date]"===z(e)}function S(e){return j(e)&&("[object Error]"===z(e)||e instanceof Error)}function w(e){return"function"==typeof e}function z(e){return Object.prototype.toString.call(e)}function x(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(e){if(m(i)&&(i=r.env.NODE_DEBUG||""),e=e.toUpperCase(),!u[e])if(new RegExp("\\b"+e+"\\b","i").test(i)){var n=r.pid;u[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else u[e]=function(){};return u[e]},t.inspect=c,c.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},c.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=y,t.isBoolean=g,t.isNull=d,t.isNullOrUndefined=function(e){return null==e},t.isNumber=b,t.isString=h,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=m,t.isRegExp=v,t.isObject=j,t.isDate=O,t.isError=S,t.isFunction=w,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(2974);var E=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function D(){var e=new Date,t=[x(e.getHours()),x(e.getMinutes()),x(e.getSeconds())].join(":");return[e.getDate(),E[e.getMonth()],t].join(" ")}function N(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",D(),t.format.apply(t,arguments))},t.inherits=n(81725),t._extend=function(e,t){if(!t||!j(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}}}]);