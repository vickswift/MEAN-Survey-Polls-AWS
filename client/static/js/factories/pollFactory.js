//Poll factory
pollsApp.factory('pollFactory', function($http){
    var factory = {};
    var that = this;

    function fetchJson(method, path, data) {
      return $http[method](path, data).then(function(res){return res.data});
    }

    // factory.index = function(callback){
    //     $http.get('/polls')
    //     .then(function(output){ return output.data})
    //     .then(function(output){
    //         polls = output;
    //         callback(polls);
    //     })
    // }

    //Or refactor $http and the first 'then' and use as below if you want:

    factory.index = function(callback){
        fetchJson('get', '/polls')
        .then(function(output){
            polls = output;
            callback(polls);
        })
    }

    // factory.create = function(poll, callback){
    //     $http.post('/polls/new', poll)
    //     .then(function(output){ return output.data})
    //     .then(function(output){
    //         callback(output)
    //     })
    // }

    factory.create = function(poll, callback){
        fetchJson('post', '/polls/new', poll)
        .then(function(output){
            callback(output)
        })
    }

    factory.show = function(id, callback){
        console.log(id);
        $http.get('/polls/show/' + id)
        .then(function(output){ return output.data})
        .then(function(output){
            that.poll = output;
            callback(that.poll);
        })
    }

    factory.getPoll = function(){
        console.log(that.poll);
        return that.poll;
    }

    factory.vote = function(thePoll){
        var id = thePoll._id;
        $http.post('/polls/vote/' + id, thePoll)
        .then(function(output){ return output.data})
        .then(function(output){
            console.log(output)
            that.poll = output;
        })
    }

    factory.delete = function(id){
        $http.post('/polls/delete/' + id)
        .then(function(output){ return output.data})
        .then(function(output){
            console.log(output);
        })
    }

    return factory;
})
