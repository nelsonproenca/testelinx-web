const impostoEmpresa1: number = 0.0865;
const impostoEmpresa2: number = 0.0365;

const calcularValoresFullScale = (
  totalVenda: number,
  codigoEmpresa: number,
  feesParceiro: number = 0,
  quantidadeHoras: number = 0,
  totalCusto: number = 0,
  valorOutros: number = 0
) => {
  let valorVendaBruto = Number(
    totalVenda / (1 - (codigoEmpresa === 2 ? impostoEmpresa2 : impostoEmpresa1))
  );

  valorVendaBruto -= valorOutros;

  const valorVendaLiquido = Number(
    valorVendaBruto *
      (1 - (codigoEmpresa === 2 ? impostoEmpresa2 : impostoEmpresa1))
  );

  const feesRVCBruto = Number(valorVendaBruto - feesParceiro);

  const feesRVCLiquido = Number(valorVendaLiquido - feesParceiro);

  const valorTaxa =
    quantidadeHoras === 0 ? 0 : Number(feesRVCLiquido / quantidadeHoras);

  const valorMargemPrimaria =
    feesRVCLiquido === 0 ? 0 : Number((1 - totalCusto / feesRVCLiquido) * 100);

  return {
    valorVendaBruto,
    valorVendaLiquido,
    feesRVCBruto,
    feesRVCLiquido,
    valorTaxa,
    valorMargemPrimaria,
  };
};

const calculoValorParceiro = (
  valorVendaBruto: number,
  percentualParceiro: number,
  cargaTributariaEmpresa: number,
  valorOutros: number
) => {
  const valorTributos = (valorVendaBruto / 100) * cargaTributariaEmpresa;
  const valorLiquido = valorVendaBruto - valorTributos - valorOutros;
  const valorDividendoParceiro = (valorLiquido / 100) * percentualParceiro;

  return Number(valorDividendoParceiro);
};

const calculoValorLiquido = (
  valorVendaBruto: number,
  cargaTributariaEmpresa: number
) => {
  const valorTributos = (valorVendaBruto / 100) * cargaTributariaEmpresa;
  const valorLiquido = valorVendaBruto - valorTributos;
  return Number(valorLiquido);
};

const calculoDiferencaHistorico = (
  valorVendaLiquidoUltimo: number,
  valorVendaLiquidoAtual: number
) => {
  const diferencaValorLiquido =
    valorVendaLiquidoAtual - valorVendaLiquidoUltimo;

  return Number(diferencaValorLiquido);
};

export {
  calculoValorParceiro,
  calcularValoresFullScale,
  calculoValorLiquido,
  calculoDiferencaHistorico,
};
