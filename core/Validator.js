export const PATTERN_NAME = /[a-z ,.'-]+/;
export const PATTERN_DOB = /\d{1,2}\/\d{1,2}\/\d{4}/;
export const PATTERN_EMAIL = /\S+@\S+\.\S+/;
export const PATTERN_GROUPNAME = /[a-z ,.'-]+/;
export const PATTERN_GROUPID = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
export const PATTERN_PASSWORD = /[a-z0-9]{8,}/;
export const PATTERN_FULLNAME = /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/;

export const NameValidator = (value) => {
	return RegExpValidator(PATTERN_NAME, value);
};

export const DOBValidator = (value) => {
	return RegExpValidator(PATTERN_DOB, value);
};

export const EmailValidator = (value) => {
	return RegExpValidator(PATTERN_EMAIL, value);
};

export const GroupNameValidator = (value) => {
	return RegExpValidator(PATTERN_GROUPNAME, value);
};

export const GroupIdValidator = (value) => {
	return RegExpValidator(PATTERN_GROUPID, value);
};

export const PasswordValidator = (value) => {
	return RegExpValidator(PATTERN_PASSWORD, value);
};

export const PhoneNumberValidator = (value) => {
	return RegExpValidator(PATTERN_PHONE, value);
};

export const StringValidator = (value) => {
	return !!value && value.length > 0;
};

const RegExpValidator = (regexp, value) => {
	return regexp.test(value);
};
