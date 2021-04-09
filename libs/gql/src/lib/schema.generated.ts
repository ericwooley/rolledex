/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { ScalarsEnumsHash } from 'gqless';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  timestamptz: any;
  uuid: any;
}

export interface LoginArg {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface LoginInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface SignupArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export interface json_comparison_exp {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
}

/** column ordering options */
export enum order_by {
  /** in the ascending order, nulls last */
  asc = 'asc',
  /** in the ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in the descending order, nulls first */
  desc = 'desc',
  /** in the descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in the descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last',
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export interface users_bool_exp {
  _and?: Maybe<Array<Maybe<users_bool_exp>>>;
  _not?: Maybe<users_bool_exp>;
  _or?: Maybe<Array<Maybe<users_bool_exp>>>;
  email?: Maybe<String_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
}

/** ordering options when selecting data from "users" */
export interface users_order_by {
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
}

/** primary key columns input for table: "users" */
export interface users_pk_columns_input {
  id: Scalars['uuid'];
}

/** select columns of table "users" */
export enum users_select_column {
  /** column name */
  email = 'email',
  /** column name */
  id = 'id',
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export interface uuid_comparison_exp {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  ID: true,
  Int: true,
  String: true,
  json: true,
  order_by: true,
  timestamptz: true,
  users_select_column: true,
  uuid: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: 'String!' },
    me: { __type: 'MeResponse' },
    users: {
      __type: '[users!]!',
      __args: {
        distinct_on: '[users_select_column!]',
        limit: 'Int',
        offset: 'Int',
        order_by: '[users_order_by!]',
        where: 'users_bool_exp',
      },
    },
    users_by_pk: { __type: 'users', __args: { id: 'uuid!' } },
  },
  mutation: {
    __typename: { __type: 'String!' },
    login: { __type: 'LoginResponse!', __args: { loginArgs: 'LoginInput!' } },
    logout: { __type: 'LogoutResponse!' },
    refreshToken: { __type: 'NewTokenResponse' },
    signUp: { __type: 'SignUpResult', __args: { newUserArgs: 'SignupArgs!' } },
  },
  subscription: {
    __typename: { __type: 'String!' },
    me: { __type: 'MeResponse' },
    users: {
      __type: '[users!]!',
      __args: {
        distinct_on: '[users_select_column!]',
        limit: 'Int',
        offset: 'Int',
        order_by: '[users_order_by!]',
        where: 'users_bool_exp',
      },
    },
    users_by_pk: { __type: 'users', __args: { id: 'uuid!' } },
  },
  LoginArg: { email: { __type: 'String!' }, password: { __type: 'String!' } },
  LoginInput: { email: { __type: 'String!' }, password: { __type: 'String!' } },
  LoginResponse: {
    __typename: { __type: 'String!' },
    accessToken: { __type: 'String!' },
  },
  LogoutResponse: {
    __typename: { __type: 'String!' },
    ok: { __type: 'Boolean!' },
  },
  MeResponse: {
    __typename: { __type: 'String!' },
    authorized: { __type: 'Boolean!' },
    email: { __type: 'String!' },
    id: { __type: 'uuid!' },
  },
  NewTokenResponse: {
    __typename: { __type: 'String!' },
    accessToken: { __type: 'String!' },
  },
  SampleOutput: {
    __typename: { __type: 'String!' },
    email: { __type: 'String!' },
    id: { __type: 'uuid!' },
  },
  SignUpResult: {
    __typename: { __type: 'String!' },
    email: { __type: 'String!' },
    success: { __type: 'Boolean!' },
  },
  SignupArgs: { email: { __type: 'String!' }, password: { __type: 'String!' } },
  String_comparison_exp: {
    _eq: { __type: 'String' },
    _gt: { __type: 'String' },
    _gte: { __type: 'String' },
    _ilike: { __type: 'String' },
    _in: { __type: '[String!]' },
    _is_null: { __type: 'Boolean' },
    _like: { __type: 'String' },
    _lt: { __type: 'String' },
    _lte: { __type: 'String' },
    _neq: { __type: 'String' },
    _nilike: { __type: 'String' },
    _nin: { __type: '[String!]' },
    _nlike: { __type: 'String' },
    _nsimilar: { __type: 'String' },
    _similar: { __type: 'String' },
  },
  json_comparison_exp: {
    _eq: { __type: 'json' },
    _gt: { __type: 'json' },
    _gte: { __type: 'json' },
    _in: { __type: '[json!]' },
    _is_null: { __type: 'Boolean' },
    _lt: { __type: 'json' },
    _lte: { __type: 'json' },
    _neq: { __type: 'json' },
    _nin: { __type: '[json!]' },
  },
  users: {
    __typename: { __type: 'String!' },
    email: { __type: 'String!' },
    id: { __type: 'uuid!' },
  },
  users_bool_exp: {
    _and: { __type: '[users_bool_exp]' },
    _not: { __type: 'users_bool_exp' },
    _or: { __type: '[users_bool_exp]' },
    email: { __type: 'String_comparison_exp' },
    id: { __type: 'uuid_comparison_exp' },
  },
  users_order_by: { email: { __type: 'order_by' }, id: { __type: 'order_by' } },
  users_pk_columns_input: { id: { __type: 'uuid!' } },
  uuid_comparison_exp: {
    _eq: { __type: 'uuid' },
    _gt: { __type: 'uuid' },
    _gte: { __type: 'uuid' },
    _in: { __type: '[uuid!]' },
    _is_null: { __type: 'Boolean' },
    _lt: { __type: 'uuid' },
    _lte: { __type: 'uuid' },
    _neq: { __type: 'uuid' },
    _nin: { __type: '[uuid!]' },
  },
} as const;

export interface Query {
  __typename: 'Query' | undefined;
  me?: Maybe<MeResponse>;
  users: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_by_pk: (args: { id: Scalars['uuid'] }) => Maybe<users>;
}

export interface Mutation {
  __typename: 'Mutation' | undefined;
  login: (args: { loginArgs: LoginInput }) => LoginResponse;
  logout: LogoutResponse;
  refreshToken?: Maybe<NewTokenResponse>;
  signUp: (args: { newUserArgs: SignupArgs }) => Maybe<SignUpResult>;
}

export interface Subscription {
  __typename: 'Subscription' | undefined;
  me?: Maybe<MeResponse>;
  users: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_by_pk: (args: { id: Scalars['uuid'] }) => Maybe<users>;
}

export interface LoginResponse {
  __typename: 'LoginResponse' | undefined;
  accessToken: ScalarsEnums['String'];
}

export interface LogoutResponse {
  __typename: 'LogoutResponse' | undefined;
  ok: ScalarsEnums['Boolean'];
}

export interface MeResponse {
  __typename: 'MeResponse' | undefined;
  authorized: ScalarsEnums['Boolean'];
  email: ScalarsEnums['String'];
  id: ScalarsEnums['uuid'];
}

export interface NewTokenResponse {
  __typename: 'NewTokenResponse' | undefined;
  accessToken: ScalarsEnums['String'];
}

export interface SampleOutput {
  __typename: 'SampleOutput' | undefined;
  email: ScalarsEnums['String'];
  id: ScalarsEnums['uuid'];
}

export interface SignUpResult {
  __typename: 'SignUpResult' | undefined;
  email: ScalarsEnums['String'];
  success: ScalarsEnums['Boolean'];
}

/**
 * columns and relationships of "users"
 */
export interface users {
  __typename: 'users' | undefined;
  email: ScalarsEnums['String'];
  id: ScalarsEnums['uuid'];
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  LoginResponse: LoginResponse;
  LogoutResponse: LogoutResponse;
  MeResponse: MeResponse;
  NewTokenResponse: NewTokenResponse;
  SampleOutput: SampleOutput;
  SignUpResult: SignUpResult;
  users: users;
}
export type SchemaObjectTypesNames =
  | 'Query'
  | 'Mutation'
  | 'Subscription'
  | 'LoginResponse'
  | 'LogoutResponse'
  | 'MeResponse'
  | 'NewTokenResponse'
  | 'SampleOutput'
  | 'SignUpResult'
  | 'users';

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  order_by: order_by | undefined;
  users_select_column: users_select_column | undefined;
}
