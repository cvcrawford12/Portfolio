function main() {
  // play video on click and pause on click
  document.querySelector("video").addEventListener("click", function() {
    if (typeof InstallTrigger !== "undefined") {
      return
    } else {
      // toggles play / pause
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  });

  document.querySelector('.video-span').addEventListener('click', function() {
    document.querySelector('video').play();
    $(".toggle-layover").fadeOut("slow", function() {});
  });


  $("video").hover(function(event) {
    if($(".toggle-layover:visible").length === 0) {
      // change poster image on hover to give the effect of 9s changing to play button
      if(event.type === "mouseenter") {
        $(this).attr("poster", "img/video-cover-hover.jpeg");
      } else if(event.type === "mouseleave") {
        $(this).attr("poster", "img/video-cover.jpg");
      }
    }
});

}

main();
