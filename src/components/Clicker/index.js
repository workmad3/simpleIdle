import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Header } from 'semantic-ui-react'
import { click } from '../../reducers/game'

const Clicker = ({target}) => {
  const clicker = useSelector((state) => state.game[target])
  const clicks = useSelector((state) => state.game.clicks.count)
  const dispatch = useDispatch()
  const canAfford = clicks.gte(clicker.cost)

  return (
    <div>
      <Header>{clicker.name}</Header>
      <p>Clicked: {clicker.count.toStringWithDecimalPlaces(1)}</p>
      <p>Cost: {clicker.cost.toStringWithDecimalPlaces(1)}</p>
      { canAfford ?
        <Button onClick={() => dispatch(click(target))}>Click here</Button> :
        <Button disabled>Cannot afford</Button>
      }
    </div>
  )
}

export default Clicker
