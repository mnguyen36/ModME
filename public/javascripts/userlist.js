/**
 * Created by mnguyen on 2/14/2015.
 */


$(document).ready(function() {
    $("button.openmodal").fancybox(
        {
            width:'200px',
            height:'auto',
            maxHeight:'10%',
            'afterClose':function () {
                window.location.reload();
            }
        }
    )


});