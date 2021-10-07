submitService = (function(){

    let _form = document.getElementsByTagName("form")[0];
    let _formSchemas = {
        loginForm : ["login_username","login_password"],
        regForm : ["reg_name","reg_username","reg_mail","reg_password"]
    }

    let init = function(){
        document.getElementById("signin_button").addEventListener("click", () => { submitService.register(); });
        document.getElementById("login_button").addEventListener("click", () => { submitService.login(); });
    }

    let _fixForm = function(toClear,toSend){
        let json = {};
        for(let argument of _formSchemas[toClear]){
            let htmlElement = document.getElementById(argument);
            htmlElement.name = "";
        }
        for(let argument of _formSchemas[toSend]){
            let htmlElement = document.getElementById(argument);
            htmlElement.name = argument.replace("login_","").replace("reg_","");
        }
    }

    let postRegister = function(){
        _fixForm("loginForm","regForm");
        _form.action = "/welcome/newuser";
        _form.submit();
    };

    let postLogin = function(){
        _fixForm("regForm","loginForm");
        _form.action = "/welcome";
        _form.submit();
    }

    return {
        init: init,
        login: postLogin,
        register: postRegister
    };
    
})();