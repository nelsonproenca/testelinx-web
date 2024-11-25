import CheckTokenUpdate from "../../components/CheckTokenUpdate";
import Title from "../../components/Title";
import FormPerfil from "../../components/pages/Menu/FormPerfil";

const Menu = () => {
  return (
    <div>
      <CheckTokenUpdate />
      <Title nomeTela="Cadastros Gerais - Menu" />
      <FormPerfil />
    </div>
  );
};

export default Menu;
