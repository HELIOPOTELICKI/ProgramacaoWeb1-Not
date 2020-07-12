import React from 'react';

function Tabela ({ contents, onRemove, onEdit}) {
    return (
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Salário</th>
                <th>Idade</th>
                <th>Avatar</th>
                <th>Ações</th>
            </tr>
        </thead>
      <tbody>
      {contents.map(content => {
        const defaultProfileImage = 'https://uploaddeimagens.com.br/images/002/704/944/full/Avatar-Default.png?1592020730'
              return (
                <tr key={content.id}>
                  <td>{content.id}</td>
                  <td>{content.employee_name}</td>
                  <td>{content.employee_salary ? content.employee_salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sem salário'}</td>
                  <td>{content.employee_age}</td>
                  <td><img src={content.profile_image ? content.profile_image : defaultProfileImage} alt={''} width="50" height="50" /></td>
                  <td>
                    <button onClick={() => onEdit(content) }>Editar</button>
                    <button onClick={() => {
                      // eslint-disable-next-line
                      if (confirm('Deseja realmente apagar esse otario?')){
                        onRemove(content.id)
                      }
                      } }>Excluir</button>
                  </td>
                </tr>
              )
            })}
      </tbody>
      </table>
    )
  }

export default Tabela
