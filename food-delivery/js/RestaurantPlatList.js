const categoriesTrad = {
  starter: 'Entrées',
  dish: 'Plats',
  dessert: 'Dessert',
  drink: 'Boissons'
}


class RestaurantsList extends HTMLElement {
  constructor() {
    super()
  
    this.restaurant = document.getElementById('restaurant').getRestaurant()
  }

  async connectedCallback() {
    if (!this.rendered) {
      this.render(this.restaurant.plats)
      this.rendered = true
    }
  }

  renderPlat (plat) {
    return `
      <div class='card'>
        <img src="${plat.photos[0] ? API_URL + plat.photos[0].url : 'https://via.placeholder.com/400x250'}">
        <div class='card-footer'>
          <h2>${plat.nom}</h2>
          <p>${plat.description}</p>
          <p><strong>${plat.price.toFixed(2)} €</strong></p>
        </div>
      </div>
    `
  }

  render (plats) {
    const categories = [...new Set(plats.map(p => p.category))]

    let element = "<div class='plat-list-container'>"
    categories.forEach(c => {
      element += `<h4>${categoriesTrad[c]}</h4>`
      element += "<div class='plat-list'>"
      plats.filter(p => p.category === c).forEach(plat => {
        element += this.renderPlat(plat)
      });
      element += "</div>"
    })
    element += "</div>"
  
    this.innerHTML = element
  }
}

customElements.define('restaurant-plat-list', RestaurantsList)