import Palette from "enums/Palette";
import Config from "types/Config";
import HyperConfig from "types/HyperConfig";

export const get = (
  config: HyperConfig
): Omit<HyperConfig, "smooth"> & {
  smooth: Config;
} => {
  return {
    ...config,
    smooth: {
      variant: Palette.Dark,
      disableAutomaticTheming: false,
      ...(config.smooth ?? {}),
    },
  };
};
