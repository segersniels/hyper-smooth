# Smooth

[![Actions](https://action-badges.now.sh/segersniels/hyper-smooth)](https://github.com/segersniels/hyper-smooth/actions)[![npm](https://img.shields.io/npm/dm/hyper-smooth.svg)](https://www.npmjs.com/package/hyper-smooth)

My interpretation of a comfortable to look at theme to use with Hyper. It automatically switches based on the active macOS color scheme.

This theme is based on the work from the guys at [Rosé Pine](https://github.com/rose-pine/hyper) and [ng-hai](https://github.com/ng-hai/hyper-rose-pine-next) that provided a clear example of how a responsive theme can be based on the macOS color scheme.

![light](./resources/light.png)
![dark](./resources/dark.png)

### Usage

```bash
hyper i hyper-smooth
```

or

```js
module.exports = {
  plugins: ["hyper-smooth"],
};
```

### Configuration

Configuration is fairly straight forward. Assume the following default config.

```json
{
  "smooth": {
    "variant": "dark", // or "light"
    "disableAutomaticTheming": false
  }
}
```

Adjusting `disableAutomaticTheming` may require a full reload.
