submitService = (function(){

    _generateJson = function(...args){
        let json = {};
        for(let argument of args){
            let htmlElement = document.getElementById(argument);
            json[argument.replace("login_","").replace("reg_","")] = htmlElement.value;
        }
        return json;
    }

    postRegister = function(){
        let json = _generateJson("reg_name","reg_username","reg_mail","reg_password");
        $.post("");
    };

    postLogin = function(){
        let json = _generateJson("login_username","login_password");
        $.post("");
    }

    return {
        login: postLogin,
        register: postRegister
    };
})();