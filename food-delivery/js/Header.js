class Header extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  render() {
    let element =
      `<header>
    <img src='./img/logo-deliveroo.png' />
    <div id='header-left'>
      <h1>Food Delivery</h1>
      <h2>Votre repas quand vous voulez, où vous voulez</h2>
    </div>
    <nav>
      <a href='./'>Accueil</a>
      <a href='./restaurants.html'>Restaurants</a>
      <a href='./a-propos.html'>A propos</a>
      <a href='#'>Mon Compte</a>
    </nav>
  </header>`
    this.innerHTML = element
  }
}

customElements.define('site-header', Header)