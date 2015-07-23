var omikuji = ["大吉","中吉","小吉","末吉","凶","大凶"];

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

function getOmikuji(){
	
	//各運勢の重みを算出
	hopeScore = Math.floor(Math.random() * hope.length);
	loveScore = Math.floor(Math.random() * love.length);
	studyScore = Math.floor(Math.random() * study.length);
	
	//重みの中から回答文を算出
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
			break;
		case 1:
			$('#omikujiResult').text(omikuji[1]);
			console.log(omikuji[1]);
			showResult();
			break;
		case 2:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			showResult();
			break;
		case 3:
			$('#omikujiResult').text(omikuji[2]);
			console.log(omikuji[2]);
			showResult();
			break;
		case 4:
			$('#omikujiResult').text(omikuji[3]);
			console.log(omikuji[3]);
			showResult();
			break;
		case 5:
			$('#omikujiResult').text(omikuji[4]);
			console.log(omikuji[4]);
			showResult();
			break;
		case 6:
			$('#omikujiResult').text(omikuji[5]);
			console.log(omikuji[5]);
			showResult();
			break;
	}	
}

//各運勢の結果表示
function showResult(){
	$('#hopeResult').text("願い事："+hope[hopeScore][hopeResult]);
	$('#loveResult').text("恋愛："+love[loveScore][loveResult]);
	$('#studyResult').text("勉学："+study[studyScore][studyResult]);
}
