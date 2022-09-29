FROM node:12.16-alpine AS builder    
WORKDIR /app
COPY . /app/
RUN npm install --silent
RUN npm install 
RUN npm run build 
FROM nginx:1.18.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx","-g","daemon off;"]