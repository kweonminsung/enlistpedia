# 입대백과

## Prerequistes

- Node.js 16.13.1 LTS
- Python 3.10.2

## 1. Clone

```bash
$ git clone https://github.com/kweonminsung/enlistpedia.git
```

## 2-1. Frontend

### Install Dependencies

```bash
$ cd frontend
$ npm install
```

### Start Development Server

```bash
$ npm start
```

### Start Production Server

```bash
$ npm run build && serve -s build -l 3000
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
$ uvicorn main:app --reload --port 8000
```

### Start Production Server

```bash
$ uvicorn main:app -reload --host 0.0.0.0 --port 8000
```

## Documentation

### Languages & Frameworks

- [`Typescript`](https://www.typescriptlang.org/)
- [`React.js`](https://ko.reactjs.org/)
- [`Emotion`](https://emotion.sh/docs/introduction)
- [`FASTAPI`](https://fastapi.tiangolo.com/ko/)
