function main() {

  // hide navbar until user starts scrolling
  $('.navbar').hide();

  // Handle typewriter
  function typewriter() {
    var firstP = "<p class='content'>We believe that people are active by nature. We believe that people are at the <strong>center</strong> of every sport.</p>";
    var secondP = '<p class="content">We are <strong>committed</strong> to providing the <strong>highest quality</strong> solutions to establish an <strong>equilibrium</strong> between sports, innovation, technology, and people.</p>'
    var thirdP = '<p class="content">We work with dedication to provide a new <strong>alternative</strong> that allows you to experiment, enjoy, and live sports <strong>like never before.</strong></p>';

    var innerText = firstP + secondP + thirdP,
      i = 0,
      isTag,
      text;

    // Actual typing effect
    function type() {
      // Go letter by letter until completed full text
      text = innerText.slice(0, ++i);
      if (text === innerText) return;

      // Set innerHtml rather than textContent to allow for <strong> tags
      document.querySelector('.typewriter').innerHTML = text;

      // If the last character is an open tag then recursively type
      var char = text.slice(-1);
      if( char === '<' ) isTag = true;
      if( char === '>' ) isTag = false;

      if (isTag) return type();

      // Adjust timing of typewriter, this only fires if we make it all the way through
      // i.e we aren't finished typing, and it isn't a <> character
      setTimeout(type, 10);
    }

    // if we aren't mobile then perform type animation
    var windowSize = window.screen.width;
    if (windowSize > 800) {
      type();
    }

    // if we resize from mobile to desktop then make sure typewriter text stays
    $(window).on('resize', function() {
      document.querySelector('.typewriter').innerHTML = innerText;
    });
  }
  typewriter();

  //////////////////
  // WHAT SECTION //
  //////////////////

  // Hide all the content and then show only first li
  // This will be the club li item
  var iphoneImages = document.querySelectorAll('.iphone-image');
  var whatContent = document.querySelectorAll('.what-content');
  $(iphoneImages).hide();
  $(whatContent).hide();
  $(iphoneImages[0]).show();
  $(whatContent[0]).show();

  // add click events on all filter buttons for what we do section
  function handleBtnFilter() {
    // Grab btns and add listeners for each
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        // get id of btn with active class
        // get id of btn which was clicked
        var currentId = $('.active').attr('id');
        var nextId = btn.id;

        // remove active from currently active class
        // add to the button that was clicked
        $('#what .active').removeClass('active');
        $(btn).addClass('active');

        // take the current active content and animate to next based on which button was clicked
        // Class structure as follows -> id, id-content, id-image
        // Add both animated and fade classes
        $('#' + currentId + '-content').attr('class', 'what-content animated fadeOut');
        $('#' + currentId + '-content').hide();
        $('#' + nextId + '-content').attr('class', 'what-content animated fadeIn');
        $('#' + nextId + '-content').show();
        $('#' + currentId + '-image').attr('class', 'iphone-image animated fadeOut');
        $('#' + currentId + '-image').hide();
        $('#' + nextId + '-image').attr('class', 'iphone-image animated fadeIn');
        $('#' + nextId + '-image').show();
      });
    });
  }
  handleBtnFilter();


  // Fade in .navbar
	$(function () {
		$(window).scroll(function () {
      // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 200) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});

	});

  // Page scroll, smooth scroll to location which anchor is clicked
  // This goes together with SmoothScroll.js file
   $('a.page-scroll').click(function() {
       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           $('html,body').animate({
             scrollTop: target.offset().top - 40
           }, 900);
           return false;
         }
       }
     });

   // Show Menu on Book
   $(window).bind('scroll', function() {
       var navHeight = $(window).height() - 100;
       if ($(window).scrollTop() > navHeight) {
           $('.navbar-default').addClass('on');
       } else {
           $('.navbar-default').removeClass('on');
       }
       updateNavLinks();

   });

   // Handle navbar collapse for mobile
   jQuery('body, .navbar-custom .nav li a').bind('click', function(e) {
     var opened = jQuery('.navbar-collapse').hasClass('collapse in');
     if ( opened === true ) {
         jQuery('.navbar-collapse').collapse('hide');
     }
   });

   // Scroll To Top
   $('body').scrollspy({
       target: '.navbar-default',
       offset: 80
   })

   // Check which section is in view and update its color on the nav link
   // adding class active-page changes color to #38c0c9
   function updateNavLinks() {
     if (isScrolledIntoView('#what')){
       $('.active-page').removeClass('active-page');
       $('.what-link').addClass('active-page');
     } else if (isScrolledIntoView('#benefits') || isScrolledIntoView('.revenue')){
       $('.active-page').removeClass('active-page');
       $('.benefits-link').addClass('active-page');
     } else if (isScrolledIntoView('#implementation')){
       $('.active-page').removeClass('active-page');
       $('.implementation-link').addClass('active-page');
     } else if (isScrolledIntoView('#partners')){
       $('.active-page').removeClass('active-page');
       $('.partners-link').addClass('active-page');
     } else if (isScrolledIntoView('#institutions')){
       $('.active-page').removeClass('active-page');
       $('.institutions-link').addClass('active-page');
     } else if (isScrolledIntoView('#awards')){
       $('.active-page').removeClass('active-page');
       $('.awards-link').addClass('active-page');
     } else if (isScrolledIntoView('#contact')){
       $('.active-page').removeClass('active-page');
       $('.contact-link').addClass('active-page');
     }
   }

   // Simple function to check which section is in view
   function isScrolledIntoView(elem) {
      // Adjust heightOffset for customization
      var heightOffset = 500;
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top + heightOffset;
      return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }

}

main()
