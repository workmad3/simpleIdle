import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { click } from '../../reducers/game'

const Clicker = () => {
    const dispatch = useDispatch()

    return (
        <Button onClick={() => dispatch(click())}>Click here</Button>
    )
}

export default Clicker
