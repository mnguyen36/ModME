
$(document).ready(function() {
    $(document).on('keypress', function(e) {
        var tag = e.target.tagName.toLowerCase();

        console.log(String.fromCharCode(e.which));
        console.log(tag);
        if (tag != 'input') {
            $.fancybox.open({
                width: '500px',
                height: '500px',
                maxHeight: '300px',
                href: "/userlist/newuser",
                type: "iframe",
                'afterShow': function () {
                }
            });
        }

    });


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

(function(document) {
    'use strict';

    var LightTableFilter = (function(Arr) {

        var _input;

        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function(table) {
                Arr.forEach.call(table.tBodies, function(tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }

        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.className = text.indexOf(val) === -1 ? 'hideme' : 'showme';
            $('.hideme')
                .children()
                .slideUp()
            ;
            $('.showme')
                .children()
                .slideDown()
            ;


        }

        return {
            init: function() {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function(input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);

    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);