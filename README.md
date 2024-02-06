# zkCloudWorker : HE encryption demo

Homomorphic encryption demo contract

Based on https://github.com/Trivo25/o1js-elgamal

## Design

This contract illustrate the usage of the homomorphic encryption to do the calculations in the cloud while mantling privacy.

The contract do multiplication of the numbers.

- The numbers are being encrypted on user's computer using homomorphic encryption, then are being sent to zkCloudWorker cloud proving service to be sent to the contract using Actions and Reducer.

- Then, the reduce method is being called to multiply encrypted numbers.

- The result of the reduce call is being written to the contract state.

- Then, on user computer the state of the contract is being read and the final result is decrypted back.

## Running the example

```
yarn test tests/api.test
```

## Logs

### Deploying the code as zip file with the repo to zkCloudWorker

```
he-contract-demo % yarn test deploy.zip
[10:58:29 PM] api call result {
  success: true,
  jobId: '6459034946.1707245908724.bvs4hnb657s7dr9xjiaadp1s94xpz27q',
  error: undefined
}
[11:05:01 PM] Time spent to deploy the code: 6 min (391930 ms)
[11:05:01 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'deploy',
    jobData: [],
    args: [],
    timeFinished: 1707246298906,
    timeCreated: 1707245908724,
    jobId: '6459034946.1707245908724.bvs4hnb657s7dr9xjiaadp1s94xpz27q',
    result: 'deployed',
    jobName: 'he-contract-demo',
    developer: '@dfst',
    jobStatus: 'finished',
    billedDuration: 386924,
    id: '6459034946',
    timeStarted: 1707245911988
  }
}
 PASS  tests/deploy.zip.test.ts
  Deploy zip file with code
    ✓ should deploy code to zkCloudWorker (5246 ms)
    ✓ should get the result of the deployment (391910 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        398.118 s
Ran all test suites matching /deploy.zip/i.
```

### Running the test

```

```
