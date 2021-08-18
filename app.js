const game = document.querySelector(".game");
const colorDiv = document.querySelector(".colorSelect");

let cardImages = [];

cardImages[0] = 'AS.png';
cardImages[1] = '2S.png';
cardImages[2] = '3S.png';
cardImages[3] = '4S.png';
cardImages[4] = '5S.png';
cardImages[5] = '6S.png';
cardImages[6] = '7S.png';
cardImages[7] = '8S.png';
cardImages[8] = '9S.png';
cardImages[9] = '10S.png';
cardImages[10] = 'QS.png';
cardImages[11] = 'JS.png';
cardImages[12] = 'KS.png';

cardImages[13] = 'AH.png';
cardImages[14] = '2H.png';
cardImages[15] = '3H.png';
cardImages[16] = '4H.png';
cardImages[17] = '5H.png';
cardImages[18] = '6H.png';
cardImages[19] = '7H.png';
cardImages[20] = '8H.png';
cardImages[21] = '9H.png';
cardImages[22] = '10H.png';
cardImages[23] = 'QH.png';
cardImages[24] = 'JH.png';
cardImages[25] = 'KH.png';

cardImages[26] = 'AC.png';
cardImages[27] = '2C.png';
cardImages[28] = '3C.png';
cardImages[29] = '4C.png';
cardImages[30] = '5C.png';
cardImages[31] = '6C.png';
cardImages[32] = '7C.png';
cardImages[33] = '8C.png';
cardImages[34] = '9C.png';
cardImages[35] = '10C.png';
cardImages[36] = 'QC.png';
cardImages[37] = 'JC.png';
cardImages[38] = 'KC.png';

cardImages[39] = 'AD.png';
cardImages[40] = '2D.png';
cardImages[41] = '3D.png';
cardImages[42] = '4D.png';
cardImages[43] = '5D.png';
cardImages[44] = '6D.png';
cardImages[45] = '7D.png';
cardImages[46] = '8D.png';
cardImages[47] = '9D.png';
cardImages[48] = '10D.png';
cardImages[49] = 'QD.png';
cardImages[50] = 'JD.png';
cardImages[51] = 'KD.png';

const colorImages = [];

colorImages[0] = 'gray_back.png';
colorImages[1] = 'blue_back.png';
colorImages[2] = 'green_back.png';
colorImages[3] = 'red_back.png';
colorImages[4] = 'purple_back.png';
colorImages[5] = 'yellow_back.png';

let cardGenerator = [];
let position = 0;
let cardPair = 2;
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let gen_nums = [];

let currentImage = 0;

function init() {
    generate();
    frontCards();
    colorChange();
    backCards();
    viewportSize();
    play();
}

function backCards() {
    for (let i = 0; i < 12; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = i;
        game.appendChild(card);
        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");
        card.appendChild(flipCard);
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        flipCard.appendChild(cardFront);
        const imageFront = document.createElement("img");
        imageFront.src = "images/" + colorImages[currentImage];
        imageFront.classList.add("image-front");
        cardFront.appendChild(imageFront);
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        flipCard.appendChild(cardBack);
        const imageBack = document.createElement("img");
        imageBack.src = "images/" + cardImages[cardGenerator[i]];
        imageBack.classList.add("image-back");
        cardBack.appendChild(imageBack);
        console.log("carta " + (i + 1) + " = " + cardImages[cardGenerator[i]]);
    }
}

function frontCards() {
    for (let i = 0; i < 6; i++) {
        const cardColor = document.createElement("div");
        cardColor.classList.add("cardColor");
        cardColor.dataset.index = i;
        colorDiv.appendChild(cardColor);
        const imageSelect = document.createElement("img");
        imageSelect.src = "images/" + colorImages[i];
        imageSelect.classList.add("image-select");
        cardColor.appendChild(imageSelect);
    }
    colorChange();
}

function colorChange() {
    colorArray = document.querySelectorAll(".cardColor");
    for (let j = 0; j < colorArray.length; j++) {
        if (j == currentImage) {
            colorArray[j].classList.add("selected");
        } else {
            colorArray[j].classList.remove("selected");
        }
        colorArray[j].onclick = function () {
            currentImage = j;
            console.log("baralho: " + colorImages[currentImage]);
            const divImage = document.querySelectorAll(".image-front");
            for (let i = 0;i < divImage.length; i++){
                divImage[i].src = "images/" + colorImages[currentImage];
            }
            colorChange();
        }
    }
}

function generate() {
    for (let i = 0; i < 12; i++) {
        const oldPosition = position;
        position = get_rand(nums) - 1;
        if (cardPair >= 2) {
            let randomNumber = Math.floor(Math.random() * 52);
            while (cardGenerator.includes(randomNumber)) {
                randomNumber = Math.floor(Math.random() * 52);
            }
            cardGenerator[position] = randomNumber;
            cardPair--;
        } else {
            cardGenerator[position] = cardGenerator[oldPosition];
            cardPair++;
        }
    }
}

function in_array(array, el) {
    for (let i = 0; i < array.length; i++)
        if (array[i] == el) return true;
    return false;
}

function get_rand(array) {
    let rand = array[Math.floor(Math.random() * array.length)];
    if (!in_array(gen_nums, rand)) {
        gen_nums.push(rand);
        return rand;
    }
    return get_rand(array);
}
let card1 = null;
let card2 = null;
let cardC = [];
function play() {
    cardC = document.querySelectorAll(".card");
    for (let j = 0; j < cardC.length; j++) {
        cardC[j].onclick = function () {
            if (!this.classList.contains("hover")) {
                this.classList.add("hover");
                if (card1 == null) {
                    card1 = this.dataset.index;
                } else {
                    card2 = this.dataset.index;
                }
                check();
            }
        };
    }

}

function check() {
    console.log("carta1 :" + cardImages[cardGenerator[card1]]);
    console.log("carta2 :" + cardImages[cardGenerator[card2]]);
    const div1 = cardC[card1];
    const div2 = cardC[card2];
    const hovers = document.querySelectorAll(".hover");
    console.log("cartas viradas: " + hovers.length);
    if (cardGenerator[card1] == cardGenerator[card2] && card1 != null && card2 != null) {
        card1 = null;
        card2 = null;
        if (hovers.length >= 12) {
            alert("Ganhou!!")
            reset();
        }
    } else if (card1 != null && card2 != null) {
        setTimeout(function () {
            div1.classList.remove("hover");
            div2.classList.remove("hover");
        }, 1000);
        card1 = null;
        card2 = null;
    }
}

function reset() {
    game.innerHTML = "";
    colorDiv.innerHTML = "";
    cardGenerator = [];
    position = 0;
    cardPair = 2;
    gen_nums = [];
    card1 = null;
    card2 = null;
    cardC = [];
    confirm("Novo Jogo??")
    init();
}

init();

const newGame = document.querySelector(".header button");
newGame.addEventListener("click", reset);

const exit = document.querySelector("#exit");
exit.addEventListener("click", function(){
    if (confirm('Quer mesmo sair?')) {
        location.href='/';
    } else {
        return false;
    }
});

function viewportSize() {
    let viewPortWidth;
    let viewPortHeight;
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }
    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    if (viewPortWidth > (viewPortHeight * (720 / 825))) {
        game.style.width = "calc(88vh * (720 / 825))";
        game.style.height = "88vh";
    } else {
        game.style.width = "89vw";
        game.style.height = "calc(89vw / (720 / 825))";
    }
}

window.onresize = viewportSize;