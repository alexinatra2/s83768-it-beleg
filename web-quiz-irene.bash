#!/bin/bash

function get() {
    curl --user test@gmail.com:secret -X GET \
      "https://irene.informatik.htw-dresden.de:8888/api/quizzes/$1" | python -m json.tool
}

function solve() {
  curl --user test@gmail.com:secret -X POST -H 'Content-Type: application/json' \
    "https://irene.informatik.htw-dresden.de:8888/api/quizzes/$1/solve"
    --data $(echo "[$2]") | python -m json.tool
}

function completed() {
  curl --user test@gmail.com:secret -X GET \
    "https://irene.informatik.htw-dresden.de:8888/api/quizzes/completed" | python -m json.tool
}
