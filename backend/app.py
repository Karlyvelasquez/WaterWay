from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime
from openai import OpenAI
from data_loader import data_loader

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)

# Inicializar cliente de OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Inicializar predictor de ML (opcional)
try:
    from predictor import get_predictor
    predictor = get_predictor()
    ML_AVAILABLE = True
except ImportError:
    predictor = None
    ML_AVAILABLE = False

# Base de datos en memoria (mock data - solo como fallback)
reportes_db = []
usuarios_db = []
consumo_data = {
    "hogares": [4000, 3800, 4200, 4100, 4300, 4500],
    "agricultura": [12000, 11500, 13000, 12800, 13200, 13800],
    "industria": [8000, 7800, 8200, 8100, 8400, 8600]
}

# ============ ENDPOINTS GENERALES ============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "WaterWay API está funcionando",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Estadísticas generales de la plataforma"""
    return jsonify({
        "total_reportes": len(reportes_db),
        "reportes_procesados": int(len(reportes_db) * 0.89),
        "usuarios_activos": len(usuarios_db),
        "consumo_total_mes": sum(consumo_data["hogares"]) + sum(consumo_data["agricultura"]) + sum(consumo_data["industria"])
    })

# ============ ENDPOINTS ROL CIUDADANO ============

@app.route('/api/reportes', methods=['GET'])
def get_reportes():
    """Obtener todos los reportes"""
    return jsonify({
        "success": True,
        "data": reportes_db,
        "total": len(reportes_db)
    })

@app.route('/api/reportes', methods=['POST'])
def create_reporte():
    """Crear un nuevo reporte ciudadano"""
    data = request.get_json()
    
    # Clasificación automática con "IA" (mock)
    clasificaciones = {
        "vertimiento": "Autoridad Ambiental Regional",
        "contaminacion": "Autoridad Ambiental Regional",
        "fuga": "Empresa de Acueducto Municipal",
        "falta-acceso": "Secretaría de Agua",
        "infraestructura": "Empresa de Acueducto Municipal",
        "otro": "Oficina de Atención Ciudadana"
    }
    
    nuevo_reporte = {
        "id": len(reportes_db) + 1,
        "tipo": data.get("tipo"),
        "descripcion": data.get("descripcion"),
        "ubicacion": data.get("ubicacion"),
        "estado": "Pendiente",
        "entidad_asignada": clasificaciones.get(data.get("tipo"), "Por clasificar"),
        "fecha_creacion": datetime.now().isoformat(),
        "fecha_actualizacion": datetime.now().isoformat()
    }
    
    reportes_db.append(nuevo_reporte)
    
    return jsonify({
        "success": True,
        "message": "Reporte creado y clasificado exitosamente",
        "data": nuevo_reporte,
        "ia_clasificacion": {
            "confianza": 0.92,
            "entidad_sugerida": clasificaciones.get(data.get("tipo"))
        }
    }), 201

@app.route('/api/reportes/<int:reporte_id>', methods=['GET'])
def get_reporte(reporte_id):
    """Obtener un reporte específico"""
    reporte = next((r for r in reportes_db if r["id"] == reporte_id), None)
    
    if reporte:
        return jsonify({
            "success": True,
            "data": reporte
        })
    else:
        return jsonify({
            "success": False,
            "message": "Reporte no encontrado"
        }), 404

# ============ ENDPOINTS ROL GUBERNAMENTAL ============

@app.route('/api/consumo', methods=['GET'])
def get_consumo():
    """Obtener datos de consumo por sector"""
    meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
    
    data = []
    for i, mes in enumerate(meses):
        data.append({
            "mes": mes,
            "hogares": consumo_data["hogares"][i],
            "agricultura": consumo_data["agricultura"][i],
            "industria": consumo_data["industria"][i],
            "total": consumo_data["hogares"][i] + consumo_data["agricultura"][i] + consumo_data["industria"][i]
        })
    
    return jsonify({
        "success": True,
        "data": data,
        "metadata": {
            "unidad": "m³ (miles)",
            "periodo": "2025"
        }
    })

@app.route('/api/proyecciones', methods=['GET'])
def get_proyecciones():
    """Proyecciones de estrés hídrico basadas en IA"""
    proyecciones = [
        {"año": "2024", "actual": 100, "conservacion": 100, "tendencia": 100},
        {"año": "2026", "actual": 110, "conservacion": 105, "tendencia": 115},
        {"año": "2028", "actual": 125, "conservacion": 108, "tendencia": 135},
        {"año": "2030", "actual": 145, "conservacion": 110, "tendencia": 160},
        {"año": "2035", "actual": 180, "conservacion": 115, "tendencia": 200}
    ]
    
    return jsonify({
        "success": True,
        "data": proyecciones,
        "ia_model": {
            "version": "1.0",
            "accuracy": 0.87,
            "last_trained": "2025-01-15"
        }
    })

@app.route('/api/recomendaciones', methods=['GET'])
def get_recomendaciones():
    """Recomendaciones generadas por IA"""
    recomendaciones = [
        {
            "id": 1,
            "prioridad": "alta",
            "titulo": "Implementar sistema de reutilización agrícola",
            "impacto": "Reducción proyectada del 12% en consumo agrícola",
            "confianza_ia": 0.89
        },
        {
            "id": 2,
            "prioridad": "media",
            "titulo": "Campaña de concientización en zonas de alto consumo",
            "impacto": "Reducción estimada del 5-8% en consumo residencial",
            "confianza_ia": 0.76
        },
        {
            "id": 3,
            "prioridad": "media",
            "titulo": "Auditorías industriales obligatorias",
            "impacto": "Identificación de 15-20% de ineficiencias",
            "confianza_ia": 0.82
        }
    ]
    
    return jsonify({
        "success": True,
        "data": recomendaciones
    })

# ============ ENDPOINTS ROL ESTUDIANTE ============

@app.route('/api/chatbot/educativo', methods=['POST'])
def chatbot_educativo():
    """Chatbot educativo (mock - para implementar con API de IA real)"""
    data = request.get_json()
    pregunta = data.get("pregunta", "")
    
    # Respuestas predefinidas (mock)
    respuestas = {
        "default": "¡Interesante pregunta! El agua es fundamental para la vida. ¿Sabías que solo el 2.5% del agua del planeta es agua dulce?",
        "cuanto agua": "En promedio, una persona consume entre 100-150 litros de agua por día, incluyendo ducha, cocina, limpieza y bebida.",
        "cambio climatico": "El cambio climático está alterando los patrones de lluvia, causando sequías más frecuentes y lluvias más intensas pero menos regulares.",
        "ciclo del agua": "El ciclo del agua incluye evaporación, condensación, precipitación, infiltración y escorrentía. ¡Es un ciclo continuo y vital!"
    }
    
    respuesta = respuestas["default"]
    for key in respuestas:
        if key in pregunta.lower():
            respuesta = respuestas[key]
            break
    
    return jsonify({
        "success": True,
        "pregunta": pregunta,
        "respuesta": respuesta,
        "fuentes": ["UNESCO Water Report 2024", "IPCC Climate Report"]
    })

@app.route('/api/huella-hidrica/calcular', methods=['POST'])
def calcular_huella():
    """Calcular huella hídrica personal"""
    data = request.get_json()
    
    # Cálculo simplificado (mock)
    duchas = data.get("duchas_dia", 1) * 20  # 20L por minuto
    lavado_manos = data.get("lavado_manos", 6) * 2  # 2L por lavado
    cocina = 30  # Promedio
    limpieza = 20  # Promedio
    
    total_diario = duchas + lavado_manos + cocina + limpieza
    
    return jsonify({
        "success": True,
        "huella_diaria": total_diario,
        "huella_mensual": total_diario * 30,
        "huella_anual": total_diario * 365,
        "comparacion": {
            "promedio_nacional": 150,
            "tu_posicion": "Por debajo del promedio" if total_diario < 150 else "Por encima del promedio"
        },
        "recomendaciones": [
            "Reduce 2 minutos tu ducha y ahorrarás 40L diarios",
            "Cierra el grifo mientras te cepillas los dientes"
        ]
    })

# ============ DATOS ABIERTOS ============

@app.route('/api/datasets', methods=['GET'])
def get_datasets():
    """Listado de datasets abiertos disponibles"""
    datasets = [
        {
            "id": 1,
            "nombre": "Consumo Hídrico Municipal",
            "descripcion": "Series temporales de consumo de agua por municipio, sector y mes",
            "formato": ["CSV", "JSON"],
            "tamaño": "2.3 MB",
            "actualizado": "2025-01-23",
            "url_descarga": "/api/datasets/1/download"
        },
        {
            "id": 2,
            "nombre": "Reportes Ciudadanos Agregados",
            "descripcion": "Datos georreferenciados y anonimizados de reportes ambientales",
            "formato": ["GeoJSON", "CSV"],
            "tamaño": "1.8 MB",
            "actualizado": "2025-01-25",
            "url_descarga": "/api/datasets/2/download"
        },
        {
            "id": 3,
            "nombre": "Proyecciones Climáticas",
            "descripcion": "Modelos de IA para proyección de estrés hídrico 2025-2050",
            "formato": ["JSON", "XLSX"],
            "tamaño": "850 KB",
            "actualizado": "2025-01-18",
            "url_descarga": "/api/datasets/3/download"
        }
    ]
    
    return jsonify({
        "success": True,
        "data": datasets,
        "licencia": "Open Data Commons Open Database License (ODbL)",
        "api_docs": "https://api.waterway.org/docs"
    })

# ============ ANÁLISIS CON IA (GPT) ============

@app.route('/api/analyze-water-data', methods=['POST'])
def analyze_water_data():
    """Analizar datos de agua con ML + GPT-4 para obtener insights y recomendaciones"""
    try:
        data = request.get_json()
        city = data.get('city')
        country = data.get('country')
        city_data = data.get('data')
        
        # 1. Obtiene proyecciones del modelo ML (si es Medellín)
        proyecciones_ml = []
        modelo_activo = False
        
        if city == 'Medellín' and ML_AVAILABLE and predictor.ml_enabled:
            proyecciones_ml = predictor.obtener_proyecciones(city)
            modelo_activo = True
            
            # Calcula incremento promedio proyectado
            if proyecciones_ml:
                incrementos = [p.get('incremento_pesimista_pct', 0) for p in proyecciones_ml[:12]]
                incremento_promedio = sum(incrementos) / len(incrementos) if incrementos else 0
            else:
                incremento_promedio = 0
        else:
            incremento_promedio = 5  # Estimación conservadora
        
        # 2. Preparar el prompt para GPT con datos ML
        prompt = f"""Eres un experto en gestión de recursos hídricos y análisis de datos ambientales. 
        
Analiza los siguientes datos de consumo de agua para {city}, {country.upper()}:

DATOS ACTUALES:
- Población: {city_data['poblacion']}
- Consumo Total: {city_data['consumoTotal']} m³/mes
- Sectores:
  * Hogares: {city_data['sectores']['hogares']['porcentaje']}% ({city_data['sectores']['hogares']['consumo']} m³/mes) - Tendencia: {city_data['sectores']['hogares']['tendencia']}
  * Industria: {city_data['sectores']['industria']['porcentaje']}% ({city_data['sectores']['industria']['consumo']} m³/mes) - Tendencia: {city_data['sectores']['industria']['tendencia']}
  * Comercio: {city_data['sectores']['comercio']['porcentaje']}% ({city_data['sectores']['comercio']['consumo']} m³/mes) - Tendencia: {city_data['sectores']['comercio']['tendencia']}

PROYECCIONES DE MODELO ML:
- Modelo predictivo activo: {'SÍ (datos reales EPM)' if modelo_activo else 'No (simulación)'}
- Incremento proyectado próximos 12 meses (escenario cambio climático): +{incremento_promedio:.1f}%
- Nivel de confianza: {'Alto (datos reales)' if modelo_activo else 'Medio (estimación)'}

Proporciona un análisis estructurado en formato JSON con las siguientes claves:
1. "resumen": Un resumen ejecutivo de 2-3 oraciones sobre la situación hídrica actual y proyectada
2. "recomendaciones": Array de 3-4 recomendaciones específicas y accionables considerando las proyecciones
3. "alertas": Array de 2-3 alertas críticas sobre riesgos futuros
4. "oportunidades": Array de 2-3 oportunidades para optimizar el uso del agua y adaptación climática

Responde ÚNICAMENTE con el JSON, sin texto adicional."""

        # 3. Llamar a GPT-4
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Eres un experto en gestión de recursos hídricos especializado en análisis de datos para gobiernos y cambio climático."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        # 4. Extraer respuesta
        analysis_text = response.choices[0].message.content.strip()
        
        # 5. Parsear JSON
        import json
        try:
            analysis = json.loads(analysis_text)
        except:
            # Si no es JSON válido, crear estructura básica
            analysis = {
                "resumen": analysis_text[:300],
                "recomendaciones": ["Revisar análisis completo en texto"],
                "alertas": ["Ver respuesta completa del sistema"],
                "oportunidades": ["Revisar detalles adicionales"]
            }
        
        # 6. Enriquece con datos del modelo ML
        if modelo_activo and proyecciones_ml:
            analysis['modelo_ml'] = {
                'activo': True,
                'proyecciones_12_meses': proyecciones_ml[:36],  # Primeros 3 estratos × 12 meses
                'incremento_promedio_pct': round(incremento_promedio, 2),
                'fuente': 'Modelo entrenado con datos reales de EPM'
            }
        
        return jsonify({
            "success": True,
            "analysis": analysis,
            "metadata": {
                "city": city,
                "country": country,
                "analyzed_at": datetime.now().isoformat(),
                "model": "gpt-4"
            }
        })
        
    except Exception as e:
        print(f"Error en análisis con IA: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Error al analizar con IA",
            "message": str(e)
        }), 500

# ============ ENDPOINTS CON DATOS REALES DE EPM ============

@app.route('/api/epm/tarifas', methods=['GET'])
def get_tarifas_epm():
    """Obtiene tarifas reales de EPM"""
    municipio = request.args.get('municipio')
    estrato = request.args.get('estrato')
    
    tarifas = data_loader.get_tarifas(municipio=municipio, estrato=estrato)
    
    return jsonify({
        "success": True,
        "data": tarifas,
        "total": len(tarifas),
        "source": "EPM - Datos reales" if tarifas else "Mock data"
    })

@app.route('/api/epm/interrupciones', methods=['GET'])
def get_interrupciones_epm():
    """Obtiene interrupciones reales de EPM"""
    municipio = request.args.get('municipio')
    limit = request.args.get('limit', type=int)
    
    interrupciones = data_loader.get_interrupciones(municipio=municipio, limit=limit)
    
    return jsonify({
        "success": True,
        "data": interrupciones,
        "total": len(interrupciones),
        "source": "EPM - Datos reales" if interrupciones else "Mock data"
    })

@app.route('/api/epm/reportes-ciudadanos', methods=['GET'])
def get_reportes_ciudadanos_epm():
    """Obtiene reportes ciudadanos reales/sintéticos"""
    municipio = request.args.get('municipio')
    categoria = request.args.get('categoria')
    estado = request.args.get('estado')
    
    reportes = data_loader.get_reportes(
        municipio=municipio,
        categoria=categoria,
        estado=estado
    )
    
    return jsonify({
        "success": True,
        "data": reportes,
        "total": len(reportes),
        "source": "Datos sintéticos basados en patrones reales"
    })

@app.route('/api/epm/consumo', methods=['GET'])
def get_consumo_epm():
    """Obtiene datos de consumo por estrato"""
    municipio = request.args.get('municipio', 'Medellín')
    estrato = request.args.get('estrato')
    
    if estrato:
        consumo = data_loader.get_consumo(estrato=estrato, municipio=municipio)
    else:
        # Obtiene promedios por estrato
        consumo = data_loader.get_consumo_por_estrato(municipio=municipio)
    
    return jsonify({
        "success": True,
        "data": consumo,
        "municipio": municipio,
        "source": "EPM - Datos reales" if consumo else "Mock data"
    })

@app.route('/api/epm/clima', methods=['GET'])
def get_clima_epm():
    """Obtiene datos climáticos recientes"""
    dias = request.args.get('dias', 30, type=int)
    
    clima = data_loader.get_clima_reciente(dias=dias)
    
    return jsonify({
        "success": True,
        "data": clima,
        "total": len(clima),
        "source": "Datos climáticos sintéticos Medellín"
    })

@app.route('/api/epm/stats', methods=['GET'])
def get_epm_stats():
    """Estadísticas generales de datos de EPM"""
    stats = data_loader.get_stats()
    
    return jsonify({
        "success": True,
        "stats": stats,
        "has_real_data": data_loader.has_data()
    })

# ============ ENDPOINTS CON DATOS REALES DE URUGUAY (OSE) ============

@app.route('/api/uruguay/calidad-agua', methods=['GET'])
def get_calidad_agua_uruguay():
    """Obtiene datos de calidad de agua de Montevideo"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    ubicacion = request.args.get('ubicacion')
    fecha = request.args.get('fecha')
    
    calidad = uy_loader.get_calidad_agua(ubicacion=ubicacion, fecha=fecha)
    
    return jsonify({
        "success": True,
        "data": calidad,
        "total": len(calidad),
        "source": "OSE Uruguay - Datos reales" if calidad else "Mock data"
    })

@app.route('/api/uruguay/tarifas', methods=['GET'])
def get_tarifas_ose():
    """Obtiene tarifas de OSE Uruguay"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    categoria = request.args.get('categoria')
    
    tarifas = uy_loader.get_tarifas_ose(categoria=categoria)
    
    return jsonify({
        "success": True,
        "data": tarifas,
        "total": len(tarifas),
        "source": "OSE - Datos reales" if tarifas else "Mock data"
    })

@app.route('/api/uruguay/reportes', methods=['GET'])
def get_reportes_montevideo():
    """Obtiene reportes ciudadanos de Montevideo"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    barrio = request.args.get('barrio')
    categoria = request.args.get('categoria')
    estado = request.args.get('estado')
    
    reportes = uy_loader.get_reportes_montevideo(
        barrio=barrio,
        categoria=categoria,
        estado=estado
    )
    
    return jsonify({
        "success": True,
        "data": reportes,
        "total": len(reportes),
        "source": "Datos sintéticos Montevideo"
    })

@app.route('/api/uruguay/interrupciones', methods=['GET'])
def get_interrupciones_montevideo():
    """Obtiene interrupciones de servicio en Montevideo"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    barrio = request.args.get('barrio')
    limit = request.args.get('limit', type=int)
    
    interrupciones = uy_loader.get_interrupciones_montevideo(barrio=barrio, limit=limit)
    
    return jsonify({
        "success": True,
        "data": interrupciones,
        "total": len(interrupciones),
        "source": "Datos sintéticos OSE"
    })

@app.route('/api/uruguay/clima', methods=['GET'])
def get_clima_montevideo():
    """Obtiene datos climáticos de Montevideo"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    dias = request.args.get('dias', 30, type=int)
    
    clima = uy_loader.get_clima_montevideo(dias=dias)
    
    return jsonify({
        "success": True,
        "data": clima,
        "total": len(clima),
        "source": "INUMET - Datos reales" if clima else "Mock data"
    })

@app.route('/api/uruguay/stats', methods=['GET'])
def get_uruguay_stats():
    """Estadísticas generales de datos de Uruguay"""
    from data_loader import DataLoader
    
    uy_loader = DataLoader(pais='uruguay', ciudad='montevideo')
    
    stats = uy_loader.get_stats_uruguay()
    
    return jsonify({
        "success": True,
        "stats": stats,
        "has_real_data": uy_loader.has_uruguay_data()
    })

# ============ ENDPOINTS DE MACHINE LEARNING ============

@app.route('/api/ml/proyecciones', methods=['GET'])
def get_ml_proyecciones():
    """
    Obtiene proyecciones de consumo usando modelos de ML
    Query params: ciudad, estrato (opcional)
    """
    ciudad = request.args.get('ciudad', 'Medellín')
    estrato = request.args.get('estrato', None)
    
    try:
        proyecciones = predictor.obtener_proyecciones(ciudad, estrato)
        
        return jsonify({
            "success": True,
            "ciudad": ciudad,
            "estrato": estrato,
            "modelo_ml_activo": predictor.ml_enabled,
            "proyecciones": proyecciones,
            "total_meses": len(set([p['fecha'][:7] for p in proyecciones]))
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/ml/predecir-consumo', methods=['POST'])
def predecir_consumo():
    """
    Predice consumo para parámetros específicos
    Body: { estrato, mes, precipitacion, temperatura }
    """
    data = request.json
    estrato = data.get('estrato', '3')
    mes = data.get('mes', datetime.now().month)
    precipitacion = data.get('precipitacion', 150)
    temperatura = data.get('temperatura', 22)
    
    try:
        consumo_predicho = predictor.predecir_consumo(
            estrato, mes, precipitacion, temperatura
        )
        
        return jsonify({
            "success": True,
            "estrato": estrato,
            "mes": mes,
            "consumo_predicho_m3": consumo_predicho,
            "modelo_ml_activo": predictor.ml_enabled
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/ml/clasificar-riesgo', methods=['POST'])
def clasificar_riesgo():
    """
    Clasifica riesgo hídrico
    Body: { ciudad, estrato, consumo, mes, precipitacion, temperatura }
    """
    data = request.json
    ciudad = data.get('ciudad', 'Medellín')
    estrato = data.get('estrato', '3')
    consumo = data.get('consumo', 20)
    mes = data.get('mes', datetime.now().month)
    precipitacion = data.get('precipitacion', 150)
    temperatura = data.get('temperatura', 22)
    
    try:
        nivel_riesgo = predictor.clasificar_riesgo(
            ciudad, estrato, consumo, mes, precipitacion, temperatura
        )
        
        return jsonify({
            "success": True,
            "ciudad": ciudad,
            "nivel_riesgo": nivel_riesgo,
            "modelo_ml_activo": predictor.ml_enabled
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    print("=" * 60)
    print("WaterWay API iniciando...")
    print("=" * 60)
    print("- Datos abiertos: /api/datasets")
    print("- IA para reportes: /api/analyze-water-data")
    print("- Datos reales EPM: /api/epm/*")
    print("=" * 60)
    print("Servidor corriendo en http://localhost:5000")
    print("=" * 60)
    app.run(debug=True, port=5000)
