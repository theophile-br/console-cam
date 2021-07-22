# Concole Cam
<div style="text-align:center">
<img src="doc/logo.jpg" alt="logo" height="150px">
</div>
<div style="text-align:center">
<img src="doc/demo.gif" alt="logo" height="100px">
<img src="doc/demo.gif" alt="logo" height="100px">
<img src="doc/demo.gif" alt="logo" height="100px">
</div>

Console Cam est un application révolutionnaire, liant ancienneté et modernité, elle permet d'afficher la sortie video d'une web cam dans la console.
En couleur pour les terminaux suportant "true color" ou en niveaux de gris pour les autres.

Testé sur MacOs avec iTerm2

# App
L'application utilise OpenCv pour avoir un accès facile à la webcam et effectuer des opérations sur l'images.

Pour installe la bibliothèque dynamique sur : 
* MacOs (avec Homebrew)
```bash
brew install opencv
```
* Linux
```bash
sudo apt install libopencv-dev python3-opencv
```

## Compile and Run
```bash
cd console-app
mkdir build
cd build
cmake ..
make
./ConsoleCam
```


# Web App
Simule l'app console avec un environement plus portatif.
Grâce à la library web assembly OpenCv.js

```bash
cd web-app
npm i
npm start
```



Logo réalisé grace à Photofunia [ici](https://photofunia.com/fr/effects/retro-wave)