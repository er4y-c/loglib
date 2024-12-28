
// This is the interface for the JSON object that will be passed to the RollingConfig class
export interface RollingConfigProps {
  sizeThreshold: number;
  timeThreshold: number;
}

// This is the interface for the JSON object that will be passed to the LogConfig class
export interface LogConfigProps {
  level: number;
  filePrefix: string;
  rollingConfig: RollingConfig;
}