$(function(){
   $('img').imgLiquid();

   // 画像の上にカーソルがあたっているときに、カーソルを指の形にする
   $('img').hover(function(){
      $(this).css("cursor","pointer");
   });

   $('img').click(function(){
      //画像のidを取得する
      var location = $(this).attr("id");

      if(location == "omikuji"){
         window.location.href = "omikuji/omikuji.html"
      }else if(location == "difference"){
         window.location.href = "difference/difference.html"
      }else if(location == "touchnumber"){
         window.location.href = "touchnumber/touchnumber.html"
      }

   });
})
