import type { LevaInputProps } from 'leva/plugin'
import type { ImportObject } from 'mathjs'

export type Plot = { expression: string; imported?: ImportObject }
export type PlotSettings = { boundsX?: [number, number]; boundsY?: [number, number]; graph?: boolean }
export type PlotInput = Plot & PlotSettings

export type InternalPlot = {
  (v: number): any
  __parsedScoped: math.MathNode
  __parsed: math.MathNode
  __symbols: string[]
}

export type InternalPlotSettings = Required<PlotSettings>

export type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings, string>
