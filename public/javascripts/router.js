angular.module('main.router', [])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/partials/home.html',
                    controller: 'MainCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }
    ]);
