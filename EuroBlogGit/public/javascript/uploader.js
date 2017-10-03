function startRead(event) {
    var file = document.querySelector("#file").files[0];
    if(file) {
        if(file.type.match("image.*")) {
            getAsImage(file);
            console.log(getAsImage(file));
        } else {
            getAsText(file);
            alert("Name: " + file.name + " could not be loaded properly as an image");
        }
    } 
    event.stopPropagation();
    event.preventDefault();
}

function startReadFromDrag(event) {
    var file = event.dataTransfer.files[0];
    if(file) {
        if(file.type.match("image.*")) {
            getAsImage(file);
            
        } else {
            getAsText(file);
            alert("Name: " + file.name + " could not properly upload as an image");
        }
    }
    event.stopPropagation();
    event.preventDefault();
}

var dropingDiv = document.querySelector("#upload");
// dropingDiv.addEventListener("dragover", domagic, false);
dropingDiv.addEventListener("drop", startReadFromDrag, false);

function getAsImage(readFile) {
    var reader = new window.FileReader();
    reader.readAsDataURL(readFile);
    reader.onload = addImg;
}

function getAsText(readFile) {
    var reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
}

function addImg(imgsrc) {
    var reader = new window.FileReader();
    reader.readAsDataURL(imgsrc);
}

function loaded(event) {
    var fileString = event.target.result;
}