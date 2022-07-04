import { baseRequest } from "@/utils/cartRequest";

export function getFlutterwaveKeys() {
  return baseRequest("get", "utils/fw-keys");
}
