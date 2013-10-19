var bigVideo;
var bigVholder;
var inter_name;
var inter_keys;
var container;

var data=[];
data[0]={name:"equipment",videos:[2,4,6,10,12,15]};
data[1]={name:"media",videos:[1,7,11,13,14]};
data[2]={name:"feminism",videos:[0,3]};
data[3]={name:"infrastructure",videos:[5,8,9]};
data[4]={name:"all",videos:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};

var videoData=[];
videoData[0]={name:"Tsitsi",keywords:"feminism"};
videoData[1]={name:"Nyarodzo & Onai",keywords:"barriors aids"};
videoData[2]={name:"Stella & Angeline",keywords:"feminism politics"};
videoData[3]={name:"Portia",keywords:"feminism politics"};
videoData[4]={name:"Rabia & Alba",keywords:"feminism politics"};
videoData[5]={name:"Debra & Sabina",keywords:"feminism politics"};
videoData[6]={name:"Tracy & Felisitus",keywords:"feminism politics"};
videoData[7]={name:"Tsitsi",keywords:"feminism politics"};
videoData[8]={name:"Tracy & Felisitus",keywords:"feminism politics"};
videoData[9]={name:"Nyarodzo & Onai",keywords:"feminism politics"};
videoData[10]={name:"Portia",keywords:"feminism politics"};
videoData[11]={name:"Stella & Angeline",keywords:"feminism politics"};
videoData[12]={name:"Debra & Sabina",keywords:"feminism politics"};
videoData[13]={name:"Tsitsi",keywords:"feminism politics"};
videoData[14]={name:"Tracy & Felisitus",keywords:"feminism politics"};
videoData[15]={name:"Rabia & Alba",keywords:"feminism politics"};


var currentChapter;
var currentVideo;
var totalVideos=data[data.length-1].videos.length;

function init()
{
	/*var backButton=document.getElementById("back");
	backButton.onclick=function()
	{
		window.location.href="index.html";
	}*/
	console.log("init event");
	container=document.getElementById("videoContainer");
	inter_name=document.getElementById("interviewed_name");
	inter_keys=document.getElementById("interviewed_keywords");

	var ext="mov";
	if(supports_media('video/ogg; codecs="theora, vorbis"','video')){
			ext="ogg";
	}
	
	for(var i=0; i<totalVideos; i++)
	{
		var v=document.createElement("video");
		v.id="video"+i;
		container.appendChild(v);
		v.oncanplay=videoReady;
		console.log("seetting src: "+v.id);
		
		var videosource="media/"+i+".";
		//v.setAttribute("class", "videoThumb .inactivevideo");
		v.className="videoThumb inactivevideo";

		v.setAttribute("src", videosource+ext);
	}
	
	var header=document.getElementById("header");
	for(var i=0; i<data.length;i++)
	{
		var button=document.createElement("div");
		button.id="bt_"+i;
		button.className="menuButton";
		button.innerHTML=data[i].name;
		/*button.setAttribute("href","javascript:void(0)");
		button.setAttribute("onClick","setchapter("+i+")");*/
		button.addEventListener("click",changeFilter,false);
		header.appendChild(button);
	}
	createBigVideo();
	
	setchapter(4);
	onWindowResize();
	
	window.onresize=onWindowResize;
	
}

function videoReady(e)
{
	console.log("one more video: "+e.type,e.currentTarget.id);
}

function onWindowResize()
{
	if(document.getElementById("video0")==undefined)return;
	var w= window.innerWidth;
	var h= window.innerHeight;
	
	var columns=4;
	var rows=4;
	var marginW=80;
	var marginH=140;
	
	var c=document.getElementById("container");
	var ww=c.offsetWidth-marginW;
	var hh=c.offsetHeight-marginH;
	
	
	
	var origvw=640;
	var origvh=360;
	
	var vw=(ww)/columns;
	var vh=(hh)/rows;
	console.log("full size available: "+ww+" x "+hh);
	
	var proporig=origvw/origvh;
	var propspace=vw/vh;
	
	if(proporig>=propspace)
	{
		vh=vw*origvh/origvw;
		console.log("adapting by width: "+vw+","+vh);
	}else{
		vw=vh*origvw/origvh;
		console.log("adapting by height: "+vw+","+vh);
	}
	
	
	for(var i=0; i<totalVideos; i++)
	{
		var v=document.getElementById("video"+i);
		v.style.height=Math.floor(vh);
		v.style.width=Math.floor(vw);
	}
	container.style.width=columns*Math.floor(vw);
	container.style.height=rows*Math.floor(vh);
	
}

function createBigVideo()
{
	bigVideo=document.createElement("video");
	bigVholder=document.getElementById("bigVideoHolder");
	bigVideo.id="bigV";
	bigVideo.className="videoBig";
	bigVideo.setAttribute("controls","");
	bigVideo.setAttribute("autoPlay","true");
	bigVholder.appendChild(bigVideo);
	var closeBut=document.createElement("div");
	closeBut.id="closeBigVideo";
	closeBut.innerHTML="X";
	bigVholder.appendChild(closeBut);
	closeBut.addEventListener("click",closeBigVideo,false);
	bigVideo.onended=closeBigVideo;
}

function changeFilter(e)
{
	//console.log(e);
	var id=this.id.replace("bt_","");
	setchapter(id);
	console.log(id);
	
}

function setchapter(chapter)
{
	currentChapter=chapter;
	var chapterdata=data[chapter].videos;
	
	for(var i=0; i<data.length;i++)
	{
		var bt=document.getElementById("bt_"+i);
		if(i!=chapter)
		{
			bt.className="menuButton";
		}else{
			bt.className="menuButton coloredButton";
		}
	}
	
	for(var i=0; i<totalVideos;i++)
	{
		var videoel=document.getElementById("video"+i);
		
		if(chapterdata.indexOf(i)!=-1){
			activateVideo(videoel);
		}else{
			desactivateVideo(videoel);
		}
	    
		videoel.load();
		
	}
}

function activateVideo(video)
{
	video.addEventListener('mousemove', playVideo, false);
	video.addEventListener('mouseout', pauseVideo, false);
	video.addEventListener("click", enlargeVideo, false);
	video.className="videoThumb activevideo";
}

function desactivateVideo(video)
{
	video.removeEventListener('mousemove', playVideo);
	video.removeEventListener('mouseout', pauseVideo);
	video.removeEventListener("click", enlargeVideo);
	video.className="videoThumb inactivevideo";
}

function playVideo(e)
{
	this.removeEventListener('mousemove', playVideo);
	this.play();
	currentVideo=this.id.replace("video","");
	
	inter_name.innerHTML=videoData[currentVideo].name;
	//inter_keys.innerHTML=" "+videoData[currentVideo].keywords;
}

function pauseVideo(e)
{
	this.pause();
	this.addEventListener('mousemove', playVideo, false);
	inter_keys.innerHTML=inter_name.innerHTML="";
}
function enlargeVideo(e)
{
	this.pause();
	bigVideo.setAttribute("src", this.getAttribute("src"));
	bigVholder.className= "On";
	bigVideo.load();
	bigVideo.addEventListener("loadedmetadata", seekBigVideoPoint, false);
	//bigVideo.play();
	//bigVideo.currentTime=this.currentTime;
	console.log(this.currentTime);
}
function seekBigVideoPoint() {
    this.currentTime = document.getElementById("video"+currentVideo).currentTime;
    bigVideo.removeEventListener("loadedmetadata", seekBigVideoPoint);
}
function closeBigVideo(e)
{
	
	bigVholder.className= "Off";
	bigVideo.pause();
	document.getElementById("video"+currentVideo).currentTime=bigVideo.currentTime;
}

var supports_media = function(mimetype, container) {
	var elem = document.createElement(container);
	if(typeof elem.canPlayType == 'function'){
		var playable = elem.canPlayType(mimetype);
		if((playable.toLowerCase() == 'maybe')||(playable.toLowerCase() == 'probably')){
			return true;
		}
	}
	return false;
};

