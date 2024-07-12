## Setup
Install all dependencies using npm

## Run
npx parcel index.html

- In case the collector component is not running, errors will show up in browser console.
- Collector can be any simple REST service (Nodejs or Python or any other stack). 
- http://localhost:3000/v1/traces ==> Please ensure the server is listening to POST requests at /v1/traces endpoint
- To confirm if the metrics data is getting pushed to backend, check the network tab in browser. There will be one data push every 5 seconds (or scheduledDelayMillis)