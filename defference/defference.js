var level = 0;
var games = [
	['大 ', '太 '],
	['白 ', '臼 '],
	['問 ', '間 '],
];

var MAX_LEVEL = games.length-1;
var DIM_FIRST = 5;
var DIM_DELTA = 3;
var dim = DIM_FIRST;
var t1;
var t2;

function gameStart(){
	$('#startbtn').hide();
	
	var dummy = games[level][0];
	var seikai = games[level][1];
	
	if(level == 0){
		$('#score').empty();
		t1 = new Date().getTime();
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
					t2 = new Date().getTime();
					$('#level').empty();
					$('#cells').empty();
					$('#score').text('あなたの結果は '+(t2-t1)/1000+'秒です!!');
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

$(function(){
	$('#rule').modal('show');
});
