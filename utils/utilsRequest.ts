import { baseRequest } from "@/utils/cartRequest";

export function getFlutterwaveKeys(baseURL: string) {
  return baseRequest(baseURL, "get", "utils/fw-keys");
}
