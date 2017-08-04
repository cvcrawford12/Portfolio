function main() {


(function () {
   'use strict';

	// Hide .navbar first
	$(".navbar").hide();

//   $("#application .form-input").on("click", function() {
//     $(this).children('div').children('input').focus();
//   });
//
//


  $(".team-item").on("mouseenter", function() {
    if ($(this).hasClass("matheus")) {
      $(this).popover({
        html: true,
        title: "About Matheus",
        content: function() {
          return $("#matheus-bio").html()
        }
      });
      fadeTeam("matheus", "out");
      $(this).popover('show');
    }
    else if ($(this).hasClass("martin")) {
      $(this).popover({
        html: true,
        title: "About Martin",
        content: function() {
          return $("#martin-bio").html()
        }
      });
      fadeTeam("martin", "out");
      $(this).popover('show');
    }
    else if ($(this).hasClass("juan")) {
      $(this).popover({
        html: true,
        title: "About Juan",
        content: function() {
          return $("#juan-bio").html()
        }
      });
      fadeTeam("juan", "out");
      $(this).popover('show');
    }
    else if ($(this).hasClass("cristina")) {
      $(this).popover({
        html: true,
        title: "About Cristina",
        content: function() {
          return $("#cristina-bio").html()
        }
      });
      fadeTeam("cristina", "out");
      $(this).popover('show');
    }
  });

  $(".team-item").on("mouseleave", function() {
    $(this).popover("hide");
    fadeTeam($(this).attr("class").split(' ')[0], "in");
  });

  // $('[data-toggle="popover"]').on("show.bs.popover", function() {
  //
  // });

  function fadeTeam(memberName, typeOfFade) {
    var teamMembers = document.querySelectorAll(".team-item");

    teamMembers.forEach(function(element) {
      if (element.classList.contains(memberName)) {
      } else {
        if (typeOfFade === "out") {
          $(element).stop().fadeOut();
        } else {
          $(element).stop().fadeIn("slow");
        }
      }
    });
  }


  // play video on click and pause on click
//   document.querySelector("video").addEventListener("click", function() {
//
//     if (typeof InstallTrigger !== "undefined") {
//       return
//     } else {
//       // toggles play / pause
//       if (this.paused) {
//         this.play();
//         $(".toggle-layover").fadeOut("slow", function() {});
//       } else {
//         this.pause();
//         $(".toggle-layover").fadeIn("slow", function() {});
//       }
//     }
//   });
//
//   $("video").hover(function(event) {
//     if($(".toggle-layover:visible").length === 0) {
//       if(event.type === "mouseenter") {
//           $(this).attr("controls", "");
//       } else if(event.type === "mouseleave") {
//           $(this).removeAttr("controls");
//       }
//     }
// });


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

  	// Portfolio Isotope Filter
    $(window).load(function() {
        var $container = $('.team-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });



  // jQuery Parallax
  function initParallax() {
    $('#who').parallax("100%", 0.33);
    $('#what').parallax("100%", 0.33);
    $("#who").parallax("100%", 0.33)
    // $('#aboutimg').parallax("100%", 0.3);
    // $('#testimonials').parallax("100%", 0.1);

  }
  initParallax();

}());


}
main();
