"use strict";(self.webpackChunkalbion_royale_market_dev=self.webpackChunkalbion_royale_market_dev||[]).push([[8868],{8868:(t,e,n)=>{n.d(e,{PolygonDrawer:()=>o});var a=n(5803);class o extends a.L{getCenter(t,e){return{x:-e/(t.sides/3.5),y:-e/.76}}getSidesData(t,e){const n=t.sides;return{count:{denominator:1,numerator:n},length:2.66*e/(n/3)}}}},5803:(t,e,n)=>{n.d(e,{L:()=>s});var a=n(8306);const o=0,r=0;class s{draw(t){const{particle:e,radius:n}=t;!function(t,e,n){const{context:s}=t,i=n.count.numerator*n.count.denominator,u=n.count.numerator/n.count.denominator,l=180*(u-2)/u,d=Math.PI-(0,a.pu)(l);if(s){s.beginPath(),s.translate(e.x,e.y),s.moveTo(o,r);for(let t=0;t<i;t++)s.lineTo(n.length,r),s.translate(n.length,r),s.rotate(d)}}(t,this.getCenter(e,n),this.getSidesData(e,n))}getSidesCount(t){var e;const n=t.shapeData;return Math.round((0,a.VG)(null!==(e=null===n||void 0===n?void 0:n.sides)&&void 0!==e?e:5))}}}}]);
//# sourceMappingURL=8868.3a45d2de.chunk.js.map