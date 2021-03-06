$(function(){
	$('#rule').modal('show');
	// 画像をリサイズ
	$('img').imgLiquid();
	// レベル表示を隠す
	$('#level').hide();
});


var level = 0;
var games = [
	['大 ', '太 '],
	['白 ', '臼 '],
	['問 ', '間 '],
	['微 ', '徴 '],
	['ロ ', '口 '],

];

MAX_LEVEL = games.length-1,
	DIM_FIRST = 5,
	DIM_DELTA = 3,
	dim = DIM_FIRST,
	startTime = undefined, // スタートを押したときの時間を保存するもの
	watchTimerID = undefined, // ゲームのタイマー
	resultTime = 0, // ゲームの結果タイムを保存するもの
	point = undefined;

//画像動かし用-------------------------------------------------
var x = 0, y = 0, divx = 1, divy = 1, velx = 4, vely = 4;
var moveImgTimerId;
//-----------------------------------------------------------

//スタートボタンが押されたらゲーム開始
function gameStart(){

	moveImg();

   MAX_LEVEL = games.length-1
	$('#startbtn').hide();//スタートボタンを隠す
   $('#cells').show();

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

	// レベルを表示させる
	$('#level').show();
	$('#level').text('レベル'+(level+1) );

	//dummyで埋められた配列をつくる
	var chars = [];
	for(var i=0; i<dim*dim; i++){
		chars.push(dummy);
	}


	//配列のうち一つをseikaiにする
	var offset = Math.floor(Math.random() * chars.length);
	chars.splice(offset, 1, seikai);
	//$('#s'+ (offset+1) ).attr("class", "point");

	//span要素にそれらの配列の値をはめこむ
	for(var i=1; i<=chars.length; i++){
		$('#s'+i).text(chars[i-1]);

		//マウスダウンで色が変わる
		$('#s'+i).mousedown(function(){
			if($(this).text() == seikai){
				$(this).attr("class","text-primary");
			}else{　
				$(this).attr("class","text-danger");
			}
		});

		$('#s'+i).click(function(){
			if($(this).text() == seikai){
				soundCorrect();
				level++;
				dim += DIM_DELTA;
				if(level > MAX_LEVEL){
					clearTimeout(watchTimerID);
					clearTimeout(moveImgTimerId);
					$('#level').hide();
					$('#cells').hide();
					$('#timer').hide();
					$('#btnOtherGame').hide();
					$('#btnReplay').hide();
					sendResult(resultTime);
					level = 0;
					dim = DIM_FIRST;
					return false;
				}

				gameStart();
			}else{
				soundIncorrect();
			}
		});
	}
}

function soundIncorrect(){
      document.getElementById("incorrect").currentTime = 0;
      $("#incorrect").get(0).play();
   }

function soundCorrect(){
	document.getElementById("correct").currentTime = 0;
	$("#correct").get(0).play();
}

function startTimer() {
	startTime = new Date().getTime();
	runTimer();
}

function runTimer() {
	resultTime = (((new Date()).getTime() - startTime) / 1000).toFixed(2);
	$('#timer').text(resultTime);
	watchTimerID = setTimeout(runTimer, 10);
}


function moveImg(){
	$('#imgIsaka').css({left: x + 'px', top: y + 'px'});

	x = x + velx * divx;

	if((x + $('#imgIsaka').width() > 1900) || (x < 0)){
		divx = - divx;
		x = x + velx * divx;
	}

	y = y + vely * divy;

	if((y + $('#imgIsaka').height() > 930) || (y < 0)){
		divy = - divy;
		y = y + vely * divy;
	}

	moveImgTimerId = setTimeout(moveImg, 10	);
}


function sendResult(time){
   $.ajax({
      url: 'http://172.19.253.32:8080/game2015/judge',
      type:'GET',
      dataType: 'json',
      data:{
         score: time,
         table: 'diffranking'
      }
   })
   .done(function(data) {
		$('#rank>table>').remove();
		console.log(data[10].currentRank);
		console.log(data[11].currentScore);
	  $('#ranking2').append('<th class="text-center">順位</th><th class="text-center">タイム</th>');

	  // ランク用変数
	  var rank = 1;
	  for(var i = 0; i <= 9; i++){
		  if(data[10].currentRank == -1){
			  // ランク外ならば、直近のランクを「ランク外」に設定
			  data[10].currentRank = 'ランク外';
			  $('#ranking2').append("<tr class=\"text-center\"><td>"+rank+"位</td><td>"+parseFloat(data[i].score).toFixed(2)+"</td></tr>");
		  }else if((data[10].currentRank+1) == rank){
			  console.log("ランクインしてるよー")
			  // ランクインしている場合
			  $('#ranking2').append("<tr class=\"blinking text-center\"><td>"+(data[10].currentRank+1)+"位</td><td>"+parseFloat(data[11].currentScore).toFixed(2)+"</td></tr>");
		  }else{
			  // 10位までを表示させる処理
			  console.log("その他ー")
			  $('#ranking2').append("<tr class=\"text-center\"><td>"+rank+"位</td><td>"+parseFloat(data[i].score).toFixed(2)+"</td></tr>");
		  }
		  rank++;
		  console.log("らんくいんざるーぷ　"+rank);
	  }
	  // 最後に直近のランクとスコアを表示させる
	  $('#current').append('<th class="text-center">あなたの順位</th><th class="text-center">あなたのタイム</th>');
	  $('#current').append("<tr class=\"text-center\"><td>"+(data[10].currentRank+1)+"</td><td>"+parseFloat(data[11].currentScore).toFixed(2)+"</td></tr>");

      	$('.modal-footer > button:first').on('click',function(){
         window.location.reload();
      });

      $('.modal-footer > button:last').on('click',function(){
          window.location.href = '../index.html';
      });

      $('#ranking').modal({backdrop: false});
   })
   .fail(function(data) {
      console.log(data.currentScore);
      alert("ng");
   });
};
