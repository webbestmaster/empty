// @flow

/* global process, __dirname */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

import type {IncomingMessage, ServerResponse} from 'http';

import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';

import express, {type $Application, type $Request, type $Response} from 'express';

import {InnerApp} from '../www/js/component/app/c-app';

import {getIndexHtmlTemplate} from './static-files';

const PORT: number = 8282;
const app: $Application = express();

const CWD = __dirname;

app.get('/static/*', (request: $Request, response: $Response) => {
    console.log('/static/*');
    console.log(request.url);
    response.sendFile(path.join(CWD, '/../dist/', request.params['0']));
});

app.get('/favicon.ico', (request: $Request, response: $Response) => {
    console.log('/favicon.ico');
    console.log(request.url);
    response.sendFile(path.join(CWD, '/../dist/favicon.ico'));
});

app.get('*', async (request: $Request, response: $Response) => {
    console.log('*');
    console.log(request.url);

    console.log('!!!!!!!*********');

    const result = ReactDOMServer.renderToString(
        <StaticRouter context={{}} location={request.url}>
            <InnerApp/>
        </StaticRouter>
    );

    // check result for 404 here

    const htmlTemplate = getIndexHtmlTemplate();

    response.writeHead(200, {'Content-Type': 'text/html'});

    response.write(htmlTemplate.replace('{content}', result));
    response.end();
});

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
