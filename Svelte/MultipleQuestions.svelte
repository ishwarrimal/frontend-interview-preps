<script lang="ts">
	const Qlist = {
		100: {
			Q: "Are you married?",
			options: [
			{ name: "yes", value: 101 },
			{ name: "no", value: "Not married", terminal: true },
			],
		},
		101: {
			Q: "Do you have children?",
			options: [
			{ name: "Yes", value: 102 },
			{ name: "no", value: "No children", terminal: true },
			],
		},
		102: {
			Q: "How many childrens do you have?",
			options: [
			{
				name: "Less than 2",
				value: "You have less than 2 children",
				terminal: true,
			},
			{
				name: "More than 2",
				value: "You have more than 2 children",
				terminal: true,
			},
			],
		},
	};
	let QId: keyof typeof Qlist = 100
	let terminalVal: string | null = null
	$: currentQuestion = Qlist[QId]
	
	const handleClick = (e) => {
		const {name, value, terminal: isTerminal} = e.target.dataset
		if(isTerminal){
			terminalVal = value
			return
		}
		QId = value
	}	
</script>

<div>
	{#if !terminalVal} 
	<p>
	{currentQuestion['Q']}
	{#each currentQuestion['options'] as option }
		<button 
		data-name={option.name} 
		key={option.name} 
		data-value={option.value} 
		data-terminal={option.terminal}
		on:click={handleClick}
		>
			{option.name}
		</button>
	{/each}
	</p>
	{:else}
	<p>You selected {terminalVal}
	{/if}
</div>

