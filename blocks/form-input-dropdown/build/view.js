!function(){"use strict";var e={n:function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,{a:o}),o},d:function(t,o){for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,o=window.wp.domReady,r=e.n(o),n=window.prcComponents;function l(e){console.log("ON CHANGE"),console.log(e)}r()((()=>{const e={active:!1};window.prcBlocks?window.prcBlocks["form-input-dropdown"]=e:window.prcBlocks={"form-input-dropdown":e},document.querySelectorAll(".wp-block-prc-block-form-input-dropdown").forEach((e=>{const o=e.getAttribute("class"),r=e.getAttribute("id"),i=e.getAttribute("search"),c=e.getAttribute("multiple"),a=e.getAttribute("multiple-search"),u=e.getAttribute("placeholder"),d=e.getAttribute("inline"),p=e.getAttribute("animated"),s=document.createElement("div");e.parentNode.insertBefore(s,e);const m=e.querySelectorAll(".wp-block-prc-block-form-input-dropdown-item"),w=Array.from(m).map(((e,t)=>({style:e.style,className:e.attributes.class.value,content:e.attributes["data-title"].value,value:e.attributes["data-value"].value,index:t})));(0,t.render)((0,t.createElement)(n.Dropdown,{className:o,id:r,options:w,onChange:l,search:i,multiple:c,multipleSearch:a,placeholder:u,inline:d,animated:p}),s),e.parentNode.removeChild(e)}))}))}();
//# sourceMappingURL=view.js.map