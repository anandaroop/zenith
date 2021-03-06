import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import cities from '../data/cities.json'
import { fullScreen } from '../theme'

interface Props {
  /** index of a city in the cities array */
  index: number

  /** duration of animation, in milliseconds */
  duration: number
}

interface State {}

export class CityTitle extends React.Component<Props, State> {
  private titleDiv: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    this.titleDiv = React.createRef()
  }

  componentDidMount() {
    this.animateFades()
  }

  componentDidUpdate(prevProps: Props) {
    const { index } = this.props
    const { index: prevIndex } = prevProps
    if (index !== prevIndex) {
      this.animateFades()
    }
  }

  animateFades = () => {
    this.titleDiv.current!.classList.add('animating')
    setTimeout(() => {
      this.titleDiv.current!.classList.remove('animating')
    }, this.props.duration * 0.9)
  }

  render() {
    const { index, duration } = this.props
    const { name } = cities[index]
    return (
      <Title ref={this.titleDiv} duration={duration}>
        {name}
      </Title>
    )
  }
}

const fades = keyframes`
  0% { opacity: 0; }
  5% { opacity: 1; }
 10% { opacity: 1; }
 15% { opacity: 1; }
 20% { opacity: 0; }
 25% { opacity: 0; }
 30% { opacity: 0; }
 35% { opacity: 0; }
 40% { opacity: 0; }
 45% { opacity: 0; }
 50% { opacity: 0; }
 55% { opacity: 0; }
 60% { opacity: 0; }
 65% { opacity: 0; }
 70% { opacity: 0; }
 75% { opacity: 0; }
 80% { opacity: 0; }
 85% { opacity: 0; }
 90% { opacity: 0; }
 95% { opacity: 0; }
100% { opacity: 0; }
`

interface TitleDivProps {
  readonly duration: number
}

const Title = styled.div<TitleDivProps>`
  ${fullScreen}
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 4em;

  background: hsla(0, 0%, 95%, 1);
  opacity: 0;

  &.animating {
    opacity: 1;
    animation-name: ${fades};
    animation-duration: ${({ duration }: any) => duration / 1000}s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }
`
