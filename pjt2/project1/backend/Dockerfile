FROM python:3.9

WORKDIR /SubPjt2/backend/

RUN pip install --upgrade pip
RUN pip install numpy
RUN pip install matplotlib
RUN pip install tensorflow
RUN pip install CMake
RUN pip install dlib
RUN pip install torch
RUN pip install torchvision

FROM node:18.14

WORKDIR /SubPjt2/backend/

COPY --from=0 . .

COPY . .

RUN npm install

ENV PYTHONPATH "${PYTHONPATH}:/SubPjt2/backend/usr/local/lib/python3.9/site-packages/"

EXPOSE 3001

CMD ["npm", "start"]