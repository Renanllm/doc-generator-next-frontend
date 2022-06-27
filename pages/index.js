import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import extenso from "extenso";
import moment from "moment";
import Head from "next/head";
import { useState } from "react";
import { api } from "../services/client";
import {
  defaultParamsValue,
  locators,
  propertyTypes,
  replacementsMock,
  templates,
} from "../utils/data";
import { downloadFile, getUrlFromBase64 } from "../utils/file";
import { getMonthName } from "../utils/months";

// TO-DO:
// valorAluguel = formatar valor pra real (colocar pipe)
// formatar campos lower cases, case capitalize (nome), entre outros...
// validação de campos obrigatórios (importante!) usar Formik

export default function Home() {
  const [template, setTemplate] = useState(0);
  const [profile, setProfile] = useState(0);
  const [form, setForm] = useState(defaultParamsValue);

  const buildPayload = () => {
    const check = moment(form.dataAssinatura, "YYYY/MM/DD");

    const day = check.format("DD");
    const month = check.format("M");
    const year = check.format("YYYY");

    const params = {
      ...locators[profile],
      ...form,
      valorAluguelExtenso: extenso(form?.valorAluguel || 0, {
        mode: "currency",
      }),
      diaAssinatura: day,
      mesAssinatura: getMonthName(month),
      anoAssinatura: year,
    };

    return {
      template: templates[template],
      params,
    };
  };

  const handleGenerateDocument = async () => {
    const response = await api.post("/generate", buildPayload());

    const base64File = response.data;
    const url = await getUrlFromBase64(base64File);

    downloadFile(url);
  };

  const handleChangeFormValue = (field, value) => {
    const newFormValue = { ...form };
    newFormValue[field] = value;

    setForm(newFormValue);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container sx={{ margin: "24px 0" }}>
        <Typography variant="h5" gutterBottom>
          Gerador de Documentos
        </Typography>

        <Typography variant="h6" sx={{ padding: "15px 0" }}>
          Selecionar modelo de documento:
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="template">Modelo de Documento</InputLabel>
          <Select
            labelId="template"
            id="template-input"
            value={template}
            label="Modelo de Documento"
            size="small"
            onChange={(e) => setTemplate(e.target.value)}
          >
            {templates.map((template, index) => (
              <MenuItem value={index} key={index}>
                {template}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ padding: "15px 0" }}>
          Selecionar perfil do locador:
        </Typography>

        <FormControl>
          <InputLabel id="profile">Locador(a)</InputLabel>
          <Select
            labelId="profile"
            id="profile-input"
            value={profile}
            label="Locador(a)"
            size="small"
            onChange={(e) => setProfile(e.target.value)}
          >
            {locators.map((locator, index) => (
              <MenuItem value={index} key={locator.cpfLocador}>
                {locator.nomeLocador}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ padding: "15px 0" }}>
          Dados do locatário:
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          <TextField
            required
            label="Nome"
            value={form?.nomeLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("nomeLocatario", e.target.value)
            }
          />

          <TextField
            required
            label="Nacionalidade"
            value={form?.nacionalidadeLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("nacionalidadeLocatario", e.target.value)
            }
          />

          <TextField
            required
            label="Estado civil"
            value={form?.estadoCivilLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("estadoCivilLocatario", e.target.value)
            }
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <TextField
            required
            label="Profissão"
            value={form?.profissaoLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("profissaoLocatario", e.target.value)
            }
          />

          <TextField
            required
            label="RG"
            value={form?.rgLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("rgLocatario", e.target.value)
            }
          />

          <TextField
            required
            label="CPF"
            value={form?.cpfLocatario}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("cpfLocatario", e.target.value)
            }
          />
        </Box>

        <Typography variant="h6" sx={{ padding: "15px 0" }}>
          Dados do imóvel:
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gap: "15px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="property-type">Tipo de imóvel</InputLabel>
            <Select
              labelId="property-type"
              id="property-type-input"
              value={form?.tipoImovel}
              label="Tipo de imóvel"
              size="small"
              onChange={(e) =>
                handleChangeFormValue("tipoImovel", e.target.value)
              }
            >
              {propertyTypes.map((type, index) => (
                <MenuItem value={type} key={index}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            required
            label="Endereço do imóvel"
            value={form?.enderecoImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("enderecoImovel", e.target.value)
            }
          />

          <TextField
            required
            label="Número"
            value={form?.numeroImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("numeroImovel", e.target.value)
            }
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <TextField
            required
            label="Bairro"
            value={form?.bairroImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("bairroImovel", e.target.value)
            }
          />

          <TextField
            required
            label="Cidade"
            value={form?.cidadeImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("cidadeImovel", e.target.value)
            }
          />

          <TextField
            required
            label="CEP"
            value={form?.cepImovel}
            size="small"
            onChange={(e) => handleChangeFormValue("cepImovel", e.target.value)}
          />
        </Box>

        <Box
          sx={{
            marginTop: "15px",
          }}
        >
          <TextField
            required
            fullWidth
            label="Finalidade do aluguel do imóvel"
            value={form?.finalidadeImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("finalidadeImovel", e.target.value)
            }
          />
        </Box>

        <Typography variant="h6" sx={{ padding: "15px 0" }}>
          Dados do contrato:
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          <TextField
            required
            label="Duração (meses)"
            value={form?.mesesLocacao}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("mesesLocacao", e.target.value)
            }
          />

          <TextField
            required
            label="Dia do pagamento"
            value={form?.diaPagamentoAluguel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("diaPagamentoAluguel", e.target.value)
            }
          />

          <TextField
            required
            label="Valor do aluguel (R$)"
            value={form?.valorAluguel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("valorAluguel", e.target.value)
            }
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "15px",
            marginTop: "15px",
          }}
        >
          <TextField
            required
            label="Itens p/ devolução na entrega do imóvel"
            value={form?.itensDevolucaoImovel}
            size="small"
            onChange={(e) =>
              handleChangeFormValue("itensDevolucaoImovel", e.target.value)
            }
          />

          <DesktopDatePicker
            label="Data da assinatura"
            inputFormat="DD/MM/yyyy"
            value={form?.dataAssinatura}
            onChange={(value) => handleChangeFormValue("dataAssinatura", value)}
            disableMaskedInput
            renderInput={(params) => (
              <TextField {...params} size="small" required />
            )}
          />
        </Box>

        <Box sx={{ padding: "24px 0" }}>
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            size="large"
            onClick={() => setForm(replacementsMock)}
          >
            Preencher dados
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerateDocument}
          >
            Gerar documento
          </Button>
        </Box>
      </Container>
    </>
  );
}
