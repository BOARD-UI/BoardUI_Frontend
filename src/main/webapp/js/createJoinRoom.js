console.log("aaa");


$(document).ready(function () {
    $('a').click(function (event) {
        let target = event.target;
        $(".options-list").children().toArray().forEach(function (element) {
            if (target.id === element.id || element.classList.contains("active")) {
                $("#" + element.id).toggleClass("active");
            }
        });
    });
});

function showJoinRoom() {
    document.getElementById("joinRoom").style.display = 'block';
    hideCreateRoom();
}

function showCreateRoom() {
    document.getElementById("createRoom").style.display = 'block';
    hideJoinRoom();
}

function hideJoinRoom() {
    document.getElementById("joinRoom").style.display = 'none';
}

function hideCreateRoom() {
    document.getElementById("createRoom").style.display = 'none';
}