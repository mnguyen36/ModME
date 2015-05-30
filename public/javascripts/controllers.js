angular.module('main.controllers', ['ngAnimate'])


    .directive('modal', function() {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            //replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function(scope, element, attrs) {
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            template:modalTemplateHtml
        };
    })

    .controller('MCCtrol', function($scope){

    })


    .controller('MainCtrl', function($scope, posts, $http){
        $http.get('/api/templates').success(function(data){
            $scope.templates = data;
        })

    })
    .controller('TemplateCtrl', function($scope, $http, $stateParams){

        $scope.templates =
            [ { name: 'MC', url: '/partials/modals/mctemplate.html'},
                {name:'TF', url:'/partials/modals/tftemplate.html'}
                ];

        $scope.template = $scope.templates[0];
        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.form = {};
        $scope.templateId = $stateParams.templateId;
        //$scope.newQuestion = "";

        $http.get('/api/template/'+$stateParams.templateId).success(function(data){
            $scope.questions = data;
            console.log(data);
        });

        $scope.changeForm = function(x){
            $scope.form.question.$setPristine();
            $scope.template=$scope.templates[x];
        };

        $scope.add = function(newQuestion){
            newQuestion.questionType = $scope.template.name;
            $http.post("/api/template/"+$scope.templateId+"/question/add", newQuestion)
                .success(function(data, status, headers, config){
                    //Append to questions
                    console.log(newQuestion);
                    $scope.questions.push(newQuestion);

                    //Reset form
                    $scope.form.question.$setPristine();
                    $scope.form.newQuestion  = {};

                    //Closes modal
                    $scope.modalShown = !$scope.modalShown;
                });
        }

    });

var modalTemplateHtml =
        "<div class='ng-modal' ng-show='show'>"+
        "<div class='reveal-modal' ng-show='show'>"+
        "<div ng-transclude></div>"+
        //"<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
        "</div>"+
        "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
        "</div>"
    ;
