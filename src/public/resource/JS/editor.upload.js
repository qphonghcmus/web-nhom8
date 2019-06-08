$(function () {
    $('#fuMain').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload',
        uploadAsync: false,
    })
    $('#fuMain').on('fileloaded', function(event, file, previewId, index, reader) {
        $('#imgPath').val(file.name)
    });
})