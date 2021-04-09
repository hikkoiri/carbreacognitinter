FROM node as builder
COPY . .
RUN npm install --force && \
    npm audit fix --force && \
    npm run build



FROM nginx:alpine
COPY --from=builder build/* /usr/share/nginx/html/
RUN  adduser -u 1000 -D -S -G www-data www-data