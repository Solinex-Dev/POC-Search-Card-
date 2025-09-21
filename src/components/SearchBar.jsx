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
     * Get filtered cards based on search term
     */
    const getFilteredCards = () => {
        if (!searchTerm.trim()) return cards
        
        return cards.map(card => {
            let bestMatch = null
            let bestScore = 0
            let totalScore = 0
            
            // Check card name match (weighted higher) - use the correct language
            const nameMatch = fuzzyMatch(card.name[language], searchTerm)
            if (nameMatch.matched) {
                bestScore = Math.max(bestScore, nameMatch.score)
                totalScore += nameMatch.score * 2
            }
            
            // Check keywords for matches
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

    /**
     * Handle search input changes
     */
    const handleSearchChange = (value) => {
        setSearchTerm(value)
        console.log('Search term changed:', value)
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
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results Header */}
            {searchTerm && (
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Search className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">
                            {language === 'th' ? 'ผลการค้นหา:' : 'Search Results:'}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">"{searchTerm}"</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        {language === 'th' 
                            ? `พบ ${filteredCards.filter(card => card.hasMatch).length} รายการ`
                            : `${filteredCards.filter(card => card.hasMatch).length} result(s) found`
                        }
                    </p>
                </div>
            )}

            {/* Financial Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card, index) => {
                    const isFirstCard = index === 0 && card.hasMatch
                    
                    return (
                        <div 
                            key={card.id}
                            className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md min-h-[200px] flex flex-col ${
                                isFirstCard 
                                    ? 'border-green-500 bg-green-50' 
                                    : card.hasMatch
                                    ? 'border-gray-200 bg-white hover:border-gray-300'
                                    : 'border-gray-200 bg-white opacity-80'
                            }`}
                        >
                            {/* Card Icon */}
                            <div className="flex justify-center mb-4">
                                <div className={`${isFirstCard ? 'text-green-600' : card.hasMatch ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {card.icon}
                                </div>
                            </div>
                            
                            {/* Card Name */}
                            <h3 className={`font-semibold text-center text-base mb-3 ${
                                isFirstCard ? 'text-gray-900' : card.hasMatch ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                                {card.name[language]}
                            </h3>
                            
                            {/* Card Description */}
                            <p className={`text-sm text-center leading-relaxed mb-4 flex-grow ${
                                isFirstCard ? 'text-gray-700' : card.hasMatch ? 'text-gray-600' : 'text-gray-600'
                            }`}>
                                {card.description[language]}
                            </p>

                            {/* Subtle Category for Matching Cards */}
                            {card.hasMatch && (
                                <div className="mt-auto text-center">
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        isFirstCard 
                                            ? 'text-green-600 bg-green-50' 
                                            : 'text-gray-500 bg-gray-100'
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
