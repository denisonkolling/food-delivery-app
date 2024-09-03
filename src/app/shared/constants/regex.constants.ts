export const REGEX = {
    // Validates if the string is a valid email address.
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Validates if the string is a valid password.
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

    // Validates if the string is a valid full name.
    NAME: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,

    // Validates if the string is a valid full name.
    NUMBER: /^[1-9]*$/,
};