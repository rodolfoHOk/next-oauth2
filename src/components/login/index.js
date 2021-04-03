import { signIn } from "next-auth/client";

const Login = () => {

  function Logar(event) {
    event.preventDefault();
    signIn();
  }

  return (
    <div>
      <h1>Logue-se</h1>
      <button onClick={(event) => Logar(event)}>Logar</button>
    </div>
  );
}

export default Login;
