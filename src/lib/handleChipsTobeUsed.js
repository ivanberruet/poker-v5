export default 	function handleChipsTobeUsed(availableChips, players) {
	let activeChips = availableChips.filter(chip => chip.active)
	let players_num = 2*players.length

	let totalChips = {
		label: "Total",
		white: {value: 0, quantity: 0},
		red: {value: 0, quantity: 0},
		green: {value: 0, quantity: 0},
		blue: {value: 0, quantity: 0},
		black: {value: 0, quantity: 0},
		value: 0
	}

	let perPlayerChips = {
		label: "Por jugador",
		white: {quantity: 0, value: 0},
		red: {quantity: 0, value: 0},
		green: {quantity: 0, value: 0},
		blue: {quantity: 0, value: 0},
		black: {quantity: 0, value: 0},
		value: 0
	}

	let remainingChips = {
		label: "Sobrantes",
		white: {quantity: 0, value: 0},
		red: {quantity: 0, value: 0},
		green: {quantity: 0, value: 0},
		blue: {quantity: 0, value: 0},
		black: {quantity: 0, value: 0},
		value: 0	
	}


	if (players_num != 0) {
		for (let i = 0; i < activeChips.length; i++) {
			totalChips.white.quantity += activeChips[i].white.quantity
			totalChips.red.quantity += activeChips[i].red.quantity
			totalChips.green.quantity += activeChips[i].green.quantity
			totalChips.blue.quantity += activeChips[i].blue.quantity
			totalChips.black.quantity += activeChips[i].black.quantity

			totalChips.white.value += activeChips[i].white.value * activeChips[i].white.quantity
			totalChips.red.value += activeChips[i].red.value * activeChips[i].red.quantity
			totalChips.green.value += activeChips[i].green.value * activeChips[i].green.quantity
			totalChips.blue.value += activeChips[i].blue.value * activeChips[i].blue.quantity
			totalChips.black.value += activeChips[i].black.value * activeChips[i].black.quantity

		}
		totalChips.value = totalChips.white.value + totalChips.red.value + totalChips.green.value + totalChips.blue.value + totalChips.black.value

		perPlayerChips = {...perPlayerChips,
			white: {quantity: Math.floor(totalChips.white.quantity / players_num), value: Math.floor(totalChips.white.quantity / players_num) * 5},
			red: {quantity: Math.floor(totalChips.red.quantity / players_num), value: Math.floor(totalChips.red.quantity / players_num) * 10},
			green: {quantity: Math.floor(totalChips.green.quantity / players_num), value: Math.floor(totalChips.green.quantity / players_num) * 25},
			blue: {quantity: Math.floor(totalChips.blue.quantity / players_num), value: Math.floor(totalChips.blue.quantity / players_num) * 50},
			black: {quantity: Math.floor(totalChips.black.quantity / players_num), value: Math.floor(totalChips.black.quantity / players_num) * 100},
		}
		perPlayerChips.value = perPlayerChips.white.value + perPlayerChips.red.value + perPlayerChips.green.value + perPlayerChips.blue.value + perPlayerChips.black.value

		remainingChips = {...remainingChips,
			white: {quantity: totalChips.white.quantity - perPlayerChips.white.quantity * players_num, value: (totalChips.white.quantity - perPlayerChips.white.quantity * players_num) * 5},
			red: {quantity: totalChips.red.quantity - perPlayerChips.red.quantity * players_num, value: (totalChips.red.quantity - perPlayerChips.red.quantity * players_num) * 10},
			green: {quantity: totalChips.green.quantity - perPlayerChips.green.quantity * players_num, value: (totalChips.green.quantity - perPlayerChips.green.quantity * players_num) * 25},
			blue: {quantity: totalChips.blue.quantity - perPlayerChips.blue.quantity * players_num, value: (totalChips.blue.quantity - perPlayerChips.blue.quantity * players_num) * 50},
			black: {quantity: totalChips.black.quantity - perPlayerChips.black.quantity * players_num, value: (totalChips.black.quantity - perPlayerChips.black.quantity * players_num) * 100},
		}
		remainingChips.value = remainingChips.white.value + remainingChips.red.value + remainingChips.green.value + remainingChips.blue.value + remainingChips.black.value
	}
	
	return [
		perPlayerChips,
		remainingChips,
		totalChips,
	]
}
