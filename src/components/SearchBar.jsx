import { Search, X, DollarSign, TrendingUp, PieChart, Building, BarChart3, Target } from 'lucide-react'
import { useState, useRef } from 'react'

/**
 * SearchBar Component - Search Interface with Financial Service Cards
 * 
 * Features:
 * - Real-time search with suggestions
 * - Financial service cards that filter based on search
 * - Keyboard navigation support
 * - Clean, modern design
 * - Search history
 */
function SearchBar() {
    // State management
    const [searchTerm, setSearchTerm] = useState('')
    const [searchHistory, setSearchHistory] = useState([])
    const [language, setLanguage] = useState('th') // 'th' or 'en'
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [favorites, setFavorites] = useState(new Set())
    
    // Refs
    const inputRef = useRef(null)
    
    // Financial service cards data with bilingual support
    const cards = [
        { 
            id: 1, 
            name: {
                th: "การจัดการความมั่งคั่ง",
                en: "Wealth Management"
            },
            icon: <DollarSign className="w-8 h-8" />, 
            keywords: ["finance", "money", "wealth", "management", "budget", "expense", "financial"], 
            category: "finance", 
            description: {
                th: "ติดตามและจัดการพอร์ตโฟลิโอความมั่งคั่งของครอบครัว",
                en: "Track and manage your family's wealth portfolio"
            }
        },
        { 
            id: 2, 
            name: {
                th: "การวางแผนทางการเงิน",
                en: "Financial Planning"
            },
            icon: <BarChart3 className="w-8 h-8" />, 
            keywords: ["planning", "financial", "plan", "future", "strategy", "budget"], 
            category: "investment", 
            description: {
                th: "วางแผนอนาคตทางการเงินของครอบครัว",
                en: "Plan your family's financial future"
            }
        },
        { 
            id: 3, 
            name: {
                th: "การติดตามทรัพย์สิน",
                en: "Asset Tracking"
            },
            icon: <Building className="w-8 h-8" />, 
            keywords: ["assets", "tracking", "property", "monitoring", "inventory"], 
            category: "investment", 
            description: {
                th: "ติดตามทรัพย์สินทั้งหมดของครอบครัวในที่เดียว",
                en: "Track all family assets in one place"
            }
        },
        { 
            id: 4, 
            name: {
                th: "การวิเคราะห์การลงทุน",
                en: "Investment Analysis"
            },
            icon: <Target className="w-8 h-8" />, 
            keywords: ["investment", "analysis", "stocks", "portfolio", "trading"], 
            category: "credit", 
            description: {
                th: "วิเคราะห์และปรับปรุงการลงทุนของคุณ",
                en: "Analyze and improve your investments"
            }
        },
        { 
            id: 5, 
            name: {
                th: "การตั้งเป้าหมาย",
                en: "Goal Setting"
            },
            icon: <PieChart className="w-8 h-8" />, 
            keywords: ["goals", "targets", "planning", "objectives", "savings"], 
            category: "investment", 
            description: {
                th: "ตั้งและติดตามเป้าหมายทางการเงิน",
                en: "Set and track financial goals"
            }
        },
        { 
            id: 6, 
            name: {
                th: "รายงานและการวิเคราะห์",
                en: "Reports and Analysis"
            },
            icon: <TrendingUp className="w-8 h-8" />, 
            keywords: ["reports", "analysis", "data", "insights", "statistics"], 
            category: "savings", 
            description: {
                th: "สร้างรายงานทางการเงินที่ละเอียด",
                en: "Create detailed financial reports"
            }
        }
    ]

    // Language toggle function
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th')
    }

    // Get unique categories with search keywords
    const categories = [
        { 
            id: 'all', 
            name: { th: 'ทั้งหมด', en: 'All' },
            keywords: ['all', 'ทั้งหมด', 'everything', 'ทุกอย่าง']
        },
        { 
            id: 'finance', 
            name: { th: 'การเงิน', en: 'Finance' },
            keywords: ['finance', 'การเงิน', 'money', 'budget', 'expense', 'financial']
        },
        { 
            id: 'investment', 
            name: { th: 'การลงทุน', en: 'Investment' },
            keywords: ['investment', 'การลงทุน', 'invest', 'portfolio', 'stocks', 'trading']
        },
        { 
            id: 'credit', 
            name: { th: 'เครดิต', en: 'Credit' },
            keywords: ['credit', 'เครดิต', 'debt', 'payment', 'score', 'card']
        },
        { 
            id: 'savings', 
            name: { th: 'การออม', en: 'Savings' },
            keywords: ['savings', 'การออม', 'save', 'goals', 'money', 'store']
        }
    ]

    
    /**
     * Enhanced fuzzy search algorithm
     */
    const fuzzyMatch = (str, pattern) => {
        const strLower = str.toLowerCase().trim()
        const patternLower = pattern.toLowerCase().trim()
        
        if (patternLower === '') return { score: 0, matched: false }
        if (strLower === patternLower) return { score: 100, matched: true }
        if (strLower.startsWith(patternLower)) return { score: 90, matched: true }
        if (strLower.includes(patternLower)) return { score: 70, matched: true }
        
        // Fuzzy matching for partial matches
        let patternIdx = 0
        let consecutive = 0
        let maxConsecutive = 0
        let totalMatches = 0
        
        for (let i = 0; i < strLower.length && patternIdx < patternLower.length; i++) {
            if (strLower[i] === patternLower[patternIdx]) {
                patternIdx++
                consecutive++
                totalMatches++
                maxConsecutive = Math.max(maxConsecutive, consecutive)
            } else {
                consecutive = 0
            }
        }
        
        if (patternIdx === patternLower.length) {
            const completeness = (patternIdx / patternLower.length) * 50
            const consecutiveness = (maxConsecutive / patternLower.length) * 30
            const density = (totalMatches / strLower.length) * 20
            return { score: completeness + consecutiveness + density, matched: true }
        }
        
        return { score: 0, matched: false }
    }

    /**
     * Get filtered cards based on search term and category with improved accuracy
     */
    const getFilteredCards = () => {
        let filteredCards = cards
        
        // Filter by category first
        if (selectedCategory !== 'all') {
            filteredCards = cards.filter(card => card.category === selectedCategory)
        }
        
        // Then apply search filter
        if (!searchTerm.trim()) return filteredCards
        
        return filteredCards.map(card => {
            let bestMatch = null
            let bestScore = 0
            let totalScore = 0
            
            // Check card name match (weighted highest) - use the correct language
            const nameMatch = fuzzyMatch(card.name[language], searchTerm)
            if (nameMatch.matched) {
                bestScore = Math.max(bestScore, nameMatch.score)
                totalScore += nameMatch.score * 3 // Higher weight for name matches
            }
            
            // Check category match (weighted high)
            const categoryMatch = fuzzyMatch(card.category, searchTerm)
            if (categoryMatch.matched) {
                bestScore = Math.max(bestScore, categoryMatch.score)
                totalScore += categoryMatch.score * 2.5
                if (categoryMatch.score === bestScore) {
                    bestMatch = card.category
                }
            }
            
            // Check category keywords
            const currentCategory = categories.find(cat => cat.id === card.category)
            if (currentCategory) {
                const categoryKeywordMatches = currentCategory.keywords.map(keyword => {
                    const match = fuzzyMatch(keyword, searchTerm)
                    if (match.matched) {
                        bestScore = Math.max(bestScore, match.score)
                        totalScore += match.score * 2
                        if (match.score === bestScore) {
                            bestMatch = keyword
                        }
                    }
                    return match
                }).filter(match => match.matched)
            }
            
            // Check card keywords for matches
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
                hasMatch: keywordMatches.length > 0 || nameMatch.matched || categoryMatch.matched
            }
        }).sort((a, b) => {
            if (a.hasMatch && !b.hasMatch) return -1
            if (!a.hasMatch && b.hasMatch) return 1
            return b.matchScore - a.matchScore
        })
    }

    /**
     * Handle search input changes
     */
    const handleSearchChange = (value) => {
        setSearchTerm(value)
        console.log('Search term changed:', value)
        
        // Simulate loading state for demo
        if (value.trim()) {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 300)
        }
    }

    /**
     * Handle search submission
     */
    const handleSearch = (term = searchTerm) => {
        if (term.trim()) {
            const trimmedTerm = term.trim()
            setSearchTerm(trimmedTerm)
            
            // Add to search history
            if (!searchHistory.includes(trimmedTerm)) {
                setSearchHistory(prev => [trimmedTerm, ...prev.slice(0, 4)])
            }
            
            // Here you would typically trigger the actual search
            console.log('Searching for:', trimmedTerm)
        }
    }

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
        } else if (e.key === 'Escape') {
            inputRef.current?.blur()
        }
    }

    /**
     * Clear search
     */
    const clearSearch = () => {
        setSearchTerm('')
        inputRef.current?.focus()
    }

    /**
     * Toggle favorite
     */
    const toggleFavorite = (cardId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(cardId)) {
                newFavorites.delete(cardId)
            } else {
                newFavorites.add(cardId)
            }
            return newFavorites
        })
    }

    /**
     * Handle card click
     */
    const handleCardClick = (card) => {
        console.log('Card clicked:', card.name[language])
        // Here you would typically navigate to card details
        alert(`${language === 'th' ? 'คลิกที่การ์ด:' : 'Clicked card:'} ${card.name[language]}`)
    }


    const filteredCards = getFilteredCards()

    return (
        <div className="w-full max-w-6xl">
            {/* Language Toggle Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <span className="text-sm">🌐</span>
                    {language === 'th' ? 'ไทย' : 'EN'}
                </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
                <div className="relative max-w-md mx-auto">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={language === 'th' ? "ค้นหาทรัพย์สิน สมาชิกครอบครัว..." : "Search for wealth items, family members..."}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full h-9 min-w-0 rounded-md border border-gray-200 bg-white px-3 py-1 text-base text-gray-900 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-gray-400 selection:bg-blue-500 selection:text-white"
                    />
                    
                    {/* Search Icon */}
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    
                    {/* Clear Button */}
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 animate-in fade-in-0 zoom-in-95"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                            selectedCategory === category.id
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {category.name[language]}
                    </button>
                ))}
            </div>


            {/* No Results State */}
            {searchTerm && filteredCards.filter(card => card.hasMatch).length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'th' ? 'ไม่พบผลลัพธ์' : 'No results found'}
                    </h3>
                    <p className="text-gray-500 mb-4">
                        {language === 'th' 
                            ? 'ลองค้นหาคำอื่นหรือเปลี่ยนหมวดหมู่'
                            : 'Try different keywords or change category'
                        }
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSearchTerm('')}
                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            {language === 'th' ? 'ล้างการค้นหา' : 'Clear search'}
                        </button>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            {language === 'th' ? 'แสดงทั้งหมด' : 'Show all'}
                        </button>
                    </div>
                </div>
            )}

            {/* Financial Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card, index) => {
                    const isFirstCard = index === 0 && card.hasMatch
                    const isSecondCard = index === 1 && card.hasMatch
                    const isThirdCard = index === 2 && card.hasMatch
                    
                    // Calculate opacity based on ranking (most accurate = highest opacity)
                    const getCardOpacity = () => {
                        if (!searchTerm) return 'opacity-100'
                        if (!card.hasMatch) return 'opacity-40'
                        if (index === 0) return 'opacity-100' // Most accurate
                        if (index === 1) return 'opacity-90' // Second
                        if (index === 2) return 'opacity-80' // Third
                        if (index < 5) return 'opacity-70' // Top 5
                        return 'opacity-60' // Others
                    }
                    
                    // Calculate border color based on ranking (all green with varying intensity)
                    const getBorderColor = () => {
                        if (!searchTerm) return 'border-gray-200'
                        if (!card.hasMatch) return 'border-gray-200'
                        if (index === 0) return 'border-green-600' // Most accurate - dark green
                        if (index === 1) return 'border-green-500' // Second - medium green
                        if (index === 2) return 'border-green-400' // Third - light green
                        if (index < 5) return 'border-green-300' // Top 5 - lighter green
                        return 'border-green-200' // Others - lightest green
                    }
                    
                    // Calculate background color based on ranking (all green with varying intensity)
                    const getBackgroundColor = () => {
                        if (!searchTerm) return 'bg-white'
                        if (!card.hasMatch) return 'bg-gray-50'
                        if (index === 0) return 'bg-green-100' // Most accurate - dark green
                        if (index === 1) return 'bg-green-50' // Second - medium green
                        if (index === 2) return 'bg-green-25' // Third - light green
                        if (index < 5) return 'bg-green-25' // Top 5 - lighter green
                        return 'bg-green-25' // Others - lightest green
                    }
                    
                    return (
                        <div 
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[200px] flex flex-col group ${getCardOpacity()} ${getBorderColor()} ${getBackgroundColor()} hover:opacity-100`}
                        >
                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(card.id)
                                }}
                                className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    favorites.has(card.id)
                                        ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                            >
                                <svg className="w-4 h-4" fill={favorites.has(card.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            
                            {/* Search Result Ranking */}
                            {searchTerm && card.hasMatch && (
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        #{index + 1}
                                    </span>
                                </div>
                            )}
                            
                            {/* Card Icon */}
                            <div className="flex justify-center mb-4">
                                <div className={`transition-transform duration-300 group-hover:scale-110 ${
                                    !searchTerm ? 'text-gray-600' :
                                    !card.hasMatch ? 'text-gray-400' :
                                    index === 0 ? 'text-green-700' : // Most accurate - dark green
                                    index === 1 ? 'text-green-600' : // Second - medium green
                                    index === 2 ? 'text-green-500' : // Third - light green
                                    index < 5 ? 'text-green-400' : // Top 5 - lighter green
                                    'text-green-300' // Others - lightest green
                                }`}>
                                    {card.icon}
                                </div>
                            </div>
                            
                            {/* Card Name */}
                            <h3 className={`font-semibold text-center text-base mb-3 ${
                                !searchTerm ? 'text-gray-900' :
                                !card.hasMatch ? 'text-gray-700' :
                                index === 0 ? 'text-green-900' : // Most accurate - darkest green
                                index === 1 ? 'text-green-800' : // Second - dark green
                                index === 2 ? 'text-green-700' : // Third - medium green
                                index < 5 ? 'text-green-600' : // Top 5 - light green
                                'text-green-500' // Others - lighter green
                            }`}>
                                {card.name[language]}
                            </h3>
                            
                            {/* Card Description */}
                            <p className={`text-sm text-center leading-relaxed mb-4 flex-grow ${
                                !searchTerm ? 'text-gray-600' :
                                !card.hasMatch ? 'text-gray-600' :
                                index === 0 ? 'text-green-800' : // Most accurate - dark green
                                index === 1 ? 'text-green-700' : // Second - medium green
                                index === 2 ? 'text-green-600' : // Third - light green
                                index < 5 ? 'text-green-500' : // Top 5 - lighter green
                                'text-green-400' // Others - lightest green
                            }`}>
                                {card.description[language]}
                            </p>

                            {/* Subtle Category for Matching Cards */}
                            {card.hasMatch && (
                                <div className="mt-auto text-center">
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        index === 0 ? 'text-green-800 bg-green-200' : // Most accurate - dark green
                                        index === 1 ? 'text-green-700 bg-green-100' : // Second - medium green
                                        index === 2 ? 'text-green-600 bg-green-50' : // Third - light green
                                        index < 5 ? 'text-green-500 bg-green-50' : // Top 5 - lighter green
                                        'text-green-400 bg-green-25' // Others - lightest green
                                    }`}>
                                        {card.category.charAt(0).toUpperCase() + card.category.slice(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Subtle Instructions */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                    {language === 'th' 
                        ? 'ลองค้นหา: การเงิน, งบประมาณ, การลงทุน, เครดิต, การออม'
                        : 'Try searching for: finance, budget, investment, credit, savings'
                    }
                </p>
            </div>
        </div>
    )
}

export default SearchBar
