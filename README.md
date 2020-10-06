**WebGL|Three.js Modelo 3D**

## index.php

Página de inicio

1. Requiere conexión a https://maxcdn.bootstrapcdn.com
2. Carga el 'modal' de visualización del espacio cultural.
3. Carga el frame que contiene el archivo JS que despliega el modelo 3d.

---

## loader360.php

Contenedor del JS que despliega el 360.

---

## loaderEC.php

Contenedor del 'modal' que despliega la información del Espacio Cultural.

1. Requiere conexión a base de datos del RUEyAC
2. El código forza la lectura del id 000000000225. Se requiere una relación en el switch de la línea 85.
3. Pendiente el diseño personalizado que **Jaime Hernández** ha estado trabajando por su lado **como yo he estado trabajando** en el Modelo 3d.

---

## loaderModelo3d.php

Contenedor del JS que despliega el modelo 3d.

---

## main.css

Hoja de estilos por defecto de Three.js

---

## webgl.js

Carga del modelo 3d

1. Dentro de assets/3dmodel/ se requieren los archivos CCU3d.obj, CCU3d.mtl y la carpeta CCU3d/ que **Kristell Franco** ha estado trabajando por su lado **como yo he estado trabajando** en el Modelo3d.
2. Se pueden modificar las constantes para activar o desactivar ciertas características del Render.
3. Comentar línea 218 y descomentar línea 219 para visualizar modelo final.

---

## webgl360.js

Carga de la imagen 360

1. Dentro de assets/foto360/ se requieren los archivos HDRi o JPG de las fotos 360 que *no sé quién* ha estado trabajando *como yo he estado trabajando*.
2. Descomentar líneas 44 a 46 para cargar imágen HDR (sin verificar).
