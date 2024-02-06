import { describe, expect, it } from "@jest/globals";
import {
  zkCloudWorker,
  formatTime,
  sleep,
  initBlockchain,
} from "zkcloudworker";
import { Field, PublicKey, checkZkappTransaction, fetchAccount } from "o1js";
import { EncryptedValue, SecureMultiplication } from "../src/contract";
import { encrypt, decrypt } from "../src/he";

describe("Calculate the product using api", () => {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTkwMzQ5NDYiLCJpYXQiOjE3MDEzNTY5NzEsImV4cCI6MTczMjg5Mjk3MX0.r94tKntDvLpPJT2zzEe7HMUcOAQYQu3zWNuyFFiChD0";
  let pk = Field.fromJSON(
    "15865883191285987755948956560778653675137481280032856828828401582741862742833"
  );
  let sk = Field.fromJSON(
    "3404594142577636973266388389713282759042060039560572020818253215122249612915"
  );
  let address = "B62qroNuCXFxvh12qN1b11WDnsZYghw5bFS9PJMrtGh8grQxqB5bmFV";
  const startTime: number[] = [];
  const endTime: number[] = [];
  const jobId: string[] = [];
  const hash: string[] = [];
  let calculateJobId = "";
  let calculateHash = "";
  const api = new zkCloudWorker(JWT);
  let initialValue = Field(1);
  initBlockchain("berkeley");

  it("should get initial value", async () => {
    const publicKey = PublicKey.fromBase58(address);
    await fetchAccount({ publicKey: address });
    const zkApp = new SecureMultiplication(publicKey);
    const result: EncryptedValue = zkApp.value.get();
    const decrypted = decrypt(result, sk);
    console.log("initial value:", decrypted.toJSON());
    initialValue = decrypted;
    expect(decrypted.toJSON()).toEqual(Field(24).toJSON());
  });

  it("should send the multiplications", async () => {
    const values = [Field(2), Field(3), Field(4)];
    for (const value of values) {
      const encryptedValue = encrypt(value, pk);
      const apiresult = await api.createJob({
        name: "he-contract-demo",
        task: "multiply",
        transactions: [],
        args: [
          address,
          encryptedValue.encryptedValue1.toJSON(),
          encryptedValue.encryptedValue2.toJSON(),
        ],
        developer: "DFST",
      });
      startTime.push(Date.now());
      console.log("api call result", apiresult);
      expect(apiresult.success).toBe(true);
      expect(apiresult.jobId).toBeDefined();
      if (apiresult.jobId === undefined) return;
      jobId.push(apiresult.jobId);
    }
  });

  it(`should get the tx hashes`, async () => {
    let i = 0;
    for (const id of jobId) {
      const result = await api.waitForJobResult({ jobId: id });
      endTime.push(Date.now());
      console.log(
        `Time spent to send tx: ${formatTime(endTime[i] - startTime[i])} (${
          endTime[i] - startTime[i]
        } ms)`
      );
      console.log("api call result", result);
      expect(result.success).toBe(true);
      if (result.success === false) return;
      const result2 = JSON.parse(result.result.result);
      expect(result2.success).toBe(true);
      expect(result2.hash).toBeDefined();
      if (result2.hash === undefined) return;
      hash.push(result2.hash);
      i++;
    }
  });

  it(`should wait for tx to be included into block`, async () => {
    expect(hash.length).toBeGreaterThan(0);
    if (hash.length === 0) return;
    console.log("Waiting for tx to be included into block...");
    console.time("txs included into block");
    let remainedTx = hash.length;
    while (remainedTx > 0) {
      for (const h of hash) {
        const result = await checkZkappTransaction(h);
        if (result.success) {
          console.log("tx included into block:", h);
          remainedTx--;
        }
      }
      await sleep(1000 * 30);
    }
    console.timeEnd("txs included into block");
  });

  it("should calculate the result", async () => {
    expect(hash.length).toBeGreaterThan(0);
    if (hash.length === 0) return;
    const apiresult = await api.createJob({
      name: "he-contract-demo",
      task: "calculate",
      transactions: [],
      args: [address],
      developer: "DFST",
    });
    startTime.push(Date.now());
    console.log("api call result", apiresult);
    expect(apiresult.success).toBe(true);
    expect(apiresult.jobId).toBeDefined();
    if (apiresult.jobId === undefined) return;
    calculateJobId = apiresult.jobId;
  });

  it(`should get the result of the calculation`, async () => {
    expect(calculateJobId).not.toBe("");
    if (calculateJobId === "") return;
    const result = await api.waitForJobResult({ jobId: calculateJobId });
    const i = jobId.length;
    endTime.push(Date.now());
    console.log(
      `Time spent to calculate the result: ${formatTime(
        endTime[i] - startTime[i]
      )} (${endTime[i] - startTime[i]} ms)`
    );
    console.log("api call result", result);
    expect(result.success).toBe(true);
    if (result.success === false) return;
    const result2 = JSON.parse(result.result.result);
    expect(result2.success).toBe(true);
    expect(result2.hash).toBeDefined();
    if (result2.hash === undefined) return;
    calculateHash = result2.hash;
  });

  it(`should wait for tx to be included into block`, async () => {
    expect(calculateHash).not.toBe("");
    if (calculateHash === "") return;
    console.log("Waiting for tx to be included into block...");
    console.time("calculate tx included into block");
    let remainedTx = 1;
    while (remainedTx > 0) {
      const result = await checkZkappTransaction(calculateHash);
      if (result.success) {
        console.log("tx included into block:", calculateHash);
        remainedTx--;
      }
      await sleep(1000 * 30);
    }
    console.timeEnd("calculate tx included into block");
  });

  it("should decrypt the result", async () => {
    expect(calculateHash).not.toBe("");
    if (calculateHash === "") return;

    const publicKey = PublicKey.fromBase58(address);
    await fetchAccount({ publicKey: address });
    const zkApp = new SecureMultiplication(publicKey);
    const result: EncryptedValue = zkApp.value.get();
    const decrypted = decrypt(result, sk);
    console.log("decrypted:", decrypted.toJSON());
    expect(decrypted.toJSON()).toEqual(Field(24).mul(initialValue).toJSON());
  });

  it("should reset the value", async () => {
    const apiresult = await api.createJob({
      name: "he-contract-demo",
      task: "reset",
      transactions: [],
      args: [address],
      developer: "DFST",
    });
    startTime.push(Date.now());
    console.log("api call result", apiresult);
    expect(apiresult.success).toBe(true);
    expect(apiresult.jobId).toBeDefined();
    if (apiresult.jobId === undefined) return;
    calculateJobId = apiresult.jobId;
  });

  it(`should get the result of the reset job`, async () => {
    expect(calculateJobId).not.toBe("");
    if (calculateJobId === "") return;
    const result = await api.waitForJobResult({ jobId: calculateJobId });
    const i = jobId.length;
    endTime.push(Date.now());
    console.log(
      `Time spent to reset the value: ${formatTime(
        endTime[i] - startTime[i]
      )} (${endTime[i] - startTime[i]} ms)`
    );
    console.log("api call result", result);
    expect(result.success).toBe(true);
    if (result.success === false) return;
    const result2 = JSON.parse(result.result.result);
    expect(result2.success).toBe(true);
    expect(result2.hash).toBeDefined();
    if (result2.hash === undefined) return;
    calculateHash = result2.hash;
  });

  it(`should wait for tx to be included into block`, async () => {
    expect(calculateHash).not.toBe("");
    if (calculateHash === "") return;
    console.log("Waiting for tx to be included into block...");
    console.time("reset tx included into block");
    let remainedTx = 1;
    while (remainedTx > 0) {
      const result = await checkZkappTransaction(calculateHash);
      if (result.success) {
        console.log("tx included into block:", calculateHash);
        remainedTx--;
      }
      await sleep(1000 * 30);
    }
    console.timeEnd("reset tx included into block");
  });
});
