webpackJsonp([1],{

/***/ 10:
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
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'LogTime',
	  data: function data() {
	    return {
	      date: '',
	      totalTime: '',
	      comment: ''
	    };
	  },

	  methods: {
	    save: function save() {
	      var plan = {
	        name: '二哲',
	        image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256',
	        date: this.date,
	        totalTime: this.totalTime,
	        comment: this.comment
	      };

	      this.$store.dispatch('savePlan', plan);
	      this.$store.dispatch('addTotalTime', this.totalTime);
	      this.$router.go(-1);
	    }
	  }
	};

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(10)

	/* template */
	var __vue_template__ = __webpack_require__(28)
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
	__vue_options__.__file = "E:\\Users\\fuiyu\\Documents\\basic\\src\\index\\components\\LogTime.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (true) {(function () {
	  var hotAPI = __webpack_require__(1)
	  hotAPI.install(__webpack_require__(2), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-22894802", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-22894802", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] LogTime.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "form-horizontal"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('label', [_vm._v("日期")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.date),
	      expression: "date"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "date",
	      "placeholder": "Date"
	    },
	    domProps: {
	      "value": _vm._s(_vm.date)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.date = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('label', [_vm._v("时间")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.totalTime),
	      expression: "totalTime"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "number",
	      "placeholder": "Hours"
	    },
	    domProps: {
	      "value": _vm._s(_vm.totalTime)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.totalTime = _vm._n($event.target.value)
	      },
	      "blur": function($event) {
	        _vm.$forceUpdate()
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('label', [_vm._v("备注")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.comment),
	      expression: "comment"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "Comment"
	    },
	    domProps: {
	      "value": _vm._s(_vm.comment)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.comment = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    on: {
	      "click": function($event) {
	        _vm.save()
	      }
	    }
	  }, [_vm._v("保存")]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-danger",
	    attrs: {
	      "to": "/time-entries"
	    }
	  }, [_vm._v("取消")]), _vm._v(" "), _c('hr')])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (true) {
	  module.hot.accept()
	  if (module.hot.data) {
	     __webpack_require__(1).rerender("data-v-22894802", module.exports)
	  }
	}

/***/ }

});