!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).reactSimpleStore={})}(this,function(e){e.shallowEqual=(e,t)=>{if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;const n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;const f=Object.prototype.hasOwnProperty.bind(t);for(let o=0;o<n.length;o++){const i=n[o];if(!f(i)||!Object.is(e[i],t[i]))return!1}return!0}});
