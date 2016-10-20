/*
 	步骤：
	准备工作：对要用到的材料处理好（音频，歌词，图片，标题，时间），对该初始化的初始化
 	1.window的初始化，audio的初始化
 	2.随着时间的变化，歌词会动，进度条会动
 	3.处理时间，处理歌词，处理进度条
 	4.点击进度条，进度条跳到点击的位置，歌词显示到进度条的位置
 	5.点击上一首，下一首，点击开始暂停
 * */

var lyric = [{"name":"红豆", "audio_src":"mp3/1.mp3", "audio_img":"img/author.jpg","contain":"[00:17.00] 还没好好的感受[00:21.00] 雪花绽放的气候[00:25.00] 我们一起颤抖[00:28.00] 会更明白 什么是温柔[00:34.00] 还没跟你牵著手[00:38.00] 走过荒芜的沙丘[00:42.00] 可能从此以後 学会珍惜[00:47.00] 天长和地久[00:51.00] 有时候 有时候[00:55.00] 我会相信一切有尽头[00:59.00] 相聚离开 都有时候[01:04.00] 没有什么会永垂不朽[01:08.00] 可是我 有时候[01:12.00] 宁愿选择留恋不放手[01:17.00] 等到风景都看透[01:21.00] 也许你会陪我 看细水长流[01:42.00] 还没为你把红豆[01:46.00] 熬成缠绵的伤口[01:51.00] 然後一起分享[01:54.00] 会更明白 相思的哀愁[01:59.00] 还没好好的感受[02:04.00] 醒著亲吻的温柔[02:08.00] 可能在我左右[02:11.00] 你才追求 孤独的自由[02:19.00] 有时候 有时候[02:23.00] 我会相信一切有尽头[02:27.00] 相聚离开 都有时候[02:32.00] 没有什么会永垂不朽[02:36.00] 可是我 有时候[02:40.00] 宁愿选择留恋不放手[02:45.00] 等到风景都看透[02:49.00] 也许你会陪我 看细水长流[03:08.00] 有时候 有时候[03:12.00] 我会相信一切有尽头[03:16.00] 相聚离开 都有时候[03:21.00] 没有什么会永垂不朽[03:25.00] 可是我 有时候[03:29.00] 宁愿选择留恋不放手[03:34.00] 等到风景都看透[03:38.00] 也许你会陪我 看细水长流"},
{"name":"笑忘书", "audio_src":"mp3/2.mp3", "audio_img":"img/author2.jpg","contain":"[00:00.00][00:01.00]笑忘书(国)[00:03.00]王菲[00:05.00][00:12.00]没 没有蜡烛 就不用勉强庆祝[00:17.00]没 没想到答案 就不用寻找题目[00:23.00]没 没有退路 问我也不要思路[00:29.00]没 没人去仰慕 那我就继续忙碌[00:34.00]lalala 思前想后[00:37.00]差一点忘记了怎么投诉[00:40.00]lalala 从此以后 不要犯同一个错误[00:46.00]将这样的感触 写一封情书送给我自己[00:51.00]感动得要哭 很久没哭[00:54.00]不失为天大的幸福 将这一份礼物[00:59.00]这一封情书 给自己祝福[01:02.00]可以不在乎 才能对别人在乎[01:20.00]有 一点帮助 就可以对谁倾诉[01:26.00]有 一个人保护 就不用自我保护[01:32.00]有 一点满足 就准备如何结束[01:37.00]有 一点点领悟 就可以往后回顾01:43.00]lalala 思前想后[01:46.00]差一点忘记了怎么投诉[01:49.00]lalala 从此以后 不要犯同一个错误[01:54.00]将这样的感触 写一封情书送给我自己[01:59.00]感动得要哭 很久没哭[02:03.00]不失为天大的幸福 将这一份礼物[02:08.00]这一封情书 给自己祝福[02:11.00]可以不在乎 才能对别人在乎[02:43.00]Lalalala....... Lalalala.......[02:55.00]从开始哭着忌妒 变成了笑着羡慕[03:00.00]时间是怎么样把握了我皮肤[03:03.00]只有我自己最清楚[03:06.00]将这样的感触 写一封情书送给我自己[03:11.00]感动得要哭 很久没哭[03:15.00]不失为天大的幸福 将这一份礼物[03:19.00]这一封情书 给自己祝福[03:22.00]可以不在乎 才能对别人在乎[03:28.00]让我亲手 将这样的感触[03:31.00]写一封情书送给我自己[03:34.00]感动得要哭 很久没哭[03:37.00]不失为天大的幸福[03:39.00]就好好将这一份礼物[03:42.00]这一封情书 给自己祝福[03:45.00]可以不在乎 才能对别人在乎"}];
function $(id){
	return document.getElementById(id);
}

function init(){
	audio = $("audio");
	//获取播放按钮
	var control_play = $("control_play");
	var play_icon = $("play_icon"); 
	var images = $("images");
	//进度条
	var progress_bar= $("progress_bar");
	var progress_bar_time = $("progress_bar_time");
	//获取上一首下一首按钮
	var control_pre = $("control_pre");
	var control_next = $("control_next");
	//获取图片
	var section_poster = $("section_poster");
	//获取图片标题
	var lyric_title = $("lyric_title");
	//获取歌词
	var section_lyric = $("section_lyric");
	//获取包裹歌词的大盒子
	var lyric_Bigbox = $("lyric_Bigbox");
	//获取开始时间
	var time_update = $('time_update').getElementsByClassName('time')[0];
	//获取结尾时间
	var time_end = $("time_end").getElementsByTagName("time")[0];
	//初始化下标
	index_audio = 0;
	
	audioInit();
	lyric_str();
	
	audio.addEventListener("timeupdate", audio_timeupdate, false);
	control_play.addEventListener("click", control_play_click, false);
	
	control_pre.addEventListener("click", control_pre_click, false);
	control_next.addEventListener("click", control_next_click, false);
	progress_bar.addEventListener("click", progress_bar_click, false);
}

//audio初始化，进度条从0开始，获取图片，获取audio，获取歌名
function audioInit(){
	//进度条又从0开始
	progress_bar_time.style.width = 0 + "px";
	//获取audio的路径
	audio.src = lyric[index_audio].audio_src;
	//获取图片路径
	section_poster.src= lyric[index_audio].audio_img;
	//获取歌名
	lyric_title.innerHTML = lyric[index_audio].name;
}

//解析歌词，根据时间变化给每个p一个id
function lyric_str(){
	//使用函数split做分割
	//获取所有的歌词
	var lyricStr = lyric[index_audio].contain;
	var str = "";
	var arr = lyricStr.split("[");
	for(var i = 0; i < arr.length; i++){
		//获取的是，00:23.00，没 没有退路 问我也不要思路,是数组
		var arr2 = arr[i].split("]");
		//因此歌词为下标为1的数组
		var text = arr2[1];
		//歌词对应的时间
		var time = arr2[0].split(".");
		//毫秒
		var time_ms = time[1];
		var time2 = time[0].split(":");
		//分
		var time2_min = time2[0];
		//秒
		var time2_sec = time2[1];
		//获取每一句的id
		var lyric_num = parseInt(time2_min * 60) + parseInt(time2_sec);
		if(text){
			str += '<p id = "lyric'+ lyric_num +'">' + text + "</p>"
		}
		section_lyric.innerHTML = str;
	}
}

//时间格式化
function format(time){
	//获得分钟
	var min = parseInt(time / 60) ;
	//获得秒
	var sec = time % 60;
	//格式判断
	return format_time(min) + ":" + format_time(sec);
}
//格式判断
function format_time(time){
	if(time < 10){
		return "0" + time;
	}else{
		return time;
	}
}

//进度条随时间变而变，歌曲时间变化，歌词变化
function audio_timeupdate(){
	//歌曲总时间
	var sumTime = audio.duration;
	//当前时间
	var current_Time = audio.currentTime;
	
	if(current_Time == sumTime){
		//如果播放完毕跳到下一首
		control_next_click();
	}
	
	var n = current_Time/sumTime;
	progress_bar_time.style.width = n * progress_bar.offsetWidth + 'px';
	
	//时间更新
	//开始的时间
	var time1 = parseInt(current_Time);
	time_update.innerHTML = format(time1);
	//结尾的时间
	var time2 = parseInt(sumTime) - parseInt(current_Time);
	
	if(!isNaN(time2)){
		time_end.innerHTML = format(time2);
	}else{
		time_end.innerHTML = "00:00"
	}
	//获取当前唱了哪句
	var obj_p = $("lyric" + time1);
	//歌词也会随时间变而变，所以这里还要处理歌词的样式
	lyric_style(obj_p);
}

//进度条 == 歌曲
function progress_bar_click(e){
	var e = e ? e : window.event;
	//点击的长度
	var x = e.pageX;
	//进度条的left值
	var progress_bar_time_leftX = progress_bar.offsetLeft;
	//进度条的长度
	var progress_bar_time_X = x - progress_bar_time_leftX;

	var n = progress_bar_time_X/progress_bar.offsetWidth;
	//总时间
	var audio_duration = audio.duration;
	//当前时间
	audio.currentTime = n * audio_duration;
	//当前时间为：
	var audio_current = audio.currentTime;
	var audio_time = parseInt(audio_current);
	
	//点击进度条的时候，歌词要跳到响应的位置上，所以这里也还处理歌词样式
	//获取到不为空的p的节点
	var num = elem_p(audio_time);
	//添加样式
	lyric_style(num);
}

//处理id为空的p标签
function elem_p(num){
	if(num > 0){
		var find_p = $("lyric" + num);
		if(!find_p){
			num = num-1;
			return elem_p(num);
		}else{
			return find_p;
		}
	}
	return '';
	
}

//改变歌词样式
function lyric_style(elem){
	//获取所有的p
	var lyric_p = document.getElementsByTagName("p");
	
	for(var i = 0; i < lyric_p.length; i++){
		lyric_p[i].index = i;
	}
	
	if(elem){
		for(var i = 0 ; i < elem.index; i++){
			lyric_p[i].className = "lyric";
		}
		for(var j = elem.index; j < lyric_p.length; j++){
			lyric_p[j].className = "";
		}
		//给当前歌词赋样式
		elem.className = "lyric2";
		//移动section_lyric的top值
		section_lyric.style.top = (lyric_Bigbox.offsetHeight / 2)- elem.offsetTop + 'px';
	}
	
	
}

//播放或停止
function control_play_click(){
	if(audio.paused){
		audio.play();
		play_icon.setAttribute("class", "fa fa-pause fa-2x");
		images.style.cssText = "animation-play-state:running";
	}else{
		audio.pause();
		play_icon.setAttribute("class", "fa fa-play fa-2x");
		images.style.cssText = "animation-play-state:paused";
	}
}

//上一首
function control_pre_click(){
	index_audio--;
	if(index_audio < 0){
		index_audio = lyric.length - 1;
	}
	lyric_str();
	audioInit();
	control_play_click();
}

//下一首
function control_next_click(){
	index_audio++;
	if(index_audio > lyric.length - 1){
		index_audio = 0;
	}
	lyric_str();
	audioInit();
	control_play_click();
}

window.addEventListener("load", init, false);
