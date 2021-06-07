FROM registry.prod.bbdops.com/common/nginx:1.18.0
ADD build /usr/share/nginx/html
ADD nginx.conf /etc/nginx
#RUN sed -i "s@.testing.@.dev.@g" /usr/share/nginx/html/config.js
