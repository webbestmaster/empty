// @flow

import fileSystem from 'fs';

let indexHtmlTemplate: string = '{content}';

// $FlowFixMe
fileSystem.readFile('./dist/index.html', 'utf8', function readIndexHtmlCallBack(error: Error | null, data: mixed) {
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
