import './App.css'
import SearchCard from './components/SearchCard'
import Navbar from './components/Navbar'
import { LanguageProvider } from './contexts/LanguageContext'


function App() {

  return (
    <LanguageProvider>
      <Navbar />
      <SearchCard />
    </LanguageProvider>
  )
}

export default App
