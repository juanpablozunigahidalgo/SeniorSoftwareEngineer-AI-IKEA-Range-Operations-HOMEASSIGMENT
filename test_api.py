import requests
import sys

# Usamos 127.0.0.1 para evitar problemas de DNS en Windows
BASE_URL = "http://127.0.0.1:3000"

def run_test():
    print("🚀 INICIANDO TEST DE INTEGRACIÓN...\n")

    # ---------------------------------------------------------
    # 1. CREAR PRODUCTO
    # ---------------------------------------------------------
    print("1. Intentando crear producto...")
    payload = {
        "name": "Python Test Item",
        "sku": "PY-TEST-001",
        "stock": 10
    }
    response = requests.post(f"{BASE_URL}/products", json=payload)
    
    if response.status_code == 201:
        data = response.json()
        product_id = data['id']
        print(f"✅ Éxito: Producto creado. ID: {product_id}")
    else:
        print(f"❌ Fallo al crear: {response.text}")
        sys.exit(1)

    # ---------------------------------------------------------
    # 2. VERIFICAR STOCK INICIAL
    # ---------------------------------------------------------
    print(f"\n2. Verificando stock inicial (Esperado: 10)...")
    response = requests.get(f"{BASE_URL}/products/{product_id}")
    stock = response.json()['stock']
    if stock == 10:
        print(f"✅ Stock correcto: {stock}")
    else:
        print(f"❌ Stock incorrecto: {stock}")

    # ---------------------------------------------------------
    # 3. INCREMENTAR STOCK (+5)
    # ---------------------------------------------------------
    print(f"\n3. Incrementando stock en 5...")
    requests.post(f"{BASE_URL}/products/{product_id}/increment", json={"amount": 5})
    
    # Validar
    response = requests.get(f"{BASE_URL}/products/{product_id}")
    stock = response.json()['stock']
    if stock == 15:
        print(f"✅ Stock actualizado correctamente a: {stock}")
    else:
        print(f"❌ Fallo en incremento. Stock actual: {stock}")

    # ---------------------------------------------------------
    # 4. PRUEBA DE FUEGO: DECREMENTAR DEMASIADO (-100)
    # ---------------------------------------------------------
    print(f"\n4. Intentando decrementar más de lo que hay (Test de Lógica)...")
    # Tenemos 15, intentamos restar 100. DEBE FALLAR.
    response = requests.post(f"{BASE_URL}/products/{product_id}/decrement", json={"amount": 100})
    
    if response.status_code == 400:
        print(f"✅ ¡PRUEBA SUPERADA! El sistema protegió el stock.")
        print(f"   Mensaje del servidor: {response.json()}")
    else:
        print(f"❌ ALERTA: El sistema permitió stock negativo o falló de forma inesperada.")
        print(f"   Status: {response.status_code}, Stock actual: {requests.get(f'{BASE_URL}/products/{product_id}').json()['stock']}")

    # ---------------------------------------------------------
    # 5. LIMPIEZA (DELETE)
    # ---------------------------------------------------------
    print(f"\n5. Borrando producto de prueba...")
    requests.delete(f"{BASE_URL}/products/{product_id}")
    
    # Verificar que ya no existe
    response = requests.get(f"{BASE_URL}/products/{product_id}")
    if response.status_code == 404:
        print(f"✅ Producto eliminado correctamente.")
    else:
        print(f"⚠️ No se pudo eliminar el producto.")

    print("\n------------------------------------------------")
    print("🏆 TEST FINALIZADO CON ÉXITO")
    print("------------------------------------------------")

if __name__ == "__main__":
    try:
        run_test()
    except requests.exceptions.ConnectionError:
        print("❌ Error: No se pudo conectar al servidor. ¿Está corriendo 'npm run dev'?")