function main() {
  $('.answer-row').hide();

  $('.hover-effect').hover(
    function(){
        $(this).find('.caption').slideDown(250); //.fadeIn(250)
    },
    function(){
        $(this).find('.caption').slideUp(250); //.fadeOut(205)
    }
  );

  $('input').on('focus', function() {
    $(this).parent().css({
      'width' : '50%',
      'transition' : 'width 0.3s ease-in-out'
    })
  });

  $('input').on('blur', function() {
    $(this).parent().css({
      'width' : '20%',
      'transition' : 'width 0.3s ease-in-out'
    })
  });

  var questionsSwiper = new Swiper('.question-swiper-container', {
        speed: 500
  });


  $('.question-link').on('click', function() {
    var questionHeader = $(this).text();
    $('.question-header').text(questionHeader);
    questionsSwiper.slideNext();
    changeToAndFromQuestion('.card-row', '.answer-row', questionHeader)
  });

  $('.go-to-sub-cat').on('click', function() {
    questionsSwiper.slidePrev();
  });

}

main();
