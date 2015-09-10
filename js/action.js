	/* page */
	var text = new Array();var story = new Array();;var flag = 0;var done = 'no';var arrA= [];
	var index = 0;
	var tips = [['哎呦，不来赛~','哎呦，不来赛~','哎呦，不来赛~','哎呦，不来赛~','亲，浆糊淘得不错嘛~'],['哎呦，亲马马虎虎嘛~','哎呦，亲马马虎虎嘛','哎呦，亲马马虎虎嘛','哎呦，亲马马虎虎嘛','哎呦，不错哦~亲'],['亲，想当老法师还要继续努力哦~','亲，想当老法师还要继续努力哦~','亲，想当老法师还要继续努力哦~','亲，想当老法师还要继续努力哦~','老法师，侬绝对来赛哦~']];
	var open = false;
	var Layout = {
		numLi:0,
		btnNum:0,
		good:0,
		share:0,
		Dialog: {
			open: function(){
				$(".storyshdow").show();
				$(".storydialog").addClass("bounceIn animated dialog_index");
				setTimeout(function(){
					$(".storydialog").removeClass("bounceIn animated").addClass("opacity");
				}, 800);
			},
			close: function(){
				$(".storydialog").addClass("bounceOut animated");
				setTimeout(function(){
					$(".storyshdow").hide();
					$(".storydialog").removeClass("opacity bounceOut animated dialog_index");
				}, 800)
			},
			init: function(){
				var _this = this;
			}
		},
		page: function (i, _h){
			var _this = this;
			arrA= [];
			$(".layout .inner").removeClass("animate");
			$("#layout_" + (i + 1)).find(".inner").addClass("animate");
			$(".layout").eq(i).show().siblings().hide();
			$(".layout").eq(i).addClass("on").siblings().removeClass("on");
			flag = i+1;done = 'no';
		},
		swipe: function(_h, _len){
			var _this = this;
		},
		swiPage:function(){
			var _this = this;
		},
		cAnvas:function() {
			var _this =  this;
			$(".door").show();
			$(".test_cover").addClass("test_cover_anmate_close");
			setTimeout(function(){
				$(".test_cover").removeClass("test_cover_anmate_close");
				$(".door").hide();
			},2000);
		},
		swBtn:function(){
			var _this = this,
			_h = $(window).height();
			/*选择模式*/
			$('.begin li').on('tap',function(){
				myAudio.play();
				index = $(this).index();
				$(this).addClass('cur');
				$(this).siblings().removeClass('cur');
			});
			/*点击开始*/
			$(".swiBUT").on('tap',function(){
				myAudio.play();
				/*layout的id = layout_1*/
				_this.btnNum= 1 ;
				/*沪景故事*/
			$.post('ans.php', {level:index}, function(response){
				var data = JSON.parse(response);
				if(data.story){
					var story={
					title:data.story['question'],
					titlepic :data.story['face'],
					des : data.story['desc']
					}
				}else{
					var story={
					title:"城隍庙",
					titlepic :"http://act.shanghaicity.openservice.kankanews.com/guess/images/p/1.png",
					des : "城隍庙汇聚了具有浓郁海派文化特色的古玩商品市场和餐厅、茶楼，主要有华宝楼古玩市场、藏宝楼古玩工艺品市场等，还集中了南翔小笼、三丝眉毛酥、桂花拉糕、鸽蛋圆子、八宝饭等上海著名小吃。城隍庙以丰富的商品、独特的经营、周到的服务，吸引众多的海内外游客。"
					}
				}
				
				if(data.list){
					
					var list = new Array();
					var len = data.list.length;
					for(var i=0;i<len;i++){
						var x = {
								image: data.list[i]['image'],
								title:data.list[i]['title'],
								num:data.list[i]['num'],
								item:data.list[i]['item'],
							}
						list.push(x);	
					}
						
				}
				

				/*成绩结果*/
				text = tips[index];

				/*
					选择疯狂模式且累计人数少于20人 crazy_judge开启
				*/
				var crazy_judge = false;//PHP代码
				
				$.get("sendok.php", function(result){
					console.log(result);
  					if(result=='1'){
						crazy_judge = true;
						open = crazy_judge;
					}else{
						open = crazy_judge;
					}
				});

				$('#num2').html(tips[index][0]);
				var hs= '';
				$('.story .title p').html(story['title']);
				$('.story .smalltext p').html(story['des']);
				$('.story .storyP').html('<img src="'+story['titlepic']+'" width="100%">');
				for(var i = 0;i<list.length;i++){
					var num = list[i]['num'];
					var src = list[i]['image'];
					var answer = list[i]['title'];
					var item = list[i]['item'];
					var choose = item.split('|');
					var liH = '';var chooseH = '';var className = '';var inputClass= '';
					for(var j=0;j<num;j++){
						liH +='<li></li>';
					}
					for(var h = 0;h<choose.length;h++){
						if(h == 5 || h == 11||h == 17){
							className = 'class=r';
						}else{
							className = '';
						}
						chooseH+='<li '+className+'>'+choose[h]+'</li>';
					}
					if(num ==6){
						inputClass = 'six';
					}
					if(num ==7){
						inputClass = 'seven';
					}
					if(num ==8){
						inputClass = 'eight';
					}
					hs += '<div class="layout insert" id="layout_'+(i+2)+'" data="'+num+'"><div class="layer_bg"><div class="inner"><div class="GmtBox"><img src="'+src+'" width="100%" alt="" /></div><div class="input '+inputClass+'" answer="'+answer+'"><ul  class="clearfix"><div class="clearfix divW">'+liH+'</div></ul></div><div class="inputBnt"><ul>'+chooseH+'</ul></div></div></div></div>';
					if(i == list.length-1){
						$('.insert').remove();
						$('.first').after(hs);
						_this.init();
						_this.page(_this.btnNum, _h);
						_this.getItem(_this.btnNum+1);
						/*选择crazy模式*/
						if(index == 2){
							ginAudio.play();
							$('.imgs img').show();
							$('.crazyM').css('display','block');
							setTimeout(function(){
								$('.crazyM').css('display','none');
								$('.imgs img').hide();
								ginAudio.currentTime = 0;
								ginAudio.pause();
							},3000);
						}
					}
				}
			});
			});
		},
		getItem:function(id) {
			var _this = this,arr ='';
			var num = $(".layout").eq(id-1).attr('data');
			/*点击16个选项*/
			$(document).on('tap',$('#layout_'+id).find('.inputBnt li'),function(){
				console.log(flag,id);
				myAudio.play();
				if(flag != id || done !='no') return
				_this.numLi++;
				if(_this.numLi<num+1){
					var _htm =  $(this).html();
					$(this).addClass('liHover');
					var storeIndex = $(this).index();
					arrA.push(_htm);
					$('#layout_'+id).find('.input').find('li').eq((_this.numLi-1)).html(_htm).attr('sindex',storeIndex);
				}
				if(_this.numLi == num) {
					var ans = $('#layout_'+id).find('.input').attr("answer");
					var obj = $('#layout_'+id).find('.input');
					var obj2 = $('#layout_'+id);
					$('#layout_'+id).find('.input li').each(function(){
						var _htm =  $(this).html();
						arr +=_htm;
					});
					flag = id;done ='done'
					_this.answerNum(arr,ans,obj,arrA,obj2,num,id); //判断 成语正确错误 以不同颜色区分函数
				}
			});
			/*点击答案修改*/
			$(document).on('tap',$('#layout_'+id).find('.input li'),function(){
				if(flag != id || done!='no') return
				if($(this).html() =='') return
				myAudio.play();
				var _htm = $(this).html();
				var _index = $(this).index();
				var sindex = $(this).attr('sindex');
				if($('#layout_'+id).find('.input li').eq(_index+1).html() != '') return
				_this.numLi--;
				$('#layout_'+id).find('.inputBnt li').eq(sindex).removeClass('liHover');
				$(this).removeClass('liHover');
				$(this).html('');
				arrA.splice(_index,1);
			});
		},
		answerNum:function(arr,ans,obj,arrA,obj2,num,index){
			//console.log(id,ans);
			var _this =this;
			obj.removeClass("inputLi").removeClass("inputLiW")
			if(arr == ans) {
				setTimeout(function(){
					console.log('dui');
					winAudio.play();
				},500);
				setTimeout(function(){
					_this.tipPage(obj2,index);
				},800);
				_this.good+=1;
				_this.goodF(_this.good);
			}else{
				setTimeout(function(){
					lostAudio.play();
				},500);
				obj.addClass("inputLiW");
				_this.tipText(ans,obj,obj2,num,index);//错误之后的正确提示
			}
		},
		goodF:function(num){
			var _this = this;
			$('#num1').html(num*2*10);$('#num2').html(text[num]);
			info.des = "上海发布-"+num*2*10+ "分get√上海地名知多少？资深粉速来挑战！";
			wxshare(info);
		},
		tipText:function(str,obj,obj2,num,index){
			var _this =this;
			setTimeout(function(){
				_this.tipPage(obj2,index);
				$('#layout_'+index).find('.input li').addClass('wrong');
			},1000);
		},
		tipPage:function(obj2,id){
			$('#layout_'+id).find('.input li').addClass('correct');
			var _this =this;
			var _h = $(window).height();
			_this.numLi=0;
			_this.btnNum++;
			console.log(_this.good,open,index);
			if(id == 6){

				$.post('rank.php', { number:_this.good, level:index}, function(response){
			
					//var data = JSON.parse(response);
					//alert('结束啦！答对:'+_this.good+'难度：'+index);
					$('.sTip em').html(response);
				});
			}
			if(_this.good == 5 && open && index == 2 ){
				$('.always').css('display','none');
				$('.carzy_item').css('display','block');
			}
			setTimeout(function(){
				_this.closeF();
				_this.page(id, _h);
				console.log(id);
				_this.getItem(id+1);
			}, 1000);
			$('#layout_'+id).find('.animateBox').unbind("tap");
		},
		closeF:function(){
			console.log('close');
			$(".input").removeClass('inputLiW').removeClass('inputLi');
		},
		reflow:function(){
			var _this = this;
			_this.btnNum = 0, _h = $(window).height();_this.good = 0;
			$('.always').css('display','block');
			$('.carzy_item').css('display','none');
		},
		init: function(){
			var _this = this,
				_w = $(window).width(),
				_h = $(window).height(),
				_len = $(".layout").length;
			$(".swipe_tip").addClass("fadeOutUp");
			$(".global").width( _w );
			$(".screen").width( _w );
			$(".layout").width( _w ).height( _h );
			_this.page(0, _h);//页面显示
			_this.swipe(_h, _len);//没用
			_this.Dialog.init();
		}
	}
	setTimeout(function(){
		$(".loadPage").hide();
		$("#layout_1").find(".inner").addClass("ani");
		Layout.swBtn();
	}, 800);
	
	/*电话号码检查*/
	function check_mobile(mobile){
		if(mobile.length != 11 || isNaN(mobile)){
			return false;
		}
		mobile = mobile.substr(0,3);
		//号段
		var hd = new Array('130','131','132','133','134','135','147','136','137','138','139','150','151','152','153','154','155','156','157','158','159','180','181','182','183','184','185','186','187','188','189','170');
		var i = hd.length;
		while (i--) {
			if (hd[i] == mobile) {
				return true;
			}
		}
		return false;
	}
	document.onreadystatechange = function subSomething(){ 
		if(document.readyState == "complete"){ //当页面加载状态
			$('.maskpage').css('display','none');
			var _this = this,
				_w = $(window).width(),
				_h = $(window).height();
			$('.first').width( _w ).height( _h ).addClass("on");

			/*重玩*/
			$('#replay').on('tap',function(){
				$('.layout ').css('display','none');
				$('.first ').css('display','block');
				Layout.reflow();
			});
			/*分享*/
			$('#share').on('tap',function(){
				$('.mask').css('display','block');
			});
			/*提交*/
			$('.submit').on('click',function(){
				var name  = $("#name").val();
				var phone  = $("#phone").val();
				var infoImg;
				if(name  == "" || !check_mobile(phone)){
					$('.ui-dialog-bd div').html('提交信息有误');
					$('.ui-dialog').addClass('show');
					$('.ui-dialog-ft').on('tap',function(){
						$('.ui-dialog').removeClass('show');
					});
					return
				}else{
					
					
					$.post('sendok.php', { name:name, phone:phone}, function(response){
						console.log(response);
						if(response=='1'){
							$('.ui-dialog-bd div').html('提交成功');
							$('.ui-dialog').addClass('show');
							$('.ui-dialog-ft').on('tap',function(){
								$('.ui-dialog').removeClass('show');
								$('.layout ').css('display','none');
								$('.first ').css('display','block');
								$("#name").val('');
								$("#phone").val('');
								Layout.reflow();
							});	
						}
					});
					
/*					var realurl = 'submit.json?'+info+'';
					$.ajax({
						type : "GET",
						url  : realurl , //跨域请求的URL
						dataType : "jsonp",
						jsonp: "jsoncallback",
						jsonpCallback: "success_jsonpCallback",
						success : function(data){

						},
						error: function(XMLHttpRequest, textStatus, errorThrown){

						}
					});*/
				}
			});
		}
	}