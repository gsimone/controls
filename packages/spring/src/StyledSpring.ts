import { styled } from '@leva/leva/plugins'

export const Canvas = styled('canvas', {
  height: '80px',
  width: '100%',
  cursor: 'crosshair',
  display: 'block',
  touchAction: 'none',
})

export const SpringPreview = styled('div', {
  position: 'relative',
  top: '-2px',
  backgroundColor: '$folderBorder',
  width: '100%',
  height: '2px',
  opacity: '0.2',
  borderRadius: '1px',
  transition: 'opacity 350ms ease',
  transformOrigin: 'left',
})
