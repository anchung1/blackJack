# reactTemplate

Steps to use this template: <br/>
1) git clone https://github.com/anchung1/reactTemplate.git someWs/ <br/>
2) on github, create another repository (say sampleProj) for future commits.  Template is for init only and no commits should go into it. <br/>
3) from someWs/, change the remote to point to repo from step 2) <br/>
  -- git remote set-url origin https://github.com/anchung1/sampleProj.git <br/>
  -- git remote -v to verify <br/>
  -- git pull to sync <some ws> with new remote <br/>
  -- git push to put templates into new repo <br/>
  
Post git setup:  
4) from someWs/, run 'npm install' <br/>
5) from someWs/dist/, run 'bower install' <br/>
6) from someWs/, run 'gulp' <br/>
<br/>
Steps not shown:
Have a node/express server serve up static files from someWs/dist/  <br/>
Have a look at: https://github.com/anchung1/flickrExp.git.  <br/>
----from app.js: app.use(express.static(path.resolve(__dirname,'..', 'flickr1/dist'))); <br/>
----replace 'flickr1/dist' with 'someWs/dist'  <br/>
<br/>
<br/>
<br/>  
References: <br/>
1) https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/ <br/>
2) https://help.github.com/articles/changing-a-remote-s-url/ <br/>
<br/>
For reference 1), needed to add another step: <br/>
  After setting this: <br/>
  -- git remote add origin remote repository URL <br/>
  <br/>
  Need to do git pull: <br/>
  -- git pull origin master <br/>
  <br/>
  Then do git push: <br/>
  -- git push origin master <br/>
  <br/>
<br/>
