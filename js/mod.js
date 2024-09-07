let modInfo = {
	name: "The Time Tree",
	id: "22222",
	author: "22222",
	pointsName: "时间点",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.5",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.5</h3><br>
	- 更新内容.<br>
	- 残局:25时间之沙.<br>
	- v0.04.<br>
	- 更新qol.<br>
	- 残局:e128秒,e114时间点,7时间机器.<br>
	- v0.03.<br>
	- 更新4个里程碑.<br>
	- 更新第2层级.<br>
	- 残局:e57秒,e40时间点,4时间机器.<br>
	- v0.02.<br>
	- 更新3个升级.<br>
	- 调整数值.<br>
	- 残局:e45秒.<br>
	- v0.01.<br>
	- 更新12个升级.<br>
	- 残局:e23500000秒.`

let winText = `恭喜！你 >暂时< 通关了！`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("S",11)) gain = gain.mul(upgradeEffect("S",11))
	if(hasUpgrade("S",12)) gain = gain.mul(player.S.points.add(1).pow(0.5))
	if(hasMilestone("S",0)) gain = gain.mul(2)
	if(hasMilestone("T",0)) gain = gain.mul(10)
	if(hasUpgrade("S",21)) gain = gain.mul(player.points.add(1).pow(0.125))
	if(hasMilestone("S",2)) gain = gain.mul(4)
	if(hasUpgrade("S",31)) gain = gain.mul(player.points.add(1).pow(0.05))
	if(hasUpgrade("S",53)) gain = gain.mul(player.S.points.add(1).pow(0.05))
	if(hasChallenge("T",11)) gain = gain.pow(1.1)
	if(inChallenge("T",11)) gain = gain.pow(0.5)
	if(hasUpgrade("S",14)) gain = gain.mul(60)
	if(hasMilestone("T",4)) gain = gain.mul(player.T.points.pow(10).add(1))
	if(inChallenge("T" ,12))gain = gain . div(new Decimal (1e18). pow( challengeCompletions("T" ,12)+1))
	if(hasUpgrade("S",24)) gain = gain.mul(777600000)
	
	

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return "作者是22222，qq 2960729702."},

]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e114"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
