!function(){var t={114:function(t,e){var n,r;n=function(){"use strict";var t=["|","^"],e=[",",";","\t","|","^"],n=["\r\n","\r","\n"];var r=Array.isArray||function(t){return"[object Array]"===toString.call(t)};function i(t){return"string"==typeof t}function o(t,e){return function(t){return null!=t}(t)?t:e}function c(t,e){for(var n=0,r=t.length;n<r&&!1!==e(t[n],n);n+=1);}function l(t){return t.replace(/"/g,'\\"')}function a(t){return"attrs["+t+"]"}function u(t,e){return isNaN(Number(t))?function(t){return 0==t||1==t}(t)?"Boolean("+a(e)+" == true)":"String("+a(e)+")":"Number("+a(e)+")"}function s(t,e,n,o){var s=[];return 3==arguments.length?(e?r(e)?c(n,(function(n,r){i(e[r])?e[r]=e[r].toLowerCase():t[e[r]]=e[r],s.push("deserialize[cast["+r+"]]("+a(r)+")")})):c(n,(function(t,e){s.push(u(t,e))})):c(n,(function(t,e){s.push(a(e))})),s="return ["+s.join(",")+"]"):(e?r(e)?c(n,(function(n,r){i(e[r])?e[r]=e[r].toLowerCase():t[e[r]]=e[r],s.push('"'+l(o[r])+'": deserialize[cast['+r+"]]("+a(r)+")")})):c(n,(function(t,e){s.push('"'+l(o[e])+'": '+u(t,e))})):c(n,(function(t,e){s.push('"'+l(o[e])+'": '+a(e))})),s="return {"+s.join(",")+"}"),new Function("attrs","deserialize","cast",s)}function f(e,n){var r,i=0;return c(n,(function(n){var o,c=n;-1!=t.indexOf(n)&&(c="\\"+c),(o=e.match(new RegExp(c,"g")))&&o.length>i&&(i=o.length,r=n)})),r||n[0]}var p=function(){function t(t,c){if(c||(c={}),r(t))this.mode="encode";else{if(!i(t))throw new Error("Incompatible format!");this.mode="parse"}this.data=t,this.options={header:o(c.header,!1),cast:o(c.cast,!0)};var l=c.lineDelimiter||c.line,a=c.cellDelimiter||c.delimiter;this.isParser()?(this.options.lineDelimiter=l||f(this.data,n),this.options.cellDelimiter=a||f(this.data,e),this.data=function(t,e){return t.slice(-e.length)!=e&&(t+=e),t}(this.data,this.options.lineDelimiter)):this.isEncoder()&&(this.options.lineDelimiter=l||"\r\n",this.options.cellDelimiter=a||",")}function l(t,e,n,r,i){t(new e(n,r,i))}function a(t){return r(t)?"array":function(t){var e=typeof t;return"function"===e||"object"===e&&!!t}(t)?"object":i(t)?"string":null==t?"null":"primitive"}return t.prototype.set=function(t,e){return this.options[t]=e},t.prototype.isParser=function(){return"parse"==this.mode},t.prototype.isEncoder=function(){return"encode"==this.mode},t.prototype.parse=function(t){if("parse"==this.mode){if(0===this.data.trim().length)return[];var e,n,i,o=this.data,c=this.options,a=c.header,u={cell:"",line:[]},f=this.deserialize;t||(i=[],t=function(t){i.push(t)}),1==c.lineDelimiter.length&&(v=w);var p,h,d,m=o.length,g=c.cellDelimiter.charCodeAt(0),y=c.lineDelimiter.charCodeAt(c.lineDelimiter.length-1);for(b(),p=0,h=0;p<m;p++)d=o.charCodeAt(p),e.cell&&(e.cell=!1,34==d)?e.escaped=!0:e.escaped&&34==d?e.quote=!e.quote:(e.escaped&&e.quote||!e.escaped)&&(d==g?(w(u.cell+o.slice(h,p)),h=p+1):d==y&&(v(u.cell+o.slice(h,p)),h=p+1,(u.line.length>1||""!==u.line[0])&&A(),u.line=[]));return i||this}function b(){e={escaped:!1,quote:!1,cell:!0}}function w(t){u.line.push(e.escaped?t.slice(1,-1).replace(/""/g,'"'):t),u.cell="",b()}function v(t){w(t.slice(0,1-c.lineDelimiter.length))}function A(){a?r(a)?(n=s(f,c.cast,u.line,a),(A=function(){l(t,n,u.line,f,c.cast)})()):a=u.line:(n||(n=s(f,c.cast,u.line)),(A=function(){l(t,n,u.line,f,c.cast)})())}},t.prototype.deserialize={string:function(t){return String(t)},number:function(t){return Number(t)},boolean:function(t){return Boolean(t)}},t.prototype.serialize={object:function(t){var e=this,n=Object.keys(t),r=Array(n.length);return c(n,(function(n,i){r[i]=e[a(t[n])](t[n])})),r},array:function(t){var e=this,n=Array(t.length);return c(t,(function(t,r){n[r]=e[a(t)](t)})),n},string:function(t){return'"'+String(t).replace(/"/g,'""')+'"'},null:function(t){return""},primitive:function(t){return t}},t.prototype.encode=function(t){if("encode"==this.mode){if(0==this.data.length)return"";var e,n,o=this.data,l=this.options,u=l.header,s=o[0],f=this.serialize,p=0;t||(n=Array(o.length),t=function(t,e){n[e+p]=t}),u&&(r(u)||(u=e=Object.keys(s)),t(m(f.array(u)),0),p=1);var h,d=a(s);return"array"==d?(r(l.cast)?(h=Array(l.cast.length),c(l.cast,(function(t,e){i(t)?h[e]=t.toLowerCase():(h[e]=t,f[t]=t)}))):(h=Array(s.length),c(s,(function(t,e){h[e]=a(t)}))),c(o,(function(e,n){var r=Array(h.length);c(e,(function(t,e){r[e]=f[h[e]](t)})),t(m(r),n)}))):"object"==d&&(e=Object.keys(s),r(l.cast)?(h=Array(l.cast.length),c(l.cast,(function(t,e){i(t)?h[e]=t.toLowerCase():(h[e]=t,f[t]=t)}))):(h=Array(e.length),c(e,(function(t,e){h[e]=a(s[t])}))),c(o,(function(n,r){var i=Array(e.length);c(e,(function(t,e){i[e]=f[h[e]](n[t])})),t(m(i),r)}))),n?n.join(l.lineDelimiter):this}function m(t){return t.join(l.cellDelimiter)}},t.prototype.forEach=function(t){return this[this.mode](t)},t}();return p.parse=function(t,e){return new p(t,e).parse()},p.encode=function(t,e){return new p(t,e).encode()},p.forEach=function(t,e,n){return 2==arguments.length&&(n=e),new p(t,e).forEach(n)},p},void 0===(r=n.apply(e,[]))||(t.exports=r)}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,n),o.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";var t=window.wp.element,e=window.wp.hooks,r=window.wp.compose,i=window.wp.i18n,o=window.wp.blockEditor,c=window.wp.components,l=n(114),a=n.n(l);function u(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return t.map((t=>({content:t,tag:e})))}function s(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return"th"===e?u(t,e):t.map((t=>({cells:u(t,e)})))}function f(t,e,n){const r=new FileReader;r.onload=()=>{!function(t,e,n){const r=new(a())(t,{header:!1}).parse(),i=s(r.shift(),"th");n({body:s(r)}),n({head:[{cells:i}]})}(r.result,0,n)},Array.from(t).forEach((t=>r.readAsBinaryString(t)))}function p(e){let{attributes:n,setAttributes:r}=e;const l=(0,t.useRef)(null);return(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(c.PanelBody,{title:"CSV Import"},(0,t.createElement)(c.PanelRow,null,(0,t.createElement)(c.Button,{isPrimary:!0,onClick:()=>{l.current.click()}},(0,i.__)("Import CSV to Table","prc-block-library")),(0,t.createElement)("input",{ref:l,type:"file",accept:"text/csv",onChange:t=>f(t.target.files,0,r),style:{display:"none"}}),(0,t.createElement)(c.DropZone,{onFilesDrop:t=>f(t,0,r)}))))}function h(e){let{attributes:n,setAttributes:r,context:i}=e;return(0,t.createElement)(p,{attributes:n,setAttributes:r,context:i})}const d=["core-table".replace(/-/g,"/"),"flexible-table-block/table"];(0,e.addFilter)("editor.BlockEdit","prc-block-library/core-table",(0,r.createHigherOrderComponent)((e=>function(n){const{name:r,attributes:i,setAttributes:o}=n;return d.includes(r)?(0,t.createElement)(t.Fragment,null,(0,t.createElement)(e,n),(0,t.createElement)(h,{attributes:i,setAttributes:o,context:!1})):(0,t.createElement)(e,n)}),"withCoreTableControls"),21)}()}();