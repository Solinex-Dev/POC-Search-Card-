import { Search, X, Moon, Sun, Target, PieChart, TrendingUp, Star, FileText } from 'lucide-react'
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import { fuzzyMatch, highlightText } from '../lib/searchUtils.jsx'
import { financialCards, categories } from '../data/financialCards.jsx'

/**
 * SearchBar Component - Search Interface with Financial Service Cards
 * 
 * Features:
 * - Real-time search with suggestions
 * - Financial service cards that filter based on search
 * - Keyboard navigation support
 * - Clean, modern design
 */
function SearchBar() {
    // State management
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [language, setLanguage] = useState('th') // 'th' or 'en'
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [favorites, setFavorites] = useState(new Set())
    const [focusedCardIndex, setFocusedCardIndex] = useState(-1)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    // Refs
    const inputRef = useRef(null)
    
    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)
        
        return () => clearTimeout(timer)
    }, [searchTerm])
    
    // Use imported data
    const cards = financialCards

    // Language toggle function - memoized
    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th')
    }, [])

    // Theme toggle function - memoized
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newMode = !prev
            // Apply dark class to document for global dark mode
            if (newMode) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            return newMode
        })
    }, [])

    // Apply initial dark mode state on mount
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    // Use imported categories
    const categoriesData = categories

    

    /**
     * Get filtered cards based on search term and category with improved accuracy - memoized
     */
    const getFilteredCards = useMemo(() => {
        let filteredCards = cards
        
        // Filter by category first
        if (selectedCategory !== 'all') {
            filteredCards = cards.filter(card => card.category === selectedCategory)
        }
        
        // Then apply search filter
        if (!debouncedSearchTerm.trim()) return filteredCards
        
        return filteredCards.map(card => {
            let bestMatch = null
            let bestScore = 0
            let totalScore = 0
            
            // Check card name match (weighted highest) - use the correct language
            const nameMatch = fuzzyMatch(card.name[language], debouncedSearchTerm)
            if (nameMatch.matched) {
                bestScore = Math.max(bestScore, nameMatch.score)
                totalScore += nameMatch.score * 8 // Much higher weight for name matches
            }
            
            // Also check the other language name for better matching
            const otherLanguage = language === 'th' ? 'en' : 'th'
            const otherNameMatch = fuzzyMatch(card.name[otherLanguage], debouncedSearchTerm)
            if (otherNameMatch.matched) {
                bestScore = Math.max(bestScore, otherNameMatch.score)
                totalScore += otherNameMatch.score * 6 // High weight for other language name matches
            }
            
            // Check category match (weighted high)
            const categoryMatch = fuzzyMatch(card.category, debouncedSearchTerm)
            if (categoryMatch.matched) {
                bestScore = Math.max(bestScore, categoryMatch.score)
                totalScore += categoryMatch.score * 2.5
                if (categoryMatch.score === bestScore) {
                    bestMatch = card.category
                }
            }
            
            // Check category keywords
            const currentCategory = categoriesData.find(cat => cat.id === card.category)
            if (currentCategory) {
                currentCategory.keywords.forEach(keyword => {
                    const match = fuzzyMatch(keyword, debouncedSearchTerm)
                    if (match.matched) {
                        bestScore = Math.max(bestScore, match.score)
                        totalScore += match.score * 2
                        if (match.score === bestScore) {
                            bestMatch = keyword
                        }
                    }
                })
            }
            
            // Check card keywords for matches
            const keywordMatches = card.keywords.map(keyword => {
                const match = fuzzyMatch(keyword, debouncedSearchTerm)
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
    }, [debouncedSearchTerm, selectedCategory, language, cards, categoriesData])

    /**
     * Handle search input changes - memoized
     */
    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value)
        
        // Debug: Log search results for testing (only in development)
        if (import.meta.env.DEV && value.trim().length > 0) {
            console.log('🔍 Search Debug:', {
                searchTerm: value,
                results: getFilteredCards.filter(card => card.hasMatch).map(card => ({
                    name: card.name[language],
                    score: card.matchScore,
                    bestMatch: card.bestMatch
                }))
            })
        }
    }, [language, getFilteredCards])

    /**
     * Handle search submission - memoized
     */
    const handleSearch = useCallback((term = searchTerm) => {
        if (term.trim()) {
            setSearchTerm(term.trim())
        }
    }, [searchTerm])

    /**
     * Handle card click - memoized
     */
    const handleCardClick = useCallback((card) => {
        // Here you would typically navigate to card details
        alert(`${language === 'th' ? 'คลิกที่การ์ด:' : 'Clicked card:'} ${card.name[language]}`)
    }, [language])

    /**
     * Handle keyboard navigation - memoized
     */
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (focusedCardIndex >= 0) {
                // If a card is focused, click it
                const focusedCard = getFilteredCards[focusedCardIndex]
                if (focusedCard) {
                    handleCardClick(focusedCard)
                }
            } else {
                // Otherwise, perform search
                handleSearch()
            }
        } else if (e.key === 'Escape') {
            inputRef.current?.blur()
            setFocusedCardIndex(-1)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setFocusedCardIndex(prev => 
                prev < getFilteredCards.length - 1 ? prev + 1 : 0
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setFocusedCardIndex(prev => 
                prev > 0 ? prev - 1 : getFilteredCards.length - 1
            )
        } else if (e.key === 'Tab') {
            // Allow default tab behavior for category filters
            setFocusedCardIndex(-1)
        }
    }, [focusedCardIndex, getFilteredCards, handleSearch, handleCardClick])

    /**
     * Clear search - memoized
     */
    const clearSearch = useCallback(() => {
        setSearchTerm('')
        inputRef.current?.focus()
    }, [])

    /**
     * Toggle favorite - memoized
     */
    const toggleFavorite = useCallback((cardId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(cardId)) {
                newFavorites.delete(cardId)
            } else {
                newFavorites.add(cardId)
            }
            return newFavorites
        })
    }, [])



    /**
     * Get contextual suggestions based on search patterns - memoized
     */
    const getContextualSuggestions = useCallback((searchLower) => {
        const contextualSuggestions = []
        
        // Pattern-based suggestions
        if (searchLower.includes('budget') || searchLower.includes('งบประมาณ')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'การจัดการงบประมาณ' : 'Budget Management',
                type: 'suggestion',
                category: 'finance',
                score: 60,
                icon: null
            })
        }
        
        if (searchLower.includes('debt') || searchLower.includes('หนี้')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'การจัดการหนี้' : 'Debt Management',
                type: 'suggestion',
                category: 'credit',
                score: 60,
                icon: null
            })
        }
        
        if (searchLower.includes('save') || searchLower.includes('ออม')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'การออมและเป้าหมาย' : 'Savings & Goals',
                type: 'suggestion',
                category: 'savings',
                score: 60,
                icon: null
            })
        }
        
        if (searchLower.includes('invest') || searchLower.includes('ลงทุน')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'การวิเคราะห์การลงทุน' : 'Investment Analysis',
                type: 'suggestion',
                category: 'investment',
                score: 60,
                icon: null
            })
        }
        
        if (searchLower.includes('emergency') || searchLower.includes('ฉุกเฉิน')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'กองทุนฉุกเฉิน' : 'Emergency Fund',
                type: 'suggestion',
                category: 'savings',
                score: 60,
                icon: null
            })
        }
        
        if (searchLower.includes('child') || searchLower.includes('kid') || searchLower.includes('เด็ก')) {
            contextualSuggestions.push({
                text: language === 'th' ? 'การเงินสำหรับเยาวชน' : 'Youth Financial Education',
                type: 'suggestion',
                category: 'savings',
                score: 60,
                icon: null
            })
        }
        
        return contextualSuggestions
    }, [language])

    /**
     * Get smart search suggestions based on current input with enhanced intelligence - memoized
     */
    const getSearchSuggestions = useMemo(() => {
        if (!searchTerm.trim() || searchTerm.length < 2) return []
        
        const searchLower = searchTerm.toLowerCase()
        
        // 1. Exact card name matches (highest priority)
        const exactCardMatches = cards
            .map(card => ({
                text: card.name[language],
                type: 'card',
                category: card.category,
                score: card.name[language].toLowerCase() === searchLower ? 100 : 
                       card.name[language].toLowerCase().startsWith(searchLower) ? 95 : 90,
                icon: card.icon
            }))
            .filter(item => item.text.toLowerCase().includes(searchLower))
            .sort((a, b) => b.score - a.score)
        
        // 2. Category matches (high priority)
        const categoryMatches = categoriesData
            .filter(cat => cat.id !== 'all')
            .map(category => ({
                text: category.name[language],
                type: 'category',
                category: category.id,
                score: category.name[language].toLowerCase() === searchLower ? 90 : 
                       category.name[language].toLowerCase().startsWith(searchLower) ? 85 : 80,
                icon: null
            }))
            .filter(item => item.text.toLowerCase().includes(searchLower))
            .sort((a, b) => b.score - a.score)
        
        // 3. Smart keyword matches from card descriptions and keywords
        const keywordMatches = []
        cards.forEach(card => {
            // Check card keywords for matches
            card.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(searchLower)) {
                    keywordMatches.push({
                        text: keyword,
                        type: 'keyword',
                        category: card.category,
                        score: keyword.toLowerCase() === searchLower ? 85 : 
                               keyword.toLowerCase().startsWith(searchLower) ? 80 : 75,
                        icon: card.icon,
                        relatedCard: card.name[language]
                    })
                }
            })
            
            // Check card descriptions for matches
            if (card.description[language].toLowerCase().includes(searchLower)) {
                keywordMatches.push({
                    text: card.description[language],
                    type: 'description',
                    category: card.category,
                    score: 70,
                    icon: card.icon,
                    relatedCard: card.name[language]
                })
            }
        })
        
        // 4. Smart contextual suggestions based on search patterns
        const contextualSuggestions = getContextualSuggestions(searchLower)
        
        // Combine and deduplicate suggestions
        const allSuggestions = [
            ...exactCardMatches,
            ...categoryMatches,
            ...keywordMatches.slice(0, 5), // Limit keyword matches
            ...contextualSuggestions
        ]
        
        // Remove duplicates and sort by score
        const uniqueSuggestions = allSuggestions
            .filter((item, index, self) => 
                index === self.findIndex(t => t.text === item.text)
            )
            .sort((a, b) => b.score - a.score)
            .slice(0, 8) // Limit to 8 suggestions
        
        return uniqueSuggestions
    }, [searchTerm, language, cards, categoriesData, getContextualSuggestions])
    
    

    /**
     * Get popular search examples when no search term - memoized
     */
    const getPopularSearches = useMemo(() => {
        const popularSearches = [
            { th: 'การเงิน', en: 'finance' },
            { th: 'การลงทุน', en: 'investment' },
            { th: 'งบประมาณ', en: 'budget' },
            { th: 'การจัดการความมั่งคั่ง', en: 'wealth management' },
            { th: 'การวางแผนทางการเงิน', en: 'financial planning' },
            { th: 'พอร์ตโฟลิโอ', en: 'portfolio' },
            { th: 'การออม', en: 'savings' },
            { th: 'เครดิต', en: 'credit' }
        ]
        
        return popularSearches.slice(0, 6)
    }, [])

    const filteredCards = getFilteredCards

    return (
        <div className={`w-full max-w-6xl ${isDarkMode ? 'dark' : ''}`}>
            {/* Language and Theme Toggle Buttons */}
            <div className="flex justify-end gap-2 mb-4">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {isDarkMode ? 'Light' : 'Dark'}
                </button>
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
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
                        placeholder={language === 'th' ? "ลองค้นหา: การเงิน, การลงทุน, งบประมาณ, พอร์ตโฟลิโอ..." : "Try searching: finance, investment, budget, portfolio..."}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="w-full h-9 min-w-0 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1 text-base text-gray-900 dark:text-gray-100 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 selection:bg-emerald-500 selection:text-white"
                    />
                    
                    {/* Search Icon */}
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    
                    {/* Clear Button */}
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 animate-in fade-in-0 zoom-in-95"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Enhanced Search Suggestions Dropdown */}
                {showSuggestions && (() => {
                    const suggestions = searchTerm.length >= 2 ? getSearchSuggestions : []
                    const popularSearches = searchTerm.length < 2 ? getPopularSearches : []
                    
                    return (suggestions.length > 0 || popularSearches.length > 0) && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                            <div className="py-2">
                                {/* Show smart suggestions when typing */}
                                {suggestions.length > 0 && (
                                    <>
                                        <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                            <Search className="w-3 h-3" />
                                            {language === 'th' ? 'คำแนะนำอัจฉริยะ' : 'Smart Suggestions'}
                                        </div>
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSearchTerm(suggestion.text)
                                                    setShowSuggestions(false)
                                                    inputRef.current?.focus()
                                                }}
                                                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {/* Suggestion Type Icon */}
                                                    <div className="flex-shrink-0">
                                                        {suggestion.type === 'card' && (
                                                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                                <Target className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                        )}
                                                        {suggestion.type === 'category' && (
                                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                                <PieChart className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                            </div>
                                                        )}
                                                        {suggestion.type === 'keyword' && (
                                                            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                                                <Star className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                                            </div>
                                                        )}
                                                        {suggestion.type === 'suggestion' && (
                                                            <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                                                <TrendingUp className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                                                            </div>
                                                        )}
                                                        {suggestion.type === 'description' && (
                                                            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                                <FileText className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Suggestion Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium">
                                                            {highlightText(suggestion.text, searchTerm)}
                                                        </div>
                                                        {suggestion.relatedCard && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {language === 'th' ? 'จาก: ' : 'From: '}{suggestion.relatedCard}
                                                            </div>
                                                        )}
                                                        {suggestion.type === 'keyword' && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {language === 'th' ? 'คำสำคัญ' : 'Keyword'} • {suggestion.category}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Category Badge */}
                                                    <div className="flex-shrink-0">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                                            suggestion.category === 'finance' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                            suggestion.category === 'investment' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                            suggestion.category === 'credit' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                                            suggestion.category === 'savings' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                                                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                        }`}>
                                                            {suggestion.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </>
                                )}
                                
                                {/* Show popular searches when not typing */}
                                {popularSearches.length > 0 && searchTerm.length < 2 && (
                                    <>
                                        <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                                            <TrendingUp className="w-3 h-3" />
                                            {language === 'th' ? 'ค้นหาที่เป็นที่นิยม' : 'Popular Searches'}
                                        </div>
                                        {popularSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSearchTerm(search[language])
                                                    setShowSuggestions(false)
                                                    inputRef.current?.focus()
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                            >
                                                <Search className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                                                {search[language]}
                                            </button>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })()}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categoriesData.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                    >
                        {category.name[language]}
                    </button>
                ))}
            </div>


            {/* No Results State */}
            {debouncedSearchTerm && filteredCards.filter(card => card.hasMatch).length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {language === 'th' ? 'ไม่พบผลลัพธ์' : 'No results found'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {language === 'th' 
                            ? 'ลองค้นหาคำอื่นหรือเปลี่ยนหมวดหมู่'
                            : 'Try different keywords or change category'
                        }
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                                >
                                    {language === 'th' ? 'ล้างการค้นหา' : 'Clear search'}
                                </button>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            {language === 'th' ? 'แสดงทั้งหมด' : 'Show all'}
                        </button>
                    </div>
                </div>
            )}

            {/* Financial Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card, index) => {
                    
                    // Calculate opacity based on ranking (most accurate = highest opacity)
                    const getCardOpacity = () => {
                        if (!debouncedSearchTerm) return 'opacity-100'
                        if (!card.hasMatch) return 'opacity-40'
                        if (index === 0) return 'opacity-100' // Most accurate
                        if (index === 1) return 'opacity-90' // Second
                        if (index === 2) return 'opacity-80' // Third
                        if (index < 5) return 'opacity-70' // Top 5
                        return 'opacity-60' // Others
                    }
                    
                            // Calculate border color based on ranking (emerald theme)
                            const getBorderColor = () => {
                                if (!debouncedSearchTerm) return 'border-gray-200'
                                if (!card.hasMatch) return 'border-gray-200'
                                if (index === 0) return 'border-emerald-600' // Most accurate - dark emerald
                                if (index === 1) return 'border-emerald-500' // Second - medium emerald
                                if (index === 2) return 'border-emerald-400' // Third - light emerald
                                if (index < 5) return 'border-emerald-300' // Top 5 - lighter emerald
                                return 'border-emerald-200' // Others - lightest emerald
                            }
                    
                            // Calculate background color based on ranking (emerald theme)
                            const getBackgroundColor = () => {
                                if (!debouncedSearchTerm) return 'bg-white'
                                if (!card.hasMatch) return 'bg-gray-50'
                                if (index === 0) return 'bg-emerald-50' // Most accurate - light emerald
                                if (index === 1) return 'bg-emerald-25' // Second - very light emerald
                                if (index === 2) return 'bg-emerald-25' // Third - very light emerald
                                if (index < 5) return 'bg-emerald-25' // Top 5 - very light emerald
                                return 'bg-emerald-25' // Others - very light emerald
                            }
                    
                    const isFocused = focusedCardIndex === index
                    
                    return (
                        <div 
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            onMouseEnter={() => setFocusedCardIndex(index)}
                            className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[200px] flex flex-col group ${getCardOpacity()} ${getBorderColor()} ${getBackgroundColor()} hover:opacity-100 dark:bg-gray-800 dark:border-gray-700 ${
                                isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                            }`}
                            tabIndex={0}
                        >
                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(card.id)
                                }}
                                className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    favorites.has(card.id)
                                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
                                        : 'text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                                }`}
                            >
                                <svg className="w-4 h-4" fill={favorites.has(card.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            
                            
                            {/* Card Icon */}
                            <div className="flex justify-center mb-4">
                                        <div className={`transition-transform duration-300 group-hover:scale-110 ${
                                            !debouncedSearchTerm ? 'text-gray-600' :
                                            !card.hasMatch ? 'text-gray-400' :
                                            index === 0 ? 'text-emerald-700' : // Most accurate - dark emerald
                                            index === 1 ? 'text-emerald-600' : // Second - medium emerald
                                            index === 2 ? 'text-emerald-500' : // Third - light emerald
                                            index < 5 ? 'text-emerald-400' : // Top 5 - lighter emerald
                                            'text-emerald-300' // Others - lightest emerald
                                        }`}>
                                    {card.icon}
                                </div>
                            </div>
                            
                            {/* Card Name */}
                                    <h3 className={`font-semibold text-center text-base mb-3 ${
                                        !debouncedSearchTerm ? 'text-gray-900 dark:text-gray-100' :
                                        !card.hasMatch ? 'text-gray-700 dark:text-gray-300' :
                                        index === 0 ? 'text-emerald-900 dark:text-emerald-400' : // Most accurate - darkest emerald
                                        index === 1 ? 'text-emerald-800 dark:text-emerald-400' : // Second - dark emerald
                                        index === 2 ? 'text-emerald-700 dark:text-emerald-400' : // Third - medium emerald
                                        index < 5 ? 'text-emerald-600 dark:text-emerald-400' : // Top 5 - light emerald
                                        'text-emerald-500 dark:text-emerald-400' // Others - lighter emerald
                                    }`}>
                                {highlightText(card.name[language], searchTerm)}
                            </h3>
                            
                            {/* Card Description */}
                                    <p className={`text-sm text-center leading-relaxed mb-4 flex-grow ${
                                        !debouncedSearchTerm ? 'text-gray-600 dark:text-gray-400' :
                                        !card.hasMatch ? 'text-gray-600 dark:text-gray-400' :
                                        index === 0 ? 'text-emerald-800 dark:text-emerald-300' : // Most accurate - dark emerald
                                        index === 1 ? 'text-emerald-700 dark:text-emerald-300' : // Second - medium emerald
                                        index === 2 ? 'text-emerald-600 dark:text-emerald-300' : // Third - light emerald
                                        index < 5 ? 'text-emerald-500 dark:text-emerald-300' : // Top 5 - lighter emerald
                                        'text-emerald-400 dark:text-emerald-300' // Others - lightest emerald
                                    }`}>
                                {highlightText(card.description[language], searchTerm)}
                            </p>

                            {/* Subtle Category for Matching Cards */}
                            {card.hasMatch && (
                                <div className="mt-auto text-center">
                                            <span className={`text-xs px-2 py-1 rounded ${
                                                index === 0 ? 'text-emerald-800 dark:text-emerald-200 bg-emerald-200 dark:bg-emerald-800/30' : // Most accurate - dark emerald
                                                index === 1 ? 'text-emerald-700 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-800/20' : // Second - medium emerald
                                                index === 2 ? 'text-emerald-600 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-800/20' : // Third - light emerald
                                                index < 5 ? 'text-emerald-500 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-800/20' : // Top 5 - lighter emerald
                                                'text-emerald-400 dark:text-emerald-200 bg-emerald-25 dark:bg-emerald-800/10' // Others - lightest emerald
                                            }`}>
                                        {card.category.charAt(0).toUpperCase() + card.category.slice(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default memo(SearchBar)
