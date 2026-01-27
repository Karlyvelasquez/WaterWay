import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Droplet, Users, GraduationCap, Building2, Database, Brain, ChevronDown, ExternalLink, FileText, MapPin, MessageCircle, BarChart3, Target, TrendingUp, Clock, CheckCircle, Code, Layers, Globe, Calendar, Quote, ArrowRight, AlertTriangle } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

export default function LandingPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="WaterWay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">{t('landing.title')}</h1>
                <p className="text-xs text-gray-600">{t('landing.forColombiaUruguay')}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#problema" className="text-gray-700 hover:text-primary-600 transition">{t('landing.nav.problem')}</a>
              <a href="#plataforma" className="text-gray-700 hover:text-primary-600 transition">{t('landing.nav.platform')}</a>
              <a href="#datos-abiertos" className="text-gray-700 hover:text-primary-600 transition">{t('landing.nav.openData')}</a>
              <a href="#roles" className="text-gray-700 hover:text-primary-600 transition">{t('landing.nav.access')}</a>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{t('landing.forColombiaUruguay')} | {t('landing.climateActionLatam')}</span>
              </div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('landing.hero.titlePart1')} <span className="text-gradient">{t('landing.hero.titlePart2')}</span>
            </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#roles" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-water-DEFAULT to-primary-500 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t('landing.hero.cta')}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </a>
                <a 
                  href="https://example.com/waterway-guia.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-primary-500 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-all duration-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t('landing.guideButton')}
                </a>
                <a 
                  href="https://example.com/waterway-investigacion.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-all duration-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t('landing.dataButton')}
                </a>
              </div>
            </div>
            <div className="relative animate-float">
              <img src="/logo.png" alt="WaterWay" className="w-full max-w-md mx-auto drop-shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-water-light/20 to-green-light/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* El Problema Section */}
      <section id="problema" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.problem.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.problem.text')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StatCard 
              number="40%" 
              label={t('landing.problem.stat1')}
              source="Banco Mundial, 2023"
              color="red"
              t={t}
            />
            <StatCard 
              number="70%" 
              label={t('landing.problem.stat2')}
              source="FAO, 2024"
              color="orange"
              t={t}
            />
            <StatCard 
              number="2050" 
              label={t('landing.problem.stat3')}
              source="CEPAL, 2023"
              color="yellow"
              t={t}
            />
          </div>
        </div>
      </section>

      {/* Plataforma Section */}
      <section id="plataforma" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.platform.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.platform.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">{t('landing.platform.mainFeatures')}</h3>
              <div className="space-y-4">
                <FeatureItem 
                  icon={<Brain className="h-6 w-6" />}
                  title={t('landing.platform.features.ai.title')}
                  description={t('landing.platform.features.ai.description')}
                />
                <FeatureItem 
                  icon={<Database className="h-6 w-6" />}
                  title={t('landing.platform.features.openData.title')}
                  description={t('landing.platform.features.openData.description')}
                />
                <FeatureItem 
                  icon={<Users className="h-6 w-6" />}
                  title={t('landing.platform.features.participation.title')}
                  description={t('landing.platform.features.participation.description')}
                />
                <FeatureItem 
                  icon={<Droplet className="h-6 w-6" />}
                  title={t('landing.platform.features.scalable.title')}
                  description={t('landing.platform.features.scalable.description')}
                />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 text-white shadow-2xl">
              <h4 className="text-2xl font-bold mb-6">{t('landing.platform.keyComponents')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-lg p-2 mr-3 flex-shrink-0">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block">{t('landing.platform.components.analysis.title')}</strong>
                    <span className="text-sm text-blue-100">{t('landing.platform.components.analysis.description')}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-lg p-2 mr-3 flex-shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block">{t('landing.platform.components.chatbots.title')}</strong>
                    <span className="text-sm text-blue-100">{t('landing.platform.components.chatbots.description')}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-lg p-2 mr-3 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block">{t('landing.platform.components.reports.title')}</strong>
                    <span className="text-sm text-blue-100">{t('landing.platform.components.reports.description')}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 rounded-lg p-2 mr-3 flex-shrink-0">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="block">{t('landing.platform.components.footprint.title')}</strong>
                    <span className="text-sm text-blue-100">{t('landing.platform.components.footprint.description')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contribución ODS Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">{t('landing.sdg.title')}</h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('landing.sdg.subtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-5xl font-bold mb-3">ODS 6</div>
                <p className="text-lg text-blue-100">{t('landing.sdg.sdg6')}</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-3">ODS 13</div>
                <p className="text-lg text-blue-100">{t('landing.sdg.sdg13')}</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-3">ODS 16</div>
                <p className="text-lg text-blue-100">{t('landing.sdg.sdg16')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.useCases.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.useCases.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <UseCaseCard
              title={t('landing.useCases.student.name')}
              role={t('landing.useCases.student.role')}
              scenario={t('landing.useCases.student.scenario')}
              impact={t('landing.useCases.student.impact')}
              icon={<GraduationCap className="h-8 w-8" />}
              color="blue"
              t={t}
            />
            <UseCaseCard
              title={t('landing.useCases.citizen.name')}
              role={t('landing.useCases.citizen.role')}
              scenario={t('landing.useCases.citizen.scenario')}
              impact={t('landing.useCases.citizen.impact')}
              icon={<Users className="h-8 w-8" />}
              color="green"
              t={t}
            />
            <UseCaseCard
              title={t('landing.useCases.government.name')}
              role={t('landing.useCases.government.role')}
              scenario={t('landing.useCases.government.scenario')}
              impact={t('landing.useCases.government.impact')}
              icon={<Building2 className="h-8 w-8" />}
              color="purple"
              t={t}
            />
          </div>
        </div>
      </section>

      {/* Por Qué Ahora Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-12">
              <Calendar className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">{t('landing.urgency.title')}</h2>
              <p className="text-xl text-gray-600">
                {t('landing.urgency.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('landing.urgency.recentEvents')}</h3>
                <ul className="space-y-4">
                  <UrgencyItem
                    title={t('landing.urgency.events.uruguay.title')}
                    description={t('landing.urgency.events.uruguay.description')}
                  />
                  <UrgencyItem
                    title={t('landing.urgency.events.colombia.title')}
                    description={t('landing.urgency.events.colombia.description')}
                  />
                  <UrgencyItem
                    title={t('landing.urgency.events.extreme.title')}
                    description={t('landing.urgency.events.extreme.description')}
                  />
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('landing.urgency.commitments')}</h3>
                <ul className="space-y-4">
                  <UrgencyItem
                    title={t('landing.urgency.international.ndc.title')}
                    description={t('landing.urgency.international.ndc.description')}
                  />
                  <UrgencyItem
                    title={t('landing.urgency.international.sdg.title')}
                    description={t('landing.urgency.international.sdg.description')}
                  />
                  <UrgencyItem
                    title={t('landing.urgency.international.paris.title')}
                    description={t('landing.urgency.international.paris.description')}
                  />
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 text-center">
              <p className="text-lg font-semibold text-gray-800">
                <strong>{t('landing.urgency.moment')}</strong> {t('landing.urgency.momentText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Datos Abiertos Section */}
      <section id="datos-abiertos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-t-4 border-green-500">
            <div className="flex items-center mb-8">
              <Database className="h-12 w-12 text-green-600 mr-4" />
              <h2 className="text-4xl font-bold">{t('landing.openData.title')}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('landing.openData.transparent')}</h3>
                <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: t('landing.openData.transparentText') }} />
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>{t('landing.openData.dataTypes.climate')}</li>
                  <li>{t('landing.openData.dataTypes.consumption')}</li>
                  <li>{t('landing.openData.dataTypes.reports')}</li>
                  <li>{t('landing.openData.dataTypes.projections')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('landing.openData.reusable')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('landing.openData.reusableText')}
                </p>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>{t('landing.openData.standards.international')}</li>
                  <li>{t('landing.openData.standards.apis')}</li>
                  <li>{t('landing.openData.standards.datasets')}</li>
                  <li>{t('landing.openData.standards.documentation')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
              <p className="text-center text-lg font-medium text-gray-800">
                <strong>{t('landing.openData.privacy')}</strong> {t('landing.openData.privacyText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('landing.roles.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('landing.roles.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard
              icon={<GraduationCap className="h-12 w-12" />}
              title={t('landing.studentRole')}
              description={t('landing.studentDesc')}
              features={[
                t('student.cycle.title'),
                t('student.assistant.title'),
                t('student.footprint.title'),
                t('student.tabs.home')
              ]}
              color="blue"
              onClick={() => navigate('/estudiante')}
              t={t}
            />
            <RoleCard
              icon={<Users className="h-12 w-12" />}
              title={t('landing.citizenRole')}
              description={t('landing.citizenDesc')}
              features={[
                t('citizen.report.title'),
                t('citizen.map.title'),
                t('citizen.tabs.home'),
                t('citizen.tabs.assistant')
              ]}
              color="green"
              onClick={() => navigate('/ciudadano')}
              t={t}
            />
            <RoleCard
              icon={<Building2 className="h-12 w-12" />}
              title={t('landing.governmentRole')}
              description={t('landing.governmentDesc')}
              features={[
                t('government.tabs.dashboard'),
                t('government.tabs.consumption'),
                t('government.tabs.projections'),
                t('government.tabs.data')
              ]}
              color="purple"
              onClick={() => navigate('/gubernamental')}
              t={t}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-green-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('landing.cta.text')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#roles" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              {t('landing.cta.explore')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <Code className="mr-2 h-5 w-5" />
              {t('landing.cta.sourceCode')}
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <CheckCircle className="h-8 w-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">{t('landing.cta.features.openSource.title')}</h3>
              <p className="text-sm opacity-90">{t('landing.cta.features.openSource.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <CheckCircle className="h-8 w-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">{t('landing.cta.features.publicData.title')}</h3>
              <p className="text-sm opacity-90">{t('landing.cta.features.publicData.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <CheckCircle className="h-8 w-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">{t('landing.cta.features.collaborative.title')}</h3>
              <p className="text-sm opacity-90">{t('landing.cta.features.collaborative.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="WaterWay" className="h-10 w-auto" />
                <span className="font-bold text-xl">{t('landing.title')}</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('landing.footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.project')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#problema" className="hover:text-white transition">{t('landing.nav.problem')}</a></li>
                <li><a href="#plataforma" className="hover:text-white transition">{t('landing.nav.platform')}</a></li>
                <li><a href="#datos-abiertos" className="hover:text-white transition">{t('landing.nav.openData')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.organizedBy')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Open Data Charter</li>
                <li>AGESIC (Uruguay)</li>
                <li>MINTIC (Colombia)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.funding')}</h4>
              <p className="text-sm text-gray-400 mb-4">Patrick J. McGovern Foundation</p>
              <div className="space-y-2">
                <a 
                  href="https://example.com/waterway-guia.pdf"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('landing.guideButton')}
                </a>
                <a 
                  href="https://example.com/waterway-investigacion.pdf"
                  className="inline-flex items-center text-sm text-green-400 hover:text-green-300 transition block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('landing.dataButton')}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>{t('landing.footer.copyright')}</p>
            <p className="mt-2">{t('landing.footer.developed')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component: StatCard
function StatCard({ number, label, source, color, t }) {
  const colorClasses = {
    red: 'from-red-500 to-orange-500',
    orange: 'from-orange-500 to-yellow-500',
    yellow: 'from-yellow-500 to-green-500',
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300">
      <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {number}
      </div>
      <p className="text-gray-700 font-medium mb-3">{label}</p>
      <p className="text-xs text-gray-500 italic">{t('landing.problem.source')}: {source}</p>
    </div>
  )
}

// Component: FeatureItem
function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition">
      <div className="bg-blue-100 text-blue-600 rounded-lg p-3">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

// Component: RoleCard
function RoleCard({ icon, title, description, features, color, onClick, t }) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      border: 'border-blue-500',
      hover: 'hover:shadow-blue-500/50',
    },
    green: {
      bg: 'from-green-500 to-green-600',
      border: 'border-green-500',
      hover: 'hover:shadow-green-500/50',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      border: 'border-purple-500',
      hover: 'hover:shadow-purple-500/50',
    },
  }

  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl p-8 border-t-4 ${colorClasses[color].border} cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl ${colorClasses[color].hover} transition-all duration-300`}
      onClick={onClick}
    >
      <div className={`inline-block bg-gradient-to-r ${colorClasses[color].bg} text-white rounded-xl p-4 mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-500 mr-2 font-bold">•</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 bg-gradient-to-r ${colorClasses[color].bg} text-white font-semibold rounded-lg hover:opacity-90 transition`}>
        {t('landing.roles.accessAs')} {title}
      </button>
    </div>
  )
}

// Component: UseCaseCard
function UseCaseCard({ title, role, scenario, impact, icon, color, t }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
      <div className={`inline-block bg-gradient-to-r ${colorClasses[color]} text-white rounded-xl p-3 mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-4">
        {role}
      </span>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-500 mb-2">{t('landing.useCases.scenarioLabel')}</h4>
          <p className="text-gray-700 text-sm">{scenario}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-500 mb-2">{t('landing.useCases.impactLabel')}</h4>
          <p className="text-gray-700 text-sm font-medium">{impact}</p>
        </div>
      </div>
    </div>
  )
}

// Component: UrgencyItem
function UrgencyItem({ title, description }) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <TrendingUp className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}