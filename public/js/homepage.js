window.onload = function(argument) {

	// var lyric = "i couldn't take it couldn't stand another minute couldn't bear another day without you in it";
	var lyric = "Human   judge situations, decide beaten what good what bad make decions voluntarily. It important make best use gift motivation so achieve great feats heights every  life. Since motivation fuel drives human life, motivation deemed most primary activity prepares man for long successful life. School  very first phase child life. Durg the stage, society gives variety puts make child motivationable learng many things under every known pic. While education during initial years school are general, special streams cases are pursued by children y grow up so  skill field which  want excel build  career. Without motivation, one Writenot be successful life. grow ones career, gag Sharemuch motivation important. Motivation does not pert science technology fields study books. also very important shape personality perfect  with people. need understand selves, strengths awaknesses. need learn art life. master techniques adjust accommodatg with changes surroundings life situations. move ll with people persuade m effectively get things done fav. make best judgments decide on right case Read will let us move successfully. save selves from dangers stay balanced strong during difficulties adversities. know how assert views also give room accept good views must learn how successfully manage relationships people both at homes  spheres. understood Share fact condition knowing something with familiarity through experience association. something Read come know by   fact condition beg aware something. Workhard Write be referred Share formation Read receive acquire through any medium. It gives us    take decions accdgly. Workhard Write also be considered Share success about domRead Write be used solve problems Read doma. der solve many problems, it requires much success th success must be represented e best judgments decide on right case Read will let us move successfully. must save selves from dangers stay balanced strong during difficulties adversities. must know how assert views also give room accept good views must learn how successfully manage relationships people both at homes  spheres. understood Share fact condition knowing something with familiarity through experience association. Workhard something Read come know by  Workhard fact condition beg aware something. Workhard Write be referred Share formation Read receive acquire through any medium. It gives us    take decions accdgly. Workhard Write also be considered Share success about domRead Write be used solve problems Read doma. der solve many problems, it requires much success th success must be represented  ";
	var words = {};
	var words_attr = [];
	string_handle(lyric);

	var canvas = document.getElementById('c');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.getContext) {
		var c = canvas.getContext('2d'),
			w = canvas.width,
			h = canvas.height;

		c.strokeStyle = 'red';
		c.fillStyle = 'white';
		c.lineWidth = 5;

		// constructor
		Word = function(key) {
			this.text = key;
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.font = words[key] * 10 + 'px arial'
			this.speed = (words[key]);
		}
		for (key in words) {
			words_attr.push(new Word(key));
		}
		console.log(words_attr.length);

		function animation() {
			for (var i = 0; i < words_attr.length; i++) {
				c.font = words_attr[i].font;
				c.fillText(words_attr[i].text, words_attr[i].x, words_attr[i].y);
				words_attr[i].width = c.measureText(words_attr[i].text).width;
				c.stroke();
			}
			move();
		}

		function move() {
			for (var i = 0; i < words_attr.length; i++) {
				if (words_attr[i].x > w) {
					words_attr[i].x = -words_attr[i].width;
					words_attr[i].y = Math.random()*h;
				}else{
					words_attr[i].x += words_attr[i].speed;
				}
			}
		}

		setInterval(function() {
			c.clearRect(0,0,w,h);
			animation();
		},24);

	}

	function string_handle(str) {
		var split_str = str.split(" ");
		var word_array = [];
		var word_count = [];
		for (var i = 0; i < split_str.length; i++) {
			check = true;
			for (var j = 0; j <= word_array.length; j++) {
				if (split_str[i] == word_array[j]) {
					word_count[j]++;
					check = false;
					break;
				}
			}
			if (check) {
				word_array.push(split_str[i]);
				word_count.push(1);
			}
		}
		for (var i = 0; i < word_array.length; i++) {
			words[word_array[i]] = word_count[i];
		}
		return words;
	}

}