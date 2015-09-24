
$(function(){
   var SIZE = 3, // 出現する数字の数を指定する
      BTN_NUMBER = SIZE*SIZE;
      $board = $("#board"), // ランダムな数字を入れるところ
      $timeCount = $("#timer"), // タイマーを表示するところ
      currentNum = 1, // 今押さなければいけない数字を保存するもの
      startTime = undefined, // スタートを押したときの時間を保存するもの
      watchTimerID = undefined, // ゲームのタイマー
      resultTime = 0; // ゲームの結果タイムを保存するもの

  //画像動かし用-------------------------------------------------
  var x = 0, y = 0, divx = 1, divy = 1, velx = 4, vely = 4;
  var moveImgTimerId;
  //-----------------------------------------------------------

    $('#rule').modal('show');
    $('img').imgLiquid();

    $("#start").on("click", function() {
        moveImg();
       $('#board').hide();
        $timeCount.text("0.00");
        $board.html("");
        currentNum = 1;
        clearTimeout(watchTimerID);
        initBoard();
        startTimer();
        $('#board').show();
    });

    $board.on("click", "#num", checkNum);

    function initBoard() {
      var buttons = [];
      var button;

      //ボタンを生成
      for (var i = 0; i < BTN_NUMBER; i++) {
          buttons.push('<button id="num" class="btn btn-default">'+(i+1)+'</button>');
      }

      while(buttons.length){
         // ボタンにランダムな数字を配置
         button = buttons.splice(Math.floor(Math.random() * buttons.length),1);
         // ボタンの配置
         $board.append(button[0]);
         if(buttons.length % SIZE == 0){
            $board.append('</br>');
         }
      }
    }

    function startTimer() {
       startTime = new Date().getTime();
       runTimer();
    }

    function runTimer() {
       resultTime = (((new Date()).getTime() - startTime) / 1000).toFixed(2);
       $timeCount.text(resultTime);
       watchTimerID = setTimeout(runTimer, 10);
    }

    function checkNum() {
       var num = $(this).text();

       if (num == currentNum) {
          soundCorrect();
           $(this).prop('disabled', true);
           $(this).html('<div class="img"><img src="../images/9014.jpg"/></div>');
           $(this).imgLiquid();

           if (currentNum == BTN_NUMBER) {
               clearTimeout(watchTimerID);
               clearTimeout(moveImgTimerId);
               $('#start').hide();
               $('#board').hide();
               $('#timer').hide();
               sendResult(resultTime);
           }
           currentNum++;
      }else{
         soundIncorrect();
      }
    }

    function soundIncorrect(){
      //音声ファイルを巻き戻す(再生位置[秒]を0に設定する)
      document.getElementById("incorrect").currentTime = 0;
      $("#incorrect").get(0).play();
   }

   function soundCorrect(){
      //音声ファイルを巻き戻す(再生位置[秒]を0に設定する)
      document.getElementById("correct").currentTime = 0;
     $("#correct").get(0).play();
  }

  function moveImg(){
    $('#imgKure').css({left: x + 'px', top: y + 'px'});

    x = x + velx * divx;

    if((x + $('#imgKure').width() > 1930) || (x < 0)){
      divx = - divx;
      x = x + velx * divx;
    }

    y = y + vely * divy;

    if((y + $('#imgKure').height() > 930) || (y < 0)){
      divy = - divy;
      y = y + vely * divy;
  }

  moveImgTimerId = setTimeout(moveImg, 10);
}

    function sendResult(time){
       $.ajax({
          url: 'http://localhost:1080/GakusaiGame/judge',
          type:'GET',
          dataType: 'json',
          data:{
             score: time,
             table: 'touchranking'
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
    			}else if(data[10].currentRank == rank){
    				console.log("ランクインしてるよー")
    				// ランクインしている場合
    				$('#ranking2').append("<tr class=\"blinking text-center\"><td>"+data[10].currentRank+"位</td><td>"+parseFloat(data[11].currentScore).toFixed(2)+"</td></tr>");
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
    		$('#current').append("<tr class=\"text-center\"><td>"+data[10].currentRank+"</td><td>"+parseFloat(data[11].currentScore).toFixed(2)+"</td></tr>");

          $('.modal-footer > button:first').on('click',function(){
             $timeCount.text("0.00");
             $('#start').show();
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
});
