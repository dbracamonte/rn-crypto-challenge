# React Native Crypto Challenge

Este proyecto es una aplicación móvil desarrollada en **React Native** que permite a los usuarios autenticarse mediante Google Sign-In, explorar un listado de criptomonedas utilizando la API de CoinMarketCap, y ver detalles específicos de cada criptomoneda. La aplicación también permite a los usuarios marcar criptomonedas como favoritas y persistir estos datos incluso después de cerrar la aplicación.

## Tecnologías y Librerías Utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **React Navigation**: Para la gestión de la navegación entre pantallas.
- **Google Sign-In**: Para la autenticación de usuarios mediante Google.
- **CoinMarketCap API**: Para obtener datos actualizados sobre criptomonedas.
- **Async Storage**: Para persistir los datos de las criptomonedas favoritas.
- **Zustand**: Para la gestión del estado global de la aplicación.
- **React Native SVG**: Para la renderización de gráficos e iconos SVG.
- **React Native Safe Area Context**: Para manejar áreas seguras en dispositivos con muescas.
- **React Native Screens**: Para mejorar el rendimiento de las pantallas en la navegación.

## Requisitos del Proyecto

### Pantalla de Login

- **Autenticación con Google Sign-In**: Implementación de un sistema de autenticación seguro utilizando Google Sign-In.
- **Navegación Post-Login**: Redirección automática al listado de criptomonedas después de un inicio de sesión exitoso.
- **Manejo de Errores**: Gestión adecuada de errores durante el proceso de autenticación.

### Pantalla de Listado de Criptomonedas

- **Consumo de API**: Uso de la API de CoinMarketCap para obtener y mostrar un listado de criptomonedas con información relevante como nombre, símbolo y precio actual.
- **Buscador**: Implementación de un buscador que permita filtrar criptomonedas por nombre y símbolo.
- **Favoritos**: Funcionalidad para marcar criptomonedas como favoritas y persistir estos datos en el dispositivo.
- **Filtro de Favoritos**: Opción para mostrar solo las criptomonedas marcadas como favoritas.

### Pantalla de Detalles de Criptomoneda

- **Detalles Extendidos**: Visualización de detalles adicionales como precio actual, variación porcentual en 24 horas y volumen de comercio.
- **Actualización Automática**: Consumo y actualización de datos cada 30 segundos.
- **Interacción del Usuario**: Posibilidad de refrescar manualmente los datos.

## Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```plaintext
BASE_URL=          # URL base de la API de CoinMarketCap
API_KEY=           # API Key para acceder a la API de CoinMarketCap
WEB_CLIENT_ID=     # Client ID para Google Sign-In (Web)
IOS_CLIENT_ID=     # Client ID para Google Sign-In (iOS)
```

## Instrucciones para Configurar las Variables de Entorno

1. **Crea un archivo `.env`** en la raíz del proyecto.
2. **Agrega las variables de entorno** mencionadas anteriormente con los valores correspondientes.
3. **Asegúrate de que el archivo `.env` esté incluido en el `.gitignore`** para evitar exponer información sensible.

## Instalación y Ejecución

### Requisitos Previos

- **Node.js**: Asegúrate de tener Node.js instalado (versión 18 o superior).
- **React Native CLI**: Instala el CLI de React Native siguiendo la [guía oficial](https://reactnative.dev/docs/environment-setup).

### Pasos para Ejecutar el Proyecto

1. **Clonar el Repositorio**:

   ```sh
   git clone https://github.com/tu-usuario/rn-crypto-challenge.git
   cd rn-crypto-challenge
   ```

2. **Instalar Dependencias**:
   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```sh
   npm install
   # O si prefieres usar Yarn
   yarn install
   ```

3. **Configurar Google Sign-In**:
   Sigue la guía de configuración de [Google Sign-In](https://react-native-google-signin.github.io/docs/install) para configurar las credenciales de Google en tu proyecto.

4. **Configurar CoinMarketCap API:**:
   Obtén una API Key de CoinMarketCap y configúrala en el archivo .env del proyecto.

5. **Ejecutar la Aplicación**:
   Android:
   ```sh
   npm run android
   # O usando Yarn
   yarn android
   ```

iOS:

```sh
cd ios && pod install && cd ..
npm run ios
# O usando Yarn
yarn ios
```

## Pruebas

El proyecto incluye pruebas unitarias y de integración para validar la lógica y el comportamiento de la aplicación. Puedes ejecutar las pruebas con el siguiente comando:

```sh
Copy
npm test
# O usando Yarn
yarn test
```
