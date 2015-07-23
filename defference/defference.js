var level = 0;
var games = [
	['大 ', '太 '],
	['白 ', '臼 '],
	['問 ', '門 '],
];

var MAX_LEVEL = games.length-1,
	DIM_FIRST = 5,
	DIM_DELTA = 3,
	dim = DIM_FIRST,
	startTime = undefined, // スタートを押したときの時間を保存するもの
	watchTimerID = undefined, // ゲームのタイマー
	resultTime = 0; // ゲームの結果タイムを保存するもの

//スタートボタンが押されたらゲーム開始
function gameStart(){
	$('#startbtn').hide();//スタートボタンを隠す

	var dummy = games[level][0];//ダミーの文字
	var seikai = games[level][1];//正解の文字
	
	//最初のレベルのとき
	if(level == 0){
		clearTimeout(watchTimerID);
		startTimer();
	}

	//dim * dimのspan要素を作って#cellsに突っ込む
	var cells ='';
	for(var i=1; i<=dim*dim; i++){
		cells += '<span id="s' + i + '"></span>';
		if(i % dim == 0){
			cells += '<br />';
		}
	}
	$('#cells').html(cells);

	$('#level').text('レベル'+(level+1) );

	//dummyで埋められた配列をつくる
	var chars = [];
	for(var i=0; i<dim*dim; i++){
		chars.push(dummy);
	}


	//配列のうち一つをseikaiにする
	var offset = Math.floor(Math.random() * chars.length);
	chars.splice(offset, 1, seikai);


	//span要素にそれらの配列の値をはめこむ
	for(var i=1; i<=chars.length; i++){
		$('#s'+i).text(chars[i-1]);
		$('#s'+i).click(function(){
			if($(this).text() == seikai){
				level++;
				dim += DIM_DELTA;
				if(level > MAX_LEVEL){
					clearTimeout(watchTimerID);
					$('#level').hide();
					$('#cells').hide();
					$('#timer').hide();
					$('#score').text('あなたの結果は '+resultTime+'秒です!!');
					level = 0;
					dim = DIM_FIRST;
					return false;
				}

				gameStart();
			}
			else alert("ちがうよ？");
		});
	}
}

function startTimer() {
	startTime = new Date().getTime();
	runTimer();
}

function runTimer() {
	resultTime = (((new Date()).getTime() - startTime) / 1000).toFixed(2);
	console.log(resultTime);
	$('#timer').text(resultTime);
	watchTimerID = setTimeout(runTimer, 10);
}

$(function(){
	$('#rule').modal('show');
});
