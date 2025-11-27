function preload() {
  font = loadFont('ABCWhyte-BookItalic-Trial.otf')
}

let brushColor
let brushSize = 10

//Layer for drawing
let drawingLayer

// Buttons
let eraserX, eraserY
let colorX, colorY
let sizeX, sizeY

// Button-Speed
let speedEraserX, speedEraserY
let speedColorX, speedColorY
let speedSizeX, speedSizeY

//Size Button
let buttonW = 100
let buttonH = 70

function setup() {
  createCanvas(windowWidth, windowHeight)

	textFont(font)

  drawingLayer = createGraphics(windowWidth, windowHeight)
  drawingLayer.background(255)
	/* following problem posed itself: The buttons were leaving a trace all across the canvas
	that i couldnt get rid of. Solution: Two layers, one for drawing and one for the buttons*/

  brushColor = color(0)

  //Positions buttons
  eraserX = random(width);   eraserY = random(height)
  colorX  = random(width);   colorY  = random(height)
  sizeX   = random(width);   sizeY   = random(height)

  // Speed & directions buttons
  speedEraserX = random([-4, 4])
  speedEraserY = random([-4, 4])
  speedColorX  = random([-4, 4])
  speedColorY  = random([-4, 4])
  speedSizeX   = random([-4, 4])
  speedSizeY   = random([-4, 4])
}

function draw() {
  // Image layer first
  image(drawingLayer, 0, 0)

  // Now the rest
  fill(255)
  noStroke()
  

  // Buttons bewegen
  moveButton()

  // Buttons zeichnen
  drawButton(eraserX, eraserY, "Eraser")
  drawButton(colorX, colorY, "Random Color")
  drawButton(sizeX, sizeY, "Random Size")

  // With drwaingLayer. stuff is only drawn on the drawing layer
  if (mouseIsPressed && !isMouseOnButton()) {
    drawingLayer.stroke(brushColor)
    drawingLayer.strokeWeight(brushSize)
    drawingLayer.line(mouseX, mouseY, pmouseX, pmouseY)
  }
}

// Button movement with speed
function moveButton() {
  eraserX += speedEraserX;   eraserY += speedEraserY
  colorX  += speedColorX;    colorY  += speedColorY
  sizeX   += speedSizeX;     sizeY   += speedSizeY

  // Bounce off sides
  if (eraserX < 0 || eraserX + buttonW > width) speedEraserX *= -1
  if (eraserY < 0 || eraserY + buttonH > height) speedEraserY *= -1

  if (colorX < 0 || colorX + buttonW > width) speedColorX *= -1
  if (colorY < 0 || colorY + buttonH > height) speedColorY *= -1

  if (sizeX < 0 || sizeX + buttonW > width) speedSizeX *= -1
  if (sizeY < 0 || sizeY + buttonH > height) speedSizeY *= -1
}

// Button is defined so it can be drawn
function drawButton(x, y, label) {
  fill("#FFC0CB")
  stroke(0)
  rect(x, y, buttonW, buttonH)

  noStroke()
  fill(0)
  textAlign(CENTER, CENTER)
  textSize(14)
  text(label, x + buttonW/2, y + buttonH/2)
}

/* Hit is used, so programme knows where 
mouse is clicking and no buttons are clicked by accident*/

function hit(bx, by) {
  return mouseX > bx && mouseX < bx + buttonW &&
         mouseY > by && mouseY < by + buttonH
}

function isMouseOnButton() {
  return hit(eraserX, eraserY) ||
         hit(colorX, colorY) ||
         hit(sizeX, sizeY)
}

function mousePressed() {
  if (hit(eraserX, eraserY)) {
    brushColor = color(255)
  }
  if (hit(colorX, colorY)) {
    brushColor = color(random(255), random(255), random(255))
  }
  if (hit(sizeX, sizeY)) {
    brushSize = round(random(5, 50))
  }
}
