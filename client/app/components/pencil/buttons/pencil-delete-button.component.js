(function() {
    let templateString =
        `<button class="btn btn-sm btn-danger" ng-click="deleteButton.remove()" ng-if="!deleteButton.clicked">
            <span class="glyphicon glyphicon-trash"></span> Delete
        </button>
        <button class="btn btn-sm btn-danger" ng-click="deleteButton.confirmRemove()" ng-if="deleteButton.clicked">
            <span class="glyphicon glyphicon-trash"></span> Are you Sure?
        </button>`;

    angular
        .module('pencilButtons')
        .component('pencilDeleteButton', {
            bindings: {
                allPencils: '=',
                pencil: '<'
            },
            template: templateString,
            controllerAs: 'deleteButton',
            controller: PencilDeleteButtonCtrl
        });

    function PencilDeleteButtonCtrl($timeout, PencilSvc) {
        let vm = this;

        vm.clicked = false;

        vm.remove        = remove;
        vm.confirmRemove = confirmRemove;

        function remove() {
            vm.clicked = true;
            $timeout(() => vm.clicked = false, 2000);
        }

        function confirmRemove() {
            return removePencil(vm.pencil)
                .then(updatePencilList);
        }

        function removePencil(pencil) {
            return PencilSvc.destroy(pencil.id);
        }

        function updatePencilList() {
            vm.allPencils = _.without(vm.allPencils, vm.pencil);
        }
    }
})();