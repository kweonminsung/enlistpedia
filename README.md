<p align="center">
    <img src="https://user-images.githubusercontent.com/48237469/216926150-b56c78b6-c9a6-4ed6-bf26-fc0b9ac84088.png" alt="pick-git-logo" width="600" height="200">
</p>

<div align="center">

  <h3><strong> 📚 군입대를 앞둔 청춘들을 위한 맞춤 특기 솔루션 </strong></h3>
  <strong>2022 국방공공데이터 활용 창업경진대회 서비스 개발 부문 출품작</strong>
</div>

<div align="center">

  🔗 [입대백과](http://enlistpedia.org/)

</div>

## 📢 서비스 소개

**짧지 않은 국방의 의무**를 자신의 적성과 특기를 살려할 수 있도록 도와주는 서비스!

## 🏆 결과

<br/>
<p align="center">
    <img src="https://user-images.githubusercontent.com/48237469/216925052-37491cae-079d-460b-9042-8a6c6c255f94.jpg" alt="pick-git-logo" width="400" height="600">
</p>

<br/>

## 🤼‍♂️ 팀원


|사진|성명|담당|깃허브|이메일|
|:-:|:-:|:---:|:-:|:-:|
|<img src="https://github.com/R3gardless.png" width="80" height="80">|송영욱|데이터 전처리<br/>백엔드 개발|<a href="https://github.com/R3gardless"><img src="http://img.shields.io/badge/R3gardless-655ced?style=social&logo=github"/></a>|<a href="mailto:pidaoh@g.skku.edu"><img src="https://img.shields.io/static/v1?label=&message=pidaoh@g.skku.edu&color=orange&style=flat-square&logo=gmail"></a>|
|<img src="https://github.com/kweonminsung.png" width="80" height="80">|권민성|서버 및 배포<br/>프론트엔드 개발|<a href="https://github.com/kweonminsung"><img src="http://img.shields.io/badge/kweonminsung-655ced?style=social&logo=github"/></a>|<a href="mailto:kevin136583@gmail.com"><img src="https://img.shields.io/static/v1?label=&message=kevin136583@gmail.com&color=orange&style=flat-square&logo=gmail"></a>|

<br/>

## 💬 특징 및 기능

### 📌 쉬운 접근성
|1단계|2단계|3단계|
|:-:|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/48237469/216935393-2a5d3948-5955-498f-88df-86a70a7c35ff.png">|<img src="https://user-images.githubusercontent.com/48237469/216935634-124ae574-2783-4bcb-a396-e78958d92018.png">|<img src="https://user-images.githubusercontent.com/48237469/216935790-e3da7b2b-1354-4d6d-b837-9ab70869b9af.png">|

- **총 3단계로 쉽게 이용 가능!**

### 📌 높은 직관성
|결과 화면 1|결과 화면 2|
|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/48237469/216936325-92debdca-5e87-484b-b96f-370c2fe5eccd.png">|<img src="https://user-images.githubusercontent.com/48237469/216936437-673e1682-24f9-4498-b05c-04358a826ebf.png">|

- **군 입대 지원 관련 정보들을 보기 좋게 제공!**
  - 현재 모집 여부 · 1차 환산 점수 · 이전 회차 1차 커트라인 점수 · 환산 점수 내역 등등 


### 📌 유저들을 위한 편의 기능 제공
|반응형 디자인|다크 모드 지원|
|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/48237469/216937416-83b35fcf-2220-4b5a-937e-b3f0e880d464.png">|<img src="https://user-images.githubusercontent.com/48237469/216937474-2bfa6034-94b3-417a-9c3d-644b13b29581.png">|

<br/>

## ⚙ 기술스택


### 🖼 Frontend

- TypeScript
- Emotion
- React.js

### 💻 Backend

 - FastAPI
 - MySQL
 - Nginx

### 📡 Infra

 - Docker
 - AWS EC2

<br/>

## 🖥 프로젝트 아키텍쳐

<img src="https://user-images.githubusercontent.com/48237469/216937921-58419993-fc5b-43cc-bf97-fbd29acadb93.png">

<br/>

## 📢 실행 방법!

### 요구 사항

- Node.js 16.13.1 LTS
- Python 3.10.2

### Frontend

```bash
$ cd frontend
$ npm install

$ npm start

$ npm run build && serve -s build -l 3000
```

### Backend

```bash
$ python -m venv venv

$ . venv/Scripts/activate (Windows)
$ source venv/bin/activate (Ubuntu)

$ pip install --upgrade pip
$ pip install -r requirements.txt

$ uvicorn main:app --reload --port 8000 (Dev Server)
$ uvicorn main:app --reload --host 0.0.0.0 --port 8000 (Prod Server)
```
