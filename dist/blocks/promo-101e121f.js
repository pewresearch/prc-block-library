/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{1:function(t,e){t.exports=window.React},16:function(t,e){t.exports=window.wp.data},19:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var l=a(27);var n=a(25),r=a(28);function i(t,e){return Object(l.a)(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var l,n,r=[],i=!0,o=!1;try{for(a=a.call(t);!(i=(l=a.next()).done)&&(r.push(l.value),!e||r.length!==e);i=!0);}catch(t){o=!0,n=t}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return r}}(t,e)||Object(n.a)(t,e)||Object(r.a)()}},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,a){"use strict";function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,l=new Array(e);a<e;a++)l[a]=t[a];return l}a.d(e,"a",(function(){return l}))},25:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var l=a(20);function n(t,e){if(t){if("string"==typeof t)return Object(l.a)(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(l.a)(t,e):void 0}}},27:function(t,e,a){"use strict";function l(t){if(Array.isArray(t))return t}a.d(e,"a",(function(){return l}))},276:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/promo","category":"marketing","attributes":{"heading":{"type":"string","source":"html","selector":".heading"},"headingLevel":{"type":"integer","default":2},"subHeading":{"type":"string","source":"html","selector":".sub-heading"},"hasDarkBackground":{"type":"boolean","default":false},"backgroundColor":{"type":"string","default":"transparent"},"borderColor":{"type":"string","default":"transparent"},"icon":{"type":"string","default":"weekly"},"hasForm":{"type":"boolean","default":false}},"styles":[{"name":"standard","label":"Standard","isDefault":true},{"name":"asymmetrical","label":"Asymmetrical"}],"example":{"attributes":{"heading":"Facts are more important than ever","subHeading":"In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."},"innerBlocks":[{"name":"prc-block/menu-link","attributes":{"className":"is-style-button","color":"#d3aa20","label":"DONATE","url":"#"}}],"viewPortWidth":1200},"providesContext":{"promo/hasDarkBackground":"hasDarkBackground"},"supports":{"html":false,"align":["full"]}}')},28:function(t,e,a){"use strict";function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}a.d(e,"a",(function(){return l}))},3:function(t,e){t.exports=window.wp.components},35:function(t,e){t.exports=window.wp.apiFetch},386:function(t,e){t.exports='<svg viewBox="0 0 106 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M91.3918 25.4336H90.3235V27.517H91.3918V25.4336Z" fill="#0091C1"></path><path d="M91.3918 22.7925H90.3235V24.8759H91.3918V22.7925Z" fill="#0091C1"></path><path d="M92.9984 21.5088H91.9301V24.8672H92.9984V21.5088Z" fill="#0091C1"></path><path d="M92.9984 25.4336H91.9301V28.792H92.9984V25.4336Z" fill="#0091C1"></path><path d="M94.6132 18.6919H93.5449V24.867H94.6132V18.6919Z" fill="#0091C1"></path><path d="M94.6132 25.4336H93.5449V31.6087H94.6132V25.4336Z" fill="#0091C1"></path><path d="M96.2281 25.4336H95.1599V29.267H96.2281V25.4336Z" fill="#0091C1"></path><path d="M96.2281 21.0347H95.1599V24.8681H96.2281V21.0347Z" fill="#0091C1"></path><path d="M97.8429 21.6089H96.7747V24.8673H97.8429V21.6089Z" fill="#0091C1"></path><path d="M97.8429 25.4336H96.7747V28.692H97.8429V25.4336Z" fill="#0091C1"></path><path d="M104.302 25.4336H103.234V27.517H104.302V25.4336Z" fill="#0091C1"></path><path d="M104.302 22.7925H103.234V24.8759H104.302V22.7925Z" fill="#0091C1"></path><path d="M101.073 25.4336H100.004V27.1003H101.073V25.4336Z" fill="#0091C1"></path><path d="M101.073 23.209H100.004V24.8757H101.073V23.209Z" fill="#0091C1"></path><path d="M102.687 25.4336H101.619V29.117H102.687V25.4336Z" fill="#0091C1"></path><path d="M102.687 21.1841H101.619V24.8675H102.687V21.1841Z" fill="#0091C1"></path><path d="M99.4578 25.4336H98.3895V26.5336H99.4578V25.4336Z" fill="#0091C1"></path><path d="M99.4578 23.7661H98.3895V24.8661H99.4578V23.7661Z" fill="#0091C1"></path><path d="M106 23.7661H104.932V24.8661H106V23.7661Z" fill="#0091C1"></path><path d="M106 25.4336H104.932V26.5336H106V25.4336Z" fill="#0091C1"></path><path d="M89.777 25.4336H88.7087V30.4254H89.777V25.4336Z" fill="#0091C1"></path><path d="M89.777 19.8833H88.7087V24.8751H89.777V19.8833Z" fill="#0091C1"></path><path d="M81.7028 25.4336H80.6345V31.667H81.7028V25.4336Z" fill="#0091C1"></path><path d="M81.7028 18.6333H80.6345V24.8668H81.7028V18.6333Z" fill="#0091C1"></path><path d="M83.3176 14.8086H82.2493V24.8755H83.3176V14.8086Z" fill="#0091C1"></path><path d="M83.3176 25.4336H82.2493V35.5005H83.3176V25.4336Z" fill="#0091C1"></path><path d="M84.9325 13.3838H83.8642V24.8757H84.9325V13.3838Z" fill="#0091C1"></path><path d="M84.9325 25.4336H83.8642V36.9255H84.9325V25.4336Z" fill="#0091C1"></path><path d="M86.5473 15.1001H85.479V24.8753H86.5473V15.1001Z" fill="#0091C1"></path><path d="M86.5473 25.4336H85.479V35.2088H86.5473V25.4336Z" fill="#0091C1"></path><path d="M88.1622 25.4336H87.0939V28.7337H88.1622V25.4336Z" fill="#0091C1"></path><path d="M88.1622 21.5757H87.0939V24.8757H88.1622V21.5757Z" fill="#0091C1"></path><path d="M15.5273 22.7925H14.459V24.8759H15.5273V22.7925Z" fill="#0091C1"></path><path d="M15.5273 25.4336H14.459V27.517H15.5273V25.4336Z" fill="#0091C1"></path><path d="M13.9125 25.4336H12.8442V28.792H13.9125V25.4336Z" fill="#0091C1"></path><path d="M13.9125 21.5088H12.8442V24.8672H13.9125V21.5088Z" fill="#0091C1"></path><path d="M12.306 25.4336H11.2377V31.6087H12.306V25.4336Z" fill="#0091C1"></path><path d="M12.306 18.6919H11.2377V24.867H12.306V18.6919Z" fill="#0091C1"></path><path d="M10.6911 21.0347H9.62283V24.8681H10.6911V21.0347Z" fill="#0091C1"></path><path d="M10.6911 25.4336H9.62283V29.267H10.6911V25.4336Z" fill="#0091C1"></path><path d="M9.07628 25.4336H8.008V28.692H9.07628V25.4336Z" fill="#0091C1"></path><path d="M9.07628 21.6089H8.008V24.8673H9.07628V21.6089Z" fill="#0091C1"></path><path d="M2.6169 22.7925H1.54861V24.8759H2.6169V22.7925Z" fill="#0091C1"></path><path d="M2.6169 25.4336H1.54861V27.517H2.6169V25.4336Z" fill="#0091C1"></path><path d="M5.84657 23.209H4.77829V24.8757H5.84657V23.209Z" fill="#0091C1"></path><path d="M5.84657 25.4336H4.77829V27.1003H5.84657V25.4336Z" fill="#0091C1"></path><path d="M4.23176 21.1841H3.16348V24.8675H4.23176V21.1841Z" fill="#0091C1"></path><path d="M4.23176 25.4336H3.16348V29.117H4.23176V25.4336Z" fill="#0091C1"></path><path d="M7.46141 23.7661H6.39313V24.8661H7.46141V23.7661Z" fill="#0091C1"></path><path d="M7.46141 25.4336H6.39313V26.5336H7.46141V25.4336Z" fill="#0091C1"></path><path d="M1.06828 25.4336H0V26.5336H1.06828V25.4336Z" fill="#0091C1"></path><path d="M1.06828 23.7661H0V24.8661H1.06828V23.7661Z" fill="#0091C1"></path><path d="M17.1421 19.8833H16.0739V24.8751H17.1421V19.8833Z" fill="#0091C1"></path><path d="M17.1421 25.4336H16.0739V30.4254H17.1421V25.4336Z" fill="#0091C1"></path><path d="M25.2164 18.6333H24.1482V24.8668H25.2164V18.6333Z" fill="#0091C1"></path><path d="M25.2164 25.4336H24.1482V31.667H25.2164V25.4336Z" fill="#0091C1"></path><path d="M23.6016 25.4336H22.5333V35.5005H23.6016V25.4336Z" fill="#0091C1"></path><path d="M23.6016 14.8086H22.5333V24.8755H23.6016V14.8086Z" fill="#0091C1"></path><path d="M21.9867 25.4336H20.9185V36.9255H21.9867V25.4336Z" fill="#0091C1"></path><path d="M21.9867 13.3838H20.9185V24.8757H21.9867V13.3838Z" fill="#0091C1"></path><path d="M20.3718 25.4336H19.3036V35.2088H20.3718V25.4336Z" fill="#0091C1"></path><path d="M20.3718 15.1001H19.3036V24.8753H20.3718V15.1001Z" fill="#0091C1"></path><path d="M18.757 21.5757H17.6887V24.8757H18.757V21.5757Z" fill="#0091C1"></path><path d="M18.757 25.4336H17.6887V28.7337H18.757V25.4336Z" fill="#0091C1"></path><path d="M30.5495 16.3833H26.6573V24.8668H30.5495V16.3833Z" fill="#D2A830"></path><path d="M54.9047 20.2842H51.0125V24.8676H54.9047V20.2842Z" fill="#D2A830"></path><path d="M59.774 10.1416H55.8818V24.8669H59.774V10.1416Z" fill="#D2A830"></path><path d="M79.2681 15.6094H75.3759V24.8762H79.2681V15.6094Z" fill="#D2A830"></path><path d="M35.4189 18.3921H31.5267V24.8755H35.4189V18.3921Z" fill="#D2A830"></path><path d="M64.6517 3.90039H60.7596V24.8675H64.6517V3.90039Z" fill="#D2A830"></path><path d="M69.521 0H65.6288V24.8671H69.521V0Z" fill="#D2A830"></path><path d="M74.3905 8.5835H70.4983V24.8671H74.3905V8.5835Z" fill="#D2A830"></path><path d="M50.0353 25.4336H46.1432V31.7087H50.0353V25.4336Z" fill="#A65B26"></path><path d="M40.2883 25.4336H36.3961V32.9504H40.2883V25.4336Z" fill="#A65B26"></path><path d="M45.1659 25.4336H41.2737V40.0005H45.1659V25.4336Z" fill="#A65B26"></path></svg>'},387:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#949D48"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},388:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},389:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#BB4D2A"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#006699"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},390:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#0090BF"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},391:function(t,e){t.exports='<svg viewBox="0 0 47 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0396 25.2064H23.4894H16.0348L0.127441 14.9213L23.4788 0.117103V0.106445V0.117103L46.8407 14.9319L31.0396 25.2064Z" fill="#D4D4D4"></path><path d="M46.8513 15.06L46.777 15.0386L23.4894 0.266454L0.201764 15.0386L0.0212402 14.996L0.0637165 14.8148L23.4257 0H23.5637L46.9257 14.8148L46.9681 14.996L46.8513 15.06Z" fill="#6E6E71"></path><path d="M39.5454 4.57227V19.6962L31.082 25.1958H23.6168L16.0348 25.2064L7.67758 19.8027L7.6882 4.57227H39.5454Z" fill="white"></path><path d="M16.0348 25.2065L14.1871 24.0127V18.0122H19.3798V25.2065H16.0348Z" fill="#333132"></path><path d="M26.2079 25.1957H21.0151V10.7539H26.2079V25.1957Z" fill="#BB7A2A"></path><path d="M31.0396 25.2065L27.7158 25.1959V14.4312H32.9191V24.0022L31.0396 25.2065Z" fill="#D2AE2E"></path><path d="M46.7983 39.8508L0.159299 39.8614L0.127441 14.9214L16.0242 25.2065H31.0396L46.8513 14.9214L46.7983 39.8508Z" fill="white"></path><path d="M0.159286 40L0.0212381 39.8615V39.8189L0 14.9214L0.0743335 14.8042L0.212381 14.8149L16.1091 25.1L16.1728 25.1959L16.1304 25.3025L0.488477 39.7442C0.79643 39.7336 1.30615 39.7336 2.15567 39.7336L46.4584 39.7229L30.9546 25.3131L30.9121 25.2172L30.944 25.1319L30.9546 25.1213L30.9758 25.1106L46.7876 14.8362H46.9257L47 14.9534L46.9469 39.8615V39.8721L46.9363 39.9148L46.9151 39.9468L46.9044 39.9574L46.862 39.9787L46.8089 39.9894L0.159286 40ZM0.265477 15.1666L0.297334 39.5631L15.8224 25.2172L0.265477 15.1666ZM31.2625 25.2172L46.6708 39.5417L46.7239 15.1666L31.2625 25.2172Z" fill="#6E6E71"></path><path d="M31.082 25.0679H16.0348V25.3343H31.082V25.0679Z" fill="#6E6E71"></path><path d="M7.65636 19.792L7.52893 19.6641L7.53955 4.57215L7.66698 4.43359H39.5242L39.6516 4.56149V19.5468L39.5242 19.6747L39.3968 19.5468V4.71071H7.80503L7.79441 19.6641L7.65636 19.792Z" fill="#6E6E71"></path></svg>'},4:function(t,e){t.exports=window.wp.element},53:function(t,e){t.exports=moment},54:function(t,e){t.exports=window.wp.url},585:function(t,e,a){a(22),t.exports=a(648)},6:function(t,e){t.exports=window.wp.blockEditor},62:function(t,e){t.exports=window.wp.keycodes},63:function(t,e){t.exports=window.ReactDOM},648:function(t,e,a){"use strict";a.r(e);var l=a(14),n=a(2),r=a(9),i=a(4),o=a(276),p=a(15),c=a.n(p),h=a(6),L=a(16),s=a(33),d=a(3),f=[{name:"Black",color:"#333132"},{name:"Gray",color:"#F8F8F8"},{name:"White",color:"#FFF"}],u=[{name:"Black",color:"#000"},{name:"Gray",color:"#E4E4E4"}];var H=function(t){var e=t.hasDarkBackground,a=t.backgroundColor,l=t.borderColor,r=t.headingLevel,o=(t.icon,t.setAttributes);return React.createElement(i.Fragment,null,React.createElement(h.BlockControls,null,React.createElement(s.c,{selectedLevel:r,onChange:function(t){return o({headingLevel:t})}})),React.createElement(h.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(n.__)("Promo Design Options")},React.createElement("div",null,React.createElement(d.BaseControl,{label:"Background Color",help:e?Object(n.__)("The background color selected can make it hard to read dark text. This is an accessibility contrast issue that when enabled will default to lighter text."):null},React.createElement(d.ColorPalette,{colors:f,value:a,onChange:function(t){var e,a,l,n,r={backgroundColor:t,hasDarkBackground:!1};"dark"==((e=t).match(/^rgb/)?(a=(e=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1],l=e[2],n=e[3]):(a=(e=+("0x"+e.slice(1).replace(e.length<5&&/./g,"$&$&")))>>16,l=e>>8&255,n=255&e),Math.sqrt(a*a*.299+l*l*.587+n*n*.114)>127.5?"light":"dark")&&(r.hasDarkBackground=!0),o(r)}}),e&&React.createElement(d.ToggleControl,{label:Object(n.__)("Dark Background"),checked:e,onChange:function(){return o({hasDarkBackground:!e})}})),React.createElement(d.BaseControl,{label:"Border Color"},React.createElement(d.ColorPalette,{colors:u,value:l,onChange:function(t){return o({borderColor:t})}}))))))},V=a(19),m=function(t){var e=t.value,a=t.icons,l=t.className,n=a.filter((function(t){return t.value===e}));return n.length&&n[0].svg?React.createElement("div",{className:l,style:{width:n[0].width}},React.createElement(i.RawHTML,null,n[0].svg)):React.createElement(i.Fragment,null)},g=function(t){var e=t.value,a=t.icons,l=t.setAttributes,r=Object(i.useState)(e),o=Object(V.a)(r,2),p=o[0],c=o[1],L=Object(i.useState)("⛔️"),s=Object(V.a)(L,2),f=s[0],u=s[1],H=a.map((function(t){return{title:Object(n.__)(t.label),icon:function(){return React.createElement("div",{style:{paddingRight:"4px"}},React.createElement(i.RawHTML,null,t.emoji))},isActive:e===t.value,onClick:function(){return c(t.value)}}}));return Object(i.useEffect)((function(){var t=a.filter((function(t){return t.value===p}));t.length&&t[0].emoji&&u(t[0].emoji),l({icon:p})}),[p]),React.createElement(h.BlockControls,null,React.createElement(d.ToolbarGroup,null,React.createElement(d.ToolbarDropdownMenu,{icon:function(){return React.createElement(i.RawHTML,null,f)},label:"Select Icon",controls:H})))},M=a(386),b=a.n(M),Z=a(387),w=a.n(Z),v=a(388),C=a.n(v),E=a(389),k=a.n(E),y=a(390),x=a.n(y),O=a(391),j=a.n(O),R=[{label:"No Icon",value:"",svg:null,width:"47px",height:"40px",emoji:"⛔️"},{label:"Alexa",value:"alexa",svg:b.a,width:"106px",height:"40px",emoji:"🔉"},{label:"Global",value:"global",svg:w.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Internet",value:"internet",svg:C.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Politics",value:"politics",svg:k.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Religion",value:"religion",svg:x.a,width:"47px",height:"40px",emoji:"✉️"},{label:"Weekly",value:"weekly",svg:j.a,width:"47px",height:"40px",emoji:"✉️"}],B=function(t){var e=t.icon,a=t.setAttributes,l=t.className;return React.createElement(i.Fragment,null,React.createElement(g,{value:e,icons:R,setAttributes:a}),React.createElement(m,{value:e,icons:R,className:l}))},D=["prc-block/menu-link","prc-block/mailchimp-form","prc-blocks/pathways-ask-an-analyst","core/paragraph"],A=function(t){var e=t.attributes,a=t.setAttributes,l=t.isSelected,r=t.clientId,o=e.className,p=e.hasDarkBackground,s=e.heading,d=e.headingLevel,f=e.subHeading,u=e.backgroundColor,V=e.borderColor,m=e.icon,g=e.hasForm,M=void 0!==f&&""!==f&&"<p></p>"!==f,b=void 0!==m&&""!==m,Z=Object(L.useSelect)((function(t){var e=t("core/block-editor").getBlock(r).innerBlocks;return{hasChildBlocks:0<t("core/block-editor").getBlockOrder(r).length,hasMailchimpForm:e.filter((function(t){return"prc-block/mailchimp-form"===t.name})).length>0}}),[r]),w=Z.hasChildBlocks,v=Z.hasMailchimpForm;Object(i.useEffect)((function(){a({hasForm:v})}),[v]);var C={borderColor:V,backgroundColor:u},E=Object(h.useBlockProps)({className:c()(o,{"has-icon":b,"has-form":g,"has-large-icon":"alexa"==m,"has-dark-background":p}),style:C}),k=Object(h.__experimentalUseInnerBlocksProps)({className:"wp-block-prc-block-promo__action"},{allowedBlocks:D,orientation:"vertical",templateLock:!1,renderAppender:!!l&&h.InnerBlocks.ButtonBlockerAppender});return React.createElement(i.Fragment,null,React.createElement(H,{hasDarkBackground:p,backgroundColor:u,borderColor:V,headingLevel:d,icon:m,setAttributes:a}),React.createElement("div",E,React.createElement("div",{className:"wp-block-prc-block-promo__inner-container"},"is-style-asymmetrical"!==o&&React.createElement(B,{icon:m,isSelected:l,setAttributes:a,className:"wp-block-prc-block-promo__icon"}),React.createElement("div",{className:"wp-block-prc-block-promo__text"},React.createElement(h.RichText,{tagName:"h".concat(d),value:s,onChange:function(t){return a({heading:t})},placeholder:Object(n.__)("Facts are more important than ever."),keepPlaceholderOnFocus:!0,className:"heading sans-serif"}),!0===(l||M)&&React.createElement(h.RichText,{tagName:"div",value:f,onChange:function(t){return a({subHeading:t})},placeholder:Object(n.__)("In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."),multiline:"p",keepPlaceholderOnFocus:!0,className:"sub-heading sans-serif"})),!0===(l||w)&&React.createElement("div",k))))},_=function(t){var e=t.attributes,a=e.heading,l=e.subHeading,n=e.headingLevel;return React.createElement(i.Fragment,null,React.createElement("div",{className:"wp-block-prc-block-promo__text"},a&&React.createElement(h.RichText.Content,{className:"heading sans-serif",tagName:"h".concat(n),value:a}),l&&React.createElement(h.RichText.Content,{className:"sub-heading sans-serif",tagName:"div",value:l})),React.createElement("div",{className:"wp-block-prc-block-promo__action"},React.createElement(h.InnerBlocks.Content,null)))};function N(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,l)}return a}function F(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?N(Object(a),!0).forEach((function(e){Object(l.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var P=o.name,S={title:Object(n.__)("Promo (Ad)"),description:"Stylized block to create promos/ads.",category:"layout",keywords:[Object(n.__)("prc"),Object(n.__)("ad"),Object(n.__)("promo"),Object(n.__)("newsletter"),Object(n.__)("mailchimp")],icon:function(){return React.createElement(i.Fragment,null,"📢")},edit:A,save:_};Object(r.registerBlockType)(P,F(F({},o),S))},9:function(t,e){t.exports=window.wp.blocks}},[[585,0,1,2]]]);
//# sourceMappingURL=promo-101e121f.js.map