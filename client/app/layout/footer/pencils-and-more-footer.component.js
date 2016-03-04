(function() {
    let templateString =
        `<footer class="container">
            <p>&copy; Copyright 2016, Built by {{ footer.name }}</p>
        </footer>`;

    angular
        .module('footer')
        .component('pencilsAndMoreFooter', {
            bindings: {
                name: '@'
            },
            template: templateString,
            controllerAs: 'footer'
        });
})();