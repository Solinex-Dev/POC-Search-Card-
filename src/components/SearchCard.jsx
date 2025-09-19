import { Search, Heart, Star, User, DollarSign, TrendingUp, PieChart, CreditCard, Building, Wallet, BarChart3, Target, Shield, Zap, Clock, X, Filter } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

/**
 * SearchCard Component - Interactive Financial Dashboard Search Interface
 * 
 * Features:
 * - Real-time fuzzy search with intelligent matching
 * - Search history and suggestions
 * - Keyboard navigation support
 * - Category-based filtering
 * - Visual feedback with card highlighting
 */
function SearchCard() {
    // State management for search functionality
    const [searchTerm, setSearchTerm] = useState('')                    // Current search input
    const [searchHistory, setSearchHistory] = useState([])              // Recent search terms (max 10)
    const [showSuggestions, setShowSuggestions] = useState(false)       // Show/hide suggestions dropdown
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1) // Currently selected suggestion
    const [selectedCategory, setSelectedCategory] = useState('all')     // Active category filter
    const [showFilters, setShowFilters] = useState(false)               // Show/hide category filters panel
    
    // Refs for DOM manipulation and event handling
    const inputRef = useRef(null)          // Search input field reference
    const suggestionsRef = useRef(null)    // Suggestions dropdown reference
    
    // Financial service cards data with search keywords and categories
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

    // Available categories for filtering
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

    /**
     * Fuzzy search algorithm for intelligent text matching
     * @param {string} str - The string to search in
     * @param {string} pattern - The search pattern
     * @returns {Object} - { score: number, matched: boolean }
     */
    const fuzzyMatch = (str, pattern) => {
        const strLower = str.toLowerCase()
        const patternLower = pattern.toLowerCase()
        
        // Empty pattern returns no match
        if (patternLower === '') return { score: 0, matched: false }
        
        // Exact match gets highest score (100)
        if (strLower === patternLower) return { score: 100, matched: true }
        
        // Starts with pattern gets high score (90)
        if (strLower.startsWith(patternLower)) return { score: 90, matched: true }
        
        // Contains pattern gets medium score (70)
        if (strLower.includes(patternLower)) return { score: 70, matched: true }
        
        // Advanced fuzzy matching with character sequence analysis
        let patternIdx = 0      // Current position in pattern
        let consecutive = 0     // Current consecutive matches
        let maxConsecutive = 0  // Maximum consecutive matches found
        
        // Iterate through string to find pattern characters in sequence
        for (let i = 0; i < strLower.length && patternIdx < patternLower.length; i++) {
            if (strLower[i] === patternLower[patternIdx]) {
                patternIdx++
                consecutive++
                maxConsecutive = Math.max(maxConsecutive, consecutive)
            } else {
                consecutive = 0  // Reset consecutive counter on mismatch
            }
        }
        
        // If all pattern characters were found, calculate fuzzy score
        if (patternIdx === patternLower.length) {
            const completeness = (patternIdx / patternLower.length) * 50    // 50% weight for completeness
            const consecutiveness = (maxConsecutive / patternLower.length) * 30  // 30% weight for consecutive matches
            return { score: completeness + consecutiveness, matched: true }
        }
        
        return { score: 0, matched: false }
    }

    /**
     * Generate search suggestions based on current input
     * @returns {Array} - Array of suggestion objects
     */
    const getSuggestions = () => {
        // If no search term, return recent search history
        if (!searchTerm.trim()) return searchHistory.slice(0, 5)
        
        // Get all unique keywords from cards
        const allKeywords = cards.flatMap(card => card.keywords)
        const uniqueKeywords = [...new Set(allKeywords)]
        
        // Filter keywords that match current search term using fuzzy matching
        return uniqueKeywords
            .filter(keyword => 
                fuzzyMatch(keyword, searchTerm).matched
            )
            .map(keyword => ({
                text: keyword,
                type: 'keyword'
            }))
            .slice(0, 5)  // Limit to 5 suggestions
    }

    /**
     * Add search term to history (max 10 recent searches)
     * @param {string} term - Search term to add
     */
    const addToHistory = (term) => {
        if (term.trim() && !searchHistory.includes(term.trim())) {
            setSearchHistory(prev => [term.trim(), ...prev.slice(0, 9)]) // Keep last 10 searches
        }
    }

    /**
     * Handle search input changes
     * @param {string} value - New input value
     */
    const handleSearchChange = (value) => {
        setSearchTerm(value)
        setShowSuggestions(value.length > 0)  // Show suggestions only when typing
        setSelectedSuggestionIndex(-1)        // Reset selection
    }

    /**
     * Handle search submission
     * @param {string} term - Search term (defaults to current searchTerm)
     */
    const handleSearch = (term = searchTerm) => {
        if (term.trim()) {
            addToHistory(term.trim())
            setSearchTerm(term.trim())
            setShowSuggestions(false)
            setSelectedSuggestionIndex(-1)
        }
    }

    /**
     * Handle keyboard navigation for suggestions dropdown
     * @param {KeyboardEvent} e - Keyboard event
     */
    const handleKeyDown = (e) => {
        const suggestions = getSuggestions()
        
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            // Move down in suggestions list
            setSelectedSuggestionIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            // Move up in suggestions list
            setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            // Select suggestion or perform search
            if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                handleSearch(suggestions[selectedSuggestionIndex].text)
            } else {
                handleSearch()
            }
        } else if (e.key === 'Escape') {
            // Close suggestions and blur input
            setShowSuggestions(false)
            setSelectedSuggestionIndex(-1)
            inputRef.current?.blur()
        }
    }

    /**
     * Get cards that match current search term and category filter
     * @returns {Array} - Array of cards with match information
     */
    const getMatchingCards = () => {
        let filteredCards = cards
        
        // Apply category filter first
        if (selectedCategory !== 'all') {
            filteredCards = cards.filter(card => card.category === selectedCategory)
        }
        
        // If no search term, return all filtered cards
        if (!searchTerm.trim()) return filteredCards
        
        // Apply fuzzy search to filtered cards
        return filteredCards.map(card => {
            let bestMatch = null    // Best matching keyword
            let bestScore = 0      // Highest individual match score
            let totalScore = 0     // Combined score for ranking
            
            // Check card name match (weighted 2x higher than keywords)
            const nameMatch = fuzzyMatch(card.name, searchTerm)
            if (nameMatch.matched) {
                bestScore = Math.max(bestScore, nameMatch.score)
                totalScore += nameMatch.score * 2 // Name matches are more important
            }
            
            // Check all keywords for matches
            const keywordMatches = card.keywords.map(keyword => {
                const match = fuzzyMatch(keyword, searchTerm)
                if (match.matched) {
                    bestScore = Math.max(bestScore, match.score)
                    totalScore += match.score
                    // Track the best matching keyword
                    if (match.score === bestScore) {
                        bestMatch = keyword
                    }
                }
                return match
            }).filter(match => match.matched)
            
            return {
                ...card,
                matchScore: totalScore,     // Total score for sorting
                bestMatch: bestMatch,       // Best matching keyword for display
                hasMatch: keywordMatches.length > 0 || nameMatch.matched
            }
        }).sort((a, b) => {
            // Sort: matching cards first, then by score
            if (a.hasMatch && !b.hasMatch) return -1
            if (!a.hasMatch && b.hasMatch) return 1
            return b.matchScore - a.matchScore
        })
    }

    /**
     * Close suggestions dropdown when clicking outside
     * Uses useEffect to add/remove event listener
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close suggestions if click is outside both input and suggestions
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

    // Get filtered and matched cards
    const matchingCards = getMatchingCards()
    const topMatch = matchingCards.find(card => card.hasMatch)  // Best matching card for special highlighting

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
                        
                        {/* Search Suggestions Dropdown - Shows matching keywords and recent searches */}
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
                                        {/* Icon: Search for keywords, Clock for recent searches */}
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
                    
                    {/* Search Button - Triggers search action */}
                    <button 
                        className='bg-gray-700 text-white rounded-md p-2 w-12 flex justify-center items-center hover:bg-slate-600'
                        onClick={() => handleSearch()}
                    >
                        <Search />
                    </button>
                    
                    {/* Filter Toggle Button - Shows/hides category filters */}
                    <button 
                        className='bg-blue-600 text-white rounded-md p-3 w-12 flex justify-center items-center hover:bg-blue-700'
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4" />
                    </button>
                    

                </div>
                
                {/* Search History - Shows recent searches when not showing suggestions */}
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
            
            {/* Category Filters Panel - Expandable filter options */}
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
            {/* Cards Grid - Main content area with search results */}
            <div className='flex flex-row items-center justify-center mt-20 flex-wrap gap-8'>
                {matchingCards.length === 0 ? (
                    /* Empty State - When no cards match search/filter criteria */
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
                    /* Card Results - Render matching cards with visual feedback */
                    matchingCards.map((card) => {
                     const isTopMatch = topMatch && card.id === topMatch.id  // Best matching card
                     const isMatching = card.hasMatch                        // Any match found
                     
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
                             {/* Matching Letter Indicator - Shows first letter of best match */}
                             {isTopMatch && card.bestMatch && (
                                 <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                                     {card.bestMatch.charAt(0).toUpperCase()}
                                 </div>
                             )}
                             
                             {/* Card Icon with Animation */}
                             <div className={`${isTopMatch ? 'animate-pulse' : ''}`}>
                                 {card.icon}
                             </div>
                             
                             {/* Card Name with Color-coded Text */}
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