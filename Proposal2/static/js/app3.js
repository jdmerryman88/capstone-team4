// d3.csv("../data/diamonds.csv").then(function (diamondsPrice) {
//     console.log(diamondsPrice);

    $(document).ready(function() {

        buildTable(); 
        // buildTable(dateFilter);
        //Event Listeners
        $("#filter-btn").on("click", function(e) {
            e.preventDefault();
            buildTable();
        });
        $("#filter-clear").on("click", function(e) {
            e.preventDefault();
            resetFilters();
            buildTable();
        });
        $("#form").on("submit", function(e) {
            e.preventDefault();
            buildTable();
        });   
    }); 
    
    function resetFilters() {
        $("#carat").val("");
        $("#cut").val("");
        $("#color").text("");
        $("#clarity").text("");
        $("#depth").val("");
        $("#table").val("");
        $("#length").val("");
        $("#width").val("");
        $("#depth").val("");
    }
    
    
    
    function buildTable() {
        d3.csv("../data/diamonds.csv").then(function(diamondsPrice) {
    
            var caratFilter = parseInt($("#carat").val()); 
            var cutFilter = $("#cut").val();
            var colorFilter = $("#color").val();
            var clarityFilter = $("#clarity").val();
            var depthFilter = parseInt($("#depth").val());
            var tableFilter = parseInt($("#table").val());
            var lengthFilter = parseInt($("#length").val());
            var widthFilter = parseInt($("#width").val());
            var depthFilter = parseInt($("#depth").val());
    
            // apply filters
            var filteredData = diamondsPrice
    
            if (caratFilter) {
                filteredData = filteredData.filter(row => parseInt(row.carat) === (caratFilter));
               }
            if (cutFilter) {
                filteredData = filteredData.filter(row => (row.cut) === (cutFilter))
                } 
            if (colorFilter) {
                filteredData = filteredData.filter(row => (row.color) === (colorFilter));
                } 
            if (clarityFilter) {
                filteredData = filteredData.filter(row => (row.clarity) === (clarityFilter));
                } 
            if (depthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.depth) === (depthFilter));
                }   
            if (tableFilter) {
                filteredData = filteredData.filter(row => parseInt(row.table) === (tableFilter));
                } 
            if (lengthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.length) === (lengthFilter));
                } 
            if (widthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.widht) === (widthFilter));
                } 
            if (depthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.depth) === (depthFilter));
                } 
           // // see if we have any data left
            // else (filteredData.length === 0) {
            //     alert("No Data Found!");} 
           
        //    else {
        //         filteredData.forEach(function(row) {
        //             row.latitude = parseFloat(row.latitude).toFixed(2);
        //             row.longitude = parseFloat(row.longitude).toFixed(2)
        //         })
    }
                
            buildTableString(filteredData);
        }); 
    }
    
    function buildTableString(diamondsPrice) {
    
        // JQUERY creates an HTML string
        var tbody = $("#table>tbody");
        //clear table
        tbody.empty();
    
        //destroy datatable
        $("table").DataTable().clear().destroy();
    
        var datarows = diamondsPrice.map(x => [x["carat"], x["cut"], x["color"], x["clarity"],  x["depth"], x["table"], x["length"] ,x["width"],x["depth"]])
    
        //redraw
        $("#table").DataTable({
    
            data: datarows,
            "defaultContent": "", 
    
            "pageLength": 15, 
            dom: 'Bfrtip', //lbfrtip if you want the length changing thing
            buttons: [
                { extend: 'copyHtml5' },
                { extend: 'excelHtml5' },
                { extend: 'csvHtml5' },
                {
                    extend: 'pdfHtml5',
                    title: function() { return "Diamond Data"; },
                    orientation: 'portrait',
                    pageSize: 'LETTER',
                    text: 'PDF',
                    titleAttr: 'PDF'
                }
            ]
        });
    }; 