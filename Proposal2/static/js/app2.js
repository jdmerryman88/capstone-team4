var viz;

$(document).ready(function() {
    initializeViz();

    $("#home").click(function() {
        exportHome();
    });
    $("#visualizations").click(function() {
        exportVisualizations();
    });
    $("#predictor").click(function() {
        exportPredictor();
    });
    $("#data").click(function() {
        exportData();
    });
    $("#resources").click(function() {
        exportResources();
    });
    $("#about_us").click(function() {
        revertAll();
    });
});

function initializeViz() {
    var placeholderDiv = document.getElementById("tableauViz");
    var url = "https://public.tableau.com/views/diamonds_capstone_team4/Story1";
    var options = {
        width: placeholderDiv.offsetWidth,
        height: placeholderDiv.offsetHeight,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
        }
    };
    viz = new tableau.Viz(placeholderDiv, url, options);
}

function exportHome() {
    viz.showExportHomeDialog();
}

function exportVisualizations() {
    viz.showExportVisualizationsDialog();
}

function exportPredictor() {
    viz.showExportPredictorDialog();
}

function exportData() {
    viz.showExportDataDialog();
}

function exportResources() {
    viz.showExportResorcesDialog();
}

function exportAboutUs() {
    viz.showExportAboutUsDialog();
}

function revertAll() {
    workbook.revertAllAsync();
}