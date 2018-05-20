$.fn.extend({
	searchBar:function(option){
		option.dom = $(this);
		new SearchBar(option);
	},
	userSearchBar:function(option){
		var setting = {
			dom:$(this),
			searchFieldFun:function(searchText){
				if(/\d+/.test(searchText)){
					return ["mobile"];
				}else{
					return ["username", {"fieldName":"username", "type":"pinyin"}];
				}
			},
			render:function(resArr){
				var html = "";
				for (var i = 0; i < resArr.length; i++) {
					html += '<div class="weui-cell weui-cell_access cursor_pointer searchItem" data-id="' + resArr[i].id + '">' +
								'<div class="weui-cell__bd weui-cell_primary">' +
									'<p>' + (resArr[i].usernameSearched || resArr[i].username)  + '&nbsp;&nbsp;' + (resArr[i].mobileSearched || resArr[i].mobile) + '</p>' + 
								'</div>' +
							'</div>';
				}
				return html;				
			},
			max:10
		}
		$.extend(setting, option);
		return new SearchBar(setting);
	}
});


function SearchBar(option){
	this.$searchBar=option.dom.find('#searchBar');
	this.$searchResult=option.dom.find('#searchResult');
	this.$searchText=option.dom.find('#searchText');
	this.$searchInput = option.dom.find('#searchInput'),
	this.$searchClear=option.dom.find('#searchClear');
	this.$searchCancel=option.dom.find('#searchCancel');
	$.extend(this, option);
	this.init();
}

SearchBar.prototype = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		_this.$searchText.on('click', function(){
            _this.$searchBar.addClass('weui-search-bar_focusing');
            _this.$searchInput.focus();
        });
        _this.$searchClear.on('click', function(){
            _this.hideSearchResult();
            _this.$searchInput.focus();
        });
        _this.$searchCancel.on('click', function(){
            _this.cancelSearch();
            _this.$searchInput.blur();
        });

        _this.$searchInput.on('blur', function () {
            if(!this.value.length) _this.cancelSearch();
        }).on('input', function(){
        	var searchText = $.trim(this.value);
            if(searchText.length) {
            	var resArr =  _this.search(searchText, _this.datas, _this.searchFields || _this.searchFieldFun(searchText), _this.max);
            	var resHtml = resArr.length ? _this.render(resArr) : _this.renderEmpty();
            	$("#searchResult").html(resHtml);
                _this.$searchResult.show();
            } else {
                _this.$searchResult.hide();
            }
        });

        _this.dom.on("click", ".searchItem", function(){
        	_this.itemClickFun($(this));
        })
	},
	itemClickFun:function(item){
		var id = item.data("id");
		for (var i = 0; i < this.datas.length; i++) {
			if(id == this.datas[i].id){
				if(this.itemClickCallback.call(this, this.datas[i]) === false){
					return;
				}
				break;
			}
		}
		this.customItemClickFun.apply(this);
	},
	customItemClickFun:function(){

	},
	hideSearchResult:function(){
		this.$searchResult.hide();
        this.$searchInput.val('');
	},
	cancelSearch:function(){
		this.hideSearchResult();
        this.$searchBar.removeClass('weui-search-bar_focusing');
        this.$searchText.show();
        this.customCancelSearch && this.customCancelSearch();
	},
	customCancelSearch:function(){

	},
	search:function(searchText, dataLst, fields, max){
		max = max || 10000;
		var resArr = [];
		for (var i = 0; i < dataLst.length; i++) {
			var resObj = this.searchSingle(searchText, dataLst[i], fields);
			resObj && resArr.push(resObj);
			if(resArr.length >= max){
				break;
			}
		}
		return resArr;
	},
	searchSingle:function(searchText, data, fields){
		var res = null;
		for (var i = 0; i < fields.length; i++) {
			var searchRes = null;
			var fieldName = "";
			if(typeof(fields[i]) == 'string'){
				fieldName = fields[i];
				searchRes = this.match(searchText, data[fieldName]);
			} else if(typeof(fields[i]) == 'object' && fields[i].type == 'pinyin'){
				fieldName = fields[i].fieldName;
				searchRes = this.matchPinyin(searchText, data[fieldName]);
			}
			if(searchRes){
				res = res || $.extend({}, data);
				res[fieldName + "Searched"] = searchRes;
			}
		}
		return res;
	},

	match:function(searchText, text){
		var upSearchText = searchText.toUpperCase();
		var upText = text.toUpperCase();
		return upText.indexOf(upSearchText) != -1 && text.replace(new RegExp('(' + upSearchText + ')', 'gi'), '<span class="font_green">$1</span>');
	},

	matchPinyin:function(searchText, text) {
		var upSearchText = searchText.toUpperCase();
		var chinesePinArr = [];
		var pinyin = new Pinyin();
		for (var i = 0; i < text.length; i++) {
			chinesePinArr.push(pinyin.getFullChars(text[i]).toUpperCase() || "-");
		}
		var pinyinJoinStr = chinesePinArr.join("#");
		var searchExp = '(#?)(\\w*';
		for (var i = 0; i < searchText.length; i++) {
			searchExp += searchText[i];
			i < searchText.length - 1 ? searchExp += '#?' : searchExp += '\\w*)(#?)';
		}
		var searchRes = pinyinJoinStr.replace(new RegExp(searchExp, "gi"), "$1~$2~$3");
		return searchRes.indexOf('~') != -1 && this.pinyinAddMark(searchRes, text);
	},

	pinyinAddMark:function(searchRes, text){
		var res = "";
		var searchResArr = searchRes.split("#");
		for (var i = 0; i < text.length; i++) {
			if(searchResArr[i].startsWith('~')){
				res += '<span class="font_green">'
			}
			res += text[i];
			if(searchResArr[i].endsWith('~')){
				res += '</span>'
			}
		}
		return res;
	},
	renderEmpty:function(){
		return '<div class="weui-loadmore weui-loadmore_line">' +
            		'<span class="weui-loadmore__tips">暂无数据</span>' +
        		'</div>';
	}
}