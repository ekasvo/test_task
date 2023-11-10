document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabName) {
        tabContents.forEach(function(content) {
            content.style.display = 'none';
        });

        tabButtons.forEach(function(button) {
            button.classList.remove('active');
        });

        document.getElementById(tabName).style.display = 'block';
        document.querySelector(`[data-tab-target="${tabName}"]`).classList.add('active');
    }

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab-target');
            openTab(tabName);
        });
    });

    openTab(tabButtons[0].getAttribute('data-tab-target'));
});
