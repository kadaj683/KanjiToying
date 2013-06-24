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


/*var strokes=[
	{
		name:"\u31D4",
		sname:"d",
		points:1,
		isStroke:function(p0,p1,p2){
			return lesser(p0.x,p1.x,p2.x)&&
				lesser(p0.y,p1.y,p2.y)
		}
	},
	{
		name:"\u31D0",
		sname:"h",
		points:0,
		isStroke:function(p0,p1) {
			return eq(p0.y,p1.y)&&lesser(p0.x,p1.x)
		}
	},
	{
		name:"\u31D1",
		sname:"s",
		points:0,
		isStroke:function(p0,p1) {
			return eq(p0.x,p0.y)&&lesser(p0.y,p1.y)
		}
	},
	{
		name:"\u31D2",
		sname:"p",
		points:1,
		isStroke:function(p0,p1,p2) {
			return greater(p0.x,p1.x,p2.x)&&
				lesser(p0.y,p1.y,p2.y)
		}
	},
	{
		name:"\u31CF",
		sname:"n",
		points:1,
		isStroke:function(p0,p1,p2) {
			return lesser(p0.x,p2.x)&&
				lesser(p0.y,p2.y)
		}
	},
	{
		name:"\u31C0",
		sname:"t",
		points:0,
		isStroke:function(p0,p1) {
			return lesser(p0.x,p1.x)&&
				greater(p0.y,p1.y)
		}
	},
	{
		name:"\u31D6",
		sname:"a",
		points:1,
		isStroke:function(p0,p1,p2) {
			return lesser(p0.x,p1.x)&&
				greater(p1.x,p2.x)&&
				eq(p0.y,p1.y)&&
				lesser(p1.y,p2.y)
		}
	},
	{
		name:"\u31DA",
		sname:"S",
		points:1,
		isStroke:function(p0,p1,p2) {
			return eq(p0.x,p1.x)&&
				greater(p1.x,p2.x)&&
				lesser(p0.y,p1.y,p2.y)
		}
	},
	{
		name:"\u31C2",
		sname:"Y",
		points:2,
		isStroke:function(p0,p1,p3,p4) {
			return lesser(p0.x,p3.x)&&
				eq(p3.x,p4.x)&&
				lesser(p0.y,p4.y,p3.y)
		}
	},
	{
		name:"\u31D9",
		sname:"e",
		points:1,
		isStroke:function(p0,p1,p2) {
			return eq(p0.x,p1.x)&&
				lesser(p1.x,p2.x)&&
				lesser(p0.y,p2.y,p1.y)
		}
	},
	{
		name:"\u31D5",
		sname:"i",
		points:1,
		isStroke:function(p0,p1,p2) {
			return eq(p0.y,p1.y)&&
				lesser(p1.y,p2.y)&&
				lesser(p0.x,p1.x)&&
				eq(p1.x,p2.x)
		}
	},
	{
		name:"\u31D7",
		sname:"b",
		points:1,
		isStroke:function(p0,p1,p2) {
			return eq(p0.x,p1.x)&&
				lesser(p1.x,p2.x)&&
				lesser(p0.y,p1.y)&&
				eq(p1.y,p2.y)
		}
	},
	{
		name:"\u31DB",
		sname:"g",
		points:1,
		isStroke:function(p0,p1,p2) {
			return lesser(p1.x,p0.x,p2.x)&&
				eq((p0.x-p1.x)*2,p2.x-p1.x)&&
				lesser(p0.y,p1.y,p2.y)
		}
	},
	{
		name:"\u31DC",
		sname:"r",
		points:1,
		isStroke:function(p0,p2,p3) {
			return greater(p3.x,p0.x,p2.x)&&
				lesser(p0.y,p3.y,p2.y)
		}
	},
	{
		name:"\u31C7",
		sname:"k",
		points:1,
		isStroke:function(p0,p1,p3) {
			return eq(p0.y,p1.y)&&
				lesser(p1.y,p3.y)&&
				eq(p0.x,p3.x)&&
				lesser(p3.x,p1.x)
		}
	},
	{
		name:"\u31C4",
		sname:"c",
		points:1,
		isStroke:function(p0,p1,p3) {
			return lesser(p0.x,p3.x)&&
				lesser(p0.y,p3.y)
		}
	},
	{
		name:"\u31C6",
		sname:"j",
		points:2,
		isStroke:function(p0,p1,p2,p3) {
			return eq(p0.y,p1.y)&&
				lesser(p1.y,p3.y,p2.y)&&
				lesser(p0.x,p3.x,p1.x)&&
				eq(p1.x,p2.x)
		}
	},
	{
		name:"\u31DF",
		sname:"w",
		points:1,
		isStroke:function(p0,p3,p4) {
			return lesser(p0.x,p3.x)&&
				eq(p3.x,p4.x)&&
				lesser(p0.y,p3.y)&&
				eq(p3.y,p4.y)
		}
	},
	{
		name:"\u31C9",
		sname:"C",
		points:3,
		isStroke:function(p0,p1,p2,p3,p4) {
			console.log(p0);
			console.log(p1);
			console.log(p2);
			console.log(p3);
			console.log(p4);
			return eq(p0.x,p1.x)&&
				greater(p1.x,p2.x)&&
				eq(p2.x,p3.x)&&
				greater(p3.x,p4.x,p1.x)&&
				lesser(p0.y,p1.y)&&
				eq(p1.y,p2.y)&&
				lesser(p4.y,p3.y)&&
				eq(p1.y-p0.y,p3.y-p2.y)
		}
	},
	{
		name:"\u31CB",
		sname:"R",
		points:3,
		isStroke:function(p0,p1,p2,p3,p4) {
			return le(p0.x,p2.x)&&
				lesser(p2.x,p1.x)&&
				le(p1.x,p3.x)&&
				ge(p0.x,p4.x)&&
				eq(p0.y,p1.y)&&
				lesser(p1.y,p2.y)&&
				eq(p2.y,p3.y)&&
				lesser(p3.y,p4.y)
		}
	},
	{
		name:"\u31CC",
		sname:"K",
		points:3,
		isStroke:function(p0,p1,p2,p3,p4) {
			return le(p0.x,p2.x)&&
				lesser(p2.x,p1.x)&&
				greater(p3.x,p4.x)&&
				eq(p4.x,p0.x)&&
				eq(p0.y,p1.y)&&
				lesser(p1.y,p2.y,p4.y)&&
				lesser(p4.y,p3.y)
		}
	},
	{
		name:"\u31C8",
		sname:"m",
		points:3,
		isStroke:function(p0,p1,p4,p5,p6){
			return le(p0.x,p4.x)&&
				lesser(p4.x,p1.x,p5.x)&&
				eq(p5.x,p6.x)&&
				eq(p0.y,p1.y)&&
				lesser(p1.y,p6.y,p4.y)&&
				eq(p4.y,p5.y)
		}
	},
	{
		name:"\u31C5",
		sname:"N",
		points:2,
		isStroke:function(p0,p1,p2,p3) {
			return lesser(p0.x,p1.x)&&
				eq(p1.x,p2.x)&&
				lesser(p2.x,p3.x)&&
				eq(p3.x-p2.x,p1.x-p0.x)&&
				eq(p0.y,p1.y)&&
				lesser(p1.y,p2.y)&&
				eq(p2.y,p3.y)
		}
	},
	{
		name:"\u31DE",
		sname:"B",
		points:2,
		isStroke:function(p0,p1,p2,p3) {
			return eq(p0.x,p1.x)&&
				greater(p1.x,p2.x)&&
				eq(p2.x,p3.x)&&
				lesser(p0.y,p1.y)&&
				eq(p1.y,p2.y)&&
				lesser(p2.y,p3.y)&&
				eq(p3.y-p2.y,p1.y-p0.y)
		}
	}
]*/

var basic_strokes={
	dian: {
		isStroke:function(p0,p1) {
			return distance(p0,p1)<20
		}
	},
	heng: {
		isStroke:function(p0,p1) {
			return direction(p0,p1)=="E";
		}
	},
	shu: {
		isStroke:function(p0,p1) {
			return direction(p0,p1)=="S";
		}
	},
	ti: {
		isStroke:function(p0,p1) {
			return direction(p0,p1)=="NE";
		}
	},
	pie: {
		isStroke:function(p0,p1) {
			return direction(p0,p1)=="SW";
		}
	},
	na: {
		isStroke:function(p0,p1) {
			return direction(p0,p1)=="SE";
		}
	}/*,
	gou: {
		isStroke:function(p0,p1) {
			return 
		}
	}*/
}

var comb_strokes={
	xie:{
		isStrokePt: function(pts) {
			var beg=pts[0];
			var end=pts[pts.length-1];
			if(direction(beg,end)=="SE"&&
				curve_coef2(pts,beg)<-0.25)return true;
				else return false;
		}
	}
}

var complex_strokes={
	shuti:[["shu","ti"]],
	hengzhe:[["heng","shu"]],
	shuzhe:[["shu","heng"]],
	piedian:[["pie","na"]],
	piezhe:[["pie","shu"],["pie","ti"]],
	hengpie:[["heng","pie"]],
	shuwan:[["shu","heng"],["shu","ti"],["shu","xie"],
		["shu","xiegou"]],
	hengzhegou:[["heng","zhe","gou"]],
	shuwangou:[["shu","xiegou"]],
	shuzhewangou:[["shu","heng","shugou"]],
	hengzhezhepie:[["heng","pie","shu","pie"]],
	hengpiewangou:[["heng","pie","na","pie"]],
	hengzhewangou:[["heng","shu","heng","ti"],
		["heng","shu","henggou"]],
	hengzhezhe:[["heng","shu","heng"]],
	shuzhezhe:[["shu","heng","shu"],["shu","heng","pie"]]
}
function hookify(stroke_type) {
	switch(stroke_type) {
		case "heng":
		case "ti":
			return "henggou";
		case "xie":
		case "na":
			return "xiegou";
		case "shu":
			return "shugou";
	}
	return stroke_type
}

function hasHook(pts) {
	var ind=Math.floor(pts.length*7/8);
	var hook=pts.slice(ind);
	var straight=pts.slice(0,ind);
	console.log(curve_coef(straight));
	console.log(curve_coef(hook));
	return curve_coef(hook)>1.01
}
function direction(p0,p1,r) {
	if(!r)r=10;
	var a=deg(angle(p0,p1));
	if(interval(0,a,r)||interval(360-r,a,360))return "E";
	if(interval(90-r,a,90+r))return "N";
	if(interval(180-r,a,180+r))return "W";
	if(interval(270-r,a,270+r))return "S";
	if(interval(r,a,90-r))return "NE";
	if(interval(90+r,a,180-r))return "NW";
	if(interval(180+r,a,270-r))return "SW";
	if(interval(270+r,a,360-r))return "SE";
}

function interval(a,b,c) {
	return (a<=b)&&(b<=c);
}

function deg(rad) {
	return normalize(rad/Math.PI*180)
}

function normalize(deg) {
	return deg-Math.floor((deg-360)/360+1)*360
}

function angle(p0,p) {
	return Math.atan2((-p.y+p0.y),(p.x-p0.x))
}

function curve_length(pts) {
	var dist=0;
	for(var i=1;i<pts.length;i++) {
		dist+=distance(pts[i],pts[i-1]);
	} 
	return dist;
}

function curve_coef(pts) {
	return curve_length(pts)/
		distance(pts[0],pts[pts.length-1]);
}

function curve_coef2(pts,beg) {
	if(!beg)beg=pts[0];
	var end=pts[pts.length-1];
	var s=0;
	var ideal=angle(beg,end);
	for(var i=1;i<pts.length;i++) {
		var a=angle(beg,pts[i])-ideal;
		s+=a;
	} 
	return s/(pts.length-1);
}

function check_strokes(points,bdian,bxie) {
	var corners=gather_corners(points)
	var beg=points[0]
	var end=points[points.length-1];
	if(hasHook(points))console.log("hook");
	if(bxie&&comb_strokes.xie.isStrokePt(points))
		return "xie";//comb_strokes.xie;
	for(var key in basic_strokes) {
		if(basic_strokes.hasOwnProperty(key)) {
			var stroke=basic_strokes[key];
			var match=stroke.isStroke(beg,end);
			if(match) {
				if(key=="dian"&&!bdian)continue;
				return key//basic_strokes[key];
			}
		}
	}
	
}

function destructure_strokes(points) {
	var beg=points[0];
	var end=points[points.length-1];
	var corners=gather_corners(points,3,2);
	var fullset=[beg].concat(corners).concat([end]);
	var el_strokes=[];
	for(var i=1;i<fullset.length;i++) {
		var part=points.slice(fullset[i-1].name,fullset[i].name);
		if(part.length<=2)continue;
		var hook=false;
		if(i==fullset.length-1)hook=hasHook(part);
		var stroke_type=check_strokes(part,false,true);
		if(hook)stroke_type=hookify(stroke_type);
		el_strokes.push(stroke_type)
	}
	for(var i=1;i<el_strokes.length;i++)
		if(el_strokes[i]==el_strokes[i-1])
			delete el_strokes[i-1];
	el_strokes=el_strokes.filter(function(x){return x})
	if(el_strokes.length==1&&el_strokes[0].search("gou")==-1)
		return check_strokes(points,true,false) 
	return el_strokes;
}

function compare_arrays(a1,a2) {
	if(a1.length!=a2.length)return false;
	for(var i=0;i<a1.length;i++) {
		if(a1[i]!=a2[i])return false
	}
	return true;
}

function check_complex_strokes(points) {
	var el_strokes=destructure_strokes(points);
	if(typeof(el_strokes)==="string")return [el_strokes];
	if(el_strokes.length==1)return el_strokes
	debug(el_strokes)
	var comp_strokes_v=[];
	for(var key in complex_strokes) {
		if(complex_strokes.hasOwnProperty(key)) {
			var variants=complex_strokes[key];
			for(var i=0;i<variants.length;i++) {
				var variant=variants[i];
				if(compare_arrays(el_strokes,variant)) {
					comp_strokes_v.push(key);
					break;
				}
			}
		}
	}
	return comp_strokes_v;

}

/*function check_strokes(points) {
	var corners=gather_corners(points,2,1)
	var beg=points[0]
	var end=points[points.length-1];
	/*for(var i=0;i<strokes.length;i++) {
		var stroke=strokes[i];
		var match=true;
		var point_sets=forward_combinations(
			corners,stroke.points)
		if(stroke.points==0)match=stroke.isStroke(beg,end);
		else for(var j=0;j<point_sets.length;j++) {
			var set=point_sets[j];
			fullset=[beg].concat(set).concat([end]);
			if(!stroke.isStroke.apply(null,fullset)) {
				match=false;
				break;
			}
		}
		if(match) {
			console.log(stroke.sname);
			console.log(fullset);
		}
	}//*
	var fullset=[beg].concat(corners).concat([end]);
	console.log(corners);
	console.log(fullset);
	for(var i=1;i<fullset.length;i++)
		console.log(deg(angle(fullset[i],fullset[i-1])))
}*/

function forward_combinations(a,n,r) {
	if(!r)r=[];
	if(n==0)return [r];
	else if(a.length==n)return [r.concat(a)];
	else if(a.length<n)return [];
	else {
		var c1= forward_combinations(a.slice(1),n-1,r.concat([a[0]]))
		var c2=	forward_combinations(a.slice(1),n,r);
		return c1.concat(c2);
	}
}

function debug(a,msg) {
	if(msg)console.log(msg);
	console.log(a);
	return a;
}


function eq(x1,x2) {
	if(Math.abs(x1-x2)<30)return true;
	else return false;
}

function lt(x1,x2) {
	if(x2-x1>30)return true;
	else return false;
}

function gt(x1,x2) {
	if(x1-x2>30)return true;
	else return false;
}

function le(x1,x2) {
	return lt(x1,x2)||eq(x1,x2);
}

function ge(x1,x2) {
	return gt(x1,x2)||eq(x1,x2);
}

function lesser(x1,x2,x3) {
	return lt(x1,x2)&&((x3)?lt(x2,x3):true);
}

function greater(x1,x2,x3) {
	return gt(x1,x2)&&((x3)?gt(x2,x3):true);
}


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

// function local_max(a,n,m) {
// 	var res = [];
// 	if(!m)m=n;
// 	//var p0 = a[0];
// 	for(var i=n;i<a.length-n;i++){
// 		var p0=a[i-n];
// 		var p=a[i];
// 		var p1 = a[i+n];
// 		var local=true;
// 		for(var j=i-n;j<i;j++) {
// 			if(a[j].y>=a[j+1].y) {
// 				local=false;
// 				break;
// 			}
// 		}
// 		for(var k=i+1;k<=i+n;k++) {
// 			if(a[k-1].y<=a[k].y) {
// 				local=false;
// 				break;
// 			}
// 		}
// 		if(local)res.push(p);
// 	}
// 	return res;	

// }

function local_max(a,n,m) {
	var res = [];
	if(!m)m=n;
	//var p0 = a[0];
	for(var i=0;i<a.length;i++){
		var c1=0;
		var c2=0;
		var p=a[i];
		//var local=true;
		for(var j=i;j>0;j--) {
			if(a[j-1].y>=a[j].y) {
				break;
			} else c1++;
		}
		for(var k=i+1;k<a.length;k++) {
			if(a[k-1].y<=a[k].y) {
				break;
			} else c2++;
		}
		var max=Math.max(c1,c2);
		var min=Math.min(c1,c2);
		var local=max>n&&min>m;
		if(local)res.push(p);
	}
	return res;	

}



function gather_corners(a,range,mrange,freq,leave_chains) {
	if(!range)range=5;
	if(!mrange)mrange=3;
	if(!freq)freq=0;
	freqs={};
	var res=[];
	for(var i=1;i<=10;i++) {
		var cur=local_max(vec_diff(a,i),range,mrange);
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
	//console.log(res);
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

	var name=0;
	for(var i=1;i<a.length;i++) {
		p0=a[i-1];
		p=a[i];
		var dist = distance(p,p0);
		if(D+dist>=step) {
			var x = p0.x+((step-D)/dist)*(p.x-p0.x);
			var y = p0.y+((step-D)/dist)*(p.y-p0.y);
			var q = {x:x,y:y,name:++name};
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
	a[a.length-1].name=++name;
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

	console.log(direction(resampled[0],resampled[resampled.length-1]))
	//chart.addSeries({data:rev(diff(diff_angle(angles)))});
	//chart.addSeries({data:distant(diff_angle(angles))});

	insertChart();
	for(var i=1;i<=10;i++) 
		insertSeries(vec_diff(resampled,i));

	var corners=gather_corners(resampled,3,2,0);
	for(var i=0;i<corners.length;i++) {
		context.strokeStyle="red";
		var pt=corners[i];
		//console.log(pt);
		context.fillRect(pt.x-2, pt.y-2, 10, 10);
	}
	//var corn=local_max(vec_diff(resampled,5),3);
	//debug(corn);
	debug(check_complex_strokes(resampled))
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