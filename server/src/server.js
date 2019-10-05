// @flow

/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0, react/no-danger: 0 */

import type {IncomingMessage, ServerResponse} from 'http';
import path from 'path';

import React from 'react';
import compression from 'compression';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import express, {type $Application, type $Request, type $Response} from 'express';
import session from 'express-session';
import {smth} from "./data-base";

import {InnerApp} from '../../www/js/component/app/c-app';
import {pathToDist, pathToStaticFileFolder, ssrServerPort} from '../../webpack/config';

import {hasProperty} from '../../www/js/lib/is';

import {getIndexHtmlTemplate} from './static-files';
import {defaultInitialData, type InitialDataType} from './c-initial-data-context';
import {staticFilesList, stringForReplace} from './config';
import {addApiIntoApplication} from './api';

const PORT: number = ssrServerPort;
const CWD = process.cwd();

const app: $Application = express();

app.use(cors());
app.use(compression());
app.disable('x-powered-by');

// WARNING: I don't know why needed 'app.set('trust proxy', 1)', just copy-paste from https://www.npmjs.com/package/express-session
app.set('trust proxy', 1); // trust first proxy

app.use(
    session({
        name: 'session-id',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

// root's static files
staticFilesList.forEach((pathToFile: string) => {
    app.get(pathToFile, (request: $Request, response: $Response) => {
        response.sendFile(path.join(CWD, pathToDist + pathToFile));
    });
});

app.use((request: $Request, response: $Response, next: () => mixed) => {
    // $FlowFixMe
    const userSession = hasProperty(request, 'session') ? request.session : {};

    if (!hasProperty(userSession, 'views')) {
        Object.assign(userSession, {views: {}});
    }

    const pathname = request.url;

    Object.assign(userSession.views, {[pathname]: (userSession.views[pathname] || 0) + 1});

    console.log(userSession);

    next();
});

// usual static files
app.get(pathToStaticFileFolder + '/*', (request: $Request, response: $Response) => {
    console.log(pathToStaticFileFolder + '/*');
    console.log(request.url);
    response.sendFile(path.join(CWD, pathToDist, request.params['0']));
});

// api
addApiIntoApplication(app);

// *.html
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

    response.send(htmlTemplate.replace(stringForReplace, result));
});

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
