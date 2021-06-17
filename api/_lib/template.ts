
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: left;
        align-items: center;
        justify-content: left;
        padding: 50px;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .container {
    
        font-size: ${sanitizeHtml(fontSize)};
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.2;
        font-size: 1.1em;
    }
    
    .heading p {
        margin:0;
    }
    
    .text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        color: ${foreground};
        line-height: 1;
        font-size: 0.76em;
    }
    
    .url {
        font-family: 'Vera', sans-serif;
        font-style: normal;
        color: ${foreground};
        line-height: 1;
        font-size: 0.45em;
    }
    
    .text p {
        margin:0;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text,term, theme, fontSize, } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="container">
            <div class="url">https://techlingo.fyi</div>
            <div class="heading">${emojify(sanitizeHtml(term))}</div>
            <div class="text">${emojify(sanitizeHtml(text))}</div>
        </div>
    </body>
</html>`;
}
