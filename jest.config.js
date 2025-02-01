export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env.local
                    VITE_FSQ_API: 'Foursqure API TOKEN',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
