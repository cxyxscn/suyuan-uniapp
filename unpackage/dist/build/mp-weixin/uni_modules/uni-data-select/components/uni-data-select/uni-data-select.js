(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-data-select/components/uni-data-select/uni-data-select"],{"161a":function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"uni-data-select",mixins:[t.mixinDatacom||{}],props:{localdata:{type:Array,default:function(){return[]}},value:{type:[String,Number],default:""},modelValue:{type:[String,Number],default:""},label:{type:String,default:""},placeholder:{type:String,default:"请选择"},emptyTips:{type:String,default:"无选项"},clear:{type:Boolean,default:!0},defItem:{type:Number,default:0},disabled:{type:Boolean,default:!1},format:{type:String,default:""}},data:function(){return{showSelector:!1,current:"",mixinDatacomResData:[],apps:[],channels:[],cacheKey:"uni-data-select-lastSelectedValue"}},created:function(){var t=this;this.debounceGet=this.debounce((function(){t.query()}),300),this.collection&&!this.localdata.length&&this.debounceGet()},computed:{typePlaceholder:function(){var t=this.placeholder,e={"opendb-stat-app-versions":"版本","opendb-app-channels":"渠道","opendb-app-list":"应用"}[this.collection];return e?t+e:t},valueCom:function(){return this.value}},watch:{localdata:{immediate:!0,handler:function(t,e){Array.isArray(t)&&e!==t&&(this.mixinDatacomResData=t)}},valueCom:function(t,e){this.initDefVal()},mixinDatacomResData:{immediate:!0,handler:function(t){t.length&&this.initDefVal()}}},methods:{debounce:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=null;return function(){for(var n=this,i=arguments.length,c=new Array(i),o=0;o<i;o++)c[o]=arguments[o];a&&clearTimeout(a),a=setTimeout((function(){t.apply(n,c)}),e)}},query:function(){this.mixinDatacomEasyGet()},onMixinDatacomPropsChange:function(){this.collection&&this.debounceGet()},initDefVal:function(){var t="";if(!this.valueCom&&0!==this.valueCom||this.isDisabled(this.valueCom)){var e;if(this.collection&&(e=this.getCache()),e||0===e)t=e;else{var a="";this.defItem>0&&this.defItem<=this.mixinDatacomResData.length&&(a=this.mixinDatacomResData[this.defItem-1].value),t=a}(t||0===t)&&this.emit(t)}else t=this.valueCom;var n=this.mixinDatacomResData.find((function(e){return e.value===t}));this.current=n?this.formatItemName(n):""},isDisabled:function(t){var e=!1;return this.mixinDatacomResData.forEach((function(a){a.value===t&&(e=a.disable)})),e},clearVal:function(){this.emit(""),this.collection&&this.removeCache()},change:function(t){t.disable||(this.showSelector=!1,this.current=this.formatItemName(t),this.emit(t.value))},emit:function(t){this.$emit("input",t),this.$emit("update:modelValue",t),this.$emit("change",t),this.collection&&this.setCache(t)},toggleSelector:function(){this.disabled||(this.showSelector=!this.showSelector)},formatItemName:function(t){var e=t.text,a=t.value,n=t.channel_code;if(n=n?"(".concat(n,")"):"",this.format){var i="";for(var c in i=this.format,t)i=i.replace(new RegExp("{".concat(c,"}"),"g"),t[c]);return i}return this.collection.indexOf("app-list")>0?"".concat(e,"(").concat(a,")"):e||"未命名".concat(n)},getLoadData:function(){return this.mixinDatacomResData},getCurrentCacheKey:function(){return this.collection},getCache:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getCurrentCacheKey(),e=a.getStorageSync(this.cacheKey)||{};return e[t]},setCache:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.getCurrentCacheKey(),n=a.getStorageSync(this.cacheKey)||{};n[e]=t,a.setStorageSync(this.cacheKey,n)},removeCache:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getCurrentCacheKey(),e=a.getStorageSync(this.cacheKey)||{};delete e[t],a.setStorageSync(this.cacheKey,e)}}};e.default=n}).call(this,a("a9ff")["default"],a("543d")["default"])},"18aa":function(t,e,a){},"7b1a":function(t,e,a){"use strict";a.r(e);var n=a("c779"),i=a("cf73");for(var c in i)["default"].indexOf(c)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(c);a("d550");var o=a("f0c5"),r=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=r.exports},c779:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return n}));var n={uniIcons:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(a.bind(null,"a045"))}},i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.showSelector?t.mixinDatacomResData.length:null),n=t.showSelector&&0!==a?t.__map(t.mixinDatacomResData,(function(e,a){var n=t.__get_orig(e),i=t.formatItemName(e);return{$orig:n,m0:i}})):null;t.$mp.data=Object.assign({},{$root:{g0:a,l0:n}})},c=[]},cf73:function(t,e,a){"use strict";a.r(e);var n=a("161a"),i=a.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e["default"]=i.a},d550:function(t,e,a){"use strict";var n=a("18aa"),i=a.n(n);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-data-select/components/uni-data-select/uni-data-select-create-component',
    {
        'uni_modules/uni-data-select/components/uni-data-select/uni-data-select-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7b1a"))
        })
    },
    [['uni_modules/uni-data-select/components/uni-data-select/uni-data-select-create-component']]
]);
