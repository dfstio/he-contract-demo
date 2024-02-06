import { describe, expect, it } from "@jest/globals";
import { zkCloudWorker, formatTime, sleep } from "zkcloudworker";

describe("Compile using api", () => {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTkwMzQ5NDYiLCJpYXQiOjE3MDEzNTY5NzEsImV4cCI6MTczMjg5Mjk3MX0.r94tKntDvLpPJT2zzEe7HMUcOAQYQu3zWNuyFFiChD0";
  let startTime: number = 0;
  let endTime: number = 0;
  let jobId: string = "";
  const api = new zkCloudWorker(JWT);

  it("should send the multiplications", async () => {
    const apiresult = await api.createJob({
      name: "he-contract-demo",
      task: "compile",
      transactions: [],
      args: [],
      developer: "DFST",
    });
    startTime = Date.now();
    console.log("api call result", apiresult);
    expect(apiresult.success).toBe(true);
    expect(apiresult.jobId).toBeDefined();
    if (apiresult.jobId === undefined) return;
    jobId = apiresult.jobId;
  });

  it(`should get the result`, async () => {
    const result = await api.waitForJobResult({ jobId });
    endTime = Date.now();
    console.log(
      `Time spent to send tx: ${formatTime(endTime - startTime)} (${
        endTime - startTime
      } ms)`
    );
    console.log("api call result", result);
    expect(result.success).toBe(true);
  });
});
