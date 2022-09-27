let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const lambda = new AWS.Lambda({ region: "us-east-1" });

exports.lambdaHandler = async (event) => {
  const names = {
    GET: "read-lambda-ReadLambda-YuXQeB9rFjdg",
    POST: "create-lambda-CreateLambda-TXfvEYS7D3bN",
    PUT: "update-lambda-UpdateLambda-7p022Wvw9nSw",
    DELETE: "delete-lambda-DeleteLambda-nxVJF12ltLx0",
  };

  const handleLambdas = async (name) => {
    const params = {
      FunctionName: name,
    };
    const result = await lambda.invoke(params).promise();

    if (result.StatusCode == 200) {
      return {
        statusCode: 200,
        body: result.Payload,
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Error",
        }),
      };
    }
  };

  if (event.httpMethod == "GET") {
    return handleLambdas(names.GET);
  }
  if (event.httpMethod == "POST") {
    return handleLambdas(names.POST);
  }
  if (event.httpMethod == "PUT") {
    return handleLambdas(names.PUT);
  }
  if (event.httpMethod == "DELETE") {
    return handleLambdas(names.DELETE);
  }
};
