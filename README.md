# Concole Cam
<div style="text-align:center">
<img src="doc/logo.jpg" alt="logo" height="150px">
</div>

Console Cam est une application révolutionnaire, liant ancienneté et modernité, elle permet d'afficher la sortie vidéo d'un web cam dans la console.
En couleur pour les terminaux supportant "true color" ou en niveaux de gris pour les autres.

Compatible Mac et Linux

Testé sur MacOs avec iTerm2

Demo web [ici](https://theophile-br.github.io/console-cam/)

# App
L'application utilise OpenCv pour avoir un accès facile à la webcam et effectuer des opérations sur l'image.

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

demo [ici](https://theophile-br.github.io/console-cam/)

Simule l'app console avec un environement plus portatif.
Utilise la bibliothèque [OpenCv.js](https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html)

```bash
cd web-app
npm i
npm start
```

Logo réalisé grace à Photofunia [ici](https://photofunia.com/fr/effects/retro-wave)
