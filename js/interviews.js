
var bigVideo;
var bigVholder;
var inter_name;
var inter_keys;
var container;
var video_ext;
var src_mini="media/video/small/";
var src_big="media/video/";
var src_poster="media/img/thumbnails/"

var data=[];
data[0]={name:"equipment",videos:[2,4,6,10,12,15]};
data[1]={name:"media",videos:[1,7,11,13,14]};
data[2]={name:"feminism",videos:[0,3]};
data[3]={name:"infrastructure",videos:[5,8,9]};
data[4]={name:"all",videos:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};

var loadedVideo=[];
var errorLoadVideos=[];
var metadata=[];

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
	
	container=document.getElementById("videoContainer");

	video_ext="mp4";
	if(!supports_media(video_ext,'video')){
		video_ext='ogv';
		if(!supports_media(video_ext,'video')){
			video_ext=null;
		}
	}	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		fallback('mobile');
	}else if(video_ext==null){
			fallback('media');
	}else{
		intiateApp();
	}
}

function fallback(problem){
	var message="";
	switch(problem){
		case "mobile":
		message="this app is not supported for mobiles.";
		break;

		case "media":
		message="this browser doesn't support the video. please try chrome or firefox."
		break;

		case "unknown":
		message="there was an unknown problem. please try again later."
		break;
	}
	container.innerHTML=message;
	container.setAttribute("class", "header");
}

function intiateApp()
{

	addEvent(document, "mouseout", leavewindow);
	console.log("init event");
	
	inter_name=document.getElementById("interviewed_name");
	inter_keys=document.getElementById("interviewed_keywords");

	
	for(var i=0; i<totalVideos; i++)
	{
		var vc=document.createElement("div");
		vc.id="videoThumbContainer"+i;
		vc.className="videoThumbContainer";
		container.appendChild(vc);

		var v=document.createElement("video");
		v.id="video"+i;
		vc.appendChild(v);
		metadata.push(0);

		v.oncanplay=videoReady;
		v.onerror=videoLoadError;
		//v.onloadedmetadata=videoLoadMetadata;
		
		var videosource=src_mini+i+".";
		//var videosource=src_mini+14+".";
		v.className="videoThumb inactivevideo loadingVideo";

		//v.setAttribute("poster",src_poster+i+".jpg");
		v.setAttribute("src", videosource+video_ext);
		v.load();
		//v.setAttribute("preload", "none");

		var vlc=document.createElement("div");
		vlc.id="videoThumbLoadingcontainer"+i;
		vlc.className="videoThumbLoadingcontainer";
		vc.appendChild(vlc);

		var vb=document.createElement("div");
		vb.id="videoThumbLoading"+i;
		vb.className="videoThumbLoading loadingOff";
		vlc.appendChild(vb);
	}
}

function leavewindow(e){
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == "HTML") {
    	for(var i=0; i<totalVideos; i++){
    		var video=document.getElementById("video"+i);
    		//console.log("leaving window "+i);
    		//console.log(video);
    		if(video!=undefined && video!=null)video.pause();
		}      	
    }
  }

function videoReady(e)
{
	console.log("one more video: "+e.type,e.currentTarget.id);
	loadedVideo.push(e.currentTarget.id);
	e.currentTarget.oncanplay=null;
	checkVideosLoaded();
}

function videoLoadError(e)
{
	console.log("one error video: "+e.type,e.currentTarget.id);
	e.currentTarget.onerror=null;
	errorLoadVideos.push(e.currentTarget.id);
	e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
	checkVideosLoaded();
	
}

function checkVideosLoaded(){
	var i=parseInt(100*(loadedVideo.length+errorLoadVideos.length)/videoData.length);

	var loadprog=document.getElementById("videoLoadingProgress");
	loadprog.innerHTML=i+"%";
	if((loadedVideo.length+errorLoadVideos.length)>=videoData.length){
		console.log("all videos are loaded");
		if(loadedVideo.length>(videoData.length/2)){
			loadprog.parentNode.removeChild(loadprog);
			allVideoLoaded();
		}else{
			fallback("unknown");
		}
	}
}

function allVideoLoaded()
{
	var header=document.getElementById("header");
	for(var i=0; i<data.length;i++)
	{
		var button=document.createElement("div");
		button.id="bt_"+i;
		button.className="menuButton";
		button.innerHTML=data[i].name;
		button.addEventListener("click",changeFilter,false);
		header.appendChild(button);
	}
	//createBigVideo();
	
	setchapter(4);
	onWindowResize();
	
	window.onresize=onWindowResize;
	initiateButtonsControls();
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
	
	var origvw=320;
	var origvh=180;
	
	var vw=(ww)/columns;
	var vh=(hh)/rows;
	//console.log("full size available: "+ww+" x "+hh);
	
	var proporig=origvw/origvh;
	var propspace=vw/vh;
	
	if(proporig>=propspace)
	{
		vh=vw*origvh/origvw;
		//console.log("adapting by width: "+vw+","+vh);
	}else{
		vw=vh*origvw/origvh;
		//console.log("adapting by height: "+vw+","+vh);
	}
	
	
	for(var i=0; i<totalVideos; i++)
	{
		var v=document.getElementById("video"+i);
		var vc=document.getElementById("videoThumbContainer"+i);
		var vb=document.getElementById("videoThumbLoadingcontainer"+i);
		if(v!=null && v!=undefined){
			vb.style.height=vc.style.height=v.style.height=Math.floor(vh);
			vb.style.width=vc.style.width=v.style.width=Math.floor(vw);
		}
	}
	container.style.width=columns*Math.floor(vw);
	container.style.height=rows*Math.floor(vh);
}

function createBigVideo()
{
	//bigVideo=document.getElementById("bigV");
	bigVideo=document.createElement("video");
	bigVideo.id="bigV";
	bigVideo.autoplay=true;
	bigVideo.className="videoBig";

	bigVholder=document.getElementById("bigVideoHolder");
	bigVholder.insertBefore(bigVideo,document.getElementById("bigVLoadingContainer"));
	
	var closeBut=document.getElementById("closeBigVideo");
	/*var closeBut=document.createElement("div");
	closeBut.id="closeBigVideo";
	closeBut.innerHTML="X";
	bigVholder.appendChild(closeBut);*/
	closeBut.addEventListener("click",closeBigVideo,false);
	bigVideo.onended=closeBigVideo;
	initiateVideoControlUIUpdate(bigVideo);

}

function changeFilter(e)
{
	//console.log(e);
	var id=this.id.replace("bt_","");
	setchapter(id);
	//console.log(id);
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
		var videobutel=document.getElementById("videoThumbContainer"+i);
		
		if(videoel!=undefined){
			if(chapterdata.indexOf(i)!=-1){
				activateVideo(videoel, videobutel);
			}else{
				desactivateVideo(videoel,videobutel);
			}
			//videoel.load();
			if(loadedVideo.indexOf(videoel.Id)!=-1)videoel.currentTime=0;
		}
	}
}

function activateVideo(video, container)
{
	/*video.addEventListener('mousemove', playVideo, false);
	video.addEventListener('mouseout', pauseVideo, false);
	video.addEventListener("click", enlargeVideo, false);*/
	container.addEventListener('mousemove', playVideo, false);
	container.addEventListener('mouseout', pauseVideo, false);
	container.addEventListener("click", enlargeVideo, false);
	video.className="videoThumb activevideo";
	container.className="videoThumbContainer containeractivevideo";
}

function desactivateVideo(video, container)
{
	/*video.removeEventListener('mousemove', playVideo);
	video.removeEventListener('mouseout', pauseVideo);
	video.removeEventListener("click", enlargeVideo);*/
	container.removeEventListener('mousemove', playVideo);
	container.removeEventListener('mouseout', pauseVideo);
	container.removeEventListener("click", enlargeVideo);
	video.className="videoThumb inactivevideo";
	container.className="videoThumbContainer containerinactivevideo"
}

function playVideo(e)
{
	var videoid=this.id.replace("videoThumbContainer","video");
	var video=document.getElementById(videoid);
	this.removeEventListener('mousemove', playVideo);


	var loadingid=this.id.replace("videoThumbContainer","videoThumbLoading");
	var loading=document.getElementById(loadingid);
	loading.className="videoThumbLoading loadingOn";

	video.addEventListener('timeupdate',hideLoading,false);
	video.volume=0.5;
	video.play();
	currentVideo=videoid.replace("video","");
	
	inter_name.innerHTML=videoData[currentVideo].name;
}

function hideLoading(e)
{
	this.removeEventListener('timeupdate',hideLoading);
	var loadingid=this.id.replace("video","videoThumbLoading");
	var loading=document.getElementById(loadingid);
	loading.className="videoThumbLoading loadingOff";
	//console.log("is playing"+loadingid);
}

function pauseVideo(e)
{
	var videoid=this.id.replace("videoThumbContainer","video");
	var video=document.getElementById(videoid);

	video.removeEventListener('play',hideLoading);
	var loadingid=this.id.replace("videoThumbContainer","videoThumbLoading");
	var loading=document.getElementById(loadingid);
	loading.className="videoThumbLoading loadingOff";

	video.pause();
	this.addEventListener('mousemove', playVideo, false);
	inter_keys.innerHTML=inter_name.innerHTML="";
}
function enlargeVideo(e)
{
	/*this.pause();
	var src=this.getAttribute("src").replace("small/","").replace("ogv","ogg").replace("mp4","mov");*/
	//var src=this.getAttribute("src");
	createBigVideo();

	var videoid=this.id.replace("videoThumbContainer","video");
	var video=document.getElementById(videoid);
	video.pause();
	var src=video.getAttribute("src").replace(src_mini,src_big);

	bigVideo.setAttribute("src", src);
	bigVholder.className= "On";
	bigVideo.load();
	bigVideo.addEventListener("loadedmetadata", seekBigVideoPoint, false);
	playvideoBig();
	
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
	bigVideo=document.getElementById("bigV");
	bigVideo.parentNode.removeChild(bigVideo);
	var closeBut=document.getElementById("closeBigVideo");
	closeBut.removeEventListener("click",closeBigVideo);

}

var supports_media = function(mimetype, container) {

	switch(mimetype){
		case 'ogv':
		mimetype='video/ogg; codecs="theora, vorbis"';
		break;

		case 'mp4':
		mimetype = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
		break;
	}
	var elem = document.createElement(container);
	if(typeof elem.canPlayType == 'function'){
		var playable = elem.canPlayType(mimetype);
		if((playable.toLowerCase() == 'maybe')||(playable.toLowerCase() == 'probably')){
			return true;
		}
	}
	return false;
};

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

