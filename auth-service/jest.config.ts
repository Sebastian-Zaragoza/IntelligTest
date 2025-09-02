import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    detectOpenHandles: true,
    clearMocks: true,
};

export default config;