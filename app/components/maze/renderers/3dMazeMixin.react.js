import React from 'react';
import ReactDOM from 'react-dom';
import {Scene, PerspectiveCamera, SpotLight, PointLight,
    AxisHelper, GridHelper, WebGLRenderer, BoxGeometry, MeshPhongMaterial, MeshLambertMaterial,
    CircleGeometry, LineBasicMaterial, SphereGeometry, Vector3,
    Geometry, Line, MeshBasicMaterial, CylinderGeometry, Mesh, Color, Group} from 'three';
import { updatePosition} from '../../../actions/MatchActions';

export default React.createClass({
    UNIT_LENGTH: 5,
    MARKER_ANIMATE_UP: true,
    WIDTH: 300,
    HEIGHT: 400,
    COLORS: {
        wall: 0xFF0033,
        ceiling: 0x009933,
        floor: 0x663333,
        marker: 0x9900FF
    },
    componentDidMount: function () {
        this.createScene();
        document.addEventListener("keydown",this.props.dispatch(updatePosition), false);
    },
    initObjects: function () {
        //create the objects needs for the game
        this.wall = this.initWall();
        this.floor = this.initFloor();
        this.ceiling = this.initCeiling();
        this.marker = this.initMarker();
        this.renderer = this.initRenderer();
        this.objectCache = this.createGameObjects();
    },
    initScene: function () {
        return {
            scene: new Scene(),
            renderedLevel: null
        };
    },
    initRenderer: function () {
        let renderer = new WebGLRenderer({antialias: true});
        renderer.setSize( this.WIDTH, this.HEIGHT);
        renderer.setClearColor( 0x555555 );
        return renderer;
    },
    createGameObjects: function () {
        //clone the base objects to construct the objects needs for play
        //and added the object cache
        return {
            levels: this.createLevels(),
            marker: this.createMarker()
        };
    },
    initWall: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( ul, 4, ul/10  );
        let material = new MeshLambertMaterial( { color: this.COLORS.wall } );

        material.opacity = 0.9;
        material.transparent = true;

        let cube = new Mesh( geometry, material );
        cube.position.y = 1;
        return cube;
    },
    initFloor: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( .8*ul, ul/10, .8*ul );
        let material = new MeshLambertMaterial({color: this.COLORS.ceiling});
        material.emissive = new Color(this.COLORS.floor)

        material.opacity = 0.5;
        material.transparent = true;

        let cube = new Mesh( geometry, material );

        return cube;
    },
    initCeiling: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( .8*ul, ul/10, .8*ul );
        let material = new MeshLambertMaterial({color: this.COLORS.ceiling});
        material.emissive = new Color(this.COLORS.ceiling)

        material.opacity = 0.5;
        material.transparent = true;

        let cube = new Mesh( geometry, material );

        cube.position.y = ul-2;
        return cube;
    },
    initMarker: function () {
        var ul = this.UNIT_LENGTH;
        var sphereGeometry = new SphereGeometry( 1.3, 12, 12 );
        var sphereMaterial = new MeshLambertMaterial( {color: this.COLORS.marker } );
        let marker = new Mesh( sphereGeometry, sphereMaterial );
        marker.castShadow = true;
        return marker;
    },

    //fixed objects are added once to scene and not animated
    addFixedObjects: function (scene) {
        let ul = this.UNIT_LENGTH;
        let spotLight = new SpotLight(0xFFFFFF);
        // set its position
        spotLight.position.x = this.WIDTH;
        spotLight.position.y = this.HEIGHT;
        spotLight.position.z = 130;
        spotLight.castShadow = true;
        scene.add(spotLight);

        this.camera = new PerspectiveCamera(90, this.HEIGHT/this.WIDTH, .1, 5000 );
        this.camera.position.z = 0;
        this.camera.position.y = ul * 5;
        this.camera.position.x = ul * 3;
        this.camera.rotation.x = -20;
        scene.add(this.camera);

        this.addGridLines(scene);
    },

    createScene: function () {
        this.scene = this.initScene();

        this.initObjects();
        //this.addBorder(scene, width, height);

        this.addFixedObjects(this.scene.scene);
        this.scene.scene.add(this.objectCache.marker);

        ReactDOM.findDOMNode(this.refs.mazeTarget).appendChild( this.renderer.domElement );

        this.addLevelToScene(0)

        this.renderScene  = this.getRenderer(this.renderer, this.scene.scene, this.camera);
    },
    render: function () {
        return (
                <div ref="mazeTarget" className="maze-target"></div>);
    },
    addLevelToScene: function (level, remove) {
        console.log('changing levels', level, remove);
        if (remove) this.scene.scene.remove(remove);
        this.scene.scene.add(this.objectCache.levels[level]);
        this.scene.renderedLevel = level;
    },
    getRenderer: function (renderer, scene, camera) {
        var bm  = this.bounceMarker;
        function render() {
                requestAnimationFrame( render );
                bm();
                renderer.render( scene, camera );
        }

        return render;
    },
    componentDidUpdate: function () {
        if (this.props.newMaze) {
            this.scene.scene.remove(this.objectCache.levels[this.objectCache.levels.length-1])
            this.objectCache.levels = this.createLevels()
            this.addLevelToScene(this.props.currentLevel);
            this.updateMarker();
        } else if (this.scene.renderedLevel !== this.props.currentLevel) {
            this.addLevelToScene(this.props.currentLevel, this.objectCache.levels[this.scene.renderedLevel]);
        } else {
            this.updateMarker();
        }
        this.renderScene();
    },
    createMarker: function () {
        let ul = this.UNIT_LENGTH;
        let marker = this.marker.clone();
        marker.position.x =  ul/2;
        marker.position.y = 2;
        marker.position.z = ul/2 * -1;

        return marker;

    },
    updateMarker: function () {
        let position = this.props.match.get('position').toJS();
        let ul = this.UNIT_LENGTH;
        console.log('updating marker', position);
        this.objectCache.marker.position.x = position[0] * ul + (ul/2);
        this.objectCache.marker.position.z = (position[1] * ul + (ul/2)) * -1;
    },
    bounceMarker: function () {
        var flr = 1;
        var ceil = 3;
        var marker = this.objectCache.marker;
        var posY = marker.position.y;
        var y = 0.3;
        var animateUp = this.MARKER_ANIMATE_UP;
        if (animateUp && posY > ceil) {
            this.MARKER_ANIMATE_UP = false;
            y = -0.05;
        } else if (!animateUp && posY < flr) {
            this.MARKER_ANIMATE_UP = true;
            y = 0.05;
        } else if (!animateUp) {
            y = -0.05;
        }
        marker.translateY(y);
    },
    addBorder: function (scene, width, height){
        var config = this.props.currentMaze.get('dimensions');
        var ul = this.UNIT_LENGTH;
        var planeGeometry = new BoxGeometry( ul * config.x, ul * config.y, ul/5);
        var planeMaterial = new MeshBasicMaterial({color:0xcccccc});
        var plane = new Mesh(planeGeometry, planeMaterial);
        plane.position.x = ul * config.x /2;
        plane.position.y = ul * config.y /2;
        plane.position.z = 10;
        scene.add(plane);

        var lineMaterial = new LineBasicMaterial({
                color: 0x0000ff,
                linewidth: 5
        });

        var lineGeometry = new Geometry();
        lineGeometry.vertices.push(
                    new Vector3( 0, 0, 20 ),
                        new Vector3( 0, ul*config.y, 20 ),
                        new Vector3( ul*config.x, ul*config.y, 20 ),
                        new Vector3( ul*config.x, 0, 20 ),
                        new Vector3( 0, 0, 20 )
                );

        var line = new Line( lineGeometry, lineMaterial );
        scene.add( line );
    },
    addGridLines: function (scene) {
        var config = this.props.getMaze().get('dimensions').toJS();
        var ul = this.UNIT_LENGTH;
        var i;

        //vertical grid lines
        for (i = 1;i<config.x;i++) {
            var xCoord = i * ul;
            var yLimit = ul * config.y;
            this.addGridLine(scene, [xCoord, 0], [xCoord, yLimit]);
        }
        //horizontal grid lines
        for (i = 1;i<config.y;i++) {
            var yCoord = i * ul;
            var xLimit = ul * config.x;
            this.addGridLine(scene, [0, yCoord], [xLimit, yCoord]);
        }
    },
    addGridLine: function (scene, start, end) {
        var lineMaterial = new LineBasicMaterial({
                color: 0x00ffff,
                linewidth: 2
        });

        var lineGeometry = new Geometry();
        lineGeometry.vertices.push(
                    new Vector3( start[0], 0, start[1] * -1),
                        new Vector3( end[0], 0, end[1] * -1 )
                );

        var line = new Line( lineGeometry, lineMaterial );
        scene.add( line );
    },

    addWall: function (group, isVertical, x, z) {
        let cube = this.wall.clone()
        cube.position.x = x;
        cube.position.z = z;
        if (isVertical) cube.rotation.y = Math.PI / 2;
        group.add(cube);

    },
    addVerticalWall: function (group, x, y) {
        let ul = this.UNIT_LENGTH;
        console.log('add v wall', x, y)
        this.addWall(group, true, ul * x + ul, (ul * y + (ul/2))* -1)
    },
    addHorizontalWall: function (group, x, y) {
        let ul = this.UNIT_LENGTH;
        console.log('add h wall', x, y);
        this.addWall(group, false, ul * x+(ul/2), (ul * y + ul)* -1)
    },
    addCeiling: function (group, x, y) {
        let ul = this.UNIT_LENGTH;
        let ceiling = this.ceiling.clone();
        ceiling.position.x = x * ul + (.5*ul);
        ceiling.position.z = (y * ul + (.5*ul))*-1;
        group.add(ceiling);
    },
    addFloor: function (group, x, y) {
        let ul = this.UNIT_LENGTH;
        let floor = this.floor.clone();
        floor.position.x = x * ul + (.5*ul);
        floor.position.z = (y * ul + (.5*ul)) * -1;
        group.add(floor);
    },
    createLevels: function () {
        console.log('creating levels', this.props.levels);
        return this.props.levels.map(this.createWallGroups);
    },
    addWallObjects: function(group, walls, renderer) {
        walls.forEach(function(column, colIdx) {
            column.split('').forEach((wall, rowIdx)=>{
                if (wall === '1') renderer(group, colIdx, rowIdx);
            })
        });
    },
    createWallGroups: function (walls, level) {
        //walls is an array [x,y,zf, zc]
        let group = new Group();
        group.name = `level_${level}`;
        this.addWallObjects(group, walls[0], this.addVerticalWall);
        this.addWallObjects(group, walls[1], this.addHorizontalWall);
        this.addWallObjects(group, walls[3], this.addFloor);
        this.addWallObjects(group, walls[2], this.addCeiling);
        return group;
    }
});
