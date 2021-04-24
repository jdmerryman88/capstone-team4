$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        makePredictions();
    });
});

// call Flask API endpoint
function makePredictions() {
    var carat = $("#carat").val();
    var cut = $("#cut").val();
    var color = $("#color").val();
    var clarity = $("#clarity").val();
    var depth = $("#depth").val();
    var table = $("#table").val();
    var length = $("#length_mm").val();
    var width = $("#width_mm").val();
    var depth = $("#depth_mm").val();

    // create the payload
    var payload = {
        "carat": carat,
        "cut": cut,
        "color": color,
        "clarity": clarity,
        "depth": depth,
        "table": table,
        "length_mm" : length,
        "width_mm" : width,
        "depth_mm" : depth,
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            if (returnedData["prediction"] == 1) {
                $("#output").text("You Survived!");
            } else {
                $("#output").text("You Died!");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}