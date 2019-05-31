
document.getElementById('icon-close-tuchoi').addEventListener('click', function () {
    document.querySelector('.popup-tuchoi').style.display = 'none';
});

document.getElementById('icon-close-duyet').addEventListener('click', function () {
    document.querySelector('.popup-duyet').style.display = 'none';
});

var btns = document.querySelectorAll('.btn-duyet-click');
for (var i = 0; i < btns.length; i++){
    var btni = btns[i];
    btni.addEventListener('click', function () {
        document.querySelector('.popup-duyet').style.display = 'block';
});
}  

btns = document.querySelectorAll('.btn-tuchoi-click');
for (var i = 0; i < btns.length; i++){
    var btni = btns[i];
    btni.addEventListener('click', function () {
    document.querySelector('.popup-tuchoi').style.display = 'block';
});
}  