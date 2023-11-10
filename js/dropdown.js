document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdownButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('is-visible');
    });

    window.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('is-visible');
        }
    });
});
