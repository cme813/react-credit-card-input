import React, { Component } from 'react';
import payment from 'payment';
import creditCardType from 'credit-card-type';
import styled from '@emotion/styled';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var DEFAULT_CVC_LENGTH = 3;
var DEFAULT_ZIP_LENGTH = 5;
var DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
var CARD_TYPES = [{
  type: 'amex',
  format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  startPattern: /^3[47]/,
  maxCardNumberLength: 15,
  cvcLength: 4
}, {
  type: 'dankort',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^5019/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'hipercard',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
  maxCardNumberLength: 19,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'dinersclub',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(36|38|30[0-5])/,
  maxCardNumberLength: 14,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'discover',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(6011|65|64[4-9]|622)/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'jcb',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^35/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'laser',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(6706|6771|6709)/,
  maxCardNumberLength: 19,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'maestro',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
  maxCardNumberLength: 19,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'mastercard',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'unionpay',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^62/,
  maxCardNumberLength: 19,
  cvcLength: DEFAULT_CVC_LENGTH,
  luhn: false
}, {
  type: 'visaelectron',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^4(026|17500|405|508|844|91[37])/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'elo',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
  maxCardNumberLength: 16,
  cvcLength: DEFAULT_CVC_LENGTH
}, {
  type: 'visa',
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^4/,
  maxCardNumberLength: 19,
  cvcLength: DEFAULT_CVC_LENGTH
}];
var getCardTypeByValue = function getCardTypeByValue(value) {
  return CARD_TYPES.filter(function (cardType) {
    return cardType.startPattern.test(value);
  })[0];
};
var getCardTypeByType = function getCardTypeByType(type) {
  return CARD_TYPES.filter(function (cardType) {
    return cardType.type === type;
  })[0];
};
var hasCardNumberReachedMaxLength = function hasCardNumberReachedMaxLength(currentValue, currentValueLength) {
  var cardType = getCardTypeByValue(currentValue);
  return cardType && currentValueLength >= cardType.maxCardNumberLength;
};
var hasCVCReachedMaxLength = function hasCVCReachedMaxLength(type, currentValueLength) {
  var cardType = getCardTypeByType(type);

  if (!cardType) {
    return currentValueLength >= DEFAULT_CVC_LENGTH;
  }

  return currentValueLength >= cardType.cvcLength;
};
var hasZipReachedMaxLength = function hasZipReachedMaxLength(type, currentValueLength) {
  return currentValueLength >= DEFAULT_ZIP_LENGTH;
};
var formatCardNumber = function formatCardNumber(cardNumber) {
  var cardType = getCardTypeByValue(cardNumber);
  if (!cardType) return (cardNumber.match(/\d+/g) || []).join('');
  var format = cardType.format;

  if (format.global) {
    return cardNumber.match(format).join(' ');
  }

  var execResult = format.exec(cardNumber.split(' ').join(''));

  if (execResult) {
    return execResult.splice(1, 3).filter(function (x) {
      return x;
    }).join(' ');
  }

  return cardNumber;
};
var formatCvc = function formatCvc(cvc) {
  return (cvc.match(/\d+/g) || []).join('');
};
var formatExpiry = function formatExpiry(event) {
  var eventData = event.nativeEvent && event.nativeEvent.data;
  var prevExpiry = event.target.value.split(' / ').join('/');
  if (!prevExpiry) return null;
  var expiry = prevExpiry;

  if (/^[2-9]$/.test(expiry)) {
    expiry = "0" + expiry;
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    var head = prevExpiry[0],
        tail = prevExpiry.slice(1);
    expiry = "0" + head + "/" + tail.join('');
  }

  if (/^1[/-]$/.test(expiry)) {
    return "01 / ";
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];

  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
      return expiry[0];
    }

    if (/\d{2}/.test(expiry)) {
      return expiry[0] + " / ";
    }
  }

  if (expiry.length > 2) {
    var _ref = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [],
        month = _ref[1],
        year = _ref[2];

    return [month, year].join(' / ');
  }

  return expiry.join(' / ');
};
var isHighlighted = function isHighlighted() {
  return window.getSelection().type === 'Range';
};

var images = {
  placeholder: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTc2IDM3NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbGFjZWhvbGRlcjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InBsYWNlaG9sZGVyIj4gICAgICAgICAgICA8cGF0aCBkPSJNNTI3LjkzMzc5MywzNzYuOTk4MjggTDQ4LjA2NjIwNjksMzc2Ljk5ODI4IEMzNS40MjM0ODAzLDM3Ny4xMDM5NjggMjMuMjU2NTg2NCwzNzIuMTg3ODkgMTQuMjQyMzI4MSwzNjMuMzMxNjE4IEM1LjIyODA2OTc1LDM1NC40NzUzNDYgMC4xMDQ5MTcxMDIsMzQyLjQwNDQwNyAwLDMyOS43NzQ0OTQgTDAsNDcuMjI1NDU1NCBDMC4xMDQ5MTcxMDIsMzQuNTk1NTQyNSA1LjIyODA2OTc1LDIyLjUyNDYwNCAxNC4yNDIzMjgxLDEzLjY2ODMzMTkgQzIzLjI1NjU4NjQsNC44MTIwNTk4NSAzNS40MjM0ODAzLC0wLjEwNDAxODI5NiA0OC4wNjYyMDY5LDAuMDAxNjY5NDg2NDYgTDUyNy45MzM3OTMsMC4wMDE2Njk0ODY0NiBDNTQwLjU3NjUyLC0wLjEwNDAxODI5NiA1NTIuNzQzNDE0LDQuODEyMDU5ODUgNTYxLjc1NzY3MiwxMy42NjgzMzE5IEM1NzAuNzcxOTMsMjIuNTI0NjA0IDU3NS44OTUwODMsMzQuNTk1NTQyNSA1NzYsNDcuMjI1NDU1NCBMNTc2LDMyOS45NzI5MTMgQzU3NS42NzI3ODYsMzU2LjE5NTY2MyA1NTQuMTg0MjczLDM3Ny4yMTg4NTcgNTI3LjkzMzc5MywzNzYuOTk4MjggWiIgaWQ9InNoYXBlIiBmaWxsPSIjRThFQkVFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMjAiIHg9IjQxOCIgeT0iNTgiIHdpZHRoPSI5MSIgaGVpZ2h0PSI2MyIgcng9IjMwIj48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSI1MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzc1NzU3NSIgeD0iNDEzIiB5PSIyMDgiIHdpZHRoPSIxMDciIGhlaWdodD0iNDAiIHJ4PSI4Ij48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSIyOTMiIHk9IjIwOCIgd2lkdGg9IjEwNyIgaGVpZ2h0PSI0MCIgcng9IjgiPjwvcmVjdD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiM3NTc1NzUiIHg9IjE3MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+',
  visa: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1NzZweCIgaGVpZ2h0PSIzNzlweCIgdmlld0JveD0iMCAwIDU3NiAzNzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dmlzYTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InZpc2EiIGZpbGwtcnVsZT0ibm9uemVybyI+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzI2MzM3QSIgeD0iMCIgeT0iMCIgd2lkdGg9IjU3NiIgaGVpZ2h0PSIzNzkiIHJ4PSI1MiI+PC9yZWN0PiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iRmlsbC0zIiBmaWxsPSIjRkZGRkZFIiBwb2ludHM9IjIyMSAyNjggMjQyLjU1MTE5MyAxMTEgMjc3IDExMSAyNTUuNDUwNzc5IDI2OCAyMjEgMjY4Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOTQuNTIxOTgxLDExNy4zNzIyMjkgQzM4Ny4wNDE1NTcsMTE0LjMyNDA1NiAzNzUuMjc2NzEzLDExMSAzNjAuNjIwOTY4LDExMSBDMzIzLjIxNjY4MywxMTEgMjk2Ljg4Njk3NSwxMzEuNjEwNDk0IDI5Ni42Njg0MjcsMTYxLjEyMzI2OSBDMjk2LjQzMDQwMywxODIuOTUzOTI5IDMxNS40NTcxMjMsMTk1LjEyODY3OCAzMjkuODAxMjc0LDIwMi4zODQ2MzEgQzM0NC41NDM1NzQsMjA5LjgyMjI2MyAzNDkuNDk2NjIzLDIxNC41ODE4MDggMzQ5LjQzODE5OSwyMjEuMjMyMTY0IEMzNDkuMzM2NDk5LDIzMS40MDM5NTUgMzM3LjY3MTE5MSwyMzYuMDY0ODEyIDMyNi43OTM1MjUsMjM2LjA2NDgxMiBDMzExLjY0NjU4NywyMzYuMDY0ODEyIDMwMy41OTkyMzQsMjMzLjc3MDI3MiAyOTEuMTU3MTA1LDIyOC4xMDAwODcgTDI4Ni4yOTA2MTEsMjI1LjY4MjE4MyBMMjgxLDI1OS42Nzg2MiBDMjg5LjgyMjAxLDI2My45MDg4MjkgMzA2LjE3NjM3NywyNjcuNTgwNTQ0IDMyMy4xNDk2MDQsMjY3Ljc3MzQzOCBDMzYyLjkwMTY2NCwyNjcuNzczNDM4IDM4OC43MzE1MjIsMjQ3LjQxMTkxIDM4OS4wMzQ0NjIsMjE1Ljg5NjE4IEMzODkuMTcwNzg1LDE5OC41ODUwNjggMzc5LjA4OTQxNCwxODUuNDYzNzkzIDM1Ny4yNTYxODMsMTc0LjYzMDMzMiBDMzQ0LjAzNTA3LDE2Ny41ODc0NTkgMzM1LjkyMDYzOCwxNjIuOTIyMTE3IDMzNi4wMTM2ODMsMTU1Ljc5NDAxMiBDMzM2LjAyMjMzOSwxNDkuNDgyMzQzIDM0Mi44Njg3NTUsMTQyLjcyNDMyNiAzNTcuNjg2NzksMTQyLjcyNDMyNiBDMzcwLjA2MTgzOSwxNDIuNTE3OTc0IDM3OS4wMjAxNzEsMTQ1LjQ3NDE4NyAzODYuMDAwNzQ2LDE0OC41NjA0ODkgTDM4OS4zOTc5ODgsMTUwLjI5NjUzNSBMMzk0LjUyMTk4MSwxMTcuMzcyMjI5IiBpZD0iRmlsbC00IiBmaWxsPSIjRkZGRkZFIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTQ0OC4zNTgwMTIsMjEyLjI0NDQ0NCBDNDUxLjU4ODczMSwyMDMuMjE0NDE1IDQ2My44ODczMDgsMTY4LjMzMDk0IDQ2My44ODczMDgsMTY4LjMzMDk0IEM0NjMuNjU5ODg4LDE2OC43NDYyNDYgNDY3LjEwMDE4OSwxNTkuMjMxMzA2IDQ2OS4wNjg5NDIsMTUzLjM0Mjc2MSBMNDcxLjY5OTg5NCwxNjYuODkyNDQ2IEM0NzEuNjk5ODk0LDE2Ni44OTI0NDYgNDc5LjE4MDI2NSwyMDQuMzkwNzMyIDQ4MC43MjA5MzIsMjEyLjI0NDQ0NCBMNDQ4LjM1ODAxMiwyMTIuMjQ0NDQ0IFogTTQ5Ni40NTA4OTIsMTExIEw0NjYuMzI0MjgyLDExMSBDNDU2Ljk3OTk0OSwxMTEgNDQ5Ljk4NTYzNSwxMTMuNzc5NTQyIDQ0NS44OTIwNTQsMTI0LjAyMzAxIEwzODgsMjY4IEw0MjguOTQ0NzIxLDI2OCBDNDI4Ljk0NDcyMSwyNjggNDM1LjYyNDY1OSwyNDguNjMxMzc3IDQzNy4xNDA4MDEsMjQ0LjM4MDg2IEM0NDEuNjA2NzI2LDI0NC4zODA4NiA0ODEuMzkyMDQ2LDI0NC40NjIwNjUgNDg3LjA3MDg4NiwyNDQuNDYyMDY1IEM0ODguMjM5MjA2LDI0OS45NDQ1ODIgNDkxLjgxNzc0NCwyNjggNDkxLjgxNzc0NCwyNjggTDUyOCwyNjggTDQ5Ni40NTA4OTIsMTExIFoiIGlkPSJGaWxsLTUiIGZpbGw9IiNGRkZGRkUiPjwvcGF0aD4gICAgICAgICAgICA8cGF0aCBkPSJNMTg5Ljk1NTA2OCwxMTEgTDE1MS4xMjExNDYsMjE4LjIxOTk2NSBMMTQ2Ljk2MTU4NCwxOTYuNDI0Nzk3IEMxMzkuNzI0OSwxNzEuMzEyOTczIDExNy4xOTc5MTIsMTQ0LjA5NDU2MSA5MiwxMzAuNDU2MzIzIEwxMjcuNTI3NjA0LDI2OCBMMTY5LjUxODA3MywyNjcuOTc0NDUyIEwyMzIsMTExIEwxODkuOTU1MDY4LDExMSIgaWQ9IkZpbGwtNiIgZmlsbD0iI0ZGRkZGRSI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTMuOTE4NTUxLDExMSBMNDcuNTQ2MTM4LDExMSBMNDcsMTE0LjMxNDUzMyBDOTguNjQ1NDgwNiwxMjcuNTY1NTc5IDEzMi44MTY4NTUsMTU5LjU1MDk0MyAxNDcsMTk4IEwxMzIuNTc2NzQzLDEyNC40OTY3NDEgQzEzMC4wODg1MTMsMTE0LjM1OTQyIDEyMi44NTY4NzQsMTExLjM1NDM3IDExMy45MTg1NTEsMTExIiBpZD0iRmlsbC03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
  mastercard: 'data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAyMSI+ICA8ZyBpZD0iUGFnZS0xIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICA8ZyBpZD0ibWFzdGVyY2FyZCI+ICAgICAgPGcgaWQ9ImNhcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMikiPiAgICAgICAgPHBhdGggaWQ9InNoYXBlIiBmaWxsPSIjMDAzNjYzIiBkPSJNMjYuNTggMTlIMi40MkEyLjQgMi40IDAgMCAxIDAgMTYuNjJWMi4zOEEyLjQgMi40IDAgMCAxIDIuNDIgMGgyNC4xNkEyLjQgMi40IDAgMCAxIDI5IDIuMzh2MTQuMjVBMi40IDIuNCAwIDAgMSAyNi41OCAxOXoiLz4gICAgICAgIDxjaXJjbGUgaWQ9InNoYXBlIiBjeD0iMTAuNSIgY3k9IjkuNSIgcj0iNi41IiBmaWxsPSIjRUIxQzI2Ii8+ICAgICAgICA8Y2lyY2xlIGlkPSJzaGFwZSIgY3g9IjE4LjUiIGN5PSI5LjUiIHI9IjYuNSIgZmlsbD0iI0Y5OUYxQiIvPiAgICAgICAgPHBhdGggaWQ9InNoYXBlIiBmaWxsPSIjRUY1RDIwIiBkPSJNMTQuNSA0LjM4YTYuNDkgNi40OSAwIDAgMCAwIDEwLjI0IDYuNDkgNi40OSAwIDAgMCAwLTEwLjI0eiIvPiAgICAgIDwvZz4gICAgPC9nPiAgPC9nPjwvc3ZnPg==',
  amex: 'data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAyMSI+ICA8ZyBpZD0iUGFnZS0xIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICA8ZyBpZD0iYW1leCI+ICAgICAgPGcgaWQ9ImNhcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xIDIpIj4gICAgICAgIDxwYXRoIGlkPSJzaGFwZSIgZmlsbD0iIzFEOTFDRSIgZD0iTTI3LjU4IDE5SDMuNDJBMi40IDIuNCAwIDAgMSAxIDE2LjYyVjIuMzhBMi40IDIuNCAwIDAgMSAzLjQyIDBoMjQuMTZBMi40IDIuNCAwIDAgMSAzMCAyLjM4djE0LjI1QTIuNCAyLjQgMCAwIDEgMjcuNTggMTl6Ii8+ICAgICAgICA8cG9seWxpbmUgaWQ9InNoYXBlIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUuMDYzIDExLjg5NiA0LjU5MSAxMyAuMzYgMTMgMy42OTkgNiAxMS42NzQgNiAxMi40NzkgNy41NDYgMTMuMjMxIDYgMTYuMDY0IDYgMTcuNDkyIDYgMjMuOTgzIDYgMjQuOTAyIDYuOTYxIDI1Ljg4OSA2IDMwLjg4MiA2IDI3LjMzNyA5LjQ5MiAzMC43MjkgMTMgMjUuODk3IDEzIDI0LjgxNiAxMS45NjkgMjMuNzQ0IDEzIDE3LjQ5MiAxMyAxNi4wNjQgMTMgNi40OTYgMTMgNS45NzcgMTEuODk2Ii8+ICAgICAgICA8cGF0aCBpZD0ic2hhcGUiIGZpbGw9IiMxRDkxQ0UiIGQ9Ik01Ljk4IDExLjk3aC0uOTIuOTJ6TTE2LjIgN2gtMi4xbC0xLjU4IDMuMzVMMTAuODIgN2gtMi4xdjQuODVMNi41NSA3SDQuNThsLTIuMzIgNWgxLjQybC40Ny0xLjE0aDIuN0w3LjM5IDEySDEwVjcuOTNMMTEuODUgMTJoMS4yMmwxLjg0LTR2NGgxLjI5Vjd6bTguNjcgMS42MkwyMy4zNyA3aC02LjAydjVIMjMuMTdsMS42NS0xLjY0TDI2LjQ4IDEyaDEuNTVsLTIuMzctMi41M0wyOC4xIDdoLTEuNjJsLTEuNjEgMS42MnpNMjEuNyAxMWgtMy4wNlY5LjloMy4wNlY4LjloLTMuMDZWOGgzLjA2di0uODVsMi4yNyAyLjI3LTIuMjcgMi4yOFYxMXpNNS41MyA3LjgybC44OCAyLjAzSDQuNThsLjk1LTIuMDN6Ii8+ICAgICAgPC9nPiAgICA8L2c+ICA8L2c+PC9zdmc+'
};

var ERROR_TEXT__INVALID_EXPIRY_DATE = 'Expiry date is invalid';
var ERROR_TEXT__MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
var ERROR_TEXT__YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
var ERROR_TEXT__DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';
var EXPIRY_DATE_REGEX = /^(\d{2})\/(\d{4}|\d{2})$/;
var MONTH_REGEX = /(0[1-9]|1[0-2])/;
var isExpiryInvalid = (function (expiryDate, customExpiryErrorTexts) {
  if (customExpiryErrorTexts === void 0) {
    customExpiryErrorTexts = {};
  }

  var splitDate = expiryDate.split('/');

  if (!EXPIRY_DATE_REGEX.test(expiryDate)) {
    return customExpiryErrorTexts.invalidExpiryDate || ERROR_TEXT__INVALID_EXPIRY_DATE;
  }

  var expiryMonth = splitDate[0];

  if (!MONTH_REGEX.test(expiryMonth)) {
    return customExpiryErrorTexts.monthOutOfRange || ERROR_TEXT__MONTH_OUT_OF_RANGE;
  }

  var expiryYear = splitDate[1];
  var date = new Date();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth() + 1;
  currentYear = parseInt(expiryYear.length === 4 ? currentYear.toString() : currentYear.toString().substr(-2), 10);

  if (currentYear > parseInt(expiryYear, 10)) {
    return customExpiryErrorTexts.yearOutOfRange || ERROR_TEXT__YEAR_OUT_OF_RANGE;
  }

  if (parseInt(expiryYear, 10) === currentYear && parseInt(expiryMonth, 10) < currentMonth) {
    return customExpiryErrorTexts.dateOutOfRange || ERROR_TEXT__DATE_OUT_OF_RANGE;
  }

  return false;
});

var isZipValid = (function (zip) {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
});

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n  font-size: 0.8rem;\n  margin: 5px 0 0 0;\n  color: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n  align-items: center;\n  display: ", ";\n  margin-left: 0.5em;\n  position: relative;\n  transition: transform 0.5s;\n  transform: translateX(", ");\n\n  &::after {\n    content: attr(data-max);\n    visibility: hidden;\n    height: 0;\n  }\n\n  & .credit-card-input {\n    border: 0px;\n    position: absolute;\n    width: 100%;\n    font-size: 1em;\n\n    &:focus {\n      outline: 0px;\n    }\n  }\n\n  & .zip-input {\n    display: ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 1em;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: white;\n  padding: 10px;\n  border-radius: 3px;\n  overflow: hidden;\n\n  &.is-invalid {\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  display: inline-block;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Container = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject());
var FieldWrapper = /*#__PURE__*/styled.div( /*#__PURE__*/_templateObject2(), function (props) {
  return props.theme.colors.red[500];
});
var CardImage = /*#__PURE__*/styled.img( /*#__PURE__*/_templateObject3());
var InputWrapper = /*#__PURE__*/styled.label( /*#__PURE__*/_templateObject4(), function (props) {
  return props.isActive ? 'flex' : 'none';
}, function (props) {
  return props.translateX ? '4rem' : '0';
}, function (props) {
  return props.isZipActive ? 'flex' : 'none';
});
var DangerText = /*#__PURE__*/styled.p( /*#__PURE__*/_templateObject5(), function (props) {
  return props.theme.colors.red[500];
});
var BACKSPACE_KEY_CODE = 8;
var CARD_TYPES$1 = {
  mastercard: 'MASTERCARD',
  visa: 'VISA',
  amex: 'AMERICAN_EXPRESS'
};

var inputRenderer = function inputRenderer(_ref) {
  var inputComponent = _ref.inputComponent,
      props = _ref.props;
  var Input = inputComponent || 'input';
  return React.createElement(Input, Object.assign({}, props));
};

var CreditCardInput = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CreditCardInput, _Component);

  function CreditCardInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.componentDidMount = function () {
      _this.setState({
        cardNumber: _this.cardNumberField.value
      }, function () {
        var cardType = payment.fns.cardType(_this.state.cardNumber);
        var images = _this.images;

        _this.setState({
          cardImage: images[cardType] || images.placeholder
        });
      });
    };

    _this.isMonthDashKey = function (_temp) {
      var _ref2 = _temp === void 0 ? {} : _temp,
          key = _ref2.key,
          value = _ref2.target.value;

      return !value.match(/[/-]/) && /^[/-]$/.test(key);
    };

    _this.checkIsNumeric = function (e) {
      if (!/^\d*$/.test(e.key)) {
        e.preventDefault();
      }
    };

    _this.handleCardNumberBlur = function (_temp2) {
      var _ref3 = _temp2 === void 0 ? {
        onBlur: null
      } : _temp2,
          onBlur = _ref3.onBlur;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;

        if (!payment.fns.validateCardNumber(e.target.value)) {
          _this.setFieldInvalid(customTextLabels.invalidCardNumber || 'Card number is invalid', 'cardNumber');
        }

        var cardNumberInputProps = _this.props.cardNumberInputProps;
        cardNumberInputProps.onBlur && cardNumberInputProps.onBlur(e);
        onBlur && onBlur(e);
      };
    };

    _this.handleCardNumberChange = function (_temp3) {
      var _ref4 = _temp3 === void 0 ? {
        onChange: null
      } : _temp3,
          onChange = _ref4.onChange;

      return function (e) {
        var _this$props = _this.props,
            customTextLabels = _this$props.customTextLabels,
            enableZipInput = _this$props.enableZipInput,
            cardNumberInputProps = _this$props.cardNumberInputProps;
        var images = _this.images;
        var cardNumber = e.target.value;
        var cardNumberLength = cardNumber.split(' ').join('').length;
        var cardType = payment.fns.cardType(cardNumber);
        var cardTypeInfo = creditCardType.getTypeInfo(creditCardType.types[_this.CARD_TYPES[cardType]]) || {};
        var cardTypeLengths = cardTypeInfo.lengths || [16];
        _this.cardNumberField.value = formatCardNumber(cardNumber);

        _this.setState({
          cardImage: images[cardType] || images.placeholder,
          cardNumber: cardNumber
        });

        if (enableZipInput) {
          _this.setState({
            showZip: cardNumberLength >= 6
          });
        }

        _this.setFieldValid();

        if (cardTypeLengths) {
          var lastCardTypeLength = cardTypeLengths[cardTypeLengths.length - 1];

          for (var _iterator = _createForOfIteratorHelperLoose(cardTypeLengths), _step; !(_step = _iterator()).done;) {
            var length = _step.value;

            if (length === cardNumberLength && payment.fns.validateCardNumber(cardNumber)) {
              _this.cardExpiryField.focus();

              break;
            }

            if (cardNumberLength === lastCardTypeLength) {
              _this.setFieldInvalid(customTextLabels.invalidCardNumber || 'Card number is invalid', 'cardNumber');
            }
          }
        }

        cardNumberInputProps.onChange && cardNumberInputProps.onChange(e);
        onChange && onChange(e);
      };
    };

    _this.handleCardNumberKeyPress = function (e) {
      var value = e.target.value;

      _this.checkIsNumeric(e);

      if (value && !isHighlighted()) {
        var valueLength = value.split(' ').join('').length;

        if (hasCardNumberReachedMaxLength(value, valueLength)) {
          e.preventDefault();
        }
      }
    };

    _this.handleCardExpiryBlur = function (_temp4) {
      var _ref5 = _temp4 === void 0 ? {
        onBlur: null
      } : _temp4,
          onBlur = _ref5.onBlur;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;
        var cardExpiry = e.target.value.split(' / ').join('/');
        var expiryError = isExpiryInvalid(cardExpiry, customTextLabels.expiryError);

        if (expiryError) {
          _this.setFieldInvalid(expiryError, 'cardExpiry');
        }

        var cardExpiryInputProps = _this.props.cardExpiryInputProps;
        cardExpiryInputProps.onBlur && cardExpiryInputProps.onBlur(e);
        onBlur && onBlur(e);
      };
    };

    _this.handleCardExpiryChange = function (_temp5) {
      var _ref6 = _temp5 === void 0 ? {
        onChange: null
      } : _temp5,
          onChange = _ref6.onChange;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;
        _this.cardExpiryField.value = formatExpiry(e);

        var value = _this.cardExpiryField.value.split(' / ').join('/');

        _this.setFieldValid();

        var expiryError = isExpiryInvalid(value, customTextLabels.expiryError);

        if (value.length > 4) {
          if (expiryError) {
            _this.setFieldInvalid(expiryError, 'cardExpiry');
          } else {
            _this.cvcField.focus();
          }
        }

        var cardExpiryInputProps = _this.props.cardExpiryInputProps;
        cardExpiryInputProps.onChange && cardExpiryInputProps.onChange(e);
        onChange && onChange(e);
      };
    };

    _this.handleCardExpiryKeyPress = function (e) {
      var value = e.target.value;

      if (!_this.isMonthDashKey(e)) {
        _this.checkIsNumeric(e);
      }

      if (value && !isHighlighted()) {
        var valueLength = value.split(' / ').join('').length;

        if (valueLength >= 4) {
          e.preventDefault();
        }
      }
    };

    _this.handleCardCVCBlur = function (_temp6) {
      var _ref7 = _temp6 === void 0 ? {
        onBlur: null
      } : _temp6,
          onBlur = _ref7.onBlur;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;

        if (!payment.fns.validateCardCVC(e.target.value)) {
          _this.setFieldInvalid(customTextLabels.invalidCvc || 'CVC is invalid', 'cardCVC');
        }

        var cardCVCInputProps = _this.props.cardCVCInputProps;
        cardCVCInputProps.onBlur && cardCVCInputProps.onBlur(e);
        onBlur && onBlur(e);
      };
    };

    _this.handleCardCVCChange = function (_temp7) {
      var _ref8 = _temp7 === void 0 ? {
        onChange: null
      } : _temp7,
          onChange = _ref8.onChange;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;
        var value = formatCvc(e.target.value);
        _this.cvcField.value = value;
        var CVC = value;
        var CVCLength = CVC.length;
        var isZipFieldAvailable = _this.props.enableZipInput && _this.state.showZip;
        var cardType = payment.fns.cardType(_this.state.cardNumber);

        _this.setFieldValid();

        if (CVCLength >= 4) {
          if (!payment.fns.validateCardCVC(CVC, cardType)) {
            _this.setFieldInvalid(customTextLabels.invalidCvc || 'CVC is invalid', 'cardCVC');
          }
        }

        if (isZipFieldAvailable && hasCVCReachedMaxLength(cardType, CVCLength)) {
          _this.zipField.focus();
        }

        var cardCVCInputProps = _this.props.cardCVCInputProps;
        cardCVCInputProps.onChange && cardCVCInputProps.onChange(e);
        onChange && onChange(e);
      };
    };

    _this.handleCardCVCKeyPress = function (e) {
      var cardType = payment.fns.cardType(_this.state.cardNumber);
      var value = e.target.value;

      _this.checkIsNumeric(e);

      if (value && !isHighlighted()) {
        var valueLength = value.split(' / ').join('').length;

        if (hasCVCReachedMaxLength(cardType, valueLength)) {
          e.preventDefault();
        }
      }
    };

    _this.handleCardZipBlur = function (_temp8) {
      var _ref9 = _temp8 === void 0 ? {
        onBlur: null
      } : _temp8,
          onBlur = _ref9.onBlur;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;

        if (!isZipValid(e.target.value)) {
          _this.setFieldInvalid(customTextLabels.invalidZipCode || 'Zip code is invalid', 'cardZip');
        }

        var cardZipInputProps = _this.props.cardZipInputProps;
        cardZipInputProps.onBlur && cardZipInputProps.onBlur(e);
        onBlur && onBlur(e);
      };
    };

    _this.handleCardZipChange = function (_temp9) {
      var _ref10 = _temp9 === void 0 ? {
        onChange: null
      } : _temp9,
          onChange = _ref10.onChange;

      return function (e) {
        var customTextLabels = _this.props.customTextLabels;
        var zip = e.target.value;
        var zipLength = zip.length;

        _this.setFieldValid();

        if (zipLength >= 5 && !isZipValid(zip)) {
          _this.setFieldInvalid(customTextLabels.invalidZipCode || 'Zip code is invalid', 'cardZip');
        }

        var cardZipInputProps = _this.props.cardZipInputProps;
        cardZipInputProps.onChange && cardZipInputProps.onChange(e);
        onChange && onChange(e);
      };
    };

    _this.handleCardZipKeyPress = function (e) {
      var cardType = payment.fns.cardType(_this.state.cardNumber);
      var value = e.target.value;

      _this.checkIsNumeric(e);

      if (value && !isHighlighted()) {
        var valueLength = value.split(' / ').join('').length;

        if (hasZipReachedMaxLength(cardType, valueLength)) {
          e.preventDefault();
        }
      }
    };

    _this.handleKeyDown = function (ref) {
      return function (e) {
        if (e.keyCode === BACKSPACE_KEY_CODE && !e.target.value) {
          ref.focus();
        }
      };
    };

    _this.setFieldInvalid = function (errorText, inputName) {
      var _this$props2 = _this.props,
          invalidClassName = _this$props2.invalidClassName,
          onError = _this$props2.onError;
      document.getElementById('field-wrapper').classList.add(invalidClassName);

      _this.setState({
        errorText: errorText
      });

      if (inputName) {
        var _onError = _this.props[inputName + "InputProps"].onError;
        _onError && _onError(errorText);
      }

      if (onError) {
        onError({
          inputName: inputName,
          error: errorText
        });
      }
    };

    _this.setFieldValid = function () {
      var invalidClassName = _this.props.invalidClassName;
      document.getElementById('field-wrapper').classList.remove(invalidClassName);

      _this.setState({
        errorText: null
      });
    };

    _this.render = function () {
      var _this$state = _this.state,
          cardImage = _this$state.cardImage,
          errorText = _this$state.errorText,
          showZip = _this$state.showZip;
      var _this$props3 = _this.props,
          cardImageClassName = _this$props3.cardImageClassName,
          cardCVCInputProps = _this$props3.cardCVCInputProps,
          cardZipInputProps = _this$props3.cardZipInputProps,
          cardExpiryInputProps = _this$props3.cardExpiryInputProps,
          cardNumberInputProps = _this$props3.cardNumberInputProps,
          cardCVCInputRenderer = _this$props3.cardCVCInputRenderer,
          cardExpiryInputRenderer = _this$props3.cardExpiryInputRenderer,
          cardNumberInputRenderer = _this$props3.cardNumberInputRenderer,
          cardZipInputRenderer = _this$props3.cardZipInputRenderer,
          containerClassName = _this$props3.containerClassName,
          dangerTextClassName = _this$props3.dangerTextClassName,
          enableZipInput = _this$props3.enableZipInput,
          fieldClassName = _this$props3.fieldClassName,
          fieldStyle = _this$props3.fieldStyle,
          inputClassName = _this$props3.inputClassName,
          inputComponent = _this$props3.inputComponent,
          customTextLabels = _this$props3.customTextLabels;
      return React.createElement(Container, {
        className: containerClassName
      }, React.createElement(FieldWrapper, {
        id: "field-wrapper",
        className: fieldClassName,
        style: fieldStyle
      }, React.createElement(CardImage, {
        className: cardImageClassName,
        style: fieldStyle,
        src: cardImage
      }), React.createElement(InputWrapper, {
        isActive: true,
        translateX: false,
        "data-max": "9999 9999 9999 9999 9999"
      }, cardNumberInputRenderer({
        inputComponent: inputComponent,
        handleCardNumberChange: function handleCardNumberChange(onChange) {
          return _this.handleCardNumberChange({
            onChange: onChange
          });
        },
        handleCardNumberBlur: function handleCardNumberBlur(onBlur) {
          return _this.handleCardNumberBlur({
            onBlur: onBlur
          });
        },
        props: _extends({
          id: 'card-number',
          ref: function ref(cardNumberField) {
            _this.cardNumberField = cardNumberField;
          },
          maxLength: '19',
          autoComplete: 'cc-number',
          className: "credit-card-input " + inputClassName,
          placeholder: customTextLabels.cardNumberPlaceholder || 'Card number',
          type: 'tel'
        }, cardNumberInputProps, {
          onBlur: _this.handleCardNumberBlur(),
          onChange: _this.handleCardNumberChange(),
          onKeyPress: _this.handleCardNumberKeyPress
        })
      })), React.createElement(InputWrapper, {
        isActive: true,
        "data-max": "MM / YY 9",
        translateX: enableZipInput && !showZip
      }, cardExpiryInputRenderer({
        inputComponent: inputComponent,
        handleCardExpiryChange: function handleCardExpiryChange(onChange) {
          return _this.handleCardExpiryChange({
            onChange: onChange
          });
        },
        handleCardExpiryBlur: function handleCardExpiryBlur(onBlur) {
          return _this.handleCardExpiryBlur({
            onBlur: onBlur
          });
        },
        props: _extends({
          id: 'card-expiry',
          ref: function ref(cardExpiryField) {
            _this.cardExpiryField = cardExpiryField;
          },
          autoComplete: 'cc-exp',
          className: "credit-card-input " + inputClassName,
          placeholder: customTextLabels.expiryPlaceholder || 'MM/YY',
          type: 'tel'
        }, cardExpiryInputProps, {
          onBlur: _this.handleCardExpiryBlur(),
          onChange: _this.handleCardExpiryChange(),
          onKeyDown: _this.handleKeyDown(_this.cardNumberField),
          onKeyPress: _this.handleCardExpiryKeyPress
        })
      })), React.createElement(InputWrapper, {
        isActive: true,
        "data-max": "99999",
        translateX: enableZipInput && !showZip
      }, cardCVCInputRenderer({
        inputComponent: inputComponent,
        handleCardCVCChange: function handleCardCVCChange(onChange) {
          return _this.handleCardCVCChange({
            onChange: onChange
          });
        },
        handleCardCVCBlur: function handleCardCVCBlur(onBlur) {
          return _this.handleCardCVCBlur({
            onBlur: onBlur
          });
        },
        props: _extends({
          id: 'cvc',
          ref: function ref(cvcField) {
            _this.cvcField = cvcField;
          },
          maxLength: '5',
          autoComplete: 'off',
          className: "credit-card-input " + inputClassName,
          placeholder: customTextLabels.cvcPlaceholder || 'CVC',
          type: 'tel'
        }, cardCVCInputProps, {
          onBlur: _this.handleCardCVCBlur(),
          onChange: _this.handleCardCVCChange(),
          onKeyDown: _this.handleKeyDown(_this.cardExpiryField),
          onKeyPress: _this.handleCardCVCKeyPress
        })
      })), React.createElement(InputWrapper, {
        "data-max": "999999",
        isActive: enableZipInput,
        isZipActive: showZip,
        translateX: enableZipInput && !showZip
      }, cardZipInputRenderer({
        inputComponent: inputComponent,
        handleCardZipChange: function handleCardZipChange(onChange) {
          return _this.handleCardZipChange({
            onChange: onChange
          });
        },
        handleCardZipBlur: function handleCardZipBlur(onBlur) {
          return _this.handleCardZipBlur({
            onBlur: onBlur
          });
        },
        props: _extends({
          id: 'zip',
          ref: function ref(zipField) {
            _this.zipField = zipField;
          },
          maxLength: '6',
          className: "credit-card-input zip-input " + inputClassName,
          pattern: '[0-9]*',
          placeholder: customTextLabels.zipPlaceholder || 'Zip',
          type: 'text'
        }, cardZipInputProps, {
          onBlur: _this.handleCardZipBlur(),
          onChange: _this.handleCardZipChange(),
          onKeyDown: _this.handleKeyDown(_this.cvcField),
          onKeyPress: _this.handleCardZipKeyPress
        })
      }))), errorText && React.createElement(DangerText, {
        className: dangerTextClassName
      }, errorText));
    };

    _this.CARD_TYPES = Object.assign({}, CARD_TYPES$1, props.CARD_TYPES);
    _this.images = Object.assign({}, images, props.images);
    _this.state = {
      cardImage: _this.images.placeholder,
      cardNumberLength: 0,
      cardNumber: null,
      errorText: null,
      showZip: false
    };
    return _this;
  }

  return CreditCardInput;
}(Component);

CreditCardInput.defaultProps = {
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
  customTextLabels: {}
};

export default CreditCardInput;
//# sourceMappingURL=react-credit-card-input.esm.js.map
