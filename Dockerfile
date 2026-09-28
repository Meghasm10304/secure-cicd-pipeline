# Use official lightweight nginx image
FROM nginx:alpine
RUN apk update && apk upgrade --no-cache

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom website files
COPY index.html style.css main.js /usr/share/nginx/html/

# Expose port 80 for web traffic
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
