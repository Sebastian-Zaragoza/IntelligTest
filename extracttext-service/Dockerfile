FROM python:3.12
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
ENV GOOGLE_APPLICATION_CREDENTIALS=keys/textract-462000-1e048c6fec6c.json
EXPOSE 5000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
