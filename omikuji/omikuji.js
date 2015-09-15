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
		"あなたの思い通りになるでしょう。",
		"さあ 願いを 言え、どんな願いもひとつだけかなえてえてやろう..."
	], 
	[	//普通の結果
		"辛抱強く願い続ければ叶うでしょう。",
		"二兎追うものは一兎も得ません。一つに絞りましょう。",
		"善意を尽くしていれば、いづれ自分にも返ってくるでしょう。"
	], 
	[	//悪い結果
		"しばらく叶うことはないようです。今は自分を磨きましょう。",
		"神にお願いする前に、やることがあるんじゃない？"
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
	],
	[	//悪い結果
		"恋愛だけが人生の全てではありません。",
		"君の家、鏡ある？",
		"高望みしすぎじゃない？",
		"失恋のたびにアドレス変えるの、学習したら？",
		"ゼクシィとは無縁の人生でしょう。",
		"いくら待っても画面からは出てきませんよ。"
	]
]; 

//勉学
var study = [
	[	//良い結果
		"今とても脳が活性化しています", 
		"その調子で努力すれば、目標達成はすぐそこです。",
		"いつやるか。。。今でしょ！",
		"STAP細胞の未来はあなたに託されました。"
	], 
	[	//普通の結果
		"努力した分だけ、結果がついてきます。",
		"無理せずコツコツ積み重ねていきましょう。",
		"予習復習を忘れずに。",
		"英語なんて言葉なんだ。こんなものやれば誰だってできるようになる。"
	], 
	[	//悪い結果
		"もう一度勉強の仕方を見直してみましょう",
		"基礎の基礎が怖いってことを今日、何度も言っときます。",
		"先生のこと、お母さんって言っちゃうでしょう。",
		"消しゴムの角使ったくらいで怒るなよ。"
	] 
];

var comment = [
	//大吉
		"大吉だ！。最高だな！<br>だからって調子に乗るなよ。",
	//中吉
		"中吉だね。<br>うん、いい方。全然いい方だよ。",
	//小吉
		"小吉だね。<br>コメントに困る結果だよ。。。",
	//末吉
		"末吉だね。<br>中の下。その程度の人間ってこと。",
	//凶
		"凶だね。<br>あ～あ",
	//大凶
		"大凶だね。ご愁傷様。<br>でも気を落とすなよ。<br>大凶ってことはこれ以上下がることはないってことだ。"
]

var hopeScore,
	loveScore,
	studyScore,
	sumScore,
	hopeResult,
	loveResult,
	studyResult;


$(document).ready( function(){
	$('#imgResult').hide();
});



function getOmikuji(){
	
	//$('body').css('background-image', 'url(../images/omikujiResult.jpg)');
	
	//各運勢の良し悪しを決める
	hopeScore = getScore();//Math.floor(Math.random() * hope.length);
	loveScore = getScore();//Math.floor(Math.random() * love.length);
	studyScore = getScore();//Math.floor(Math.random() * study.length);
	
	//各運勢の良し悪しから回答文を決める
	hopeResult = Math.floor(Math.random() * hope[hopeScore].length);
	loveResult = Math.floor(Math.random() * love[loveScore].length);
	studyResult = Math.floor(Math.random() * study[studyScore].length);
	
	//各運勢の良し悪しから吉凶を割り出す
	sumScore = (hopeScore + loveScore + studyScore);
	
	//吉凶と各運勢の結果表示
	switch(sumScore){
		case 0:
			$('#omikujiResult').text(omikuji[0]);//吉凶
			console.log(omikuji[0]);
			$('#kannushiComment').html(comment[0]);//神主のコメント
			showResult();//各運勢の結果文
			$('#imgKannushi').attr('src',img[0]);//神主の画像
			break;
		case 1:
			$('#omikujiResult').text(omikuji[1]);
			console.log(omikuji[1]);
			$('#kannushiComment').html(comment[1]);
			showResult();
			$('#imgKannushi').attr('src',img[1]);
			break;
		case 2:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			$('#kannushiComment').html(comment[2]);
			showResult();
			$('#imgKannushi').attr('src',img[2]);
			break;
		case 3:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			$('#kannushiComment').html(comment[2]);
			showResult();
			$('#imgKannushi').attr('src',img[2]);
			break;
		case 4:
			$('#omikujiResult').text(omikuji[3]);
			console.log(omikuji[3]);
			$('#kannushiComment').html(comment[3]);
			showResult();
			$('#imgKannushi').attr('src',img[3]);
			break;
		case 5:
			$('#omikujiResult').text(omikuji[4]);
			console.log(omikuji[4]);
			$('#kannushiComment').html(comment[4]);
			showResult();
			$('#imgKannushi').attr('src',img[4]);
			break;
		case 6:
			$('#omikujiResult').text(omikuji[5]);
			console.log(omikuji[5]);
			$('#kannushiComment').html(comment[5]);
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
	$('#imgResult').show();
	//$('#imgOmikuji').attr('onclick',''); //一回しかクリックできないようにonclick属性をカラに
	//$('#imgOmikuji').css('cursor', 'default'); //カーソルをポインタじゃなくす
	sound();
	getOmikuji();
}

function sound(){
	document.getElementById("sound").currentTime = 0;
	$("#sound").get(0).play();
}


//デバッグ用関数
var i = 0;
function changeKannushi(){
	$('#imgKannushi').attr('src',img[i]);
	if(i < 6) i++;
	else i=0;
}