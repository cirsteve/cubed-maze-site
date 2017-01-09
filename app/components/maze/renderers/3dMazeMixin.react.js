import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import {Scene, PerspectiveCamera, SpotLight, PointLight,
    AxisHelper, GridHelper, WebGLRenderer, BoxGeometry, MeshPhongMaterial, MeshLambertMaterial,
    CircleGeometry, LineBasicMaterial, SphereGeometry, Vector3, PlaneGeometry,
    Geometry, Line, MeshBasicMaterial, CylinderGeometry, Mesh, Color, Group} from 'three';
import { updatePosition} from '../../../actions/MatchActions';

export default React.createClass({
    UNIT_LENGTH: 5,
    MARKER_ANIMATE_UP: true,
    WIDTH: 300,
    HEIGHT: 300,
    COLORS: {
        wall: 0xFF0033,
        outerWall: 0x104E8B,
        ceiling: 0x009933,
        floor: 0x33CCFF,
        marker: 0x9900FF,
        goal: 0xFFCC00,
        hint: 0x33FF00
    },
    componentDidMount: function () {
        this.createScene();
        document.addEventListener("keydown",this.props.dispatch(updatePosition), false);
    },
    initObjects: function () {
        //create the objects needs for the game
        this.wall = this.initWall();
        this.outerWall = this.initOuterWall();
        this.outerSideWall = this.initOuterSideWall();
        this.floor = this.initFloor();
        this.ceiling = this.initCeiling();
        this.marker = this.initMarker();
        this.goalLight = this.initGoalLight();
        this.renderer = this.initRenderer();
        this.hint = this.initHint();
        this.objectCache = this.createGameObjects();
    },
    initScene: function () {
        return {
            scene: new Scene(),
            renderedLevel: null
        };
    },
    initHint: function () {
        //initialize a cache for rendered hints
        this.addedHints = Map();

        let geometry = new CylinderGeometry(0.1, 1, 3);
        let material = new MeshBasicMaterial( {color: this.COLORS.hint} );
        return new Mesh( geometry, material );
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
            marker: this.createMarker(),
            hints:[],
        };
    },
    initGoalLight: function () {
        let light = new PointLight(this.COLORS.goal);
        let ul = this.UNIT_LENGTH;
        ;
        // set its position
        light.position.x = (this.props.currentMaze.get('dimensions').get('x')-1) * ul + ul/2;
        light.position.z = (this.props.currentMaze.get('dimensions').get('y')-1) * -ul + ul/2;
        light.position.y - ul/2;
        light.castShadow = true;
        light.intensity = 2;
        light.distance = 0;
        light.decay = 1;
        return light;
    },
    initWall: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( ul, 4, ul/10  );
        let material = new MeshLambertMaterial( { color: this.COLORS.wall } );

        //material.opacity = 0.9;
        //wmaterial.transparent = true;

        let cube = new Mesh( geometry, material );
        return cube;
    },
    initOuterWall: function () {
        let ul = this.UNIT_LENGTH;
        let dimensions = this.props.currentMaze.get('dimensions');
        let geometry = new BoxGeometry( ul*dimensions.get('x'), 0.2, ul*dimensions.get('y') );
        let material = new MeshLambertMaterial( { color: this.COLORS.outerWall } );

        material.opacity = 0.3;
        material.transparent = true;
        material.emissive = new Color(this.COLORS.outerWall);
        let wall = new Mesh( geometry, material );
        wall.position.set(ul*dimensions.get('x')/2,-ul/2,ul*dimensions.get('y')/-2);
        return wall;
    },
    initOuterSideWall: function () {
        let ul = this.UNIT_LENGTH;
        let dimensions = this.props.currentMaze.get('dimensions');
        let geometry = new BoxGeometry( ul*dimensions.get('x'), 4, 0.2 );
        let material = new MeshLambertMaterial( { color: this.COLORS.outerWall } );

        material.opacity = 0.3;
        material.transparent = true;
        material.emissive = new Color(this.COLORS.outerWall);
        let wall = new Mesh( geometry, material );
        wall.position.x = ul*dimensions.get('x')/2;
        return wall;
    },
    initFloor: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( .8*ul, ul/10, .8*ul );
        let material = new MeshLambertMaterial({color: this.COLORS.ceiling});
        material.emissive = new Color(this.COLORS.floor)

        material.opacity = 0.5;
        material.transparent = true;

        let cube = new Mesh( geometry, material );
        cube.position.y = -2;

        return cube;
    },
    initCeiling: function () {
        let ul = this.UNIT_LENGTH;
        let geometry = new BoxGeometry( .8*ul, ul/10, .8*ul );
        let material = new MeshLambertMaterial({color: this.COLORS.ceiling});
        material.emissive = new Color(this.COLORS.ceiling)

        material.opacity = 0.5;
        material.transparent = true;

        let cube = new Mesh( geometry, material );

        cube.position.y = 2;
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
        this.camera.position.z = -7;
        this.camera.position.y = ul * 4;
        this.camera.position.x = ul * 3;
        this.camera.rotation.x = -20.2;
        scene.add(this.camera);

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
            this.addHints = Map();
            this.scene.scene.remove(this.objectCache.levels[this.objectCache.levels.length-1])
            let oldLevels = this.objectCache.levels;
            this.objectCache.levels = [];
            oldLevels.forEach(level=>{
                level.children.forEach(mesh=>{
                    console.log('m is', mesh);
                    if (mesh.geometry) mesh.geometry.dispose();
                    if (mesh.material) mesh.material.dispose();
                });
            });
            this.objectCache.levels = this.createLevels()
            this.addLevelToScene(this.props.currentLevel);
            this.updateMarker();
        } else if (this.scene.renderedLevel !== this.props.currentLevel) {
            this.addLevelToScene(this.props.currentLevel, this.objectCache.levels[this.scene.renderedLevel]);
        } else if (this.addedHints.size !== this.props.hints.size) {
            let newHint = this.props.hints.findEntry((v,k)=>!this.addedHints.has(k));
            this.addHint(newHint[0].split(''), newHint[1]);
            this.addedHints = this.props.hints;
        } else {
            this.updateMarker();
        }
        this.renderScene();
    },

    createHint: function (position, direction) {
        let ul = this.UNIT_LENGTH;
        let hint = this.hint.clone();
        switch(direction){
            case 'north':
                hint.rotation.x = Math.PI * 180 * 180;
                break;
            case 'west':
                hint.rotation.x = Math.PI / 2;
                break;
            case 'east':
                hint.rotation.z = Math.PI / 2 * -1;
                break;
            case 'south':
                hint.rotation.z = Math.PI / 2 * -1;
                break;
            case 'down':
                hint.rotation.x = Math.PI / 2 * -1;
                break;
        }
        let halfUl = ul/2;
        hint.position.x = position[0] * ul + halfUl;
        hint.position.z = position[1] * -ul - halfUl;
        return hint;
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
        this.objectCache.marker.position.x = position[0] * ul + (ul/2);
        this.objectCache.marker.position.z = (position[1] * ul + (ul/2)) * -1;
    },
    bounceMarker: function () {
        var flr = -1.5;
        var ceil = 1.5;
        var marker = this.objectCache.marker;
        var posY = marker.position.y;
        var y = 0.3;
        var animateUp = this.MARKER_ANIMATE_UP;
        if (animateUp && posY > ceil) {
            this.MARKER_ANIMATE_UP = false;
            y = -0.08;
        } else if (!animateUp && posY < flr) {
            this.MARKER_ANIMATE_UP = true;
            y = 0.06;
        } else if (!animateUp) {
            y = -0.08;
        }
        marker.translateY(y);
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

    getOuterFloor: function () {
        return this.outerWall.clone();
    },
    getOuterCeiling: function () {
        let wall = this.outerWall.clone();
        wall.position.y = 2;
        return wall;
    },
    addOuterWalls: function (group) {
        let ul = this.UNIT_LENGTH;
        let wall = this.outerSideWall.clone();
        let dimensions = this.props.currentMaze.get('dimensions');
        group.add(wall);

        let top = wall.clone();
        top.position.z = -ul * dimensions.get('y');
        group.add(top);

        let right = wall.clone();
        right.rotation.y = Math.PI / 2;
        right.position.x = dimensions.get('x') * ul;
        right.position.z = dimensions.get('y') * ul / -2;
        group.add(right)

        let left = right.clone();
        left.position.x = 0;
        group.add(left);

    },
    addHint: function (node, direction) {
        let hint = this.createHint(node, direction);
        let group = this.objectCache.levels[node[2]];

        this.scene.scene.remove(group);
        group.add(hint);

        this.scene.scene.add(group);
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
        this.addWall(group, true, ul * x + ul, (ul * y + (ul/2))* -1)
    },
    addHorizontalWall: function (group, x, y) {
        let ul = this.UNIT_LENGTH;
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
        let ultimateLevel = this.props.currentMaze.get('dimensions').get('z')-1;
        return this.props.levels.map(this.createWallGroups.bind(this, ultimateLevel));
    },
    addWallObjects: function(group, walls, renderer) {
        walls.forEach(function(column, colIdx) {
            column.split('').forEach((wall, rowIdx)=>{
                if (wall === '1') renderer(group, colIdx, rowIdx);
            })
        });
    },
    createWallGroups: function (ultimateLevel, walls, level) {
        //walls is an array [x,y,zf, zc]
        let group = new Group();
        this.addOuterWalls(group)
        if (ultimateLevel === level) {
            //group.add(this.goalLight.clone());
            group.add(this.getOuterCeiling())
        } else if (level === 0) {
            group.add(this.getOuterFloor());
        }
        this.addWallObjects(group, walls[0], this.addVerticalWall);
        this.addWallObjects(group, walls[1], this.addHorizontalWall);
        this.addWallObjects(group, walls[3], this.addFloor);
        this.addWallObjects(group, walls[2], this.addCeiling);



        return group;
    }
});
