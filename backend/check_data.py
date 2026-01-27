"""
Script para verificar que los datos de EPM estén cargados correctamente
"""
from data_loader import data_loader

print("\n" + "="*70)
print(" VERIFICACIÓN DE DATOS DE EPM")
print("="*70)

# Verifica cada tipo de dato
checks = {
    'Tarifas': len(data_loader.tarifas),
    'Interrupciones': len(data_loader.interrupciones),
    'Reportes Ciudadanos': len(data_loader.reportes),
    'Consumo (registros)': len(data_loader.consumo),
    'Clima (días)': len(data_loader.clima)
}

print("\n📊 DATOS CARGADOS:")
print("-" * 70)

all_good = True
for nombre, cantidad in checks.items():
    status = "✅" if cantidad > 0 else "❌"
    print(f"{status} {nombre:.<50} {cantidad:>6} registros")
    if cantidad == 0:
        all_good = False

print("-" * 70)

# Muestra estadísticas detalladas
if data_loader.has_data():
    print("\n ESTADÍSTICAS DETALLADAS:")
    print("-" * 70)
    stats = data_loader.get_stats()
    
    if stats.get('municipios'):
        print(f"\nMunicipios disponibles: {', '.join(stats['municipios'])}")
    
    if stats.get('reportes'):
        print(f"\nReportes:")
        print(f"   - Total: {stats['reportes']['total']}")
        print(f"   - Pendientes: {stats['reportes']['pendientes']}")
        print(f"   - En proceso: {stats['reportes']['en_proceso']}")
        print(f"   - Resueltos: {stats['reportes']['resueltos']}")
    
    # Muestra consumo por estrato
    consumo_por_estrato = data_loader.get_consumo_por_estrato()
    if consumo_por_estrato:
        print(f"\nConsumo promedio por estrato (Medellín):")
        for estrato, data in sorted(consumo_por_estrato.items(), key=lambda x: str(x[0])):
            print(f"   - Estrato {estrato}: {data['promedio']:.2f} m³/mes")

print("\n" + "="*70)

if all_good:
    print("TODOS LOS DATOS ESTÁN CARGADOS CORRECTAMENTE")
else:
    print(" FALTAN ALGUNOS DATOS")
    print("\n Para cargar los datos:")
    print("   1. Descarga los JSON de Google Colab")
    print("   2. Colócalos en: backend/data/processed/")
    print("   3. Reinicia el servidor")

print("="*70 + "\n")
