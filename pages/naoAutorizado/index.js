const NaoAutorizado = ({admin}) => {

  return (
    <div>
      <h2>Não Autorizado</h2>
      { admin
        ?
        <p>Somente administradores autorizados</p>
        :
        <p>Faça o login</p>
      }
    </div>
  );
}

export default NaoAutorizado;
