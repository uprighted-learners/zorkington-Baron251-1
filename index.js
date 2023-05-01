const readline = require("readline");
const readlineInterface = readline.createInterface(
	process.stdin,
	process.stdout
	);
	// ! Do you like colors? I like colors. I apologize if you're color-blind to the colors I use in this adventure. It's to help differentiate between what's a route and a description.
	// const orange = "\033[33m";
	// const white = "\033[39m";
	// const red = "\033[91m";
function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// Inventory function: Array that pops and pushes from room to player
let currentLocation;
start();
// Build room constructor (Reference classes.js), build item constructor (Same shtick) make a new object off of each

// ! Variables, objects, class constructors, room inventory
class Item {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
}

class Room {
	constructor({ name, description, roomInventory, possibility }) {
		this.name = name;
		this.description = description;
		this.roomInventory = roomInventory;
		this.possibility = possibility;
	}
	removeFromInv(item) {
		this.roomInventory.pop(item)
	}
}

class Player {
	constructor({ playerInv }) {
		this.playerInv = playerInv;
	}
	addToInv(item) {
		this.playerInv.push(item);
	}
}

let player = new Player({
	playerInv: [],
});

let foyer = new Room({
	name: "foyer",
	description: `The door opens with a complaining screech. While not the most inviting site, at least it's not raining in here. The first thing you notice is there are no working lights in here (Not electric ones at least), and it smells like fish. There are stairs to your left going up, and a hallway with rooms on the right.`,
	roomInventory: [{ item: "Mulligan", description: "This is an item" }],
	possibility: ["stairs", "hallway"],
});

let stairs = new Room({
	name: "stairs",
	description: `Every step you take up these incredibly delapitated steps creaks as though it's about to break. Blessedly, they do not. Once you reach the top and your ears stop ringing from the creaking, you note the very open, very much broken blasted and burnt roof above you. So much for avoiding that cold. The only room to have miraculously survived whatever happened up here is what you can only guess is the guest bathroom `,
	roomInventory: [{}],
	possibility: ["foyer", "guest bathroom"],
});

let hallway = new Room({
	name: "hallway",
	description: `The hallway is a musty unpleasant site, with a shattered sparking light bulb to illuminate the area. You see a portrait on the wall which is slightly crooked, and a jar on the floor. The first right leads to the living room, while the next leads to the kitchen.`,
	roomInventory: [{}],
	possibility: ["foyer", "living room", "kitchen", "basement"],
});

let livingroom = new Room({
	name: "living room",
	description: `The living room is an utter disaster. Wet stuffing and feathers are strewn about the room, and the smell of mildew seems to dampen whatever was producing that fishy odor.  You see bookshelves on the far wall, what you think might once have been a couch on the right, and a tv on the left`,
	roomInventory: [{}],
	possibility: ["hallway"],
});

let kitchen = new Room({
	name: "kitchen",
	description: `The kitchen is a dark and damp area, lit only by an open refridgerator light on the wall to the left. Preparing your nose for a horrendoues stench, you are relieved to find that the smell of fish isn't that strong here. Oddly enough. The dining table to your left holds a tattered moldy table cloth and a note.`,
	roomInventory: [
		{
			item: "Basement Key",
			description:
			"This key has a note wrapped around it. The note reads 'Beware what lies beneath'.",
		},
	],
	possibility: ["hallway", "bathroom"],
});

let bathroom = new Room({
	name: "bathroom",
	description: `The bathroom is, to put it gently, disgusting. Rather than smelling fish, you smell excrement in large volumes and an overpowering aroma of ammonia. What happened in here is anyones guess, but between tears and gags you glimpse what you swear is a squidlike eyeball in the toilet.`,
	roomInventory: [{}],
	possibility: ["kitchen"],
});

let guestbathroom = new Room({
	name: "guest bathroom",
	description: `The guest bathroom is possibly the strangest part of this house. In stark contrast to the dark, damp, smelly and disturbing rest of the interior, this room is sparkling clean, with a gentle LED white light in the ceiling. It smells vaguely like air freshner. As soon as you blink it's gone. Where you once thought there was a bathroom, there is instead a hole. You swear you hear a voice at the bottom calling out...`,
	roomInventory: [{}],
	possibility: ["stairs", "hole"],
});

let basement = new Room({
	name: "basement",
	description: `Immediately as you open the door, the faint smell of fish is no longer so faint.`,
	roomInventory: [{}],
	possibility: ["hallway"],

});

let hole = new Room({
	name: "hole",
	description: `You fall down an impossibly deep hole. While falling, you notice glints of green, and that weird smell of fish. ... You know, I really feel like you should've hi-`,
	roomInventory: [{}],
	possibility: [],
});

// ! This is my state machine.
const roomObj = {
	foyer: foyer,
	stairs: stairs,
	"guest bathroom": guestbathroom,
	hole: hole,
	kitchen: kitchen,
	hallway: hallway,
	bathroom: bathroom,
	"living room": livingroom,
	basement: basement,
};
// ! This is where the state machine ends. At least, the map of it. The part YOU see is much further down...


// ! Where the game begins.
async function start() {
	const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. It's raining, and 6 o' clock in the afternoon - If the clocktower is to be trusted. You can see your breath, and feel a shiver go up your spine. You should probably get inside. With the key you were given. `;
	// ! Type in "enter" to not catch a cold and die.
	let answer = await ask(welcomeMessage);
	// depending on answer,
	// can assign ask to a variable
	// console.log('Now write your code to make this work!');
	if (answer == "enter") {
		currentLocation = "foyer";
		// console.log("Name: ", currentLocation);
		// description. console log here 
	} else {
		console.log("... Fine, you catch a cold and die. The end.");
		process.exit();
	}

	let game = true;
	while (game) {
		let location = roomObj[currentLocation];
		console.log(
			"You're currently in the",
			location.name,
			"\n",
			location.description,
			"\n"
		);

		// Death Message beginings
		if (currentLocation == "hole") {
			process.exit();
		}
		// Death Message ends

	


		let answer = await ask("Where will you go? What will you do? >_");
		let moves = location.possibility;
		let getItem = location.roomInventory
		

		if (answer === "basement" && !player.playerInv.includes("Basement Key")) {
			answer = "hallway"
			console.log("The door to the basement is locked. You need to find a key.")
			continue
		}

		if (moves.includes(answer)) {
			currentLocation = answer;
		}else if (answer === "inv") {
			console.log("Your inventory:", player.playerInv);
		}else if (getItem[0].item === answer) {
			location.removeFromInv(answer)
			player.addToInv(answer)
			console.log(player.playerInv)
		} else {
			console.log("I'm not sure what you mean. Try a different command.")
		}
	} // While loop
	process.exit();
}
