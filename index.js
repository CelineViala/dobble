const app={
    n:7,
    nbCards:57,
    nbSymbols:57,
    INF:null,
    arrayCard:null,
    symbols:[],
    sameImg:null,
    modelCard:null,
    currentCard:null,
    idInterval:null,
    domElms:{
        cardsContainer:document.querySelector(".cards"),
        rules:document.querySelector(".rules"),
        cards:null,
        model:document.querySelector(".model"),
        current:document.querySelector(".current"),
        images:null,
        nbrCards:document.querySelector(".nbrCards"),
        minutes:document.querySelector(".minutes"),
        seconds:document.querySelector(".seconds"),
        errors:document.querySelector(".errors"),
        startBtn:document.querySelector(".startBtn"),
        presentation:document.querySelector(".presentation"),
        game:document.querySelector(".game"),
        info:document.querySelector(".info"),
        endText:document.querySelector(".endText"),
        
    },
    init(){
        this.INF=this.n
        this.arrayCard=[[this.INF,0],[this.INF,this.INF],[this.INF,2*this.INF],[this.INF,3*this.INF],[this.INF,4*this.INF],[this.INF,5*this.INF],[this.INF,6*this.INF],[0,this.INF]]
        console.log(this.domElms.cardsContainer)
        this.domElms.minutes.textContent="00";
        this.domElms.seconds.textContent="00";
        this.domElms.nbrCards.textContent=this.nbCards-1;
        this.generateNCards();
        this.setCoordinateToCards();
        this.fillSymbolsArray();
        this.fillCards();
        this.domElms.images=document.querySelectorAll('.animal');
        this.formateCards();
        this.addEvents();
        this.startGame();
     
    },
    generateNCards(){
        this.domElms.current.innerHTML="";
        this.domElms.model.innerHTML="";
        this.domElms.cardsContainer.innerHTML="";
        for (let i = 0; i < this.nbCards; i++) {
            const cardElm=document.createElement('div');
            cardElm.classList.add("card");
            cardElm.classList.add(`card${i}`);
            this.domElms.cardsContainer.appendChild(cardElm);
        }
        this.domElms.cards=document.querySelectorAll(".card");

    },
    setCoordinateToCards(){
        let x=0;
        let y=0;
        let ind=0;

        this.domElms.cards.forEach(card=>{
            if(x==this.n){
                console.log(this.arrayCard,ind,x,y,this.n)
                card.setAttribute("data-x",this.arrayCard[ind][0]);
                card.setAttribute("data-y",this.arrayCard[ind][1]); 
                //card.style.transform="rotate(90deg)";
                ind++;
            }
            else{
                card.setAttribute("data-x",x);
                card.setAttribute("data-y",y);
                if (x<this.n)y+=1;
                if (y===this.n||x==this.INF) {
                    if(x<this.n)
                    {
                        y=0;
                        x+=1;
                    }
                }   
            }
        }) 
    },
    fillSymbolsArray(){
        for (let i = 1; i <=this.nbCards; i++) {
            this.symbols.push("p"+i);
        }
    },
    getY(a,x,b){
        return (a*x+b)%(this.n);
    },
    fillCards(){
        let symbol=0
        let i=0
        for (let a = 0; a < this.n; a++) {
            for (let b = 0; b < this.n; b++) {
                for (let x = 0; x < this.n; x++) {
        
                    const card= document.querySelector(`[data-x="${x}"][data-y="${this.getY(a,x,b)}"]`);
                    card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;
                    i++;    
                }
                const card= document.querySelector(`[data-x="${this.INF}"][data-y="${a*this.INF}"]`);
                card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;
                
                symbol+=1
            }
        }
        //symbole de type x=b
        for (let x = 0; x < this.n; x++) {
            for (let y = 0; y < this.n; y++) {
                console.log(x,y)
                const card= document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                    
                card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;
            }
            const card= document.querySelector(`[data-x="${0}"][data-y="${this.INF}"]`);
            card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;
            symbol+=1
    
        }

        //droite à l'infini
        for (let i = 0; i < this.n; i++) {
            const card= document.querySelector(`[data-x="${this.INF}"][data-y="${i*this.INF}"]`);
            card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;

            
        }
        const card= document.querySelector(`[data-x="${0}"][data-y="${this.INF}"]`);
        card.innerHTML+=`<img class='animal' src='animals/${this.symbols[symbol]}.png'>`;
    },
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    },
    formateCards(){
        this.domElms.cards.forEach(card => {
            let animals= []
            const imgs=card.querySelectorAll('.animal');
            imgs.forEach(img => {
                animals.push(card.removeChild(img));
            });
            animals=animals.sort((a, b) => 0.5 - Math.random())
            
            animals.forEach(animal=> {
                card.appendChild(animal);
                animal.style.transform=`rotate(${this.getRandom(0,360)}deg)`;
                animal.style.width=`${this.getRandom(15,20)}%`;
            })
        });
    },
    startGame(){
        this.modelCard = this.domElms.cards[Math.floor(Math.random()*this.domElms.cards.length)];
        this.currentCard=this.domElms.cards[Math.floor(Math.random()*this.domElms.cards.length)];


        while(this.currentCard==this.modelCard){
            this.currentCard=this.domElms.cards[Math.floor(Math.random()*this.domElms.cards.length)];
        }
        this.modelCard.style.display="block";
        this.currentCard.style.display="block";
        this.domElms.model.appendChild(this.modelCard);
        this.domElms.current.appendChild(this.currentCard);
        this.sameImg=this.getSameImg(this.modelCard,this.currentCard);
    
    },
    getSameImg(model,current){
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
    },
    displayEndOfGame(){
        this.domElms.game.style.display="none";
        this.domElms.presentation.style.display="flex";
        this.domElms.rules.innerHTML="";
        this.domElms.endText.textContent="Partie terminée. BRAVO !";
        this.domElms.startBtn.textContent="REJOUER";
        

    },
    handleWin(){
        console.log("test")
        this.domElms.model.removeChild(this.modelCard);
        this.domElms.nbrCards.textContent=Number(this.domElms.nbrCards.textContent)-1;
        this.domElms.model.appendChild(this.currentCard);
        this.modelCard=this.currentCard;
        this.domElms.cards=document.querySelectorAll(".card");
        if(!document.querySelector(".cards").children.length) {
            console.log("FINI");
            clearInterval(this.idInterval);
            this.displayEndOfGame();
            return;
        }
        this.currentCard=this.domElms.cards[Math.floor(Math.random()*this.domElms.cards.length)];
        while(this.currentCard==this.modelCard){
            this.currentCard=this.domElms.cards[Math.floor(Math.random()*this.domElms.cards.length)];
        }
        this.currentCard.style.display="block";
        this.sameImg=this.getSameImg(this.modelCard,this.currentCard);
        this.domElms.current.appendChild(this.currentCard);
    },
    startsTimer(){
        let time=0
        this.idInterval=setInterval(() => {
            time+=1;
            if(Math.round(time/60)=== 60) time=0
            this.domElms.minutes.textContent= time/60<10? "0" + Math.round(time/60):Math.round(time/60)
            this.domElms.seconds.textContent=time%60<10? "0"+time%60:time%60;
            
        }, 1000);
    },
    addEvents(){
        console.log(this.domElms.images)
        this.domElms.images.forEach(img=> img.addEventListener("click",(e)=>{
            console.log(e.target)
            if(app.sameImg==e.target.getAttribute("src")) this.handleWin();
            else this.domElms.errors.textContent=Number(this.domElms.errors.textContent)+1;
        }))
        this.domElms.startBtn.addEventListener("click",(e)=>{
            if(e.target.textContent=="REJOUER") app.init();
            this.domElms.presentation.style.display="none";
            app.domElms.game.style.display="flex";
            app.domElms.info.style.display="block";
            clearInterval(this.idInterval);
            this.startsTimer();
            

        })
    }
}
app.init()
