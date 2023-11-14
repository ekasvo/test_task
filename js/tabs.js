const tabsData = [
    {
        "tabName": "zhk",
        "items": [
            {"label": "Академический", "value": "academ"},
            {"label": "Басманный", "value": "basman"},
            {"label": "Замоскворечье", "value": "zamoscvorech"},
            {"label": "Измайлово", "value": "izmailovo"},
            {"label": "Люблино-1", "value": "lublino_1"},
            {"label": "Измайлово-3", "value": "izmailovo_3"},
            {"label": "Академический-2", "value": "academ_2"}
        ]
    },
    {
        "tabName": "okrug",
        "items": [
            {"label": "Округ А", "value": "okrugA"},
            {"label": "Округ Б", "value": "okrugB"}
        ]
    },
    {
        "tabName": "rayon",
        "items": [
            {"label": "Район Север", "value": "rayonNorth"},
            {"label": "Район Юг", "value": "rayonSouth"}
        ]
    },
    {
        "tabName": "metro",
        "items": [
            {"label": "Метро Красная", "value": "metroRed"},
            {"label": "Метро Зеленая", "value": "metroGreen"}
        ]
    }
]

function createTabsFromJSON(tabsData) {
    tabsData.forEach(tab => {
        const tabContent = document.getElementById(tab.tabName);
        tab.items.forEach(item => {
            const tabItem = document.createElement('div');
            tabItem.classList.add('tab-item');

            const label = document.createElement('label');
            label.setAttribute('for', item.value);
            label.textContent = item.label;

            const checkbox = document.createElement('input');
            checkbox.setAttribute('id', item.value);
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', tab.tabName);
            checkbox.setAttribute('value', item.value);

            tabItem.appendChild(label);
            tabItem.appendChild(checkbox);
            tabContent.appendChild(tabItem);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    createTabsFromJSON(tabsData);

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabName) {
        tabContents.forEach(function (content) {
            content.style.display = 'none';
        });

        tabButtons.forEach(function (button) {
            button.classList.remove('active');
        });

        document.getElementById(tabName).style.display = 'flex';
        document.querySelector(`[data-tab-target="${tabName}"]`).classList.add('active');
    }

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab-target');
            openTab(tabName);
        });
    });

    openTab(tabButtons[0].getAttribute('data-tab-target'));
});
