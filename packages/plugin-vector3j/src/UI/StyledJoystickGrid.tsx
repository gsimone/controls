import { styled } from 'leva/plugin'

// NOTE: This was extracted from Vector2d/StyledJoystick
export const StyledJoystickGrid = styled('div', {
  position: 'absolute',
  $flexCenter: '',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '$highlight1',
  backgroundColor: '$elevation3',
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
