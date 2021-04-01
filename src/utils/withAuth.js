import Login from "../../pages/login";
import { useAuth } from "../context/auth"

export default function withAuth(Component) {
  const Auth = (props) => {
    const { signed } = useAuth();
    if (signed) {
      return <Component {...props} />
    } else {
      return <Login/>
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
