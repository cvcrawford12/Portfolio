function main() {
  // Only perform hover effect on thumbnails with this class
  $('.hover-effect').hover(
    // Show caption with category details/description
    function(){
        $(this).find('.caption').slideDown(250);
    },
    function(){
        $(this).find('.caption').slideUp(250);
    }
  );

  // When the search bar is clicked expand the width
  $('input').on('focus', function() {
    $(this).parent().css({
      'width' : '50%',
      'transition' : 'width 0.3s ease-in-out'
    })
  });

  // When focus on the search bar is lost then transition width back to normal
  $('input').on('blur', function() {
    $(this).parent().css({
      'width' : '20%',
      'transition' : 'width 0.3s ease-in-out'
    })
  });

  // Init swiper for sub-category page
  var questionsSwiper = new Swiper('.question-swiper-container', {
        speed: 500,
        noSwipingClass: 'swiper-no-swiping'
  });

  // When a question is clicked, get the title and answer
  $('.question-link').on('click', function() {
    var questionHeader = $(this).text();

    // Change the header of the second swiper slide to whatever question was clicked
    $('.question-header').text(questionHeader);

    /*
    Prevent scrolling since setting up sticky footy required
    some css which makes the min-height of html 100%
    */
    $('html').css('overflow', 'hidden');

    // Since a link was clicked slide to the answer section
    questionsSwiper.slideNext();
  });

  // When back button is clicked we undo changes above
  $('.go-to-sub-cat').on('click', function() {
    $('html').css('overflow', 'visible');
    questionsSwiper.slidePrev();
  });

}

main();
