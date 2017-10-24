var memId = window.localStorage.getItem("memId");

var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;

var canvas;
var g;

var image = new Image();

canvas = document.getElementById("canvas");
g = canvas.getContext("2d");
Math.radians = function(degrees){
    return degrees * Math.PI / 180;
};
$('#button').on('click', function ()
{
    navigator.camera.getPicture(onPhotoDataSuccess);


    function onPhotoDataSuccess(imageData)
    {
        image.onload = function () {
            g.save();
            g.translate(canvas.width / 2, canvas.height / 2);
            g.rotate(Math.radians(90));
            g.translate(-canvas.width / 2, -canvas.height / 2);

            g.drawImage(image, 0, 0, canvas.width, canvas.height);
            g.restore();

            var data = canvas.toDataURL('image/jpeg', 1.0);
            document.getElementById('img').value = data.toString().split('base64,')[1];



        },
                image.src = imageData;

    }


});

navigator.geolocation.getCurrentPosition(function(position){
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        enableHighAccuracy: false
    };

    document.getElementById('lat').value = pos.lat;
    document.getElementById('lng').value = pos.lng;
});

document.getElementById("userId").value = memId;

$("#fileUploadForm").submit(function(e){
    e.preventDefault();

    var formData=new FormData($(this)[0]);

    $.ajax({
        url:"http://completedeal.co.nf/upload.php",
        type: "POST",
        data: formData,
        async: false,

        success: function(msg){
            $('#imageContainer').html('<img src="data:image/jpeg;base64,' + msg + '"/>');
        },
        error: function(err){
            $('#imageContainer').html(JSON.stringify(err));
        },
        cache:false,
        contentType: false,
        processData: false

    });
});
