# 1) Build con Node
FROM node:18-alpine AS builder
WORKDIR /app

# Copia sólo lo necesario para instalar y compilar
COPY package*.json ./
RUN npm install

# Ahora copia el resto del código y genera la carpeta dist
COPY . .
RUN npm run build

# 2) Servir con nginx
FROM nginx:stable-alpine
# Copia la build estática
COPY --from=builder /app/dist /usr/share/nginx/html
# Copia tu configuración de proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
