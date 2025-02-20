const config: any = {
  schemaFile: "https://localhost:7078/swagger/v1/swagger.json",
  apiFile: "./src/app/api/emptySplitApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/app/api/SMSApi.ts",
  exportName: "SMSApi",
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

export default config;
