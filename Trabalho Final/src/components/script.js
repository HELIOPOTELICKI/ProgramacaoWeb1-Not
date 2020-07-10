import $ from 'axios';

function autoRefresh() {
    window.location.reload();
}

function aparece(id) {
    document.getElementById('EscondeEditor').style.cssText = 'visibility: visible;';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var dataReturned = JSON.parse(this.responseText);
        $("#nomeEdit").val(dataReturned.data.employee_name);
        $("#salarioEdit").val(dataReturned.data.employee_salary);
        $("#idadeEdit").val(dataReturned.data.employee_age);
        $("#avatarEdit").val(dataReturned.data.profile_image);
    };
    xhttp.open("GET", "http://rest-api-employees.jmborges.site/api/v1/employee/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    $("#UpdateEmpregado").on("click",function() {  
        var url = 'http://rest-api-employees.jmborges.site/api/v1/update/' + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");

        var updateEmpregado = {
            name: document.getElementById("nomeEdit").value,
            salary: document.getElementById("salarioEdit").value,
            age: document.getElementById("idadeEdit").value,
            profile_image: document.getElementById("avatarEdit").value
        };

        xhttp.send(JSON.stringify(updateEmpregado)); 

        autoRefresh()
    });
}

function esconde() {
    document.getElementById('EscondeEditor').style.cssText = 'visibility: hidden;';
}

function confirmacaoExcluirAP(id) {
    document.getElementById('AlertaExcluir').style.cssText = 'visibility: visible;';

    $("#confirmaExcluiu").on("click",function() {  
        var url = 'http://rest-api-employees.jmborges.site/api/v1/delete/' + id;
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    });

}

function confirmacaoExcluirDSP() {
    document.getElementById('AlertaExcluir').style.cssText = 'visibility: hidden;';
}

function clearInputs() {
    document.getElementById("camposNovoEmpregado").reset();
}

function clearInputsEdit() {
    document.getElementById("camposEditEmpregado").reset();
    esconde();
}

function CreateTableFromJSON(data) {
    var myData = data
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    var headT = ["ID", "Nome", "Salário", "Idade", "Avatar", "Ações"];
    for (var i = 0; i < headT.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = headT[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) { 
            if (j == col.length-1){
                var tabCell = tr.insertCell(-1);
                if (myData[i][col[j]] == null || myData[i][col[j]] == ""){
                    tabCell.innerHTML = '<img src="https://uploaddeimagens.com.br/images/002/704/944/full/Avatar-Default.png?1592020730" width="50" height="50">';
                }else{
                    tabCell.innerHTML = '<img src="'+myData[i][col[j]]+'" width="50" height="50">';
                }
            }else{
                if (j == col.length-3){
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = parseFloat(myData[i][col[j]]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }else{
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = myData[i][col[j]];
                }
            }
            if (j == col.length-1){
                var tabCell = tr.insertCell(-1);
                var id = String(myData[i][col[0]]);
                var aux = String('<a onClick={ aparece( id )}  >Editar</a> | <a onClick={ confirmacaoExcluirAP( id )}>Excluir</a>');
                tabCell.innerHTML = aux;
            }
        }
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4){ 
        if (this.status == 200){
            var dataReturned = JSON.parse(this.responseText);
            CreateTableFromJSON(dataReturned.data);
        }
    }
};

xhttp.open("GET", "http://rest-api-employees.jmborges.site/api/v1/employees", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();

function saveInputs() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4){ 
            if (this.status == 200){
                autoRefresh();
            }
        }
    };

    xhttp.open("POST", "http://rest-api-employees.jmborges.site/api/v1/create", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    var NewEmpregado = {
        name: document.getElementById("nome").value,
        salary: document.getElementById("salario").value,
        age: document.getElementById("idade").value,
        profile_image: document.getElementById("avatar").value
    };
    xhttp.send(JSON.stringify(NewEmpregado));   
}

export {
    clearInputs,
    saveInputs,
    aparece,
    clearInputsEdit,
    confirmacaoExcluirDSP,
    confirmacaoExcluirAP
 };