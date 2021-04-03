import Link from 'next/link';

const LinksAdmins = () => {

  return (
    <>
      <div>
        <Link href="/usuarios/buscar">Pesquisa de usuários</Link>
      </div>
      <div>
        <Link href="/usuarios/cadastrar">Cadastrar usuário</Link>
      </div>
    </>
  );
}

export default LinksAdmins;
