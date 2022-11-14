/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[42],{1:function(t,e){t.exports=window.React},11:function(t,e,a){"use strict";function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,l=new Array(e);a<e;a++)l[a]=t[a];return l}a.d(e,"a",(function(){return l}))},16:function(t,e){t.exports=window.wp.primitives},17:function(t,e,a){"use strict";a.d(e,"a",(function(){return p}));var l=a(23);var i=a(18),n=a(24);function p(t,e){return Object(l.a)(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var l,i,n=[],p=!0,o=!1;try{for(a=a.call(t);!(p=(l=a.next()).done)&&(n.push(l.value),!e||n.length!==e);p=!0);}catch(t){o=!0,i=t}finally{try{p||null==a.return||a.return()}finally{if(o)throw i}}return n}}(t,e)||Object(i.a)(t,e)||Object(n.a)()}},18:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var l=a(11);function i(t,e){if(t){if("string"==typeof t)return Object(l.a)(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(l.a)(t,e):void 0}}},19:function(t,e,a){var l,i=a(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function p(){for(var t=[],e=0;e<arguments.length;e++){var a=arguments[e];if(a){var l=i(a);if("string"===l||"number"===l)t.push(a);else if(Array.isArray(a)){if(a.length){var o=p.apply(null,a);o&&t.push(o)}}else if("object"===l){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){t.push(a.toString());continue}for(var r in a)n.call(a,r)&&a[r]&&t.push(r)}}}return t.join(" ")}t.exports?(p.default=p,t.exports=p):"object"===i(a(20))&&a(20)?void 0===(l=function(){return p}.apply(e,[]))||(t.exports=l):window.classNames=p}()},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e){(function(e){t.exports=e}).call(this,{})},23:function(t,e,a){"use strict";function l(t){if(Array.isArray(t))return t}a.d(e,"a",(function(){return l}))},24:function(t,e,a){"use strict";function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}a.d(e,"a",(function(){return l}))},29:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},31:function(t,e){t.exports=window.wp.url},366:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/promo","category":"marketing","attributes":{"heading":{"type":"string","source":"html","selector":".wp-block-prc-block-promo__heading"},"headingLevel":{"type":"integer","default":2},"subHeading":{"type":"string","source":"html","selector":".wp-block-prc-block-promo__sub_heading"},"icon":{"type":"string","default":"weekly"},"hasForm":{"type":"boolean","default":false}},"styles":[{"name":"standard","label":"Standard","isDefault":true},{"name":"pancake","label":"Pancake"}],"example":{"attributes":{"heading":"Facts are more important than ever","subHeading":"<p>In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.</p>"},"innerBlocks":[{"name":"core/button","attributes":{"text":"DONATE"}}],"viewPortWidth":1200},"providesContext":{"prc-block/hasDarkBackground":"hasDarkBackground"},"supports":{"align":["full","wide","center"],"color":{"background":true,"text":true,"link":true},"__experimentalBorder":{"color":true,"width":true},"html":false,"spacing":{"margin":["top","bottom"],"padding":true,"blockGap":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true}}}')},4:function(t,e){t.exports=window.wp.element},41:function(t,e){t.exports=window.wp.coreData},43:function(t,e){t.exports=window.wp.htmlEntities},49:function(t,e){t.exports=window.wp.date},5:function(t,e){t.exports=window.wp.blockEditor},51:function(t,e){t.exports=regeneratorRuntime},52:function(t,e){t.exports=window.ReactDOM},55:function(t,e){t.exports=window.wp.keycodes},56:function(t,e){t.exports=window.wp.mediaUtils},563:function(t,e){t.exports='<svg viewBox="0 0 106 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M91.3918 25.4336H90.3235V27.517H91.3918V25.4336Z" fill="#0091C1"></path><path d="M91.3918 22.7925H90.3235V24.8759H91.3918V22.7925Z" fill="#0091C1"></path><path d="M92.9984 21.5088H91.9301V24.8672H92.9984V21.5088Z" fill="#0091C1"></path><path d="M92.9984 25.4336H91.9301V28.792H92.9984V25.4336Z" fill="#0091C1"></path><path d="M94.6132 18.6919H93.5449V24.867H94.6132V18.6919Z" fill="#0091C1"></path><path d="M94.6132 25.4336H93.5449V31.6087H94.6132V25.4336Z" fill="#0091C1"></path><path d="M96.2281 25.4336H95.1599V29.267H96.2281V25.4336Z" fill="#0091C1"></path><path d="M96.2281 21.0347H95.1599V24.8681H96.2281V21.0347Z" fill="#0091C1"></path><path d="M97.8429 21.6089H96.7747V24.8673H97.8429V21.6089Z" fill="#0091C1"></path><path d="M97.8429 25.4336H96.7747V28.692H97.8429V25.4336Z" fill="#0091C1"></path><path d="M104.302 25.4336H103.234V27.517H104.302V25.4336Z" fill="#0091C1"></path><path d="M104.302 22.7925H103.234V24.8759H104.302V22.7925Z" fill="#0091C1"></path><path d="M101.073 25.4336H100.004V27.1003H101.073V25.4336Z" fill="#0091C1"></path><path d="M101.073 23.209H100.004V24.8757H101.073V23.209Z" fill="#0091C1"></path><path d="M102.687 25.4336H101.619V29.117H102.687V25.4336Z" fill="#0091C1"></path><path d="M102.687 21.1841H101.619V24.8675H102.687V21.1841Z" fill="#0091C1"></path><path d="M99.4578 25.4336H98.3895V26.5336H99.4578V25.4336Z" fill="#0091C1"></path><path d="M99.4578 23.7661H98.3895V24.8661H99.4578V23.7661Z" fill="#0091C1"></path><path d="M106 23.7661H104.932V24.8661H106V23.7661Z" fill="#0091C1"></path><path d="M106 25.4336H104.932V26.5336H106V25.4336Z" fill="#0091C1"></path><path d="M89.777 25.4336H88.7087V30.4254H89.777V25.4336Z" fill="#0091C1"></path><path d="M89.777 19.8833H88.7087V24.8751H89.777V19.8833Z" fill="#0091C1"></path><path d="M81.7028 25.4336H80.6345V31.667H81.7028V25.4336Z" fill="#0091C1"></path><path d="M81.7028 18.6333H80.6345V24.8668H81.7028V18.6333Z" fill="#0091C1"></path><path d="M83.3176 14.8086H82.2493V24.8755H83.3176V14.8086Z" fill="#0091C1"></path><path d="M83.3176 25.4336H82.2493V35.5005H83.3176V25.4336Z" fill="#0091C1"></path><path d="M84.9325 13.3838H83.8642V24.8757H84.9325V13.3838Z" fill="#0091C1"></path><path d="M84.9325 25.4336H83.8642V36.9255H84.9325V25.4336Z" fill="#0091C1"></path><path d="M86.5473 15.1001H85.479V24.8753H86.5473V15.1001Z" fill="#0091C1"></path><path d="M86.5473 25.4336H85.479V35.2088H86.5473V25.4336Z" fill="#0091C1"></path><path d="M88.1622 25.4336H87.0939V28.7337H88.1622V25.4336Z" fill="#0091C1"></path><path d="M88.1622 21.5757H87.0939V24.8757H88.1622V21.5757Z" fill="#0091C1"></path><path d="M15.5273 22.7925H14.459V24.8759H15.5273V22.7925Z" fill="#0091C1"></path><path d="M15.5273 25.4336H14.459V27.517H15.5273V25.4336Z" fill="#0091C1"></path><path d="M13.9125 25.4336H12.8442V28.792H13.9125V25.4336Z" fill="#0091C1"></path><path d="M13.9125 21.5088H12.8442V24.8672H13.9125V21.5088Z" fill="#0091C1"></path><path d="M12.306 25.4336H11.2377V31.6087H12.306V25.4336Z" fill="#0091C1"></path><path d="M12.306 18.6919H11.2377V24.867H12.306V18.6919Z" fill="#0091C1"></path><path d="M10.6911 21.0347H9.62283V24.8681H10.6911V21.0347Z" fill="#0091C1"></path><path d="M10.6911 25.4336H9.62283V29.267H10.6911V25.4336Z" fill="#0091C1"></path><path d="M9.07628 25.4336H8.008V28.692H9.07628V25.4336Z" fill="#0091C1"></path><path d="M9.07628 21.6089H8.008V24.8673H9.07628V21.6089Z" fill="#0091C1"></path><path d="M2.6169 22.7925H1.54861V24.8759H2.6169V22.7925Z" fill="#0091C1"></path><path d="M2.6169 25.4336H1.54861V27.517H2.6169V25.4336Z" fill="#0091C1"></path><path d="M5.84657 23.209H4.77829V24.8757H5.84657V23.209Z" fill="#0091C1"></path><path d="M5.84657 25.4336H4.77829V27.1003H5.84657V25.4336Z" fill="#0091C1"></path><path d="M4.23176 21.1841H3.16348V24.8675H4.23176V21.1841Z" fill="#0091C1"></path><path d="M4.23176 25.4336H3.16348V29.117H4.23176V25.4336Z" fill="#0091C1"></path><path d="M7.46141 23.7661H6.39313V24.8661H7.46141V23.7661Z" fill="#0091C1"></path><path d="M7.46141 25.4336H6.39313V26.5336H7.46141V25.4336Z" fill="#0091C1"></path><path d="M1.06828 25.4336H0V26.5336H1.06828V25.4336Z" fill="#0091C1"></path><path d="M1.06828 23.7661H0V24.8661H1.06828V23.7661Z" fill="#0091C1"></path><path d="M17.1421 19.8833H16.0739V24.8751H17.1421V19.8833Z" fill="#0091C1"></path><path d="M17.1421 25.4336H16.0739V30.4254H17.1421V25.4336Z" fill="#0091C1"></path><path d="M25.2164 18.6333H24.1482V24.8668H25.2164V18.6333Z" fill="#0091C1"></path><path d="M25.2164 25.4336H24.1482V31.667H25.2164V25.4336Z" fill="#0091C1"></path><path d="M23.6016 25.4336H22.5333V35.5005H23.6016V25.4336Z" fill="#0091C1"></path><path d="M23.6016 14.8086H22.5333V24.8755H23.6016V14.8086Z" fill="#0091C1"></path><path d="M21.9867 25.4336H20.9185V36.9255H21.9867V25.4336Z" fill="#0091C1"></path><path d="M21.9867 13.3838H20.9185V24.8757H21.9867V13.3838Z" fill="#0091C1"></path><path d="M20.3718 25.4336H19.3036V35.2088H20.3718V25.4336Z" fill="#0091C1"></path><path d="M20.3718 15.1001H19.3036V24.8753H20.3718V15.1001Z" fill="#0091C1"></path><path d="M18.757 21.5757H17.6887V24.8757H18.757V21.5757Z" fill="#0091C1"></path><path d="M18.757 25.4336H17.6887V28.7337H18.757V25.4336Z" fill="#0091C1"></path><path d="M30.5495 16.3833H26.6573V24.8668H30.5495V16.3833Z" fill="#D2A830"></path><path d="M54.9047 20.2842H51.0125V24.8676H54.9047V20.2842Z" fill="#D2A830"></path><path d="M59.774 10.1416H55.8818V24.8669H59.774V10.1416Z" fill="#D2A830"></path><path d="M79.2681 15.6094H75.3759V24.8762H79.2681V15.6094Z" fill="#D2A830"></path><path d="M35.4189 18.3921H31.5267V24.8755H35.4189V18.3921Z" fill="#D2A830"></path><path d="M64.6517 3.90039H60.7596V24.8675H64.6517V3.90039Z" fill="#D2A830"></path><path d="M69.521 0H65.6288V24.8671H69.521V0Z" fill="#D2A830"></path><path d="M74.3905 8.5835H70.4983V24.8671H74.3905V8.5835Z" fill="#D2A830"></path><path d="M50.0353 25.4336H46.1432V31.7087H50.0353V25.4336Z" fill="#A65B26"></path><path d="M40.2883 25.4336H36.3961V32.9504H40.2883V25.4336Z" fill="#A65B26"></path><path d="M45.1659 25.4336H41.2737V40.0005H45.1659V25.4336Z" fill="#A65B26"></path></svg>'},564:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#949D48"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},565:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},566:function(t,e){t.exports='<svg viewBox="0 0 43 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M27.9356 22.6859H21.1405H14.4314L0.114746 13.4293L21.1309 0.10554V0.0959473V0.10554L42.1567 13.4389L27.9356 22.6859Z" fill="#D4D4D4"></path><path d="M42.1666 13.554L42.0997 13.5348L21.1409 0.239808L0.182003 13.5348L0.0195312 13.4964L0.0577599 13.3333L21.0835 0H21.2078L42.2335 13.3333L42.2718 13.4964L42.1666 13.554Z" fill="#6E6E71"></path><path d="M35.5907 4.11523V17.7267L27.9737 22.6764H21.255L14.4312 22.686L6.90967 17.8227L6.91922 4.11523H35.5907Z" fill="white"></path><path d="M14.4315 22.6858L12.7686 21.6114V16.2109H17.442V22.6858H14.4315Z" fill="#333132"></path><path d="M23.587 22.6763H18.9136V9.67871H23.587V22.6763Z" fill="#78265C"></path><path d="M27.9357 22.6859L24.9443 22.6763V12.988H29.6273V21.6019L27.9357 22.6859Z" fill="#D2AE2E"></path><path d="M42.1185 35.8656L0.143418 35.8752L0.114746 13.4292L14.4218 22.6858H27.9356L42.1663 13.4292L42.1185 35.8656Z" fill="#F8F8F8"></path><path d="M0.143357 36L0.0191143 35.8753V35.8369L0 13.4292L0.0669001 13.3237L0.191143 13.3333L14.4982 22.5899L14.5556 22.6762L14.5173 22.7722L0.439629 35.7698C0.716787 35.7602 1.17553 35.7602 1.9401 35.7602L41.8126 35.7506L27.8591 22.7818L27.8209 22.6954L27.8496 22.6187L27.8591 22.6091L27.8782 22.5995L42.1089 13.3525H42.2331L42.3 13.458L42.2522 35.8753V35.8849L42.2427 35.9233L42.2235 35.952L42.214 35.9616L42.1758 35.9808L42.128 35.9904L0.143357 36ZM0.238929 13.6499L0.267601 35.6067L14.2402 22.6954L0.238929 13.6499ZM28.1363 22.6954L42.0037 35.5875L42.0515 13.6499L28.1363 22.6954Z" fill="#6E6E71"></path><path d="M27.9736 22.5613H14.4312V22.8011H27.9736V22.5613Z" fill="#6E6E71"></path><path d="M6.89056 17.813L6.77588 17.6979L6.78544 4.11518L6.90012 3.99048H35.5716L35.6863 4.10559V17.5924L35.5716 17.7075L35.4569 17.5924V4.23988H7.02436L7.01481 17.6979L6.89056 17.813Z" fill="#6E6E71"></path></g><defs><clipPath id="clip0"><rect width="42.3" height="36" fill="white"></rect></clipPath></defs></svg>'},567:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#BB4D2A"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},568:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#0090BF"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},569:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#BB7A2A"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},7:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},927:function(t,e,a){a(12),t.exports=a(981)},981:function(t,e,a){"use strict";a.r(e);var l=a(8),i=a(2),n=a(7),p=a(4),o=a(366),r=a(19),h=a.n(r),c=a(50),L=a(5),s=a(9),d=a(17),f=a(3);function H(t){var e=t.value,a=t.icons,l=t.className,i=a.filter((function(t){return t.value===e}));return i.length&&i[0].svg?React.createElement("div",{className:l},React.createElement(p.RawHTML,null,i[0].svg)):React.createElement(p.Fragment,null)}function V(t){var e=t.value,a=t.icons,l=t.setAttributes,n=Object(p.useState)(e),o=Object(d.a)(n,2),r=o[0],h=o[1],c=Object(p.useState)("⛔️"),s=Object(d.a)(c,2),H=s[0],V=s[1],u=a.map((function(t){return{title:Object(i.__)(t.label),icon:function(){return React.createElement("div",{style:{paddingRight:"4px"}},React.createElement(p.RawHTML,null,t.emoji))},isActive:e===t.value,onClick:function(){return h(t.value)}}}));return Object(p.useEffect)((function(){var t=a.filter((function(t){return t.value===r}));t.length&&t[0].emoji&&V(t[0].emoji),l({icon:r})}),[r]),React.createElement(L.BlockControls,null,React.createElement(f.ToolbarGroup,null,React.createElement(f.ToolbarDropdownMenu,{icon:function(){return React.createElement(p.RawHTML,null,H)},label:"Select Icon",controls:u})))}var u=a(563),M=a.n(u),m=a(564),w=a.n(m),Z=a(565),g=a.n(Z),b=a(566),v=a.n(b),C=a(567),E=a.n(C),x=a(568),k=a.n(x),y=a(569),j=a.n(y),O=[{label:"No Icon",value:"",svg:null,width:"47px",height:"40px",emoji:"⛔️"},{label:"Alexa",value:"alexa",svg:M.a,width:"106px",height:"40px",emoji:"🔉"},{label:"Global",value:"global",svg:w.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Internet",value:"internet",svg:g.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Journalism",value:"journalism",svg:v.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Politics",value:"politics",svg:E.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Religion",value:"religion",svg:k.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Weekly",value:"weekly",svg:j.a,width:"47px",height:"40px",emoji:"✉️"}];var _=function(t){var e=t.icon,a=t.setAttributes,l=t.className;return React.createElement(p.Fragment,null,React.createElement(V,{value:e,icons:O,setAttributes:a}),React.createElement(H,{value:e,icons:O,className:l}))},D=["core/buttons","core/paragraph","prc-block/mailchimp-form"],R=function(t){var e=t.attributes,a=t.setAttributes,l=t.isSelected,n=t.clientId,o=e.className,r=e.heading,d=e.headingLevel,f=e.subHeading,H=e.icon,V=e.hasForm,u=void 0!==f&&""!==f&&"<p></p>"!==f,M=void 0!==H&&""!==H,m=Object(s.useSelect)((function(t){var e=t("core/block-editor").getBlock(n).innerBlocks;return{hasChildBlocks:0<t("core/block-editor").getBlockOrder(n).length,hasMailchimpForm:0<e.filter((function(t){return"prc-block/mailchimp-form"===t.name})).length}}),[n]),w=m.hasChildBlocks,Z=m.hasMailchimpForm;Object(p.useEffect)((function(){a({hasForm:Z}),console.log("hasMailchimpForm",Z)}),[Z]);var g=Object(L.useBlockProps)({className:h()(o,{"has-icon":M,"has-form":V,"has-large-icon":"alexa"===H})}),b=Object(L.useInnerBlocksProps)({className:"wp-block-prc-block-promo__action"},{allowedBlocks:D,orientation:"vertical",templateLock:!1,renderAppender:!!l&&L.InnerBlocks.ButtonBlockerAppender});return React.createElement(p.Fragment,null,React.createElement(L.BlockControls,null,React.createElement(c.c,{selectedLevel:d,onChange:function(t){return a({headingLevel:t})}})),React.createElement("div",g,React.createElement("div",{className:"wp-block-prc-block-promo__inner-container"},"is-style-asymmetrical"!==o&&React.createElement(_,{icon:H,isSelected:l,setAttributes:a,className:"wp-block-prc-block-promo__icon"}),React.createElement("div",{className:"wp-block-prc-block-promo__text"},React.createElement(L.RichText,{tagName:"h".concat(d),value:r,onChange:function(t){return a({heading:t})},placeholder:Object(i.__)("Promo title"),keepPlaceholderOnFocus:!0,className:"wp-block-prc-block-promo__heading"}),!0===(l||u)&&React.createElement(L.RichText,{tagName:"div",value:f,onChange:function(t){return a({subHeading:t})},placeholder:Object(i.__)("Promo description"),multiline:"p",keepPlaceholderOnFocus:!0,className:"wp-block-prc-block-promo__sub_heading"})),!0===(l||w)&&React.createElement("div",b))))},A=function(t){var e=t.attributes,a=e.heading,l=e.subHeading,i=e.headingLevel;return React.createElement(p.Fragment,null,React.createElement("div",{className:"wp-block-prc-block-promo__text"},a&&React.createElement(L.RichText.Content,{className:"wp-block-prc-block-promo__heading",tagName:"h".concat(i),value:a}),l&&React.createElement(L.RichText.Content,{className:"wp-block-prc-block-promo__sub_heading",tagName:"div",value:l})),React.createElement("div",{className:"wp-block-prc-block-promo__action"},React.createElement(L.InnerBlocks.Content,null)))};function B(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,l)}return a}function N(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?B(Object(a),!0).forEach((function(e){Object(l.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var P=o.name,S={title:Object(i.__)("Promo (Ad)"),description:"Stylized block to create promos/ads.",category:"layout",icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512"},React.createElement("path",{d:"M208 237.7L229.2 280H186.8L208 237.7zM416 280C416 293.3 405.3 304 392 304C378.7 304 368 293.3 368 280C368 266.7 378.7 256 392 256C405.3 256 416 266.7 416 280zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM229.5 173.3C225.4 165.1 217.1 160 208 160C198.9 160 190.6 165.1 186.5 173.3L114.5 317.3C108.6 329.1 113.4 343.5 125.3 349.5C137.1 355.4 151.5 350.6 157.5 338.7L162.8 328H253.2L258.5 338.7C264.5 350.6 278.9 355.4 290.7 349.5C302.6 343.5 307.4 329.1 301.5 317.3L229.5 173.3zM416 212.1C408.5 209.4 400.4 208 392 208C352.2 208 320 240.2 320 280C320 319.8 352.2 352 392 352C403.1 352 413.6 349.5 423 344.1C427.4 349.3 433.4 352 440 352C453.3 352 464 341.3 464 328V184C464 170.7 453.3 160 440 160C426.7 160 416 170.7 416 184V212.1z"}))},keywords:[Object(i.__)("prc"),Object(i.__)("ad"),Object(i.__)("promo"),Object(i.__)("newsletter"),Object(i.__)("mailchimp")],edit:R,save:A};Object(n.registerBlockType)(P,N(N({},o),S))}},[[927,0,1,2]]]);
//# sourceMappingURL=promo-29d1de0a.js.map