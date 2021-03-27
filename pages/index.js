import { useAuth } from "../src/context/auth"
import Home from './home';
import Login from './login';

export default function Page() {
  const { signed } = useAuth();

  return (signed ? <Home/> : <Login/>);
}
