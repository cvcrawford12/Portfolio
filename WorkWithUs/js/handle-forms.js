function handleForms() {
  (function () {
    var desc = "We are looking for a dedicated, self-motivated "
    var endDesc = " Must have some portfolio or github link to demonstrate understanding of skills."
    var generalDesc = "Most importantly, we are always looking for fun and positive minded people who want to be a part of something bigger than themselves. If you want to join a growing team and contribute meaningful work alongside other dedicated team members then you've come to the right place."

    var btns = document.querySelectorAll("#positions .open-positions .thumbnail .btn");


    btns.forEach(function(btn) {

      btn.addEventListener("click", function(event) {
        // get first class which will be the type of form to bring up
        var btnClass = this.classList.item(0);

        // get second class which is the type of form
        var typeOfForm = this.classList.item(1);

        switch (btnClass) {
          case "dev": styleDevForm(typeOfForm);
                      break;
          case "design": styleDesignForm(typeOfForm);
                      break;
          case "business": styleBusinessForm(typeOfForm);
                      break;
        }
      });
    });



    function styleDevForm(formType) {
      // clear requirements
      clearFormContent();
      var portfolioType = "https://github.com/"

      // depending on which position push content
      switch (formType) {
        case "front-end":
          var title = "Front End Developer";
          var description = desc + "front end web developer with notable experience in web design." + endDesc;
          var jobRequirements = ["HTML", "CSS", "Frontend Framework", "jQuery", "Javascript"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;

        case "back-end":
          var title = "Back End Developer";
          var description = desc + "back end web developer with notable experience working with databases and server side frameworks." + endDesc;
          var jobRequirements = ["Python", "Django", "PostgreSQL", "API's"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;

        case "android":
          var title = "Android Mobile Developer";
          var description = desc + "Android developer with notable experience working with Java, mobile application distribution, and back end frameworks." + endDesc;
          var jobRequirements = ["Java", "MVC Design Pattern", "PostgreSQL", "API's", "Dagger2", "RxJava", "OOP Design"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;

        case "ios":
          var title = "iOS Mobile Developer";
          var description = desc + "iOS developer with notable experience working with Swift, mobile application distribution, Xcode8+, Interface Builder, iOS SDK, and back end frameworks." + endDesc;
          var jobRequirements = ["Swift", "MVC Design Pattern", "PostgreSQL", "API's", "Xcode8+", "iOS SDK", "CocoaPods", "OOP Design"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;
      }
    }


    function styleBusinessForm(formType) {
      clearFormContent();

      // depending on which position push content
      switch (formType) {
        case "digital":
          var title = "Digital Marketing";
          var description = desc + "invdividual with strong communcation and technology skills. You must be knowledgeable about technology and its impact on business development";
          var jobRequirements = ["Sales", "Social Media", "Market Analysis", "Financial Analysis", "Communication"];
          pushFormContent(title, description, generalDesc, jobRequirements);
          break;

        case "brand":
          var title = "Branding and Business Development";
          var description = desc + "invdividual with strong communcation and teamwork skills. You must be knowledgeable about technology and its impact on business development and be comfortable discussing a wide variety of business and technology topics with individuals from all skillsets.";
          var jobRequirements = ["Sales", "Social Media", "Market Analysis", "Financial Analysis", "Communication"];
          pushFormContent(title, description, generalDesc, jobRequirements);
          break;
      }

    }


    function styleDesignForm(formType) {
      clearFormContent();
      var portfolioType = "https://your-portfolio.com"

      // depending on which position push content
      switch (formType) {
        case "photoshop":
          var title = "Photoshop Artist";
          var description = desc + "photoshop artist with a portfolio to demonstrate design capabilites and creativity." + endDesc;
          var jobRequirements = ["Adope CC", "Visual Ideation", "Typography", "Color Theory"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;

        case "media":
          var title = "Multmedia Designer";
          var description = desc + "multimedia designer with a portfolio of projects to demonstrate design capabilites and creativity." + endDesc;
          var jobRequirements = ["Multimedia design software", "Visual Ideation", "Tech Savy"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;

        case "web":
          var title = "Web Designer";
          var description = desc + "web designer with experience collaborating with developers and making beautiful web sites." + endDesc;
          var jobRequirements = ["CSS", "Color Theory", "Typography", "Design Theory", "UX"];
          pushFormContent(title, description, generalDesc, jobRequirements, portfolioType);
          break;
      }

    }


    function pushFormContent(title, description, generalDesc, jobRequirements, portfolioType) {
      $("#application-type").text(title + " Application");
      $("#job-description").text(description);
      $("#general-description").text(generalDesc);

      // if not a dev or design position
      if (portfolioType == undefined) {
        $("#show-portfolio").css("display", "none");
      } else {
        // then it must be a dev or design position so we need portfolio
        $("#show-portfolio").css("display", "block");
        $("#portfolio").attr("placeholder", portfolioType);
      }

      // append list of job requirements
      jobRequirements.forEach(function(requirement) {
        $("#job-requirements").append("<dd>" + requirement + "</dd>");
      });
    }


    function clearFormContent() {
      // clear the job requirements
      $("#job-requirements dd").remove();
    }

  })();
}

handleForms();
