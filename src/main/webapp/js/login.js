login = (function(){

    let _currentTab;

    switchFormulary = function(){
        _currentTab =  document.getElementsByClassName("tab-pane fade active")[0];
    };

    _generateLoginJson = function(){

    }

    postRegister = function(){
        if(_currentTab.id == 'login'){
            
        }else {

        }
    };

    postLogin = function(){

    }

    return {
        switchFormulary: switchFormulary,
        login: postLogin,
        register: postRegister
    };
})();