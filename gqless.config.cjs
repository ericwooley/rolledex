/**
 * @type {import("@gqless/cli").GqlessConfig}
 */
const config = {
  endpoint: '/api/graphql',
  enumsAsStrings: false,
  react: true,
  scalars: { DateTime: 'string' },
  preImport: '',
  introspection: {
    endpoint: 'http://localhost:8080/v1/graphql',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjkzN2I1MDRjLWE1NGEtNDI0OS1iODI1LTNhOTBmNzQzN2RmYyJ9LCJpYXQiOjE2MTc3NDM5MjZ9.0XI8Iuh7qhXP_PnRcYaiFbpmyDF6LgZ5GJ2mSteY9U8',
    },
  },
  destination: './libs/gql/src/lib/gql.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
