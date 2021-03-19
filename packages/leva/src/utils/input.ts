import { dequal } from 'dequal/lite'
import { getValueType, normalize, sanitize } from '../plugin'
import { Data, DataInput, SpecialInputs, StoreType } from '../types'
import { warn, LevaErrors } from './log'

/**
 * This function is used to normalize the way an input is stored in the store.
 * Returns a value in the form of { type, value, settings} by doing different
 * checks depending on the input structure.
 *
 * @param input
 * @param path
 */
export function normalizeInput(input: any, path: string, data: Data) {
  if (typeof input === 'object') {
    if ('type' in input) {
      // If the input is a special input then we return it as it is.
      if (input.type in SpecialInputs) return input

      // If the type key exists at this point, it must be a custom plugin
      // defined by the user.
      const { type, ...rest } = input
      const _input = 'value' in rest ? rest.value : rest
      return { type, ...normalize(type, _input, path, data) }
    }
    const type = getValueType(input)
    if (type) return { type, ...normalize(type, input, path, data) }
  }

  const type = getValueType({ value: input })

  // At this point, if type is null we'll have to warn the user that its input
  // is not recognized.
  if (!type) return warn(LevaErrors.UNKNOWN_INPUT, path, input)

  return { type, ...normalize(type, { value: input }, path, data) }
}

export function updateInput(input: DataInput, newValue: any, path: string, store: StoreType) {
  const { value, type, settings } = input
  input.value = sanitizeValue({ type, value, settings }, newValue, path, store)
}

type SanitizeProps = {
  type: string
  value: any
  settings: object | undefined
}

type ValueErrorType = { type: string; message: string; previousValue: any; error?: Error }

const ValueError = (function (this: ValueErrorType, message: string, value: any, error?: Error) {
  this.type = 'LEVA_ERROR'
  this.message = 'LEVA: ' + message
  this.previousValue = value
  this.error = error
} as unknown) as { new (message: string, value: any, error?: Error): ValueErrorType }

export function sanitizeValue({ type, value, settings }: SanitizeProps, newValue: any, path: string, store: StoreType) {
  // sanitizeValue can accept a new value in the form of fn(oldValue). This
  // allows inputs to run onUpdate(oldValue => oldValue + 1). However, this
  // issue makes the case of a SELECT input with functions as options:
  // https://github.com/pmndrs/leva/issues/165
  // In that situation, functions passed as options would be ran and we don't
  // want that. So in case of the SELECT input, we never compute the functions.
  const _newValue = type !== 'SELECT' && typeof newValue === 'function' ? newValue(value) : newValue
  let sanitizedNewValue
  try {
    sanitizedNewValue = sanitize(type, _newValue, settings, value, path, store)
  } catch (e) {
    throw new ValueError(`The value \`${newValue}\` did not result in a correct value.`, value, e)
  }
  if (dequal(sanitizedNewValue, value)) {
    /**
     * @note This makes the update function throw when the new value is the same
     * as the previous one. This can happen for example, if the minimum value of
     * a number is 30, and the user inputs 15. Then the newValue will be sanitized
     * to 30 and subsequent calls like 14, 0, etc. won't result in the component displaying
     * the value to be notified (ie there wouldn't be a new render)
     */

    throw new ValueError(
      `The value \`${newValue}\` did not result in a value update, which remained the same: \`${value}\`.
        You can ignore this warning if this is the intended behavior.`,
      value
    )
  }
  return sanitizedNewValue
}
