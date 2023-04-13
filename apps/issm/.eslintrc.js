const path = require("path");

module.exports = {
	extends: ["plugin:@next/next/recommended"],
	rules: {
		"no-restricted-imports": [
			"error",
			{
				patterns: [
					"@manasub/*",
					"!@manasub/frontend-issm-context",
					"!@manasub/backend-issm-context",
					"!@manasub/frontend-shared-context",
					"!@manasub/backend-shared-context",
					"!@manasub/shared-context",
				],
			},
		],
		"@next/next/no-html-link-for-pages": [2, path.join(__dirname, "src/app")],
	},
};
