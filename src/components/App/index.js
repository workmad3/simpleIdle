import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Header } from 'semantic-ui-react'
import { startTicks, stopTicks } from '../../reducers/game'
import Clicker from '../Clicker'

const App = () => {
  const ticks = useSelector((state) => state.game.ticks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startTicks(5))
  }, [])

  return (
    <Container>
      <Header>Simple Idle</Header>
      <Button onClick={() => dispatch(stopTicks()) }>
        Stop
      </Button>
      <Button onClick={() => dispatch(startTicks(5)) }>
        Start
      </Button>
      <div>Tick count: {ticks.toStringWithDecimalPlaces(2)}</div>
      <Clicker target='clicks' />
      <Clicker target='autoClickerOne' />
      <Clicker target='autoClickerTwo' />
      <Clicker target='autoClickerThree' />
      <Clicker target='autoClickerFour' />
      <Clicker target='autoClickerFive' />
    </Container>
  )
}
  

export default App
