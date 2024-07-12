/* document-load.ts|js file - the code is the same for both the languages */
import {
  WebTracerProvider,
  BatchSpanProcessor
} from '@opentelemetry/sdk-trace-web';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider();

const collectorOptions = {
  url: 'http://localhost:3000/v1/traces', // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 10, // an optional limit on pending requests
};

const exporter = new OTLPTraceExporter(collectorOptions);

provider.addSpanProcessor(new BatchSpanProcessor(exporter, {
  // The maximum queue size. After the size is reached spans are dropped.
  maxQueueSize: 100,
  // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
  maxExportBatchSize: 10,
  // The interval between two consecutive exports
  scheduledDelayMillis: 5000,
  // How long the export can run before it is cancelled
  exportTimeoutMillis: 30000,
}));

provider.register();

// Registering instrumentations
registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new UserInteractionInstrumentation({
      eventNames: ['submit', 'click', 'keypress'],
    })

  ],
});

const body = document.getElementsByTagName("body")[0]
const button = document.getElementsByTagName("button")[0]

body.addEventListener('click', () => {
  console.log("body was clicked")
})

button.addEventListener('click', () => {
  console.log("button was clicked")
})