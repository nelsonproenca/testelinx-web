import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faHouse,
  faAward,
  faGlobe,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import Title from "../../../components/Title";
import TabsInfo from "../../../components/TabsInfo";
import FormDadosPessoais from "../../../components/pages/Funcionarios/FormDadosPessoais";
import FormDocumentos from "../../../components/pages/Funcionarios/FormArquivos";
import FormFormacao from "../../../components/pages/Funcionarios/FormFormacao";
import FormExperienciaProfissional from "../../../components/pages/Funcionarios/FormExperienciaProfissional";
import FormEndereco from "../../../components/pages/Funcionarios/FormEndereco";

import styles from "./styles.module.scss";
import CheckTokenUpdate from "../../../components/CheckTokenUpdate";
import useToken from "../../../hooks/useToken";

const MeusDados = () => {
  const { token } = useToken();
  const links: string[] = [
    "dados-pessoais",
    "info-residencial",
    "formacao-idioma",
    "experiencia-profissional",
    "documentos",
  ];

  const titulosTabs: string[] = [
    "Dados Pessoais",
    "Endereço/Dependentes",
    "Formação/Idioma",
    "Experiência Profissional",
    "Documentos",
  ];

  const icones: IconDefinition[] = [
    faUser,
    faHouse,
    faAward,
    faGlobe,
    faFileCirclePlus,
  ];

  const visiveis: boolean[] = [true, true, true, true, true];

  return (
    <div>
      <CheckTokenUpdate />
      <Title nomeTela="Cadastros Gerais - Meus Dados" />
      <div className={styles.addFuncionariosContainer}>
        <TabsInfo
          links={links}
          titulosTabs={titulosTabs}
          icones={icones}
          visiveis={visiveis}
        >
          <FormDadosPessoais
            edicao={false}
            codigoFuncionario={Number(token.codigoProfissional)}
          />
          <FormEndereco
            edicao={false}
            codigoFuncionario={Number(token.codigoProfissional)}
          />
          <FormFormacao
            edicao={false}
            codigoFuncionario={Number(token.codigoProfissional)}
          />
          <FormExperienciaProfissional
            edicao={false}
            codigoFuncionario={Number(token.codigoProfissional)}
          />
          <FormDocumentos />
        </TabsInfo>
      </div>
    </div>
  );
};

export default MeusDados;
