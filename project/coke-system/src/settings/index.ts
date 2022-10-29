type envConfigType = {
  envName: string;
  env: string;
  envAlias: string;
};

const development: envConfigType = {
  envName: "开发环境",
  env: "development",
  envAlias: "dev",
};

const env = process.env.NODE_ENV;
let envConfig: envConfigType;
switch (env) {
  case "development":
    envConfig = development;
    break;
}

export default envConfig;
