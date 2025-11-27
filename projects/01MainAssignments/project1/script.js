let font;

function preload() {
  font = loadFont('OmnivorefreeRegular-lxxYd.otf');
	 bg = loadImage("bliss-windows-xp.jpg");// note that this font is in the files section, you will need to add a new otf file to use other fonts
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
  textFont(font);
  textSize(width / 5);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(0);
	translate(0, 0, -500)
	//text was cut off by background, hence -/+500
	image(bg, -width, -height, width*2, height*2)
	//same problem with image: set it -width
	translate(0, 0, 500);
	
  rotateX(frameCount/150);
  rotateZ(frameCount/150);
	
	fill("red")
   text('IAD', mouseX - width/2, mouseY - width/2)
	fill("orange")
	text('on', mouseX-width/2, mouseY-width/2+100)
	fill("yellow")
	text('top', mouseX-width/2, mouseY-width/2+200)
	fill("green")
	text('!!!', mouseX-width/2, mouseY-width/2+300)
}

//text too far away; fixed it with width, height / 2