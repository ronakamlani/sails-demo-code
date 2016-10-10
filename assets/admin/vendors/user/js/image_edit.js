$(document).ready(function () {
	$('#btnValidate').click(function() {
		var ph=$('#image').val();
		var ext = ph.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                $('#uploadButton').attr('disabled', false);
                break;
            default:
                alert('This is not an allowed file type.');
                return false;
          } 
    });
});          