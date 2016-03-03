(function () {
    'use strict';
    angular
        .module('pencilsAndMore', [
            'ui.bootstrap',
            'ui.router'
        ])
        .run(function ($rootScope, $state) {
            $rootScope.$state = $state;

            $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
                window.scrollTo(0, 0);
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeCtrl'
                });
        });
}());
