var isPainting = false;
var paint = new Array();
window.onload=function(){
	canv = document.getElementById('drawBoard');
	context = canv.getContext('2d');
	canv.onmousedown = getClick;
	canv.onmousemove = getMove;
	canv.onmouseup = offBoard;
	canv.onmouseleave = offBoard;
}

function getClick (e) {
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;	
	isPainting = true;

	var spot = new Spot(mouseX, mouseY, false, 'red');
	paint.push(spot);

	draw();
	console.log(isPainting);
}

function getMove (e) {
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;
	
	if(isPainting){
		var spot = new Spot(mouseX, mouseY, true, 'red');
		paint.push(spot);
		draw();
	}
}

function offBoard () {
	isPainting = false;
}

function Spot (x, y, dragging, color) {
	// console.log(x, y, dragging, color);
	this.x = x;
	this.y = y;
	this.drag = dragging;
	this.color = color;
}

function draw () {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.strokeStyle = "#df4b26";
	context.lineJoin = "round";
	context.lineWidth = 5;

	for (var i = 0; i < paint.length; i++) {
		context.beginPath();
		if(paint[i].drag && i){
			context.moveTo(paint[i-1].x, paint[i-1].y);
		}
		else{
			context.moveTo(paint[i].x-1, paint[i].y);
		}
		context.lineTo(paint[i].x,paint[i].y);
		context.closePath();
		context.stroke();
	}
}