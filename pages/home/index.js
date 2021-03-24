import { useRouter } from "next/router";
import { useAuth } from '../../src/context/auth';

const Home = () => {
  const { signed, Logout } = useAuth();
  const router = useRouter();

  async function handleLogout(){
    Logout();
    router.push('/login');
  }

  if (!signed) {
    return (
      <div>
        <h1>Acesso negado</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
