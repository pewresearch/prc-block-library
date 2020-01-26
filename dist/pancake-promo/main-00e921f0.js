/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibrarypancake-promoJsonp"]=window["wpackioprcBlocksLibrarypancake-promoJsonp"]||[]).push([[0],[function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.blocks},function(e,t,a){a(3),e.exports=a(4)},function(e,t,a){"use strict";var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");a.p=window["__wpackIo".concat(c)]},function(e,t,a){"use strict";a.r(t);a(5);var c=a(1),l=(a(6),a(0)),n=wp.i18n.__;Object(c.registerBlockType)("prc-block/promo-pancake",{title:n("Pancake Promo"),icon:"format-aside",category:"widgets",keywords:[n("prc"),n("ad"),n("promo"),n("pancake")],styles:[{name:"oatmeal",label:"Oatmeal",isDefault:!0},{name:"white",label:"White"}],supports:{html:!1},attributes:{content:{type:"string",default:"EMPTY TEXT"}},edit:function(e){return console.log("edit"),console.log(e),React.createElement("div",{className:e.className},React.createElement("svg",{id:"election_icon",width:"74",height:"57",viewBox:"0 0 74 57",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M5.98906 10.4812C2.68139 10.4812 0 13.1788 0 16.5065V34.6553C0 37.983 2.68139 40.6806 5.98905 40.6806H11.1692L8.36363 56.6748L29.8727 40.6806H35.4756C38.7832 40.6806 41.4646 37.983 41.4646 34.6553V16.5065C41.4646 13.1788 38.7832 10.4812 35.4756 10.4812H5.98906Z",fill:"#3178A7"}),React.createElement("path",{d:"M67.5087 0C70.8164 0 73.4978 2.69763 73.4978 6.02532V24.1741C73.4978 27.5018 70.8164 30.1994 67.5087 30.1994H62.3286L65.1341 46.1936L43.6251 30.1994H38.0222C34.7145 30.1994 32.0331 27.5018 32.0331 24.1741V6.02532C32.0331 2.69763 34.7145 0 38.0222 0H67.5087Z",fill:"#DA571F"}),React.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M41.4646 30.1993H38.0225C34.7148 30.1993 32.0334 27.5017 32.0334 24.174V10.4814H35.4756C38.7832 10.4814 41.4646 13.1791 41.4646 16.5068V30.1993Z",fill:"#6B3635"}),React.createElement("path",{d:"M52.4212 4.79321L54.8808 12.3632L62.8403 12.3632L56.4009 17.0417L58.8605 24.6116L52.4212 19.9331L45.9818 24.6116L48.4414 17.0417L42.002 12.3632L49.9615 12.3632L52.4212 4.79321Z",fill:"white"}),React.createElement("path",{d:"M20.7323 14.9265L23.1919 22.4965L31.1514 22.4965L24.712 27.175L27.1717 34.7449L20.7323 30.0664L14.2929 34.7449L16.7525 27.175L10.3131 22.4965L18.2727 22.4965L20.7323 14.9265Z",fill:"white"})),React.createElement(l.RichText,{tagName:"div",value:e.attributes.content,onChange:function(t){return e.setAttributes({content:t})},placeholder:e.attributes.content,className:"sans-serif"}))},save:function(e){return console.log("save"),console.log(e),React.createElement("div",{className:e.className},React.createElement("svg",{id:"election_icon",width:"74",height:"57",viewBox:"0 0 74 57",fill:"none",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M5.98906 10.4812C2.68139 10.4812 0 13.1788 0 16.5065V34.6553C0 37.983 2.68139 40.6806 5.98905 40.6806H11.1692L8.36363 56.6748L29.8727 40.6806H35.4756C38.7832 40.6806 41.4646 37.983 41.4646 34.6553V16.5065C41.4646 13.1788 38.7832 10.4812 35.4756 10.4812H5.98906Z",fill:"#3178A7"}),React.createElement("path",{d:"M67.5087 0C70.8164 0 73.4978 2.69763 73.4978 6.02532V24.1741C73.4978 27.5018 70.8164 30.1994 67.5087 30.1994H62.3286L65.1341 46.1936L43.6251 30.1994H38.0222C34.7145 30.1994 32.0331 27.5018 32.0331 24.1741V6.02532C32.0331 2.69763 34.7145 0 38.0222 0H67.5087Z",fill:"#DA571F"}),React.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M41.4646 30.1993H38.0225C34.7148 30.1993 32.0334 27.5017 32.0334 24.174V10.4814H35.4756C38.7832 10.4814 41.4646 13.1791 41.4646 16.5068V30.1993Z",fill:"#6B3635"}),React.createElement("path",{d:"M52.4212 4.79321L54.8808 12.3632L62.8403 12.3632L56.4009 17.0417L58.8605 24.6116L52.4212 19.9331L45.9818 24.6116L48.4414 17.0417L42.002 12.3632L49.9615 12.3632L52.4212 4.79321Z",fill:"white"}),React.createElement("path",{d:"M20.7323 14.9265L23.1919 22.4965L31.1514 22.4965L24.712 27.175L27.1717 34.7449L20.7323 30.0664L14.2929 34.7449L16.7525 27.175L10.3131 22.4965L18.2727 22.4965L20.7323 14.9265Z",fill:"white"})),React.createElement(l.RichText.Content,{tagName:"div",value:e.attributes.content,className:"sans-serif"}))}})},function(e,t,a){},function(e,t){e.exports=wp.element}],[[2,1]]]);
//# sourceMappingURL=main-00e921f0.js.map