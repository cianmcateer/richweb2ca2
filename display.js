
$.ajax({
    url: "http://completedeal.co.nf/display.php",
    type: "POST",
    data: "json",
    async: false,
    success: function(data){
        console.log("JSON Success");
        $.each(data,function(i,field){
            $("#test").append('<img id = "displayImg" src="data:image/png;base64,' + field['image'] + '"/>' + '<br>' + '<p id = "des">' + field['description'] + '</p>' + '<br> <label id = "product">Product: </label>' + field['name'] + '<br> <label id = "price">Price: </label>' + "€" + field['price'] + '<a id = "link" href="map.html?lat='+field['latitude']+'&lng='+field['longitude']+'&title='+field['name']+'&desc='+field['description']+'" id="loc">View Location</a>'

            );

        });
        },
        error: function(){
            console.log("JSON data could not be retrieved");
        }
});
