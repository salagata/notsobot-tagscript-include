import * as path from "path";
import * as fs from "fs/promises";

export function getCodeLanguage(value?: string): null {
  return null;
}
// import * as vm from 'vm';

// import * as cheerio from 'cheerio';
// import { Collections, Command, Interaction, Structures } from 'detritus-client';
// import {
//   MarkupTimestampStyles,
//   MessageComponentButtonStyles,
//   MessageComponentTypes,
//   Permissions,
// } from 'detritus-client/lib/constants';
// import { Embed, Markup, Snowflake } from 'detritus-client/lib/utils';
// import { RequestFile } from 'detritus-rest';
// import MiniSearch from 'minisearch';

// import UserStore from '../../stores/users';

// import {
//   fetchTagId,
//   fetchTagVariable,
//   fetchTagVariables,
//   deleteTagVariable,
//   generateTag,
//   googleContentVisionOCR,
//   googleTranslate,
//   mediaAVToolsExtractAudio,
//   mediaAVToolsTranscribe,
//   putTagVariable,
//   putTagVariables,
//   searchDuckDuckGoImages,
//   searchGoogleImages,
//   searchImgur,
//   searchYoutube,
//   utilitiesCodeRun,
//   utilitiesFetchMedia,
//   utilitiesFetchText,
//   utilitiesMediascript,
//   utilitiesLocations,
//   utilitiesMLEdit,
//   utilitiesMLImagine,
//   utilitiesMLInterrogate,
//   utilitiesProxyRequest,
//   utilitiesWeather,
// } from '../../api';
// import { RestOptions, RestResponses, RestResponsesRaw } from '../../api/types';
// import {
//   CodeLanguages,
//   GoogleLocales,
//   MeasurementUnits,
//   Mimetypes,
//   MLDiffusionModels,
//   ProxyRequestMethods,
//   TagGenerationModels,
//   TagVariableStorageTypes,
//   YoutubeResultTypes,
//   CODE_EXECUTION_FFMPEG_DEFAULT_STDERR_PREPEND,
//   MAX_MEMBERS_SAFE,
// } from '../../constants';

// import { getAIPersonality } from '../formatter/commands/tag.generate';
// import { increaseUsage } from '../formatter/commands/tag.show';

// import * as DefaultParameters from '../defaultparameters';
// import { MathWorker, MATH_ERROR_TIMEOUT_MESSAGE } from '../math';
// import { PageObject } from '../paginator';
// import * as Parameters from '../parameters';
// import {
//   bigIntGenerateBetween,
//   bigIntMax,
//   bigIntMin,
//   checkNSFW,
//   convertToBigIntFloats,
//   generateCodeFromLanguage,
//   generateCodeStdin,
//   getCodeLanguage,
//   getGuildObjectForJSONSerialization,
//   isSnowflake,
//   isValidAttachmentUrl,
//   jobWaitForResult,
//   languageCodeToText,
//   randomFromArray,
//   randomFromIterator,
//   textToBoolean,
//   traverseJSON,
// } from '../tools';

// import { TagExitError, TagRequestError } from './exceptions';
// import { parseComponentFromData } from './tools';

// export { TagExitError, TagRequestError };



// const findChannel = Parameters.channel({inGuild: true});
// const findMemberOrUser = Parameters.memberOrUser();

// const lastAudioUrl = Parameters.lastMediaUrl({image: false, video: false});
// const lastAudioOrVideoUrl = Parameters.lastMediaUrl({image: false});
// const lastImageUrl = Parameters.lastMediaUrl({audio: false, video: false});
// const lastImageOrVideoUrl = Parameters.lastMediaUrl({audio: false});
// const lastMediaUrl = Parameters.lastMediaUrl();
// const lastVideoUrl = Parameters.lastMediaUrl({audio: false, image: false});

interface TagResult {
    text: string,
    currentPath: string
}

export const TagSymbols = Object.freeze({
  BRACKET_LEFT: '{',
  BRACKET_RIGHT: '}',
  IGNORE: '\\',
  SPLITTER_ARGUMENT: '|',
  SPLITTER_FUNCTION: ':',
});

export const ATTACHMENT_EXTENSIONS_IMAGE = [
  'bmp',
  'heic',
  'gif',
  'ico',
  'jpg',
  'jpeg',
  'png',
  'raw',
  'tiff',
  'webp',
];

export const ATTACHMENT_EXTENSIONS_MEDIA = [
  'flac',
  'mov',
  'mp3',
  'mp4',
  'txt',
  'wav',
  'webm',
];

export const ATTACHMENT_EXTENSIONS = [...ATTACHMENT_EXTENSIONS_IMAGE, ...ATTACHMENT_EXTENSIONS_MEDIA];

export interface TagLimits {
  MAX_AI_EXECUTIONS: number,
  MAX_API_MANIPULATIONS: number,
  MAX_ATTACHMENTS: number,
  MAX_COMPONENT_EXECUTIONS: number,
  MAX_EMBEDS: number,
  MAX_ITERATIONS: number,
  MAX_NETWORK_REQUESTS: number,
  MAX_NETWORK_REQUESTS_ML: number,
  MAX_NETWORK_REQUESTS_OPENAI: number,
  MAX_PAGES: number,
  MAX_STORAGE_GLOBAL_AMOUNT: number,
  MAX_STORAGE_GUILD_AMOUNT: number,
  MAX_STORAGE_CHANNEL_AMOUNT: number,
  MAX_STORAGE_USER_AMOUNT: number,
  MAX_STORAGE_KEY_LENGTH: number,
  MAX_STORAGE_VALUE_LENGTH: number,
  MAX_TAG_EXECUTIONS: number,
  MAX_TIME_REGEX: number,
  MAX_VARIABLE_KEY_LENGTH: number,
  MAX_VARIABLE_LENGTH: number,
  MAX_VARIABLES: number,
}

export const TagLimitDefaults: TagLimits = Object.freeze({
  MAX_AI_EXECUTIONS: 1,
  MAX_API_MANIPULATIONS: 1,
  MAX_ATTACHMENTS: 10,
  MAX_COMPONENT_EXECUTIONS: 2,
  MAX_EMBEDS: 10,
  MAX_ITERATIONS: 450,
  MAX_NETWORK_REQUESTS: 15,
  MAX_NETWORK_REQUESTS_ML: 5,
  MAX_NETWORK_REQUESTS_OPENAI: 2,
  MAX_PAGES: 1000,
  MAX_STORAGE_GLOBAL_AMOUNT: 5,
  MAX_STORAGE_GUILD_AMOUNT: 5,
  MAX_STORAGE_CHANNEL_AMOUNT: 5,
  MAX_STORAGE_USER_AMOUNT: 5,
  MAX_STORAGE_KEY_LENGTH: 128,
  MAX_STORAGE_VALUE_LENGTH: 16384,
  MAX_TAG_EXECUTIONS: 2,
  MAX_TIME_REGEX: 25,
  MAX_VARIABLE_KEY_LENGTH: 64,
  MAX_VARIABLE_LENGTH: 1 * 1024 * 1024,
  MAX_VARIABLES: 100,
});

export const PRIVATE_VARIABLE_PREFIX = '__';

export const ATTACHMENT_URL_REGEX = /(https?:\/\/(?:media\.discordapp\.net|cdn.discordapp.com)\/attachments\/[0-9]*\/[0-9]*\/[A-Za-z0-9_.-]*(?:\?[a-zA-Z0-9&=]*)?)/g;
export const MATH_NON_NUMERIC_REGEX = /[^+\-*\/()0-9.n><&]/g;
export const SCRIPT_REGEX = /\{((?:(?!:)(?:.|\s))*):([\s\S]+)\}/;
export const URL_FILE_REPLACEMENT_REGEX = /FILE_([0-9]+)(_COPY)?/g;

export const REGEX_ARGUMENT_SPLITTER = new RegExp(`(?<!\\\\)[${TagSymbols.SPLITTER_ARGUMENT}]`, 'g');
export const REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT = new RegExp(`\\\\\\${TagSymbols.SPLITTER_ARGUMENT}`, 'g');


export enum PrivateVariables {
  AI_EXECUTIONS = '__aiExecutions',
  API_MANIPULATIONS = '__apiManipulations',
  ARGS = '__args',
  ARGS_STRING = '__argsString',
  COMPONENT_EXECUTIONS = '__componentExecutions',
  FILE_SIZE = '__fileSize',
  FILES = '__files',
  IS_FROM_CHILD_PARSING = '__isFromChildParsing',
  ITERATIONS_REMAINING = '__iterationsRemaining',
  NETWORK_REQUESTS = '__networkRequests',
  NETWORK_REQUESTS_ML = '__networkRequestsML',
  NETWORK_REQUESTS_OPENAI = '__networkRequestsOpenAI',
  PARENT_TAG_ID = '__parentTagId',
  RESULTS = '__results',
  SETTINGS = '__settings',
  TAG_EXECUTIONS = '__tagExecutions',
}


// export const AllowedDiscordProperties = Object.freeze({
//   [Structures.Member.constructor.name]: {
//     functions: [],
//     variables: ['avatar', 'avatarUrl', 'color', 'colorRole', 'deaf', 'discriminator', 'highestRole', 'hoistedRole', 'id', 'isBoosting', 'isOffline', 'isOwner', 'joinedAt', 'joinedAtUnix', 'mention', 'mute', 'nick', 'name', 'username'],
//   },
//   [Structures.Role.constructor.name]: {
//     functions: [],
//     variables: ['botId', 'color', 'createdAt', 'createdAtUnix', 'hoist', 'id', 'integrationId', 'isBoosterRole', 'isDefault', 'managed', 'mention', 'mentionable', 'name', 'permissions', 'position'],
//   },
// });


export enum TagIfComparisons {
  EQUAL = '=',
  EQUAL_NOT = "!=",
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
  TILDE = '~',
}


export const TAG_IF_COMPARISONS = [
  TagIfComparisons.EQUAL,
  TagIfComparisons.EQUAL_NOT,
  TagIfComparisons.GREATER_THAN,
  TagIfComparisons.GREATER_THAN_OR_EQUAL,
  TagIfComparisons.LESS_THAN,
  TagIfComparisons.LESS_THAN_OR_EQUAL,
  TagIfComparisons.TILDE,
];


// maybe make {argattachment}
export enum TagFunctions {
  AI = 'AI',
  API_CREATE_REMINDER = 'API_CREATE_REMINDER',
  API_SEARCH_DUCKDUCKGO_IMAGES = 'API_SEARCH_DUCKDUCKGO_IMAGES',
  API_SEARCH_IMGUR = 'API_SEARCH_IMGUR',
  API_UTILITIES_LOCATIONS = 'API_UTILITIES_LOCATIONS',
  API_UTILITIES_WEATHER = 'API_UTILITIES_WEATHER',
  ARG = 'ARG',
  ARG_SAFE = 'ARG_SAFE',
  ARGS = 'ARGS',
  ARGS_LEN = 'ARGS_LEN',
  ARGS_SAFE = 'ARGS_SAFE',
  ATTACHMENT = 'ATTACHMENT',
  ATTACHMENT_LAST = 'ATTACHMENT_LAST',
  ATTACHMENT_SPOILER = 'ATTACHMENT_SPOILER',
  ATTACHMENT_TEXT = 'ATTACHMENT_TEXT',
  ATTACHMENT_VOICE = 'ATTACHMENT_VOICE',
  AVATAR = 'AVATAR',
  CHANNEL = 'CHANNEL',
  CHANNEL_ID = 'CHANNEL_ID',
  CHANNEL_MENTION = 'CHANNEL_MENTION',
  CHANNEL_RANDOM = 'CHANNEL_RANDOM',
  CHANNEL_RANDOM_ID = 'CHANNEL_RANDOM_ID',
  CHANNEL_RANDOM_MENTION = 'CHANNEL_RANDOM_MENTION',
  COMPONENT_JSON = 'COMPONENT_JSON',
  COMPONENTS_ON_TIMEOUT = 'COMPONENTS_ON_TIMEOUT',
  DISCORD = 'DISCORD',
  EMBED_JSON = 'EMBED_JSON',
  EVAL = 'EVAL',
  EVAL_SILENT = 'EVAL_SILENT',
  EXIT = 'EXIT',
  EXIT_SILENT = 'EXIT_SILENT',
  GUILD = 'GUILD',
  GUILD_COUNT = 'GUILD_COUNT',
  GUILD_ID = 'GUILD_ID',
  HASTEBIN = 'HASTEBIN',
  IMAGE_INTERROGATE = 'IMAGE_INTERROGATE',
  IMAGE_OCR = 'IMAGE_OCR',
  INSERT_BRACKET_LEFT = 'INSERT_BRACKET_LEFT',
  INSERT_BRACKET_RIGHT = 'INSERT_BRACKET_RIGHT',
  INSERT_NEWLINE = 'INSERT_NEWLINE',
  INSERT_SPLITTER_ARGUMENT = 'INSERT_SPLITTER_ARGUMENT',
  INSERT_SPLITTER_FUNCTION = 'INSERT_SPLITTER_FUNCTION',
  JSON_CHANNEL = 'JSON_CHANNEL',
  JSON_GUILD = 'JSON_GUILD',
  JSON_MEMBER = 'JSON_MEMBER',
  JSON_MEMBER_OR_USER = 'JSON_MEMBER_OR_USER',
  JSON_MESSAGE = 'JSON_MESSAGE',
  JSON_MESSAGE_REPLY = 'JSON_MESSAGE_REPLY',
  JSON_USER = 'JSON_USER',
  LOGICAL_AND = 'LOGICAL_AND',
  LOGICAL_DELETE = 'LOGICAL_DELETE',
  LOGICAL_DELETE_CHANNEL = 'LOGICAL_DELETE_CHANNEL',
  LOGICAL_DELETE_SERVER = 'LOGICAL_DELETE_SERVER',
  LOGICAL_DELETE_USER = 'LOGICAL_DELETE_USER',
  LOGICAL_FOR_EACH = 'LOGICAL_FOR_EACH',
  LOGICAL_GET = 'LOGICAL_GET',
  LOGICAL_GET_CHANNEL = 'LOGICAL_GET_CHANNEL',
  LOGICAL_GET_GLOBAL = 'LOGICAL_GET_GLOBAL',
  LOGICAL_GET_SERVER = 'LOGICAL_GET_SERVER',
  LOGICAL_GET_USER = 'LOGICAL_GET_USER',
  LOGICAL_IF = 'LOGICAL_IF',
  LOGICAL_IF_ERROR = 'LOGICAL_IF_ERROR',
  LOGICAL_IS_FROM_AI = 'LOGICAL_IS_FROM_AI',
  LOGICAL_IS_FROM_COMPONENT = 'LOGICAL_IS_FROM_COMPONENT',
  LOGICAL_IS_MAIN_TAG = 'LOGICAL_IS_MAIN_TAG',
  LOGICAL_OR = 'LOGICAL_OR',
  LOGICAL_SET = 'LOGICAL_SET',
  LOGICAL_SET_CHANNEL = 'LOGICAL_SET_CHANNEL',
  LOGICAL_SET_GLOBAL = 'LOGICAL_SET_GLOBAL',
  LOGICAL_SET_SERVER = 'LOGICAL_SET_SERVER',
  LOGICAL_SET_USER = 'LOGICAL_SET_USER',
  MATH = 'MATH',
  MATH_ABS = 'MATH_ABS',
  MATH_COS = 'MATH_COS',
  MATH_E = 'MATH_E',
  MATH_MAX = 'MATH_MAX',
  MATH_MIN = 'MATH_MIN',
  MATH_PI = 'MATH_PI',
  MATH_SIN = 'MATH_SIN',
  MATH_TAN = 'MATH_TAN',
  MEDIA = 'MEDIA',
  MEDIA_AUDIO = 'MEDIA_AUDIO',
  MEDIA_AUDIO_OR_VIDEO = 'MEDIA_AUDIO_OR_VIDEO',
  MEDIA_IMAGE = 'MEDIA_IMAGE',
  MEDIA_IMAGE_EDIT = 'MEDIA_IMAGE_EDIT',
  MEDIA_IMAGE_EDIT_URL = 'MEDIA_IMAGE_EDIT_URL',
  MEDIA_IMAGE_IMAGINE = 'MEDIA_IMAGE_IMAGINE',
  MEDIA_IMAGE_IMAGINE_URL = 'MEDIA_IMAGE_IMAGINE_URL',
  MEDIA_IMAGE_OR_VIDEO = 'MEDIA_IMAGE_OR_VIDEO',
  MEDIA_VIDEO = 'MEDIA_VIDEO',
  MEDIASCRIPT = 'MEDIASCRIPT',
  MEDIASCRIPT_MAYBE_URL = 'MEDIASCRIPT_MAYBE_URL',
  MEDIASCRIPT_URL = 'MEDIASCRIPT_URL',
  MESSAGE_CONTENT = 'MESSAGE_CONTENT',
  MESSAGE_LAST_ID = 'MESSAGE_LAST_ID',
  MESSAGE_RANDOM_ID = 'MESSAGE_RANDOM_ID',
  MESSAGE_USER_ID = 'MESSAGE_USER_ID',
  NSFW = 'NSFW',
  NSFW_FILTER = 'NSFW_FILTER',
  PAGE_JSON = 'PAGE_JSON',
  PREFIX = 'PREFIX',
  REPLY_CONTENT = 'REPLY_CONTENT',
  REPLY_USER_ID = 'REPLY_USER_ID',
  REQUEST = 'REQUEST',
  RNG_CHOOSE = 'RNG_CHOOSE',
  RNG_RANGE = 'RNG_RANGE',
  SEARCH_DUCKDUCKGO_IMAGES = 'SEARCH_DUCKDUCKGO_IMAGES',
  SEARCH_GOOGLE_IMAGES = 'SEARCH_GOOGLE_IMAGES',
  SEARCH_YOUTUBE = 'SEARCH_YOUTUBE',
  SETTINGS = 'SETTINGS',
  STRING_INDEX_OF = 'STRING_INDEX_OF',
  STRING_JSONIFY = 'STRING_JSONIFY',
  STRING_LENGTH = 'STRING_LENGTH',
  STRING_LOWER = 'STRING_LOWER',
  STRING_MARKUP_BOLD = 'STRING_MARKUP_BOLD',
  STRING_MARKUP_CODEBLOCK = 'STRING_MARKUP_CODEBLOCK',
  STRING_MARKUP_CODESTRING = 'STRING_MARKUP_CODESTRING',
  STRING_MARKUP_ESCAPE = 'STRING_MARKUP_ESCAPE',
  STRING_MARKUP_HEADER_BIG = 'STRING_MARKUP_HEADER_BIG',
  STRING_MARKUP_HEADER_MEDIUM = 'STRING_MARKUP_HEADER_MEDIUM',
  STRING_MARKUP_HEADER_SMALL = 'STRING_MARKUP_HEADER_SMALL',
  STRING_MARKUP_ITALICS = 'STRING_MARKUP_ITALICS',
  STRING_MARKUP_LIST_DOTTED = 'STRING_MARKUP_LIST_DOTTED',
  STRING_MARKUP_LIST_NUMBERED = 'STRING_MARKUP_LIST_NUMBERED',
  STRING_MARKUP_QUOTE = 'STRING_MARKUP_QUOTE',
  STRING_MARKUP_SPOILER = 'STRING_MARKUP_SPOILER',
  STRING_MARKUP_STRIKE = 'STRING_MARKUP_STRIKE',
  STRING_MARKUP_SUBTEXT = 'STRING_MARKUP_SUBTEXT',
  STRING_MARKUP_TIME = 'STRING_MARKUP_TIME',
  STRING_MARKUP_UNDERLINE = 'STRING_MARKUP_UNDERLINE',
  STRING_MARKUP_URL = 'STRING_MARKUP_URL',
  STRING_ONE_OF = 'STRING_ONE_OF',
  STRING_REPEAT = 'STRING_REPEAT',
  STRING_REPLACE = 'STRING_REPLACE',
  STRING_REVERSE = 'STRING_REVERSE',
  STRING_SUB = 'STRING_SUB',
  STRING_TRANSLATE = 'STRING_TRANSLATE',
  STRING_UPPER = 'STRING_UPPER',
  STRING_URL_ENCODE = 'STRING_URL_ENCODE',
  TAG = 'TAG',
  TAG_ID = 'TAG_ID',
  TAG_NAME = 'TAG_NAME',
  TAG_OWNER_ID = 'TAG_OWNER_ID',
  TEXT = 'TEXT',
  TEXT_FROM_HTML = 'TEXT_FROM_HTML',
  TIME_UNIX = 'TIME_UNIX',
  TIME_UNIX_FROM_SNOWFLAKE = 'TIME_UNIX_FROM_SNOWFLAKE',
  TIME_UNIX_SECONDS = 'TIME_UNIX_SECONDS',
  TRANSCRIBE = 'TRANSCRIBE',
  TRAVERSE_JSON = 'TRAVERSE_JSON',
  TYPE = 'TYPE',
  USER_AVATAR = 'USER_AVATAR',
  USER_DISCRIMINATOR = 'USER_DISCRIMINATOR',
  USER_ID = 'USER_ID',
  USER_MENTION = 'USER_MENTION',
  USER_NAME = 'USER_NAME',
  USER_NICK = 'USER_NICK',
  USER_RANDOM = 'USER_RANDOM',
  USER_RANDOM_ID = 'USER_RANDOM_ID',
  USER_RANDOM_ONLINE = 'USER_RANDOM_ONLINE',
  USER_RANDOM_ONLINE_ID = 'USER_RANDOM_ONLINE_ID',
  USER_RANDOM_ONLINE_TAG = 'USER_RANDOM_ONLINE_TAG',
  USER_RANDOM_TAG = 'USER_RANDOM_TAG',
  USER_TAG = 'USER_TAG',
  VARIABLES = 'VARIABLES',
  VARIABLES_CHANNEL = 'VARIABLES_CHANNEL',
  VARIABLES_GLOBAL = 'VARIABLES_GLOBAL',
  VARIABLES_SERVER = 'VARIABLES_SERVER',
  VARIABLES_USER = 'VARIABLES_USER',
  INCLUDE = 'INCLUDE',
}


export const TagFunctionsToString = Object.freeze({
  IGNORE: ['ignore'],
  NOTE: ['note'],

  [TagFunctions.AI]: ['ai'],
  [TagFunctions.API_CREATE_REMINDER]: ['api.create.reminder'],
  [TagFunctions.API_SEARCH_DUCKDUCKGO_IMAGES]: ['api.search.duckduckgo.images'],
  [TagFunctions.API_SEARCH_IMGUR]: ['api.search.imgur'],
  [TagFunctions.API_UTILITIES_LOCATIONS]: ['api.utilities.locations'],
  [TagFunctions.API_UTILITIES_WEATHER]: ['api.utilities.weather'],
  [TagFunctions.ARG]: ['arg'],
  [TagFunctions.ARG_SAFE]: ['argsafe'],
  [TagFunctions.ARGS]: ['args'],
  [TagFunctions.ARGS_LEN]: ['argslen'],
  [TagFunctions.ARGS_SAFE]: ['argssafe'],
  [TagFunctions.ATTACHMENT]: ['attachment', 'attach', 'file'],
  [TagFunctions.ATTACHMENT_LAST]: ['last_attachment', 'lastattachment', 'lattachment', 'lattach'],
  [TagFunctions.ATTACHMENT_SPOILER]: ['attachmentspoiler', 'attachspoiler', 'filespoiler'],
  [TagFunctions.ATTACHMENT_TEXT]: ['attachmenttext', 'attachtext', 'filetext'],
  [TagFunctions.ATTACHMENT_VOICE]: ['attachmentvoice', 'attachvoice', 'filevoice'],
  [TagFunctions.AVATAR]: ['avatar'],
  [TagFunctions.CHANNEL]: ['channel'],
  [TagFunctions.CHANNEL_ID]: ['channelid'],
  [TagFunctions.CHANNEL_MENTION]: ['channelmention'],
  [TagFunctions.CHANNEL_RANDOM]: ['randchannel'],
  [TagFunctions.CHANNEL_RANDOM_ID]: ['randchannelid'],
  [TagFunctions.CHANNEL_RANDOM_MENTION]: ['randchannelmention'],
  [TagFunctions.COMPONENT_JSON]: ['componentjson'],
  [TagFunctions.COMPONENTS_ON_TIMEOUT]: ['componentsontimeout'],
  [TagFunctions.DISCORD]: ['discord'],
  [TagFunctions.EMBED_JSON]: ['embedjson'],
  [TagFunctions.EVAL]: ['eval'],
  [TagFunctions.EVAL_SILENT]: ['evalsilent'],
  [TagFunctions.EXIT]: ['exit'],
  [TagFunctions.EXIT_SILENT]: ['exitsilent'],
  [TagFunctions.GUILD]: ['guild', 'server'],
  [TagFunctions.GUILD_COUNT]: ['guildcount', 'membercount', 'servercount'],
  [TagFunctions.GUILD_ID]: ['guildid', 'serverid', 'sid', 'gid'],
  [TagFunctions.HASTEBIN]: ['hastebin', 'haste'],
  [TagFunctions.IMAGE_INTERROGATE]: ['identify', 'interrogate'],
  [TagFunctions.IMAGE_OCR]: ['ocr'],
  [TagFunctions.INSERT_BRACKET_LEFT]: ['bracketleft'],
  [TagFunctions.INSERT_BRACKET_RIGHT]: ['bracketright'],
  [TagFunctions.INSERT_NEWLINE]: ['newline'],
  [TagFunctions.INSERT_SPLITTER_ARGUMENT]: ['splitterargument'],
  [TagFunctions.INSERT_SPLITTER_FUNCTION]: ['splitterfunction'],
  [TagFunctions.JSON_CHANNEL]: ['json.channel', 'channeljson'],
  [TagFunctions.JSON_GUILD]: ['json.guild'],
  [TagFunctions.JSON_MEMBER]: ['json.member'],
  [TagFunctions.JSON_MEMBER_OR_USER]: ['json.memberoruser'],
  [TagFunctions.JSON_MESSAGE]: ['json.message'],
  [TagFunctions.JSON_MESSAGE_REPLY]: ['json.messagereply'],
  [TagFunctions.JSON_USER]: ['json.user', 'userjson'],
  [TagFunctions.LOGICAL_AND]: ['and'],
  [TagFunctions.LOGICAL_DELETE]: ['delete'],
  [TagFunctions.LOGICAL_DELETE_CHANNEL]: ['deletechannel'],
  [TagFunctions.LOGICAL_DELETE_SERVER]: ['deleteserver'],
  [TagFunctions.LOGICAL_DELETE_USER]: ['deleteuser'],
  [TagFunctions.LOGICAL_FOR_EACH]: ['foreach'],
  [TagFunctions.LOGICAL_GET]: ['get'],
  [TagFunctions.LOGICAL_GET_CHANNEL]: ['getchannel'],
  [TagFunctions.LOGICAL_GET_GLOBAL]: ['getglobal'],
  [TagFunctions.LOGICAL_GET_SERVER]: ['getserver'],
  [TagFunctions.LOGICAL_GET_USER]: ['getuser'],
  [TagFunctions.LOGICAL_IF]: ['if'],
  [TagFunctions.LOGICAL_IF_ERROR]: ['iferror'],
  [TagFunctions.LOGICAL_IS_FROM_AI]: ['isfromai'],
  [TagFunctions.LOGICAL_IS_FROM_COMPONENT]: ['isfromcomponent'],
  [TagFunctions.LOGICAL_IS_MAIN_TAG]: ['ismaintag'],
  [TagFunctions.LOGICAL_OR]: ['or'],
  [TagFunctions.LOGICAL_SET]: ['set'],
  [TagFunctions.LOGICAL_SET_CHANNEL]: ['setchannel'],
  [TagFunctions.LOGICAL_SET_GLOBAL]: ['setglobal'],
  [TagFunctions.LOGICAL_SET_SERVER]: ['setserver'],
  [TagFunctions.LOGICAL_SET_USER]: ['setuser'],
  [TagFunctions.MATH]: ['math'],
  [TagFunctions.MATH_ABS]: ['abs'],
  [TagFunctions.MATH_COS]: ['cos'],
  [TagFunctions.MATH_E]: ['e'],
  [TagFunctions.MATH_MAX]: ['max'],
  [TagFunctions.MATH_MIN]: ['min'],
  [TagFunctions.MATH_PI]: ['pi'],
  [TagFunctions.MATH_SIN]: ['sin'],
  [TagFunctions.MATH_TAN]: ['tan'],
  [TagFunctions.MEDIA]: ['media'],
  [TagFunctions.MEDIA_AUDIO]: ['audio'],
  [TagFunctions.MEDIA_AUDIO_OR_VIDEO]: ['av'],
  [TagFunctions.MEDIA_IMAGE]: ['image'],
  [TagFunctions.MEDIA_IMAGE_EDIT]: ['edit'],
  [TagFunctions.MEDIA_IMAGE_EDIT_URL]: ['editurl'],
  [TagFunctions.MEDIA_IMAGE_IMAGINE]: ['imagine'],
  [TagFunctions.MEDIA_IMAGE_IMAGINE_URL]: ['imagineurl'],
  [TagFunctions.MEDIA_IMAGE_OR_VIDEO]: ['iv'],
  [TagFunctions.MEDIASCRIPT]: ['mediascript', 'mscript', 'imagescript', 'iscript'],
  [TagFunctions.MEDIASCRIPT_MAYBE_URL]: ['mediascriptmaybeurl', 'mscriptmaybeurl', 'imagescriptmaybeurl', 'iscriptmaybeurl'],
  [TagFunctions.MEDIASCRIPT_URL]: ['mediascripturl', 'mscripturl', 'imagescripturl', 'iscripturl'],
  [TagFunctions.MEDIA_VIDEO]: ['video'],
  [TagFunctions.MESSAGE_CONTENT]: ['messagecontent'],
  [TagFunctions.MESSAGE_LAST_ID]: ['messagelastid'],
  [TagFunctions.MESSAGE_RANDOM_ID]: ['randmessageid'],
  [TagFunctions.MESSAGE_USER_ID]: ['messageuserid'],
  [TagFunctions.NSFW]: ['nsfw'],
  [TagFunctions.NSFW_FILTER]: ['nsfwfilter'],
  [TagFunctions.PAGE_JSON]: ['pagejson'],
  [TagFunctions.PREFIX]: ['prefix'],
  [TagFunctions.REPLY_CONTENT]: ['replycontent'],
  [TagFunctions.REPLY_USER_ID]: ['replyuserid'],
  [TagFunctions.REQUEST]: ['request'],
  [TagFunctions.RNG_CHOOSE]: ['choose'],
  [TagFunctions.RNG_RANGE]: ['range', 'random', 'rnd'],
  [TagFunctions.SEARCH_DUCKDUCKGO_IMAGES]: ['search.duckduckgo.images', 'search.ddg.images', 's.duckduckgo.images', 's.ddg.images'],
  [TagFunctions.SEARCH_GOOGLE_IMAGES]: ['search.google.images', 'search.g.images', 's.google.images', 's.g.images'],
  [TagFunctions.SEARCH_YOUTUBE]: ['search.youtube', 'search.yt', 's.youtube', 's.yt'],
  [TagFunctions.SETTINGS]: ['settings'],
  [TagFunctions.STRING_INDEX_OF]: ['indexof'],
  [TagFunctions.STRING_JSONIFY]: ['jsonify'],
  [TagFunctions.STRING_LENGTH]: ['len', 'length'],
  [TagFunctions.STRING_LOWER]: ['lower'],
  [TagFunctions.STRING_MARKUP_BOLD]: ['markupbold'],
  [TagFunctions.STRING_MARKUP_CODEBLOCK]: ['code', 'markupcodeblock'],
  [TagFunctions.STRING_MARKUP_CODESTRING]: ['markupcodestring'],
  [TagFunctions.STRING_MARKUP_ESCAPE]: ['markupescape'],
  [TagFunctions.STRING_MARKUP_HEADER_BIG]: ['markupheaderbig'],
  [TagFunctions.STRING_MARKUP_HEADER_MEDIUM]: ['markupheadermedium'],
  [TagFunctions.STRING_MARKUP_HEADER_SMALL]: ['markupheadersmall'],
  [TagFunctions.STRING_MARKUP_ITALICS]: ['markupitalics'],
  [TagFunctions.STRING_MARKUP_LIST_DOTTED]: ['markuplistdotted'],
  [TagFunctions.STRING_MARKUP_LIST_NUMBERED]: ['markuplistnumbered'],
  [TagFunctions.STRING_MARKUP_QUOTE]: ['markupquote'],
  [TagFunctions.STRING_MARKUP_SPOILER]: ['markupspoiler'],
  [TagFunctions.STRING_MARKUP_STRIKE]: ['markupstrike'],
  [TagFunctions.STRING_MARKUP_SUBTEXT]: ['markupsubtext'],
  [TagFunctions.STRING_MARKUP_TIME]: ['markuptime'],
  [TagFunctions.STRING_MARKUP_UNDERLINE]: ['markupunderline'],
  [TagFunctions.STRING_MARKUP_URL]: ['markupurl'],
  [TagFunctions.STRING_ONE_OF]: ['oneof'],
  [TagFunctions.STRING_REPEAT]: ['repeat'],
  [TagFunctions.STRING_REPLACE]: ['replace', 'replaceregex'],
  [TagFunctions.STRING_REVERSE]: ['reverse'],
  [TagFunctions.STRING_SUB]: ['substring'],
  [TagFunctions.STRING_TRANSLATE]: ['translate'],
  [TagFunctions.STRING_UPPER]: ['upper'],
  [TagFunctions.STRING_URL_ENCODE]: ['url', 'urlencode'],
  [TagFunctions.TAG]: ['tag'],
  [TagFunctions.TAG_ID]: ['tagid'],
  [TagFunctions.TAG_NAME]: ['tagname'],
  [TagFunctions.TAG_OWNER_ID]: ['tagownerid'],
  [TagFunctions.TEXT]: ['download', 'text'],
  [TagFunctions.TEXT_FROM_HTML]: ['downloadfromhtml', 'textfromhtml'],
  [TagFunctions.TIME_UNIX]: ['unix'],
  [TagFunctions.TIME_UNIX_FROM_SNOWFLAKE]: ['unixsnowflake'],
  [TagFunctions.TIME_UNIX_SECONDS]: ['unixs'],
  [TagFunctions.TRANSCRIBE]: ['transcribe'],
  [TagFunctions.TRAVERSE_JSON]: ['traversejson'],
  [TagFunctions.TYPE]: ['type'],
  [TagFunctions.USER_AVATAR]: ['useravatar'],
  [TagFunctions.USER_DISCRIMINATOR]: ['discrim'],
  [TagFunctions.USER_ID]: ['id', 'userid'],
  [TagFunctions.USER_MENTION]: ['mention'],
  [TagFunctions.USER_NAME]: ['name', 'user'],
  [TagFunctions.USER_NICK]: ['nick'],
  [TagFunctions.USER_RANDOM]: ['randuser'],
  [TagFunctions.USER_RANDOM_ID]: ['randuserid'],
  [TagFunctions.USER_RANDOM_ONLINE]: ['randonline'],
  [TagFunctions.USER_RANDOM_ONLINE_ID]: ['randonlineid'],
  [TagFunctions.USER_RANDOM_ONLINE_TAG]: ['randonlinetag'],
  [TagFunctions.USER_RANDOM_TAG]: ['randusertag'],
  [TagFunctions.USER_TAG]: ['usertag'],
  [TagFunctions.VARIABLES]: ['variables'],
  [TagFunctions.VARIABLES_CHANNEL]: ['variableschannel'],
  [TagFunctions.VARIABLES_GLOBAL]: ['variablesglobal'],
  [TagFunctions.VARIABLES_SERVER]: ['variablesserver'],
  [TagFunctions.VARIABLES_USER]: ['variablesuser'],
  [TagFunctions.INCLUDE]: ['include'],
  
});


// export enum TagSettings {
//   AI_MODEL = 'AI_MODEL',
//   AI_PERSONALITY = 'AI_PERSONALITY',
//   MEDIA_AV_FALLBACK = 'MEDIA_AV_FALLBACK',
//   MEDIA_IV_FALLBACK = 'MEDIA_IV_FALLBACK',
//   ML_IMAGINE_DO_NOT_ERROR = 'ML_IMAGINE_DO_NOT_ERROR',
//   ML_IMAGINE_MODEL = 'ML_IMAGINE_MODEL',
// }


// export interface TagVariables {
//   [PrivateVariables.AI_EXECUTIONS]: number,
//   [PrivateVariables.API_MANIPULATIONS]: number,
//   [PrivateVariables.ARGS]: Array<string>,
//   [PrivateVariables.ARGS_STRING]: string,
//   [PrivateVariables.COMPONENT_EXECUTIONS]: number,
//   [PrivateVariables.FILE_SIZE]: number,
//   [PrivateVariables.IS_FROM_CHILD_PARSING]: number,
//   [PrivateVariables.ITERATIONS_REMAINING]: number,
//   [PrivateVariables.NETWORK_REQUESTS]: number,
//   [PrivateVariables.NETWORK_REQUESTS_ML]: number,
//   [PrivateVariables.NETWORK_REQUESTS_OPENAI]: number,
//   [PrivateVariables.PARENT_TAG_ID]: string,
//   [PrivateVariables.RESULTS]: {
//     [TagFunctions.AI]?: RestResponsesRaw.GenerateTag,
//     [TagFunctions.API_SEARCH_DUCKDUCKGO_IMAGES]?: Record<string, RestResponsesRaw.SearchDuckDuckGoImages>,
//     [TagFunctions.API_SEARCH_IMGUR]?: Record<string, RestResponsesRaw.SearchImgur>,
//     [TagFunctions.API_UTILITIES_LOCATIONS]?: Record<string, RestResponsesRaw.UtilitiesLocations>,
//     [TagFunctions.API_UTILITIES_WEATHER]?: Record<string, RestResponsesRaw.UtilitiesWeather>,
//     [TagFunctions.ATTACHMENT]?: Record<string, RestResponsesRaw.FileResponse>,
//     [TagFunctions.SEARCH_GOOGLE_IMAGES]?: Record<string, RestResponses.SearchGoogleImages>,
//     [TagFunctions.SEARCH_YOUTUBE]?: Record<string, RestResponsesRaw.SearchYoutube>,
//   },
//   [PrivateVariables.SETTINGS]: {
//     [TagSettings.AI_MODEL]?: string,
//     [TagSettings.AI_PERSONALITY]?: string,
//     [TagSettings.MEDIA_AV_FALLBACK]?: TagFunctions.SEARCH_YOUTUBE,
//     [TagSettings.MEDIA_IV_FALLBACK]?: TagFunctions.MEDIA_IMAGE_IMAGINE_URL | TagFunctions.SEARCH_GOOGLE_IMAGES | TagFunctions.SEARCH_YOUTUBE,
//     [TagSettings.ML_IMAGINE_DO_NOT_ERROR]?: boolean,
//     [TagSettings.ML_IMAGINE_MODEL]?: MLDiffusionModels,
//   },
//   [PrivateVariables.TAG_EXECUTIONS]: number,
//   [key: string]: number | string | Array<string> | Record<string, any>,
// }

// export interface TagContext {
//   mathWorker?: MathWorker,
// }

// export interface TagResultComponents {
//   components: Array<any>,
//   onTimeout?: string,
// }

// export interface TagResult {
//   components: TagResultComponents | null,
//   context: TagContext,
//   embeds: Array<Embed>,
//   files: Array<{
//     buffer: null | string | Buffer,
//     deleted?: boolean,
//     description?: string,
//     durationSecs?: number,
//     filename: string,
//     spoiler?: boolean,
//     waveform?: string,
//     url: string,
//   }>,
//   limits: TagLimits,
//   pages: Array<PageObject & {filenames?: Array<string>}>,
//   replacement: string | null,
//   text: string,
//   variables: TagVariables,
// }

export const ScriptTags = Object.freeze({
    
    // [TagFunctions.EVAL]: async (arg: string, tag: any, modules: any): Promise<boolean> => {
    // // {eval:{args}}

    // const argParsed = (await parse(arg, modules)).text;
    // tag.text += argParsed;
    // // normalizeTagResults(tag, argParsed);
    // return true;
    // },

    // [TagFunctions.EVAL_SILENT]: async (arg: string, tag: any, modules: any): Promise<boolean> => {
    // // {evalsilent:{args}}

    // try {
    //     let argParsed = await parse(arg, modules);
    //     // normalizeTagResults(tag, argParsed, false);

    //     if (argParsed.text) {
    //     argParsed = await parse(argParsed.text, modules);
    //     // normalizeTagResults(tag, argParsed, false);
    //     }
    // } catch(error) {
        
    // }

    // return true;
    // },
    
    [TagFunctions.INCLUDE]: async (arg: string, tag: any): Promise<boolean> => {
    // {include:/path/to/route}
      const pathToModule: string = arg;
      const oldPath: string = tag.currentPath;
      let includedCode: string;
      if(path.isAbsolute(pathToModule)) {
        tag.currentPath = pathToModule;
      } else {
        tag.currentPath = path.join(tag.currentPath,pathToModule)
      }

      try {
        includedCode = await fs.readFile(tag.currentPath,"utf-8");
      } catch {
        throw new Error("ENOENT: no such file or directory to the module " + tag.currentPath)
      }
      
      const argParsed = (await parse(includedCode)).text;
      tag.text += argParsed;
      tag.currentPath = oldPath;
      // normalizeTagResults(tag, argParsed);
      return true;
    }
})

export function split(value: string, amount: number = 0): Array<string> {
  if (!value.includes(TagSymbols.SPLITTER_ARGUMENT)) {
    return [value];
  }

  let depth = 0;
  let position = 0;
  let text = '';

  const args: Array<string> = [];
  while (position < value.length) {
    if (amount && amount <= args.length) {
      if (args.length) {
        args[args.length - 1] += value.slice(position - 1);
      }
      break;
    }

    if (depth === 0 && !text) {
      // find next left bracket
      const nextLeftBracket = value.indexOf(TagSymbols.BRACKET_LEFT, position);
      if (nextLeftBracket === -1) {
        // no script tags found inside, so we have no splitters to ignore
        for (let x of value.slice(position).split(REGEX_ARGUMENT_SPLITTER)) {
          x = x.replace(REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT, TagSymbols.SPLITTER_ARGUMENT);
          args.push(x);
        }
        position = value.length;
        continue;
      }
    }

    let result = value.slice(position, ++position);
    text += result;
    switch (result) {
      case TagSymbols.SPLITTER_ARGUMENT: {
        if (depth <= 0) {
          // use the arg, we arent in the function anymore
          args.push(text.slice(0, -1));
          text = '';
        }
      }; break;
      case TagSymbols.IGNORE: {
        const nextValue = value.slice(position, position + 1);
        if (nextValue === TagSymbols.BRACKET_LEFT) {
          depth--;
        } else if (nextValue === TagSymbols.BRACKET_RIGHT) {
          depth++;
        } else if (nextValue === TagSymbols.SPLITTER_ARGUMENT) {
          position++;
        }
      }; break;
      case TagSymbols.BRACKET_LEFT: {
        // start of the script
        depth++;
      }; break;
      case TagSymbols.BRACKET_RIGHT: {
        // end of the script
        depth--;
      }; break;
    }
  }

  if (text) {
    args.push(text);
  }
  return args;
}

function parseInnerScript(value: string, shouldTrim: boolean = true): [string, string] {
  let scriptName: string;
  let arg: string;

  // remove the brackets from both sides of the value
  value = value.slice(1, value.length - 1);
  if (shouldTrim) {
    value = value.trim();
  }

  const firstSplitter = value.indexOf(TagSymbols.SPLITTER_FUNCTION);
  if (firstSplitter === -1) {
    scriptName = value;
    arg = '';
  } else {
    scriptName = value.slice(0, firstSplitter);
    arg = value.slice(firstSplitter + 1);
  }

  return [scriptName.toLowerCase(), arg];
}

export async function parse(value: string, shouldTrim: boolean = true) : Promise<TagResult> {

  let isFirstParse = true;
  
  const tag = { text: "", currentPath: "" };
  
  let depth = 0;
  let scriptBuffer = '';
  let position = 0;
  while (position < value.length) {
    if (depth === 0) {
      // find next left bracket
      const nextLeftBracket = value.indexOf(TagSymbols.BRACKET_LEFT, position);
      if (nextLeftBracket === -1) {
        tag.text += value.slice(position);
        position = value.length;
        continue;
      }
      tag.text += value.slice(position, nextLeftBracket);
      position = nextLeftBracket;
    }

    // add network checks
      let result = value.slice(position, ++position);
      scriptBuffer += result;
      switch (result) {
        case TagSymbols.IGNORE: {
          const nextValue = value.slice(position, position + 1);
          if (nextValue === TagSymbols.BRACKET_LEFT) {
            depth--;
          } else if (nextValue === TagSymbols.BRACKET_RIGHT) {
            depth++;
          }
        }; break;
        case TagSymbols.BRACKET_LEFT: {
          // start of the script
          depth++;
        }; break;
        case TagSymbols.BRACKET_RIGHT: {
          // end of the script
          depth--;
          if (depth <= 0) {
            let [scriptName, arg] = parseInnerScript(scriptBuffer, shouldTrim);
            if (TagFunctionsToString.NOTE.includes(scriptName)) {
              // ignore
            } else if (TagFunctionsToString.INCLUDE.includes(scriptName)) {
              const wasValid = await ScriptTags[TagFunctions.INCLUDE](arg, tag);
              if (!wasValid) {
                tag.text += scriptBuffer;
              }
            } else {
              await parse(arg)
              tag.text += scriptBuffer;
            }

            scriptBuffer = '';
          }
        }; break;
      }
  }

  tag.text = (tag.text + scriptBuffer);
  return tag;
}
parse("{include:./main.nsb}").then(p => {
  console.log(JSON.stringify(p));
})