import Palette from "enums/Palette";

interface Config {
  palette: Palette;
  appearance: {
    dark: Palette;
    light: Palette;
  };
  hideControls: boolean;
  hideNotifications: boolean;
  hideTabTitle: boolean;
  hideTabIcons: boolean;
}

export default Config;
