/* document-load.ts|js file - the code is the same for both the languages */
import {
    ConsoleSpanExporter,
    SimpleSpanProcessor,
  } from '@opentelemetry/sdk-trace-base';
  import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
  import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
  import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
  import { ZoneContextManager } from '@opentelemetry/context-zone';
  import { registerInstrumentations } from '@opentelemetry/instrumentation';
  
  const provider = new WebTracerProvider();
  
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  
  provider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });
  
  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [
        //new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation({
            eventNames: ['submit', 'click', 'keypress'],
        })
        
    ],
  });

  // and some test
const btn1 = document.createElement('button');
btn1.append(document.createTextNode('btn1'));
btn1.addEventListener('click', () => {
  console.log('clicked');
});

  
const body = document.getElementsByTagName("body")[0]
body.addEventListener('click', () => {
    console.log("body was clicked")
  })

document.querySelector('body').append(btn1);

const btn2 = document.createElement('button');
btn2.append(document.createTextNode('btn2'));
btn2.addEventListener('click', () => {
  getData('https://httpbin.org/get').then(() => {
    getData('https://httpbin.org/get').then(() => {
      console.log('data downloaded 2');
    });
    getData('https://httpbin.org/get').then(() => {
      console.log('data downloaded 3');
    });
    console.log('data downloaded 1');
  });
});
document.querySelector('body').append(btn2);

function getData(url) {
  return new Promise(async (resolve) => {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    req.send();
    req.onload = function () {
      resolve();
    };
  });
}

// now click on buttons
  