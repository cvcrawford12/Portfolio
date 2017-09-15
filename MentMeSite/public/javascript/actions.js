function main() {
    
    function changeActiveMessenger() {
        // If a contact is clicked on remove the currently active class
        $('.message-contact-list li, .message-contact-list li a').on('click', function() {
           $('.message-contact-list .active').removeClass('active');
           
            // Activate newly clicked class
            $(this).addClass('active');
            activateMessenger();
        });
    }
    
    
    function activateMessenger() {
        // Grab the name of the active messenger contact
        var activePersonsName = $('.message-contact-list .active').text();
        
        // Change the placeholder of message box to have the messengers name
        $('.text-area').attr('placeholder', 'Message @' + activePersonsName);
    }
    
    function deleteConversation() {
        $('.message-contact-list li, .message-contact-list li a').hover(function() {
           $(this).find('.delete-conversation').toggle(); 
        });
    }
    
    function closeDownloadsTab() {
        // If either the close btn or the expand btn is clicked 
        $('.close-download-options, .expand').on('click', function() {
            // Shift depending on who the sender is
            $('#expand-messages-col').toggleClass('shift-left shift-right');
            
            // toggle between col sizes
            $('#expand-messages-col').toggleClass('span6 span8');
            $('.downloads-outer-container').toggleClass('span0 span3');
            
            // Show and hide the expand icon with animation
            $('.expand').toggle('slow');
        });
    }
    
    
    function handleDownloadOptions() {
        $('.download-option a').on('click', function() {
            var dataTarget = this.dataset.target;
            if (dataTarget) {
                $('.download-items.active, .download-option > .active').removeClass('active');
                $('.' + dataTarget).addClass('active');
                $(this).addClass('active');   
            }
        });
    }
    
    // Adjust subnav for messages hr underline
    function adjustSubNavbarActive() {
        // values for moving the hr and adjusting its width for larger words
        var marginAdjustments = [0, 25];
        var widthAdjustments = [25, 35];
        
        // Grab the index attribute value and use that to get appropriate margin/width
        $('.download-sub-option').on('click', function() {
            var index = this.dataset.indexNumber;
            $('.downloads-sub-container hr').css({
                'width' : widthAdjustments[index] + '%',
                'margin-left' : marginAdjustments[index] + '%'
            }); 
        });
    }
    
    function showDownloadOptionsOnHover() {
        $('.download-item-container').mouseenter(function() {
           $(this).find('.share-icon').show(); 
        });
        
        $('.download-item-container').mouseleave(function() {
           $(this).find('.share-icon').hide(); 
        });
    }
    
    // initialize functions that will handle switching between messages for contacts
    closeDownloadsTab();
    adjustSubNavbarActive();
    changeActiveMessenger();
    activateMessenger();
    deleteConversation();
    showDownloadOptionsOnHover();
    handleDownloadOptions();
    
    ////// Jquery Events //////
    
    // Handle autogrow of message box
    $('.text-area').on('input', function() {
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + 'px';
    });
}

main();