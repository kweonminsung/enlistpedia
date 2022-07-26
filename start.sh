# !/bin/bash

if ! [ -d "logs" ]; then
    mkdir logs
fi

cd backend
if ! [ -d "venv" ]; then
    python -m venv venv
    . venv/Scripts/activate
    pip install -r requirements.txt
else
    . venv/Scripts/activate
fi

nohup uvicorn main:app --reload --port 8000 > ../logs/backend_log_$(date +%s).txt 2>&1 &
cd ../frontend

if ! [ -d "node_modules" ]; then
    npm install
fi

npm start