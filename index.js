const app={
    n:7,
    nbCards:57,
    nbSymbols:57,
    domElms:{
        cards:document.querySelectorAll(".card"),
        
    },

    setCoordinateToCards:


}

function f(a,x,b){
    return (a*x+b)%(n);
}
const n= 7
const INF=n;


const cards=document.querySelectorAll(".card");
let x=0;
let y=0;
let ind=0;
const arrayCard=[[INF,0],[INF,INF],[INF,2*INF],[INF,3*INF],[INF,4*INF],[INF,5*INF],[INF,6*INF],[0,INF]]
console.log(cards)
cards.forEach(card=>{
    if(x==n){
        card.setAttribute("data-x",arrayCard[ind][0]);
        card.setAttribute("data-y",arrayCard[ind][1]); 
        //card.style.transform="rotate(90deg)";
        ind++;
    }
    else{

        card.setAttribute("data-x",x);
        card.setAttribute("data-y",y);
        if (x<n)y+=1;
        if (y===n||x==INF) {
            if(x<n)
            {y=0;
            x+=1}
    }
        
    }
    
 
})
symbols=["p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21","p22","p23","p24","p25","p26","p27","p28","p29","p30","p31","p32","p33","p34","p35","p36","p37","p38","p39","p40","p41","p42","p43","p44","p45","p46","p47","p48","p49","p50","p51","p52","p53","p54","p55",'p56','p57']
console.log(symbols.length)
positions=[1,2,3,4,5,6,7,8]
console.log(positions.sort((a, b) => 0.5 - Math.random()));
let symbol=0
let i=0
for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
        for (let x = 0; x < n; x++) {
            console.log(x,f(a,x,b))
            const card= document.querySelector(`[data-x="${x}"][data-y="${f(a,x,b)}"]`);
            
            
            card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
            i++;
          
            
        }
        console.log(INF,a*INF)
        const card= document.querySelector(`[data-x="${INF}"][data-y="${a*INF}"]`);
            
            card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
        
        symbol+=1
    }
}
//symbole de type x=b
for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
        console.log(x,y)
        const card= document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            
            card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
    }
    console.log(0,INF)
    const card= document.querySelector(`[data-x="${0}"][data-y="${INF}"]`);
    card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
    console.log("symbole ++++++++++++++++++++++",symbol);
    symbol+=1

    
}

//droite à l'infini
for (let i = 0; i < n; i++) {
    const card= document.querySelector(`[data-x="${INF}"][data-y="${i*INF}"]`);
    card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
    console.log(INF,i*INF)
    
}
const card= document.querySelector(`[data-x="${0}"][data-y="${INF}"]`);
card.innerHTML+=`<img class='animal' src='animals/${symbols[symbol]}.png'>`;
console.log(0,INF)
console.log("symbole ++++++++++++++++++++++",symbol);

let allCards=document.querySelectorAll(".card");
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
allCards.forEach(card => {
    let animals= []
    const imgs=card.querySelectorAll('.animal');
    imgs.forEach(img => {
        animals.push(card.removeChild(img));
    });
    animals=animals.sort((a, b) => 0.5 - Math.random())
    
    animals.forEach(animal=> {
        card.appendChild(animal);
        animal.style.transform=`rotate(${getRandom(0,360)}deg)`;
        animal.style.width=`${getRandom(10,20)}%`;
    })
    console.log(animals)

    
});

let model = allCards[Math.floor(Math.random()*allCards.length)];
console.log(model)
let current=allCards[Math.floor(Math.random()*allCards.length)];
console.log(current)

while(current==model){
    current=allCards[Math.floor(Math.random()*allCards.length)];
}

const divModel=document.querySelector(".model");
const divCurrent=document.querySelector(".current");
divModel.appendChild(model);
divCurrent.appendChild(current);
model.style.display="block";
current.style.display="block";

const images= document.querySelectorAll('.animal');

function getSameImg(model,current){
    modelImgs=model.querySelectorAll(".animal");
    currentImgs=current.querySelectorAll(".animal");
    let sameUri=null
    modelImgs.forEach(modelImg=>{
        currentImgs.forEach(currentImg=>{
            console.log(modelImg.getAttribute("src")==currentImg.getAttribute("src"))
            if(modelImg.getAttribute("src")==currentImg.getAttribute("src"))
                {sameUri=modelImg.getAttribute("src")}
        })
    })
    return sameUri;
}
let sameUri=getSameImg(model,current);
console.log(sameUri)
const nbrCardsElm=document.querySelector(".nbrCards");
const minutesElm=document.querySelector(".minutes");
const secondsElm=document.querySelector(".seconds");
const errorsElm=document.querySelector(".errors");

time=0
setInterval(() => {
    time+=1;
    minutesElm.textContent= time/60<10? "0" + Math.round(time/60):Math.round(time/60)
    secondsElm.textContent=time%60<10? "0"+time%60:time%60;
}, 1000);
function handleWin(){
    divModel.removeChild(model);
    nbrCardsElm.textContent=Number(nbrCardsElm.textContent)-1;
    divModel.appendChild(current);
    model=current;
    allCards=document.querySelectorAll(".card");
    if(!document.querySelector(".cards").children.length) {
        console.log("FINI");
        return;
    }
    current=allCards[Math.floor(Math.random()*allCards.length)];
    while(current==model){
        current=allCards[Math.floor(Math.random()*allCards.length)];
    }
    current.style.display="block";
    sameUri=getSameImg(model,current);
    divCurrent.appendChild(current);
}
images.forEach(img=> img.addEventListener("click",(e)=>{
    
    modelImgs=model.querySelectorAll(".animal");
   
        if(sameUri==e.target.getAttribute("src")) handleWin();
        else errorsElm.textContent=Number(errorsElm.textContent)+1;
}))
