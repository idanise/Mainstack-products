import morgan from "morgan";
import { logger } from "./logger";

morgan.token("timestamp", function (req, res) {
  return new Date().toISOString();
});

const morganFormat = `{
    "timestamp" : ":timestamp",
    "method" : ":method", 
    "url" : ":url", 
    "status" : ":status", 
    "responseTime" : ":response-time ms"
}`;

function messageHandler(message: string) {
  logger.info("Request received", JSON.parse(message.trim()));
}

const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: messageHandler,
  },
});

export default morganMiddleware;
