// Hello World

var obrazkiArr = document.getElementsByClassName('obrazek');
var obrazkiOArr = new Array();
//var wielkoscDuzego= 357;
var wielkoscDuzego= 317;
var wielkoscMalego= 138;
var interwal =100;
var aktywne=true;
var kturyToRuch = 0;
var docelowaKolumnaDuzego=0;


function obrazekObj (obrazek){
	this.obrazek = obrazek;
}



for (var i=0;i<obrazkiArr.length; i++){
	var obrazekO = new obrazekObj(obrazkiArr[i]);
	obrazekO.obrazek.style.position = 'absolute';
	obrazekO.obrazek.style.padding = '10px 10px 10px 10px';
	obrazekO.obrazek.style.backgroundColor = "#FFF";
	obrazekO.obrazek.id=i;
	
	if (i==0){
		obrazekO.stan = "duzy";
		obrazekO.obrazek.style.width = wielkoscDuzego+'px';
		obrazekO.obrazek.style.height = wielkoscDuzego+'px';
	}else{
		obrazekO.stan = "maly";
		obrazekO.obrazek.style.width = wielkoscMalego+'px';
		obrazekO.obrazek.style.height = wielkoscMalego+'px';
	}
	//ustawianie polorzenia
	if (i == 0){
		obrazekO.kolumna=0;
		obrazekO.wiersz=0;
	}
	if (i == 1){
		obrazekO.kolumna=2;
		obrazekO.wiersz=0;
	}
	if (i == 2){
		obrazekO.kolumna=3;
		obrazekO.wiersz=0;
	}
	if (i == 3){
		obrazekO.kolumna=2;
		obrazekO.wiersz=1;
	}
	if (i == 4){
		obrazekO.kolumna=3;
		obrazekO.wiersz=1;
	}
	
	obrazekO.obrazek.style.left = ustalLeftNaPodstawieKolumny (obrazekO.kolumna)+"px";
	obrazekO.obrazek.style.top = ustalTopNaPodstawieWiersza(obrazekO.wiersz)+"px";
	
	obrazekO.obrazek.addEventListener('mouseover', obrazekOnClick);
		
	obrazkiOArr.push(obrazekO);
}

function ustalLeftNaPodstawieKolumny(kolumna){
	console.log(docelowaKolumnaDuzego);
	return 10+kolumna*(wielkoscMalego+40);

}
function ustalTopNaPodstawieWiersza(wiersz){
		return 10+wiersz*(wielkoscMalego+40);
}



function zwrocObraekOzPolorzenia(wiersz, kolumna){
		for (var i =0; i<obrazkiOArr.length; i++){
			if (obrazkiOArr[i].wiersz == wiersz && obrazkiOArr[i].kolumna == kolumna){
				return obrazkiOArr[i];
			}
		}
}
function zwrocObrazekODuzy(){
		for (var i =0; i<obrazkiOArr.length; i++){
			if (obrazkiOArr[i].stan == "duzy"){
				return obrazkiOArr[i];
			}
		}
}

function animujRuchObiektu(obrazek,wiersz,kolumna,docelowyStan){
	var wielkosc = "undefined";
	if (docelowyStan == "maly"){
		wielkosc = wielkoscMalego;	
	}else{
		wielkosc = wielkoscDuzego;
	}
	
	
	
	obrazek.animate({width:wielkosc,height:wielkosc,left:ustalLeftNaPodstawieKolumny(kolumna),top:ustalTopNaPodstawieWiersza(wiersz)},300,function(){
		kturyToRuch+=1
		if (kturyToRuch == 3){
			aktywne=true;
			kturyToRuch = 0;
		}
		})		
}



function obrazekOnClick(e){
	if (aktywne){
		id=e.target.id;
		kliknietyObrazekO= obrazkiOArr[id];
		duzyObrazekO = zwrocObrazekODuzy();
		console.log("duzyObrazekO");
		console.log(duzyObrazekO);
		console.log("kliknietyObrazekO");
		console.log(kliknietyObrazekO);
		
		if (kliknietyObrazekO.stan=="maly"){
			if (kliknietyObrazekO.kolumna == duzyObrazekO.kolumna+2){
				aktywne = false;
				console.log("klikniety zostal obrazek sasiadujacy w poziomiue z duzym po prawej - duzy skalujemy do lewej");
				docelowaKolumnaDuzego = duzyObrazekO.kolumna;
				var docelowyWierszDuzego;
				var docelowyWierszUstepujacego;
				if (kliknietyObrazekO.wiersz == 0){
					docelowyWierszDuzego = 0;
					docelowyWierszUstepujacego = 1;	
				}else{
					docelowyWierszDuzego = 1;
					docelowyWierszUstepujacego =0;
				}
				var kolumnaUstepujacego = kliknietyObrazekO.kolumna;
				var wierszUstepujacego = "undefined";
				if (kliknietyObrazekO.wiersz == 0){
					wierszUstepujacego =1;
				}else{
					wierszUstepujacego=0;
				}
				var ustepujacyObrazekO = zwrocObraekOzPolorzenia(wierszUstepujacego,kolumnaUstepujacego);
				var docelowaKolumnaUstepujacego = docelowaKolumnaDuzego;
				
				var docelowaKolumnaKliknietego = duzyObrazekO.kolumna+1;
				var docelowyWierszKliknietego = 0;
				
				

				//Animujemy duzy i ukatualniamy status
				animujRuchObiektu($('#'+duzyObrazekO.obrazek.id),docelowyWierszDuzego,docelowaKolumnaDuzego,"maly");
				duzyObrazekO.wiersz = docelowyWierszDuzego;
				duzyObrazekO.kolumna = docelowaKolumnaDuzego;
				duzyObrazekO.stan = "maly";
				
				//animujemy ustepujacy obrazek
				setTimeout(function(){animujRuchObiektu($('#'+ustepujacyObrazekO.obrazek.id),docelowyWierszUstepujacego,docelowaKolumnaUstepujacego,"maly")},interwal);
				ustepujacyObrazekO.kolumna = docelowaKolumnaUstepujacego;
				ustepujacyObrazekO.wiersz = docelowyWierszUstepujacego;
				//animujemy klikniety obrazek
				setTimeout(function(){animujRuchObiektu($('#'+kliknietyObrazekO.obrazek.id),docelowyWierszKliknietego,docelowaKolumnaKliknietego,"duzy")},2*interwal);
				kliknietyObrazekO.wiersz = docelowyWierszKliknietego;
				kliknietyObrazekO.kolumna = docelowaKolumnaKliknietego;
				kliknietyObrazekO.stan = "duzy";
				
				
				
			}
		}
		if (kliknietyObrazekO.kolumna == duzyObrazekO.kolumna-1){
			console.log("klikniety zostal obrazek sasiadujacy w poziomiue z duzym po lewej - duzy skalujemy do prawej");
			aktywne = false;
			var docelowaKolumnaDuzego=duzyObrazekO.kolumna+1;
			var docelowyWierszDuzego = "undefined";
			var docelowyWierszUstepujacego = "undefined";
			if (kliknietyObrazekO.wiersz == 0){
				docelowyWierszDuzego = 0;
				docelowyWierszUstepujacego = 1;	
			}else{
				docelowyWierszDuzego = 1;
				docelowyWierszUstepujacego =0;
			}
			var kolumnaUstepujacego = kliknietyObrazekO.kolumna;
			var wierszUstepujacego = "undefined";
			if (kliknietyObrazekO.wiersz == 0){
				wierszUstepujacego =1;
			}else{
				wierszUstepujacego=0;
			}
			var ustepujacyObrazekO = zwrocObraekOzPolorzenia(wierszUstepujacego,kolumnaUstepujacego);
			var docelowaKolumnaUstepujacego = docelowaKolumnaDuzego;
				
			var docelowaKolumnaKliknietego = duzyObrazekO.kolumna -1;
			var docelowyWierszKliknietego = 0;
				//Animujemy duzy i ukatualniamy status
				animujRuchObiektu($('#'+duzyObrazekO.obrazek.id),docelowyWierszDuzego,docelowaKolumnaDuzego,"maly");
				duzyObrazekO.wiersz = docelowyWierszDuzego;
				duzyObrazekO.kolumna = docelowaKolumnaDuzego;
				duzyObrazekO.stan = "maly";
				
				//animujemy ustepujacy obrazek
				setTimeout(function(){animujRuchObiektu($('#'+ustepujacyObrazekO.obrazek.id),docelowyWierszUstepujacego,docelowaKolumnaUstepujacego,"maly")},interwal);
				ustepujacyObrazekO.kolumna = docelowaKolumnaUstepujacego;
				ustepujacyObrazekO.wiersz = docelowyWierszUstepujacego;
				//animujemy klikniety obrazek
				setTimeout(function(){animujRuchObiektu($('#'+kliknietyObrazekO.obrazek.id),docelowyWierszKliknietego,docelowaKolumnaKliknietego,"duzy")},2*interwal);
				kliknietyObrazekO.wiersz = docelowyWierszKliknietego;
				kliknietyObrazekO.kolumna = docelowaKolumnaKliknietego;
				kliknietyObrazekO.stan = "duzy";
				
		}
		
	}
}

