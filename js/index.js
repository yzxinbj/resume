var desW = 640;
var winW = document.documentElement.clientWidth;
document.documentElement.style.fontSize = winW / desW * 100 + "px";

var audioBox = $(".audio")[0];
var myAudio = $(".audio audio")[0];

var domEvent = {
	fixPagesHeight: function () {
		$('.swiper-slide,.swiper-container').css({
			height: $(window).height(),
			width: $(window).width()
		})
	},
	canplay: function () {
			audioBox.style.display = "block";
			audioBox.className += " audioMove";
	},
    click: function () {
	    if (myAudio.paused) {
		    myAudio.play();
		    audioBox.className = "audio audioMove";
		    return;
	    }
	    myAudio.pause();
	    audioBox.className = "audio";
    }
};


$(window).on('resize', domEvent.fixPagesHeight);

$(window).trigger('resize');

new Swiper('.swiper-container', {
    direction: "vertical",
    loop: true,
    onInit: function (swiper) {
        swiper.myactive = 1;
    },
    onTransitionEnd: function (swiper) {
        swiper.myactive = swiper.activeIndex;
        var myId = swiper.slides[swiper.myactive].getAttribute("trueId");
        for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].id = i == swiper.myactive ? myId : null;
        }
    }
});

window.setTimeout(function () {
    myAudio.play();
    myAudio.addEventListener("canplay",domEvent.canplay, false);
}, 1000);

audioBox.addEventListener("click", domEvent.click, false);

