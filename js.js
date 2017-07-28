start();

function askstart() {
	/*if(confirm("Are you sure you want to start a new game?")) {
		
	}*/
	location.reload();
}

function start() {
	$('#guess').html("");
	$('#slova').html("");
	$('#hangman').attr('src','images/1.png');
	$('#hangman').val('1');
	showABCD();
	chooseString();
	$('#gameover').hide();
}

function showABCD() {
	var azbuka = ["A","B","V","G","D","E","Z","I","J","K","L","M","N","O","P","R","S","T","U","F","H","C","Q","W","X","Y"];	
	$('#slova').html();
	for(i=0;i<azbuka.length;i++) {
		$('#slova').append("<input type='button' value='"+azbuka[i]+"' class='button'>");
	}
}

function chooseString() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();               
	} else {               
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");               
	}
	xmlhttp.onreadystatechange = function () {               
		if (xmlhttp.readyState == 4) {                   
		  var lines = xmlhttp.responseText;
		  intoArray(lines);		  
		}               
	}
	xmlhttp.open("GET", "lista.txt", true);
	xmlhttp.send();
}

function intoArray(lines) {
	var lineArr = lines.split('\n'); 
	var size = lineArr.length;
	var random = Math.floor(Math.random() * size);
	var word = lineArr[random];
	$('#res').text(word);
	showLines(word);
}

function showLines(word) {
	var size = word.length;
	for(i=0;i<size;i++) {
		var s = word.charAt(i);
		var sp = word.charAt(i+1);
		var string;
		if(s==" ") continue;
		if(sp==" ") {
			string = "<div class='mr' id='f"+i+"'></div>";
		} else {
			string = "<div id='f"+i+"'></div>";
		}
		$('#guess').append(string);
	}
}

$('#slova .button').on('click',function() {
	$(this).prop("disabled",true);
	var s = $(this).val();
	checkSlovo(s);
});

function checkSlovo(s) {
	var rec = $('#res').text();
	var hit = false;
	for(var i=0;i<rec.length;i++) {
		if(rec.charAt(i)==" ") i++;
		if(rec.charAt(i).toLowerCase()==s.toLowerCase()) {
			$('#f'+i).html(s);
			hit = true;
		}
	}
	if(hit==false) {
		var h = $('#hangman').attr('val');
		h++;
		$('#hangman').attr('val',h);
		$('#hangman').attr('src','images/'+h+'.png');
		if(h>=8) {
			$('#gotext').html("GAME OVER");
			$('#gameover').fadeIn(300);
		}
	}
	isFinished();
}

function isFinished() {
	var done = true;
	var rec = $('#res').text();
	$("#guess div").each(function(e) {
		if($(this).text()=="") {
			done = false;
		}
	});
	/*for(var i=0;i<rec.length;i++) {
		if(rec.chatAt(i)==" ") continue;
		var s = $('#f'+i).text();
		if(s=="") {
			done = false;
		}
	}*/
	if(done==true) {
		$('#gotext').html("CONGRATULATIONS, YOU WON!");
		$('#gameover').fadeIn(300);
	}
}