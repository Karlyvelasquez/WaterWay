"""
WaterWay - Predictor de consumo y riesgo hídrico
Usa modelos de Machine Learning entrenados en Colab
"""
import joblib
import pandas as pd
import numpy as np
import json
from pathlib import Path
from datetime import datetime

class WaterPredictor:
    """Predictor de consumo y riesgo hídrico usando ML"""
    
    def __init__(self):
        model_path = Path(__file__).parent / 'models' / 'waterway_models.pkl'
        proyecciones_model_path = Path(__file__).parent / 'models' / 'waterway_proyecciones_model.pkl'
        proyecciones_data_path = Path(__file__).parent / 'data' / 'processed' / 'proyecciones_12_meses.json'
        
        # Carga modelo base
        if not model_path.exists():
            print("[!] Modelo ML no encontrado, usando predicciones simuladas")
            self.models = None
            self.ml_enabled = False
        else:
            try:
                self.models = joblib.load(model_path)
                self.ml_enabled = True
                print("[OK] Modelos de ML cargados correctamente")
                
                # Extrae metadata
                metadata = self.models.get('metadata', {})
                print(f"    - Fecha entrenamiento: {metadata.get('fecha_entrenamiento', 'N/A')}")
                print(f"    - Registros usados: {metadata.get('num_registros_consumo', 'N/A')}")
                print(f"    - Estratos: {len(metadata.get('estratos', []))}")
            except Exception as e:
                print(f"[ERROR] Error cargando modelo: {e}")
                self.models = None
                self.ml_enabled = False
        
        # Carga modelo de proyecciones y datos pre-calculados
        self.proyecciones_model = None
        self.proyecciones_data = []
        self.proyecciones_enabled = False
        
        if proyecciones_model_path.exists() and proyecciones_data_path.exists():
            try:
                # Carga modelo de proyecciones
                self.proyecciones_model = joblib.load(proyecciones_model_path)
                
                # Carga proyecciones pre-calculadas
                with open(proyecciones_data_path, 'r', encoding='utf-8') as f:
                    self.proyecciones_data = json.load(f)
                
                self.proyecciones_enabled = True
                
                # Extrae metadata
                metadata_proy = self.proyecciones_model.get('metadata', {})
                print("[OK] Modelo de proyecciones cargado")
                print(f"    - Precision: {metadata_proy.get('r2', 0)*100:.1f}%")
                print(f"    - Proyecciones: {len(self.proyecciones_data)} registros")
                print(f"    - Escenarios: Actual, Optimista, Pesimista")
            except Exception as e:
                print(f"[!] Error cargando proyecciones: {e}")
                print("    Usando proyecciones simuladas")
                self.proyecciones_enabled = False
    
    def predecir_consumo(self, estrato, mes, precipitacion=150, temperatura=22):
        """
        Predice consumo de agua para un estrato en un mes dado
        
        Args:
            estrato: str - Estrato ('1', '2', '3', '4', '5', '6', 'Comercial', 'Industrial')
            mes: int - Mes del año (1-12)
            precipitacion: float - Precipitación mensual en mm
            temperatura: float - Temperatura promedio en °C
        
        Returns:
            float - Consumo predicho en m³
        """
        # Fallback si no hay modelo
        consumo_base = {
            '1': 15, '2': 17, '3': 19, '4': 21, 
            '5': 25, '6': 30, 'Comercial': 150, 'Industrial': 500
        }
        
        if not self.ml_enabled:
            # Simulación simple con estacionalidad
            base = consumo_base.get(str(estrato), 20)
            factor_clima = 1 + ((temperatura - 22) * 0.02) - ((precipitacion - 150) * 0.001)
            return round(base * factor_clima, 2)
        
        try:
            modelo_data = self.models['consumo_predictor']
            model = modelo_data['model']
            scaler = modelo_data['scaler']
            le_estrato = modelo_data['label_encoder_estrato']
            
            # Prepara features
            estrato_encoded = le_estrato.transform([str(estrato)])[0]
            trimestre = (mes - 1) // 3 + 1
            dia_año = mes * 30
            
            # Consumo histórico como baseline
            consumo_ma_3 = consumo_base.get(str(estrato), 20)
            
            # Features: ['mes', 'trimestre', 'dia_año', 'precipitacion_mm', 
            #            'temperatura_c', 'consumo_ma_3', 'estrato_encoded']
            X = np.array([[mes, trimestre, dia_año, precipitacion, 
                          temperatura, consumo_ma_3, estrato_encoded]])
            
            X_scaled = scaler.transform(X)
            prediccion = model.predict(X_scaled)[0]
            
            return round(prediccion, 2)
            
        except Exception as e:
            print(f"Error en predicción ML: {e}")
            # Fallback
            return consumo_base.get(str(estrato), 20)
    
    def clasificar_riesgo(self, ciudad, estrato, consumo, mes, precipitacion=150, temperatura=22):
        """
        Clasifica nivel de riesgo hídrico
        
        Returns:
            str - 'Alto', 'Medio' o 'Bajo'
        """
        if not self.ml_enabled:
            # Simulación basada en reglas
            score = 0
            if consumo > 25:
                score += 30
            if precipitacion < 100:
                score += 25
            if temperatura > 24:
                score += 15
            if mes in [12, 1, 2, 3]:
                score += 20
            
            if score >= 60:
                return 'Alto'
            elif score >= 30:
                return 'Medio'
            return 'Bajo'
        
        try:
            modelo_data = self.models['riesgo_clasificador']
            model = modelo_data['model']
            le_estrato = modelo_data['label_encoder_estrato']
            le_riesgo = modelo_data['label_encoder_riesgo']
            
            estrato_encoded = le_estrato.transform([str(estrato)])[0]
            
            # Calcula percentil de consumo (simplificado)
            consumo_percentil = 0.5
            consumo_ma_3 = consumo
            
            # Features: ['mes', 'estrato_encoded', 'consumo_m3', 'precipitacion_mm', 
            #            'temperatura_c', 'consumo_ma_3', 'consumo_percentil']
            X = np.array([[mes, estrato_encoded, consumo, precipitacion, 
                          temperatura, consumo_ma_3, consumo_percentil]])
            
            prediccion_encoded = model.predict(X)[0]
            nivel_riesgo = le_riesgo.inverse_transform([prediccion_encoded])[0]
            
            return nivel_riesgo
            
        except Exception as e:
            print(f"Error en clasificación ML: {e}")
            return 'Medio'
    
    def obtener_proyecciones(self, ciudad='Medellín', estrato=None):
        """
        Retorna proyecciones de 12 meses
        
        Args:
            ciudad: str - Ciudad (solo Medellín tiene datos reales)
            estrato: str - Filtrar por estrato específico (opcional)
        
        Returns:
            list - Lista de proyecciones con escenarios climáticos
        """
        # Prioridad 1: Proyecciones reales pre-calculadas (del modelo especializado)
        if self.proyecciones_enabled and len(self.proyecciones_data) > 0:
            proyecciones = self.proyecciones_data
            
            if estrato:
                proyecciones = [p for p in proyecciones if p['estrato'] == str(estrato)]
            
            return proyecciones
        
        # Prioridad 2: Proyecciones del modelo base (si existe)
        if self.ml_enabled:
            proyecciones = self.models.get('proyecciones_12_meses', [])
            
            if len(proyecciones) > 0:
                if estrato:
                    proyecciones = [p for p in proyecciones if p['estrato'] == str(estrato)]
                return proyecciones
        
        # Fallback: Genera proyecciones simuladas
        return self._proyecciones_simuladas(estrato)
    
    def _proyecciones_simuladas(self, estrato=None):
        """Genera proyecciones simuladas si no hay modelo"""
        estratos = [estrato] if estrato else ['1', '2', '3', '4', '5', '6', 'Comercial', 'Industrial']
        proyecciones = []
        
        fecha_base = datetime.now()
        
        for est in estratos:
            consumo_base = self.predecir_consumo(est, fecha_base.month)
            
            for mes_futuro in range(1, 13):
                mes = ((fecha_base.month + mes_futuro - 1) % 12) + 1
                fecha = (fecha_base + pd.DateOffset(months=mes_futuro)).strftime('%Y-%m-%d')
                
                consumo_actual = self.predecir_consumo(est, mes, 150, 22)
                consumo_pesimista = self.predecir_consumo(est, mes, 120, 24)  # +2°C, -20% lluvia
                consumo_optimista = self.predecir_consumo(est, mes, 135, 23)  # +1°C, -10% lluvia
                
                proyecciones.append({
                    'fecha': fecha,
                    'estrato': str(est),
                    'consumo_actual': consumo_actual,
                    'consumo_pesimista': consumo_pesimista,
                    'consumo_optimista': consumo_optimista,
                    'incremento_pesimista_pct': round((consumo_pesimista - consumo_actual) / consumo_actual * 100, 2),
                    'incremento_optimista_pct': round((consumo_optimista - consumo_actual) / consumo_actual * 100, 2)
                })
        
        return proyecciones
    
    def analizar_completo(self, ciudad, datos_ciudad):
        """
        Análisis completo combinando todos los modelos
        
        Returns:
            dict - Análisis completo con proyecciones y recomendaciones
        """
        mes_actual = datetime.now().month
        
        # Obtiene proyecciones por estrato
        proyecciones_todas = self.obtener_proyecciones(ciudad)
        
        # Agrupa por mes
        proyecciones_mes = {}
        for proy in proyecciones_todas:
            mes = proy['fecha'][:7]  # YYYY-MM
            if mes not in proyecciones_mes:
                proyecciones_mes[mes] = {
                    'consumo_actual': 0,
                    'consumo_pesimista': 0,
                    'consumo_optimista': 0
                }
            proyecciones_mes[mes]['consumo_actual'] += proy['consumo_actual']
            proyecciones_mes[mes]['consumo_pesimista'] += proy['consumo_pesimista']
            proyecciones_mes[mes]['consumo_optimista'] += proy['consumo_optimista']
        
        # Convierte a lista
        proyecciones_agregadas = [
            {
                'mes': k,
                **v,
                'incremento_pct': round((v['consumo_pesimista'] - v['consumo_actual']) / v['consumo_actual'] * 100, 2)
            }
            for k, v in sorted(proyecciones_mes.items())[:12]
        ]
        
        # Calcula riesgo general
        riesgos = [self.clasificar_riesgo(ciudad, '3', 20, mes_actual + i) for i in range(12)]
        nivel_riesgo_predominante = max(set(riesgos), key=riesgos.count)
        
        return {
            'ciudad': ciudad,
            'modelo_ml_activo': self.ml_enabled,
            'proyecciones_reales_activas': self.proyecciones_enabled,
            'fecha_analisis': datetime.now().isoformat(),
            'proyecciones_12_meses': proyecciones_agregadas,
            'nivel_riesgo_predominante': nivel_riesgo_predominante,
            'riesgos_mensuales': riesgos,
            'recomendacion': self._generar_recomendacion(nivel_riesgo_predominante, proyecciones_agregadas)
        }
    
    def _generar_recomendacion(self, riesgo, proyecciones):
        """Genera recomendaciones basadas en el análisis"""
        if not proyecciones:
            return "No hay suficientes datos para generar recomendaciones"
        
        incremento_promedio = np.mean([p['incremento_pct'] for p in proyecciones])
        
        recomendaciones = []
        
        if riesgo == 'Alto':
            recomendaciones.append("Implementar plan de contingencia inmediato")
            recomendaciones.append("Restringir consumo en sectores no esenciales")
        elif riesgo == 'Medio':
            recomendaciones.append("Monitorear consumo semanalmente")
            recomendaciones.append("Implementar campañas de ahorro")
        
        if incremento_promedio > 10:
            recomendaciones.append(f"Demanda proyectada: +{incremento_promedio:.1f}%. Reforzar infraestructura")
        
        return " | ".join(recomendaciones) if recomendaciones else "Mantener monitoreo regular"

# Singleton global
_predictor = None

def get_predictor():
    """Obtiene instancia única del predictor"""
    global _predictor
    if _predictor is None:
        _predictor = WaterPredictor()
    return _predictor
