import React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { useMeQuery, useLoginMutation, useLogin } from '@rolledex/sdk';
import { Menu, Divider } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const AppBar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { data: me, error, refetch: checkMe, client } = useMeQuery();
  const login = useLogin();
  return (
    <Appbar.Header>
      <Appbar.Content
        title={me?.me.email || error?.message || 'Not Logged In'}
        subtitle={me?.me.id}
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          login('bob@tom2.com', 'test123').then(() => checkMe());
        }}
      />

      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <Appbar.Action
            color="white"
            icon={MORE_ICON}
            onPress={() => setShowMenu(!showMenu)}
          />
        }
      >
        {/* <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" /> */}
        <Divider />
        <Menu.Item
          onPress={() => {
            client.resetStore();
          }}
          title="Logout"
        />
      </Menu>
    </Appbar.Header>
  );
};
