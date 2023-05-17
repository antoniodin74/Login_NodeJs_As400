/*
Template Name: Minible - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {
    $('#datatable').DataTable();

    //Buttons examples
    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis', 'print', 'csv']
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
        
        $(".dataTables_length select").addClass('form-select form-select-sm');

    $('#datatable1').DataTable();
    
     //Buttons examples
     var table = $('#datatable1-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis', 'print', 'csv']
    });
    
    table.buttons().container()
        .appendTo('#datatable1-buttons_wrapper .col-md-6:eq(0)');
        
    $(".dataTables_length select").addClass('form-select form-select-sm');

    
    document.getElementById("row-scompare").style.display = "none";
    $("#btReset").click(function() {
    $("#frmSelezioni")[0].reset();
    });
} );