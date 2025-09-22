/**
 * Financial service cards data
 * Separated for better code splitting and maintainability
 */

import React from 'react'
import { 
    Users, BarChart3, PieChart, Calculator, FileText, DollarSign, 
    Target, TrendingUp, Home, CreditCard, AlertCircle, Star, 
    PiggyBank, Shield, GraduationCap, Heart 
} from 'lucide-react'

export const financialCards = [
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

export const categories = [
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