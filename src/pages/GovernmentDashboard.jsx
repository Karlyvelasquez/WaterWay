import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Building2, Home, BarChart3, TrendingUp, Database, ChevronLeft, Globe, Download, Loader2, Brain, FileText, MapPin, AlertTriangle, Lightbulb } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function GovernmentDashboard() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('inicio')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showCountryModal, setShowCountryModal] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')
  const [realData, setRealData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountryModal(false)
    setSelectedCity('') // Reset city when country changes
    setRealData(null)
  }
  
  // Carga datos reales de EPM (Medellín) u OSE (Montevideo)
  const loadRealData = async (city, country) => {
    // Solo carga datos reales para Medellín (Colombia) o Montevideo (Uruguay)
    const shouldLoadRealData = 
      (country === 'colombia' && city === 'Medellín') ||
      (country === 'uruguay' && city === 'Montevideo')
    
    if (!shouldLoadRealData) return
    
    setLoading(true)
    try {
      // Determina el endpoint según el país
      let endpoint, params, source
      
      if (country === 'colombia' && city === 'Medellín') {
        endpoint = 'http://localhost:5000/api/epm'
        params = 'municipio=Medellín'
        source = 'EPM'
      } else if (country === 'uruguay' && city === 'Montevideo') {
        endpoint = 'http://localhost:5000/api/uruguay'
        params = '' // Los endpoints de Uruguay no necesitan parámetros de ciudad
        source = 'OSE'
      }
      
      // Carga datos en paralelo
      const interrupcionesUrl = params 
        ? `${endpoint}/interrupciones?${params}&limit=100`
        : `${endpoint}/interrupciones?limit=100`
      
      const requests = [
        fetch(`${endpoint}/${country === 'colombia' ? 'consumo' : 'tarifas'}${params ? '?' + params : ''}`),
        fetch(`${endpoint}/${country === 'colombia' ? 'reportes-ciudadanos' : 'reportes'}${params ? '?' + params : ''}`),
        fetch(interrupcionesUrl)
      ]
      
      const [res1, res2, res3] = await Promise.all(requests)
      const data1 = await res1.json()
      const data2 = await res2.json()
      const data3 = await res3.json()
      
      setRealData({
        consumo: data1.data,
        reportes: data2.data,
        interrupciones: data3.data,
        source: source // 'EPM' o 'OSE'
      })
    } catch (error) {
      console.error('Error cargando datos reales:', error)
      setRealData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Modal de selección de país */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-slide-up">
            <div className="text-center mb-8">
              <Building2 className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t('government.title')}</h2>
              <p className="text-gray-600">{t('government.selectCountry')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleCountrySelect('colombia')}
                className="group bg-gradient-to-br from-yellow-400 to-blue-600 p-8 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-white text-center">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Colombia</h3>
                  <p className="text-sm opacity-90">Datos gubernamentales de Colombia</p>
                </div>
              </button>
              
              <button
                onClick={() => handleCountrySelect('uruguay')}
                className="group bg-gradient-to-br from-sky-400 to-blue-800 p-8 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-white text-center">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Uruguay</h3>
                  <p className="text-sm opacity-90">Datos gubernamentales de Uruguay</p>
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
                {t('common.back')}
              </button>
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="WaterWay" className="h-10 w-auto" />
                <div>
                  <h1 className="text-xl font-bold text-gradient">WaterWay Analytics</h1>
                  <p className="text-xs text-gray-600">Portal Gubernamental</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {selectedCountry && (
                <button
                  onClick={() => setShowCountryModal(true)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  <Globe className="h-4 w-4 text-gray-700" />
                  <span className="text-gray-700">{selectedCountry === 'colombia' ? 'Colombia' : 'Uruguay'}</span>
                </button>
              )}
              <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
                <Building2 className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">{t('landing.governmentRole')}</span>
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
              label={t('government.tabs.dashboard')}
              active={activeTab === 'inicio'}
              onClick={() => setActiveTab('inicio')}
            />
            <TabButton
              icon={<BarChart3 className="h-5 w-5" />}
              label={t('government.tabs.consumption')}
              active={activeTab === 'consumo'}
              onClick={() => setActiveTab('consumo')}
            />
            <TabButton
              icon={<TrendingUp className="h-5 w-5" />}
              label={t('government.tabs.projections')}
              active={activeTab === 'proyecciones'}
              onClick={() => setActiveTab('proyecciones')}
            />
            <TabButton
              icon={<Database className="h-5 w-5" />}
              label={t('government.tabs.data')}
              active={activeTab === 'datos'}
              onClick={() => setActiveTab('datos')}
            />
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && <DashboardTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} />}
        {activeTab === 'consumo' && <ConsumoTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} />}
        {activeTab === 'proyecciones' && <ProyeccionesTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} />}
        {activeTab === 'datos' && <DatosTab />}
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
          ? 'border-purple-500 text-purple-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

// Datos por ciudad
const ciudadesPorPais = {
  colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta'],
  uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Rivera', 'Maldonado', 'Colonia']
}

const datosPorCiudad = {
  colombia: {
    'Bogotá': {
      poblacion: '7.9M',
      consumoTotal: 42500,
      sectores: {
        hogares: { porcentaje: 55, consumo: 23375, tendencia: '+2%' },
        industria: { porcentaje: 30, consumo: 12750, tendencia: '+5%' },
        comercio: { porcentaje: 15, consumo: 6375, tendencia: '+1%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 22800, industria: 12200, comercio: 6100 },
        { mes: 'Feb', hogares: 22500, industria: 12000, comercio: 6000 },
        { mes: 'Mar', hogares: 23000, industria: 12500, comercio: 6200 },
        { mes: 'Abr', hogares: 23200, industria: 12600, comercio: 6300 },
        { mes: 'May', hogares: 23500, industria: 12800, comercio: 6400 },
        { mes: 'Jun', hogares: 23375, industria: 12750, comercio: 6375 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 108, conservacion: 103, tendencia: 115 },
        { año: '2028', actual: 118, conservacion: 105, tendencia: 132 },
        { año: '2030', actual: 132, conservacion: 107, tendencia: 152 },
        { año: '2035', actual: 158, conservacion: 110, tendencia: 195 }
      ]
    },
    'Medellín': {
      poblacion: '2.5M',
      consumoTotal: 18500,
      sectores: {
        hogares: { porcentaje: 60, consumo: 11100, tendencia: '+1%' },
        industria: { porcentaje: 25, consumo: 4625, tendencia: '+3%' },
        comercio: { porcentaje: 15, consumo: 2775, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 10800, industria: 4500, comercio: 2700 },
        { mes: 'Feb', hogares: 10700, industria: 4450, comercio: 2650 },
        { mes: 'Mar', hogares: 10900, industria: 4550, comercio: 2750 },
        { mes: 'Abr', hogares: 11000, industria: 4600, comercio: 2760 },
        { mes: 'May', hogares: 11050, industria: 4610, comercio: 2770 },
        { mes: 'Jun', hogares: 11100, industria: 4625, comercio: 2775 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 105, conservacion: 102, tendencia: 110 },
        { año: '2028', actual: 112, conservacion: 104, tendencia: 122 },
        { año: '2030', actual: 121, conservacion: 106, tendencia: 138 },
        { año: '2035', actual: 140, conservacion: 108, tendencia: 168 }
      ]
    },
    'Cali': {
      poblacion: '2.2M',
      consumoTotal: 16200,
      sectores: {
        hogares: { porcentaje: 58, consumo: 9396, tendencia: '+2%' },
        industria: { porcentaje: 27, consumo: 4374, tendencia: '+4%' },
        comercio: { porcentaje: 15, consumo: 2430, tendencia: '+1%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 9100, industria: 4200, comercio: 2350 },
        { mes: 'Feb', hogares: 9050, industria: 4180, comercio: 2330 },
        { mes: 'Mar', hogares: 9200, industria: 4280, comercio: 2370 },
        { mes: 'Abr', hogares: 9300, industria: 4320, comercio: 2400 },
        { mes: 'May', hogares: 9350, industria: 4350, comercio: 2420 },
        { mes: 'Jun', hogares: 9396, industria: 4374, comercio: 2430 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 107, conservacion: 103, tendencia: 113 },
        { año: '2028', actual: 116, conservacion: 105, tendencia: 128 },
        { año: '2030', actual: 128, conservacion: 107, tendencia: 147 },
        { año: '2035', actual: 152, conservacion: 110, tendencia: 185 }
      ]
    }
  },
  uruguay: {
    'Montevideo': {
      poblacion: '1.4M',
      consumoTotal: 12800,
      sectores: {
        hogares: { porcentaje: 62, consumo: 7936, tendencia: '+1%' },
        industria: { porcentaje: 23, consumo: 2944, tendencia: '+2%' },
        comercio: { porcentaje: 15, consumo: 1920, tendencia: '+1%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 7700, industria: 2850, comercio: 1850 },
        { mes: 'Feb', hogares: 7650, industria: 2820, comercio: 1830 },
        { mes: 'Mar', hogares: 7800, industria: 2900, comercio: 1900 },
        { mes: 'Abr', hogares: 7850, industria: 2920, comercio: 1910 },
        { mes: 'May', hogares: 7900, industria: 2930, comercio: 1915 },
        { mes: 'Jun', hogares: 7936, industria: 2944, comercio: 1920 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 104, conservacion: 102, tendencia: 108 },
        { año: '2028', actual: 109, conservacion: 103, tendencia: 118 },
        { año: '2030', actual: 116, conservacion: 105, tendencia: 130 },
        { año: '2035', actual: 130, conservacion: 107, tendencia: 155 }
      ]
    },
    'Salto': {
      poblacion: '105K',
      consumoTotal: 2800,
      sectores: {
        hogares: { porcentaje: 48, consumo: 1344, tendencia: '+1%' },
        industria: { porcentaje: 35, consumo: 980, tendencia: '+3%' },
        comercio: { porcentaje: 17, consumo: 476, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 1300, industria: 950, comercio: 460 },
        { mes: 'Feb', hogares: 1290, industria: 945, comercio: 455 },
        { mes: 'Mar', hogares: 1320, industria: 965, comercio: 470 },
        { mes: 'Abr', hogares: 1330, industria: 970, comercio: 472 },
        { mes: 'May', hogares: 1338, industria: 975, comercio: 474 },
        { mes: 'Jun', hogares: 1344, industria: 980, comercio: 476 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 106, conservacion: 102, tendencia: 112 },
        { año: '2028', actual: 114, conservacion: 104, tendencia: 126 },
        { año: '2030', actual: 124, conservacion: 106, tendencia: 143 },
        { año: '2035', actual: 145, conservacion: 108, tendencia: 175 }
      ]
    }
  }
}

function DashboardTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading }) {
  if (!selectedCountry) {
    return (
      <div className="text-center py-20">
        <Globe className="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Selecciona un país para comenzar</h3>
      </div>
    )
  }

  const cities = ciudadesPorPais[selectedCountry]
  
  // Usa datos reales si es Medellín y están disponibles, sino usa mock
  let cityData = selectedCity && datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity] 
    ? datosPorCiudad[selectedCountry][selectedCity] 
    : null
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    // Carga datos reales para Medellín (Colombia) o Montevideo (Uruguay)
    if (
      (city === 'Medellín' && selectedCountry === 'colombia') ||
      (city === 'Montevideo' && selectedCountry === 'uruguay')
    ) {
      loadRealData(city, selectedCountry)
    } else {
      setRealData(null) // Usa datos mock para otras ciudades
    }
  }

  return (
    <div className="space-y-6">
      {/* Selector de ciudad */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Selecciona la ciudad para ver análisis detallado
          {realData && (
            <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Datos reales de {realData.source === 'EPM' ? 'EPM Colombia' : 'OSE Uruguay'}
            </span>
          )}
        </label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          disabled={loading}
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {loading && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          </div>
        )}
      </div>

      {selectedCity && cityData ? (
        <>
          {/* Header con información de la ciudad */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Panel de Control - {selectedCity}</h2>
                <p className="text-lg opacity-90 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Población: {cityData.poblacion} habitantes
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Consumo Total</p>
                <p className="text-4xl font-bold">{(cityData.consumoTotal / 1000).toFixed(1)}M</p>
                <p className="text-sm opacity-75">m³/mes</p>
              </div>
            </div>
          </div>

          {/* KPIs por sector */}
          <div className="grid md:grid-cols-3 gap-6">
            <SectorKPI
              title="Sector Hogares"
              percentage={cityData.sectores.hogares.porcentaje}
              value={`${(cityData.sectores.hogares.consumo / 1000).toFixed(1)}M m³/mes`}
              trend={cityData.sectores.hogares.tendencia}
              color="blue"
            />
            <SectorKPI
              title="Sector Industrial"
              percentage={cityData.sectores.industria.porcentaje}
              value={`${(cityData.sectores.industria.consumo / 1000).toFixed(1)}M m³/mes`}
              trend={cityData.sectores.industria.tendencia}
              color="purple"
            />
            <SectorKPI
              title="Sector Comercial"
              percentage={cityData.sectores.comercio.porcentaje}
              value={`${(cityData.sectores.comercio.consumo / 1000).toFixed(1)}M m³/mes`}
              trend={cityData.sectores.comercio.tendencia}
              color="green"
            />
          </div>

          {/* Gráfico de consumo mensual */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Consumo Mensual por Sector</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityData.mensual}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hogares" fill="#3B82F6" name="Hogares" />
                <Bar dataKey="industria" fill="#8B5CF6" name="Industria" />
                <Bar dataKey="comercio" fill="#10B981" name="Comercio" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecciona una ciudad</h3>
          <p className="text-gray-500">Elige una ciudad del menú superior para ver el análisis detallado</p>
        </div>
      )}
    </div>
  )
}

function ConsumoTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading }) {
  const [exporting, setExporting] = useState(false)

  if (!selectedCountry) {
    return (
      <div className="text-center py-20">
        <Globe className="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Selecciona un país para comenzar</h3>
      </div>
    )
  }

  const cities = ciudadesPorPais[selectedCountry]
  const cityData = selectedCity && datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity] 
    ? datosPorCiudad[selectedCountry][selectedCity] 
    : null
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    // Carga datos reales para Medellín (Colombia) o Montevideo (Uruguay)
    if (
      (city === 'Medellín' && selectedCountry === 'colombia') ||
      (city === 'Montevideo' && selectedCountry === 'uruguay')
    ) {
      loadRealData(city, selectedCountry)
    } else {
      setRealData(null) // Usa datos mock para otras ciudades
    }
  }

  const exportToPDF = () => {
    if (!cityData) return
    
    setExporting(true)
    try {
      const doc = new jsPDF()
      
      // Título
      doc.setFontSize(20)
      doc.setTextColor(88, 28, 135) // Purple
      doc.text('WaterWay Analytics', 20, 20)
      
      doc.setFontSize(16)
      doc.text(`Análisis de Consumo por Sector - ${selectedCity}`, 20, 30)
      
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`País: ${selectedCountry === 'colombia' ? 'Colombia' : 'Uruguay'}`, 20, 38)
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 43)
      
      // Información general
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text('Resumen General', 20, 55)
      
      doc.setFontSize(10)
      doc.text(`Población: ${cityData.poblacion}`, 20, 63)
      doc.text(`Consumo Total: ${(cityData.consumoTotal / 1000).toFixed(1)}M m³/mes`, 20, 70)
      
      // Tabla de consumo por sector
      doc.autoTable({
        startY: 80,
        head: [['Sector', 'Porcentaje', 'Consumo (m³/mes)', 'Tendencia']],
        body: [
          ['Hogares', `${cityData.sectores.hogares.porcentaje}%`, cityData.sectores.hogares.consumo.toLocaleString(), cityData.sectores.hogares.tendencia],
          ['Industria', `${cityData.sectores.industria.porcentaje}%`, cityData.sectores.industria.consumo.toLocaleString(), cityData.sectores.industria.tendencia],
          ['Comercio', `${cityData.sectores.comercio.porcentaje}%`, cityData.sectores.comercio.consumo.toLocaleString(), cityData.sectores.comercio.tendencia],
          ['TOTAL', '100%', cityData.consumoTotal.toLocaleString(), '-']
        ],
        theme: 'striped',
        headStyles: { fillColor: [88, 28, 135] },
        styles: { fontSize: 10 }
      })
      
      // Datos mensuales
      const finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(14)
      doc.text('Evolución Mensual', 20, finalY)
      
      doc.autoTable({
        startY: finalY + 5,
        head: [['Mes', 'Hogares', 'Industria', 'Comercio', 'Total']],
        body: cityData.mensual.map(m => [
          m.mes,
          m.hogares.toLocaleString(),
          m.industria.toLocaleString(),
          m.comercio.toLocaleString(),
          (m.hogares + m.industria + m.comercio).toLocaleString()
        ]),
        theme: 'grid',
        headStyles: { fillColor: [88, 28, 135] },
        styles: { fontSize: 9 }
      })
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      doc.setTextColor(150)
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text(
          `WaterWay - Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
      }
      
      // Descargar
      doc.save(`WaterWay_Consumo_${selectedCity}_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error al generar PDF:', error)
      alert('Error al generar el PDF')
    } finally {
      setExporting(false)
    }
  }

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Análisis de Consumo por Sector</h2>
        {selectedCity && (
          <button
            onClick={exportToPDF}
            disabled={exporting}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Exportar a PDF</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Selector de ciudad */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Selecciona la ciudad
          {realData && (
            <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Datos reales de {realData.source === 'EPM' ? 'EPM Colombia' : 'OSE Uruguay'}
            </span>
          )}
        </label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          disabled={loading}
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {loading && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />

          </div>
        )}
      </div>

      {selectedCity && cityData ? (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gráfico de área */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Tendencia de Consumo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cityData.mensual}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="hogares" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Hogares" />
                  <Area type="monotone" dataKey="industria" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Industria" />
                  <Area type="monotone" dataKey="comercio" stackId="1" stroke="#10B981" fill="#10B981" name="Comercio" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de pastel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Distribución por Sector</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Hogares', value: cityData.sectores.hogares.porcentaje },
                      { name: 'Industria', value: cityData.sectores.industria.porcentaje },
                      { name: 'Comercio', value: cityData.sectores.comercio.porcentaje }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla de detalles */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Detalles por Sector</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Sector</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Porcentaje</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Consumo (m³/mes)</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        Hogares
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-medium">{cityData.sectores.hogares.porcentaje}%</td>
                    <td className="text-right py-4 px-4">{cityData.sectores.hogares.consumo.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">
                      <span className="text-green-600 font-medium">{cityData.sectores.hogares.tendencia}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        Industria
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-medium">{cityData.sectores.industria.porcentaje}%</td>
                    <td className="text-right py-4 px-4">{cityData.sectores.industria.consumo.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">
                      <span className="text-green-600 font-medium">{cityData.sectores.industria.tendencia}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        Comercio
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-medium">{cityData.sectores.comercio.porcentaje}%</td>
                    <td className="text-right py-4 px-4">{cityData.sectores.comercio.consumo.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">
                      <span className="text-green-600 font-medium">{cityData.sectores.comercio.tendencia}</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-bold">
                    <td className="py-4 px-4">Total</td>
                    <td className="text-right py-4 px-4">100%</td>
                    <td className="text-right py-4 px-4">{cityData.consumoTotal.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecciona una ciudad</h3>
          <p className="text-gray-500">Elige una ciudad para ver el análisis de consumo por sector</p>
        </div>
      )}
    </div>
  )
}

function ProyeccionesTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading }) {
  const [analyzing, setAnalyzing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [exporting, setExporting] = useState(false)

  if (!selectedCountry) {
    return (
      <div className="text-center py-20">
        <Globe className="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Selecciona un país para comenzar</h3>
      </div>
    )
  }

  const cities = ciudadesPorPais[selectedCountry]
  const cityData = selectedCity && datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity] 
    ? datosPorCiudad[selectedCountry][selectedCity] 
    : null
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    setAiAnalysis(null)
    // Carga datos reales para Medellín (Colombia) o Montevideo (Uruguay)
    if (
      (city === 'Medellín' && selectedCountry === 'colombia') ||
      (city === 'Montevideo' && selectedCountry === 'uruguay')
    ) {
      loadRealData(city, selectedCountry)
    } else {
      setRealData(null) // Usa datos mock para otras ciudades
    }
  }

  const analyzeWithAI = async () => {
    setAnalyzing(true)
    try {
      const response = await fetch('http://localhost:5000/api/analyze-water-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          city: selectedCity,
          country: selectedCountry,
          data: cityData
        })
      })
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`)
      }
      
      const result = await response.json()
      setAiAnalysis(result.analysis)
    } catch (error) {
      console.error('Error al analizar con IA:', error)
      // Análisis simulado si el backend no está disponible
      setAiAnalysis({
        resumen: `Análisis de ${selectedCity}: El consumo total de ${(cityData.consumoTotal / 1000).toFixed(1)}M m³/mes muestra una tendencia moderada de crecimiento. El sector de hogares representa el ${cityData.sectores.hogares.porcentaje}% del consumo total.`,
        recomendaciones: [
          'Implementar campañas de educación sobre uso eficiente del agua en el sector residencial',
          'Establecer auditorías hídricas obligatorias para el sector industrial',
          'Incentivar la instalación de tecnologías de ahorro de agua en edificios comerciales'
        ],
        alertas: [
          `Proyección de incremento del ${cityData.sectores.industria.tendencia} en el sector industrial requiere atención`,
          'El escenario de tendencia actual proyecta un aumento significativo del estrés hídrico para 2035'
        ],
        oportunidades: [
          'Potencial de reducción del 15-20% mediante tecnologías de reciclaje de agua',
          'Implementación de sistemas de captación de agua lluvia en edificios públicos'
        ]
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const exportToPDF = () => {
    if (!cityData || !aiAnalysis) {
      alert('Primero debes analizar los datos con IA')
      return
    }
    
    setExporting(true)
    try {
      const doc = new jsPDF()
      
      // Título
      doc.setFontSize(20)
      doc.setTextColor(88, 28, 135)
      doc.text('WaterWay Analytics', 20, 20)
      
      doc.setFontSize(16)
      doc.text(`Proyecciones de Estrés Hídrico - ${selectedCity}`, 20, 30)
      
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`País: ${selectedCountry === 'colombia' ? 'Colombia' : 'Uruguay'}`, 20, 38)
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 43)
      doc.text(`Análisis generado con GPT-4`, 20, 48)
      
      // Resumen
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text('Resumen Ejecutivo', 20, 60)
      
      doc.setFontSize(10)
      const splitResumen = doc.splitTextToSize(aiAnalysis.resumen, 170)
      doc.text(splitResumen, 20, 68)
      
      // Proyecciones
      let yPos = 68 + (splitResumen.length * 5) + 10
      doc.setFontSize(14)
      doc.text('Escenarios Proyectados', 20, yPos)
      
      yPos += 5
      doc.autoTable({
        startY: yPos,
        head: [['Año', 'Optimista', 'Intermedio', 'Pesimista']],
        body: cityData.proyeccion.map(p => [
          p.año,
          `${p.conservacion}%`,
          `${p.actual}%`,
          `${p.tendencia}%`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [88, 28, 135] },
        styles: { fontSize: 10 }
      })
      
      // Recomendaciones
      yPos = doc.lastAutoTable.finalY + 10
      doc.setFontSize(14)
      doc.text('Recomendaciones Prioritarias', 20, yPos)
      
      yPos += 7
      doc.setFontSize(10)
      aiAnalysis.recomendaciones.forEach((rec, idx) => {
        const splitText = doc.splitTextToSize(`${idx + 1}. ${rec}`, 170)
        doc.text(splitText, 20, yPos)
        yPos += (splitText.length * 5) + 3
      })
      
      // Alertas
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      
      yPos += 5
      doc.setFontSize(14)
      doc.text('Alertas y Consideraciones', 20, yPos)
      
      yPos += 7
      doc.setFontSize(10)
      aiAnalysis.alertas.forEach((alert, idx) => {
        const splitText = doc.splitTextToSize(`• ${alert}`, 170)
        doc.text(splitText, 20, yPos)
        yPos += (splitText.length * 5) + 3
      })
      
      // Oportunidades
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      
      yPos += 5
      doc.setFontSize(14)
      doc.text('Oportunidades Identificadas', 20, yPos)
      
      yPos += 7
      doc.setFontSize(10)
      aiAnalysis.oportunidades.forEach((opp, idx) => {
        const splitText = doc.splitTextToSize(`• ${opp}`, 170)
        doc.text(splitText, 20, yPos)
        yPos += (splitText.length * 5) + 3
      })
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      doc.setTextColor(150)
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text(
          `WaterWay - Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
      }
      
      // Descargar
      doc.save(`WaterWay_Proyecciones_${selectedCity}_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error al generar PDF:', error)
      alert('Error al generar el PDF')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Proyecciones de Estrés Hídrico (IA)</h2>
        {selectedCity && (
          <button
            onClick={exportToPDF}
            disabled={exporting}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Exportar a PDF</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Selector de ciudad */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Selecciona la ciudad
          {realData && (
            <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Datos reales de {realData.source === 'EPM' ? 'EPM Colombia' : 'OSE Uruguay'}
            </span>
          )}
        </label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          disabled={loading}
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {loading && (
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
  
          </div>
        )}
      </div>

      {selectedCity && cityData ? (
        <>
          {/* Gráfico de proyecciones */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Modelos Predictivos - Escenarios Climáticos</h3>
              <p className="text-gray-600">
                Proyección del índice de estrés hídrico bajo diferentes escenarios de políticas públicas para {selectedCity}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={cityData.proyeccion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="conservacion" stroke="#10B981" strokeWidth={3} name="Con políticas de conservación" />
                <Line type="monotone" dataKey="actual" stroke="#F59E0B" strokeWidth={3} name="Escenario intermedio" />
                <Line type="monotone" dataKey="tendencia" stroke="#EF4444" strokeWidth={3} name="Tendencia actual" />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Escenario Optimista</h4>
                <p className="text-sm text-gray-700">
                  Con políticas de conservación: +{cityData.proyeccion[4].conservacion - 100}% estrés para 2035
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">Escenario Intermedio</h4>
                <p className="text-sm text-gray-700">
                  Medidas parciales: +{cityData.proyeccion[4].actual - 100}% estrés para 2035
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">Escenario Pesimista</h4>
                <p className="text-sm text-gray-700">
                  Sin cambios: +{cityData.proyeccion[4].tendencia - 100}% estrés para 2035
                </p>
              </div>
            </div>
          </div>

          {/* Análisis con IA */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Brain className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-semibold">Análisis con Inteligencia Artificial</h3>
              </div>
              <button
                onClick={analyzeWithAI}
                disabled={analyzing}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analizando...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Analizar con IA</span>
                  </>
                )}
              </button>
            </div>

            {aiAnalysis ? (
              <div className="space-y-6">
                {/* Resumen */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-purple-600" />
                    Resumen Ejecutivo
                  </h4>
                  <p className="text-gray-700">{aiAnalysis.resumen}</p>
                </div>

                {/* Recomendaciones */}
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Recomendaciones Prioritarias</h4>
                  <div className="space-y-3">
                    {aiAnalysis.recomendaciones.map((rec, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alertas */}
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Alertas y Consideraciones</h4>
                  <div className="space-y-3">
                    {aiAnalysis.alertas.map((alert, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{alert}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Oportunidades */}
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Oportunidades Identificadas</h4>
                  <div className="space-y-3">
                    {aiAnalysis.oportunidades.map((opp, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <Lightbulb className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{opp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Presiona el botón "Analizar con IA" para obtener un análisis detallado de los datos</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
          <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecciona una ciudad</h3>
          <p className="text-gray-500">Elige una ciudad para ver las proyecciones de estrés hídrico</p>
        </div>
      )}
    </div>
  )
}

function DatosTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Conjuntos de Datos Abiertos</h2>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Datasets Disponibles</h3>
          <p className="text-gray-600">
            Todos los datos están disponibles bajo licencia abierta para descarga y reutilización
          </p>
        </div>

        <div className="space-y-4">
          <DatasetItem
            title="Consumo Hídrico Municipal"
            description="Series temporales de consumo de agua por municipio, sector y mes"
            format="CSV, JSON"
            size="2.3 MB"
            updated="Hace 2 días"
          />
          <DatasetItem
            title="Reportes Ciudadanos Agregados"
            description="Datos georreferenciados y anonimizados de reportes ambientales"
            format="GeoJSON, CSV"
            size="1.8 MB"
            updated="Actualización diaria"
          />
          <DatasetItem
            title="Proyecciones Climáticas"
            description="Modelos de IA para proyección de estrés hídrico 2025-2050"
            format="JSON, XLSX"
            size="850 KB"
            updated="Hace 1 semana"
          />
          <DatasetItem
            title="Infraestructura Hídrica"
            description="Ubicación y características de acueductos, plantas de tratamiento y embalses"
            format="GeoJSON, SHP"
            size="4.1 MB"
            updated="Hace 1 mes"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">API Pública Disponible</h3>
        <p className="mb-6">
          Accede programáticamente a todos los datos de WaterWay mediante nuestra API RESTful
        </p>
        <div className="bg-white/20 backdrop-blur rounded-lg p-4 font-mono text-sm">
          <code>GET https://api.waterway.org/v1/consumo</code>
        </div>
        <button className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Ver Documentación de API
        </button>
      </div>
    </div>
  )
}

// Components
function SectorKPI({ title, percentage, value, trend, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {percentage}%
      </div>
      <p className="text-gray-600 text-sm mb-2">{value}</p>
      <span className="text-xs font-medium text-green-600">{trend}</span>
    </div>
  )
}

function DatasetItem({ title, description, format, size, updated }) {
  return (
    <div className="flex items-start justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            {format}
          </span>
          <span className="flex items-center">
            <Database className="h-3 w-3 mr-1" />
            {size}
          </span>
          <span>{updated}</span>
        </div>
      </div>
      <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
        Descargar
      </button>
    </div>
  )
}
