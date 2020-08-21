interface CustomExpiryErrorTexts {
    invalidExpiryDate?: string;
    monthOutOfRange?: string;
    yearOutOfRange?: string;
    dateOutOfRange?: string;
}
declare const _default: (expiryDate: string, customExpiryErrorTexts?: CustomExpiryErrorTexts) => string | false;
export default _default;
