window.addEventListener('load', function() {
  console.log("!!! window load");
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
            awe.pois.add({ id:'poi_1', position: { x:0, y:0, z:0 }, visible: false });
            console.log("!!! awe.projections.add");
            awe.projections.add({
              id:'projection_1',
              geometry: {path: "model/corgi.obj", x:0, y:0, z:0},
              position: { x:0, y:0, z:20 },
              scale: {x:20, y:20, z:20},
              rotation: {x:15, y:0, z:-30},
              material:{ type: 'phong', color: 0xFFFFFF }, 
              texture: { path: 'model/corgi_skin.jpg' },
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
                    awe.pois.update({
                      data: {
                        visible: true,
                        position: { x:0, y:0, z:0 },
                        matrix: event.detail['64'].transform
                      },
                      where: {
                        id: 'poi_1'
                      }
                    });
                  }
                  else {
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
            }]);
            addMapScript();
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