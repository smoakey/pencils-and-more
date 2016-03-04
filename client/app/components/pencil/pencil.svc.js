(function () {
    'use strict';
    angular
        .module('pencil')
        .factory('PencilSvc', PencilSvc);

    function PencilSvc($http, apiUrl) {
        return {
            getList: getList,
            getOne: getOne,
            create: create,
            update: update,
            destroy: destroy,
            vote: vote
        };

        function getList() {
            return $http.get(`${apiUrl}/pencils`).then(_.property('data'));
        }

        function getOne(id) {
            return $http.get(`${apiUrl}/pencils/${id}`).then(_.property('data'));
        }

        function create(data) {
            return $http.post(`${apiUrl}/pencils`, $.param(data)).then(_.property('data'));
        }

        function update(id, data) {
            return $http.patch(`${apiUrl}/pencils/${id}`, data).then(_.property('data'));
        }
        
        function destroy(id) {
            return $http.delete(`${apiUrl}/pencils/${id}`);
        }

        function vote(id, direction) {
            return $http.post(`${apiUrl}/pencils/${id}/vote`, $.param({direction: direction})).then(_.property('data'));
        }
    }
}());
