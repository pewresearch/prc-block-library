(()=>{var t,e={506:(t,e,n)=>{"use strict";const i=window.enquire;var o=n.n(i);n(682),n(356);const r=window.wp.domReady;var s=n.n(r);window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.tableOfContents={breakpoints:[],elms:{},useIcons:!1,chapters:[]};const a=t=>{const e=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return;const n=t.querySelector(".toc-title");if(n){if(!n.getAttribute("original-classes")){const t=Array.from(n.classList).filter((t=>t.startsWith("has-")));n.setAttribute("original-classes",t.join(" "))}if(e){const t=n.getAttribute("original-classes");n.classList.remove(...t.split(" "))}else{const t=n.getAttribute("original-classes");n.classList.add(...t.split(" "))}}},n=function(t){t&&(t.classList.toggle("is-style-card-alt"),window.prcBlocks.tableOfContents.useIcons?(t=>{if(t.classList.toggle("mobile-toc-icons")){const e=t.querySelectorAll("a.item[data-icon-src]");Array.from(t.querySelectorAll("a.item")).filter((t=>!t.getAttribute("data-icon-src"))).forEach((t=>{t.classList.add("hidden")})),console.log("isMobileToc",e,t.querySelectorAll("a.item")),e.forEach((t=>{const e=t.getAttribute("data-icon-src");t.innerHTML=`<span class="hidden-text">${t.innerHTML}</span><span class="icon"><img src="${e}"/></span>`}))}else t.querySelectorAll("a.item[data-icon-src]").forEach((t=>{const e=t.querySelector("span.icon"),n=t.querySelector("span.hidden-text");e&&t.removeChild(e),t.innerHTML=n.innerHTML}))})(t):t.classList.toggle("mobile-toc"))},i=t.getAttribute("data-mobile-threshold");i&&o().register(`screen and (max-width: ${i}px)`,{match:()=>{var i;i=t,setTimeout((()=>{const t=i.parentElement;n(t),e(t,!0)}),100)},unmatch:()=>{var i;i=t,setTimeout((()=>{const t=i.parentElement;n(t),e(t,!1)}),100)}})};s()((()=>{const t=document.querySelectorAll(".wp-block-prc-block-table-of-contents");t.length&&t.forEach((t=>{t.querySelector("a.item[data-icon-src]")&&(window.prcBlocks.tableOfContents.useIcons=!0),t.getAttribute("data-show-current-chapter")&&(t=>{const e=document.querySelectorAll("[data-is-chapter]");e.length&&e.forEach((e=>{const n=e.getAttribute("id");window.prcBlocks.tableOfContents.chapters.push(n),new Waypoint.Inview({element:e,enter(e){const n=t.querySelector("a.item.active");n&&n.classList.remove("active")},entered(e){const i=t.querySelector(`a.item[href="#${n}"]`);i&&i.classList.add("active")}})}))})(t),(t=>{const e=t.parentElement;t.querySelectorAll("a.item").forEach((t=>{t.addEventListener("click",(n=>{const i=t.getAttribute("href");if(0===i.indexOf("#")){n.preventDefault();const t=document.getElementById(i.replace("#",""));t&&(t.scrollIntoView({behavior:"smooth"},!0),window.history.pushState(null,null,i),e.classList.contains("mobile-toc")&&e.classList.contains("is-open")&&e.classList.remove("is-open"))}}))}))})(t),(t=>{const e=t.parentElement;e.querySelector(".toc-title").addEventListener("click",(()=>{e.classList.contains("mobile-toc")&&e.classList.toggle("is-open")}))})(t),a(t)}))}))},682:()=>{!function(){"use strict";var t=0,e={};function n(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=n.Adapter.extend({},n.defaults,i),this.element=this.options.element,this.adapter=new n.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=n.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=n.Context.findOrCreateByElement(this.options.context),n.offsetAliases[this.options.offset]&&(this.options.offset=n.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),e[this.key]=this,t+=1}n.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},n.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},n.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete e[this.key]},n.prototype.disable=function(){return this.enabled=!1,this},n.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},n.prototype.next=function(){return this.group.next(this)},n.prototype.previous=function(){return this.group.previous(this)},n.invokeAll=function(t){var n=[];for(var i in e)n.push(e[i]);for(var o=0,r=n.length;o<r;o++)n[o][t]()},n.destroyAll=function(){n.invokeAll("destroy")},n.disableAll=function(){n.invokeAll("disable")},n.enableAll=function(){for(var t in n.Context.refreshAll(),e)e[t].enabled=!0;return this},n.refreshAll=function(){n.Context.refreshAll()},n.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},n.viewportWidth=function(){return document.documentElement.clientWidth},n.adapters=[],n.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},n.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=n}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}var e=0,n={},i=window.Waypoint,o=window.onload;function r(t){this.element=t,this.Adapter=i.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+e,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,e+=1,i.windowContext||(i.windowContext=!0,i.windowContext=new r(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}r.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},r.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete n[this.key])},r.prototype.createThrottledResizeHandler=function(){var t=this;function e(){t.handleResize(),t.didResize=!1}this.adapter.on("resize.waypoints",(function(){t.didResize||(t.didResize=!0,i.requestAnimationFrame(e))}))},r.prototype.createThrottledScrollHandler=function(){var t=this;function e(){t.handleScroll(),t.didScroll=!1}this.adapter.on("scroll.waypoints",(function(){t.didScroll&&!i.isTouch||(t.didScroll=!0,i.requestAnimationFrame(e))}))},r.prototype.handleResize=function(){i.Context.refreshAll()},r.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var i=e[n],o=i.newScroll>i.oldScroll?i.forward:i.backward;for(var r in this.waypoints[n]){var s=this.waypoints[n][r];if(null!==s.triggerPoint){var a=i.oldScroll<s.triggerPoint,l=i.newScroll>=s.triggerPoint;(a&&l||!a&&!l)&&(s.queueTrigger(o),t[s.group.id]=s.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},r.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},r.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},r.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},r.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var i=0,o=t.length;i<o;i++)t[i].destroy()},r.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),o={};for(var r in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var s=t[r];for(var a in this.waypoints[r]){var l,c,h,p,u=this.waypoints[r][a],d=u.options.offset,f=u.triggerPoint,w=0,y=null==f;u.element!==u.element.window&&(w=u.adapter.offset()[s.offsetProp]),"function"==typeof d?d=d.apply(u):"string"==typeof d&&(d=parseFloat(d),u.options.offset.indexOf("%")>-1&&(d=Math.ceil(s.contextDimension*d/100))),l=s.contextScroll-s.contextOffset,u.triggerPoint=Math.floor(w+l-d),c=f<s.oldScroll,h=u.triggerPoint>=s.oldScroll,p=!c&&!h,!y&&c&&h?(u.queueTrigger(s.backward),o[u.group.id]=u.group):(!y&&p||y&&s.oldScroll>=u.triggerPoint)&&(u.queueTrigger(s.forward),o[u.group.id]=u.group)}}return i.requestAnimationFrame((function(){for(var t in o)o[t].flushTriggers()})),this},r.findOrCreateByElement=function(t){return r.findByElement(t)||new r(t)},r.refreshAll=function(){for(var t in n)n[t].refresh()},r.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){o&&o(),r.refreshAll()},i.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},i.Context=r}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}var n={vertical:{},horizontal:{}},i=window.Waypoint;function o(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}o.prototype.add=function(t){this.waypoints.push(t)},o.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},o.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],o="up"===n||"left"===n;i.sort(o?e:t);for(var r=0,s=i.length;r<s;r+=1){var a=i[r];(a.options.continuous||r===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},o.prototype.next=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},o.prototype.previous=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},o.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},o.prototype.remove=function(t){var e=i.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},o.prototype.first=function(){return this.waypoints[0]},o.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},o.findOrCreate=function(t){return n[t.axis][t.name]||new o(t)},i.Group=o}(),function(){"use strict";var t=window.Waypoint;function e(t){return t===t.window}function n(t){return e(t)?t:t.defaultView}function i(t){this.element=t,this.handlers={}}i.prototype.innerHeight=function(){return e(this.element)?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){return e(this.element)?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function n(t,e,n){for(var i=0,o=e.length-1;i<o;i++){var r=e[i];n&&n!==r||t.removeEventListener(r)}}var i=t.split("."),o=i[0],r=i[1],s=this.element;if(r&&this.handlers[r]&&o)n(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var a in this.handlers)n(s,this.handlers[a][o]||[],e),this.handlers[a][o]=[];else if(r&&this.handlers[r]){for(var l in this.handlers[r])n(s,this.handlers[r][l],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,e=n(this.element.ownerDocument),i={top:0,left:0};return this.element.getBoundingClientRect&&(i=this.element.getBoundingClientRect()),{top:i.top+e.pageYOffset-t.clientTop,left:i.left+e.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var n=t.split("."),i=n[0],o=n[1]||"__default",r=this.handlers[o]=this.handlers[o]||{};(r[i]=r[i]||[]).push(e),this.element.addEventListener(i,e)},i.prototype.outerHeight=function(t){var n,i=this.innerHeight();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginTop,10),i+=parseInt(n.marginBottom,10)),i},i.prototype.outerWidth=function(t){var n,i=this.innerWidth();return t&&!e(this.element)&&(n=window.getComputedStyle(this.element),i+=parseInt(n.marginLeft,10),i+=parseInt(n.marginRight,10)),i},i.prototype.scrollLeft=function(){var t=n(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=n(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){var t=Array.prototype.slice.call(arguments);function e(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}for(var n=1,i=t.length;n<i;n++)e(t[0],t[n]);return t[0]},i.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},t.adapters.push({name:"noframework",Adapter:i}),t.Adapter=i}()},356:()=>{!function(){"use strict";function t(){}var e=window.Waypoint;function n(t){this.options=e.Adapter.extend({},n.defaults,t),this.axis=this.options.horizontal?"horizontal":"vertical",this.waypoints=[],this.element=this.options.element,this.createWaypoints()}n.prototype.createWaypoints=function(){for(var t={vertical:[{down:"enter",up:"exited",offset:"100%"},{down:"entered",up:"exit",offset:"bottom-in-view"},{down:"exit",up:"entered",offset:0},{down:"exited",up:"enter",offset:function(){return-this.adapter.outerHeight()}}],horizontal:[{right:"enter",left:"exited",offset:"100%"},{right:"entered",left:"exit",offset:"right-in-view"},{right:"exit",left:"entered",offset:0},{right:"exited",left:"enter",offset:function(){return-this.adapter.outerWidth()}}]},e=0,n=t[this.axis].length;e<n;e++){var i=t[this.axis][e];this.createWaypoint(i)}},n.prototype.createWaypoint=function(t){var n=this;this.waypoints.push(new e({context:this.options.context,element:this.options.element,enabled:this.options.enabled,handler:function(t){return function(e){n.options[t[e]].call(n,e)}}(t),offset:t.offset,horizontal:this.options.horizontal}))},n.prototype.destroy=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].destroy();this.waypoints=[]},n.prototype.disable=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].disable()},n.prototype.enable=function(){for(var t=0,e=this.waypoints.length;t<e;t++)this.waypoints[t].enable()},n.defaults={context:window,enabled:!0,enter:t,entered:t,exit:t,exited:t},e.Inview=n}()}},n={};function i(t){var o=n[t];if(void 0!==o)return o.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,i),r.exports}i.m=e,t=[],i.O=(e,n,o,r)=>{if(!n){var s=1/0;for(h=0;h<t.length;h++){n=t[h][0],o=t[h][1],r=t[h][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||s>=r)&&Object.keys(i.O).every((t=>i.O[t](n[l])))?n.splice(l--,1):(a=!1,r<s&&(s=r));if(a){t.splice(h--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var h=t.length;h>0&&t[h-1][2]>r;h--)t[h]=t[h-1];t[h]=[n,o,r]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={692:0,431:0};i.O.j=e=>0===t[e];var e=(e,n)=>{var o,r,s=n[0],a=n[1],l=n[2],c=0;if(s.some((e=>0!==t[e]))){for(o in a)i.o(a,o)&&(i.m[o]=a[o]);if(l)var h=l(i)}for(e&&e(n);c<s.length;c++)r=s[c],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(h)},n=self.webpackChunktable_of_contents=self.webpackChunktable_of_contents||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var o=i.O(void 0,[431],(()=>i(506)));o=i.O(o)})();
//# sourceMappingURL=view.js.map