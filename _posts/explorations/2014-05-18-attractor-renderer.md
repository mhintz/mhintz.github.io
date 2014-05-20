---
layout: posts/exploration
category: explorations
projectName: Attractor Renderer
projectUrl: https://github.com/mhintz/Attractor-Renderer
photos:
 - url: img/explorations/attractor_renderer_19052014/Aizawa-1400545695.png
   title: Aizawa
 - url: img/explorations/attractor_renderer_19052014/Bouali-1400551195.png
   title: Bouali
 - url: img/explorations/attractor_renderer_19052014/Chen-Celikovsky-1400544394.png
   title: Chen-Celikovsky
 - url: img/explorations/attractor_renderer_19052014/Chen-Lee-1400544422.png
   title: Chen-Lee
 - url: img/explorations/attractor_renderer_19052014/Hadley-1400544439.png
   title: Hadley
 - url: img/explorations/attractor_renderer_19052014/Halvorsen-1400544462.png
   title: Halvorsen
 - url: img/explorations/attractor_renderer_19052014/Ikeda-1400544495.png
   title: Ikeda
 - url: img/explorations/attractor_renderer_19052014/Liu-Chen-1400544512.png
   title: Liu-Chen
 - url: img/explorations/attractor_renderer_19052014/Lorenz-1400544530.png
   title: Lorenz
 - url: img/explorations/attractor_renderer_19052014/Lu-Chen-1400544549.png
   title: Lu-Chen
 - url: img/explorations/attractor_renderer_19052014/Nose-Hoover-1400544583.png
   title: Nose-Hoover
 - url: img/explorations/attractor_renderer_19052014/Pickover-1400544598.png
   title: Pickover
 - url: img/explorations/attractor_renderer_19052014/Qi-Chen-1400544616.png
   title: Qi-Chen
 - url: img/explorations/attractor_renderer_19052014/Rayleigh-Benard-1400544644.png
   title: Rayleigh-Benard
 - url: img/explorations/attractor_renderer_19052014/Rossler-1400544711.png
   title: Rossler
 - url: img/explorations/attractor_renderer_19052014/Thomas-1400544768.png
   title: Thomas
 - url: img/explorations/attractor_renderer_19052014/Three_Scroll_Unified_Chaotic_System-1400544864.png
   title: Three-Scroll Unified Chaotic System 1
 - url: img/explorations/attractor_renderer_19052014/Three_Scroll_Unified_Chaotic_System_2-1400544978.png
   title: Three-Scroll Unified Chaotic System 2
 - url: img/explorations/attractor_renderer_19052014/Zhou-Chen-1400544352.png
   title: Zhou-Chen
---

I've been working on a way of rendering a variety of attractors in Processing. The below are screenshots from my efforts so far. Check out the wikipedia article on attractors <a href="http://en.wikipedia.org/wiki/Attractor" target="_blank">here</a>. The source code for this project can be found <a href="https://github.com/mhintz/Attractor-Renderer" target="_blank">here</a>. My inspiration for this project comes in part from the excellent work done by <a href="http://www.3d-meier.de/" target="_blank">Jürgen Meier</a>, <a href="http://chaoticatmospheres.com/125670/1204030/gallery/mathrules-strange-attractors" target="_blank">Chaotic Atmospheres</a> and <a href="http://alteredqualia.com/attractor" target="_blank">Altered Qualia</a>. An attractor is a set of formulae which, given an initial point, can be used to calculate the position of subsequent points. This renderer works by calculating a few tens of thousands of such points in succession, giving them an interesting color, and plotting them. I find the results strikingly beautiful.