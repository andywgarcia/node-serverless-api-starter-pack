import { ForbiddenError, NotFoundError, BadRequest } from "./errors";
import {logError, logDebug} from '../logger'

const commonHeaders = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
}

const success = body => ({
  statusCode: 200,
  headers: commonHeaders,
  body: JSON.stringify(body)
});

const internalServerError = err => {
  const message =
    process.env.STAGE === "dev"
      ? JSON.stringify(err, Object.getOwnPropertyNames(err))
      : JSON.stringify("An unknown error has occured");
  return {
    statusCode: 500,
    headers: commonHeaders,
    body: message
  };
};

const badRequest = ({ message }) => ({
  statusCode: 400,
  headers: commonHeaders,
  body: JSON.stringify(message)
});

const forbiddenError = ({ message }) => ({
  statusCode: 403,
  headers: commonHeaders,
  body: JSON.stringify(message)
});

const notFoundError = ({ message }) => ({
  statusCode: 404,
  headers: commonHeaders,
  body: JSON.stringify(message)
});



export default lambdaHandlerWrapper => {
  const lambdaHandler = async (event, context) => {
    logDebug(JSON.stringify(event));
    logDebug(JSON.stringify(context));
    try {
      const result = await lambdaHandlerWrapper(event, context);
      logDebug(JSON.stringify(result));
      return success(result);
    }
    catch (err) {
      logError(err);
      if (err instanceof ForbiddenError) {
        return forbiddenError(err);
      } else if (err instanceof NotFoundError) {
        return notFoundError(err);
      } else if (err instanceof BadRequest) {
        return badRequest(err);
      } else {
        return internalServerError(err);
      }
    }
  }

  return lambdaHandler;
};

