// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    var nav = $('.nav li');
    var currentIndex = 0;

    nav.each(function(index) {
        console.log(window.location.hash);

        var currentTab = $(this).find('a');
        if (currentTab.attr('data-hash')==window.location.hash.replace('#', '')){
            $(this).toggleClass('selected');
            updateContent();
            currentIndex = index;
        }
        if (window.location.hash == ''){
            window.location.hash= '/';
            $(nav.get(0)).toggleClass('selected');
            currentIndex=0;
        }
        //$(this.lastChild.children).attr('data-hash')
        $(this).on("click", function (e) {
            window.location.hash=$(e.target).attr('data-hash');
            nav.each(function(index){
                $(nav.get(index)).removeClass('selected');
            });
            $(nav.get(index)).toggleClass('selected');
            currentIndex = index;
        });

    });

    $(window).on('hashchange', function() {
        hideContent();
        switch(window.location.hash){
            case '#userlist':
                $('.center-column').slideDown();
                updateTable();
                break;
            case '#/':
                $('.homescreen').slideDown();
                break;
        }
    });

    $(document).on('keydown', function(e) {
        console.log(e.keyCode);
        console.log(currentIndex);
        nav.each(function(index){
            $(nav.get(index)).removeClass('selected');
        });
        $(nav.get(currentIndex-1)).toggleClass('selected');
        console.log($(nav.get(currentIndex-1)).find('a'));
        updateContent();
    });
});

function updateContent() {
    hideContent();
    switch(window.location.hash){
        case '#userlist':
            $('.center-column').slideDown();
            updateTable();
            break;
        case '#/':
            $('.homescreen').slideDown();
            break;
    }
}

function hideContent(){
    $.each($('.page-container').children(), function(){
        $(this).slideUp();
    })
}

function updateTable(){
    var tableContent = '';
    $.getJSON('/userlist', function(data){
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>'+this.local.name+'</td>';
            tableContent += '<td>' + this.local.email + '</td>';
            tableContent += '<td>'+this._id+'</td>';
            tableContent += '<td>'
            tableContent += '</tr>';
        });
        $('#user-table tbody').html(tableContent);
    });
}
