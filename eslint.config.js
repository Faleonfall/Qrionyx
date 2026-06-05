import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

const maxArrowLinesRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "limit arrow function length",
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooLong:
        "Arrow function has {{lines}} lines. Maximum allowed is {{max}}.",
    },
  },
  create(context) {
    const max = context.options[0]?.max ?? 100;

    return {
      ArrowFunctionExpression(node) {
        if (!node.loc) {
          return;
        }

        const lines = node.loc.end.line - node.loc.start.line + 1;

        if (lines > max) {
          context.report({
            node,
            messageId: "tooLong",
            data: {
              lines,
              max,
            },
          });
        }
      },
    };
  },
};

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...vue.configs["flat/essential"],
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,vue}"],
  })),
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: tseslint.parser,
        project: ["./tsconfig.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      local: {
        rules: {
          "max-arrow-lines": maxArrowLinesRule,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_|^\\$",
          varsIgnorePattern: "^_|^\\$",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "max-lines": [
        "error",
        {
          max: 500,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "local/max-arrow-lines": [
        "error",
        {
          max: 100,
        },
      ],

      // Vue overrides
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off",
    },
  },
);
