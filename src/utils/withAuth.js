import Login from "../../pages/login";
import { useAuth } from "../context/auth"

export default function withAuth(Component) {
  const Auth = (props) => {
    const { signed, roles } = useAuth();
    const isAdmin = roles.includes('administrador');

    if (signed) {
      return <Component isAdmin={isAdmin} {...props} />
    } else {
      return <Login/>
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
