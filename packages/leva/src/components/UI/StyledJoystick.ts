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
  $draggable: '',
  $hover: '',

  '&:active': { cursor: 'none' },

  '&::after': {
    content: '""',
    backgroundColor: '$accent2',
    height: 4,
    width: 4,
    borderRadius: 2,
  },
})

export const JoystickPlayground = styled('div', {
  $flexCenter: '',
  width: '$joystickWidth',
  height: '$joystickHeight',
  borderRadius: '$sm',
  boxShadow: '$level2',
  position: 'fixed',
  zIndex: 10000,
  $draggable: '',
  transform: 'translate(-50%, -50%)',

  perspective: '100px',

  variants: {
    isOutOfBounds: {
      true: { backgroundColor: '$elevation1' },
      false: { backgroundColor: '$elevation3' },
    },
  },

  '> span': {
    position: 'relative',
    zindex: 100,
    width: 10,
    height: 10,
    backgroundColor: '$accent2',
    borderRadius: '50%',
  },
})

export const JoystickGrid = styled('div', {
  position: 'absolute',
  $flexCenter: '',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '$highlight1',
  width: '80%',
  height: '80%',

  '&::after,&::before': {
    content: '""',
    position: 'absolute',
    zindex: 10,
    backgroundColor: '$highlight1',
  },

  '&::before': {
    width: '100%',
    height: 1,
  },

  '&::after': {
    height: '100%',
    width: 1,
  },
})
