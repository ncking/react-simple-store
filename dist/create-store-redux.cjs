var e=require("react"),r=require("@raiz/react-simple-store"),t=require("@raiz/react-simple-store/shallow-equal");exports.createStoreRedux=(a,o)=>{const s=r.createStore((e,r)=>({dispatch:t=>e(a(r(),t))}),o),{useStore:c,dispatch:n}=s;return s.connect=(r,a)=>o=>{const s=s=>{const i=c(r,t.shallowEqual);return e.createElement(o,{...s,...i,...a(n)})};return s.displayName=`Connect(${o.displayName||o.name||"Component"})`,s},s};