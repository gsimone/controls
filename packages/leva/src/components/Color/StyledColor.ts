import { styled } from '../../styles'
import 'react-colorful/dist/index.css'

export const ColorPreview = styled('div', {
  borderRadius: '$input',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '$inputBorder',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  '&:hover': {
    borderColor: '$inputHoverBorder',
  },
  '&:active': {
    borderColor: '$inputFocusBorder',
  },
})

export const PickerContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  // Stitches creates human readable css vars 🤟
  gridTemplateColumns: 'var(--sizes-rowHeight) auto',
  gridColumnGap: '$colGap',
  alignItems: 'center',
  '& > span': {
    fontSize: '0.95em',
    opacity: '0.8',
    padding: '0 $rowH',
  },
})

export const PickerWrapper = styled('div', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 100,

  '.react-colorful': {
    width: '100px',
    height: '100px',
    transform: 'translateY(100%)',
    boxShadow: '$overlay',
    cursor: 'crosshair',
  },

  '.react-colorful__saturation': {
    borderRadius: '$input $input 0 0',
  },

  '.react-colorful__alpha, .react-colorful__hue': {
    height: '10px',
  },

  '.react-colorful__last-control': {
    borderRadius: '0 0 $input $input',
  },

  '.react-colorful__pointer': {
    height: '12px',
    width: '12px',
  },
})
