import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../src/context/auth';
import { getTesteUsuario,
  getTesteAdministrador,
  getTesteTodosUsuarios } from '../api/apiTestesService';

const Home = () => {
  const { user, roles, signed, Logout } = useAuth();
  const router = useRouter();
  const [respostas, setRespostas] = useState({
    respostaUsuario: '',
    respostaAdmin: '',
    respostaTodos: ''
  });

  function handleLogout(){
    Logout();
    router.push('/login');
  }

  async function testeUsuario(){
    getTesteUsuario().then(response => {
      setRespostas({ respostaUsuario: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaUsuario: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaUsuario: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  async function testeAdminstrador(){
    getTesteAdministrador().then(response => {
      setRespostas({ respostaAdmin: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaAdmin: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaAdmin: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  async function testeTodosUsuarios(){
    getTesteTodosUsuarios().then(response => {
      setRespostas({ respostaTodos: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaTodos: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaTodos: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  if (!signed) {
    return (
      <div>
        <h1>Acesso negado</h1>
        <Link href="/login">
          <a>ir para a tela de login</a>
        </Link>
      </div>
    );
  }

  return(
    <div>
      <h1>Home</h1>
      <div>
        <h2>Perfil</h2>
        <p>Logado como: {user}</p>
        <p>Funções: {roles.toString()}</p>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div>
        <h2>Testes Api</h2>
        <div>
          <p>Teste como usuário</p>
          <button onClick={() => testeUsuario()}>Teste 1</button>
          <span>{respostas.respostaUsuario}</span>
        </div>
        <div>
          <p>Teste como administrador</p>
          <button onClick={() => testeAdminstrador()}>Teste 2</button>
          <span>{respostas.respostaAdmin}</span>
        </div>
        <div>
          <p>Teste com quaisquer funções</p>
          <button onClick={() => testeTodosUsuarios()}>Teste 3</button>
          <span>{respostas.respostaTodos}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
