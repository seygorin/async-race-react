module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "jsx-a11y", "import", "prettier"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
      alias: {
        map: [
          ["@containers", "./src/containers"],
          ["@components", "./src/components"],
          ["@hooks", "./src/hooks"],
          ["@pages", "./src/pages"],
          ["@assets", "./src/assets"],
          ["@store", "./src/store"],
          ["@utils", "./src/utils"],
          ["@type", "./src/types"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "prettier/prettier": ["error", { printWidth: 90 }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["vite.config.ts"],
      },
    ],
    "max-lines-per-function": ["error", { max: 40 }],
    "no-magic-numbers": [
      "error",
      {
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
};
