#!/bin/bash

# # uncomment to debug
# set -o xtrace

if ! [[ -d .git ]]; then
    echo "Only run the deployment script from the top-level directory"
    exit 1
fi

msg="Did you forget to add the database? 'database/h2-scenarios.sqlite'"

if ! [[ -d database ]]; then
    echo $msg
    exit 1
fi

if ! [[ -f database/h2-scenarios.sqlite ]]; then
    echo $msg
    exit 1
fi

declare WEBROOT=${1:-/var/www/html/}
sudo rsync -aHAX assets database index.html klm script "$WEBROOT"
