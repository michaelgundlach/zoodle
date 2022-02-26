<script lang="ts">
	import { COLS, ROWS } from "../../utils";

	import { Tile } from "../board";
	export let visible: boolean;
    
    let rowWidth = 44*COLS-4;
</script>

<h3>how to play</h3>


<div><strong>Note:</strong> Are you looking for <a href="https://www.powerlanguage.co.uk/wordle/">WORDLE</a> (the guessing game created by <a href="https://twitter.com/powerlanguish">Josh Wardle</a>)? This is not it.</div>

<div>Guess the <strong>ZOODLE</strong> in {ROWS} tries. The word is related to animals, and answers include names of animals, plurals, and words tangentially related to animals (body parts, habitats, activities, etc.)</div>
<div>Each guess must be a valid {COLS} letter word. Press enter to submit a guess. The color of the tiles will then change as follows.
</div>
<div class:complete={visible} class="examples" style="--tutorial-row-width: {rowWidth}px; --cols: {COLS}">
	<div><strong>Examples</strong></div>
	<div class="row">
		<Tile value="h" state="correct" />
		<Tile value="o" state="nil" />
		<Tile value="r" state="nil" />
		<Tile value="s" state="nil" />
		<Tile value="e" state="nil" />
	</div>
	<div>The letter <strong>H</strong> is in the word and in the correct spot.</div>
	<div class="row">
		<Tile value="s" state="nil" />
		<Tile value="w" state="present" />
		<Tile value="a" state="nil" />
		<Tile value="r" state="nil" />
		<Tile value="m" state="nil" />
	</div>
	<div>The letter <strong>W</strong> is in the word but in the wrong spot.</div>
	<div class="row">
		<Tile value="f" state="nil" />
		<Tile value="a" state="nil" />
		<Tile value="u" state="nil" />
		<Tile value="n" state="absent" />
		<Tile value="a" state="nil" />
	</div>
	<div>The letter <strong>N</strong> is not in the word in any spot.</div>
</div>
<div>A new ZOODLE will be available at midnight each day!</div>

<h3>The history of Zoodle</h3>
<div>Michael Gundlach and his family and friends couldn't get enough of Wordle and its variants.  His children couldn't quite get in on the fun
because the words were often unfamiliar to them.  Thus: Zoodle was created over the last weekend in February 2022.</div>

<style lang="scss">
	div {
		margin: 10px 0;
	}
	.examples {
		border-top: 1px solid var(--border-primary);
		border-bottom: 1px solid var(--border-primary);
		:global(.row > *) {
			height: 100%;
		}
		&:not(.complete) :global(.row .back) {
			transition-delay: 0.3s;
		}
	}
	.row {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		height: 40px;
        width: var(--tutorial-row-width);
		grid-gap: 5px;
        font-size: 1.8em;
        line-height: 1.4em;
        vertical-align: middle;
	}
</style>
