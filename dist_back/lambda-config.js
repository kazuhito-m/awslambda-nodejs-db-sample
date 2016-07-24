module.exports = {
  region: 'ap-northeast-1',
  handler: 'index.handler',
  role: 'arn:aws:iam::054697574084:role/lambda_basic_execution',
  functionName: 'searchAwsProduct',
  timeout: 10,  
  memorySize: 128
  // eventSource: {
  //  EventSourceArn: <event source such as kinesis ARN>,
  //  BatchSize: 200,
  //  StartingPosition: "TRIM_HORIZON"
  //}
}