// @flow

import fileSystem from 'fs';
import path from 'path';

import {pathToDist} from '../../webpack/config';

let indexHtmlTemplate: string = '{content}';

// $FlowFixMe
fileSystem.readFile(path.join('.', pathToDist, 'index.html'), 'utf8', function readIndexHtmlCallBack(
    error: Error | null,
    data: mixed
) {
    if (error instanceof Error) {
        console.error('Can not read www/index.html !!!');
        return;
    }

    if (typeof data === 'string') {
        indexHtmlTemplate = data;
        return;
    }

    throw new Error('Can not read file as string!');
});

export function getIndexHtmlTemplate(): string {
    return indexHtmlTemplate;
}
