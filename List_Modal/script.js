const zooms = document.querySelectorAll('.zoom');
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');
let select_page = '';

window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

function zoom(data){
    $('#myModal').css('display','block');
    $(data).closest('.item').find('img').clone().addClass('zoom_img').appendTo('.modal-content');
    let e = window.event;
    e.stopPropagation();
}

$('.close').on('click', () => {
    $('#myModal').css('display','none');
    $('.modal-content').html('');
});

$(window).on('click', (e) => {
    if(e.target.id === 'myModal'){
        $('#myModal').css('display','none');
        $('.modal-content').html('');
    }
});

function movePage_confirmed(url){
    let label = url.substring(2, url.length - 1).replaceAll('_', ' ');
    $('#confirmed_label').text(label);
    select_page = url;
    $('#movePage_confirmed').css('display','block');
    $('#movePage_confirmed').css({opacity:0}).animate({opacity:1},500);
}

function movePage(url){
    let index = url + 'index.html';
    $(location).attr("href", index);
    let e = window.event;
    e.stopPropagation();
}

$('#cancel').on('click', () => {
    $('#movePage_confirmed').css({opacity:1}).animate({opacity:0},500);
    setTimeout(() => {
        $('#movePage_confirmed').css('display','none');
    }, '500')
});

$('#confirm').on('click', () => {
    movePage(select_page);
});
