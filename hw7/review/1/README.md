# Chat Box

## How to start
1. Set the MongoDB url in `backend/.env`
    ```
    cd backend
    cp .env.defaults .env
    # fill in the MONGO url
    ```
2. Install related files by the following command:
    ```
    $ cd frontend
    $ yarn install
    ```
    ```
    $ cd backend
    $ yarn install
    ```
3. The server (port 4000) can be started by the command.
    ```
    $ yarn server
    ```
4. The client (port 3000) can be started by the command.
    ```
    $ yarn start
    ```