import React from 'react';
import './App.css';
import axios from 'axios';
import Tabela from './components/Tabela'
import Form from './components/Form'

class App extends React.Component {
  state = { contents:[], editing:null}

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
      if (values.id){
        await axios.put('http://rest-api-employees.jmborges.site/api/v1/update/' + values.id, values)
        this.setState({editing:null})
      }else{
        await axios.post('http://rest-api-employees.jmborges.site/api/v1/create', values)
      }
    }catch(e){
      console.log(e)
      alert('Falha em inserir o novo empregado!')
    }
    this.getData()
  }

  handleEdit = content => {
    this.setState({
      editing:{
        id:content.id,
        name:content.employee_name,
        salary:content.employee_salary,
        age:content.employee_age,
        profile_image:content.profile_image
      }
    })
  }

  handleRemove = async (id) => {
    try{
      await axios.delete('http://rest-api-employees.jmborges.site/api/v1/delete/' + id)
    }catch(e){
      console.log(e)
      alert('Falha em excluir o empregado!')
    }
    this.getData()
  
  }

  cancelEditing = () => {
    this.setState({editing:null})
  }

  render() {
    return(
      <div className="BodyMain">
          <Tabela contents={this.state.contents} onRemove={this.handleRemove} onEdit={this.handleEdit}/>
          <div className="EditaAdiciona">
              <div id="NovoEmpregado" className="NovoEmpregado">  
              <div className="alinhaNovoEmpregado">
                <Form onSubmit={this.inserirNovoEmp} editing={this.state.editing} discardEditing={this.cancelEditing}/>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default App;