import './App.css'
import React, { useState, useEffect } from 'react'
import RatingGraph from './graph.js'
import { RatingDisplay } from './rating-display'
import { getRatings, getUserData } from './utils'

const UsersForm = ({ submitAct }) => {
  return (
    <form onSubmit={submitAct} className='form'>
      <div>
        <button
          style={{
            background: 'blue',
            padding: 20,
            border: 0,
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            borderRadius: 5,
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
          }}
          type='submit'
        >
          JU CodeForce Data
        </button>
      </div>
    </form>
  )
}

const App = () => {
  useEffect(() => {
    document.title = 'cf plot'
  }, [])

  const [handles, setHandles] = useState('')
  const [users, setUsers] = useState([])
  const [datasets, setDatasets] = useState([])
  const [progress, setProgress] = useState({
    done: 0,
    total: 0,
  })
  const makeGraph = (event) => {
    event.preventDefault()
    getUserData(handles, setUsers)
    getRatings(handles, setDatasets, setProgress)
  }
  return (
    <div>
      <UsersForm
        handles={handles}
        setHandles={setHandles}
        submitAct={makeGraph}
      />
      <RatingDisplay users={users} />
      <RatingGraph datasets={datasets} progress={progress} />
    </div>
  )
}

export default App
