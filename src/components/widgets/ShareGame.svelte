<script lang="ts">
	import { getContext } from "svelte";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { modeData } from "../../utils";
	import GameIcon from "../GameIcon.svelte";
	import type Toaster from "./Toaster.svelte";

	const toaster: Toaster = getContext("toaster");

</script>

<div>Have fun!</div>
<!--<div>
	<a href="https://twitter.com/michaeltherobot/status/something" target="_blank">Past Zoodles explained here</a>
</div>
-->
<style>
	div {
		color: var(--fg-secondary);
		font-size: var(--fs-regular);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px 0px;
	}
</style>
