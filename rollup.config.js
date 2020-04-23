import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

/**
 * Maps a key value object to HTML attributes.
 *
 * @param {object} attributes
 */
const makeHtmlAttributes = (attributes) => {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ''
  );
};

/**
 * Generates an index.html file that pulls in and initializes our bundle.
 *
 * @param {object} options
 */
const indexHtmlTemplate = async ({ attributes, files, publicPath, title }) => {
  const description = 'A WebGL morph target progressive web application demo.';

  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}" ${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet" ${attrs}>`;
    })
    .join('\n');

  const indexHtml = `
    <!DOCTYPE html>
    <html ${makeHtmlAttributes(attributes.html)}>
      <head>
        <meta charset="utf-8">
        <meta name="description" content="${description}" />
        <title>${title}</title>
        <style>
          html, body {
            margin: 0;
          }
        </style>
        ${links}
        ${scripts}
      </head>
      <body>
        <ginger-app></ginger-app>
      </body>
    </html>
  `;

  return indexHtml.replace(/\s+/g, ' ').trim();
};

export default {
  input: './index.js',
  output: {
    file: './dist/bundle.rollup.js',
    format: 'iife',
    name: 'ginger',
  },
  plugins: [
    resolve({
      browser: true,
      jsnext: true,
      extensions: ['.js', '.json'],
    }),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    babel({
      extensions: ['.js'],
      presets: [],
      env: {
        production: {
          presets: ['@babel/preset-env', 'minify'],
        },
      },
    }),
    cleanup({ comments: 'none' }),
    html({
      title: 'Ginger',
      publicPath: '/',
      attributes: {
        html: { lang: 'en' },
        link: null,
        script: { type: 'module' },
      },
      template: indexHtmlTemplate,
    }),
  ],
};
