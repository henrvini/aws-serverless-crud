let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
let client = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

exports.lambdaHandler = async (event) => {
  let body;
  let params = {
    TableName: "crud-lambdas",
    Key: { id: event.payload.id },
  };

  try {
    const data = await client.get(params).promise();
    body = data.Item;
  } catch (err) {
    console.log(err);
    body = err;
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };

  return response;
};
