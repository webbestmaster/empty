// @flow

/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0, react/no-danger: 0 */

import type {IncomingMessage, ServerResponse} from 'http';
import path from 'path';

import React from 'react';
import compression from 'compression';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import express, {type $Application, type $Request, type $Response} from 'express';

import type {ApiDataType} from '../../www/js/component/need-end-point/c-need-end-point';
import {InnerApp} from '../../www/js/component/app/c-app';
import {pathToStaticFileFolder, ssrServerPort, pathToDist} from '../../webpack/config';

import {getIndexHtmlTemplate} from './static-files';
import {defaultInitialData, InitialDataProvider, type InitialDataType} from './c-initial-data-context';

const PORT: number = ssrServerPort;
const app: $Application = express();

app.use(cors());

app.use(compression());

app.disable('x-powered-by');

const CWD = process.cwd();

app.get(pathToStaticFileFolder + '*', (request: $Request, response: $Response) => {
    console.log(pathToStaticFileFolder + '*');
    console.log(request.url);
    response.sendFile(path.join(CWD, pathToDist, request.params['0']));
});

const staticFileList = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];

staticFileList.forEach((pathToFile: string) => {
    app.get(pathToFile, (request: $Request, response: $Response) => {
        response.sendFile(path.join(CWD, pathToDist + pathToFile));
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
