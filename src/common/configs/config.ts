import { Config } from './config.interface';

// 应用全局配置
const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
};
export default (): Config => config;
