import React from 'react'
import './App.css'
import { Box } from '@material-ui/core'
import Nav from './ui/components/Nav'
import Home from './ui/screens/Home'

function App() {
  return (
    <Box>
      <Nav />
      <Home />
    </Box>
  )
}

export default App
