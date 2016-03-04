(function() {
	angular
		.module('pencilList')
		.component('pencilList', {
			controllerAs: 'list',
			templateUrl: 'components/pencil/list/pencil-list.html',
			controller: PencilListCtrl
		});

	function PencilListCtrl($scope, PencilSvc) {
		var vm = this;

		vm.pencils = [];

		init();

		function init() {
			fetchPencils()
				.catch(failedToLoadPencils)
				.then(calculatePencilVotes)
				.then(setPencilsOnController);
			
			$scope.$on('pencil.updated', updateOrAddPencilInList);
			$scope.$on('pencil.delete', deletePencilFromList);
		}

		function fetchPencils() {
			return PencilSvc.getList();
		}

		function failedToLoadPencils() {
			alert('Failed to load List of pencils. Ideally we would attempt to load list another time instead of just alerting.')
		}

		function calculatePencilVotes(pencils) {
			return _.map(pencils, function (pencil) {
				pencil.currentRating = _.get(pencil, 'votes.positive', 0) - _.get(pencil, 'votes.negative', 0);
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

		function deletePencilFromList(event, pencil) {

		}
	}
})();