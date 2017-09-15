function main() {
    
    // $('.todo input')
    
    
    // Todo page functions 
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
        var beginningTag = "<li class='todo active'><i class='fa fa-circle' aria-hidden='true'></i><input type='text' placeholder='New Task'>";
        var closingTag = '</li>';
        
        // Find parent of clicked icon and get the id
        $('.add-todo-icon').parent().on('click', function() {
            var parentId = $(this).attr('id');
            if (parentId === 'add-task') {
                // Add a specific task not a group and assign a random color (or color which is similar to category)
                // Give new input focus so they can change the name
                $('.todo-list').append(beginningTag + closingTag);
                $('.todo:last-of-type').find('i').css('color', 'rgb(200, 100, 50)');
                $('.todo:last-of-type input').focus();
            } else if (parentId === 'add-group') {
                console.log(parentId);
            }
        });
    }
    
    replaceTodo();
    addTask();
}

main();