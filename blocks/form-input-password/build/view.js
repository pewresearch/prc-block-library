import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(n={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},a={},e.d(a,n),a);var n,a;const{state:s}=(0,o.store)("prc-block/form-input-password",{actions:{onInputChange:t=>{const e=(0,o.getContext)(),{ref:n}=(0,o.getElement)(),{id:a,name:r}=n,{value:i}=t.target,{hasConfirmation:c,confirmationInputId:d}=e;if(s[a].value=i,"confirmPassword"===r)e.confirmationValue=i,e.passwordMatch=e.value===i;else{if(c){const t={hasLowerCase:/[a-z]/.test(l=i),hasUpperCase:/[A-Z]/.test(l),hasNumber:/\d/.test(l),hasSpecialCharacter:/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(l),hasLength:l.length>=12,hasNoInvalidCharacters:/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(l)},o=Object.values(t).every((t=>!0===t));s[d].isDisabled=!o,Object.keys(t).forEach((o=>{const n=e.conditionsList.findIndex((t=>t.id===o)),a=e.conditionsList[n];a.met=t[o],e.conditionsList[n]=a}))}e.value=i}var l}},callbacks:{onValueChange:()=>{const t=(0,o.getContext)(),{value:e,targetNamespace:n,hasConfirmation:a,passwordMatch:s}=t;if(e){const{actions:r}=(0,o.store)(n);r.onPasswordChange&&(console.log("PUSH",e,"to",n,t),a&&s?r.onPasswordChange(e):a||r.onPasswordChange(e))}},onConfirmationInit:()=>{const t=(0,o.getContext)();console.log("onConfirmationInit",t,s);const e=Object.keys(s).find((t=>"password"===s[t].type&&"confirmPassword"===s[t].name));t.confirmationInputId=e,s[e].isDisabled=!0}}});
//# sourceMappingURL=view.js.map