module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'coupang-eats-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
