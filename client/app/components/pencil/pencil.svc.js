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
            update: update
        };

        function getList() {
            return $http.get(`${apiUrl}/pencils`).then(_.property('data'));
        }

        function getOne(id) {
            return $http.get(`${apiUrl}/pencils/${id}`).then(_.property('data'));
        }

        function create(data) {
            return $http.post(`${apiUrl}/pencils`, $.param(data), {
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
            });
        }

        function update(id, data) {
            return $http.patch(`${apiUrl}/pencils/${id}`, data);
        }
        
    }
}());
