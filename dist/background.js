(()=>{"use strict";var e={221:(e,t,n)=>{function s(e){return Array.isArray?Array.isArray(e):"[object Array]"===h(e)}function r(e){return"string"==typeof e}function i(e){return"number"==typeof e}function c(e){return"object"==typeof e}function o(e){return null!=e}function a(e){return!e.trim().length}function h(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}n.r(t),n.d(t,{default:()=>K});const l=Object.prototype.hasOwnProperty;class u{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=d(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function d(e){let t=null,n=null,i=null,c=1;if(r(e)||s(e))i=e,t=g(e),n=f(e);else{if(!l.call(e,"name"))throw new Error("Missing name property in key");const s=e.name;if(i=s,l.call(e,"weight")&&(c=e.weight,c<=0))throw new Error((e=>`Property 'weight' in key '${e}' must be a positive integer`)(s));t=g(s),n=f(s)}return{path:t,id:n,weight:c,src:i}}function g(e){return s(e)?e:e.split(".")}function f(e){return s(e)?e.join("."):e}var p={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],a=!1;const l=(e,t,u)=>{if(o(e))if(t[u]){const d=e[t[u]];if(!o(d))return;if(u===t.length-1&&(r(d)||i(d)||function(e){return!0===e||!1===e||function(e){return c(e)&&null!==e}(e)&&"[object Boolean]"==h(e)}(d)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(d));else if(s(d)){a=!0;for(let e=0,n=d.length;e<n;e+=1)l(d[e],t,u+1)}else t.length&&l(d,t,u+1)}else n.push(e)};return l(e,r(t)?t.split("."):t,0),a?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1};const m=/[^ ]+/g;class y{constructor({getFn:e=p.getFn}={}){this.norm=function(e=3){const t=new Map;return{get(n){const s=n.match(m).length;if(t.has(s))return t.get(s);const r=parseFloat((1/Math.sqrt(s)).toFixed(e));return t.set(s,r),r},clear(){t.clear()}}}(3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,r(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();r(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!o(e)||a(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,i)=>{let c=this.getFn(e,t.path);if(o(c))if(s(c)){let e=[];const t=[{nestedArrIndex:-1,value:c}];for(;t.length;){const{nestedArrIndex:n,value:i}=t.pop();if(o(i))if(r(i)&&!a(i)){let t={v:i,i:n,n:this.norm.get(i)};e.push(t)}else s(i)&&i.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[i]=e}else if(!a(c)){let e={v:c,n:this.norm.get(c)};n.$[i]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function M(e,t,{getFn:n=p.getFn}={}){const s=new y({getFn:n});return s.setKeys(e.map(d)),s.setSources(t),s.create(),s}function x(e,t){const n=e.matches;t.matches=[],o(n)&&n.forEach((e=>{if(!o(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let r={indices:n,value:s};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function _(e,t){t.score=e.score}function v(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:r=p.distance,ignoreLocation:i=p.ignoreLocation}={}){const c=t/e.length;if(i)return c;const o=Math.abs(s-n);return r?c+o/r:o?1:c}const L=32;function S(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const r=e.charAt(n);t[r]=(t[r]||0)|1<<s-n-1}return t}class w{constructor(e,{location:t=p.location,threshold:n=p.threshold,distance:s=p.distance,includeMatches:r=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:c=p.minMatchCharLength,isCaseSensitive:o=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a},this.pattern=o?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(e,t)=>{this.chunks.push({pattern:e,alphabet:S(e),startIndex:t})},l=this.pattern.length;if(l>L){let e=0;const t=l%L,n=l-t;for(;e<n;)h(this.pattern.substr(e,L),e),e+=L;if(t){const e=l-L;h(this.pattern.substr(e),e)}}else h(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,ignoreLocation:a}=this.options;let h=[],l=0,u=!1;this.chunks.forEach((({pattern:t,alphabet:d,startIndex:g})=>{const{isMatch:f,score:m,indices:y}=function(e,t,n,{location:s=p.location,distance:r=p.distance,threshold:i=p.threshold,findAllMatches:c=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,includeMatches:a=p.includeMatches,ignoreLocation:h=p.ignoreLocation}={}){if(t.length>L)throw new Error("Pattern length exceeds max of 32.");const l=t.length,u=e.length,d=Math.max(0,Math.min(s,u));let g=i,f=d;const m=o>1||a,y=m?Array(u):[];let M;for(;(M=e.indexOf(t,f))>-1;){let e=v(t,{currentLocation:M,expectedLocation:d,distance:r,ignoreLocation:h});if(g=Math.min(e,g),f=M+l,m){let e=0;for(;e<l;)y[M+e]=1,e+=1}}f=-1;let x=[],_=1,S=l+u;const w=1<<l-1;for(let s=0;s<l;s+=1){let i=0,o=S;for(;i<o;)v(t,{errors:s,currentLocation:d+o,expectedLocation:d,distance:r,ignoreLocation:h})<=g?i=o:S=o,o=Math.floor((S-i)/2+i);S=o;let a=Math.max(1,d-o+1),p=c?u:Math.min(d+o,u)+l,M=Array(p+2);M[p+1]=(1<<s)-1;for(let i=p;i>=a;i-=1){let c=i-1,o=n[e.charAt(c)];if(m&&(y[c]=+!!o),M[i]=(M[i+1]<<1|1)&o,s&&(M[i]|=(x[i+1]|x[i])<<1|1|x[i+1]),M[i]&w&&(_=v(t,{errors:s,currentLocation:c,expectedLocation:d,distance:r,ignoreLocation:h}),_<=g)){if(g=_,f=c,f<=d)break;a=Math.max(1,2*d-f)}}if(v(t,{errors:s+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:h})>g)break;x=M}const k={isMatch:f>=0,score:Math.max(.001,_)};if(m){const e=function(e=[],t=p.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let c=e.length;i<c;i+=1){let c=e[i];c&&-1===s?s=i:c||-1===s||(r=i-1,r-s+1>=t&&n.push([s,r]),s=-1)}return e[i-1]&&i-s>=t&&n.push([s,i-1]),n}(y,o);e.length?a&&(k.indices=e):k.isMatch=!1}return k}(e,t,d,{location:s+g,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:a});f&&(u=!0),l+=m,f&&y&&(h=[...h,...y])}));let d={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(d.indices=h),d}}class k{constructor(e){this.pattern=e}static isMultiMatch(e){return b(e,this.multiRegex)}static isSingleMatch(e){return b(e,this.singleRegex)}search(){}}function b(e,t){const n=e.match(t);return n?n[1]:null}class I extends k{constructor(e,{location:t=p.location,threshold:n=p.threshold,distance:s=p.distance,includeMatches:r=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:c=p.minMatchCharLength,isCaseSensitive:o=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){super(e),this._bitapSearch=new w(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class C extends k{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const s=[],r=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+r,s.push([t,n-1]);const i=!!s.length;return{isMatch:i,score:i?1:0,indices:s}}}const $=[class extends k{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},C,class extends k{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends k{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},I],A=$.length,O=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,j=new Set([I.type,C.type]);const E=[];function F(e,t){for(let n=0,s=E.length;n<s;n+=1){let s=E[n];if(s.condition(e,t))return new s(e,t)}return new w(e,t)}const R="$and",P=e=>!(!e.$and&&!e.$or),z=e=>({[R]:Object.keys(e).map((t=>({[t]:e[t]})))});function N(e,t,{auto:n=!0}={}){const i=e=>{let o=Object.keys(e);const a=(e=>!!e.$path)(e);if(!a&&o.length>1&&!P(e))return i(z(e));if((e=>!s(e)&&c(e)&&!P(e))(e)){const s=a?e.$path:o[0],i=a?e.$val:e[s];if(!r(i))throw new Error((e=>`Invalid value for key ${e}`)(s));const c={keyId:f(s),pattern:i};return n&&(c.searcher=F(i,t)),c}let h={children:[],operator:o[0]};return o.forEach((t=>{const n=e[t];s(n)&&n.forEach((e=>{h.children.push(i(e))}))})),h};return P(e)||(e=z(e)),i(e)}class q{constructor(e,t={},n){this.options={...p,...t},this.options.useExtendedSearch,this._keyStore=new u(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof y))throw new Error("Incorrect 'index' type");this._myIndex=t||M(this.options.keys,this._docs,{getFn:this.options.getFn})}add(e){o(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:c,sortFn:o,ignoreFieldNorm:a}=this.options;let h=r(e)?r(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=p.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:r})=>{const i=e?e.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(t?1:s))})),e.score=n}))}(h,{ignoreFieldNorm:a}),c&&h.sort(o),i(t)&&t>-1&&(h=h.slice(0,t)),function(e,t,{includeMatches:n=p.includeMatches,includeScore:s=p.includeScore}={}){const r=[];return n&&r.push(x),s&&r.push(_),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,s)})),s}))}(h,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=F(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:r})=>{if(!o(e))return;const{isMatch:i,score:c,indices:a}=t.searchIn(e);i&&s.push({item:e,idx:n,matches:[{score:c,value:e,norm:r,indices:a}]})})),s}_searchLogical(e){const t=N(e,this.options),n=(e,t,s)=>{if(!e.children){const{keyId:n,searcher:r}=e,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:r});return i&&i.length?[{idx:s,item:t,matches:i}]:[]}switch(e.operator){case R:{const r=[];for(let i=0,c=e.children.length;i<c;i+=1){const c=e.children[i],o=n(c,t,s);if(!o.length)return[];r.push(...o)}return r}case"$or":{const r=[];for(let i=0,c=e.children.length;i<c;i+=1){const c=e.children[i],o=n(c,t,s);if(o.length){r.push(...o);break}}return r}}},s=this._myIndex.records,r={},i=[];return s.forEach((({$:e,i:s})=>{if(o(e)){let c=n(t,e,s);c.length&&(r[s]||(r[s]={idx:s,item:e,matches:[]},i.push(r[s])),c.forEach((({matches:e})=>{r[s].matches.push(...e)})))}})),i}_searchObjectList(e){const t=F(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:e,i:s})=>{if(!o(e))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),i.length&&r.push({idx:s,item:e,matches:i})})),r}_findMatches({key:e,value:t,searcher:n}){if(!o(t))return[];let r=[];if(s(t))t.forEach((({v:t,i:s,n:i})=>{if(!o(t))return;const{isMatch:c,score:a,indices:h}=n.searchIn(t);c&&r.push({score:a,key:e,value:t,idx:s,norm:i,indices:h})}));else{const{v:s,n:i}=t,{isMatch:c,score:o,indices:a}=n.searchIn(s);c&&r.push({score:o,key:e,value:s,norm:i,indices:a})}return r}}q.version="6.4.3",q.createIndex=M,q.parseIndex=function(e,{getFn:t=p.getFn}={}){const{keys:n,records:s}=e,r=new y({getFn:t});return r.setKeys(n),r.setIndexRecords(s),r},q.config=p,q.parseQuery=N,function(...e){E.push(...e)}(class{constructor(e,{isCaseSensitive:t=p.isCaseSensitive,includeMatches:n=p.includeMatches,minMatchCharLength:s=p.minMatchCharLength,ignoreLocation:r=p.ignoreLocation,findAllMatches:i=p.findAllMatches,location:c=p.location,threshold:o=p.threshold,distance:a=p.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:c,threshold:o,distance:a},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(O).filter((e=>e&&!!e.trim())),s=[];for(let e=0,r=n.length;e<r;e+=1){const r=n[e];let i=!1,c=-1;for(;!i&&++c<A;){const e=$[c];let n=e.isMultiMatch(r);n&&(s.push(new e(n,t)),i=!0)}if(!i)for(c=-1;++c<A;){const e=$[c];let n=e.isSingleMatch(r);if(n){s.push(new e(n,t));break}}}return s}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,i=[],c=0;for(let s=0,o=t.length;s<o;s+=1){const o=t[s];i.length=0,r=0;for(let t=0,s=o.length;t<s;t+=1){const s=o[t],{isMatch:a,indices:h,score:l}=s.search(e);if(!a){c=0,r=0,i.length=0;break}if(r+=1,c+=l,n){const e=s.constructor.type;j.has(e)?i=[...i,...h]:i.push(h)}}if(r){let e={isMatch:!0,score:c/r};return n&&(e.indices=i),e}}return{isMatch:!1,score:1}}});const K=q},851:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.handleClick=void 0;const r=s(n(394)),i=n(161),c=n(362);async function o(e,t){console.log(e.selectionText),function(e){chrome.tabs.sendMessage(e.id,null,(async e=>{e||await new Promise((e=>{chrome.tabs.insertCSS({file:"mouseover.css"}),chrome.tabs.executeScript({file:"content.js"},e)}))}))}(t);const n=(await r.default("site:quizlet.com "+e.selectionText)).map((e=>i.getId(e.link))).filter((e=>e)),s=await i.getSets(n);await async function(e,t){c.prepareSearch(t)}(0,s)}chrome.runtime.onInstalled.addListener((function(){chrome.contextMenus.create({title:"\"I'm not cheating, I'm using my resources\"",id:"search",contexts:["selection"]})})),chrome.contextMenus.onClicked.addListener(o),t.handleClick=o,chrome.runtime.onMessage.addListener((function(e,t,n){const s=c.searchFuzzy(e);console.log(`Search: "${e}"`,s),n(s)}))},78:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cache=void 0,t.cache={get:e=>new Promise((t=>chrome.storage.local.get(e,t))),set:(e,t)=>new Promise((n=>chrome.storage.local.set({[e]:t},n)))}},362:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.searchFuzzy=t.prepareSearch=void 0;const r=s(n(221)),i={};let c;const o={includeScore:!0,ignoreLocation:!0,keys:["word","definition"]};t.prepareSearch=function(e){console.log("preparing fuse: ",e),Object.assign(i,e);let t=Object.values(i).flatMap((e=>e));c=new r.default(t,o)},t.searchFuzzy=function(e){let t=c?.search(e);if(t)return t.slice(0,3)}},161:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSets=t.scrapeSet=t.getId=void 0;const s=n(78);async function r(e){console.log(`scraping quizlet set #${e}`);const t=await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D="+e);let n=(await t.json()).responses[0].models.term.map((({word:e,definition:t})=>({word:e,definition:t})));return s.cache.set(e,n),n}t.getId=function(e){let t=new URL(e).pathname.split("/").find((e=>(+e).toString()==e));return t||console.warn("unable to process quizlet url"+e),t},t.scrapeSet=r,t.getSets=async function(e,t=!0){let n=await s.cache.get(e);if(!t)return n;const i=e.find((e=>!n.hasOwnProperty(e)));return n[i]=await r(i),n}},394:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=async function(e){return(await async function(e,t="fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a",n="google"){return(await fetch(`https://serpapi.com/search?api_key=${t}&q=${e}&engine=${n}`)).json()}(e)).organic_results}}},t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(851)})();