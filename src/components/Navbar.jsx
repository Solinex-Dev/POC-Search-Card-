import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';

function Navbar() {
    const { language, toggleLanguage, isThai } = useLanguage();
    const t = translations[language];

    return (
        <nav className="w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand/Logo Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {t.navbar.brandName}
                            </h1>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-4">
                        {/* Export Button */}
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t.navbar.export}
                        </button>

                        {/* Language Switcher */}
                        <div className="relative">
                            <button 
                                onClick={toggleLanguage}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                <span className={`font-medium ${isThai ? 'text-blue-600' : 'text-gray-600'}`}>
                                    {t.navbar.language.th}
                                </span>
                                <span className="text-gray-400 mx-1">{t.navbar.language.separator}</span>
                                <span className={`${isThai ? 'text-gray-600' : 'text-blue-600 font-medium'}`}>
                                    {t.navbar.language.en}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;