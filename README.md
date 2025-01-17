# README

## NOTE
The project is currently set up for deployment via Render, and the live link for the website is [here](https://quill-hn0c.onrender.com/). The following steps will help you set up the project for **development**.

## SETTING UP THE SERVER

### 1. Setting up your MongoDB database
- Create a [MongoDB Atlas](https://www.mongodb.com/lp/cloud/atlas/try4-reg?utm_source=bing&utm_campaign=search_bs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-us_ps-all_desktop_eng_lead&utm_term=mongodb%20cloud%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=415204521&adgroup=1207264237113872&msclkid=6b56f5b5e83e1bdbdc00923c3d1d5b67) account and set up your free Data Cluster. Watch this [video](https://youtu.be/VkXvVOb99g0?feature=shared) for a reference guide.
- In your cluster, click **"Connect"**, select **"Drivers"**, and copy the connection string.
- Paste the connection string in your `.env_demo` file, replacing the current value of the `MONGO_URI` environment variable.
  - Be sure to replace the password in the connection string with the appropriate password for your database user.
- Your server will automatically generate the necessary table and collection upon startup.

### 2. Configuring the `.env` file
- Rename the `.env_demo` file to `.env`.
- Replace the value of `PORT` with the port number you wish to run your server on (the client is currently set to send requests to port `5000`).
- Replace the value of `JWT_SECRET` with any string of your choosing. This will be used to generate authentication tokens.

### 3. Starting the server
- Open a terminal window and navigate to the `server` directory:
```bash
cd server
```
- Install the necessary dependencies. This will generate a `node_modules` folder inside of `server`:
```bash
npm install
```
- Start the server in development mode (with auto-refresh using `nodemon`):
```bash
npm run dev
```
- Alternatively, to start the server without `nodemon`, run:
```bash
npm start
```
- If everything is configured correctly, you should see the following messages in your terminal:
```bash
MongoDB connection successful.
Server is listening on port PORT...
```

## SETTING UP THE CLIENT

### 1. Installing the necessary packages
- Open up a new terminal window. DO NOT CLOSE THE TERMINAL that is running your server, as this will shut down your server and you will have to restart it. If you are still in the `server` directory, navigate back to the parent directory:
```bash
cd ..
```
- Then, navigate to the `client` directory:
```bash
cd client
```
- Install all the necessary dependencies. This will generate a `node_modules` folder inside of `client`:
```bash
npm install
```

### 2. Configuring the port number
- Open the `App.jsx` file inside of the `src` folder.
- At the top of the file, you should see a variable called `apiBase`. This variable sepcifies the URL that your client will use to send network requests (i.e., the server you just configured).
  - The default value is:
    ```javascript
    const apiBase = 'https://quill-api-vvzr.onrender.com/'
    ```
  - Yours should look something like:
    ```javascript
    const apiBase = 'https://localhost:5000/';
  - Update the port number (`5000`) to match the `PORT` value in your server's `.env` file. If you did not change `PORT`, you can leave this line as is.

 ### 3. Starting the client
 - Ensure that you are in the `client` directory and start the development script:
```bash
npm run dev
```

Once your server and client are running on their respective ports, you are all set!
