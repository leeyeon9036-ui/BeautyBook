# 성북구 대학생 미용실 예약 시스템

## 프로젝트 개요
성북구 대학생을 위한 미용실 예약 대행 서비스 랜딩페이지입니다.

## 주요 기능
- **예약 신청 폼**: 예약 정보와 요구사항을 한 번에 제출
- **관리자 페이지**: 제출된 예약 데이터 관리 (로그인: admin / 1234)
- **PostgreSQL 데이터베이스**: Neon을 통한 영구 데이터 저장

## 기술 스택
- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI
- Backend: Express.js, Node.js
- Database: PostgreSQL (Neon)
- ORM: Drizzle

## 개발 환경 실행
```bash
npm run dev
```

## Render.com 배포 가이드

### 1. 환경 변수 설정
Render 대시보드에서 다음 환경 변수를 설정하세요:

- `DATABASE_URL`: Neon PostgreSQL 연결 문자열
- `NODE_ENV`: production

### 2. 빌드 설정
- **Build Command**: `npm install && npm run build && npx tsx server/seed.ts`
- **Start Command**: `npm start`

### 3. 데이터베이스 초기화
첫 배포 시 자동으로 관리자 계정(admin/1234)이 생성됩니다.
재배포 시에도 seed 스크립트가 비밀번호를 일관되게 유지합니다.

### 4. 배포 확인 사항
- ✅ 상대경로 API 사용 (`/api/...`)
- ✅ `process.env.PORT` 사용
- ✅ PostgreSQL 영구 저장
- ✅ 관리자 로그인 작동

## API 엔드포인트
- `POST /api/bookings` - 예약 신청
- `GET /api/bookings` - 예약 목록 조회
- `POST /api/admin/login` - 관리자 로그인

## 페이지
- `/` - 랜딩페이지 및 예약 폼
- `/admin` - 관리자 페이지

## 데이터베이스 스키마 업데이트
```bash
npm run db:push
```
