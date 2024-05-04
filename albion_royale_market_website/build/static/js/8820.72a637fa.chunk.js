"use strict";(self.webpackChunkalbion_royale_market_dev=self.webpackChunkalbion_royale_market_dev||[]).push([[8820,1572],{1572:(t,e,a)=>{a.d(e,{zS:()=>p,loadGifImage:()=>m});const i=[0,4,2,1],o=[8,8,4,2];class n{constructor(t){this.pos=0,this.data=new Uint8ClampedArray(t)}getString(t){const e=this.data.slice(this.pos,this.pos+t);return this.pos+=e.length,e.reduce(((t,e)=>t+String.fromCharCode(e)),"")}nextByte(){return this.data[this.pos++]}nextTwoBytes(){return this.pos+=2,this.data[this.pos-2]+(this.data[this.pos-1]<<8)}readSubBlocks(){let t="",e=0;do{e=this.data[this.pos++];for(let a=e;--a>=0;t+=String.fromCharCode(this.data[this.pos++]));}while(0!==e);return t}readSubBlocksBin(){let t=this.data[this.pos],e=0;for(let i=0;0!==t;i+=t+1,t=this.data[this.pos+i])e+=t;const a=new Uint8Array(e);t=this.data[this.pos++];for(let i=0;0!==t;t=this.data[this.pos++])for(let e=t;--e>=0;a[i++]=this.data[this.pos++]);return a}skipSubBlocks(){for(const t=1,e=0;this.data[this.pos]!==e;this.pos+=this.data[this.pos]+t);this.pos++}}const s={x:0,y:0},r=0,l=.5,g=0,h=0,c=0;function d(t,e){const a=[];for(let i=0;i<e;i++)a.push({r:t.data[t.pos],g:t.data[t.pos+1],b:t.data[t.pos+2]}),t.pos+=3;return a}async function f(t,e,a,n,s,r){switch(t.nextByte()){case 59:return!0;case 44:await async function(t,e,a,n,s,r){const l=e.frames[n(!0)];l.left=t.nextTwoBytes(),l.top=t.nextTwoBytes(),l.width=t.nextTwoBytes(),l.height=t.nextTwoBytes();const g=t.nextByte(),h=128===(128&g),c=64===(64&g);l.sortFlag=32===(32&g),l.reserved=(24&g)>>>3;const f=1<<1+(7&g);h&&(l.localColorTable=d(t,f));const p=t=>{const{r:i,g:o,b:n}=(h?l.localColorTable:e.globalColorTable)[t];return t!==s(null)?{r:i,g:o,b:n,a:255}:{r:i,g:o,b:n,a:a?~~((i+o+n)/3):0}},m=(()=>{try{return new ImageData(l.width,l.height,{colorSpace:"srgb"})}catch(t){if(t instanceof DOMException&&"IndexSizeError"===t.name)return null;throw t}})();if(null==m)throw new EvalError("GIF frame size is to large");const u=t.nextByte(),w=t.readSubBlocksBin(),y=1<<u,b=(t,e)=>{const a=t>>>3,i=7&t;return(w[a]+(w[a+1]<<8)+(w[a+2]<<16)&(1<<e)-1<<i)>>>i};if(c){for(let a=0,s=u+1,g=0,h=[[0]],c=0;c<4;c++){if(i[c]<l.height){let t=0,e=0,n=!1;for(;!n;){const r=a;if(a=b(g,s),g+=s+1,a===y){s=u+1,h.length=y+2;for(let t=0;t<h.length;t++)h[t]=t<y?[t]:[]}else{a>=h.length?h.push(h[r].concat(h[r][0])):r!==y&&h.push(h[r].concat(h[a][0]));for(const n of h[a]){const{r:a,g:s,b:r,a:g}=p(n);m.data.set([a,s,r,g],i[c]*l.width+o[c]*e+t%(4*l.width)),t+=4}h.length===1<<s&&s<12&&s++}t===4*l.width*(e+1)&&(e++,i[c]+o[c]*e>=l.height&&(n=!0))}}null===r||void 0===r||r(t.pos/(t.data.length-1),n(!1)+1,m,{x:l.left,y:l.top},{width:e.width,height:e.height})}l.image=m,l.bitmap=await createImageBitmap(m)}else{let a=0,i=u+1,o=0,s=-4,g=!1;const h=[[0]];for(;!g;){const t=a;if(a=b(o,i),o+=i,a===y){i=u+1,h.length=y+2;for(let t=0;t<h.length;t++)h[t]=t<y?[t]:[]}else{if(a===y+1){g=!0;break}a>=h.length?h.push(h[t].concat(h[t][0])):t!==y&&h.push(h[t].concat(h[a][0]));for(const t of h[a]){const{r:e,g:a,b:i,a:o}=p(t);m.data.set([e,a,i,o],s+=4)}h.length>=1<<i&&i<12&&i++}}l.image=m,l.bitmap=await createImageBitmap(m),null===r||void 0===r||r((t.pos+1)/t.data.length,n(!1)+1,l.image,{x:l.left,y:l.top},{width:e.width,height:e.height})}}(t,e,a,n,s,r);break;case 33:!function(t,e,a,i){switch(t.nextByte()){case 249:{const o=e.frames[a(!1)];t.pos++;const n=t.nextByte();o.GCreserved=(224&n)>>>5,o.disposalMethod=(28&n)>>>2,o.userInputDelayFlag=2===(2&n);const s=1===(1&n);o.delayTime=10*t.nextTwoBytes();const r=t.nextByte();s&&i(r),t.pos++;break}case 255:{t.pos++;const a={identifier:t.getString(8),authenticationCode:t.getString(3),data:t.readSubBlocksBin()};e.applicationExtensions.push(a);break}case 254:e.comments.push([a(!1),t.readSubBlocks()]);break;case 1:if(0===e.globalColorTable.length)throw new EvalError("plain text extension without global color table");t.pos++,e.frames[a(!1)].plainTextData={left:t.nextTwoBytes(),top:t.nextTwoBytes(),width:t.nextTwoBytes(),height:t.nextTwoBytes(),charSize:{width:t.nextTwoBytes(),height:t.nextTwoBytes()},foregroundColor:t.nextByte(),backgroundColor:t.nextByte(),text:t.readSubBlocks()};break;default:t.skipSubBlocks()}}(t,e,n,s);break;default:throw new EvalError("undefined block found")}return!1}function p(t){var e;const{context:a,radius:i,particle:o,delta:n}=t,d=o.image;if(null===d||void 0===d||!d.gifData||!d.gif)return;const f=new OffscreenCanvas(d.gifData.width,d.gifData.height),p=f.getContext("2d");if(!p)throw new Error("could not create offscreen canvas context");var m;(p.imageSmoothingQuality="low",p.imageSmoothingEnabled=!1,p.clearRect(s.x,s.y,f.width,f.height),void 0===o.gifLoopCount)&&(o.gifLoopCount=null!==(m=d.gifLoopCount)&&void 0!==m?m:c);let u=null!==(e=o.gifFrame)&&void 0!==e?e:r;const w={x:-d.gifData.width*l,y:-d.gifData.height*l},y=d.gifData.frames[u];if(void 0===o.gifTime&&(o.gifTime=g),y.bitmap){switch(a.scale(i/d.gifData.width,i/d.gifData.height),y.disposalMethod){case 4:case 5:case 6:case 7:case 0:p.drawImage(y.bitmap,y.left,y.top),a.drawImage(f,w.x,w.y),p.clearRect(s.x,s.y,f.width,f.height);break;case 1:p.drawImage(y.bitmap,y.left,y.top),a.drawImage(f,w.x,w.y);break;case 2:p.drawImage(y.bitmap,y.left,y.top),a.drawImage(f,w.x,w.y),p.clearRect(s.x,s.y,f.width,f.height),d.gifData.globalColorTable.length?p.putImageData(d.gifData.backgroundImage,w.x,w.y):p.putImageData(d.gifData.frames[h].image,w.x+y.left,w.y+y.top);break;case 3:{const t=p.getImageData(s.x,s.y,f.width,f.height);p.drawImage(y.bitmap,y.left,y.top),a.drawImage(f,w.x,w.y),p.clearRect(s.x,s.y,f.width,f.height),p.putImageData(t,s.x,s.y)}}if(o.gifTime+=n.value,o.gifTime>y.delayTime){if(o.gifTime-=y.delayTime,++u>=d.gifData.frames.length){if(--o.gifLoopCount<=c)return;u=h,p.clearRect(s.x,s.y,f.width,f.height)}o.gifFrame=u}a.scale(d.gifData.width/i,d.gifData.height/i)}}async function m(t){if("gif"===t.type){t.loading=!0;try{var e;t.gifData=await async function(t,e,a){a||(a=!1);const i=await fetch(t);if(!i.ok&&404===i.status)throw new EvalError("file not found");const o=await i.arrayBuffer(),s={width:0,height:0,totalTime:0,colorRes:0,pixelAspectRatio:0,frames:[],sortFlag:!1,globalColorTable:[],backgroundImage:new ImageData(1,1,{colorSpace:"srgb"}),comments:[],applicationExtensions:[]},r=new n(new Uint8ClampedArray(o));if("GIF89a"!==r.getString(6))throw new Error("not a supported GIF file");s.width=r.nextTwoBytes(),s.height=r.nextTwoBytes();const l=r.nextByte(),g=128===(128&l);s.colorRes=(112&l)>>>4,s.sortFlag=8===(8&l);const h=1<<1+(7&l),c=r.nextByte();s.pixelAspectRatio=r.nextByte(),0!==s.pixelAspectRatio&&(s.pixelAspectRatio=(s.pixelAspectRatio+15)/64),g&&(s.globalColorTable=d(r,h));const p=(()=>{try{return new ImageData(s.width,s.height,{colorSpace:"srgb"})}catch(t){if(t instanceof DOMException&&"IndexSizeError"===t.name)return null;throw t}})();if(null==p)throw new Error("GIF frame size is to large");const{r:m,g:u,b:w}=s.globalColorTable[c];p.data.set(g?[m,u,w,255]:[0,0,0,0]);for(let n=4;n<p.data.length;n*=2)p.data.copyWithin(n,0,n);s.backgroundImage=p;let y=-1,b=!0,x=-1;const C=t=>(t&&(b=!0),y),I=t=>(null!=t&&(x=t),x);try{do{b&&(s.frames.push({left:0,top:0,width:0,height:0,disposalMethod:0,image:new ImageData(1,1,{colorSpace:"srgb"}),plainTextData:null,userInputDelayFlag:!1,delayTime:0,sortFlag:!1,localColorTable:[],reserved:0,GCreserved:0}),y++,x=-1,b=!1)}while(!await f(r,s,a,C,I,e));s.frames.length--;for(const t of s.frames){if(t.userInputDelayFlag&&0===t.delayTime){s.totalTime=1/0;break}s.totalTime+=t.delayTime}return s}catch(T){if(T instanceof EvalError)throw new Error("error while parsing frame ".concat(y,' "').concat(T.message,'"'));throw T}}(t.source),t.gifLoopCount=null!==(e=function(t){for(const e of t.applicationExtensions)if(e.identifier+e.authenticationCode==="NETSCAPE2.0")return e.data[1]+(e.data[2]<<8);return NaN}(t.gifData))&&void 0!==e?e:c,t.gifLoopCount||(t.gifLoopCount=1/0)}catch{t.error=!0}t.loading=!1}else{const{loadImage:e}=await Promise.resolve().then(a.bind(a,7637));await e(t)}}},8820:(t,e,a)=>{a.d(e,{ImageDrawer:()=>s});var i=a(8306),o=a(7637),n=a(1572);class s{constructor(t){this.loadImageShape=async t=>{var e;if(!this._engine.loadImage)throw new Error("".concat(i.dI," image shape not initialized"));await this._engine.loadImage({gif:t.gif,name:t.name,replaceColor:null!==(e=t.replaceColor)&&void 0!==e&&e,src:t.src})},this._engine=t}addImage(t){this._engine.images||(this._engine.images=[]),this._engine.images.push(t)}draw(t){const{context:e,radius:a,particle:i,opacity:o}=t,s=i.image,r=null===s||void 0===s?void 0:s.element;if(s){if(e.globalAlpha=o,s.gif&&s.gifData)(0,n.zS)(t);else if(r){const t=s.ratio,i={x:-a,y:-a},o=2*a;e.drawImage(r,i.x,i.y,o,o/t)}e.globalAlpha=1}}getSidesCount(){return 12}async init(t){const e=t.actualOptions;if(e.preload&&this._engine.loadImage)for(const a of e.preload)await this._engine.loadImage(a)}loadShape(t){if("image"!==t.shape&&"images"!==t.shape)return;this._engine.images||(this._engine.images=[]);const e=t.shapeData;if(!e)return;this._engine.images.find((t=>t.name===e.name||t.source===e.src))||this.loadImageShape(e).then((()=>{this.loadShape(t)}))}particleInit(t,e){var a;if("image"!==e.shape&&"images"!==e.shape)return;this._engine.images||(this._engine.images=[]);const i=this._engine.images,n=e.shapeData;if(!n)return;const s=e.getFillColor(),r=i.find((t=>t.name===n.name||t.source===n.src));if(!r)return;const l=null!==(a=n.replaceColor)&&void 0!==a?a:r.replaceColor;r.loading?setTimeout((()=>{this.particleInit(t,e)})):(async(t,a)=>{let i;var g;r.svgData&&s?i=await(0,o.d)(r,n,s,e):i={color:s,data:r,element:r.element,gif:r.gif,gifData:r.gifData,gifLoopCount:r.gifLoopCount,loaded:!0,ratio:n.width&&n.height?n.width/n.height:null!==(g=r.ratio)&&void 0!==g?g:1,replaceColor:l,source:n.src};i.ratio||(i.ratio=1);const h={image:i,fill:null!==(t=n.fill)&&void 0!==t?t:e.shapeFill,close:null!==(a=n.close)&&void 0!==a?a:e.shapeClose};e.image=h.image,e.shapeFill=h.fill,e.shapeClose=h.close})()}}}}]);
//# sourceMappingURL=8820.72a637fa.chunk.js.map