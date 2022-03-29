
export default class PropertyController{

    constructor(interactiveMesh, propertiesPane){
        this.interactiveMesh = interactiveMesh;
        this.propertiesFolder= propertiesPane.addFolder(interactiveMesh.geometry.type.replace('BufferGeometry', "") + "-" + interactiveMesh.id);

        this.color = interactiveMesh.material.color.getHex();
    }

    initProperties(){  
        // transform
        this.transformPropertyFolder = this.propertiesFolder.addFolder('Transform');
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'x').name('PositionX').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'y').name('PositionY').min(-10).max(10).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.position, 'z').name('PositionZ').min(-10).max(10).step(0.01).listen();
    
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'x').name('RotateX').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'y').name('RotateY').min(-360).max(360).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.rotation, 'z').name('RotateZ').min(-360).max(360).step(0.01).listen();
        
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'x').name('ScaleX').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'y').name('ScaleY').min(-100).max(100).step(0.01).listen();
        this.transformPropertyFolder.add(this.interactiveMesh.scale, 'z').name('ScaleZ').min(-100).max(100).step(0.01).listen();
        
        // visibility
        this.propertiesFolder.add(this.interactiveMesh, 'visible').onChange(()=>{
            this.interactiveMesh.onVisibleChange();
        });

        // color
        this.propertiesFolder.addColor(this, 'color').onChange(()=>{
            this.interactiveMesh.material.color.setHex(this.color);
        });

        // selection
        this.propertiesFolder.add(this.interactiveMesh, 'selected').onChange(()=>{
            this.interactiveMesh.onSelectionChange();
        })

        // enable/disable transform controller
        this.propertiesFolder.add(this.interactiveMesh, 'hasTransformControl').name('Transform control').listen().onChange(()=>{
            this.interactiveMesh.onTransformControlsChange();
        });

    }

    updateMesh(newGeometry){
        this.interactiveMesh.geometry.dispose();
        this.interactiveMesh.geometry = newGeometry;
    }
}