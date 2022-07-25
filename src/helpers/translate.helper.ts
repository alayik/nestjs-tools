const columns = {
  name: 'نام',
  description: 'توضیح',
  id: 'شناسه',
  ids: 'شناسه ها',
  key: 'کلید',
  department: 'دپارتمان',
  fullName: 'نام کامل',
  username: 'نام کاربری',
  email: 'ایمیل',
  url: 'آدرس اینترنتی',
  mobile: 'موبایل',
  password: 'گذرواژه',
  currentPassword: 'گذرواژه فعلی',
  newPassword: 'گذرواژه جدید',
  status: 'وضعیت',
  token: 'توکن',
  refreshToken: 'رفرش توکن',
  accessToken: 'اکسس توکن',
  type: 'نوع',
  province: 'استان',
  phoneNumber: 'شماره‌ثابت',
  website: 'وبسایت',
  city: 'شهر',
  address: 'آدرس',
  permission: 'مجوز',
  role: 'نقش کاربری',
  user: 'کاربر',
  organization: 'سازمان',
  model: 'مدل',
  mac: 'مک آدرس',
  serial: 'سریال',
  os: 'سیستم عامل',
  os_version: 'ورژن سیستم عامل',
  duration: 'مدت زمان',
  ratio: 'نسبت اندازه',
  bg_color: 'رنگ بکگراند',
  color: 'رنگ',
};

const messages = {
  min: 'می بایست حداقل {length} کارکتر باشد',
  max: 'می بایست حداکثر {length} کارکتر باشد',
  email: 'می بایست به صورت ایمیل معتبر باشد',
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
