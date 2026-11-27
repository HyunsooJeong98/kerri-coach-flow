import { expect, test } from "bun:test";
import { CUSTOMER_SUPPORT_URL } from "./contact";

test("customer support opens the existing KERRI Kakao channel chat", () => {
  expect(CUSTOMER_SUPPORT_URL).toBe("https://pf.kakao.com/_CrxgwX/chat");
});