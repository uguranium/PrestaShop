window.supplier_form=function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=395)}({16:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(17),a=window.$,s=function(){function e(t){i(this,e),t=t||{},this.localeItemSelector=t.localeItemSelector||".js-locale-item",this.localeButtonSelector=t.localeButtonSelector||".js-locale-btn",this.localeInputSelector=t.localeInputSelector||".js-locale-input",a("body").on("click",this.localeItemSelector,this.toggleLanguage.bind(this)),o.EventEmitter.on("languageSelected",this.toggleInputs.bind(this))}return r(e,[{key:"toggleLanguage",value:function(e){var t=a(e.target),n=t.closest("form");o.EventEmitter.emit("languageSelected",{selectedLocale:t.data("locale"),form:n})}},{key:"toggleInputs",value:function(e){var t=e.form,n=e.selectedLocale,i=t.find(this.localeButtonSelector),r=i.data("change-language-url");i.text(n),t.find(this.localeInputSelector).addClass("d-none"),t.find(this.localeInputSelector+".js-locale-"+n).removeClass("d-none"),r&&this._saveSelectedLanguage(r,n)}},{key:"_saveSelectedLanguage",value:function(e,t){a.post({url:e,data:{language_iso_code:t}})}}]),e}();t.default=s},17:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0;var i=n(18),r=function(e){return e&&e.__esModule?e:{default:e}}(i);t.EventEmitter=new r.default},18:function(e,t,n){"use strict";function i(e){console&&console.warn&&console.warn(e)}function r(){r.init.call(this)}function o(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function a(e,t,n,r){var a,s,l;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(s=e._events,void 0===s?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),l=s[t]),void 0===l)l=s[t]=n,++e._eventsCount;else if("function"==typeof l?l=s[t]=r?[n,l]:[l,n]:r?l.unshift(n):l.push(n),(a=o(e))>0&&l.length>a&&!l.warned){l.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+l.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=l.length,i(c)}return e}function s(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,m(this.listener,this.target,e))}function l(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=s.bind(i);return r.listener=n,i.wrapFn=r,r}function c(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?p(r):f(r,r.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function d(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function p(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}var h,v="object"==typeof Reflect?Reflect:null,m=v&&"function"==typeof v.apply?v.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};h=v&&"function"==typeof v.ownKeys?v.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var g=Number.isNaN||function(e){return e!==e};e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var y=10;Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return y},set:function(e){if("number"!=typeof e||e<0||g(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");y=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||g(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return o(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var s=r[e];if(void 0===s)return!1;if("function"==typeof s)m(s,this,t);else for(var l=s.length,c=f(s,l),n=0;n<l;++n)m(c[n],this,t);return!0},r.prototype.addListener=function(e,t){return a(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return a(this,e,t,!0)},r.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,l(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,l(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,r,o,a;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){a=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():d(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return c(this,e,!0)},r.prototype.rawListeners=function(e){return c(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},r.prototype.listenerCount=u,r.prototype.eventNames=function(){return this._eventsCount>0?h(this._events):[]}},19:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=window.$,a=function(){function e(t){var n=this;return i(this,e),this.$container=o(t),this.$container.on("click",".js-input-wrapper",function(e){var t=o(e.currentTarget);n._toggleChildTree(t)}),this.$container.on("click",".js-toggle-choice-tree-action",function(e){var t=o(e.currentTarget);n._toggleTree(t)}),{enableAutoCheckChildren:function(){return n.enableAutoCheckChildren()},enableAllInputs:function(){return n.enableAllInputs()},disableAllInputs:function(){return n.disableAllInputs()}}}return r(e,[{key:"enableAutoCheckChildren",value:function(){this.$container.on("change",'input[type="checkbox"]',function(e){var t=o(e.currentTarget);t.closest("li").find('ul input[type="checkbox"]').prop("checked",t.is(":checked"))})}},{key:"enableAllInputs",value:function(){this.$container.find("input").removeAttr("disabled")}},{key:"disableAllInputs",value:function(){this.$container.find("input").attr("disabled","disabled")}},{key:"_toggleChildTree",value:function(e){var t=e.closest("li");if(t.hasClass("expanded"))return void t.removeClass("expanded").addClass("collapsed");t.hasClass("collapsed")&&t.removeClass("collapsed").addClass("expanded")}},{key:"_toggleTree",value:function(e){var t=e.closest(".js-choice-tree-container"),n=e.data("action"),i={addClass:{expand:"expanded",collapse:"collapsed"},removeClass:{expand:"collapsed",collapse:"expanded"},nextAction:{expand:"collapse",collapse:"expand"},text:{expand:"collapsed-text",collapse:"expanded-text"},icon:{expand:"collapsed-icon",collapse:"expanded-icon"}};t.find("li").each(function(e,t){var r=o(t);r.hasClass(i.removeClass[n])&&r.removeClass(i.removeClass[n]).addClass(i.addClass[n])}),e.data("action",i.nextAction[n]),e.find(".material-icons").text(e.data(i.icon[n])),e.find(".js-toggle-text").text(e.data(i.text[n]))}}]),e}();t.default=a},29:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
var r=window.$,o=function e(t){var n=t.tokenFieldSelector,o=t.options,a=void 0===o?{}:o;i(this,e),r(n).tokenfield(a)};t.default=o},292:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
t.default={supplierCountrySelect:"#supplier_id_country",supplierStateSelect:"#supplier_id_state",supplierStateBlock:".js-supplier-state"}},31:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=window.$,a=function(){function e(t){if(i(this,e),t=t||{},this.tinyMCELoaded=!1,void 0===t.baseAdminUrl)if(void 0!==window.baseAdminDir)t.baseAdminUrl=window.baseAdminDir;else{var n=window.location.pathname.split("/");n.every(function(e){return""===e||(t.baseAdminUrl="/"+e+"/",!1)})}void 0===t.langIsRtl&&(t.langIsRtl=void 0!==window.lang_is_rtl&&"1"===window.lang_is_rtl),this.setupTinyMCE(t)}return r(e,[{key:"setupTinyMCE",value:function(e){"undefined"==typeof tinyMCE?this.loadAndInitTinyMCE(e):this.initTinyMCE(e)}},{key:"initTinyMCE",value:function(e){var t=this;e=Object.assign({selector:".rte",plugins:"align colorpicker link image filemanager table media placeholder advlist code table autoresize",browser_spellcheck:!0,toolbar1:"code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect",toolbar2:"",external_filemanager_path:e.baseAdminUrl+"filemanager/",filemanager_title:"File manager",external_plugins:{filemanager:e.baseAdminUrl+"filemanager/plugin.min.js"},language:iso_user,content_style:e.langIsRtl?"body {direction:rtl;}":"",skin:"prestashop",menubar:!1,statusbar:!1,relative_urls:!1,convert_urls:!1,entity_encoding:"raw",extended_valid_elements:"em[class|name|id],@[role|data-*|aria-*]",valid_children:"+*[*]",valid_elements:"*[*]",rel_list:[{title:"nofollow",value:"nofollow"}],editor_selector:"autoload_rte",init_instance_callback:function(){t.changeToMaterial()},setup:function(e){t.setupEditor(e)}},e),void 0!==e.editor_selector&&(e.selector="."+e.editor_selector),o("body").on("click",".mce-btn, .mce-open, .mce-menu-item",function(){t.changeToMaterial()}),tinyMCE.init(e),this.watchTabChanges(e)}},{key:"setupEditor",value:function(e){var t=this;e.on("loadContent",function(e){t.handleCounterTiny(e.target.id)}),e.on("change",function(e){tinyMCE.triggerSave(),t.handleCounterTiny(e.target.id)}),e.on("blur",function(){tinyMCE.triggerSave()})}},{key:"watchTabChanges",value:function(e){o(e.selector).each(function(e,t){var n=o(t).closest(".translation-field"),i=o(t).closest(".translations.tabbable");if(n.length&&i.length){var r=n.data("locale");o('.nav-item a[data-locale="'+r+'"]',i).on("shown.bs.tab",function(){var e=tinyMCE.get(t.id);e&&e.setContent(e.getContent())})}})}},{key:"loadAndInitTinyMCE",value:function(e){var t=this;if(!this.tinyMCELoaded){this.tinyMCELoaded=!0;var n=e.baseAdminUrl.split("/");n.splice(n.length-2,2);var i=n.join("/");window.tinyMCEPreInit={},window.tinyMCEPreInit.base=i+"/js/tiny_mce",window.tinyMCEPreInit.suffix=".min",o.getScript(i+"/js/tiny_mce/tinymce.min.js",function(){t.setupTinyMCE(e)})}}},{key:"changeToMaterial",value:function(){var e={"mce-i-code":'<i class="material-icons">code</i>',"mce-i-none":'<i class="material-icons">format_color_text</i>',"mce-i-bold":'<i class="material-icons">format_bold</i>',"mce-i-italic":'<i class="material-icons">format_italic</i>',"mce-i-underline":'<i class="material-icons">format_underlined</i>',"mce-i-strikethrough":'<i class="material-icons">format_strikethrough</i>',"mce-i-blockquote":'<i class="material-icons">format_quote</i>',"mce-i-link":'<i class="material-icons">link</i>',"mce-i-alignleft":'<i class="material-icons">format_align_left</i>',"mce-i-aligncenter":'<i class="material-icons">format_align_center</i>',"mce-i-alignright":'<i class="material-icons">format_align_right</i>',"mce-i-alignjustify":'<i class="material-icons">format_align_justify</i>',"mce-i-bullist":'<i class="material-icons">format_list_bulleted</i>',"mce-i-numlist":'<i class="material-icons">format_list_numbered</i>',"mce-i-image":'<i class="material-icons">image</i>',"mce-i-table":'<i class="material-icons">grid_on</i>',"mce-i-media":'<i class="material-icons">video_library</i>',"mce-i-browse":'<i class="material-icons">attachment</i>',"mce-i-checkbox":'<i class="mce-ico mce-i-checkbox"></i>'};o.each(e,function(e,t){o("."+e).replaceWith(t)})}},{key:"handleCounterTiny",value:function(e){var t=o("#"+e),n=t.attr("counter"),i=t.attr("counter_type"),r=tinyMCE.activeEditor.getBody().textContent.length;t.parent().find("span.currentLength").text(r),"recommended"!==i&&r>n?t.parent().find("span.maxLength").addClass("text-danger"):t.parent().find("span.maxLength").removeClass("text-danger")}}]),e}();t.default=a},395:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(63),o=i(r),a=n(292),s=i(a),l=n(16),c=i(l),u=n(29),f=i(u),d=n(19),p=i(d),h=n(31),v=i(h);(0,window.$)(document).ready(function(){new p.default("#supplier_shop_association").enableAutoCheckChildren(),new o.default(s.default.supplierCountrySelect,s.default.supplierStateSelect,s.default.supplierStateBlock),new v.default,new c.default,new f.default({tokenFieldSelector:"input.js-taggable-field",options:{createTokensOnBlur:!0}})})},63:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=window.$,a=function(){function e(t,n,r){var a=this;return i(this,e),this.$stateSelectionBlock=o(r),this.$countryStateSelector=o(n),this.$countryInput=o(t),this.$countryInput.on("change",function(){return a._toggle()}),this._toggle(!0),{}}return r(e,[{key:"_toggle",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];o.ajax({url:this.$countryInput.data("states-url"),method:"GET",dataType:"json",data:{id_country:this.$countryInput.val()}}).then(function(n){if(0===n.states.length)return void e.$stateSelectionBlock.fadeOut();if(e.$stateSelectionBlock.fadeIn(),!1===t){e.$countryStateSelector.empty();var i=e;o.each(n.states,function(e,t){i.$countryStateSelector.append(o("<option></option>").attr("value",t).text(e))})}}).catch(function(e){void 0!==e.responseJSON&&showErrorMessage(e.responseJSON.message)})}}]),e}();t.default=a}});