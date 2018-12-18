import l from "./log";
import DOMPurify from "dompurify";

const {
	isString,
	isArray,
	isBoolean,
	isObject,
	forEach,
	escape,
	toSafeInteger,
	toNumber,
	deburr
} = lodash;

const sanitizeHtml = value => {
	if (!isString(value)) {
		return "";
	}
	value = DOMPurify.sanitize(value);

	return value;
};

const sanitizeId = value => {
	if (!isString(value)) {
		return "";
	}
	value = deburr(value);
	value = value.replace(/[^\w-]/g, "");

	return value;
};

const sanitizeText = value => {
	if (!isString(value)) {
		return "";
	}
	value = escape(value);
	// value = DOMPurify.sanitize(value);

	return value;
};

const sanitizeBoolean = value => {
	return isBoolean(value) && value === true ? true : false;
};

const sanitizeFloat = value => {
	value = toNumber(value);
	value = Math.abs(value);
	value = Math.round(100 * value) / 100;

	return value;
};

const sanitizeInteger = value => {
	value = toSafeInteger(value);
	value = Math.abs(value);

	return value;
};

const sanitizeArray = value => {
	if (!isArray(value)) {
		return [];
	}

	return value;
};

const sanitizeObject = value => {
	if (!isObject(value)) {
		return {};
	}

	return value;
};

const sanitizeArrayId = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeId(array_value);
	});

	return value;
};

const sanitizeArrayInteger = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeInteger(array_value);
	});

	return value;
};

const sanitizeArrayText = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeText(array_value);
	});

	return value;
};

const sanitizeArrayEmpty = () => {
	return [];
};

const sanitizeObjectEmpty = () => {
	return {};
};

const sanitizeObjectText = value => {
	value = sanitizeObject(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeText(array_value);
	});

	return value;
};

const sanitizeArrayObjectText = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeObjectText(array_value);
	});

	return value;
};

export default {
	id: sanitizeId,
	html: sanitizeHtml,
	text: sanitizeText,
	boolean: sanitizeBoolean,
	float: sanitizeFloat,
	integer: sanitizeInteger,
	array: sanitizeArray,
	object: sanitizeObject,
	arrayId: sanitizeArrayId,
	arrayInteger: sanitizeArrayInteger,
	arrayText: sanitizeArrayText,
	arrayEmpty: sanitizeArrayEmpty,
	objectEmpty: sanitizeObjectEmpty,
	objectText: sanitizeObjectText,
	arrayObjectText: sanitizeArrayObjectText
};
