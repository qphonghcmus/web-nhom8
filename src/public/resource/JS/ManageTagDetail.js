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
                }]
    }
    );

   
    
    $('.dataTables_filter label input').addClass('form-control');
    $('.dataTables_filter label input').addClass('custom-form-control-search');
    

   
    $('.dataTables_length label select').addClass('form-control custom-form-control-select');


    $(".content-box-tool a").click(function () {
      $(this).parent().parent().next().fadeToggle();
       
    });

    $('tr td form').children().next().click(function(){
        if ($(this).val() == 'Chỉnh sửa')
        {
            $(this).val('Xong');
            $(this).removeClass('btn-success');
            $(this).addClass('btn-primary');
            $(this).parent().parent().parent().children().next().children().prop('readonly', false);
            $(this).parent().parent().parent().children().next().children().prop('type', 'text');
            $(this).parent().parent().parent().children().next().children().next().css('display','none');
        }
        else
        {
            $(this).val('Chỉnh sửa');
            $(this).removeClass('btn-primary');
            $(this).addClass('btn-success');
            $(this).parent().parent().parent().children().next().children().prop('type', 'hidden');
            $(this).parent().parent().parent().children().next().children().prop('readonly', true);
            $(this).parent().parent().parent().children().next().children().next().css('display','block');
            var path = "";
            var currentRow = parseInt($(this).parent().parent().parent().children().text()) - 1;
            var idBaiViet = parseInt($('#idBaiViet').text());
            path = "/administrator/manage-tag/modify/" + idBaiViet + "&" + currentRow;
            var text = $("#idTag-"+currentRow).val();
            $(this).parent().children().val(text);
            $(this).prop('type','Submit');
            $(this).parent().attr('action', path);
           
        }
    });
  } 
  );



