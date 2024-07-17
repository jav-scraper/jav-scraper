import { getJavdbUrl } from "./getJavdbUrl";
import { getJavdbData } from "./getJavdbData";

export async function getJavdb(id: string) {
  const javdbUrl = await getJavdbUrl(id);
  const javdbData = await getJavdbData(javdbUrl?.Url || null);
  return javdbData;
}
