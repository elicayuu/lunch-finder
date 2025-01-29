import { OpenStreetMap } from './components/OpenStreetMap'

function App() {
  return (
    <>
      <div>
        🍙Lunch

        <OpenStreetMap
          width="600px"
          height="600px"
          defaultLocation={[35.6646782,139.7378198]}
          marker={[35.6646782,139.7378198]}
        />
      </div>
    </>
  )
}

export default App
