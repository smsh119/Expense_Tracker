# -------- Build Stage --------
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_BE_URL
ENV VITE_BE_URL=$VITE_BE_URL

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile \
    && yarn cache clean

COPY . .
RUN npm run build

# -------- Production Stage --------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]