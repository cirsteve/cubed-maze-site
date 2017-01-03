import React from 'react';
import ReactDOM from 'react-dom';
import {Scene, PerspectiveCamera, SpotLight, PointLight,
    AxisHelper, GridHelper, WebGLRenderer, BoxGeometry, MeshPhongMaterial,
    CircleGeometry, LineBasicMaterial, SphereGeometry, Vector3,
    Geometry, Line, MeshBasicMaterial, CylinderGeometry, Mesh} from 'three';
import { updatePosition} from '../../../actions/MatchActions';

export default React.createClass({
    UNIT_LENGTH: 5,
    WALL_DEPTH: 1,
    MARKER_CEIL: 4,
    MARKER_FLR: 1,
    MARKER_ANIMATE_UP: true,
    COLORS: {
        wall: 0x0080ab,
        ceiling: 0x808000,
        floor: 0x8080ab,
        marker: 0xaaaaaa
    },
    componentDidMount: function () {
        this.createScene();
        document.addEventListener("keydown",this.props.dispatch(updatePosition), false);
    },
    initObjects: function () {
        //create the objects needs for threejs
        this.wall = this.initWall();
        this.floor = this.initFloor();
        this.ceiling = this.initCeiling();
        this.marker = this.initMarker();
    },
    initWall: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( ul, ul/2, ul/10  );
        let material = new MeshPhongMaterial( { color: this.COLORS.wall } );

        material.opacity = 0.9;
        material.transparent = true;

        let cube = new Mesh( geometry, material );
        return cube;
    },
    initFloor: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( ul, ul/5, ul );
        let material = new MeshPhongMaterial( { color: this.COLORS.floor } );

        material.opacity = 0.9;
        material.transparent = true;

        return new Mesh( geometry, material );
    },
    initCeiling: function () {
        let ul = this.UNIT_LENGTH
        let geometry = new BoxGeometry( ul, ul/5, ul );
        let material = new MeshPhongMaterial( { color: this.COLORS.ceiling } );

        material.opacity = 0.9;
        material.transparent = true;

        return new Mesh( geometry, material );
    },
    initMarker: function () {
        var ul = this.UNIT_LENGTH;
        var sphereGeometry = new SphereGeometry( ul/2, ul*0.8, ul*0.8 );
        var sphereMaterial = new MeshPhongMaterial( {color: this.COLORS.marker } );
        let marker = new Mesh( sphereGeometry, sphereMaterial );
        marker.castShadow = true;
        return marker;
    },
    createScene: function () {
        var scene = new Scene();
        var targetEl = this.refs.mazeTarget;

        var unitLength = this.UNIT_LENGTH;

        var width = 300;
        var height = 400;

        var pointLight =
              new SpotLight(0xFFFFFF);

        var topPointLight =
              new PointLight(0xFFFFFF);

        var rightPointLight =
              topPointLight.clone();

        var position = this.props.match.get('position').toJS();

        // set its position
         rightPointLight.position.x = width;
         rightPointLight.position.y = 500;
         rightPointLight.position.z = 130;
         rightPointLight.rotation.x = Math.PI/.5;

        // set its position
         topPointLight.position.x = width;
         topPointLight.position.y = 500;
         topPointLight.position.z = 130;
         topPointLight.rotation.x = Math.PI/2;

        // set its position
         pointLight.position.x = width;
         pointLight.position.y = 500;
         pointLight.position.z = 130;
         pointLight.castShadow = true;
        //
        // // add to the scene
         scene.add(pointLight);

        var axes = new AxisHelper(this.UNIT_LENGTH);
        scene.add(axes);

        var size = 2000;
        var step = this.UNIT_LENGTH;

        //var gridHelper = new GridHelper( size, step );
        //gridHelper.rotation.x = Math.PI/2;

        //scene.add( gridHelper );

        this.initObjects();
        this.addWalls(scene);
        this.addBorder(scene, width, height);
        this.addGridLines(scene);
        this.userMarker = this.createMarker();
        scene.add(this.userMarker);

        let camera = new PerspectiveCamera(90, width/height, 1, 5000 );
        camera.position.z = unitLength*10;//10 * this.UNIT_LENGTH;
        //camera.rotation.z = 160;//10 * this.UNIT_LENGTH;
        //camera.rotation.x = 180;//2.5 * this.UNIT_LENGTH;
        //camera.position.y = 2;
        //camera.lookAt( new Vector3(width/2, height, 1));

        var renderer = new WebGLRenderer({antialias: true});
        renderer.setSize( width, height);
        renderer.setClearColor( 0x555555 );

        //replace or append the rendered scene
        var sceneNodeParent = ReactDOM.findDOMNode(targetEl);
        var sceneNode = sceneNodeParent.firstChild;
        if (this.props.app.newLevel) {
            if (sceneNode) sceneNodeParent.removeChild(sceneNode);
        }
        sceneNodeParent.appendChild( renderer.domElement );

        this.renderScene  = this.getRenderer(renderer, scene, camera);
        this.renderScene();
    },
    render: function () {
        return (
                <div ref="mazeTarget" className="maze-target"></div>);
    },
    componentDidUpdate: function () {
        if (this.props.app.newLevel) {
            this.createScene();
        } else {
            this.updateMarker();
        }
        this.renderScene();
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
    createMarker: function () {
        let ul = this.UNIT_LENGTH;
        let marker = this.marker.clone();
        marker.position.x = 0 * ul/5 + ul/2;
        marker.position.y = 0 * ul/5 + ul/2;
        marker.position.z = this.MARKER_FLR;

        return marker;

    },
    addWall: function (scene, isVertical, x, z) {
        let cube = this.wall.clone()
        cube.position.x = x;
        cube.position.z = z;
        if (isVertical) cube.rotation.y = 90;
        scene.add(cube);

    },
    updatePosition: function (obj, x, y) {
        obj.position.x = x;
        obj.position.y = y;
    },
    createFloor: function (coords) {

    },
    bounceMarker: function () {
        var flr = this.MARKER_FLR;
        var ceil = this.MARKER_CEIL;
        var marker = this.marker;
        var posZ = marker.position.z;
        var z = 0.3;
        var animateUp = this.MARKER_ANIMATE_UP;
        if (animateUp && posZ > ceil) {
            this.MARKER_ANIMATE_UP = false;
            z = -0.1;
        } else if (!animateUp && posZ < flr) {
            this.MARKER_ANIMATE_UP = true;
            z = 0.1;
        } else if (!animateUp) {
            z = -0.1;
        }
        marker.translateZ(z);
    },
    addBorder: function (scene, width, height){
        var config = this.props.getMaze().get('dimensions').toJS();
        var ul = this.UNIT_LENGTH;
        var planeGeometry = new BoxGeometry( ul * config.x, ul * config.y, 20);
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
                    new Vector3( start[0], start[1], 20 ),
                        new Vector3( end[0], end[1], 20 )
                );

        var line = new Line( lineGeometry, lineMaterial );
        scene.add( line );
    },
    addVerticalWall: function (scene, x, y) {
        let ul = this.UNIT_LENGTH;
        this.addWall(scene, true, ul * x + ul, ul * y)
    },
    addHorizontalWall: function (scene, x, y) {
        let ul = this.UNIT_LENGTH;
        this.addWall(scene, false, ul * x, ul * y + ul)
    },
    addCeiling: function (scene, x, y) {
        let ul = this.UNIT_LENGTH;
        let ceiling = this.ceiling.clone();
        ceiling.position.x = x * ul + 1;
        ceiling.position.z = y * ul + 1;
        scene.add(ceiling);
    },
    addFloor: function (scene, x, y) {
        let ul = this.UNIT_LENGTH;
        let floor = this.ceiling.clone();
        floor.position.x = x * ul + 1;
        floor.position.z = y * ul + 1;
        scene.add(floor);
    },
    addWallObjects: function(scene, walls, renderer) {
        walls.forEach(function(group, groupIdx) {
            group.split('').forEach((wall, wallIdx)=>{
                if (wall === '1') renderer(scene, groupIdx, wallIdx);
            })
        });
    },
    addWalls: function (scene) {
        //walls is an array [x,y,zf, zc]
        var walls = this.props.getLevel().toJS();
        this.addWallObjects(scene, walls[0], this.addVerticalWall);
        this.addWallObjects(scene, walls[1], this.addHorizontalWall);
        this.addWallObjects(scene, walls[2], this.addFloor);
        this.addWallObjects(scene, walls[3], this.addCeiling);
    }
});
