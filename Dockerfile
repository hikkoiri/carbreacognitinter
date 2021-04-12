FROM node as builder
ARG REACT_APP_COGNITO_REGION
ARG REACT_APP_COGNITO_USER_POOL_ID
ARG REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID
COPY . .
RUN npm install --force && \
    npm audit fix --force && \
    npm run build



FROM nginx:alpine
COPY --from=builder build/ /usr/share/nginx/html/
RUN  adduser -u 1000 -D -S -G www-data www-data