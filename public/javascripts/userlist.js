/**
 * Created by mnguyen on 2/14/2015.
 */


$(document).ready(function() {
    $("button.removemodal").fancybox(
        {
            width:'400px',
            height:'auto',
            maxHeight:'130px',
            'afterClose':function () {
                window.location.reload();
            }
        }
    );
    $("button.addusermodal").fancybox(
        {
            width:'500px',
            height:'500px',
            maxHeight:'300px',
            'afterClose':function () {
                window.location.reload();
            }
        }
    )


});