import { Search, Heart, Star, User, DollarSign, TrendingUp, PieChart, CreditCard, Building, Wallet, BarChart3, Target, Shield, Zap } from 'lucide-react'
import { useState } from 'react'

function SearchCard() {
    const [searchTerm, setSearchTerm] = useState('')
    
    const cards = [
        { id: 1, name: "Finance Pro", icon: <DollarSign className="w-12 h-12 text-green-500 mb-2" />, keywords: ["finance", "money", "dollar", "pro"] },
        { id: 2, name: "Stock Tracker", icon: <TrendingUp className="w-12 h-12 text-blue-500 mb-2" />, keywords: ["stock", "tracker", "trending", "up"] },
        { id: 3, name: "Portfolio", icon: <PieChart className="w-12 h-12 text-purple-500 mb-2" />, keywords: ["portfolio", "chart", "pie", "investment"] },
        { id: 4, name: "Credit Score", icon: <CreditCard className="w-12 h-12 text-yellow-500 mb-2" />, keywords: ["credit", "score", "card", "payment"] },
        { id: 5, name: "Real Estate", icon: <Building className="w-12 h-12 text-orange-500 mb-2" />, keywords: ["real", "estate", "building", "property"] },
        { id: 6, name: "Savings", icon: <Wallet className="w-12 h-12 text-pink-500 mb-2" />, keywords: ["savings", "wallet", "money", "store"] },
        { id: 7, name: "Analytics", icon: <BarChart3 className="w-12 h-12 text-cyan-500 mb-2" />, keywords: ["analytics", "chart", "data", "analysis"] },
        { id: 8, name: "Goals", icon: <Target className="w-12 h-12 text-red-500 mb-2" />, keywords: ["goals", "target", "aim", "objective"] },
        { id: 9, name: "Security", icon: <Shield className="w-12 h-12 text-indigo-500 mb-2" />, keywords: ["security", "shield", "protect", "safe"] },
        { id: 10, name: "Quick Pay", icon: <Zap className="w-12 h-12 text-yellow-600 mb-2" />, keywords: ["quick", "pay", "fast", "zap"] }
    ]

    const getMatchingCards = () => {
        if (!searchTerm.trim()) return cards
        
        const searchLower = searchTerm.toLowerCase()
        return cards.map(card => {
            const matchingKeywords = card.keywords.filter(keyword => 
                keyword.toLowerCase().includes(searchLower)
            )
            const bestMatch = matchingKeywords.find(keyword => 
                keyword.toLowerCase().startsWith(searchLower)
            ) || matchingKeywords[0]
            
            return {
                ...card,
                matchScore: matchingKeywords.length,
                bestMatch: bestMatch,
                hasMatch: matchingKeywords.length > 0
            }
        }).sort((a, b) => {
            if (a.hasMatch && !b.hasMatch) return -1
            if (!a.hasMatch && b.hasMatch) return 1
            return b.matchScore - a.matchScore
        })
    }

    const matchingCards = getMatchingCards()
    const topMatch = matchingCards.find(card => card.hasMatch)

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='flex flex-row items-center justify-center gap-3'>
                <input 
                    className='border-2 border-gray-400 bg-slate-100 focus:text-black focus:outline-slate-400 focus:outline-none rounded-md p-2 w-96' 
                    type="search" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='bg-gray-700 text-white rounded-md p-2 w-12 flex justify-center items-center hover:bg-slate-600'>
                    <Search />
                </button>
            </div>
             <div className='flex flex-row items-center justify-center mt-20 flex-wrap gap-10'>
                 {matchingCards.map((card) => {
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
                 })}
             </div>
        </div>

    );

}

export default SearchCard;