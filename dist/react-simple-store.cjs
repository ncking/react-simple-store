var e=require("react");const t=(t,r={},o={})=>{let s=!1,c={...r};const n=new Set,{allowNested:a=!0}=o,i=(e,t)=>{if(!a&&s)throw new Error("Nested state mutation disabled");try{s=!0;const r="function"==typeof e?e(c):e;if(!Object.is(r,c)){if("object"!=typeof r)throw new Error("next state not object");const e=c;c=t?r:{...c,...r},n.forEach(t=>t(c,e))}}finally{s=!1}},u=()=>c,l=e=>(n.add(e),()=>{n.delete(e)}),d=(e,t,r)=>{let o=e(c);return l(()=>{const s=e(c);(r?r(o,s):Object.is(o,s))||(o=s,t(s,o))})},f=function(){var e=[].slice.call(arguments);return e[1]?d(...e):l(e[0])};return{...t(i,u,{subscribe:f}),useStore:(t,r,o)=>{const[s,n]=e.useState(t(c));return e.useEffect(()=>d(t,n,r),[o?.rebind&&t]),s},getState:u,setState:i,destroy:()=>n.clear(),subscribe:f}};exports.createStore=t,exports.createStoreRedux=(e,r)=>t((t,r)=>({dispatch:o=>(t(e(r(),o)),o)}),r);
