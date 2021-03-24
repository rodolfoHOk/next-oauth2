import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../src/context/auth";

const Login = () => {
  const { signed, Login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(signed){
      router.push('/home');
    }
  });

  function handleLogin(){
    Login('fulano','1234');
  }

  return(
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
