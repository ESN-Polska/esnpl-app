import axios from "axios";

const API_KEY = "AIzaSyCdgPjocxnW-osbDmJsBoCiB5uVUty79FU";
const AGENDA_SHEETS_ID = "1ti9NVlr9dIpEn6_zEBsoeE1qsrSq7k_c_e4umP0Lv3Y";

const BE_SHEETS_ID = "1vlblH7pR2kxhAQuqWCAXCTbFj0CqiQtwC8z_zOsQ5FM";
const baseGoogleSheetsURL = "https://sheets.googleapis.com/v4/spreadsheets";

const createAgendaUrl = (sheetId: string): string => {
  return `${baseGoogleSheetsURL}/${AGENDA_SHEETS_ID}/values/'${sheetId}'!A1:L100?key=${API_KEY}`;
};

const createBeUrl = (sheetId: string): string => {
  return `${baseGoogleSheetsURL}/${BE_SHEETS_ID}/values/'${sheetId}'!A1:L100?key=${API_KEY}`;
};

const getAgenda = (): any => {
  const sheetIds = ["Piątek (11.12)", "Sobota (12.12)", "Niedziela (13.12)"];
  return Promise.all(sheetIds.map((sheetId: string) => axios.get(createAgendaUrl(sheetId))));
};

const getDocuments = (): any => {
  const documentsKey = "Documents";
  return axios.get(createBeUrl(documentsKey));
};

export const API = { getAgenda, getDocuments };

export default API;
