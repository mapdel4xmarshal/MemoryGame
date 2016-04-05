CardArray = [];

//Creates an Array Of Card Objects
function Populate(i,back_val, front_val, position_val) {
    CardArray[i] = new Card(back_val, front_val, position_val); //{back :back_val, front:front_val, position:position_val};	
}

function Card(bck, frnt, pos)
{
    this.back = bck;
    this.front = frnt;
    this.position = pos;
    
    this.reveal = function(){
        this.back = this.front;
    }
}


function Game()
{
    //  this.type = type;
    this.color = "red";
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
                ("<div><img src=\"" + CardArray[i].back + "\" alt=\"Card\" class=\"myimgstyle   w3-center w3-animate-opacity\"  id=\"myimgstyle-" + CardArray[i].position + "\"></div>")
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
    
    document.getElementById("Game").innerHTML = ''; 
    for(i = 0; i < CardArray.length; i++)
        {
            document.getElementById("Game").innerHTML = document.getElementById("Game").innerHTML + 
                ("<div><img src=\"" + CardArray[i].front + "\" alt=\"Card\" class=\"myimgstyle w3-center w3-animate-opacity\"  id=\"myimgstyle-" + CardArray[i].position + "\"></div>")
        }
};

//-- EVENT HANDLERS
window.onload = function () 
{	
    var gamez = new Game();    
        gamez.Init();
	
    document.getElementById('reset').onclick = function()
	{	 
        gamez.Reset();
        gamez.Init();
	}
    
    document.getElementById('start').onclick = function()
	{		
        gamez.Reset();
        gamez.Start(); 
	}
    
    document.getElementById('Game').onclick = function()
	{		
        gamez.Reset();
        gamez.Start(); 
	}
}


