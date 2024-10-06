/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClientMng = /* GraphQL */ `
  subscription OnCreateClientMng(
    $filter: ModelSubscriptionClientMngFilterInput
    $owner: String
  ) {
    onCreateClientMng(filter: $filter, owner: $owner) {
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
export const onUpdateClientMng = /* GraphQL */ `
  subscription OnUpdateClientMng(
    $filter: ModelSubscriptionClientMngFilterInput
    $owner: String
  ) {
    onUpdateClientMng(filter: $filter, owner: $owner) {
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
export const onDeleteClientMng = /* GraphQL */ `
  subscription OnDeleteClientMng(
    $filter: ModelSubscriptionClientMngFilterInput
    $owner: String
  ) {
    onDeleteClientMng(filter: $filter, owner: $owner) {
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
