// get all delay elements
var delayElementTwo = document.querySelector("#delay-two");
var delayElementThree = document.querySelector("#delay-three");
var delayElementFour = document.querySelector("#delay-four");
var delayElementFive = document.querySelector("#delay-five");

$(document).ready(function() {
    if($(".about-page").length > 0) {
        transitions();
        scroll();
    }
});


function scroll() {
    $(window).scroll(function() {
        $("#scroll").addClass("animated fadeOut");
        if(visibleInView(delayElementTwo)) {
            $(delayElementTwo).addClass("animated fadeInRight");   
        } 
        if(visibleInView(delayElementThree)) {
            $(delayElementThree).addClass("animated fadeIn");
        } 
        if(visibleInView(delayElementFour)) {
            $(delayElementFour).addClass("animated fadeInUp");
        }
        if(visibleInView(delayElementFive)) {
            $(delayElementFive).addClass("animated fadeInUp");
        }
    });
}
function transitions() {
    // hide our element on page load
    $(".right, .left").css("opacity", 0);
}

function visibleInView(transitionClass) {
        // find dimensions of element to see if in view
        var top_of_element = $(transitionClass).offset().top;
        var bottom_of_element = $(transitionClass).offset().top + $(transitionClass).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).height();
        var top_of_screen = $(window).scrollTop();
        
        // check if in view
        if(bottom_of_screen - 2400 > top_of_element){
            // if in view add transition
            return true;
        }
    }



$(document).ready(function() {
    $(".step").hide();
    
    var stepsArray = $(".step").toArray();
    
    $(stepsArray).each(function() {
        if($(this).attr("id") == "demo") {
            $(this).children(":first-child").append("<a href='https://www.youtube.com/watch?v=vY3kIdRuzVg' class='btn btn-primary'>Full Video</a>");      
        } 
         
    });
    
    $(stepsArray[0]).show();
    
    $(".btn-mini").on("click", function() {
        var animatedClass;
        // when clicked, grab whole li parent
        // grab next li in list
        if($(this).attr("id") == "recruitment" || $(this).attr("id") == "hustler") {
            var thisParent = $(this).parent().parent().parent().parent().parent().parent();    
            var nextInList = $(thisParent).next();
            animatedClass = "animated fadeInUp"
        } else {
            var thisParent = $(this).parent().parent().parent().parent();
            if($(this).attr("id") == "back") {
                animatedClass = "animated fadeInRight";
                var nextInList = $(thisParent).prev();
            } else {
                if($(this).attr("id") == "forward") {
                    animatedClass = "animated fadeInleft";   
                } else {
                    animatedClass = "animated fadeInLeft";
                }
                var nextInList = $(thisParent).next();
            }
                
            
        }
        // check if there is another item
        if(thisParent.next("li").length > 0) {
            // if there is something next, then hide current and show next
            $(thisParent).hide();
            $(nextInList).addClass(animatedClass);
            $(nextInList).show()
            
        } else {
            // else if not then hide current and show the first again
            $(thisParent).hide();
            $(stepsArray[0]).show();
        }
    }); 
});

// helper functions
// function getRandomInt(bottom, top) {
//     var randomNum = Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
//     return randomNum;
// }

// function getRandomTransitionClass() {
//     var randomClasses = ["animated fadeInRight", "animated rollIn", "animated fadeInLeft", "animated flipInY"];
//     return randomClasses[getRandomInt(0, randomClasses.length - 1)];
// }

