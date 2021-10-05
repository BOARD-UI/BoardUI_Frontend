console.log("aaa");


$(document).ready(function () {
    $('a').click(function (event) {
        let target = event.target;
        $(".options-list").children().toArray().forEach(function(element){
            if(target.id === element.id || element.classList.contains("active")){
                $("#" + element.id).toggleClass("active");
            }
        });
    });
});