# Oyuns — Санал хүсэлтийн систем

React + TypeScript frontend, Spring Boot backend. Frontend нь санал хүсэлт болон хавсралтыг backend-д илгээнэ.

## Төслийн бүтэц

```text
daalgavar/
├── backend/
│   ├── src/main/
│   │   ├── java/com/feedback/
│   │   │   ├── config/        # Security, файлын хадгалалт, rate limit тохиргоо
│   │   │   ├── controller/    # HTTP хүсэлт хүлээн авах
│   │   │   ├── dto/           # API хүсэлт, хариуны бүтэц
│   │   │   ├── entity/        # Өгөгдлийн сангийн загвар
│   │   │   ├── exception/     # Алдааны хариу
│   │   │   ├── repository/    # Өгөгдлийн сантай ажиллах
│   │   │   ├── security/      # Хүсэлтийн давтамжийн хязгаар
│   │   │   ├── service/       # Санал хүсэлт, файл, spam шалгалт
│   │   │   └── FeedbackApplication.java
│   │   └── resources/application.yml
│   ├── .mvn/                 # Maven wrapper тохиргоо
│   ├── mvnw / mvnw.cmd        # Maven суулгаагүй үед ашиглах wrapper
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/       # Маягт, талбар, файл сонголт, товч
│   │   ├── pages/            # Хуудасны зохион байгуулалт
│   │   ├── services/         # Backend API хүсэлт
│   │   ├── schemas/          # Мэдээлэл болон файлын шалгалт
│   │   ├── hooks/            # Илгээлтийн төлөв удирдах
│   │   ├── types/            # TypeScript төрлүүд
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── .env.example          # Орчны тохиргооны жишээ
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── nginx.conf.template   # Docker дахь API proxy
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json     # Хамаарлын хувилбарыг тогтмол байлгах
│   ├── tsconfig.json
│   └── vite.config.ts        # Локал API proxy
├── .gitattributes
├── .gitignore
└── README.md
```

`*.test.ts` файлууд шалгаж буй кодынхоо хажууд байрлана.
`node_modules`, `dist`, `target` нь суулгалт/build хийхэд автоматаар үүснэ.
`.idea` нь редакторын хувийн тохиргоо. Эдгээрийг Git-д оруулахгүй.
`data`, `uploads` нь backend ажиллах үед үүсэх өгөгдөл; цэвэрлэгээ хийхдээ устгаж болохгүй.

## Ажиллуулах

Шаардлага: Java 17+, Maven, Node.js 22+, npm.

Эхний терминал — backend:
```powershell
cd J:\daalgavar\backend
mvn spring-boot:run
```

Хоёр дахь терминал — frontend:
```powershell
cd J:\daalgavar\frontend
npm ci
npm run dev
```

http://localhost:5173 нээнэ. Frontend-ийн `/api` хүсэлт http://localhost:8080 руу дамжина.
Maven суулгаагүй бол backend хавтаснаас `mvn`-ийн оронд Windows дээр `.\mvnw.cmd`,
macOS/Linux дээр `./mvnw` ашиглаж болно.

Өөр backend хаяг ашиглахдаа frontend-ийн `.env.example`-ийг `.env` болгон хуулж
`BACKEND_URL`-ийг өөрчилнө. `VITE_API_BASE_URL=/api` хэвээр байвал proxy ашиглана.
Өөр origin руу шууд хүсэлт явуулбал backend дээр CORS тохируулна.

## Шалгах

```powershell
cd J:\daalgavar\frontend
npm test
npm run build

cd J:\daalgavar\backend
mvn clean package
```

## Мэдээллийн урсгал

`FeedbackPage → FeedbackForm → useFeedback → feedbackApi → /api/feedback`

Backend: `FeedbackController → FeedbackService → FeedbackRepository / FileStorageService`.

- `POST /api/feedback`: multipart/form-data.
- `feedback` хэсэг application/json: name (120), email (254), message (10,000), website (spam шалгах далд талбар).
- `file` хэсэг заавал биш: нэг JPG, PNG, PDF эсвэл TXT, 5 MiB хүртэл.
- Амжилт: `{ id, status, createdAt }`; алдаа: `{ error }`.
- Алдаа гарвал маягтын утгууд хадгалагдана. Илгээж байх үед давхар илгээх боломжгүй.

## Docker

Backend Dockerfile нь build хийсэн JAR ашиглана.

```powershell
cd J:\daalgavar
mvn -f backend/pom.xml package
docker network create feedback-net
docker build -t feedback-backend ./backend
docker run -d --name backend --network feedback-net -v feedback-data:/app/data -v feedback-uploads:/app/uploads feedback-backend
docker build -t feedback-frontend ./frontend
docker run -d --name feedback-frontend --network feedback-net -p 5173:80 feedback-frontend
```

http://localhost:5173 нээнэ. Backend контейнер эхэлсний дараа frontend-ийг асаана.
Frontend контейнерийн `BACKEND_URL` анхдагч утга `http://backend:8080`.
Production орчинд proxy-ийн ард хэрэглэгчийн IP-г зөв ялгах rate limit тохиргоог backend талд хийнэ.

