
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickPattern = [];
var level = 0;
var gameToggle = false;


// Mendeteksi input dan menyimpan input kedalam array - 1
// $(".btn").click(function() {
//     //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//     var userChosenColour = $(this).attr("id");
  
//     //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
//     userClickPattern.push(userChosenColour);
  
//     //console.log(userClickedPattern);
//     console.log(userClickPattern);
  
//   });

// Mendeteksi input dan menyimpan input kedalam array - 2
$(".btn").click(function(event){ // target class "btn" 
    var userChosenColour = event.target.id; // Masukan input klik ke dalam variable
    userClickPattern.push(userChosenColour); // Masukan nilai pada variable ke dalam array kosong
    console.log(userClickPattern);
    playSound(userChosenColour); // Memanggil fungsi memainkan suara untuk tombol yang ditekan
    pressButton(userChosenColour); 
    checkAnswer(userClickPattern.length-1);

    console.log(userClickPattern.length);
    console.log(gamePattern.length)
});

$(document).keypress(function(){ // Memulai game dengan menekan tombol apapun
    if(gameToggle == false){     // 
        nextSequence();
        gameToggle = true;
    }
});



// console.log(gameToggle);

function nextSequence(){
    userClickPattern = [];
    level ++; // menaikan level setiap funsi sequence di panggil
    // Membuat angka acak dari 0-3
    var randomNumber = Math.floor(Math.random()*4);

    // Variable untuk menampung warna acak dari array
    var randomChosenColors = buttonColors[randomNumber];

    // menambahkan warna terpilih dari warna acak ke array 
    gamePattern.push(randomChosenColors);

    // Memberi efek flash pada masing-masing button yang tergenerate secara acak
    $("#" + randomChosenColors).fadeOut(100).fadeIn(100);

    // Memberi suara pada masing masing button yang tergenerate secara acak
    // var sounds = new Audio("sounds/"+randomChosenColors+".mp3");
    // sounds.play();
    playSound(randomChosenColors);
    $("#level-title").text("Level "+level);
    
    console.log(gamePattern);
}

function playSound(coloursName){ // fungsi untuk memainkan suara sesuai warna yang di tekan

    var sounds = new Audio("sounds/"+coloursName+".mp3"); // memainkan suara 
    sounds.play();
}

function pressButton(coloursName){
    $("#"+coloursName).addClass("pressed");
    setTimeout(function (){
        $("#"+coloursName).removeClass("pressed")
    },100);
}

function checkAnswer(level){
    if(userClickPattern[level] == gamePattern[level]){ // mengecek apakah isi array sama atau tidak
        console.log("success");

        if(userClickPattern.length==gamePattern.length){ // apabila isi array sama dan panjang array sama maka panggil sequence berikutnya
            setTimeout(nextSequence,1000);
        }

    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        newGame();
    }
}

function newGame(){
    level = 0;
    gamePattern = [];
    gameToggle = false;
}

