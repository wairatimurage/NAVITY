export const checkEmpty = (value, element) => (value ? element : null);

export const formatBlogDate = (_date) => {
  const _today = new Date();
  const _year =
    _date.getFullYear() === _today.getFullYear() ? "" : _date.getFullYear();
  const _month = new Intl.DateTimeFormat("en-EU", {
    month: "short",
  }).format(_date);

  return _month + ", " + _date.getDate() + " " + _year;
};
