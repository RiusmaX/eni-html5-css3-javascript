class RestaurantsHeader extends HTMLElement {
  constructor() {
    super()

    this.restaurant = document.getElementById('restaurant').getRestaurant()
  }

  async connectedCallback() {
    if (!this.rendered) {
      this.render(this.restaurant)
      this.rendered = true
    }
  }

  render (restaurant) {
    let element = 
    `<div id='restaurant-header' class='restaurant-header'>
      <div class='restaurant-header-left'>
        <img src='${API_URL}${restaurant.photos[0].url}'>
      </div>
      <div class='restaurant-header-right'>
        <h1>${restaurant.title}</h1>
        <p>${restaurant.description}</p>
        <a href='tel:${restaurant.adresse.phone || ''}'>${restaurant.adresse.phone || ''}</a>
        <div class='address'>
          <p>${restaurant.adresse.adresse}</p>
          <p>${restaurant.adresse.code_postal} - ${restaurant.adresse.ville}</p>
        </div>
      </div>
    </div>
    <div class='map'>
      <iframe
        width="100%"
        height="400"
        loading="lazy"
        frameborder="0" 
        style="border:0;margin:0;padding:0;"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB9_R_UodhlqzJ28E-yzF5G0vZdEGy_2pM=&q='${restaurant.title},${restaurant.ville},${restaurant.pays}'">
        </iframe>
    </div>`
    this.innerHTML = element
  }
}

customElements.define('restaurant-header', RestaurantsHeader)