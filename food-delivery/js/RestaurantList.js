class RestaurantsList extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    if (!this.rendered) {
      const restaurants = await fetchRestaurants()
      this.render(restaurants)
      this.rendered = true
    }
  }

  renderRestaurant (restaurant) {
    return `
      <div class='card'>
        <img src="${API_URL}${restaurant.photos[0].url}">
        <div class='card-footer'>
          <h2>${restaurant.title}</h2>
          <p>${restaurant.description.substring(0, 150)}...</p>
        </div>
      </div>
    `
  }

  render (restaurants) {
    let element = "<div id='restaurants-list' class='list-container'>"
    restaurants.forEach(restaurant => {
      element += this.renderRestaurant(restaurant)
    })
    element += "</div>"
    this.innerHTML = element
  }
}

customElements.define('restaurants-list', RestaurantsList)