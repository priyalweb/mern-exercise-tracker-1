Project from: https://www.youtube.com/watch?v=7CqJlxBYj-M
Heroku deployment from: https://coursework.vschool.io/deploying-mern-with-heroku/

MongoDB is a document based open source db,
Express is a web application framework for node.js,
React is a js frontend library for building user interfaces,
Node.js is a js run-time environment that executes js code outide of a browser (such as a server)

Setup:
	Install node.js
	Create a project folder
	Initialize git in parent folder: 'git init'
	Add to .gitignore folder: /.vs, .env, /client/build, /client/node_modules, /node_modules
	Push repo onto GitHub
	

Setting up the client/frontend:
	cd to project folder and install react dependencies: 'npx create-react-app client'
	cd to client folder and start react: 'npm start'
	Install bootstrap to make styling easier: 'npm install bootstrap'
	Install axios to make http calls to the backend: 'npm install axios'
	Install react-router-dom to make routing to different URLs easier: 'npm install react-router-dom'
	Install datepicker: 'npm install react-datepicker'
	Create components folder in client\src

Setting up the backend:
	cd to root/project folder and create package.json file: 'npm init -y'
	Create models and routes folders
	Create server.js file
    Install required dependencies/packages: 'npm install express cors mongoose dotenv'
		cors is an express.js middleware that allows ajex requests to skip origin resource policies to access resources from remote hosts
		mongoose MongoDB schema-based solution to model application data via node.js
		dotenv loads environment variable from a file (.env)
		install nodemon, which restarts the server whenever changes are made: 'npm (or sudo) install -g nodemon'
    Start nodemon in backend folder: 'nodemon server' or 'nodemon start server.js'.  Turn off VPN to connect to MongoDB

Deploy to Heroku:
	Remove references to localhost (e.g. change axios.delete('http://localhost:5000/exercises/' + id) to axios.delete('/exercises/' + id)
	Create app on Heroku
	Go to Deploy, connect to GitHub, and enable automatic employment, so any pushes to GitHub master branch are pushed to Heroku
	Go to Settings Config Vars and add server key/value
	Add to server's package.json, so Heroku knows what scripts to run when building:     
		"scripts": {
			"start": "node server.js",
			"heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build" 
	Add node version to package.json, so Heroku knows which version to install


Deploy to Heroku via CLI:
	Ensure the port and db are referenced correctly to prod
	cd to client folder and create a build: 'npm run build'
	Install Heroku CLI via website to ensure it's automatically updated
	Login to Heroku: 'heroku login -i'
	Add to package.json scripts: '"heroku-postbuild": "cd client && npm install && npm run build"'.  After building, this installs all packages and creates the build folder
	Run commands:
		cd to root folder locally
		Create folder on Heroku: 'heroku create sk-mern-exercise-tracker'
		Create a free version of mLab on Heroku: 'heroku addons:create mongolab:sandbox' (optional)
		Add a commit for file changes: 'git add -A'
		Add a commit message: 'git commit -m "adding commit message"'
		Push changes to Heroku: 'git push heroku master'
		Open app: 'heroku open'
	Connect GitHub to Heroku:
		Run commands:
			To connect to GitHub repo: 'git remote add origin https://github.com/sterlingku/mern-exercise-tracker.git'
			To push to GitHub repo: 'git push origin master'
		Connect GitHub repo under Deploy menu on Heroku and click on Enable Automatic Deploys


Troubleshooting:
	Run 'heroku logs --tail --app sk-mern-exercise-tracker' to troubleshoot issues and see server activity
	Run 'heroku run bash' to access entire Heroku folder structure
	Add "engines" in package.json and add the node version to ensure Heroku runs the correct version
	Heroku runs whatever is in the Procfile first, else it runs the "scripts: start" in package.json
	Ensure "react" is under the 'dependencies' and not 'devDependencies'
	If building for development purposes, run: 'heroku config:set NPM_CONFIG_PRODUCT=true YARN_PRODUCTION=true' to ensure installing only packages under dependencies and not the devDependencies
	Building and deploying to Heroku might remove some node_modules required to run locally