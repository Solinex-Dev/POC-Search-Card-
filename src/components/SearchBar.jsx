import { Search, X, DollarSign, TrendingUp, PieChart, Building, BarChart3, Target, Moon, Sun, CreditCard, PiggyBank, Calculator, Shield, FileText, Users, Home, Car, GraduationCap, Briefcase, Heart, Star, Clock, AlertCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

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
    
    // Financial service cards data with comprehensive bilingual support
    const cards = [
        { 
            id: 1, 
            name: {
                th: "การวางแผนทางการเงินครอบครัว",
                en: "Family Financial Planning"
            },
            icon: <Users className="w-12 h-12" />,
            keywords: [
                // English keywords
                "family", "financial planning", "family planning", "household", "budget", "planning", "strategy",
                "goals", "objectives", "future", "roadmap", "blueprint", "framework", "methodology", "children",
                "kids", "education", "retirement", "estate", "inheritance", "will", "trust", "family meeting",
                // Thai keywords
                "ครอบครัว", "การวางแผนทางการเงิน", "การวางแผนครอบครัว", "ครัวเรือน", "งบประมาณ", "การวางแผน", "กลยุทธ์",
                "เป้าหมาย", "วัตถุประสงค์", "อนาคต", "แผนงาน", "โครงร่าง", "กรอบงาน", "ระเบียบวิธี", "ลูก", "เด็ก",
                "การศึกษา", "การเกษียณ", "มรดก", "การสืบทอด", "พินัยกรรม", "ทรัสต์", "การประชุมครอบครัว"
            ], 
            category: "finance", 
            description: {
                th: "วางแผนทางการเงินสำหรับครอบครัวและอนาคต",
                en: "Plan finances for family and future"
            }
        },
        { 
            id: 2, 
            name: {
                th: "การจัดการงบประมาณ",
                en: "Budget Management"
            },
            icon: <BarChart3 className="w-12 h-12" />,
            keywords: [
                // English keywords
                "budget", "budgeting", "budget management", "income", "expense", "spending", "allocation",
                "monthly budget", "annual budget", "cash flow", "balance", "surplus", "deficit", "tracking",
                "monitoring", "control", "planning", "forecast", "projection", "variance", "analysis",
                // Thai keywords
                "งบประมาณ", "การทำงบประมาณ", "การจัดการงบประมาณ", "รายได้", "รายจ่าย", "การใช้จ่าย", "การจัดสรร",
                "งบประมาณรายเดือน", "งบประมาณรายปี", "กระแสเงินสด", "ยอดคงเหลือ", "เกินดุล", "ขาดดุล", "การติดตาม",
                "การตรวจสอบ", "การควบคุม", "การวางแผน", "การคาดการณ์", "การคาดคะเน", "ความแตกต่าง", "การวิเคราะห์"
            ], 
            category: "finance", 
            description: {
                th: "สร้างและติดตามงบประมาณครอบครัว",
                en: "Create and track family budget"
            }
        },
        { 
            id: 3, 
            name: {
                th: "การติดตามรายจ่าย",
                en: "Expense Tracking"
            },
            icon: <PieChart className="w-12 h-12" />,
            keywords: [
                // English keywords
                "expense", "tracking", "expense tracking", "spending", "monitoring", "categorization", "analysis",
                "daily expenses", "monthly expenses", "receipts", "transactions", "categories", "food", "transportation",
                "utilities", "entertainment", "healthcare", "education", "shopping", "bills", "payments",
                // Thai keywords
                "รายจ่าย", "การติดตาม", "การติดตามรายจ่าย", "การใช้จ่าย", "การตรวจสอบ", "การจัดหมวดหมู่", "การวิเคราะห์",
                "รายจ่ายรายวัน", "รายจ่ายรายเดือน", "ใบเสร็จ", "รายการ", "หมวดหมู่", "อาหาร", "การขนส่ง",
                "สาธารณูปโภค", "บันเทิง", "การดูแลสุขภาพ", "การศึกษา", "การช้อปปิ้ง", "บิล", "การชำระเงิน"
            ], 
            category: "finance", 
            description: {
                th: "ติดตามและวิเคราะห์รายจ่ายรายวัน",
                en: "Track and analyze daily expenses"
            }
        },
        { 
            id: 4, 
            name: {
                th: "เครื่องคิดเลขทางการเงิน",
                en: "Financial Calculator"
            },
            icon: <Calculator className="w-12 h-12" />,
            keywords: [
                // English keywords
                "calculator", "financial calculator", "loan calculator", "mortgage calculator", "investment calculator",
                "retirement calculator", "savings calculator", "compound interest calculator", "budget calculator",
                "debt payoff calculator", "credit card calculator", "tax calculator", "insurance calculator",
                "roi calculator", "npv calculator", "irr calculator", "present value", "future value", "annuity",
                "amortization", "payment schedule", "interest calculation", "principal", "rate", "time", "formula",
                // Thai keywords
                "เครื่องคิดเลข", "เครื่องคิดเลขทางการเงิน", "เครื่องคิดเลขเงินกู้", "เครื่องคิดเลขจำนอง", "เครื่องคิดเลขการลงทุน",
                "เครื่องคิดเลขการเกษียณ", "เครื่องคิดเลขการออม", "เครื่องคิดเลขดอกเบี้ยทบต้น", "เครื่องคิดเลขงบประมาณ",
                "เครื่องคิดเลขการชำระหนี้", "เครื่องคิดเลขบัตรเครดิต", "เครื่องคิดเลขภาษี", "เครื่องคิดเลขประกัน",
                "เครื่องคิดเลขผลตอบแทน", "เครื่องคิดเลขมูลค่าปัจจุบัน", "เครื่องคิดเลขมูลค่าในอนาคต", "เงินรายปี",
                "การคำนวณการชำระคืน", "ตารางการชำระ", "การคำนวณดอกเบี้ย", "เงินต้น", "อัตรา", "เวลา", "สูตร"
            ], 
            category: "finance", 
            description: {
                th: "คำนวณและวิเคราะห์สถานการณ์ทางการเงิน",
                en: "Calculate and analyze financial situations"
            }
        },
        { 
            id: 5, 
            name: {
                th: "การจัดการภาษี",
                en: "Tax Management"
            },
            icon: <FileText className="w-12 h-12" />,
            keywords: [
                // English keywords
                "tax", "tax management", "tax planning", "tax preparation", "tax filing", "income tax", "property tax",
                "sales tax", "capital gains", "tax deduction", "tax credit", "tax refund", "tax bracket", "marginal tax",
                "effective tax rate", "tax advisor", "cpa", "accountant", "tax software", "turbo tax", "h&r block",
                "w2", "1099", "schedule a", "schedule b", "schedule c", "itemized deduction", "standard deduction",
                "exemption", "dependent", "filing status", "single", "married", "head of household", "widow",
                // Thai keywords
                "ภาษี", "การจัดการภาษี", "การวางแผนภาษี", "การเตรียมภาษี", "การยื่นภาษี", "ภาษีเงินได้", "ภาษีทรัพย์สิน",
                "ภาษีมูลค่าเพิ่ม", "กำไรจากการขาย", "การลดหย่อนภาษี", "เครดิตภาษี", "เงินคืนภาษี", "ช่วงภาษี", "ภาษีส่วนเพิ่ม",
                "อัตราภาษีที่แท้จริง", "ที่ปรึกษาภาษี", "นักบัญชี", "ซอฟต์แวร์ภาษี", "การลดหย่อนรายการ", "การลดหย่อนมาตรฐาน",
                "การยกเว้น", "ผู้อยู่ในอุปการะ", "สถานะการยื่น", "โสด", "สมรส", "หัวหน้าครอบครัว", "หม้าย"
            ], 
            category: "finance", 
            description: {
                th: "วางแผนและจัดการภาษีอย่างถูกต้อง",
                en: "Plan and manage taxes correctly"
            }
        },
        { 
            id: 6, 
            name: {
                th: "การจัดการความมั่งคั่งและทรัพย์สิน",
                en: "Wealth & Asset Management"
            },
            icon: <DollarSign className="w-12 h-12" />,
            keywords: [
                // English keywords
                "wealth", "management", "wealth management", "assets", "asset management", "portfolio", "investment",
                "finance", "financial", "money", "budget", "expense", "income", "capital", "funds", "savings",
                "planning", "strategy", "advisor", "advisory", "consulting", "retirement", "estate", "property",
                "real estate", "stocks", "bonds", "mutual funds", "etf", "crypto", "gold", "silver", "holdings",
                // Thai keywords
                "ความมั่งคั่ง", "การจัดการ", "การจัดการความมั่งคั่ง", "ทรัพย์สิน", "การจัดการทรัพย์สิน", "พอร์ตโฟลิโอ", "การลงทุน",
                "การเงิน", "เงิน", "งบประมาณ", "รายจ่าย", "รายได้", "ทุน", "กองทุน", "การออม", "การวางแผน",
                "กลยุทธ์", "ที่ปรึกษา", "การให้คำปรึกษา", "การเกษียณ", "มรดก", "อสังหาริมทรัพย์", "หุ้น", "พันธบัตร",
                "กองทุนรวม", "คริปโต", "ทอง", "เงิน", "การถือครอง"
            ], 
            category: "investment", 
            description: {
                th: "ติดตามและจัดการพอร์ตโฟลิโอความมั่งคั่งของครอบครัว",
                en: "Track and manage your family's wealth portfolio"
            }
        },
        { 
            id: 7, 
            name: {
                th: "การวิเคราะห์การลงทุน",
                en: "Investment Analysis"
            },
            icon: <Target className="w-12 h-12" />,
            keywords: [
                // English keywords
                "investment", "analysis", "investment analysis", "stocks", "portfolio", "trading", "market",
                "research", "evaluation", "assessment", "review", "study", "examination", "inspection",
                "performance", "returns", "profit", "loss", "risk", "volatility", "diversification", "allocation",
                "technical analysis", "fundamental analysis", "chart", "pattern", "trend", "indicator",
                // Thai keywords
                "การลงทุน", "การวิเคราะห์", "การวิเคราะห์การลงทุน", "หุ้น", "พอร์ตโฟลิโอ", "การซื้อขาย", "ตลาด",
                "การวิจัย", "การประเมิน", "การประเมินค่า", "การทบทวน", "การศึกษา", "การตรวจสอบ", "การตรวจ",
                "ผลการดำเนินงาน", "ผลตอบแทน", "กำไร", "ขาดทุน", "ความเสี่ยง", "ความผันผวน", "การกระจายความเสี่ยง", "การจัดสรร",
                "การวิเคราะห์ทางเทคนิค", "การวิเคราะห์พื้นฐาน", "กราฟ", "รูปแบบ", "แนวโน้ม", "ตัวชี้วัด"
            ], 
            category: "investment", 
            description: {
                th: "วิเคราะห์และปรับปรุงการลงทุนของคุณ",
                en: "Analyze and improve your investments"
            }
        },
        { 
            id: 8, 
            name: {
                th: "การวางแผนการเกษียณ",
                en: "Retirement Planning"
            },
            icon: <TrendingUp className="w-12 h-12" />,
            keywords: [
                // English keywords
                "retirement", "retirement planning", "pension", "401k", "ira", "roth ira", "social security",
                "annuity", "retirement savings", "retirement income", "withdrawal", "required minimum distribution",
                "rmd", "early retirement", "retirement age", "benefits", "retirement calculator", "retirement goals",
                "retirement lifestyle", "retirement budget", "golden years", "nest egg", "financial independence",
                // Thai keywords
                "การเกษียณ", "การวางแผนการเกษียณ", "กองทุนสำรองเลี้ยงชีพ", "401k", "ira", "roth ira", "ประกันสังคม",
                "เงินรายปี", "การออมเพื่อการเกษียณ", "รายได้การเกษียณ", "การถอนเงิน", "การแจกจ่ายขั้นต่ำที่จำเป็น",
                "การเกษียณก่อนกำหนด", "อายุเกษียณ", "สวัสดิการ", "เครื่องคิดเลขการเกษียณ", "เป้าหมายการเกษียณ",
                "ไลฟ์สไตล์การเกษียณ", "งบประมาณการเกษียณ", "ปีทอง", "กองทุนสำรอง", "อิสรภาพทางการเงิน"
            ], 
            category: "investment", 
            description: {
                th: "วางแผนการเกษียณและอนาคตทางการเงิน",
                en: "Plan for retirement and financial future"
            }
        },
        { 
            id: 9, 
            name: {
                th: "การซื้อบ้าน",
                en: "Home Buying"
            },
            icon: <Home className="w-12 h-12" />,
            keywords: [
                // English keywords
                "home buying", "real estate", "house hunting", "mortgage", "home loan", "down payment", "closing costs",
                "property value", "appraisal", "inspection", "home inspection", "title search", "escrow", "closing",
                "real estate agent", "realtor", "broker", "listing", "mls", "open house", "showing", "offer",
                "counter offer", "negotiation", "contract", "purchase agreement", "contingency", "financing contingency",
                "home warranty", "property tax", "homeowners insurance", "hoa", "homeowners association", "maintenance",
                // Thai keywords
                "การซื้อบ้าน", "อสังหาริมทรัพย์", "การหาบ้าน", "จำนอง", "เงินกู้บ้าน", "เงินดาวน์", "ค่าธรรมเนียมปิด",
                "มูลค่าทรัพย์สิน", "การประเมิน", "การตรวจสอบ", "การตรวจสอบบ้าน", "การค้นหาสิทธิ์", "การฝากเงิน", "การปิด",
                "นายหน้าอสังหาริมทรัพย์", "รายการขาย", "บ้านเปิด", "การแสดง", "ข้อเสนอ", "การต่อรอง", "สัญญา", "ข้อตกลงซื้อ",
                "การรับประกันบ้าน", "ภาษีทรัพย์สิน", "ประกันบ้าน", "สมาคมเจ้าของบ้าน", "การบำรุงรักษา"
            ], 
            category: "investment", 
            description: {
                th: "วางแผนและจัดการการซื้อบ้าน",
                en: "Plan and manage home buying process"
            }
        },
        { 
            id: 10, 
            name: {
                th: "การจัดการบัตรเครดิต",
                en: "Credit Card Management"
            },
            icon: <CreditCard className="w-12 h-12" />,
            keywords: [
                // English keywords
                "credit card", "credit", "card management", "credit management", "payment", "billing", "statement",
                "balance", "limit", "interest", "apr", "annual fee", "rewards", "cashback", "points", "miles",
                "credit score", "credit history", "credit report", "debt", "debt management", "payoff", "minimum payment",
                "due date", "late fee", "over limit", "credit utilization", "credit monitoring", "fraud protection",
                "card security", "pin", "cvv", "expiry", "replacement", "lost card", "stolen card", "dispute",
                // Thai keywords
                "บัตรเครดิต", "เครดิต", "การจัดการบัตร", "การจัดการเครดิต", "การชำระเงิน", "การเรียกเก็บเงิน", "ใบแจ้งยอด",
                "ยอดคงเหลือ", "วงเงิน", "ดอกเบี้ย", "อัตราดอกเบี้ย", "ค่าธรรมเนียมรายปี", "รางวัล", "เงินคืน", "คะแนน", "ไมล์",
                "คะแนนเครดิต", "ประวัติเครดิต", "รายงานเครดิต", "หนี้", "การจัดการหนี้", "การชำระหนี้", "การชำระขั้นต่ำ",
                "วันครบกำหนด", "ค่าปรับล่าช้า", "เกินวงเงิน", "การใช้เครดิต", "การตรวจสอบเครดิต", "การป้องกันการฉ้อโกง",
                "ความปลอดภัยบัตร", "รหัสผ่าน", "รหัสความปลอดภัย", "วันหมดอายุ", "การเปลี่ยน", "บัตรหาย", "บัตรถูกขโมย", "การโต้แย้ง"
            ], 
            category: "credit", 
            description: {
                th: "จัดการบัตรเครดิตและหนี้สินอย่างมีประสิทธิภาพ",
                en: "Manage credit cards and debt efficiently"
            }
        },
        { 
            id: 11, 
            name: {
                th: "การจัดการหนี้",
                en: "Debt Management"
            },
            icon: <AlertCircle className="w-12 h-12" />,
            keywords: [
                // English keywords
                "debt", "debt management", "debt consolidation", "debt settlement", "debt payoff", "debt reduction",
                "credit card debt", "personal loan", "student loan", "mortgage", "auto loan", "payday loan",
                "debt snowball", "debt avalanche", "minimum payment", "extra payment", "debt free", "debt free journey",
                "debt to income ratio", "debt to equity ratio", "debt service", "debt capacity", "debt ceiling",
                "debt restructuring", "debt forgiveness", "bankruptcy", "foreclosure", "repossession", "default",
                // Thai keywords
                "หนี้", "การจัดการหนี้", "การรวมหนี้", "การชำระหนี้", "การลดหนี้", "หนี้บัตรเครดิต", "เงินกู้ส่วนตัว",
                "เงินกู้นักเรียน", "จำนอง", "เงินกู้อรถ", "เงินกู้ด่วน", "การชำระหนี้แบบหิมะ", "การชำระหนี้แบบน้ำตก",
                "การชำระขั้นต่ำ", "การชำระเพิ่ม", "ปลอดหนี้", "การเดินทางปลอดหนี้", "อัตราส่วนหนี้ต่อรายได้",
                "การปรับโครงสร้างหนี้", "การยกเลิกหนี้", "การล้มละลาย", "การยึดทรัพย์", "การเรียกคืน", "การผิดนัด"
            ], 
            category: "credit", 
            description: {
                th: "จัดการและลดหนี้สินอย่างเป็นระบบ",
                en: "Manage and reduce debt systematically"
            }
        },
        { 
            id: 12, 
            name: {
                th: "การติดตามคะแนนเครดิต",
                en: "Credit Score Monitoring"
            },
            icon: <Star className="w-12 h-12" />,
            keywords: [
                // English keywords
                "credit score", "credit monitoring", "credit report", "credit history", "fico score", "vantage score",
                "credit bureau", "equifax", "experian", "transunion", "credit check", "credit inquiry", "hard inquiry",
                "soft inquiry", "credit utilization", "payment history", "length of credit", "credit mix", "new credit",
                "credit improvement", "credit repair", "credit building", "credit monitoring service", "credit alert",
                "credit freeze", "credit lock", "identity theft", "fraud alert", "credit dispute", "credit correction",
                // Thai keywords
                "คะแนนเครดิต", "การตรวจสอบเครดิต", "รายงานเครดิต", "ประวัติเครดิต", "คะแนนฟิโก", "คะแนนแวนเทจ",
                "สำนักงานเครดิต", "อีควิแฟกซ์", "เอ็กซ์เพอเรียน", "ทรานส์ยูเนียน", "การตรวจสอบเครดิต", "การสอบถามเครดิต",
                "การสอบถามแบบแข็ง", "การสอบถามแบบนุ่ม", "การใช้เครดิต", "ประวัติการชำระ", "ระยะเวลาการใช้เครดิต",
                "การผสมผสานเครดิต", "เครดิตใหม่", "การปรับปรุงเครดิต", "การซ่อมแซมเครดิต", "การสร้างเครดิต",
                "บริการตรวจสอบเครดิต", "การแจ้งเตือนเครดิต", "การแช่แข็งเครดิต", "การล็อคเครดิต", "การขโมยตัวตน",
                "การแจ้งเตือนการฉ้อโกง", "การโต้แย้งเครดิต", "การแก้ไขเครดิต"
            ], 
            category: "credit", 
            description: {
                th: "ติดตามและปรับปรุงคะแนนเครดิต",
                en: "Monitor and improve credit score"
            }
        },
        { 
            id: 13, 
            name: {
                th: "การจัดการเงินกู้",
                en: "Loan Management"
            },
            icon: <Home className="w-12 h-12" />,
            keywords: [
                // English keywords
                "loan", "loan management", "personal loan", "home loan", "auto loan", "student loan", "business loan",
                "mortgage", "refinancing", "loan consolidation", "loan application", "loan approval", "loan terms",
                "interest rate", "apr", "principal", "monthly payment", "loan balance", "payoff amount", "amortization",
                "loan calculator", "loan comparison", "loan pre-approval", "loan pre-qualification", "loan officer",
                "lender", "borrower", "cosigner", "guarantor", "collateral", "down payment", "closing costs",
                // Thai keywords
                "เงินกู้", "การจัดการเงินกู้", "เงินกู้ส่วนตัว", "เงินกู้บ้าน", "เงินกู้อรถ", "เงินกู้นักเรียน", "เงินกู้ธุรกิจ",
                "จำนอง", "การรีไฟแนนซ์", "การรวมเงินกู้", "การสมัครเงินกู้", "การอนุมัติเงินกู้", "เงื่อนไขเงินกู้",
                "อัตราดอกเบี้ย", "เงินต้น", "การชำระรายเดือน", "ยอดเงินกู้คงเหลือ", "จำนวนเงินชำระ", "การคำนวณการชำระคืน",
                "เครื่องคิดเลขเงินกู้", "การเปรียบเทียบเงินกู้", "การอนุมัติล่วงหน้า", "การประเมินล่วงหน้า", "เจ้าหน้าที่เงินกู้",
                "ผู้ให้กู้", "ผู้กู้", "ผู้ค้ำประกัน", "ผู้รับประกัน", "หลักประกัน", "เงินดาวน์", "ค่าธรรมเนียมปิด"
            ], 
            category: "credit", 
            description: {
                th: "จัดการและติดตามเงินกู้ทั้งหมด",
                en: "Manage and track all loans"
            }
        },
        { 
            id: 14, 
            name: {
                th: "การออมและเป้าหมาย",
                en: "Savings & Goals"
            },
            icon: <PiggyBank className="w-12 h-12" />,
            keywords: [
                // English keywords
                "savings", "goals", "savings goals", "goal setting", "targets", "planning", "objectives", "savings account",
                "deposit", "deposits", "saving money", "high yield", "interest rate", "compound interest", "automatic savings",
                "direct deposit", "money market", "certificate of deposit", "cd", "savings bond", "treasury bond", "government bond",
                "savings plan", "budget", "expense tracking", "spending", "frugal", "thrifty", "money management", "milestone",
                // Thai keywords
                "การออม", "เป้าหมาย", "เป้าหมายการออม", "การตั้งเป้าหมาย", "จุดหมาย", "การวางแผน", "วัตถุประสงค์", "บัญชีออมทรัพย์",
                "เงินฝาก", "การฝากเงิน", "การออมเงิน", "ผลตอบแทนสูง", "อัตราดอกเบี้ย", "ดอกเบี้ยทบต้น", "การออมอัตโนมัติ",
                "การโอนเงินโดยตรง", "ตลาดเงิน", "ใบรับรองเงินฝาก", "พันธบัตรออมทรัพย์", "พันธบัตรรัฐบาล", "แผนการออม",
                "งบประมาณ", "การติดตามรายจ่าย", "การใช้จ่าย", "ประหยัด", "การจัดการเงิน", "หมุดหมาย"
            ], 
            category: "savings", 
            description: {
                th: "ตั้งเป้าหมายและจัดการการออมเงิน",
                en: "Set goals and manage savings"
            }
        },
        { 
            id: 15, 
            name: {
                th: "กองทุนฉุกเฉิน",
                en: "Emergency Fund"
            },
            icon: <Shield className="w-12 h-12" />,
            keywords: [
                // English keywords
                "emergency fund", "emergency savings", "rainy day fund", "financial cushion", "safety net", "reserve fund",
                "unexpected expenses", "financial emergency", "job loss", "medical emergency", "car repair", "home repair",
                "emergency expenses", "contingency fund", "liquid savings", "cash reserve", "financial security", "peace of mind",
                "3 months expenses", "6 months expenses", "emergency planning", "financial preparedness", "crisis fund",
                // Thai keywords
                "กองทุนฉุกเฉิน", "การออมฉุกเฉิน", "กองทุนสำรอง", "เบาะรองทางการเงิน", "ตาข่ายความปลอดภัย", "กองทุนสำรอง",
                "ค่าใช้จ่ายที่ไม่คาดคิด", "เหตุฉุกเฉินทางการเงิน", "การตกงาน", "เหตุฉุกเฉินทางการแพทย์", "การซ่อมรถ", "การซ่อมบ้าน",
                "ค่าใช้จ่ายฉุกเฉิน", "กองทุนฉุกเฉิน", "การออมสภาพคล่อง", "เงินสดสำรอง", "ความปลอดภัยทางการเงิน", "ความสงบใจ",
                "ค่าใช้จ่าย 3 เดือน", "ค่าใช้จ่าย 6 เดือน", "การวางแผนฉุกเฉิน", "ความพร้อมทางการเงิน", "กองทุนวิกฤต"
            ], 
            category: "savings", 
            description: {
                th: "สร้างกองทุนฉุกเฉินเพื่อความมั่นคงทางการเงิน",
                en: "Build emergency fund for financial security"
            }
        },
        { 
            id: 16, 
            name: {
                th: "กองทุนการศึกษา",
                en: "Education Fund"
            },
            icon: <GraduationCap className="w-12 h-12" />,
            keywords: [
                // English keywords
                "education fund", "college fund", "529 plan", "education savings", "tuition", "college tuition",
                "university", "higher education", "student loan", "fafsa", "financial aid", "scholarship", "grant",
                "pell grant", "work study", "student debt", "loan forgiveness", "public service loan forgiveness",
                "income driven repayment", "deferment", "forbearance", "cosigner", "parent plus loan", "private loan",
                "education planning", "college planning", "university planning", "career planning", "major selection",
                // Thai keywords
                "กองทุนการศึกษา", "กองทุนมหาวิทยาลัย", "การออมเพื่อการศึกษา", "ค่าเล่าเรียน", "ค่าเล่าเรียนมหาวิทยาลัย",
                "มหาวิทยาลัย", "การศึกษาระดับสูง", "เงินกู้นักเรียน", "ความช่วยเหลือทางการเงิน", "ทุนการศึกษา", "เงินช่วยเหลือ",
                "ทุนเพลล์", "งานเรียน", "หนี้นักเรียน", "การยกเลิกหนี้", "การชำระหนี้ตามรายได้", "การเลื่อนการชำระ",
                "การผ่อนผัน", "ผู้ค้ำประกัน", "เงินกู้ผู้ปกครอง", "เงินกู้ส่วนตัว", "การวางแผนการศึกษา", "การวางแผนมหาวิทยาลัย",
                "การวางแผนอาชีพ", "การเลือกสาขา"
            ], 
            category: "savings", 
            description: {
                th: "วางแผนและออมเงินเพื่อการศึกษาของบุตร",
                en: "Plan and save for children's education"
            }
        },
        { 
            id: 17, 
            name: {
                th: "การประกันภัย",
                en: "Insurance Management"
            },
            icon: <Heart className="w-12 h-12" />,
            keywords: [
                // English keywords
                "insurance", "insurance management", "life insurance", "health insurance", "auto insurance", "home insurance",
                "property insurance", "disability insurance", "long term care", "annuity", "premium", "deductible",
                "coverage", "policy", "claim", "beneficiary", "term life", "whole life", "universal life",
                "medicare", "medicaid", "cobra", "hsa", "fsa", "insurance agent", "broker", "underwriter",
                "risk assessment", "actuarial", "actuary", "mortality", "morbidity", "insurance company", "carrier",
                // Thai keywords
                "ประกันภัย", "การจัดการประกัน", "ประกันชีวิต", "ประกันสุขภาพ", "ประกันรถยนต์", "ประกันบ้าน",
                "ประกันทรัพย์สิน", "ประกันทุพพลภาพ", "การดูแลระยะยาว", "เงินรายปี", "เบี้ยประกัน", "ค่าลดหย่อน",
                "ความคุ้มครอง", "กรมธรรม์", "การเรียกร้อง", "ผู้รับผลประโยชน์", "ประกันชีวิตระยะสั้น", "ประกันชีวิตตลอดชีพ",
                "ประกันชีวิตแบบยืดหยุ่น", "ประกันสังคม", "การประเมินความเสี่ยง", "นักคณิตศาสตร์ประกันภัย", "บริษัทประกัน"
            ], 
            category: "savings", 
            description: {
                th: "จัดการและติดตามการประกันภัยครอบครัว",
                en: "Manage and track family insurance coverage"
            }
        },
        { 
            id: 18, 
            name: {
                th: "การเงินสำหรับเยาวชน",
                en: "Youth Financial Education"
            },
            icon: <GraduationCap className="w-12 h-12" />,
            keywords: [
                // English keywords
                "youth finance", "children finance", "kids money", "financial education", "money management", "allowance",
                "savings for kids", "piggy bank", "first bank account", "financial literacy", "money skills", "budgeting for kids",
                "teaching money", "financial responsibility", "spending wisely", "saving habits", "earning money", "chores for money",
                "financial goals", "money values", "delayed gratification", "needs vs wants", "financial independence", "money mindset",
                "investment basics", "compound interest", "financial planning", "money management skills", "financial awareness",
                // Thai keywords
                "การเงินเยาวชน", "การเงินเด็ก", "เงินเด็ก", "การศึกษาเงิน", "การจัดการเงิน", "เงินค่าขนม",
                "การออมสำหรับเด็ก", "กระปุกออมสิน", "บัญชีธนาคารแรก", "ความรู้ทางการเงิน", "ทักษะเงิน", "การทำงบประมาณสำหรับเด็ก",
                "การสอนเงิน", "ความรับผิดชอบทางการเงิน", "การใช้จ่ายอย่างฉลาด", "นิสัยการออม", "การหาเงิน", "งานบ้านเพื่อเงิน",
                "เป้าหมายทางการเงิน", "ค่านิยมเงิน", "การรอคอย", "ความต้องการ vs ความต้องการ", "อิสรภาพทางการเงิน", "ความคิดเรื่องเงิน",
                "พื้นฐานการลงทุน", "ดอกเบี้ยทบต้น", "การวางแผนทางการเงิน", "ทักษะการจัดการเงิน", "ความตระหนักทางการเงิน"
            ], 
            category: "savings", 
            description: {
                th: "สอนและพัฒนาทักษะทางการเงินให้กับเยาวชน",
                en: "Teach and develop financial skills for youth"
            }
        }
    ]

    // Language toggle function
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th')
    }

    // Theme toggle function
    const toggleTheme = () => {
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
    }

    // Apply initial dark mode state on mount
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    // Get unique categories with comprehensive search keywords
    const categories = [
        { 
            id: 'all', 
            name: { th: 'ทั้งหมด', en: 'All' },
            keywords: ['all', 'ทั้งหมด', 'everything', 'ทุกอย่าง', 'complete', 'ทั้งหมด', 'comprehensive', 'ครบถ้วน'],
            color: 'gray'
        },
        { 
            id: 'finance', 
            name: { th: 'การเงิน', en: 'Finance' },
            keywords: [
                'finance', 'financial', 'การเงิน', 'money', 'budget', 'budgeting', 'expense', 'expenses', 'income', 'revenue',
                'cash flow', 'liquidity', 'family planning', 'financial planning', 'family financial planning',
                'budget management', 'expense tracking', 'financial calculator', 'tax management', 'tax planning',
                'financial management', 'accounting', 'bookkeeping', 'analysis', 'valuation', 'assessment',
                'family budget', 'household budget', 'monthly budget', 'annual budget', 'spending', 'allocation',
                'daily expenses', 'monthly expenses', 'receipts', 'transactions', 'categorization', 'monitoring'
            ],
            color: 'blue'
        },
        { 
            id: 'investment', 
            name: { th: 'การลงทุน', en: 'Investment' },
            keywords: [
                'investment', 'investing', 'การลงทุน', 'invest', 'portfolio', 'stocks', 'trading', 'securities',
                'bonds', 'mutual funds', 'etf', 'index funds', 'hedge funds', 'private equity', 'venture capital',
                'real estate', 'property', 'commodities', 'gold', 'silver', 'oil', 'crypto', 'cryptocurrency',
                'bitcoin', 'ethereum', 'blockchain', 'diversification', 'asset allocation', 'rebalancing',
                'risk management', 'volatility', 'returns', 'yield', 'dividend', 'capital gains', 'roi', 'irr',
                'wealth management', 'asset management', 'investment analysis', 'retirement planning', 'home buying',
                'wealth', 'assets', 'holdings', 'investment calculator', 'retirement calculator', 'home loan', 'mortgage'
            ],
            color: 'green'
        },
        { 
            id: 'credit', 
            name: { th: 'เครดิต', en: 'Credit' },
            keywords: [
                'credit', 'เครดิต', 'debt', 'payment', 'score', 'card', 'loan', 'borrowing', 'lending',
                'interest', 'apr', 'principal', 'collateral', 'guarantee', 'cosigner', 'credit history',
                'credit report', 'credit monitoring', 'credit repair', 'debt consolidation', 'debt settlement',
                'bankruptcy', 'foreclosure', 'repossession', 'default', 'delinquency', 'collections',
                'credit utilization', 'credit limit', 'available credit', 'minimum payment', 'due date',
                'credit card management', 'debt management', 'credit score monitoring', 'loan management',
                'personal loan', 'home loan', 'auto loan', 'student loan', 'business loan', 'refinancing',
                'loan consolidation', 'loan application', 'loan approval', 'loan terms', 'monthly payment',
                'loan balance', 'payoff amount', 'amortization', 'loan calculator', 'loan comparison'
            ],
            color: 'purple'
        },
        { 
            id: 'savings', 
            name: { th: 'การออม', en: 'Savings' },
            keywords: [
                'savings', 'การออม', 'save', 'goals', 'money', 'store', 'deposit', 'account', 'bank',
                'emergency fund', 'rainy day', 'reserve', 'nest egg', 'retirement', 'pension', '401k', 'ira',
                'roth ira', 'annuity', 'social security', 'compound interest', 'high yield', 'cd', 'certificate',
                'money market', 'treasury', 'government bond', 'savings bond', 'automatic savings', 'direct deposit',
                'savings goals', 'goal setting', 'targets', 'planning', 'objectives', 'savings account',
                'education fund', 'college fund', '529 plan', 'education savings', 'tuition', 'financial aid',
                'youth finance', 'children finance', 'kids money', 'financial education', 'allowance',
                'piggy bank', 'first bank account', 'financial literacy', 'money skills', 'budgeting for kids',
                'teaching money', 'financial responsibility', 'spending wisely', 'saving habits', 'earning money'
            ],
            color: 'emerald'
        }
    ]

    
    /**
     * Enhanced fuzzy search algorithm with comprehensive matching
     */
    const fuzzyMatch = (str, pattern) => {
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
     * Get filtered cards based on search term and category with improved accuracy
     */
    const getFilteredCards = () => {
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
            const currentCategory = categories.find(cat => cat.id === card.category)
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
    }

    /**
     * Handle search input changes
     */
    const handleSearchChange = (value) => {
        setSearchTerm(value)
        
        // Debug: Log search results for testing
        if (value.trim().length > 0) {
            console.log('🔍 Search Debug:', {
                searchTerm: value,
                results: getFilteredCards().filter(card => card.hasMatch).map(card => ({
                    name: card.name[language],
                    score: card.matchScore,
                    bestMatch: card.bestMatch
                }))
            })
        }
    }

    /**
     * Handle search submission
     */
    const handleSearch = (term = searchTerm) => {
        if (term.trim()) {
            setSearchTerm(term.trim())
        }
    }

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (focusedCardIndex >= 0) {
                // If a card is focused, click it
                const focusedCard = filteredCards[focusedCardIndex]
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
                prev < filteredCards.length - 1 ? prev + 1 : 0
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setFocusedCardIndex(prev => 
                prev > 0 ? prev - 1 : filteredCards.length - 1
            )
        } else if (e.key === 'Tab') {
            // Allow default tab behavior for category filters
            setFocusedCardIndex(-1)
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
        // Here you would typically navigate to card details
        alert(`${language === 'th' ? 'คลิกที่การ์ด:' : 'Clicked card:'} ${card.name[language]}`)
    }

    /**
     * Highlight search terms in text
     */
    const highlightText = (text, searchTerm) => {
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
     * Get smart search suggestions based on current input with enhanced intelligence
     */
    const getSearchSuggestions = () => {
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
        const categoryMatches = categories
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
    }
    
    /**
     * Get contextual suggestions based on search patterns
     */
    const getContextualSuggestions = (searchLower) => {
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
    }
    

    /**
     * Get popular search examples when no search term
     */
    const getPopularSearches = () => {
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
    }

    const filteredCards = getFilteredCards()

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
                    const suggestions = searchTerm.length >= 2 ? getSearchSuggestions() : []
                    const popularSearches = searchTerm.length < 2 ? getPopularSearches() : []
                    
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
                {categories.map((category) => (
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

export default SearchBar
