$(function(){
   $('#getOmikuji').click(getOmikuji);

   function getOmikuji(){
      var omikuji = ["大吉","中吉","小吉","末吉","凶","大凶"];
      var result = Math.floor(Math.random() * omikuji.length);

      $('#result').text(omikuji[result]);
   }
});
