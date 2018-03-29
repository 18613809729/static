$.searchDialog = function(option){
	if($("#popSearchePage").length){
		$("#popSearchePage").show();
		$("#popSearchePage #searchText").trigger("click");
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		return;
	}
	var template = '<div class="page" style="z-index:1000;height: 100%;" id="popSearchePage"><div id="searchPannel">' +
  '<div class="weui-search-bar" id="searchBar">' +
  '<form class="weui-search-bar__form">' +
  '<div class="weui-search-bar__box">' +
  '<i class="weui-icon-search"></i>' +
  '<input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required/>' +
  '<a href="javascript:" class="weui-icon-clear" id="searchClear"></a>' +
  '</div>' +
  '<label class="weui-search-bar__label" id="searchText">' +
  '<i class="weui-icon-search"></i>' +
  '<span>搜索</span>' +
  '</label>' +
  '</form>' +
  '<a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>' +
  '</div>' +
  '<div class="weui-cells searchbar-result" id="searchResult">' +
  '</div>' +
  '</div></div>';
  $("body").append(template); 
  var _customCancelSearch = option.customCancelSearch;
  option.customCancelSearch = function(){
      $("#popSearchePage").hide();
      _customCancelSearch && _customCancelSearch();
  }
  option.customItemClickFun = function(){
     this.cancelSearch();
 }
 var searchBar = $("#searchPannel").userSearchBar(option);
 searchBar.$searchText.trigger("click");
 document.body.scrollTop = document.documentElement.scrollTop = 0;
}

$.singlePost = function(triggerElem, url, data){
    if(!triggerElem.hasClass("weui-btn_loading")){
        triggerElem.addClass("weui-btn_loading");
        triggerElem.find("i").addClass("weui-loading");
        return  $.post(url, data).fail(function(){
            $.toast("请求出错，请稍候再试", "cancel");
        }).always(function(){
            triggerElem.removeClass("weui-btn_loading");
            triggerElem.find("i").removeClass("weui-loading");
        });
    }
};