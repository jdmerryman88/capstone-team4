
$(document).ready(function () {

    buildTable();
    // buildTable(dateFilter);
    //Event Listeners
    $("#filter-btn").on("click", function (e) {
        e.preventDefault();
        buildTable();
    });
    $("#filter-clear").on("click", function (e) {
        e.preventDefault();
        resetFilters();
        buildTable();
    });
    $("#form").on("submit", function (e) {
        e.preventDefault();
        buildTable();
    });
});

function resetFilters() {
    $("#caratmax").val("1000000000");
    $("#caratmin").val("0");
    $("#pricemin").val("0");
    $("#pricemax").val("1000000000");
    $("#cut").val("");
    $("#color").val("");
    $("#clarity").val("");
    $("#tdepthmin").val("0");
    $("#tdepthmax").val("100000");
    $("#tabmin").val("0");
    $("#tabmax").val("100000");
    $("#length_mm_min").val("0");
    $("#length_mm_max").val("100000");
    $("#width_mm_min").val("0");
    $("#width_mm_max").val("100000");
    $("#depth_mm_min").val("0");
    $("#depth_mm_min").val("100000");
}



function buildTable() {
    d3.csv("../static/data/diamonds.csv").then(function (diamondsPrice) {

        var caratMax = parseFloat($("#caratmax").val());
        var caratMin = parseFloat($("#caratmin").val());
        var cutFilter = $("#cut").val();
        var colorFilter = $("#color").val();
        var clarityFilter = $("#clarity").val();
        var priceMin = parseFloat($("#pricemin").val());
        var priceMax = parseFloat($("#pricemax").val());
        var tdepthMin = parseFloat($("#tdepthmin").val());
        var tdepthMax = parseFloat($("#tdepthmax").val());
        var tableMin = parseFloat($("#tabmin").val());
        var tableMax = parseFloat($("#tabmax").val());
        var lengthMin = parseFloat($("#length_mm_min").val());
        var lengthMax = parseFloat($("#length_mm_max").val());
        var widthMin = parseFloat($("#width_mm_min").val());
        var widthMax = parseFloat($("#width_mm_max").val());
        var depthMin = parseFloat($("#depth_mm_min").val());
        var depthMax = parseFloat($("#depth_mm_max").val());

        // apply filters
        var filteredData = diamondsPrice;


        if (caratMax) {
            filteredData = filteredData.filter(row => parseFloat(row.carat) <= parseFloat(caratMax));
        }
        if (caratMin) {
            filteredData = filteredData.filter(row => parseFloat(row.carat) >= parseFloat(caratMin));
        }
        if (cutFilter) {
            filteredData = filteredData.filter(row => (row.cut) === (cutFilter));
        }
        if (colorFilter) {
            filteredData = filteredData.filter(row => (row.color) === (colorFilter));
        }
        if (clarityFilter) {
            filteredData = filteredData.filter(row => (row.clarity) === (clarityFilter));
        }
        if (priceMin) {
            filteredData = filteredData.filter(row => parseFloat(row.price) >= (priceMin));
        }
        if (priceMax) {
            filteredData = filteredData.filter(row => parseFloat(row.price) <= (priceMax));
        }
        if (tdepthMin) {
            filteredData = filteredData.filter(row => parseFloat(row.depth) >= (tdepthMin));
        }
        if (tdepthMax) {
            filteredData = filteredData.filter(row => parseFloat(row.depth) <= (tdepthMax));
        }
        if (tableMin) {
            filteredData = filteredData.filter(row => parseFloat(row.table) >= (tableMin));
        }
        if (tableMax) {
            filteredData = filteredData.filter(row => parseFloat(row.table) <= (tableMax));
        }
        if (lengthMin) {
            filteredData = filteredData.filter(row => parseFloat(row.length_mm) >= (lengthMin));
        }
        if (lengthMax) {
            filteredData = filteredData.filter(row => parseFloat(row.length_mm) <= (lengthMax));
        }
        if (widthMin) {
            filteredData = filteredData.filter(row => parseFloat(row.width_mm) >= (widthMin));
        }
        if (widthMin) {
            filteredData = filteredData.filter(row => parseFloat(row.width_mm) <= (widthMax));
        }
        if (depthMin) {
            filteredData = filteredData.filter(row => parseFloat(row.depth_mm) >= (depthMin));
        }
        if (depthMax) {
            filteredData = filteredData.filter(row => parseFloat(row.depth_mm) <= (depthMax));
        }

        buildTableString(filteredData);
    });

    function buildTableString(diamondsPrice) {

        // JQUERY creates an HTML string
        var tbody = $("#table>tbody");
        //clear table
        tbody.empty();

        //destroy datatable
        $("table").DataTable().clear().destroy();

        var datarows = diamondsPrice.map(x => [x["carat"], x["cut"], x["color"], x["clarity"], x["price"], x["depth"], x["table"], x["length_mm"], x["width_mm"], x["depth_mm"]])

        //redraw
        $("#table").DataTable({

            data: datarows,
            "defaultContent": "",

            "pageLength": 20,
            dom: 'Bfrtip', //lbfrtip if you want the length changing thing
            buttons: [
                { extend: 'copyHtml5' },
                { extend: 'excelHtml5' },
                { extend: 'csvHtml5' },
                {
                    extend: 'pdfHtml5',
                    title: function () { return "Diamond Data"; },
                    orientation: 'portrait',
                    pageSize: 'LETTER',
                    text: 'PDF',
                    titleAttr: 'PDF'
                }
            ]
        });
    }
}; 