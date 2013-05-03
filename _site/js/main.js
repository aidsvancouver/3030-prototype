// 30 30 Timeline 
(function(){

	var timelineNav = {
		init: function(config) {
			this.config = config;
			this.slideUpAction();
		},

		slideUpAction: function() {
			this.config.pullTab.on('click', function() {
				timelineNav.config.timeline.slideDown();
				timelineNav.addPagerPad();
				timelineNav.slideDownAction();
			});
		},

		slideDownAction: function() {
			timelineNav.config.timeline.on('mouseleave', function(){
				timelineNav.config.timeline.slideUp();
				timelineNav.removePagerPad();
			});
		},

		addPagerPad: function() {
			$('.previous, .next').animate({
				top: '400'
			});
		},

		removePagerPad: function() {
			$('.previous, .next').animate({
				top: '340'
			});
		}
	};

	// initialize the timeline
	timelineNav.init({
		timeline: $('.timeline').find('ul').hide(), // Hide the timeline
		pullTab: $('.pullTab')
	});

})(); // end


// Button Positioning for Pager Navigation 
(function(){
	var pager = {
		init: function(config){
			this.config = config;
			this.detectWidth();
			this.scrollFade();
			//this.scrollAdjust();
		},

		detectWidth: function(){ // Get the width of the window on resize
	      	var $window = $(window),
	      		windowWidth = $window.width();

	      	// Set initial values for left and right
	      	pager.setLeftRight(windowWidth);
	      	pager.resizeWidth(windowWidth, $window);

		},

		setLeftRight: function(windowWidth){  // Change the CSS value for left and Right on the prev and next buttons
	    	// Determine the value for left and right properties
			var padValue = (windowWidth - 1358)/2; 		
	   		this.config.previousBtn.css('left', padValue);
	    	this.config.nextBtn.css('right', padValue);
		},

		resizeWidth: function(windowWidth, $window){
			$window.bind( "resize", function ( event ) {
				// reset var windowWidth to the resized window width value
				windowWidth = $window.width();
				// run setLeftRight to place the buttons
	    		pager.setLeftRight(windowWidth);
	    	});
		},

		scrollFade: function() { // Fade the pager buttons as you scroll down the page
			var fadeStart = 100, // 100px scroll or less will equiv to 1 opacity
			    fadeUntil = 2000; // 2000px scroll or more will equiv to 0 opacity


			$(window).bind('scroll', function() {
			    var offset = $(document).scrollTop(),
			        opacity = 0;
			        newTop = 340 - offset / 4;

			    if (offset <= fadeStart) {
			        opacity = 1;
			    } else if (offset <= fadeUntil) {
			        opacity = 1 - offset / fadeUntil;
			    }

			    pager.config.previousBtn.css({
			    	opacity: opacity,
			    	top: newTop
			    });

			    pager.config.nextBtn.css({
			    	opacity: opacity,
			    	top: newTop
			    });
			});			
		},
	};

	// initialize the pager
	pager.init({
		previousBtn: $('.previous'),
		nextBtn: $('.next')
	});

})(); // end