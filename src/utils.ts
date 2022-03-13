import seedrandom from "seedrandom";
import { GameMode } from "./enums";
import wordLists from "./words_5_6";

export const SIXLETTERDAY = 144;

export const ROWS = 6;

export const COLS = ((getWordNumber() < SIXLETTERDAY) ? 5 : 6);

export const words = {
	words: wordLists.words,
    valid: ((getWordNumber() < SIXLETTERDAY) ? wordLists.validFive : wordLists.validSix),
	contains: (word: string) => {
		return words.words.includes(word) || words.valid.includes(word);
	},
};

export function checkHardMode(boardState: string[], evaluations: LetterState[][], row: number): HardModeData {
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "correct" && boardState[row - 1][i] !== boardState[row][i]) {
			return { pos: i, char: boardState[row - 1][i], type: "correct" };
		}
	}
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "present" && !boardState[row].includes(boardState[row - 1][i])) {
			return { pos: i, char: boardState[row - 1][i], type: "present" };
		}
	}
	return { pos: -1, char: "", type: "absent" };
}

export function getRowData(n: number, boardState: string[], evaluations: LetterState[][]) {
	const wordData = {
		// letters not contained
		not: [],
		// for letters contained in the word that are not the same as any that are in the correct place
		contained: new Set<string>(),
		letters: Array.from({ length: COLS }, () => ({ val: null, not: new Set<string>() })),
	};
	for (let row = 0; row < n; ++row) {
		for (let col = 0; col < COLS; ++col)
			if (evaluations[row][col] === "present") {
				wordData.contained.add(boardState[row][col]);
				wordData.letters[col].not.add(boardState[row][col]);
			} else if (evaluations[row][col] === "correct") {
				wordData.contained.delete(boardState[row][col]);
				wordData.letters[col].val = boardState[row][col];
			} else {
				wordData.not.push(boardState[row][col]);
			}
	}
	let exp = "";
	for (let i = 0; i < COLS; ++i) {
		exp += wordData.letters[i].val
			? wordData.letters[i].val
			: `[^${[...wordData.not, ...wordData.letters[i].not].join(" ")}]`;
	}
	return (word: string) => {
		if (new RegExp(exp).test(word)) {
			for (const char of wordData.contained) {
				if (!word.includes(char)) return false;
			}
			return true;
		}
		return false;
	};
}

export function getState(word: string, guess: string): LetterState[] {
	const charArr = word.split("");
	const result = Array<LetterState>(COLS).fill("absent");
	for (let i = 0; i < word.length; ++i) {
		if (charArr[i] === guess.charAt(i)) {
			result[i] = "correct";
			charArr[i] = "$";
		}
	}
    // Now look for letters in wrong position.
    // Replace letter with $ in the charArr whenever we find one
    // to avoid multiple counting
	for (let i = 0; i < word.length; ++i) {
		if (charArr.includes(guess.charAt(i)) && result[i] !== "correct") {
			result[i] = "present";
			charArr[charArr.indexOf(guess.charAt(i))] = "$";
		}
	}
    
	return result; //result.map((e, i) => charArr.includes(guess[i]) && e !== "correct" ? "present" : e);
}

export function contractNum(n: number) {
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}th`;
	}
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];


export function newSeed() {
	const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();
}

export const modeData: ModeData = {
	default: GameMode.daily,
	modes: [
		{
			name: "Daily",
			unit: 86400000,
			start: 1645851600000,	// 26/02/2022
			seed: newSeed(),
			historical: false,
			streak: true,
		}
	]
};

export function getWordNumber() {
    const numbleOneDate = new Date(2022,1,26,0,0,0,0).setHours(0,0,0,0)
    const now = new Date().setHours(0,0,0,0)
    const msInDay = 86400000
    return Math.floor((now - numbleOneDate) / msInDay) //% WORDS.length
//	return Math.round((modeData.modes[mode].seed - modeData.modes[mode].start) / modeData.modes[mode].unit) + 1;
}

//export function seededRandomInt() { //min: number, max: number, seed: number) {
	//const rng = seedrandom(`${seed}`);
	//return Math.floor(min + (max - min) * rng());
//    const numbleOneDate = new Date(2022,0,12,0,0,0,0).setHours(0,0,0,0)
//    const now = new Date().setHours(0,0,0,0)
//    const msInDay = 86400000
//    return Math.floor((now - numbleOneDate) / msInDay) //% WORDS.length
//}

export const DELAY_INCREMENT = 150;

export const PRAISE = [
	[
		"Mimicry is a valid defense mechanism",
		"All the cats copy!",
	], /* 2 */ [
		"King of beasts!",
		"All the elephants trumpet!",
		"All the T. Rexes roar!",
		"All the bears roar!",
		"All the lions roar!",
		"All the elk bugle!",
		"All the people cheer!",
		"All the kittens purr!",
		"All the monkeys scream!",
		"All the bucks bellow!",
		"All the peacocks scream!",
		"All the whales sing!",
		"All the alligators bellow!",
		"All the rhinoceroses bellow!",
		"All the Humboldt squid glow!",
		"All the rabbits drum!",
		"All the nightingales sing!",
		"All the deer bell!",
		"All the moose bellow!",
		"All the lemon tree borers whistle!",
		"Certain vipers rattle!",
	], /* 3 */ [
		"All the ferrets dook!",
		"All the capybaras squeak!",
		"All the larks warble!",
		"All the hamsters squeak!",
		"All the octopuses perform the blanch-ink-jet manoeuvre!",
		"All the chinchillas squeak!",
		"All the hounds bay!",
		"All the bats squeak!",
		"All the tapirs squeak!",
		"All the crabs click!",
		"All the koalas shriek!",
		"All the dolphins click!",
		"All the bees buzz!",
		"All the does bleat!",
		"All the turkeys gobble!",
		"All the cranes clang!",
		"All the curlews pipe!",
		"All the pigeons coo!",
		"All the chickens cluck!",
		"All the prairie dogs bark!",
		"All the crows caw!",
		"All the raccoons trill!",
	], /* 4 */ [
		"All the quail call!",
		"All the cicadas chirp!",
		"All the alpacas scream!",
		"All the eagles screech!",
		"All the gnus moo!",
		"All the wolves bay!",
		"All the zebras bark!",
		"All the badgers growl!",
		"All the apes gibber!",
		"All the hippos growl!",
		"All the seals bark!",
		"All the oxen low!",
		"All the giraffes hum!",
		"All the goats bleat!",
		"All the cattle moo...",
		"All the leopards snarl!",
		"All the guinea pigs wheek!",
		"All the ducks quack!",
		"All the frogs croak...",
		"All the magpies chatter!",
		"All the peacocks honk!",
	], /* 5 */ [
		"All the hens cackle...",
		"All the mosquitos whine...",
		"All the antelopes snort...",
		"All the parrots talk...",
		"All the sheep meh...",
		"All the kangaroos chortle...",
		"All the barred owls caterwaul...",
		"All the sparrows twitter...",
		"All the pigs snort...",
		"All the horses nicker...",
		"All the wild boars grumble...",
		"All the flies buzz...",
		"All the okapis cough...",
		"All the donkeys bray...",
		"All the Tokay geckos croak...",
		"All the swans cry...",
		"All the foxes snore...",
		"All the crickets chirp...",
		"All the hypenas laugh...",
		"All the geese hiss...",
		"All the kookaburras laugh...",
		"All the linnets chuckle...",
	], /* 6 */ [
		"Hissssss!",
		"Heeeee haw!",
		"Narrowly avoided becoming lunch",
		"All the starfish evert their stomachs!",
		"That was offal!",
		"Almost went the way of the dodo",
		"You must have been hibernating",
		"Do I smell mustelids?",
		"Not bad... for a sea squirt",
	],
];

export function createNewGame(mode: GameMode): GameState {
	return {
        gameStatus: "IN_PROGRESS",
		praise: "",
		guesses: 0,
		time: modeData.modes[mode].seed,
		wordNumber: getWordNumber(),
		validHard: true,
        boardState: Array(ROWS).fill(""),
        evaluations: Array.from({ length: ROWS }, () => (Array(COLS).fill("nil"))),
	};
}


export function createDefaultStats(mode: GameMode): Stats {

    const urlStats = new URLSearchParams(window.location.search);
	const stats = {
		gamesPlayed: 0,
		lastGame: 0,
		guesses: {
			fail: 0, 
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		},
		currentStreak: 0,
		maxStreak: 0,
	};
	return stats;
};

export function createLetterStates(): { [key: string]: LetterState; } {
	return {
		a: "nil",
		b: "nil",
		c: "nil",
		d: "nil",
		e: "nil",
		f: "nil",
		g: "nil",
		h: "nil",
		i: "nil",
		j: "nil",
		k: "nil",
		l: "nil",
		m: "nil",
		n: "nil",
		o: "nil",
		p: "nil",
		q: "nil",
		r: "nil",
		s: "nil",
		t: "nil",
		u: "nil",
		v: "nil",
		w: "nil",
		x: "nil",
		y: "nil",
		z: "nil",
	};
}

export const definitions = new Map<string, Promise<DictionaryEntry>>();