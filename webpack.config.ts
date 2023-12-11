import webpack from 'webpack'
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/build/types';
import path from 'path';

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }; 
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths,
  });

  return config;
}
