function main() {
  // Init Swiper
  var implementationSwiper = new Swiper('.implementation-swiper', {
      speed: 800,
      nextButton: '.next-stage',
      prevButton: '.prev-stage'
  });

  function changePage() {
    // grab each of the page indicators and turn to array
    var pages = document.querySelector('.implementation-inner-wrapper').querySelectorAll('span');
    var pagesArray = Array.from(pages);

    // add a listener
    pagesArray.forEach(function(page) {

      //  grab index of clicked page and adjust the css to be active
      page.addEventListener('click', function() {
        var index = pagesArray.indexOf(page);

        // helper function to adjust the active page
        adjustActiveClass(pagesArray, index);

        // using the pages index adjust swiper content
        implementationSwiper.slideTo(index);
      });
    });

    // if a swiper arrow is clicked call helper function
    handleSwiperArrowClick('.next-stage', pagesArray);
    handleSwiperArrowClick('.prev-stage', pagesArray);
  }
  changePage();

  function changeStep() {
    // grab each of the page indicators and turn to array
    var pages = document.querySelector('.implementation-inner-wrapper').querySelectorAll('li');
    var pagesArray = Array.from(pages);

    // add a listener
    pagesArray.forEach(function(page) {

      //  grab index of clicked page and adjust the css to be active
      page.addEventListener('click', function() {
        var index = pagesArray.indexOf(page);

        // helper function to adjust the active page
        adjustActiveClass(pagesArray, index);

        // using the pages index adjust swiper content
        implementationSwiper.slideTo(index);
      });
    });

    // if a swiper arrow is clicked call helper function
    handleSwiperArrowClick('.next-stage', pagesArray);
    handleSwiperArrowClick('.prev-stage', pagesArray);
  }
  changeStep();


  function handleSwiperArrowClick(arrow, pagesArray) {
    $(arrow).on('click', function() {
      // grab index with swiper's method
      var index = implementationSwiper.activeIndex;

      // change the swiper to that index and update css
      adjustActiveClass(pagesArray, index);
    });
  }


  function adjustActiveClass(pagesArray, index) {
    // percentages for the width of active page indicator underline (hr element)
    var percentages = ['0%', '25%', '50%', '75%'];

    // remove the blue highlight on the active page indicator
    // $('.implementation-active').removeClass('implementation-active');

    // adjust the left margin of the active underline
    // $('#implementation hr').css({
    //   'margin-left' : percentages[index],
    //   'position' : 'relative'
    // });

    // add blue hightlight to the now active slide
    // $(pagesArray[index]).addClass('implementation-active');
    $('.active-step').removeClass('active-step');
    $(pagesArray[index]).addClass('active-step');
  }

}

main();
