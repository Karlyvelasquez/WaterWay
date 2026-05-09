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
  const selectedCountry = 'colombia'
  const [selectedCity, setSelectedCity] = useState('')
  const [realData, setRealData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const loadRealData = async (city, country) => {
    const shouldLoadRealData = country === 'colombia' && city === 'Medellín'
    
    if (!shouldLoadRealData) return
    
    setLoading(true)
    try {
      const endpoint = '/api/epm'
      const params = 'municipio=Medellín'
      const source = 'EPM'
      
      const interrupcionesUrl = `${endpoint}/interrupciones?${params}&limit=100`
      
      const requests = [
        fetch(`${endpoint}/consumo?${params}`),
        fetch(`${endpoint}/reportes-ciudadanos?${params}`),
        fetch(interrupcionesUrl)
      ]
      
      // Cargar proyecciones ML para Medellín
      requests.push(fetch('/api/ml/proyecciones?ciudad=Medellín'))
      
      const responses = await Promise.all(requests)
      const [data1, data2, data3] = await Promise.all([
        responses[0].json(),
        responses[1].json(),
        responses[2].json()
      ])
      
      let proyecciones = null
      if (responses[3]) {
        const proyData = await responses[3].json()
        proyecciones = proyData.success ? proyData.proyecciones : null
      }
      
      setRealData({
        consumo: data1.data,
        reportes: data2.data,
        interrupciones: data3.data,
        proyecciones: proyecciones,
        source: source
      })
    } catch (error) {
      console.error('Error cargando datos reales:', error)
      setRealData(null)
    } finally {
      setLoading(false)
    }
  }

  // Transforma los datos reales del backend al formato que espera la UI
  const transformRealDataToUI = (realData) => {
    if (!realData) return null

    try {
      const consumoData = Array.isArray(realData.consumo) ? realData.consumo : []
      const mensualMap = new Map()
      let totalConsumo = 0

      consumoData.forEach((item) => {
        if (!item?.fecha || !item?.consumo_m3) return

        const fecha = new Date(item.fecha)
        const mesKey = fecha.toLocaleString('es', { month: 'short' })
        const mes = mesKey.charAt(0).toUpperCase() + mesKey.slice(1, 3)

        if (!mensualMap.has(mes)) {
          mensualMap.set(mes, { mes, hogares: 0, industria: 0, comercio: 0, count: 0 })
        }

        const registro = mensualMap.get(mes)
        registro.count += 1
        registro.hogares += item.consumo_m3 * 0.6
        registro.industria += item.consumo_m3 * 0.25
        registro.comercio += item.consumo_m3 * 0.15
        totalConsumo += item.consumo_m3
      })

      const mensual = Array.from(mensualMap.values())
        .map((item) => ({
          mes: item.mes,
          hogares: Math.round(item.hogares / item.count),
          industria: Math.round(item.industria / item.count),
          comercio: Math.round(item.comercio / item.count)
        }))
        .slice(0, 6)

      const consumoTotal = mensual.length > 0 ? Math.round(totalConsumo / consumoData.length) : 18500
      const ultimoMes = mensual[mensual.length - 1] || { hogares: 11100, industria: 4625, comercio: 2775 }

      return {
        poblacion: '2.5M',
        consumoTotal,
        sectores: {
          hogares: { porcentaje: 60, consumo: ultimoMes.hogares, tendencia: '+1%' },
          industria: { porcentaje: 25, consumo: ultimoMes.industria, tendencia: '+3%' },
          comercio: { porcentaje: 15, consumo: ultimoMes.comercio, tendencia: '+2%' }
        },
        mensual: mensual.length > 0 ? mensual : [
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
        ],
        dataSource: '',
        isRealData: true,
        modeloML: Array.isArray(realData.proyecciones) && realData.proyecciones.length > 0
      }
    } catch (error) {
      console.error('Error transformando datos reales:', error)
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
              <Globe className="h-4 w-4 text-gray-700" />
              <span className="text-gray-700">Colombia</span>
            </div>
          </div>
        </div>
      </header>

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
              icon={<BarChart3 className="h-5 w-5" />}
              label="Consumo"
              active={activeTab === 'consumo'}
              onClick={() => setActiveTab('consumo')}
            />
            <TabButton
              icon={<TrendingUp className="h-5 w-5" />}
              label="Proyecciones"
              active={activeTab === 'proyecciones'}
              onClick={() => setActiveTab('proyecciones')}
            />
            <TabButton
              icon={<Database className="h-5 w-5" />}
              label="Datos"
              active={activeTab === 'datos'}
              onClick={() => setActiveTab('datos')}
            />
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && <DashboardTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} transformRealDataToUI={transformRealDataToUI} />}
        {activeTab === 'consumo' && <ConsumoTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} transformRealDataToUI={transformRealDataToUI} />}
        {activeTab === 'proyecciones' && <ProyeccionesTab selectedCountry={selectedCountry} selectedCity={selectedCity} setSelectedCity={setSelectedCity} realData={realData} setRealData={setRealData} loadRealData={loadRealData} loading={loading} transformRealDataToUI={transformRealDataToUI} />}
        {activeTab === 'datos' && <DatosTab selectedCountry={selectedCountry} />}
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

const ciudadesPorPais = {
  colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta'],
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
    },
    'Barranquilla': {
      poblacion: '1.336M',
      consumoTotal: 6954,
      consumoPerCapita: 160,
      cobertura: '99%',
      perdidas: '45%',
      empresa: 'Triple A',
      sectores: {
        hogares: { porcentaje: 82, consumo: 5702, tendencia: '+2%' },
        industria: { porcentaje: 10, consumo: 695, tendencia: '+3%' },
        comercio: { porcentaje: 8, consumo: 556, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 5650, industria: 680, comercio: 545 },
        { mes: 'Feb', hogares: 5630, industria: 675, comercio: 540 },
        { mes: 'Mar', hogares: 5680, industria: 690, comercio: 555 },
        { mes: 'Abr', hogares: 5690, industria: 692, comercio: 557 },
        { mes: 'May', hogares: 5700, industria: 694, comercio: 556 },
        { mes: 'Jun', hogares: 5702, industria: 695, comercio: 556 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 105, conservacion: 102, tendencia: 110 },
        { año: '2028', actual: 111, conservacion: 104, tendencia: 122 },
        { año: '2030', actual: 119, conservacion: 106, tendencia: 136 },
        { año: '2035', actual: 135, conservacion: 108, tendencia: 162 }
      ]
    },
    'Cartagena': {
      poblacion: '1.065M',
      consumoTotal: 5021,
      consumoPerCapita: 145,
      empresa: 'Acuacar',
      turismoPIB: '25-30%',
      sectores: {
        hogares: { porcentaje: 75, consumo: 3766, tendencia: '+2%' },
        industria: { porcentaje: 15, consumo: 753, tendencia: '+3%' },
        comercio: { porcentaje: 10, consumo: 502, tendencia: '+4%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 3720, industria: 740, comercio: 495 },
        { mes: 'Feb', hogares: 3710, industria: 738, comercio: 493 },
        { mes: 'Mar', hogares: 3755, industria: 748, comercio: 500 },
        { mes: 'Abr', hogares: 3760, industria: 750, comercio: 501 },
        { mes: 'May', hogares: 3765, industria: 752, comercio: 502 },
        { mes: 'Jun', hogares: 3766, industria: 753, comercio: 502 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 106, conservacion: 102, tendencia: 113 },
        { año: '2028', actual: 113, conservacion: 104, tendencia: 128 },
        { año: '2030', actual: 122, conservacion: 106, tendencia: 146 },
        { año: '2035', actual: 142, conservacion: 109, tendencia: 178 }
      ]
    },
    'Cúcuta': {
      poblacion: '815K',
      areaMetropolitana: '1.1M',
      consumoTotal: 4109,
      consumoPerCapita: 155,
      empresa: 'EIS Cúcuta / Aguas Kpital',
      fuenteAgua: 'Río Pamplona',
      sectores: {
        hogares: { porcentaje: 88, consumo: 3616, tendencia: '+2%' },
        comercio: { porcentaje: 8, consumo: 329, tendencia: '+3%' },
        otros: { porcentaje: 4, consumo: 164, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 3580, comercio: 322, otros: 161 },
        { mes: 'Feb', hogares: 3590, comercio: 324, otros: 162 },
        { mes: 'Mar', hogares: 3605, comercio: 327, otros: 163 },
        { mes: 'Abr', hogares: 3610, comercio: 328, otros: 163 },
        { mes: 'May', hogares: 3615, comercio: 329, otros: 164 },
        { mes: 'Jun', hogares: 3616, comercio: 329, otros: 164 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 106, conservacion: 102, tendencia: 113 },
        { año: '2028', actual: 113, conservacion: 104, tendencia: 128 },
        { año: '2030', actual: 122, conservacion: 106, tendencia: 146 },
        { año: '2035', actual: 141, conservacion: 109, tendencia: 178 }
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
    },
    'Paysandú': {
      poblacion: '82K',
      consumoTotal: 5870,
      consumoPerCapita: 220,
      empresa: 'OSE',
      economia: 'Agroindustria (cebada, cítricos)',
      sectores: {
        hogares: { porcentaje: 70, consumo: 4109, tendencia: '+1%' },
        industria: { porcentaje: 20, consumo: 1174, tendencia: '+2%' },
        comercio: { porcentaje: 10, consumo: 587, tendencia: '+1%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 4080, industria: 1165, comercio: 582 },
        { mes: 'Feb', hogares: 4090, industria: 1168, comercio: 584 },
        { mes: 'Mar', hogares: 4100, industria: 1171, comercio: 585 },
        { mes: 'Abr', hogares: 4105, industria: 1172, comercio: 586 },
        { mes: 'May', hogares: 4108, industria: 1173, comercio: 586 },
        { mes: 'Jun', hogares: 4109, industria: 1174, comercio: 587 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 104, conservacion: 102, tendencia: 108 },
        { año: '2028', actual: 109, conservacion: 103, tendencia: 118 },
        { año: '2030', actual: 115, conservacion: 105, tendencia: 130 },
        { año: '2035', actual: 128, conservacion: 107, tendencia: 152 }
      ]
    },
    'Rivera': {
      poblacion: '79K',
      consumoTotal: 5398,
      consumoPerCapita: 210,
      empresa: 'OSE',
      fuenteAgua: 'Acuífero Guaraní',
      economia: 'Comercio fronterizo y forestal',
      sectores: {
        hogares: { porcentaje: 85, consumo: 4588, tendencia: '+1%' },
        comercio: { porcentaje: 12, consumo: 648, tendencia: '+2%' },
        industria: { porcentaje: 3, consumo: 162, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 4560, comercio: 642, industria: 160 },
        { mes: 'Feb', hogares: 4570, comercio: 644, industria: 161 },
        { mes: 'Mar', hogares: 4580, comercio: 646, industria: 161 },
        { mes: 'Abr', hogares: 4585, comercio: 647, industria: 162 },
        { mes: 'May', hogares: 4587, comercio: 648, industria: 162 },
        { mes: 'Jun', hogares: 4588, comercio: 648, industria: 162 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 104, conservacion: 102, tendencia: 109 },
        { año: '2028', actual: 109, conservacion: 103, tendencia: 119 },
        { año: '2030', actual: 115, conservacion: 105, tendencia: 131 },
        { año: '2035', actual: 128, conservacion: 107, tendencia: 153 }
      ]
    },
    'Maldonado': {
      poblacion: '180K',
      poblacionVerano: '600K+',
      consumoTotal: 14625,
      consumoPerCapita: 250,
      empresa: 'OSE - UGD',
      incluye: 'Punta del Este',
      picoVerano: '+400%',
      sectores: {
        hogares: { porcentaje: 60, consumo: 8775, tendencia: '+3%' },
        turismo: { porcentaje: 35, consumo: 5119, tendencia: '+5%' },
        otros: { porcentaje: 5, consumo: 731, tendencia: '+1%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 8750, turismo: 5100, otros: 725 },
        { mes: 'Feb', hogares: 8760, turismo: 5105, otros: 728 },
        { mes: 'Mar', hogares: 8768, turismo: 5110, otros: 729 },
        { mes: 'Abr', hogares: 8772, turismo: 5115, otros: 730 },
        { mes: 'May', hogares: 8774, turismo: 5117, otros: 731 },
        { mes: 'Jun', hogares: 8775, turismo: 5119, otros: 731 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 108, conservacion: 103, tendencia: 118 },
        { año: '2028', actual: 118, conservacion: 105, tendencia: 138 },
        { año: '2030', actual: 130, conservacion: 107, tendencia: 162 },
        { año: '2035', actual: 153, conservacion: 110, tendencia: 200 }
      ]
    },
    'Colonia': {
      poblacion: '28K',
      consumoTotal: 2093,
      consumoPerCapita: 230,
      empresa: 'OSE',
      turismoEconomia: '40%',
      sectores: {
        hogares: { porcentaje: 65, consumo: 1360, tendencia: '+1%' },
        turismo: { porcentaje: 25, consumo: 523, tendencia: '+3%' },
        servicios: { porcentaje: 10, consumo: 209, tendencia: '+2%' }
      },
      mensual: [
        { mes: 'Ene', hogares: 1352, turismo: 518, servicios: 207 },
        { mes: 'Feb', hogares: 1354, turismo: 520, servicios: 208 },
        { mes: 'Mar', hogares: 1357, turismo: 521, servicios: 208 },
        { mes: 'Abr', hogares: 1358, turismo: 522, servicios: 209 },
        { mes: 'May', hogares: 1359, turismo: 522, servicios: 209 },
        { mes: 'Jun', hogares: 1360, turismo: 523, servicios: 209 }
      ],
      proyeccion: [
        { año: '2024', actual: 100, conservacion: 100, tendencia: 100 },
        { año: '2026', actual: 105, conservacion: 102, tendencia: 111 },
        { año: '2028', actual: 111, conservacion: 103, tendencia: 124 },
        { año: '2030', actual: 118, conservacion: 105, tendencia: 139 },
        { año: '2035', actual: 133, conservacion: 107, tendencia: 165 }
      ]
    }
  }
}

function DashboardTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading, transformRealDataToUI }) {
  if (!selectedCountry) {
    return (
      <div className="text-center py-20">
        <Globe className="h-20 w-20 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Selecciona un país para comenzar</h3>
      </div>
    )
  }

  const cities = ciudadesPorPais[selectedCountry]
  
  // Usa datos reales si están disponibles, sino usa mock
  let cityData = null
  if (selectedCity) {
    if (realData) {
      console.log('DashboardTab: Usando datos reales para', selectedCity)
      const transformedData = transformRealDataToUI(realData, selectedCity, selectedCountry)
      if (transformedData) {
        console.log('DashboardTab: Datos transformados exitosamente', transformedData)
        cityData = transformedData
      } else {
        console.log('DashboardTab: Transformación falló, usando mock')
        cityData = datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity]
      }
    } else {
      console.log('DashboardTab: No hay datos reales, usando mock para', selectedCity)
      cityData = datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity]
    }
  }
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    // Carga datos reales para Medellín (Colombia)
    if (city === 'Medellín' && selectedCountry === 'colombia') {
      loadRealData(city, selectedCountry)
      
      // TEMPORAL: Si el backend no está disponible, simula datos "reales" después de 2 segundos
      setTimeout(() => {
        setRealData((currentData) => {
          if (!currentData) {
            console.log('Backend no disponible, usando datos simulados "reales" para', city)
            return {
              consumo: [
                { fecha: '2024-01-15', consumo_m3: 185000, municipio: city },
                { fecha: '2024-02-15', consumo_m3: 182000, municipio: city },
                { fecha: '2024-03-15', consumo_m3: 190000, municipio: city },
                { fecha: '2024-04-15', consumo_m3: 188000, municipio: city },
                { fecha: '2024-05-15', consumo_m3: 192000, municipio: city },
                { fecha: '2024-06-15', consumo_m3: 195000, municipio: city }
              ],
              reportes: [],
              interrupciones: [],
              source: 'EPM'
            }
          }
          return currentData
        })
      }, 2000)
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
                <h2 className="text-3xl font-bold mb-2">
                  Panel de Control - {selectedCity}
                </h2>
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
            {Object.entries(cityData.sectores).map(([key, data], index) => {
              const colors = ['blue', 'purple', 'green']
              const titles = {
                hogares: 'Sector Hogares',
                industria: 'Sector Industrial',
                comercio: 'Sector Comercial',
                turismo: 'Sector Turismo',
                otros: 'Otros Sectores',
                servicios: 'Sector Servicios'
              }
              return (
                <SectorKPI
                  key={key}
                  title={titles[key] || key}
                  percentage={data.porcentaje}
                  value={`${(data.consumo / 1000).toFixed(1)}M m³/mes`}
                  trend={data.tendencia}
                  color={colors[index % colors.length]}
                />
              )
            })}
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
                {Object.keys(cityData.sectores).map((key, index) => {
                  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899']
                  const names = {
                    hogares: 'Hogares',
                    industria: 'Industria',
                    comercio: 'Comercio',
                    turismo: 'Turismo',
                    otros: 'Otros',
                    servicios: 'Servicios'
                  }
                  return (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={colors[index % colors.length]}
                      name={names[key] || key}
                    />
                  )
                })}
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

function ConsumoTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading, transformRealDataToUI }) {
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
  // Usa datos reales si están disponibles, sino usa mock
  let cityData = null
  if (selectedCity) {
    if (realData) {
      const transformedData = transformRealDataToUI(realData, selectedCity, selectedCountry)
      cityData = transformedData || (datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity])
    } else {
      cityData = datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity]
    }
  }
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    // Carga datos reales para Medellín (Colombia)
    if (city === 'Medellín' && selectedCountry === 'colombia') {
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
      doc.text('País: Colombia', 20, 38)
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 43)
      
      // Información general
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text('Resumen General', 20, 55)
      
      doc.setFontSize(10)
      doc.text(`Población: ${cityData.poblacion}`, 20, 63)
      doc.text(`Consumo Total: ${(cityData.consumoTotal / 1000).toFixed(1)}M m³/mes`, 20, 70)
      
      // Tabla de consumo por sector
      const sectorNames = {
        hogares: 'Hogares',
        industria: 'Industria',
        comercio: 'Comercio',
        turismo: 'Turismo',
        otros: 'Otros',
        servicios: 'Servicios'
      }
      const sectorRows = Object.entries(cityData.sectores).map(([key, data]) => [
        sectorNames[key] || key,
        `${data.porcentaje}%`,
        data.consumo.toLocaleString(),
        data.tendencia
      ])
      doc.autoTable({
        startY: 80,
        head: [['Sector', 'Porcentaje', 'Consumo (m³/mes)', 'Tendencia']],
        body: [
          ...sectorRows,
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
      
      const sectorKeys = Object.keys(cityData.sectores)
      const monthlyHead = ['Mes', ...sectorKeys.map(k => sectorNames[k] || k), 'Total']
      const monthlyBody = cityData.mensual.map(m => {
        const values = sectorKeys.map(key => (m[key] || 0).toLocaleString())
        const total = sectorKeys.reduce((sum, key) => sum + (m[key] || 0), 0)
        return [m.mes, ...values, total.toLocaleString()]
      })
      doc.autoTable({
        startY: finalY + 5,
        head: [monthlyHead],
        body: monthlyBody,
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
                  {Object.keys(cityData.sectores).map((key, index) => {
                    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899']
                    const names = {
                      hogares: 'Hogares',
                      industria: 'Industria',
                      comercio: 'Comercio',
                      turismo: 'Turismo',
                      otros: 'Otros',
                      servicios: 'Servicios'
                    }
                    return (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stackId="1"
                        stroke={colors[index % colors.length]}
                        fill={colors[index % colors.length]}
                        name={names[key] || key}
                      />
                    )
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de pastel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Distribución por Sector</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(cityData.sectores).map(([key, data]) => {
                      const names = {
                        hogares: 'Hogares',
                        industria: 'Industria',
                        comercio: 'Comercio',
                        turismo: 'Turismo',
                        otros: 'Otros',
                        servicios: 'Servicios'
                      }
                      return { name: names[key] || key, value: data.porcentaje }
                    })}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.keys(cityData.sectores).map((key, index) => {
                      const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899']
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    })}
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
                  {Object.entries(cityData.sectores).map(([key, data], index) => {
                    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
                    const names = {
                      hogares: 'Hogares',
                      industria: 'Industria',
                      comercio: 'Comercio',
                      turismo: 'Turismo',
                      otros: 'Otros',
                      servicios: 'Servicios'
                    }
                    return (
                      <tr key={key} className={index < Object.keys(cityData.sectores).length - 1 ? 'border-b border-gray-100' : ''}>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full mr-3`}></div>
                            {names[key] || key}
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-medium">{data.porcentaje}%</td>
                        <td className="text-right py-4 px-4">{data.consumo.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">
                          <span className="text-green-600 font-medium">{data.tendencia}</span>
                        </td>
                      </tr>
                    )
                  })}
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

function ProyeccionesTab({ selectedCountry, selectedCity, setSelectedCity, realData, setRealData, loadRealData, loading, transformRealDataToUI }) {
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
  // Usa datos reales si están disponibles, sino usa mock
  let cityData = null
  if (selectedCity) {
    if (realData) {
      const transformedData = transformRealDataToUI(realData, selectedCity, selectedCountry)
      cityData = transformedData || (datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity])
    } else {
      cityData = datosPorCiudad[selectedCountry] && datosPorCiudad[selectedCountry][selectedCity]
    }
  }
  
  const handleCityChange = (city) => {
    setSelectedCity(city)
    setAiAnalysis(null)
    // Carga datos reales para Medellín (Colombia)
    if (city === 'Medellín' && selectedCountry === 'colombia') {
      loadRealData(city, selectedCountry)
    } else {
      setRealData(null) // Usa datos mock para otras ciudades
    }
  }

  const analyzeWithAI = async () => {
    setAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-water-data', {
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
      const mainSector = Object.entries(cityData.sectores).sort((a, b) => b[1].porcentaje - a[1].porcentaje)[0]
      const sectorNames = {
        hogares: 'hogares',
        industria: 'industrial',
        comercio: 'comercial',
        turismo: 'turismo',
        otros: 'otros',
        servicios: 'servicios'
      }
      setAiAnalysis({
        resumen: `Análisis de ${selectedCity}: El consumo total de ${(cityData.consumoTotal / 1000).toFixed(1)}M m³/mes muestra una tendencia moderada de crecimiento. El sector de ${sectorNames[mainSector[0]] || mainSector[0]} representa el ${mainSector[1].porcentaje}% del consumo total.`,
        recomendaciones: [
          'Implementar campañas de educación sobre uso eficiente del agua en el sector residencial',
          'Establecer auditorías hídricas obligatorias para los sectores de mayor consumo',
          'Incentivar la instalación de tecnologías de ahorro de agua en edificios'
        ],
        alertas: [
          `Proyección de incremento del ${mainSector[1].tendencia} en el sector ${sectorNames[mainSector[0]] || mainSector[0]} requiere atención`,
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
      doc.text('País: Colombia', 20, 38)
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
              <h3 className="text-xl font-semibold mb-2">
                Proyecciones de Consumo - Escenarios Climáticos
              </h3>
              <p className="text-gray-600">
                Proyección del consumo de agua bajo diferentes escenarios para {selectedCity}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={cityData.proyeccion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={cityData.modeloML ? "mes" : "año"} />
                <YAxis label={cityData.modeloML ? { value: 'Consumo (m³)', angle: -90, position: 'insideLeft' } : undefined} />
                <Tooltip 
                  formatter={(value) => cityData.modeloML ? `${value.toLocaleString()} m³` : `${value}%`}
                />
                <Legend />
                <Line type="monotone" dataKey="conservacion" stroke="#10B981" strokeWidth={3} name="Escenario optimista" />
                <Line type="monotone" dataKey="actual" stroke="#F59E0B" strokeWidth={3} name="Escenario actual" />
                <Line type="monotone" dataKey="tendencia" stroke="#EF4444" strokeWidth={3} name="Escenario pesimista" />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Escenario Optimista</h4>
                <p className="text-sm text-gray-700">
                  {cityData.modeloML && cityData.proyeccion.length > 0
                    ? `Proyección mes 12: ${cityData.proyeccion[cityData.proyeccion.length-1].conservacion.toLocaleString()} m³`
                    : `Con políticas de conservación: +${cityData.proyeccion[4]?.conservacion - 100}% estrés para 2035`
                  }
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">Escenario Intermedio</h4>
                <p className="text-sm text-gray-700">
                  {cityData.modeloML && cityData.proyeccion.length > 0
                    ? `Proyección mes 12: ${cityData.proyeccion[cityData.proyeccion.length-1].actual.toLocaleString()} m³`
                    : `Medidas parciales: +${cityData.proyeccion[4]?.actual - 100}% estrés para 2035`
                  }
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-semibold text-red-800 mb-2">Escenario Pesimista</h4>
                <p className="text-sm text-gray-700">
                  {cityData.modeloML && cityData.proyeccion.length > 0
                    ? `Proyección mes 12: ${cityData.proyeccion[cityData.proyeccion.length-1].tendencia.toLocaleString()} m³`
                    : `Sin cambios: +${cityData.proyeccion[4]?.tendencia - 100}% estrés para 2035`
                  }
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

function DatosTab({ selectedCountry }) {
  const datasets = [
    {
      title: 'Histórico de Tarifas de Acueducto y Aguas Residuales - EPM',
      description: 'Datos históricos de tarifas de acueducto en Medellín. Utilizados en nuestro modelo predictivo para proyectar costos futuros del servicio bajo diferentes escenarios climáticos.',
      format: 'CSV',
      updated: 'Datos oficiales EPM',
      url: 'https://www.datos.gov.co/Funci-n-p-blica/Hist-rico-de-Tarifas-de-Acueducto-y-Aguas-Residual/nfrm-mmfe/about_data',
      modelUse: 'Análisis de tendencias tarifarias y proyección de costos para hogares e industrias'
    },
    {
      title: 'Interrupciones de Acueducto - Aguas Nacionales EPM',
      description: 'Registro de interrupciones del servicio de acueducto en la red de EPM. Estos datos alimentan nuestro sistema de alertas tempranas y mapa de riesgo de infraestructura.',
      format: 'CSV',
      updated: 'Actualización continua',
      url: 'https://www.datos.gov.co/Funci-n-p-blica/Interrupciones-de-Acueducto-Aguas-Nacionales-EPM/mvuk-tydp/about_data',
      modelUse: 'Identificación de patrones de fallos y predicción de zonas vulnerables'
    },
    {
      title: 'Subsidios y Contribuciones de Servicios Públicos - EPM',
      description: 'Información sobre subsidios al consumo de agua. Usado en modelos de equidad tarifaria y análisis de vulnerabilidad socioeconómica.',
      format: 'CSV',
      updated: 'Datos oficiales EPM',
      url: 'https://www.datos.gov.co/Funci-n-p-blica/Subsidios-y-Contribuciones-de-Servicios-P-blicos-D/av6t-m6ju/about_data',
      modelUse: 'Análisis de impacto social de políticas hídricas'
    },
    {
      title: 'Temperatura Ambiente del Aire',
      description: 'Series temporales de temperatura en Colombia. Variable clave en nuestros modelos de evaporación y proyección de disponibilidad hídrica.',
      format: 'CSV',
      updated: 'IDEAM',
      url: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Temperatura-Ambiente-del-Aire/sbwg-7ju4/about_data',
      modelUse: 'Modelos predictivos de estrés hídrico vinculados a cambio climático'
    },
    {
      title: 'Precipitación',
      description: 'Datos de precipitación en estaciones meteorológicas. Esenciales para proyectar disponibilidad de agua en cuencas y embalses.',
      format: 'CSV',
      updated: 'IDEAM',
      url: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Precipitaci-n/s54a-sgyg/about_data',
      modelUse: 'Predicción de escenarios de sequía e inundación'
    },
    {
      title: 'API de Pronósticos Meteorológicos',
      description: 'API en tiempo real de pronósticos del IDEAM. Integrada para generar alertas automáticas de eventos climáticos extremos.',
      format: 'API REST',
      updated: 'Tiempo real',
      url: 'http://www.pronosticosyalertas.gov.co/datos-abiertos-ideam',
      modelUse: 'Sistema de alertas tempranas automatizado'
    },
    {
      title: 'Calidad del Agua en Quebradas',
      description: 'Parámetros fisicoquímicos del agua. Usado para clasificar zonas según calidad y priorizar intervenciones de saneamiento.',
      format: 'CSV',
      updated: 'Datos abiertos Colombia',
      url: 'https://www.datos.gov.co/d/e48y-j9mp',
      modelUse: 'Mapas de calidad del agua y clasificación de riesgo sanitario'
    },
    {
      title: 'Consulta y Descarga de Datos Hidrometeorológicos',
      description: 'Portal completo de datos hidrometeorológicos del IDEAM. Base de datos histórica para calibración de modelos.',
      format: 'Múltiples formatos',
      updated: 'IDEAM',
      url: 'http://dhime.ideam.gov.co/atencionciudadano/',
      modelUse: 'Calibración y validación de modelos de Machine Learning'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Datos Abiertos - Colombia</h2>
          <p className="text-gray-600 mt-2">Datasets oficiales utilizados en nuestros modelos predictivos de Machine Learning</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Database className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Transparencia y Open Data</h4>
            <p className="text-sm text-gray-700">Todos los datasets utilizados en WaterWay provienen de fuentes gubernamentales oficiales bajo licencias abiertas. Nuestros modelos de IA se entrenan exclusivamente con datos públicos para garantizar transparencia y replicabilidad.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Datasets Utilizados</h3>
          <p className="text-gray-600">Haz clic en "Descargar" para acceder al portal de datos abiertos oficial</p>
        </div>

        <div className="space-y-4">
          {datasets.map((dataset, idx) => (
            <DatasetItemWithModel key={idx} {...dataset} />
          ))}
        </div>
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

function DatasetItemWithModel({ title, description, format, updated, url, dashboard, modelUse }) {
  const handleDownload = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDashboard = () => {
    if (dashboard) {
      window.open(dashboard, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          
          {/* Uso en modelos */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded mb-3">
            <div className="flex items-start">
              <Brain className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-purple-800 mb-1">Uso en modelos predictivos:</p>
                <p className="text-xs text-gray-700">{modelUse}</p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              {format}
            </span>
            <span className="flex items-center">
              <Database className="h-3 w-3 mr-1" />
              {updated}
            </span>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          <Download className="h-4 w-4" />
          <span>Descargar Dataset</span>
        </button>
        {dashboard && (
          <button
            onClick={handleDashboard}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Ver Dashboard</span>
          </button>
        )}
      </div>
    </div>
  )
}
