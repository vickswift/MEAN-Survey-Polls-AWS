//User controller
pollsApp.controller('usersController', function(userFactory, $location){
    var that = this;
    this.login = function(){
        userFactory.login(that.newUser, function(data){
            that.newUser = data;
            $location.url('/home');
        });
    };

    this.logout = function(){
        console.log(that.user);
        $location.url('/login');
        that.user = {}
        usersFactory.logout()
    }

})
