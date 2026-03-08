"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptTags = exports.TagFunctionsToString = exports.TagFunctions = exports.TAG_IF_COMPARISONS = exports.TagIfComparisons = exports.PrivateVariables = exports.REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT = exports.REGEX_ARGUMENT_SPLITTER = exports.URL_FILE_REPLACEMENT_REGEX = exports.SCRIPT_REGEX = exports.MATH_NON_NUMERIC_REGEX = exports.ATTACHMENT_URL_REGEX = exports.PRIVATE_VARIABLE_PREFIX = exports.TagLimitDefaults = exports.ATTACHMENT_EXTENSIONS = exports.ATTACHMENT_EXTENSIONS_MEDIA = exports.ATTACHMENT_EXTENSIONS_IMAGE = exports.TagSymbols = void 0;
exports.getCodeLanguage = getCodeLanguage;
exports.split = split;
exports.parse = parse;
var path = require("path");
var fs = require("fs/promises");
function getCodeLanguage(value) {
    return null;
}
exports.TagSymbols = Object.freeze({
    BRACKET_LEFT: '{',
    BRACKET_RIGHT: '}',
    IGNORE: '\\',
    SPLITTER_ARGUMENT: '|',
    SPLITTER_FUNCTION: ':',
});
exports.ATTACHMENT_EXTENSIONS_IMAGE = [
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
exports.ATTACHMENT_EXTENSIONS_MEDIA = [
    'flac',
    'mov',
    'mp3',
    'mp4',
    'txt',
    'wav',
    'webm',
];
exports.ATTACHMENT_EXTENSIONS = __spreadArray(__spreadArray([], exports.ATTACHMENT_EXTENSIONS_IMAGE, true), exports.ATTACHMENT_EXTENSIONS_MEDIA, true);
exports.TagLimitDefaults = Object.freeze({
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
exports.PRIVATE_VARIABLE_PREFIX = '__';
exports.ATTACHMENT_URL_REGEX = /(https?:\/\/(?:media\.discordapp\.net|cdn.discordapp.com)\/attachments\/[0-9]*\/[0-9]*\/[A-Za-z0-9_.-]*(?:\?[a-zA-Z0-9&=]*)?)/g;
exports.MATH_NON_NUMERIC_REGEX = /[^+\-*\/()0-9.n><&]/g;
exports.SCRIPT_REGEX = /\{((?:(?!:)(?:.|\s))*):([\s\S]+)\}/;
exports.URL_FILE_REPLACEMENT_REGEX = /FILE_([0-9]+)(_COPY)?/g;
exports.REGEX_ARGUMENT_SPLITTER = new RegExp("(?<!\\\\)[".concat(exports.TagSymbols.SPLITTER_ARGUMENT, "]"), 'g');
exports.REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT = new RegExp("\\\\\\".concat(exports.TagSymbols.SPLITTER_ARGUMENT), 'g');
var PrivateVariables;
(function (PrivateVariables) {
    PrivateVariables["AI_EXECUTIONS"] = "__aiExecutions";
    PrivateVariables["API_MANIPULATIONS"] = "__apiManipulations";
    PrivateVariables["ARGS"] = "__args";
    PrivateVariables["ARGS_STRING"] = "__argsString";
    PrivateVariables["COMPONENT_EXECUTIONS"] = "__componentExecutions";
    PrivateVariables["FILE_SIZE"] = "__fileSize";
    PrivateVariables["FILES"] = "__files";
    PrivateVariables["IS_FROM_CHILD_PARSING"] = "__isFromChildParsing";
    PrivateVariables["ITERATIONS_REMAINING"] = "__iterationsRemaining";
    PrivateVariables["NETWORK_REQUESTS"] = "__networkRequests";
    PrivateVariables["NETWORK_REQUESTS_ML"] = "__networkRequestsML";
    PrivateVariables["NETWORK_REQUESTS_OPENAI"] = "__networkRequestsOpenAI";
    PrivateVariables["PARENT_TAG_ID"] = "__parentTagId";
    PrivateVariables["RESULTS"] = "__results";
    PrivateVariables["SETTINGS"] = "__settings";
    PrivateVariables["TAG_EXECUTIONS"] = "__tagExecutions";
})(PrivateVariables || (exports.PrivateVariables = PrivateVariables = {}));
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
var TagIfComparisons;
(function (TagIfComparisons) {
    TagIfComparisons["EQUAL"] = "=";
    TagIfComparisons["EQUAL_NOT"] = "!=";
    TagIfComparisons["GREATER_THAN"] = ">";
    TagIfComparisons["GREATER_THAN_OR_EQUAL"] = ">=";
    TagIfComparisons["LESS_THAN"] = "<";
    TagIfComparisons["LESS_THAN_OR_EQUAL"] = "<=";
    TagIfComparisons["TILDE"] = "~";
})(TagIfComparisons || (exports.TagIfComparisons = TagIfComparisons = {}));
exports.TAG_IF_COMPARISONS = [
    TagIfComparisons.EQUAL,
    TagIfComparisons.EQUAL_NOT,
    TagIfComparisons.GREATER_THAN,
    TagIfComparisons.GREATER_THAN_OR_EQUAL,
    TagIfComparisons.LESS_THAN,
    TagIfComparisons.LESS_THAN_OR_EQUAL,
    TagIfComparisons.TILDE,
];
// maybe make {argattachment}
var TagFunctions;
(function (TagFunctions) {
    TagFunctions["AI"] = "AI";
    TagFunctions["API_CREATE_REMINDER"] = "API_CREATE_REMINDER";
    TagFunctions["API_SEARCH_DUCKDUCKGO_IMAGES"] = "API_SEARCH_DUCKDUCKGO_IMAGES";
    TagFunctions["API_SEARCH_IMGUR"] = "API_SEARCH_IMGUR";
    TagFunctions["API_UTILITIES_LOCATIONS"] = "API_UTILITIES_LOCATIONS";
    TagFunctions["API_UTILITIES_WEATHER"] = "API_UTILITIES_WEATHER";
    TagFunctions["ARG"] = "ARG";
    TagFunctions["ARG_SAFE"] = "ARG_SAFE";
    TagFunctions["ARGS"] = "ARGS";
    TagFunctions["ARGS_LEN"] = "ARGS_LEN";
    TagFunctions["ARGS_SAFE"] = "ARGS_SAFE";
    TagFunctions["ATTACHMENT"] = "ATTACHMENT";
    TagFunctions["ATTACHMENT_LAST"] = "ATTACHMENT_LAST";
    TagFunctions["ATTACHMENT_SPOILER"] = "ATTACHMENT_SPOILER";
    TagFunctions["ATTACHMENT_TEXT"] = "ATTACHMENT_TEXT";
    TagFunctions["ATTACHMENT_VOICE"] = "ATTACHMENT_VOICE";
    TagFunctions["AVATAR"] = "AVATAR";
    TagFunctions["CHANNEL"] = "CHANNEL";
    TagFunctions["CHANNEL_ID"] = "CHANNEL_ID";
    TagFunctions["CHANNEL_MENTION"] = "CHANNEL_MENTION";
    TagFunctions["CHANNEL_RANDOM"] = "CHANNEL_RANDOM";
    TagFunctions["CHANNEL_RANDOM_ID"] = "CHANNEL_RANDOM_ID";
    TagFunctions["CHANNEL_RANDOM_MENTION"] = "CHANNEL_RANDOM_MENTION";
    TagFunctions["COMPONENT_JSON"] = "COMPONENT_JSON";
    TagFunctions["COMPONENTS_ON_TIMEOUT"] = "COMPONENTS_ON_TIMEOUT";
    TagFunctions["DISCORD"] = "DISCORD";
    TagFunctions["EMBED_JSON"] = "EMBED_JSON";
    TagFunctions["EVAL"] = "EVAL";
    TagFunctions["EVAL_SILENT"] = "EVAL_SILENT";
    TagFunctions["EXIT"] = "EXIT";
    TagFunctions["EXIT_SILENT"] = "EXIT_SILENT";
    TagFunctions["GUILD"] = "GUILD";
    TagFunctions["GUILD_COUNT"] = "GUILD_COUNT";
    TagFunctions["GUILD_ID"] = "GUILD_ID";
    TagFunctions["HASTEBIN"] = "HASTEBIN";
    TagFunctions["IMAGE_INTERROGATE"] = "IMAGE_INTERROGATE";
    TagFunctions["IMAGE_OCR"] = "IMAGE_OCR";
    TagFunctions["INSERT_BRACKET_LEFT"] = "INSERT_BRACKET_LEFT";
    TagFunctions["INSERT_BRACKET_RIGHT"] = "INSERT_BRACKET_RIGHT";
    TagFunctions["INSERT_NEWLINE"] = "INSERT_NEWLINE";
    TagFunctions["INSERT_SPLITTER_ARGUMENT"] = "INSERT_SPLITTER_ARGUMENT";
    TagFunctions["INSERT_SPLITTER_FUNCTION"] = "INSERT_SPLITTER_FUNCTION";
    TagFunctions["JSON_CHANNEL"] = "JSON_CHANNEL";
    TagFunctions["JSON_GUILD"] = "JSON_GUILD";
    TagFunctions["JSON_MEMBER"] = "JSON_MEMBER";
    TagFunctions["JSON_MEMBER_OR_USER"] = "JSON_MEMBER_OR_USER";
    TagFunctions["JSON_MESSAGE"] = "JSON_MESSAGE";
    TagFunctions["JSON_MESSAGE_REPLY"] = "JSON_MESSAGE_REPLY";
    TagFunctions["JSON_USER"] = "JSON_USER";
    TagFunctions["LOGICAL_AND"] = "LOGICAL_AND";
    TagFunctions["LOGICAL_DELETE"] = "LOGICAL_DELETE";
    TagFunctions["LOGICAL_DELETE_CHANNEL"] = "LOGICAL_DELETE_CHANNEL";
    TagFunctions["LOGICAL_DELETE_SERVER"] = "LOGICAL_DELETE_SERVER";
    TagFunctions["LOGICAL_DELETE_USER"] = "LOGICAL_DELETE_USER";
    TagFunctions["LOGICAL_FOR_EACH"] = "LOGICAL_FOR_EACH";
    TagFunctions["LOGICAL_GET"] = "LOGICAL_GET";
    TagFunctions["LOGICAL_GET_CHANNEL"] = "LOGICAL_GET_CHANNEL";
    TagFunctions["LOGICAL_GET_GLOBAL"] = "LOGICAL_GET_GLOBAL";
    TagFunctions["LOGICAL_GET_SERVER"] = "LOGICAL_GET_SERVER";
    TagFunctions["LOGICAL_GET_USER"] = "LOGICAL_GET_USER";
    TagFunctions["LOGICAL_IF"] = "LOGICAL_IF";
    TagFunctions["LOGICAL_IF_ERROR"] = "LOGICAL_IF_ERROR";
    TagFunctions["LOGICAL_IS_FROM_AI"] = "LOGICAL_IS_FROM_AI";
    TagFunctions["LOGICAL_IS_FROM_COMPONENT"] = "LOGICAL_IS_FROM_COMPONENT";
    TagFunctions["LOGICAL_IS_MAIN_TAG"] = "LOGICAL_IS_MAIN_TAG";
    TagFunctions["LOGICAL_OR"] = "LOGICAL_OR";
    TagFunctions["LOGICAL_SET"] = "LOGICAL_SET";
    TagFunctions["LOGICAL_SET_CHANNEL"] = "LOGICAL_SET_CHANNEL";
    TagFunctions["LOGICAL_SET_GLOBAL"] = "LOGICAL_SET_GLOBAL";
    TagFunctions["LOGICAL_SET_SERVER"] = "LOGICAL_SET_SERVER";
    TagFunctions["LOGICAL_SET_USER"] = "LOGICAL_SET_USER";
    TagFunctions["MATH"] = "MATH";
    TagFunctions["MATH_ABS"] = "MATH_ABS";
    TagFunctions["MATH_COS"] = "MATH_COS";
    TagFunctions["MATH_E"] = "MATH_E";
    TagFunctions["MATH_MAX"] = "MATH_MAX";
    TagFunctions["MATH_MIN"] = "MATH_MIN";
    TagFunctions["MATH_PI"] = "MATH_PI";
    TagFunctions["MATH_SIN"] = "MATH_SIN";
    TagFunctions["MATH_TAN"] = "MATH_TAN";
    TagFunctions["MEDIA"] = "MEDIA";
    TagFunctions["MEDIA_AUDIO"] = "MEDIA_AUDIO";
    TagFunctions["MEDIA_AUDIO_OR_VIDEO"] = "MEDIA_AUDIO_OR_VIDEO";
    TagFunctions["MEDIA_IMAGE"] = "MEDIA_IMAGE";
    TagFunctions["MEDIA_IMAGE_EDIT"] = "MEDIA_IMAGE_EDIT";
    TagFunctions["MEDIA_IMAGE_EDIT_URL"] = "MEDIA_IMAGE_EDIT_URL";
    TagFunctions["MEDIA_IMAGE_IMAGINE"] = "MEDIA_IMAGE_IMAGINE";
    TagFunctions["MEDIA_IMAGE_IMAGINE_URL"] = "MEDIA_IMAGE_IMAGINE_URL";
    TagFunctions["MEDIA_IMAGE_OR_VIDEO"] = "MEDIA_IMAGE_OR_VIDEO";
    TagFunctions["MEDIA_VIDEO"] = "MEDIA_VIDEO";
    TagFunctions["MEDIASCRIPT"] = "MEDIASCRIPT";
    TagFunctions["MEDIASCRIPT_MAYBE_URL"] = "MEDIASCRIPT_MAYBE_URL";
    TagFunctions["MEDIASCRIPT_URL"] = "MEDIASCRIPT_URL";
    TagFunctions["MESSAGE_CONTENT"] = "MESSAGE_CONTENT";
    TagFunctions["MESSAGE_LAST_ID"] = "MESSAGE_LAST_ID";
    TagFunctions["MESSAGE_RANDOM_ID"] = "MESSAGE_RANDOM_ID";
    TagFunctions["MESSAGE_USER_ID"] = "MESSAGE_USER_ID";
    TagFunctions["NSFW"] = "NSFW";
    TagFunctions["NSFW_FILTER"] = "NSFW_FILTER";
    TagFunctions["PAGE_JSON"] = "PAGE_JSON";
    TagFunctions["PREFIX"] = "PREFIX";
    TagFunctions["REPLY_CONTENT"] = "REPLY_CONTENT";
    TagFunctions["REPLY_USER_ID"] = "REPLY_USER_ID";
    TagFunctions["REQUEST"] = "REQUEST";
    TagFunctions["RNG_CHOOSE"] = "RNG_CHOOSE";
    TagFunctions["RNG_RANGE"] = "RNG_RANGE";
    TagFunctions["SEARCH_DUCKDUCKGO_IMAGES"] = "SEARCH_DUCKDUCKGO_IMAGES";
    TagFunctions["SEARCH_GOOGLE_IMAGES"] = "SEARCH_GOOGLE_IMAGES";
    TagFunctions["SEARCH_YOUTUBE"] = "SEARCH_YOUTUBE";
    TagFunctions["SETTINGS"] = "SETTINGS";
    TagFunctions["STRING_INDEX_OF"] = "STRING_INDEX_OF";
    TagFunctions["STRING_JSONIFY"] = "STRING_JSONIFY";
    TagFunctions["STRING_LENGTH"] = "STRING_LENGTH";
    TagFunctions["STRING_LOWER"] = "STRING_LOWER";
    TagFunctions["STRING_MARKUP_BOLD"] = "STRING_MARKUP_BOLD";
    TagFunctions["STRING_MARKUP_CODEBLOCK"] = "STRING_MARKUP_CODEBLOCK";
    TagFunctions["STRING_MARKUP_CODESTRING"] = "STRING_MARKUP_CODESTRING";
    TagFunctions["STRING_MARKUP_ESCAPE"] = "STRING_MARKUP_ESCAPE";
    TagFunctions["STRING_MARKUP_HEADER_BIG"] = "STRING_MARKUP_HEADER_BIG";
    TagFunctions["STRING_MARKUP_HEADER_MEDIUM"] = "STRING_MARKUP_HEADER_MEDIUM";
    TagFunctions["STRING_MARKUP_HEADER_SMALL"] = "STRING_MARKUP_HEADER_SMALL";
    TagFunctions["STRING_MARKUP_ITALICS"] = "STRING_MARKUP_ITALICS";
    TagFunctions["STRING_MARKUP_LIST_DOTTED"] = "STRING_MARKUP_LIST_DOTTED";
    TagFunctions["STRING_MARKUP_LIST_NUMBERED"] = "STRING_MARKUP_LIST_NUMBERED";
    TagFunctions["STRING_MARKUP_QUOTE"] = "STRING_MARKUP_QUOTE";
    TagFunctions["STRING_MARKUP_SPOILER"] = "STRING_MARKUP_SPOILER";
    TagFunctions["STRING_MARKUP_STRIKE"] = "STRING_MARKUP_STRIKE";
    TagFunctions["STRING_MARKUP_SUBTEXT"] = "STRING_MARKUP_SUBTEXT";
    TagFunctions["STRING_MARKUP_TIME"] = "STRING_MARKUP_TIME";
    TagFunctions["STRING_MARKUP_UNDERLINE"] = "STRING_MARKUP_UNDERLINE";
    TagFunctions["STRING_MARKUP_URL"] = "STRING_MARKUP_URL";
    TagFunctions["STRING_ONE_OF"] = "STRING_ONE_OF";
    TagFunctions["STRING_REPEAT"] = "STRING_REPEAT";
    TagFunctions["STRING_REPLACE"] = "STRING_REPLACE";
    TagFunctions["STRING_REVERSE"] = "STRING_REVERSE";
    TagFunctions["STRING_SUB"] = "STRING_SUB";
    TagFunctions["STRING_TRANSLATE"] = "STRING_TRANSLATE";
    TagFunctions["STRING_UPPER"] = "STRING_UPPER";
    TagFunctions["STRING_URL_ENCODE"] = "STRING_URL_ENCODE";
    TagFunctions["TAG"] = "TAG";
    TagFunctions["TAG_ID"] = "TAG_ID";
    TagFunctions["TAG_NAME"] = "TAG_NAME";
    TagFunctions["TAG_OWNER_ID"] = "TAG_OWNER_ID";
    TagFunctions["TEXT"] = "TEXT";
    TagFunctions["TEXT_FROM_HTML"] = "TEXT_FROM_HTML";
    TagFunctions["TIME_UNIX"] = "TIME_UNIX";
    TagFunctions["TIME_UNIX_FROM_SNOWFLAKE"] = "TIME_UNIX_FROM_SNOWFLAKE";
    TagFunctions["TIME_UNIX_SECONDS"] = "TIME_UNIX_SECONDS";
    TagFunctions["TRANSCRIBE"] = "TRANSCRIBE";
    TagFunctions["TRAVERSE_JSON"] = "TRAVERSE_JSON";
    TagFunctions["TYPE"] = "TYPE";
    TagFunctions["USER_AVATAR"] = "USER_AVATAR";
    TagFunctions["USER_DISCRIMINATOR"] = "USER_DISCRIMINATOR";
    TagFunctions["USER_ID"] = "USER_ID";
    TagFunctions["USER_MENTION"] = "USER_MENTION";
    TagFunctions["USER_NAME"] = "USER_NAME";
    TagFunctions["USER_NICK"] = "USER_NICK";
    TagFunctions["USER_RANDOM"] = "USER_RANDOM";
    TagFunctions["USER_RANDOM_ID"] = "USER_RANDOM_ID";
    TagFunctions["USER_RANDOM_ONLINE"] = "USER_RANDOM_ONLINE";
    TagFunctions["USER_RANDOM_ONLINE_ID"] = "USER_RANDOM_ONLINE_ID";
    TagFunctions["USER_RANDOM_ONLINE_TAG"] = "USER_RANDOM_ONLINE_TAG";
    TagFunctions["USER_RANDOM_TAG"] = "USER_RANDOM_TAG";
    TagFunctions["USER_TAG"] = "USER_TAG";
    TagFunctions["VARIABLES"] = "VARIABLES";
    TagFunctions["VARIABLES_CHANNEL"] = "VARIABLES_CHANNEL";
    TagFunctions["VARIABLES_GLOBAL"] = "VARIABLES_GLOBAL";
    TagFunctions["VARIABLES_SERVER"] = "VARIABLES_SERVER";
    TagFunctions["VARIABLES_USER"] = "VARIABLES_USER";
    TagFunctions["INCLUDE"] = "INCLUDE";
})(TagFunctions || (exports.TagFunctions = TagFunctions = {}));
exports.TagFunctionsToString = Object.freeze((_a = {
        IGNORE: ['ignore'],
        NOTE: ['note']
    },
    _a[TagFunctions.AI] = ['ai'],
    _a[TagFunctions.API_CREATE_REMINDER] = ['api.create.reminder'],
    _a[TagFunctions.API_SEARCH_DUCKDUCKGO_IMAGES] = ['api.search.duckduckgo.images'],
    _a[TagFunctions.API_SEARCH_IMGUR] = ['api.search.imgur'],
    _a[TagFunctions.API_UTILITIES_LOCATIONS] = ['api.utilities.locations'],
    _a[TagFunctions.API_UTILITIES_WEATHER] = ['api.utilities.weather'],
    _a[TagFunctions.ARG] = ['arg'],
    _a[TagFunctions.ARG_SAFE] = ['argsafe'],
    _a[TagFunctions.ARGS] = ['args'],
    _a[TagFunctions.ARGS_LEN] = ['argslen'],
    _a[TagFunctions.ARGS_SAFE] = ['argssafe'],
    _a[TagFunctions.ATTACHMENT] = ['attachment', 'attach', 'file'],
    _a[TagFunctions.ATTACHMENT_LAST] = ['last_attachment', 'lastattachment', 'lattachment', 'lattach'],
    _a[TagFunctions.ATTACHMENT_SPOILER] = ['attachmentspoiler', 'attachspoiler', 'filespoiler'],
    _a[TagFunctions.ATTACHMENT_TEXT] = ['attachmenttext', 'attachtext', 'filetext'],
    _a[TagFunctions.ATTACHMENT_VOICE] = ['attachmentvoice', 'attachvoice', 'filevoice'],
    _a[TagFunctions.AVATAR] = ['avatar'],
    _a[TagFunctions.CHANNEL] = ['channel'],
    _a[TagFunctions.CHANNEL_ID] = ['channelid'],
    _a[TagFunctions.CHANNEL_MENTION] = ['channelmention'],
    _a[TagFunctions.CHANNEL_RANDOM] = ['randchannel'],
    _a[TagFunctions.CHANNEL_RANDOM_ID] = ['randchannelid'],
    _a[TagFunctions.CHANNEL_RANDOM_MENTION] = ['randchannelmention'],
    _a[TagFunctions.COMPONENT_JSON] = ['componentjson'],
    _a[TagFunctions.COMPONENTS_ON_TIMEOUT] = ['componentsontimeout'],
    _a[TagFunctions.DISCORD] = ['discord'],
    _a[TagFunctions.EMBED_JSON] = ['embedjson'],
    _a[TagFunctions.EVAL] = ['eval'],
    _a[TagFunctions.EVAL_SILENT] = ['evalsilent'],
    _a[TagFunctions.EXIT] = ['exit'],
    _a[TagFunctions.EXIT_SILENT] = ['exitsilent'],
    _a[TagFunctions.GUILD] = ['guild', 'server'],
    _a[TagFunctions.GUILD_COUNT] = ['guildcount', 'membercount', 'servercount'],
    _a[TagFunctions.GUILD_ID] = ['guildid', 'serverid', 'sid', 'gid'],
    _a[TagFunctions.HASTEBIN] = ['hastebin', 'haste'],
    _a[TagFunctions.IMAGE_INTERROGATE] = ['identify', 'interrogate'],
    _a[TagFunctions.IMAGE_OCR] = ['ocr'],
    _a[TagFunctions.INSERT_BRACKET_LEFT] = ['bracketleft'],
    _a[TagFunctions.INSERT_BRACKET_RIGHT] = ['bracketright'],
    _a[TagFunctions.INSERT_NEWLINE] = ['newline'],
    _a[TagFunctions.INSERT_SPLITTER_ARGUMENT] = ['splitterargument'],
    _a[TagFunctions.INSERT_SPLITTER_FUNCTION] = ['splitterfunction'],
    _a[TagFunctions.JSON_CHANNEL] = ['json.channel', 'channeljson'],
    _a[TagFunctions.JSON_GUILD] = ['json.guild'],
    _a[TagFunctions.JSON_MEMBER] = ['json.member'],
    _a[TagFunctions.JSON_MEMBER_OR_USER] = ['json.memberoruser'],
    _a[TagFunctions.JSON_MESSAGE] = ['json.message'],
    _a[TagFunctions.JSON_MESSAGE_REPLY] = ['json.messagereply'],
    _a[TagFunctions.JSON_USER] = ['json.user', 'userjson'],
    _a[TagFunctions.LOGICAL_AND] = ['and'],
    _a[TagFunctions.LOGICAL_DELETE] = ['delete'],
    _a[TagFunctions.LOGICAL_DELETE_CHANNEL] = ['deletechannel'],
    _a[TagFunctions.LOGICAL_DELETE_SERVER] = ['deleteserver'],
    _a[TagFunctions.LOGICAL_DELETE_USER] = ['deleteuser'],
    _a[TagFunctions.LOGICAL_FOR_EACH] = ['foreach'],
    _a[TagFunctions.LOGICAL_GET] = ['get'],
    _a[TagFunctions.LOGICAL_GET_CHANNEL] = ['getchannel'],
    _a[TagFunctions.LOGICAL_GET_GLOBAL] = ['getglobal'],
    _a[TagFunctions.LOGICAL_GET_SERVER] = ['getserver'],
    _a[TagFunctions.LOGICAL_GET_USER] = ['getuser'],
    _a[TagFunctions.LOGICAL_IF] = ['if'],
    _a[TagFunctions.LOGICAL_IF_ERROR] = ['iferror'],
    _a[TagFunctions.LOGICAL_IS_FROM_AI] = ['isfromai'],
    _a[TagFunctions.LOGICAL_IS_FROM_COMPONENT] = ['isfromcomponent'],
    _a[TagFunctions.LOGICAL_IS_MAIN_TAG] = ['ismaintag'],
    _a[TagFunctions.LOGICAL_OR] = ['or'],
    _a[TagFunctions.LOGICAL_SET] = ['set'],
    _a[TagFunctions.LOGICAL_SET_CHANNEL] = ['setchannel'],
    _a[TagFunctions.LOGICAL_SET_GLOBAL] = ['setglobal'],
    _a[TagFunctions.LOGICAL_SET_SERVER] = ['setserver'],
    _a[TagFunctions.LOGICAL_SET_USER] = ['setuser'],
    _a[TagFunctions.MATH] = ['math'],
    _a[TagFunctions.MATH_ABS] = ['abs'],
    _a[TagFunctions.MATH_COS] = ['cos'],
    _a[TagFunctions.MATH_E] = ['e'],
    _a[TagFunctions.MATH_MAX] = ['max'],
    _a[TagFunctions.MATH_MIN] = ['min'],
    _a[TagFunctions.MATH_PI] = ['pi'],
    _a[TagFunctions.MATH_SIN] = ['sin'],
    _a[TagFunctions.MATH_TAN] = ['tan'],
    _a[TagFunctions.MEDIA] = ['media'],
    _a[TagFunctions.MEDIA_AUDIO] = ['audio'],
    _a[TagFunctions.MEDIA_AUDIO_OR_VIDEO] = ['av'],
    _a[TagFunctions.MEDIA_IMAGE] = ['image'],
    _a[TagFunctions.MEDIA_IMAGE_EDIT] = ['edit'],
    _a[TagFunctions.MEDIA_IMAGE_EDIT_URL] = ['editurl'],
    _a[TagFunctions.MEDIA_IMAGE_IMAGINE] = ['imagine'],
    _a[TagFunctions.MEDIA_IMAGE_IMAGINE_URL] = ['imagineurl'],
    _a[TagFunctions.MEDIA_IMAGE_OR_VIDEO] = ['iv'],
    _a[TagFunctions.MEDIASCRIPT] = ['mediascript', 'mscript', 'imagescript', 'iscript'],
    _a[TagFunctions.MEDIASCRIPT_MAYBE_URL] = ['mediascriptmaybeurl', 'mscriptmaybeurl', 'imagescriptmaybeurl', 'iscriptmaybeurl'],
    _a[TagFunctions.MEDIASCRIPT_URL] = ['mediascripturl', 'mscripturl', 'imagescripturl', 'iscripturl'],
    _a[TagFunctions.MEDIA_VIDEO] = ['video'],
    _a[TagFunctions.MESSAGE_CONTENT] = ['messagecontent'],
    _a[TagFunctions.MESSAGE_LAST_ID] = ['messagelastid'],
    _a[TagFunctions.MESSAGE_RANDOM_ID] = ['randmessageid'],
    _a[TagFunctions.MESSAGE_USER_ID] = ['messageuserid'],
    _a[TagFunctions.NSFW] = ['nsfw'],
    _a[TagFunctions.NSFW_FILTER] = ['nsfwfilter'],
    _a[TagFunctions.PAGE_JSON] = ['pagejson'],
    _a[TagFunctions.PREFIX] = ['prefix'],
    _a[TagFunctions.REPLY_CONTENT] = ['replycontent'],
    _a[TagFunctions.REPLY_USER_ID] = ['replyuserid'],
    _a[TagFunctions.REQUEST] = ['request'],
    _a[TagFunctions.RNG_CHOOSE] = ['choose'],
    _a[TagFunctions.RNG_RANGE] = ['range', 'random', 'rnd'],
    _a[TagFunctions.SEARCH_DUCKDUCKGO_IMAGES] = ['search.duckduckgo.images', 'search.ddg.images', 's.duckduckgo.images', 's.ddg.images'],
    _a[TagFunctions.SEARCH_GOOGLE_IMAGES] = ['search.google.images', 'search.g.images', 's.google.images', 's.g.images'],
    _a[TagFunctions.SEARCH_YOUTUBE] = ['search.youtube', 'search.yt', 's.youtube', 's.yt'],
    _a[TagFunctions.SETTINGS] = ['settings'],
    _a[TagFunctions.STRING_INDEX_OF] = ['indexof'],
    _a[TagFunctions.STRING_JSONIFY] = ['jsonify'],
    _a[TagFunctions.STRING_LENGTH] = ['len', 'length'],
    _a[TagFunctions.STRING_LOWER] = ['lower'],
    _a[TagFunctions.STRING_MARKUP_BOLD] = ['markupbold'],
    _a[TagFunctions.STRING_MARKUP_CODEBLOCK] = ['code', 'markupcodeblock'],
    _a[TagFunctions.STRING_MARKUP_CODESTRING] = ['markupcodestring'],
    _a[TagFunctions.STRING_MARKUP_ESCAPE] = ['markupescape'],
    _a[TagFunctions.STRING_MARKUP_HEADER_BIG] = ['markupheaderbig'],
    _a[TagFunctions.STRING_MARKUP_HEADER_MEDIUM] = ['markupheadermedium'],
    _a[TagFunctions.STRING_MARKUP_HEADER_SMALL] = ['markupheadersmall'],
    _a[TagFunctions.STRING_MARKUP_ITALICS] = ['markupitalics'],
    _a[TagFunctions.STRING_MARKUP_LIST_DOTTED] = ['markuplistdotted'],
    _a[TagFunctions.STRING_MARKUP_LIST_NUMBERED] = ['markuplistnumbered'],
    _a[TagFunctions.STRING_MARKUP_QUOTE] = ['markupquote'],
    _a[TagFunctions.STRING_MARKUP_SPOILER] = ['markupspoiler'],
    _a[TagFunctions.STRING_MARKUP_STRIKE] = ['markupstrike'],
    _a[TagFunctions.STRING_MARKUP_SUBTEXT] = ['markupsubtext'],
    _a[TagFunctions.STRING_MARKUP_TIME] = ['markuptime'],
    _a[TagFunctions.STRING_MARKUP_UNDERLINE] = ['markupunderline'],
    _a[TagFunctions.STRING_MARKUP_URL] = ['markupurl'],
    _a[TagFunctions.STRING_ONE_OF] = ['oneof'],
    _a[TagFunctions.STRING_REPEAT] = ['repeat'],
    _a[TagFunctions.STRING_REPLACE] = ['replace', 'replaceregex'],
    _a[TagFunctions.STRING_REVERSE] = ['reverse'],
    _a[TagFunctions.STRING_SUB] = ['substring'],
    _a[TagFunctions.STRING_TRANSLATE] = ['translate'],
    _a[TagFunctions.STRING_UPPER] = ['upper'],
    _a[TagFunctions.STRING_URL_ENCODE] = ['url', 'urlencode'],
    _a[TagFunctions.TAG] = ['tag'],
    _a[TagFunctions.TAG_ID] = ['tagid'],
    _a[TagFunctions.TAG_NAME] = ['tagname'],
    _a[TagFunctions.TAG_OWNER_ID] = ['tagownerid'],
    _a[TagFunctions.TEXT] = ['download', 'text'],
    _a[TagFunctions.TEXT_FROM_HTML] = ['downloadfromhtml', 'textfromhtml'],
    _a[TagFunctions.TIME_UNIX] = ['unix'],
    _a[TagFunctions.TIME_UNIX_FROM_SNOWFLAKE] = ['unixsnowflake'],
    _a[TagFunctions.TIME_UNIX_SECONDS] = ['unixs'],
    _a[TagFunctions.TRANSCRIBE] = ['transcribe'],
    _a[TagFunctions.TRAVERSE_JSON] = ['traversejson'],
    _a[TagFunctions.TYPE] = ['type'],
    _a[TagFunctions.USER_AVATAR] = ['useravatar'],
    _a[TagFunctions.USER_DISCRIMINATOR] = ['discrim'],
    _a[TagFunctions.USER_ID] = ['id', 'userid'],
    _a[TagFunctions.USER_MENTION] = ['mention'],
    _a[TagFunctions.USER_NAME] = ['name', 'user'],
    _a[TagFunctions.USER_NICK] = ['nick'],
    _a[TagFunctions.USER_RANDOM] = ['randuser'],
    _a[TagFunctions.USER_RANDOM_ID] = ['randuserid'],
    _a[TagFunctions.USER_RANDOM_ONLINE] = ['randonline'],
    _a[TagFunctions.USER_RANDOM_ONLINE_ID] = ['randonlineid'],
    _a[TagFunctions.USER_RANDOM_ONLINE_TAG] = ['randonlinetag'],
    _a[TagFunctions.USER_RANDOM_TAG] = ['randusertag'],
    _a[TagFunctions.USER_TAG] = ['usertag'],
    _a[TagFunctions.VARIABLES] = ['variables'],
    _a[TagFunctions.VARIABLES_CHANNEL] = ['variableschannel'],
    _a[TagFunctions.VARIABLES_GLOBAL] = ['variablesglobal'],
    _a[TagFunctions.VARIABLES_SERVER] = ['variablesserver'],
    _a[TagFunctions.VARIABLES_USER] = ['variablesuser'],
    _a[TagFunctions.INCLUDE] = ['include'],
    _a));
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
exports.ScriptTags = Object.freeze((_b = {},
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
    _b[TagFunctions.INCLUDE] = function (arg, tag) { return __awaiter(void 0, void 0, void 0, function () {
        var pathToModule, oldPath, includedCode, _a, argParsed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathToModule = arg;
                    oldPath = tag.currentPath;
                    if (path.isAbsolute(pathToModule)) {
                        tag.currentPath = pathToModule;
                    }
                    else {
                        tag.currentPath = path.join(tag.currentPath, pathToModule);
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.readFile(tag.currentPath, "utf-8")];
                case 2:
                    includedCode = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    throw new Error("ENOENT: no such file or directory to the module " + tag.currentPath);
                case 4: return [4 /*yield*/, parse(includedCode)];
                case 5:
                    argParsed = (_b.sent()).text;
                    tag.text += argParsed;
                    tag.currentPath = oldPath;
                    // normalizeTagResults(tag, argParsed);
                    return [2 /*return*/, true];
            }
        });
    }); },
    _b));
function split(value, amount) {
    if (amount === void 0) { amount = 0; }
    if (!value.includes(exports.TagSymbols.SPLITTER_ARGUMENT)) {
        return [value];
    }
    var depth = 0;
    var position = 0;
    var text = '';
    var args = [];
    while (position < value.length) {
        if (amount && amount <= args.length) {
            if (args.length) {
                args[args.length - 1] += value.slice(position - 1);
            }
            break;
        }
        if (depth === 0 && !text) {
            // find next left bracket
            var nextLeftBracket = value.indexOf(exports.TagSymbols.BRACKET_LEFT, position);
            if (nextLeftBracket === -1) {
                // no script tags found inside, so we have no splitters to ignore
                for (var _i = 0, _a = value.slice(position).split(exports.REGEX_ARGUMENT_SPLITTER); _i < _a.length; _i++) {
                    var x = _a[_i];
                    x = x.replace(exports.REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT, exports.TagSymbols.SPLITTER_ARGUMENT);
                    args.push(x);
                }
                position = value.length;
                continue;
            }
        }
        var result = value.slice(position, ++position);
        text += result;
        switch (result) {
            case exports.TagSymbols.SPLITTER_ARGUMENT:
                {
                    if (depth <= 0) {
                        // use the arg, we arent in the function anymore
                        args.push(text.slice(0, -1));
                        text = '';
                    }
                }
                ;
                break;
            case exports.TagSymbols.IGNORE:
                {
                    var nextValue = value.slice(position, position + 1);
                    if (nextValue === exports.TagSymbols.BRACKET_LEFT) {
                        depth--;
                    }
                    else if (nextValue === exports.TagSymbols.BRACKET_RIGHT) {
                        depth++;
                    }
                    else if (nextValue === exports.TagSymbols.SPLITTER_ARGUMENT) {
                        position++;
                    }
                }
                ;
                break;
            case exports.TagSymbols.BRACKET_LEFT:
                {
                    // start of the script
                    depth++;
                }
                ;
                break;
            case exports.TagSymbols.BRACKET_RIGHT:
                {
                    // end of the script
                    depth--;
                }
                ;
                break;
        }
    }
    if (text) {
        args.push(text);
    }
    return args;
}
function parseInnerScript(value, shouldTrim) {
    if (shouldTrim === void 0) { shouldTrim = true; }
    var scriptName;
    var arg;
    // remove the brackets from both sides of the value
    value = value.slice(1, value.length - 1);
    if (shouldTrim) {
        value = value.trim();
    }
    var firstSplitter = value.indexOf(exports.TagSymbols.SPLITTER_FUNCTION);
    if (firstSplitter === -1) {
        scriptName = value;
        arg = '';
    }
    else {
        scriptName = value.slice(0, firstSplitter);
        arg = value.slice(firstSplitter + 1);
    }
    return [scriptName.toLowerCase(), arg];
}
function parse(value_1) {
    return __awaiter(this, arguments, void 0, function (value, shouldTrim) {
        var isFirstParse, tag, depth, scriptBuffer, position, nextLeftBracket, result, _a, nextValue, _b, scriptName, arg, wasValid;
        if (shouldTrim === void 0) { shouldTrim = true; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    isFirstParse = true;
                    tag = { text: "", currentPath: "" };
                    depth = 0;
                    scriptBuffer = '';
                    position = 0;
                    _c.label = 1;
                case 1:
                    if (!(position < value.length)) return [3 /*break*/, 12];
                    if (depth === 0) {
                        nextLeftBracket = value.indexOf(exports.TagSymbols.BRACKET_LEFT, position);
                        if (nextLeftBracket === -1) {
                            tag.text += value.slice(position);
                            position = value.length;
                            return [3 /*break*/, 1];
                        }
                        tag.text += value.slice(position, nextLeftBracket);
                        position = nextLeftBracket;
                    }
                    result = value.slice(position, ++position);
                    scriptBuffer += result;
                    _a = result;
                    switch (_a) {
                        case exports.TagSymbols.IGNORE: return [3 /*break*/, 2];
                        case exports.TagSymbols.BRACKET_LEFT: return [3 /*break*/, 3];
                        case exports.TagSymbols.BRACKET_RIGHT: return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 11];
                case 2:
                    {
                        nextValue = value.slice(position, position + 1);
                        if (nextValue === exports.TagSymbols.BRACKET_LEFT) {
                            depth--;
                        }
                        else if (nextValue === exports.TagSymbols.BRACKET_RIGHT) {
                            depth++;
                        }
                    }
                    ;
                    return [3 /*break*/, 11];
                case 3:
                    {
                        // start of the script
                        depth++;
                    }
                    ;
                    return [3 /*break*/, 11];
                case 4:
                    // end of the script
                    depth--;
                    if (!(depth <= 0)) return [3 /*break*/, 10];
                    _b = parseInnerScript(scriptBuffer, shouldTrim), scriptName = _b[0], arg = _b[1];
                    if (!exports.TagFunctionsToString.NOTE.includes(scriptName)) return [3 /*break*/, 5];
                    return [3 /*break*/, 9];
                case 5:
                    if (!exports.TagFunctionsToString.INCLUDE.includes(scriptName)) return [3 /*break*/, 7];
                    return [4 /*yield*/, exports.ScriptTags[TagFunctions.INCLUDE](arg, tag)];
                case 6:
                    wasValid = _c.sent();
                    if (!wasValid) {
                        tag.text += scriptBuffer;
                    }
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, parse(arg)];
                case 8:
                    _c.sent();
                    tag.text += scriptBuffer;
                    _c.label = 9;
                case 9:
                    scriptBuffer = '';
                    _c.label = 10;
                case 10:
                    ;
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 1];
                case 12:
                    tag.text = (tag.text + scriptBuffer);
                    return [2 /*return*/, tag];
            }
        });
    });
}
