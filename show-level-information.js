// ==UserScript==
// @name         Show next level in every profile
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  try to take over the world!
// @author       You
// @match        http://www.harrylatino.org/user/*
// @grant        none
// ==/UserScript==
(function() {
  'use strict'
  
  const books =
          [
            '',
            'Libro del Aprendiz de Brujo (N.1)',
            'Libro de la Fortaleza (N.5)' ,
            'Libro de la Sangre (N.7)',
            'Libro del Equilibrio (N.10)',
            'Libro del Druida (N.15)',
            'Libro del Caos (N.20)',
            'Libro de los Ancestros (N.25)',
            'Libro de las Auras (N.30)',
            'Libro de Hermes Trimegisto (N.35)',
            'Libro de Merlín (N.40)'
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
  
  const between = (value, min, max) => value >= min && value <= max
  
  const range = level => {
    if (team == 'Orden del Fénix') {
      if (between(level, 1, 9))
        return 'Initie'
      else if (between(level, 10, 21))
        return 'Legionario'
      else if (between(level, 22, 36))
        return 'Templario'
      else if (between(level, 37, 55))
        return 'Knight'
      else if (between(level, 56, 60))
        return 'Demon Hunter'
    }
    else if (team == 'Marca Tenebrosa') {
      if (between(level, 1, 9))
        return 'Base'
      else if (between(level, 10, 21))
        return 'Tempestad'
      else if (between(level, 22, 36))
        return 'Mago Oscuro'
      else if (between(level, 37, 55))
        return 'Nigromante'
      else if (between(level, 56, 60))
        return 'Ángel Caído'
    }
  }

  const maxNumberOfKnowledge = {
    '1': 3, '2': 3, '3': 3,
    '4': 4, '5': 4, '6': 4,
    '7': 5, '8': 5, '9': 5,
    '10': 6, '11': 6, '12': 6,
    '13': 7, '14': 7, '15': 7,
    '16': 8, '17': 8, '18': 8,
    '19': 9, '20': 9, '21': 9,
    '22': 10, '23': 10, '24': 10,
    '25': 11, '26': 11, '27': 11,
    '28': 12, '29': 12, '30': 12,
    '31': 13, '32': 13, '33': 13,
    '34': 14, '35': 14, '36': 14,
    '37': 15, '38': 15, '39': 15,
    '40': 16, '41': 16, '42': 16,
    '43': 17, '44': 17, '45': 17,
    '46': 18, '47': 18, '48': 18,
    '49': 19, '50': 19,
  }
  
  const maxCreaturesLevel = _currentLevel => {
    if (between(_currentLevel, 40, 50))
      return 'XXXXX'
    if (between(_currentLevel, 20, 39))
      return 'XXXX'
    if(between(_currentLevel, 10, 19))
      return 'XXX'
    if(between(_currentLevel, 5, 9))
      return 'XX'
    return 'X'
  }
  
  const maxNumberOfSkills = () => {
    if  (currentLevel >= 40 && numberOfKnowledges >= 10)
      return 'Sin límite'
    if  (currentLevel >= 35 && numberOfKnowledges >= 9)
      return '5'
    if  (currentLevel >= 30 && numberOfKnowledges >= 8)
      return '4'
    if  (currentLevel >= 25 && numberOfKnowledges >= 7)
      return '3'
    if  (currentLevel >= 20 && numberOfKnowledges >= 6)
      return '2'
    if  (currentLevel >= 15 && numberOfKnowledges >= 5)
      return '1'
    return "No puedes adquirir habilidades"
  }
  
  let posts = parseInt((document.getElementsByClassName('row_data')[1].childNodes[0].data).replace('.', ''))
  
  let labels = document.querySelectorAll('#custom_fields_personaje ul li .row_title')
  let data = document.querySelectorAll('#custom_fields_personaje ul li .row_data')
  
  let currentLevel = 0
  let galleons = 0
  let book = ''
  let pointsObjects = 0
  let pointsCreatures = 0
  let knowledges = ''
  let skills = ''
  let badges = 0
  let team = ''
  let currentTeamRange = 'No perteneces a ningún bando'
  let calculatedTeamRange = 'No perteneces a ningún bando'

  
  for(let i=0; i<data.length; i++){
    switch (labels[i].textContent.trim()) {
      case 'Nivel Mágico':
        currentLevel = data[i].textContent.trim()
        break
      case 'Galeones':
        galleons = parseInt(data[i].textContent.trim())
        break
      case 'Libros de Hechizos':
        book = data[i].textContent.trim()
        break
      case 'Puntos de Poder en Objetos':
        pointsObjects = parseInt(data[i].textContent.trim())
        break
      case 'Puntos de Poder en Criaturas':
        pointsCreatures = parseInt(data[i].textContent.trim())
        break
      case 'Conocimientos':
        knowledges = data[i].textContent.trim()
        break
      case 'Habilidades Mágicas':
        skills = data[i].textContent.trim()
        break
      case 'Medallas':
        badges = parseInt(data[i].textContent.trim())
        break
      case 'Bando':
        team = data[i].textContent.trim()
        break
    }
  }
  
  let numberOfPowers = numberOfPowersFN(book, books)
  let numberOfKnowledges = knowledges !== '' ? knowledges.split('\n').length : 0
  let numberOfSkills = skills !== '' ? skills.split('\n').length : 0
  
  
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
  
  let maxKnowledge = currentLevel===0 ? 0 : currentLevel > 50 ? 19 : maxNumberOfKnowledge[currentLevel.toString()]
  
  const container = document.getElementsByClassName('ipsLayout_content')[1]
  let levelBox = document.createElement('div')
  
  levelBox.addClassName('general_box clearfix')
  let levelTitle = document.createElement('h3')
  
  levelTitle.textContent = 'Cálculos de Experiencia'
  let levelList = document.createElement('ul')
  
  levelList.addClassName('ipsList_data clearfix')
  
  ///////////////////////////////////////////////
  ///////////Set values in the dom///////////////
  ///////////////////////////////////////////////
  levelList.appendChild(listDOM('Experiencia Acumulada', allExperience))
  levelList.appendChild(listDOM('Nivel Calculado', newLevel))
  
  /**
   * Set range value in the dom
   * 
   */
  currentTeamRange = range(parseInt(currentLevel))
  calculatedTeamRange = range(parseInt(newLevel))



  levelList.appendChild(listDOM('Rango en el Bando (actual)', currentTeamRange))
  levelList.appendChild(listDOM('Rango en el Bando (calculado)', calculatedTeamRange))



   /**
    * End set range
    */

  levelList.appendChild(listDOM('Experiencia para el próximo nivel', Math.round(nextLevel)))
  levelList.appendChild(listDOM('Máximo de Conocimientos', maxKnowledge))
  levelList.appendChild(listDOM('Máximo de Habilidades', maxNumberOfSkills()))
  levelList.appendChild(listDOM('Máximo nivel de Criaturas', maxCreaturesLevel(currentLevel)))
  
  
  levelBox.appendChild(levelTitle)
  levelBox.appendChild(document.createElement('br'))
  levelBox.appendChild(levelList)
  
  
  
  container.insertBefore(levelBox, container.firstChild)
})()
