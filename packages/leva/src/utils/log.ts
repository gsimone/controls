export enum LevaErrors {
  UNSUPPORTED_INPUT,
  NO_COMPONENT_FOR_TYPE,
  UNKNOWN_INPUT,
  DUPLICATE_KEYS,
  ALREADY_REGISTERED_TYPE,
  CLIPBOARD_ERROR,
  THEME_ERROR,
  PATH_DOESNT_EXIST,
}

const ErrorList = {
  [LevaErrors.UNSUPPORTED_INPUT]: (type: string, path: string) => [
    `An input with type \`${type}\` input was found at path \`${path}\` but it's not supported yet.`,
  ],
  [LevaErrors.NO_COMPONENT_FOR_TYPE]: (type: string, path: string) => [
    `Type \`${type}\` found at path \`${path}\` can't be displayed in panel because no component supports it yet.`,
  ],
  [LevaErrors.UNKNOWN_INPUT]: (path: string, value: unknown) => [`input at path \`${path}\` is not recognized.`, value],
  [LevaErrors.DUPLICATE_KEYS]: (key: string, path: string, prevPath: string) => [
    `Key \`${key}\` already exists at path \`${path}\` in your hook. It's already used by path \`${prevPath}\`. Even nested keys need to be unique.`,
  ],
  [LevaErrors.ALREADY_REGISTERED_TYPE]: (type: string) => [
    `Type ${type} has already been registered. You can't register a component with the same type.`,
  ],
  [LevaErrors.CLIPBOARD_ERROR]: (value: unknown) => [`Error copying the value`, value],
  [LevaErrors.THEME_ERROR]: (category: string, key: string) => [
    `Error accessing the theme \`${category}.${key}\` value`,
  ],
  [LevaErrors.PATH_DOESNT_EXIST]: (path: string) => [`Error accessing the value at path \`${path}\``],
}

function _log<T extends LevaErrors>(fn: 'log' | 'warn', errorType: T, ...args: Parameters<typeof ErrorList[T]>) {
  //@ts-expect-error
  const [message, ...rest] = ErrorList[errorType](...args)
  // eslint-disable-next-line no-console
  console[fn]('LEVA: ' + message, ...rest)
}

// @ts-expect-error
export const warn = _log.bind(null, 'warn')
// @ts-expect-error
export const log = _log.bind(null, 'log')
