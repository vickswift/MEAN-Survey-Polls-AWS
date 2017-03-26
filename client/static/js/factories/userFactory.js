//User factory
pollsApp.factory('userFactory', function($http, $sessionStorage){
    var factory = {};
    //initialize session storing user
    $sessionStorage.currUser;

    function fetchJson(method, path, data) {
      return $http[method](path, data).then(function(res){return res.data});
    }

    //get user name from db (or create new in db) and store in session
    // factory.login = function(newUser, callback){
    //     console.log("Factory sending off ", newUser)
    //     $http.post('/login', newUser)
    //     .then(function(output){ return output.data})
    //     .then(function(output){
    //         $sessionStorage.currUser = output;
    //         console.log('after login', $sessionStorage.currUser);
    //         callback(output);
    //     });
    // };

    //get user name from db (or create new in db) and store in session
    factory.login = function(newUser, callback){
        fetchJson('post', '/login', newUser)
        .then(function(output){
            $sessionStorage.currUser = output;
            callback(output);
        });
    };

    factory.logout = function(){
        console.log("logged out!");
        $sessionStorage.$reset();
    };

    factory.user = function(){
        return $sessionStorage.currUser;
    };

    return factory;
})
