$(function () {

    var url1 = $('#imgPath').val();


    $('#fuMain').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload',
        uploadAsync: false,

        initialPreview: [url1],
        initialPreviewAsData: true,
        initialPreviewConfig: [
            {caption: "james.jpg" },
        ],
        deleteUrl: "/file-delete",
        overwriteInitial: false,
        initialCaption: "james.jpg"

    })
    $('#fuMain').on('fileloaded', function(event, file, previewId, index, reader) {
        $('#imgPath').val(file.name)
    });
    
})