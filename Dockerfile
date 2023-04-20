# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
#FROM node:14-alpine3.10 as build

# Set the working directory
#WORKDIR /usr/local/main

# Add the source code to main
#COPY ./ /usr/local/main/

# Install all the dependencies
#RUN npm install

# Generate the build of the application
#RUN npm run build


# Stage 2: Serve main with nginx server

# Use official nginx image as the base image
FROM node:14-alpine
ENV TZ="Asia/Ho_Chi_Minh"

# RUN apk add --update fontconfig ttf-dejavu ttf-droid ttf-freefont ttf-liberation && rm -rf /var/cache/apk/*
RUN apk --no-cache add msttcorefonts-installer fontconfig && \
    update-ms-fonts && \
    fc-cache -f
# magic command

# RUN apk add ttf-ubuntu-font-family fontconfig && rm -rf /var/cache/apk/*

USER root
# Copy the build output to replace the default nginx contents.
COPY . ./
# COPY ./des.txt /resources/import/des.txt

#RUN npm install

EXPOSE 8783

CMD [ "npm", "start" ]
#CMD [ "npm", "run", "prod" ]
# Expose port 80
#EXPOSE 80
