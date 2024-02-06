import { describe, expect, it } from "@jest/globals";
import { initBlockchain, accountBalanceMina } from "zkcloudworker";
import { Field, PublicKey, checkZkappTransaction, fetchAccount } from "o1js";
import { EncryptedValue, SecureMultiplication } from "../src/contract";
import { encrypt, decrypt } from "../src/he";

describe("Calculate the product using api", () => {
  let sk = Field.fromJSON(
    "3404594142577636973266388389713282759042060039560572020818253215122249612915"
  );
  let address = "B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2";
  initBlockchain("berkeley");

  it("should get initial value", async () => {
    const publicKey = PublicKey.fromBase58(address);
    const balance = await accountBalanceMina(publicKey);
    console.log("balance", balance);
    await fetchAccount({ publicKey: address });
    const zkApp = new SecureMultiplication(publicKey);
    const result: EncryptedValue = zkApp.value.get();
    const decrypted = decrypt(result, sk);
    console.log("initial value:", decrypted.toJSON());
  });
});
