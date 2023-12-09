import path from 'path';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack-dev-server';

type Mode = 'development' | 'production';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: '[name].[contenthash].js', // [contenthash] to avoid browser cache
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(), // Show progress in console; in large projects, this can slow down the build
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
            // css-loader: allows webpack to understand CSS files
            'css-loader',
            // sass-loader: compiles Sass to CSS
            'sass-loader'
          ],
        },
        {
          // ts-loader can work with JSX
          // If we did not use typescript, we would have had to use babel-loader
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? {      
      port: env.port ?? 3000,
      open: true,
    } : undefined as unknown as Configuration,
  };
  return config;
}
