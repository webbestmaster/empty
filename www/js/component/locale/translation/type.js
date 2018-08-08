// @flow

export type LangDataType = {|
    /* eslint-disable id-match, id-length */
    +LANGUAGE_NAME: string,

    +HEADER__TOP_LINE: string,
    +HEADER__BOTTOM_LINE: string,
    +HEADER__PLAY_NOW: string,
    +GAME_CARD__PLAY: string,

    +LOGIN_POPUP__PLEASE_LOG_IN_OR_JOIN_NOW: string,
    +LOGIN_POPUP__INPUT_USERNAME: string,
    +LOGIN_POPUP__INPUT_PASSWORD: string,
    +LOGIN_POPUP__BUTTON_LOGIN: string,
    +LOGIN_POPUP__BUTTON_JOIN_NOW: string,
    +LOGIN_POPUP__LINK_LOST_PASSWORD: string,

    // spec symbols
    +SPACE: ' '
    /* eslint-enable id-match */
|};

// eslint-disable-next-line id-match
export type LangKeyType = $Keys<LangDataType>;
