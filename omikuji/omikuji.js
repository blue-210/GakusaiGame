$(function(){
	$('#getOmikuji').click(getOmikuji);
	
	function getOmikuji(){
		
		var omikuji = ["大吉","中吉","小吉","末吉","凶","大凶"];
		
		//願い事
		var hope = [
			["すごく叶う", "とても叶う"],
			["叶う", "叶うよ", "叶います"],
			["叶わない"]
		]; 
		
		//恋愛
		var love = [
			["成就", "ラブラブ"],
			["出会いがある", "焦らず", "進展？"],
			["フラれる"]
		]; 
		
		//勉学
		var study = [
			["捗る", "順位上がるよ"],
			["努力次第","君ならできるさ", "がんばれる"],
			["バカ"]
		]; 
		
		
		//各運勢の重みを算出
		var hopeScore = Math.floor(Math.random() * hope.length);
		console.log('願い'+hopeScore);
		var loveScore = Math.floor(Math.random() * love.length);
		console.log('恋愛'+loveScore);
		var studyScore = Math.floor(Math.random() * study.length);
		console.log('勉学'+studyScore);
		
		//重みの中から回答文を算出
		var hopeResult = Math.floor(Math.random() * hope[hopeScore].length);
		console.log(hope[hopeScore][hopeResult]);
		var loveResult = Math.floor(Math.random() * love[loveScore].length);
		console.log(love[loveScore][loveResult]);
		var studyResult = Math.floor(Math.random() * study[studyScore].length);
		console.log(study[studyScore][studyResult]);
		
		var sumScore = (hopeScore + loveScore + studyScore);
		console.log('合計'+sumScore);
		
		
		swich(sumScore){
			case 0:
				$('#result').text(omikuji[0]);
				break;
			case 1:
				$('#result').text(omikuji[1]);
				break;
			case 2:
				$('#result').text(omikuji[2]);
				break;
			case 3:
				$('#result').text(omikuji[2]);
				break;
			case 4:
				$('#result').text(omikuji[3]);
				break;
			case 5:
				$('#result').text(omikuji[4]);
				break;
			case 6:
				$('#result').text(omikuji[5]);
				break;
		}
		
		
		var result = Math.floor(Math.random() * omikuji.length);
		
		
	}
});
