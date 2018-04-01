<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
	<title>预报名</title>
	<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css">
	<link rel="stylesheet" href="https://cdn.bootcss.com/jquery-weui/1.2.0/css/jquery-weui.min.css">
	<style type="text/css">
		body,html{height:100%;-webkit-tap-highlight-color:transparent}
		body{font-family:-apple-system-font,Helvetica Neue,Helvetica,sans-serif}
		.container, .page {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		.container {
			overflow: hidden;
		}
		.page, body {
			background-color: #f8f8f8;
		}
		.globl_bg_color{
			background-color: #f8f8f8 !important;
		}
		.height100{
			height: 100%;
		}
		.weui-cell__bd span{
			vertical-align: middle;
		}
		.weui-cell__bd .weui-badge{
			margin-left: 0.3rem;
		}
		.mr-left1_2{
			margin-left: 1.2rem;
		}
		.sub_content{
			font-size: 15px;
			color: #777;
		}
		.cell_swipe_btn{
			line-height: 68px;
		}
		.cursor_pointer{
			cursor: pointer;
		}
	</style>
</head>
<body ontouchstart>
	<div class="page" id="container">
		<div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载</span>
        </div>
	</div>
	<script src="https://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery-weui/1.2.0/js/jquery-weui.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery-weui/1.2.0/js/swiper.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery-weui/1.2.0/js/city-picker.min.js"></script>
	<script src="https://cdn.bootcss.com/fastclick/1.0.6/fastclick.js"></script>
	<script src="../js/template.js"></script>

	<script id="tpl" type="text/html">
		<div class="weui-cells__title">近三天</div>
		<div class="weui-cells">
			<%if(res.recent3Day.length > 0){%>
				 <%:=cellTpl({"data":res.recent3Day})%>
			<%} else {%>
				<div class="weui-loadmore weui-loadmore_line">
            		<span class="weui-loadmore__tips">暂无数据</span>
        		</div>
			<%}%>
		</div>
		<div class="weui-cells__title">三天前</div>
		<div class="weui-cells">
			<%if(res.before.length > 0){%>
				 <%:=cellTpl({"data":res.before})%>
			<%} else {%>
				<div class="weui-loadmore weui-loadmore_line">
            		<span class="weui-loadmore__tips">暂无数据</span>
        		</div>
			<%}%>
		</div>
	</script>

	<script id="error" type="text/html">
		<div class="weui-loadmore weui-loadmore_line">
            <span class="weui-loadmore__tips globl_bg_color">数据加载失败</span>
        </div>
	</script>

	<script id="cellTpl" type="text/html">
	   	<%for (var i = 0; i < data.length; i++){%>
	   		<div class="weui-cell weui-cell_swiped" data-id="<%=data[i].id%>">
				<div class="weui-cell__bd">
					<div class="weui-cell item cursor_pointer">
						<div class="weui-cell__hd">
							<img src="<%=data[i].imgUrl%>" width="60px">
						</div>
						<div class="weui-cell__bd">
							<p>&nbsp;&nbsp;<%=data[i].name%></p>
							<p class="sub_content">&nbsp;&nbsp;<%=data[i].nickName%></p>
						</div>
						<div class="weui-cell__ft">
						<%if (data[i].status==0) {%>
							<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary">查看</a>
						<%} else {%>
							<p>已查看</p>
						<%}%>
						</div>
					</div>
				</div>
				<div class="weui-cell__ft">
					<a class="weui-swiped-btn weui-swiped-btn_warn cell_swipe_btn del_btn" href="javascript:">删除</a>
				</div>
			</div>
	   	<%}%>
	</script>


	<script type="text/javascript">
		$(function(){
			//FastClick.attach(document.body);
			$.getJSON("../json/ybm.json").done(function(res){
			 	var tpl = template(document.getElementById('tpl').innerHTML);
    			var cellTpl = template(document.getElementById('cellTpl').innerHTML);
    			$("#container").html(tpl({"cellTpl":cellTpl, "res":res}))
    			$('.weui-cell_swiped').swipeout();
			}).fail(function() {
				$("#container").html(template(document.getElementById('error').innerHTML, {}));
  			});

  			 $("body").on("click", ".item", function(){
  			 	location.href = "ybmMsg.html"
  			}).on("click", ".del_btn", function(){
  				$(this).parents("[data-id]").remove();
  			});
		});
	</script>
</body>
</html>