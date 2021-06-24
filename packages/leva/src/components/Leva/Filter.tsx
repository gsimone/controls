import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { debounce, LevaErrors, warn } from '../../utils'
import { FolderTitleProps } from '../Folder'
import { Chevron } from '../UI'
import { FilterWrapper, Icon, StyledFilterInput, StyledTitleWithFilter, TitleContainer } from './StyledFilter'
import { useStoreContext } from '../../context'
import { DataInput } from '../../types'

type FilterProps = { setFilter: (value: string) => void; toggle: (flag?: boolean) => void }

const FilterInput = React.forwardRef<HTMLInputElement, FilterProps>(({ setFilter, toggle }, ref) => {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['setFilter']>(() => debounce(setFilter, 250), [setFilter])
  const clear = () => {
    setFilter('')
    set('')
  }

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    toggle(true)
    set(v)
  }

  useEffect(() => {
    debouncedOnChange(value)
  }, [value, debouncedOnChange])

  return (
    <>
      <StyledFilterInput
        ref={ref}
        value={value}
        placeholder="[Open filter with CMD+SHIFT+L]"
        onPointerDown={(e) => e.stopPropagation()}
        onChange={_onChange}
      />
      <Icon onClick={() => clear()} style={{ visibility: value ? 'visible' : 'hidden' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </Icon>
    </>
  )
})

export type TitleWithFilterProps = FilterProps &
  FolderTitleProps & {
    onDrag: (point: { x?: number | undefined; y?: number | undefined }) => void
    title: React.ReactNode
    drag: boolean
    filterEnabled: boolean
    hideCopyButton: boolean
    copy?: (values: unknown) => string
  }

export function TitleWithFilter({
  setFilter,
  onDrag,
  toggle,
  toggled,
  title,
  drag,
  filterEnabled,
  hideCopyButton,
  copy,
}: TitleWithFilterProps) {
  const [filterShown, setShowFilter] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const store = useStoreContext()

  useEffect(() => {
    if (filterShown) inputRef.current?.focus()
    else inputRef.current?.blur()
  }, [filterShown])

  const bind = useDrag(({ offset: [x, y] }) => onDrag({ x, y }), { filterTaps: true })

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'L' && event.shiftKey && event.metaKey) {
        setShowFilter((f) => !f)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const [copied, setCopied] = useState(false)
  const handleCopyClick = async () => {
    const data = { ...store.getData() } as any
    try {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const keyData = data[key] as DataInput
          if (!keyData.disabled) {
            data[key] = keyData.value
          } else {
            delete data[key]
          }
        }
      }
      await navigator.clipboard.writeText(copy ? copy(data) : JSON.stringify(data))
      setCopied(true)
    } catch {
      warn(LevaErrors.CLIPBOARD_ERROR, data)
    }
  }

  return (
    <>
      <StyledTitleWithFilter mode={drag ? 'drag' : undefined} onPointerLeave={() => setCopied(false)}>
        <Icon active={!toggled} onClick={() => toggle()}>
          <Chevron toggled={toggled} width={12} height={8} />
        </Icon>
        <TitleContainer {...(drag ? bind() : {})} drag={drag} filterEnabled={filterEnabled}>
          {!hideCopyButton && <div style={{ width: 40 }} />}
          {title === undefined && drag ? (
            <svg width="20" height="10" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" />
              <circle cx="14" cy="2" r="2" />
              <circle cx="26" cy="2" r="2" />
              <circle cx="2" cy="12" r="2" />
              <circle cx="14" cy="12" r="2" />
              <circle cx="26" cy="12" r="2" />
            </svg>
          ) : (
            title
          )}
        </TitleContainer>
        {!hideCopyButton && (
          <Icon onClick={!copied ? handleCopyClick : undefined} title={`Click to copy all values`}>
            {!copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Icon>
        )}
        {filterEnabled && (
          <Icon active={filterShown} onClick={() => setShowFilter((f) => !f)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20">
              <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                clipRule="evenodd"
              />
            </svg>
          </Icon>
        )}
      </StyledTitleWithFilter>
      <FilterWrapper toggled={filterShown}>
        <FilterInput ref={inputRef} setFilter={setFilter} toggle={toggle} />
      </FilterWrapper>
    </>
  )
}
