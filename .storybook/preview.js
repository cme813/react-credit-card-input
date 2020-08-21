import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@chakra-ui/core';

addDecorator((storyFn) => <ThemeProvider>{storyFn()}</ThemeProvider>);
