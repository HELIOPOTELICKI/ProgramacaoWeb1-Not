import $ from 'axios';

function autoRefresh() {
    window.location.reload();
}

function aparece(id) {
    document.getElementById('EscondeEditor').style.cssText = 'visibility: visible;';

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let dataReturned = JSON.parse(this.responseText);
        $("#nomeEdit").val(dataReturned.data.employee_name);
        $("#salarioEdit").val(dataReturned.data.employee_salary);
        $("#idadeEdit").val(dataReturned.data.employee_age);
        $("#avatarEdit").val(dataReturned.data.profile_image);
    };
    xhttp.open("GET", "http://rest-api-employees.jmborges.site/api/v1/employee/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    $("#UpdateEmpregado").on("click",function() {  
        let url = 'http://rest-api-employees.jmborges.site/api/v1/update/' + id;
        let xhttp = new XMLHttpRequest();
        xhttp.open("PUT", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");

        let updateEmpregado = {
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
        let url = 'http://rest-api-employees.jmborges.site/api/v1/delete/' + id;
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    });

};

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
    let myData = data
    let col = [];
    for (let i = 0; i < myData.length; i++) {
        for (let key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    let table = document.createElement("table");
    let tr = table.insertRow(-1);

    let headT = ["ID", "Nome", "Salário", "Idade", "Avatar", "Ações"];
    for (let i = 0; i < headT.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = headT[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) { 
            if (j === col.length-1){
                let tabCell = tr.insertCell(-1);
                if (myData[i][col[j]] === null || myData[i][col[j]] === ""){
                    tabCell.innerHTML = '<img src="https://uploaddeimagens.com.br/images/002/704/944/full/Avatar-Default.png?1592020730" width="50" height="50">';
                }else{
                    tabCell.innerHTML = '<img src="'+myData[i][col[j]]+'" width="50" height="50">';
                }
            }else{
                if (j === col.length-3){
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = parseFloat(myData[i][col[j]]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }else{
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = myData[i][col[j]];
                }
            }
            if (j === col.length-1){
                let tabCell = tr.insertCell(-1);
                let id = String(myData[i][col[0]]);
                let aux = `<button onClick = "aparece('${id}')">Editar</button> | <button onClick = "confirmacaoExcluirAP('${id}')">Excluir</button>`;
                tabCell.innerHTML = aux;
            }
        }
    }
    let divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4){ 
        if (this.status === 200){
            let dataReturned = JSON.parse(this.responseText);
            CreateTableFromJSON(dataReturned.data);
        }
    }
};

xhttp.open("GET", "http://rest-api-employees.jmborges.site/api/v1/employees", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();

function saveInputs() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4){ 
            if (this.status === 200){
                autoRefresh();
            }
        }
    };

    xhttp.open("POST", "http://rest-api-employees.jmborges.site/api/v1/create", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    let NewEmpregado = {
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