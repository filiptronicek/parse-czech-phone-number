import isMobilePhone from 'validator/lib/isMobilePhone';

interface ParsedNumber {
    /**
     * `prefix` is the '+420' part of '+420 123456789'.
     */
    prefix: string;
    /**
     * `prefix` is the '123456789' part of '+420 123456789'.
     */
    numberParts: string[];
}

/**
 * @param phoneNumber the phone number to parse
 * @param prefferedCountryCode an optional country code to be used if one is not specified
 * @returns an object with two values: `prefix` and `numberPart`
 */
const parsePhoneNumber = (phoneNumber: string, prefferedCountryCode = 420): ParsedNumber => {
    if (!phoneNumber.includes('+') || phoneNumber.substring(0, 2) === '00') {
        if (phoneNumber.indexOf('00') === 0) {
            phoneNumber = phoneNumber.replace(/00\d{3}/, '');
        }
        phoneNumber = `+${prefferedCountryCode} ${phoneNumber}`;
    }
    phoneNumber = phoneNumber.replaceAll(' ', '');

    if (phoneNumber.length < 9 || !isMobilePhone(phoneNumber, ['cs-CZ', 'sk-SK'])) {
        throw new Error("The provided phone number has an invalid format");
    }

    const prefix = phoneNumber.substring(0, 4);
    const numberParts = phoneNumber.substring(4).split(/(?<=^(?:.{3})+)(?!$)/);

    return { prefix, numberParts }
}

/**
 * @param phoneNumber the phone number to format
 * @returns a human-readable string representing the phone number, e.g. `+420 123 456 789`
 */
const formatMobilePhone = (phoneNumber): string => {
    const { prefix, numberParts } = parsePhoneNumber(phoneNumber);
    phoneNumber = `${prefix} ${numberParts.join(" ")}`;
    return phoneNumber;
};

export { parsePhoneNumber as default, formatMobilePhone };
