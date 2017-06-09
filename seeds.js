var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        title: "Prague Square",
        image: "https://images.unsplash.com/photo-1452165598664-87835d28c9d9?dpr=2&auto=compress,format&fit=crop&w=991&h=661&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Prague, Czech Republic",
        created: Date.now()
    },
    {
        title: "Coastal Italy",
        image: "https://images.unsplash.com/photo-1483984937723-e978b50f0e2a?dpr=2&auto=compress,format&fit=crop&w=568&h=378&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Venice, Italy",
        created: Date.now()
    },
    {
        title: "Winter Rooftops",
        image: "https://images.unsplash.com/20/cold-city.JPG?dpr=2&auto=compress,format&fit=crop&w=1199&h=802&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Prague, Czech Republic",
        created: Date.now()
    },
    {
        title: "Charles Bridge At Night",
        image: "https://images.unsplash.com/photo-1415356838286-df6fd593e8b3?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Prague, Czech Republic",
        created: Date.now()
    },
    {
        title: "Foggy Eiffel Tower",
        image: "https://images.unsplash.com/25/tower-section.jpg?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Paris, France",
        created: Date.now()
    },
    {
        title: "Paris At A Distance",
        image: "https://images.unsplash.com/photo-1438955138287-0c090d2290d5?dpr=2&auto=compress,format&fit=crop&w=1199&h=1798&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Paris, France",
        created: Date.now()
    },
    {
        title: "Amsterdam In The Evening",
        image: "https://images.unsplash.com/photo-1447877980755-c3c642760061?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Amsterdam, Netherlands",
        created: Date.now()
    },
    {
        title: "Overlooking Barcelona",
        image: "https://images.unsplash.com/photo-1482442913642-daada1755553?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Barcelona, Spain",
        created: Date.now()
    },
    {
        title: "Barcelona Cathedral In The Distance",
        image: "https://images.unsplash.com/photo-1477038382033-d60d8e3b1a0c?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Barcelona, Spain",
        created: Date.now()
    },
    {
        title: "Mirrored Reflection Of Germany",
        image: "https://images.unsplash.com/photo-1461175963493-d134fcc8434b?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=",
        body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
        location: "Berlin, Germany",
        created: Date.now()
    },
]

function seedDB() {
    // User.remove({}, function(err) {
        
    // });
    // Remove all blogs
    Blog.remove({}, function(err) {
    //     if(err) {
    //         console.log(err);
    //     } 
    //     // Add a few blogs
    //     data.forEach(function(seed) {
    //         Blog.create(seed, function(err, blog) {
    //             if(err) {
    //                 console.log(err);
    //             } else {
    //                 // Create a comment
    //                 Comment.create(
    //                     {
    //                         name: "Homer Simpson",
    //                         created: Date.now(),
    //                         content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                            
    //                     }, function(err, comment) {
    //                         if(err) {
    //                             console.log(err);
    //                         } else {
    //                             blog.comments.push(comment);
    //                             blog.save();
    //                         }
    //                     });
    //             }
    //         }); 
    //     });
     });
}

module.exports = seedDB;