document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');
    const shadowElement = document.getElementById('dropdownShadow');

    dropdownButton.addEventListener('click', function () {
        dropdownContent.classList.toggle('is-visible');
        dropdownButton.classList.toggle('active');
    });

    window.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('is-visible');
        }
    });

    function updateShadowPosition() {
        const totalHeight = dropdownContent.scrollHeight;
        const atBottom = totalHeight - dropdownContent.scrollTop === dropdownContent.clientHeight;
        let shadowTop = '220px';

        if (!atBottom) {
            shadowTop = (dropdownContent.scrollTop + dropdownContent.clientHeight - shadowElement.clientHeight) + 'px';
        }

        shadowElement.style.top = shadowTop;

        if (atBottom) {
            shadowElement.style.display = 'none';
        } else {
            shadowElement.style.display = 'block';
        }
    }

    updateShadowPosition();

    dropdownContent.addEventListener('scroll', updateShadowPosition);
    dropdownButton.addEventListener('click', function () {
        shadowElement.style.display = 'block';
    });

    let scrollTimeout;
    dropdownContent.addEventListener('scroll', function () {
        this.classList.add('scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            this.classList.remove('scrolling');
        }, 1000);
    });
});
