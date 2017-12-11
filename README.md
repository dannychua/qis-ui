### React + MySQL + Table population

1. https://stackoverflow.com/questions/40347411/how-to-display-json-data-with-reactjs-in-the-table
2. https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032



### Original boilerplate setup

    create-react-app qis-ui && qis-ui
    npm install --save bootstrap@4.0.0-beta reactstrap@next
    npm install --save moment react-moment moment-timezone



### Deploy

    git clone https://github.com/dannychua/qis-ui && cd qis-ui

Edit `config/server.js` with correct password

    npm install
    npm run build
    serve -s build -p 3000

For updating:

    git pull
    npm run build
    serve -s build -p 3000
