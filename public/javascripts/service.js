angular.module('main.service', [])
    .factory('posts', [function(){
        var o = {
            posts: []
        };
        return o;
}]);
