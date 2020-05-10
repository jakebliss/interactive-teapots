AFRAME.registerComponent('cursor-listener', {
    schema: {
        markerId: {default: 'marker'},
    },

    init: function() {
        this.marker = document.getElementById(this.data.markerId)
        this.jellyPickup = document.getElementById("pickedUpJelly")

        this.pickup = this.pickup.bind(this)

        this.internalState = {
            pickedUp: false
        }

        console.log(this.marker)

        this.el.addEventListener('mouseenter', this.pickup)

    },
    pickup: function(event) {
        console.log("mouse enter")
        this.jellyPickup.setAttribute("visible", "true")
        this.el.setAttribute("visible", "false")
        this.marker.setAttribute("pickedUp", "true")
        this.marker.setAttribute("pickedUpID", this.el.getAttribute("id"))
        //this.el.setAttribute("visible", false)
    }
});