const readline = require("readline");
const readlineInterface = readline.createInterface(
	process.stdin,
	process.stdout
);
// ! Do you like colors? I like colors. I apologize if you're color-blind to the colors I use in this adventure. It's to help differentiate between what's a route and a description.
const orange = "\033[33m";
const white = "\033[39m";
const red = "\033[91m";
function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// Inventory function: Array that pops and pushes from room to player
let playerInv = ["Postcard"]
// ! This is my state machine. UNDER CONSTRUCTION
let currentLocation;
start();
// Build room constructor (Reference classes.js), build item constructor (Same shtick) make a new object off of each

class Item {
	constructor(name, desc) {
		this.name = name;
		this.description = desc;
	}
}

class Room {
	constructor(name, desc) {
		this.name = name;
		this.description = desc;
		this.roomInventory = [];
	}
}
let foyer = new Room("foyer", `${orange}The door opens with a complaining screech. While not the most inviting site, at least it's not raining in here. The first thing you notice is there are no working lights in here (Not electric ones at least), and it smells like fish. There are stairs to your left going up, and a hallway with rooms on the right.`)

let stairs = new Room("stairs", `Every step you take up these incredibly delapitated steps creaks as though it's about to break. Blessedly, they do not. Once you reach the top and your ears stop ringing from the creaking, you note the very open, very much broken window at end of the hall on the right. So much for avoiding that cold. You see a multitude of doors before you to your left and right.`)

let hallway = new Room("hallway", `The hallway is a musty unpleasant site, with a shattered sparking light bulb to illuminate the area. You see a portrait on the wall which is slightly crooked, and a jar on the floor. The first right leads to the living room, while the next leads to the kitchen.`)

let livingroom = new Room("living room", `The living room is an utter disaster. Wet stuffing and feathers are strewn about the room, and the smell of mildew seems to dampen whatever was producing that fishy odor.  You see bookshelves on the far wall, what you think might once have been a couch on the right, and a tv on the left`)

let kitchen = new Room("kitchen", `The kitchen is a dark and damp area, lit only by an open refridgerator light on the wall to the left. Preparing your nose for a horrendoues stench, you are relieved to find that the smell of fish isn't that strong here. Oddly enough. The dining table to your left holds a tattered moldy table cloth and a note.`)

let bathroom = new Room("bathroom", `The bathroom is, to put it gently, disgusting. Rather than smelling fish, you smell excrement in large volumes and an overpowering aroma of ammonia. What happened in here is anyones guess, but between tears and gags you glimpse what you swear is a squidlike eyeball in the toilet.`)

let guestbathroom = new Room("guest bathroom", `The guest bathroom is possibly the strangest part of this house. In stark contrast to the dark, damp, smelly and disturbing rest of the interior, this room is sparkling clean, with a gentle LED white light in the ceiling. It smells vaguely like air freshner. As soon as you blink it's gone. Where you once thought there was a bathroom, there is instead a hole. You swear you hear a voice at the bottom calling out...`)

let hole = new Room("hole", `You're falling down a hole.`)

let roomStates = {
	foyer: ["stairs", "hallway"],
	hallway: ["foyer", "living room", "kitchen", "basement"],
	"living room": ["hallway"],
	kitchen: ["hallway", "bathroom"],
	bathroom: ["kitchen"],
	stairs: [
		"foyer",
		"master bedroom",
		"guest bedroom",
		"guest bathroom",
		"attic",
	],
	"guest bathroom": ["hole", "stairs"],
};

// ! This is where the state machine ends. At least, the map of it. The part YOU see is much further down...

// ! These are descriptions of all the things. Rooms and items at least. It begins here
let descriptions = {
	foyer:
		orange +
		"The door opens with a complaining screech. While not the most inviting site, at least it's not raining in here. The first thing you notice is there are no working lights in here (Not electric ones at least), and it smells like fish. There are stairs to your left going up, and a hallway with rooms on the right.",
	hallway:
		orange +
		"The hallway is a musty unpleasant site, with a shattered sparking light bulb to illuminate the area. You see a portrait on the wall which is slightly crooked, and a jar on the floor. The first right leads to the living room, while the next leads to the kitchen.",
	"living room":
		orange +
		"The living room is an utter disaster. Wet stuffing and feathers are strewn about the room, and the smell of mildew seems to dampen whatever was producing that fishy odor.  You see bookshelves on the far wall, what you think might once have been a couch on the right, and a tv on the left",
	kitchen:
		orange +
		"The kitchen is a dark and damp area, lit only by an open refridgerator light on the wall to the left. Preparing your nose for a horrendoues stench, you are relieved to find that the smell of fish isn't that strong here. Oddly enough. The dining table to your left holds a tattered moldy table cloth and a note.",
	bathroom:
		orange +
		"The bathroom is, to put it gently, disgusting. Rather than smelling fish, you smell excrement in large volumes and an overpowering aroma of ammonia. What happened in here is anyones guess, but between tears and gags you glimpse what you swear is a squidlike eyeball in the toilet.",
	stairs:
		orange +
		"Every step you take up these incredibly delapitated steps creaks as though it's about to break. Blessedly, they do not. Once you reach the top and your ears stop ringing from the creaking, you note the very open, very much broken window at end of the hall on the right. So much for avoiding that cold. You see a multitude of doors before you to your left and right.",
	"guest bathroom":
		orange +
		"The guest bathroom is possibly the strangest part of this house. In stark contrast to the dark, damp, smelly and disturbing rest of the interior, this room is sparkling clean, with a gentle LED white light in the ceiling. It smells vaguely like air freshner. As soon as you blink it's gone. Where you once thought there was a bathroom, there is instead a hole. You swear you hear a voice at the bottom calling out...",
};
// ! And the descriptions end here.

// ! Variables, objects, class constructors, room inventory
// ! Where the game begins.
async function start() {
	const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. It's raining, and 6 o' clock in the afternoon - If the clocktower is to be trusted. You can see your breath, and feel a shiver go up your spine. You should probably get inside. With the key you were given.`;
	// ! Type in "enter" to not catch a cold and die.
	let answer = await ask(welcomeMessage);
	// depending on answer,
	// can assign ask to a variable
	// console.log('Now write your code to make this work!');
	if (answer == "enter") {
		currentLocation = foyer;
		// desc. console log here
	} else if 
		(answer == "Inventory" || "Open inventory" || "View inventory"){
		console.log(playerInv)
	} else {
		console.log("... Fine, you catch a cold and die. The end.");
		process.exit();
	}

	let game = true;
	while (game) {
		console.log(
			"You're currently in the " +
				currentLocation +
				"\n" +
				descriptions[currentLocation]
		);
		// Death Message beginings
		if (currentLocation == "hole") {
			console.log(
				orange +
					"You fall down an impossibly deep hole. While falling, you see glints of green, and that weird smell of fish. ... You know, I really feel like you should've hi-"
			);
			process.exit();
		}
		// Death Message ends

		console.log(red + roomStates[currentLocation].join(", "));
		let answer = await ask(white + "Where will you go? What will you do? >_");
		if (roomStates[currentLocation].includes(answer)) {
			currentLocation = answer;
			console.log(currentLocation);
		}
	}
	process.exit();
}
