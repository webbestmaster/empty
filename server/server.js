// @flow

/* global process, __dirname */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0, react/no-danger: 0 */

import type {IncomingMessage, ServerResponse} from 'http';

import path from 'path';

import React from 'react';
import compression from 'compression';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';

import express, {type $Application, type $Request, type $Response} from 'express';

import {InnerApp} from '../www/js/component/app/c-app';

import type {ApiDataType} from '../www/js/component/need-end-point/c-need-end-point';

import {getIndexHtmlTemplate} from './static-files';
import {defaultInitialData, InitialDataProvider} from './c-initial-data-context';
import type {InitialDataType} from './c-initial-data-context';

const PORT: number = 8282;
const app: $Application = express();

app.use(cors());

app.use(compression());

app.disable('x-powered-by');

const CWD = __dirname;

app.get('/static/*', (request: $Request, response: $Response) => {
    console.log('/static/*');
    console.log(request.url);
    response.sendFile(path.join(CWD, '/../dist/', request.params['0']));
});

const staticFileList = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];

staticFileList.forEach((pathToFile: string) => {
    app.get(pathToFile, (request: $Request, response: $Response) => {
        response.sendFile(path.join(CWD, '/../dist' + pathToFile));
    });
});

app.get('/api/some-api-url', async (request: $Request, response: $Response) => {
    const apiData: ApiDataType = {status: 'success'};

    response.json(apiData);
});

app.get('*', async (request: $Request, response: $Response) => {
    const initialData: InitialDataType = {...defaultInitialData, apiData: {status: 'success from server'}};
    const result = ReactDOMServer.renderToString(
        <StaticRouter context={{}} location={request.url}>
            <InnerApp initialData={initialData}/>
            <script dangerouslySetInnerHTML={{__html: `window.initialData = ${JSON.stringify(initialData)}`}}/>
        </StaticRouter>
    );

    // check result for 404 here

    const htmlTemplate = getIndexHtmlTemplate();

    response.send(htmlTemplate.replace('{content}', result));
});

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
