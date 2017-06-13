module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "worker": true,
        "mocha": true,
        "jasmine": true,
        "serviceworker": true,
        "jest/globals": true
    },
    "globals": {
        "expect": true
    },
    "extends": [
        "eslint:recommended",
        // "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [
            "error",
            "single",
            {
                "allowTemplateLiterals": true
            }
        ],
        "no-console": [
            "error",
            {
                allow: [
                    "log",
                    "warn",
                    "error"
                ]
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "compat/compat": 2,

        "react/jsx-no-duplicate-props": 2,
        "react/prefer-es6-class": 2,
        "react/no-string-refs": 2,
        "react/require-render-return": 2,
        "react/no-find-dom-node": 2,
        "react/no-is-mounted": 2,
        "react/jsx-no-comment-textnodes": 2,
        "react/jsx-curly-spacing": 2,
        "react/jsx-no-undef": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "jest/no-disabled-tests": 1,
        "jest/no-focused-tests": 1,
        "jest/no-identical-title": 2,
    },
    "plugins": [
        "compat",
        "react",
        "jest"
    ],
    "settings": {
        "react": {
            "pragma": "h"
        }
    }
};