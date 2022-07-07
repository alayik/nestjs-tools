import { throwForbidden } from '../errors';

export class BaseService {
  _userId: string;
  _organizationId: string;
  _hasFullAccess: boolean = false;
  _user: any;
  _organization: any;

  user(user: any) {
    this._userId = user.id;
    this._organizationId = user.organization_id;
    this._user = user;
    this._organization = user.organization;
    this._hasFullAccess = Boolean(user.full_access);
    return this;
  }

  canUser(permission: string, throwable = false): boolean {
    if (this._user && this._user.perms && this._user.perms[0]) {
      const hasAccess = this._user.perms.find((perm) => perm.key === permission);
      return Boolean(hasAccess);
    }

    if (throwable) {
      throwForbidden();
    }

    return false;
  }

  partial<T>(partial: T, entity: any) {
    return new entity(partial);
  }
}
