import { codegen } from "swagger-axios-codegen";

codegen({
  methodNameMode: "path",
  // eslint-disable-next-line no-undef
  remoteUrl: `${process.env.VITE_API_URL}/public/swagger.json`,
  outputDir: "./src",
  fileName: "api-sdk.ts",
  useStaticMethod: true,
});
