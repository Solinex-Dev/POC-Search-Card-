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
                th: "การจัดการความมั่งคั่ง",
                en: "Wealth Management"
            },
            icon: <DollarSign className="w-12 h-12" />,
            keywords: [
                // English keywords
                "wealth", "management", "wealth management", "portfolio", "investment", "finance", "financial", 
                "money", "budget", "expense", "income", "assets", "capital", "funds", "savings", "planning",
                "strategy", "advisor", "advisory", "consulting", "planning", "retirement", "estate",
                // Thai keywords
                "ความมั่งคั่ง", "การจัดการ", "การจัดการความมั่งคั่ง", "พอร์ตโฟลิโอ", "การลงทุน", "การเงิน", 
                "เงิน", "งบประมาณ", "รายจ่าย", "รายได้", "ทรัพย์สิน", "ทุน", "กองทุน", "การออม", "การวางแผน",
                "กลยุทธ์", "ที่ปรึกษา", "การให้คำปรึกษา", "การวางแผน", "การเกษียณ", "มรดก"
            ], 
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
            icon: <BarChart3 className="w-12 h-12" />,
            keywords: [
                // English keywords
                "planning", "financial planning", "financial", "plan", "future", "strategy", "budget", 
                "budgeting", "forecast", "projection", "roadmap", "blueprint", "schedule", "timeline",
                "goals", "objectives", "targets", "milestones", "roadmap", "framework", "methodology",
                // Thai keywords
                "การวางแผน", "การวางแผนทางการเงิน", "การเงิน", "แผน", "อนาคต", "กลยุทธ์", "งบประมาณ", 
                "การทำงบประมาณ", "การคาดการณ์", "การคาดคะเน", "แผนงาน", "โครงร่าง", "ตารางเวลา", "ไทม์ไลน์",
                "เป้าหมาย", "วัตถุประสงค์", "จุดหมาย", "หมุดหมาย", "แผนงาน", "กรอบงาน", "ระเบียบวิธี"
            ], 
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
            icon: <Building className="w-12 h-12" />,
            keywords: [
                // English keywords
                "assets", "tracking", "asset tracking", "property", "monitoring", "inventory", "portfolio",
                "holdings", "investments", "valuables", "possessions", "belongings", "equity", "ownership",
                "real estate", "stocks", "bonds", "mutual funds", "etf", "crypto", "gold", "silver",
                // Thai keywords
                "ทรัพย์สิน", "การติดตาม", "การติดตามทรัพย์สิน", "อสังหาริมทรัพย์", "การตรวจสอบ", "สินค้าคงคลัง", "พอร์ตโฟลิโอ",
                "การถือครอง", "การลงทุน", "ของมีค่า", "ทรัพย์สมบัติ", "ของใช้", "หุ้น", "กรรมสิทธิ์",
                "อสังหาริมทรัพย์", "หุ้น", "พันธบัตร", "กองทุนรวม", "กองทุน", "คริปโต", "ทอง", "เงิน"
            ], 
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
            icon: <PieChart className="w-12 h-12" />,
            keywords: [
                // English keywords
                "goals", "goal setting", "targets", "planning", "objectives", "savings", "target",
                "aim", "purpose", "mission", "vision", "ambition", "aspiration", "dream", "wish",
                "financial goals", "savings goals", "investment goals", "retirement goals", "education goals",
                "milestone", "benchmark", "kpi", "metric", "measurement", "tracking", "monitoring",
                // Thai keywords
                "เป้าหมาย", "การตั้งเป้าหมาย", "จุดหมาย", "การวางแผน", "วัตถุประสงค์", "การออม", "เป้า",
                "จุดมุ่งหมาย", "จุดประสงค์", "ภารกิจ", "วิสัยทัศน์", "ความทะเยอทะยาน", "ความปรารถนา", "ความฝัน", "ความหวัง",
                "เป้าหมายทางการเงิน", "เป้าหมายการออม", "เป้าหมายการลงทุน", "เป้าหมายการเกษียณ", "เป้าหมายการศึกษา",
                "หมุดหมาย", "เกณฑ์มาตรฐาน", "ตัวชี้วัด", "เมตริก", "การวัด", "การติดตาม", "การตรวจสอบ"
            ], 
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
            icon: <TrendingUp className="w-12 h-12" />,
            keywords: [
                // English keywords
                "reports", "analysis", "reports and analysis", "data", "insights", "statistics", "analytics",
                "dashboard", "metrics", "kpi", "performance", "summary", "overview", "review", "audit",
                "financial reports", "monthly reports", "quarterly reports", "annual reports", "statements",
                "charts", "graphs", "visualization", "trends", "patterns", "forecasting", "prediction",
                "business intelligence", "data analysis", "reporting", "documentation", "record keeping",
                // Thai keywords
                "รายงาน", "การวิเคราะห์", "รายงานและการวิเคราะห์", "ข้อมูล", "ข้อมูลเชิงลึก", "สถิติ", "การวิเคราะห์",
                "แดชบอร์ด", "เมตริก", "ตัวชี้วัด", "ผลการดำเนินงาน", "สรุป", "ภาพรวม", "การทบทวน", "การตรวจสอบ",
                "รายงานทางการเงิน", "รายงานรายเดือน", "รายงานรายไตรมาส", "รายงานรายปี", "งบการเงิน",
                "แผนภูมิ", "กราฟ", "การแสดงภาพ", "แนวโน้ม", "รูปแบบ", "การคาดการณ์", "การทำนาย",
                "ธุรกิจอัจฉริยะ", "การวิเคราะห์ข้อมูล", "การรายงาน", "การจัดทำเอกสาร", "การเก็บบันทึก"
            ], 
            category: "savings", 
            description: {
                th: "สร้างรายงานทางการเงินที่ละเอียด",
                en: "Create detailed financial reports"
            }
        },
        { 
            id: 7, 
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
            id: 8, 
            name: {
                th: "การออมเงิน",
                en: "Savings Management"
            },
            icon: <PiggyBank className="w-12 h-12" />,
            keywords: [
                // English keywords
                "savings", "savings account", "deposit", "deposits", "saving money", "emergency fund", "rainy day fund",
                "high yield", "interest rate", "compound interest", "savings goal", "automatic savings", "direct deposit",
                "money market", "certificate of deposit", "cd", "savings bond", "treasury bond", "government bond",
                "retirement savings", "401k", "ira", "roth ira", "pension", "annuity", "social security",
                "savings plan", "budget", "expense tracking", "spending", "frugal", "thrifty", "money management",
                // Thai keywords
                "การออม", "บัญชีออมทรัพย์", "เงินฝาก", "การฝากเงิน", "การออมเงิน", "กองทุนฉุกเฉิน", "กองทุนสำรอง",
                "ผลตอบแทนสูง", "อัตราดอกเบี้ย", "ดอกเบี้ยทบต้น", "เป้าหมายการออม", "การออมอัตโนมัติ", "การโอนเงินโดยตรง",
                "ตลาดเงิน", "ใบรับรองเงินฝาก", "พันธบัตรออมทรัพย์", "พันธบัตรรัฐบาล", "การออมเพื่อการเกษียณ", "กองทุนสำรองเลี้ยงชีพ",
                "แผนการออม", "งบประมาณ", "การติดตามรายจ่าย", "การใช้จ่าย", "ประหยัด", "การจัดการเงิน"
            ], 
            category: "savings", 
            description: {
                th: "วางแผนและจัดการการออมเงินอย่างเป็นระบบ",
                en: "Plan and manage savings systematically"
            }
        },
        { 
            id: 9, 
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
            id: 10, 
            name: {
                th: "การประกันภัย",
                en: "Insurance Management"
            },
            icon: <Shield className="w-12 h-12" />,
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
            category: "finance", 
            description: {
                th: "จัดการและติดตามการประกันภัยครอบครัว",
                en: "Manage and track family insurance coverage"
            }
        },
        { 
            id: 11, 
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
            id: 12, 
            name: {
                th: "การวางแผนครอบครัว",
                en: "Family Planning"
            },
            icon: <Users className="w-12 h-12" />,
            keywords: [
                // English keywords
                "family planning", "family financial planning", "household budget", "family budget", "children", "kids",
                "education fund", "college fund", "529 plan", "education savings", "childcare", "daycare", "nanny",
                "family expenses", "household expenses", "family income", "dual income", "single parent", "stay at home",
                "family goals", "family values", "inheritance", "estate planning", "will", "trust", "power of attorney",
                "guardianship", "family meeting", "financial education", "teaching kids", "allowance", "chores",
                // Thai keywords
                "การวางแผนครอบครัว", "การวางแผนทางการเงินครอบครัว", "งบประมาณครอบครัว", "งบประมาณบ้าน", "ลูก", "เด็ก",
                "กองทุนการศึกษา", "การออมเพื่อการศึกษา", "ค่าเลี้ยงดู", "พี่เลี้ยง", "ค่าใช้จ่ายครอบครัว", "รายได้ครอบครัว",
                "รายได้คู่", "พ่อแม่เลี้ยงเดี่ยว", "อยู่บ้าน", "เป้าหมายครอบครัว", "ค่านิยมครอบครัว", "มรดก", "การวางแผนมรดก",
                "พินัยกรรม", "ทรัสต์", "หนังสือมอบอำนาจ", "การปกครอง", "การประชุมครอบครัว", "การเงินศึกษา", "การสอนเด็ก", "เงินค่าขนม", "งานบ้าน"
            ], 
            category: "finance", 
            description: {
                th: "วางแผนทางการเงินสำหรับครอบครัวและอนาคต",
                en: "Plan finances for family and future"
            }
        },
        { 
            id: 13, 
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
            id: 14, 
            name: {
                th: "การซื้อรถ",
                en: "Car Buying"
            },
            icon: <Car className="w-12 h-12" />,
            keywords: [
                // English keywords
                "car buying", "auto purchase", "vehicle", "car loan", "auto loan", "financing", "lease", "leasing",
                "down payment", "monthly payment", "interest rate", "apr", "credit score", "pre approval", "trade in",
                "depreciation", "car value", "kbb", "kelley blue book", "nada", "car insurance", "auto insurance",
                "registration", "title", "dmv", "emissions", "inspection", "warranty", "extended warranty", "maintenance",
                "car dealer", "dealership", "private sale", "certified pre owned", "cpo", "new car", "used car",
                // Thai keywords
                "การซื้อรถ", "การซื้อรถยนต์", "ยานพาหนะ", "เงินกู้อรถ", "การเงิน", "การเช่า", "เงินดาวน์", "การชำระรายเดือน",
                "อัตราดอกเบี้ย", "คะแนนเครดิต", "การอนุมัติล่วงหน้า", "การแลก", "การเสื่อมค่า", "มูลค่ารถ", "ประกันรถยนต์",
                "การขึ้นทะเบียน", "ใบรับรอง", "การตรวจสอบ", "การรับประกัน", "การบำรุงรักษา", "ตัวแทนจำหน่ายรถ", "การขายส่วนตัว",
                "รถมือสองรับประกัน", "รถใหม่", "รถมือสอง"
            ], 
            category: "finance", 
            description: {
                th: "วางแผนการซื้อรถและจัดการค่าใช้จ่าย",
                en: "Plan car purchase and manage expenses"
            }
        },
        { 
            id: 15, 
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
            id: 16, 
            name: {
                th: "การวางแผนอาชีพ",
                en: "Career Planning"
            },
            icon: <Briefcase className="w-12 h-12" />,
            keywords: [
                // English keywords
                "career planning", "career development", "job search", "resume", "cv", "cover letter", "interview",
                "networking", "professional development", "skills", "training", "certification", "degree", "education",
                "salary negotiation", "benefits", "retirement planning", "pension", "401k", "employer match",
                "career change", "job transition", "freelancing", "consulting", "entrepreneurship", "business",
                "side hustle", "passive income", "multiple income streams", "work life balance", "remote work",
                // Thai keywords
                "การวางแผนอาชีพ", "การพัฒนาอาชีพ", "การหางาน", "เรซูเม่", "จดหมายสมัครงาน", "การสัมภาษณ์", "การสร้างเครือข่าย",
                "การพัฒนาวิชาชีพ", "ทักษะ", "การฝึกอบรม", "ใบรับรอง", "ปริญญา", "การศึกษา", "การต่อรองเงินเดือน", "สวัสดิการ",
                "การวางแผนการเกษียณ", "กองทุนสำรองเลี้ยงชีพ", "การเปลี่ยนอาชีพ", "การเปลี่ยนงาน", "การทำงานอิสระ", "การให้คำปรึกษา",
                "การเป็นผู้ประกอบการ", "ธุรกิจ", "งานเสริม", "รายได้แบบพาสซีฟ", "รายได้หลายทาง", "สมดุลงานชีวิต", "การทำงานทางไกล"
            ], 
            category: "finance", 
            description: {
                th: "วางแผนอาชีพและพัฒนาทักษะทางการเงิน",
                en: "Plan career and develop financial skills"
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
                'finance', 'financial', 'การเงิน', 'money', 'budget', 'expense', 'income', 'revenue', 'profit', 'loss',
                'cash flow', 'liquidity', 'solvency', 'leverage', 'equity', 'debt', 'capital', 'funds', 'assets',
                'liabilities', 'balance sheet', 'income statement', 'cash flow statement', 'financial planning',
                'financial management', 'accounting', 'bookkeeping', 'auditing', 'compliance', 'reporting',
                'analysis', 'valuation', 'appraisal', 'assessment', 'evaluation', 'review', 'audit'
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
                'risk management', 'volatility', 'returns', 'yield', 'dividend', 'capital gains', 'roi', 'irr'
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
                'credit utilization', 'credit limit', 'available credit', 'minimum payment', 'due date'
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
                'money market', 'treasury', 'government bond', 'savings bond', 'automatic savings', 'direct deposit'
            ],
            color: 'emerald'
        },
        { 
            id: 'insurance', 
            name: { th: 'ประกันภัย', en: 'Insurance' },
            keywords: [
                'insurance', 'ประกันภัย', 'coverage', 'policy', 'premium', 'deductible', 'claim', 'beneficiary',
                'life insurance', 'health insurance', 'auto insurance', 'home insurance', 'property insurance',
                'disability insurance', 'long term care', 'medicare', 'medicaid', 'cobra', 'hsa', 'fsa',
                'term life', 'whole life', 'universal life', 'annuity', 'risk assessment', 'actuarial'
            ],
            color: 'red'
        },
        { 
            id: 'tax', 
            name: { th: 'ภาษี', en: 'Tax' },
            keywords: [
                'tax', 'ภาษี', 'taxation', 'income tax', 'property tax', 'sales tax', 'capital gains',
                'tax deduction', 'tax credit', 'tax refund', 'tax bracket', 'marginal tax', 'effective tax rate',
                'tax planning', 'tax preparation', 'tax filing', 'w2', '1099', 'schedule a', 'schedule b',
                'itemized deduction', 'standard deduction', 'exemption', 'dependent', 'filing status'
            ],
            color: 'yellow'
        },
        { 
            id: 'retirement', 
            name: { th: 'การเกษียณ', en: 'Retirement' },
            keywords: [
                'retirement', 'การเกษียณ', 'pension', '401k', 'ira', 'roth ira', 'social security',
                'annuity', 'retirement planning', 'retirement savings', 'retirement income', 'withdrawal',
                'required minimum distribution', 'rmd', 'early retirement', 'retirement age', 'benefits',
                'retirement calculator', 'retirement goals', 'retirement lifestyle', 'retirement budget'
            ],
            color: 'orange'
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
     * Get search suggestions based on current input
     */
    const getSearchSuggestions = () => {
        if (!searchTerm.trim() || searchTerm.length < 2) return []
        
        const suggestions = new Set()
        const searchLower = searchTerm.toLowerCase()
        
        // Add card names
        cards.forEach(card => {
            const name = card.name[language].toLowerCase()
            if (name.includes(searchLower)) {
                suggestions.add(card.name[language])
            }
        })
        
        // Add category names
        categories.forEach(category => {
            const name = category.name[language].toLowerCase()
            if (name.includes(searchLower)) {
                suggestions.add(category.name[language])
            }
        })
        
        // Enhanced popular keywords with comprehensive examples
        const popularKeywords = [
            // Card names (exact matches) - All 16 cards
            { th: 'การจัดการความมั่งคั่ง', en: 'Wealth Management' },
            { th: 'การวางแผนทางการเงิน', en: 'Financial Planning' },
            { th: 'การติดตามทรัพย์สิน', en: 'Asset Tracking' },
            { th: 'การวิเคราะห์การลงทุน', en: 'Investment Analysis' },
            { th: 'การตั้งเป้าหมาย', en: 'Goal Setting' },
            { th: 'รายงานและการวิเคราะห์', en: 'Reports and Analysis' },
            { th: 'การจัดการบัตรเครดิต', en: 'Credit Card Management' },
            { th: 'การออมเงิน', en: 'Savings Management' },
            { th: 'เครื่องคิดเลขทางการเงิน', en: 'Financial Calculator' },
            { th: 'การประกันภัย', en: 'Insurance Management' },
            { th: 'การจัดการภาษี', en: 'Tax Management' },
            { th: 'การวางแผนครอบครัว', en: 'Family Planning' },
            { th: 'การซื้อบ้าน', en: 'Home Buying' },
            { th: 'การซื้อรถ', en: 'Car Buying' },
            { th: 'กองทุนการศึกษา', en: 'Education Fund' },
            { th: 'การวางแผนอาชีพ', en: 'Career Planning' },
            
            // Core Financial Terms
            { th: 'การเงิน', en: 'finance' },
            { th: 'การลงทุน', en: 'investment' },
            { th: 'งบประมาณ', en: 'budget' },
            { th: 'เครดิต', en: 'credit' },
            { th: 'การออม', en: 'savings' },
            { th: 'พอร์ตโฟลิโอ', en: 'portfolio' },
            { th: 'หุ้น', en: 'stocks' },
            { th: 'พันธบัตร', en: 'bonds' },
            { th: 'กองทุน', en: 'funds' },
            { th: 'อสังหาริมทรัพย์', en: 'real estate' },
            { th: 'เงินออม', en: 'savings account' },
            { th: 'เงินฝาก', en: 'deposits' },
            { th: 'เงินกู้', en: 'loans' },
            { th: 'บัตรเครดิต', en: 'credit card' },
            { th: 'คะแนนเครดิต', en: 'credit score' },
            { th: 'การชำระเงิน', en: 'payments' },
            { th: 'ดอกเบี้ย', en: 'interest' },
            { th: 'ภาษี', en: 'tax' },
            { th: 'การเกษียณ', en: 'retirement' },
            { th: 'การศึกษาของบุตร', en: 'education fund' },
            { th: 'การประกัน', en: 'insurance' },
            
            // Advanced Financial Terms
            { th: 'การจัดการ', en: 'management' },
            { th: 'การวางแผน', en: 'planning' },
            { th: 'การติดตาม', en: 'tracking' },
            { th: 'การวิเคราะห์', en: 'analysis' },
            { th: 'การตั้งเป้า', en: 'goal setting' },
            { th: 'รายงาน', en: 'reports' },
            { th: 'ทรัพย์สิน', en: 'assets' },
            { th: 'การวิจัย', en: 'research' },
            { th: 'การประเมิน', en: 'evaluation' },
            { th: 'ผลตอบแทน', en: 'returns' },
            { th: 'ความเสี่ยง', en: 'risk' },
            { th: 'การกระจายความเสี่ยง', en: 'diversification' },
            { th: 'การจัดสรร', en: 'allocation' },
            { th: 'กราฟ', en: 'charts' },
            { th: 'แนวโน้ม', en: 'trends' },
            { th: 'การคาดการณ์', en: 'forecasting' },
            { th: 'แดชบอร์ด', en: 'dashboard' },
            { th: 'เมตริก', en: 'metrics' },
            { th: 'ตัวชี้วัด', en: 'kpi' },
            { th: 'ผลการดำเนินงาน', en: 'performance' },
            { th: 'สรุป', en: 'summary' },
            { th: 'ภาพรวม', en: 'overview' },
            { th: 'การทบทวน', en: 'review' },
            { th: 'การตรวจสอบ', en: 'audit' },
            { th: 'แผนภูมิ', en: 'graphs' },
            { th: 'การแสดงภาพ', en: 'visualization' },
            { th: 'รูปแบบ', en: 'patterns' },
            { th: 'การทำนาย', en: 'prediction' },
            { th: 'ธุรกิจอัจฉริยะ', en: 'business intelligence' },
            { th: 'การวิเคราะห์ข้อมูล', en: 'data analysis' },
            { th: 'การรายงาน', en: 'reporting' },
            { th: 'การจัดทำเอกสาร', en: 'documentation' },
            { th: 'การเก็บบันทึก', en: 'record keeping' },
            
            // Specific Financial Products
            { th: 'กองทุนรวม', en: 'mutual funds' },
            { th: 'กองทุน etf', en: 'etf' },
            { th: 'กองทุนดัชนี', en: 'index funds' },
            { th: 'กองทุนป้องกันความเสี่ยง', en: 'hedge funds' },
            { th: 'เงินทุนเอกชน', en: 'private equity' },
            { th: 'เงินทุนเสี่ยง', en: 'venture capital' },
            { th: 'สินค้าโภคภัณฑ์', en: 'commodities' },
            { th: 'ทอง', en: 'gold' },
            { th: 'เงิน', en: 'silver' },
            { th: 'น้ำมัน', en: 'oil' },
            { th: 'คริปโต', en: 'crypto' },
            { th: 'บิตคอยน์', en: 'bitcoin' },
            { th: 'อีเธอเรียม', en: 'ethereum' },
            { th: 'บล็อกเชน', en: 'blockchain' },
            
            // Banking Terms
            { th: 'ธนาคาร', en: 'bank' },
            { th: 'บัญชีเงินฝาก', en: 'checking account' },
            { th: 'บัญชีออมทรัพย์', en: 'savings account' },
            { th: 'บัญชีตลาดเงิน', en: 'money market account' },
            { th: 'ใบรับรองเงินฝาก', en: 'certificate of deposit' },
            { th: 'การโอนเงิน', en: 'transfer' },
            { th: 'การถอนเงิน', en: 'withdrawal' },
            { th: 'การฝากเงิน', en: 'deposit' },
            { th: 'ยอดคงเหลือ', en: 'balance' },
            { th: 'วงเงิน', en: 'credit limit' },
            { th: 'การอนุมัติ', en: 'approval' },
            { th: 'การปฏิเสธ', en: 'rejection' },
            
            // Insurance Terms
            { th: 'ประกันชีวิต', en: 'life insurance' },
            { th: 'ประกันสุขภาพ', en: 'health insurance' },
            { th: 'ประกันรถยนต์', en: 'auto insurance' },
            { th: 'ประกันบ้าน', en: 'home insurance' },
            { th: 'ประกันทรัพย์สิน', en: 'property insurance' },
            { th: 'ประกันทุพพลภาพ', en: 'disability insurance' },
            { th: 'การดูแลระยะยาว', en: 'long term care' },
            { th: 'เบี้ยประกัน', en: 'premium' },
            { th: 'ค่าลดหย่อน', en: 'deductible' },
            { th: 'ความคุ้มครอง', en: 'coverage' },
            { th: 'กรมธรรม์', en: 'policy' },
            { th: 'การเรียกร้อง', en: 'claim' },
            { th: 'ผู้รับผลประโยชน์', en: 'beneficiary' },
            
            // Tax Terms
            { th: 'ภาษีเงินได้', en: 'income tax' },
            { th: 'ภาษีทรัพย์สิน', en: 'property tax' },
            { th: 'ภาษีมูลค่าเพิ่ม', en: 'sales tax' },
            { th: 'กำไรจากการขาย', en: 'capital gains' },
            { th: 'การลดหย่อนภาษี', en: 'tax deduction' },
            { th: 'เครดิตภาษี', en: 'tax credit' },
            { th: 'เงินคืนภาษี', en: 'tax refund' },
            { th: 'ช่วงภาษี', en: 'tax bracket' },
            { th: 'ภาษีส่วนเพิ่ม', en: 'marginal tax' },
            { th: 'อัตราภาษีที่แท้จริง', en: 'effective tax rate' },
            { th: 'การวางแผนภาษี', en: 'tax planning' },
            { th: 'การเตรียมภาษี', en: 'tax preparation' },
            { th: 'การยื่นภาษี', en: 'tax filing' },
            
            // Retirement Terms
            { th: 'กองทุนสำรองเลี้ยงชีพ', en: 'pension' },
            { th: '401k', en: '401k' },
            { th: 'ira', en: 'ira' },
            { th: 'roth ira', en: 'roth ira' },
            { th: 'เงินรายปี', en: 'annuity' },
            { th: 'ประกันสังคม', en: 'social security' },
            { th: 'การวางแผนการเกษียณ', en: 'retirement planning' },
            { th: 'การออมเพื่อการเกษียณ', en: 'retirement savings' },
            { th: 'รายได้การเกษียณ', en: 'retirement income' },
            { th: 'การถอนเงิน', en: 'withdrawal' },
            { th: 'การแจกจ่ายขั้นต่ำที่จำเป็น', en: 'required minimum distribution' },
            { th: 'การเกษียณก่อนกำหนด', en: 'early retirement' },
            { th: 'อายุเกษียณ', en: 'retirement age' },
            { th: 'สวัสดิการ', en: 'benefits' },
            
            // Real Estate Terms
            { th: 'การซื้อบ้าน', en: 'home buying' },
            { th: 'การขายบ้าน', en: 'home selling' },
            { th: 'การจำนอง', en: 'mortgage' },
            { th: 'เงินกู้บ้าน', en: 'home loan' },
            { th: 'เงินดาวน์', en: 'down payment' },
            { th: 'ค่าธรรมเนียมปิด', en: 'closing costs' },
            { th: 'มูลค่าทรัพย์สิน', en: 'property value' },
            { th: 'การประเมิน', en: 'appraisal' },
            { th: 'การตรวจสอบบ้าน', en: 'home inspection' },
            { th: 'การค้นหาสิทธิ์', en: 'title search' },
            { th: 'การฝากเงิน', en: 'escrow' },
            { th: 'การปิด', en: 'closing' },
            { th: 'นายหน้าอสังหาริมทรัพย์', en: 'real estate agent' },
            { th: 'นายหน้า', en: 'realtor' },
            { th: 'นายหน้า', en: 'broker' },
            { th: 'รายการขาย', en: 'listing' },
            { th: 'บ้านเปิด', en: 'open house' },
            { th: 'การแสดง', en: 'showing' },
            { th: 'ข้อเสนอ', en: 'offer' },
            { th: 'การต่อรอง', en: 'negotiation' },
            { th: 'สัญญา', en: 'contract' },
            { th: 'ข้อตกลงซื้อ', en: 'purchase agreement' },
            { th: 'เงื่อนไข', en: 'contingency' },
            { th: 'การรับประกันบ้าน', en: 'home warranty' },
            { th: 'สมาคมเจ้าของบ้าน', en: 'homeowners association' },
            { th: 'การบำรุงรักษา', en: 'maintenance' }
        ]
        
        popularKeywords.forEach(keyword => {
            const keywordText = keyword[language].toLowerCase()
            if (keywordText.includes(searchLower)) {
                suggestions.add(keyword[language])
            }
        })
        
        return Array.from(suggestions).slice(0, 8)
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

                {/* Search Suggestions Dropdown */}
                {showSuggestions && (() => {
                    const suggestions = searchTerm.length >= 2 ? getSearchSuggestions() : []
                    const popularSearches = searchTerm.length < 2 ? getPopularSearches() : []
                    
                    return (suggestions.length > 0 || popularSearches.length > 0) && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                            <div className="py-2">
                                {/* Show suggestions when typing */}
                                {suggestions.length > 0 && (
                                    <>
                                        <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            {language === 'th' ? 'คำแนะนำ' : 'Suggestions'}
                                        </div>
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSearchTerm(suggestion)
                                                    setShowSuggestions(false)
                                                    inputRef.current?.focus()
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                {highlightText(suggestion, searchTerm)}
                                            </button>
                                        ))}
                                    </>
                                )}
                                
                                {/* Show popular searches when not typing */}
                                {popularSearches.length > 0 && searchTerm.length < 2 && (
                                    <>
                                        <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
