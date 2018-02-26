//定时器
var clock=null;
//起始分数为0
var score=0;
//黑块下落的速度
var speed=4;

//初始化init,创建4个<div class="row">
 function init() {
 	for (var i = 0; i < 4; i++) {
 		createRow();
 	}
 //为黑块添加点击函数
 var container=document.getElementById('container');
 container.onclick=function(event){
 	judge(event);
 }
  //定时器，每30毫秒调用一次move()
  clock=window.setInterval('move()',30);
  
 }


//创建div函数,参数classname是其类名
function createDiv(classname) {
	var div=document.createElement('div');
	div.className=classname;
	return div;
}

//生成<div class="cell">的类名函数
function createCell() {
	// body...
  var temp=['cell','cell','cell','cell'];
  var i=Math.floor(Math.random()*4);
  temp[i]='cell black';
  return temp;
}

//创造一个<div class="row">里包含了四个<div class="cell">，并且每一行里只有一个黑块
function createRow() {
	var container=document.getElementById('container');
	var row=createDiv("row");
	var arr=createCell();
	//container.appendChild(row);
	if(container.firstChild==null){
	  container.appendChild(row);
	}else{
		container.insertBefore(row,container.firstChild);
	}
    //添加row的子节点
	for (var i = 0; i < 4; i++) {
		row.appendChild(createDiv(arr[i]));
	}
}


//判断用户有没有点击到黑块.如果没有点击到，则游戏失败
 function judge(event) {
      
      if(event.target.className.indexOf('black') != -1)
      	{

 		//如果点击到黑块，则把黑块变成白块，并表明此行的黑块已经被点击
 		event.target.className='cell';
 		event.target.parentNode.pass=1;//定义属性pass，表明此行row的黑块已经被点击
 		score+=1;
 		document.getElementById('score').innerHTML=score;
 	    //每10分将速度加2
 	    if((score%10==0)&&(score/10)>=1)
 	    {
 	    	speedup();
 	    }
 }
}

//删除<div class="container">的子节点的最后那个<div class="row">
function deleteRow() {
	var container=document.getElementById('container');
	//if(container.childNodes.length==6)
	container.removeChild(container.lastChild);
	
}


//黑块移动函数
function move() {
	var container=document.getElementById('container');
	/*
	getComputedStyle()方法。这个方法接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如“:after”）。
	如果不需要伪元素信息，第二个参数可以是null。
	getComputerStyle()方法返回一个CSSStyleDeclaration对象，
	其中包含当前元素的所有计算的样式
	 */
	var top=parseInt(window.getComputedStyle(container,null)['top']);

	top+=speed;
	//将container按照speed的值下移
	container.style.top=top+"px";
	//如果container下移到显示四行row，则判断最下面一行的row的黑块有没有被点击
	if(speed+top>=0)
	 {
	  var rows=container.children;
	  //如果最下面一行的row的黑块有没有被点击，则游戏失败
	 	if(rows[rows.length-1].pass!=1)
	 	{
	 		fail();
	 	}
	 //如果被点击，则删去最下面一行row，并在最上面一行加一行row且把上一行隐藏起来
	 	deleteRow();
	 	createRow();
	 	container.style.top='-100px';
	 	
	 }
}

function fail() {
	clearInterval(clock);
	var score=document.getElementById('score');
	alert('你的最终得分为'+parseInt(score.innerHTML));
}

function speedup(){
	speed+=2;
	if(speed==20){
		alert('你超神了！');
	}
}

window.onload=init;
