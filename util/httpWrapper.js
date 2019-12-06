const GenerateSuccess = body => ({
    statusCode: 200,
    body: JSON.stringify(body)
  });

const GenerateApiGatewayResponse = (body) => {
    return GenerateSuccess(body);
};


export default GenerateApiGatewayResponse;