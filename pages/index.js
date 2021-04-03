import { useSession, signIn, signOut } from 'next-auth/client';
import Loading from '../src/components/loading';

export default function Page() {
  const [ session, loading ] = useSession();
  
  function Logar(event) {
    event.preventDefault();
    signIn();
  }

  function Deslogar(event) {
    event.preventDefault();
    signOut();
  }

  return (
    loading && !session
    ?
    <Loading/>
    :
    !session
    ?
    <div>
      <h1>Bem-vindo</h1>
      <button onClick={(event) => Logar(event)}>Logar</button>
    </div>
    :
    <div>
      <h1>Olá {session.username}</h1>
      <div>
        <button onClick={(event) => Deslogar(event)}>Deslogar</button>
      </div>
      <br />
      <div>
        <iframe src="/api/sessao"/>
      </div>
    </div>
  );
}
