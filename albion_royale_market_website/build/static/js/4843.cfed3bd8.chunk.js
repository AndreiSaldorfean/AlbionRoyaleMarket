"use strict";(self.webpackChunkyour_app=self.webpackChunkyour_app||[]).push([[4843],{4843:(e,i,o)=>{o.d(i,{ImagePreloaderPlugin:()=>r});class s{constructor(){this.src="",this.gif=!1}load(e){e&&(void 0!==e.gif&&(this.gif=e.gif),void 0!==e.height&&(this.height=e.height),void 0!==e.name&&(this.name=e.name),void 0!==e.replaceColor&&(this.replaceColor=e.replaceColor),void 0!==e.src&&(this.src=e.src),void 0!==e.width&&(this.width=e.width))}}class r{constructor(e){this.id="imagePreloader",this._engine=e}async getPlugin(){return await Promise.resolve(),{}}loadOptions(e,i){if(null===i||void 0===i||!i.preload)return;e.preload||(e.preload=[]);const o=e.preload;for(const r of i.preload){const e=o.find((e=>e.name===r.name||e.src===r.src));if(e)e.load(r);else{const e=new s;e.load(r),o.push(e)}}}needsPlugin(){return!0}}}}]);
//# sourceMappingURL=4843.cfed3bd8.chunk.js.map