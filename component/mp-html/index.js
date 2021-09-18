"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}/*!
 * mp-html v2.1.5
 * https://github.com/jin-yufeng/mp-html
 *
 * Released under the MIT license
 * Author: Jin Yufeng
 */
var t=require("./parser"),n=[require("./style/index.js")];Component({data:{nodes:[]},properties:{containerStyle:String,content:{type:String,value:"",observer:function(e){this.setContent(e)}},copyLink:{type:Boolean,value:!0},domain:String,errorImg:String,lazyLoad:Boolean,loadingImg:String,pauseVideo:{type:Boolean,value:!0},previewImg:{type:Boolean,value:!0},scrollTable:Boolean,selectable:null,setTitle:{type:Boolean,value:!0},showImgMenu:{type:Boolean,value:!0},tagStyle:Object,useAnchor:null},created:function(){this.plugins=[];for(var e=n.length;e--;)this.plugins.push(new n[e](this))},detached:function(){clearInterval(this._timer),this._hook("onDetached")},methods:{in:function(e,t,n){e&&t&&n&&(this._in={page:e,selector:t,scrollTop:n})},navigateTo:function(t,n){var o=this;return new Promise(function(r,i){if(!o.data.useAnchor)return void i(Error("Anchor is disabled"));var a=wx.createSelectorQuery().in(o._in?o._in.page:o).select((o._in?o._in.selector:"._root")+(t?"".concat(">>>","#").concat(t):"")).boundingClientRect();o._in?a.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect():a.selectViewport().scrollOffset(),a.exec(function(t){if(!t[0])return void i(Error("Label not found"));var a=t[1].scrollTop+t[0].top-(t[2]?t[2].top:0)+(n||parseInt(o.data.useAnchor)||0);o._in?o._in.page.setData(e({},o._in.scrollTop,a)):wx.pageScrollTo({scrollTop:a,duration:300}),r()})})},getText:function(e){var t="";return function e(n){for(var o=0;o<n.length;o++){var r=n[o];if("text"===r.type)t+=r.text.replace(/&amp;/g,"&");else if("br"===r.name)t+="\n";else{var i="p"===r.name||"div"===r.name||"tr"===r.name||"li"===r.name||"h"===r.name[0]&&r.name[1]>"0"&&r.name[1]<"7";i&&t&&"\n"!==t[t.length-1]&&(t+="\n"),r.children&&e(r.children),i&&"\n"!==t[t.length-1]?t+="\n":"td"!==r.name&&"th"!==r.name||(t+="\t")}}}(e||this.data.nodes),t},getRect:function(){var e=this;return new Promise(function(t,n){wx.createSelectorQuery().in(e).select("._root").boundingClientRect().exec(function(e){return e[0]?t(e[0]):n(Error("Root label not found"))})})},setContent:function(e,n){var o=this;this.imgList&&n||(this.imgList=[]),this._videos=[];var r={},i=new t(this).parse(e);if(n)for(var a=this.data.nodes.length,l=i.length;l--;)r["nodes[".concat(a+l,"]")]=i[l];else r.nodes=i;this.setData(r,function(){o._hook("onLoad"),o.triggerEvent("load")});var s;clearInterval(this._timer),this._timer=setInterval(function(){o.getRect().then(function(e){e.height===s&&(o.triggerEvent("ready",e),clearInterval(o._timer)),s=e.height}).catch(function(){})},350)},_hook:function(e){for(var t=n.length;t--;)this.plugins[t][e]&&this.plugins[t][e]()},_add:function(e){e.detail.root=this}}});