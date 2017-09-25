//--- --- Global Variable Definitions --- ---

var gameMode = "playerSelect";
var knights = [];
var player = null;
var defenderIndex = null;
var knightsDefeated = 0;

//--- --- Global Function / Object Definitions --- ---

//constructor array for knights
function Knight(name, hp, attack, counterattack, isPlayer, isDefender) {
  this.name = name;
  this.hp = hp;
  this.attack = attack;
  this.counterattack = counterattack;
  // this.isPlayer = isPlayer;
  // this.isDefender = isDefender;
}

//set knights back to initial state, restart game mode, hides win/loss panels
function initialize(){
  knights = [];
  knights[0] = new Knight('Lancelot', 100, 10, 10);
  knights[1] = new Knight('Galahad', 30, 10, 10);
  knights[2] = new Knight('Kay', 110, 10, 10);
  knights[3] = new Knight('Gawain', 100, 10, 10);

  knightsDefeated = 0;

  gameMode = "playerSelect";

  $('#victory-panel').hide();
  $('#defeat-panel').hide();

  drawScreen();
}

//performs attack and couterattack calculations, checks win/lose conditions
function attackRound(){

  knights[defenderIndex].hp -= player.attack;
  $('#battle-output').text('You attack '+knights[defenderIndex].name +' for ' +player.attack +' damage!');
  player.attack += player.attack;

  if(knights[defenderIndex].hp < 1){
      knights[defenderIndex].hp = 0;
      $('#battle-output').append('<h3>' + knights[defenderIndex].name + ' is defeated!</h3>');
      knightsDefeated++;
  }

  else{
    player.hp -= knights[defenderIndex].counterattack;
    $('#battle-output').append('<h3>' + knights[defenderIndex].name + ' hits back for ' + knights[defenderIndex].counterattack + ' damage!</h3>');
  }

  if(player.hp < 1){
    gameMode = 'defeat';
  }

  else if(knightsDefeated === knights.length){
    gameMode = 'victory';
  }

//INSERT WINGAME / LOSEGAME CHECK

  // if(player.hp < 1){
  //  gameMode = 'defeat';
  // }

  // if(knightsDefeated === knights.length){
  //  gameMode = 'victory';
  // }

  drawScreen();

}



//evaluates game mode and displays appropriate elements
function drawScreen(){
  switch(gameMode){
    case "playerSelect": 
      //Shows only player select panel
      $('#player-select-panel').show();
      $('#opponent-select-panel').hide();
      $('#battle-panel').hide();

      
      //Fills each column with HTML snippet for each knight
      for(i = 0; i < knights.length; i++){
        $('#player-select-' +i).html(
          '<img class="knight-portrait" src="assets/images/'+knights[i].name.toLowerCase()+'-portrait.png"><h2>'+knights[i].name+'</h2><h3>'+knights[i].hp+'</h3>'
        );
      }

      break;    

    case "opponentSelect":
      // Shows only opponent select panel
      $('#player-select-panel').hide();
      $('#opponent-select-panel').show();
      $('#battle-panel').hide();

      //Fills each column with HTML snippet for each knight
      for(i = 0; i < knights.length; i++){
        //If opponent already defeated, adds defeated class
        if(knights[i].hp < 1){
          $('#opponent-select-' +i).addClass('defeated');
          // $('#opponent-select-' +i).removeClass('opponent-select-box');
        }
        else{
          $('#opponent-select-' +i).removeClass('defeated');
        }

        $('#opponent-select-' +i).html(
          '<img class="knight-portrait" src="assets/images/'+knights[i].name+'.png"><h2>'+knights[i].name+'</h2><h3>'+knights[i].hp+'</h3>'
        );
      }

      break;

    case "battle":
      $('#player-select-panel').hide();
      $('#opponent-select-panel').hide();
      $('#battle-panel').show();

      //Only show attack button until opponent defeated, then show next button
      if( knights[defenderIndex].hp < 1 ){
        $('#attack-button').hide();
        $('#next-opponent-button').show();
      }
      else{
        $('#attack-button').show();
        $('#next-opponent-button').hide();
      }

      $('#player-image').html(
          '<img class="knight-portrait" src="assets/images/'+player.name+'.png">'
        );
      $('#player-name').text(player.name);
      $('#player-hp').text(player.hp);


      $('#defender-image').html(
          '<img class="knight-portrait" src="assets/images/'+knights[defenderIndex].name+'.png">'
        );
      $('#opponent-name').text(knights[defenderIndex].name);
      $('#opponent-hp').text(knights[defenderIndex].hp);

      //Win/Loss Check

      

      break;    

    case "victory":
      $('#player-select-panel').hide();
      $('#opponent-select-panel').hide();
      $('#battle-panel').hide();
      $('#victory-panel').show();
      break;

    case "defeat":
      $('#player-select-panel').hide();
      $('#opponent-select-panel').hide();
      $('#battle-panel').hide();
      $('#defeat-panel').show();
      break;

  }
}

//--- --- Main Logic --- ---

initialize();

console.log(knights);


//When Player Select knight is clicked, selected knight object is assigned to Player and removed from Knights array
$('.player-select-box').on("click", function(){
  
  player = (knights[this.id[14]]);
  knights.splice([this.id[14]], 1);

  console.log('Player: ' +player.name);

  gameMode = "opponentSelect";
  drawScreen();
});

$('.opponent-select-box').on("click", function(){
  
  //if a knight is already defeated, cannot be selected
  if(knights[this.id[16]].hp < 1){
    return;
  }

  defenderIndex = [this.id[16]];

  gameMode = "battle";

  console.log("Defender: " +knights[defenderIndex].name);
  drawScreen();
});

$('#attack-button').on("click", function(){
  
  attackRound();

});

$('#next-opponent-button').on("click", function(){
  
  $('#battle-output').text('');
  gameMode = 'opponentSelect';
  drawScreen();

});

$('.restart-button').on("click", function(){

  initialize();

});



/*--- --- PSEUDO CODE --- ---

Pseudo Code
On load, present with character select screen (initialize, drawscreen)
  On click, assign clicked character to player character, change gameMode to 'opponentSelect'
  
Present with Select Opponent screen
  If no valid opponents, GAME WIN
  On click, change gameMode to 'battle'

Battle Mode:

  On click of "Attack Button", do fight math.
  Draw Screen
  If player wins, change gameMode to opponentSelect
  If player loses, GAME OVER

Drawscreen:
  If drawMode === 'playerSelect', 
  Append Each Portrait + Name to Main Panel
  
  If  drawMode === 'opponentSelect'
  Append Each Non-player Panel to Main Panel, grey out Defeated Opponents

Initialize:
  Set counters to 0 except Wins / Losses


  "Through your prowess at arms, you have defeated X Y and Z and recovered the Holy Grail for Camelot."

Notes:

Replace placeholder texts
Update styling
Adjust knight stats to improve gameplay
Add "-defeated" images
**Make game wait for "Continue" before Loss or Victory screen**

*/