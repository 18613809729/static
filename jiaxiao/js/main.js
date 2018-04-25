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
        return  $.post(url, data).done(function(res){
            res.success || $.toast("系统错误，请稍候再试", "cancel");
        }).fail(function(){
            $.toast("请求出错，请稍候再试", "cancel");
        }).always(function(){
            triggerElem.removeClass("weui-btn_loading");
            triggerElem.find("i").removeClass("weui-loading");
        });
    } else {
      return {done:function(){}}
    }
};

$.singleDelete = function(triggerElem, url, data){
  if(data && typeof data == "string"){
    data += "&_method=delete";
  } else {
    data = data || {};
    data._method = "delete";
  }
  return $.singlePost(triggerElem, url, data);
}

$.singlePut = function(triggerElem, url, data){
  if(data && typeof data == "string"){
    data += "&_method=put";
  } else {
    data = data || {};
    data._method = "put";
  }
  return $.singlePost(triggerElem, url, data);
}

$.toSuccess = function(option){
  var opt = {
    "title":"操作成功",
    "desc":"",
    "primary_btn_msg":"确定",
    "primary_btn_url":"javascript:history.back();"
  }
  $.extend(opt, option);
  $(".msg_success").remove();
  var html = '<div class="page msg_success js_show" style="z-index:1000;">'+
                '<div class="weui-msg">'+
                    '<div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>'+
                    '<div class="weui-msg__text-area">'+
                        '<h2 class="weui-msg__title">' + opt.title + '</h2>'+
                        '<p class="weui-msg__desc">' + opt.desc + '</p>'+
                    '</div>'+
                    '<div class="weui-msg__opr-area">'+
                        '<p class="weui-btn-area">'+
                            '<a href="' + opt.primary_btn_url + '" class="weui-btn weui-btn_primary">' + opt.primary_btn_msg + '</a>';
                            if(opt.default_btn_msg){
                              html += '<a href="' + opt.default_btn_url + '" class="weui-btn weui-btn_default">' + opt.default_btn_msg + '</a>';
                            }
      html +=           '</p>'+
                    '</div>'+
                '</div>'+
            '</div>';
  $("body").append(html);
}

$.groupByPinyin = function(datas, field){
  var upper_lettel = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
  var res={};
  var pinyin = new Pinyin();
  $.each(datas, function(idx, data){
      var firstLettel = data[field] && pinyin.getFullChars(data[field]).toUpperCase().charAt(0);
      if(firstLettel && upper_lettel.contains(firstLettel)){
        res[firstLettel] = res[firstLettel] || [];
        res[firstLettel].push(data);
      } else {
        res["#"] = res["#"] || [];
        res["#"].push(data);
      }
  });
  var resLst = [];
  for (var i = 0; i < upper_lettel.length; i++) {
    var resI = res[upper_lettel[i]];
    resI && resLst.push({"lettel":upper_lettel[i], "data":resI});
  }
  return resLst;
}

$.toast.prototype.defaults.duration=2000

function reloadIfNeed(UUID){
  if(UUID){
    var UUIDS_STR = localStorage.getItem('UUIDS');
    var UUIDS = (UUIDS_STR && JSON.parse(UUIDS_STR)) || [];
    for (var i = 0; i < UUIDS.length; i++) {
      if(UUIDS[i] == UUID){
      location.reload();
      return;
      }
    }
    UUIDS.unshift(UUID);
    while(UUIDS.length > 20){
      UUIDS.pop();
    }
    localStorage.setItem('UUIDS', JSON.stringify(UUIDS));
  }
}
document.getElementById("UUID") && reloadIfNeed(document.getElementById("UUID").value);