import React, {
  Component,
  ChangeEvent,
  FocusEvent,
  DOMAttributes,
  CSSProperties,
} from 'react';
import payment from 'payment';
import creditCardType from 'credit-card-type';
import styled from './utils/styled';
import {
  formatCardNumber,
  formatExpiry,
  formatCvc,
  hasCardNumberReachedMaxLength,
  hasCVCReachedMaxLength,
  hasZipReachedMaxLength,
  isHighlighted,
} from './utils/formatter';
import images from './utils/images';
import isExpiryInvalid from './utils/is-expiry-invalid';
import isZipValid from './utils/is-zip-valid';
import { CreditCardType } from 'credit-card-type/dist/types';

const Container = styled.div`
  display: inline-block;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  overflow: hidden;

  &.is-invalid {
    border: 1px solid ${(props) => props.theme.colors.red[500]};
  }
`;

const CardImage = styled.img`
  height: 1em;
`;

interface InputWrapperProps {
  isActive?: boolean;
  translateX?: boolean;
  isZipActive?: boolean;
}

const InputWrapper = styled.label<InputWrapperProps>`
  align-items: center;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  margin-left: 0.5em;
  position: relative;
  transition: transform 0.5s;
  transform: translateX(${(props) => (props.translateX ? '4rem' : '0')});

  &::after {
    content: attr(data-max);
    visibility: hidden;
    height: 0;
  }

  & .credit-card-input {
    border: 0px;
    position: absolute;
    width: 100%;
    font-size: 1em;

    &:focus {
      outline: 0px;
    }
  }

  & .zip-input {
    display: ${(props) => (props.isZipActive ? 'flex' : 'none')};
  }
`;

const DangerText = styled.p`
  font-size: 0.8rem;
  margin: 5px 0 0 0;
  color: ${(props) => props.theme.colors.red[500]};
`;

const BACKSPACE_KEY_CODE = 8;
const CARD_TYPES = {
  mastercard: 'MASTERCARD',
  visa: 'VISA',
  amex: 'AMERICAN_EXPRESS',
} as const;

type InputProps = DOMAttributes<HTMLInputElement>;

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

const inputRenderer = ({ inputComponent, props }: any) => {
  const Input = inputComponent || 'input';
  return <Input {...props} />;
};

class CreditCardInput extends Component<Props, State> {
  public cardExpiryField: any;
  public cardNumberField: any;
  public cvcField: any;
  public zipField: any;
  public CARD_TYPES: Record<string, string>;
  public images: Record<string, string>;
  public static readonly defaultProps = {
    cardCVCInputRenderer: inputRenderer,
    cardExpiryInputRenderer: inputRenderer,
    cardNumberInputRenderer: inputRenderer,
    cardZipInputRenderer: inputRenderer,
    cardExpiryInputProps: {},
    cardNumberInputProps: {},
    cardCVCInputProps: {},
    cardZipInputProps: {},
    cardImageClassName: '',
    cardImageStyle: {},
    containerClassName: '',
    containerStyle: {},
    dangerTextClassName: '',
    dangerTextStyle: {},
    enableZipInput: false,
    fieldClassName: '',
    fieldStyle: {},
    inputComponent: 'input',
    inputClassName: '',
    inputStyle: {},
    invalidClassName: 'is-invalid',
    invalidStyle: {},
    customTextLabels: {},
  };

  constructor(props: Props) {
    super(props);
    this.CARD_TYPES = Object.assign({}, CARD_TYPES, props.CARD_TYPES);
    this.images = Object.assign({}, images, props.images);
    this.state = {
      cardImage: this.images.placeholder,
      cardNumberLength: 0,
      cardNumber: null,
      errorText: null,
      showZip: false,
    };
  }
  public readonly componentDidMount = () => {
    this.setState({ cardNumber: this.cardNumberField.value }, () => {
      const cardType = payment.fns.cardType(this.state.cardNumber);
      const images = this.images;
      this.setState({
        cardImage: images[cardType] || images.placeholder,
      });
    });
  };
  public readonly isMonthDashKey = ({ key, target: { value } }: any = {}) => {
    return !value.match(/[/-]/) && /^[/-]$/.test(key);
  };
  public readonly checkIsNumeric = (e: any) => {
    if (!/^\d*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  public readonly handleCardNumberBlur = (
    { onBlur }: { onBlur?: Function | undefined } = { onBlur: null }
  ) => (e: FocusEvent<any>) => {
    const { customTextLabels } = this.props;
    if (!payment.fns.validateCardNumber(e.target.value)) {
      this.setFieldInvalid(
        customTextLabels.invalidCardNumber || 'Card number is invalid',
        'cardNumber'
      );
    }

    const { cardNumberInputProps } = this.props;
    cardNumberInputProps.onBlur && cardNumberInputProps.onBlur(e);
    onBlur && onBlur(e);
  };
  public readonly handleCardNumberChange = (
    { onChange }: { onChange?: Function | undefined } = { onChange: null }
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const {
      customTextLabels,
      enableZipInput,
      cardNumberInputProps,
    } = this.props;
    const images = this.images;
    const cardNumber = e.target.value;
    const cardNumberLength = cardNumber.split(' ').join('').length;
    const cardType = payment.fns.cardType(cardNumber);
    const cardTypeInfo =
      creditCardType.getTypeInfo(
        creditCardType.types[this.CARD_TYPES[cardType]]
      ) || ({} as CreditCardType);
    const cardTypeLengths = cardTypeInfo.lengths || [16];

    this.cardNumberField.value = formatCardNumber(cardNumber);

    this.setState({
      cardImage: images[cardType] || images.placeholder,
      cardNumber,
    });

    if (enableZipInput) {
      this.setState({ showZip: cardNumberLength >= 6 });
    }

    this.setFieldValid();
    if (cardTypeLengths) {
      const lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];
      for (let length of cardTypeLengths) {
        if (
          length === cardNumberLength &&
          payment.fns.validateCardNumber(cardNumber)
        ) {
          this.cardExpiryField.focus();
          break;
        }
        if (cardNumberLength === lastCardTypeLength) {
          this.setFieldInvalid(
            customTextLabels.invalidCardNumber || 'Card number is invalid',
            'cardNumber'
          );
        }
      }
    }

    cardNumberInputProps.onChange && cardNumberInputProps.onChange(e);
    onChange && onChange(e);
  };
  public readonly handleCardNumberKeyPress = (e: any) => {
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' ').join('').length;
      if (hasCardNumberReachedMaxLength(value, valueLength)) {
        e.preventDefault();
      }
    }
  };
  public readonly handleCardExpiryBlur = (
    { onBlur }: { onBlur?: Function | undefined } = { onBlur: null }
  ) => (e: FocusEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;
    const cardExpiry = e.target.value.split(' / ').join('/');
    const expiryError = isExpiryInvalid(
      cardExpiry,
      customTextLabels.expiryError
    );

    if (expiryError) {
      this.setFieldInvalid(expiryError, 'cardExpiry');
    }

    const { cardExpiryInputProps } = this.props;
    cardExpiryInputProps.onBlur && cardExpiryInputProps.onBlur(e);
    onBlur && onBlur(e);
  };
  public readonly handleCardExpiryChange = (
    { onChange }: { onChange?: Function | undefined } = { onChange: null }
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;

    this.cardExpiryField.value = formatExpiry(e);
    const value = this.cardExpiryField.value.split(' / ').join('/');

    this.setFieldValid();

    const expiryError = isExpiryInvalid(value, customTextLabels.expiryError);
    if (value.length > 4) {
      if (expiryError) {
        this.setFieldInvalid(expiryError, 'cardExpiry');
      } else {
        this.cvcField.focus();
      }
    }

    const { cardExpiryInputProps } = this.props;
    cardExpiryInputProps.onChange && cardExpiryInputProps.onChange(e);
    onChange && onChange(e);
  };
  public readonly handleCardExpiryKeyPress = (e: any) => {
    const value = e.target.value;

    if (!this.isMonthDashKey(e)) {
      this.checkIsNumeric(e);
    }

    if (value && !isHighlighted()) {
      const valueLength = value.split(' / ').join('').length;
      if (valueLength >= 4) {
        e.preventDefault();
      }
    }
  };
  public readonly handleCardCVCBlur = (
    { onBlur }: { onBlur?: Function | undefined } = { onBlur: null }
  ) => (e: FocusEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;
    if (!payment.fns.validateCardCVC(e.target.value)) {
      this.setFieldInvalid(
        customTextLabels.invalidCvc || 'CVC is invalid',
        'cardCVC'
      );
    }

    const { cardCVCInputProps } = this.props;
    cardCVCInputProps.onBlur && cardCVCInputProps.onBlur(e);
    onBlur && onBlur(e);
  };
  public readonly handleCardCVCChange = (
    { onChange }: { onChange?: Function | undefined } = { onChange: null }
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;
    const value = formatCvc(e.target.value);
    this.cvcField.value = value;
    const CVC = value;
    const CVCLength = CVC.length;
    const isZipFieldAvailable = this.props.enableZipInput && this.state.showZip;
    const cardType = payment.fns.cardType(this.state.cardNumber);

    this.setFieldValid();
    if (CVCLength >= 4) {
      if (!payment.fns.validateCardCVC(CVC, cardType)) {
        this.setFieldInvalid(
          customTextLabels.invalidCvc || 'CVC is invalid',
          'cardCVC'
        );
      }
    }

    if (isZipFieldAvailable && hasCVCReachedMaxLength(cardType, CVCLength)) {
      this.zipField.focus();
    }

    const { cardCVCInputProps } = this.props;
    cardCVCInputProps.onChange && cardCVCInputProps.onChange(e);
    onChange && onChange(e);
  };
  public readonly handleCardCVCKeyPress = (e: any) => {
    const cardType = payment.fns.cardType(this.state.cardNumber);
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' / ').join('').length;
      if (hasCVCReachedMaxLength(cardType, valueLength)) {
        e.preventDefault();
      }
    }
  };
  public readonly handleCardZipBlur = (
    { onBlur }: { onBlur?: Function | undefined } = { onBlur: null }
  ) => (e: FocusEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;
    if (!isZipValid(e.target.value)) {
      this.setFieldInvalid(
        customTextLabels.invalidZipCode || 'Zip code is invalid',
        'cardZip'
      );
    }

    const { cardZipInputProps } = this.props;
    cardZipInputProps.onBlur && cardZipInputProps.onBlur(e);
    onBlur && onBlur(e);
  };
  public readonly handleCardZipChange = (
    { onChange }: { onChange?: Function | undefined } = { onChange: null }
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const { customTextLabels } = this.props;
    const zip = e.target.value;
    const zipLength = zip.length;

    this.setFieldValid();

    if (zipLength >= 5 && !isZipValid(zip)) {
      this.setFieldInvalid(
        customTextLabels.invalidZipCode || 'Zip code is invalid',
        'cardZip'
      );
    }

    const { cardZipInputProps } = this.props;
    cardZipInputProps.onChange && cardZipInputProps.onChange(e);
    onChange && onChange(e);
  };
  public readonly handleCardZipKeyPress = (e: any) => {
    const cardType = payment.fns.cardType(this.state.cardNumber);
    const value = e.target.value;
    this.checkIsNumeric(e);
    if (value && !isHighlighted()) {
      const valueLength = value.split(' / ').join('').length;
      if (hasZipReachedMaxLength(cardType, valueLength)) {
        e.preventDefault();
      }
    }
  };
  public readonly handleKeyDown = (ref: any) => {
    return (e: any) => {
      if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
        ref.focus();
      }
    };
  };
  public readonly setFieldInvalid = (errorText: string, inputName?: string) => {
    const { invalidClassName, onError } = this.props;
    document.getElementById('field-wrapper').classList.add(invalidClassName);
    this.setState({ errorText });

    if (inputName) {
      // @ts-ignore
      const { onError } = this.props[`${inputName}InputProps`];
      onError && onError(errorText);
    }

    if (onError) {
      onError({ inputName, error: errorText });
    }
  };
  public readonly setFieldValid = () => {
    const { invalidClassName } = this.props;
    // $FlowFixMe
    document.getElementById('field-wrapper').classList.remove(invalidClassName);
    this.setState({ errorText: null });
  };
  public readonly render = () => {
    const { cardImage, errorText, showZip } = this.state;
    const {
      cardImageClassName,
      cardImageStyle,
      cardCVCInputProps,
      cardZipInputProps,
      cardExpiryInputProps,
      cardNumberInputProps,
      cardCVCInputRenderer,
      cardExpiryInputRenderer,
      cardNumberInputRenderer,
      cardZipInputRenderer,
      containerClassName,
      containerStyle,
      dangerTextClassName,
      dangerTextStyle,
      enableZipInput,
      fieldClassName,
      fieldStyle,
      inputClassName,
      inputComponent,
      inputStyle,
      invalidStyle,
      customTextLabels,
    } = this.props;

    return (
      <Container className={containerClassName}>
        <FieldWrapper
          id="field-wrapper"
          className={fieldClassName}
          style={fieldStyle}
        >
          <CardImage
            className={cardImageClassName}
            style={fieldStyle}
            src={cardImage}
          />

          <InputWrapper
            isActive
            translateX={false}
            data-max="9999 9999 9999 9999 9999"
          >
            {cardNumberInputRenderer({
              inputComponent,
              // @ts-ignore
              handleCardNumberChange: (onChange) =>
                this.handleCardNumberChange({ onChange }),
              // @ts-ignore
              handleCardNumberBlur: (onBlur) =>
                this.handleCardNumberBlur({ onBlur }),
              props: {
                id: 'card-number',
                // @ts-ignore
                ref: (cardNumberField) => {
                  this.cardNumberField = cardNumberField;
                },
                maxLength: '19',
                autoComplete: 'cc-number',
                className: `credit-card-input ${inputClassName}`,
                placeholder:
                  customTextLabels.cardNumberPlaceholder || 'Card number',
                type: 'tel',
                ...cardNumberInputProps,
                onBlur: this.handleCardNumberBlur(),
                onChange: this.handleCardNumberChange(),
                onKeyPress: this.handleCardNumberKeyPress,
              },
            })}
          </InputWrapper>
          <InputWrapper
            isActive
            data-max="MM / YY 9"
            translateX={enableZipInput && !showZip}
          >
            {cardExpiryInputRenderer({
              inputComponent,
              // @ts-ignore
              handleCardExpiryChange: (onChange) =>
                this.handleCardExpiryChange({ onChange }),
              // @ts-ignore
              handleCardExpiryBlur: (onBlur) =>
                this.handleCardExpiryBlur({ onBlur }),
              props: {
                id: 'card-expiry',
                // @ts-ignore
                ref: (cardExpiryField) => {
                  this.cardExpiryField = cardExpiryField;
                },
                autoComplete: 'cc-exp',
                className: `credit-card-input ${inputClassName}`,
                placeholder: customTextLabels.expiryPlaceholder || 'MM/YY',
                type: 'tel',
                ...cardExpiryInputProps,
                onBlur: this.handleCardExpiryBlur(),
                onChange: this.handleCardExpiryChange(),
                onKeyDown: this.handleKeyDown(this.cardNumberField),
                onKeyPress: this.handleCardExpiryKeyPress,
              },
            })}
          </InputWrapper>
          <InputWrapper
            isActive
            data-max="99999"
            translateX={enableZipInput && !showZip}
          >
            {cardCVCInputRenderer({
              inputComponent,
              // @ts-ignore
              handleCardCVCChange: (onChange) =>
                this.handleCardCVCChange({ onChange }),
              // @ts-ignore
              handleCardCVCBlur: (onBlur) => this.handleCardCVCBlur({ onBlur }),
              props: {
                id: 'cvc',
                // @ts-ignore
                ref: (cvcField) => {
                  this.cvcField = cvcField;
                },
                maxLength: '5',
                autoComplete: 'off',
                className: `credit-card-input ${inputClassName}`,
                placeholder: customTextLabels.cvcPlaceholder || 'CVC',
                type: 'tel',
                ...cardCVCInputProps,
                onBlur: this.handleCardCVCBlur(),
                onChange: this.handleCardCVCChange(),
                onKeyDown: this.handleKeyDown(this.cardExpiryField),
                onKeyPress: this.handleCardCVCKeyPress,
              },
            })}
          </InputWrapper>
          <InputWrapper
            data-max="999999"
            isActive={enableZipInput}
            isZipActive={showZip}
            translateX={enableZipInput && !showZip}
          >
            {cardZipInputRenderer({
              inputComponent,
              // @ts-ignore
              handleCardZipChange: (onChange) =>
                this.handleCardZipChange({ onChange }),
              // @ts-ignore
              handleCardZipBlur: (onBlur) => this.handleCardZipBlur({ onBlur }),
              props: {
                id: 'zip',
                // @ts-ignore
                ref: (zipField) => {
                  this.zipField = zipField;
                },
                maxLength: '6',
                className: `credit-card-input zip-input ${inputClassName}`,
                pattern: '[0-9]*',
                placeholder: customTextLabels.zipPlaceholder || 'Zip',
                type: 'text',
                ...cardZipInputProps,
                onBlur: this.handleCardZipBlur(),
                onChange: this.handleCardZipChange(),
                onKeyDown: this.handleKeyDown(this.cvcField),
                onKeyPress: this.handleCardZipKeyPress,
              },
            })}
          </InputWrapper>
        </FieldWrapper>
        {errorText && (
          <DangerText className={dangerTextClassName}>{errorText}</DangerText>
        )}
      </Container>
    );
  };
}

export default CreditCardInput;
