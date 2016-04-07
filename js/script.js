CardArray = [];

//Creates an Array Of Card Objects
function Populate(i,back_val, front_val, position_val) {
    CardArray[i] = new Card(back_val, front_val, position_val);
}

function Timer()
{    
    this.initTimer = function()
    {
        document.getElementById("myscoreboard").innerHTML = "<div class=\"container-fluid scoreboard-back\">" +
        "<div class=\"row-fluid\">" +
            "<h3 class=\"our-name team-score data-us text-align-center\">TIME - <label id=\"minutes\">00</label>:<label id=\"seconds\">00</label></h3>" +
            "<h3 class=\"their-name team-score data-them text-align-center\">MOVES : <label id=\"TotalMoves\"></label>  </h3>" +
        "</div>" +
    "</div>";
    }
                
    this.doUpdateTimer = function()
    {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
    }
}


function Card(bck, frnt, pos)
{
    this.back = bck;
    this.front = frnt;
    this.position = pos;
    
    this.show = function(){
        //this.back = this.front;
        document.getElementById('myimgstyle-' + (this.position)).firstElementChild.src = this.front;
    }
    
    this.reveal = function(){
        this.back = this.front;        
    }
    
    this.reset = function(){
       document.getElementById('myimgstyle-' + (this.position)).firstElementChild.src = this.back;      
    }
}


function Game()
{
    this.moves = -1;
}

Game.prototype.updatemoves = function()
{
    this.moves++;
    document.getElementById("TotalMoves").innerHTML = this.moves;    
}

Game.prototype.Init = function(){
    for(i = 0; i < 12; i++)
        {
            Populate(i,'images/default.jpg',"",i + 1);
        }
}

Game.prototype.Reset = function(){
    document.getElementById("Game").innerHTML = ''; 
    for(i = 0; i < CardArray.length; i++)
        {
            document.getElementById("Game").innerHTML = document.getElementById("Game").innerHTML + 
                ("<div class=\"myjsclass\" id=\"myimgstyle-" + CardArray[i].position + "\"><img src=\"" + CardArray[i].back + "\" alt=\"Card\" class=\"myimgstyle   w3-center w3-animate-opacity\"  id=\"myimgstyle-" + CardArray[i].position + "\"></div>")
        }
}
    
Game.prototype.Start = function(){      
    var arraySize = 0;
    while(arraySize < 12)
        {
           // CardArray('images/1.png','',CardArray.length);
            var y = Math.floor((Math.random() * 12)); 
            var x = Math.floor((Math.random() * 6) + 1);  
            
            if(CardArray[y].front == "")
                {
                    var count = 0;
                    for(i = 0; i < 13; i++)
                        {
                            if(typeof CardArray[i] != "undefined" && CardArray[i].front == ("images/"+ x + ".png"))   
                            count++;
                        }
                    if(count < 2)
                        {                     
                            CardArray[y].front = ("images/"+ x + ".png");
                            arraySize++;
                        }
                }            
        }
};

var gamez = new Game();  
var timer = new Timer();

var currntclicked = -1;  
var FirstMove;
var clicks = 0;
var revealed = 0;

window.onload = function()
{
    gamez.Init();   
    FirstMove = true;
} 

//-- EVENT HANDLERS
window.onclick = function () 
{	
    var e = window.event;
    e = e.target || e.srcElement;
    
    document.getElementById('reset').onclick = function()
	{	 
        gamez.Reset();
       // gamez.Init();
	}
    
  if(e.id === 'start')
	{		
        timer.initTimer();
        gamez.Reset();
        gamez.Start(); 
        timer.doUpdateTimer();
        gamez.updatemoves();
	}
    
  if(document.getElementById(e.id).className === 'myjsclass')
	{	               
       
        index = e.id.substring(e.id.indexOf('myimgstyle-') + 'myimgstyle-'.length,e.id.length);
        
        if(revealed < (CardArray.length / 2))
           {           
                if(document.getElementById(e.id).firstElementChild.src.indexOf("images/default.jpg") > -1)
                {
                    CardArray[index-1].show();
                    gamez.updatemoves();
                    lastclicked = currntclicked;
                    currntclicked = index-1;
                    if(lastclicked == -1)lastclicked = currntclicked;
                    clicks++;

                    window.setTimeout(function() 
                    {
                        if(clicks == 2)
                        {
                            clicks = 0;
                            if(CardArray[currntclicked].front != CardArray[lastclicked].front)
                                {
                                    CardArray[currntclicked].reset();
                                    CardArray[lastclicked].reset();
                                }
                            else
                            {
                                revealed++;
                            }
                        }
                    }, 1000);
                }
          }
    else
        {
            alert("game won!!!!");
        }
	}           
    
}

/*

 if(CardArray[currntclicked].back != CardArray[currntclicked].front)
                {
                    if(CardArray[lastclicked].back != CardArray[lastclicked].front)
                    {

                    }
                }


$('.myjsclass').click(function()
    {
        var clickedID = this.id;
        alert('The id of the element you clicked: ' + this.id);
    });
*/