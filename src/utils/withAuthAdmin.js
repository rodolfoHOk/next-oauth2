import Login from "../../pages/login";
import NaoAutorizado from "../../pages/naoAutorizado";
import { useAuth } from "../context/auth"

export default function withAuthAdmin(Component) {
  const AuthAdmin = (props) => {
    const { signed, roles } = useAuth();
    const isAdmin = roles.includes('administrador');

    if (signed && isAdmin) {
      return <Component {...props} />
    } else if (signed) {
      return <NaoAutorizado/>
    } else {
      return <Login/>
    }
  };

  if (Component.getInitialProps) {
    AuthAdmin.getInitialProps = Component.getInitialProps;
  }

  return AuthAdmin;
}