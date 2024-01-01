import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';
import ReactRefreshTypescript from 'react-refresh-typescript';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      },
    },
  };

  const svgrLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack', 
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              }
            ]
          }
        },
      }
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 
      cssLoaderWithModules,
      // sass-loader: compiles Sass to CSS
      'sass-loader'
    ],
  };
  
  const tsLoader = {
    // ts-loader can work with JSX
    // If we did not use typescript, we would have had to use babel-loader
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypescript()].filter(Boolean),
          }),
        },
      }
    ],    
    exclude: /node_modules/,
  };

  const babelLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-typescript', 
            '@babel/preset-env',
            [
              '@babel/preset-react', { 
                runtime: isDev ? 'automatic' : 'classic' 
              }
            ],
          ],
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [
    assetLoader,
    svgrLoader,
    scssLoader,
    babelLoader,
    // tsLoader,
  ]
}