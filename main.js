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
				document.querySelector('.failes').innerHTML = +document.querySelector('.failes').innerHTML + 1
			}
			ite++
			for (let i = 0; i < document.querySelectorAll('.text-zone .variable').length; i++) {
				document.querySelectorAll('.text-zone .variable')[i].classList.remove('active')
			}
			if (ite !== textLength) document.querySelectorAll('.text-zone .variable')[ite].classList.add('active')
		} else if (ite == textLength && e.key.length === 1) {
			alert(Math.floor((+document.querySelector('.correct').innerHTML / ite) * 100) + '% correct')
			document.querySelector('.board').style.display = 'none'
			document.querySelector('main').style.display = 'flex'
		}
	}
})


// ========= Back button
document.querySelector('.back-btn').addEventListener('click', () => {
	game = false
	document.querySelector('.board').style.display = 'none'
	document.querySelector('main').style.display = 'flex'
})

// ================== Setting button
document.querySelector('.setting').addEventListener('click', () => {
	document.querySelector('.settings').style.display = 'flex'
})

document.querySelector('.close-modal').addEventListener('click', () => {
	document.querySelector('.settings').style.display = 'none'
})


// ==================== Variables chooseing

for (let i = 0; i < document.querySelectorAll('.var').length; i++) {
	document.querySelectorAll('.var')[i].addEventListener('change', e => {
		isVariable[document.querySelectorAll('.var')[i].id] = document.querySelectorAll('.var')[i].checked
	})
}

// ================== Chossing time

document.querySelector('.select-time').addEventListener('change', () => {
	if (document.querySelector('.select-time').value == 'none') document.querySelector('.time-enter-set').style.display = 'none'
	else document.querySelector('.time-enter-set').style.display = 'block'
})