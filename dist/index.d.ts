import { Component, ChangeEvent, FocusEvent, DOMAttributes, CSSProperties } from 'react';
declare type InputProps = DOMAttributes<HTMLInputElement>;
interface Props {
    CARD_TYPES: Record<string, string>;
    cardCVCInputRenderer: Function;
    cardExpiryInputRenderer: Function;
    cardNumberInputRenderer: Function;
    cardZipInputRenderer: Function;
    onError?: Function;
    cardExpiryInputProps: InputProps;
    cardNumberInputProps: InputProps;
    cardCVCInputProps: InputProps;
    cardZipInputProps: InputProps;
    cardImageClassName: string;
    cardImageStyle: CSSProperties;
    containerClassName: string;
    containerStyle: CSSProperties;
    dangerTextClassName: string;
    dangerTextStyle: CSSProperties;
    fieldClassName: string;
    fieldStyle: CSSProperties;
    enableZipInput: boolean;
    images: Record<string, string>;
    inputComponent: Function | any | string;
    inputClassName: string;
    inputStyle: any;
    invalidClassName: string;
    invalidStyle: any;
    customTextLabels: any;
}
interface State {
    cardImage: string;
    cardNumberLength: number;
    cardNumber: string | undefined;
    errorText: string | undefined;
    showZip: boolean;
}
declare class CreditCardInput extends Component<Props, State> {
    cardExpiryField: any;
    cardNumberField: any;
    cvcField: any;
    zipField: any;
    CARD_TYPES: Record<string, string>;
    images: Record<string, string>;
    static readonly defaultProps: {
        cardCVCInputRenderer: ({ inputComponent, props }: any) => JSX.Element;
        cardExpiryInputRenderer: ({ inputComponent, props }: any) => JSX.Element;
        cardNumberInputRenderer: ({ inputComponent, props }: any) => JSX.Element;
        cardZipInputRenderer: ({ inputComponent, props }: any) => JSX.Element;
        cardExpiryInputProps: {};
        cardNumberInputProps: {};
        cardCVCInputProps: {};
        cardZipInputProps: {};
        cardImageClassName: string;
        cardImageStyle: {};
        containerClassName: string;
        containerStyle: {};
        dangerTextClassName: string;
        dangerTextStyle: {};
        enableZipInput: boolean;
        fieldClassName: string;
        fieldStyle: {};
        inputComponent: string;
        inputClassName: string;
        inputStyle: {};
        invalidClassName: string;
        invalidStyle: {};
        customTextLabels: {};
    };
    constructor(props: Props);
    readonly componentDidMount: () => void;
    readonly isMonthDashKey: ({ key, target: { value } }?: any) => boolean;
    readonly checkIsNumeric: (e: any) => void;
    readonly handleCardNumberBlur: ({ onBlur }?: {
        onBlur?: Function | undefined;
    }) => (e: FocusEvent<any>) => void;
    readonly handleCardNumberChange: ({ onChange }?: {
        onChange?: Function | undefined;
    }) => (e: ChangeEvent<HTMLInputElement>) => void;
    readonly handleCardNumberKeyPress: (e: any) => void;
    readonly handleCardExpiryBlur: ({ onBlur }?: {
        onBlur?: Function | undefined;
    }) => (e: FocusEvent<HTMLInputElement>) => void;
    readonly handleCardExpiryChange: ({ onChange }?: {
        onChange?: Function | undefined;
    }) => (e: ChangeEvent<HTMLInputElement>) => void;
    readonly handleCardExpiryKeyPress: (e: any) => void;
    readonly handleCardCVCBlur: ({ onBlur }?: {
        onBlur?: Function | undefined;
    }) => (e: FocusEvent<HTMLInputElement>) => void;
    readonly handleCardCVCChange: ({ onChange }?: {
        onChange?: Function | undefined;
    }) => (e: ChangeEvent<HTMLInputElement>) => void;
    readonly handleCardCVCKeyPress: (e: any) => void;
    readonly handleCardZipBlur: ({ onBlur }?: {
        onBlur?: Function | undefined;
    }) => (e: FocusEvent<HTMLInputElement>) => void;
    readonly handleCardZipChange: ({ onChange }?: {
        onChange?: Function | undefined;
    }) => (e: ChangeEvent<HTMLInputElement>) => void;
    readonly handleCardZipKeyPress: (e: any) => void;
    readonly handleKeyDown: (ref: any) => (e: any) => void;
    readonly setFieldInvalid: (errorText: string, inputName?: string) => void;
    readonly setFieldValid: () => void;
    readonly render: () => JSX.Element;
}
export default CreditCardInput;
