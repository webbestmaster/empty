// @flow

import fileSystem from 'fs';
import path from 'path';

import {pathToDist} from '../../webpack/config';
import {isError, isString} from '../../www/js/lib/is';

import {stringForReplace} from './config';

let indexHtmlTemplate: string = stringForReplace;

// $FlowFixMe
fileSystem.readFile(path.join('.', pathToDist, 'index.html'), 'utf8', function readIndexHtmlCallBack(
    error: Error | null,
    data: mixed
) {
    if (isError(error)) {
        console.error(`Can not read ${pathToDist}/index.html !!!`);
        return;
    }

    if (isString(data)) {
        indexHtmlTemplate = data;
        return;
    }

    throw new Error('Can not read file as string!');
});

export function getIndexHtmlTemplate(): string {
    return indexHtmlTemplate;
}
