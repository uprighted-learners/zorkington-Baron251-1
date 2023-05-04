const readline = require("readline");
const readlineInterface = readline.createInterface(
	process.stdin,
	process.stdout
);
// ! Do you like colors? I like colors. I apologize if you're color-blind to the colors I use in this adventure. It's to help differentiate between what's a route and a description.
const orange = "\033[33m";
const white = "\033[39m";
const red = "\033[91m";
const green = "	\033[92m";
const magen = "	\033[95m";
const dgreen = "\033[32m";
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
		this.roomInventory.pop(item);
	}
	addToInv(item) {
		this.roomInventory.push(item);
	}
}

class Player {
	constructor({ playerInv }) {
		this.playerInv = playerInv;
	}
	addToInv(item) {
		this.playerInv.push(item);
	}
	removeFromInv(item) {
		this.playerInv.pop(item);
	}
}

let player = new Player({
	playerInv: [],
});

let outside = new Room({
	name: "Outside",
	description: `182 Main St.
	You are standing on Main Street between Church and South Winooski.
	There is a door here. A keypad sits on the handle.
	On the door is a handwritten sign. It's raining, and 6 o' clock in the afternoon - If the clocktower is to be trusted. You can see your breath, and feel a shiver go up your spine. You should probably get inside. With the key you were given.${green} Type 'inv' to open your inventory >_`,
	roomInventory: [
		{
			item: "Pebble",
			description: "It's a wet pebble. What, were you expecting a ticket home?",
		},
	],
	possibility: ["foyer"],
});

let foyer = new Room({
	name: "foyer",
	description:
		white +
		`${orange}The door opens with a complaining screech. While not the most inviting site, at least it's not raining in here. The first thing you notice is there are no working lights in here (Not electric ones at least), and it smells like fish. There are stairs to your left going up, and a hallway with rooms on the right.`,
	roomInventory: [
		{
			item: `Mulligan`,
			description: "This is an item",
		},
	],
	possibility: ["stairs", "hallway"],
});

let stairs = new Room({
	name: "stairs",
	description: `${orange}Every step you take up these incredibly delapitated steps creaks as though it's about to break. Blessedly, they do not. Once you reach the top and your ears stop ringing from the creaking, you note the very open, very much broken blasted and burnt roof above you. So much for avoiding that cold. The only room to have miraculously survived whatever happened up here is what you can only guess is the guest bathroom `,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["foyer", "guest bathroom"],
});

let hallway = new Room({
	name: "hallway",
	description: `${orange}The hallway is a musty unpleasant site, with a shattered sparking light bulb to illuminate the area. You see a portrait on the wall which is slightly crooked, and a jar on the floor. The first right leads to the living room, while the next leads to the kitchen. At the end of the hall on the left, there is a door to what you can only assume is the basement`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["foyer", "living room", "kitchen", "basement"],
});

let livingroom = new Room({
	name: "living room",
	description: `${orange}The living room is an utter disaster. Wet stuffing and feathers are strewn about the room, and the smell of mildew seems to dampen whatever was producing that fishy odor.  You see bookshelves on the far wall, what you think might once have been a couch on the right, and a tv on the left`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["hallway"],
});

let kitchen = new Room({
	name: "kitchen",
	description: `${orange}The kitchen is a dark and damp area, lit only by an open refridgerator light on the wall to the left. A bathroom at the end of the room has its door slightly ajar Preparing your nose for a horrendoues stench, you are relieved to find that the smell of fish isn't that strong here, oddly enough. The dining table to your left wears a tattered and moldy table cloth, with a note "Basement Key" and a key lying next to it.`,
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
	description: `${orange}The bathroom is, to put it gently, disgusting. Rather than smelling fish, you smell excrement in large volumes and an overpowering aroma of ammonia. What happened in here is anyones guess, but between tears and gags you glimpse what you swear is a squidlike eyeball in the toilet.`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["kitchen"],
});

let guestbathroom = new Room({
	name: "guest bathroom",
	description: `${orange}The guest bathroom is possibly the strangest part of this house. In stark contrast to the dark, damp, smelly and disturbing rest of the interior, this room is sparkling clean, with a gentle LED white light in the ceiling. It smells vaguely like air freshner. As soon as you blink it's gone. Where you once thought there was a bathroom, there is instead a hole. You swear you hear a voice at the bottom calling out...`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["stairs", "hole"],
});

let basement = new Room({
	name: "basement",
	description: `${orange}Immediately as you open the door, the faint smell of fish is no longer so faint.`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't.",
		},
	],
	possibility: ["hallway"],
});

let hole = new Room({
	name: "hole",
	description: `${orange}You fall down an impossibly deep hole. While falling, you notice glints of green, and that weird smell of fish. ... You know, I really feel like you should've hi-`,
	roomInventory: [
		{
			item: "Nothing",
			description:
				"There is nothing in this hole. You're falling. Focus on that.",
		},
	],
	possibility: [],
});

// ! This is my state machine.
const roomObj = {
	outside: outside,
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
	On the door is a handwritten sign. It's raining, and 6 o' clock in the afternoon - If the clocktower is to be trusted. You can see your breath, and feel a shiver go up your spine. You should probably get inside. With the key you were given.${green} Type 'inv' to open your inventory >_`;

	let entry = ["enter", "go inside", "open door", "unlock door"];
	let answer = await ask(welcomeMessage);

	// ! Getting in
	if (entry.includes(answer)) {
		currentLocation = "foyer";
	} else if (answer === "inv") {
		console.log("Your inventory:", player.playerInv);
		currentLocation = "outside";
		let outside = roomObj.outside;
		outside.description =
			"You're still outside by the by. Still cold out, still raining... You should probably go inside.";
		console.log("Type 'foyer' to enter the building.");
	} else {
		console.log("... Fine, you catch a cold and die. The end.");
		process.exit();
	}

	let game = true;
	while (game) {
		let location = roomObj[currentLocation];
		let entry = ["enter", "go inside", "open door", "unlock door"];

		// ! Start of the loop(Concrete)
		console.log(
			`${magen}You're currently in the`,
			location.name,
			"\n",
			location.description,
			"\n",
			location.possibility,
			"\n",
			`${green}Current Room Inventory: ['${location.roomInventory[0].item}']`,
			`${dgreen}Room Item Description: ${location.roomInventory[0].description}`
		);

		
		
		let answer = await ask("Where will you go? What will you do? >_");
		let moves = location.possibility;
		let getItem = location.roomInventory;
		let getPItem = player.playerInv
		
		// ? Inventory entry
		if ((location = outside && entry.includes(answer))) {
			currentLocation = "foyer";
		}

		// ? The Hole Death
		if (answer === "hole" && moves.includes("hole")) {
			game = false
		}

		// ? Locked Basement
		if (answer === "basement" &&!player.playerInv.includes("Basement Key") && moves.includes("basement")) 
		{
			location = roomObj[currentLocation];
			console.log(
				"The door to the basement is locked. You need to find a key."
			);
			continue;
		}
		// ? Updated kitchen description
		if (answer === "kitchen" && player.playerInv.includes("Basement Key")) {
			console.log(red + "The player has the Basement Key");
			currentLocation = answer;
			let kitchen = roomObj.kitchen;
			kitchen.description = `The kitchen is a dark and damp area, lit only by an open refridgerator light on the wall to the left. A bathroom at the end of the room has its door slightly ajar. Preparing your nose for a horrendoues stench, you are relieved to find that the smell of fish isn't that strong here, oddly enough. The dining table to your left wears a tattered and moldy table cloth.`;
		} 
		
			// ! Movement
		if (moves.includes(answer)) {
			currentLocation = answer;
			// ! Inventory
		} else if (answer === "inv") {
			console.log("Your inventory:", player.playerInv);
			continue;
			// ! Room Inventory
		} else if (answer === "Nothing") {
			console.log(
				"You can't pick up nothing. Unless you're an eldritch being from beyond the stars and our tiny human brains can't comprehend nothing. But no. You can't."
			);
			// ! Picking up Room inventory
		} else if (getItem[0].item === answer) {
			location = roomObj[currentLocation];
			location.removeFromInv(answer);
			location.addToInv({
				item: "Nothing",
				description: "There doesn't seem to be anything worth picking up here.",
			});
			player.addToInv(answer);
			console.log(player.playerInv);
			continue;
			// ! Removing Player inventory
		} else if (answer === getPItem[0] &&player.playerInv.includes(answer)
		) {
			console.log(`${magen} You drop the ${answer}`)
			player.removeFromInv(answer);
			// location.addToInv(answer);
		}
		// ! Bad command
		if (!moves.includes(answer)) {
			console.log(
				`${red} One of two things happened. Either you're trying to phase through walls, or you entered complete gibberish. Even if it's a word you understand, I as a narrator am limited to what I can let you do. Figure it out.`
			);
		}
	} // ! While loop
	process.exit();
}
