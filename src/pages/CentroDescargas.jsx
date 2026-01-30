import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Brain, BarChart3, Droplet, MapPin, AlertTriangle, TrendingUp, Globe, Home, Download, FileText } from 'lucide-react'

export default function CentroDescargas() {
  const navigate = useNavigate()
  const [selectedCountry, setSelectedCountry] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="WaterWay Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">WaterWay</h1>
                <p className="text-xs text-gray-600">Centro de Descargas</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              <Home className="h-4 w-4" />
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Database className="h-5 w-5" />
            <span className="text-sm font-medium">Open Data</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Centro de Descargas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Accede a los datasets oficiales utilizados en nuestros modelos de IA y a los nuevos datasets generados por WaterWay
          </p>
        </div>
      </section>

      {/* Tarjeta informativa */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-start space-x-3">
              <Database className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Transparencia y Open Data</h4>
                <p className="text-sm text-gray-700">
                  Todos los datasets utilizados en WaterWay provienen de fuentes gubernamentales oficiales bajo licencias abiertas. 
                  Nuestros modelos de IA se entrenan exclusivamente con datos públicos para garantizar transparencia y replicabilidad.
                  Además, publicamos los nuevos datasets generados a través de nuestros modelos predictivos para contribuir al ecosistema de datos abiertos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de país */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedCountry('colombia')}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCountry === 'colombia' 
                  ? 'bg-gradient-to-r from-yellow-400 to-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500'
              }`}
            >
              <img src="https://flagcdn.com/w80/co.png" alt="Colombia" className="h-6" />
              <span>Colombia</span>
            </button>
            <button
              onClick={() => setSelectedCountry('uruguay')}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCountry === 'uruguay' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500'
              }`}
            >
              <img src="https://flagcdn.com/w80/uy.png" alt="Uruguay" className="h-6" />
              <span>Uruguay</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contenido de datasets */}
      {!selectedCountry && (
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Database className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              Selecciona un país para ver los datasets disponibles
            </h3>
            <p className="text-gray-500">
              Elige Colombia o Uruguay para explorar los datasets oficiales y las proyecciones generadas por nuestros modelos
            </p>
          </div>
        </section>
      )}

      {/* Datasets Colombia */}
      {selectedCountry === 'colombia' && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <img src="https://flagcdn.com/w80/co.png" alt="Colombia" className="h-10 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">Datasets - Colombia</h2>
                  <p className="text-gray-600">EPM Medellín y fuentes gubernamentales</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <DatasetCard 
                  title="Consumo de Agua - EPM Medellín"
                  description="Series temporales de consumo de agua potable en diferentes sectores de Medellín. Incluye datos históricos desde 2015 con frecuencia mensual."
                  icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
                  format="JSON, CSV"
                  source="EPM Medellín"
                  modelUse="Entrenamiento de modelos LSTM para predicción de demanda futura y detección de anomalías en patrones de consumo."
                />
                <DatasetCard 
                  title="Calidad del Agua"
                  description="Parámetros fisicoquímicos y microbiológicos del agua potable. Incluye pH, turbidez, cloro residual, coliformes totales y más."
                  icon={<Droplet className="h-6 w-6 text-blue-600" />}
                  format="JSON, CSV"
                  source="EPM - Laboratorio de Aguas"
                  modelUse="Análisis de calidad del agua y generación de alertas tempranas sobre posibles problemas de calidad."
                />
                <DatasetCard 
                  title="Reportes Ciudadanos"
                  description="Incidencias reportadas por la comunidad sobre el servicio de agua. Incluye tipo de problema, ubicación geográfica y tiempo de resolución."
                  icon={<MapPin className="h-6 w-6 text-blue-600" />}
                  format="JSON"
                  source="Sistema de Reportes WaterWay"
                  modelUse="Clasificación automática con Random Forest para priorización de reportes y detección de patrones espaciales."
                />
                <DatasetCard 
                  title="Proyecciones de Consumo (ML)"
                  description="Predicciones generadas por nuestros modelos LSTM sobre el consumo futuro de agua en Medellín para los próximos 12 meses."
                  icon={<Brain className="h-6 w-6 text-purple-600" />}
                  format="JSON, CSV"
                  source="WaterWay - Modelos Predictivos"
                  modelUse="Dataset generado por nuestros modelos, disponible para investigación y validación externa."
                  isNew
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Datasets Uruguay */}
      {selectedCountry === 'uruguay' && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <img src="https://flagcdn.com/w80/uy.png" alt="Uruguay" className="h-10 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">Datasets - Uruguay</h2>
                  <p className="text-gray-600">OSE y Catalogodatos.gub.uy</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <DatasetCard 
                  title="Calidad del Agua - Crisis Hídrica"
                  description="Análisis del agua durante la crisis hídrica de Uruguay (2023-2024). Incluye parámetros de calidad y niveles de embalses."
                  icon={<AlertTriangle className="h-6 w-6 text-orange-600" />}
                  format="CSV"
                  source="Catalogodatos.gub.uy"
                  modelUse="Análisis histórico de crisis hídricas y entrenamiento de modelos para detección temprana de situaciones críticas."
                  url="https://catalogodatos.gub.uy/dataset/analisis-del-agua-durante-la-crisis-hidrica"
                />
                <DatasetCard 
                  title="Mediciones de Nivel - DINAGUA"
                  description="Niveles de cuerpos de agua monitoreados por DINAGUA. Datos históricos de embalses, ríos y lagos principales."
                  icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
                  format="CSV"
                  source="DINAGUA - Catalogodatos.gub.uy"
                  modelUse="Modelos de predicción de niveles de agua y alertas de escasez hídrica basados en tendencias históricas."
                  url="https://catalogodatos.gub.uy/dataset/ambiente-dinagua-mediciones-de-nivel-2019"
                />
                <DatasetCard 
                  title="Datos Meteorológicos - INUMET"
                  description="Temperatura, humedad relativa y precipitación registradas por estaciones meteorológicas en todo Uruguay."
                  icon={<Globe className="h-6 w-6 text-blue-600" />}
                  format="CSV"
                  source="INUMET - Catalogodatos.gub.uy"
                  modelUse="Variables climáticas como features para modelos predictivos de estrés hídrico y disponibilidad de agua."
                  url="https://catalogodatos.gub.uy/dataset/inumet-observaciones-meteorologicas-precipitacion-puntual-en-el-uruguay"
                />
                <DatasetCard 
                  title="Proyecciones de Estrés Hídrico (ML)"
                  description="Predicciones de estrés hídrico para diferentes regiones de Uruguay basadas en modelos de ML que combinan datos climáticos, de consumo y niveles de agua."
                  icon={<Brain className="h-6 w-6 text-purple-600" />}
                  format="JSON, CSV"
                  source="WaterWay - Modelos Predictivos"
                  modelUse="Dataset generado por nuestros modelos, disponible para investigación y planificación de políticas públicas."
                  isNew
                />
              </div>
            </div>

            {/* Nota sobre OSE */}
            <div className="bg-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Nota sobre OSE (Obras Sanitarias del Estado)</h4>
                  <p className="text-sm text-gray-700">
                    OSE no tiene datasets descargables en formato abierto. Sin embargo, WaterWay integra información pública 
                    disponible en su sitio web oficial sobre calidad del agua, red de laboratorios y análisis (50,000 análisis/año).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Modelos de ML */}
      {selectedCountry && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <Brain className="h-10 w-10 mr-3" />
                <h3 className="text-2xl font-bold">Modelos de Machine Learning</h3>
              </div>
              <p className="mb-4">
                Nuestros modelos predictivos combinan múltiples fuentes de datos para generar proyecciones 
                de estrés hídrico, alertas tempranas y recomendaciones de política pública.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <h4 className="font-bold mb-2">Random Forest</h4>
                  <p className="text-sm">Clasificación de reportes ciudadanos y detección de patrones espaciales</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <h4 className="font-bold mb-2">LSTM</h4>
                  <p className="text-sm">Series temporales de consumo y proyecciones climáticas</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <h4 className="font-bold mb-2">GPT-4</h4>
                  <p className="text-sm">Análisis de lenguaje natural en chatbots y generación de reportes</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.png" alt="WaterWay" className="h-8 w-auto" />
            <span className="font-bold text-lg">WaterWay</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Plataforma de gestión hídrica inteligente para Colombia y Uruguay
          </p>
          <p className="text-gray-500 text-xs">
            © 2026 WaterWay. Datos abiertos para el desarrollo sostenible.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Component: DatasetCard
function DatasetCard({ title, description, icon, format, source, modelUse, url, isNew = false }) {
  const handleDownload = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      alert('Dataset próximamente disponible')
    }
  }

  return (
    <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
              {isNew && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  NUEVO
                </span>
              )}
            </div>
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
                {source}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de descarga */}
      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          <Download className="h-4 w-4" />
          <span>{url ? 'Descargar Dataset' : 'Próximamente'}</span>
        </button>
      </div>
    </div>
  )
}
