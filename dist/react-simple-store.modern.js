import{useState as t,useEffect as e}from"react";function r(){return r=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},r.apply(this,arguments)}const n=(n,o={},s={})=>{let c=!1,a=r({},o);const i=new Set,{allowNested:b=!0}=s,f=(t,e)=>{if(!b&&c)throw new Error("Nested state mutation disabled");try{c=!0;const n="function"==typeof t?t(a):t;if(!Object.is(n,a)){if("object"!=typeof n)throw new Error("next state not object");const t=a;a=e?n:r({},a,n),i.forEach(e=>e(a,t))}}finally{c=!1}},l=()=>a,u=t=>(i.add(t),()=>{i.delete(t)}),d=(t,e,r,n=t(a))=>{let o=n;return()=>{const n=t(a);(r?r(o,n):Object.is(o,n))||(e(n,o),o=n)}},p=(...t)=>u(t[1]?d(...t):t[0]);return r({},n(f,l,{subscribe:p}),{useStore:(r,n,o=!1)=>{const[{v:s,r:c},i]=t({v:r(a),r:!!o});return e(()=>{const t=d(r,t=>i({v:t,r:c}),n,s);return t(),u(t)},c?[r]:[]),s},getState:l,setState:f,destroy:()=>i.clear(),subscribe:p})},o=(t,e)=>n((e,r)=>({dispatch:n=>(e(t(r(),n)),n)}),e);export{n as createStore,o as createStoreRedux};
