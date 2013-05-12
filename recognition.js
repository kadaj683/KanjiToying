var canvas;
var context;
var clicking=false;

$(function(){
	canvas = document.getElementById("input");
	context = canvas.getContext("2d");
	$("#input").mousemove(function(e){
		if (!clicking) return ;
		var x = e.pageX - $(this).offset().left ;
		var y = e.pageY - $(this).offset().top ;
		move(x,y);
		$('#debug').html("moving X: " + x + " Y: " + y);
	});
	$("#input").mousedown(function(e){
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top ;
		clicking = true;
		press(x,y);
		$('#debug').html("Clicked--> X: " + x + " Y: " + y);
	});
	$("#input").mouseup(function(e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top ;
		clicking = false;
		release(x,y);
		$('#debug').html("Done Clicking");
	});

})

function press(x,y){
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(x,y);

}
function move(x,y){
	context.lineTo(x,y);
	context.stroke();
}
function release(x,y){
	context.lineTo(x,y);
	context.stroke();
}