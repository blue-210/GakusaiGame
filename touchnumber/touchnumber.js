
$(function(){
   var SIZE = 3, // 出現する数字の数を指定する
      BTN_NUMBER = SIZE*SIZE;
      $board = $("#board"), // ランダムな数字を入れるところ
      $timeCount = $("#timer"), // タイマーを表示するところ
      currentNum = 1, // 今押さなければいけない数字を保存するもの
      startTime = undefined, // スタートを押したときの時間を保存するもの
      watchTimerID = undefined, // ゲームのタイマー
      resultTime = 0; // ゲームの結果タイムを保存するもの

    $('#rule').modal('show');

    $("#start").on("click", function() {
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
           $(this).prop('disabled', true);
           $(this).html('<div class="img"><img src="../images/9014.jpg"/></div>');
           $(this).imgLiquid();

           if (currentNum == BTN_NUMBER) {
               clearTimeout(watchTimerID);
               $('#start').hide();
               $('#board').hide();
               $('#timer').hide();
               sendResult(resultTime);
           }
           currentNum++;
       }
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
