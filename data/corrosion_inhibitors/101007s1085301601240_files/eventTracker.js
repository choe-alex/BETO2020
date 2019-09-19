var EventTracker=function(){"use strict";var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;var r=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(r,i){for(var o,a,u=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(r),s=1;s<arguments.length;s++){for(var c in o=Object(arguments[s]))t.call(o,c)&&(u[c]=o[c]);if(e){a=e(o);for(var f=0;f<a.length;f++)n.call(o,a[f])&&(u[a[f]]=o[a[f]])}}return u};var i=setTimeout;function o(){}function a(e){if(!(this instanceof a))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function u(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,a._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void c(t.promise,e)}s(t.promise,r)}else(1===e._state?s:c)(t.promise,e._value)})):e._deferreds.push(t)}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof a)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void l((r=n,i=t,function(){r.apply(i,arguments)}),e)}e._state=1,e._value=t,f(e)}catch(t){c(e,t)}var r,i}function c(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&a._immediateFn(function(){e._handled||a._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}}a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(o);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},a.all=function(e){return new a(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var i=r.length;function o(e,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var u=a.then;if("function"==typeof u)return void u.call(a,function(t){o(e,t)},n)}r[e]=a,0==--i&&t(r)}catch(e){n(e)}}for(var a=0;a<r.length;a++)o(a,r[a])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,n){n(e)})},a.race=function(e){return new a(function(t,n){for(var r=0,i=e.length;r<i;r++)e[r].then(t,n)})},a._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){i(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},window.Promise||(window.Promise=a);var d={display:{endpoint:"track/event/display",validate:function(e){var t=e.doi,n=e.content_type,r=e.business_partner_ids,i=void 0===r?[]:r,o=e.access_granted,a=void 0===o?null:o;if(!t||!n||!Array.isArray(i))throw new Error("Invalid payload");return{doi:t,content_type:n,business_partner_ids:i,access_granted:a}}},video:{endpoint:"track/event/video",validate:function(e){var t=e.doi,n=e.business_partner_ids,r=void 0===n?[]:n,i=e.action,o=e.current_time;if(!t||!Array.isArray(r)||!i)throw new Error("Invalid payload");var a={doi:t,business_partner_ids:r,action:i,current_time:o};return o&&(a.current_time=o),a}}},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var v=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.queue=[]}return h(e,[{key:"enqueue",value:function(e){this.queue.push(e)}},{key:"dequeue",value:function(){return this.queue.shift()}},{key:"isEmpty",value:function(){return 0===this.queue.length}}]),e}();var y=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&u.return&&u.return()}finally{if(i)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();return function(){function e(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).platform,n=void 0===t?null:t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),null===n?console.log("Platform is required"):(this.queue=new v,this.baseUrl="https://event-tracker.springernature.com",this.platform=n,this._init())}return p(e,[{key:"_init",value:function(){var e,t,n=this,r=this.baseUrl;window.addEventListener("message",this._iframeEventHandler.bind(this)),(e=r,t=e,new a(function(e,n){var r=document.createElement("iframe");r.setAttribute("src",t),r.setAttribute("title","EventTracker"),r.setAttribute("id","event-tracker"),r.setAttribute("height","0"),r.setAttribute("width","0"),r.setAttribute("style","display:none; visibility:hidden"),r.setAttribute("aria-hidden",!0),r.setAttribute("tabindex","-1"),r.addEventListener("load",function(){e(this)}),r.addEventListener("error",function(e){n(e)}),document.body.appendChild(r)})).then(function(e){n.iframe=e,n._sendMessagesTo(e)}).catch(function(e){return e})}},{key:"_iframeEventHandler",value:function(e){var t=Object.prototype.hasOwnProperty.call(e.data,"cookies")?e.data.cookies:void 0;if(t){var n=!0,r=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var u=o.value,s=y(u,2),c=s[0],f=s[1],l=this._expiryDateFor(c);document.cookie=c+"="+f+"; path=/;"+l}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}}},{key:"_expiryDateFor",value:function(e){return"event-tracker"===e?" expires=Tue, 31 Dec 2199 23:59:59 UTC;":""}},{key:"_sendMessagesTo",value:function(e){for(;!this.queue.isEmpty();)e.contentWindow.postMessage(this.queue.dequeue(),this.baseUrl)}},{key:"_addClientStateTo",value:function(e){return r({},e,{client_timestamp:(t=new Date,new Date(t.getTime()-6e4*t.getTimezoneOffset()).toJSON().replace("Z","")),platform:this.platform,url:window.location.href,user_agent:navigator.userAgent});var t}},{key:"_addToQueue",value:function(e,t){this.queue.enqueue({payload:t,endpoint:e})}},{key:"sendEvent",value:function(e,t){if(e&&t&&0!==Object.keys(t).length)try{var n=d[e];this._addToQueue(n.endpoint,this._addClientStateTo(n.validate(t))),this.iframe&&this._sendMessagesTo(this.iframe)}catch(e){console.log("Error message:",e),console.log("There was an error on sending event")}else console.log("Payload and type are required")}},{key:"sendDisplayEvent",value:function(e){this.sendEvent("display",e)}}]),e}()}();
