var nameUser = prompt('Please enter youre name:')
if (nameUser === "" || nameUser === " ")
{
    nameUser = "User"
    alert("You don't enter your nickname")
}
else{
document.querySelector('.user').innerHTML = nameUser
}

var Play = document.getElementById('play')
var user = document.getElementById("scoreUser")
var comp = document.getElementById("scoreComputer")
let cardBack = "img/back.png"
let cards = ["img/J_cross.png", "img/J_diamond.png", "img/J_hearts.png", "img/6_peak.png", "img/7_diamond.png", "img/7_peak.png", "img/8_cross.png","img/8_diamond.png","img/8_hearts.png","img/9_diamond.png","img/9_peak.png","img/10_cross.png","img/10_peak.png","img/A_cross.png","img/A_diamond.png","img/A_hearts.png","img/A_hearts.png","img/J_peak.png","img/K_cross.png","img/K_diamond.png","img/K_hearts.png","img/K_peak.png","img/Q_cross.png","img/Q_diamond.png","img/Q_hearts.png","img/Q_peak.png"];
let  leftCard = document.getElementById('scoreUser'), 
rightCard = document.getElementById('scoreComputer'), localcards, leftCardValue, rightCardValue, 
taked = false, isFinished = false, cardRoundCount = 1, playerTotalValue = 0, oppTotalValue = 0;

var win = document.getElementById('win')

Play.addEventListener('click', ()=>{
    if (!taked){
        TakeCard();
    }
    else if (taked && !isFinished){
        CardReset();
    }
    else{
        CardReset();
    }
})

function TakeCard(){
    taked = true;
    localcards = cards;
    let temp = Math.floor(Math.random() * (localcards.length - 0)) + 0;
    leftCard = localcards.at(temp);
    localcards.splice(temp, 1);
    temp = Math.floor(Math.random() * (localcards.length - 0)) + 0;
    rightCard = localcards.at(temp);
    document.querySelector('.scoreUser').setAttribute('src',`${leftCard}`);
    document.querySelector('.scoreComputer').setAttribute('src',`${ rightCard}`);
    user.classList.add('Anim');
    setTimeout(function(){user.classList.remove('Anim');}, 1000);
    comp.classList.add('Anim');
    setTimeout(function(){comp.classList.remove('Anim');}, 1000);
    leftCardValue = CardValue(leftCard); //PValue
    rightCardValue = CardValue(rightCard); //OppValue
    document.querySelector('.attempt').innerHTML = cardRoundCount;
        playerTotalValue += leftCardValue;
        oppTotalValue += rightCardValue;
        cardRoundCount++;
        document.querySelector(".sumScoreUser").innerHTML = playerTotalValue;
        document.querySelector(".sumScoreComputer").innerHTML = oppTotalValue;
taked = false;

        if (cardRoundCount > 3){
            Win();
            cardRoundCount = 1;
            Play.innerHTML = "New game";
            playerTotalValue = 0;
            oppTotalValue = 0;
            
            if(isFinished == true){
                CardReset();
            }
        }
        else {
            Play.innerHTML = "Next card";
        }
}


function Win(){
    if (cardRoundCount == 4)
    {
		$(document).ready(function($) {
			$('.popup-open').ready(function() {
				$('.popup-fade').fadeIn();
				return false;
			});
			$('.popup-close').click(function() {
				$(this).parents('.popup-fade').fadeOut();
                user.setAttribute('src',`${cardBack}`);
                comp.setAttribute('src',`${ cardBack}`);
                user.classList.add('Anim');
                setTimeout(function(){user.classList.remove('Anim');}, 1000);
                comp.classList.add('Anim');
                setTimeout(function(){comp.classList.remove('Anim');}, 1000);
                document.querySelector(".sumScoreUser").innerHTML = 0;
                document.querySelector(".sumScoreComputer").innerHTML = 0;
                document.querySelector('.attempt').innerHTML = 0;
                return false;
			});

			$(document).keydown(function(e) {
				if (e.keyCode === 27) {
					e.stopPropagation();
					$('.popup-fade').fadeOut();
				}
			});

			$('.popup-fade').click(function(e) {
				if ($(e.target).closest('.popup').length == 0) {
					$(this).fadeOut();
                    user.setAttribute('src',`${cardBack}`);
                    comp.setAttribute('src',`${ cardBack}`);
                    user.classList.add('Anim');
                    setTimeout(function(){user.classList.remove('Anim');}, 1000);
                    comp.classList.add('Anim');
                    setTimeout(function(){comp.classList.remove('Anim');}, 1000);
                    document.querySelector(".sumScoreUser").innerHTML = 0;
                    document.querySelector(".sumScoreComputer").innerHTML = 0;
                    document.querySelector('.attempt').innerHTML = 0;
				}
			});
		});

        if (playerTotalValue > oppTotalValue){
        win.innerHTML= nameUser + " win";
    }
        if (oppTotalValue > playerTotalValue){
            win.innerHTML= "computer win";
    }
        if (oppTotalValue == playerTotalValue){
        win.innerHTML= "draw";
    }
}
}


function CardReset(){

            isFinished = false;
        
        taked = false;
}

function CardValue(card){
    let symb;
    for (let i = card.length-2; i >= 0; i--){
         if (card.at(i)=='/'){
            symb = card.at(i+1);
            break;
        }
    }
    switch(symb){
        case '6' : return 6;
        case '7' : return 7;
        case '8' : return 8;
        case '9' : return 9;
        case '1' : return 10;
        case 'J' : return 3;
        case 'Q' : return 4;
        case 'K' : return 5;
        case 'A' : return 11;
        default: return -1;
    }
}