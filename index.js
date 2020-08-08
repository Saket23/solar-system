paper.install(window);

//function to generate the sun
generateSun = () => {
  let sun = new Path.Circle({
    center: view.center,
    radius: 30,
  });
  sun.fillColor = {
    gradient: {
      stops: [
        ["white", 0.01],
        ["#fff6c9", 0.05],
        ["#ffefa3", 0.5],
        ["orange", 0.99],
      ],
      radial: true,
    },
    origin: sun.position,
    destination: sun.bounds.rightCenter,
  };
};

//generate orbit for all the planets
generateOrbit = (offset) => {
  let path = new Path();
  path.strokeColor = "#fff";
  let centerOfCanvas = view.center;
  let center_y = centerOfCanvas._y;
  let center_x = centerOfCanvas._x;
  path.add(
    new Point(center_x - offset - 100, center_y),
    new Point(center_x, center_y - offset),
    new Point(center_x + offset + 100, center_y),
    new Point(center_x, center_y + offset)
  );
  path.opacity = 0.3;
  path.closed = true;
  path.smooth();
  return path;
};

generateMercury = () => {
  let mercury = new Path.Circle({
    center: view.center,
    radius: 5,
  });
  mercury.fillColor = {
    gradient: {
      stops: ["#D3D3D3", "#C0C0C0", "#fff", "#A9A9A9", "#808080"],
      radial: false,
    },
    origin: mercury.bounds.leftCenter,
    destination: mercury.bounds.rightCenter,
  };
  return mercury;
};

generateVenus = () => {
  let venus = new Path.Circle({
    center: view.center,
    radius: 6,
  });
  venus.fillColor = {
    gradient: {
      stops: ["#fbab60", "#ffb347", "#fff", "#A9A9A9", "#808080"],
      radial: false,
    },
    origin: venus.bounds.leftCenter,
    destination: venus.bounds.rightCenter,
  };
  return venus;
};

generateEarth = () => {
  let earth = new Path.Circle({
    center: view.center,
    radius: 10,
  });

  earth.fillColor = {
    gradient: {
      stops: ["#44dfff", "#46a35b", "green", "#448cff", "#44dfff"],
      radial: false,
    },
    origin: earth.bounds.leftCenter,
    destination: earth.bounds.rightCenter,
  };
  return earth;
};

generateMars = () => {
  let mars = new Path.Circle({
    center: view.center,
    radius: 10,
  });
  mars.fillColor = {
    gradient: {
      stops: ["#ffa500", "#ffcc99", "#ff9966", "#fbab60", "#fb9902"],
      radial: false,
    },
    origin: mars.bounds.leftCenter,
    destination: mars.bounds.rightCenter,
  };
  return mars;
};

generateJupiter = () => {
  let jupiter = new Path.Circle({
    center: view.center,
    radius: 18,
  });
  jupiter.fillColor = {
    gradient: {
      stops: ["#ff9966", "#606060", "#ffa07a", "#ff9933", "#707070"],
      radial: false,
    },
    origin: jupiter.bounds.leftCenter,
    destination: jupiter.bounds.rightCenter,
  };
  return jupiter;
};

generateSaturn = () => {
  let saturn = new Path.Circle({
    center: view.center,
    radius: 15,
  });
  saturn.fillColor = {
    gradient: {
      stops: ["#fbab60", "#9bc4e2", "#87ceeb", "#707070", "#888888"],
      radial: false,
    },
    origin: saturn.bounds.leftCenter,
    destination: saturn.bounds.rightCenter,
  };
  return saturn;
};

generateUranus = () => {
  let uranus = new Path.Circle({
    center: view.center,
    radius: 13,
  });
  uranus.fillColor = {
    gradient: {
      stops: ["#C0C0C0", "#C8C8C8", "#D3D3D3", "#E0E0E0", "#F0F0F0"],
      radial: false,
    },
    origin: uranus.bounds.leftCenter,
    destination: uranus.bounds.rightCenter,
  };
  return uranus;
};

generateNeptune = () => {
  let neptune = new Path.Circle({
    center: view.center,
    radius: 12,
  });
  neptune.fillColor = {
    gradient: {
      stops: ["#9bc4e2", "#4682b4", "#89cff0", "#8cbed6", "#7cb9e8"],
      radial: false,
    },
    origin: neptune.bounds.leftCenter,
    destination: neptune.bounds.rightCenter,
  };
  return neptune;
};

//common function to move the planet across the orbit
movePlanet = (planet, orbit, offset) => {
  planet.rotate(10);
  if (offset < orbit.length) {
    planet.position = orbit.getPointAt(offset);
    offset += 1;
  } else {
    offset = 0;
  }
  return offset;
};

//lets get stars
generateStars = () => {
  let star = new Path.Circle(new Point(20, 20), 2);
  star.fillColor = "#fff";

  let symbol = new Symbol(star);
  let { width, height } = view.size;
  for (let i = 0; i < 500; i++) {
    const randomPoint = Point.random();
    let random_x = randomPoint.x,
      random_y = randomPoint.y;
    let placed = symbol.place(new Point(width * random_x, height * random_y));
    placed.scale(1, 0.5);
  }
};

window.onload = function () {
  paper.setup("myCanvas");

  //generate sun
  generateSun();

  //mercury
  let mercuryOrbit = generateOrbit(100);
  let mercury = generateMercury();
  let mercuryOffset = 0;

  //venus-orbit
  let venusOrbit = generateOrbit(150);
  let venus = generateVenus();
  let venusOffset = 0;

  //earth-orbit
  let earthOrbit = generateOrbit(200);
  let earth = generateEarth();
  let earthOffset = 0;

  //mars-orbit
  let marsOrbit = generateOrbit(250);
  let mars = generateMars();
  let marsOffset = 0;

  //jupiter-orbit
  let jupiterOrbit = generateOrbit(300);
  let jupiter = generateJupiter();
  let jupiterOffset = 0;

  //saturn-orbit
  let saturnOrbit = generateOrbit(350);
  let saturn = generateSaturn();
  let saturnOffset = 0;

  //Uranus-orbit
  let uranusOrbit = generateOrbit(400);
  let uranus = generateUranus();
  let uranusOffset = 0;

  //Neptune
  let neptuneOrbit = generateOrbit(450);
  let neptune = generateNeptune();
  let neptuneOffset = 0;

  //generateStars
  generateStars();

  view.onFrame = () => {
    //move mercury
    mercuryOffset = this.movePlanet(mercury, mercuryOrbit, mercuryOffset);

    //move venus
    venusOffset = this.movePlanet(venus, venusOrbit, venusOffset);

    //move earth
    earthOffset = this.movePlanet(earth, earthOrbit, earthOffset);

    //move mars
    marsOffset = this.movePlanet(mars, marsOrbit, marsOffset);

    //move jupiter
    jupiterOffset = this.movePlanet(jupiter, jupiterOrbit, jupiterOffset);

    //move saturn
    saturnOffset = this.movePlanet(saturn, saturnOrbit, saturnOffset);

    //move uranus
    uranusOffset = this.movePlanet(uranus, uranusOrbit, uranusOffset);

    //move neptune
    neptuneOffset = this.movePlanet(neptune, neptuneOrbit, neptuneOffset);
  };
};
