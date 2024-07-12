const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { getWebAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-web');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ZoneContextManager } = require('@opentelemetry/context-zone');
const { B3Propagator } = require('@opentelemetry/propagator-b3');

const exporter = new CollectorTraceExporter({
  serviceName: 'auto-instrumentations-web',
});

const provider = new WebTracerProvider();
//provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new B3Propagator(),
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      // load custom configuration for xml-http-request instrumentation
      '@opentelemetry/instrumentation-xml-http-request': {
        clearTimingResources: true,
      },
    }),
  ],
});