import Palette from "enums/Palette";
import Config from "types/Config";

const DefaultConfig: Config = {
  palette: Palette.Dark,
  appearance: {
    dark: Palette.Dark,
    light: Palette.Light,
  },
  hideControls: false,
  hideNotifications: false,
  hideTabTitle: true,
  hideTabIcons: false,
};

export default DefaultConfig;
