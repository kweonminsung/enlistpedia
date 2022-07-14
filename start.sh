mkdir logs
. backend/venv/Scripts/activate
cd backend
nohup uvicorn main:app --reload --port 3001 > ../logs/backend_log_$(date +%s).txt &
cd ../frontend
npm start
