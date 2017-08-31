function main() {
  var captions = [
    "<p>View personalized <span class='ninecolor'>Sports News</span></p>",
    "<p>Purchase <span class='ninecolor'>Tickets</span> and <span class='ninecolor'>Products</span></p>",
    "<p><span class='ninecolor'>Relive</span> every games best moments</p>",
    "<p>Always know when <span class='ninecolor'>Teams</span> play</p>",
    "<p>Follow the <span class='ninecolor'>Legends</span> and your <span class='ninecolor'>Idols</span></p>",
    '<p>Follow. ^1500 <span class="ninecolor">Live</span>. ^1500 Share.</p>'
  ];

  setTimeout(function() {
    var typed = new Typed('.type', {
      strings: captions,
      typeSpeed: 10,
      backSpeed: 10,
      backDelay: 2000,
      fadeOut: false,
      loop: false,
      showCursor: false
    });
  }, 3000);
}
main();
