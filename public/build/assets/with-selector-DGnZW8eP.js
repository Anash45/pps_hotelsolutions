import{l as p}from"./app-BIfnRM97.js";var d={exports:{}},m={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h;function D(){if(h)return m;h=1;var f=p();function E(r,u){return r===u&&(r!==0||1/r===1/u)||r!==r&&u!==u}var V=typeof Object.is=="function"?Object.is:E,j=f.useSyncExternalStore,w=f.useRef,z=f.useEffect,M=f.useMemo,_=f.useDebugValue;return m.useSyncExternalStoreWithSelector=function(r,u,v,s,l){var t=w(null);if(t.current===null){var o={hasValue:!1,value:null};t.current=o}else o=t.current;t=M(function(){function S(e){if(!R){if(R=!0,a=e,e=s(e),l!==void 0&&o.hasValue){var i=o.value;if(l(i,e))return c=i}return c=e}if(i=c,V(a,e))return i;var W=s(e);return l!==void 0&&l(i,W)?(a=e,i):(a=e,c=W)}var R=!1,a,c,b=v===void 0?null:v;return[function(){return S(u())},b===null?void 0:function(){return S(b())}]},[u,v,s,l]);var n=j(r,t[0],t[1]);return z(function(){o.hasValue=!0,o.value=n},[n]),_(n),n},m}var y;function O(){return y||(y=1,d.exports=D()),d.exports}var q=O();export{q as w};
