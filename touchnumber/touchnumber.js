$(function(){
   var SIZE = 2, // 出現する数字の数を指定する
      BTN_NUMBER = SIZE*SIZE;
      $board = $("#board"), // ランダムな数字を入れるところ
      $timeCount = $("#timer"), // タイマーを表示するところ
      currentNum = 1, // 今押さなければいけない数字を保存するもの
      startTime = undefined, // スタートを押したときの時間を保存するもの
      watchTimerID = undefined, // ゲームのタイマー
      resultTime = 0; // ゲームの結果タイムを保存するもの

    $("#start").on("click", function() {
        $timeCount.text("0.00");
        $board.html("");
        currentNum = 1;
        clearTimeout(watchTimerID);
        initBoard();
        startTimer();
    });

    $board.on("click", "#num", checkNum);

    function initBoard() {
      var buttons = [];
      var button;

      //ボタンを生成
      for (var i = 0; i < BTN_NUMBER; i++) {
           buttons.push('<button id="num" class="btn btn-default btn-lg">'+(i+1)+'</button>');
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
        $(this).prop('disabled', true);
        $(this).text('○');

        if (currentNum == BTN_NUMBER) {
            clearTimeout(watchTimerID);
            $('#start').hide();
            $('#board').hide();
            $('#timer').hide();
            $('#score').text('あなたの結果は'+resultTime+'秒です!!');
            sendResult(resultTime);
        }
        currentNum++;
    }
   }
});

$(function(){
   $('#rule').modal('show');
});

function sendResult(time){
   $.get('http://localhost:1080/GakusaiGame/judge?score=2.22&table=touchranking');
};
