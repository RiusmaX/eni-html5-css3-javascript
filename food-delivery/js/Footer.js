class Footer extends HTMLElement {
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
      `<footer>
      <p>Ceci est un footer ✌️</p>
    </footer>`
    this.innerHTML = element
  }
}

customElements.define('site-footer', Footer)