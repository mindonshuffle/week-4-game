//--- --- Global Variable Definitions --- ---

var gameMode = "playerSelect";
var knights = [];
var playerKnight = null;
var opponentKnights = [];


//--- --- Global Function / Object Definitions --- ---

//constructor array for knights
function Knight(name, hp, attack, counterattack, isPlayer, isDefender) {
  this.name = name;
  this.hp = attack;
  this.counterattack = counterattack;
  this.isPlayer = isPlayer;
  this.isDefender = isDefender;
}

//set knights back to initial state, restart game mode
function initialize(){
	knights[0] = new Knight('Lancelot', 100, 10, 10, false, false);
	knights[1] = new Knight('Galahad', 100, 10, 10, false, false);
	knights[2] = new Knight('Kay', 100, 10, 10, false, false);
	knights[3] = new Knight('Gawain', 100, 10, 10, false, false);

	gameMode = "playerSelect";

	drawScreen();
}

function drawScreen(){
	switch(gameMode){
		case "playerSelect": 
			$('#player-select-panel').removeClass('hidden');
			$('#opponent-select-panel').addClass('hidden');
			$('#battle-panel').addClass('hidden');
			break;		

		case "opponentSelect":
			$('#player-select-panel').addClass('hidden');
			$('#opponent-select-panel').removeClass('hidden');
			$('#battle-panel').addClass('hidden');
			break;

		case "battle":
			$('#player-select-panel').addClass('hidden');
			$('#opponent-select-panel').addClass('hidden');
			$('#battle-panel').removeClass('hidden');
			break;		
				
	}
}

//--- --- Main Logic --- ---

initialize();



for( i = 0; i < knights.length; i++){
	console.log(knights[i]);
}




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

*/