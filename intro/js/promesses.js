async function init () {
  console.log('init')
  maPremierePromesse()
  .then((resultat) => {
    console.log(resultat)
  })
  .catch(console.error)
  console.log('Je suis après la promesse')

  fetchRestaurants()
}

async function fetchRestaurants () {
  const response = await window.fetch('https://strapi.myidea.fr/restaurants')
  if (response.ok) {
    const data = await response.json()
    console.log(data)
  }
}

function timeout () {
  return new Promise (resolve => setTimeout(resolve, 2000))
}

async function maPromesseAsync () {
  setTimeout(() => {
    return 'Ma promesse async est résolue'
  }, 2000)
}

function maPremierePromesse () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('Promesse résolue !!')
      reject('Oulalala une erreur s\'est produite :\'(')
    }, 3000)
  })
}