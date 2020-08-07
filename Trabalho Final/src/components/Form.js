import React from 'react';
import { Formik, Field } from 'formik';

const valoresIniciais = {name:'', salary:'', age:'', profile_image:''}

function Form ({onSubmit, editing, discardEditing}) {
    return(
        <Formik render={({handleSubmit, resetForm, values}) => {
            return (   
                <div>
                    <form onSubmit={ handleSubmit } id="camposNovoEmpregado" className="camposNovoEmpregado"> 
                        <p></p>
                            <h3>
                                {values.id ? 'Editando' : 'Adicionando novo'} Empregado
                            </h3>
                        <p></p>
                        <p>
                            <label htmlFor="name">Nome: </label>
                            <Field type="text" id="name" name="name" placeholder="Nome Completo" className="form-control" />
                        </p>
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
                            <button type="reset" value="Reset" className="FormBTNS" onClick={() => {
                                if (values.id){
                                    discardEditing()
                                }else{
                                    resetForm()
                                } 
                            } }>Cancelar</button>
                        </div>
                    </form>
                </div>
            )
        }}
        enableReinitialize
        initialValues={editing || valoresIniciais}
        onSubmit={(values, {resetForm}) => {
            onSubmit(values)
            resetForm()
        }} />
    )
}
export default Form