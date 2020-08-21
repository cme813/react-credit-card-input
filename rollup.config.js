import typescript from '@rollup/plugin-typescript';

export default {
  input: `${__dirname}/src/index.tsx`,
  output: {
    name: 'CreditCardInput',
    dir: 'lib',
    format: 'umd',
    globals: {
      react: 'React',
      payment: 'payment',
      'credit-card-type': 'creditCardType',
      'styled-components': 'styled',
    },
  },
  external: ['react', 'credit-card-type', 'payment', 'styled-components'],
  plugins: [typescript({ declaration: true, outDir: 'lib' })],
};
