/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClientMng = /* GraphQL */ `
  mutation CreateClientMng(
    $input: CreateClientMngInput!
    $condition: ModelClientMngConditionInput
  ) {
    createClientMng(input: $input, condition: $condition) {
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
export const updateClientMng = /* GraphQL */ `
  mutation UpdateClientMng(
    $input: UpdateClientMngInput!
    $condition: ModelClientMngConditionInput
  ) {
    updateClientMng(input: $input, condition: $condition) {
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
export const deleteClientMng = /* GraphQL */ `
  mutation DeleteClientMng(
    $input: DeleteClientMngInput!
    $condition: ModelClientMngConditionInput
  ) {
    deleteClientMng(input: $input, condition: $condition) {
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
