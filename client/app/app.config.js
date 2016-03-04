(function () {
    'use strict';
    angular
        .module('pencilsAndMore')
        .constant('apiUrl', 'http://localhost:1234')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/pencils');

            $stateProvider
                .state('pencil', {
                    url: '/pencils',
                    template: '<pencil-list></pencil-list>',
                })
                .state('pencil.new', {
                    url: '/new',
                    onEnter: function($state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'components/pencil/edit/pencil-edit.html',
                            controller: 'PencilEditCtrl',
                            controllerAs: 'pencilEdit'
                        }).result.catch(function() {
                            return $state.go('^');
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
                            return $state.go('^');
                        });
                    }
                });
        });
}());
