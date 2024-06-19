var btn="div[type='button']"
var level = 1;
var colors=["green","red","yellow","blue"];
var random_colors=[];
var clicked_color = [];


$(document).on("keypress",nextSequence);
    

function playAudio(ind){
    var audio = ['./sounds/green.mp3','./sounds/red.mp3','./sounds/yellow.mp3','./sounds/blue.mp3']
    var ad = new Audio(audio[ind]);
    ad.play();
    $(btn).eq(ind).addClass("pressed");
    setTimeout(function() {
        $(btn).eq(ind).removeClass("pressed");
    }, 100);
        
}
function nextSequence() {
    $(document).off("keypress");
    $("h1").text("Level " + level);
    var random_index = Math.floor(Math.random() * 4);
    random_colors.push(colors[random_index]);
    
    for (var i = 0; i < random_colors.length; i++) {
        (function(index) {
            setTimeout(function() {
                var colorIndex = colors.indexOf(random_colors[index]);
                playAudio(colorIndex);
            }, 500 * index); // Adjusted timeout to 500ms for clarity
        })(i);
    }
    gameStart();   
}

function gameStart(){
    $(btn).off("click"); 
    
    $(btn).on("click",function(){
        var n = $(btn).index(this);
        clicked_color.push(colors[n]);
        playAudio(n);
        
        for(i=0;i<clicked_color.length;i++){
            if(random_colors[i]!=clicked_color[i]){
                wr = new Audio('./sounds/wrong.mp3');
                wr.play();
                $("body").addClass("game-over");
                $("h1").text("Game Over, Press Any Key to Restart");
                setTimeout(startOver, 1000) ; // Restart the game
                return;
            }
        }   
        if (clicked_color.length === random_colors.length) {
            clicked_color = []; // Reset the clicked color array
            level++; // Increase the level
            setTimeout(nextSequence, 1000); // Proceed to the next sequence after a delay
        }

    })


}
function startOver() {
    $("body").removeClass("game-over");
    level = 1;
    random_colors = [];
    clicked_color = [];
    $(document).on("keypress", nextSequence); // Re-enable keypress to restart the game
}




    //alert(random_colors[i]+" "+clicked_color[i]);


  