<template>
  <div>
    <!-- Contenedor para el mapa -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-9 text-center">

        </div>
      </div>
      <div class="mt-3 mx-auto" id="mapid" style="width: 1150px; height: 700px;"></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';

export default {
  setup() {
    onMounted(() => {
      // Crea un mapa en el contenedor 'mapid' y lo centra en una ubicación inicial
      var map = L.map('mapid').setView([-12.0464, -77.0428], 12);

      // Añade una capa de mapa base de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const coordenadas = [
  {
    "latitud": -3.740408055503753,
    "longitud": -73.25549241592958,
    "administrador": "ADMADOLFO",
    "estado": "activo",
    "reportes": "elgolero 30"
  },
  {
    "latitud": -9.922442418053716,
    "longitud": -76.23243795210122,
    "administrador": "JOSE BONILLA",
    "estado": "activo",
    "reportes": "jhanshuanuco"
  },
  {
    "latitud": -16.400736255286297,
    "longitud": -71.53093459482432,
    "administrador": "JOSE BONILLA",
    "estado": "activo",
    "reportes": "kg-munoznajar"
  },
  {
    "latitud": -5.89231459438117,
    "longitud": -76.11762856803297,
    "administrador": "YENY",
    "estado": "activo",
    "reportes": "kingyurimaguas"
  },
  {
    "latitud": -14.067858468872025,
    "longitud": -75.72628471123527,
    "administrador": "RIVERA",
    "estado": "activo",
    "reportes": "tinbet-ica"
  },
  {
    "latitud": -5.914980002556141,
    "longitud": -76.12960512619074,
    "administrador": "YENY",
    "estado": "activo",
    "reportes": "vado-yeny"
  },
  {
    "latitud": -5.890514974748435,
    "longitud": -76.1091166675597,
    "administrador": "YENY",
    "estado": "activo",
    "reportes": "yurimaguas"
  },
  {
    "latitud": -9.035602371921138,
    "longitud": -75.50760662543489,
    "administrador": "CARLOS A",
    "estado": "activo",
    "reportes": "28dejulio-aguaytia"
  },
  {
    "latitud": -9.035602371921138,
    "longitud": -75.50760662543489,
    "administrador": "CARLOS A",
    "estado": "activo",
    "reportes": "28dejulio-aguaytia-amb2"
  },
  {
    "latitud": -12.057384727162555,
    "longitud": -77.03025665881357,
    "administrador": "GABRIEL",
    "estado": "activo",
    "reportes": "ABANCAYUNICACHI"
  },
  {
    "latitud": -9.035602371921138,
    "longitud": -75.50760662543489,
    "administrador": "CARLOS A",
    "estado": "activo",
    "reportes": "28dejulio-aguaytia-amb2"
  },
  {
    "latitud": -12.057384727162555,
    "longitud": -77.03025665881357,
    "administrador": "GABRIEL",
    "estado": "activo",
    "reportes": "ABANCAYUNICACHI"
  },
  {
    "latitud": -11.658495178644468,
    "longitud": -69.23607005853971,
    "administrador": "ARTURO",
    "estado": "activo",
    "reportes": "alerta"
  },
  {
    "latitud": -16.4296735,
    "longitud": -71.5601909,
    "administrador": "SOCIOS INDIVIDUALES",
    "estado": "activo",
    "reportes": "alfonsomarin"
  },
  {
    "latitud": -8.068551084505817,
    "longitud": -79.0228473434431,
    "administrador": "ARTURO",
    "estado": "activo",
    "reportes": "altotrujillo"
  },
  {
    "latitud": -12.400791594601433,
    "longitud": -73.9106211876755,
    "administrador": "SOCIOS INDIVIDUALES",
    "estado": "activo",
    "reportes": "amargura"
  },
  {
    "latitud": -8.384036344594632,
    "longitud": -74.55770161015667,
    "administrador": "PACO",
    "estado": "activo",
    "reportes": "amazonas-pucallpa"
  },
  {
    "latitud": -8.383217394832196,
    "longitud": -74.55528538103717,
    "administrador": "PACO",
    "estado": "activo",
    "reportes": "amazonasucayali"
  },
  {
    "latitud": -5.709315596868296,
    "longitud": -78.8085558914352,
    "administrador": "RICARDO INBET",
    "estado": "activo",
    "reportes": "amazonbet jaen"
  },
  {
    "latitud": -5.885691674584661,
    "longitud": -76.12749903610401,
    "administrador": "RICARDO INBET",
    "estado": "activo",
    "reportes": "amazonbet5"
  }
];

      // Itera sobre las coordenadas y añade marcadores al mapa
      coordenadas.forEach(coordenada => {
        var marker = L.marker([coordenada.latitud, coordenada.longitud]).addTo(map);
        marker.bindPopup(`
          <b>Administrador:</b> ${coordenada.administrador}<br>
          <b>Estado:</b> ${coordenada.estado}<br>
          <b>Reportes:</b> ${coordenada.reportes}
        `);
      });
    });
  }
};
</script>
