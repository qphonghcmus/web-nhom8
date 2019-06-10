$(function () {

    var url1 = $('#imgPath').val();


    $('#fuMain').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload',
        uploadAsync: false,

        initialPreview: ["/public/resource/img/post/" + url1],
        initialPreviewAsData: true,
        initialPreviewConfig: [
            {caption: url1 },
        ],
        deleteUrl: "/file-delete",
        overwriteInitial: false,
        initialCaption: url1

    })
    $('#fuMain').on('fileloaded', function(event, file, previewId, index, reader) {
        $('#imgPath').val(file.name)
    });
    
})