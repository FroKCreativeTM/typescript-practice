# Scratch NestJS Project

이 폴더는 NestJS 프레임워크를 사용한 실습용(Scratch) 프로젝트입니다. NestJS는 효율적이고 확장 가능한 Node.js 서버 애플리케이션을 구축하기 위한 점진적 프레임워크입니다.

## 폴더 구조

```
scratch/
├── package.json
├── tsconfig.json
└── src/
    ├── app.controller.ts
    ├── app.module.ts
    └── main.ts
```

- **package.json**: 프로젝트의 의존성 및 스크립트 정의
- **tsconfig.json**: TypeScript 컴파일러 설정
- **src/**: 소스 코드 디렉터리
  - **main.ts**: 애플리케이션의 진입점(bootstrap)
  - **app.module.ts**: 루트 모듈 정의
  - **app.controller.ts**: 기본 라우트 컨트롤러

## 실행 방법

1. 의존성 설치

   ```sh
   npm install
   ```

2. 애플리케이션 실행

   ```sh
   npx ts-node src/main.ts
   ```

   또는 Nest CLI가 설치되어 있다면:

   ```sh
   nest start
   ```

3. 서버는 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 주요 기능

- `/` 경로로 GET 요청 시 "Hello, World!" 문자열을 반환합니다.
- NestJS의 모듈, 컨트롤러, 데코레이터 등 기본 구조를 학습할 수 있습니다.

## 참고

-