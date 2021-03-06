import React from 'react'
import DVideo from '../abis/DVideo.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css'
import { ScaleLoader } from 'react-spinners'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
}) // leaving out the arguments will default to these values

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [account, setAccount] = React.useState(
    '0x0000000000000000000000000000000000000000'
  )
  const [contract, setContract] = React.useState(null)
  const [videoCount, setVideoCount] = React.useState(1)
  const [videoList, setVideoList] = React.useState([])
  const [currentTitle, setCurrentTitle] = React.useState(0)
  const [currentHash, setCurrentHash] = React.useState('')

  React.useEffect(() => {
    loadWeb3()
  }, [])

  React.useEffect(() => {
    loadBlockchainData()
    // eslint-disable-next-line
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
    setLoading(true)

    const web3 = window.web3
    //Load accounts
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    //Get network ID
    const networkId = await web3.eth.net.getId()
    //Get network data
    const networkData = DVideo.networks[networkId]
    //Check if net data exists, then
    if (networkData) {
      // Contract
      const _contract = new web3.eth.Contract(DVideo.abi, networkData.address)
      setContract(_contract)
      if (_contract) {
        //videoCount
        const _videoCount = await _contract.methods.videoCount().call()
        setVideoCount(_videoCount)

        //videoList
        setVideoList([])
        for (let i = _videoCount; i >= 1; i--) {
          const _video = await _contract.methods.videos(i).call()
          setVideoList((videoList) => [...videoList, _video])
        }

        // Set Latest video with title
        const _latest = await _contract.methods.videos(videoCount).call()
        setCurrentTitle(_latest.title)
        setCurrentHash(_latest.hash)
        setLoading(false)
      }
    } else {
      setLoading(false)
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  //Upload video
  const uploadVideo = (title, buffer) => {
    setUploading(true)
    try {
      ipfs.add(buffer, (err, ipfsHash) => {
        console.log(ipfsHash)
        if (err) {
          setUploading(false)
          console.error(err)
          return
        }
        contract.methods
          .uploadVideo(ipfsHash[0].hash, title)
          .send({ from: account })
          .on('receipt', (receipt) => {
            console.log(receipt)
            loadBlockchainData()
            setUploading(false)
          })
      })
    } catch (err) {
      setUploading(false)
      console.error(err)
    }
  }

  //Change Video
  const changeVideo = (title, hash) => {
    setCurrentTitle(title)
    setCurrentHash(hash)
  }

  console.log(videoList)

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ minHeight: '100vh' }}
        >
          <ScaleLoader color='#ce053d' height={40} />
        </div>
      ) : (
        <Main
          uploadVideo={uploadVideo}
          currentTitle={currentTitle}
          hash={currentHash}
          videos={videoList}
          loading={uploading}
          changeVideo={changeVideo}
        />
      )}
    </div>
  )
}

export default App
