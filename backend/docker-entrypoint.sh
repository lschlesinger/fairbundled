#!/bin/sh

set -e

USER=${MONGO_INITDB_ROOT_USERNAME:-mongouseradmin}
PASSWORD=${MONGO_INITDB_ROOT_PASSWORD:-mongopassadmin}
DATABASE=${MONGO_INITDB_DATABASE:-fairbundled}

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db.createUser({
      user: '$USER',
      pwd:  '$PASSWORD',
      roles: [
          {
            role: 'readWrite',
            db: '$DATABASE'
          }
      ]
    });
    db.auth('$USER', '$PASSWORD');
EOF

echo "Entrypoint added user '$USER' with password on database '$DATABASE'"
