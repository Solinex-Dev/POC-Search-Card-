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
    const [previousOrder, setPreviousOrder] = useState([])              // Previous card order for animation
    
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

    // Track card order changes for animation
    useEffect(() => {
        const currentOrder = matchingCards.map(card => card.id)
        const hasOrderChanged = JSON.stringify(currentOrder) !== JSON.stringify(previousOrder)
        
        if (hasOrderChanged && previousOrder.length > 0) {
            // Cards have been reordered, trigger animation
            setPreviousOrder(currentOrder)
        } else if (previousOrder.length === 0) {
            // Initial load, set current order
            setPreviousOrder(currentOrder)
        }
    }, [matchingCards, previousOrder])

    /**
     * Determine animation type based on card position change
     * @param {number} cardId - Card ID
     * @param {number} currentIndex - Current position
     * @returns {string} - Animation class name
     */
    const getCardAnimation = (cardId, currentIndex) => {
        const previousIndex = previousOrder.indexOf(cardId)
        
        if (previousIndex === -1) {
            // New card appearing
            return 'card-enter'
        } else if (previousIndex !== currentIndex) {
            // Card moved position
            return previousIndex < currentIndex ? 'card-move-down' : 'card-move-up'
        }
        
        return '' // No animation needed
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
            {/* Header Section - Goal-oriented messaging like TurboTax */}
            <div className='text-center mb-8'>
                <h1 className='text-4xl font-bold text-gray-800 mb-2'>
                    Find Your Perfect Financial Tool
                </h1>
                <p className='text-lg text-gray-600 mb-4'>
                    Discover the right financial services to maximize your money management
                </p>
                
                {/* Personality touch - Like TurboTax's "How are you feeling?" */}
                <div className='bg-blue-50 rounded-xl p-4 max-w-md mx-auto'>
                    <p className='text-sm text-blue-800 font-medium'>
                        💡 <strong>Quick tip:</strong> The more specific you are, the better we can help you find exactly what you need!
                    </p>
                </div>
                
                {/* Progress Indicator - Like TurboTax's step tracking */}
                <div className='flex justify-center items-center space-x-2 mb-8'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                        <span className='text-sm text-gray-600'>Search</span>
                    </div>
                    <div className='w-8 h-0.5 bg-gray-300'></div>
                    <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                        <span className='text-sm text-gray-400'>Select</span>
                    </div>
                    <div className='w-8 h-0.5 bg-gray-300'></div>
                    <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                        <span className='text-sm text-gray-400'>Get Started</span>
                    </div>
                </div>
            </div>

            {/* Search Section - Clean, focused design */}
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white rounded-2xl shadow-xl p-8 mb-8'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
                        What financial service are you looking for?
                    </h2>
                    
                    <div className='relative'>
                        <input 
                            ref={inputRef}
                            className='w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50 focus:bg-white' 
                            type="search" 
                            placeholder="Type what you need help with..." 
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                            <Search className='w-6 h-6 text-gray-400' />
                        </div>
                        
                        {/* Search Suggestions Dropdown - TurboTax style */}
                        {showSuggestions && (
                            <div 
                                ref={suggestionsRef}
                                className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 mt-2 max-h-60 overflow-y-auto'
                            >
                                {getSuggestions().length > 0 ? (
                                    getSuggestions().map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
                                                index === selectedSuggestionIndex 
                                                    ? 'bg-blue-50 text-blue-800' 
                                                    : 'hover:bg-gray-50'
                                            }`}
                                            onClick={() => handleSearch(suggestion.text)}
                                        >
                                            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                                {suggestion.type === 'keyword' ? (
                                                    <Search className="w-4 h-4 text-blue-600" />
                                                ) : (
                                                    <Clock className="w-4 h-4 text-blue-600" />
                                                )}
                                            </div>
                                            <div>
                                                <div className='font-medium text-gray-800'>{suggestion.text}</div>
                                                <div className='text-sm text-gray-500'>
                                                    {suggestion.type === 'keyword' ? 'Popular search' : 'Recent search'}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='p-6 text-center text-gray-500'>
                                        <Search className='w-8 h-8 mx-auto mb-2 text-gray-300' />
                                        <p>Start typing to see suggestions...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className='flex justify-center gap-4 mt-6'>
                        <button 
                            className='bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2'
                            onClick={() => handleSearch()}
                        >
                            <Search className="w-5 h-5" />
                            Find My Tools
                        </button>
                        
                        <button 
                            className='bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2'
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-5 h-5" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                </div>
                
                {/* Search History - TurboTax style recent searches */}
                {searchHistory.length > 0 && !showSuggestions && (
                    <div className='bg-white rounded-xl p-6 shadow-lg mb-6'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Searches</h3>
                        <div className='flex flex-wrap gap-3'>
                            {searchHistory.slice(0, 5).map((term, index) => (
                                <button
                                    key={index}
                                    className='bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2'
                                    onClick={() => handleSearch(term)}
                                >
                                    <Clock className="w-4 h-4" />
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Category Filters Panel - TurboTax style */}
                {showFilters && (
                    <div className='bg-white rounded-2xl p-8 shadow-xl mb-8'>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
                            What type of financial help do you need?
                        </h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`p-6 rounded-xl text-center transition-all duration-200 ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                                    }`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <div className='font-semibold text-lg'>{category.name}</div>
                                    <div className='text-sm opacity-75 mt-1'>
                                        {category.id === 'all' ? 'All services' : `${category.name} tools`}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {/* Results Section - TurboTax style results */}
                <div className='bg-white rounded-2xl shadow-xl p-8'>
                    {matchingCards.length === 0 ? (
                        /* Empty State - TurboTax style */
                        <div className='text-center py-16'>
                            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className='text-2xl font-semibold text-gray-800 mb-3'>
                                {searchTerm ? `No results for "${searchTerm}"` : 'Ready to find your financial tools?'}
                            </h3>
                            <p className='text-lg text-gray-600 mb-8 max-w-md mx-auto'>
                                {searchTerm 
                                    ? "Try a different search term or browse our categories below"
                                    : "Start by typing what you need help with in the search box above"
                                }
                            </p>
                            {searchTerm && (
                                <button
                                    className='bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200'
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedCategory('all')
                                    }}
                                >
                                    Clear Search & Start Over
                                </button>
                            )}
                        </div>
                    ) : (
                        /* Results Header - Like TurboTax's progress indicators */
                        <div className='mb-8'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-2xl font-semibold text-gray-800'>
                                    {searchTerm ? `Found ${matchingCards.length} financial tools` : 'All Financial Tools'}
                                </h3>
                                {topMatch && (
                                    <div className='bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
                                        ✨ Best Match: {topMatch.name}
                                    </div>
                                )}
                            </div>
                            
                            {/* Results Grid - TurboTax card style */}
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {matchingCards.map((card, index) => {
                                    const isTopMatch = topMatch && card.id === topMatch.id
                                    const isMatching = card.hasMatch
                                    const animationClass = getCardAnimation(card.id, index)
                                    
                                    return (
                                        <div 
                                            key={card.id}
                                            className={`bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${
                                                isTopMatch 
                                                    ? 'border-green-400 shadow-green-200 shadow-2xl bg-gradient-to-br from-green-50 to-white' 
                                                    : isMatching 
                                                        ? 'border-blue-200 shadow-blue-100 shadow-lg' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                            } ${animationClass}`}
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                            }}
                                        >
                                            {/* Best Match Badge */}
                                            {isTopMatch && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                    Best Match
                                                </div>
                                            )}
                                            
                                            {/* Card Content */}
                                            <div className='text-center'>
                                                <div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                                                    {card.icon}
                                                </div>
                                                
                                                <h4 className={`text-lg font-semibold mb-2 ${
                                                    isTopMatch 
                                                        ? 'text-green-800' 
                                                        : isMatching 
                                                            ? 'text-blue-800' 
                                                            : 'text-gray-800'
                                                }`}>
                                                    {card.name}
                                                </h4>
                                                
                                                <p className='text-sm text-gray-600 mb-4'>
                                                    {card.category === 'finance' && 'Manage your money and finances'}
                                                    {card.category === 'investment' && 'Grow your wealth and investments'}
                                                    {card.category === 'credit' && 'Monitor and improve your credit'}
                                                    {card.category === 'savings' && 'Save money and reach your goals'}
                                                    {card.category === 'analytics' && 'Analyze your financial data'}
                                                    {card.category === 'planning' && 'Plan for your financial future'}
                                                    {card.category === 'security' && 'Protect your financial information'}
                                                    {card.category === 'payments' && 'Process payments quickly and securely'}
                                                </p>
                                                
                                                <button className={`w-full py-2 px-4 rounded-xl font-medium transition-colors duration-200 ${
                                                    isTopMatch
                                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                                        : isMatching
                                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}>
                                                    {isTopMatch ? 'Get Started' : 'Learn More'}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );

}

export default SearchCard;