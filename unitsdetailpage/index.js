function loadData() {

    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const value = parameters.get('id');

    fetch("../data/age-of-empires-units.json")
        .then(response => response.json())
        .then(json => setTableData(json, value));
}

function setTableData(data, id) {
    var selectedUnit = {};
    for (var unit of data.units) {
        if (unit.id == id) {
            selectedUnit = unit;
            break;
        }
    }

    console.log(selectedUnit);

    var table = document.getElementById("detail-table");

    var idRow = document.createElement("tr");
    var nameRow = document.createElement("tr");
    var descriptionRow = document.createElement("tr");
    var minAgeRow = document.createElement("tr");
    var wCostRow = document.createElement("tr");
    var fCostRow = document.createElement("tr");
    var gCostRow = document.createElement("tr");
    var bTimeRow = document.createElement("tr");
    var rTimeRow = document.createElement("tr");
    var hpRow = document.createElement("tr");
    var attackRow = document.createElement("tr");
    var accuracyRow = document.createElement("tr");


    var idCell = document.createElement("th");
    var nameCell = document.createElement("th");
    var descriptionCell = document.createElement("th");
    var minAgeCell = document.createElement("th");
    var wCostCell = document.createElement("th");
    var fCostCell = document.createElement("th");
    var gCostCell = document.createElement("th");
    var bTimeCell = document.createElement("th");
    var rTimeCell = document.createElement("th");
    var hpCell = document.createElement("th");
    var attackCell = document.createElement("th");
    var accuracyCell = document.createElement("th");

    idCell.textContent = "ID: " + selectedUnit.id;
    nameCell.textContent = "Name: " + selectedUnit.name;
    descriptionCell.textContent = "Description: " + selectedUnit.description;
    minAgeCell.textContent = "Min.Required Age: " + selectedUnit.age;
    bTimeCell.textContent = "Build Time: " + selectedUnit.build_time;
    rTimeCell.textContent = "Reload Time: " + selectedUnit.reload_time;
    hpCell.textContent = "Hit Points: " + selectedUnit.hit_points;
    attackCell.textContent = "Attack: " + selectedUnit.attack;
    accuracyCell.textContent = "Accuracy: " + selectedUnit.accuracy;
    

    if (selectedUnit.cost.Wood != undefined) {
        wCostCell.textContent = "Wood Cost: " + selectedUnit.cost.Wood;
    }
    else {
        wCostCell.textContent = "Wood Cost: 0";
    }

    if (selectedUnit.cost.Food != undefined) {
        fCostCell.textContent = "Food Cost: " + selectedUnit.cost.Food;
    }
    else {
        fCostCell.textContent = "Food Cost: 0";
    }

    if (selectedUnit.cost.Gold != undefined) {
        gCostCell.textContent = "Gold Cost: " + selectedUnit.cost.Gold;
    }
    else {
        gCostCell.textContent = "Gold Cost: 0";
    }

    if (selectedUnit.reload_time != undefined) {
        rTimeCell.textContent = "Reload Time: " + selectedUnit.reload_time;
    }
    else {
        rTimeCell.textContent = "Reload Time: 0";
    }

    if (selectedUnit.attack != undefined) {
        attackCell.textContent = "Attack: " + selectedUnit.attack;
    }
    else {
        attackCell.textContent = "Attack: 0";
    }

    if (selectedUnit.accuracy != undefined) {
        accuracyCell.textContent = "Accuracy: " + selectedUnit.attack;
    }
    else {
        accuracyCell.textContent = "Accuracy: 0";
    }



    idRow.appendChild(idCell);
    nameRow.appendChild(nameCell);
    descriptionRow.appendChild(descriptionCell);
    minAgeRow.appendChild(minAgeCell);
    wCostRow.appendChild(wCostCell);
    fCostRow.appendChild(fCostCell);
    gCostRow.appendChild(gCostCell);
    bTimeRow.appendChild(bTimeCell);
    rTimeRow.appendChild(rTimeCell);
    hpRow.appendChild(hpCell);
    attackRow.appendChild(attackCell);
    accuracyRow.appendChild(accuracyCell);

    table.appendChild(idRow);
    table.appendChild(nameRow);
    table.appendChild(descriptionRow);
    table.appendChild(minAgeRow);
    table.appendChild(wCostRow);
    table.appendChild(fCostRow);
    table.appendChild(gCostRow);
    table.appendChild(bTimeRow);
    table.appendChild(rTimeRow);
    table.appendChild(hpRow);
    table.appendChild(attackRow);
    table.appendChild(accuracyRow);
}

