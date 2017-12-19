$(document).ready(function () {
    
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $("#login_button").click(function() {
        if($("#signin-password").val() == "" || $("#signin-email").val() == "" ){
            toastr.error('Điền đầy đủ các trường như email,password','Error!',{timeOut: 2000});
        }else{
          $("#login").click();
        }
      });

    var menu = $('.navbar');
    $(window).bind('scroll', function (e) {
        if ($(window).scrollTop() > 140) {
            if (!menu.hasClass('open')) {
                menu.addClass('open');
            }
        } else {
            if (menu.hasClass('open')) {
                menu.removeClass('open');
            }
        }
    });


    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 800);

    });


    wow = new WOW(
        {
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: false        // trigger animations on mobile devices (true is default)
        }
    );
    wow.init();


    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formForgotPassword = formModal.find('#cd-reset-password'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
        mainNav = $('.main-nav');

    //open modal
    mainNav.on('click', function(event){
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    //open sign-up form
    $('body').on('click', '.btn-signup', signup_selected);
    //open login-form form
    $('body').on('click', '.btn-signin', login_selected);

    //close modal
    formModal.on('click', function(event){
        if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function(){
        var togglePass= $(this),
            passwordField = togglePass.prev('input');

        ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');

    });

    //show forgot-password form
    forgotPasswordLink.on('click', function(event){
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function(event){
        event.preventDefault();
        login_selected();
    });

    function login_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected(){
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected(){
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages
    formLogin.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
});


