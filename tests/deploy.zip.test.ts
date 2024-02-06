import { describe, expect, it } from "@jest/globals";
import { zkCloudWorker, formatTime } from "zkcloudworker";

describe("Deploy zip file with code", () => {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTkwMzQ5NDYiLCJpYXQiOjE3MDEzNTY5NzEsImV4cCI6MTczMjg5Mjk3MX0.r94tKntDvLpPJT2zzEe7HMUcOAQYQu3zWNuyFFiChD0";
  let startTime = 0;
  let endTime = 0;
  let jobId = "";

  it(`should deploy code to zkCloudWorker`, async () => {
    const api = new zkCloudWorker(JWT);
    const apiresult = await api.deploy({
      packageName: "he-contract-demo",
    });
    startTime = Date.now();

    console.log("api call result", apiresult);
    expect(apiresult.success).toBe(true);
    expect(apiresult.jobId).toBeDefined();
    if (apiresult.jobId === undefined) return;
    jobId = apiresult.jobId;
  });

  it(`should get the result of the deployment`, async () => {
    expect(jobId).toBeDefined();
    if (jobId === undefined) return;
    expect(jobId).not.toBe("");
    if (jobId === "") return;
    const api = new zkCloudWorker(JWT);
    const result = await api.waitForJobResult({ jobId });
    endTime = Date.now();
    console.log(
      `Time spent to deploy the code: ${formatTime(endTime - startTime)} (${
        endTime - startTime
      } ms)`
    );
    console.log("api call result", result);
  });
});
