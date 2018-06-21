// ==UserScript==
// @name         Show next level yn every profile
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       You
// @match        http://www.harrylatino.org/user/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  
  const books =
          [
            "",
            "Libro del Aprendiz de Brujo (N.1)",
            "Libro de la Fortaleza (N.5)" ,
            "Libro de la Sangre (N.7)",
            "Libro del Equilibrio (N.10)",
            "Libro del Druida (N.15)",
            "Libro del Caos (N.20)",
            "Libro de los Ancestros (N.25)",
            "Libro de las Auras (N.30)",
            "Libro de Hermes Trimegisto (N.35)",
            "Libro de Merlín (N.40)"
          ]
  
  const numberOfPowersFN = (book, books) => {
    for (let i = 0; i < books.length; i++)
      if (book === books[i])
        return i
  }
  
  const listDOM = (title, value) => {
    let liElement = document.createElement('li')
    liElement.addClassName('clear clearfix')
    let firstSpan = document.createElement('span')
    firstSpan.addClassName('row_title')
    firstSpan.textContent = title
    let secondSpan = document.createElement('span')
    secondSpan.textContent = value
    liElement.appendChild(firstSpan)
    liElement.appendChild(secondSpan)
    return liElement
  }
  
  const maxNumberOfKnowledge = _currentLevel => {
    
    
    
    return _currentLevel
  }
  
  let posts = parseInt((document.getElementsByClassName('row_data')[1].childNodes[0].data).replace('.', ''))
  
  let labels = document.querySelectorAll('#custom_fields_personaje ul li .row_title')
  let data = document.querySelectorAll('#custom_fields_personaje ul li .row_data')
  
  let currentLevel = 0
  let galleons = 0
  let book = ""
  let pointsObjects = 0
  let pointsCreatures = 0
  let knowledges = ""
  let skills = ""
  let badges = 0
  
  
  
  for(let i=0; i<data.length; i++){
    switch (labels[i].textContent.trim()) {
      case "Nivel Mágico":
        currentLevel = data[i].textContent.trim()
        break
      case "Galeones":
        galleons = parseInt(data[i].textContent.trim())
        break
      case "Libros de Hechizos":
        book = data[i].textContent.trim()
        break
      case "Puntos de Poder en Objetos":
        pointsObjects = parseInt(data[i].textContent.trim())
        break
      case "Puntos de Poder en Criaturas":
        pointsCreatures = parseInt(data[i].textContent.trim())
        break
      case "Conocimientos":
        knowledges = data[i].textContent.trim()
        break
      case "Habilidades Mágicas":
        skills = data[i].textContent.trim()
        break
      case "Medallas":
        badges = parseInt(data[i].textContent.trim())
        break
    }
  }
  
  let numberOfPowers = numberOfPowersFN(book, books)
  let numberOfKnowledges = knowledges !== "" ? knowledges.split('\n').length : 0
  let numberOfSkills = skills !== "" ? skills.split('\n').length : 0
  
  
  let postsExperience = 5 * (posts > 10000 ? 10000 : posts)
  let galleonsExperience = 0.2 * (galleons > 250000 ? 250000 : galleons)
  let objectsExperience = 25 * (pointsObjects > 3000 ? 3000 : pointsObjects)
  let creaturesExperience = 25 * (pointsCreatures > 3000 ? 3000 : pointsCreatures)
  let knowledegesExperience = 4000 * (numberOfKnowledges > 19 ? 19 : numberOfKnowledges)
  let skillsExperience = 12000 * (numberOfSkills > 7 ? 7 : numberOfSkills)
  let powersExperience = 6000 * (numberOfPowers > 12 ? 12 : numberOfPowers)
  let badgesExperience = badges
  
  let allExperience = postsExperience + galleonsExperience + objectsExperience + creaturesExperience + knowledegesExperience + skillsExperience + powersExperience + badgesExperience
  let newLevel = Math.round(allExperience/10000)
  let nextLevel = (((newLevel + 1) * 10000) - 5000) - allExperience
  
  
  const container = document.getElementsByClassName('ipsLayout_content')[1]
  
  let levelBox = document.createElement('div')
  levelBox.addClassName('general_box clearfix')
  
  let levelTitle = document.createElement('h3')
  levelTitle.textContent = 'Nivel de Experiencia Calculado'
  
  let levelList = document.createElement('ul')
  levelList.addClassName('ipsList_data clearfix')
  
  levelList.appendChild(listDOM('Nivel', newLevel))
  levelList.appendChild(listDOM('Experiencia para el próximo nivel', Math.round(nextLevel)))
  
  let maxKnowledge = maxNumberOfKnowledge(currentLevel)
  
  
  
  levelBox.appendChild(levelTitle)
  levelBox.appendChild(document.createElement('br'))
  levelBox.appendChild(levelList)
  
  
  
  container.insertBefore(levelBox, container.firstChild)
})();
