# BOARD.UI
## Integrantes
-  Angie Tatiana Medina Gil
-  Jose Ricardo Pérez de León
-  Luis Gerardo Amaya Ortíz
-  Juan Sebastián Mina Echavarría

## Presentado
Para la materia de **Arquitectura de Software (ARSW)** a **Sebastian Henao Pinzon**
 
## Resumen
Tiempos modernos, UI’s modernas. Board.UI, es una herramienta para frontend developers que facilitará el flujo creativo de ideas y optimizará el proceso de creación de interfaces amigables para el usuario. 

## Descripción

Board.UI es una herramienta de colaboración en tiempo real que permitirá a miles de desarrolladores frontend desplegar sus diseños e ideas de forma ágil. Con esta propuesta se busca mejorar el trabajo de equipos de desarrolladores frontend.

## Antecedentes

Los antecedentes que nos llevaron a pensar esta propuesta de proyecto fueron principalmente los editores de texto que normalmente usamos para el desarrollo de nuestros proyectos.

## Mockups 

### Login y SignUp
![](Img/MockUps/LogIn.png)
![](Img/MockUps/SignUp.png)

### Crear una Sala
![](Img/MockUps/CrearSala.png)
![](Img/MockUps/CrearSala,SubirArchivos.png)
![](Img/MockUps/ConfiguracionSala.png)

### Unirse a una Sala
![](Img/MockUps/UnirseSala.png)
### Dejar una Sala
![](Img/MockUps/DejarSala.png)

### Editor de texto
![](Img/MockUps/EditorTexto.png)
#### Subir archivos como Asistente de la sala
![](Img/MockUps/Editor-SubirArchivo.png)
### Board
![](Img/MockUps/Editor-Board.png)

### Aceptar - Rechazar Requests
![](Img/MockUps/Aceptar-RechazarRequests.png)

## Diagramas ✏️📐

### Diagrama Entidad Relación
![](Img/Diagramas/DiagramaEntidadRelacion2.PNG)
### Diagrama Casos de uso
![](Img/Diagramas/DiagramaCasosUso.PNG)
### Diagrama de Despliegue
![](Img/Diagramas/DiagramaDespliegue.PNG)
### Diagrma de Componentes
![](Img/Diagramas/DiagramaComponentes.PNG)
### Diagrama de Clases
![](Img/Diagramas/DiagramaDeClases.PNG)

## Requerimientos no funcionales
### Disponibilidad

Se realizaron pruebas con 125 usuarios concurrentes por 30 segundos aproximadamente, con una sola maquina recibiendo peticiones el porcentaje de error se acercaba al 60% al hacer un escalamiento horizontal el porcentaje de error bajo casi al 30%.
https://pruebacorreoescuelaingeduco-my.sharepoint.com/:v:/g/personal/jose_perez-le_mail_escuelaing_edu_co/EY5ilGJ7Q5lFs7tkdQUSjIoBuL_DusIPr2DPMtPo44AiSQ?e=xK0x8g

### Usabilidad
* **Aesthetic and Minimalista Design:** Se tiene un diseño minimalista puesto que el usuario en todas las instancias de uso de la aplicación solo se le muestra la información necesaria/relevante para lo que esta realizando. Por ejemplo
  * Aunque el usuario pertenezca a una sala, la lista de los archivos de esta no sera visible a menos que el usuario seleccione la sala  
  ![](Img/Gifs/6.JoinRoom.gif)
  * Cuando se selecciona una sala, no se tiene visibilidad del contenido de los archivos a menos que se seleccione  
  ![](Img/Gifs/8.DisconnectRoom.gif)
  * Al desconectarse de una sala, la lista de los archivos no sera visible
  ![](Img/Gifs/9.AddFiles.gif)
* **Help and Documentation:** La aplicación cuenta con un manual de usuario, el cual explica todas las acciones que se pueden realizar junto con descripciones y demostraciones visuales.
[Manual de Usuario](https://angie-tatiana-medina-gil.gitbook.io/board.ui/ "Title").
## Enlace🔗
http://board-ui.azurewebsites.net/  

## Enlace Taiga 🔗
https://tree.taiga.io/project/angiemeg-boardui/timeline

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1c29dacb74cd4b28a85e7fc3d5392d4d)](https://www.codacy.com/gh/BOARD-UI/BOARD.UI/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BOARD-UI/BOARD.UI&amp;utm_campaign=Badge_Grade)
