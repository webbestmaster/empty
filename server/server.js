// @flow

import http from 'http';

import type {IncomingMessage, ServerResponse} from 'http';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';

import {InnerApp} from '../www/js/component/app/c-app';

import {getIndexHtmlTemplate} from './static-files';

http.createServer((request: IncomingMessage, response: ServerResponse) => {
    (async () => {
        const result = ReactDOMServer.renderToString(
            <StaticRouter context={{}} location={request.url}>
                <InnerApp/>
            </StaticRouter>
        );

        const htmlTemplate = getIndexHtmlTemplate();

        response.writeHead(200, {'Content-Type': 'text/html'});

        response.write(htmlTemplate.replace('{content}', result));
        response.end();
    })();
}).listen(8181);
