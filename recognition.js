var canvas;
var context;
var clicking=false;

var chart;
var charts=[];

var pt;
var coords=[];
var len=0;

var element;
var visible=false;

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

	$("#toggle").click(function() {
		visible = !visible;
		if(visible) {
			for(var i=0; i< charts.length;i++)
				charts[i].redraw();
			$(".charts").show();
		}
		else $(".charts").hide();  
	})

	element = $("#chart");

	//makechart();

})



function distance(p1,p2){
	var width = p2.x-p1.x;
	var height = p2.y-p1.y;
	return Math.sqrt(width*width+height*height);
}

function pair_map(f,a) {
	var res=[];
	var p0=a[0];
	for(var i=1;i<a.length;i++){
		var p=a[i];
		res.push({name:p0.name,x:p0.x,y:f(p0,p)});
		p0=p;
	}
	return res;

}

function diff(a){
	return pair_map(function(p0,p){
		return ((p.y-p0.y)/(p.x-p0.x))
	},a);	
}
function diff_angle(a){
	return pair_map(function(p0,p){
		return Math.atan2((p.y-p0.y),(p.x-p0.x))
	},a);		
}
function rev(a){
	return pair_map(function(p0,p){
		return Math.abs(1/(p.y-p0.y))
	},a);	
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



function vec_diff(a,n) {
	var res = [];
	//var p0 = a[0];
	for(var i=n;i<a.length-n;i++){
		var p0=a[i-n];
		var p=a[i];
		var p1 = a[i+n];
		var v0 = {x:p.x-p0.x,y:p.y-p0.y};
		var v1 = {x:p1.x-p.x,y:p1.y-p.y};
		var vdiff = {x:v0.x-v1.x,y:v0.y-v1.y};
		var size = distance({x:0,y:0},vdiff); 
		res.push({name:p.name,x:i,y:size});
	}
	return res;	

}

function local_max(a,n) {
	var res = [];
	//var p0 = a[0];
	for(var i=n;i<a.length-n;i++){
		var p0=a[i-n];
		var p=a[i];
		var p1 = a[i+n];
		var local=true;
		for(var j=i-n;j<i;j++) {
			if(a[j].y>=a[j+1].y) {
				local=false;
				break;
			}
		}
		for(var k=i+1;k<=i+n;k++) {
			if(a[k-1].y<=a[k].y) {
				local=false;
				break;
			}
		}
		if(local)res.push(p);
	}
	return res;	

}

function gather_corners(a,range,freq,leave_chains) {
	if(!range)range=3;
	if(!freq)freq=1;
	freqs={};
	var res=[];
	for(var i=1;i<=10;i++) {
		var cur=local_max(vec_diff(a,i),range);
		cur.map(function(p){
			if(freqs[p.x])freqs[p.x]++;
			else freqs[p.x]=1;
		})
	}
	for(var key in freqs) {
		var value=freqs[key];
		if(freqs.hasOwnProperty(key)&&value>freq) {
			var pt=a[key];
			pt.name=parseInt(key);
			res.push(pt);
		}
	}
	res=res.sort(function(p1,p2){return p1.name>p2.name});
	if(!leave_chains) {
		var bad_ind=[];
		for(var i=1;i<res.length;i++)
			if(res[i].name==res[i-1].name+1)
				bad_ind.push(i);
		for(var j=0;j<bad_ind.length;j++)
			delete res[bad_ind[j]];
		res=res.filter(function(a){return a});
	}
	return res;
	
}

function resample(a,len,n) {
	a=a.slice();
	var res = [a[0]];
	var step = len/(n-1);
	var D = 0;
	var i = 1;
	var p0 = a[i-1];
	var p = a[i];

	for(var i=1;i<a.length;i++) {
		p0=a[i-1];
		p=a[i];
		var dist = distance(p,p0);
		if(D+dist>=step) {
			var x = p0.x+((step-D)/dist)*(p.x-p0.x);
			var y = p0.y+((step-D)/dist)*(p.y-p0.y);
			var q = {x:x,y:y};
			res.push(q);
			a.splice(i,0,q);
			D=0;
		}
		else {
			D += dist;
		}
		//res.push({name:p0.name,x:i,y:size});
		//p0=p;
	} while (i<a.length);
	res.push(a[a.length-1]);
	return res;	

}

function press(x,y){
	len=0;
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(x,y);

	coords=[];
	pt={x:x,y:y};
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


	//context.fillStyle = '#f00';
	//context.fillText(angles.length,x+20,y);

	pt=pt1;
	len+=dist;
	//angles.push({x:len,y:angle,name:angles.length});
	coords.push({x:x,y:y,name:coords.length});
	$('#debug').html(angle);
}
function release(x,y){
	context.lineTo(x,y);
	context.stroke();

	var resampled=resample(coords,len,30);

	for(var k=0;k<resampled.length;k++) {
		var p=resampled[k];
		context.fillStyle = '#f00';
		context.fillText(k,p.x+20,p.y);
	}

	//chart.addSeries({data:rev(diff(diff_angle(angles)))});
	//chart.addSeries({data:distant(diff_angle(angles))});

	insertChart();
	for(var i=1;i<=10;i++) 
		insertSeries(vec_diff(resampled,i));

	var corners=gather_corners(resampled,1,1);
	for(var i=0;i<corners.length;i++) {
		context.strokeStyle="red";
		var pt=corners[i];
		console.log(pt);
		context.fillRect(pt.x-2, pt.y-2, 10, 10);
	}
	//chart.addSeries({data:vec_diff(angles,2)});
	//chart.addSeries({data:vec_diff(angles,3)});

}


function insertSeries(data) {
	chart.addSeries({data:data},visible);
}



function insertChart() {
	//var data=[1,2,3,4,-5];
	var style=' style="height: 500px; width: 100%';
	if(!visible) style+='; display:none"';
	style+='"';
	var div='<div class="charts"'+style+'></div>'
   	chart=$(div).insertAfter(element).highcharts({
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
    charts.push(chart);

}