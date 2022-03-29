function loadData() {
    console.log("Loading data...")

    // data/age-of-empires-units.json dosyasını oku.
    fetch("../data/age-of-empires-units.json")
        .then(response => response.json())
        .then(json => setTableData(json, null));
}

function onFilterChanged() {
    console.log("Loading data...")
    // filter template:
    // var filter = {
    //     AgeFilter: "Feudal",
    //     CostFilter: {
    //         Food: 25,
    //         Wood: null,
    //         Gold: 0
    //     }
    // }
    var filter = {
        AgeFilter: null,
        CostFilter: {
            Food: null,
            Wood: null,
            Gold: null
        }
    };
    // if (radiobutton.checked) {
    //     filter.AgeFilter = radiobutton.id
    // }
    // data/age-of-empires-units.json dosyasını oku.
    fetch("../data/age-of-empires-units.json")
        .then(response => response.json())
        .then(json => setTableData(json, null));
}

function setTableData(data, filter) {
    var unitsTable = document.getElementById("units-table");


    var filteredData = applyFilter(data.units, filter);

    for (var i = 0; i < filteredData.length; i++) {
        var row = document.createElement('tr');

        var idCell = document.createElement('th');
        var nameCell = document.createElement('th');
        var ageCell = document.createElement('th');
        var costCell = document.createElement('th');

        idCell.innerHTML = "<a/ href='../unitsdetailpage/index.html?id=" + filteredData[i].id + "'>" + filteredData[i].id + "</a>";
        nameCell.textContent = filteredData[i].name;
        ageCell.textContent = filteredData[i].age;
        //costCell
        if (filteredData[i].cost != null) {
            if (filteredData[i].cost.Food != undefined) {
                costCell.textContent += "Food: " + filteredData[i].cost.Food;
            }

            if (filteredData[i].cost.Wood != undefined) {
                if (costCell.textContent != "") costCell.textContent += ", ";
                costCell.textContent += "Wood: " + filteredData[i].cost.Wood;
            }

            if (filteredData[i].cost.Gold != undefined) {
                if (costCell.textContent != "") costCell.textContent += ", ";
                costCell.textContent += "Gold: " + filteredData[i].cost.Gold;
            }
        }
        // We have to check which types of costs a unit have.
        //

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(costCell);


        unitsTable.appendChild(row);

        //     <tr>
        //     <th>1</th>
        //     <th>Archer</th>
        //     <th>Feudal</th>
        //     <th>Food:25, Gold:45</th>
        //     </tr>


    }
}

function applyFilter(units, filter) {
    var filteredData = units;
    if (filter != null) {
        filteredData = [];
        for (var unit of units) {
            if (filter.AgeFilter != null) {
                if (unit.age != filter.AgeFilter) {
                    continue;
                }
            }

            if (filter.CostFilter.Food != null) {
                if (unit.cost.Food == undefined || unit.cost.Food != filter.CostFilter.Food) {
                    continue;
                }
            }

            if (filter.CostFilter.Wood != null) {
                if (unit.cost.Wood == undefined || unit.cost.Wood != filter.CostFilter.Wood) {
                    continue;
                }
            }

            if (filter.CostFilter.Gold != null) {
                if (unit.cost.Gold == undefined || unit.cost.Gold != filter.CostFilter.Gold) {
                    continue;
                }
            }
            filteredData.push(unit);
        }
    }

    return filteredData;
}

 