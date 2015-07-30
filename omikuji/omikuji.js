var omikuji = ["大吉","中吉","小吉","末吉","凶","大凶"];

//神主の画像
var img = [ "../images/kannushi_daikichi.jpg",
				"../images/kannushi_chukichi.jpg",
				"../images/kannushi_shokichi.jpg",
				"../images/kannushi_suekichi.jpg",
				"../images/kannushi_kyou.jpg",
				"../images/kannushi_daikyou.jpg",
				"../images/kannushi.jpg"
			  ];

//願い事
var hope = [
	["すごく叶う", "とても叶う"], //良い結果
	["叶う", "叶うよ", "叶います"], //普通の結果
	["叶わない"] //悪い結果
]; 

//恋愛
var love = [
	["成就", "ラブラブ"], //良い結果
	["出会いがある", "焦らず", "進展？"], //普通の結果
	["フラれる"] //悪い結果
]; 

//勉学
var study = [
	["捗る", "順位上がるよ"], //良い結果
	["努力次第","君ならできるさ", "がんばれる"], //普通の結果
	["バカ"] //悪い結果
]; 

var hopeScore,
	loveScore,
	studyScore,
	sumScore,
	hopeResult,
	loveResult,
	studyResult;

$(document).ready( function(){
	$('body').css('background-image', 'none'); 
});

function getOmikuji(){
	
	
	$('body').css('background-image', 'url(../images/omikujiResult.jpg)');
	
	//各運勢の良し悪しを決める
	hopeScore = getScore();//Math.floor(Math.random() * hope.length);
	loveScore = getScore();//Math.floor(Math.random() * love.length);
	studyScore = getScore();//Math.floor(Math.random() * study.length);
	
	//結果の良し悪しから回答文を決める
	hopeResult = Math.floor(Math.random() * hope[hopeScore].length);
	loveResult = Math.floor(Math.random() * love[loveScore].length);
	studyResult = Math.floor(Math.random() * study[studyScore].length);
	
	sumScore = (hopeScore + loveScore + studyScore);
	
	//吉凶と各運勢の結果表示
	switch(sumScore){
		case 0:
			$('#omikujiResult').text(omikuji[0]);
			console.log(omikuji[0]);
			showResult();
			$('#imgKannushi').attr('src',img[0]);
			break;
		case 1:
			$('#omikujiResult').text(omikuji[1]);
			console.log(omikuji[1]);
			showResult();
			$('#imgKannushi').attr('src',img[1]);
			break;
		case 2:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			showResult();
			$('#imgKannushi').attr('src',img[2]);
			break;
		case 3:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			showResult();
			$('#imgKannushi').attr('src',img[2]);
			break;
		case 4:
			$('#omikujiResult').text(omikuji[3]);
			console.log(omikuji[3]);
			showResult();
			$('#imgKannushi').attr('src',img[3]);
			break;
		case 5:
			$('#omikujiResult').text(omikuji[4]);
			console.log(omikuji[4]);
			showResult();
			$('#imgKannushi').attr('src',img[4]);
			break;
		case 6:
			$('#omikujiResult').text(omikuji[5]);
			console.log(omikuji[5]);
			showResult();
			$('#imgKannushi').attr('src',img[5]);
			break;
	}
}

//各運勢の結果の良し悪しを返す
function getScore(){
	var score;
	//乱数から 0,1は0（良）、 2,3,4は1（普通） 5は2（悪い）を返す
	var num = Math.floor(Math.random() * 10);
	if(num <=  4) 
		score = 0;
	else if(num <= 7)
		score = 1;
	else if(num <= 9)
		score = 2;
	
	return score;
}

//各運勢の結果表示
function showResult(){
	$('#hopeResult').text("願い事："+hope[hopeScore][hopeResult]);
	$('#loveResult').text("恋愛："+love[loveScore][loveResult]);
	$('#studyResult').text("勉学："+study[studyScore][studyResult]);
}


$(function(){
	$('#imgOmikuji').hover(function(){
		$('#imgOmikuji').addClass('imgAnime');

		
	});
});

function start(){
	$('#imgOmikuji').attr('src' ,'../images/omikuji_after.jpg');
	$('#imgOmkuji').attr('onclick','');
	//$('#imgOmikuji').html('<image src="../images/omikuji_after.jpg">');
	getOmikuji();
}


var i = 0;
function changeKannushi(){
	
	
	$('#imgKannushi').attr('src',img[i]);
	if(i < 6) i++;
	else i=0;
}
