module.exports = (req, res, next) => {
    if(!req.user){
        res.redirect('/login');
    }
    else if(req.user.permission==1){
        res.redirect('/writer/update')
    }
    else if(req.user.permission==2){
        res.redirect('/editor/update')
    }
    else if(req.user.permission==3){
        res.redirect('/administrator')
    }
    else next();
  }
  