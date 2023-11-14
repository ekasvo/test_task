document.addEventListener('DOMContentLoaded', function () {
    const selections = {};

    function updateInteractiveList() {
        const selectedFiltersDiv = document.getElementById('selected-filters');
        const selectedCount = document.getElementById('selectedCount');
        selectedFiltersDiv.innerHTML = '';

        Object.keys(selections).forEach(function(category) {
            selections[category].forEach(function(value) {
                const listItem = document.createElement('div');
                listItem.classList.add('selected-filter-item');

                const label = document.querySelector(`label[for="${value}"]`);
                const labelText = label ? label.textContent : value;

                listItem.textContent = labelText;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '✖';
                deleteBtn.classList.add('delete-filter');
                deleteBtn.onclick = function (event) {
                    event.stopPropagation();
                    selections[category] = selections[category].filter(function (item) {
                        return item !== value;
                    });
                    if (selections[category].length === 0) {
                        delete selections[category];
                    }
                    updateInteractiveList();

                    const correspondingCheckbox = document.getElementById(value);
                    if (correspondingCheckbox) {
                        correspondingCheckbox.checked = false;
                    }
                };

                listItem.appendChild(deleteBtn);
                selectedFiltersDiv.appendChild(listItem);
            });
        });

        if (Object.keys(selections).length > 0) {
            selectedCount.style.display = 'inline';
            selectedCount.textContent = Object.values(selections).reduce(function (total, current) {
                return total + current.length;
            }, 0);
        } else {
            selectedCount.style.display = 'none';
        }
    }

    const checkboxes = document.querySelectorAll('.tab-content input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const category = checkbox.name;
            const checkboxId = checkbox.id;

            if (!selections[category]) {
                selections[category] = [];
            }

            if (checkbox.checked) {
                if (!selections[category].includes(checkboxId)) {
                    selections[category].push(checkboxId);
                }
            } else {
                selections[category] = selections[category].filter(function(item) {
                    return item !== checkboxId;
                });
                if (selections[category].length === 0) {
                    delete selections[category];
                }
            }

            updateInteractiveList();
        });
    });
});
