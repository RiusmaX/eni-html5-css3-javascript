class Restaurant extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    if (!this.rendered) {
      const urlParams = new URLSearchParams(window.location.search)
      const id = urlParams.get('id')
      this.restaurant = await fetchRestaurantById(id)
      document.title = this.restaurant.title
      this.render(restaurant)
      this.rendered = true
    }
  }

  getRestaurant () {
    return this.restaurant
  }

  render () {
    let element = 
    `
      <restaurant-header></restaurant-header>
      <restaurant-plat-list></restaurant-plat-list>
    `
    this.innerHTML = element
  }
}

customElements.define('restaurant-main', Restaurant)