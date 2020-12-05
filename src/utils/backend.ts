import axios from "axios";

const API_KEY = "AIzaSyCdgPjocxnW-osbDmJsBoCiB5uVUty79FU";
const DOC_ID = "1NmsiN24sdP-Q4JS75mpPZ1EZGuaLf8plgoCHLwpUaZI";
const baseGoogleSheetsURL = "https://sheets.googleapis.com/v4/spreadsheets";

const agendaUrl = (sheetId: string): string => {
  return `${baseGoogleSheetsURL}/${DOC_ID}/values/'${sheetId}'!A1:L100?key=${API_KEY}`;
};

const getAgenda = (): any => {
  const sheetIds = ["Piątek (11.12)", "Sobota (12.12)", "Niedziela (13.12)"];
  return Promise.all(sheetIds.map((sheetId: string) => axios.get(agendaUrl(sheetId))));
};

export const API = { getAgenda };

export default API;
