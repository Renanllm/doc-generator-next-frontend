import moment from "moment";

const tenantData = {
  nomeLocatario: "Renan Luiz de Lima Medeiros",
  nacionalidadeLocatario: "brasileiro",
  estadoCivilLocatario: "solteiro",
  profissaoLocatario: "desenvolvedor de sistemas",
  rgLocatario: "3.84.910",
  cpfLocatario: "130.432.540-32",
};

const propertyData = {
  tipoImovel: "residencial",
  enderecoImovel: "Rua João Suassuna",
  numeroImovel: "1043",
  bairroImovel: "Alves Pinto",
  cidadeImovel: "Cuité",
  cepImovel: "58237-000",
  finalidadeImovel: "residencia familiar",
};

const contractData = {
  mesesLocacao: "12",
  valorAluguel: "547,00",
  valorAluguelExtenso: "quintenhos e quarenta e sete reais",
  diaPagamentoAluguel: "25",
  itensDevolucaoImovel: "cadeados e campainha",
  dataAssinatura: moment()
};

export const replacementsMock = {
  ...tenantData,
  ...propertyData,
  ...contractData,
};

export const defaultParamsValue = {
  nomeLocatario: "",
  nacionalidadeLocatario: "",
  estadoCivilLocatario: "",
  profissaoLocatario: "",
  rgLocatario: "",
  cpfLocatario: "",

  tipoImovel: "residencial",
  enderecoImovel: "",
  numeroImovel: "",
  bairroImovel: "",
  cidadeImovel: "",
  cepImovel: "",
  finalidadeImovel: "",

  mesesLocacao: "",
  valorAluguel: "",
  valorAluguelExtenso: "",
  diaPagamentoAluguel: "",
  itensDevolucaoImovel: "",
  dataAssinatura: moment(),
  diaAssinatura: "",
  mesAssinatura: "",
  anoAssinatura: "",
};

export const templates = ["modelo-de-contrato-de-aluguel"];

export const locators = [
  {
    nomeLocador: "Landstein Santos de Medeiros",
    nacionalidadeLocador: "brasileiro",
    estadoCivilLocador: "casado",
    profissaoLocador: "comerciante",
    rgLocador: "1.839.320",
    cpfLocador: "023.660.424-42",
    enderecoLocador: "Rua 31 de Março",
    numeroLocador: "241",
    bairroLocador: "Centro",
    cidadeLocador: "Nova Floresta",
    ufLocador: "PB",
    cepLocador: "58178-000",
  },
  {
    nomeLocador: "Adriana Maria de Lima Medeiros",
    nacionalidadeLocador: "brasileira",
    estadoCivilLocador: "casada",
    profissaoLocador: "comerciante",
    rgLocador: "1.928.360",
    cpfLocador: "024.109.514-06",
    enderecoLocador: "Rua 31 de Março",
    numeroLocador: "241",
    bairroLocador: "Centro",
    cidadeLocador: "Nova Floresta",
    ufLocador: "PB",
    cepLocador: "58178-000",
  },
];

export const propertyTypes = ["residencial", "comercial"];
