function opentab(evt, category) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(category).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function opentab_(evt, category_) {
    var j, _tabcontent, _tablinks;
    _tabcontent = document.getElementsByClassName("tabcontent_");
    for (j = 0; j < _tabcontent.length; j++) {
        _tabcontent[j].style.display = "none";
    }
    _tablinks = document.getElementsByClassName("tablinks_");
    for (j = 0; j < _tablinks.length; j++) {
        _tablinks[j].className = _tablinks[j].className.replace(" active", "");
    }
    document.getElementById(category_).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen_").click();

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};
            
function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "5px 10px";
    document.getElementById("logo").style.width = "165%";
  } else {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.width = "200%";
  }
}

$('.icon').click(
  function(){
    $('.main-caterogy').slideToggle(200);
  }
)

