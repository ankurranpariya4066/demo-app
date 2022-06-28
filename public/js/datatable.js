$(document).ready( function () {
    var table = $('#myTable').DataTable({
        searching: true,
        ordering: true,
    });
    
    $('#myTable tfoot th').each( function () {
        var title = $('#myTable thead th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    });

    table.columns().every( function () {
        var column = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            column.search( this.value ).draw();
        } );
    } );
});