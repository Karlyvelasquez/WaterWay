# WaterWay 💧

**Plataforma de Gobernanza del Agua con Datos Abiertos e Inteligencia Artificial**

Una solución innovadora para América Latina que combina datos abiertos e IA para enfrentar los desafíos del cambio climático relacionados con la gestión del agua.

---

## 🌍 Acerca del Proyecto

WaterWay es una plataforma web escalable diseñada para mejorar la comprensión, el uso responsable y la gobernanza del agua frente al cambio climático en Colombia, con potencial de replicarse en toda América Latina.

### Desarrollado para:
**Open Data & AI Innovation Challenge - Edición Acción Climática LATAM**
- Organizado por: Open Data Charter
- Apoyo: MINTIC (Colombia)  
- Financiamiento: Patrick J. McGovern Foundation

---

## ✨ Características Principales

### 🎓 Portal Estudiante
- Visualizaciones 3D del ciclo del agua
- Chatbot educativo en Telegram
- Calculadora de huella hídrica personal
- Contenido adaptado por nivel educativo

### 👥 Portal Ciudadano
- Sistema de reportes ambientales con clasificación automática por IA
- Mapas interactivos de riesgo hídrico
- Simulador de escenarios de consumo
- Chatbot de asistencia ciudadana

### 🏛️ Portal Gubernamental
- Dashboard de consumo por sectores
- Modelos predictivos de estrés hídrico con IA
- Proyecciones climáticas 2025-2050
- Recomendaciones basadas en datos

### 📊 Datos Abiertos
- Todos los datos bajo licencia abierta
- API pública RESTful
- Datasets descargables en formatos estándar
- Cumplimiento con Carta Internacional de Datos Abiertos

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ 
- Python 3.9+
- npm o yarn

### Instalación

#### Frontend (React + Vite)
```bash
npm install
npm run dev
```
El frontend estará disponible en `http://localhost:3000`

#### Backend (Python + Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
El backend estará disponible en `http://localhost:5000`

---

## 📁 Estructura del Proyecto

```
WaterWay/
├── src/                      # Frontend React
│   ├── pages/               
│   │   ├── LandingPage.jsx           # Landing principal
│   │   ├── StudentDashboard.jsx      # Portal Estudiante
│   │   ├── CitizenDashboard.jsx      # Portal Ciudadano
│   │   └── GovernmentDashboard.jsx   # Portal Gubernamental
│   ├── App.jsx              # Enrutamiento principal
│   └── index.css            # Estilos globales
├── backend/                  # Backend Python
│   ├── app.py               # API REST con Flask
│   └── requirements.txt     # Dependencias Python
├── public/                   # Assets estáticos
│   └── logo.png             # Logo de WaterWay
└── README.md                # Este archivo
```

---

## 🔌 API Endpoints

### General
- `GET /api/health` - Health check
- `GET /api/stats` - Estadísticas generales

### Ciudadano
- `GET /api/reportes` - Listar reportes
- `POST /api/reportes` - Crear reporte con clasificación IA
- `GET /api/reportes/:id` - Obtener reporte específico

### Gubernamental
- `GET /api/consumo` - Datos de consumo por sector
- `GET /api/proyecciones` - Proyecciones de estrés hídrico
- `GET /api/recomendaciones` - Recomendaciones IA

### Estudiante
- `POST /api/chatbot/educativo` - Chatbot educativo
- `POST /api/huella-hidrica/calcular` - Calcular huella hídrica

### Datos Abiertos
- `GET /api/datasets` - Listado de datasets disponibles

---

## 🤖 Inteligencia Artificial

### Funcionalidades IA Implementadas:
1. **Clasificación automática de reportes ciudadanos**
   - Clasifica tipo de problema
   - Asigna entidad competente
   - Geolocaliza y prioriza

2. **Modelos predictivos de estrés hídrico**
   - Proyecciones 2025-2050
   - Múltiples escenarios climáticos
   - Recomendaciones de políticas públicas

3. **Chatbot educativo**
   - Respuestas sobre agua y cambio climático
   - Adaptado a nivel educativo
   - Disponible en Telegram

*(Actualmente con datos mock - preparado para integración con APIs de IA reales)*

---

## 📊 Datos Abiertos

WaterWay cumple con los principios de la **Carta Internacional de Datos Abiertos**:

✅ Abiertos por defecto  
✅ Oportunos y exhaustivos  
✅ Accesibles y utilizables  
✅ Comparables e interoperables  
✅ Para mejorar la gobernanza y la participación ciudadana  
✅ Para el desarrollo inclusivo y la innovación  

Todos los datos generados por la plataforma están disponibles bajo licencia **Open Data Commons Open Database License (ODbL)**.

---

## 🎯 Roadmap

### Fase I - MVP (Actual)
- ✅ Landing page informativa
- ✅ Sistema de roles funcional
- ✅ Navegación entre dashboards
- ✅ Estructura de API REST
- ✅ Datos mock para demostración

### Fase II - Desarrollo Completo
- 🔄 Integración con APIs de IA (Claude, GPT)
- 🔄 Conexión con fuentes de datos abiertos reales
- 🔄 Visualizaciones 3D interactivas
- 🔄 Sistema de autenticación por roles
- 🔄 Base de datos persistente
- 🔄 Chatbot en Telegram funcional
- 🔄 Mapas interactivos con Leaflet/Mapbox
- 🔄 Sistema de notificaciones
- 🔄 Dashboard de administración

### Fase III - Escalamiento
- 📋 Despliegue en producción
- 📋 Replicación en otros países LATAM
- 📋 App móvil (React Native)
- 📋 Integración con sistemas gubernamentales

---

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Recharts (gráficas)
- Lucide React (iconos)

### Backend
- Python 3.9+
- Flask
- Flask-CORS

### IA (Planeado)
- APIs de LLMs (Claude, GPT)
- Modelos de clasificación NLP
- Algoritmos de predicción temporal

---

## 👥 Equipo

Proyecto desarrollado para el **Open Data & AI Innovation Challenge 2025-2026**

---

## 📄 Licencia

- **Código:** MIT License  
- **Datos:** Open Data Commons Open Database License (ODbL)

---

## 📞 Contacto

Para más información sobre el proyecto, contacta a través del concurso en `info@opendatacharter.org`

---

## 🙏 Agradecimientos

- Open Data Charter
- MINTIC (Colombia)
- Patrick J. McGovern Foundation
- Comunidades de datos abiertos de Colombia

---

**WaterWay** - *Datos abiertos e IA para un futuro hídrico sostenible* 💧🌱
