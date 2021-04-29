
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
        $("#tab").val("");
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
            var priceFilter = parseInt($("#price").val());
            var tdepthFilter = parseInt($("#tdepth").val());
            var tableFilter = parseInt($("#tab").val());
            var lengthFilter = parseInt($("#length_mm").val());
            var widthFilter = parseInt($("#width_mm").val());
            var depthFilter = parseInt($("#depth_mm").val());
    
            // apply filters
            var filteredData = diamondsPrice;
            

            if (caratFilter) {
                filteredData = filteredData.filter(row => parseInt(row.carat) === (caratFilter));
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
            if (priceFilter) {
                    filteredData = filteredData.filter(row => parseInt(row.price) === (priceFilter));
                    } 
            if (tdepthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.depth) === (tdepthFilter));
                }   
            if (tableFilter) {
                filteredData = filteredData.filter(row => parseInt(row.table) === (tableFilter));
                } 
            if (lengthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.length_mm) === (lengthFilter));
                } 
            if (widthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.width_mm) === (widthFilter));
                } 
            if (depthFilter) {
                filteredData = filteredData.filter(row => parseInt(row.depth_mm) === (depthFilter));
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
    
        var datarows = diamondsPrice.map(x => [x["carat"], x["cut"], x["color"], x["clarity"], x["price"],  x["depth"], x["table"], x["length_mm"] ,x["width_mm"],x["depth_mm"]])
    
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
                    title: function() { return "Diamond Data"; },
                    orientation: 'portrait',
                    pageSize: 'LETTER',
                    text: 'PDF',
                    titleAttr: 'PDF'
                }
            ]
        });
    }}; 