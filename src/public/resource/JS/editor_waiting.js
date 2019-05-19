document.getElementById('icon-close').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.card-header').style.display = 'block';
});

document.getElementById('icon-close2').addEventListener('click', function () {
    document.querySelector('.popup-duyet').style.display = 'none';
    document.querySelector('.card-header').style.display = 'block';
});

var btns = document.querySelectorAll('.btn-duyet-click');
for (var i = 0; i < btns.length; i++){
    var btni = btns[i];
    btni.addEventListener('click', function () {
        document.querySelector('.popup-duyet').style.display = 'flex';
    document.querySelector('.card-header').style.display = 'none';
});
}  

btns = document.querySelectorAll('.btn-tuchoi-click');
for (var i = 0; i < btns.length; i++){
    var btni = btns[i];
    btni.addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('.card-header').style.display = 'none';
});
}  