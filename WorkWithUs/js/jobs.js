function main() {


(function () {
   'use strict';

	// Hide .navbar first
	$(".navbar").hide();


  // 9inesports animation for top page
  $(".col-1-item").hide();
  $(".col-2-item").hide();
  $(".col-3-item").hide();
  var colOneItems = $(".col-1-item").toArray();
  var colTwoItems = $(".col-2-item").toArray();
  var colThreeItems = $(".col-3-item").toArray();
  $(colOneItems[0]).show();
  $(colTwoItems[0]).show();
  $(colThreeItems[0]).show();

  function interval() {
      var i = 0;
      var animate = setInterval(function() {
        if(i > 5) {
          $(colOneItems[2]).hide();
          $(colOneItems[0]).addClass("flip");
          $(colOneItems[0]).show();
          $(colTwoItems[2]).hide();
          $(colTwoItems[0]).addClass("flip");
          $(colTwoItems[0]).show();
          $(colThreeItems[2]).hide();
          $(colThreeItems[0]).addClass("flip");
          $(colThreeItems[0]).show();
          clearInterval(animate);
          interval();
        }

        if (i < 2) {
          animateWithDelay(".col-1-item:visible");
        } else if (i < 4) {
          animateWithDelay(".col-2-item:visible");
        } else if (i < 6) {
          animateWithDelay(".col-3-item:visible");
        }

        i++
      }, 4000);
    }

    interval();

  function animateWithDelay(item) {
    var currentItem = $(item);
    if ($(currentItem).next().length > 0) {
      $(currentItem).hide();
      $(currentItem).next().addClass("flip");
      $(currentItem).next().show();
    }
  }

  // initialize carousels
  $("#testimonials-carousel").carousel({
    interval: 8000,
    pause: "false"
  });

  $("#positions-carousel").carousel({
    interval: false
  });

  $("#application .form-input").on("click", function() {
    $(this).children('div').children('input').focus();
  });


  // if a user clicks to view positions then show the carousel control to go back
  $("#positions .thumbnail .btn").on("click", function() {
    setTimeout(function() {
      $("#positions-carousel .carousel-control.left").css("visibility", "visible");
    }, 500);
  });

  // if they click the carousel to go back then hide it
  $("#positions-carousel .carousel-control.left").on("click", function() {
    $(this).css("visibility", "hidden");
  });

  $('#teamCarousel').carousel({ interval: 5000 });
  $('#teamCarousel .item').each(function(){
    var itemToClone = $(this);

    for (var i=1;i<3;i++) {
      itemToClone = itemToClone.next();

      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }

      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first').clone().addClass("cloneditem-"+(i)).appendTo($(this));
    }
  });

  $("#institutions-carousel").carousel({
    interval: 5000,
  });

  $('#institutions-carousel .item').each(function(){
    var itemToClone = $(this);

    for (var i=1;i<4;i++) {
      itemToClone = itemToClone.next();

      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }

      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first').clone().addClass("cloneditem-"+(i)).appendTo($(this));
    }
  });


  // handle swipe when we are in mobile for the about page or the testimonials
  $("#testimonials-carousel").swipe( {
      //Single swipe handler for left swipes
      swipe:function(event, direction, distance, duration, fingerCount) {
        if(direction === "left") {
          $(this).carousel('next');
        } else if (direction === "right") {
          $(this).carousel('prev');
        }
      }
    });

    $("#institutions-carousel").swipe( {
        //Single swipe handler for left swipes
        swipe:function(event, direction, distance, duration, fingerCount) {
          if(direction === "left") {
            $(this).carousel('next');
          } else if (direction === "right") {
            $(this).carousel('prev');
          }
        }
      });

    $("#teamCarousel").swipe( {
        //Single swipe handler for left swipes
        swipe:function(event, direction, distance, duration, fingerCount) {
          if(direction === "left") {
            $(this).carousel('next');
          } else if (direction === "right") {
            $(this).carousel('prev');
          }
        }
      });

  // handle swipe for mobile for position carousel (only allow to swipe back not forward because buttons control going forward)
  $("#positions-carousel").swipe( {
      //Single swipe handler for left swipes
      swipe:function(event, direction, distance, duration, fingerCount) {
        if(direction === "right") {
          $(this).carousel(0);
          $("#positions-carousel .carousel-control.left").css("visibility", "hidden");
        }
      }
    });

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

  // helper function to see if element is visible
  function visibleInView(transitionClass) {
        // find dimensions of element to see if in view
        var top_of_element = $(transitionClass).offset().top;
        var bottom_of_element = $(transitionClass).offset().top + $(transitionClass).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).height();
        var top_of_screen = $(window).scrollTop();

        // check if in view
        if(bottom_of_screen > top_of_element){
            // if in view add transition
            return true;
        }
    }

	// Preloader */
	  	$(window).load(function() {

   	// will first fade out the loading animation
    	$("#status").fadeOut("slow");

    	// will fade out the whole DIV that covers the website.
    	$("#preloader").delay(500).fadeOut("slow").remove();

  	})

   // Page scroll
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
    });

    jQuery('body, .navbar-custom .nav li a').bind('click', function(e) {
      var opened = jQuery('.navbar-collapse').hasClass('collapse in');
      if ( opened === true ) {
          jQuery('.navbar-collapse').collapse('hide');
      }
    });

    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    })


  // jQuery Parallax
  function initParallax() {
    $('#values').parallax("100%", 0.3);
    $('#positions').parallax("100%", 0.3);
    $('#institutions').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);

  }
  initParallax();

}());

}
main();
