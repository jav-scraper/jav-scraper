import { getDmmUrl } from "./getDmmUrl";

export async function getDmm(id: string) {
  const DmmUrl = await getDmmUrl(id);
}
