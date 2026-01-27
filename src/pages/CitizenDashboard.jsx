import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Home, MapPin, AlertTriangle, MessageCircle, ChevronLeft, Camera, Send, X, CheckCircle, Upload, Droplet, Microscope, MapPinned, Building2, Factory, Database, Cog, Gem, BarChart3, Smartphone, HelpCircle, FileText, Landmark, Check, AlertCircle, XCircle, ArrowDown, MousePointer2, RefreshCw, Lightbulb, Globe } from 'lucide-react'

export default function CitizenDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('inicio')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showCountryModal, setShowCountryModal] = useState(true)

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountryModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Modal de selección de país */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-slide-up">
            <div className="text-center mb-8">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">¡Bienvenido a WaterWay Ciudadano!</h2>
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
                  <h1 className="text-xl font-bold text-gradient">WaterWay Ciudadano</h1>
                  <p className="text-xs text-gray-600">Portal de Participación</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {selectedCountry && (
                <button
                  onClick={() => setShowCountryModal(true)}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  <Globe className="h-4 w-4 text-gray-700" />
                  <span className="text-gray-700">{selectedCountry === 'colombia' ? 'Colombia' : 'Uruguay'}</span>
                </button>
              )}
              <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Ciudadano</span>
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
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Reportar Problema"
              active={activeTab === 'reporte'}
              onClick={() => setActiveTab('reporte')}
            />
            <TabButton
              icon={<MapPin className="h-5 w-5" />}
              label="Mapa de Riesgo"
              active={activeTab === 'mapa'}
              onClick={() => setActiveTab('mapa')}
            />
            <TabButton
              icon={<MessageCircle className="h-5 w-5" />}
              label="Asistente"
              active={activeTab === 'asistente'}
              onClick={() => setActiveTab('asistente')}
            />
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && <InicioTab selectedCountry={selectedCountry} />}
        {activeTab === 'reporte' && <ReporteTab selectedCountry={selectedCountry} />}
        {activeTab === 'mapa' && <MapaTab selectedCountry={selectedCountry} />}
        {activeTab === 'asistente' && <AsistenteTab />}
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
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function InicioTab({ selectedCountry }) {
  // Contenido específico por país
  const contentByCountry = {
    colombia: {
      stats: [
        { number: "312", label: "Reportes en Colombia" },
        { number: "91%", label: "Tasa de respuesta" },
        { number: "23", label: "Entidades activas" }
      ],
      news: [
        { title: "IDEAM publica nuevo reporte sobre cuencas", date: "Hace 1 día" },
        { title: "CAR anuncia plan de conservación del río Bogotá", date: "Hace 3 días" },
        { title: "MinAmbiente lanza estrategia de agua 2024", date: "Hace 5 días" }
      ],
      links: [
        { name: "IDEAM - Instituto de Hidrología", url: "http://www.ideam.gov.co" },
        { name: "MinAmbiente", url: "https://www.minambiente.gov.co" },
        { name: "CAR - Corporación Autónoma Regional", url: "https://www.car.gov.co" }
      ]
    },
    uruguay: {
      stats: [
        { number: "187", label: "Reportes en Uruguay" },
        { number: "94%", label: "Tasa de respuesta" },
        { number: "12", label: "Entidades activas" }
      ],
      news: [
        { title: "OSE anuncia mejoras en red de distribución", date: "Hace 2 días" },
        { title: "MVOTMA presenta plan de gestión hídrica", date: "Hace 4 días" },
        { title: "Dinagua actualiza datos de calidad del agua", date: "Hace 1 semana" }
      ],
      links: [
        { name: "OSE - Obras Sanitarias del Estado", url: "https://www.ose.com.uy" },
        { name: "Dinagua", url: "https://www.gub.uy/ministerio-ambiente" },
        { name: "MVOTMA - Ministerio de Ambiente", url: "https://www.gub.uy/ministerio-ambiente" }
      ]
    }
  }

  const content = selectedCountry ? contentByCountry[selectedCountry] : contentByCountry.colombia

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Tu voz importa</h2>
        <p className="text-lg opacity-90">
          Como ciudadano, eres clave en la detección temprana de problemáticas ambientales. Reporta, consulta y participa activamente.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {content.stats.map((stat, idx) => (
          <StatCard key={idx} number={stat.number} label={stat.label} color={idx === 0 ? 'green' : idx === 1 ? 'blue' : 'purple'} />
        ))}
      </div>

      {/* Noticias */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-2 mr-3"></span>
          Novedades {selectedCountry === 'colombia' ? 'en Colombia' : 'en Uruguay'}
        </h3>
        <div className="space-y-3">
          {content.news.map((item, idx) => (
            <div key={idx} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all cursor-pointer">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-green-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces útiles */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-2 mr-3"></span>
          Enlaces de interés
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {content.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-all border border-blue-200"
            >
              <span className="font-medium text-gray-800 text-sm">{link.name}</span>
              <ExternalLink className="h-4 w-4 text-blue-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReporteTab({ selectedCountry }) {
  const [formData, setFormData] = useState({
    tipo: '',
    ciudad: '',
    descripcion: '',
    imagen: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [entidadAsignada, setEntidadAsignada] = useState('')

  // Ciudades por país
  const ciudadesPorPais = {
    colombia: [
      'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
      'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué',
      'Pasto', 'Manizales', 'Neiva', 'Villavicencio', 'Armenia'
    ],
    uruguay: [
      'Montevideo', 'Salto', 'Paysandú', 'Maldonado', 'Rivera',
      'Tacuarembó', 'Melo', 'Mercedes', 'Artigas', 'Minas',
      'Colonia', 'Florida', 'Durazno', 'Treinta y Tres', 'Rocha'
    ]
  }

  // Mapeo de entidades por ciudad y tipo de problema
  const entidadesPorCiudad = {
    colombia: {
      'Bogotá': { vertimiento: 'CAR y Secretaría de Ambiente', contaminacion: 'CAR', fuga: 'Acueducto de Bogotá', 'falta-acceso': 'Acueducto de Bogotá', infraestructura: 'Acueducto de Bogotá' },
      'Medellín': { vertimiento: 'Área Metropolitana del Valle de Aburrá', contaminacion: 'AMVA', fuga: 'EPM', 'falta-acceso': 'EPM', infraestructura: 'EPM' },
      'Cali': { vertimiento: 'CVC y DAGMA', contaminacion: 'CVC', fuga: 'EMCALI', 'falta-acceso': 'EMCALI', infraestructura: 'EMCALI' },
      'default': { vertimiento: 'Corporación Autónoma Regional', contaminacion: 'Autoridad Ambiental Local', fuga: 'Empresa de Acueducto Local', 'falta-acceso': 'Empresa de Acueducto Local', infraestructura: 'Empresa de Acueducto Local' }
    },
    uruguay: {
      'Montevideo': { vertimiento: 'Intendencia de Montevideo - Desarrollo Ambiental', contaminacion: 'DINAMA', fuga: 'OSE', 'falta-acceso': 'OSE', infraestructura: 'OSE' },
      'Salto': { vertimiento: 'Intendencia de Salto', contaminacion: 'DINAMA', fuga: 'OSE', 'falta-acceso': 'OSE', infraestructura: 'OSE' },
      'default': { vertimiento: 'Intendencia Departamental', contaminacion: 'DINAMA', fuga: 'OSE', 'falta-acceso': 'OSE', infraestructura: 'OSE' }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede superar los 5MB')
        return
      }
      setFormData({ ...formData, imagen: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, imagen: null })
    setImagePreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.tipo || !formData.ciudad || !formData.descripcion) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    // Determinar entidad según país, ciudad y tipo
    const pais = selectedCountry || 'colombia'
    const entidadesCiudad = entidadesPorCiudad[pais][formData.ciudad] || entidadesPorCiudad[pais]['default']
    const entidad = entidadesCiudad[formData.tipo] || entidadesCiudad['default'] || 'Autoridad Competente'
    
    setEntidadAsignada(entidad)
    setShowSuccess(true)

    // Reset después de 5 segundos
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ tipo: '', ciudad: '', descripcion: '', imagen: null })
      setImagePreview(null)
    }, 5000)
  }

  const ciudades = selectedCountry ? ciudadesPorPais[selectedCountry] : ciudadesPorPais.colombia

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Reportar Problema Hídrico
            </h2>
            <p className="text-sm text-gray-600 mt-1">Tu reporte será clasificado y enviado a la entidad correspondiente</p>
          </div>
          <div className="bg-orange-600 rounded-full p-4 shadow-lg">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
            <div className="text-center">
              <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">¡Reporte enviado!</h3>
              <p className="text-gray-600 mb-4">
                Tu reporte ha sido redirigido a:
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200 mb-4">
                <p className="font-bold text-lg text-green-700">{entidadAsignada}</p>
              </div>
              <p className="text-sm text-gray-500">
                Recibirás una notificación con el seguimiento de tu caso
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Nota:</strong> Tu reporte será clasificado automáticamente por IA y enviado a la entidad competente de tu ciudad. Recibirás seguimiento por correo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de problema */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Tipo de problema <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="vertimiento">Vertimiento ilegal</option>
              <option value="contaminacion">Contaminación de fuente hídrica</option>
              <option value="fuga">Fuga de agua</option>
              <option value="falta-acceso">Falta de acceso al agua potable</option>
              <option value="infraestructura">Infraestructura dañada</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Ciudad <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.ciudad}
              onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Selecciona tu ciudad</option>
              {ciudades.map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Descripción del problema <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={5}
              placeholder="Describe detalladamente el problema que observaste..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              required
            />
          </div>

          {/* Adjuntar imagen */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Adjuntar imagen (opcional)
            </label>
            
            {!imagePreview ? (
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition cursor-pointer bg-gray-50 hover:bg-green-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">Click para subir imagen</p>
                <p className="text-xs text-gray-400 mt-1">Máximo 5MB • JPG, PNG, GIF</p>
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border-2 border-green-500">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Botón enviar */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <Send className="h-5 w-5 mr-2" />
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  )
}

function MapaTab({ selectedCountry }) {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [activeLayer, setActiveLayer] = useState('riesgo')
  const [reduccionConsumo, setReduccionConsumo] = useState(25)
  const [showSimulation, setShowSimulation] = useState(false)

  // Datos reales por país
  const datosPorPais = {
    colombia: {
      regiones: [
        { 
          id: 1, 
          nombre: 'Caribe', 
          riesgo: 'alto', 
          estres: 78, 
          poblacion: '10.2M', 
          consumo: 165, 
          calidad: 'regular', 
          reportes: 52,
          descripcion: 'Guajira, Atlántico, Magdalena'
        },
        { 
          id: 2, 
          nombre: 'Andina Central', 
          riesgo: 'alto', 
          estres: 72, 
          poblacion: '22.5M', 
          consumo: 180, 
          calidad: 'regular', 
          reportes: 89,
          descripcion: 'Bogotá, Cundinamarca, Boyacá'
        },
        { 
          id: 3, 
          nombre: 'Eje Cafetero', 
          riesgo: 'medio', 
          estres: 55, 
          poblacion: '7.8M', 
          consumo: 145, 
          calidad: 'buena', 
          reportes: 34,
          descripcion: 'Caldas, Risaralda, Quindío'
        },
        { 
          id: 4, 
          nombre: 'Pacífico', 
          riesgo: 'medio', 
          estres: 48, 
          poblacion: '4.1M', 
          consumo: 135, 
          calidad: 'regular', 
          reportes: 41,
          descripcion: 'Chocó, Valle, Cauca, Nariño'
        },
        { 
          id: 5, 
          nombre: 'Orinoquía', 
          riesgo: 'bajo', 
          estres: 32, 
          poblacion: '1.6M', 
          consumo: 120, 
          calidad: 'buena', 
          reportes: 15,
          descripcion: 'Meta, Casanare, Arauca'
        },
        { 
          id: 6, 
          nombre: 'Amazonía', 
          riesgo: 'bajo', 
          estres: 25, 
          poblacion: '1.2M', 
          consumo: 110, 
          calidad: 'buena', 
          reportes: 8,
          descripcion: 'Amazonas, Caquetá, Putumayo'
        }
      ],
      infraestructura: [
        { id: 1, tipo: 'planta', nombre: 'Planta Tibitoc (Bogotá)', x: 290, y: 150, region: 2 },
        { id: 2, tipo: 'planta', nombre: 'Planta Vitelma (Bogotá)', x: 300, y: 160, region: 2 },
        { id: 3, tipo: 'embalse', nombre: 'Embalse del Guavio', x: 320, y: 140, region: 2 },
        { id: 4, tipo: 'planta', nombre: 'Planta El Río (Medellín)', x: 200, y: 180, region: 3 },
        { id: 5, tipo: 'embalse', nombre: 'Embalse Riogrande II', x: 210, y: 170, region: 3 },
        { id: 6, tipo: 'planta', nombre: 'Planta Puerto Mallarino (Cali)', x: 140, y: 240, region: 4 },
        { id: 7, tipo: 'acuifero', nombre: 'Acuífero de Barranquilla', x: 200, y: 80, region: 1 },
        { id: 8, tipo: 'estacion', nombre: 'Est. Bombeo La Guajira', x: 240, y: 70, region: 1 }
      ]
    },
    uruguay: {
      regiones: [
        { 
          id: 1, 
          nombre: 'Montevideo', 
          riesgo: 'medio', 
          estres: 52, 
          poblacion: '1.4M', 
          consumo: 155, 
          calidad: 'buena', 
          reportes: 28,
          descripcion: 'Área metropolitana'
        },
        { 
          id: 2, 
          nombre: 'Sur', 
          riesgo: 'bajo', 
          estres: 38, 
          poblacion: '650K', 
          consumo: 130, 
          calidad: 'buena', 
          reportes: 12,
          descripcion: 'Canelones, San José, Colonia'
        },
        { 
          id: 3, 
          nombre: 'Litoral Oeste', 
          riesgo: 'medio', 
          estres: 58, 
          poblacion: '420K', 
          consumo: 148, 
          calidad: 'regular', 
          reportes: 31,
          descripcion: 'Paysandú, Río Negro, Soriano'
        },
        { 
          id: 4, 
          nombre: 'Centro', 
          riesgo: 'bajo', 
          estres: 35, 
          poblacion: '380K', 
          consumo: 125, 
          calidad: 'buena', 
          reportes: 15,
          descripcion: 'Durazno, Flores, Florida'
        },
        { 
          id: 5, 
          nombre: 'Norte', 
          riesgo: 'medio', 
          estres: 62, 
          poblacion: '340K', 
          consumo: 160, 
          calidad: 'regular', 
          reportes: 24,
          descripcion: 'Artigas, Salto, Rivera'
        },
        { 
          id: 6, 
          nombre: 'Este', 
          riesgo: 'bajo', 
          estres: 28, 
          poblacion: '290K', 
          consumo: 118, 
          calidad: 'buena', 
          reportes: 9,
          descripcion: 'Maldonado, Rocha, Treinta y Tres'
        }
      ],
      infraestructura: [
        { id: 1, tipo: 'planta', nombre: 'Planta Aguas Corrientes', x: 300, y: 280, region: 1 },
        { id: 2, tipo: 'embalse', nombre: 'Embalse Paso Severino', x: 280, y: 250, region: 2 },
        { id: 3, tipo: 'planta', nombre: 'OSE Canelones', x: 320, y: 270, region: 2 },
        { id: 4, tipo: 'embalse', nombre: 'Represa Salto Grande', x: 180, y: 120, region: 5 },
        { id: 5, tipo: 'planta', nombre: 'Planta Paysandú', x: 200, y: 180, region: 3 },
        { id: 6, tipo: 'acuifero', nombre: 'Acuífero Guaraní', x: 250, y: 200, region: 4 },
        { id: 7, tipo: 'estacion', nombre: 'Est. OSE Maldonado', x: 380, y: 290, region: 6 }
      ]
    }
  }

  // Seleccionar datos según país
  const datosActuales = selectedCountry === 'colombia' ? datosPorPais.colombia : datosPorPais.uruguay
  const regiones = datosActuales.regiones
  const infraestructura = datosActuales.infraestructura

  const capas = [
    { id: 'riesgo', nombre: 'Riesgo Hídrico', IconComponent: Droplet, color: 'blue' },
    { id: 'calidad', nombre: 'Calidad del Agua', IconComponent: Microscope, color: 'green' },
    { id: 'reportes', nombre: 'Reportes Ciudadanos', IconComponent: MapPinned, color: 'orange' },
    { id: 'infraestructura', nombre: 'Infraestructura', IconComponent: Building2, color: 'purple' }
  ]

  // Función para obtener color según la capa activa
  const getColorForLayer = (region) => {
    switch(activeLayer) {
      case 'riesgo':
        return region.riesgo === 'alto' ? '#FCA5A5' : 
               region.riesgo === 'medio' ? '#FDE047' : '#86EFAC'
      case 'calidad':
        return region.calidad === 'mala' ? '#FCA5A5' : 
               region.calidad === 'regular' ? '#FDE047' : '#86EFAC'
      case 'reportes':
        const intensidad = region.reportes > 50 ? '#FCA5A5' : 
                          region.reportes > 25 ? '#FDE047' : '#86EFAC'
        return intensidad
      case 'infraestructura':
        return '#C4B5FD' // Morado claro para todas las regiones
      default:
        return '#E5E7EB'
    }
  }

  const getStrokeForLayer = (region) => {
    switch(activeLayer) {
      case 'riesgo':
        return region.riesgo === 'alto' ? '#DC2626' : 
               region.riesgo === 'medio' ? '#CA8A04' : '#16A34A'
      case 'calidad':
        return region.calidad === 'mala' ? '#DC2626' : 
               region.calidad === 'regular' ? '#CA8A04' : '#16A34A'
      case 'reportes':
        return region.reportes > 50 ? '#EA580C' : 
               region.reportes > 25 ? '#D97706' : '#059669'
      case 'infraestructura':
        return '#7C3AED'
      default:
        return '#9CA3AF'
    }
  }

  const getMetricText = (region) => {
    switch(activeLayer) {
      case 'riesgo':
        return `${region.estres}% estrés`
      case 'calidad':
        return region.calidad
      case 'reportes':
        return `${region.reportes} reportes`
      case 'infraestructura':
        return region.descripcion
      default:
        return ''
    }
  }

  const getRiesgoColor = (riesgo) => {
    switch(riesgo) {
      case 'alto': return 'bg-red-500'
      case 'medio': return 'bg-yellow-500'
      case 'bajo': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiesgoBorder = (riesgo) => {
    switch(riesgo) {
      case 'alto': return 'border-red-500'
      case 'medio': return 'border-yellow-500'
      case 'bajo': return 'border-green-500'
      default: return 'border-gray-500'
    }
  }

  const simularImpacto = () => {
    setShowSimulation(true)
  }

  const calcularNuevoEstres = (estresActual) => {
    return Math.max(0, estresActual - (estresActual * reduccionConsumo / 100))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Mapa Interactivo de Riesgo Hídrico
            </h2>
            <p className="text-sm text-gray-600 mt-1">Explora zonas de riesgo y simula escenarios de conservación</p>
          </div>
          <div className="bg-blue-600 rounded-full p-4 shadow-lg">
            <MapPin className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mapa Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selector de capas */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Capas del mapa</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {capas.map(capa => {
                const Icon = capa.IconComponent
                return (
                  <button
                    key={capa.id}
                    onClick={() => setActiveLayer(capa.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      activeLayer === capa.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-1 text-gray-700" />
                    <div className="text-xs font-medium text-gray-700">{capa.nombre}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mapa Visual */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden border-2 border-blue-200">
              {/* Grid del mapa */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect width="600" height="400" fill="url(#grid)" />
                
                {/* Regiones en el mapa */}
                {regiones.map((region, idx) => {
                  const positions = [
                    { x: 100, y: 80, w: 180, h: 120 },   // Norte
                    { x: 220, y: 140, w: 160, h: 140 },  // Centro
                    { x: 140, y: 240, w: 200, h: 100 },  // Sur
                    { x: 380, y: 100, w: 140, h: 160 },  // Este
                    { x: 60, y: 160, w: 120, h: 140 },   // Oeste
                    { x: 340, y: 260, w: 180, h: 100 }   // Costera
                  ]
                  
                  const pos = positions[idx]
                  const fillColor = getColorForLayer(region)
                  const strokeColor = getStrokeForLayer(region)
                  
                  return (
                    <g 
                      key={region.id}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedRegion(region)}
                      filter={selectedRegion?.id === region.id ? "url(#glow)" : ""}
                    >
                      <rect
                        x={pos.x}
                        y={pos.y}
                        width={pos.w}
                        height={pos.h}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={selectedRegion?.id === region.id ? "4" : "2"}
                        opacity={selectedRegion && selectedRegion.id !== region.id ? "0.3" : "0.7"}
                        rx="8"
                        className="transition-all duration-300 hover:opacity-90"
                      />
                      <text
                        x={pos.x + pos.w/2}
                        y={pos.y + pos.h/2}
                        textAnchor="middle"
                        className="text-xs font-bold pointer-events-none"
                        fill="#1F2937"
                      >
                        {region.nombre}
                      </text>
                      <text
                        x={pos.x + pos.w/2}
                        y={pos.y + pos.h/2 + 15}
                        textAnchor="middle"
                        className="text-xs pointer-events-none"
                        fill="#4B5563"
                      >
                        {getMetricText(region)}
                      </text>
                    </g>
                  )
                })}

                {/* Marcadores de infraestructura (solo visible en capa de infraestructura) */}
                {activeLayer === 'infraestructura' && infraestructura.map(infra => {
                  // Símbolos según tipo
                  const simbolo = {
                    'planta': 'P',
                    'embalse': 'E',
                    'estacion': 'B',
                    'acuifero': 'A'
                  }[infra.tipo] || 'I'
                  
                  return (
                    <g key={infra.id} className="animate-pulse">
                      <circle
                        cx={infra.x}
                        cy={infra.y}
                        r="20"
                        fill="#7C3AED"
                        opacity="0.3"
                      />
                      <circle
                        cx={infra.x}
                        cy={infra.y}
                        r="12"
                        fill="white"
                        stroke="#7C3AED"
                        strokeWidth="2"
                      />
                      <text
                        x={infra.x}
                        y={infra.y + 5}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill="#7C3AED"
                      >
                        {simbolo}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Indicador de interactividad */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                <MousePointer2 className="h-4 w-4 text-gray-700" />
                <p className="text-xs font-medium text-gray-700">Haz click en una región para más detalles</p>
              </div>
            </div>

            {/* Leyenda dinámica según capa activa */}
            {activeLayer === 'riesgo' && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Riesgo Alto</div>
                    <div className="text-xs text-gray-600">&gt; 70% estrés</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Riesgo Medio</div>
                    <div className="text-xs text-gray-600">40-70% estrés</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Riesgo Bajo</div>
                    <div className="text-xs text-gray-600">&lt; 40% estrés</div>
                  </div>
                </div>
              </div>
            )}

            {activeLayer === 'calidad' && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Mala</div>
                    <div className="text-xs text-gray-600">Contaminada</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Regular</div>
                    <div className="text-xs text-gray-600">Tratamiento</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Buena</div>
                    <div className="text-xs text-gray-600">Potable</div>
                  </div>
                </div>
              </div>
            )}

            {activeLayer === 'reportes' && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Muchos reportes</div>
                    <div className="text-xs text-gray-600">&gt; 50 reportes</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Reportes medios</div>
                    <div className="text-xs text-gray-600">25-50 reportes</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Pocos reportes</div>
                    <div className="text-xs text-gray-600">&lt; 25 reportes</div>
                  </div>
                </div>
              </div>
            )}

            {activeLayer === 'infraestructura' && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <Factory className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Planta de Tratamiento</div>
                    <div className="text-xs text-gray-600">Procesamiento (P)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Embalse / Represa</div>
                    <div className="text-xs text-gray-600">Almacenamiento (E)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <Cog className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Estación de Bombeo</div>
                    <div className="text-xs text-gray-600">Distribución (B)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <Gem className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Acuífero</div>
                    <div className="text-xs text-gray-600">Fuente natural (A)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Información de región seleccionada */}
          {selectedRegion ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedRegion.nombre}</h3>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Información según capa activa */}
                {activeLayer === 'riesgo' && (
                  <>
                    <div className={`p-4 rounded-xl border-2 ${getRiesgoBorder(selectedRegion.riesgo)} bg-gradient-to-r from-gray-50 to-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Nivel de Riesgo</span>
                        <div className={`w-3 h-3 ${getRiesgoColor(selectedRegion.riesgo)} rounded-full`}></div>
                      </div>
                      <div className="text-2xl font-bold capitalize text-gray-800">{selectedRegion.riesgo}</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-sm font-medium text-gray-600 mb-1">Estrés Hídrico</div>
                      <div className="flex items-end space-x-2">
                        <div className="text-3xl font-bold text-blue-600">{selectedRegion.estres}%</div>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getRiesgoColor(selectedRegion.riesgo)}`}
                          style={{ width: `${selectedRegion.estres}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeLayer === 'calidad' && (
                  <>
                    <div className={`p-4 rounded-xl border-2 ${
                      selectedRegion.calidad === 'mala' ? 'border-red-500' :
                      selectedRegion.calidad === 'regular' ? 'border-yellow-500' : 'border-green-500'
                    } bg-gradient-to-r from-gray-50 to-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Calidad del Agua</span>
                        <div className={`w-3 h-3 ${
                          selectedRegion.calidad === 'mala' ? 'bg-red-500' :
                          selectedRegion.calidad === 'regular' ? 'bg-yellow-500' : 'bg-green-500'
                        } rounded-full`}></div>
                      </div>
                      <div className="text-2xl font-bold capitalize text-gray-800">{selectedRegion.calidad}</div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="text-sm font-medium text-gray-600 mb-1">Estado</div>
                      <div className="text-sm text-gray-700 flex items-center space-x-2">
                        {selectedRegion.calidad === 'buena' && (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Apta para consumo humano</span>
                          </>
                        )}
                        {selectedRegion.calidad === 'regular' && (
                          <>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span>Requiere tratamiento básico</span>
                          </>
                        )}
                        {selectedRegion.calidad === 'mala' && (
                          <>
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span>Alto nivel de contaminantes</span>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {activeLayer === 'reportes' && (
                  <>
                    <div className={`p-4 rounded-xl border-2 ${
                      selectedRegion.reportes > 50 ? 'border-red-500' :
                      selectedRegion.reportes > 25 ? 'border-yellow-500' : 'border-green-500'
                    } bg-gradient-to-r from-gray-50 to-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Reportes Ciudadanos</span>
                        <div className={`w-3 h-3 ${
                          selectedRegion.reportes > 50 ? 'bg-red-500' :
                          selectedRegion.reportes > 25 ? 'bg-yellow-500' : 'bg-green-500'
                        } rounded-full`}></div>
                      </div>
                      <div className="text-3xl font-bold text-gray-800">{selectedRegion.reportes}</div>
                      <div className="text-xs text-gray-500 mt-1">reportes en el último mes</div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <div className="text-sm font-medium text-gray-600 mb-2">Tipos de reportes</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Contaminación</span>
                          <span className="font-bold">{Math.floor(selectedRegion.reportes * 0.4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fugas</span>
                          <span className="font-bold">{Math.floor(selectedRegion.reportes * 0.3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Otros</span>
                          <span className="font-bold">{Math.floor(selectedRegion.reportes * 0.3)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeLayer === 'infraestructura' && (
                  <>
                    <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-500">
                      <div className="text-sm font-medium text-gray-600 mb-2">Infraestructura</div>
                      <div className="text-lg font-bold text-purple-600">
                        {infraestructura.filter(i => i.region === selectedRegion.id).length} instalaciones
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="text-sm font-medium text-gray-600 mb-2">Instalaciones cercanas</div>
                      <div className="space-y-2">
                        {infraestructura.filter(i => i.region === selectedRegion.id).map(i => {
                          const IconComponent = i.tipo === 'planta' ? Factory :
                                               i.tipo === 'embalse' ? Database :
                                               i.tipo === 'estacion' ? Cog : Gem
                          return (
                            <div key={i.id} className="flex items-center space-x-2 text-xs">
                              <IconComponent className="h-4 w-4 text-purple-600" />
                              <span className="text-gray-700">{i.nombre}</span>
                            </div>
                          )
                        })}
                        {infraestructura.filter(i => i.region === selectedRegion.id).length === 0 && (
                          <div className="text-xs text-gray-500">No hay infraestructura principal en esta zona</div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Información general siempre visible */}
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="text-sm font-medium text-gray-600 mb-1">Población Afectada</div>
                  <div className="text-2xl font-bold text-purple-600">{selectedRegion.poblacion}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="text-sm font-medium text-gray-600 mb-1">Consumo Promedio</div>
                  <div className="text-2xl font-bold text-green-600">{selectedRegion.consumo}L</div>
                  <div className="text-xs text-gray-500">por persona/día</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 text-center">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-gray-800 mb-2">Selecciona una región</h4>
              <p className="text-sm text-gray-600">Haz click en el mapa para ver información detallada</p>
            </div>
          )}

          {/* Estadísticas Generales */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <h4 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Estadísticas Generales
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-gray-700">Zonas de alto riesgo</span>
                <span className="font-bold text-red-600">
                  {regiones.filter(r => r.riesgo === 'alto').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-gray-700">Zonas de riesgo medio</span>
                <span className="font-bold text-yellow-600">
                  {regiones.filter(r => r.riesgo === 'medio').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">Zonas de bajo riesgo</span>
                <span className="font-bold text-green-600">
                  {regiones.filter(r => r.riesgo === 'bajo').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador de Escenarios */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-3 mr-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Simulador de Escenarios</h3>
            <p className="text-sm text-gray-600">Explora cómo variaría el riesgo reduciendo el consumo</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Reducción de consumo: <span className="text-green-600">{reduccionConsumo}%</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={reduccionConsumo}
              onChange={(e) => setReduccionConsumo(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${reduccionConsumo * 2}%, #E5E7EB ${reduccionConsumo * 2}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>

            <button 
              onClick={simularImpacto}
              className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Simular Impacto</span>
            </button>
          </div>

          {showSimulation && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-300">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Resultados de la Simulación</h4>
              <div className="space-y-3">
                {regiones.slice(0, 3).map(region => {
                  const nuevoEstres = calcularNuevoEstres(region.estres)
                  const mejora = region.estres - nuevoEstres
                  
                  return (
                    <div key={region.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{region.nombre}</span>
                        <span className="text-green-600 text-sm font-bold flex items-center">
                          <ArrowDown className="h-4 w-4 mr-1" />
                          {mejora.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-600">{region.estres}%</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${nuevoEstres}%` }}
                          />
                        </div>
                        <div className="text-sm font-bold text-green-600">{nuevoEstres.toFixed(1)}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-green-700 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">
                  <strong>Impacto potencial:</strong> Reducir el consumo en un {reduccionConsumo}% podría 
                  disminuir significativamente el estrés hídrico en todas las regiones.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AsistenteTab() {
  const telegramBotUrl = "https://t.me/YourWaterWayCitizenBot" // Reemplazar con el bot real de Telegram

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Asistente de IA Ciudadano
            </h2>
            <p className="text-sm text-gray-600 mt-1">Resuelve tus dudas sobre reportes y gestión hídrica en Telegram</p>
          </div>
          <div className="bg-green-600 rounded-full p-4 shadow-lg">
            <MessageCircle className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Información del chatbot */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-6 mb-4 shadow-xl">
              <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">¡Chatea con nuestra IA!</h3>
            <p className="text-gray-600">Obtén ayuda instantánea con nuestro asistente en Telegram</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
              <FileText className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Ayuda con reportes</h4>
                <p className="text-sm text-gray-600">Aprende a reportar problemas y hacer seguimiento</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
              <MapPin className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Información de zonas</h4>
                <p className="text-sm text-gray-600">Consulta datos de riesgo hídrico en tu región</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
              <Droplet className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Consejos de ahorro</h4>
                <p className="text-sm text-gray-600">Tips para reducir tu consumo de agua</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
              <Landmark className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Entidades responsables</h4>
                <p className="text-sm text-gray-600">Información sobre quién gestiona el agua en tu zona</p>
              </div>
            </div>
          </div>

          {/* Botón de Telegram */}
          <a
            href={telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
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
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <h4 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-2 mr-3">
                <Smartphone className="h-5 w-5" />
              </span>
              ¿Cómo usar el asistente?
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Haz clic en "Abrir en Telegram"</h5>
                  <p className="text-sm text-gray-600">Se abrirá la aplicación de Telegram</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Inicia la conversación</h5>
                  <p className="text-sm text-gray-600">Presiona "Start" o envía un mensaje</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Haz tu consulta</h5>
                  <p className="text-sm text-gray-600">Pregunta lo que necesites sobre reportes o gestión del agua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preguntas ejemplo */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <h4 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <span className="bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg p-2 mr-3">
                <HelpCircle className="h-5 w-5" />
              </span>
              Ejemplos de preguntas
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-700">"¿Cómo reporto una fuga de agua?"</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-700">"¿Cuál es el nivel de riesgo en mi zona?"</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-700">"¿Qué entidad gestiona el agua en Bogotá?"</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-700">"Dame consejos para ahorrar agua en casa"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ number, label, color }) {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {number}
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  )
}

const ExternalLink = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)
