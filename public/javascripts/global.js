
// DOM Ready =============================================================
$(document).ready(function() {
    //if (viewUser != null)
    //    console.log(viewUser.local.name);
    //
    var nav = $('.nav li');
    var currentIndex = 0;

    nav.each(function(index) {

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
                $('#usertable').slideDown();
                updateTable();
                break;
            case '#/':
                $('.homescreen').slideDown();
                break;
            case '#login':
                $('#login').slideDown();
                break;
            case '#tasks':
                $('#task').slideDown();
                updateTasks();
                break;
            case '#container':
                $('#container').slideDown();
                break

        }
    });

    $(document).on('keydown', function(e) {

        nav.each(function(index){
            $(nav.get(index)).removeClass('selected');
        });
        if (e.keyCode == 38 || e.keyCode ==37){
            //up
            if (currentIndex>0){
                currentIndex--;
            }

        } else if (e.keyCode == 40 || e.keyCode == 39){
            if (currentIndex<4){
                currentIndex++;
            }
            //down
        }
        $(nav.get(currentIndex)).toggleClass('selected');
        window.location.hash = $(nav.get(currentIndex)).find('a').attr('data-hash');
    });
    $("button.addtaskmodal").fancybox(
        {
            width:'500px',
            height:'500px',
            maxHeight:'300px',
            'afterClose':function () {
                updateTasks();
            }
        }
    );


});

function updateContent() {
    hideContent();
    switch(window.location.hash){
        case '#userlist':
            $('#usertable').slideDown();
            updateTable();
            break;
        case '#/':
            $('.homescreen').slideDown();
            break;
        case '#login':
            $('#login').slideDown();
            break;
        case '#tasks':
            $('#task').slideDown();
            updateTasks();
            break;
        case '#container':
            $('#container').slideDown();
            break
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
            tableContent += '<td>';
            tableContent += '</tr>';
        });
        $('#user-table tbody').html(tableContent);
    });
}

function updateTasks(){
    var tableContent = '';
    var $grid = $('#grid');
    $grid.shuffle('destroy');

    $.getJSON('/tasks', function(data){
        $.each(data, function(){
            tableContent += '<div class="task-card"  data-title='+this.title+' data-groups='+'["task"]'+'>';
            tableContent += '<div class="task-title" task-title='+this.title+'>'+this.title+'</div>';
            tableContent += '<div class="task-content">'+this.task+'</div>';
            tableContent += '</div>';
        });
        $('.task-center').html(tableContent);


    }).done(function(){

        $grid.shuffle({
            itemSelector: '.task-card'
        });
        $('.js-shuffle-search').on('keyup change', function() {
            var val = this.value.toLowerCase();

            $grid.shuffle('shuffle', function($el, shuffle) {
                var text = $.trim( $el.attr('data-title') ).toLowerCase();
                return text.indexOf(val) !== -1;
            });
        });
    });


}
