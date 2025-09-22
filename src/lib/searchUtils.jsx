/**
 * Search utilities for the SearchBar component
 * Separated for better code splitting and performance
 */

import React from 'react'

/**
 * Enhanced fuzzy search algorithm with comprehensive matching
 */
export const fuzzyMatch = (str, pattern) => {
    const strLower = str.toLowerCase().trim()
    const patternLower = pattern.toLowerCase().trim()
    
    if (patternLower === '') return { score: 0, matched: false }
    
    // Exact match gets highest score
    if (strLower === patternLower) return { score: 100, matched: true }
    
    // Starts with gets very high score
    if (strLower.startsWith(patternLower)) return { score: 95, matched: true }
    
    // Ends with gets high score
    if (strLower.endsWith(patternLower)) return { score: 90, matched: true }
    
    // Contains gets high score
    if (strLower.includes(patternLower)) return { score: 85, matched: true }
    
    // Word boundary matching (matches whole words)
    const words = strLower.split(/\s+/)
    for (const word of words) {
        if (word === patternLower) return { score: 92, matched: true }
        if (word.startsWith(patternLower)) return { score: 88, matched: true }
        if (word.includes(patternLower)) return { score: 82, matched: true }
    }
    
    // Enhanced fuzzy matching for partial matches
    let patternIdx = 0
    let consecutive = 0
    let maxConsecutive = 0
    let totalMatches = 0
    let exactWordMatches = 0
    let startsWithMatches = 0
    let containsMatches = 0
    let partialMatches = 0
    
    // Check for comprehensive word-level matches
    const patternWords = patternLower.split(/\s+/)
    const strWords = strLower.split(/\s+/)
    
    for (const pWord of patternWords) {
        for (const sWord of strWords) {
            if (sWord === pWord) {
                exactWordMatches++
            } else if (sWord.startsWith(pWord)) {
                startsWithMatches++
            } else if (sWord.includes(pWord)) {
                containsMatches++
            } else if (pWord.length > 2 && sWord.includes(pWord.substring(0, Math.max(2, pWord.length - 1)))) {
                partialMatches++
            }
        }
    }
    
    // Character-level fuzzy matching with improved algorithm
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
    
    // Calculate comprehensive scoring
    if (patternIdx === patternLower.length) {
        const completeness = (patternIdx / patternLower.length) * 35
        const consecutiveness = (maxConsecutive / patternLower.length) * 25
        const density = (totalMatches / strLower.length) * 15
        const wordScore = (
            exactWordMatches * 8 +
            startsWithMatches * 6 +
            containsMatches * 4 +
            partialMatches * 2
        )
        const position = patternIdx > 0 ? (strLower.indexOf(patternLower[0]) + 1) / strLower.length : 0
        const positionBonus = position * 5
        
        return { 
            score: Math.min(completeness + consecutiveness + density + wordScore + positionBonus, 100), 
            matched: true 
        }
    }
    
    // If we have word matches, still consider it a match with enhanced scoring
    if (exactWordMatches > 0 || startsWithMatches > 0 || containsMatches > 0) {
        const wordScore = (
            exactWordMatches * 20 +
            startsWithMatches * 15 +
            containsMatches * 10 +
            partialMatches * 5
        )
        return { score: Math.min(wordScore, 100), matched: true }
    }
    
    return { score: 0, matched: false }
}

/**
 * Highlight search terms in text
 */
export const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
        regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
                {part}
            </mark>
        ) : part
    )
}

/**
 * Debounce function for search input
 */
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}