[
    [
      {
        "data": {
          "type": "lambda",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_triggerStepFunction",
          "region": "us-west-2",
          "name": "stepFunction_triggerStepFunction"
        }
      },
      {
        "data": {
          "type": "lambda",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_GetRequestedText",
          "region": "us-west-2",
          "name": "stepFunction_GetRequestedText"
        }
      },
      {
        "data": {
          "type": "step-function",
          "id": "arn:aws:states:us-west-2:758325631830:stateMachine:lambda",
          "region": "us-west-2",
          "name": "lambda"
        }
      },
      {
        "data": {
          "type": "lambda",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText",
          "region": "us-west-2",
          "name": "stepFunction_getText",
          "parent": "arn:aws:states:us-west-2:758325631830:stateMachine:lambda"
        }
      },
      {
        "data": {
          "type": "lambda",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_createNewRequest",
          "region": "us-west-2",
          "name": "stepFunction_createNewRequest",
          "parent": "arn:aws:states:us-west-2:758325631830:stateMachine:lambda"
        }
      },
  
      {
        "data": {
          "type": "lambda",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText",
          "region": "us-west-2",
          "name": "stepFunction_ConvertToText",
          "parent": "arn:aws:states:us-west-2:758325631830:stateMachine:lambda"
        }
      },
      {
        "data": {
          "type": "s3",
          "id": "s3:audio-json",
          "region": "us-west-2",
          "name": "audio-json"
        }
      },
      {
        "data": {
          "type": "dynamodb",
          "id": "ddb:translate",
          "region": "us-west-2",
          "name": "translate"
        }
      },
      {
        "data": {
          "type": "transcribe",
          "id": "transcribe",
          "region": "us-west-2",
          "name": "transcribe"
        }
      },
      {
        "data": {
          "type": "translate",
          "id": "translate",
          "region": "us-west-2",
          "name": "translate"
        }
      }
    ],
    [
      {
        "data": {
          "id": "transcribe-s3:audio-json",
          "source": "transcribe",
          "target": "s3:audio-json"
        }
      },
      {
        "data": {
          "id": "stepFunction_getText-ddb:translate",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText",
          "target": "ddb:translate"
        }
      },
      {
        "data": {
          "id": "stepFunction_createNewRequest-ddb:translate",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_createNewRequest",
          "target": "ddb:translate"
        }
      },
  
      {
        "data": {
          "id": "stepFunction_ConvertToText-ddb:translate",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText",
          "target": "ddb:translate"
        }
      },
      {
        "data": {
          "id": "stepFunction_GetRequestedText-ddb:translate",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_GetRequestedText",
          "target": "ddb:translate"
        }
      },
  
      {
        "data": {
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText-transcribe",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText",
          "target": "transcribe"
        }
      },
      {
        "data": {
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText-translate",
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText",
          "target": "translate"
        }
      },
      {
        "data": {
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_createNewRequest",
          "target": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_createNewRequest-arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText"
        }
      },
      {
        "data": {
          "source": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText",
          "target": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText",
          "id": "arn:aws:lambda:us-west-2:758325631830:function:stepFunction_ConvertToText-arn:aws:lambda:us-west-2:758325631830:function:stepFunction_getText"
        }
      }
    ]
  ]
  