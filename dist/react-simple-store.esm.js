import{useState as t,useEffect as n}from"react";function r(){return r=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},r.apply(this,arguments)}var e=function(e,o,i){void 0===o&&(o={}),void 0===i&&(i={});var u=!1,c=r({},o),a=new Set,f=i.allowNested,s=void 0===f||f,d=function(t,n){if(!s&&u)throw new Error("Nested state mutation disabled");try{u=!0;var e="function"==typeof t?t(c):t;if(!Object.is(e,c)){var o=c;c=(null!=n?n:"object"!=typeof e)?e:r({},c,e),a.forEach(function(t){return t(c,o)})}}finally{u=!1}},l=function(){return c},v=function(t){return a.add(t),function(){a.delete(t)}},b=function(t,n,r){var e=t(c);return v(function(){var o=t(c);Object.is(e,o)||r&&r(e,o)||n(o,e=o)})},p=function(t,n,r){return n?b(t,n,r):v(t)};return r({},e(d,l,{subscribe:p}),{useStore:function(r,e){var o=t(r(c)),i=o[0],u=o[1];return n(function(){return b(r,u,e)},[]),i},getState:l,setState:d,destroy:function(){return a.clear()},subscribe:p})},o=function(t,n){return e(function(n,r){return{dispatch:function(e){return n(t(r(),e)),e}}},n)};export{e as createStore,o as createStoreRedux};
