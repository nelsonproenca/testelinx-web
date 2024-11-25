import { createContext, useState, ReactNode, useContext } from "react";

import { AvaliacaoModel } from "../models/avaliacao.model";
import { CargoModel } from "../models/cargo.model";
import { ClienteModel } from "../models/cliente.model";
import { NotificacaoModel } from "../models/notificacao.model";
import { AvaliacaoConsolidadaModel } from "../models/consolida.avaliacao.model";
import { ContatoModel } from "../models/contato.model";
import { FuncionarioEnderecoModel } from "../models/funcionario.endereco.model";
import { FuncionarioDependenteModel } from "../models/funcionario.dependente.model";
import { ExperienciaProfissionalModel } from "../models/funcionario.experienciaprofissional.model";
import { FuncionarioModel } from "../models/funcionario.model";
import { EscritorioModel } from "../models/escritorio.model";
import { ParametroAvaliacaoModel } from "../models/parametro.avaliacao.model";
import { PerfilUsuarioModel } from "../models/perfil.usuario.model";
import { RegistroModel } from "../models/registro.model";
import { FormacaoModel } from "../models/funcionario.formacao.model";
import { FuncionarioIdiomaModel } from "../models/funcionario.idioma.model";
import { PipelineModel } from "../models/pipeline.model";
import { FullScaleModel } from "../models/full.scale.model";
import { ParticipacaoModel } from "../models/pipeline.participacao.model";
import { OrcamentoModel } from "../models/pipeline.orcamento.model";
import { ParceiroModel } from "../models/pipeline.parceiro.model";
import { ForecastModel } from "../models/pipeline.forecast.model";
import { DocumentoModel } from "../models/pipeline.documento.model";
import { ParcelaModel } from "../models/pipeline.parcela.model";
import { ValorCargoModel } from "../models/valor.cargo.model";
import { PowerAppsType } from "../models/power.apps.type";
import { PipelineExportarModel } from "../models/pipeline.exportar.model";
import { FollowUpModel } from "../models/pipeline.followup.model";
import { RecebimentoModel } from "../models/recebimento.model";
import { PipelinePrincipaisModel } from "../models/pipeline.principais.model";
import { FaturamentoModel } from "../models/faturamento.model";
import { FormaCobrancaModel } from "../models/forma.cobranca.model";
import { FeriadoModel } from "../models/timesheet.feriado.model";
import { SolicitacaoFeriasModel } from "../models/timesheet.ferias.model";
import { AtestadoLicencaModel } from "../models/timesheet.atestado.licenca.model";
import { AprovacaoPrestacaoContaModel } from "../models/aprovacao.prestacao.conta.model";
import { PrestacaoContaModel } from "../models/prestacao.conta.model";
import { PagamentoPrestacaoContaModel } from "../models/pagamento.prestacao.conta.model";
import { DespesaModel } from "../models/despesa.model";
import { ApontamentoHoraModel } from "../models/timesheet.apontamento.hora.model";
import { NotaDebitoModel } from "../models/nota.debito.model";
import { ParametroTimesheetModel } from "../models/parametro.timesheet.model";
import { AberturaTimesheetModel } from "../models/timesheet.abertura.profissional.model";
import { ImpostoEmpresaModel } from "../models/imposto.empresa.model";
import { ProjetoAdministrativoModel } from "../models/pipeline.projetos.administrativos.model";
import { CryptParamsModel } from "../models/crypt.params.model";
import { NotificacaoFuncionarioModel } from "../models/notificacao.funcionario.model";
import { PipelineFilterModel } from "../models/pipeline.filter.model";
import { AvaliacaofuncionarioGridModel } from "../models/avaliacao.grid.funcionario.model";
import { ProgramacaoModel } from "../models/programacao.model";
import { AprovacaoModel } from "../models/timesheet.aprovacao.model";
import { ModelSelect } from "../models/select.model";
import { PipelineProjetoModel } from "../models/pipeline.projeto.model";
import { FuncionarioFormTerceirosModel } from "../models/funcionario.formulario.terceiros.model";
import { SolicitacaoFeriasSocioModel } from "../models/timesheet.ferias.socios.model";
import { FuncionarioContatoEmergenciaModel } from "../models/funcionario.contatoemergencia.model";

type CadastrosContextData = {
  registroItem?: RegistroModel;
  cargoItem?: CargoModel;
  contatoItem?: ContatoModel;
  clienteItem?: ClienteModel;
  notificacaoItem?: NotificacaoModel;
  notificacaoFuncionarioItem?: NotificacaoFuncionarioModel;
  cryptItem?: CryptParamsModel;
  escritorioItem?: EscritorioModel;
  paramsAvaliacaoItem?: ParametroAvaliacaoModel;
  avaliacaoItem?: AvaliacaoModel;
  avaliacaoConsolidadaItem?: AvaliacaoConsolidadaModel;
  avaliacaoConsolidadaRhItem?: AvaliacaoConsolidadaModel;
  perfilUsuarioItem?: PerfilUsuarioModel;
  formacaoItem?: FormacaoModel;
  idiomaItem?: FuncionarioIdiomaModel;
  enderecoItem?: FuncionarioEnderecoModel;
  dependenteItem?: FuncionarioDependenteModel;
  contatoEmergenciaItem?: FuncionarioContatoEmergenciaModel;
  funcionarioDadosItem?: FuncionarioModel;
  experienciaProfissionalItem?: ExperienciaProfissionalModel;
  pipelineItem?: PipelineModel;
  fullScaleItem?: FullScaleModel;
  participacaoItem?: ParticipacaoModel;
  orcamentoItem?: OrcamentoModel;
  parceiroItem?: ParceiroModel;
  forecastItem?: ForecastModel;
  documentoItem?: DocumentoModel;
  parcelaItem?: ParcelaModel;
  valorCargoItem?: ValorCargoModel;
  pipelineExportarItem?: PipelineExportarModel;
  powerAppsItem?: PowerAppsType;
  followUpItem?: FollowUpModel;
  recebimentoItem?: RecebimentoModel;
  pipelinePrincipaisItem?: PipelinePrincipaisModel;
  faturamentoItem?: FaturamentoModel;
  formaCobrancaItem?: FormaCobrancaModel;
  feriadoItem?: FeriadoModel;
  solicitacaoFeriasItem?: SolicitacaoFeriasModel;
  SolicitacaoFeriasSocioItem?: SolicitacaoFeriasSocioModel;
  atestadoLicencaItem?: AtestadoLicencaModel;
  aprovacaoPrestacaoContaItem?: AprovacaoPrestacaoContaModel;
  prestacaoContaItem?: PrestacaoContaModel;
  prestacaoContaListaItem?: PrestacaoContaModel[];
  pagamentoPrestacaoContaItem?: PagamentoPrestacaoContaModel;
  despesaItem?: DespesaModel;
  notaDebitoItem?: NotaDebitoModel;
  apontamentoHoraItem?: ApontamentoHoraModel;
  parametroTimesheetItem?: ParametroTimesheetModel;
  aberturaTimesheetProfissionalItem?: AberturaTimesheetModel;
  wipProjetosAdministrativosItem?: ProjetoAdministrativoModel;
  pipelineSocioTiItem?: ParticipacaoModel[];
  impostoEmpresaItem?: ImpostoEmpresaModel;
  projetoAdministrativoItem?: ProjetoAdministrativoModel;
  pipelineFilterItem?: PipelineFilterModel;
  coacheeSelecionadoAvaliacaoItem?: FuncionarioModel;
  avaliacaofuncionarioGridItem?: AvaliacaofuncionarioGridModel;
  projetoAdministrativoLista?: ProjetoAdministrativoModel[];
  programacaoItem?: ProgramacaoModel;
  programacoesItem?: ProgramacaoModel[];
  aprovacaoItem?: AprovacaoModel;
  programacoesRealizadasItem?: number[];
  funcionarioFormularioItem?: FuncionarioFormTerceirosModel;
  projetosPipelineModalItem?: PipelineProjetoModel[];
  projetosPipelineOptionsModalItem?: ModelSelect[];
  adicionarRegistro: (item: RegistroModel) => void;
  adicionarCargo: (item: CargoModel) => void;
  adicionarCliente: (item: ClienteModel) => void;
  adicionarNotificacao: (item: NotificacaoModel) => void;
  adicionarNotificacaoFuncionario: (item: NotificacaoFuncionarioModel) => void;
  adicionarCrypt: (item: CryptParamsModel) => void;
  adicionarEscritorio: (item: EscritorioModel) => void;
  adicionarParamsAvalicao: (item: ParametroAvaliacaoModel) => void;
  adicionarContato: (item: ContatoModel) => void;
  adicionarAvaliacao: (item: AvaliacaoModel) => void;
  adicionarAvaliacaoConsolidada: (item: AvaliacaoConsolidadaModel) => void;
  adicionarAvaliacaoConsolidadaRh: (item: AvaliacaoConsolidadaModel) => void;
  adicionarPerfilUsuario: (item: PerfilUsuarioModel) => void;
  adicionarDependente: (item: FuncionarioDependenteModel) => void;
  adicionarContatoEmergencia: (item: FuncionarioDependenteModel) => void;
  adicionarFuncionarioDados: (item: FuncionarioModel) => void;
  adicionarExperienciaProfissional: (
    item: ExperienciaProfissionalModel
  ) => void;
  adicionarFormacao: (item: FormacaoModel) => void;
  adicionarIdioma: (item: FuncionarioIdiomaModel) => void;
  adicionarEndereco: (item: FuncionarioEnderecoModel) => void;
  adicionarPipeline: (item: PipelineModel) => void;
  adicionarFullScale: (item: FullScaleModel) => void;
  adicionarParticipacao: (item: ParticipacaoModel) => void;
  adicionarOrcamento: (item: OrcamentoModel) => void;
  adicionarParceiro: (item: ParceiroModel) => void;
  adicionarForecast: (item: ForecastModel) => void;
  adicionarDocumento: (item: DocumentoModel) => void;
  adicionarParcela: (item: ParcelaModel) => void;
  adicionarValorCargo: (item: ValorCargoModel) => void;
  adicionarPowerApps: (item: PowerAppsType) => void;
  adicionarPipelineExportar: (item: PipelineExportarModel) => void;
  adicionarFollowUp: (item: FollowUpModel) => void;
  adicionarRecebimento: (item: RecebimentoModel) => void;
  adicionarPipelinePrincipais: (item: PipelinePrincipaisModel) => void;
  adicionarFaturamento: (item: FaturamentoModel) => void;
  adicionarFormaCobranca: (item: FormaCobrancaModel) => void;
  adicionarFeriado: (item: FeriadoModel) => void;
  adicionarSolicitacaoFerias: (item: SolicitacaoFeriasModel) => void;
  adicionarSolicitacaoFeriasSocio: (item: SolicitacaoFeriasSocioModel) => void;
  adicionarAtestadoLicenca: (item: AtestadoLicencaModel) => void;
  adicionarAprovacaoPrestacaoConta: (
    item: AprovacaoPrestacaoContaModel
  ) => void;
  adicionarPrestacaoConta: (item: PrestacaoContaModel) => void;
  adicionarPrestacaoContaLista: (item: PrestacaoContaModel[]) => void;
  adicionarPagamentoPrestacaoConta: (
    item: PagamentoPrestacaoContaModel
  ) => void;
  adicionarDespesa: (item: DespesaModel) => void;
  adicionarNotaDebito: (item: NotaDebitoModel) => void;
  adicionarApontamentoHora: (item: ApontamentoHoraModel) => void;
  adicionarParametroTimesheet: (item: ParametroTimesheetModel) => void;
  adicionarAberturaTimesheetProfissional: (
    item: AberturaTimesheetModel
  ) => void;
  adicionarPipelineSocioTi: (item: ParticipacaoModel[]) => void;
  adicionarProjetoAdministrativo: (item: ProjetoAdministrativoModel) => void;
  adicionarImpostoEmpresa: (item: ImpostoEmpresaModel) => void;
  adicionarPipelineFilter: (item: PipelineFilterModel) => void;
  adicionarCoacheeSelecionadoAvaliacao: (item: FuncionarioModel) => void;
  adicionarAvaliacaoFuncionarioGrid: (
    item: AvaliacaofuncionarioGridModel
  ) => void;
  adicionarListaProjetoAdministrativo: (
    lista: ProjetoAdministrativoModel[]
  ) => void;
  adicionarProgramacao: (item: ProgramacaoModel) => void;
  adicionarProgramacoes: (item: ProgramacaoModel[]) => void;
  adicionarAprovacao: (item: AprovacaoModel) => void;
  adicionarProgramacoesRealizadas: (item: number[]) => void;
  adicionarFuncionarioFormularioItem: (
    item: FuncionarioFormTerceirosModel
  ) => void;
  adicionarProjetosPipelineModal: (item: PipelineProjetoModel[]) => void;
  adicionarProjetosPipelineOptionsModal: (item: ModelSelect[]) => void;
};

type CadastrosContextProviderProps = {
  children: ReactNode;
};

export const CadastrosContext = createContext({} as CadastrosContextData);

export function CadastrosContextProvider({
  children,
}: CadastrosContextProviderProps) {
  const [registroItem, setRegistroItem] = useState<RegistroModel>();
  const adicionarRegistro = (item: RegistroModel) => setRegistroItem(item);

  const [cargoItem, setCargoItem] = useState<CargoModel>();
  const adicionarCargo = (item: CargoModel) => setCargoItem(item);

  const [clienteItem, setClienteItem] = useState<ClienteModel>();
  const adicionarCliente = (item: ClienteModel) => setClienteItem(item);

  const [notificacaoItem, setNotificacaoItem] = useState<NotificacaoModel>();
  const adicionarNotificacao = (item: NotificacaoModel) =>
    setNotificacaoItem(item);

  const [notificacaoFuncionarioItem, setNotificacaoFuncionarioItem] =
    useState<NotificacaoFuncionarioModel>();
  const adicionarNotificacaoFuncionario = (item: NotificacaoFuncionarioModel) =>
    setNotificacaoFuncionarioItem(item);

  const [cryptItem, setCryptItem] = useState<CryptParamsModel>();
  const adicionarCrypt = (item: CryptParamsModel) => setCryptItem(item);

  const [contatoItem, setContatoItem] = useState<ContatoModel>();
  const adicionarContato = (item: ContatoModel) => setContatoItem(item);

  const [escritorioItem, setEscritorioItem] = useState<EscritorioModel>();
  const adicionarEscritorio = (item: EscritorioModel) =>
    setEscritorioItem(item);

  const [paramsAvaliacaoItem, setParamsAvaliacaoItem] =
    useState<ParametroAvaliacaoModel>();
  const adicionarParamsAvalicao = (item: ParametroAvaliacaoModel) =>
    setParamsAvaliacaoItem(item);

  const [avaliacaoItem, setAvaliacaoItem] = useState<AvaliacaoModel>();
  const adicionarAvaliacao = (item: AvaliacaoModel) => setAvaliacaoItem(item);

  const [pipelineItem, setPipelineItem] = useState<PipelineModel>();
  const adicionarPipeline = (item: PipelineModel) => setPipelineItem(item);

  const [orcamentoItem, setOrcamentoItem] = useState<OrcamentoModel>();
  const adicionarOrcamento = (item: OrcamentoModel) => setOrcamentoItem(item);

  const [parceiroItem, setParceiroItem] = useState<ParceiroModel>();
  const adicionarParceiro = (item: ParceiroModel) => setParceiroItem(item);

  const [followUpItem, setFollowUpItem] = useState<FollowUpModel>();
  const adicionarFollowUp = (item: FollowUpModel) => setFollowUpItem(item);

  const [forecastItem, setForecastItem] = useState<ForecastModel>();
  const adicionarForecast = (item: ForecastModel) => setForecastItem(item);

  const [documentoItem, setDocumentoItem] = useState<DocumentoModel>();
  const adicionarDocumento = (item: DocumentoModel) => setDocumentoItem(item);

  const [parcelaItem, setParcelaItem] = useState<ParcelaModel>();
  const adicionarParcela = (item: ParcelaModel) => setParcelaItem(item);

  const [recebimentoItem, setRecebimentoItem] = useState<RecebimentoModel>();
  const adicionarRecebimento = (item: RecebimentoModel) =>
    setRecebimentoItem((recebimentoItem) => (recebimentoItem = item));

  const [avaliacaoConsolidadaItem, setAvaliacaoConsolidadaItem] =
    useState<AvaliacaoConsolidadaModel>();
  const adicionarAvaliacaoConsolidada = (item: AvaliacaoConsolidadaModel) =>
    setAvaliacaoConsolidadaItem(item);

  const [avaliacaoConsolidadaRhItem, setAvaliacaoConsolidadaRhItem] =
    useState<AvaliacaoConsolidadaModel>();
  const adicionarAvaliacaoConsolidadaRh = (item: AvaliacaoConsolidadaModel) =>
    setAvaliacaoConsolidadaRhItem(item);

  const [perfilUsuarioItem, setPerfilUsuarioItem] =
    useState<PerfilUsuarioModel>();
  const adicionarPerfilUsuario = (item: PerfilUsuarioModel) =>
    setPerfilUsuarioItem(item);

  const [formacaoItem, setFormacaoItem] = useState<FormacaoModel>();
  const adicionarFormacao = (item: FormacaoModel) => setFormacaoItem(item);

  const [idiomaItem, setIdiomaItem] = useState<FuncionarioIdiomaModel>();
  const adicionarIdioma = (item: FuncionarioIdiomaModel) => setIdiomaItem(item);

  const [enderecoItem, setEnderecoItem] = useState<FuncionarioEnderecoModel>();
  const adicionarEndereco = (item: FuncionarioEnderecoModel) =>
    setEnderecoItem(item);

  const [dependenteItem, setDependenteItem] =
    useState<FuncionarioDependenteModel>();
  const adicionarDependente = (item: FuncionarioDependenteModel) =>
    setDependenteItem(item);

  const [contatoEmergenciaItem, setContatoEmergenciaItem] =
    useState<FuncionarioDependenteModel>();
  const adicionarContatoEmergencia = (
    item: FuncionarioContatoEmergenciaModel
  ) => setContatoEmergenciaItem(item);

  const [funcionarioDadosItem, setFuncionarioDadosItem] =
    useState<FuncionarioModel>();
  const adicionarFuncionarioDados = (item: FuncionarioModel) =>
    setFuncionarioDadosItem(item);

  const [experienciaProfissionalItem, setExperienciaProfissionalItem] =
    useState<ExperienciaProfissionalModel>();
  const adicionarExperienciaProfissional = (
    item: ExperienciaProfissionalModel
  ) => setExperienciaProfissionalItem(item);

  const [fullScaleItem, setFullScaleItem] = useState<FullScaleModel>();
  const adicionarFullScale = (item: FullScaleModel) => setFullScaleItem(item);

  const [participacaoItem, setParticipacaoItem] = useState<ParticipacaoModel>();
  const adicionarParticipacao = (item: ParticipacaoModel) =>
    setParticipacaoItem(item);

  const [valorCargoItem, setValorCargoItem] = useState<ValorCargoModel>();
  const adicionarValorCargo = (item: ValorCargoModel) =>
    setValorCargoItem(item);

  const [powerAppsItem, setPowerApps] = useState<PowerAppsType>();
  const adicionarPowerApps = (item: PowerAppsType) => setPowerApps(item);

  const [pipelineExportarItem, setPipelineExportarItem] =
    useState<PipelineExportarModel>();
  const adicionarPipelineExportar = (item: PipelineExportarModel) =>
    setPipelineExportarItem(item);

  const [pipelinePrincipaisItem, setPipelinePrincipaisItem] =
    useState<PipelinePrincipaisModel>();
  const adicionarPipelinePrincipais = (item: PipelinePrincipaisModel) =>
    setPipelinePrincipaisItem(item);

  const [faturamentoItem, setFaturamento] = useState<FaturamentoModel>();
  const adicionarFaturamento = (item: FaturamentoModel) => setFaturamento(item);

  const [formaCobrancaItem, setFormaCobrancaItem] =
    useState<FormaCobrancaModel>();
  const adicionarFormaCobranca = (item: FormaCobrancaModel) =>
    setFormaCobrancaItem(item);

  const [feriadoItem, setFeriado] = useState<FeriadoModel>();
  const adicionarFeriado = (item: FeriadoModel) => setFeriado(item);

  const [solicitacaoFeriasItem, setSolicitacaoFeriasItem] =
    useState<SolicitacaoFeriasModel>();
  const adicionarSolicitacaoFerias = (item: SolicitacaoFeriasModel) =>
    setSolicitacaoFeriasItem(item);

  const [SolicitacaoFeriasSocioItem, setSolicitacaoFeriasSocioItem] =
    useState<SolicitacaoFeriasSocioModel>();
  const adicionarSolicitacaoFeriasSocio = (item: SolicitacaoFeriasSocioModel) =>
    setSolicitacaoFeriasSocioItem(item);

  const [atestadoLicencaItem, setAtestadoLicencaItem] =
    useState<AtestadoLicencaModel>();
  const adicionarAtestadoLicenca = (item: AtestadoLicencaModel) =>
    setAtestadoLicencaItem(item);

  const [aprovacaoPrestacaoContaItem, setAprovacaoPrestacaoContaItem] =
    useState<AprovacaoPrestacaoContaModel>();
  const adicionarAprovacaoPrestacaoConta = (
    item: AprovacaoPrestacaoContaModel
  ) => setAprovacaoPrestacaoContaItem(item);

  const [prestacaoContaItem, setPrestacaoContaItem] =
    useState<PrestacaoContaModel>();
  const adicionarPrestacaoConta = (item: PrestacaoContaModel) =>
    setPrestacaoContaItem(item);

  const [prestacaoContaListaItem, setPrestacaoContaListaItem] =
    useState<PrestacaoContaModel[]>();
  const adicionarPrestacaoContaLista = (item: PrestacaoContaModel[]) =>
    setPrestacaoContaListaItem(item);

  const [pagamentoPrestacaoContaItem, setPagamentoPrestacaoContaItem] =
    useState<PagamentoPrestacaoContaModel>();
  const adicionarPagamentoPrestacaoConta = (
    item: PagamentoPrestacaoContaModel
  ) => setPagamentoPrestacaoContaItem(item);

  const [despesaItem, setDespesaItem] = useState<DespesaModel>();
  const adicionarDespesa = (item: DespesaModel) => setDespesaItem(item);

  const [notaDebitoItem, setNotaDebitoItem] = useState<NotaDebitoModel>();
  const adicionarNotaDebito = (item: NotaDebitoModel) =>
    setNotaDebitoItem(item);

  const [apontamentoHoraItem, setApontamentoHoraItem] =
    useState<ApontamentoHoraModel>();
  const adicionarApontamentoHora = (item: ApontamentoHoraModel) =>
    setApontamentoHoraItem(item);

  const [parametroTimesheetItem, setParametroTimesheetItem] =
    useState<ParametroTimesheetModel>();
  const adicionarParametroTimesheet = (item: ParametroTimesheetModel) =>
    setParametroTimesheetItem(item);

  const [aberturaTimesheetProfissionalItem, setAberturaTimesheetProfissional] =
    useState<AberturaTimesheetModel>();
  const adicionarAberturaTimesheetProfissional = (
    item: AberturaTimesheetModel
  ) => setAberturaTimesheetProfissional(item);

  const [pipelineSocioTiItem, setPipelineSocioTiItem] =
    useState<ParticipacaoModel[]>();
  const adicionarPipelineSocioTi = (item: ParticipacaoModel[]) =>
    setPipelineSocioTiItem(item);

  const [projetoAdministrativoItem, setWipProjetoAdministrativoItem] =
    useState<ProjetoAdministrativoModel>();
  const adicionarProjetoAdministrativo = (item: ProjetoAdministrativoModel) =>
    setWipProjetoAdministrativoItem(item);

  const [impostoEmpresaItem, setImpostoEmpresaItem] =
    useState<ImpostoEmpresaModel>();
  const adicionarImpostoEmpresa = (item: ImpostoEmpresaModel) =>
    setImpostoEmpresaItem(item);

  const [pipelineFilterItem, setPipelineFilterItem] =
    useState<PipelineFilterModel>();
  const adicionarPipelineFilter = (item: PipelineFilterModel) =>
    setPipelineFilterItem(item);

  const [coacheeSelecionadoAvaliacaoItem, setCoacheeSelecionadoAvaliacao] =
    useState<FuncionarioModel>();
  const adicionarCoacheeSelecionadoAvaliacao = (item: FuncionarioModel) =>
    setCoacheeSelecionadoAvaliacao(item);

  const [avaliacaofuncionarioGridItem, setAvaliacaofuncionarioGridItem] =
    useState<AvaliacaofuncionarioGridModel>();
  const adicionarAvaliacaoFuncionarioGrid = (
    item: AvaliacaofuncionarioGridModel
  ) => setAvaliacaofuncionarioGridItem(item);

  const [programacaoItem, setProgramacaoItem] = useState<ProgramacaoModel>();
  const adicionarProgramacao = (item: ProgramacaoModel) =>
    setProgramacaoItem(item);

  const [programacoesItem, setProgramacoesItem] =
    useState<ProgramacaoModel[]>();
  const adicionarProgramacoes = (item: ProgramacaoModel[]) =>
    setProgramacoesItem(item);

  const [aprovacaoItem, setAprovacaoItem] = useState<AprovacaoModel>();
  const adicionarAprovacao = (item: AprovacaoModel) => setAprovacaoItem(item);

  const [projetoAdministrativoLista, setProjetoAdministrativoLista] =
    useState<ProjetoAdministrativoModel[]>();
  const adicionarListaProjetoAdministrativo = (
    lista: ProjetoAdministrativoModel[]
  ) => setProjetoAdministrativoLista(lista);

  const [programacoesRealizadasItem, setProgramacoesRealizadasItem] = useState<
    number[]
  >([]);
  const adicionarProgramacoesRealizadas = (item: number[]) =>
    setProgramacoesRealizadasItem(item);

  const [funcionarioFormularioItem, setFuncionarioFormularioItem] =
    useState<FuncionarioFormTerceirosModel>();
  const adicionarFuncionarioFormularioItem = (
    item: FuncionarioFormTerceirosModel
  ) => setFuncionarioFormularioItem(item);

  const [projetosPipelineModalItem, setProjetosPipelineModalItem] =
    useState<PipelineProjetoModel[]>();
  const adicionarProjetosPipelineModal = (item: PipelineProjetoModel[]) =>
    setProjetosPipelineModalItem(item);

  const [
    projetosPipelineOptionsModalItem,
    setProjetosPipelineOptionsModalItem,
  ] = useState<ModelSelect[]>();
  const adicionarProjetosPipelineOptionsModal = (item: ModelSelect[]) =>
    setProjetosPipelineOptionsModalItem(item);

  return (
    <CadastrosContext.Provider
      value={{
        registroItem,
        cargoItem,
        contatoItem,
        clienteItem,
        notificacaoItem,
        notificacaoFuncionarioItem,
        cryptItem,
        escritorioItem,
        paramsAvaliacaoItem,
        avaliacaoItem,
        avaliacaoConsolidadaItem,
        perfilUsuarioItem,
        formacaoItem,
        idiomaItem,
        enderecoItem,
        dependenteItem,
        contatoEmergenciaItem,
        funcionarioDadosItem,
        experienciaProfissionalItem,
        pipelineItem,
        fullScaleItem,
        participacaoItem,
        orcamentoItem,
        parceiroItem,
        forecastItem,
        documentoItem,
        parcelaItem,
        valorCargoItem,
        powerAppsItem,
        pipelineExportarItem,
        followUpItem,
        recebimentoItem,
        pipelinePrincipaisItem,
        faturamentoItem,
        formaCobrancaItem,
        feriadoItem,
        solicitacaoFeriasItem,
        SolicitacaoFeriasSocioItem,
        atestadoLicencaItem,
        aprovacaoPrestacaoContaItem,
        prestacaoContaItem,
        pagamentoPrestacaoContaItem,
        despesaItem,
        notaDebitoItem,
        apontamentoHoraItem,
        parametroTimesheetItem,
        aberturaTimesheetProfissionalItem,
        pipelineSocioTiItem,
        projetoAdministrativoItem,
        impostoEmpresaItem,
        prestacaoContaListaItem,
        avaliacaoConsolidadaRhItem,
        pipelineFilterItem,
        coacheeSelecionadoAvaliacaoItem,
        projetoAdministrativoLista,
        programacaoItem,
        programacoesItem,
        aprovacaoItem,
        avaliacaofuncionarioGridItem,
        programacoesRealizadasItem,
        funcionarioFormularioItem,
        projetosPipelineModalItem,
        projetosPipelineOptionsModalItem,
        adicionarDependente,
        adicionarContatoEmergencia,
        adicionarFuncionarioDados,
        adicionarExperienciaProfissional,
        adicionarRegistro,
        adicionarCargo,
        adicionarCliente,
        adicionarNotificacao,
        adicionarNotificacaoFuncionario,
        adicionarCrypt,
        adicionarEscritorio,
        adicionarParamsAvalicao,
        adicionarContato,
        adicionarAvaliacao,
        adicionarAvaliacaoConsolidada,
        adicionarPerfilUsuario,
        adicionarFormacao,
        adicionarIdioma,
        adicionarEndereco,
        adicionarPipeline,
        adicionarFullScale,
        adicionarParticipacao,
        adicionarOrcamento,
        adicionarParceiro,
        adicionarForecast,
        adicionarDocumento,
        adicionarParcela,
        adicionarValorCargo,
        adicionarPowerApps,
        adicionarPipelineExportar,
        adicionarFollowUp,
        adicionarRecebimento,
        adicionarPipelinePrincipais,
        adicionarFaturamento,
        adicionarFormaCobranca,
        adicionarFeriado,
        adicionarSolicitacaoFerias,
        adicionarSolicitacaoFeriasSocio,
        adicionarAtestadoLicenca,
        adicionarAprovacaoPrestacaoConta,
        adicionarPrestacaoConta,
        adicionarPagamentoPrestacaoConta,
        adicionarDespesa,
        adicionarNotaDebito,
        adicionarApontamentoHora,
        adicionarParametroTimesheet,
        adicionarAberturaTimesheetProfissional,
        adicionarPipelineSocioTi,
        adicionarProjetoAdministrativo,
        adicionarImpostoEmpresa,
        adicionarPrestacaoContaLista,
        adicionarAvaliacaoConsolidadaRh,
        adicionarPipelineFilter,
        adicionarCoacheeSelecionadoAvaliacao,
        adicionarAvaliacaoFuncionarioGrid,
        adicionarListaProjetoAdministrativo,
        adicionarProgramacao,
        adicionarProgramacoes,
        adicionarAprovacao,
        adicionarProgramacoesRealizadas,
        adicionarFuncionarioFormularioItem,
        adicionarProjetosPipelineModal,
        adicionarProjetosPipelineOptionsModal,
      }}
    >
      {children}
    </CadastrosContext.Provider>
  );
}

export const useCadastros = () => {
  return useContext(CadastrosContext);
};
