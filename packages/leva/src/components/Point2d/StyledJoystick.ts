import { styled } from '../../styles'

export const JoystickTrigger = styled('div', {
  $flexCenter: '',
  position: 'relative',
  backgroundColor: '$elevation3',
  borderRadius: '$sm',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  touchAction: 'none',
  $hover: '',

  ':active': { cursor: 'none' },

  '::after': {
    content: '""',
    backgroundColor: '$accent2',
    height: '4px',
    width: '4px',
    borderRadius: '2px',
  },
})

export const JoystickPlayground = styled('div', {
  $flexCenter: '',
  width: '$joystickWidth',
  height: '$joystickHeight',
  borderRadius: '$sm',
  boxShadow: '$elevation2',
  position: 'absolute',
  zIndex: 100,
  overflow: 'hidden',

  variants: {
    isOutOfBounds: {
      true: { backgroundColor: '$elevation1' },
      false: { backgroundColor: '$elevation3' },
    },
  },
  '> div': {
    position: 'absolute',
    $flexCenter: '',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '$highlight1',
    backgroundColor: '$elevation3',
    width: '80%',
    height: '80%',

    '::after,::before': {
      content: '""',
      position: 'absolute',
      zindex: 10,
      backgroundColor: '$highlight1',
    },

    '::before': {
      width: '100%',
      height: '1px',
    },

    '::after': {
      height: '100%',
      width: '1px',
    },
  },

  '> span': {
    position: 'relative',
    zindex: 100,
    width: '10px',
    height: '10px',
    backgroundColor: '$accent2',
    borderRadius: '50%',
  },
})
