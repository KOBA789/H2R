var map;

$(document).ready(function(){
	init();
	var arr = str2arr("わたしゃなぁにもしらんよ。");
	$("p").text(arr.join(","));
	map = arr2map(arr);
	
	$("#key").keydown(function (e) {
		return check(e.which);
    });
});

var t1 = "";
var ix = 0;
function check(code){
	var c1 = "";
	if (code == 32 || (65 <= code && code <= 65 + 25) || (97 <= code && code <= 97 + 25)){
		c1 = String.fromCharCode(code);
	}
	var flg1 = false;
	if(c1.length > 0){
		c1 = c1.toLowerCase();
		var t2 = t1 + c1;
		for(i = 0; i < map[ix].length; i++){
			if(map[ix][i].indexOf(t2) == 0){
				if(map[ix][i] == t2){
					ix ++;
					t1 = "";
				}else{
					t1 = t2;
				}
				flg1 = true;
				break;
			}
		}
		console.log(flg1);
	}
	return flg1;
}

function str2arr(str){
	var spstr = new Array();
	var c1 = "", c2 = "";
	var i;
	for(i = str.length - 1; i >= 0; i--){
		c1 = str.charAt(i);
		if(smlc.contains(c1)){
			c2 = c1;
		}else{
			spstr.push(c1 + c2);
			c2 = "";
		}
	}
	spstr.reverse();
	return spstr;
}

function arr2map(arr){
	var map = new Array();
	var i;
	for(i = 0; i < arr.length; i++){
		var list = char2list(arr[i]);
		map.push(list);
	}
	//"n"のあとに"y"や母音が来ないようにするための処理
	var flg2 = true;
	if(flg2){
	var flg1 = false;
	for(i = map.length - 1; i >= 0; i--){
		if(flg1){
			for(j = 0; j < map[i].length; j++){
				if(map[i][j]=="n"){
					map[i].splice(j,1);
					break;
				}
			}
		}
		var c1;
		c1 = map[i][0].charAt(0);
		if(vowel.contains(c1)){
			flg1 = true;
		}else{
			flg2 = false;
		}
	}
	}
	return map;
}

function char2list(str){
	var list = new Array();
	
	if(!!h2r[str]){
		var list2 = h2r[str];//とりあえず「ひらがな→ローマ字表」から指定文字のものを全部とりだす
		var i;
		for(i = 0; i < list2.length; i++){//で、forでぐるぐるまわしてすべてlistに突っ込む
			list.push(list2[i]);
		}
	}

	if(str.length　==　2){//二文字だとマンドクセ	
		var c1, c2;
		c1 = str.charAt(0);//とりあえず、
		c2 = str.charAt(1);//変数にいれておく
		var list3 = h2r[c1];//1文字めのリストを取り出して
		var list4 = h2r[c2];//2文字めのリストも取り出して
		var j, k;
		for(j = 0; j < list3.length; j++){//1文字めに対して2文字目もループ
			for(k = 0; k < list4.length; k++){//2重ループですべてを走査
				var c3 = list3[j] + list4[k];
				list.push(c3);
			}
		}
	}
	return list;
}

function init(){
	for (var r in r2h) {
		var h = r2h[r];
		if(!!h2r[h]){
			h2r[h].push(r);
		}else{
			h2r[h] = new Array();
			h2r[h].push(r);
		}
	}
}

if( ! Array.prototype.contains ){
	Array.prototype.contains = function( value ){
		for(var i in this){
			if( this.hasOwnProperty(i) && this[i] === value){
				return true;
			}
		}
		return false;
	}
}

var smlc = new Array("ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ", "ゎ", "ヵ", "ヶ");

var vowel = new Array("a", "i", "u", "e", "o", "y");

var h2r = new Object();

var r2h = {"a":"あ","i":"い","yi":"い","u":"う","wu":"う","whu":"う","e":"え","o":"お","la":"ぁ","xa":"ぁ","li":"ぃ","xi":"ぃ","lyi":"ぃ","xyi":"ぃ","lu":"ぅ","xu":"ぅ","le":"ぇ","xe":"ぇ","lye":"ぇ","xye":"ぇ","lo":"ぉ","xo":"ぉ","wha":"うぁ","whi":"うぃ","wi":"うぃ","whe":"うぇ","we":"うぇ","who":"うぉ","ka":"か","ca":"か","ki":"き","ku":"く","cu":"く","qu":"く","ke":"け","ko":"こ","co":"こ","lka":"ヵ","xka":"ヵ","lke":"ヶ","xke":"ヶ","ga":"が","gi":"ぎ","gu":"ぐ","ge":"げ","go":"ご","kya":"きゃ","kyi":"きぃ","kyu":"きゅ","kye":"きぇ","kyo":"きょ","qya":"くゃ","qyu":"くゅ","qwa":"くぁ","qa":"くぁ","kwa":"くぁ","qwi":"くぃ","qi":"くぃ","qyi":"くぃ","qwu":"くぅ","qwe":"くぇ","qe":"くぇ","qye":"くぇ","qwo":"くぉ","qo":"くぉ","gya":"ぎゃ","gyi":"ぎぃ","gyu":"ぎゅ","gye":"ぎぇ","gyo":"ぎょ","gwa":"ぐぁ","gwi":"ぐぃ","gwu":"ぐぅ","gwe":"ぐぇ","gwo":"ぐぉ","sa":"さ","si":"し","ci":"し","shi":"し","su":"す","se":"せ","ce":"せ","so":"そ","za":"ざ","zi":"じ","ji":"じ","zu":"ず","ze":"ぜ","zo":"ぞ","sya":"しゃ","sha":"しゃ","syi":"しぃ","syu":"しゅ","shu":"しゅ","sye":"しぇ","she":"しぇ","syo":"しょ","sho":"しょ","swa":"すぁ","swi":"すぃ","swu":"すぅ","swe":"すぇ","swo":"すぉ","zya":"じゃ","ja":"じゃ","jya":"じゃ","zyi":"じぃ","jyi":"じぃ","zyu":"じゅ","ju":"じゅ","jyu":"じゅ","zye":"じぇ","je":"じぇ","jye":"じぇ","zyo":"じょ","jo":"じょ","jyo":"じょ","ta":"た","ti":"ち","chi":"ち","tu":"つ","tsu":"つ","te":"て","to":"と","ltu":"っ","xtu":"っ","ltsu":"っ","da":"だ","di":"ぢ","du":"づ","de":"で","do":"ど","tya":"ちゃ","cha":"ちゃ","cya":"ちゃ","tyi":"ちぃ","cyi":"ちぃ","tyu":"ちゅ","chu":"ちゅ","cyu":"ちゅ","tye":"ちぇ","che":"ちぇ","cye":"ちぇ","tyo":"ちょ","cho":"ちょ","cyo":"ちょ","tsa":"つぁ","tsi":"つぃ","tse":"つぇ","tso":"つぉ","tha":"てゃ","thi":"てぃ","thu":"てゅ","the":"てぇ","tho":"てょ","twa":"とぁ","twi":"とぃ","twu":"とぅ","twe":"とぇ","two":"とぉ","dya":"ぢゃ","dyi":"ぢぃ","dyu":"ぢゅ","dye":"ぢぇ","dyo":"ぢょ","dha":"でゃ","dhi":"でぃ","dhu":"でゅ","dhe":"でぇ","dho":"でょ","dwa":"どぁ","dwi":"どぃ","dwu":"どぅ","dwe":"どぇ","dwo":"どぉ","na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の","nya":"にゃ","nyi":"にぃ","nyu":"にゅ","nye":"にぇ","nyo":"にょ","ha":"は","hi":"ひ","hu":"ふ","fu":"ふ","he":"へ","ho":"ほ","ba":"ば","bi":"び","bu":"ぶ","be":"べ","bo":"ぼ","pa":"ぱ","pi":"ぴ","pu":"ぷ","pe":"ぺ","po":"ぽ","hya":"ひゃ","hyi":"ひぃ","hyu":"ひゅ","hye":"ひぇ","hyo":"ひょ","fya":"ふゃ","fyu":"ふゅ","fyo":"ふょ","fwa":"ふぁ","fa":"ふぁ","fwi":"ふぃ","fi":"ふぃ","fyi":"ふぃ","fwu":"ふぅ","fwe":"ふぇ","fe":"ふぇ","fye":"ふぇ","fwo":"ふぉ","fo":"ふぉ","bya":"びゃ","byi":"びぃ","byu":"びゅ","bye":"びぇ","byo":"びょ","va":"ヴぁ","vi":"ヴぃ","vu":"ヴ","ve":"ヴぇ","vo":"ヴぉ","vya":"ヴゃ","vyi":"ヴぃ","vyu":"ヴゅ","vye":"ヴぇ","vyo":"ヴょ","pya":"ぴゃ","pyi":"ぴぃ","pyu":"ぴゅ","pye":"ぴぇ","pyo":"ぴょ","ma":"ま","mi":"み","mu":"む","me":"め","mo":"も","mya":"みゃ","myi":"みぃ","myu":"みゅ","mye":"みぇ","myo":"みょ","ya":"や","yu":"ゆ","yo":"よ","lya":"ゃ","xya":"ゃ","lyu":"ゅ","xyu":"ゅ","lyo":"ょ","xyo":"ょ","ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ","rya":"りゃ","ryi":"りぃ","ryu":"りゅ","rye":"りぇ","ryo":"りょ","wa":"わ","wo":"を","n":"ん","nn":"ん","n'":"ん","xn":"ん","lwa":"ゎ","xwa":"ゎ",".":"。",",":"、","bb":"っ","cc":"っ","dd":"っ","ff":"っ","gg":"っ","hh":"っ","jj":"っ","kk":"っ","ll":"っ","mm":"っ","pp":"っ","qq":"っ","rr":"っ","ss":"っ","tt":"っ","vv":"っ","ww":"っ","xx":"っ","yy":"っ","zz":"っ","-":"ー"};

/*
 * とりあえず、"じゃ"とかは一文字扱いで。
 * 内部的に二文字に展開して、"じ"と"ゃ"にわけて文字列連結"jixya"とかで。
 * これ以上はわからん。どうにでもなれ
 */
