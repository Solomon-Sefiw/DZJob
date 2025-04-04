const config: any = {
    schemaFile: "http://dzjobs-api.somee.com/swagger/v1/swagger.json", // Swagger URL
    apiFile: "./src/app/services/emptySplitApi.ts",                  // Base API file
    apiImport: "emptySplitApi",                                  // Import from base API
    outputFile: "./src/app/services/DZJobsApi.ts",                     // Output API file
    exportName: "DZJobsApi",                                       // Exported API name
    hooks: { queries: true, lazyQueries: true, mutations: true }, // Generate hooks
  };
  
  export default config;
  //http://dzjobs.somee.com/swagger/v1/swagger.json