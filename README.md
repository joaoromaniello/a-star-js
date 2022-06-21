# Busca heurística

Trabalho de cunho educacional que consiste em implementar e fazer experimentos com o algoritmo A\*.

## Descrição

A ideia é encontrar a melhor rota para reunir os três pingentes da virtude e ir para Lost Woods, onde o mapa pode ser representado pela figura abaixo

![MAPA](https://github.com/Alisson2k/a-star-js/raw/master/images/mapa_game.png)

Para isso existem 5 tipos de terreno, onde cada um possui um peso

- Grama – Custo: +10
- Areia – Custo: +20
- Floresta – Custo: +100
- Montanha – Custo: +150
- Água – Custo: +180

Os três pingentes da virtude estão localizados dentro de Dungeons, as quais estão identificadas no mapa pelos portões de entrada. As dungeons são representadas por os seguintes mapas

<figure>
    <img src="https://github.com/Alisson2k/a-star-js/raw/master/images/dungeon1.png" alt="Dungeon 1" style="width:100%">
    <figcaption align = "center"><b>Fig.1 - Dungeon 1</b></figcaption>
</figure>

<figure>
    <img src="https://github.com/Alisson2k/a-star-js/raw/master/images/dungeon2.png" alt="Dungeon 2" style="width:100%">
    <figcaption align = "center"><b>Fig.2 - Dungeon 2</b></figcaption>
</figure>

<figure>
    <img src="https://github.com/Alisson2k/a-star-js/raw/master/images/dungeon3.png" alt="Dungeon 3" style="width:100%">
    <figcaption align = "center"><b>Fig.3 - Dungeon 3</b></figcaption>
</figure>

Dentro das Dungeons, somente é possível caminhar pelas regiões mais claras identificadas no mapa. O custo para andar nesse tipo de terreno é de +10

## Executar

O projeto foi todo feito com JavaScript puro, e para auxiliar na interface gráfica foi utilizada a biblioteca pública do [p5.js](https://p5js.org/)

Para executar localmente o p5.js recomenda-se subir um servidor local, o qual pode ser melhor [descrito aqui](https://github.com/processing/p5.js/wiki/Local-server).

Nós optamos por seguir a conveção em NodeJS, para isso é necessário a instalação do node

1. [Instale o NodeJS (recomendado utilizar v12+)](https://nodejs.org/en/download/)
2. No terminal (linux) ou no prompt de comando (Windows) digite

    npm install -g http-server

Feito isso basta executar o código abaixo ainda no terminal ou prompt de comando na pasta raíz do projeto:

    http-server
