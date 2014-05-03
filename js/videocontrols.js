function initiateButtonsControls(video)
{
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var fullScreenButton = document.getElementById("full-screen");

	  // Sliders
	  var seekBar = document.getElementById("seek-bar");
	  var volumeBar = document.getElementById("volume-bar");

	  playButton.addEventListener("click", function() {
	  	var video=document.getElementById("bigV");
	  	if (video.paused == true) {
	    // Play the video
		    video.play();
		    this.className="playpauseButton buttons pauseState";
		    // Update the button text to 'Pause'
		    //this.innerHTML = "||";
		} else {
	    // Pause the video
	   		video.pause();
	   		this.className="playpauseButton buttons playState"
		    // Update the button text to 'Play'
		    //this.innerHTML = " >";
		}
	});

	 
fullScreenButton.addEventListener("click", function() {
	 // var video=document.getElementById("bigV");
	 var video =document.getElementById("bigVideoHolder");
	 var fullscr=document.getElementById("full-screen");
	 console.log("fullscr.className.indexOf('fitState'): "+video.cancelFullscreen+" "+video.webkitCancelFullScreen+" "+video.cancelFullscreen);
	 if(fullscr.className.indexOf('fitState')!=-1){
	 	fullscr.className="playpauseButton buttons fullscreenState";
	 	if (video.requestFullscreen) {
    		video.requestFullscreen();
  		} else if (video.mozRequestFullScreen) {
    		video.mozRequestFullScreen(); // Firefox
  		} else if (video.webkitRequestFullscreen) {
    		video.webkitRequestFullscreen(); // Chrome and Safari
  		}
	 }else{
	 	fullscr.className="playpauseButton buttons fitState";
	 	if (document.cancelFullscreen) {
    		document.cancelFullscreen();
  		} else if (document.mozCancelFullScreen) {
    		document.mozCancelFullScreen(); // Firefox
  		} else if (document.webkitCancelFullScreen) {
    		document.webkitCancelFullScreen(); // Chrome and Safari
  		}
	 }

});

// Event listener for the seek bar
seekBar.addEventListener("change", function() {
  // Calculate the new time
  var video=document.getElementById("bigV");
  var time = video.duration * (seekBar.value / 100);

  // Update the video time
  video.currentTime = time;
});

video.addEventListener("loadedmetadata", function(){
	var totalTimeDiv=document.getElementById("time");
	totalTimeDiv.innerHTML=secondsToTimestring(this.duration);
});
// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / this.duration) * this.currentTime;
  var totalTimeDiv=document.getElementById("curtime");
	totalTimeDiv.innerHTML=secondsToTimestring(this.currentTime);
var seekBar = document.getElementById("seek-bar");
  // Update the slider value
  seekBar.value = value;
  var loading=document.getElementById("bigVLoading");
	loading.className="videoThumbLoading loadingOff";
});

// Pause the video when the slider handle is being dragged
// 
seekBar.addEventListener("mousedown", function() {
	var video=document.getElementById("bigV");
  video.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
	var video=document.getElementById("bigV");
	var playButton = document.getElementById("play-pause");
	playButton.className="playpauseButton buttons pauseState";
  video.play();
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
  // Update the video volume
  	var video=document.getElementById("bigV");
  	var muteButton = document.getElementById("mute");
  video.volume = this.value;
  var state=this.value<=0.1?"muteState":"soundState";
  muteButton.className="playpauseButton volviewer "+state;
  /*if(this.value>=0.5){
  	muteButton.innerHTML="&lt;))";
	}
	else if(this.value>=0.1){
		muteButton.innerHTML="&lt; )";
	}
  else{
  	muteButton.innerHTML="&lt;x ";
  }*/
});
}

function playvideoBig()
{
	var playButton = document.getElementById("play-pause");
	var video=document.getElementById("bigV");
	var muteButton = document.getElementById("mute");
	var totalTimeDiv=document.getElementById("time");
	var curTimeDiv=document.getElementById("curtime");
	var fullScreenButton = document.getElementById("full-screen");
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");

	playButton.className="playpauseButton buttons pauseState";
	muteButton.className="playpauseButton volviewer soundState";
	fullScreenButton.className="playpauseButton buttons fitState";
	curTimeDiv.innerHTML=totalTimeDiv.innerHTML="00:00";

	seekBar.value=0;
	volumeBar.value=1;
	video.volume=1;

	var loading=document.getElementById("bigVLoading");
	loading.className="videoThumbLoading loadingOn";
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function secondsToTimestring(time){
	var totalsec=parseInt(time);
	var h=Math.floor(totalsec/360);
	var m=Math.floor((totalsec-(h*360))/60);
	var s=totalsec%60;

	var timeStr=pad(m.toString(),2) + ":" + pad(s.toString(),2);
	if(h>0)timeStr=pad(h.toString(),2)+timeStr;
	return timeStr;
}
