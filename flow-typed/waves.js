// @flow

type WavesAuthDataType = {
    +name: string,
    +data: string,
};

type WavesAuthResultType = {
    +address: string,
    +data: string,
    +host: string,
    +name: string,
    +prefix: string,
    +publicKey: string,
    +signature: string,
};

type WavesType = {
    auth(WavesAuthDataType):Promise<WavesAuthResultType | Error>,
};

declare var Waves: WavesType;

