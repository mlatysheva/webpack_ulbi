import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
      // css-loader: allows webpack to understand CSS files
      'css-loader',
      // sass-loader: compiles Sass to CSS
      'sass-loader'
    ],
  };
  
  const tsLoader = {
    // ts-loader can work with JSX
    // If we did not use typescript, we would have had to use babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };
  return [
    scssLoader,
    tsLoader,
  ]
}