import { Search, Heart, Star, User, DollarSign, TrendingUp, PieChart, CreditCard, Building, Wallet, BarChart3, Target, Shield, Zap, Clock, X, Filter } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function SearchCard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchHistory, setSearchHistory] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showFilters, setShowFilters] = useState(false)
    const inputRef = useRef(null)
    const suggestionsRef = useRef(null)
    
    const cards = [
        { id: 1, name: "Finance Pro", icon: <DollarSign className="w-12 h-12 text-green-500 mb-2" />, keywords: ["finance", "money", "dollar", "pro"], category: "finance" },
        { id: 2, name: "Stock Tracker", icon: <TrendingUp className="w-12 h-12 text-blue-500 mb-2" />, keywords: ["stock", "tracker", "trending", "up"], category: "investment" },
        { id: 3, name: "Portfolio", icon: <PieChart className="w-12 h-12 text-purple-500 mb-2" />, keywords: ["portfolio", "chart", "pie", "investment"], category: "investment" },
        { id: 4, name: "Credit Score", icon: <CreditCard className="w-12 h-12 text-yellow-500 mb-2" />, keywords: ["credit", "score", "card", "payment"], category: "credit" },
        { id: 5, name: "Real Estate", icon: <Building className="w-12 h-12 text-orange-500 mb-2" />, keywords: ["real", "estate", "building", "property"], category: "investment" },
        { id: 6, name: "Savings", icon: <Wallet className="w-12 h-12 text-pink-500 mb-2" />, keywords: ["savings", "wallet", "money", "store"], category: "savings" },
        { id: 7, name: "Analytics", icon: <BarChart3 className="w-12 h-12 text-cyan-500 mb-2" />, keywords: ["analytics", "chart", "data", "analysis"], category: "analytics" },
        { id: 8, name: "Goals", icon: <Target className="w-12 h-12 text-red-500 mb-2" />, keywords: ["goals", "target", "aim", "objective"], category: "planning" },
        { id: 9, name: "Security", icon: <Shield className="w-12 h-12 text-indigo-500 mb-2" />, keywords: ["security", "shield", "protect", "safe"], category: "security" },
        { id: 10, name: "Quick Pay", icon: <Zap className="w-12 h-12 text-yellow-600 mb-2" />, keywords: ["quick", "pay", "fast", "zap"], category: "payments" }
    ]

    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: 'finance', name: 'Finance' },
        { id: 'investment', name: 'Investment' },
        { id: 'credit', name: 'Credit' },
        { id: 'savings', name: 'Savings' },
        { id: 'analytics', name: 'Analytics' },
        { id: 'planning', name: 'Planning' },
        { id: 'security', name: 'Security' },
        { id: 'payments', name: 'Payments' }
    ]

    // Fuzzy search algorithm
    const fuzzyMatch = (str, pattern) => {
        const strLower = str.toLowerCase()
        const patternLower = pattern.toLowerCase()
        
        if (patternLower === '') return { score: 0, matched: false }
        
        // Exact match gets highest score
        if (strLower === patternLower) return { score: 100, matched: true }
        
        // Starts with pattern gets high score
        if (strLower.startsWith(patternLower)) return { score: 90, matched: true }
        
        // Contains pattern gets medium score
        if (strLower.includes(patternLower)) return { score: 70, matched: true }
        
        // Fuzzy matching with character sequence
        let patternIdx = 0
        let consecutive = 0
        let maxConsecutive = 0
        
        for (let i = 0; i < strLower.length && patternIdx < patternLower.length; i++) {
            if (strLower[i] === patternLower[patternIdx]) {
                patternIdx++
                consecutive++
                maxConsecutive = Math.max(maxConsecutive, consecutive)
            } else {
                consecutive = 0
            }
        }
        
        if (patternIdx === patternLower.length) {
            // All pattern characters found
            const completeness = (patternIdx / patternLower.length) * 50
            const consecutiveness = (maxConsecutive / patternLower.length) * 30
            return { score: completeness + consecutiveness, matched: true }
        }
        
        return { score: 0, matched: false }
    }

    // Generate search suggestions
    const getSuggestions = () => {
        if (!searchTerm.trim()) return searchHistory.slice(0, 5)
        
        const allKeywords = cards.flatMap(card => card.keywords)
        const uniqueKeywords = [...new Set(allKeywords)]
        
        return uniqueKeywords
            .filter(keyword => 
                fuzzyMatch(keyword, searchTerm).matched
            )
            .map(keyword => ({
                text: keyword,
                type: 'keyword'
            }))
            .slice(0, 5)
    }

    // Add to search history
    const addToHistory = (term) => {
        if (term.trim() && !searchHistory.includes(term.trim())) {
            setSearchHistory(prev => [term.trim(), ...prev.slice(0, 9)]) // Keep last 10 searches
        }
    }

    // Handle search input
    const handleSearchChange = (value) => {
        setSearchTerm(value)
        setShowSuggestions(value.length > 0)
        setSelectedSuggestionIndex(-1)
    }

    // Handle search submission
    const handleSearch = (term = searchTerm) => {
        if (term.trim()) {
            addToHistory(term.trim())
            setSearchTerm(term.trim())
            setShowSuggestions(false)
            setSelectedSuggestionIndex(-1)
        }
    }

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        const suggestions = getSuggestions()
        
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedSuggestionIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                handleSearch(suggestions[selectedSuggestionIndex].text)
            } else {
                handleSearch()
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false)
            setSelectedSuggestionIndex(-1)
            inputRef.current?.blur()
        }
    }

    const getMatchingCards = () => {
        let filteredCards = cards
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filteredCards = cards.filter(card => card.category === selectedCategory)
        }
        
        if (!searchTerm.trim()) return filteredCards
        
        return filteredCards.map(card => {
            let bestMatch = null
            let bestScore = 0
            let totalScore = 0
            
            // Check card name
            const nameMatch = fuzzyMatch(card.name, searchTerm)
            if (nameMatch.matched) {
                bestScore = Math.max(bestScore, nameMatch.score)
                totalScore += nameMatch.score * 2 // Weight name matches higher
            }
            
            // Check keywords
            const keywordMatches = card.keywords.map(keyword => {
                const match = fuzzyMatch(keyword, searchTerm)
                if (match.matched) {
                    bestScore = Math.max(bestScore, match.score)
                    totalScore += match.score
                    if (match.score === bestScore) {
                        bestMatch = keyword
                    }
                }
                return match
            }).filter(match => match.matched)
            
            return {
                ...card,
                matchScore: totalScore,
                bestMatch: bestMatch,
                hasMatch: keywordMatches.length > 0 || nameMatch.matched
            }
        }).sort((a, b) => {
            if (a.hasMatch && !b.hasMatch) return -1
            if (!a.hasMatch && b.hasMatch) return 1
            return b.matchScore - a.matchScore
        })
    }

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const matchingCards = getMatchingCards()
    const topMatch = matchingCards.find(card => card.hasMatch)

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            {/* Search Bar with Suggestions */}
            <div className='relative w-full max-w-2xl'>
                <div className='flex flex-row items-center justify-center gap-3'>
                    <div className='relative flex-1'>
                        <input 
                            ref={inputRef}
                            className='border-2 border-gray-400 bg-slate-100 focus:text-slate-700 focus:outline-slate-400 focus:outline-none rounded-md p-2 w-full text-slate-400' 
                            type="search" 
                            placeholder="Search cards..." 
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        
                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (
                            <div 
                                ref={suggestionsRef}
                                className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto text-slate-500'
                            >
                                {getSuggestions().map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 cursor-pointer flex items-center gap-2 ${
                                            index === selectedSuggestionIndex 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => handleSearch(suggestion.text)}
                                    >
                                        {suggestion.type === 'keyword' ? (
                                            <Search className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-gray-500" />
                                        )}
                                        <span>{suggestion.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        className='bg-gray-700 text-white rounded-md p-2 w-12 flex justify-center items-center hover:bg-slate-600'
                        onClick={() => handleSearch()}
                    >
                        <Search />
                    </button>
                    
                    <button 
                        className='bg-blue-600 text-white rounded-md p-3 w-12 flex justify-center items-center hover:bg-blue-700'
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4" />
                    </button>
                    

                </div>
                
                {/* Search History */}
                {searchHistory.length > 0 && !showSuggestions && (
                    <div className='mt-2 flex flex-wrap gap-2'>
                        <span className='text-sm text-gray-600'>Recent:</span>
                        {searchHistory.slice(0, 5).map((term, index) => (
                            <button
                                key={index}
                                className='text-xs bg-gray-200 text-slate-600 hover:bg-gray-300 px-2 py-1 rounded-full flex items-center gap-1'
                                onClick={() => handleSearch(term)}
                            >
                                <Clock className="w-3 h-3" />
                                {term}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Category Filters */}
            {showFilters && (
                <div className='mt-4 w-full max-w-4xl'>
                    <div className='bg-white border border-gray-300 rounded-lg p-4 shadow-lg'>
                        <h3 className='text-lg font-semibold mb-3 text-gray-800'>Filter by Category</h3>
                        <div className='flex flex-wrap gap-2'>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Cards Grid */}
            <div className='flex flex-row items-center justify-center mt-20 flex-wrap gap-8'>
                {matchingCards.length === 0 ? (
                    <div className='text-center py-12'>
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>No cards found</h3>
                        <p className='text-gray-500 mb-4'>
                            {searchTerm ? `No cards match "${searchTerm}"` : 'No cards available'}
                        </p>
                        {searchTerm && (
                            <button
                                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedCategory('all')
                                }}
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    matchingCards.map((card) => {
                     const isTopMatch = topMatch && card.id === topMatch.id
                     const isMatching = card.hasMatch
                     
                     return (
                         <div 
                             key={card.id}
                             className={`bg-white border-2 rounded-md p-2 w-52 h-52 flex items-center justify-center flex-col cursor-pointer transition-all duration-300 shadow-lg relative ${
                                 isTopMatch 
                                     ? 'border-yellow-400 shadow-yellow-200 shadow-2xl scale-105 bg-gradient-to-br from-yellow-50 to-white' 
                                     : isMatching 
                                         ? 'border-blue-300 shadow-blue-200 shadow-xl scale-102' 
                                         : 'border-gray-200 opacity-50 hover:opacity-70'
                             } hover:shadow-2xl hover:scale-105`}
                         >
                             {/* Matching letter indicator */}
                             {isTopMatch && card.bestMatch && (
                                 <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                                     {card.bestMatch.charAt(0).toUpperCase()}
                                 </div>
                             )}
                             
                             {/* Card content */}
                             <div className={`${isTopMatch ? 'animate-pulse' : ''}`}>
                                 {card.icon}
                             </div>
                             <p className={`font-semibold ${
                                 isTopMatch 
                                     ? 'text-yellow-800' 
                                     : isMatching 
                                         ? 'text-blue-800' 
                                         : 'text-gray-600'
                             }`}>
                                 {card.name}
                             </p>
                         </div>
                     )
                 })
                )}
            </div>
        </div>

    );

}

export default SearchCard;