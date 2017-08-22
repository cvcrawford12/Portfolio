function main() {
  var playerNames = [
    'Gareth Bale', "Karim Benzema", 'Gianluigi Buffon',
    'Cristiano Ronaldo', "Robert Lewandowski", 'Eden Hazard',
    'Lionel Messi', 'Neymar Santos', 'Paul Pogba', 'Luis Suarez'
  ]

  var networkArray = ['Facebook', 'Pinterest', 'Twitter', 'Youtube', 'Instagram'];


  var playerName,playerImage,posts,comments,network,networkName,dailyPosts,dailyComments,dailyNetwork;
  var allPlayers = {};

  // The html for the network icons
  // extract value based on which network the player is most active on
  var networks = {
    'facebook': '<i id="Facebook" class="fa fa-facebook-square" aria-hidden="true"></i>',
    'instagram': '<i id="Instagram" class="fa fa-instagram" aria-hidden="true"></i>',
    'youtube': '<i id="Youtube" class="fa fa-youtube-play" aria-hidden="true"></i>',
    'twitter': '<i id="Twitter" class="fa fa-twitter" aria-hidden="true"></i>',
    'pinterest': '<i id="Pinterest" class="fa fa-pinterest" aria-hidden="true"></i>'
  }

  // construct a player object for each player extracted from API
  var tempString = "";
  for (var i = 1; i<playerNames.length + 1; i++) {
    // Just some test data
    playerName = playerNames[i - 1];
    playerImage = 'images/players/circle_' + playerName.split(" ")[1].toLowerCase() + ".png";
    posts = (Math.floor(Math.random() * (100 - 0)) + 0).toString();
    dailyPosts = Math.floor(posts / 7) + 1;
    monthlyPosts = Math.floor(posts * 4.345) + 1;
    comments = (Math.floor(Math.random() * (100 - 0)) + 0).toString();
    dailyComments = Math.floor(comments / 7) + 1;
    monthlyComments = Math.floor(comments * 4.345) + 1;
    networkName = networkArray[Math.floor(Math.random() * (5 - 0) + 0)];
    network = networks[networkName.toLowerCase()];

    var player = {
      'name': playerName,
      'image': playerImage,
      'posts': posts,
      'dailyPosts': dailyPosts,
      'monthlyPosts': monthlyPosts,
      'comments': comments,
      'dailyComments': dailyComments,
      'monthlyComments': monthlyComments,
      'network': network,
      'dailyNetwork': dailyNetwork
    }
    allPlayers[playerName] = player;
    var playersGroup;
    var newPlayer =
    '<div class="players"><div class="player"><img class="img-circle img-responsive player-image" src='+player.image+
    '></div><div class="player name">'+player.name+
    '</div><div class="player stats posts">'+player.posts+
    '</div><div class="player stats comments">'+player.comments+
    // '</div><div class="player stats network">'+player.network+
    // '</div></div>'
    '</div>';

    tempString += newPlayer;

    if (i % 5 == 0) {
      playersGroup = '<li class="slide">' + tempString + '</li>';
      $("#slide").append(playersGroup);
      tempString = "";
      playersGroup = '';
    }
  }

  var slides = document.querySelectorAll('#slide .slide');
  $(slides).hide();
  $(slides[0]).show();
  var currentSlide = 0;
  document.getElementById('next-player').addEventListener('click', function() {
    slide("next");
  });
  document.getElementById('prev-player').addEventListener('click', function() {
    slide("prev");
  });

  function slide(direction) {
    if (direction === "next") {
      slides[currentSlide].className = 'slide animated fadeOutLeft';
      currentSlide = (currentSlide + 1) % slides.length;
      $(slides[currentSlide]).show();
      slides[currentSlide].className = 'slide animated fadeInRight';
    } else {
      slides[currentSlide].className = 'slide animated fadeOutRight';
      if (currentSlide === 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = (currentSlide - 1) % slides.length;
      }
      $(slides[currentSlide]).show();
      slides[currentSlide].className = 'slide animated fadeInLeft';
    }

  }

  var playerFilterItems = document.getElementById('playerFilters').querySelectorAll('li a');
  var postsPosition = 2;
  var commentsPosition = 3;
  var networkPosition = 4;
  var playersToUpdate = document.querySelectorAll(".name");
  playerFilterItems.forEach(function(filterItem) {
    filterItem.addEventListener("click", function() {
      document.getElementById('playerFilter').textContent = this.textContent;
      document.getElementById('playerFilterBtn').textContent = this.textContent;
      // var allPlayers = document.querySelectorAll('.name');
      for (var i = 0; i<playersToUpdate.length; i++) {
        // filter data by grabbing players name and accessing its properties via its key (name)
        var thisPlayersName = playersToUpdate[i].textContent;
        if (this.textContent.toLowerCase() === 'daily') {
          playersToUpdate[i].parentNode.childNodes[postsPosition].textContent = allPlayers[thisPlayersName].dailyPosts;
          playersToUpdate[i].parentNode.childNodes[commentsPosition].textContent = allPlayers[thisPlayersName].dailyComments;
        } else if (this.textContent.toLowerCase() === 'weekly') {
          playersToUpdate[i].parentNode.childNodes[postsPosition].textContent = allPlayers[thisPlayersName].posts;
          playersToUpdate[i].parentNode.childNodes[commentsPosition].textContent = allPlayers[thisPlayersName].comments;
        } else {
          playersToUpdate[i].parentNode.childNodes[postsPosition].textContent = allPlayers[thisPlayersName].monthlyPosts;
          playersToUpdate[i].parentNode.childNodes[commentsPosition].textContent = allPlayers[thisPlayersName].monthlyComments;
        }
      }

    });
  });
}

main();
