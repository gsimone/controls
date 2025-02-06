import { styled } from '../../styles'
import { JoystickGrid } from './StyledJoystick'

export const JoystickButtons = styled('div', {
  $reset: '',
  display: 'grid',
  columnGap: 'var(--leva-space-colGap)',
  gridAutoFlow: 'column dense',
  alignItems: 'center',
  padding: '0 var(--leva-space-colGap)',
  // FIXME: StyledInput.ts and others show a fontSize of 0.8em, but setting that here doesn't work. Seem to be missing style context.
  // Maybe App.jsx fontSizes should have a fontSize for controls: '9px' and not use 0.8em
  // Maybe it's the reset above?
  fontSize: 'calc(0.8 * var(--leva-fontSizes-root))',
  position: 'absolute',
  bottom: 'calc(-1 * var(--leva-sizes-rowHeight) - 2 * var(--leva-space-rowGap) + var(--leva-radii-sm))',
  backgroundColor: 'var(--leva-colors-elevation2)',
  borderRadius: 'var(--leva-radii-sm)',
  width: 'var(--leva-sizes-joystickWidth)',
  height: 'calc(2 * var(--leva-space-rowGap) + var(--leva-sizes-rowHeight))',
})

export const KeyLabel = styled('span', {
  position: 'absolute',
  top: '0',
  right: '2px',
  fontSize: '0.8em',
  fontStyle: 'italic',
})

export const StyledJoyCubeFace = styled(JoystickGrid, {
  // width: '$joystickWidth',
  // height: '$joystickHeight'
  width: '80px',
  height: '80px',
  backfaceVisibility: 'hidden',
})

export const StyledJoyCube = styled('div', {
  '--joycube-size': '80px',
  '--joycube-half-size': 'calc(var(--joycube-size) / 2)',
  '--joycube-half-size-negative': 'calc(var(--joycube-size) / -2)',
  '--joycube-opacity-mid': '0.5',
  '--joycube-opacity-rear': '0.3',
  position: 'absolute',
  width: 'var(--joycube-size)',
  height: 'var(--joycube-size)',
  transformOrigin: 'var(--joycube-half-size) var(--joycube-half-size) var(--joycube-half-size-negative)',
  transformStyle: 'preserve-3d',
  transform: 'rotateY( 0deg) translateZ(var(--joycube-half-size-negative))',
  variants: {
    top: {
      true: { transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size-negative))' },
    },
    right: {
      true: { transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size-negative))' },
    },
  },
  transition: 'transform 0.5s',

  '> .joycube-face--front': {
    transform: 'rotateY(  0deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--front-mid': {
    transform: 'rotateY(  0deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--front-rear': {
    transform: 'rotateY(  0deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--right': {
    transform: 'rotateY( 90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--right-mid': {
    transform: 'rotateY( 90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--right-rear': {
    transform: 'rotateY( 90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--back': {
    transform: 'rotateY(180deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--back-mid': {
    transform: 'rotateY(180deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--back-rear': {
    transform: 'rotateY(180deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--left': {
    transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--left-mid': {
    transform: 'rotateY(-90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--left-rear': {
    transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--top': {
    transform: 'rotateX( 90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--top-mid': {
    transform: 'rotateX( 90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--top-rear': {
    transform: 'rotateX( 90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--bottom': {
    transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--bottom-mid': {
    transform: 'rotateX(-90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--bottom-rear': {
    transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },
})
