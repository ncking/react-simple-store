import{useRef as t,useState as e,useEffect as r}from"react";function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},n.apply(this,arguments)}const o=(o,s={},c={})=>{let a,i=!1,f=n({},s);const u=new Set,{allowNested:b=!0}=c,l=(t,e)=>{if(!b&&i)throw new Error("Nested state mutation disabled");try{i=!0;const r="function"==typeof t?t(f):t;if(!Object.is(r,f)){if("object"!=typeof r)throw new Error("next state not object");const t=f;f=e?r:n({},f,r),a=performance.now(),u.forEach(e=>e(f,t))}}finally{i=!1}},p=()=>f,d=t=>(u.add(t),()=>{u.delete(t)}),w=(t,e,r)=>{let n=t(f);return()=>{const o=t(f);(r?r(n,o):Object.is(n,o))||(e(o,n),n=o)}},y=(...t)=>d(t[1]?w(...t):t[0]);return n({},o(l,p,{subscribe:y}),{useStore:(n,o,s=!1)=>{const c=t([s,a]),[{v:i},u]=e({v:n(f)}),[b,l]=c.current;return r(()=>{const t=w(n,t=>u({v:t}),o);return l!==a&&t(),d(t)},b?[n]:[]),i},getState:p,setState:l,destroy:()=>u.clear(),subscribe:y})},s=(t,e)=>o((e,r)=>({dispatch:n=>(e(t(r(),n)),n)}),e);export{o as createStore,s as createStoreRedux};
