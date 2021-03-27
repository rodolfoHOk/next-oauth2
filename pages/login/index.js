import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/context/auth";

const Login = () => {
  const { signed, Login } = useAuth();
  const router = useRouter();
  const [ usuario, setUsuario ] = useState('');
  const [ senha, setSenha ] = useState('');

  useEffect(() => {
    if(signed){
      router.push('/home');
    }
  });

  async function handleLogin(event) {
    event.preventDefault();
    Login(usuario, senha);
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
        </form>
      </div>
    </div>
  );
}

export default Login;
