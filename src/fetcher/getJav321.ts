import { getJav321Url } from "./getJav321Url";
import { getJav321Data } from "./getJav321Data";

export async function getJav321(id: string) {
  const jav321Url = await getJav321Url(id);
  const jav321Data = await getJav321Data(jav321Url?.Url || null);
  return jav321Data;
}
