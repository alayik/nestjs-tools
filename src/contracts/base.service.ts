export class BaseService {
  _userId: string;
  _user: any;

  user(user: any) {
    this._userId = user.id;
    this._user = user;
    return this;
  }

  partial<T>(partial: T, entity: any) {
    return new entity(partial);
  }
}
