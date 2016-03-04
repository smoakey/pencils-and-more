(function () {
    'use strict';
    angular
        .module('pencilsAndMore', [
            'ui.bootstrap',
            'ui.router',
            'shared',
            'layout',
            'components'
        ])
        .run(function ($rootScope, $state) {
            $rootScope.$state = $state;

            $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
                window.scrollTo(0, 0);


            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/pencils');

            $stateProvider
                .state('pencil', {
                    url: '/pencils',
                    templateUrl: 'components/pencil/pencil.html',
                })
                .state('pencil.new', {
                    url: '/new',
                    onEnter: function($state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'components/pencil/edit/pencil-edit.html',
                            controller: 'PencilEditCtrl',
                            controllerAs: 'pencilEdit'
                        }).result.catch(function() {
                            return $state.go('pencil');
                        });
                    }
                })
                .state('pencil.edit', {
                    url: '/{id}/edit',
                    onEnter: function($state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'components/pencil/edit/pencil-edit.html',
                            controller: 'PencilEditCtrl',
                            controllerAs: 'pencilEdit'
                        }).result.catch(function() {
                            return $state.go('pencil');
                        });
                    }
                });
        });
}());
