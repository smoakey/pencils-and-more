(function() {
    angular
        .module('pencilList')
        .component('pencilList', {
            controllerAs: 'list',
            templateUrl: 'components/pencil/list/pencil-list.html',
            controller: PencilListCtrl
        });

    function PencilListCtrl($scope, PencilSvc) {
        let vm = this;

        // vars
        vm.pencils = [];

        // methods
        vm.handlePencilVote = handlePencilVote;

        init();

        function init() {
            fetchPencils()
                .catch(failedToLoadPencils)
                .then(calculatePencilVotes)
                .then(setPencilsOnController);
            
            // since the edit/create modal is a separate state we have no way to update the list
            // inside the modal
            $scope.$on('pencil.updated', updateOrAddPencilInList);
        }

        function fetchPencils() {
            return PencilSvc.getList();
        }

        function failedToLoadPencils() {
            alert('Failed to load List of pencils. Ideally we would attempt to load list another time instead of just alerting.')
        }

        function calculatePencilVotes(pencils) {
            // this allows sort by current vote standings -> total up minus total down
            return _.map(pencils, function (pencil) {
                pencil.currentVote = pencil.votes.up - pencil.votes.down;
                return pencil;
            });
        }

        function setPencilsOnController(pencils) {
            vm.pencils = pencils;
        }

        function updateOrAddPencilInList(event, pencil) {
            var index = _.findIndex(vm.pencils, _.pick(pencil, 'id'));
            if (index !== -1) {
                vm.pencils.splice(index, 1, pencil);
            } else {
                vm.pencils.push(pencil);
            }
            
            vm.pencils = calculatePencilVotes(vm.pencils);
        }

        // Logic that handles updating the vote. that way were just passing a callback to the 
        // vote button directive and not tightly couple that directive to this one.
        function handlePencilVote(pencil) {
            updateOrAddPencilInList(null, pencil);
        }
    }
})();