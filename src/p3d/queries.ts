import { gql } from 'graphql-request'

export interface IExtrinsics {
  callArguments: string;
  multiAddressAccountId: string;
}

export interface ExtrinsicsData {
  getExtrinsics: {
    objects: IExtrinsics[];
  };
}

export interface ExtrinsicsVariables {
  accountId: string;
}

export const GET_EXTRINSICS = gql`
  query GetExtrinsics($accountId: String!) {
    getExtrinsics(pageSize: 10, pageKey: "1", filters: { callName: "request_judgement", callModule: "Identity", signed: 1, multiAddressAccountId: $accountId }) {
      pageInfo {
        pageSize
        pageNext
      }
      objects {
        callArguments
      }
    }
  }
`;
