declare module "winston-logstash" {
  import { TransportStreamOptions } from "winston";

  interface LogstashTransportOptions extends TransportStreamOptions {
    port: number;
    host: string;
    node_name?: string;
  }

  export default class LogstashTransport {
    constructor(options: LogstashTransportOptions);
  }
}
