(()=>{"use strict";var t,e={256:(t,e,n)=>{const i=window.classnames;var s,r,o=n.n(i);function a(t=[]){console.log("Pagination",t),this.items=t,this.currentPageNum=1,this.maxPagesToShow=7,this.total=t.length,this.setItems(t)}a.prototype.setItems=function(t){t.forEach(((t,e)=>{t.page_num=e+1}));const e=t.filter((t=>t.is_active));this.currentPageNum=e.length>0?e[0].page_num:1,this.items=t},a.prototype.setCurrentPageNum=function(t){this.currentPageNum=t},a.prototype.getCurrentItem=function(){const t=this.items.filter((t=>t.is_active));return t.length>0?t[0]:null},a.prototype.getNextItem=function(){const t=this.items.filter((t=>t.page_num===this.currentPageNum+1));return t.length>0?t[0]:null},a.prototype.getPreviousItem=function(){const t=this.items.filter((t=>t.page_num===this.currentPageNum-1));return t.length>0?t[0]:null},a.prototype.getItems=function(){return this.items},a.prototype.returnRangeOfLinks=function(t=""){const e=[];if(this.total<=1)return[];if(this.total<=this.maxPagesToShow)for(let t=1;t<=this.total;t++)e.push(this.items[t]);else{const t=Math.floor((this.maxPagesToShow-3)/2);let n;n=this.currentPageNum+t>this.total?this.total-this.maxPagesToShow+2:this.currentPageNum-t,n<2&&(n=2);let i=n+this.maxPagesToShow-3;i>=this.total&&(i=this.total-1),e.push(this.items[0]),n>2&&e.push("...");for(let t=n;t<=i;t++)e.push(this.items[t]);i<this.total-1&&e.push("..."),e.push(this.items[this.total-1])}return e},a.prototype.renderItem=function(t,e=""){let n,i,s,r=!1;if("..."!==t){const e=this.items.filter((e=>e.page_num===t)),o=e.shift();s=o.page_num.toLocaleString(),n=o?.is_active||!1,r=o?.link||"",i=o?.title||""}else i="...",s="...";const a=n||!r?"span":"a";return`<${a} ${"span"!==a?`href="${r}"`:""} class="${e=o()(e,"common-block-style__pagination__page-numbers",{"is-active":n})}" title="${i}">${s}</${a}>`},a.prototype.renderItems=function(t="",e=""){return this.returnRangeOfLinks(e).map((e=>"..."===e?this.renderItem("...","common-block-style__pagination__ellipsis"):this.renderItem(e.page_num,t)))},s="pagination",r=a,window.prcFunctions[s]||(window.prcFunctions[s]=r)}},n={};function i(t){var s=n[t];if(void 0!==s)return s.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,i),r.exports}i.m=e,t=[],i.O=(e,n,s,r)=>{if(!n){var o=1/0;for(l=0;l<t.length;l++){for(var[n,s,r]=t[l],a=!0,u=0;u<n.length;u++)(!1&r||o>=r)&&Object.keys(i.O).every((t=>i.O[t](n[u])))?n.splice(u--,1):(a=!1,r<o&&(o=r));if(a){t.splice(l--,1);var h=s();void 0!==h&&(e=h)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[n,s,r]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={826:0,431:0};i.O.j=e=>0===t[e];var e=(e,n)=>{var s,r,[o,a,u]=n,h=0;if(o.some((e=>0!==t[e]))){for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(u)var l=u(i)}for(e&&e(n);h<o.length;h++)r=o[h],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(l)},n=globalThis.webpackChunkpagination_style=globalThis.webpackChunkpagination_style||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var s=i.O(void 0,[431],(()=>i(256)));s=i.O(s)})();
//# sourceMappingURL=index.js.map