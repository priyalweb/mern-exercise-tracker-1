Project from: https://www.youtube.com/watch?v=7CqJlxBYj-M
Heroku deployment from: https://www.youtube.com/watch?v=e1LaekAnVIM

MongoDB is a document based open source db,
Express is a web application framework for node.js,
React is a js frontend library for building user interfaces,
Node.js is a js run-time environment that executes js code outide of a browser (such as a server)

Setup:
	Install node.js
	create a project folder with 'frontend' and 'backend' folders

Setting up the frontend:
	cd to 'frontend' folder and install react dependencies in frontend folder: 'npx create-react-app <app-name>'
	Start frontend in the main react folder: 'npm start'
	Install bootstrap to make styling easier: 'npm install bootstrap'
	Install react-router-dom to make routing to different URLs easier: 'npm install react-router-dom'
	Install datepicker: 'npm install react-datepicker'
Setting up the backend:
	cd to 'backend' folder and create package.json file: 'npm init -y'
    Install required dependencies/packages: 'npm install express cors mongoose dotenv'
		cors is an express.js middleware that allows ajex requests to skip origin resource policies to access resources from remote hosts
		mongoose MongoDB schema-based solution to model application data via node.js
		dotenv loads environment variable from a file (.env)
		install nodemon, which restarts the server whenever changes are made: 'npm (or sudo) install -g nodemon'
    Start node.js server in backend folder: 'nodemon server'.  Turn off VPN to connect to MongoDB

Deploy to Heroku:
	cd to frontend folder and run 'npm run build' to create a build
	Install Heroku CLI via website to ensure it's automatically updated
	Login to Heroku: 'heroku login -i'
	Ensure the port and db are referenced correctly to prod
	Add to package.json scripts: '"heroku-postbuild": "cd frontend && npm install && npm run build"'.  After building, this installs all packages and creates the build folder
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
	Add "engines" in pakcage.json and add the node version to ensure Heroku runs the correct version
	Heroku runs whatever is in the Procfile first, else it runs the "scripts: start" in package.json
	Ensure "react" is under the 'dependencies' and not 'devDependencies'
	If you are building for development purposes, run: 'heroku config:set NPM_CONFIG_PRODUCT=true YARN_PRODUCTION=true' to ensure installing only packages under dependencies and not the devDependencies
	Run 'heroku logs --tail' to troubleshoot issues
	Run 'heroku run bash' to access entire Heroku folder structure
	Building and deploying to Heroku might remove some node_modules required to run locally
	add a package.json file to the root folder so Heroku can detect which language to use