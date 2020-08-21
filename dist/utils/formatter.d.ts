export declare const DEFAULT_CVC_LENGTH = 3;
export declare const DEFAULT_ZIP_LENGTH = 5;
export declare const DEFAULT_CARD_FORMAT: RegExp;
export declare const CARD_TYPES: ({
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn?: undefined;
} | {
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn: boolean;
})[];
export declare const getCardTypeByValue: (value: any) => {
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn?: undefined;
} | {
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn: boolean;
};
export declare const getCardTypeByType: (type: any) => {
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn?: undefined;
} | {
    type: string;
    format: RegExp;
    startPattern: RegExp;
    maxCardNumberLength: number;
    cvcLength: number;
    luhn: boolean;
};
export declare const hasCardNumberReachedMaxLength: (currentValue: any, currentValueLength: any) => boolean;
export declare const hasCVCReachedMaxLength: (type: any, currentValueLength: any) => boolean;
export declare const hasZipReachedMaxLength: (type: any, currentValueLength: any) => boolean;
export declare const formatCardNumber: (cardNumber: any) => any;
export declare const formatCvc: (cvc: any) => any;
export declare const formatExpiry: (event: any) => any;
export declare const isHighlighted: () => boolean;
