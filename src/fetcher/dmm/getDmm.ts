import { getDmmUrl } from "./getDmmUrl";
import { getDmmData } from "./getDmmData";

export async function getDmm(id: string) {
  const dmmUrl = await getDmmUrl(id);
  const dmmData = await getDmmData(dmmUrl);
  return dmmData;
}
