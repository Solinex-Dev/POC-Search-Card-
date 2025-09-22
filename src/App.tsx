import React from 'react'
import './App.css'
import SearchDashboard from './components/SearchDashboard'
import { Card } from './types'

const App: React.FC = () => {
  const handleCardSelect = (card: Card) => {
    console.log('Card selected:', card)
    // Handle card selection logic here
  }

  const handleFavoritesChange = (favorites: number[]) => {
    console.log('Favorites changed:', favorites)
    // Handle favorites change logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <SearchDashboard 
        onCardSelect={handleCardSelect}
        onFavoritesChange={handleFavoritesChange}
      />
    </div>
  )
}

export default App
