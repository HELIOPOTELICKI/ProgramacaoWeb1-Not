import React from 'react';
import './App.css';
import './components/script.js';
import * as SCPT from './components/script';

function App() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Empregados</title>
      <link rel="stylesheet" href="style.css" />
      <div className="BodyMain">
        <p id="showData" />
        <div className="EditaAdiciona">
          <div id="NovoEmpregado" className="NovoEmpregado">  
            <div className="alinhaNovoEmpregado">
              <form id="camposNovoEmpregado" className="camposNovoEmpregado">
                <p>
                </p><h3>
                  Adicionando novo Empregado
                </h3>
                <p />
                <p>
                  <label htmlFor="nome">Nome: </label>
                  <input type="text" id="nome" name="nome" placeholder="Nome Completo" className="form-control" />    
                </p>
                <p>
                  <label htmlFor="salario">Salário: </label>
                  <input type="number" id="salario" name="salario" placeholder="Salário" className="form-control" />  
                </p>
                <p>
                  <label htmlFor="idade">Idade: </label>
                  <input type="number" id="idade" name="idade" placeholder="Idade" className="form-control" />   
                </p>
                <p>
                  <label htmlFor="avatar">Avatar: </label>
                  <input type="url" id="avatar" name="avatar" placeholder="http://url.do.avatar" className="form-control" /> 
                </p>
              </form>
            </div>
            <div id="BTNNovoEmpregado" className="BTNNovoEmpregado">
              <button type="submit" value="Submit" className="FormBTNS" onClick= { SCPT.saveInputs }>Salvar</button>
              <button type="reset" value="Reset" className="FormBTNS" onClick= { SCPT.clearInputs }>Cancelar</button>
            </div>
          </div>
          <div id="EscondeEditor" className="EscondeEditor">
            <div id="NovoEmpregado" className="NovoEmpregado">  
              <div className="alinhaNovoEmpregado">
                <form id="camposEditEmpregado" className="camposEditEmpregado">
                  <p>
                  </p><h3>
                    Editor de Empregado
                  </h3>
                  <p />
                  <p>
                    <label htmlFor="nome">Nome: </label>
                    <input type="text" id="nomeEdit" name="nome" placeholder="Nome Completo" className="form-control" />    
                  </p>
                  <p>
                    <label htmlFor="salario">Salário: </label>
                    <input type="number" id="salarioEdit" name="salario" placeholder="Salário" className="form-control" />  
                  </p>
                  <p>
                    <label htmlFor="idade">Idade: </label>
                    <input type="number" id="idadeEdit" name="idade" placeholder="Idade" className="form-control" />   
                  </p>
                  <p>
                    <label htmlFor="avatar">Avatar: </label>
                    <input type="url" id="avatarEdit" name="avatar" placeholder="http://url.do.avatar" className="form-control" /> 
                  </p>
                </form>
              </div>
              <div id="BTNNovoEmpregado" className="BTNNovoEmpregado">
                <button id="UpdateEmpregado" type="submit" value="Submit" className="FormBTNS">Salvar</button>
                <button type="reset" value="Reset" className="FormBTNS" onClick= { SCPT.clearInputsEdit }>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
        <div id="AlertaExcluir" className="AlertaExcluir">
          <form className="AlertaExcluir">
            <h3>Deseja realmente excluir este empregado?</h3>
            <div id="BTNExcluir" className="BTNExcluir">
              <button id="confirmaExcluiu" type="submit" value="Submit" className="FormBTNS">Confirmar</button>
              <button type="reset" value="Reset" className="FormBTNS" onClick= { SCPT.confirmacaoExcluirDSP }>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;