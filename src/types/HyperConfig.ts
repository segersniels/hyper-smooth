import Config from "./Config";

type HyperConfig = Record<string, any> & {
  smooth?: Config;
};

export default HyperConfig;
