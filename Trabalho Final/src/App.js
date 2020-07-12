import React from 'react';
import './App.css';
import axios from 'axios';
import Tabela from './components/Tabela'
import Form from './components/Form'
import FormEdit from './components/FormEdit'

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
      alert('Falha na busca!')
    }
  }

  inserirNovoEmp = async (values) => {
    try{
      await axios.post('http://rest-api-employees.jmborges.site/api/v1/create', values)
    }catch(e){
      console.log(e)
      alert('Falha em inserir o novo empregado!')
    }
    this.getData()
  }

 editEmpregado = async (values) => {
    try{
      await axios.put('http://rest-api-employees.jmborges.site/api/v1/update/' + values.id)
    }catch(e){
      console.log(e)
      alert('Falha em editar o empregado!')
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
            <div id="NovoEmpregado" className="NovoEmpregado">  
              <div className="alinhaNovoEmpregado">
                <FormEdit onSubmit={this.editEmpregado} />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default App;