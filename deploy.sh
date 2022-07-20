# !/bin/bash
pm2 delete all
pm2 start "serve -s frontend/build -l 3000"
cd backend
pm2 start "uvicorn main:app --host 0.0.0.0 --port 3001"
cd ..