
$(document).ready(function () {
  var lengthCategory = $('#lengthCategory').text();
  console.log(lengthCategory);
  for (var i = 0; i< lengthCategory;i++)
  {
    $('#table-'+i).DataTable(
      {
        "processing": true,
        "serverSide": true,
        "paging": true,
        "aLengthMenu": [[5, 10, 15,-1], [5, 10, 15,'All']],
        "iDisplayLength": 5,
        "ajax":
        {
          "url": '/administrator/manage-category/'+i,
          "type": "POST",

        },
        "columns": [
          {
            "data": "idBaiViet",
            "render": function (data, type, row) {
              return '<a href=\"#\">' + data + '</a>';
            }
          },
          {
            "data": "tieuDe",
            "render": function (data, type, row) {
              return '<a href=\"#\">' + data + '</a>';
            }
          },
          {
            "data": "isActive",
            "render": function (data, type, row) {
              if (data == true) {
                return "Đã được duyệt";
              }
              return "Đã bị xoá";
            }
          },
          {
            "data": "isActive",
            "render": function (data, type, row){
              if (data == true)
              {
                return "<input class=\"btn btn-danger btn-sm btnGiaHan\" type=\"button\" value=\"Xóa bài\" >";
              }
              return "<input class=\"btn btn-primary btn-sm btnGiaHan\" type=\"button\" value=\"Khôi phục\">";
            }
          },
          {
            "defaultContent": "<input class=\"btn btn-primary btn-sm btnGiaHan\" type=\"button\" value=\"Xuất bản\" >"
          }
        ],
        "oLanguage":
        {
          "sSearch": "Tìm kiếm",
          "sLengthMenu": "Hiển thị _MENU_ kết quả",
          "sZeroRecords": "Không tìm thấy kết quả nào",
          "sProcessing": "Đang tìm kiếm...",
          "sInfo": "Hiển thị từ _START_ đến _END_ của _TOTAL_ kết quả",
          "sInfoFiltered": "(Lọc từ _MAX_ bộ)",
          "sInfoEmpty": "Không tìm thấy dòng nào phù hợp",
          "oPaginate":
          {
            "sNext": "Trang kế",
            "sPrevious": "Trang trước"
          }

        },
        "columnDefs": [
          {
            "targets": 2,
            "orderable": false,
            "searchable": false
          }, 
          {
            "targets": 3,
            "orderable": false,
            "searchable": false,
          }, 
          {
            "targets": 4,
            "orderable": false,
            "searchable": false,
          }]
      },

    );
  }

  


  $('.dataTables_filter label input').addClass('form-control');
  $('.dataTables_filter label input').addClass('custom-form-control-search');



  $('.dataTables_length label select').addClass('form-control custom-form-control-select');

  $(".content-box-tool a").click(function () {
    $(this).parent().parent().next().fadeToggle();
  });


 
});

