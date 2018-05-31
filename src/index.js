const books = [
  '',
  'Libro del Aprendiz de Brujo (N.1)',
  'Libro de la Fortaleza (N.5)',
  'Libro de la Sangre (N.7)',
  'Libro del Equilibrio (N.10)',
  'Libro del Druida (N.15)',
  'Libro del Caos (N.20)',
  'Libro de los Ancestros (N.25)',
  'Libro de las Auras (N.30)',
  'Libro de Hermes Trimegisto (N.35)',
  'Libro de Merlín (N.40)'
]


let activeMessages = parseInt((document.getElementsByClassName('row_data')[1].childNodes[0].data).replace('.', ''))

let characterSheet = document.querySelectorAll('#custom_fields_personaje ul li .row_data')
let currentLevel = parseInt(characterSheet[0].textContent)
let galleons = parseInt(characterSheet[2].textContent)
let book = characterSheet[6].textContent
book = book.split("\n").join("")
book = book.split("\t").join("")
let pointsObjects = parseInt(characterSheet[8].textContent)
let pointsCreatures = parseInt(characterSheet[9].textContent)
let knowledges = characterSheet[16].textContent.trim()
let skills = characterSheet[17].textContent.trim()
let badges = parseInt(characterSheet[18].textContent)

let numberOfKnowledges = knowledges.split('\n').length
let numberOfSkills = skills.split('\n').length