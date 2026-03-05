## Shem HaMephorash – Calculadora de los 72 Nombres
**API REST Serverless + Frontend estático en AWS**

GitHub: https://github.com/EmmaLedesma/calculadora-72-nombres

🌐 **Demo en vivo:** http://shem72-app.s3-website-us-east-1.amazonaws.com  
🔗 **API en producción:** https://h07cdlmeqc.execute-api.us-east-1.amazonaws.com/prod

---

## 📌 Problema que Resuelve

Los sistemas de ángeles tutelares del Shem HaMephorash (72 Nombres de Dios) son complejos de calcular manualmente:

- Requieren conocimiento astronómico (grados solares, quinarios)
- Las fechas secundarias son difíciles de consultar sin una tabla completa
- No existe una herramienta web accesible y técnicamente rigurosa
- La mayoría de calculadoras online usan fórmulas simplificadas o incorrectas

Este proyecto resuelve esos desafíos construyendo una **API REST serverless en AWS** con un algoritmo fiel a la tabla de Eduardo Madirolas, más un frontend accesible que permite a cualquier persona calcular sus tres ángeles tutelares ingresando fecha, año y hora de nacimiento.

---

## 🏗️ Arquitectura

```
Usuario
  │
  ├── 🌐 Frontend (HTML/CSS/JS)
  │       └── AWS S3 Static Website
  │
  └── 🔗 API REST
          └── AWS API Gateway
                  └── AWS Lambda (Node.js 20)
                          ├── routes/angels.js
                          ├── utils/calculator.js
                          └── data/shem72.json
```

### Componentes Principales

#### ☁️ AWS Lambda
- Función serverless en Node.js 20
- Express app envuelta con `serverless-http`
- 256 MB de memoria, timeout 10 segundos
- Deploy automatizado con AWS SAM (CloudFormation)

#### 🔗 AWS API Gateway
- REST API con stage `prod`
- CORS habilitado para consumo desde el frontend
- 4 endpoints expuestos públicamente

#### 🪣 AWS S3
- Bucket configurado como sitio web estático
- Aloja el frontend (HTML/CSS/JS)
- Acceso público de lectura via bucket policy

#### 🧱 Infraestructura como Código
- `template.yaml` define toda la infraestructura (SAM/CloudFormation)
- Reproducible con un solo comando: `sam deploy`

---

## 🔢 Lógica de Cálculo

Los tres ángeles tutelares se calculan con métodos distintos e independientes:

| Ángel | Plano | Método |
|-------|-------|--------|
| **Físico** | Cuerpo · Vitalidad · Acción | Quinario solar por fecha — grado 0°-360°, cada ángel rige 5° desde Aries 0° = 21 marzo |
| **Emocional** | Emociones · Vínculos · Deseo | Fechas secundarias exactas según tabla Madirolas |
| **Mental** | Pensamiento · Conciencia · Intelecto | Hora de nacimiento — 72 segmentos de 20 minutos |

```js
// Ángel Físico — Quinario Solar
grado_solar = (días_desde_21_marzo / días_del_año) × 360°
ángel_físico = floor(grado_solar / 5) + 1  // 1-72

// Ángel Mental — Segmento horario
ángel_mental = floor((hora × 60 + minutos) / 20) + 1  // 1-72
```

Fuente: **Eduardo Madirolas — Los 72 Nombres**

---

## 🚀 Endpoints de la API

### `GET /api/angels`
Lista los 72 ángeles. Acepta filtros opcionales: `zodiac`, `choir`, `sephira`.
```
GET /api/angels?zodiac=Géminis&choir=Querubines
```

### `GET /api/angels/:number`
Ángel por número (1-72).
```
GET /api/angels/14
```

### `GET /api/angels/profile`
**Endpoint principal.** Devuelve los tres ángeles tutelares.
```
GET /api/angels/profile?day=30&month=5&year=1985&hours=17&minutes=15
```
```json
{
  "birth": { "day": 30, "month": 5, "year": 1985, "hours": 17, "minutes": 15 },
  "profile": {
    "physical":  { "plane": "Físico",    "angel_number": 14, "angel": { "name": "Mebahel"  } },
    "emotional": { "plane": "Emocional", "angel_number": 69, "angel": { "name": "Rochel"   } },
    "mental":    { "plane": "Mental",    "angel_number": 52, "angel": { "name": "Imamiah"  } }
  }
}
```

---

## ⚡ Quick Start — Correr localmente

### Requisitos
- Node.js 20+
- AWS CLI (para deploy)
- SAM CLI (para deploy)

### Instalación
```bash
git clone https://github.com/EmmaLedesma/calculadora-72-nombres.git
cd calculadora-72-nombres
npm install
npm start
# → http://localhost:3000
```

### Deploy en AWS
```bash
# Build y deploy de la API (Lambda + API Gateway)
sam build
sam deploy

# Deploy del frontend (S3)
aws s3 sync public/ s3://shem72-app --delete
```

---

## ✅ Validación

- ✅ API desplegada y respondiendo en AWS Lambda
- ✅ Frontend accesible públicamente desde S3
- ✅ Ángel físico validado con tabla de Madirolas (ej: 30/5 → Ángel 14 Mebahel ✓)
- ✅ Ángel emocional con fechas secundarias exactas (ej: 30/5 → Ángel 69 Rochel ✓)
- ✅ Ángel mental por hora (ej: 17:15 → Ángel 52 Imamiah, segmento 17:00-17:20 ✓)

---

## 💼 Este Proyecto Demuestra

### 🔹 Cloud & Serverless
- Arquitectura serverless real en AWS (Lambda + API Gateway + S3)
- Infraestructura como Código con AWS SAM / CloudFormation
- Deploy reproducible con un solo comando

### 🔹 Backend & API Design
- API REST con Node.js + Express
- Separación clara de responsabilidades (routes / utils / data)
- Lógica de dominio compleja encapsulada en módulos puros

### 🔹 Algoritmo & Precisión
- Implementación fiel a una fuente académica (Madirolas)
- Tres métodos de cálculo independientes y verificables
- Casos de prueba validados contra la tabla original

### 🔹 Frontend
- Diseño con identidad visual propia (paleta teal/turquesa/plata)
- Grid RTL para contenido hebreo
- Interfaz responsive sin frameworks

### 🔹 Mentalidad de Ingeniería
- Infraestructura versionada en Git
- Separación entre entorno local y producción
- `.gitignore` con exclusión de credenciales y artefactos de build

---

## 🔮 Mejoras Futuras

- 🧪 Tests unitarios para el algoritmo (Jest)
- 🔄 CI/CD con GitHub Actions
- 🌍 Internacionalización (español / inglés / hebreo)
- 🔭 Ángel emocional con efemérides astronómicas reales (v2)
- 📄 Exportar perfil completo a PDF
- 🧠 Interpretaciones personalizadas con IA generativa
- 📋 DISCLAIMER.md y REFERENCES.md con citado de fuentes

---

## 📝 Licencia

Proyecto educativo orientado al aprendizaje y al desarrollo de un **portfolio profesional**.  
Uso libre.

_Code made by Emma Ledesma_  
🔗 https://www.linkedin.com/in/emmanuel-ledesmam/

---
# ===========================
# English Version
# ===========================

## Shem HaMephorash – 72 Names Calculator
**Serverless REST API + Static Frontend on AWS**

GitHub: https://github.com/EmmaLedesma/calculadora-72-nombres

🌐 **Live demo:** http://shem72-app.s3-website-us-east-1.amazonaws.com  
🔗 **Production API:** https://h07cdlmeqc.execute-api.us-east-1.amazonaws.com/prod

---

## 📌 Problem Statement

Calculating guardian angels from the Shem HaMephorash system (72 Names of God) is complex:

- Requires astronomical knowledge (solar degrees, quinaries)
- Secondary date tables are hard to consult without a complete reference
- No accessible, technically rigorous web tool exists
- Most online calculators use simplified or inaccurate formulas

This project solves those challenges by building a **serverless REST API on AWS** with an algorithm faithful to Eduardo Madirolas' table, plus an accessible frontend that allows anyone to calculate their three guardian angels by entering their birth date, year, and time.

---

## 🏗️ Architecture

```
User
  │
  ├── 🌐 Frontend (HTML/CSS/JS)
  │       └── AWS S3 Static Website
  │
  └── 🔗 REST API
          └── AWS API Gateway
                  └── AWS Lambda (Node.js 20)
                          ├── routes/angels.js
                          ├── utils/calculator.js
                          └── data/shem72.json
```

### Core Components

#### ☁️ AWS Lambda
- Serverless function running Node.js 20
- Express app wrapped with `serverless-http`
- 256 MB memory, 10 second timeout
- Automated deploy with AWS SAM (CloudFormation)

#### 🔗 AWS API Gateway
- REST API with `prod` stage
- CORS enabled for frontend consumption
- 4 publicly exposed endpoints

#### 🪣 AWS S3
- Bucket configured as static website
- Hosts the frontend (HTML/CSS/JS)
- Public read access via bucket policy

#### 🧱 Infrastructure as Code
- `template.yaml` defines all infrastructure (SAM/CloudFormation)
- Fully reproducible with a single command: `sam deploy`

---

## 🔢 Calculation Logic

Three guardian angels are calculated using independent methods:

| Angel | Plane | Method |
|-------|-------|--------|
| **Physical** | Body · Vitality · Action | Solar quinary by date — degree 0°-360°, each angel rules 5° from Aries 0° = March 21 |
| **Emotional** | Emotions · Bonds · Desire | Exact secondary dates from Madirolas table |
| **Mental** | Thought · Consciousness · Intellect | Birth time — 72 segments of 20 minutes |

Source: **Eduardo Madirolas — Los 72 Nombres**

---

## 🚀 Quick Start — Run Locally

### Prerequisites
- Node.js 20+
- AWS CLI (for deploy)
- SAM CLI (for deploy)

### Setup
```bash
git clone https://github.com/EmmaLedesma/calculadora-72-nombres.git
cd calculadora-72-nombres
npm install
npm start
# → http://localhost:3000
```

### Deploy to AWS
```bash
# Build and deploy API (Lambda + API Gateway)
sam build
sam deploy

# Deploy frontend (S3)
aws s3 sync public/ s3://shem72-app --delete
```

---

## ✅ Validation Results

- ✅ API deployed and responding on AWS Lambda
- ✅ Frontend publicly accessible from S3
- ✅ Physical angel validated against Madirolas table (e.g. 30/5 → Angel 14 Mebahel ✓)
- ✅ Emotional angel with exact secondary dates (e.g. 30/5 → Angel 69 Rochel ✓)
- ✅ Mental angel by birth time (e.g. 17:15 → Angel 52 Imamiah, segment 17:00-17:20 ✓)

---

## 💼 This Project Clearly Demonstrates

### 🔹 Cloud & Serverless
- Real serverless architecture on AWS (Lambda + API Gateway + S3)
- Infrastructure as Code with AWS SAM / CloudFormation
- Reproducible deployment with a single command

### 🔹 Backend & API Design
- REST API with Node.js + Express
- Clear separation of concerns (routes / utils / data)
- Complex domain logic encapsulated in pure modules

### 🔹 Algorithm & Precision
- Implementation faithful to an academic source (Madirolas)
- Three independent and verifiable calculation methods
- Test cases validated against the original table

### 🔹 Frontend
- Custom visual identity (teal/turquoise/silver palette)
- RTL grid layout for Hebrew content
- Responsive interface without frameworks

### 🔹 Engineering Mindset
- Infrastructure versioned in Git
- Separation between local and production environments
- `.gitignore` with credentials and build artifacts excluded

---

## 🔮 Future Improvements

- 🧪 Unit tests for the algorithm (Jest)
- 🔄 CI/CD with GitHub Actions
- 🌍 Internationalization (Spanish / English / Hebrew)
- 🔭 Emotional angel with real astronomical ephemeris (v2)
- 📄 Export full profile to PDF
- 🧠 Personalized interpretations with generative AI
- 📋 DISCLAIMER.md and REFERENCES.md with source citations

---

## 📝 License

Educational project designed for learning and professional portfolio building.  
Free to use and modify.

_Code made by Emma Ledesma_  
🔗 https://www.linkedin.com/in/emmanuel-ledesmam/