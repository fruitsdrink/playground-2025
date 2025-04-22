import { Show, SimpleShowLayout, TextField } from "react-admin";

const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
