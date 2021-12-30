//  ============== Changing them ( dark and light )
document.querySelector('.them').addEventListener('click', () => {
	let elems = document.querySelectorAll('.th')
	for (let i = 0; i < elems.length; i++) {
		elems[i].classList.toggle('active')
	}
})


// ====== Start button
let game = false
let ite = 0
let textLength

let level = 1
let varMix = ['space']

let isVariable = {
	lowercase: true,
	uppercase: true,
	number: false,
	symbol: false
}

let variable = {
	lowercase: 'qwertyuiopasdfghjklzxcvbnm    ',
	uppercase: 'QWERTYUIOPASDFGHJKLZXCVBNM    ',
	number: '1234567890',
	symbol: './"=+-*[]{}^&?()$%#@!;:><_~',
}
let time = []
let t; // Timer
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

document.querySelector('.start-btn').addEventListener('click', () => {
	game = true
	document.querySelector('.text-zone').innerHTML = ''
	document.querySelector('main').style.display = 'none'
	document.querySelector('.board').style.display = 'flex'
	document.querySelector('.failes').innerHTML = 0
	document.querySelector('.correct').innerHTML = 0

	varMix = []
	for (let i in isVariable) if (isVariable[i]) varMix.push(i)
	if (!varMix.length) varMix = ['lowercase', 'uppercase']

	level = document.querySelector('.level-inp').value
	if (document.querySelector('.select-time').value == 'timer') {
		time = [0, 0]
		let value = +document.querySelector('.time-enter').value
		if (value === 0) value = 5
		if (value > 3600) value = 3600
		while (value >= 60) {
			value -= 60
			time[0]++
		}
		time[1] = value
		changeTimer(time[0], time[1])

		t = setInterval(() => {
			if (time[1]) time[1]--
			else if (time[0]) {
				time[0]--
				time[1] = 59
			}
			else loseGame()
			changeTimer(time[0], time[1])
		}, 1000)
	} else if (document.querySelector('.select-time').value == 'stopwatch') {
		time = [0, 0]
		changeTimer(time[0], time[1])

		t = setInterval(() => {
			if (time[1] < 59) time[1]++
			else {
				time[0]++
				time[1] = 0
			}
			changeTimer(time[0], time[1])
		}, 1000)
	}

	textLength = randomIntFromInterval((level - 1) * 10, level * 10)
	if (textLength == 0) textLength = 1
	ite = 0
	let type;
	for (let i = 0; i < textLength; i++) {
		let span = document.createElement('span')
		type = varMix[randomIntFromInterval(0, varMix.length - 1)]
		span.innerHTML = variable[type][randomIntFromInterval(0, variable[type].length - 1)]
		span.classList.add('variable')
		document.querySelector('.text-zone').appendChild(span)
	}
	document.querySelectorAll('.text-zone .variable')[ite].classList.add('active')
})

document.addEventListener('keyup', (e) => {
	if (game) {
		if (e.key.length === 1 && ite < textLength) {
			if (document.querySelectorAll('.text-zone .variable')[ite].innerHTML === e.key) {
				document.querySelectorAll('.text-zone .variable')[ite].style.color = '#3FB045'
				document.querySelector('.correct').innerHTML = +document.querySelector('.correct').innerHTML + 1
			} else {
				document.querySelectorAll('.text-zone .variable')[ite].style.color = '#C41E3A'
				if (document.querySelector('.select-mode').value == 'count') {
					document.querySelector('.failes').innerHTML = +document.querySelector('.failes').innerHTML + 1
				} else if (document.querySelector('.select-mode').value == 'lose') {
					showMess('You lose :(', `${document.querySelector('.correct').innerHTML}/${textLength} is correct`, true)
					backToHome()
				}
			}
			ite++
			for (let i = 0; i < document.querySelectorAll('.text-zone .variable').length; i++) {
				document.querySelectorAll('.text-zone .variable')[i].classList.remove('active')
			}
			if (ite !== textLength) document.querySelectorAll('.text-zone .variable')[ite].classList.add('active')
		} else if (ite == textLength && e.key.length === 1) {
			let percent = Math.floor((+document.querySelector('.correct').innerHTML / ite) * 100)
			if (percent == 100) showMess('Nice job !', 'All is correct', true)
			else if (percent >= 65) showMess('Not bad', `${percent}% is correct`, true)
			else if (percent >= 35) showMess('Try another time', `${percent}% is correct`, true)
			else showMess('work more', `${percent}% is correct`, true)
			backToHome()
		}
	}
})
// ========= Back button
document.querySelector('.back-btn').addEventListener('click', backToHome)

function backToHome() {
	game = false
	document.querySelector('.board').style.display = 'none'
	document.querySelector('main').style.display = 'flex'
}

// ================== Setting button
document.querySelector('.setting').addEventListener('click', () => {
	document.querySelector('.settings').style.display = 'flex'
})

document.querySelector('.close-modal').addEventListener('click', () => {
	document.querySelector('.settings').style.display = 'none'
})

// ================= Modal closing
document.querySelector('.message-modal').addEventListener('click', () => {
	document.querySelector('.modal').style.display = 'none'
})


// ==================== Variables chooseing
for (let i = 0; i < document.querySelectorAll('.var').length; i++) {
	document.querySelectorAll('.var')[i].addEventListener('change', e => {
		isVariable[document.querySelectorAll('.var')[i].id] = document.querySelectorAll('.var')[i].checked
	})
}

// ================== Chossing time
document.querySelector('.select-time').addEventListener('change', () => {
	if (document.querySelector('.select-time').value == 'timer') document.querySelector('.time-enter-set').style.display = 'block'
	else document.querySelector('.time-enter-set').style.display = 'none'
})

// ================== Function for changing timer value
function changeTimer(min, sec) {
	let m = String(min)
	let s = String(sec)
	if (m.length === 1) m = '0' + m
	if (s.length === 1) s = '0' + s
	document.querySelector('.timer').innerHTML = `${m}:${s}`
}

// ======================= Loseing game
function loseGame() {
	showMess('You lose :(', `${document.querySelector('.correct').innerHTML}/${textLength} is correct`, true)
	backToHome()
}

// ============================= Show message

function showMess(title, sub, clearTimer = false) {
	if (clearTimer) clearInterval(t)
	document.querySelector('.mess .general').innerHTML = title
	document.querySelector('.mess .sub').innerHTML = sub
	if (document.querySelector('.select-time').value == 'stopwatch') {
		let m = String(time[0])
		let s = String(time[1])
		if (m.length === 1) m = '0' + m
		if (s.length === 1) s = '0' + s
		document.querySelector('.mess .sub').innerHTML += ` (${document.querySelector('.timer').innerHTML})`
	}
	document.querySelector('.modal').style.display = 'flex'
}