$.fn.extend({
	formValidate:function(option){
		var setting = {
			$form:$(this),
			checkError:function(errorInfos){
				$.toast(errorInfos[0].errorMsg, "text");
			}
		}
		$.extend(setting, option);
		return new FormValidate(setting);
	}
})


function FormValidate(option){
	var validRules = (option.validRules && $.extend(this.validRules, option.validRules)) || this.validRules;
	$.extend(this, option);
	this.validRules = validRules;
	this.init();
}

FormValidate.prototype = {
	validRules :{
		mobile: {
			reg: /^1\d{10}$/,
			errorMsg: "手机号格式不正确"
		},
		chinese: {
			reg: /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/,
			errorMsg: "$label必须为中文"
		},
		english: {
			reg: /^[A-Za-z]+$/,
			errorMsg: "$label必须为英文字母"
		},
		email: {
			reg: /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
			errorMsg: "邮箱格式错误"
		},
		certNo:{
			fun:function(certNo){
					function check(certNo){
						var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];  
            			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]; 
            			var sum = 0;  
	            		for (var i = 0; i < 17; i++) {
	            			sum += certNo[i] * factor[i];  
	            		}  
	            		return parity[sum % 11] == certNo[17].toUpperCase();
					}
					return /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(certNo) && check(certNo);
            },
            errorMsg:"证件号输入错误"
        }
	},
	init:function(){
		this.bindEvent();
	},
	label:function(elem){
			function forLabel(elem){
				var name = elem.attr('name');
		    	return name && $('[for="' + name + '"]').html();
			}
			return elem.attr('label') || forLabel(elem) || "";
	    },
	bindEvent:function(){
		this.$form.find('[maxlength]').on('input', function(){
			this.value = $.trim(this.value).substr(0, $(this).attr("maxlength"));
		});
		this.$form.find("input").on('blur', function(){
			this.value = $.trim(this.value);
		});
		this.$form.find('[uppercase]').on('blur', function(){
			this.value = $.trim(this.value).toUpperCase();
		});
	},
	validate:function(checkSuccess, checkError){
		var _this = this;
		var errorInfos = [];
		checkError = checkError || this.checkError;
		this.$form.find('[validate],[pattern],[min],[max],[minlength],[maxlength_],[required]').each(function(i, elem){
			var $elem = $(elem);
			_this.checkEmpty($elem, errorInfos) && _this.checkMin($elem, errorInfos) && _this.checkMax($elem, errorInfos) && _this.checkMinLength($elem, errorInfos) && _this.checkMaxlength_($elem, errorInfos) && _this.checkPattern($elem, errorInfos) && _this.checkValidate($elem, errorInfos) && _this.customCheck($elem, errorInfos);
		});
		errorInfos.length ? checkError(errorInfos) : checkSuccess(this.$form);
	},
	customCheck:function(){

	},
	checkEmpty:function($elem, errorInfos){
		if($elem.val() == "" && $elem.attr("required") != undefined){
			var label = this.label($elem);
			var tip = $elem.attr("emptyTips") || (label && (label + "不能为空")) || $elem.attr("tips");
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},

	checkMin:function($elem, errorInfos){
		var min = $elem.attr("min");
		if(min && parseFloat($elem.val()) < parseFloat(min)){
			var tip = $elem.attr("tips") || this.label($elem) + "需大于等于" + min;
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},
	checkMax:function($elem, errorInfos){
		var max = $elem.attr("max");
		if(max && parseFloat($elem.val()) > parseFloat(max)){
			var tip = $elem.attr("tips") || this.label($elem) + "需小于等于" + max;
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},
	checkMinLength:function($elem, errorInfos){
		var minlength = $elem.attr("minlength");
		if(minlength && $elem.val().length < parseInt(minlength)){
			var tip = $elem.attr("tips") || this.label($elem) + "长度需大于等于" + minlength;
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},
	checkMaxlength_:function($elem, errorInfos){
		var maxlength_ = $elem.attr("maxlength_");
		if(maxlength_ && $elem.val().length > parseInt(maxlength_)){
			var tip = $elem.attr("tips") || this.label($elem) + "长度需小于等于" + maxlength_;
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},
	checkPattern:function($elem, errorInfos){
		var pattern = $elem.attr("pattern");
		if(pattern && !(new RegExp(pattern)).test($elem.val())){
			var tip = $elem.attr("tips") || this.label($elem) + "格式错误";
			errorInfos.push({"dom":$elem, "errorMsg":tip});
			return false;
		}
		return true;
	},

	checkValidate:function($elem, errorInfos){
		var validateType = $elem.attr("validate");
		if(validateType){
			var rule = this.validRules[validateType];
			if(rule){
				var isValid = rule.fun ? rule.fun($elem.val()) : rule.reg.test($elem.val());
				if(!isValid){
					var tip = $elem.attr("tips") || (rule.errorMsg && rule.errorMsg.replace("$label", this.label($elem))) || this.label($elem) + "格式错误";
					errorInfos.push({"dom":$elem, "errorMsg":tip });
					return false;
				}
			} else {
				console.log("找不到该表单验证项:" + validateType)
			}
 		}
 		return true;
	}

}
