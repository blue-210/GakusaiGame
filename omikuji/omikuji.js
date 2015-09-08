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
	[	//良い結果
		"期待以上の結果が得られるでしょう。", 
		"あなたの思い通りになるでしょう。"
	], 
	[	//普通の結果
		"辛抱強く願い続ければ叶うでしょう。",
		"二兎追うものは一兎も得ません。一つに絞りましょう。",
		"善意を尽くしていれば、いづれ自分にも返ってくるでしょう。"
	], 
	[	//悪い結果
		"しばらく叶うことはないようです。今は自分を磨きましょう。"
	] 
]; 

//恋愛
var love = [
	[	//良い結果
		"あいつの気持ち、もう気づいてるんだろ？",
		"あなたが今想っている人、それが運命の人です。"
	], 
	[	//普通の結果
		"恋愛には押しと引きが重要です。",
		"まだ行動の時期ではありません。時が来るのを待ちましょう。",
		"なにかしらの進展が見られるでしょう。",
		"実は真性のドSの人はMの人を求めないんだ。" 
	]
	[	//悪い結果
		"恋愛だけが人生の全てではありません。"
	]
]; 

//勉学
var study = [
	[	//良い結果
		"今とても脳が活性化しています", 
		"その調子で努力すれば、目標達成はすぐそこです。",
		"いつやるか。。。今でしょ！"
	], 
	[	//普通の結果
		"努力した分だけ、結果がついてきます。",
		"無理せずコツコツ積み重ねていきましょう。",
		"予習復習を忘れずに。",
		"英語なんて言葉なんだ。こんなものやれば誰だってできるようになる！"
	], 
	[	//悪い結果
		"もう一度勉強の仕方を見直してみましょう",
		"基礎の基礎が怖いってことを今日、何度も言っときます。"
	] 
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
	//乱数から 0~4は0（良）、 5~7は1（普通） 8,9は2（悪い）を返す
	var num = Math.floor(Math.random() * 9);
	if(num <=  2) 
		score = 0;
	else if(num <= 5)
		score = 1;
	else if(num <= 8)
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
	//$('#imgKure').attr('src' ,'../images/kurewalk.gif');
	//$('#imgOmikuji').attr('onclick',''); //一回しかクリックできないようにonclick属性をカラに
	getOmikuji();
}



//デバッグ用関数
var i = 0;
function changeKannushi(){
	$('#imgKannushi').attr('src',img[i]);
	if(i < 6) i++;
	else i=0;
}
