loginService = (function(){

    const tabs = document.getElementsByClassName("card_tab");
    const cards = document.getElementsByClassName("card_body");
    const inputs = document.getElementsByClassName("form_input-text");

    let _form = document.getElementsByTagName("form")[0];

    let _formSchemas = {
        loginForm : ["login_username","login_password"],
        regForm : ["reg_name","reg_username","reg_mail","reg_password"]
    }

    let init = function(){
        
        document.getElementById("signin_button").addEventListener("click", () => { postRegister(); });
        document.getElementById("login_button").addEventListener("click", () => { postLogin(); });

        $("#world_svg").load('templates/public/world.html');
    
        for(let tab of tabs){
            tab.addEventListener("click", (evt) => {_clickTab(evt)}, false);
        }
    
        for(let input of inputs){
            input.addEventListener("focusin", (evt) =>{
                evt.target.parentElement.classList.add("active");
            }, false);
            input.addEventListener("focusout", (evt) =>{
                evt.target.parentElement.classList.remove("active");
            }, false);
        }
    }

    let _fixForm = function(toClear,toSend){
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
    
    let _clickTab = function(evt){
        evt.preventDefault();
        let activeTab = evt.target.classList.contains("card_tab") ? evt.target : evt.target.parentElement;
        let activeCard = document.getElementById(activeTab.href.replaceAll("tab:",""));
        for(let card of cards){
            card.classList.remove("active");
        }
        for(let tab of tabs){
            tab.classList.remove("active");
        }
        activeTab.classList.add("active");
        activeCard.classList.add("active");
        return false;
    }

    return {
        init: init,
        login: postLogin,
        register: postRegister
    };
    
})();