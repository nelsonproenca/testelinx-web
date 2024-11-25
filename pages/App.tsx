import { Routes, Route } from "react-router-dom";

import useToken from "../hooks/useToken";

import NavLogin from "../components/NavLogin";
import MenuDroppdown from "../components/MenuDropDown";

import Administrativo from "./Administrativo";
import Financeiro from "./Financeiro";
import PaginaNaoEncontrada from "./PaginaNaoEncontrada";
import TecnologiaInformacao from "./TecnologiaInformacao";
import Treinamentos from "./Treinamentos";
import CadastrosGerais from "./CadastrosGerais";
import RecursosHumanos from "./RecursosHumanos";
import GestaoProjetos from "./GestaoProjetos";
import TimeSheet from "./TimeSheet";
import AppsIntegracoes from "./AppsIntegracoes";
import Wip from "./Wip";

import Areas from "./Cadastro/Areas";
import Cargos from "./Cadastro/Cargos";
import Clientes from "./Cadastro/Clientes";
import Contatos from "./Cadastro/Contatos";
import Escritorios from "./Cadastro/Escritorios";
import Menu from "./Cadastro/Menu";
import RamoAtividades from "./Cadastro/RamoAtividades";
import Empresas from "./Cadastro/Empresas";
import GrupoEconomico from "./Cadastro/GrupoEconomico";
import ImpostosEmpresa from "./Cadastro/ImpostosEmpresa";
import ValorCargos from "./Cadastro/ValorCargos";
import ProjetoAdministrativo from "./Cadastro/ProjetoAdministrativo";
import MeusDados from "./Cadastro/MeusDados";
import DadosFuncionario from "./Cadastro/ListaDadosFuncionario/DadosFuncionario";
import ListaDadosFuncionario from "./Cadastro/ListaDadosFuncionario";

import { DetalhadoFinanceiro } from "./Financeiro/DetalhadoFinanceiro/index";
import { ResumoFinanceiro } from "./Financeiro/ResumoFinanceiro/index";
import Faturamento from "./Financeiro/Faturamento";
import Recebimento from "./Financeiro/Recebimento";
import ImportarDados from "./Financeiro/ImportarDados";

import PipelineCriacao from "./GestaoProjetos/PipelineCriacao";
import PipelineResumo from "./GestaoProjetos/PipelineResumo";
import PipelineDetalhado from "./GestaoProjetos/PipelineDetalhado";
import PipelineLista from "./GestaoProjetos/PipelineLista";
import PipelineWizard from "./GestaoProjetos/PipelineWizard";
import CobravelLista from "./GestaoProjetos/PipelineListaCobravel";
import CadastroProgramacao from "./GestaoProjetos/Programacao";
import VisualizarProgramacao from "./GestaoProjetos/VisualizarProgramacao";
import OrcamentoHistorico from "./GestaoProjetos/OrcamentoHistorico";

import ListaAvaliacao from "./Rh/ListaAvaliacao";
import AvaliacaoConsulta from "./Rh/AvaliacaoConsulta";
import ParametrosAvaliacoes from "./Rh/ParametrosAvaliacoes";
import AvaliacaoForm from "./Rh/AvaliacaoForm";
import AvaliacaoConsolidadaCoach from "./Rh/AvaliacaoConsolidadaCoach";
import DashboardAvaliacao from "./Rh/DashboardAvaliacao";
import FluxoAvaliacao from "./Rh/FluxoAvaliacao";
import Retatorios from "./Rh/Relatorios";
import ListaAvaliacaoRh from "./Rh/ListaAvaliacaoRh";
import DashboardRH from "./Rh/DashboardRH";
import AvaliacaoConsolidadaRh from "./Rh/AvaliacaoConsolidadaRh";
import DashboardPBI from "./Rh/DashboardPBI";
import AvaliacaoFinalizada from "./Rh/AvaliacaoFinalizada";
import CaixaMensagem from "./Rh/CaixaMensagem";
import VerTodas from "./Rh/CaixaMensagem/VerTodas";
import AvaliacaoFinalizadasCoach from "./Rh/AvaliacaoFinalizadasCoach";
import ListacoachAvaliado from "./Rh/ListaCoachAvaliado";
import ConvencaoColetiva from "./Rh/ConvencaoColetiva";
import ListaAvaliacaoLider from "./Rh/ListaAvaliacaoLider";

import ConsultaTimesheet from "./Timesheet/ConsultaTimesheet";
import ReaberturaTimesheet from "./Timesheet/ReaberturaTimesheet";
import ParametroTimesheet from "./Timesheet/Parametros";
import Feriado from "./Timesheet/Feriado";
import Ferias from "./Timesheet/Ferias";
import AprovacaoFerias from "./Timesheet/AprovacaoFerias/index";
import AtestadoLicenca from "./Timesheet/AtestadoLicenca";
import AprovacaoAtestadoLicenca from "./Timesheet/AprovacaoAtestadoLicenca/index";
import TransferenciaHoras from "./Timesheet/TransferenciaHoras";
import AprovacaoTransferenciaHoras from "./Timesheet/AprovacaoTransferenciaHoras";
import ApontamentoHoras from "./Timesheet/ApontamentoHoras";
import AprovacaoApontamentoHoras from "./Timesheet/AprovacaoApontamentoHoras";
import GerenciarAprovacoes from "./Timesheet/GerenciarAprovacoes";
import GerenciarApontamentos from "./Timesheet/GerenciarApontamentos";
import HorasNaoApontadas from "./Timesheet/HorasNaoApontadas";
import ApontamentoHorasApp from "./Timesheet/ApontamentoHorasApp";
import ApontamentoHorasColaborador from "./Timesheet/ApontamentoHorasColaborador";
import ConsultaFeriasAprovadas from "./Timesheet/ConsultaFeriasAprovadas";
import FeriasSocios from "./Timesheet/FeriasSocios";
import AprovacaoFeriasSocios from "./Timesheet/AprovacaoFeriasSocios";

import PrestacaoConta from "./Despesas/PrestacaoConta";
import ListaPrestacaoConta from "./Despesas/ListaPrestacaoConta/index";
import AprovacaoPrestacaoConta from "./Despesas/AprovacaoPrestacaoConta";
import PagamentoPrestacaoConta from "./Despesas/PagamentoPrestacaoConta";
import NotaDebito from "./Despesas/NotaDebito";
import Despesa from "./Despesas/Despesa";
import ProgramacaoPagamentos from "./Despesas/ProgramacaoPagamentos";
import ListaDespesas from "./Despesas/ListaDespesas";
import ListaNotaDebito from "./Despesas/ListaNotasDebito";

import Processamento from "./Wip/Processamento";
import Reprocessamento from "./Wip/Reprocessamento";

import Mensal from "./Wip/Mensal";
import WipNotificacoes from "./Wip/WipNotificoes";

import EscreverBemImagens from "./Treinamento/EscreverBemImagens";
import ImportarTreinamento from "./Treinamento/ImportarTreinamento";

import DataAnalytics from "./Socios/DataAnalytics";
import Drawings from "./Socios/Drawings";
import Contratos from "./Socios/Contratos";
import SeguroVida from "./Socios/SeguroVida";
import ContribuicaoIndividual from "./Socios/ContribuicaoIndividual";
import FeriasSociosPowerBI from "./Socios/FeriasSociosPowerBI";

import styles from "../styles/app.module.scss";

function App() {
  const { token } = useToken();

  if (!token) {
    return <NavLogin />;
  }

  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<MenuDroppdown />}>
          <Route index element={<Administrativo />} />
          <Route path="administrativo" element={<Administrativo />} />

          {/* Socios */}
          <Route
            path="ferias-socios-powerbi"
            element={<FeriasSociosPowerBI />}
          />
          <Route path="data-analytics" element={<DataAnalytics />} />
          <Route path="drawings" element={<Drawings />} />
          <Route path="contratos" element={<Contratos />} />
          <Route path="seguro-vida" element={<SeguroVida />} />
          <Route
            path="contribuicao-individual-autonoma"
            element={<ContribuicaoIndividual />}
          />

          {/* CadastrosGerais */}
          <Route path="cadastros-gerais" element={<CadastrosGerais />} />
          <Route path="areas" element={<Areas />} />
          <Route path="empresas" element={<Empresas />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="escritorios" element={<Escritorios />} />
          <Route
            path="projetos-administrativos"
            element={<ProjetoAdministrativo />}
          />
          <Route path="clientes" element={<Clientes />} />
          <Route path="grupo-economico" element={<GrupoEconomico />} />
          <Route path="contatos/:codigoCliente" element={<Contatos />} />
          <Route path="ramo-atividades" element={<RamoAtividades />} />
          <Route path="meus-dados" element={<MeusDados />} />
          <Route path="funcionarios" element={<DadosFuncionario />} />
          <Route
            path="lista-funcionarios"
            element={<ListaDadosFuncionario />}
          />
          <Route path="impostos-empresa" element={<ImpostosEmpresa />} />
          <Route path="valores-cargos" element={<ValorCargos />} />
          <Route path="menu" element={<Menu />} />

          {/* RecursosHumanos */}
          <Route path="rh" element={<RecursosHumanos />} />
          <Route path="lista-avaliacoes" element={<ListaAvaliacao />} />
          <Route path="avaliacao/:tipoAvaliacao" element={<AvaliacaoForm />} />
          <Route
            path="avaliacao-consulta/:codigo/:codigoAvaliado/:isRh"
            element={<AvaliacaoConsulta />}
          />
          <Route path="dashboard-avaliacao" element={<DashboardAvaliacao />} />
          <Route path="dashboard-rh" element={<DashboardRH />} />
          <Route
            path="avaliacao-consolidada/:Apelido"
            element={<AvaliacaoConsolidadaCoach />}
          />
          <Route
            path="avaliacao-consolidada-rh/:Apelido"
            element={<AvaliacaoConsolidadaRh />}
          />
          <Route
            path="avaliacao-resultado/:Apelido/:ano"
            element={<AvaliacaoFinalizadasCoach />}
          />
          <Route path="cadastro-periodo" element={<ParametrosAvaliacoes />} />
          <Route
            path="fluxo-avaliacao/:codigoAvaliacao"
            element={<FluxoAvaliacao />}
          />
          <Route path="lista-rh-avaliacoes" element={<ListaAvaliacaoRh />} />
          <Route
            path="lista-lider-avaliacoes"
            element={<ListaAvaliacaoLider />}
          />
          <Route path="documentos" element={<ConvencaoColetiva />} />
          <Route
            path="lista-resultado-avaliacoes/:isCoach"
            element={<ListacoachAvaliado />}
          />
          <Route path="relatorios" element={<Retatorios />} />
          <Route path="pbi-dashboard" element={<DashboardPBI />} />
          <Route
            path="avaliacoes-finalizadas"
            element={<AvaliacaoFinalizada />}
          />
          <Route path="caixa-mensagem" element={<CaixaMensagem />} />
          <Route path="notificacao-ver-todas" element={<VerTodas />} />

          {/* Financeiro */}
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="faturamento" element={<Faturamento />} />
          <Route path="recebimento" element={<Recebimento />} />
          <Route path="resumo-financeiro" element={<ResumoFinanceiro />} />
          <Route
            path="detalhado-financeiro"
            element={<DetalhadoFinanceiro />}
          />
          <Route path="importar-dados" element={<ImportarDados />} />
          <Route path="prestacao-conta" element={<PrestacaoConta />} />
          <Route path="despesa" element={<Despesa />} />
          <Route path="lista-despesas" element={<ListaDespesas />} />
          <Route
            path="lista-prestacao-conta"
            element={<ListaPrestacaoConta />}
          />
          <Route
            path="pagamento-prestacao-conta"
            element={<PagamentoPrestacaoConta />}
          />
          <Route path="nota-debito" element={<NotaDebito />} />
          <Route path="lista-nota-debito" element={<ListaNotaDebito />} />
          <Route
            path="programacao-pagamentos"
            element={<ProgramacaoPagamentos />}
          />
          <Route
            path="aprovacao-prestacao-conta"
            element={<AprovacaoPrestacaoConta />}
          />

          {/* Gestão de Projetos */}
          <Route path="gestao-projetos" element={<GestaoProjetos />} />
          <Route path="pipeline-lista" element={<PipelineLista />} />
          <Route path="cobravel-lista" element={<CobravelLista />} />
          <Route path="pipeline-criacao" element={<PipelineCriacao />} />
          <Route path="pipeline-resumo" element={<PipelineResumo />} />
          <Route path="pipeline-detalhado" element={<PipelineDetalhado />} />
          <Route path="pipeline-wizard" element={<PipelineWizard />} />
          <Route path="wip-processos" element={<Processamento />} />
          <Route path="wip-reprocessamento" element={<Reprocessamento />} />
          <Route path="orcamento-historico" element={<OrcamentoHistorico />} />

          {/* Programacao */}
          <Route
            path="cadastro-programacao"
            element={<CadastroProgramacao />}
          />
          <Route
            path="visualizar-programacao"
            element={<VisualizarProgramacao />}
          />

          {/* TimeSheet */}
          <Route path="timesheet" element={<TimeSheet />} />
          <Route path="apontamento-horas" element={<ApontamentoHoras />} />
          <Route
            path="apontamento-horas-colaborador"
            element={<ApontamentoHorasColaborador />}
          />
          <Route
            path="apontamento-horas-app"
            element={<ApontamentoHorasApp />}
          />
          <Route path="consulta-timesheet" element={<ConsultaTimesheet />} />
          <Route
            path="consulta-ferias-aprovadas"
            element={<ConsultaFeriasAprovadas />}
          />
          <Route
            path="reabertura-timesheet"
            element={<ReaberturaTimesheet />}
          />
          <Route path="ferias" element={<Ferias />} />
          <Route path="ferias-socios" element={<FeriasSocios />} />
          <Route path="aprovacao-ferias" element={<AprovacaoFerias />} />
          <Route
            path="aprovacao-ferias-socios"
            element={<AprovacaoFeriasSocios />}
          />
          <Route path="feriado" element={<Feriado />} />
          <Route path="atestado-licenca" element={<AtestadoLicenca />} />
          <Route
            path="aprovacao-atestado-licenca"
            element={<AprovacaoAtestadoLicenca />}
          />
          <Route path="transferencia-horas" element={<TransferenciaHoras />} />
          <Route
            path="aprovacao-transferencia-horas"
            element={<AprovacaoTransferenciaHoras />}
          />
          <Route
            path="aprovacao-apontamento-horas"
            element={<AprovacaoApontamentoHoras />}
          />
          <Route
            path="gerenciar-aprovacoes"
            element={<GerenciarAprovacoes />}
          />
          <Route
            path="gerenciar-apontamentos"
            element={<GerenciarApontamentos />}
          />
          <Route path="parametros-timesheet" element={<ParametroTimesheet />} />
          <Route path="horas-nao-apontadas" element={<HorasNaoApontadas />} />

          {/* Treinamentos */}
          <Route path="treinamentos" element={<Treinamentos />} />
          <Route path="escrever-bem" element={<EscreverBemImagens />} />
          <Route
            path="importar-treinamento"
            element={<ImportarTreinamento />}
          />

          <Route path="apps-integracoes" element={<AppsIntegracoes />} />
          <Route path="ti" element={<TecnologiaInformacao />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />

          {/* Wip */}
          <Route path="wip" element={<Wip />} />
          <Route path="wip-mensal" element={<Mensal />} />
          <Route path="wip-notificacoes" element={<WipNotificacoes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
