FROM ubuntu:latest

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm git git-core

# try to remove the repo if it already exists
RUN rm -rf node-hello-bff; true

#comment the following if pulling from local fs instead of github
RUN git clone git://github.com/scetes/node-hello-bff

# install node modules  as defined in package.json
RUN cd node-hello-bff ;npm install

# check the container's fs to verify files were pulled in
RUN ls -l /node-hello-bff

# used in docker run; confusing that it is in the build file 
CMD ["nodejs", "/node-hello-bff/index.js"]
