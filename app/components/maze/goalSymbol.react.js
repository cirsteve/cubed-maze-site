import { MeshLambertMaterial, Vector2, Shape, MultiMaterial, Mesh, ExtrudeGeometry, Geometry} from 'three';
const UL = 5;

let starPoints = [];

starPoints.push( new Vector2 (   0,  1.25 ) );
starPoints.push( new Vector2 (  0.25,  0.25 ) );
starPoints.push( new Vector2 (  1,  0.25 ) );
starPoints.push( new Vector2 (  0.5, -0.25 ) );
starPoints.push( new Vector2 (  0.75, -1.25 ) );
starPoints.push( new Vector2 (   0, -0.75 ) );
starPoints.push( new Vector2 ( -0.75, -1.25 ) );
starPoints.push( new Vector2 ( -0.5, -0.25 ) );
starPoints.push( new Vector2 ( -1,  0.25 ) );
starPoints.push( new Vector2 ( -0.25,  0.25 ) );

let starShape = new Shape( starPoints );

let extrusionSettings = {
	size: 1, height: 1, curveSegments: 2,
	bevelThickness: 0.5, bevelSize: 1, bevelEnabled: false,
    amount: 1, material: 0, extrudeMaterial: 1
};

let starGeometry = new ExtrudeGeometry( starShape, extrusionSettings );

let materialFront = new MeshLambertMaterial( { color: 0xffff00 } );
let materialSide = new MeshLambertMaterial( { color: 0xff8800 } );
let materialArray = [ materialFront, materialSide ];
let starMaterial = new MultiMaterial(materialArray);

let star = new Mesh( starGeometry, starMaterial );

// add a wireframe to model
//let wireframeTexture = new MeshLambertMaterial( { color: 0x000000, wireframe: true, transparent: true } );
//let star = new Mesh( starGeometry, wireframeTexture );
export default star;
