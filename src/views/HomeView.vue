HomeView.vue

<template>
  <div class="min-h-screen bg-zinc-900 text-white p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Welcome, CarlosIbarra</h1>
      <p class="text-zinc-400">Selecciona una herramienta para comenzar</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Distribución Binomial -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-blue-400 text-3xl mb-3">∑</div>
        <h2 class="text-lg font-semibold mb-2">Distribución Binomial</h2>
        <p class="text-sm text-zinc-400">Calcular probabilidades y valores esperados</p>
      </div>

      <!-- Distribución Bernoulli -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-purple-400 text-3xl mb-3">𝑝</div>
        <h2 class="text-lg font-semibold mb-2">Distribución Bernoulli</h2>
        <p class="text-sm text-zinc-400">Simular ensayos de éxito/fracaso</p>
      </div>

      <!-- Distribución Normal -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-green-400 text-3xl mb-3">𝜙</div>
        <h2 class="text-lg font-semibold mb-2">Distribución Normal</h2>
        <p class="text-sm text-zinc-400">Cálculos con curva de campana</p>
      </div>

      <!-- Distribución Poisson -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-yellow-400 text-3xl mb-3">λ</div>
        <h2 class="text-lg font-semibold mb-2">Distribución Poisson</h2>
        <p class="text-sm text-zinc-400">Eventos en intervalo de tiempo</p>
      </div>

      <!-- Simulaciones Monte Carlo -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-cyan-400 text-3xl mb-3">🎲</div>
        <h2 class="text-lg font-semibold mb-2">Simulaciones Monte Carlo</h2>
        <p class="text-sm text-zinc-400">Métodos de simulación estadística</p>
      </div>

      <!-- Método de Grebs -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-orange-400 text-3xl mb-3">ƒ</div>
        <h2 class="text-lg font-semibold mb-2">Método de Grebs</h2>
        <p class="text-sm text-zinc-400">Algoritmos de estimación avanzada</p>
      </div>

      <!-- Calculadora de Probabilidad -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-pink-400 text-3xl mb-3">📊</div>
        <h2 class="text-lg font-semibold mb-2">Calculadora Avanzada</h2>
        <p class="text-sm text-zinc-400">Operaciones estadísticas complejas</p>
      </div>

      <!-- Análisis de Regresión -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-emerald-400 text-3xl mb-3">📈</div>
        <h2 class="text-lg font-semibold mb-2">Análisis de Regresión</h2>
        <p class="text-sm text-zinc-400">Modelado predictivo y correlaciones</p>
      </div>

      <!-- Pruebas de Hipótesis -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-violet-400 text-3xl mb-3">⚖️</div>
        <h2 class="text-lg font-semibold mb-2">Pruebas de Hipótesis</h2>
        <p class="text-sm text-zinc-400">Test t, z, chi-cuadrado y más</p>
      </div>

      <!-- Intervalos de Confianza -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-rose-400 text-3xl mb-3">🎯</div>
        <h2 class="text-lg font-semibold mb-2">Intervalos de Confianza</h2>
        <p class="text-sm text-zinc-400">Estimación de parámetros poblacionales</p>
      </div>

      <!-- Reportes y Exportación -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-indigo-400 text-3xl mb-3">📑</div>
        <h2 class="text-lg font-semibold mb-2">Reportes</h2>
        <p class="text-sm text-zinc-400">Exportar resultados en PDF/Excel</p>
      </div>

      <!-- Historial de Cálculos -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-red-400 text-3xl mb-3">📝</div>
        <h2 class="text-lg font-semibold mb-2">Historial</h2>
        <p class="text-sm text-zinc-400">Registro completo de cálculos</p>
      </div>

      <!-- Base de Datos Estadística -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-amber-400 text-3xl mb-3">💾</div>
        <h2 class="text-lg font-semibold mb-2">Base de Datos</h2>
        <p class="text-sm text-zinc-400">Conjuntos de datos predefinidos</p>
      </div>

      <!-- Visualización de Datos -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-sky-400 text-3xl mb-3">📉</div>
        <h2 class="text-lg font-semibold mb-2">Visualización</h2>
        <p class="text-sm text-zinc-400">Gráficos y dashboards interactivos</p>
      </div>

      <!-- Configuración del Sistema -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-zinc-400 text-3xl mb-3">⚙️</div>
        <h2 class="text-lg font-semibold mb-2">Configuración</h2>
        <p class="text-sm text-zinc-400">Personalizar preferencias del sistema</p>
      </div>

      <!-- Ayuda y Tutoriales -->
      <div class="bg-zinc-800 p-6 rounded-xl shadow-lg hover:bg-zinc-700 cursor-pointer transition-colors border border-zinc-700">
        <div class="text-lime-400 text-3xl mb-3">❓</div>
        <h2 class="text-lg font-semibold mb-2">Ayuda</h2>
        <p class="text-sm text-zinc-400">Tutoriales y documentación</p>
      </div>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="mt-12 p-6 bg-zinc-800 rounded-xl border border-zinc-700">
      <h2 class="text-xl font-semibold mb-4">Estadísticas Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-zinc-700 rounded-lg">
          <div class="text-2xl font-bold text-blue-400">128</div>
          <div class="text-sm text-zinc-400">Cálculos hoy</div>
        </div>
        <div class="text-center p-4 bg-zinc-700 rounded-lg">
          <div class="text-2xl font-bold text-green-400">94%</div>
          <div class="text-sm text-zinc-400">Precisión promedio</div>
        </div>
        <div class="text-center p-4 bg-zinc-700 rounded-lg">
          <div class="text-2xl font-bold text-purple-400">27</div>
          <div class="text-sm text-zinc-400">Simulaciones activas</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
/* Efectos hover mejorados */
.bg-zinc-800 {
  transition: all 0.3s ease;
}

.bg-zinc-800:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

/* Mejora la legibilidad del texto */
.text-zinc-400 {
  line-height: 1.5;
}
</style>
