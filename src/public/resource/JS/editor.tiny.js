$(function () {
    tinymce.init({
        selector: '#wysiwyg',
        height: 600,
        menubar: false,
        plugins: 'paste image link autolink lists table media',
        toolbar: [
            'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright',
            'forecolor backcolor',
            'table link image media',
        ],
    });
})