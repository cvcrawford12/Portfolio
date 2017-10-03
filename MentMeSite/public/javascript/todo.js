function main() {
    
    var beginningOuterTags = "<div class='edit-template col-xs-6'>";
    var endOuterTags = "</div>"
    var popoverDivOne = "<p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p><p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p><p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p><p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i> General</p>"
    var popoverDivTwo = "<p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p><p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p><p><span class='edit-icon'><i class='fa fa-circle' aria-hidden='true'></i></span> General</p>"
    var popoverGroups = [popoverDivOne, popoverDivTwo];
    
     $('[data-toggle="popover"]').popover({
        content: function() { return $('.popover-content').html(); },
        html: true,
    }).on('shown.bs.popover', function() {
        $('.close').on('click', function() {
            $(this).parent().parent().popover('hide');
        });
    });
    
    $('body').on('hidden.bs.popover', function (e) {
        $(e.target).data("bs.popover").inState.click = false;
    });
    

    function replaceTodo() {
        $('.todo').keydown(function(e) {
            var key = e.which;
            if (key == 13) {
                $(this).blur();
            }
        });
    }
    
    
    function addTask() {
        // Create html element which represents a task
        var beginning = '<li class="todo"><i class="fa fa-circle edit-trigger" aria-hidden="true" type="button"'
        var beginningTag =  'data-container="body" data-toggle="popover" data-placement="right"></i><input type="text" placeholder="New Task">';
        var closingTag = '</li>';
        
        // Find parent of clicked icon and get the id
        $('.add-todo-icon').parent().on('click', function() {
            var parentId = $(this).attr('id');
            
            if (parentId === 'add-task') {
                // Add a specific task not a group and assign a random color (or color which is similar to category)
                // Give new input focus so they can change the name
                
                $('.todo-list').append(beginning + beginningTag + closingTag);
                $('.todo:last-of-type').find('i').css('color', 'rgb(200, 100, 50)');
                $('.todo:last-of-type input').focus();
                $('[data-toggle="popover"]').popover({
                    content: function() { return $('.popover-content').html(); },
                    title: 'Edit Group <button class="close close-popover">&times</button>',
                    html: true,
                }).on('shown.bs.popover', function() {
                    $('.close').on('click', function() {
                        $(this).parent().parent().popover('hide');
                    });
                });
                
            } else if (parentId === 'add-group') {
                var colors = ['blue', 'red', 'purple', 'green', 'orange', 'grey', 'yellow', 'teal', 'gold', 'navy', 'lime', 'pink']
                var color;
                for (var i = 0; i < colors.length; i++) {
                    if (!$('.popover-content .fa-circle').hasClass(colors[i])) {
                        color = colors[i];
                        break
                    } 
                }
                
                // variables to hold structure for html which represents the groups
                var htmlSkeleton = "<p class='popover-p'><span class='edit-icon'><i class='fa fa-circle" + ' ' + color
                var htmlElement =  htmlSkeleton + "'aria-hidden='true'></i></span> General</p>";
                var htmlParentElement = beginningOuterTags + htmlElement + endOuterTags;
                var numOfPs = $('.popover-content .edit-template .popover-p').length / 2;
                if (numOfPs % 4 === 0) {
                    // add a new edit template 
                    var newColSize;
                    $('.popover-content').append(htmlParentElement);
                    console.log('here');
                } else {
                    // add a p to the last edit template
                    console.log('there');
                    $('.popover-content .edit-template:last-of-type').append(htmlElement);
                }
                
               
            }
        });
    }
    
    // Expandable containers
    $('.expandable-container .task-title').on('click', function(){
        if ($(this).parent().hasClass('open')) {
            $('.expandable-container.out').not($(this).parent()).removeClass('out');
            $(this).parent().removeClass('open');
            $(this).parent().find('.show').removeClass('show').addClass('hide');
            $('.show-textarea').removeClass('show-textarea').addClass('hide-textarea')
        } else {
            $('.expandable-container').not($(this).parent()).addClass('out');
            $(this).parent().addClass('open');
            $(this).parent().find('.hide').removeClass('hide').addClass('show');
        }
    });
    
    $('.notes').on('click', function() {
       $('.hide-textarea').addClass('show-textarea');
    });
    
    
    replaceTodo();
    addTask();
}

main();