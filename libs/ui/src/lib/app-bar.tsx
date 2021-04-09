import React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { Menu, ProgressBar } from 'react-native-paper';
import { useQuery, useRefetch, useMutation, useMetaState } from '@rolledex/gql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styled from 'styled-components/native';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const ContentWrapper = Styled.View`
  position: relative;
`;
const LoadingBarWrapper = Styled.View``;
export const AppBar: React.FunctionComponent = ({ children }) => {
  const refetch = useRefetch();
  const [showMenu, setShowMenu] = React.useState(false);
  const query = useQuery();
  const { isFetching } = useMetaState();
  const [login, { error }] = useMutation(
    (mutation, args: { email: string; password: string }) => {
      const { accessToken } = mutation.login({
        loginArgs: args,
      });
      return accessToken;
    },
    {
      onCompleted: async (accessToken) => {
        if (accessToken) await AsyncStorage.setItem('accessKey', accessToken);
        refetch(query.me);
      },
    }
  );
  const [logout] = useMutation(
    (mutation) => {
      return mutation.logout?.ok;
    },
    {
      onCompleted: async () => {
        await AsyncStorage.removeItem('accessKey');
        refetch(query.me);
      },
    }
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content
          title={
            query.me?.authorized
              ? query.me?.email || error?.message
              : 'Not Logged In'
          }
          subtitle={query.me?.id}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            login({
              args: {
                email: 'bob@tom2.com',
                password: 'test123',
              },
            });
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
          <Menu.Item
            onPress={async () => {
              setShowMenu(false);
              await logout();
            }}
            title="Logout"
          />
        </Menu>
      </Appbar.Header>
      <ContentWrapper>
        <LoadingBarWrapper>
          <ProgressBar
            indeterminate={isFetching}
            progress={isFetching ? undefined : 1}
          />
        </LoadingBarWrapper>
        {children}
      </ContentWrapper>
    </>
  );
};
