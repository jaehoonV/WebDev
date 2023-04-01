const items = document.querySelectorAll('.item');
const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');

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

items.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        modalContent.appendChild(item.cloneNode(true));
    })
});

document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    }
});