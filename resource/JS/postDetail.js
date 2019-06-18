$(window).resize(function(){
 
    var width = $(window).width();
    if (width >= 1200)
    {
        $("#postContent").addClass('col-sm-9 col-md-6 col-lg-8 col-xl-10');
    }
    else
    {
        $("#postContent").removeClass('col-sm-9 col-md-6 col-lg-8 col-xl-10');
        $("#postContent").addClass('col-xl');
    }
});