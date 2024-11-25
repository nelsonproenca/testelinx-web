import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faHouse,
  faAward,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { useCadastros } from "../../../contexts/CadastrosContextData";

import Title from "../../../components/Title";
import TabsInfo from "../../../components/TabsInfo";
import FormDadosPessoais from "../../../components/pages/Funcionarios/FormDadosPessoais";
import FormFormacao from "../../../components/pages/Funcionarios/FormFormacao";
import FormExperienciaProfissional from "../../../components/pages/Funcionarios/FormExperienciaProfissional";
import FormEndereco from "../../../components/pages/Funcionarios/FormEndereco";

import styles from "./styles.module.scss";
import CheckTokenUpdate from "../../../components/CheckTokenUpdate";

const DadosFuncionario = () => {
  const links: string[] = [
    "dados-pessoais",
    "info-residencial",
    "formacao-idioma",
    "experiencia-profissional",
  ];

  const titulosTabs: string[] = [
    "Dados Pessoais",
    "Endereço/Dependentes",
    "Formação/Idioma",
    "Experiência Profissional",
  ];

  const icones: IconDefinition[] = [faUser, faHouse, faAward, faGlobe];

  const visiveis: boolean[] = [true, true, true, true, false];

  const { funcionarioDadosItem } = useCadastros();

  const funcionarioDados = funcionarioDadosItem;

  const navigate = useNavigate();

  useEffect(() => {
    if (!funcionarioDados) {
      navigate("../lista-funcionarios");
    }
  }, []);

  return (
    <div>
      <CheckTokenUpdate />
      <Title nomeTela="Funcionários" />
      <div className={styles.addFuncionariosContainer}>
        <TabsInfo
          links={links}
          titulosTabs={titulosTabs}
          icones={icones}
          visiveis={visiveis}
        >
          <FormDadosPessoais
            codigoFuncionario={funcionarioDados?.codigo}
            edicao={true}
          />
          <FormEndereco
            codigoFuncionario={funcionarioDados?.codigo}
            edicao={true}
          />
          <FormFormacao
            codigoFuncionario={funcionarioDados?.codigo}
            edicao={true}
          />
          <FormExperienciaProfissional
            codigoFuncionario={funcionarioDados?.codigo}
            edicao={true}
          />
        </TabsInfo>
      </div>
    </div>
  );
};

export default DadosFuncionario;
