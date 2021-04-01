import { useState } from 'react';
import { postCriarUsuario } from '../../../api/services/apiUsuarioService';
import withAuthAdmin from '../../../src/utils/withAuthAdmin';

const CadastrarUsuario = () => {
  
  const [ usuario, setUsuario ] = useState({
    username: '',
    password: '',
  });
  const [ passwordRepeticao , setPasswordRepeticao ] = useState('');
  const [ mensagem, setMensagem ] = useState('');
  
  function cadastrar(event){
    event.preventDefault();
    setMensagem('');
    if(usuario.password === passwordRepeticao){
      postCriarUsuario(usuario)
        .then(response => {
          setMensagem('Usuário cadastrado com sucesso.');
        }).catch(error => {
          setMensagem('Erro ao tentar cadastrar usuário!');
        });
    } else {
      setMensagem('Campos de senha não são iguais!');
    }
  }

  return(
    <div>
      <h1>Cadastrar Usuários</h1>
      <form onSubmit={(event) => cadastrar(event)}>
        <div>
          <label>Nome de Usuário</label>
          <br />
          <input type="text" id="inputUsername" placeholder="Digite o nome de usuário"
            value={usuario.username} required
            onChange={(event) => setUsuario({username: event.target.value, password: usuario.password})} />
        </div>
        <br />
        <div>
          <label>Senha</label>
          <br />
          <input type="password" id="inputSenha" placeholder="Digite a senha"
            value={usuario.password} required
            onChange={(event) => setUsuario({username: usuario.username, password: event.target.value})} />
        </div>
        <br/>
        <div>
          <label>Repita a Senha</label>
          <br />
          <input type="password" id="inputSenha2" placeholder="Digite a senha novamente"
            value={passwordRepeticao} required
            onChange={(event) => setPasswordRepeticao(event.target.value)} />
        </div>
        <br />
        <div>
          <button type="submit">Cadastrar</button>
        </div>
        <p>{mensagem}</p>
      </form>
    </div>
  );

}

export default withAuthAdmin(CadastrarUsuario);
