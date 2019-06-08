$(function () {
    $('#fuMain').fileinput({
        theme: 'fa',
        dropZoneEnabled: false,
        allowedFileExtensions: ['png', 'jpg', 'gif'],
        uploadUrl: '/upload',
        uploadAsync: false,
    })
})