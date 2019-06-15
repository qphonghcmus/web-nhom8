module.exports = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    }
    else if(req.user.permission==0){
        res.redirect('/')
    }
    else if(req.user.permission==2){
        res.redirect('/editor')
    }
    else if(req.user.permission==3){
        res.redirect('/administrator')
    }
    else next();
  }
  