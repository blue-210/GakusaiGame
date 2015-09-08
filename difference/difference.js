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
	resultTime = 0, // ゲームの結果タイムを保存するもの
	point = undefined;


//スタートボタンが押されたらゲーム開始
function gameStart(){
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

	$('#level').text('レベル'+(level+1) );

	//dummyで埋められた配列をつくる
	var chars = [];
	for(var i=0; i<dim*dim; i++){
		chars.push(dummy);
	}


	//配列のうち一つをseikaiにする
	var offset = Math.floor(Math.random() * chars.length);
	chars.splice(offset, 1, seikai);
	$('#s'+ (offset+1) ).attr("class", "point");

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
					sendResult(resultTime);
					level = 0;
					dim = DIM_FIRST;
					return false;
				}

				gameStart();
			}else{
				sound();
			}
		});
	}
}

function sound(){
  $("#sound-file").get(0).play();
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

$(function(){
	$('#rule').modal('show');
});

function sendResult(time){
   $.ajax({
      url: 'http://localhost:1080/GakusaiGame/judge',
      type:'GET',
      dataType: 'json',
      data:{
         score: time,
         table: 'diffranking'
      }
   })
   .done(function(data) {
      console.log(data.currentRank);
      $('#rank>table>').remove();
      $('#rank>table').append('<th class="text-center">順位</th><th class="text-center">タイム</th></tr>');

      // 直近のスコアを強調する処理
      if(data.currentRank == 1){
        // 直近のスコアが1位だった場合
        $('#rank>table').append("<tr class=\"blinking text-center\"><td>1位</td><td>"+data.rank1+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>2位</td><td>"+data.rank2+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>3位</td><td>"+data.rank3+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>4位</td><td>"+data.rank4+"</td></tr>");
      }else if(data.currentRank == 2){
        // 直近のスコアが2位だった場合
        $('#rank>table').append("<tr class=\"text-center\"><td>1位</td>"+data.rank1+"</td></tr>");
        $('#rank>table').append("<tr class=\"blinking text-center\"><td>2位</td><td>"+data.rank2+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>3位</td><td>"+data.rank3+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>4位</td><td>"+data.rank4+"</td></tr>");
      }else if(data.currentRank == 3){
        // 直近のスコアが2位だった場合
        $('#rank>table').append("<tr class=\"text-center\"><td>1位</td><td>"+data.rank1+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>2位</td><td>"+data.rank2+"</td></tr>");
        $('#rank>table').append("<tr class=\"blinking text-center\"><td>3位</td><td>"+data.rank3+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>4位</td><td>"+data.rank4+"</td></tr>");
      }else{
        $('#rank>table').append("<tr class=\"text-center\"><td>1位</td><td>"+data.rank1+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>2位</td><td>"+data.rank2+"</td></tr>");
        $('#rank>table').append("<tr class=\"text-center\"><td>3位</td><td>"+data.rank3+"</td></tr>");
        $('#rank>table').append("<tr class=\"blinking text-center\"><td>4位</td><td>"+data.rank4+"</td></tr>");
      }

      $('.modal-footer > button:first').on('click',function(){
         clearTimeout(watchTimerID);
        $('#timer').text('0.00');
        $('#startbtn').show();
        $('#timer').show();
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