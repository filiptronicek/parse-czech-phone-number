interface ParsedNumber {
    /**
     * `prefix` is the '+420' part of '+420 123456789'.
     */
    prefix: string;
    /**
     * `prefix` is the '123456789' part of '+420 123456789'.
     */
    numberPart: string;
}

/**
 * @param phoneNumber the phone number to parse
 * @returns an object with two values: `prefix` and `numberPart`
 */
const parsePhoneNumber = (phoneNumber: string): ParsedNumber => {
    if (!phoneNumber.includes('+') || phoneNumber.substring(0, 2) === '00') {
        if (phoneNumber.indexOf('00') === 0) {
            phoneNumber = phoneNumber.replace('00', '');
        }
        phoneNumber = `+420 ${phoneNumber}`;
    }

    phoneNumber = phoneNumber.replaceAll(' ', '');

    const prefix = phoneNumber.substring(0, 4);
    const numberPart = phoneNumber.substring(4);
    return { prefix, numberPart }
}

/**
 * @param phoneNumber the phone number to format
 * @returns a human-readable string representing the phone number, e.g. `+420 123 456 789`
 */
const formatMobilePhone = (phoneNumber: string): string => {
    const { prefix, numberPart } = parsePhoneNumber(phoneNumber);
    phoneNumber = `${prefix} ${numberPart.substring(0, 3)} ${numberPart.substring(3, 6)} ${numberPart.substring(6, 9)}`;
    return phoneNumber;
};

export { parsePhoneNumber as default, formatMobilePhone };
