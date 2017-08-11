function main() {
  var benefitsSwiper = new Swiper('.benefits', {
      nextButton: '.next-card',
      prevButton: '.prev-card',
      loop:true,
      noSwiping: true
  });

  // Handle swiper change for benefits section
  function changeSwiper() {
    // Get each of the cards and their wrappers at top of benefits section
    var cards = document.querySelectorAll('.card');
    var cardWrappers = document.querySelectorAll('.card-wrapper');

    // Grab next/prev arrows
    var arrows = document.querySelectorAll('.next-card, .prev-card');
    arrows.forEach(function(arrow) {
      arrow.addEventListener('click', function() {
        // Use realIndex to make sure we get right index of current swiper-slide
        var index = benefitsSwiper.realIndex;

        // Adjust the active card coloring it blue
        $('.card-active').removeClass('card-active');
        // If mobile we are only displaying one at a time so we need to hide others
        $('.show-on-mobile').removeClass('show-on-mobile');

        // Show active card if mobile and add active class
        $(cards[index]).addClass('card-active');
        $(cardWrappers[index]).addClass('animated fadeIn show-on-mobile');
        if (window.scree.size <= 648) {

        }
      });
    });
  }
  changeSwiper();
}

main();
