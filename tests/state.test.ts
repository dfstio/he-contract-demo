import { describe, expect, it } from "@jest/globals";
import { initBlockchain, accountBalanceMina, sleep } from "zkcloudworker";
import { Field, PublicKey, fetchAccount, Mina } from "o1js";
import { EncryptedValue, SecureMultiplication } from "../src/contract";
import { decrypt } from "../src/he";

describe("Calculate the product using api", () => {
  let sk = Field.fromJSON(
    "3404594142577636973266388389713282759042060039560572020818253215122249612915"
  );
  let address = "B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2";

  it("should get initial value", async () => {
    initBlockchain("berkeley");
    const publicKey = PublicKey.fromBase58(address);
    const balance = await accountBalanceMina(publicKey);
    console.log("balance", balance);
    await fetchMinaAccount(address);
    const zkApp = new SecureMultiplication(publicKey);
    const result: EncryptedValue = zkApp.value.get();
    const decrypted = decrypt(result, sk);
    console.log("initial value:", decrypted.toJSON());
  });
});

async function fetchMinaAccount(address: string) {
  const timeout = 1000 * 60 * 5; // 5 minutes
  const startTime = Date.now();
  let result = { account: undefined };
  while (Date.now() - startTime < timeout) {
    try {
      const result = await fetchAccount({
        publicKey: address,
      });
      if (result.account !== undefined) return result;
      console.error("Cannot fetch account", address, result);
    } catch (error) {
      console.error("Error in fetchAccount:", error);
    }
    await sleep(1000 * 10);
  }
  console.error("Timeout in fetchAccount");
  return result;
}
