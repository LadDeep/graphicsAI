import MeshPropertyController from "./MeshPropertyController";

import * as THREE from 'three';

export default class CircleProperty extends MeshPropertyController{
    constructor(interactiveMesh, propertiesPane){
        super(interactiveMesh, propertiesPane);
        
        this.geometryPropertyFolder= this.propertiesFolder.addFolder('Geometry');
        this.regenerate = ()=>{
            let newGeometry = new THREE.CircleGeometry(this.geometryData.radius, 
                                                        this.geometryData.segments, 
                                                        this.geometryData.thetaStart, 
                                                        this.geometryData.thetaLength);
            
            this.interactiveObject.updateGeometry(newGeometry);
        };
    }

    initProperties(){
        super.initProperties();
        
        this.geometryPropertyFolder.add(this.geometryData,'radius').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'segments').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaStart').min(1).max(10).onChange(this.regenerate);
        this.geometryPropertyFolder.add(this.geometryData,'thetaLength').min(1).max(10).onChange(this.regenerate);

    }
    
    
}