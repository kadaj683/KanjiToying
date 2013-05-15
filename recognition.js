var canvas;
var context;
var clicking=false;

var chart;

$(function(){
	canvas = document.getElementById("input");
	context = canvas.getContext("2d");
	$("#input").mousemove(function(e){
		if (!clicking) return ;
		var x = e.pageX - $(this).offset().left ;
		var y = e.pageY - $(this).offset().top ;
		move(x,y);
		//$('#debug').html("moving X: " + x + " Y: " + y);
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

	makechart();

})


var pt;
var angles=[];
var len=0;
function press(x,y){
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(x,y);

	angles=[];
	pt={x:x,y:y};
}
function distance(p1,p2){
	var width = p2.x-p1.x;
	var height = p2.y-p1.y;
	return Math.sqrt(width*width+height*height);
}

function diff(a){
	var res = [];
	var p0 = a[0]; 
	for(var i=1;i<a.length;i++){
		var p=a[i];
		res.push({name:p0.name,x:p0.x,y:((p.y-p0.y)/(p.x-p0.x))});
		p0=p;
	}
	return res;

	
}
function diff_angle(a){
	var res = [];
	var p0 = a[0]; 
	for(var i=1;i<a.length;i++){
		var p=a[i];
		res.push({name:p0.name,x:p0.x,y:Math.atan2((p.y-p0.y),(p.x-p0.x))});
		p0=p;
	}
	return res;	
}
function rev(a){
	var res = [];
	var p0 = a[0]; 
	for(var i=1;i<a.length;i++){
		var p=a[i];
		res.push({name:p0.name,x:p0.x,y:Math.abs(1/(p.y-p0.y))});
		p0=p;
	}
	return res;	
}

function distant(a){
	var res = [];
	var p0 = a[0]; 
	for(var i=1;i<a.length;i++){
		var p=a[i];
		res.push({name:p0.name,x:i,y:distance(p,p0)});
		p0=p;
	}
	return res;	
}

function move(x,y){
	context.lineTo(x,y);
	context.stroke();

	var pt1={x:x,y:y};
	var dist = distance(pt1,pt);
	//if(dist<10) return;
	var width=pt1.x-pt.x;
	var height=pt1.y-pt.y;
	var angle=Math.atan2(height,width)/Math.PI*180;

	//context.beginPath();
	//context.arc(x, y, 3, 0, 2 * Math.PI, true);
	//context.fill();
	context.fillStyle = '#f00';
	context.fillText(angles.length,x+20,y);

	pt=pt1;
	len+=dist;
	angles.push({x:len,y:angle,name:angles.length});
	$('#debug').html(angle);
}
function release(x,y){
	context.lineTo(x,y);
	context.stroke();

	
	//chart.addSeries({data:rev(diff(diff_angle(angles)))});
	chart.addSeries({data:distant(diff_angle(angles))});
}



function makechart()
{
	//var data=[1,2,3,4,-5];
   	chart=$('#chart').highcharts({
        chart: {
            zoomType: 'x',
            spacingRight: 20
        },
        xAxis: {
        	type: "linear",
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        /*series: [{
            type: 'area',
            name: null,
            pointInterval: 1,
            pointStart: 0,
            data: data
        }]*/
    });
    chart=chart.highcharts();

}