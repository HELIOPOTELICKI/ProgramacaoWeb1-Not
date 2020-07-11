import React from 'react';
import { Formik, Field } from 'formik';

function Form ({onSubmit}) {
  console.log(onSubmit)
    return(
        <Formik render={({handleSubmit, resetForm}) => {
            return (   
                <div>
                    <div id="NovoEmpregado" className="NovoEmpregado">  
                        <div className="alinhaNovoEmpregado">
                            <form onSubmit={ handleSubmit } id="camposNovoEmpregado" className="camposNovoEmpregado"> 
                                <p />
                                    <h3>
                                        Adicionando novo Empregado
                                    </h3>
                                <p />
                                    <label htmlFor="name">Nome: </label>
                                    <Field type="text" id="name" name="name" placeholder="Nome Completo" className="form-control" />
                                <p>
                                    <label htmlFor="salary">Salário: </label>
                                    <Field type="number" id="salary" name="salary" placeholder="Salário" className="form-control" />
                                </p>
                                <p>
                                    <label htmlFor="age">Idade: </label>
                                    <Field type="number" id="age" name="age" placeholder="Idade" className="form-control" />
                                </p>
                                <p>
                                    <label htmlFor="profile_image">Avatar: </label>
                                    <Field type="url" id="profile_image" name="profile_image" placeholder="http://url.do.avatar" className="form-control" />
                                </p>
                                    <div id="BTNNovoEmpregado" className="BTNNovoEmpregado">
                                        <button type="submit" value="Submit" className="FormBTNS">Salvar</button>
                                        <button type="reset" value="Reset" className="FormBTNS" onClick={resetForm}>Cancelar</button>
                                    </div>
                            </form>
                        </div>
                    </div>

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
                                    <Field type="text" id="nomeEdit" name="nome" placeholder="Nome Completo" className="form-control" />    
                                </p>
                                <p>
                                    <label htmlFor="salario">Salário: </label>
                                    <Field type="number" id="salarioEdit" name="salario" placeholder="Salário" className="form-control" />  
                                </p>
                                <p>
                                    <label htmlFor="idade">Idade: </label>
                                    <Field type="number" id="idadeEdit" name="idade" placeholder="Idade" className="form-control" />   
                                </p>
                                <p>
                                    <label htmlFor="avatar">Avatar: </label>
                                    <Field type="url" id="avatarEdit" name="avatar" placeholder="http://url.do.avatar" className="form-control" /> 
                                </p>
                            </form>
                        </div>
                        <div id="BTNNovoEmpregado" className="BTNNovoEmpregado">
                            <button type="submit" value="Submit" className="FormBTNS">Salvar</button>
                            <button type="reset" value="Reset" className="FormBTNS" onClick={resetForm}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )
        }}
        initialValues={{name:'', salary:'', age:'', profile_image:''}}
        onSubmit={(values, {resetForm}) => {
            onSubmit(values)
            resetForm()
        }} />
    )
}
export default Form