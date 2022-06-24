  /**
   * Setting all variables
   */
  
  let isMouseDown=false
  let canvas = document.createElement('canvas')
  let body = document.getElementsByTagName('body')[0]
  let ctx = canvas.getContext('2d')
  let linesArray = []
  let currentSize = 5
  let currentColor = 'rgb(200,20,100)'
  var currentBg = 'white'
  
  /**
   * Initialization
   */
  
  createCanvas()
  
  /**
   * Button Event Handlers
   */
  
  document.getElementById('canvasUpdate').addEventListener('click', () => {
    createCanvas()
    redraw()
  })
  document.getElementById('colorpicker').addEventListener('change', () => {
    currentColor= this.value
  })
  document.getElementById('bgcolorpicker').addEventListener('change', () => {
    ctx.fillStyle = this.value
    ctx.fillRect(0, 0, canvas.width, canvas.heigth)
    redraw()
    currentBg = ctx.fillStyle
  })
  document.getElementById('controlSize').addEventListener('change', () => {
    currentSize = this.value
    document.getElementById('showSize').innerHTML = this.value
  })
  document.getElementById('saveToImage').addEventListener('click', () => {
    downloadCanvas(this, 'canvas', 'masterpiece.png')
  }, false)
  document.getElementById('eraser').addEventListener('click', eraser)
  document.getElementById('clear').addEventListener('click', createCanvas)
  document.getElementById('save').addEventListener('click', save)
  document.getElementById('load').addEventListener('click', load)
  document.getElementById('clearCache').addEventListener('click', () => {
    localStorage.removeItem('savedCanvas')
    linesArray = []
    console.log('Cache cleared!')
  })
  
  /**
   * Redraw
   */
  
  function redraw () {
    for (let i = 1; i < linesArray.length; i++) {
      ctx.beginPath()
      ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y)
      ctx.lineWidth = linesArray[i].size
      ctx.lineCap = 'round'
      ctx.strokeStyle = linesArray[i].color
      ctx.lineTo(linesArray[i].x, linesArray[i].y)
      ctx.stroke()
    }
  }
  
  /**
   * Drawing Event handlers
   */
  
  canvas.addEventListener('mousedown', (event) => mousedown(canvas, event))
  canvas.addEventListener('mousemove', (event) => mousemove(canvas, event))
  canvas.addEventListener('mouseup', mouseup)
  
  /**
   * Create Canvas
   */
  
  function createCanvas () {
    canvas.id = 'canvas'
    canvas.width = parseInt(document.getElementById('sizeX').value)
    canvas.height = parseInt(document.getElementById('sizeY').value)
    canvas.style.zIndex = 8
    canvas.style.position = 'absolute'
    canvas.style.border = '1px solid black'
    ctx.fillStyle = currentBg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    body.appendChild(canvas)
  }
  
  /**
   * Download canvas
   */
  
  function downloadCanvas(link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL()
    link.download = filename
  }
  
  /**
   * Save function
   */
  
  function save () {
    localStorage.removeItem('savedCanvas')
    localStorage.setItem('savedCanvas', JSON.stringify(linesArray))
    console.log('Saved canvas !')
  }
  
  /**
   * Load function
   */
  
  function load () {
    if (localStorage.getItem('savedCanvas')) {
      linesArray = JSON.parse(localStorage.getItem('savedCanvas'))
      for (let i = 1; i < linesArray.length; i++) {
        ctx.beginPath()
        ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y)
        ctx.lineWidth = linesArray[i].size
        ctx.lineCap = 'round'
        ctx.strokeStyle = linesArray[i].color
        ctx.lineTo(linesArray[i].x, linesArray[i].y)
        ctx.stroke()
      }
      console.log('Canvas loaded')
    } else {
      console.log('No canvas in local storage !')
    }
  }
  
  /**
   * Eraser handling
   */
  
  function eraser () {
    currentSize = 50
    currentColor = ctx.fillStyle
  }
  
  /**
   * Get Mouse Position
   */
  
  function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }
  
  /**
   * On Mouse Down
   */
  function mousedown (canvas, evt) {
    let mousePos = getMousePos(canvas, evt)
    isMouseDown = true
    ctx.moveTo(mousePos.x, mousePos.y)
    ctx.beginPath()
    ctx.lineWidth = currentSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor
  }
  
  /**
   * On Mouse Move
   */
  function mousemove(canvas, evt) {
    if (isMouseDown) {
      let mousePos = getMousePos(canvas, evt)
      ctx.lineTo(mousePos.x, mousePos.y)
      ctx.stroke()
      store(mousePos.x, mousePos.y, currentSize, currentColor)
    }
  }
  
  /**
   * Store data
   */
  function store(x, y, s, c) {
    linesArray.push({
      'x': x,
      'y': y,
      'size': s,
      'color': c
    })
  }
  
  /**
   * On mouse up
   */
  
  function mouseup () {
    isMouseDown = false
    store()
  }
