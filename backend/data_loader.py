"""
WaterWay - Cargador de datos reales de Colombia
Carga y procesa los datos JSON generados en Google Colab.
"""
import json
from pathlib import Path

# Ruta base de datos
DATA_DIR = Path(__file__).parent / 'data' / 'processed'


class DataLoader:
    """Carga y gestiona los datos reales de Colombia."""

    def __init__(self, pais='colombia', ciudad=None):
        """Inicializa el cargador de datos para Colombia."""
        self.pais = pais.lower() if pais else 'colombia'
        self.ciudad = ciudad.lower() if ciudad else None

        self.tarifas = []
        self.interrupciones = []
        self.reportes = []
        self.consumo = []
        self.clima = []
        self.summary = {}

        self._load_all()

    def _load_json(self, filename):
        """Carga un archivo JSON."""
        filepath = DATA_DIR / filename
        if not filepath.exists():
            print(f"[!] {filename} no encontrado, usando datos mock")
            return None

        try:
            with open(filepath, 'r', encoding='utf-8') as file_handle:
                data = json.load(file_handle)
            print(f"[OK] {filename} cargado: {len(data) if isinstance(data, list) else 'OK'} registros")
            return data
        except Exception as exc:
            print(f"[ERROR] Error cargando {filename}: {exc}")
            return None

    def _load_all(self):
        """Carga los archivos de datos de Colombia."""
        print("\n" + "=" * 60)
        print("CARGANDO DATOS REALES DE EPM")
        print("=" * 60)
        self._load_colombia_data()
        print("=" * 60 + "\n")

    def _load_colombia_data(self):
        """Carga datos de Colombia (EPM Medellín)."""
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

    def has_data(self):
        """Verifica si hay datos cargados."""
        return len(self.tarifas) > 0 or len(self.reportes) > 0

    def get_tarifas(self, municipio=None, estrato=None):
        """Obtiene tarifas filtradas."""
        data = self.tarifas

        if municipio:
            data = [t for t in data if t.get('Municipio') == municipio]

        if estrato:
            data = [t for t in data if str(t.get('Estrato')) == str(estrato)]

        return data

    def get_interrupciones(self, municipio=None, limit=None):
        """Obtiene interrupciones filtradas."""
        data = self.interrupciones

        if municipio:
            data = [i for i in data if i.get('Municipio') == municipio]

        if limit:
            data = data[:limit]

        return data

    def get_reportes(self, municipio=None, categoria=None, estado=None):
        """Obtiene reportes filtrados."""
        data = self.reportes

        if municipio:
            data = [r for r in data if r.get('municipio') == municipio]

        if categoria:
            data = [r for r in data if r.get('categoria') == categoria]

        if estado:
            data = [r for r in data if r.get('estado') == estado]

        return data

    def get_consumo(self, estrato=None, municipio=None):
        """Obtiene datos de consumo filtrados."""
        data = self.consumo

        if estrato:
            data = [c for c in data if str(c.get('estrato')) == str(estrato)]

        if municipio:
            data = [c for c in data if c.get('municipio') == municipio]

        return data

    def get_consumo_por_estrato(self, municipio='Medellín'):
        """Calcula consumo promedio por estrato."""
        consumos = self.get_consumo(municipio=municipio)

        if not consumos:
            return {}

        estratos = {}
        for consumo_item in consumos:
            estrato = str(consumo_item.get('estrato'))
            consumo = consumo_item.get('consumo_m3', 0)

            if estrato not in estratos:
                estratos[estrato] = []
            estratos[estrato].append(consumo)

        result = {}
        for estrato, valores in estratos.items():
            result[estrato] = {
                'promedio': round(sum(valores) / len(valores), 2),
                'total': len(valores)
            }

        return result

    def get_clima_reciente(self, dias=30):
        """Obtiene datos climáticos recientes."""
        data = self.clima

        if not data:
            return []

        sorted_data = sorted(data, key=lambda x: x.get('fecha', ''), reverse=True)
        return sorted_data[:dias]

    def get_stats(self):
        """Obtiene estadísticas generales."""
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


# Instancia global
data_loader = DataLoader()
