import {
  AbilityBuilder,
  createMongoAbility,
  MongoQuery,
  PureAbility,
} from '@casl/ability';
import { RoleName } from '../interfaces';
import { USER_ROLES } from '../constants';

type User = {
  role: RoleName | null;
  isAuthenticated: boolean;
  id?: number | null;
  username?: string | null;
};

type Entity = {
  author?: string | undefined;
  userName?: string | undefined;
};

type Actions = 'create' | 'edit' | 'view' | 'delete';

type Ability =
  | [Actions, 'document']
  | [Actions, 'file']
  | [Actions, 'user']
  | [Actions, 'author']
  | [Actions, 'role'];

export type AppAbility = PureAbility<Ability, MongoQuery>;

interface IAbilityParams {
  user: User;
  entity?: Entity;
}

export const defineAbilityFor = ({ user, entity }: IAbilityParams) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.MODER || user.username === entity?.author) {
    can('edit', 'document');
    can('delete', 'document');
    can('edit', 'file');
    can('delete', 'file');
  }

  if (user.role === USER_ROLES.ADMIN) {
    can('edit', 'user');
    can('delete', 'user');
  }

  if (user.role === USER_ROLES.ADMIN) {
    can('edit', 'author');
    can('edit', 'role');
  }

  return build();
};
