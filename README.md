# 입대백과

## Prerequistes

- Node.js 16.13.1 LTS
- Python 3.10.2

## 1. Clone

```bash
$ git clone https://github.com/kweonminsung/enlistpedia.git
```

## 2-1. Frontend

```bash
$ cd frontend
$ npm install
$ npm start
```

## 2-2. Backend

### 가상환경 설정

```bash
$ python -m venv venv

$ . venv/Scripts/activate (Windows)
$ source venv/bin/activate (Ubuntu)

$ pip install --upgrade pip
$ pip install -r requirements.txt
```

### Start Development Server

```bash
$ uvicorn main:app --reload --port 3001
```

### Start Production Server

```bash
$ export APP_ENV=production && uvicorn main:app --reload --port 3001
```

## Documentation

### Languages & Frameworks

- [`Typescript`](https://www.typescriptlang.org/)
- [`React.js`](https://ko.reactjs.org/)
- [`Emotion`](https://emotion.sh/docs/introduction)
- [`FASTAPI`](https://fastapi.tiangolo.com/ko/)
