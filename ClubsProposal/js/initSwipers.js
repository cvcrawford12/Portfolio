function init() {

  // Init these swipers together rather than separate files
  // They don't require any custom js to deal with their behavior
  // Each Swiper was given a custom class at same level as .swiper-container class to identify * Important
  // Each Swiper next/prev/pagination buttons were also given custom class to identify * Important

  var swiper = new Swiper('.institutions', {
      pagination: '.institutions-pagination',
      slidesPerView: 3,
      paginationClickable: true,
      spaceBetween: 30,
      nextButton: '.next-institution',
      prevButton: '.prev-institution',
      freeMode:true,
      autoplay: 3000,
      loop:true,
      breakpoints: {
        // when window width is <= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
  });

  var partnersSwiper = new Swiper('.partners', {
      slidesPerView: 1,
      spaceBetween: 1,
      nextButton: '.next-partner',
      prevButton: '.prev-partner',
      loop:true,
      breakpoints: {
        // when window width is <= 480px
        640: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    });
}

init();