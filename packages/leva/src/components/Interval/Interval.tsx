import React, { useRef } from 'react'
import { LevaInputProps } from '../../types/'
import { Interval as IntervalType, InternalInterval, InternalIntervalSettings } from './interval-plugin'
import { Label, Row } from '../UI'
import { Vector } from '../Vector'
import { Range, RangeWrapper, Scrubber, sanitizeStep } from '../Number'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useInputContext } from '../../hooks'
import { styled, useTh } from '../../styles'

type IntervalProps = LevaInputProps<IntervalType, InternalIntervalSettings>

type IntervalSliderProps = {
  value: InternalInterval
  onDrag: (v: InternalInterval) => void
} & InternalIntervalSettings

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridColumnGap: '$colGap',
})

const Indicator = styled('div', {
  position: 'absolute',
  height: '100%',
  backgroundColor: '$accent',
})

function IntervalSlider({ value, bounds: [min, max], onDrag, ...settings }: IntervalSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const minScrubberRef = useRef<HTMLDivElement>(null)
  const maxScrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes', '$scrubberWidth')

  const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo = {} }) => {
    if (first) {
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - parseFloat(scrubberWidth)

      const targetIsScrub = event?.target === minScrubberRef.current || event?.target === maxScrubberRef.current

      memo.pos = invertedRange((x - left) / width, min, max)
      memo.key = Math.abs(memo.pos - value.min) < Math.abs(memo.pos - value.max) ? 'min' : 'max'
      if (targetIsScrub) memo.pos = value[memo.key as keyof InternalInterval]
    }
    const newValue = memo.pos + invertedRange(mx / rangeWidth.current, 0, max - min)

    onDrag({ ...value, [memo.key]: sanitizeStep(newValue, settings[memo.key as 'min' | 'max']) })
    return memo
  })

  const minStyle = `calc(${range(value.min, min, max)} * (100% - ${scrubberWidth}))`
  const maxStyle = `calc(${1 - range(value.max, min, max)} * (100% - ${scrubberWidth}))`

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range>
        <Indicator style={{ left: minStyle, right: maxStyle }} />
      </Range>
      <Scrubber ref={minScrubberRef} style={{ left: minStyle }} />
      <Scrubber ref={maxScrubberRef} style={{ right: maxStyle }} />
    </RangeWrapper>
  )
}

export function Interval() {
  const { label, displayValue, onUpdate, settings } = useInputContext<IntervalProps>()

  const { bounds, ..._settings } = settings

  return (
    <Row input>
      <Label>{label}</Label>
      <Row>
        <Row>
          <IntervalSlider value={displayValue} {...settings} onDrag={onUpdate} />
        </Row>
        <Container>
          <Vector value={displayValue as InternalInterval} settings={_settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </Row>
  )
}
