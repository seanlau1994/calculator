import React from 'react'
import Display from './components/Display'
import Buttons from './components/Buttons'
import './App.scss'
export default function App() {
  return (
    <div id='calculator'>
        <Display/>
        <Buttons/>
    </div>
  )
}
