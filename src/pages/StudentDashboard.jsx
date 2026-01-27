import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Home, MessageCircle, Droplet, BookOpen, ChevronLeft, ExternalLink, Newspaper, Bell, TrendingUp, X, Globe, MousePointer2, Cloud, CloudRain, Mountain, Zap, Waves, AlertCircle, Calculator, Lightbulb, Smartphone, HelpCircle, GraduationCapIcon } from 'lucide-react'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('inicio')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showCountryModal, setShowCountryModal] = useState(true)

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountryModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Modal de selección de país */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-slide-up">
            <div className="text-center mb-8">
              <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">¡Bienvenido a WaterWay Educación!</h2>
              <p className="text-gray-600">Selecciona tu país para personalizar tu experiencia</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleCountrySelect('colombia')}
                className="group bg-gradient-to-br from-yellow-400 to-blue-600 p-8 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-white text-center">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Colombia</h3>
                  <p className="text-sm opacity-90">Contenido adaptado para Colombia</p>
                </div>
              </button>
              
              <button
                onClick={() => handleCountrySelect('uruguay')}
                className="group bg-gradient-to-br from-sky-400 to-blue-800 p-8 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-white text-center">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Uruguay</h3>
                  <p className="text-sm opacity-90">Contenido adaptado para Uruguay</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Volver
              </button>
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="WaterWay" className="h-10 w-auto" />
                <div>
                  <h1 className="text-xl font-bold text-gradient">WaterWay Educación</h1>
                  <p className="text-xs text-gray-600">Portal Estudiante</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {selectedCountry && (
                <button
                  onClick={() => setShowCountryModal(true)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  <span>{selectedCountry === 'colombia' ? '🇨🇴' : '🇺🇾'}</span>
                  <span className="text-gray-700">Cambiar país</span>
                </button>
              )}
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Estudiante</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <TabButton
              icon={<Home className="h-5 w-5" />}
              label="Inicio"
              active={activeTab === 'inicio'}
              onClick={() => setActiveTab('inicio')}
            />
            <TabButton
              icon={<Droplet className="h-5 w-5" />}
              label="Ciclo del Agua"
              active={activeTab === 'ciclo'}
              onClick={() => setActiveTab('ciclo')}
            />
            <TabButton
              icon={<BookOpen className="h-5 w-5" />}
              label="Mi Huella Hídrica"
              active={activeTab === 'huella'}
              onClick={() => setActiveTab('huella')}
            />
            <TabButton
              icon={<MessageCircle className="h-5 w-5" />}
              label="Asistente de IA"
              active={activeTab === 'chatbot'}
              onClick={() => setActiveTab('chatbot')}
            />
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && <InicioTab selectedCountry={selectedCountry} />}
        {activeTab === 'ciclo' && <CicloTab />}
        {activeTab === 'huella' && <HuellaTab />}
        {activeTab === 'chatbot' && <ChatbotTab />}
      </main>   
    </div>
  )
}

function TabButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
        active
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function InicioTab({ selectedCountry }) {
  const countryData = {
    colombia: {
      flag: '🇨🇴',
      name: 'Colombia',
      welcome: 'Bienvenido al portal educativo de WaterWay Colombia',
      stats: [
        { label: 'Disponibilidad hídrica', value: '58,000 m³/hab/año', color: 'blue' },
        { label: 'Población con acceso', value: '91%', color: 'green' },
        { label: 'Principales cuencas', value: '5 grandes', color: 'purple' }
      ],
      news: [
        {
          title: 'Sequía en La Guajira',
          description: 'Autoridades activan plan de contingencia ante bajos niveles en embalses',
          date: 'Hace 2 días',
          type: 'Alerta'
        },
        {
          title: 'Nueva planta potabilizadora',
          description: 'Bogotá inaugura planta que mejorará acceso al agua en 500 mil hogares',
          date: 'Hace 5 días',
          type: 'Buenas noticias'
        },
        {
          title: 'Programa educativo',
          description: 'MINTIC lanza programa de educación sobre uso responsable del agua',
          date: 'Hace 1 semana',
          type: 'Educación'
        }
      ],
      resources: [
        { name: 'IDEAM - Instituto de Hidrología', url: 'http://www.ideam.gov.co', description: 'Datos meteorológicos y recursos hídricos' },
        { name: 'Ministerio de Ambiente', url: 'https://www.minambiente.gov.co', description: 'Políticas ambientales y agua' },
        { name: 'Acueducto de Bogotá', url: 'https://www.acueducto.com.co', description: 'Información sobre el sistema de agua en Bogotá' },
        { name: 'Datos Abiertos Colombia', url: 'https://www.datos.gov.co', description: 'Portal de datos abiertos del gobierno' }
      ],
      facts: [
        'Colombia tiene el 50% de los páramos del mundo, ecosistemas vitales para el agua',
        'El río Magdalena es la arteria fluvial más importante del país',
        'Bogotá obtiene el 70% de su agua del sistema Chingaza'
      ]
    },
    uruguay: {
      flag: '🇺🇾',
      name: 'Uruguay',
      welcome: 'Bienvenido al portal educativo de WaterWay Uruguay',
      stats: [
        { label: 'Disponibilidad hídrica', value: '40,000 m³/hab/año', color: 'blue' },
        { label: 'Población con acceso', value: '97%', color: 'green' },
        { label: 'Cuencas hidrográficas', value: '3 principales', color: 'purple' }
      ],
      news: [
        {
          title: 'Mejora en niveles de embalses',
          description: 'Lluvias recientes elevan reservas de agua en 15% respecto al año pasado',
          date: 'Hace 1 día',
          type: 'Buenas noticias'
        },
        {
          title: 'Plan de contingencia hídrica',
          description: 'Gobierno presenta estrategia para prevenir crisis como la de 2023',
          date: 'Hace 4 días',
          type: 'Política pública'
        },
        {
          title: 'Educación sobre agua',
          description: 'OSE lanza campaña educativa en escuelas sobre uso eficiente del agua',
          date: 'Hace 1 semana',
          type: 'Educación'
        }
      ],
      resources: [
        { name: 'OSE - Obras Sanitarias del Estado', url: 'https://www.ose.com.uy', description: 'Proveedor nacional de agua potable' },
        { name: 'MVOTMA - Ambiente', url: 'https://www.gub.uy/ministerio-ambiente', description: 'Ministerio de Ambiente' },
        { name: 'INUMET', url: 'https://www.inumet.gub.uy', description: 'Instituto Uruguayo de Meteorología' },
        { name: 'Datos Abiertos Uruguay', url: 'https://catalogodatos.gub.uy', description: 'Portal de datos abiertos del gobierno' }
      ],
      facts: [
        'Uruguay fue el primer país de América Latina en declarar el acceso al agua como derecho humano',
        'El 60% del agua potable proviene de ríos y el 40% de acuíferos',
        'Montevideo consume el 60% del agua potabilizada del país'
      ]
    }
  }

  const data = selectedCountry ? countryData[selectedCountry] : null

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Selecciona tu país para comenzar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Banner de bienvenida */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center mb-4">
          <span className="text-5xl mr-4">{data.flag}</span>
          <div>
            <h2 className="text-3xl font-bold">{data.welcome}</h2>
            <p className="text-lg opacity-90 mt-2">
              Explora información personalizada sobre el agua en {data.name}
            </p>
          </div>
        </div>
      </div>

      {/* Estadísticas del país */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Novedades */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-2xl font-bold">Novedades sobre el agua en {data.name}</h3>
        </div>
        <div className="space-y-4">
          {data.news.map((item, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Newspaper className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <span className="ml-auto text-xs text-gray-500">{item.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Datos curiosos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-2xl font-bold">Datos curiosos sobre {data.name}</h3>
        </div>
        <div className="space-y-3">
          {data.facts.map((fact, index) => (
            <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <span className="text-green-600 font-bold mr-3 text-lg">•</span>
              <p className="text-gray-700">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recursos de interés */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <ExternalLink className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-2xl font-bold">Recursos de interés</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition group"
            >
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">
                  {resource.name}
                </h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function CicloTab() {
  const [selectedStage, setSelectedStage] = useState(1) // Empieza con Evaporación
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 0.5, y: 0.5 })
  }

  // Calcular transformación 3D basada en posición del mouse
  const getTransform = () => {
    if (!isHovering) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    const rotateX = (mousePosition.y - 0.5) * -10 // -5 a 5 grados
    const rotateY = (mousePosition.x - 0.5) * 10 // -5 a 5 grados
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }
  
  const stages = [
    {
      id: 1,
      name: 'Evaporación',
      description: 'El calor del sol hace que el agua de océanos, ríos y lagos se convierta en vapor de agua.',
      detail: 'El 86% de la evaporación global proviene de los océanos. La temperatura promedio debe ser superior a 20°C para una evaporación eficiente.',
      icon: '☀️',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      name: 'Transpiración',
      description: 'Las plantas liberan vapor de agua a través de sus hojas.',
      detail: 'Un árbol grande puede transpirar hasta 380 litros de agua por día. Este proceso representa el 10% del agua en la atmósfera.',
      icon: '🌳',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 3,
      name: 'Condensación',
      description: 'El vapor de agua se enfría y se convierte en pequeñas gotas que forman las nubes.',
      detail: 'Las nubes se forman cuando el vapor alcanza alturas donde la temperatura es menor a 0°C. Una nube puede pesar más de 500 toneladas.',
      icon: '☁️',
      color: 'from-slate-500 to-gray-700'
    },
    {
      id: 4,
      name: 'Precipitación',
      description: 'Las gotas de agua en las nubes se hacen más pesadas y caen como lluvia, nieve o granizo.',
      detail: 'La Tierra recibe aproximadamente 505,000 km³ de precipitación anual. Una gota de lluvia cae a una velocidad de 32 km/h.',
      icon: '🌧️',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 5,
      name: 'Infiltración',
      description: 'El agua se filtra en el suelo y recarga los acuíferos subterráneos.',
      detail: 'Los acuíferos almacenan el 30% del agua dulce del planeta. El agua puede permanecer bajo tierra desde días hasta miles de años.',
      icon: '🏔️',
      color: 'from-amber-600 to-orange-800'
    },
    {
      id: 6,
      name: 'Escorrentía',
      description: 'El agua fluye sobre la superficie de la tierra hacia ríos, lagos y océanos.',
      detail: 'La escorrentía transporta nutrientes y sedimentos. Los ríos del mundo descargan 40,000 km³ de agua al océano cada año.',
      icon: '🌊',
      color: 'from-blue-500 to-cyan-600'
    }
  ]

  const currentStage = stages.find(s => s.id === selectedStage)

  // Componentes de visualización específicos para cada etapa
  const EvaporacionViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-blue-300 to-blue-600 overflow-hidden">
      {/* Sol con rayos SVG */}
      <svg className="absolute top-8 right-12 w-32 h-32 animate-pulse" viewBox="0 0 100 100">
        {/* Núcleo del sol */}
        <circle cx="50" cy="50" r="20" fill="url(#sunGradient)" />
        <defs>
          <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
        {/* Rayos */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={50 + 35 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#FCD34D"
            strokeWidth="2"
            opacity="0.8"
          />
        ))}
      </svg>

      {/* Ondas de calor */}
      <div className="absolute top-32 right-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full opacity-60 animate-pulse mb-2"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Superficie del océano con SVG */}
      <svg className="absolute bottom-0 left-0 right-0 h-48" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Cuerpo de agua */}
        <path
          d="M0,50 Q300,30 600,50 T1200,50 L1200,200 L0,200 Z"
          fill="url(#oceanGradient)"
        />
        {/* Olas animadas */}
        {[...Array(3)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 400},60 Q${i * 400 + 100},50 ${i * 400 + 200},60 T${i * 400 + 400},60`}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* Partículas de vapor subiendo con SVG */}
      <div className="absolute bottom-40 left-0 right-0">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            className="absolute animate-float opacity-40"
            style={{
              left: `${5 + i * 6}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '4s'
            }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="8" fill="#E0F2FE" opacity="0.7" />
            <circle cx="10" cy="10" r="5" fill="#BAE6FD" opacity="0.5" />
          </svg>
        ))}
      </div>

      {/* Flechas vectoriales */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.2}s`, marginBottom: '-10px' }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <path
              d="M20,10 L20,30 M20,10 L15,15 M20,10 L25,15"
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
          </svg>
        ))}
      </div>

      {/* Panel de datos */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/50">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Temperatura</div>
        <div className="text-3xl font-bold text-orange-600 my-1">25°C+</div>
        <div className="text-xs text-gray-600">Evaporación activa</div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-orange-400 to-red-500 animate-pulse" />
        </div>
      </div>
    </div>
  )

  const TranspiracionViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-300 via-green-200 to-green-500 overflow-hidden">
      {/* Sol en el cielo */}
      <svg className="absolute top-4 right-8 w-20 h-20 opacity-80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="25" fill="#FCD34D" opacity="0.9" />
        <circle cx="50" cy="50" r="20" fill="#FBBF24" />
      </svg>

      {/* Árboles con SVG realista */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 35}%`,
              height: `${70 + i * 5}%`,
              width: '25%'
            }}
            viewBox="0 0 200 300"
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Tronco */}
            <rect x="85" y="180" width="30" height="120" fill="url(#trunkGradient)" rx="5" />
            <defs>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="50%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <radialGradient id={`foliageGradient${i}`}>
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </radialGradient>
            </defs>

            {/* Copa del árbol - círculos superpuestos */}
            <circle cx="100" cy="100" r="70" fill={`url(#foliageGradient${i})`} opacity="0.9" />
            <circle cx="70" cy="120" r="50" fill={`url(#foliageGradient${i})`} opacity="0.8" />
            <circle cx="130" cy="120" r="50" fill={`url(#foliageGradient${i})`} opacity="0.8" />
            <circle cx="100" cy="140" r="45" fill={`url(#foliageGradient${i})`} opacity="0.7" />

            {/* Vapor saliendo (partículas) */}
            {[...Array(8)].map((_, j) => (
              <circle
                key={j}
                cx={80 + (j % 3) * 20}
                cy={40 + j * 8}
                r="6"
                fill="#BAE6FD"
                opacity="0.6"
                className="animate-float"
                style={{
                  animationDelay: `${(i * 0.3) + (j * 0.15)}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </svg>
        ))}
      </div>

      {/* Sistema de raíces */}
      <svg className="absolute bottom-0 left-0 right-0 h-40" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="160" fill="url(#soilGradient)" />
        
        {/* Raíces */}
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${150 + i * 180},0 Q${160 + i * 180},60 ${150 + i * 180},120 Q${140 + i * 180},150 ${150 + i * 180},160`}
            stroke="#57534E"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
        ))}

        {/* Gotas de agua en el suelo */}
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={50 + i * 95}
            cy={60 + (i % 3) * 30}
            r="4"
            fill="#3B82F6"
            opacity="0.7"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </svg>

      {/* Panel de información */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/50">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Transpiración</div>
        <div className="text-3xl font-bold text-green-600 my-1">380L</div>
        <div className="text-xs text-gray-600">Litros por día/árbol</div>
        <div className="mt-2 flex items-center space-x-1">
          <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-green-400 to-emerald-600 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Flechas indicando transpiración */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            className="animate-bounce"
            style={{
              animationDelay: `${i * 0.3}s`,
              marginBottom: '-15px'
            }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path
              d="M15,8 L15,22 M15,8 L11,12 M15,8 L19,12"
              stroke="#10B981"
              strokeWidth="2.5"
              fill="none"
              opacity="0.7"
            />
          </svg>
        ))}
      </div>
    </div>
  )

  const CondensacionViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-indigo-900 via-sky-500 to-sky-200 overflow-hidden">
      {/* Vapor ascendiendo desde abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-40">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            className="absolute animate-float opacity-50"
            style={{
              left: `${i * 6.5}%`,
              bottom: '0',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '5s'
            }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <circle cx="15" cy="15" r="12" fill="#E0F2FE" opacity="0.8" />
            <circle cx="15" cy="15" r="8" fill="#BAE6FD" opacity="0.6" />
          </svg>
        ))}
      </div>

      {/* Nubes formándose - SVG realista */}
      <div className="absolute top-16 left-0 right-0">
        {[...Array(3)].map((_, i) => (
          <svg
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + i * 30}%`,
              top: `${i * 40}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '6s'
            }}
            width="200"
            height="100"
            viewBox="0 0 200 100"
          >
            <defs>
              <filter id={`cloudBlur${i}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
              <linearGradient id={`cloudGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#E5E7EB" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Forma de nube con múltiples círculos */}
            <ellipse cx="50" cy="60" rx="40" ry="30" fill={`url(#cloudGradient${i})`} filter={`url(#cloudBlur${i})`} />
            <ellipse cx="85" cy="55" rx="45" ry="35" fill={`url(#cloudGradient${i})`} filter={`url(#cloudBlur${i})`} />
            <ellipse cx="120" cy="60" rx="38" ry="28" fill={`url(#cloudGradient${i})`} filter={`url(#cloudBlur${i})`} />
            <ellipse cx="100" cy="70" rx="60" ry="25" fill={`url(#cloudGradient${i})`} filter={`url(#cloudBlur${i})`} />
            
            {/* Cristales de hielo dentro de la nube */}
            {[...Array(8)].map((_, j) => (
              <circle
                key={j}
                cx={60 + j * 10}
                cy={58 + (j % 2) * 8}
                r="2"
                fill="#DBEAFE"
                opacity="0.7"
                className="animate-pulse"
                style={{ animationDelay: `${j * 0.15}s` }}
              />
            ))}
          </svg>
        ))}
      </div>

      {/* Partículas de agua condensándose */}
      <div className="absolute top-1/3 left-0 right-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${5 + i * 4.5}%`,
              top: `${(i % 3) * 30}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15">
              <circle cx="7.5" cy="7.5" r="6" fill="#93C5FD" opacity="0.7" />
              <circle cx="7.5" cy="7.5" r="3" fill="#DBEAFE" opacity="0.9" />
            </svg>
          </div>
        ))}
      </div>

      {/* Indicador de temperatura fría */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-200">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Temperatura</div>
        <div className="text-3xl font-bold text-blue-600 my-1">0°C</div>
        <div className="text-xs text-gray-600">Condensación activa</div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-gradient-to-r from-blue-400 to-indigo-600 animate-pulse" />
        </div>
      </div>

      {/* Indicador de altitud */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-200">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Altitud</div>
        <div className="text-2xl font-bold text-indigo-600 my-1">2000m+</div>
        <div className="text-xs text-gray-600">Formación de nubes</div>
      </div>

      {/* Flechas de proceso */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-pulse">
          <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.5" strokeDasharray="5,5" />
          <text x="40" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" opacity="0.8">
            Vapor → Nube
          </text>
        </svg>
      </div>
    </div>
  )

  const PrecipitacionViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-700 via-slate-500 to-slate-300 overflow-hidden">
      {/* Nubes de tormenta con SVG */}
      <svg className="absolute top-0 left-0 right-0 h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="stormCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.85" />
          </linearGradient>
          <filter id="cloudShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Nubes superpuestas */}
        {[0, 300, 600, 900].map((x, i) => (
          <g key={i}>
            <ellipse cx={x + 50} cy="80" rx="90" ry="40" fill="url(#stormCloudGradient)" filter="url(#cloudShadow)" opacity="0.9" />
            <ellipse cx={x + 120} cy="70" rx="100" ry="45" fill="url(#stormCloudGradient)" filter="url(#cloudShadow)" opacity="0.9" />
            <ellipse cx={x + 190} cy="80" rx="85" ry="38" fill="url(#stormCloudGradient)" filter="url(#cloudShadow)" opacity="0.9" />
          </g>
        ))}
      </svg>

      {/* Lluvia intensa con líneas SVG */}
      <svg className="absolute top-24 left-0 right-0 bottom-24 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
        {[...Array(40)].map((_, i) => (
          <line
            key={i}
            x1={i * 30}
            y1={0 + (i % 3) * 20}
            x2={i * 30}
            y2={380 + (i % 3) * 20}
            stroke="#3B82F6"
            strokeWidth="2"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.05}s`, animationDuration: '0.8s' }}
          />
        ))}
        {/* Gotas adicionales */}
        {[...Array(30)].map((_, i) => (
          <ellipse
            key={`drop-${i}`}
            cx={20 + i * 38}
            cy={50 + (i % 5) * 70}
            rx="3"
            ry="8"
            fill="#60A5FA"
            opacity="0.7"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.08}s`, animationDuration: '0.6s' }}
          />
        ))}
      </svg>

      {/* Relámpagos con SVG */}
      <svg className="absolute top-16 right-1/4 w-24 h-40 animate-ping" style={{ animationDuration: '3s' }} viewBox="0 0 100 160">
        <defs>
          <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
        </defs>
        <path
          d="M50,0 L30,60 L50,60 L30,160 L80,70 L55,70 L75,0 Z"
          fill="url(#lightningGradient)"
          opacity="0.9"
        />
      </svg>

      {/* Suelo y charcos */}
      <svg className="absolute bottom-0 left-0 right-0 h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#14532D" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="120" fill="url(#groundGradient)" />
        
        {/* Charcos formándose */}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx={100 + i * 140}
            cy="90"
            rx="60"
            ry="15"
            fill="#3B82F6"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Salpicaduras */}
        {[...Array(12)].map((_, i) => (
          <circle
            key={`splash-${i}`}
            cx={80 + i * 95}
            cy={75 - (i % 3) * 10}
            r="3"
            fill="#60A5FA"
            opacity="0.8"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1s' }}
          />
        ))}
      </svg>

      {/* Paneles de información */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Velocidad</div>
        <div className="text-3xl font-bold text-blue-600 my-1">32 km/h</div>
        <div className="text-xs text-gray-600">Caída de gotas</div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-5/6 bg-gradient-to-r from-blue-400 to-blue-700" />
        </div>
      </div>

      <div className="absolute bottom-32 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Precipitación anual</div>
        <div className="text-2xl font-bold text-slate-700 my-1">505K km³</div>
        <div className="text-xs text-gray-600">A nivel global</div>
      </div>
    </div>
  )

  const InfiltracionViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-green-600 to-amber-900 overflow-hidden">
      {/* Superficie del suelo */}
      <svg className="absolute top-0 left-0 right-0 h-20" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="80" fill="url(#grassGradient)" />
        
        {/* Textura de hierba */}
        {[...Array(30)].map((_, i) => (
          <line
            key={i}
            x1={i * 40}
            y1="0"
            x2={i * 40 + 5}
            y2="-10"
            stroke="#22C55E"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Gotas de lluvia cayendo */}
      <div className="absolute top-0 left-0 right-0 h-24">
        {[...Array(10)].map((_, i) => (
          <svg
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1.2s'
            }}
            width="20"
            height="30"
            viewBox="0 0 20 30"
          >
            <ellipse cx="10" cy="15" rx="4" ry="10" fill="#3B82F6" opacity="0.7" />
          </svg>
        ))}
      </div>

      {/* Capas del suelo con SVG */}
      <svg className="absolute top-20 left-0 right-0 bottom-0" viewBox="0 0 1200 480" preserveAspectRatio="none">
        <defs>
          {/* Gradientes para cada capa */}
          <linearGradient id="topsoilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="subsoilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <linearGradient id="bedrockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#57534E" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
          <linearGradient id="aquiferGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>

        {/* Capa 1: Suelo superficial */}
        <rect x="0" y="0" width="1200" height="120" fill="url(#topsoilGradient)" opacity="0.9" />
        <text x="600" y="60" textAnchor="middle" fill="white" fontSize="16" fontWeight="600" opacity="0.8">
          Suelo Superficial
        </text>

        {/* Capa 2: Subsuelo */}
        <rect x="0" y="120" width="1200" height="120" fill="url(#subsoilGradient)" opacity="0.9" />
        <text x="600" y="180" textAnchor="middle" fill="white" fontSize="16" fontWeight="600" opacity="0.8">
          Subsuelo
        </text>

        {/* Capa 3: Roca madre */}
        <rect x="0" y="240" width="1200" height="120" fill="url(#bedrockGradient)" opacity="0.9" />
        <text x="600" y="300" textAnchor="middle" fill="white" fontSize="16" fontWeight="600" opacity="0.8">
          Roca Madre
        </text>

        {/* Capa 4: Acuífero */}
        <rect x="0" y="360" width="1200" height="120" fill="url(#aquiferGradient)" opacity="0.9" />
        <text x="600" y="420" textAnchor="middle" fill="white" fontSize="16" fontWeight="600" opacity="0.9">
          Acuífero Subterráneo
        </text>

        {/* Líneas divisorias */}
        <line x1="0" y1="120" x2="1200" y2="120" stroke="#000" strokeWidth="2" opacity="0.3" />
        <line x1="0" y1="240" x2="1200" y2="240" stroke="#000" strokeWidth="2" opacity="0.3" />
        <line x1="0" y1="360" x2="1200" y2="360" stroke="#000" strokeWidth="2" opacity="0.3" />

        {/* Gotas infiltrándose - animadas */}
        {[...Array(12)].map((_, i) => {
          const x = 100 + i * 95;
          return (
            <g key={i}>
              <circle cx={x} cy="40" r="5" fill="#3B82F6" opacity="0.7" className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
              <circle cx={x} cy="160" r="5" fill="#2563EB" opacity="0.7" className="animate-pulse" style={{ animationDelay: `${i * 0.15 + 0.5}s` }} />
              <circle cx={x} cy="280" r="4" fill="#1D4ED8" opacity="0.7" className="animate-pulse" style={{ animationDelay: `${i * 0.15 + 1}s` }} />
              <circle cx={x} cy="400" r="4" fill="#1E40AF" opacity="0.8" className="animate-pulse" style={{ animationDelay: `${i * 0.15 + 1.5}s` }} />
            </g>
          );
        })}

        {/* Flechas indicando movimiento descendente */}
        {[...Array(5)].map((_, i) => (
          <path
            key={`arrow-${i}`}
            d={`M${200 + i * 200},50 L${200 + i * 200},430`}
            stroke="#60A5FA"
            strokeWidth="3"
            fill="none"
            opacity="0.5"
            strokeDasharray="10,10"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* Paneles informativos */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-amber-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Agua dulce</div>
        <div className="text-3xl font-bold text-amber-700 my-1">30%</div>
        <div className="text-xs text-gray-600">Almacenada en acuíferos</div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-amber-500 to-amber-700" />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-blue-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tiempo residencia</div>
        <div className="text-2xl font-bold text-blue-700 my-1">Años-Siglos</div>
        <div className="text-xs text-gray-600">Agua subterránea</div>
      </div>
    </div>
  )

  const EscorrentiaViz = () => (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-300 via-green-300 to-blue-600 overflow-hidden">
      {/* Montañas con SVG realista */}
      <svg className="absolute top-0 left-0 right-0 h-64" viewBox="0 0 1200 250" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="60%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        
        {/* Montañas de fondo */}
        <polygon points="0,250 200,100 400,250" fill="url(#mountainGradient1)" opacity="0.7" />
        <polygon points="300,250 600,80 900,250" fill="url(#mountainGradient1)" opacity="0.8" />
        <polygon points="700,250 1000,120 1200,250" fill="url(#mountainGradient1)" opacity="0.7" />
        
        {/* Picos nevados */}
        <polygon points="600,80 550,130 650,130" fill="url(#snowGradient)" />
        <polygon points="200,100 170,140 230,140" fill="url(#snowGradient)" />
        <polygon points="1000,120 960,160 1040,160" fill="url(#snowGradient)" />
      </svg>

      {/* Corrientes de agua bajando por la montaña */}
      <svg className="absolute top-32 left-0 right-0 h-96" viewBox="0 0 1200 400" preserveAspectRatio="none">
        {[...Array(6)].map((_, i) => {
          const startX = 200 + i * 150;
          const curves = `M${startX},0 Q${startX + 20},80 ${startX + 10},160 T${startX + 40},320 T${startX + 60},400`;
          return (
            <g key={i}>
              {/* Corriente de agua */}
              <path
                d={curves}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="8"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <path
                d={curves}
                fill="none"
                stroke="#60A5FA"
                strokeWidth="4"
                opacity="0.8"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {/* Gotas cayendo */}
              {[...Array(8)].map((_, j) => (
                <circle
                  key={`drop-${i}-${j}`}
                  cx={startX + 10 + j * 5}
                  cy={j * 50}
                  r="4"
                  fill="#3B82F6"
                  opacity="0.7"
                  className="animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15 + j * 0.1}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Río principal con flujo */}
      <svg className="absolute bottom-40 left-0 right-0 h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riverGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        
        {/* Cuerpo del río sinuoso */}
        <path
          d="M0,60 Q200,40 400,60 T800,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#riverGradient)"
        />
        
        {/* Ondas y reflejos */}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx={100 + i * 140}
            cy={60 + (i % 2) * 10}
            rx="40"
            ry="8"
            fill="#60A5FA"
            opacity="0.4"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Flechas de dirección del flujo */}
        {[...Array(5)].map((_, i) => (
          <path
            key={`arrow-${i}`}
            d={`M${200 + i * 200},70 L${220 + i * 200},70 M${220 + i * 200},70 L${215 + i * 200},65 M${220 + i * 200},70 L${215 + i * 200},75`}
            stroke="#E0F2FE"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>

      {/* Océano destino */}
      <svg className="absolute bottom-0 right-0 w-2/5 h-48" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanDeepGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="200" fill="url(#oceanDeepGradient)" />
        
        {/* Olas del océano */}
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M0,${30 + i * 30} Q125,${20 + i * 30} 250,${30 + i * 30} T500,${30 + i * 30}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            opacity="0.5"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}
          />
        ))}

        {/* Espuma y burbujas */}
        {[...Array(15)].map((_, i) => (
          <circle
            key={`bubble-${i}`}
            cx={30 + i * 30}
            cy={40 + (i % 3) * 50}
            r="5"
            fill="#E0F2FE"
            opacity="0.6"
            className="animate-float"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '4s' }}
          />
        ))}
      </svg>

      {/* Paneles informativos */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-cyan-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descarga anual</div>
        <div className="text-3xl font-bold text-cyan-600 my-1">40K km³</div>
        <div className="text-xs text-gray-600">Ríos al océano</div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-52 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-green-300">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Transporte</div>
        <div className="text-2xl font-bold text-green-700 my-1">Nutrientes</div>
        <div className="text-xs text-gray-600">Sedimentos al mar</div>
      </div>

      {/* Indicadores de flujo */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="100" height="100" viewBox="0 0 100 100" className="animate-pulse">
          <path
            d="M20,50 L50,20 L50,40 L80,40 L80,60 L50,60 L50,80 Z"
            fill="#60A5FA"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  )

  const visualizations = {
    1: <EvaporacionViz />,
    2: <TranspiracionViz />,
    3: <CondensacionViz />,
    4: <PrecipitacionViz />,
    5: <InfiltracionViz />,
    6: <EscorrentiaViz />
  }

  return (
    <div className="space-y-6">
      {/* Header con diseño moderno */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            El Ciclo del Agua
          </h2>
          <p className="text-sm text-gray-600 mt-1">Mueve el mouse sobre la visualización para explorar en 3D</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-600 px-5 py-3 rounded-xl shadow-lg">
          <Droplet className="h-6 w-6 text-white animate-pulse" />
          <span className="text-sm font-semibold text-white">Visualización Interactiva 3D</span>
        </div>
      </div>

      {/* Visualización principal - cambia según la etapa seleccionada */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
        {/* Información de la etapa actual - Banner superior */}
        <div className={`mb-6 bg-gradient-to-r ${currentStage?.color} p-6 rounded-2xl shadow-xl`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="text-6xl drop-shadow-lg">{currentStage?.icon}</div>
              <div>
                <h3 className="text-3xl font-bold drop-shadow-md">{currentStage?.name}</h3>
                <p className="text-sm mt-1 opacity-95">{currentStage?.description}</p>
              </div>
            </div>
            <div className="text-right bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl">
              <div className="text-xs opacity-90 uppercase tracking-wider">Etapa</div>
              <div className="text-5xl font-bold">{selectedStage}<span className="text-2xl opacity-75">/6</span></div>
            </div>
          </div>
        </div>

        {/* Contenedor de visualización 3D interactiva */}
        <div 
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-move"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              transform: getTransform(),
              transition: 'transform 0.1s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {visualizations[selectedStage]}
          </div>

          {/* Indicador de interactividad */}
          {!isHovering && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm animate-bounce">
              🖱️ Mueve el mouse para rotar
            </div>
          )}

          {/* Overlay con efecto de profundidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Detalle de la etapa */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-500 shadow-md">
          <h4 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">💡</span>
            Datos científicos
          </h4>
          <p className="text-gray-700 leading-relaxed">{currentStage?.detail}</p>
        </div>
      </div>

      {/* Selector de etapas */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm shadow-lg">
            {selectedStage}
          </span>
          Selecciona una etapa para explorar
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`group p-5 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                selectedStage === stage.id
                  ? 'border-transparent shadow-2xl scale-105 bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  : 'border-blue-200 hover:border-blue-400 hover:shadow-xl bg-white hover:scale-102'
              }`}
            >
              {/* Efecto de brillo en hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${selectedStage === stage.id ? 'opacity-10' : ''}`} />
              
              <div className="flex items-center mb-2 relative z-10">
                <span className={`text-5xl mr-3 transition-transform duration-300 ${selectedStage === stage.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {stage.icon}
                </span>
                <div>
                  <h4 className={`font-bold transition-colors ${selectedStage === stage.id ? 'text-white' : 'text-gray-800'}`}>
                    {stage.name}
                  </h4>
                  <span className={`text-xs ${selectedStage === stage.id ? 'text-white/80' : 'text-gray-500'}`}>
                    Etapa {stage.id}
                  </span>
                </div>
              </div>
              
              {/* Indicador de selección */}
              {selectedStage === stage.id && (
                <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Impacto del Cambio Climático */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-2 mr-3 shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          Impacto del cambio climático en el ciclo del agua
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="group flex items-start p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-4 group-hover:scale-110 transition-transform"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-lg">Mayor evaporación</h4>
                <p className="text-sm text-gray-600">Las temperaturas elevadas aumentan la evaporación, reduciendo agua disponible en superficie.</p>
              </div>
            </div>
            <div className="group flex items-start p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-4 group-hover:scale-110 transition-transform"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-lg">Lluvias extremas</h4>
                <p className="text-sm text-gray-600">Precipitaciones más intensas pero menos frecuentes causan inundaciones y erosión.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="group flex items-start p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-4 group-hover:scale-110 transition-transform"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-lg">Sequías prolongadas</h4>
                <p className="text-sm text-gray-600">Períodos sin lluvia más largos afectan agricultura y disponibilidad de agua potable.</p>
              </div>
            </div>
            <div className="group flex items-start p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <span className="text-3xl mr-4 group-hover:scale-110 transition-transform"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 text-lg">Deshielo acelerado</h4>
                <p className="text-sm text-gray-600">Los glaciares se derriten más rápido, alterando el flujo de agua en ríos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HuellaTab() {
  const [formData, setFormData] = useState({
    duchas: 1,
    tiempoDucha: 10,
    lavadoManos: 5,
    lavadoDientes: 2,
    inodoro: 6,
    lavadora: 1,
    lavavajillas: 0,
    cocinar: 2,
    beberAgua: 8,
    riegoJardin: 0,
    lavadoAuto: 0
  })

  const [resultado, setResultado] = useState(null)
  const [showResults, setShowResults] = useState(false)

  // Factores de consumo en litros
  const factores = {
    duchas: 10, // litros por minuto
    lavadoManos: 2, // litros por lavado
    lavadoDientes: 1, // litros por cepillado
    inodoro: 6, // litros por descarga
    lavadora: 50, // litros por carga
    lavavajillas: 15, // litros por uso
    cocinar: 5, // litros por comida
    beberAgua: 0.25, // litros por vaso
    riegoJardin: 20, // litros por sesión
    lavadoAuto: 100 // litros por lavado
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }))
  }

  const calcularHuella = () => {
    const consumo = {
      higiene: 
        (formData.duchas * formData.tiempoDucha * factores.duchas) +
        (formData.lavadoManos * factores.lavadoManos) +
        (formData.lavadoDientes * factores.lavadoDientes) +
        (formData.inodoro * factores.inodoro),
      limpieza:
        (formData.lavadora * factores.lavadora) +
        (formData.lavavajillas * factores.lavavajillas),
      alimentacion:
        (formData.cocinar * factores.cocinar) +
        (formData.beberAgua * factores.beberAgua),
      exterior:
        (formData.riegoJardin * factores.riegoJardin) +
        (formData.lavadoAuto * factores.lavadoAuto)
    }

    const total = Object.values(consumo).reduce((a, b) => a + b, 0)
    const totalMensual = total * 30
    const totalAnual = total * 365

    setResultado({
      diario: total,
      mensual: totalMensual,
      anual: totalAnual,
      desglose: consumo,
      categoria: total < 100 ? 'Excelente' : total < 150 ? 'Bueno' : total < 200 ? 'Moderado' : 'Alto'
    })
    setShowResults(true)
  }

  const resetear = () => {
    setFormData({
      duchas: 1,
      tiempoDucha: 10,
      lavadoManos: 5,
      lavadoDientes: 2,
      inodoro: 6,
      lavadora: 1,
      lavavajillas: 0,
      cocinar: 2,
      beberAgua: 8,
      riegoJardin: 0,
      lavadoAuto: 0
    })
    setShowResults(false)
    setResultado(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Mi Huella Hídrica
            </h2>
            <p className="text-sm text-gray-600 mt-1">Calcula cuánta agua consumes diariamente</p>
          </div>
          <div className="bg-blue-600 rounded-full p-4 shadow-lg">
            <Droplet className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg p-2 mr-3">
              
            </span>
            Completa tus hábitos diarios
          </h3>

          <div className="space-y-8">
            {/* Higiene Personal */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-lg text-blue-800 mb-4 flex items-center">
                <span className="text-2xl mr-2"></span>
                Higiene Personal
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de duchas al día
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.duchas}
                    onChange={(e) => handleChange('duchas', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minutos por ducha
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={formData.tiempoDucha}
                    onChange={(e) => handleChange('tiempoDucha', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veces que lavas tus manos
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.lavadoManos}
                    onChange={(e) => handleChange('lavadoManos', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veces que cepillas tus dientes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.lavadoDientes}
                    onChange={(e) => handleChange('lavadoDientes', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usos del inodoro
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.inodoro}
                    onChange={(e) => handleChange('inodoro', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Limpieza */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-lg text-purple-800 mb-4 flex items-center">
                <span className="text-2xl mr-2"></span>
                Limpieza del Hogar
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargas de lavadora
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.lavadora}
                    onChange={(e) => handleChange('lavadora', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usos del lavavajillas
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.lavavajillas}
                    onChange={(e) => handleChange('lavavajillas', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Alimentación */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="font-bold text-lg text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2"></span>
                Alimentación
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comidas preparadas con agua
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.cocinar}
                    onChange={(e) => handleChange('cocinar', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vasos de agua que bebes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.beberAgua}
                    onChange={(e) => handleChange('beberAgua', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Actividades Exteriores */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="font-bold text-lg text-amber-800 mb-4 flex items-center">
                <span className="text-2xl mr-2"></span>
                Actividades Exteriores
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sesiones de riego (jardín/plantas)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.riegoJardin}
                    onChange={(e) => handleChange('riegoJardin', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lavados de auto/moto
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData.lavadoAuto}
                    onChange={(e) => handleChange('lavadoAuto', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={calcularHuella}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Calcular mi huella hídrica
            </button>
            <button
              onClick={resetear}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all duration-300"
            >
              Resetear
            </button>
          </div>
        </div>

        {/* Panel de Resultados */}
        <div className="space-y-6">
          {showResults && resultado ? (
            <>
              {/* Resultado Principal */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="text-sm uppercase tracking-wide opacity-90 mb-2">Tu consumo diario</div>
                  <div className="text-6xl font-bold mb-2">{Math.round(resultado.diario)}<span className="text-2xl">L</span></div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 ${
                    resultado.categoria === 'Excelente' ? 'bg-green-500' :
                    resultado.categoria === 'Bueno' ? 'bg-blue-400' :
                    resultado.categoria === 'Moderado' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {resultado.categoria}
                  </div>
                </div>
              </div>

              {/* Desglose */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h4 className="font-bold text-lg mb-4 text-gray-800">Desglose por categoría</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">🚿 Higiene</span>
                    <span className="font-bold text-blue-600">{Math.round(resultado.desglose.higiene)}L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">🧺 Limpieza</span>
                    <span className="font-bold text-purple-600">{Math.round(resultado.desglose.limpieza)}L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">🍽️ Alimentación</span>
                    <span className="font-bold text-green-600">{Math.round(resultado.desglose.alimentacion)}L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">🌱 Exterior</span>
                    <span className="font-bold text-amber-600">{Math.round(resultado.desglose.exterior)}L</span>
                  </div>
                </div>
              </div>

              {/* Proyecciones */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
                <h4 className="font-bold text-lg mb-4 text-gray-800">Proyecciones</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Consumo mensual</span>
                    <span className="font-bold text-gray-800">{Math.round(resultado.mensual)}L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Consumo anual</span>
                    <span className="font-bold text-gray-800">{Math.round(resultado.anual)}L</span>
                  </div>
                </div>
              </div>

              {/* Consejos */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h4 className="font-bold text-lg mb-3 text-gray-800">💡 Consejos para reducir</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Reduce el tiempo de ducha a 5 minutos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Cierra el grifo al cepillarte los dientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Usa lavadora solo con carga completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Riega plantas temprano o tarde</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 text-center">
              <div className="text-6xl mb-4"></div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Completa el formulario</h4>
              <p className="text-sm text-gray-600">Ingresa tus hábitos diarios y presiona "Calcular" para ver tu huella hídrica</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChatbotTab() {
  const telegramBotUrl = "https://t.me/YourWaterWayBot" 

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Asistente de IA Educativo
            </h2>
            <p className="text-sm text-gray-600 mt-1">Aprende sobre el agua con nuestra IA en Telegram</p>
          </div>
          <div className="bg-blue-600 rounded-full p-4 shadow-lg">
            <MessageCircle className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Información del chatbot */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-6 mb-4 shadow-xl">
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">¡Chatea con nuestra IA!</h3>
            <p className="text-gray-600">Conecta con nuestro asistente educativo en Telegram</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <span className="text-2xl mr-3"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Respuestas instantáneas</h4>
                <p className="text-sm text-gray-600">Pregunta sobre el ciclo del agua, consumo y conservación</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <span className="text-2xl mr-3"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Contenido educativo</h4>
                <p className="text-sm text-gray-600">Aprende datos curiosos y conceptos científicos</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
              <span className="text-2xl mr-3"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Cambio climático</h4>
                <p className="text-sm text-gray-600">Información sobre el impacto climático en el agua</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <span className="text-2xl mr-3"></span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Consejos prácticos</h4>
                <p className="text-sm text-gray-600">Tips para ahorrar agua en tu día a día</p>
              </div>
            </div>
          </div>

          {/* Botón de Telegram */}
          <a
            href={telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>Abrir en Telegram</span>
            </div>
          </a>

          <p className="text-center text-xs text-gray-500 mt-4">
            Se abrirá en una nueva pestaña. Necesitas tener Telegram instalado.
          </p>
        </div>

        {/* Preview / Instrucciones */}
        <div className="space-y-6">
          {/* Cómo usar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h4 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-2 mr-3">
                
              </span>
              ¿Cómo usar el chatbot?
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Haz clic en "Abrir en Telegram"</h5>
                  <p className="text-sm text-gray-600">Se abrirá la aplicación de Telegram</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Inicia la conversación</h5>
                  <p className="text-sm text-gray-600">Presiona "Start" o envía un mensaje</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">¡Comienza a preguntar!</h5>
                  <p className="text-sm text-gray-600">Escribe tus preguntas sobre el agua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ejemplos de preguntas */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <h4 className="text-xl font-bold mb-4 text-gray-800"> Ejemplos de preguntas</h4>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-200">
                <p className="text-sm text-gray-700">"¿Qué es el ciclo del agua?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-200">
                <p className="text-sm text-gray-700">"¿Cómo puedo ahorrar agua en casa?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-200">
                <p className="text-sm text-gray-700">"¿Qué es la huella hídrica?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-200">
                <p className="text-sm text-gray-700">"¿Cómo afecta el cambio climático al agua?"</p>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-start">
              <span className="text-3xl mr-3"></span>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">Asistente disponible 24/7</h5>
                <p className="text-sm text-gray-600">
                  Nuestro chatbot de IA está disponible en cualquier momento para responder tus preguntas sobre agua, 
                  conservación y cambio climático.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, content, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-orange-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
      <div className={`inline-block bg-gradient-to-r ${colorClasses[color]} text-white px-3 py-1 rounded-full text-sm font-medium mb-3`}>
        {title}
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  )
}
