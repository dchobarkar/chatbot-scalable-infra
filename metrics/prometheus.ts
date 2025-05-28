import client from "prom-client";

client.collectDefaultMetrics();

export const messageCounter = new client.Counter({
  name: "chatbot_messages_total",
  help: "Total number of messages handled",
});

export const tokenUsageGauge = new client.Gauge({
  name: "chatbot_tokens_used",
  help: "Estimated total tokens used",
});

export const metricsMiddleware = async (
  _req: any,
  res: {
    set: (arg0: string, arg1: string) => void;
    end: (arg0: string) => void;
  }
) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
};
