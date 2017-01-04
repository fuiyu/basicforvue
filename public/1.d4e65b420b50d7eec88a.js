webpackJsonp([1],{

/***/ 8:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	    data: function data() {
	        return {
	            modal1: false
	        };
	    },

	    methods: {
	        ok: function ok() {
	            this.$Message.info('点击了确定');
	        },
	        cancel: function cancel() {
	            this.$Message.info('点击了取消');
	        }
	    }
	};

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(8)

	/* template */
	var __vue_template__ = __webpack_require__(22)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "E:\\Users\\fuiyu\\Documents\\basic\\src\\components\\login\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (true) {(function () {
	  var hotAPI = __webpack_require__(1)
	  hotAPI.install(__webpack_require__(2), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1764d4f4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1764d4f4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('Modal', {
	    attrs: {
	      "visible": _vm.modal1,
	      "title": "登录框"
	    },
	    on: {
	      "on-ok": _vm.ok,
	      "on-cancel": _vm.cancel
	    }
	  }, [_c('i-input', {
	    staticStyle: {
	      "width": "300px"
	    },
	    attrs: {
	      "value": _vm.value,
	      "placeholder": "用户名"
	    }
	  }), _vm._v(" "), _c('i-input', {
	    staticStyle: {
	      "width": "300px"
	    },
	    attrs: {
	      "value": _vm.value,
	      "placeholder": "密码"
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (true) {
	  module.hot.accept()
	  if (module.hot.data) {
	     __webpack_require__(1).rerender("data-v-1764d4f4", module.exports)
	  }
	}

/***/ }

});