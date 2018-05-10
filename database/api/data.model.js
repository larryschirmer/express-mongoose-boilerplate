const gql = require('graphql-tag');

module.exports = gql`
  {
    data {
      docID
      edited
      title
      author
      likes
      body
    }
    createdAt
  }
`;
