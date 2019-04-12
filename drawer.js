var isPainting = false;
var paint = new Array();
var curColor = 'black';
var curSize = '10';

window.onload=function(){
	canv = document.getElementById('drawBoard');

	context = canv.getContext('2d');
		
	canv.width  = document.documentElement.clientWidth;
	canv.height = document.documentElement.clientHeight;

	canv.onmousedown = getClick;
	canv.onmousemove = getMove;
	canv.onmouseup = offBoard;
	canv.onmouseleave = offBoard;
}

function getClick(e) {
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;	
	isPainting = true;

	var spot = new Spot(mouseX, mouseY, false);
	paint.push(spot);

	draw();
}

function getMove(e) {
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;
	
	if(isPainting){
		var spot = new Spot(mouseX, mouseY, true);
		paint.push(spot);
		draw();
	}
}

function offBoard() {
	isPainting = false;
}

function Spot(x, y, dragging) {
	this.x = x;
	this.y = y;
	this.drag = dragging;
	this.color = curColor;
	this.size = curSize;
}

function draw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	for (var i = 0; i < paint.length; i++) {
		context.beginPath();
		
		if(paint[i].drag && i){
			context.moveTo(paint[i-1].x, paint[i-1].y);
		} else {
			context.moveTo(paint[i].x-1, paint[i].y);
		}
		context.lineTo(paint[i].x,paint[i].y);

		context.strokeStyle = paint[i].color;
		context.lineWidth = paint[i].size;
		context.lineJoin = "round";

		context.closePath();
		context.stroke();
	}
}

function clearBoard() {
	paint.length = 0;
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function changeSize () {
	curSize = document.getElementById("size").value;
}

function changeColor (color) {
	document.getElementById(curColor).classList.remove("active");
	curColor = color;
	document.getElementById(color).classList.add("active");
}