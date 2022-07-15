# !/bin/bash

if ! [ -d "logs" ]; then
    mkdir logs
fi

if ! [ -d "backend/venv" ]; then
    cd backend
    python -m venv venv
    pip install -r requirements.txt
    cd ../
fi

. backend/venv/Scripts/activate
cd backend
nohup uvicorn main:app --reload --port 3001 > ../logs/backend_log_$(date +%s).txt &
cd ../frontend

if ! [ -d "node_modules" ]; then
    npm install
fi

npm start