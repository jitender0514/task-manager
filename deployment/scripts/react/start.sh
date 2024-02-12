#!/bin/bash

# install packages and run server
if [ "$NODE_MODE" != "prod" ]; then
    npm run dev
else
    npm run dev
fi

