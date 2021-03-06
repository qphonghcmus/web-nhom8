$(document).ready( function () 
{
    $('#main-table').DataTable(
    {
      "paging": true,
          "aLengthMenu": [[5, 10, 15], [5, 10, 15]],
          "iDisplayLength": 5,
        "oLanguage": 
        {
          "sSearch": "Tìm kiếm",
          "sLengthMenu": "Hiển thị _MENU_ kết quả",
          "sZeroRecords": "Không tìm thấy kết quả nào",
          "sProcessing": "Đang tìm kiếm...",
          "sInfo": "Hiển thị từ _START_ đến _END_ của _TOTAL_ kết quả",
          "sInfoFiltered": "",
          "sInfoEmpty":      "Không tìm thấy dòng nào phù hợp",
          "oPaginate": 
          {
            "sNext": "Trang kế",
            "sPrevious": "Trang trước"
          }

        },
        "columnDefs": [ {
            "targets": 0,
            "orderable": true
            },{
                "targets": 1,
                "orderable": true
                },
                {
                  "targets": 2,
                  "orderable": false
                  },]
    }
    );

   
    
    $('.dataTables_filter label input').addClass('form-control');
    $('.dataTables_filter label input').addClass('custom-form-control-search');
    

   
    $('.dataTables_length label select').addClass('form-control custom-form-control-select');


    $(".content-box-tool a").click(function () {
      $(this).parent().parent().next().fadeToggle();
       
    });
  } 
  );



