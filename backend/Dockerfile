FROM python:3.10

WORKDIR /backend

COPY ./ ./

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]