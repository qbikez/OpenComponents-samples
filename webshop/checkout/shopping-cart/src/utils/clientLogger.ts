import { ApplicationInsights, DistributedTracingModes } from '@microsoft/applicationinsights-web';

export class ClientLogger {
    private appInsights?: ApplicationInsights;
  
    constructor(
      instrumentationKey: string | undefined,
      private componentName: string,
      private properties: { [key: string]: string | number | boolean } = {}
    ) {
      if (instrumentationKey) {
        const appInsights = new ApplicationInsights({
          config: {
            instrumentationKey: instrumentationKey,
            distributedTracingMode: DistributedTracingModes.W3C,
            enableCorsCorrelation: true,
            disableFetchTracking: false,
            disableCorrelationHeaders: false,
            disableAjaxTracking: false,
            disableExceptionTracking: false,
            enableRequestHeaderTracking: true,
            correlationHeaderDomains: [
              'gl-ocregistry-*.azurewebsites.net',
              'oc-registry.*.guestline.app'
            ]
          }
        });
        appInsights.loadAppInsights();
        this.appInsights = appInsights;
      }
  
      this.addProperties({ componentName });
      // eslint-disable-next-line no-console
      console.log(`created [${componentName}] logger`);
    }
  
    public addProperties(properties: { [key: string]: string | number | boolean }) {
      this.properties = { ...this.properties, ...properties };
    }
  
    /* eslint-disable @typescript-eslint/no-unused-vars */
    public dependency(
      name: string,
      startTime: number,
      url: string,
      resultCode: number,
      success: boolean
    ) {
      // eslint-disable-next-line no-console
      console.warn(`[${this.componentName}][DEP] ${name} ${resultCode} ${url}`);
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
  
    public event(name: string, properties?: { [key: string]: string | number }) {
      if (this.appInsights) {
        this.appInsights.trackEvent({
          name,
          properties: { ...this.properties, ...properties, created: Date.now() }
        });
      }
      if (this.isLocal()) {
        // eslint-disable-next-line no-console
        console.log(`[${this.componentName}][EVENT] ${name}`, {
          ...this.properties,
          ...properties,
          created: Date.now()
        });
      }
    }
  
    public exception(error: Error, properties: { [key: string]: string } = {}) {
      if (this.appInsights) {
        this.appInsights.trackException({
          exception: error,
          properties: { ...this.properties, ...properties, created: Date.now() }
        });
      }
      if (this.isLocal()) {
        // eslint-disable-next-line no-console
        console.error(`[${this.componentName}][ERROR] ${error.name}: ${error.message}`, {
          ...this.properties,
          ...properties,
          created: Date.now()
        });
      }
    }
  
    public trace(message: string, properties: { [key: string]: string | boolean | number } = {}) {
      if (this.appInsights) {
        this.appInsights.trackTrace({
          message,
          properties: { ...this.properties, ...properties, created: Date.now() }
        });
      }
      if (this.isLocal()) {
        // eslint-disable-next-line no-console
        console.log(`[${this.componentName}][TRACE] ${message}`, {
          ...this.properties,
          ...properties,
          created: Date.now()
        });
      }
    }
  
    private isLocal() {
      return window.location?.hostname?.startsWith('localhost');
    }
  }