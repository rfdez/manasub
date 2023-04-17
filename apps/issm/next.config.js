/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["@manasub/backend-issm-context", "convict"],
	},
	webpack: (config, { webpack }) => {
		config.plugins.push(
			new webpack.IgnorePlugin({
				resourceRegExp: /^pg-native$/,
			})
		);

		return config;
	},
};

module.exports = nextConfig;
