import * as React from 'react'
import styled from 'styled-components'
import cities from '../data/cities.json'

interface Props {
  index: number
}

export class Progress extends React.Component<Props> {
  render() {
    return (
      <Dots>
        {cities.map((_city, i) => (
          <Dot key={i} selected={i === this.props.index} />
        ))}
      </Dots>
    )
  }
}

const Dots = styled.div`
  position: fixed;
  background: hsl(0, 0%, 97%);
  bottom: 0;
  left: 0;
  right: 0;
  height: 5vh;
  z-index: 3;
  display: flex;
  justify-content: center;
`

interface DotProps {
  selected: boolean
}

const Dot = styled.span<DotProps>`
  width: 1vh;
  height: 1vh;
  border-radius: 50%;
  background: ${({ selected }) => (selected ? 'black' : '#ccc')};
  margin: 2vh 2vh;
  transition: background 1s;
`
