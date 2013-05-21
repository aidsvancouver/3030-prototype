(function() {

// 30 30 Timeline 
	var timelineSlider = {
		init: function(config) {
			this.config = config;
			var timelineUl = this.config.timeline.find('ul');

			this.setWidth(this, timelineUl); // pass this for reference back
			this.bind(this, timelineUl);
			//this.affix();			
			this.currentSelection(timelineUl);
		},

		setWidth: function(_this, timelineUl) {
			var liCount = timelineUl.find('li').length,
				timelineWidth = 185 * liCount; // Hard coded value for the width of each timeline item (200px)
			_this.config.timeline.find('ul').css('width', timelineWidth);
		},

		bind: function(_this, timelineUl) {
			var count = 1983,
				hoverItem = timelineUl.find('.timeline-item');

			// Listen for hover
			hoverItem.on('mouseover', function() {
				$(this).find('img').animate({opacity: '.25'}, 200);
			});

			hoverItem.on('mouseleave', function() {
				$(this).find('img').animate({opacity: '1'}, 20);
			});

			// Listen for next
			_this.config.nextBtn.on('click', function(e) {
				e.preventDefault();
				var marginOld = parseInt(timelineUl.css('margin-left')), // Grab the current left marging to modify
					overFlow = _this.config.timeline.width();

				if (marginOld > (-5550 + overFlow)) { // hardcoded value for width measure -- needs to match var timelineWidth
					var marginNew = marginOld - 185;
					timelineUl.animate({marginLeft: marginNew}, 500); // Move the margin forward
				} else {
					timelineUl.css('margin-left', marginOld); // If we're at the end, leave the margin alone
				};
			});

			// Listen for prev
			_this.config.prevBtn.on('click', function(e) {
				e.preventDefault();
				var marginOld = parseInt(timelineUl.css('margin-left'));

				if (marginOld < 0) {	
					var marginNew = marginOld + 185;
					timelineUl.animate({marginLeft: marginNew}, 500);
				} else {
					timelineUl.css('margin-left', 0); // resetting the margin with a hard coded value (0)
				}		
			});
		},

		affix: function() {
			var _window = $(window);
			_window.on('scroll', function() {
				var tabPosition = 200, // fix this so it isn't hard coded
					timeline = $('.timeline'),
					timelineHeight = timeline.height();
					scrollHeight = $(document).height(),
					scrollTop = _window.scrollTop();
					testDiff = scrollTop - tabPosition;

				// compare the scroll height to the tab offset
				if (testDiff > 0) {
					// add "sticky" class when scroll height falls below the offset
					timeline.addClass("sticky");
					$('body').css('margin-top', timelineHeight);
				} else {
					timeline.removeClass("sticky");
					$('body').css('margin-top', 0);
				}
			});
		},

		// Highlight the current page in the timeline
		currentSelection: function (timelineUl) {
			var currentYear = $('li.' + timelineSlider.config.pageTitle).addClass('active'),
				yearCounter = ( parseInt(timelineSlider.config.pageTitle) - 1983 ) * -185;

			timelineUl.css('margin-left', yearCounter);
		}	
	};

	// initialize the timeline
	timelineSlider.init({
		timeline: $('.timeline'),
		nextBtn: $('.timeline-next'),
		prevBtn: $('.timeline-prev'),
		pageTitle: $('.page-title').html(),
		msg: $('.timeline-msg')
	});


// Button Positioning for Pager Navigation 
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
			    fadeUntil = 1500; // 2000px scroll or more will equiv to 0 opacity


			$(window).bind('scroll', function() {
			    var offset = $(document).scrollTop(),
			        opacity = 0;
			        newTop = 440 - offset / 5;

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

// Parallax Scroll Test
    //save selectors as variables to increase performance
    var $window = $(window);
    var bg1 = $(".statInfo");

    var windowHeight = $window.height(); //get the height of the window

    function newPos(x, windowHeight, pos, adjuster, inertia){
        return x + "px " + (((windowHeight + pos) - adjuster) * inertia)  + "px";
    }

    //function to be called whenever the window is scrolled or resized
    function Move(){
        var pos = $window.scrollTop(); //position of the scrollbar

        bg1.css({'backgroundPosition': newPos(0, windowHeight, pos, 2000, 0.1)});
    }

    $window.resize(function(){ //if the user resizes the window...
        if(jQuery(window).width() > 766) {
            Move(); //move the background images in relation to the movement of the scrollbar
        }
    });

    $window.bind('scroll', function(){ //when the user is scrolling...
        if(jQuery(window).width() > 766) {
            Move(); //move the background images in relation to the movement of the scrollbar
        }
    });

}());