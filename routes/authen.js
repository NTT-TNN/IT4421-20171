function Authorization(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="manager"){
        res.redirect('/QuanLy/ThongKe');
        // res.render('thongKe',{
        //   message1:"req.flash('loginMessage')",
        //   message2:"req.flash('signupMessage')",
        //   user:req.user[0],
        // });
      }else if(req.user[0].type=="order"){
        res.redirect('/BoiBan');
      }else if(req.user[0].type=="accountant"){
        res.redirect('/ThuNgan');
      }else{
        res.redirect('/Other');
      }
    }
    return next();
  }
  res.redirect('/');
}

function isManager(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="manager"){
        return next();
      }
    res.redirect('/users/user_info');
    }
    res.redirect('/');
  }
}

function isOrder(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="order"){
        return next();
      }
    res.redirect('/users/user_info');
    }
    res.redirect('/');
  }
}

function isAccountant(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="accountant"){
        return next();
      }
    res.redirect('/users/user_info');
    }
    res.redirect('/');
  }
}

function isOther(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    console.log(req.user);
    if(req.user!=undefined){
      if(req.user[0].type=="other"){
        return next();
      }
    res.redirect('/users/user_info');
    }
    res.redirect('/');
  }
}

function Authentication (req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    res.redirect('/users/user_info');
  }
  res.redirect('/');
}

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    // login=true;
    return next();
  }
  res.redirect('/');
}

module.exports ={
   Authorization,
   isManager,
   isOrder,
   isAccountant,
   isOther,
   Authentication,
   isLoggedIn
};
