import { useSession, signOut } from 'next-auth/client';
import { useEffect, useState } from 'react';
import Loading from '../src/components/loading';
import Login from '../src/components/login';
import LinksLogados from '../src/components/links/logados';
import LinksAdmins from '../src/components/links/admins';
import httpApiClient from '../src/services/httpApiClient';
import { getTesteUsuario,
  getTesteAdministrador,
  getTesteTodosUsuarios } from '../src/services/apiTestesService';

export default function Page() {

  const [ session, loading ] = useSession();

  useEffect(() => {
    if (session) {
      httpApiClient.defaults.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  },[session])

  const [respostas, setRespostas] = useState({
    respostaUsuario: '',
    respostaAdmin: '',
    respostaTodos: ''
  });
  
  function Deslogar(event) {
    event.preventDefault();
    signOut();
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

  return (
    loading && !session
    ?
    <Loading/>
    :
    !session
    ?
    <Login/>
    :
    <div>
      <h1>Home</h1>
      <div>
        <h2>Perfil</h2>
        <p>Logado como: {session.user.username}</p>
        <p>Funções: {session.user.roles.toString()}</p>
        <button onClick={(event) => Deslogar(event)}>Deslogar</button>
      </div>
      <br />
      <div>
        <h2>Dados da sessão</h2>
        <iframe src="/api/sessao"/>
      </div>
      <div>
        <h2>Api Testes</h2>
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
      <div>
        <h2>Links Menu</h2>
        <LinksLogados/>
        { session.user.isAdmin &&
          <LinksAdmins/>
        }
      </div>
    </div>
  );
}
