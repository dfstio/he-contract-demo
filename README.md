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
he-contract-demo % yarn test tests/api.test
[11:56:13 PM] initial value: 1
[11:56:18 PM] api call result {
  success: true,
  jobId: '6459034946.1707249377875.77qfb9n4rbxatmrevqw4y0vhamhwptv3',
  error: undefined
}
[11:56:20 PM] api call result {
  success: true,
  jobId: '6459034946.1707249379358.op9i7otm1h91gxjx6kqrml13jv25c5m4',
  error: undefined
}
[11:56:21 PM] api call result {
  success: true,
  jobId: '6459034946.1707249380852.k9cvh061w0xwynuvdi6s64upagt9wi32',
  error: undefined
}
[11:57:03 PM] Time spent to send tx: 44 sec (44017 ms)
[11:57:03 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '10102747884567087519086287851974294953328101102833254438629745743257721266734',
      '1502963227506323280137075057006637496841123580206746699493518655054806084814'
    ],
    timeFinished: 1707249419210,
    timeCreated: 1707249377875,
    jobId: '6459034946.1707249377875.77qfb9n4rbxatmrevqw4y0vhamhwptv3',
    result: '{\n' +
      '  "hash": "5JtkCm2nbCZr12svSFmLQn2L88DaoVmc8RVprYwZvcW6Z5frzGkE",\n' +
      '  "success": true,\n' +
      '  "duration": 35896\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 38173,
    id: '6459034946',
    timeStarted: 1707249381116
  }
}
[11:57:03 PM] Time spent to send tx: 42 sec (42790 ms)
[11:57:03 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '25501751388855851865993485014326291859492243817260836928810414572356375575190',
      '18130764016082612263123167936467409003712425776568820381368064876717642602148'
    ],
    timeFinished: 1707249415888,
    timeCreated: 1707249379358,
    jobId: '6459034946.1707249379358.op9i7otm1h91gxjx6kqrml13jv25c5m4',
    result: '{\n' +
      '  "hash": "5Jtz7q4bx9xBhNgTN2c9vwivc7WhMhVvVBNJGh88KB1reqdUwS7Z",\n' +
      '  "success": true,\n' +
      '  "duration": 31851\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 33895,
    id: '6459034946',
    timeStarted: 1707249382064
  }
}
[11:57:03 PM] Time spent to send tx: 41 sec (41911 ms)
[11:57:03 PM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'multiply',
    jobData: [],
    args: [
      'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2',
      '17734041084796921079042544809027334305681599334316592038167980231123812505442',
      '22304018295170339269684751491436280226841825622236725431061972117115909620099'
    ],
    timeFinished: 1707249420758,
    timeCreated: 1707249380852,
    jobId: '6459034946.1707249380852.k9cvh061w0xwynuvdi6s64upagt9wi32',
    result: '{\n' +
      '  "hash": "5JvH5EiFmU9TioopKvSbyLUo1kTNZ8GHEznyd6erLDeY3KUgRTge",\n' +
      '  "success": true,\n' +
      '  "duration": 35266\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 37146,
    id: '6459034946',
    timeStarted: 1707249383684
  }
}
[12:14:48 AM] api call result {
  success: true,
  jobId: '6459034946.1707250487571.qoo8o3ueufhh8di333nkn1naxzh57mg1',
  error: undefined
}
[12:15:30 AM] Time spent to calculate the result: 41 sec (41560 ms)
[12:15:30 AM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'calculate',
    jobData: [],
    args: [ 'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2' ],
    timeFinished: 1707250530266,
    timeCreated: 1707250487571,
    jobId: '6459034946.1707250487571.qoo8o3ueufhh8di333nkn1naxzh57mg1',
    result: '{\n' +
      '  "hash": "5JvJ1XPMJ5pHAHbxthBr8X1T3BUuUXrzwuiX5va4JQv93aa3YyWX",\n' +
      '  "success": true,\n' +
      '  "duration": 37137\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 39594,
    id: '6459034946',
    timeStarted: 1707250490746
  }
}
[12:15:30 AM] Waiting for tx to be included into block...
[12:16:31 AM] tx included into block: 5JvJ1XPMJ5pHAHbxthBr8X1T3BUuUXrzwuiX5va4JQv93aa3YyWX
[12:17:01 AM] calculate tx included into block: 1:31.300 (m:ss.mmm)
[12:17:02 AM] decrypted: 24
[12:17:04 AM] api call result {
  success: true,
  jobId: '6459034946.1707250623420.5i3dk966u50csjjauj0fxgb6d79rfzlj',
  error: undefined
}
[12:17:45 AM] Time spent to reset the value: 41 sec (41560 ms)
[12:17:45 AM] api call result {
  success: true,
  error: undefined,
  result: {
    task: 'reset',
    jobData: [],
    args: [ 'B62qnWyoDZP5QoqJ7tiRAuoaUtEzs2xHw8ETsrGFgQjniLFk5XP6qC2' ],
    timeFinished: 1707250646046,
    timeCreated: 1707250623420,
    jobId: '6459034946.1707250623420.5i3dk966u50csjjauj0fxgb6d79rfzlj',
    result: '{\n' +
      '  "hash": "5Jtrg48NxYVXRLHsnBAVcbmAsPsJ2keLy7MajMEpBNu1hXuQwSPM",\n' +
      '  "success": true,\n' +
      '  "duration": 22339\n' +
      '}',
    jobName: 'he-contract-demo',
    developer: 'DFST',
    jobStatus: 'finished',
    billedDuration: 22526,
    id: '6459034946',
    timeStarted: 1707250623645
  }
}
[12:17:45 AM] Waiting for tx to be included into block...
[12:19:17 AM] tx included into block: 5Jtrg48NxYVXRLHsnBAVcbmAsPsJ2keLy7MajMEpBNu1hXuQwSPM
[12:19:47 AM] reset tx included into block: 2:02.277 (m:ss.mmm)

```
