# WaterWay Backend

API REST para la plataforma WaterWay - Gobernanza del Agua con Datos Abiertos e IA

## Instalación

```bash
pip install -r requirements.txt
```

## Ejecución

```bash
python app.py
```

El servidor se iniciará en `http://localhost:5000`

## Endpoints Disponibles

### General
- `GET /api/health` - Health check
- `GET /api/stats` - Estadísticas generales

### Ciudadano
- `GET /api/reportes` - Listar reportes
- `POST /api/reportes` - Crear reporte (clasificación automática con IA)
- `GET /api/reportes/:id` - Obtener reporte específico

### Gubernamental
- `GET /api/consumo` - Datos de consumo por sector
- `GET /api/proyecciones` - Proyecciones de estrés hídrico (IA)
- `GET /api/recomendaciones` - Recomendaciones generadas por IA

### Estudiante
- `POST /api/chatbot/educativo` - Chatbot educativo
- `POST /api/huella-hidrica/calcular` - Calcular huella hídrica personal

### Datos Abiertos
- `GET /api/datasets` - Listado de datasets disponibles

## Base de Datos

Actualmente usa almacenamiento en memoria (para MVP). Los datos se reinician al reiniciar el servidor.
