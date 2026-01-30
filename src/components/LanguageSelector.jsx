import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export default function LanguageSelector({ scrolled = false }) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border ${
          scrolled ? 'bg-blue-50 border-blue-200' : 'bg-white/10 border-white/20'
        }`}
        aria-label="Select language"
      >
        <Globe className={`h-6 w-6 ${scrolled ? 'text-blue-500' : 'text-white'}`} />
        <span className={`text-sm font-medium hidden sm:inline ${scrolled ? 'text-blue-500' : 'text-white'}`}>{currentLang.flag} {currentLang.name}</span>
        <span className={`text-sm font-medium sm:hidden ${scrolled ? 'text-blue-500' : 'text-white'}`}>{currentLang.flag}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                  i18n.language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}