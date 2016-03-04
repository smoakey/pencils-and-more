(function () {
    'use strict';
    angular
        .module('shared')
        .factory('MessageSvc', MessageSvc);

    function MessageSvc() {
        let messages = [];
        
        return {
            success: success,
            info: info,
            error: error,
            warning: warning,
            clearMessages: clearMessages
        };

        function success(message) {
            addMessage('success', message);
        }

        function info(message) {
            addMessage('info', message);
        }

        function error(message) {
            addMessage('danger', message);
        }

        function warning(message) {
            addMessage('warning', message);
        }

        function addMessage(type, message) {
            messages.push({
                type: type,
                message: message
            });
        }

        function clearMessages() {
            messages = [];
        }
    }
}());
