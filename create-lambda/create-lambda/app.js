let AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
let client = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

exports.lambdaHandler = async (event) => {
  let body;
  let params = {
    TableName: "crud-lambdas",
    Item: {
      id: event.payload.id,
      nome: event.payload.nome,
      cargo: event.payload.cargo,
      idade: event.payload.idade,
    },
  };

  try {
    const data = await client.put(params).promise();
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
