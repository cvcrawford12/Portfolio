function main() {
  var customProfileContent = {
    'customize-profile' : {
      firstCard: {
        header: 'Customize Clubs',
        questions: [
          {
            1 : {
              question: 'How do I add a new team to my profile?',
              answer: 'To add a team to your profile you must.....'
            }
          },
          {
            2 : {
              question: "How do I view which teams I'm following?",
              answer: 'To view the teams on your profile you must.....'
            }
          },
          {
            3 : {
              question: "How many teams can I follow?",
              answer: 'The maximum amount of teams you can follow is.....'
            }
          },
          {
            4 : {
              question: "How do I unfollow a team?",
              answer: 'To unfollow a team you can.....'
            }
          },
          {
            5 : {
              question: "How can I view a teams latest game?",
              answer: 'To view the results from a teams latest game you can.....'
            }
          }
        ]
      }
    }
  }



  $('.sub-cat-link').on('click', function() {
    var id = this.id;
    adjustInfo(id);
  });

  function adjustInfo(id) {
    // $('#special-header h4').text(customProfileContent[id].firstCard.header);
    $('#special').empty()
    for (var i = 0; i < customProfileContent[id].firstCard.questions.length; i++) {
      $('#special').append('<li><a class="question-link">' + customProfileContent[id].firstCard.questions[i] + '</a></li>');
    }

    // $('.card-header:second h4').text(customProfileContent[id].firstCard.header);
    // $('.questions:second').remove();
    // $('.card-header:last-child h4').text(customProfileContent[id].thirdCard.header);
    // $('.questions:last-child').remove();


  }

}

main();
