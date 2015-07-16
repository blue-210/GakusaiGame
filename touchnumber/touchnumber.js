$(function(){
   var BTN_NUMBER = 16, // 出現する数字の数を指定する
      TIME_COUNT = 3, // ゲーム開始のカウントダウンを何秒から始めるか指定する
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

    $board.on("click", "li", checkNum);

    function initBoard() {
        var listArray = [],
            lists = "";

        for (var i = 0; i < BTN_NUMBER; i++) {
            listArray.push('<li class="btn btn-info">' + (i + 1) + '</li>');
            if(BTN_NUMBER%4 == 0){
               listArray.push('<br/>')
            }
        }

        while (listArray.length) {
            lists += listArray.splice(Math.floor(Math.random() * listArray.length), 1);
        }
        $board.append(lists);
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
        $(this).attr('class','btn btn-success');

        if (currentNum == BTN_NUMBER) {
            clearTimeout(watchTimerID);
            alert(resultTime);
        }

        currentNum++;
    }
   }
});

$(function(){
   $('#rule').modal('show');
});
