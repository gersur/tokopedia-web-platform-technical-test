/**
 * This function can be used anywhere in the app to greet the user
 * @param userName The user's first name
 * @returns A kind greeting message
 */
export const sayHello = (userName: string): string => {
  return 'Welcome ' + userName + '!';
};

export const capitalizeFirstLetter = (
  [first, ...rest]: string,
  locale: string = navigator.language
) => {
  return first.toLocaleUpperCase(locale) + rest.join('');
};

export const kebabCaseToTitle = (str: string) => {
  const temp = str.replaceAll('-', ' ');
  return stringToTitles(temp);
};

export const stringToTitles = (s: string) => {
  return s.replace(/\w\S*/g, function (t) {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
  });
};
