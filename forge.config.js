const path = require('path')

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "images", "ir_tele")
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: path.join(__dirname, "images", "ir_tele.ico"),
      },
    },
  ],
};
