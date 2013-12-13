//@codekit-prepend "swipe.js"
//@codekit-prepend "headroom.js"
//@codekit-prepend "jquery.headroom.js"


var MF = (function(APP, $) {

  "use strict"

  // Private Vars
  var module = APP.siteFunctions = APP.siteFunctions || {},
      $swipecontainer = $(".swipe"),
      $header = $('#header'),
      interaction_event = (Modernizr.touch) ? 'touchstart' : 'click';

  window.swipes = [];

  // Private Methods
  function initSiteFunctions() {
    initSwipe($swipecontainer);
    initHeadroom($header);
    avoidRepaintsOnScroll();
  }


  function initSwipe($elem) {

    $elem.each(function(i) {
      var $this = $(this),
          $sliderNav = $('.swipe-slider__nav',$this),
          navTemplate = '<ul class="nav nav--prev-next"><li><a href="javascript:void(0)" class="swipe__prev icon-arrow-left">☜</a></li><li><b class="current">1</b>/<b class="all">1</b></li><li><a href="javascript:void(0)" class="swipe__next icon-arrow-right">☞</a></li></ul>';
      $this
        .wrapInner('<div class="swipe-wrap"/>');

      if ($sliderNav.length){
        $sliderNav.append(navTemplate);
      }else {
        $this.append(navTemplate);
      }

      swipes[i] = new Swipe($this[0], {
        startSlide: 0,
        speed: 300,
        auto: 0,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {
          $('.current',$this).text(index+1);
        },
        transitionEnd: function(index, elem) {
          
        }
      });

      $('.all',$this).text(swipes[i].getNumSlides());

      $this.on(interaction_event,".swipe__prev, .swipe__next", function(e){
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass('swipe__prev')){
          swipes[i].prev();
        }else{
          swipes[i].next();
        }
        return false;
      });


    });
  }

  function initHeadroom($elem) {
	$elem.headroom({
		"tolerance": 10,
		"offset": 100,
		"classes": {
			"initial": "animated",
			"pinned": "slideDown",
			"unpinned": "slideUp"
		}
	});
  }

  function avoidRepaintsOnScroll() {
    if(!Modernizr.touch){
      var body = document.body,
      timer;

      window.addEventListener('scroll', function() {
        clearTimeout(timer);
        if(!body.classList.contains('disable-hover')) {
          body.classList.add('disable-hover');
        }

        timer = setTimeout(function(){
          body.classList.remove('disable-hover');
        },200);
      }, false);
    }
  }


  // Public Methods
  module.init = function () {
    initSiteFunctions();
  };


  // Export Module
  return APP;

}(MF || {}, jQuery));

MF.siteFunctions.init();
