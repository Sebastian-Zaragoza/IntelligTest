# Guia completa (simple y detallada): despliegue de IntelligTest en GKE

Este documento explica, de forma clara y paso a paso, **que se hizo en Kubernetes y por que**, para que IntelligTest quedara funcionando en Google Cloud.

---

## 1) Objetivo general

Querias pasar de un entorno local (Docker Desktop + Ingress NGINX) a un entorno cloud real (GKE + Ingress GCE), y que:

- el frontend (`user-interface`) cargara desde una IP publica,
- las rutas `/api/*` funcionaran contra tus microservicios,
- no existieran parches temporales en YAML,
- y todas las imagenes estuvieran en Artifact Registry con version actualizada.

---

## 2) Problemas iniciales (resumen real)

Al inicio habia varios sintomas:

- El frontend no era accesible externamente aunque los pods internos si funcionaban.
- Habia Ingress con clase `nginx` pero sin controlador activo en cluster cloud.
- Algunas rutas API devolvian `404` o `405`.
- El frontend construia URLs con `undefined` (ejemplo: `/auth/undefined/api/auth/...`).
- En GKE aparecian bloqueos por cuota y scheduling.
- Luego aparecio `502 Bad Gateway` en `/api/auth/forget-password`.

---

## 3) Que se hizo por carpetas `k8s` (lo mas importante)

## 3.1 Carpeta raiz `k8s/`

### Archivo: `k8s/gke-ingress.yaml`

**Que problema resolvia**
- Necesitabamos un Ingress para Google Cloud, no para entorno local.

**Que cambio clave se aplico**
- Se uso anotacion:
  - `kubernetes.io/ingress.class: "gce"`
- Se definieron rutas:
  - `/` -> `user-interface-service:80`
  - `/api` -> `api-gateway-service` (puerto alineado con service)

**Por que era importante**
- En GKE, el Ingress GCE crea y administra el load balancer publico.
- Sin esa clase, podias tener Ingress creado en K8s pero sin IP util o sin routing correcto.

**Aprendizaje clave**
- En cloud, no mezclar Ingress local viejo (`nginx`) con Ingress GCE.
- Tener **un solo Ingress activo** evita conflictos.

---

## 3.2 `api-gateway/k8s/`

### Archivo: `api-gateway/k8s/service.yaml`

**Que problema resolvia**
- El Ingress necesitaba un backend claro y compatible.

**Que cambio clave se aplico**
- Tipo de servicio ajustado para GKE Ingress:
  - `type: NodePort`
- Puerto expuesto para enrutar via Ingress:
  - `port: 80`
  - `targetPort: 3000`

**Por que era importante**
- El balanceador de GCE enruta contra servicios K8s y espera configuracion consistente de puertos/tipo.

### Archivo: `api-gateway/k8s/deployment.yaml`

**Que problema resolvia**
- Alineacion con imagen versionada en Artifact y limites de recursos de cluster.

**Que cambio clave se aplico**
- Imagen apuntando a Artifact Registry.
- Estrategia y recursos para evitar atascos de rollout por cuota.

---

## 3.3 `user-interface/k8s/`

### Archivo: `user-interface/k8s/service.yaml`

**Que problema resolvia**
- Exponer frontend de forma compatible con Ingress GCE.

**Que cambio clave se aplico**
- `type: NodePort`
- `port: 80`, `targetPort: 80`

**Por que era importante**
- Era el backend de la ruta `/` del Ingress.

---

## 3.4 `auth-service/k8s/`

### Archivo: `auth-service/k8s/secret.yaml`

**Que problema resolvia**
- Migracion de envio de correo a Resend.

**Que cambio clave se aplico**
- Se agrego `RESEND_API_KEY` en secretos.

### Archivo: `auth-service/k8s/deployment.yaml`

**Que problema resolvia**
- Inyectar secreto en el contenedor y estabilizar despliegue en GKE.

**Que cambio clave se aplico**
- Variable de entorno `RESEND_API_KEY` desde secret.
- Ajustes de recursos/replicas para evitar Pending y fallos por cuota.

---

## 3.5 Resto de microservicios (`section`, `notes`, `test`, `extracttext`, `generatetest`, `evaluatetest`)

En cada carpeta `*/k8s/deployment.yaml` se aplico la misma idea de estabilidad:

- `replicas: 1`
- recursos mas bajos para arrancar en cluster con cuota limitada
- en servicios conflictivos, estrategia de despliegue mas segura (`Recreate`) para no pedir recursos dobles durante rollout

**Por que era importante**
- Con recursos altos o replicas >1, GKE Autopilot puede dejar pods en `Pending`.

---

## 4) Cambios de codigo que impactaron red/routing (fuera de YAML)

Aunque me pediste enfoque en `k8s`, estos 2 puntos fueron decisivos:

### 4.1 `user-interface/src/api/AuthApi.ts`
- Se eliminaron URLs armadas con `VITE_AUTH_URL` cuando venia `undefined`.
- Se dejaron rutas relativas (`/api/auth/...`) para que siempre pasen por el mismo origen (Ingress).

### 4.2 `api-gateway/src/routes/proxy.routes.ts`
- Se agrego proxy para `/api/auth/*` hacia `auth-service`.
- Se conservaron rutas protegidas (`/api/auth/user`, `/api/auth/check-password`) con middleware de auth.

Resultado: el frontend dejo de pegarle mal a `/auth/undefined/...` y las rutas auth llegaron al backend correcto.

---

## 5) Secuencia cronologica (de inicio a fin)

1. Se detecto que el problema no era comunicacion pod-a-pod, sino exposicion/routing externo.
2. Se revisaron Ingress y se encontro mezcla de configuracion local (`nginx`) con cloud.
3. Se instalo/validaron componentes necesarios y se adapto Ingress a clase `gce`.
4. Se corrigieron servicios frontend/gateway para integracion con Ingress.
5. Se eliminaron referencias temporales de `imagePullSecrets` al resolver IAM de Artifact.
6. Se corrigio URL-building en frontend (`undefined`) para rutas auth.
7. Se migro envio de emails de `nodemailer` a `resend` y se paso `RESEND_API_KEY` a secretos.
8. Se ajustaron recursos/replicas de los 9 servicios para superar restricciones de cuota.
9. Se limpiaron Ingress duplicados para evitar comportamientos no deterministas.
10. Se subieron imagenes al Artifact Registry con tags actualizados (`v2`).
11. Se actualizo cluster para consumir imagenes Artifact `v2`.
12. Se validaron endpoints reales (frontend y API) hasta eliminar el `502`.

---

## 6) Comandos mas importantes (solo los clave)

## 6.1 Ver estado general

```bash
kubectl get pods -n intelligtest-namespace
kubectl get svc -n intelligtest-namespace
kubectl get ingress -n intelligtest-namespace -o wide
kubectl describe ingress intelligtest-cloud-ingress -n intelligtest-namespace
```

## 6.2 Aplicar manifiestos

```bash
kubectl apply -f k8s/
kubectl apply -f api-gateway/k8s/
kubectl apply -f user-interface/k8s/
kubectl apply -f auth-service/k8s/
```

## 6.3 Limpiar Ingress viejos/duplicados

```bash
kubectl delete ingress --all -n intelligtest-namespace
kubectl get ingress -n intelligtest-namespace -o wide
```

## 6.4 Verificar rollout

```bash
kubectl rollout status deployment/api-gateway-deployment -n intelligtest-namespace
kubectl rollout status deployment/user-interface-deployment -n intelligtest-namespace
kubectl rollout status deployment/auth-service-deployment -n intelligtest-namespace
```

## 6.5 Construir y subir imagenes a Artifact Registry

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
docker build -t us-central1-docker.pkg.dev/<PROJECT_ID>/intelligtest-repo/<service>:v2 <path-del-servicio>
docker push us-central1-docker.pkg.dev/<PROJECT_ID>/intelligtest-repo/<service>:v2
```

## 6.6 Actualizar deployment con imagen nueva

```bash
kubectl set image deployment/<deployment-name> <container-name>=us-central1-docker.pkg.dev/<PROJECT_ID>/intelligtest-repo/<service>:v2 -n intelligtest-namespace
```

## 6.7 Pruebas simples por HTTP

```bash
curl -i http://<INGRESS_IP>/
curl -i http://<INGRESS_IP>/api/sections
curl -i http://<INGRESS_IP>/api/auth/user
```

---

## 7) Estado final esperado (checklist de estudio)

Si todo esta bien, debes ver:

- Un solo Ingress activo para cloud.
- Frontend cargando en la IP publica del Ingress.
- `/api/*` llegando a `api-gateway`.
- Auth publico (`/api/auth/...`) respondiendo sin 502.
- Endpoints protegidos devolviendo `401` sin token (esto es correcto).
- Los 9 deployments en `1/1` y `Running`.
- Imagenes en Artifact Registry con tag `v2` (o el tag final definido por ti).

---

## 8) Errores frecuentes y como reconocerlos rapido

- **`ADDRESS` vacio en Ingress**: controlador o traduccion aun no lista.
- **`404` desde frontend para rutas API**: path de Ingress mal ordenado o backend incorrecto.
- **`405` en auth con `/undefined/`**: frontend armado de URL incorrecto.
- **`502 Bad Gateway`**: backend no saludable/no alcanzable por LB o conflicto de Ingress.
- **Pods `Pending`**: recursos/replicas por encima de cuota real.

---

## 9) Conclusiones practicas

La estabilidad vino de combinar 4 cosas:

1. **Routing limpio** (un solo Ingress GCE).
2. **Servicios consistentes** (`NodePort` + puertos correctos).
3. **Frontend con rutas relativas** (sin `undefined`).
4. **Imagenes y despliegues alineados** (Artifact `v2` + rollout verificado).

Si mantienes esos 4 pilares, el sistema se mantiene predecible y facil de operar.

