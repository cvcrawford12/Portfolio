function main() {

  // Show All Friends
  function showAll(container, fixedHeight, btn) {
    var height;
    var className = 'social-visible'
    var innerText;
    $(btn).on('click', function() {

      if ($(this).hasClass(className)) {
        // if all the friends are already visible then fix the height
        height = fixedHeight + 'vh';
        $(this).removeClass(className);
        innerText = 'See All';
      } else {
        // otherwise make height full
        height = '100%';
        innerText = 'Hide';
        $(this).addClass(className);
      }
      // adjust the height to be full of fixed
      $(container).css({
        'height' : height
      });

      $(this).text(innerText);

    });

  }
  showAll('.friends-container', 25, '.show-all-friends');
  showAll('.activity-container', 75, '.show-all-posts');


  // Tasks dropdown-menu
  // Handle the completion
  function checkOffTask() {
    $('#tasks').find('li').mouseover(function() {
      $(this).find('.complete').css('display', 'inline');
      $(this).find('.complete').on('click', function(e) {
        $(this).parent().remove();
        e.stopPropagation();
      });
    });

    $('#tasks').find('li').mouseleave(function() {
      $(this).find('.complete').css('display', 'none');
    });
  }
  checkOffTask();

  // Show more video, book captions
  function showMoreCaption() {
    var height;
    $('.toggle-caption-size').on('click', function() {
      var item = $(this).text();
      var itemToShow = "." + item.toLowerCase() ;
      var parent = $(this).parent().parent();
      $(parent).hide();
      $(parent).siblings(itemToShow).show();
      if (itemToShow === '.more') {
        height = 'auto';
      } else {
        height = '250px';
      }
      $(parent).parents('.thumbnail').css({
        'height': height
      });
    });
  }
  showMoreCaption();
  
  // Prevent NavBar dropdowns on click, only hover
  $('.navbar .navbar-nav .dropdown').on('click', function(event) {
    event.stopPropagation();
  });
  
}

main();
