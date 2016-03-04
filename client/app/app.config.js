(function () {
    'use strict';
    angular
        .module('pencilsAndMore')
        
        .constant('apiUrl', 'http://localhost:1234')

        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/pencils');

            $stateProvider
                .state('pencil', {
                    url: '/pencils',
                    template:
                        `<div class="new-pencil text-right">
                            <pencil-add-button></pencil-add-button>
                        </div>
                        <pencil-list></pencil-list>`,
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
