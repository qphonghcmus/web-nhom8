$(document).ready( function () {
    $('#main-table').DataTable(
    {
        "oLanguage": 
        {
          "sSearch": "Tìm kiếm",
          "sLengthMenu": "Hiển thị _MENU_ kết quả",
          "sZeroRecords": "Không tìm thấy kết quả nào",
          "sProcessing": "Đang tìm kiếm...",
          "sInfo": "Hiển thị từ _START_ đến _END_ của _TOTAL_ kết quả",
          "sInfoFiltered": "(Lọc từ _MAX_ bộ)",
          "oPaginate": 
          {
            "sNext": "Trang kế",
            "sPrevious": "Trang trước"
          }

        },
        "columnDefs": [ {
            "targets": 2,
            "orderable": false
            },{
                "targets": 3,
                "orderable": false
                } ]
    }
    );

   
    
    $('.dataTables_filter label input').addClass('form-control');
    $('.dataTables_filter label input').addClass('custom-form-control-search');
    

   
    $('.dataTables_length label select').addClass('form-control custom-form-control-select');

    $("#toggle-add-editor").click(function(){
      $('#add-editor-main').delay(1000).toggle();
    });

    $("#toggle-list-editor").click(function(){
      $('#list-editor-main').delay(1000).toggle();
       
   
    });

} );