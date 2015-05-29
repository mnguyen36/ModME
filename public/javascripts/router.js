angular.module('main.router', [])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '',
                    templateUrl: '/partials/templates.html',
                    controller: 'MainCtrl'
                })
                .state('template', {
                    url:'/:templateId',
                    templateUrl:'/partials/template.html',
                    controller: 'TemplateCtrl'
                })


            ;

            $urlRouterProvider.otherwise('');
        }
    ]);
