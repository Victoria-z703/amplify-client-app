/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientMng = /* GraphQL */ `
  query GetClientMng($id: ID!) {
    getClientMng(id: $id) {
      id
      name
      phone
      address
      projectType
      email
      visitDate
      estimate
      clientSource
      reference
      inspector
      inspectionDate
      hasBusinessEngaged
      remark
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listClientMngs = /* GraphQL */ `
  query ListClientMngs(
    $filter: ModelClientMngFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientMngs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        address
        projectType
        email
        visitDate
        estimate
        clientSource
        reference
        inspector
        inspectionDate
        hasBusinessEngaged
        remark
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
