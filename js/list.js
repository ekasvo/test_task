document.addEventListener('DOMContentLoaded', function () {
    const selections = {};

    function updateInteractiveList() {
        const selectedFiltersDiv = document.getElementById('selected-filters');
        const selectedCount = document.getElementById('selectedCount');
        selectedFiltersDiv.innerHTML = '';
        let totalSelected = 0;

        Object.keys(selections).forEach(function (category) {
            selections[category].forEach(function (value) {
                const listItem = document.createElement('div');
                listItem.classList.add('selected-filter-item');

                const label = document.querySelector(`label[for="${value}"]`);
                const labelText = label ? label.textContent : value;

                listItem.textContent = labelText;

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-filter');
                const img = document.createElement('img');
                img.setAttribute('src', 'svg/close.svg');
                img.setAttribute('alt', 'Delete');
                deleteBtn.appendChild(img);

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
                totalSelected++;
            });
        });

        if (totalSelected > 0) {
            selectedFiltersDiv.classList.add('selected-filters');
        } else {
            selectedFiltersDiv.classList.remove('selected-filters');
        }

        if (Object.keys(selections).length > 0) {
            selectedCount.style.display = 'inline';
            selectedCount.textContent = Object.values(selections).reduce(function (total, current) {
                return total + current.length;
            }, 0);
        } else {
            selectedCount.style.display = 'none';
        }
    }

    document.querySelectorAll('.tab-content .tab-item').forEach(function (div) {
        div.addEventListener('click', function (event) {
            if (event.target === div || (!event.target.closest('label') && event.target.type !== 'checkbox')) {
                let checkbox = div.querySelector('input[type="checkbox"]');
                if (checkbox && !checkbox.disabled) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change', {
                        'bubbles': true,
                        'cancelable': true
                    }));
                }
            }
        });
    });

    const checkboxes = document.querySelectorAll('.tab-content input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
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
                selections[category] = selections[category].filter(function (item) {
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
