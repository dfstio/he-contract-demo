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
[4:18:44 PM] api call result {
  success: true,
  jobId: '6459034946.1707308322921.ue4xqaypzcwe6fassir48lt822wjra3f',
  error: undefined
}
[4:22:08 PM] Time spent to deploy the code: 3 min (204540 ms)
[4:22:08 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'deploy',
    jobData: [],
    args: [],
    timeFinished: 1707308508260,
    timeCreated: 1707308322921,
    jobId: '6459034946.1707308322921.ue4xqaypzcwe6fassir48lt822wjra3f',
    result: 'deployed',
    jobName: 'he-contract-demo',
    developer: '@dfst',
    jobStatus: 'finished',
    billedDuration: 182385,
    id: '6459034946',
    timeStarted: 1707308325881
  }
}
 PASS  tests/deploy.zip.test.ts
  Deploy zip file with code
    ✓ should deploy code to zkCloudWorker (5375 ms)
    ✓ should get the result of the deployment (204519 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        210.863 s
Ran all test suites matching /deploy.zip/i
```

### Running the test

```
he-contract-demo % yarn test tests/api.test
[1:20:32 PM] initial value: 1
[1:20:34 PM] api call result {
  success: true,
  jobId: '6459034946.1707297633170.2icxmzm35vakeq4wyhvlopjl7whz19tn',
  error: undefined
}
[1:20:35 PM] api call result {
  success: true,
  jobId: '6459034946.1707297634644.g8ltrnq77y78qczvlkhxtmj6m8k8ehk4',
  error: undefined
}
[1:20:36 PM] api call result {
  success: true,
  jobId: '6459034946.1707297635975.u4k7d12t52wif4t48d6i0oe5v5js0kgj',
  error: undefined
}
[1:20:57 PM] Time spent to send tx: 23 sec (23125 ms)
[1:20:57 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '8635738623507908486315904796205917662935774519434184677074920042065363884413',
      '18116288274483629144178441170835763902035071541845868939382901244943231353885'
    ],
    timeFinished: 1707297652775,
    timeCreated: 1707297633170,
    jobId: '6459034946.1707297633170.2icxmzm35vakeq4wyhvlopjl7whz19tn',
    result: '{\n' +
      '  "hash": "5JtWUkw42Pt7psnb4aCNXrF86AziginLdRHXUFoMUPz1qCzR9f1N",\n' +
      '  "success": true,\n' +
      '  "duration": 19205\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 19310,
    id: '6459034946',
    timeStarted: 1707297633501
  }
}
[1:21:18 PM] Time spent to send tx: 42 sec (42467 ms)
[1:21:18 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '25820107399018033177336520984041809019136842797471389793216778427828881288403',
      '5359760224240346412239448499435700908340413450690242795028300501798187570928'
    ],
    timeFinished: 1707297676024,
    timeCreated: 1707297634644,
    jobId: '6459034946.1707297634644.g8ltrnq77y78qczvlkhxtmj6m8k8ehk4',
    result: '{\n' +
      '  "hash": "5JugZzWDk3wfggK5HJiWPgqia2xa251K8VJiNYxvXYeJ7KtjgjMt",\n' +
      '  "success": true,\n' +
      '  "duration": 36037\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 38213,
    id: '6459034946',
    timeStarted: 1707297637878
  }
}
[1:21:18 PM] Time spent to send tx: 41 sec (41452 ms)
[1:21:18 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '7298168851295970608446869902005370114404334709159395404569419159928894988941',
      '1870342696382906199486137401786672159219404622525450490085166528200094667328'
    ],
    timeFinished: 1707297676731,
    timeCreated: 1707297635975,
    jobId: '6459034946.1707297635975.u4k7d12t52wif4t48d6i0oe5v5js0kgj',
    result: '{\n' +
      '  "hash": "5Jts53PzUFoLb7KumSpLfaBhCkCdRkKs6pW8JEe41iqnCfevpCbm",\n' +
      '  "success": true,\n' +
      '  "duration": 35538\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 37784,
    id: '6459034946',
    timeStarted: 1707297639020
  }
}
[1:21:18 PM] Waiting for txs to be included into block...
[1:22:20 PM] tx included into block: 5JtWUkw42Pt7psnb4aCNXrF86AziginLdRHXUFoMUPz1qCzR9f1N
[1:22:20 PM] tx included into block: 5JugZzWDk3wfggK5HJiWPgqia2xa251K8VJiNYxvXYeJ7KtjgjMt
[1:22:20 PM] tx included into block: 5Jts53PzUFoLb7KumSpLfaBhCkCdRkKs6pW8JEe41iqnCfevpCbm
[1:22:20 PM] txs included into block: 1:02.311 (m:ss.mmm)
[1:22:22 PM] api call result {
  success: true,
  jobId: '6459034946.1707297741101.1d5yryr0i33ixgy1bnih7bs3npsutgz3',
  error: undefined
}
[1:23:02 PM] Time spent to calculate the result: 40 sec (40881 ms)
[1:23:02 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'calculate',
    jobData: [],
    args: [ 'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2' ],
    timeFinished: 1707297764370,
    timeCreated: 1707297741101,
    jobId: '6459034946.1707297741101.1d5yryr0i33ixgy1bnih7bs3npsutgz3',
    result: '{\n' +
      '  "hash": "5Ju8KT9icAoY5hBw3maxNPgffwpxWqa6ZkEWQ9WwofsUbZbWUhjy",\n' +
      '  "success": true,\n' +
      '  "duration": 23100\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 23148,
    id: '6459034946',
    timeStarted: 1707297741254
  }
}
[1:23:02 PM] Waiting for tx to be included into block...
[1:25:35 PM] tx included into block: 5Ju8KT9icAoY5hBw3maxNPgffwpxWqa6ZkEWQ9WwofsUbZbWUhjy
[1:25:35 PM] calculate tx included into block: 2:32.240 (m:ss.mmm)
[1:28:06 PM] decrypted: 24
[1:28:07 PM] api call result {
  success: true,
  jobId: '6459034946.1707298086755.0oiatsw7y72y0e2s4hni11gld3x1dk9d',
  error: undefined
}
[1:28:49 PM] Time spent to reset the value: 40 sec (40881 ms)
[1:28:49 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'reset',
    jobData: [],
    args: [ 'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2' ],
    timeFinished: 1707298109487,
    timeCreated: 1707298086755,
    jobId: '6459034946.1707298086755.0oiatsw7y72y0e2s4hni11gld3x1dk9d',
    result: '{\n' +
      '  "hash": "5Juj7iMb4axLv8Nsaw8dgrY2tuTXKhVpfb9GvXPANEUrkoLZctRw",\n' +
      '  "success": true,\n' +
      '  "duration": 22470\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 22583,
    id: '6459034946',
    timeStarted: 1707298086954
  }
}
[1:28:49 PM] Waiting for tx to be included into block...
[1:37:25 PM] tx included into block: 5Juj7iMb4axLv8Nsaw8dgrY2tuTXKhVpfb9GvXPANEUrkoLZctRw
[1:37:25 PM] reset tx included into block: 8:36.104 (m:ss.mmm)
 PASS  tests/api.test.ts
  Calculate the product using api
    ✓ should get initial value (372 ms)
    ✓ should send the multiplications (4276 ms)
    ✓ should get the tx hashes (41451 ms)
    ✓ should wait for tx to be included into block (62313 ms)
    ✓ should calculate the result (1379 ms)
    ✓ should get the result of the calculation (40883 ms)
    ✓ should wait for tx to be included into block (152281 ms)
    ✓ should decrypt the result (151073 ms)
    ✓ should reset the value (1441 ms)
    ✓ should get the result of the reset job (41277 ms)
    ✓ should wait for tx to be included into block (516111 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1014.039 s
Ran all test suites matching /tests\/api.test/i.

```
