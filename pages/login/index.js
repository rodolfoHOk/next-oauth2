import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../src/context/auth";

const Login = () => {
  const { Login } = useAuth();
  const router = useRouter();
  const [ usuario, setUsuario ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ mensagem, setMensagem ] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    Login(usuario, senha).then(response => {
      setMensagem('Logado com sucesso');
      router.push('/home');
    }).catch(error => {
      setMensagem('Nome de usuário ou senha incorreta(o)!');
    });
  }

  return(
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            <label>Nome de usuario</label><br />
            <input type="text" id="inputUsuario" placeholder="Digite o nome de usuário"
                  value={usuario} onChange={(event) => setUsuario(event.target.value)} required/>
          </div>
          <br />
          <div>
            <label>Senha</label><br />
            <input type="password" id="inputSenha" placeholder="Digite a senha"
                  value={senha} onChange={(event) => setSenha(event.target.value)} required />
          </div>
          <br />
          <div>
            <input type="submit" value="Logar" />
          </div>
          <p>{mensagem}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
