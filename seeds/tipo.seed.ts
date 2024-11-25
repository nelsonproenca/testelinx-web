import { mask, unMask } from 'node-masker';
import Swal from 'sweetalert2';
import { ModelSelect } from '../models/select.model';
import { RegistroModel } from '../models/registro.model';

// Aprovador Financeiro(em 2023) - William Galasso - rever
export const AprovadorSocioFinanceiro: number = 99;
export const ApelidoAprovadorSocioFinanceiro: string = 'WILLIAM GALASSO';

const enum TipoCriacaoAvaliacao {
  Propria = 1,
  Profissional = 2,
}
const enum TipoOrigemApontamento {
  PowerApp = 1,
  Web = 2,
}

const enum TipoPerfil {
  Admin = 'Admin',
  Administrativo = 'Administrativo',
  Financeiro = 'Financeiro',
  DepartamentoPessoal = 'DepartamentoPessoal',
  Gerente = 'Gerente',
  Legal = 'Legal',
  Rh = 'Rh',
  Socio = 'Socio',
  SocioRh = 'SocioRh',
  Staff = 'Staff',
  SocioFinanceiro = 'SocioFinanceiro',
  Treinamento = 'Treinamento',
  SocioCEO = 'SocioCEO',
  SocioTreinamento = 'SocioTreinamento',
}

const enum TipoAprovacaoSolicitacao {
  EmAnalise = 'EmAnalise',
  Aprovada = 'Aprovada',
  Negada = 'Negada',
  AprovadaAutomatico = 'AprovadaAutomatico',
  ConflitoTreinamento = 'ConflitoTreinamento',
  ConflitoProgramacao = 'ConflitoProgramacao',
  Cancelada = 'Cancelada',
  PreAprovada = 'PreAprovada',
}

const enum TipoContrato {
  CLT = 1,
  Estagiario = 2,
  Socio = 3,
  Terceiro = 4,
}

const enum TipoPessoa {
  PessoaFisica = 1,
  PessoaJuridica = 2,
  Estrangeiro = 3,
}

const enum TipoComplexidade {
  Alta = 1,
  Media,
  Baixa,
}

const enum TipoStatusAvaliacao {
  EmAberto = 1,
  AguardandoAprovacao,
  AguardandoConsolidacao,
  AguardandoModeration,
  Aprovado,
}

const enum TipoComentarios {
  PapeisResponsabilidades = 'PR',
  PontosFortes = 'PF',
  PontosAprimoramento = 'PA',
  ComentariosGeraisAvaliado = 'CGA',
  ComentariosGeraisAvaliadorPrincipal = 'CGAP',
  ComentariosGeraisAvaliadorAdicional1 = 'CGAA1',
  ComentariosGeraisAvaliadorAdicional2 = 'CGAA2',
  ComentariosGeraisCoach = 'CGC',
}

const enum TipoAvaliador {
  AvaliadorAdicional = 1,
  AvaliadorPrincipal,
  Coach,
  Rh,
}

const enum TipoIdentidadeGenero {
  TransgeneroMasculino = 1,
  TransgeneroFeminino,
  CisgeneroMasculino,
  CisgeneroFeminino,
  NaoBinario,
}

const enum TipoEstadoCivil {
  Solteiro = 1,
  Casado,
  Divorciado,
  Viuvo,
  UniaoCivil,
}
const enum TipoDependentes {
  Filhos = 1,
  Conjuge,
  Pai,
  Mae,
}

const enum TipoEscolaridade {
  EducacaoInfantil = 1,
  EnsinoFundamental,
  EnsinoMedio,
  EnsinoSuperior,
  PosGraduacao,
  Mestrado,
  Doutorado,
}

const enum TipoFormacao {
  Bacharelado = 1,
  Licenciatura,
  Tecnologico,
  SequencialFormacaoEspecifica,
  SequencialComplementacaoEstudos,
  GraduacaoModulada,
  EducacaoADistancia,
}

const enum TipoStatusCurso {
  Completo = 1,
  Cursando,
  Outro,
}

const enum TipoNivel {
  Fluente = 1,
  Iniciante,
  Intermediario,
  Outro,
}

const enum TipoRaca {
  Branco = 1,
  Preto,
  Pardo,
  Amarelo,
  Indigena,
}

const enum TipoIdioma {
  Ingles = 1,
  Espanhol,
  Frances,
  Mandarim,
  Italiano,
  Outro,
}

const enum TipoDocumentoUpload {
  Foto_3x4 = 1,
  CarteiraTrabalho = 2,
  RG = 3,
  CPF = 4,
  ComprovanteResidencia = 5,
  CarteiraHabilitacao = 6,
  PIS = 7,
  TituloEleitor = 8,
  DadosBancarios = 9,
  CertidaoCasamento = 10,
  CertidaoNascimento = 11,
  DocConjuge = 12,
  ComprovanteFilhos = 13,
  CarteiraVacina = 14,
  ExameAdmissional = 15,
  DeclaracaoMatricula = 16,
  FormularioPlanoSaude = 17,
  FormularioSeguroDeVida = 18,
  AtestadoLicenca = 19,
  Comprovante = 20,
  ArquivoRemessa = 21,
  AnexoNotificacao = 22,
  Cin = 23,
}

const enum TipoListaServico {
  ComexCreditRecover = 1,
  DueDiligence = 2,
  IcmsIpiCreditRecover = 3,
  LevantamentoDeCreditos = 4,
  PisConfinsCreditRecover = 5,
  SiteLocation = 6,
  SpecialTaxationRegime = 7,
  TaxCompliance = 8,
  TaxConsulting = 9,
  TaxCreditAccumulation = 10,
  TaxCreditMonetization = 11,
  TaxModeling = 12,
  TaxParameterReview = 13,
  TaxRefundIcmsSt = 14,
  TaxSocietario = 15,
  TaxStructuring = 16,
  Trabalhista = 17,
  ServicosJuridicos = 18,
  ElaboracaoDeLegalOpnion = 19,
}

const enum TipoListaChanceExito {
  Alta = 1,
  Media = 2,
  Baixa = 3,
}

const enum TipoEscritorio {
  SaoPaulo = 1,
  Campinas = 2,
  RibeiraoPreto = 3,
}

const enum TipoStatusPipeline {
  PropostaGanha = 1,
  PropostaGanhPendenteAssinatura = 2,
  PropostaAnalisePeloCliente = 3,
  PropostaPendenteEnvioCliente = 4,
  ProspeccaoNaoIniciada = 5,
  ProspeccaoEmAndamento = 6,
  OverrunNegociacao = 7,
  PropostaPerdida = 8,
  ProjetoCobravel = 9,
}

const enum TipoListaTeseJuridico {
  TeseJuridicoTributario = 1,
}

const enum TipoAcaoFollowUp {
  ReuniaoAgendada = 1,
  FechamentoAcordo,
}

const enum TipoFormaCobranca {
  SuccessFees = 1,
  HorasIncorridas,
  ConsultoriaPermanente,
}

const enum TipoEmpresa {
  RVCConsultores = 1,
  RVCAdvogados = 2,
}

const enum CodigoEmpresa {
  RVCConsultores = 3349,
  RVCAdvogados = 3350,
}
const enum TipoImpostos {
  COFINS = 'COFINS',
  CSLL = 'CSLL',
  IRRF = 'IRRF',
  PIS = 'PIS',
  ISS = 'ISS',
}

const enum TipoListaFeriado {
  Emenda = 1,
  Feriado = 2,
}

const enum StatusAprovacao {
  EmAnalise = 1,
  Aprovada,
  Negada,
  AprovadaAutomatico,
  ConflitoTreinamento,
  ConflitoProgramacao,
  Cancelada,
  PreAprovada,
}

const enum TipoAprovacao {
  Ferias = 1,
  AtestadosLicenca,
  PrestacaoContas,
  Transferencias,
  Apontamentos,
  HorasExtras,
  Descanso,
}

const enum TipoApontamento {
  Diario = 1,
  Semanal,
  Mensal,
}

const enum TiposApontamentoProjeto {
  Encerrado = 1,
  Bloqueado,
  AtivoParaDebito,
}

const enum TipoProjeto {
  Cobravel = 1,
  GOP,
  Administrativo,
}

const enum TipoSiglaTipos {
  ADM = 1,
  DP,
  LC,
  RH,
  TI,
  TT,
  RS,
  D,
  T,
  CMX,
  IT,
  LABOR,
  LEGAL,
}

const enum TipoClassificacaoProjetosAdmin {
  FerramentaInterna = 1,
  FerramentaCliente,
  Treinamento,
  NaoCobravel,
  Ferias,
}

const enum TipoRemuneracao {
  ValorFixo = 1,
  Percentagem,
}

const enum TipoNotificacao {
  Todos = 1,
  Individual,
}

const enum StatusNotificacao {
  Lida = 1,
  NaoLida = 2,
}

const enum TipoPipeline {
  Consultorias = 1,
  Legal,
  HorasIncorridas,
  SuccessFees,
  Perdidas,
}

const enum CriticidadeNotificacao {
  Alta = 1,
  Media,
  Baixa,
}

const enum TipoConsultaProgramacao {
  MinhaEquipe = 1,
  MeusProjetos,
}

const enum TipoStatusProgramacao {
  Disponivel = 1,
  Programado,
}

const enum TipoSolicitacao {
  ApontamentoHoras = 1,
  TransferenciaHoras,
}

const enum Roles {
  Admin = 1,
  Administrativo,
  Financeiro,
  Gerente,
  Legal,
  Rh,
  Socio,
  SocioRh,
  Staff,
  Treinamento,
  DepartamentoPessoal,
  SocioFinanceiro,
  SocioCEO,
  ResponsavelProgramacao,
  SocioTreinamento,
}

const enum TipoOriginadorVendedor {
  Vendedor = 1,
  Originador1,
  Originador2,
}

const PerfilTipos = [
  { codigo: 1, nome: 'Admin' },
  { codigo: 2, nome: 'Administrativo' },
  { codigo: 3, nome: 'Financeiro' },
  { codigo: 4, nome: 'Gerente' },
  { codigo: 5, nome: 'Legal' },
  { codigo: 6, nome: 'Rh' },
  { codigo: 7, nome: 'Socio' },
  { codigo: 8, nome: 'SocioRh' },
  { codigo: 9, nome: 'Staff' },
  { codigo: 10, nome: 'Treinamento' },
  { codigo: 11, nome: 'DepartamentoPessoal' },
  { codigo: 12, nome: 'SocioFinanceiro' },
  { codigo: 13, nome: 'SocioCEO' },
  { codigo: 14, nome: 'ResponsavelProgramacao' },
  { codigo: 15, nome: 'SocioTreinamento' },
];

const ProjetosTipos = [
  { codigo: 1, nome: 'Projetos Cobráveis' },
  { codigo: 2, nome: 'Projetos GOP (Pipeline)' },
  { codigo: 3, nome: 'Projetos Administrativos' },
];

const AvaliadoresAvaliacoes = [
  { codigo: 1, nome: 'AvaliadorAdicional' },
  { codigo: 2, nome: 'AvaliadorPrincipal' },
  { codigo: 3, nome: 'Coach' },
  { codigo: 4, nome: 'Rh' },
];

const ComplexidadesAvaliacoes = [
  { codigo: 1, nome: 'Alta' },
  { codigo: 2, nome: 'Média' },
  { codigo: 3, nome: 'Baixa' },
];

const VinculoTipos = [
  { codigo: 1, nome: 'CLT' },
  { codigo: 2, nome: 'Estagiário' },
  { codigo: 3, nome: 'Sócio' },
  { codigo: 4, nome: 'Terceiro' },
];

const PessoasTipos = [
  { codigo: 1, nome: 'Pessoa Física' },
  { codigo: 2, nome: 'Pessoa Jurídica' },
  { codigo: 3, nome: 'Estrangeiro' },
];

const StatusAvaliacoes = [
  { codigo: 1, nome: 'Em Aberto' },
  { codigo: 2, nome: 'Aguardando Aprovação' },
  { codigo: 3, nome: 'Aguardando Consolidação' },
  { codigo: 4, nome: 'Aguardando Moderation' },
  { codigo: 5, nome: 'Aprovado' },
];

const RatingAvaliacoes = [
  { codigo: 1, nome: '1 - Abaixo do esperado.' },
  { codigo: 2, nome: '2 - Dentro do esperado.' },
  { codigo: 3, nome: '3 - Acima do esperado.' },
];

const RatingAvaliacoesFinalizadaRH = [
  { codigo: 1, nome: '1 - Abaixo do esperado.' },
  { codigo: 2, nome: '2 - Dentro do esperado.' },
  { codigo: 3, nome: '2 - Dentro do esperado.' },
  { codigo: 4, nome: '2 - Dentro do esperado.' },
  { codigo: 5, nome: '3 - Acima do esperado.' },
  { codigo: 6, nome: '3 - Acima do esperado.' },
  { codigo: 7, nome: '3 - Acima do esperado.' },
];

const ClassificaoClientes = [
  { codigo: 1, nome: 'Prioritário' },
  { codigo: 2, nome: 'Regular' },
  { codigo: 3, nome: 'Estratégico' },
];

const Racas = [
  { codigo: 1, nome: 'Branco' },
  { codigo: 2, nome: 'Preto' },
  { codigo: 3, nome: 'Pardo' },
  { codigo: 4, nome: 'Amarelo' },
  { codigo: 5, nome: 'Indígena' },
];

const Idiomas = [
  { codigo: 1, nome: 'Inglês' },
  { codigo: 2, nome: 'Espanhol' },
  { codigo: 3, nome: 'Francês' },
  { codigo: 4, nome: 'Mandarim' },
  { codigo: 5, nome: 'Italiano' },
  { codigo: 6, nome: 'Outro' },
];

const IdentidadeGeneros = [
  { codigo: 1, nome: 'Transgênero Masculino' },
  { codigo: 2, nome: 'Transgênero Feminino' },
  { codigo: 3, nome: 'Cisgênero Masculino' },
  { codigo: 4, nome: 'Cisgênero Feminino' },
  { codigo: 5, nome: 'Não Binário' },
];

const EstadoCivis = [
  { codigo: 1, nome: 'Solteiro' },
  { codigo: 2, nome: 'Casado' },
  { codigo: 3, nome: 'Divorciado' },
  { codigo: 4, nome: 'Viúvo' },
  { codigo: 5, nome: 'União Estável' },
];
const Dependentes = [
  { codigo: 1, nome: 'Filho(a)' },
  { codigo: 2, nome: 'Cônjuge' },
  { codigo: 3, nome: 'Pai' },
  { codigo: 4, nome: 'Mãe' },
];

const Escolaridades = [
  { codigo: 1, nome: 'Educação Infantil' },
  { codigo: 2, nome: 'Ensino Fundamental' },
  { codigo: 3, nome: 'Ensino Médio' },
  { codigo: 4, nome: 'Ensino Superior' },
  { codigo: 5, nome: 'Pós Graduação' },
  { codigo: 6, nome: 'Mestrado' },
  { codigo: 7, nome: 'Doutorado' },
];

const Formacoes = [
  { codigo: 1, nome: 'Bacharelado' },
  { codigo: 2, nome: 'Licenciatura' },
  { codigo: 3, nome: 'Tecnólogo' },
  { codigo: 4, nome: 'Sequencial Formação Específica' },
  { codigo: 5, nome: 'Sequencial Complementação Estudos' },
  { codigo: 6, nome: 'Graduação Modulada' },
  { codigo: 7, nome: 'Educação A Distância' },
  { codigo: 8, nome: 'Mestrado' },
  { codigo: 9, nome: 'Doutorado' },
  { codigo: 10, nome: 'Pós Graduação/MBA' },
];

const Documentos = [
  { codigo: 1, nome: 'Foto 3x4' },
  { codigo: 2, nome: 'Carteira de Trabalho' },
  { codigo: 3, nome: 'RG' },
  { codigo: 4, nome: 'CPF' },
  { codigo: 5, nome: 'Comprovante de Residência' },
  { codigo: 6, nome: 'Carteira de Habilitacao' },
  { codigo: 7, nome: 'PIS' },
  { codigo: 8, nome: 'Titulo de Eleitor' },
  { codigo: 9, nome: 'Dados Bancários' },
  { codigo: 10, nome: 'Certidão Casamento' },
  { codigo: 11, nome: 'Certidão Nascimento' },
  { codigo: 12, nome: 'Documentos Conjuge' },
  { codigo: 13, nome: 'Certidão Nasc. Filhos' },
  { codigo: 14, nome: 'Carteira de Vacina' },
  { codigo: 15, nome: 'Exame Admissional' },
  { codigo: 16, nome: 'Declaração Matrícula' },
  { codigo: 17, nome: 'Formulário Plano de Saúde' },
  { codigo: 18, nome: 'Formulário Seguro de Vida' },
  { codigo: 19, nome: 'Atestados ou Licenças' },
  { codigo: 20, nome: 'Comprovantes' },
  { codigo: 21, nome: 'Arquivos de Remessa' },
  { codigo: 22, nome: 'Anexo Notificacao' },
  { codigo: 23, nome: 'Cin' },
];

const StatusCurso = [
  { codigo: 1, nome: 'Completo' },
  { codigo: 2, nome: 'Cursando' },
  { codigo: 3, nome: 'Outro' },
];

const NiveisIdiomas = [
  { codigo: 1, nome: 'Fluente' },
  { codigo: 2, nome: 'Iniciando' },
  { codigo: 3, nome: 'Intermediario' },
  { codigo: 4, nome: 'Outro' },
];

const Servicos = [
  { codigo: 1, nome: 'COMEX Credit Recover' },
  { codigo: 2, nome: 'Due Diligence' },
  { codigo: 3, nome: 'Funding' },
  { codigo: 4, nome: 'ICMS/IPI Credit Recover' },
  { codigo: 5, nome: 'Lei da informática' },
  { codigo: 6, nome: 'Lei do bem' },
  { codigo: 7, nome: 'Levantamento de Créditos' },
  { codigo: 8, nome: 'PIS/CONFINS Credit Recover' },
  { codigo: 9, nome: 'Rota 2030' },
  { codigo: 10, nome: 'Site Location' },
  { codigo: 11, nome: 'Special Taxation Regime' },
  { codigo: 12, nome: 'Staff Loan' },
  { codigo: 13, nome: 'Tax Compliance' },
  { codigo: 14, nome: 'Tax Consulting' },
  { codigo: 15, nome: 'Tax Credit Accumulation' },
  { codigo: 16, nome: 'Tax Credit Monetization' },
  { codigo: 17, nome: 'Tax Modeling' },
  { codigo: 18, nome: 'Tax Parameter Review' },
  { codigo: 19, nome: 'Tax Refund ICMS/ST' },
  { codigo: 20, nome: 'Tax Societário' },
  { codigo: 21, nome: 'Tax Structuring' },
  { codigo: 22, nome: 'Trabalhista' },
];

const ServicosLegal = [
  { codigo: 23, nome: 'Legal - Consultoria' },
  { codigo: 24, nome: 'Legal - Defesa de Processo Administrativo' },
  { codigo: 25, nome: 'Legal - Elaboração de Legal Opinion / Parecer' },
  { codigo: 26, nome: 'Legal - Propositura de Ação Judicial (AO)' },
  { codigo: 27, nome: 'Legal - Propositura de Ação Judicial (MS)' },
  { codigo: 28, nome: 'Legal - Serviços Jurídicos' },
  ...Servicos,
];

const ChancesExito = [
  { codigo: 1, nome: 'Alta' },
  { codigo: 2, nome: 'Média' },
  { codigo: 3, nome: 'Baixa' },
];

const StatusPipeline = [
  { codigo: 1, nome: 'Proposta Ganha' },
  { codigo: 2, nome: 'Proposta Ganha - Pendente a assinatura' },
  { codigo: 3, nome: 'Proposta em análise pelo cliente' },
  { codigo: 4, nome: 'Proposta pendente de envio ao cliente' },
  { codigo: 5, nome: 'Prospecção não iniciada' },
  { codigo: 6, nome: 'Prospecção em andamento' },
  { codigo: 7, nome: 'Overun em negociação' },
  { codigo: 8, nome: 'Proposta Perdida' },
  { codigo: 9, nome: 'Projeto Cobrável' },
];

const MesesAnoNomes = [
  { codigo: 1, nome: 'Janeiro' },
  { codigo: 2, nome: 'Fevereiro' },
  { codigo: 3, nome: 'Março' },
  { codigo: 4, nome: 'Abril' },
  { codigo: 5, nome: 'Maio' },
  { codigo: 6, nome: 'Junho' },
  { codigo: 7, nome: 'Julho' },
  { codigo: 8, nome: 'Agosto' },
  { codigo: 9, nome: 'Setembro' },
  { codigo: 10, nome: 'Outubro' },
  { codigo: 11, nome: 'Novembro' },
  { codigo: 12, nome: 'Dezembro' },
];

const DiasSemanaNomes = [
  { codigo: 1, nome: 'Domingo' },
  { codigo: 2, nome: 'Segunda-Feira' },
  { codigo: 3, nome: 'Terça-Feira' },
  { codigo: 4, nome: 'Quarta-Feira' },
  { codigo: 5, nome: 'Quinta-Feira' },
  { codigo: 6, nome: 'Sexta-Feira' },
  { codigo: 7, nome: 'Sábado' },
];

const DespesasTipos = [
  { codigo: 1, nome: 'Táxi/Uber' },
  { codigo: 2, nome: 'Transporte próprio (R$ 1,45/km)' },
  { codigo: 3, nome: 'Aluguel de carro' },
  { codigo: 4, nome: 'Estacionamento' },
  { codigo: 5, nome: 'Pedágio' },
  { codigo: 6, nome: 'Hospedagem' },
  { codigo: 7, nome: 'Café da manhã' },
  { codigo: 8, nome: 'Almoço' },
  { codigo: 9, nome: 'Jantar' },
  { codigo: 10, nome: 'Telefonema' },
  { codigo: 11, nome: 'Passagem aérea' },
  { codigo: 12, nome: 'Outros' },
  { codigo: 13, nome: 'Graduação' },
  { codigo: 14, nome: 'Pós-Graduação' },
  { codigo: 15, nome: 'OAB' },
  { codigo: 16, nome: 'Diversidade e Inclusão' },
  { codigo: 17, nome: 'CRC' },
  { codigo: 18, nome: 'Terceiros' },
  { codigo: 19, nome: 'Idiomas' },
  { codigo: 20, nome: 'Condução' },
];

const ListaTeseJuridico = [{ codigo: 1, nome: 'Tese Jurídico-Tributario' }];

const NumeroParcelas = [
  { codigo: 1, nome: '1' },
  { codigo: 2, nome: '2' },
  { codigo: 3, nome: '3' },
  { codigo: 4, nome: '4' },
  { codigo: 5, nome: '5' },
  { codigo: 6, nome: '6' },
  { codigo: 7, nome: '7' },
  { codigo: 8, nome: '8' },
  { codigo: 9, nome: '9' },
  { codigo: 10, nome: '10' },
  { codigo: 11, nome: '11' },
  { codigo: 12, nome: '12' },
];

const FormaRemuneracoes = [
  { codigo: 1, nome: 'Valor Fixo' },
  { codigo: 2, nome: 'Porcentagem' },
];

const FormaCobrancas = [
  { codigo: 1, nome: 'Success Fees' },
  { codigo: 2, nome: 'Horas Incorridas' },
  { codigo: 3, nome: 'Consultoria Permanente' },
];

const FollowUpAcoes = [
  { codigo: 1, nome: 'Reunião Agendada' },
  { codigo: 2, nome: 'Fechamento de Acordo' },
];

const FeriadoTipos = [
  { codigo: 1, nome: 'Emenda' },
  { codigo: 2, nome: 'Feriado' },
];

const AprovacaoTipos = [
  { codigo: 1, nome: 'EmAnalise', visivel: true },
  { codigo: 2, nome: 'Aprovada', visivel: false },
  { codigo: 3, nome: 'Negada', visivel: false },
  { codigo: 4, nome: 'AprovadaAutomatico', visivel: false },
  { codigo: 5, nome: 'ConflitoTreinamento', visivel: true },
  { codigo: 6, nome: 'ConflitoProgramacao', visivel: true },
  { codigo: 7, nome: 'Cancelada', visivel: true },
  { codigo: 8, nome: 'PreAprovada', visivel: true },
];

const AprovacaoTiposSolicitacao = [
  { codigo: 1, nome: 'Férias' },
  { codigo: 2, nome: 'Atestado e Licença' },
  { codigo: 3, nome: 'Prestacao de Contas' },
  { codigo: 4, nome: 'Transferência' },
  { codigo: 5, nome: 'Apontamentos' },
  { codigo: 6, nome: 'Horas Extras' },
  { codigo: 7, nome: 'Descanso' },
];

const SiglaTipos = [
  { codigo: 1, nome: 'ADM' },
  { codigo: 2, nome: 'DP' },
  { codigo: 3, nome: 'LC' },
  { codigo: 4, nome: 'RH' },
  { codigo: 5, nome: 'TI' },
  { codigo: 6, nome: 'TT' },
  { codigo: 7, nome: 'RS' },
  { codigo: 8, nome: 'D&I' },
  { codigo: 9, nome: 'T&D' },
  { codigo: 10, nome: 'CMX' },
  { codigo: 11, nome: 'IT' },
  { codigo: 12, nome: 'LABOR' },
  { codigo: 13, nome: 'LEGAL' },
];

const ClassificacaoProjetosAdmin = [
  { codigo: 1, nome: 'Ferramenta Corporativa' },
  { codigo: 2, nome: 'Ferramenta de Cliente' },
  { codigo: 3, nome: 'Treinamento' },
  { codigo: 4, nome: 'Não Cobrável' },
  { codigo: 5, nome: 'Férias' },
];

const StatusApontamento = [
  { codigo: 1, nome: 'Encerrado' },
  { codigo: 2, nome: 'Bloqueado' },
  { codigo: 3, nome: 'Ativo para débito' },
];

const EmpresaTipos = [
  { codigo: 1, nome: 'RVC Consultores' },
  { codigo: 2, nome: 'RVC Advogados' },
];

const NotificacaoTipo = [
  { codigo: 1, nome: 'Todos' },
  { codigo: 2, nome: 'Individual' },
];

const NotificacaoStatus = [
  { codigo: 1, nome: 'Lida' },
  { codigo: 2, nome: 'Não Lida' },
];

const NotificacaoCriticidade = [
  { codigo: 1, nome: 'Alta' },
  { codigo: 2, nome: 'Média' },
  { codigo: 3, nome: 'Baixa' },
];

const MotivoDesligamentos = [
  { codigo: 1, nome: 'Involuntário - Relacionamento' },
  { codigo: 2, nome: 'Involuntário - Baixa performance' },
  { codigo: 3, nome: 'Voluntário - Remuneração mais vantajosa' },
  { codigo: 4, nome: 'Voluntário - Insatisfação com a RVC' },
  { codigo: 5, nome: 'Voluntário - Motivos pessoais' },
  { codigo: 6, nome: 'Voluntário - Redirecionamento de carreira' },
];

const HorariosNormais = [
  { codigo: 1, valor: '00:30', decimal: 0.5 },
  { codigo: 2, valor: '01:00', decimal: 1.0 },
  { codigo: 3, valor: '01:30', decimal: 1.5 },
  { codigo: 4, valor: '02:00', decimal: 2.0 },
  { codigo: 5, valor: '02:30', decimal: 2.5 },
  { codigo: 6, valor: '03:00', decimal: 3.0 },
  { codigo: 7, valor: '03:30', decimal: 3.5 },
  { codigo: 8, valor: '04:00', decimal: 4.0 },
  { codigo: 9, valor: '04:30', decimal: 4.5 },
  { codigo: 10, valor: '05:00', decimal: 5.0 },
  { codigo: 11, valor: '05:30', decimal: 5.5 },
  { codigo: 12, valor: '06:00', decimal: 6.0 },
  { codigo: 13, valor: '06:30', decimal: 6.5 },
  { codigo: 14, valor: '07:00', decimal: 7.0 },
  { codigo: 15, valor: '07:30', decimal: 7.5 },
  { codigo: 16, valor: '08:00', decimal: 8.0 },
];

const HorariosNormaisEstagio = [
  { codigo: 1, valor: '00:30', decimal: 0.5 },
  { codigo: 2, valor: '01:00', decimal: 1.0 },
  { codigo: 3, valor: '01:30', decimal: 1.5 },
  { codigo: 4, valor: '02:00', decimal: 2.0 },
  { codigo: 5, valor: '02:30', decimal: 2.5 },
  { codigo: 6, valor: '03:00', decimal: 3.0 },
  { codigo: 7, valor: '03:30', decimal: 3.5 },
  { codigo: 8, valor: '04:00', decimal: 4.0 },
  { codigo: 9, valor: '04:30', decimal: 4.5 },
  { codigo: 10, valor: '05:00', decimal: 5.0 },
  { codigo: 11, valor: '05:30', decimal: 5.5 },
  { codigo: 12, valor: '06:00', decimal: 6.0 },
];

const HorariosNormaisJovemAprendiz = [
  { codigo: 1, valor: '00:30', decimal: 0.5 },
  { codigo: 2, valor: '01:00', decimal: 1.0 },
  { codigo: 3, valor: '01:30', decimal: 1.5 },
  { codigo: 4, valor: '02:00', decimal: 2.0 },
  { codigo: 5, valor: '02:30', decimal: 2.5 },
  { codigo: 6, valor: '03:00', decimal: 3.0 },
  { codigo: 7, valor: '03:30', decimal: 3.5 },
  { codigo: 8, valor: '04:00', decimal: 4.0 },
];

const HorariosExtras = [
  { codigo: 1, valor: '00:30', decimal: 0.5 },
  { codigo: 2, valor: '01:00', decimal: 1.0 },
  { codigo: 3, valor: '01:30', decimal: 1.5 },
  { codigo: 4, valor: '02:00', decimal: 2.0 },
];

const HorariosExtrasCompensacao = [
  { codigo: 1, valor: '00:30', decimal: 0.5 },
  { codigo: 2, valor: '01:00', decimal: 1.0 },
];

const ConsultaProgramacao = [
  { codigo: 1, nome: 'Minha Equipe' },
  { codigo: 2, nome: 'Meus Projetos' },
];

const StatusProgramacao = [
  { codigo: 1, nome: 'Disponível' },
  { codigo: 2, nome: 'Programado' },
];

const ListaSocioParticipacao = [
  { codigo: 1, nome: 'Sócio 1' },
  { codigo: 2, nome: 'Sócio 2' },
  { codigo: 3, nome: 'Sócio 3' },
];

const OptionProjAdmPrestacaoContas: ModelSelect[] = [
  { value: '0025', label: '0025 - PROJETOS NÃO COBRÁVEIS' },
];

const formatter = (value: number) => {
  return value?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const mascara = (value: any) => {
  let mascara = mask(value, [
    '99999',
    '9.99999',
    '99.99999',
    '999.99999',
    '9.999.99999',
    '99.999.99999',
    '999.999.99999',
  ]);

  if (mascara.length === 3) {
    let int = mascara.substring(0, 1);
    let decimals = mascara.substring(1);
    mascara = `${int},${decimals}`;
  }

  if (mascara.length > 3) {
    mascara = mascara.replace(',', '');
    let int = mascara.substring(0, mascara.length - 2);
    let decimals = mascara.substring(mascara.length - 2);
    let valor = `${int},${decimals}`;

    if (decimals === '00') {
      valor = valor.replace('.', '');

      if (valor.length > 6) {
        valor = valor.replace('.', '');
        let intPrimeiroPonto = valor.substring(0, valor.length - 6);
        let decimalsPrimeiroPonto = valor.substring(valor.length - 6);
        valor = `${intPrimeiroPonto}.${decimalsPrimeiroPonto}`;
      }

      if (valor.length > 10) {
        let intPrimeiroPonto = valor.substring(0, valor.length - 10);
        let decimalsPrimeiroPonto = valor.substring(valor.length - 10);
        valor = `${intPrimeiroPonto}.${decimalsPrimeiroPonto}`;
      }
    }
    return valor;
  }
  return mascara;
};

const mascaraParaPorcentagem = (value: any) => {
  let mascara = mask(value, ['99999']);

  if (mascara.length === 3) {
    let int = mascara.substring(0, 1);
    let decimals = mascara.substring(1);
    mascara = `${int},${decimals}`;
  }

  if (mascara.length > 3) {
    mascara = mascara.replace(',', '');
    let int = mascara.substring(0, mascara.length - 2);
    let decimals = mascara.substring(mascara.length - 2);
    let valor = `${int},${decimals}`;

    if (decimals === '00') {
      valor = valor.replace('.', '');

      if (valor.length > 6) {
        valor = valor.replace('.', '');
        let intPrimeiroPonto = valor.substring(0, valor.length - 6);
        let decimalsPrimeiroPonto = valor.substring(valor.length - 6);
        valor = `${intPrimeiroPonto}.${decimalsPrimeiroPonto}`;
      }

      if (valor.length > 10) {
        let intPrimeiroPonto = valor.substring(0, valor.length - 10);
        let decimalsPrimeiroPonto = valor.substring(valor.length - 10);
        valor = `${intPrimeiroPonto}.${decimalsPrimeiroPonto}`;
      }
    }
    return valor;
  }
  return mascara;
};

const obterNumeros = (value: string) => value.match(/\d/g)!.join('');

const parseDecimal = (value: number) =>
  value.toString().replace('.', '').replace(',', '.');

const formatarValorAposMascara = (value: string) => {
  value = unMask(value);
  if (value.length > 2) {
    value = value.replace(',', '.');
    if (value.length > 3) {
      let int = value.substring(0, value.length - 2);
      let decimals = value.substring(value.length - 2);
      let valor = `${int}.${decimals}`;
      return valor;
    }

    if (value.length === 3) {
      let int = value.substring(0, 1);
      let decimals = value.substring(1);
      let valor = `${int}.${decimals}`;
      return valor;
    }

    if (value.length === 4) {
      let int = value.substring(0, 2);
      let decimals = value.substring(2);
      let valor = `${int}.${decimals}`;
      return valor;
    }
  }

  return `${value}`;
};

const formatarValorParaMascara = (value: string) => {
  value = `${value}`;
  if (value !== undefined) {
    let valorSemPrefixo = Number.isInteger(Number(value))
      ? ''
      : value.replace('.', '');

    if (valorSemPrefixo.length === 3) {
      let int = value.substring(0, 1);
      let decimals = value.substring(1);
      let valor = `${int}${decimals}`;
      return valor;
    }

    if (valorSemPrefixo.length > 3) {
      let valor = Number(value).toFixed(2).replace('.', '');
      return `${valor}`;
    }

    return value;
  } else {
    return '';
  }
};

const ToastMessageAlert = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 6000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const handleOrdenarListaSeed = (listaParaOrdenar: any[]) => {
  let listaOrdenada = [...listaParaOrdenar];

  listaOrdenada.sort((a, b) => {
    const nameA = a.nome?.toLowerCase()!;
    const nameB = b.nome?.toLowerCase()!;
    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  return listaOrdenada;
};

const handleMontarArraySelectRegistroModel = (modelProps: RegistroModel[]) => {
  let model: ModelSelect[] = [];

  modelProps.map((lista) => {
    let variavelOptionsMap: ModelSelect = {
      value: lista.codigo!.toString(),
      label: lista?.nome!,
    };
    model.push(variavelOptionsMap);
  });

  return model;
};

const loadYears = (endYear: number) => {
  const options: number[] = [];

  for (let year = endYear; year >= 2021; year--) {
    options.push(year);
  }

  return options;
};

export {
  TipoContrato,
  TipoPessoa,
  TipoComplexidade,
  TipoStatusAvaliacao,
  TipoComentarios,
  TipoAvaliador,
  TipoIdentidadeGenero,
  TipoEstadoCivil,
  TipoEscolaridade,
  TipoFormacao,
  TipoStatusCurso,
  TipoNivel,
  TipoRaca,
  TipoIdioma,
  TipoDocumentoUpload,
  TipoPerfil,
  TipoFormaCobranca,
  TipoListaServico,
  TipoListaChanceExito,
  TipoEscritorio,
  TipoStatusPipeline,
  TipoListaTeseJuridico,
  TipoAcaoFollowUp,
  TipoEmpresa,
  TipoImpostos,
  TipoListaFeriado,
  StatusAprovacao,
  TipoAprovacao,
  TipoAprovacaoSolicitacao,
  TipoApontamento,
  TipoProjeto,
  TipoSiglaTipos,
  TipoClassificacaoProjetosAdmin,
  TipoRemuneracao,
  TiposApontamentoProjeto,
  TipoNotificacao,
  TipoPipeline,
  TipoCriacaoAvaliacao,
  StatusNotificacao,
  CriticidadeNotificacao,
  TipoConsultaProgramacao,
  TipoStatusProgramacao,
  TipoSolicitacao,
  TipoOrigemApontamento,
  Roles,
  TipoOriginadorVendedor,
  CodigoEmpresa,
  TipoDependentes,
  PerfilTipos,
  Racas,
  VinculoTipos,
  PessoasTipos,
  ComplexidadesAvaliacoes,
  StatusAvaliacoes,
  AvaliadoresAvaliacoes,
  RatingAvaliacoes,
  RatingAvaliacoesFinalizadaRH,
  Idiomas,
  NiveisIdiomas,
  StatusCurso,
  Formacoes,
  Escolaridades,
  EstadoCivis,
  IdentidadeGeneros,
  ClassificaoClientes,
  Documentos,
  FormaCobrancas,
  Servicos,
  ServicosLegal,
  ChancesExito,
  StatusPipeline,
  ListaTeseJuridico,
  NumeroParcelas,
  FormaRemuneracoes,
  FollowUpAcoes,
  FeriadoTipos,
  AprovacaoTipos,
  ProjetosTipos,
  ToastMessageAlert,
  SiglaTipos,
  ClassificacaoProjetosAdmin,
  MesesAnoNomes,
  StatusApontamento,
  EmpresaTipos,
  NotificacaoTipo,
  NotificacaoStatus,
  NotificacaoCriticidade,
  MotivoDesligamentos,
  HorariosNormais,
  HorariosNormaisEstagio,
  HorariosNormaisJovemAprendiz,
  HorariosExtras,
  HorariosExtrasCompensacao,
  ConsultaProgramacao,
  DiasSemanaNomes,
  DespesasTipos,
  StatusProgramacao,
  AprovacaoTiposSolicitacao,
  ListaSocioParticipacao,
  OptionProjAdmPrestacaoContas,
  Dependentes,
  formatter,
  mascara,
  mascaraParaPorcentagem,
  parseDecimal,
  formatarValorParaMascara,
  formatarValorAposMascara,
  obterNumeros,
  handleOrdenarListaSeed,
  handleMontarArraySelectRegistroModel,
  loadYears,
};
