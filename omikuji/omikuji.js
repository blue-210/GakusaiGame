
window.onload = function(){
   document.getElementById('getOmikuji').onclick = getOmikuji;
}

function getOmikuji(){
   var omikuji = ["大吉","中吉","小吉","末吉","凶","大凶"];
   var result = Math.floor(Math.random() * omikuji.length);

   document.getElementById('result').innerHTML = omikuji[result];
}
