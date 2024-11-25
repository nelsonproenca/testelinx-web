import { useEffect } from "react";
import {
  holerite,
  ouvidoria,
  processoRecrutamento,
  productCenter,
  rvcGptWeb,
} from "../../../../api.routes";

import { useCadastros } from "../../../contexts/CadastrosContextData";

import { PowerAppsType } from "../../../models/power.apps.type";

import Card from "../../Card";
import ModalPowerApps from "./Modals/ModalPowerApps";

import styles from "./styles.module.scss";

const lista: PowerAppsType[] = [
  {
    appId: "03ef345c-560d-40b4-af4c-539823993a7e",
    nome: "Hoteling",
    mensagem: "",
  },
  {
    appId: "7d8ee6f3-55ca-4d5b-ab44-7a363fe14204",
    nome: "Transferência de Funcionário",
    mensagem: "",
  },
  {
    appId: "a1b33cd6-4b93-4d10-aa1d-e2182f922a76",
    nome: "Comitê de Reuniões",
    mensagem: "",
  },
  {
    appId: "f663ccc5-c138-416f-b4d9-fdf68f168b90",
    nome: "Reuniões de Coaching",
    mensagem: "",
  },
  {
    appId: "76bcf525-e565-47eb-8403-35739d77baf6",
    nome: "WIP",
    mensagem: "",
  },
  {
    appId: "5330b037-e8c7-4c03-97eb-fd684559ea15",
    nome: "Budget & Compras",
    mensagem: "",
  },
  {
    appId: "52674bb4-227f-48cb-97dd-130bd4883268",
    nome: "Timesheet",
    mensagem: "",
  },
  {
    appId: "e5137687-d944-40d2-87c6-16aaaca4f47c",
    nome: "Solicitação de Horas Extras",
    mensagem: "",
  },
];

const Links = () => {
  const { adicionarPowerApps } = useCadastros();

  const handleModalClick = (item: PowerAppsType) => adicionarPowerApps(item);

  return (
    <>
      <div className={styles.linksContainer}>
        <a href={holerite} target="_blank">
          <Card mensagem="" nome="links" tipo="links" valor="Holerite" />
        </a>

        <a href={processoRecrutamento} target="_blank">
          <Card
            mensagem=""
            nome="links"
            tipo="links"
            valor="Processo de Recrutamento"
          />
        </a>

        <a href={ouvidoria} target="_blank">
          <Card mensagem="" nome="links" tipo="links" valor="Ouvidoria RVC" />
        </a>

        <a href={productCenter} target="_blank">
          <Card mensagem="" nome="links" tipo="links" valor="Product Center" />
        </a>

        <a href={rvcGptWeb} target="_blank">
          <Card mensagem="" nome="links" tipo="links" valor="RVC Gpt Web" />
        </a>

        {lista.map((app, index) => (
          <div key={index} className={styles.cards}>
            <a
              data-bs-toggle="modal"
              data-bs-target="#modalPowerApps"
              onClick={() => handleModalClick(app)}
            >
              <Card
                mensagem={app.mensagem}
                nome="links"
                tipo="links"
                valor={app.nome}
              />
            </a>
          </div>
        ))}
      </div>
      <ModalPowerApps />
    </>
  );
};

export default Links;
