import { useAuth } from "../src/context/auth"
import { useRouter } from 'next/router';
import Home from './home';
import Login from './login';

export default function Page() {
  const { signed } = useAuth();
  const router = useRouter();

  return (signed ? <Home/> : <Login/>);
}
