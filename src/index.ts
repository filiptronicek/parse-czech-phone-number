export const parseMobilePhone = (phoneNumber: string) => {
    if (!phoneNumber.includes('+') || phoneNumber.substring(0, 2) === '00') {
        if (phoneNumber.indexOf('00') === 0) {
            phoneNumber = phoneNumber.replace('00', '');
        }
        phoneNumber = `+420 ${phoneNumber}`;
    }

    phoneNumber = phoneNumber.replaceAll(' ', '');

    const prefix = phoneNumber.substring(0, 4);
    const numberPart = phoneNumber.substring(4);

    phoneNumber = `${prefix} ${numberPart.substring(0, 3)} ${numberPart.substring(
        3,
        6,
    )} ${numberPart.substring(6, 9)}`;

    return phoneNumber;
};
