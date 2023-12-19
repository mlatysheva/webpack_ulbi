import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {      
    port: options.port ?? 3000,
    open: true,
    // If static pages are served from nginx, for example, proxy links to index.html must be implemented
    historyApiFallback: true,
    hot: true,
  };
}