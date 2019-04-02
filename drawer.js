var isPainting = false;
var paint = new Array();
var curColor = 'black';
var curSize = '10';

window.onload=function(){
	canv = document.getElementById('drawBoard');
	context = canv.getContext('2d');
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

		// paint[paint.length-1].drag = true;

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
	console.log(paint);

	for (var i = 0, length = paint.length; i < length; i++) {
		context.lineWidth = paint[i].size*2;
		context.fillStyle = paint[i].color;
		context.lineCap = 'round';

		if(paint[i].drag && i){
			if(paint[i-1].drag){
				context.lineTo(paint[i].x, paint[i].y);
				context.stroke();
			}

			context.beginPath();
			context.arc(paint[i].x, paint[i].y, paint[i].size, 0, 2*Math.PI);
			// context.rect(paint[i].x, paint[i].y, 5, paint[i].size);
			context.fill();

			context.beginPath();
			context.moveTo(paint[i].x, paint[i].y);
		} else{
			context.beginPath();
			context.arc(paint[i].x, paint[i].y, paint[i].size, 0, 2*Math.PI);
			// context.rect(paint[i].x, paint[i].y, 1, paint[i].size);
			context.fill();
		}
	}

}

function clearBoard() {
	paint.length = 0;
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}