"""
WaterWay - Cargador de datos reales (Colombia y Uruguay)
Carga y procesa los datos JSON generados en Google Colab
"""
import json
import os
from pathlib import Path

# Ruta base de datos
DATA_DIR = Path(__file__).parent / 'data' / 'processed'

class DataLoader:
    """Carga y gestiona datos reales de múltiples países"""
    
    def __init__(self, pais='colombia', ciudad=None):
        """
        Inicializa el cargador de datos
        pais: 'colombia' o 'uruguay'
        ciudad: 'medellin' o 'montevideo' (para datos específicos)
        """
        self.pais = pais.lower()
        self.ciudad = ciudad.lower() if ciudad else None
        
        # Datos de Colombia (EPM Medellín)
        self.tarifas = []
        self.interrupciones = []
        self.reportes = []
        self.consumo = []
        self.clima = []
        self.summary = {}
        
        # Datos de Uruguay (OSE Montevideo)
        self.calidad_agua = []
        self.tarifas_ose = []
        self.reportes_montevideo = []
        self.interrupciones_montevideo = []
        self.clima_montevideo = []
        self.summary_montevideo = {}
        
        # Intenta cargar los datos
        self._load_all()
    
    def _load_json(self, filename):
        """Carga un archivo JSON"""
        filepath = DATA_DIR / filename
        if not filepath.exists():
            print(f"[!] {filename} no encontrado, usando datos mock")
            return None
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"[OK] {filename} cargado: {len(data) if isinstance(data, list) else 'OK'} registros")
            return data
        except Exception as e:
            print(f"[ERROR] Error cargando {filename}: {e}")
            return None
    
    def _load_all(self):
        """Carga todos los archivos de datos según el país"""
        print("\n" + "="*60)
        
        if self.pais == 'uruguay' and self.ciudad == 'montevideo':
            print("CARGANDO DATOS REALES DE URUGUAY (OSE MONTEVIDEO)")
            print("="*60)
            self._load_uruguay_data()
        elif self.pais == 'colombia':
            print("CARGANDO DATOS REALES DE EPM")
            print("="*60)
            self._load_colombia_data()
        else:
            print(f"CARGANDO DATOS PARA {self.pais.upper()}")
            print("="*60)
            print("[!] Datos no disponibles, usando mock")
        
        print("="*60 + "\n")
    
    def _load_colombia_data(self):
        """Carga datos de Colombia (EPM Medellín)"""
        self.tarifas = self._load_json('tarifas.json') or []
        self.interrupciones = self._load_json('interrupciones.json') or []
        self.reportes = self._load_json('reportes.json') or []
        self.consumo = self._load_json('consumo.json') or []
        self.clima = self._load_json('clima.json') or []
        self.summary = self._load_json('summary.json') or {}
        
        if self.has_data():
            print("OK - Datos reales de EPM cargados exitosamente")
        else:
            print("AVISO - Usando datos mock")
    
    def _load_uruguay_data(self):
        """Carga datos de Uruguay (OSE Montevideo)"""
        mvd_dir = 'montevideo'
        
        self.calidad_agua = self._load_json(f'{mvd_dir}/calidad_agua_real.json') or []
        self.clima_montevideo = self._load_json(f'{mvd_dir}/clima_real.json') or []
        self.tarifas_ose = self._load_json(f'{mvd_dir}/tarifas_ose.json') or []
        self.reportes_montevideo = self._load_json(f'{mvd_dir}/reportes_montevideo.json') or []
        self.interrupciones_montevideo = self._load_json(f'{mvd_dir}/interrupciones_montevideo.json') or []
        self.summary_montevideo = self._load_json(f'{mvd_dir}/summary_montevideo.json') or {}
        
        if self.has_uruguay_data():
            print("OK - Datos reales de Uruguay cargados exitosamente")
        else:
            print("AVISO - Usando datos mock")
    
    def has_data(self):
        """Verifica si hay datos cargados (Colombia)"""
        return len(self.tarifas) > 0 or len(self.reportes) > 0
    
    def has_uruguay_data(self):
        """Verifica si hay datos cargados de Uruguay"""
        return (len(self.calidad_agua) > 0 or 
                len(self.tarifas_ose) > 0 or 
                len(self.reportes_montevideo) > 0)
    
    # ========== MÉTODOS PARA COLOMBIA (EPM) ==========
    
    def get_tarifas(self, municipio=None, estrato=None):
        """Obtiene tarifas filtradas"""
        data = self.tarifas
        
        if municipio:
            data = [t for t in data if t.get('Municipio') == municipio]
        
        if estrato:
            data = [t for t in data if str(t.get('Estrato')) == str(estrato)]
        
        return data
    
    def get_interrupciones(self, municipio=None, limit=None):
        """Obtiene interrupciones filtradas"""
        data = self.interrupciones
        
        if municipio:
            data = [i for i in data if i.get('Municipio') == municipio]
        
        if limit:
            data = data[:limit]
        
        return data
    
    def get_reportes(self, municipio=None, categoria=None, estado=None):
        """Obtiene reportes filtrados"""
        data = self.reportes
        
        if municipio:
            data = [r for r in data if r.get('municipio') == municipio]
        
        if categoria:
            data = [r for r in data if r.get('categoria') == categoria]
        
        if estado:
            data = [r for r in data if r.get('estado') == estado]
        
        return data
    
    def get_consumo(self, estrato=None, municipio=None):
        """Obtiene datos de consumo filtrados"""
        data = self.consumo
        
        if estrato:
            data = [c for c in data if str(c.get('estrato')) == str(estrato)]
        
        if municipio:
            data = [c for c in data if c.get('municipio') == municipio]
        
        return data
    
    def get_consumo_por_estrato(self, municipio='Medellín'):
        """Calcula consumo promedio por estrato"""
        consumos = self.get_consumo(municipio=municipio)
        
        if not consumos:
            return {}
        
        # Agrupa por estrato y calcula promedio
        estratos = {}
        for c in consumos:
            estrato = str(c.get('estrato'))
            consumo = c.get('consumo_m3', 0)
            
            if estrato not in estratos:
                estratos[estrato] = []
            estratos[estrato].append(consumo)
        
        # Calcula promedios
        result = {}
        for estrato, valores in estratos.items():
            result[estrato] = {
                'promedio': round(sum(valores) / len(valores), 2),
                'total': len(valores)
            }
        
        return result
    
    def get_clima_reciente(self, dias=30):
        """Obtiene datos climáticos recientes"""
        data = self.clima
        
        if not data:
            return []
        
        # Ordena por fecha descendente y toma los últimos N días
        sorted_data = sorted(data, key=lambda x: x.get('fecha', ''), reverse=True)
        return sorted_data[:dias]
    
    def get_stats(self):
        """Obtiene estadísticas generales"""
        if self.pais == 'uruguay':
            return self.get_stats_uruguay()
        
        return {
            'tarifas': len(self.tarifas),
            'interrupciones': len(self.interrupciones),
            'reportes': {
                'total': len(self.reportes),
                'pendientes': len([r for r in self.reportes if r.get('estado') == 'pendiente']),
                'en_proceso': len([r for r in self.reportes if r.get('estado') == 'en_proceso']),
                'resueltos': len([r for r in self.reportes if r.get('estado') == 'resuelto'])
            },
            'consumo_registros': len(self.consumo),
            'clima_registros': len(self.clima),
            'municipios': list(set([t.get('Municipio') for t in self.tarifas if t.get('Municipio')]))
        }
    
    # ========== MÉTODOS PARA URUGUAY (OSE) ==========
    
    def get_calidad_agua(self, ubicacion=None, fecha=None):
        """Obtiene datos de calidad de agua de Montevideo"""
        data = self.calidad_agua
        
        if ubicacion:
            data = [c for c in data if c.get('Policlinica') == ubicacion or c.get('ubicacion') == ubicacion]
        
        if fecha:
            data = [c for c in data if c.get('Fecha', '').startswith(fecha) or c.get('fecha', '').startswith(fecha)]
        
        return data
    
    def get_tarifas_ose(self, categoria=None):
        """Obtiene tarifas de OSE Uruguay"""
        data = self.tarifas_ose
        
        if categoria:
            data = [t for t in data if t.get('categoria', '').lower() == categoria.lower()]
        
        return data
    
    def get_reportes_montevideo(self, barrio=None, categoria=None, estado=None):
        """Obtiene reportes de Montevideo"""
        data = self.reportes_montevideo
        
        if barrio:
            data = [r for r in data if r.get('barrio') == barrio]
        
        if categoria:
            data = [r for r in data if r.get('categoria') == categoria]
        
        if estado:
            data = [r for r in data if r.get('estado') == estado]
        
        return data
    
    def get_interrupciones_montevideo(self, barrio=None, limit=None):
        """Obtiene interrupciones de servicio en Montevideo"""
        data = self.interrupciones_montevideo
        
        if barrio:
            data = [i for i in data if i.get('barrio') == barrio]
        
        if limit:
            data = data[:limit]
        
        return data
    
    def get_clima_montevideo(self, dias=30):
        """Obtiene datos climáticos recientes de Montevideo"""
        data = self.clima_montevideo
        
        if not data:
            return []
        
        # Ordena por fecha descendente y toma los últimos N días
        sorted_data = sorted(data, key=lambda x: x.get('fecha', ''), reverse=True)
        return sorted_data[:dias]
    
    def get_stats_uruguay(self):
        """Obtiene estadísticas de Uruguay"""
        return {
            'calidad_agua': len(self.calidad_agua),
            'tarifas_ose': len(self.tarifas_ose),
            'interrupciones': len(self.interrupciones_montevideo),
            'reportes': {
                'total': len(self.reportes_montevideo),
                'pendientes': len([r for r in self.reportes_montevideo if r.get('estado') == 'pendiente']),
                'en_proceso': len([r for r in self.reportes_montevideo if r.get('estado') == 'en_proceso']),
                'resueltos': len([r for r in self.reportes_montevideo if r.get('estado') == 'resuelto'])
            },
            'clima_registros': len(self.clima_montevideo),
            'barrios': list(set([r.get('barrio') for r in self.reportes_montevideo if r.get('barrio')]))
        }

# Instancia global
data_loader = DataLoader()
