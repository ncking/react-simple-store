!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e||self).reactSimpleStore={},e.react)}(this,function(e,t){const o=(e,o={},r={})=>{let n=!1,s={...o};const c=new Set,{allowNested:i=!0}=r,a=(e,t)=>{if(!i&&n)throw new Error("Nested state mutation disabled");try{n=!0;const o="function"==typeof e?e(s):e;if(!Object.is(o,s)){if("object"!=typeof o)throw new Error("next state not object");const e=s;s=t?o:{...s,...o},c.forEach(t=>t(s,e))}}finally{n=!1}},f=()=>s,d=e=>(c.add(e),()=>{c.delete(e)}),u=(e,t,o)=>{let r=e(s);return d(()=>{const n=e(s);(o?o(r,n):Object.is(r,n))||(r=n,t(n,r))})},l=function(){var e=[].slice.call(arguments);return e[1]?u(...e):d(e[0])};return{...e(a,f,{subscribe:l}),useStore:(e,o,r)=>{const[n,c]=t.useState(e(s));return t.useEffect(()=>u(e,c,o),[r?.rebind&&e]),n},getState:f,setState:a,destroy:()=>c.clear(),subscribe:l}};e.createStore=o,e.createStoreRedux=(e,t)=>o((t,o)=>({dispatch:r=>(t(e(o(),r)),r)}),t)});
