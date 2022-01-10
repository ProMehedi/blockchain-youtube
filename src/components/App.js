import React from 'react'
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
}) // leaving out the arguments will default to these values

const App = () => {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    //Load accounts
    //Add first account the the state

    //Get network ID
    //Get network data
    //Check if net data exists, then
    //Assign dvideo contract to a variable
    //Add dvideo to the state

    //Check videoAmounts
    //Add videAmounts to the state

    //Iterate throught videos and add them to the state (by newest)

    //Set latest video and it's title to view as default
    //Set loading state to false

    //If network data doesn't exisits, log error
  }

  //Get video
  const captureFile = (event) => {}

  //Upload video
  const uploadVideo = (title) => {}

  //Change Video
  const changeVideo = (hash, title) => {}

  return (
    <div>
      <Navbar
      //Account
      />
      {loading ? (
        <div id='loader' className='text-center mt-5'>
          <p>Loading...</p>
        </div>
      ) : (
        <Main
        //states&functions
        />
      )}
    </div>
  )
}

export default App
