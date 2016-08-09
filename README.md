#Lou's Work
Welcome to Lou's Work README. This is going to hold key goto information pertaining to the the site.

#SASS/SCSS
[SASS-Lang.com](http://sass-lang.com/)

###To start SASS conversion:
```
pkill sass //Kills all running sass instances.
cd ~
./run-sass.sh //Searches RAS folder for .scss files and converts them to .css
```
###Run SASS for main page
```
pkill sass
cd ~
sass --watch "workspace/assets/sass":"workspace/assets/css"
```

#GIT
The following will be a collection of GIT Procedures

###Creating a new Repository
> Login in to github & click start a project

> Name the project as needed

> Navigate to root directory of the project

```
git init
git add .
git commit -m "Initial Commit"
git remote add origin https://github.com/GitLou/REPONAME.git
git push -u origin master
```

###Updating an existing repo
> Navigate to root directory of the project

```
git init // <- only needs to be ran once per session
git add .
git commit -m "commit message here"
git push -u origin master
```