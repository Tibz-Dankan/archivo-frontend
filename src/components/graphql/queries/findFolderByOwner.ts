import { gql, useQuery } from "@apollo/client";

// interface Folder {
//   id: string;
//   name: string;
//   ownerId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface QueryResult {
//   findFolderByOwnerId: Folder[];
// }

const FIND_FOLDER_BY_OWNER_ID = gql`
  query findFolderByOwnerId($ownerId: ID!) {
    findFolderByOwnerId(id: $ownerId) {
      id
      name
      ownerId
      createdAt
      updatedAt
    }
  }
`;

interface Props {
  ownerId: string;
}

interface Result {
  type: string;
  error?: string;
  data?: string;
}

export const findFolderByOwner = (props: Props) => {
  const ownerId = props.ownerId;
  const { loading, error, data } = useQuery(FIND_FOLDER_BY_OWNER_ID, {
    variables: { ownerId },
  });

  if (loading) {
    return {
      type: "loading",
    };
  }

  if (error) {
    return {
      type: "error",
      error: error.message,
    };
  }

  if (!data || !data.findFolderByOwnerId) {
    const { findFolderByOwnerId } = data;

    return {
      type: "data",
      data: findFolderByOwnerId,
    };
  }
};
