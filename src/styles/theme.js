import { css } from 'lit-element';

export const thisDotTheme = css`
  :host {
    --angular: #dd244a;
    --react: #61dafb;
    --vue: #41b883;
    --blue500: #5d78a1;
    --sky500: #13b6da;
    --red700: #e25855;
    --red500: #f46663;
    --grey900: #061328;
    --grey800: #0a1930;
    --grey700: #122541;
    --grey600: #182d4c;
    --grey500: #3a4669;
    --grey400: #626d8e;
    --grey300: #a2b4cf;
    --grey200: #c2cee0;
    --grey100: #ecf1f7;
    --white: #ffffff;
  }

  .td-header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1128px;
    margin-right: auto;
    margin-left: auto;
    padding: 18px 24px;
  }

  .td-logo {
  }

  .td-button {
    background-color: var(--white);
    color: var(--grey900);
    display: inline-block;
    border: none;
    text-align: center;
    cursor: pointer;
    font-weight: 600;
    height: 48px;
    font-size: 16px;
    border-radius: 40px;
    text-decoration: none;
    white-space: nowrap;
    padding: 14px 48px;
    box-sizing: border-box;
    -webkit-transition: color 0.25s ease, background-color 0.25s ease;
    transition: color 0.25s ease, background-color 0.25s ease;
  }

  .td-button-outline {
    background-color: var(--grey800);
    color: var(--red500);
    border: 1px solid var(--red500);
    padding: 11px 24px;
    font-size: 14px;
    line-height: 1.25em;
    height: 40px;
  }

  .td-button-active {
  }

  .td-button-inactive {
  }

  .td-button:active {
  }

  .td-button:active:hover {
  }

  .td-range {
  }

  .td-range::-webkit-slider-thumb,
  .td-range::-moz-range-thumb,
  .td-range::-ms-thumb {
    height: 24px;
    width: 24px;
    border-radius: 0;
  }

  .td-range::-webkit-slider-runnable-track,
  .td-range::-moz-range-track,
  .td-range::-ms-track {
    width: 100%;
    height: 15px;
  }

  .td-select {
    /* -webkit-appearance: none;
    -moz-appearance: none;
    width: 90%;
    height: 35px;
    margin: 10px 0 20px 20px;
    outline: none;
    background: rgb(70, 70, 70);
    color: #fafafa;
    border: 1px solid rgb(60, 60, 60); */
  }

  @media (min-width: 830px) {
    .td-header {
      padding-top: 33px;
      padding-bottom: 33px;
    }
  }

  @media (max-width: 767px) {
    .td-select {
    }

    .td-button {
    }
  }
`;
