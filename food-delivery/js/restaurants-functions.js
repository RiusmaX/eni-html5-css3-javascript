const API_URL = 'https://strapi.myidea.fr'

async function init () {
  const restaurants = await fetchRestaurants()
  console.log(restaurants)
}

async function fetchRestaurants () {
  try {
    const response = await window.fetch(`${API_URL}/restaurants`)
    const restaurants = await response.json()
    return restaurants
  } catch (error) {
    console.error(error)
  }
}

async function fetchRestaurantById (id) {
  try {
    const response = await window.fetch(`${API_URL}/restaurants/${id}`)
    const restaurants = await response.json()
    return restaurants
  } catch (error) {
    console.error(error)
  }
}

