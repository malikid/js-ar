var container = document.getElementById("container");
container.hidden = true;
window.addEventListener('load', function() {
  window.awe.init({
    device_type: awe.AUTO_DETECT_DEVICE_TYPE,
    settings: {
      container_id: 'container',
      default_camera_position: { x:0, y:0, z:0 },
      default_lights:[
        {
          id: 'point_light',
          type: 'point',
          color: 0xFFFFFF,
        },
      ],
    },
    ready: function() {
      awe.util.require([
        {
          capabilities: ['gum','webgl'],
          files: [
            [ 'lib/awe-standard-dependencies.js', 'lib/awe-standard.js'],
            'js/awe-jsartoolkit-dependencies.js',
            'js/awe.marker_ar.js',
          ],
          success: function() {
            awe.setup_scene();
            awe.pois.add({ id:'poi_1', position: { x:-60, y:20, z:140 }, visible: false });
            console.log("!!! awe.projections.add");
            awe.projections.add({
              id:'projection_1',
              geometry: {path: "../model/OKK.obj", x:-60, y:20, z:140 },
              scale: {x:50, y:50, z:50},
              position: { x:-60, y:20, z:140 }, // the y is vertical
              material:{ type: 'phong', color: 0xFFFFFF },
              texture: { path: '../skin.jpg' },
            }, { poi_id: 'poi_1' });
            awe.events.add([{
              id: 'ar_tracking_marker',
              device_types: {
                pc: 1,
                android: 1
              },
              register: function(handler) {
                window.addEventListener('ar_tracking_marker', handler, false);
              },
              unregister: function(handler) {
                window.removeEventListener('ar_tracking_marker', handler, false);
              },
              handler: function(event) {
                if (event.detail) {
                  if (event.detail['64']) { // we are mapping marker #64 to this projection
                    if(container.hidden) container.hidden = false;
                    // console.log("!!! ar_tracking_marker", event);
                    awe.pois.update({
                      data: {
                        visible: true,
                        position: { x:-60, y:20, z:140 },
                        matrix: event.detail['64'].transform
                      },
                      where: {
                        id: 'poi_1'
                      }
                    });
                  }
                  else {
                    if(!container.hidden) container.hidden = true;
                    awe.pois.update({
                      data: {
                        visible: false
                      },
                      where: {
                        id: 'poi_1'
                      }
                    });
                  }
                  awe.scene_needs_rendering = 1;
                }
              }
            }])
          },
        },
        {
          capabilities: [],
          success: function() {
            document.body.innerHTML = '<p>Try this demo in the latest version of Chrome or Firefox on a PC or Android device</p>';
          },
        },
      ]);
    }
  });
});