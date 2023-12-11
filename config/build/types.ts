export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
}

export type BuildMode = 'development' | 'production';

export interface BuildOptions {
  paths: BuildPaths;
  port: number;
  mode: BuildMode;
}