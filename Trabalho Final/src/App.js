import React from 'react';
import './App.css';
import axios from 'axios';
import Tabela from './components/Tabela'
import Form from './components/Form'

class App extends React.Component {
  state = { contents:[] }

  componentDidMount () {
    this.getData()
  }
  
  getData = async () => {
    try {
      const resposta = await axios.get('http://rest-api-employees.jmborges.site/api/v1/employees')
      this.setState ({contents:resposta.data.data})
    } catch(e) {
      alert('Falha em buscar itens')
    }
  }

  inserirNovoEmp = async (values) => {
  try{
    await axios.post('http://rest-api-employees.jmborges.site/api/v1/create', values)
  }catch(e){
    console.log(e)
    alert('Falha em salvar o puto')
  }
  this.getData()
 }

  render() {
    return(
      <div className="BodyMain">
          <Tabela contents={this.state.contents}/>
            <div className="EditaAdiciona">
              <div id="NovoEmpregado" className="NovoEmpregado">  
               <div className="alinhaNovoEmpregado">
                 <Form onSubmit={this.inserirNovoEmp} />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default App;