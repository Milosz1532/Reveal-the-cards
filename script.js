const mode = document.querySelectorAll('.menu-option a')
const menuDisplay = document.querySelector('#menu')
const game = document.querySelector('#game')
const gameBoard = document.querySelector('#gameBoard')
const win = document.querySelector('#win')
const back = document.querySelector("#back")
const values = []
const fields = []
let openedFields = []
let activeCard = false
let numbers_of_fields = 0

for (const button of mode) {
	button.addEventListener('click', function (event) {
		const gameMode = button.getAttribute('data-mode')
		if (!gameMode || gameMode == null) return
		menuDisplay.classList.add('hide')
		numbers_of_fields = gameMode
		game.classList.add('show')
		generateFields()
	})
}

function generateFields() {
	if (numbers_of_fields % 2) return
	generateValues()
	for (let i = 0; i < numbers_of_fields; i++) {
		const field = document.createElement('div')
		field.classList.add('field', 'hidden')
		field.id = i
		const value = values[Math.floor(Math.random() * values.length)]
		field.innerHTML = '<img src="images/' + value + '.svg">'
		values.splice(values.indexOf(value), 1)
		gameBoard.appendChild(field)
		fields.push(field)
		field.addEventListener('click', event => {
			fieldClick(event)
		})
	}
}

function generateValues() {
	let fieldValue = 0
	for (let i = 0; i < numbers_of_fields; i++) {
		values.push(fieldValue)
		if (i % 2) fieldValue++
	}
}

function fieldClick(event) {
	const field = event.target
	if (field.classList.contains('success') || openedFields.length > 1) return
	if (openedFields.length && openedFields[0].id === field.id) return
	openedFields.push(field)
	field.classList.remove('hidden')
	isSomethingShown = !isSomethingShown
	if (!isSomethingShown) {
		setTimeout(() => {
			const comparedClass = openedFields[0].innerHTML === openedFields[1].innerHTML ? 'success' : 'hidden'
			for (let i = 0; i < openedFields.length; i++) {
				openedFields[i].classList.add(comparedClass)
			}
			openedFields = []
			checkForWin()
		}, 500)
	}
}

function checkForWin() {
	for (let i = 0; i < fields.length; i++) {
		if (!fields[i].classList.contains('success')) {
			return
		}
	}
	game.classList.add('endGame')
	win.classList.add('endGame')
	back.classList.add('endGame')
	gameBoard.innerHTML = ''
}

const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", (e) => {
	game.classList.remove('endGame')
	win.classList.remove('endGame')
	back.classList.remove('endGame')
	generateFields()
})