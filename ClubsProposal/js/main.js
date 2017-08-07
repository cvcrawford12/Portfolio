function main() {
  var iphoneImages = document.querySelectorAll('.iphone-image');
  var whatContent = document.querySelectorAll('.what-content');
  $(iphoneImages).hide();
  $(whatContent).hide();
  $(iphoneImages[0]).show();
  $(whatContent[0]).show();

  function handleBtnFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var currentId = $('.active').attr('id');
        var nextId = btn.id;
        $('#what .active').removeClass('active');
        $(btn).addClass('active');
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

}

main()
