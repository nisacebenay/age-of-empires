function loadData() {

    fetch("../data/age-of-empires-units.json")
        .then(response => response.json())
        .then(json => setTableData(json, null));
}

function onFilterChanged() {

    var filter = {
        AgeFilter: null,
        CostFilter: {
            Food: null,
            Wood: null,
            Gold: null
        }
    };


    var age_radios = document.getElementsByClassName("age-radio");

    for (var radio of age_radios) {
        if (radio.checked) {
            filter.AgeFilter = radio.id
            break;
        }
    }

    var woodCostContainer = document.getElementById("woodCost");
    var woodCostCheckbox = woodCostContainer.children[0];
    var woodCostSlider = woodCostContainer.children[1];

    var woodSliderValue = document.getElementById("woodSliderValue");
    woodSliderValue.innerHTML = woodCostSlider.value;

    if (woodCostCheckbox.checked) {
        console.log("AAAAAAAAAAAA");
        filter.CostFilter.Wood = woodCostSlider.value;
        woodSliderValue.style.visibility = "visible";
    }
    else {
        woodSliderValue.style.visibility = "hidden";
    }

    var foodCostContainer = document.getElementById("foodCost");
    var foodCostCheckbox = foodCostContainer.children[0];
    var foodCostSlider = foodCostContainer.children[1];

    var foodSliderValue = document.getElementById("foodSliderValue");
    foodSliderValue.innerHTML = foodCostSlider.value;

    if (foodCostCheckbox.checked) {
        filter.CostFilter.Food = foodCostSlider.value;
        foodSliderValue.style.visibility = "visible";
    }
    else {
        foodSliderValue.style.visibility = "hidden";
    }


    var goldCostContainer = document.getElementById("goldCost");
    var goldCostCheckbox = goldCostContainer.children[0];
    var goldCostSlider = goldCostContainer.children[1];

    var goldSliderValue = document.getElementById("goldSliderValue");
    goldSliderValue.innerHTML = goldCostSlider.value;

    if (goldCostCheckbox.checked) {
        filter.CostFilter.Gold = goldCostSlider.value;
        goldSliderValue.style.visibility = "visible";
    }
    else {
        goldSliderValue.style.visibility = "hidden";
    }

    fetch("../data/age-of-empires-units.json")
        .then(response => response.json())
        .then(json => setTableData(json, filter));
}


function setTableData(data, filter) {
    var unitsTable = document.getElementById("units-table");
    unitsTable.innerHTML = '<tr><th style="background-color: black; color: white;" onclick="">id</th><th style="background-color: black; color: white;">name</th> <th style="background-color: black; color: white;">age</th><th style="background-color: black; color: white;">cost</th></tr>'

    //console.log(filter);
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
    console.log(filter);
    var filteredData = units;
    if (filter != null) {
        filteredData = [];
        for (var unit of units) {
            if (filter.AgeFilter != null && filter.AgeFilter.toLowerCase() != "all") {
                if (unit.age.toLowerCase() != filter.AgeFilter.toLowerCase()) {
                    //console.log(unit.age.toLowerCase());
                    //console.log(filter.AgeFilter.toLowerCase());
                    //console.log(122);
                    continue;

                }
            }

            if (unit.cost == null) {
                continue;
            }

            if (filter.CostFilter.Food != null) {
                if (unit.cost.Food == undefined || unit.cost.Food != parseInt(filter.CostFilter.Food)) {
                    //console.log(130);
                    continue;
                }
            }

            //console.log(filter);
            //console.log(unit);
            if (filter.CostFilter.Wood != null) {
                //console.log(unit.cost);
                if (unit.cost.Wood == undefined || unit.cost.Wood != parseInt(filter.CostFilter.Wood)) {
                    //console.log(137);
                    continue;
                }
            }

            if (filter.CostFilter.Gold != null) {
                if (unit.cost.Gold == undefined || unit.cost.Gold != parseInt(filter.CostFilter.Gold)) {
                    //console.log(144);
                    continue;
                }
            }
            filteredData.push(unit);
        }
    }

    return filteredData;
}






