# Directory Diff GUI
A program made using Electron and Photon to show the difference between two project directories in terms of code. Done purely to practice Electron

The code uses Electron, dir-compare and diff .. so far it has the following functionality:
* Pick two directories
* Read the .gitignore from first directory to ignore files not needed for comparison
* Exclude files or folders specifically

There's a lot of improvement needed in this code like handling the following errors:
* Not choosing directories and closing the dialogs causes errors
* Excluding files without choosing a directory causes errors
* The gitignore button should be a toggle and should look for gitignore in both directories not one
* (Feature) Add a drag and drop option
