const data = ['Banane', 'Fraise', 'Pomme', 'Kiwi', 'Melon', 'Tomate']

function init () {
  console.log('JE SUIS UNE FONCTION INIT')
  const main = document.querySelector('main')
  // for (let i = 0; i < data.length; i++) {
  //   const elementString = showFruit(data[i])
  //   main.innerHTML += elementString
  // }

  // window.sessionStorage.setItem('fruits', JSON.stringify(data))

  const db = window.openDatabase('maBase', '1.0', 'Ma première base', 5 * 1024 * 1024)
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS maTable (id INTEGER PRIMARY KEY, nom TEXT, age NUMERIC)', [], function (tx, rs) {
      tx.executeSql('INSERT INTO maTable (nom, age) values (?,?)', ['Dupont', 16])
    }, function(tx, error) {
      console.error('Impossible de créer la table : ' + error.message)
    })
  })

  cookiesFunction()

  const filteredData = data.filter(fruit => fruit.length < 6)

  filteredData.forEach(fruit => {
    const elementString = showFruit(fruit)
    main.innerHTML += elementString
  });
}

function cookiesFunction() {
  // On split pour récupérer les cookies séparément
  const cookies = document.cookie.split(/; /)
  console.log(cookies)

  // On affect nos cookies dans un tableau d'objets
  const cookiesObjects = []
  cookies.forEach(c => {
    cookiesObjects.push(
      {
        [c.split(/=/)[0]]: c.split(/=/)[1] // Utilisation des [] afin d'utiliser une clé dynamique
      }
    )
  })

  console.log(cookiesObjects)

  const cookieNbShow = cookiesObjects.find(c => Object.keys(c)[0] === 'nbShow')
  
  console.log(cookieNbShow)

  cookieNbShow.nbShow = Number(cookieNbShow.nbShow) + 1

  console.log(cookieNbShow)

  let dateNum = new Date()
  dateNum.setFullYear(dateNum.getFullYear() + 1)
  let exp = `expires=${dateNum.toUTCString()}`

  document.cookie = `nbShow=${cookieNbShow.nbShow || '1'};${exp}`
  document.cookie = `bg=#333;${exp}`
}

function handleClickMe () {
  const paragraphe = document.querySelector('#monParagraphe')
  document.body.style.backgroundColor = generateRandomColor()
}

function generateRandomColor () {
  // const randomColor = Math.floor(Math.random()*16777215).toString(16)
  // const color = '#' + randomColor
  // const color = `#${randomColor}`
  // return color
  let color = Math.floor(Math.random()*16777215).toString(16)
  while(color.length < 6) {
    color = Math.floor(Math.random()*16777215).toString(16)
  }
  return `#${color}`
}

/**
 * Create a HTML Element from a fruit in parameter
 * @param {string} fruit 
 * @returns HTMLElement
 */
function showFruit (fruit) {
  return `
    <div style="background-color: ${generateRandomColor()};">
      <p>Je suis ${fruit}</p>
    </div>
  `
}

window.addEventListener('load', function () {
  console.log('COUCOU JE SUIS CHARGEE')
})