# Readme

A boilerplate that I made to reference in future personal projects

## Goodies

- Create React App
- Express server
- Mongoose
- MongoDB + Atlas
- Prettier
- Eslint
- Pre-commit hooks
- Jest
- Heroku

## Getting Started

```bash
# Install dependencies
yarn install

# Start servers
yarn dev
```

## Heroku

- [ ] Set `MONGODB_URL` environment variable

## MongoDB with Atlas

- Register for an account here <https://www.mongodb.com/cloud/atlas>
- Create a project + cluster
  - Cloud Provider & Region: AWS
  - Region: N. Virginia
- Wait for cluster to finish being created
- Press "Connect" from the main dashboard
- Press "Add a Different Address" button to whitelist your connection for Heroku
- Set IP Address to 0.0.0.0/0
- Create a database user (username + password)
- Set the connection string as `MONGODB_URL` in Heroku
