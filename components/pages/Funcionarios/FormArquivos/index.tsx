import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import useToken from "../../../../hooks/useToken";

import { FuncionarioArquivoModel } from "../../../../models/funcionario.arquivo.model";

import {
  Documentos,
  TipoDocumentoUpload,
  ToastMessageAlert,
} from "../../../../seeds/tipo.seed";

import FuncionarioArquivoService from "../../../../services/funcionario.arquivo.service";

import UploadFiles from "../../../UploadFiles";

import styles from "./styles.module.scss";

const FormArquivos = () => {
  const [arquivo, setArquivo] = useState();
  const [nomeArquivo, setNomeArquivo] = useState();
  const [listaArquivos, setListaArquivos] =
    useState<FuncionarioArquivoModel[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useToken();

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    if (!isLoading) {
      return;
    }

    try {
      const respArquivo = await FuncionarioArquivoService.getAll(
        token.codigoProfissional
      );

      setListaArquivos(respArquivo.data);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    setIsLoading(false);
  };

  const handleUploadNovoClick = async (formData: FormData) => {
    try {
      const respUpload = await FuncionarioArquivoService.upload(formData);

      if (respUpload) {
        const arquivoUploaded: FuncionarioArquivoModel = respUpload.data;

        if (arquivoUploaded) {
          Swal.fire(
            "Upload arquivos",
            `Arquivo gravado com sucesso.`,
            "success"
          );
        }
      }
    } catch (error) {
      let mensagem: string = `${error}`;

      if (mensagem.indexOf("Network Error") > 0) {
        mensagem = "Verifique o tamanho do arquivo.";
      } else {
        mensagem = `${error}`;
      }
      Swal.fire("", `${mensagem}`, "error");
    }

    setIsLoading(true);
    setNomeArquivo(undefined);
    setArquivo(undefined);
  };

  const handleDeleteClick = async (codigo: number) => {
    try {
      const respArquivo = await FuncionarioArquivoService.remove(codigo);

      if (respArquivo) {
        const excluido: boolean = respArquivo.data;

        if (excluido) {
          ToastMessageAlert.fire(
            "",
            `Arquivo removido com sucesso.`,
            "success"
          );
        }
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
    setIsLoading(true);
  };

  return (
    <div className={styles.formArquivosContainer}>
      <form encType="multipart/form-data">
        <div className="row" style={{ background: "#F2F2F2" }}>
          <div id="accordion">
            <div
              className="card-header"
              style={{
                backgroundColor: "#22304e",
                height: "3.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <a
                className="text-white"
                data-bs-toggle="collapse"
                href="#collapseOne"
              >
                Documentos Pessoais
              </a>
            </div>
            <div
              id="collapseOne"
              className="collapse show bg-white"
              data-bs-parent="#accordion"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.Foto_3x4.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Foto3X4"
                        titulo="Foto 3x4 (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.ComprovanteResidencia.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Comprovante-Residencial"
                        titulo="Comprovante de Residência (*)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.DadosBancarios.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Dados-bancarios"
                        titulo="Dados Bancários (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.ExameAdmissional.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Exame-admissional"
                        titulo="Exame Admissional (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CertidaoNascimento.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Certidao-nascimento"
                        titulo="Certidão de Nascimento (*)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4" style={{ background: "#F2F2F2" }}>
          <div id="accordion">
            <div
              className="card-header"
              style={{
                backgroundColor: "#22304e",
                height: "3.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <a
                className="text-white"
                data-bs-toggle="collapse"
                href="#collapseTwo"
              >
                Documentos
              </a>
            </div>
            <div
              id="collapseTwo"
              className="collapse show bg-white"
              data-bs-parent="#accordion"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CarteiraTrabalho.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Carteira-trabalho"
                        titulo="Carteira de Trabalho (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.RG.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Rg"
                        titulo="RG (*)"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CPF.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="CPF"
                        titulo="CPF (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.PIS.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="PIS"
                        titulo="Cartão do PIS/Número do PIS (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.TituloEleitor.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Título-eleitor"
                        titulo="Título de Eleitor (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CarteiraHabilitacao.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Carteira-habilitacao"
                        titulo="Carteira de Habililitação"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CarteiraTrabalho.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Carteira-trabalho"
                        titulo="Carteira de Trabalho"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.Cin.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Cin"
                        titulo="CIN"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4" style={{ background: "#F2F2F2" }}>
          <div id="accordion">
            <div
              className="card-header"
              style={{
                backgroundColor: "#22304e",
                height: "3.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <a
                className="text-white"
                data-bs-toggle="collapse"
                href="#collapseThree"
              >
                Documentos Familiares
              </a>
            </div>
            <div
              id="collapseThree"
              className="collapse show bg-white"
              data-bs-parent="#accordion"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CertidaoCasamento.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Certidão-casamento"
                        titulo="Certidao de Casamento"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.DocConjuge.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="RGOuCPFCônjugue"
                        titulo="RG e CPF do Cônjugue"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.ComprovanteFilhos.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Comprovante-filhos"
                        titulo="Registro dos filhos menores de 14 anos"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.CarteiraVacina.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Carteira-vacina-filhos"
                        titulo="Carteira de Vacinação - Filhos menor de 14 anos"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4" style={{ background: "#F2F2F2" }}>
          <div id="accordion">
            <div
              className="card-header"
              style={{
                backgroundColor: "#22304e",
                height: "3.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <a
                className="text-white"
                data-bs-toggle="collapse"
                href="#collapseFour"
              >
                Formulários
              </a>
            </div>
            <div
              id="collapseFour"
              className="collapse show bg-white"
              data-bs-parent="#accordion"
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.FormularioPlanoSaude.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Formulário-Plano-saúde"
                        titulo="Formulário Plano de Saúde (*)"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="col-md-12 px-3">
                      <UploadFiles
                        tipoDocumento={TipoDocumentoUpload.FormularioSeguroDeVida.toString()}
                        containerName={token.codigoProfissional.toString()}
                        onUploadFile={handleUploadNovoClick}
                        descricaoTipo="Formulário-seguro-vida"
                        titulo="Formulário Seguro de Vida (*)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.tableArquivosContainer}>
        <div className="table-responsive-sm">
          <table className="table">
            <thead>
              <tr>
                <th className="w-25">Nome</th>
                <th className="w-25">Tipo</th>
                <th className="w-50">Caminho</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {listaArquivos?.length! > 0 &&
                listaArquivos?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{Documentos[item.tipoArquivo! - 1]?.nome}</td>
                    <td>{item.caminho}</td>
                    <td>
                      <button
                        style={{
                          paddingTop: "3px",
                          width: "30px",
                          height: "30px",
                          border: "none",
                          boxShadow: "none",
                          background: "none",
                        }}
                        className="btn btn-link"
                        title="Excluir"
                        onClick={() => {
                          handleDeleteClick(item.codigo);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          size="1x"
                          className="text-danger"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormArquivos;
