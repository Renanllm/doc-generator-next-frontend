export const getUrlFromBase64 = async (base64) => {
  const base64Response = await fetch(`data:image/jpeg;base64,${base64}`);
  const blob = await base64Response.blob();

  const url = window.URL.createObjectURL(blob);
  return url;
};

export const downloadFile = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "contrato-de-aluguel-preenchido.docx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
