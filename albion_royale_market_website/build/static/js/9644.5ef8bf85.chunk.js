"use strict";(self.webpackChunkyour_app=self.webpackChunkyour_app||[]).push([[9644],{9644:(o,t,a)=>{a.d(t,{OpacityUpdater:()=>p});var i=a(4409);class p{constructor(o){this.container=o}init(o){const t=o.options.opacity;o.opacity=(0,i.Xs)(t,1);const a=t.animation;a.enable&&(o.opacity.velocity=(0,i.VG)(a.speed)/i.a5*this.container.retina.reduceFactor,a.sync||(o.opacity.velocity*=(0,i.G0)()))}isEnabled(o){var t,a,i,p;return!o.destroyed&&!o.spawning&&!!o.opacity&&o.opacity.enable&&((null!==(t=o.opacity.maxLoops)&&void 0!==t?t:0)<=0||(null!==(a=o.opacity.maxLoops)&&void 0!==a?a:0)>0&&(null!==(i=o.opacity.loops)&&void 0!==i?i:0)<(null!==(p=o.opacity.maxLoops)&&void 0!==p?p:0))}reset(o){o.opacity&&(o.opacity.time=0,o.opacity.loops=0)}update(o,t){this.isEnabled(o)&&o.opacity&&(0,i.UC)(o,o.opacity,!0,o.options.opacity.animation.destroy,t)}}}}]);
//# sourceMappingURL=9644.5ef8bf85.chunk.js.map