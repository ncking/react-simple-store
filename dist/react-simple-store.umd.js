!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],e):e((t||self).reactSimpleStore={},t.react)}(this,function(t,e){function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}var r=function(t,r,o){void 0===r&&(r={}),void 0===o&&(o={});var i=!1,u=n({},r),c=new Set,f=o.allowNested,a=void 0===f||f,s=function(t,e){if(!a&&i)throw new Error("Nested state mutation disabled");try{i=!0;var r="function"==typeof t?t(u):t;if(!Object.is(r,u)){var o=u;u=(null!=e?e:"object"!=typeof r)?r:n({},u,r),c.forEach(function(t){return t(u,o)})}}finally{i=!1}},d=function(){return u},l=function(t){return c.add(t),function(){c.delete(t)}},p=function(t,e,n){var r=t(u);return l(function(){var o=t(u);Object.is(r,o)||n&&n(r,o)||e(o,r=o)})},b=function(t,e,n){return e?p(t,e,n):l(t)};return n({},t(s,d,{subscribe:b}),{useStore:function(t,n){var r=e.useState(t(u)),o=r[0],i=r[1];return e.useEffect(function(){return p(t,i,n)},[]),o},getState:d,setState:s,destroy:function(){return c.clear()},subscribe:b})};t.createStore=r,t.createStoreRedux=function(t,e){return r(function(e,n){return{dispatch:function(r){return e(t(n(),r)),r}}},e)}});
