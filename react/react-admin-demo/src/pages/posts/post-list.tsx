import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  FunctionField,
  useRecordContext,
  EditButton,
  TextInput,
  ReferenceInput,
} from "react-admin";

const PostPanel = () => {
  const record = useRecordContext();
  return <div>{record?.body}</div>;
};
const PostList = () => {
  const postFilters = [
    <TextInput source="q" label="Search" key="search" alwaysOn />,
    <ReferenceInput source="userId" reference="users" key="user" />,
  ];
  return (
    <List filters={postFilters}>
      <Datagrid
        expand={<PostPanel />}
        sx={{
          ".RaDatagrid-headerCell": {
            padding: "16px",
          },
        }}
      >
        <TextField source="id" />
        <TextField source="title" label="Post Title" />
        <FunctionField
          label="Excerpt"
          render={(record) => `${record.body?.slice(0, 50)}...`}
        />
        <ReferenceField source="userId" reference="users" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
export default PostList;
