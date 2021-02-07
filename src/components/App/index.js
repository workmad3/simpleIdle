import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import { startTicks } from '../../reducers/game'
import Clicker from '../Clicker'

const App = () => {
  const [ticks, clicks] = useSelector((state) => [state.game.ticks, state.game.clicks])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startTicks(5))
  }, [])

  return (
    <Container>
      <Header>Simple Idle</Header>
      <div>Click count: {clicks}</div>
      <div>Tick count: {ticks}</div>
      <Clicker />
    </Container>
  )
}
  

export default App
