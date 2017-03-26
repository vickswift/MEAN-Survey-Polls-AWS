//Poll controller
pollsApp.controller('pollsController', function(userFactory, pollFactory, $location, $routeParams){
    var that = this;
    this.user = userFactory.user();
    this.index = function(){
        pollFactory.index(function(data){
          debugger;
            if(data){
                that.polls = data;
            }
        })

    }
    this.index();

    this.logout = function(){
        console.log(that.user);
        $location.url('/login');
        that.user = {}
        userFactory.logout();
    }

    this.create = function(){
        var options = that.newPoll.options
        console.log("This is what we get from the form:", that.newPoll.options)
        var poll_options = []
        for(i in options){
            poll_options.push({name: options[i], votes:0})
        }
        console.log("Poll options", poll_options);
        var poll = {
            question: that.newPoll.question,
            options: poll_options,
            author: that.user._id
        }
        console.log(poll)
        pollFactory.create(poll, function(data){
            console.log(data);
            that.newPoll = {};
        })
        $location.url('/home');
    };

    this.show = function(id){
        var id = $routeParams.id;
        console.log("my id, ", id)
        pollFactory.show(id, function(data){
            that.thePoll = data;
            console.log("Got poll back! ", that.thePoll);
            $location.url('/show/'+id);
        });
    };

    this.vote = function(ind){
        that.thePoll.options[ind].votes++
        console.log("Voting!", that.thePoll.options)
        pollFactory.vote(that.thePoll, function(data){
            that.thePoll = data;
        });
    };

    this.delete = function(ind){
        console.log(that.polls[ind]);
        var id = that.polls[ind]._id;
        pollFactory.delete(id);
        that.index();
    };

});
