export namespace RegExUtils {
  export const everythingRegEx: RegExp = /^.*$/;
  export const pinCodeRegEx: RegExp = /^[1-9][0-9]{5}$/;
  export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  export const lowerCaseRegEx: RegExp = /[a-z]/;
  export const upperCaseRegEx: RegExp = /[A-Z]/;
  export const numberRegEx: RegExp = /[0-9]/;
  export const specialCharRegEx: RegExp = /[!@#$%^&*(),.?":{}|<>]/;
  export const urlRegEx = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  export const urlHttpOrHttpsRegEx = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
  export const phoneNumberRegEx: RegExp = /^\d{10}$/;

  export const getRegExFromString = (regexString?: string): RegExp => {
    if (!regexString) {
      return /.*/;
    }

    // Remove leading and trailing slashes if they exist
    const trimmed = regexString.replace(/^\/|\/$/g, '');
    return new RegExp(trimmed);
  };
}
