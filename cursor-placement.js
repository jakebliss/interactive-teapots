AFRAME.registerComponent('cursor-placement', {
    schema: {
        camera: {default: "camera"},
        pickedUp: {default: false},
        movingJelly: {default: "none"},
        markerId: {default: 'marker'},
        jellyfish1ID: {default: 'jellyfish1'},
        jellyfish2ID: {default: 'jellyfish2'},
        jellyfish3ID: {default: 'jellyfish3'},
        jellyfish4ID: {default: 'jellyfish4'}
    },

    init: function() {
        this.camera = document.getElementById(this.data.camera)
        this.marker = document.getElementById(this.data.markerId)
        this.jellyPickup = document.getElementById("pickedUpJelly")
        this.jelly1 = document.getElementById(this.data.jellyfish1ID)
        this.jelly2 = document.getElementById(this.data.jellyfish2ID)
        this.jelly3 = document.getElementById(this.data.jellyfish3ID)
        this.jelly4 = document.getElementById(this.data.jellyfish4ID)


        console.log("init")
        this.place = this.place.bind(this)

        this.marker.addEventListener('click', this.place)
        this.jelly1.addEventListener('mouseenter', this.pickup)
        this.jelly1.addEventListener('mousedown', function () {
            if(!this.data.pickedUp) this.pickup()
            else this.place()
        })
        this.jelly2.addEventListener('mouseenter', this.pickup)
        this.jelly2.addEventListener('mousedown', function () {
            if(!this.data.pickedUp) this.pickup()
            else this.place()
        })
        this.jelly3.addEventListener('mouseenter', this.pickup)
        this.jelly3.addEventListener('mousedown', function () {
            if(!this.data.pickedUp) this.pickup()
            else this.place()
        })
        this.jelly4.addEventListener('mouseenter', this.pickup)
        this.jelly4.addEventListener('mousedown', function () {
            if(!this.data.pickedUp) this.pickup()
            else this.place()
        })
    },

    place: function(event) {
        console.log("place")

        this.intPoint = this.el.object3D.localToWorld(event.detail.intersection.point)

        if(this.data.pickedUp) {
            var quaternion = new THREE.Quaternion();

            console.log(this.intPoint)

            // console.log(quaternion)
            this.movingJelly = document.getElementById(this.data.movingJelly)
            this.movingJellyCoor = this.el.object3D.localToWorld(this.movingJelly.getAttribute("position"))

            this.jellyPickupRot = this.jellyPickup.getAttribute("rotation").y + 90
            console.log(this.jellyPickupRot)

            this.camera.object3D.updateMatrixWorld()
            this.newRotationZ = this.camera.object3D.getWorldQuaternion(quaternion).x * (180/Math.PI)
            this.newRotation = new THREE.Vector3(0, 0, this.jellyPickupRot + this.movingJelly.getAttribute("rotation").z +
                                this.newRotationZ)
            console.log(this.newRotationZ)

            // console.log(this.data.startPoint.x)
            // console.log(this.data.startPoint.y)
            this.newPosX = this.data.startPoint.x - this.intPoint.x
                  + this.movingJellyCoor.x
            this.newPosY =  this.data.startPoint.y - this.intPoint.y
                  + this.movingJellyCoor.y

            this.newPos = new THREE.Vector3(this.newPosX, this.newPosY, 0)
            this.newPos = this.el.object3D.worldToLocal(this.newPos)
            this.newPos.z = 0

            // console.log(this.newPos)
            // console.log("shift Y: " + this.newPosX)
            // console.log("shift X: " + this.newPosY)
            //console.log(this.data.movingJelly)

            this.jellyPickup.setAttribute("visible", "false")
            this.movingJelly.setAttribute("position", this.newPos)
            //this.movingJelly.setAttribute("rotation", this.newRotation)
            this.movingJelly.setAttribute("visible", "true")
            // console.log(event.detail.intersection.point)
            this.data.movingJelly = "none"
            this.data.pickedUp = false;
        }
    },

    pickup: function(event) {
        console.log("mouse enter")
        this.marker = document.getElementById("marker")
        //console.log(this.getAttribute("position").z)
        //console.log(this.el)
        //console.log(this.object3D.localToWorld(this.object3D.position))

        this.point = this.parentNode.object3D.localToWorld(event.detail.intersection.point)

        if(!this.parentNode.getAttribute("cursor-placement").pickedUp) {
            console.log(this.point)
            this.jellyPickup = document.getElementById("pickedUpJelly")

            this.newRotation = new THREE.Vector3(0, this.getAttribute("rotation").z -180, 90)
            console.log(this.newRotation)

            //this.jellyPickup.setAttribute("rotation", this.newRotation)
            this.jellyPickup.setAttribute("visible", "true")
            this.setAttribute("visible", "false")
            // this.data.pickedUp = true;
            // this.movingJelly = this
            this.parentNode.setAttribute("cursor-placement", {"pickedUp": true});
            this.parentNode.setAttribute("cursor-placement", {"movingJelly": this.id})
            this.parentNode.setAttribute("cursor-placement", {"startPoint": this.point})
        }
    }


});

