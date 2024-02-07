import {
  Cloud,
  fee,
  initBlockchain,
  accountBalanceMina,
  sleep,
} from "zkcloudworker";
import { SecureMultiplication, EncryptedValue } from "./src/contract";
import {
  PublicKey,
  Mina,
  fetchAccount as o1js_fetchAccount,
  Field,
} from "o1js";

export async function compile(cloud: Cloud, args: string[]) {
  console.log("he: compile 8");
  await cloud.log("he: compile 8 (cloud log)");
  const deployer = await cloud.getDeployer();
  console.log("deployer", deployer.toBase58());

  console.time("compiled");

  const vk = (
    await SecureMultiplication.compile({ cache: cloud.cache })
  ).verificationKey.hash.toJSON();
  console.timeEnd("compiled");
  console.log("vk", vk);
  return vk;
}

export async function multiply(cloud: Cloud, args: string[]) {
  console.log("he: multiply", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: multiply (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("multiply");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const balance = await accountBalanceMina(zkAppAddress);
    console.log("balance", balance);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();
    const encryptedValue = new EncryptedValue({
      encryptedValue1: Field.fromJSON(args[1]),
      encryptedValue2: Field.fromJSON(args[2]),
    });
    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.multiply(encryptedValue);
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("multiply");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}

export async function calculate(cloud: Cloud, args: string[]) {
  console.log("he: calculate", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: calculate (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("calculated");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const balance = await accountBalanceMina(zkAppAddress);
    console.log("balance", balance);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();

    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.calculate();
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("calculated");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}

export async function reset(cloud: Cloud, args: string[]) {
  console.log("he: reset", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: calculate (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("reset");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const balance = await accountBalanceMina(zkAppAddress);
    console.log("balance", balance);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();

    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.reset();
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("reset");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}

async function fetchAccount(args: { publicKey: PublicKey }) {
  const timeout = 1000 * 60 * 5; // 5 minutes
  const startTime = Date.now();
  let result = { account: undefined };
  while (Date.now() - startTime < timeout) {
    try {
      const result = await o1js_fetchAccount(args);
      if (result.account !== undefined) return result;
    } catch (error) {
      console.error("Error in fetchAccount:", error);
    }
    await sleep(1000 * 10);
  }
  console.error("Timeout in fetchAccount");
  return result;
}
