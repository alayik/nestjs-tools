const entities = {
  province: 'استان',
  city: 'شهر',
  permission: 'مجوز',
  role: 'نقش کاربری',
  user: 'کاربر',
  refreshToken: 'توکن',
  userToken: 'توکن کاربر',
  userOrganization: 'سازمان کاربر',
  organization: 'سازمان',
  organizationRegistrationReq: 'درخواست ثبت سازمان',
};

const columns = {
  name: 'نام',
  description: 'توضیح',
  id: 'شناسه',
  ids: 'شناسه ها',
  key: 'کلید',
  department: 'دپارتمان',
  full_name: 'نام کامل',
  username: 'نام کاربری',
  email: 'ایمیل',
  url: 'آدرس اینترنتی',
  mobile: 'موبایل',
  password: 'گذرواژه',
  status: 'وضعیت',
  token: 'توکن',
  type: 'نوع',
  province: 'استان',
  phone_number: 'شماره‌ثابت',
  website: 'وبسایت',
  city: 'شهر',
  address: 'آدرس',
};

const messages = {
  min: 'می بایست حداقل {length} کارکتر باشد',
  max: 'می بایست حداکثر {length} کارکتر باشد',
  string: 'می بایست به صورت رشته ای باشد',
  boolean: 'می بایست به صورت صحیح/غلط باشد',
  number: 'می بایست به صورت عددی باشد',
  positive: 'می بایست به صورت عدد مثبت باشد',
  negative: 'می بایست به صورت عدد منفی باشد',
  date: 'می بایست به صورت تاریخ باشد',
  notEmpty: 'می بایست شامل مقدار باشد',
  array: 'می بایست به صورت آرایه باشد',
};

export const FaMessage = (key: string, args: { [key: string]: string } & { prop?: string; label?: string } = {}) => {
  const message = messages[key];
  if (!message) {
    return undefined;
  }
  const prefix = args['label'] ?? columns[args['prop']] ?? '';
  return (prefix + ' ' + message.replace(/\{(\w+)\}/g, (_, key) => args[key])).trim() ?? undefined;
};
